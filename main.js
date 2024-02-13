$(document).ready(function () {
    $("#Generate").click(function () {
        $.get("http://localhost:3000/generate", function (data) {
            console.log(data);
            alert(data);
        })
    });
});

const getData = () => {
    $.get("http://localhost:3030", function (data) {
            console.log(data);
            $("#logs").html(JSON.parse(data).map(x => `<li>Image ${x.message}.png created at ${x.date}</li>`).join(''));
        })
}

$(document).ready(function () {
    $("#Load").click(getData);
});

$(document).ready(function () {
    $("#AutoLoad").click(() => {setInterval(getData, 1000)});
});