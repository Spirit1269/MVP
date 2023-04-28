let container = document.querySelector(".container");  //<-- assuming there is a container on page
let menu_container = document.querySelector(".menu_container")
let main_container = document.querySelector(".main_container")


// Select the yarn button
const yarnButton = document.querySelector('.yarn');

// Add event listener to the yarn button
yarnButton.addEventListener('click', () => {
  // Send a GET request to the API to get the yarn_table
  fetch('/api/yarn')
    .then(response => response.json())
    .then(data => {
      // Create an unordered list
      const ul = document.createElement('ul');

      // Loop through the yarn data and create list items
      data.forEach(yarn => {
        const li = document.createElement('li');
        li.textContent = `ID: ${yarn.id} - Brand: ${yarn.brand}`;
        ul.appendChild(li);
      });

      // Append the list to the main container
      const mainContainer = document.querySelector('.main_container');
      mainContainer.appendChild(ul);
    })
    // .catch(error => console.error(error));
});

// Select the brand button
const brandButton = document.querySelector('.brand');

// Add an event listener to the brand button
brandButton.addEventListener('click', (event) => {
  // Make a request to fetch the brands
  fetch('/api/yarn/brands')
    .then(response => response.json())
    .then(brands => {
      // Clear the main container
      const mainContainer = document.querySelector('.main_container');
      mainContainer.innerHTML = '';

      // Create a list of brands
      const brandList = document.createElement('ul');
      brands.forEach(brand => {
        const brandItem = document.createElement('li');
        brandItem.textContent = brand.brand;
        brandList.appendChild(brandItem);
      });

      // Append the brand list to the main container
      mainContainer.appendChild(brandList);
    })
    .catch(error => console.error(error));
});
// Select the fiber type button
const fiberTypeButton = document.querySelector('.fiber_type');

// Add an event listener to the brand button
fiberTypeButton.addEventListener('click', (event) => {
  // Make a request to fetch the brands
  fetch('/api/yarn/')
    .then(response => response.json())
    .then(fiberType => {
      // Clear the main container
      const mainContainer = document.querySelector('.main_container');
      mainContainer.innerHTML = '';

      // Create a list of fiber types
      const fiberList = document.createElement('ul');
      fiberType.forEach(fiber => {
        const fiberItem = document.createElement('li');
        fiberItem.textContent = fiber.fiber;
        fiberList.appendChild(fiberItem);
      });

      // Append the fiber list to the main container
      mainContainer.appendChild(fiberList);
    })
    .catch(error => console.error(error));
});

// Select the size button
const sizeButton = document.querySelector('.size');

// Add an event listener to the brand button
sizeButton.addEventListener('click', (event) => {
  // Make a request to fetch the sizes
  fetch('/api/yarn/sizes')
    .then(response => response.json())
    .then(sizes => {
      // Clear the main container
      const mainContainer = document.querySelector('.main_container');
      mainContainer.innerHTML = '';

      // Create a list of sizes
      const sizeList = document.createElement('ul');
      brands.forEach(size => {
        const sizeItem = document.createElement('li');
        sizeItem.textContent = size.size;
        sizeList.appendChild(sizeItem);
      });

      // Append the brand list to the main container
      mainContainer.appendChild(brandList);
    })
    .catch(error => console.error(error));
});

document.querySelector(".size").addEventListener('click', () => {
    fetch ("api/yarn/sizes")
        .then((response)=> response.json())
        .then((data) => {
            //Handle the reponse data or update the UI as needed
            console.log(data);
            main_container.innerHTML= "";
            data.forEach((size) => {
                main_container.innerHTML += `<p>${size.name}</p>`;
            });
        })
        .catch((error)=>{
            console.error("Error:", error)
        });
})
document.querySelector('.fiber_type').addEventListener('click', () => {
    fetch ("api/yarn/fiber-type")
        .then((response)=> response.json())
        .then((data) => {
            //Handle the reponse data or update the UI as needed
            console.log(data);
            main_container.innerHTML= "";
            data.forEach((size) => {
                main_container.innerHTML += `<p>${size.name}</p>`;
            });
        })
        .catch((error)=>{
            console.error("Error:", error)
        });
})


// get reference to the add yarn button and main container
const addYarnBtn = document.getElementById("add_yarn_button");
const mainContainer = document.getElementById("main_container");
const main = mainContainer.querySelector(".main");

// add event listener to the add yarn button
addYarnBtn.addEventListener("click", function() {
  // create the form element
  const form = document.createElement("form");
  form.innerHTML = `
    <label for="brand">Brand:</label>
    <input type="text" id="brand" name="brand"><br><br>
    <label for="color">Color:</label>
    <input type="text" id="color" name="color"><br><br>
    <label for="size">Size:</label>
    <input type="text" id="size" name="size"><br><br>
    <label for="fiber_type">Fiber Type 1:</label>
    <input type="text" id="fiber_type" name="fiber_type1"><br><br>
    <label for="fiber_type">Fiber Type 2:</label>
    <input type="text" id="fiber_type" name="fiber_type2"><br><br>
    <label for="length">Length (yards):</label>
    <input type="number" id="length" name="length"><br><br>
    <label for="quantity">Quantity:</label>
    <input type="number" id="quantify" name="quantity"><br><br>
    <input type="submit" value="Submit">
  `;

  // add event listener to the form submission
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // get the input field values
    const brand = document.getElementById("brand").value;
    const color = document.getElementById("color").value;
    const size = document.getElementById("size").value;
    const fiber_type1 = document.getElementById("fiber_type1").value;
    const fiber_type2 = document.getElementById("fiber_type2").value;
    const length = document.getElementById('length').value;
    const quantity = document.getElementById('quantity').value;

    // send a POST request to the API to add a new row to the yarn_table
    fetch("/api/yarn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        brand: brand,
        color: color,
        size: size,
        fiber_type1: fiber_type1,
        fiber_type2: fiber_type2,
        length:length,
        quantity:quantity

      })
    })
    .then(response => response.json())
    .then(data => {
      // update the UI to display the new row in the yarn_table
      const yarnTable = document.querySelector(".yarn_table");
      const row = yarnTable.insertRow(-1);
      const brandCell = row.insertCell(0);
      const colorCell = row.insertCell(1);
      const sizeCell = row.insertCell(2);
      const fiberType1Cell = row.insertCell(3);
      const fiberType2Cell = row.insertCell(4);
      const lengthCell = row.insertCell(5);
      const quantityCell = row.insertCell(6);
      brandCell.textContent = data.brand;
      colorCell.textContent = data.color;
      sizeCell.textContent = data.size;
      fiberType1Cell.textContent = data.fiber_type1;
      fiberType2Cell.textContent = data.fiber_type2;
      lengthCell.textContent = data.length;
      quantityCell.textContent = data.quantity;

      // clear the form
      form.reset();
    })
    .catch(error => console.error(error));
  });

  // append the form to the main container
  mainContainer.appendChild(form);
});
