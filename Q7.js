let fbtn = document.getElementById("fetch");
let cbtn = document.getElementById("clear");
let data = document.getElementById("data");
fbtn.addEventListener("click", () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "Q7.json", true);
    xhr.onload = function () {
        let j = JSON.parse(this.responseText);
        let arr = j["pets"];
        console.log(arr);
        let str = "<ul>";
        for (let i = 0; i < arr.length; i++) {
            str += "<li>";
            s =
                "<p>Name : " +
                arr[i]["name"] +
                "</br>Age : " +
                arr[i]["age"] +
                "</br>Weight : " +
                arr[i]["weight"] +
                "</br>Type : " +
                arr[i]["weight"];
            str += s;
            str += "</li>";
        }
        str += "</ul>";
        data.innerHTML = str;
    };
    xhr.send();
});

cbtn.addEventListener("click", () => {
    data.innerHTML = "";
});
