btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let weight = document.getElementById("weight").value;
    let type = document.getElementById("type").value;
    pet = {
        name: name,
        age: age,
        weight: weight,
        type: type,
    };
    console.log(pet);
    str = JSON.stringify(pet);
    console.log(str);
});
