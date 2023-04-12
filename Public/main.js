let container = document.querySelector(".container");  //<-- assuming there is a container on page
let menu_container = document.querySelector(".menu_container")
let main_container = document.querySelector(".main_container")

document.querySelector('brand').addEventListener('click', getFetch)
document.querySelector('size').addEventListener('click', getFetch)
document.querySelector('fiber type').addEventListener('click', getFetch)


function getFetch() {
    const choice = document.querySelector('input').value.toLowerCase();

    // Prepare the data to be sent in the request body
    const data = {
        brand: "Lion Brand",
        name_: "name", // Update with the actual data you want to add
        size_id: 1,
        fiber_type1: "Acrylic",
        fiber_type2: "Cotton",
        color: "Example Color",
        length_: 100,
        quantity: 10
    };

    // Send a POST request to the server
    fetch("/api/yarn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data); // This will log the response data from the server
        // Handle the response data or update the UI as needed
    })
    .catch(function (error) {
        console.error("Error:", error);
    });
    main_container.append(data.brand, data.name_, data.size_id, data.fiber_type1)
}