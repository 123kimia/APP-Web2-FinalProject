// Saving the list of items
let list = [];
// Using addEventListener to add items by clicking on Add button
document.querySelector("#addButton").addEventListener("click", function(e) {
    e.preventDefault();
    add();
});
// Deleting a list item
document.querySelector("#list-items").addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        // Get the parent element
        let listItems = e.target.parentNode;
        const index = Array.from(listItems.parentNode.children).indexOf(listItems);
        if (index !== -1) {
            list.splice(index, 1);
            displayListItems();
            listItems.remove();
            localStorage.setItem("list", JSON.stringify(list)); // Update local storage after removing item
        }
    }
});
function add() {
    console.log("Running add function");
    // Get input values
    const userInput = document.getElementById("userInput");
    const category = document.getElementById("category");
    let newItem = userInput.value.trim();
    let dropDown = category.value;

    // Deleting the border color when the add button is clicked
    document.getElementById("userInput").classList.remove("border-blue-600");
    document.getElementById("category").classList.remove("border-purple-600");

    // Validating
    if (isValidated(newItem, dropDown)) {
        // Add new item to the list array
        list.push({ name: newItem, category: dropDown });
        localStorage.setItem("list", JSON.stringify(list)); // Update local storage after adding item
        displayListItems(); // Update the displayed list items
        document.querySelector("#userInput").value = "";
        document.querySelector("#category").value = "";
    } else {
        console.log("Invalid inputs");
    }
}

// Function to display the list items on the browser
function displayListItems() {
    const listItemsContainer = document.querySelector("#list-items");
    listItemsContainer.innerHTML = ""; // Clear existing list items

    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        const listItem = document.createElement("li");
        listItem.classList.add("items-center", "py-2");
        listItem.innerHTML = `
            <span class="m-3">↪️ ${item.name}</span>
            <span class="ml-3 rounded ${getCategoryClass(item.category)}">${item.category}</span>
        `;
    
        listItemsContainer.appendChild(listItem);
    }
}
// Load list items from local storage when the script runs
const retrievedJson = localStorage.getItem("list");
if (retrievedJson) {
    list = JSON.parse(retrievedJson);
    displayListItems();
}

// Getting Tailwind Css according to the category selected
function getCategoryClass(dropDown) {
    const categoryClasses = {
      "high priority": "bg-green-200",
      "medium priority": "bg-blue-200",
      "low priority": "bg-pink-300",
    };
  
    return categoryClasses[dropDown];
}

function isValidated(userInput, category) {
    console.log("Running isValidated function!");
    let isValid = false;
    const userInputField = document.querySelector("#userInput");
    const categoryField = document.querySelector("#category");

    // Reset border colors
    userInputField.classList.remove("border-blue-600", "border-purple-600");
    categoryField.classList.remove("border-blue-600", "border-purple-600");

    // Check that the text input has at least one character and that a dropdown option is chosen. 
    if (userInput.length <= 0 && category.length == "") {
        userInputField.classList.add("border-red-500");
        categoryField.classList.add("border-red-500");
    } else if (userInput.length <= 0) {
        userInputField.classList.add("border-red-500");
        categoryField.classList.remove("border-red-500");
    } else if (category.length <= 0) {
        userInputField.classList.remove("border-red-500");
        categoryField.classList.add("border-red-500");
    } else {
        isValid = true;
        userInputField.classList.remove("border-red-500");
        categoryField.classList.remove("border-red-500");
    }

    // Remove red border if the user starts typing in the input fields
    userInputField.addEventListener("input", function() {
        if (this.value.trim().length > 0) {
            this.classList.remove("border-red-500");
        }
    });

    categoryField.addEventListener("input", function() {
        if (this.value.trim().length > 0) {
            this.classList.remove("border-red-500");
        }
    });
    return isValid;
}