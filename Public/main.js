let container = document.querySelector(".container");  //<-- assuming there is a container on page
let menu_container = document.querySelector(".menu_container")
let main_container = document.querySelector(".main_container")


// Select the yarn button
const allyarnButton = document.querySelector('.yarn');

// Add event listener to the yarn button
allyarnButton.addEventListener('click', () => {
  // Send a GET request to the API to get the yarn_table
  fetch('/api/yarn')
    .then(response => response.json())
    .then(data => {
     
      // Create an unordered list
      const ul = document.createElement('ul');

      // Loop through the yarn data and create list items
      data.forEach(yarn => {
        const li = document.createElement('li');
        li.textContent = `ID: ${yarn.id} - Brand: ${yarn.brand}, Name: ${yarn.name_}, Fiber Types:  ${yarn.fiber_type1}/${yarn.fiber_type2}, Size:  ${yarn.size}, Color:  ${yarn.color}, Length:  ${yarn.length_}, Quantity:  ${yarn.quantity}`;
        ul.appendChild(li);
        console.log(ul)
      });

      const mainContainer = document.querySelector('#main_container');
      console.log(mainContainer)
      if (mainContainer) {
        // Clear the main container
        mainContainer.innerHTML = '';

        // Append the list to the main container
        mainContainer.appendChild(ul);
      } else {
        console.error('Main container not found');
      }
    })
     .catch(error => console.error(error));
});


// Select the brands button
const brandButton = document.querySelector('.brand');

// Add an event listener to the brand button
brandButton.addEventListener('click', () => {
  // Make a request to fetch the brands
  fetch('/api/brands')
    .then(response => response.json())
    .then(brands => {
      // Clear the main container
      const mainContainer = document.querySelector('#main_container');
      mainContainer.innerHTML = '';

      // Display a list of brands available
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

// Select the size button
const sizeButton = document.querySelector('.size');

// Add an event listener to the brand button
sizeButton.addEventListener('click', () => {
  // Make a request to fetch the sizes
  fetch('/api/size')
    .then(response => response.json())
    .then(sizes => {
      // Clear the main container
      const mainContainer = document.querySelector('#main_container');
      mainContainer.innerHTML = '';

      // Display a list of sizes available
      const sizeList = document.createElement('ul');
      sizes.forEach(size => {
        const sizeItem = document.createElement('li');
        sizeItem.textContent = size.size;
        console.log(sizeItem)
        sizeList.appendChild(sizeItem);
        console.log(sizeList)
      });

      // Append the size list to the main container
      mainContainer.appendChild(sizeList);
      console.log(mainContainer)
    })
    .catch(error => console.error(error));
});


// Select the fiber type button
// const fiberTypeButton = document.querySelector('.fiber_type');

// // Add an event listener to the fiber_type button
// fiberTypeButton.addEventListener('click', () => {
//   // Make a request to fetch the fiber types
//   fetch('http://localhost:3008/api/fiber_types/')
//     .then(response => response.json())
//     .then(fiberType => {
//       // Clear the main container
//       const mainContainer = document.querySelector('.main_container');
//       mainContainer.innerHTML = '';

//       // Display a list of fiber types available
//       const fiberList = document.createElement('ul');
//       fiberType.forEach(fiber => {
//         const fiberItem = document.createElement('li');
//         fiberItem.textContent = fiber.fiber;
//         fiberList.appendChild(fiberItem);
//       });

//       // Append the fiber list to the main container
//       mainContainer.appendChild(fiberList);
//     })
//     .catch(error => console.error(error));
// });





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
    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br><br>
    <label for="color">Color:</label>
    <input type="text" id="color" name="color"><br><br>
    <label for="size">Size:</label>
    <input type="text" id="size" name="size"><br><br>
    <label for="fiber_type">Fiber Type 1:</label>
    <input type="text" id="fiber_type1" name="fiber_type1"><br><br>
    <label for="fiber_type">Fiber Type 2:</label>
    <input type="text" id="fiber_type2" name="fiber_type2"><br><br>
    <label for="length">Length (yards):</label>
    <input type="number" id="length" name="length"><br><br>
    <label for="quantity">Quantity:</label>
    <input type="number" id="quantity" name="quantity"><br><br>
    <input class = "styled" type="submit" value="Submit">
  `;

  // add event listener to the form submission
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // get the input field values
    const brand = document.getElementById("brand").value;
    const name = document.getElementById('name').value;
    const color = document.getElementById("color").value;
    const size = document.getElementById("size").value;
    const fiber_type1 = document.getElementById("fiber_type1").value;
    const fiber_type2 = document.getElementById("fiber_type2").value;
    const length = document.getElementById('length').value;
    const quantity = document.getElementById('quantity').value;

    // send a POST request to the API to add a new row to the yarn_table
    fetch(`/api/yarn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        brand: brand,
        name_:name,
        color: color,
        size_id: size,
        fiber_type1: fiber_type1,
        fiber_type2: fiber_type2,
        length_:length,
        quantity:quantity

      })
    })
    .then(response => response.json())
    .then(data => {
      // update the UI to display the new row in the yarn_table
      const yarnTable = document.querySelector(".yarn_table");
      const row = yarnTable.insertRow(-1);
      const brandCell = row.insertCell(0);
      const nameCell = row.insertCell(1);
      const colorCell = row.insertCell(2);
      const sizeCell = row.insertCell(3);
      const fiberType1Cell = row.insertCell(4);
      const fiberType2Cell = row.insertCell(5);
      const lengthCell = row.insertCell(6);
      const quantityCell = row.insertCell(7);
      brandCell.textContent = data.brand;
      nameCell.textContent = data.name_;
      colorCell.textContent = data.color;
      sizeCell.textContent = data.size_id;
      fiberType1Cell.textContent = data.fiber_type1;
      fiberType2Cell.textContent = data.fiber_type2;
      lengthCell.textContent = data.length_;
      quantityCell.textContent = data.quantity;

      // clear the form
      form.reset();
    })
    .catch(error => console.error(error));
  });

  // Clear the main container
  const mainContainer = document.querySelector('#main_container');
  mainContainer.innerHTML = '';

  // append the form to the main container
  mainContainer.appendChild(form);
});

