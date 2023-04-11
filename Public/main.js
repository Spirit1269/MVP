let container = document.querySelector(".container");  //<-- assuming there is a container on page
document.querySelector('button_create').addEventListener('click', getFetch)

function getFetch() {
    const choice = document.quearySelector('input').value.toLowerCase()
   
    fetch("/api/yarn")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(yarn);
        data.forEach(function (yarn) {
            console.log("Adding h2 for yarn:", yarn);
            container.innerHTML += `<h2>${yarn.name_}</h2>`;
        });
    });
}