// Select the delete button
const deleteButton = document.querySelector('.delete');

// Add an event listener to the delete button
deleteButton.addEventListener('click', () => {
  const id = document.querySelector('#delete_id').value;
  // Make a request to delete the yarn
  fetch(`/api/yarn/${id}`, {
    method: 'DELETE'
  })
  .then(response => {
    if(response.ok) {
      // Clear the input fields
      document.querySelector('#delete_id').value = '';
      
      // Display a success message
     const mainContainer = document.querySelector('#main_container');
      const successMessage = document.createElement('p');
      successMessage.textContent = 'Yarn deleted successfully!';
      mainContainer.appendChild(successMessage);
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => console.error(error));
});


// Select the update button and input
const updateButton = document.querySelector('#update-button');
const updateInput = document.querySelector('#update-input');

const updateForm = document.querySelector("#update_Form");


// Add an event listener to the update button
updateButton.addEventListener('click', () => {
  // Get the ID of the yarn item to update
  const id = updateInput.value;

  // Fetch the yarn data for the specified ID
  fetch(`/api/yarn/${id}`)
    .then(response => response.json())
    .then(yarnData => {
      // Create the form element
      const form = document.createElement('form');
      console.log(yarnData)
      
      // Loop through the yarn data and create input fields for each value
      Object.entries(yarnData[0]).forEach(([key, value]) => {
        // Skip the ID field since we're not updating it
        if (key === 'id') return;
        
        // Create the input field and label
        const label = document.createElement('label');
        label.textContent = `${key}:`;
        const input = document.createElement('input');
        input.type = 'text';
        input.name = key;
        input.value = value;
        
        // Append the label and input to the form
        form.appendChild(label);
        form.appendChild(input);
      });
      


      
      // Create the update button
      const updateButton = document.createElement('button');
      updateButton.type = 'submit';
      updateButton.textContent = 'Update';
      form.appendChild(updateButton);
      
      // Append the form to the main container
      const mainContainer = document.querySelector('#main_container');
      mainContainer.innerHTML = '';
      mainContainer.appendChild(form);
      
      // Add an event listener to the form to submit the updated data
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Get the updated values from the form
        const updatedData = {};
        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
          const element = formElements[i];
          if (element.tagName === 'INPUT') {
            updatedData[element.name] = element.value;
          }
        }
        
        // Update the yarn data
        fetch(`/api/yarn/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        })
          .then(() => {
            // Display a success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Yarn updated successfully.';
            mainContainer.appendChild(successMessage);
          })
          .catch(error => console.error(error));
      });
    })
    .catch(error => console.error(error));
});