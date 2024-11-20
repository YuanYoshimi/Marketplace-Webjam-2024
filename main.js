// Function to handle the sell form submission
function handleSellForm() {
  const sellForm = document.getElementById("sell-form");

  if (sellForm) {
    sellForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form input values
      const name = document.getElementById("item-name").value;
      const price = `$${document.getElementById("item-price").value}`;
      const description = document.getElementById("item-description").value;
      const imageInput = document.getElementById("item-image");

      // Validate file input
      if (imageInput.files.length === 0) {
        document.getElementById("error-message").style.display = "block";
        return;
      }

      // Convert the uploaded image to Base64
      const imageFile = imageInput.files[0];
      const image = await convertToBase64(imageFile);

      // Create a new item object
      const newItem = { name, price, image, description };

      // Get existing items from localStorage or initialize an empty array
      const items = JSON.parse(localStorage.getItem("items")) || [];

      // Add the new item to the array
      items.push(newItem);

      // Save the updated array back to localStorage
      localStorage.setItem("items", JSON.stringify(items));

      // Redirect to the home page
      window.location.href = "index.html";
    });
  }
}

// Function to convert an image file to Base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // Convert file to Base64
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Read file as data URL
  });
}

// Function to load items from localStorage and display them on the homepage
function loadItems() {
  const itemList = document.getElementById("item-list");

  if (!itemList) return; // Exit if the #item-list element is missing

  // Get items from localStorage or initialize an empty array
  const items = JSON.parse(localStorage.getItem("items")) || [];

  // Clear the item list before adding new content
  itemList.innerHTML = "";

  // Check if there are items to display
  if (items.length === 0) {
    itemList.innerHTML = `<p>No items available. Add some items from the <a href="listing.html">Sell Item</a> page!</p>`;
    return;
  }

  // Loop through items and display them in cards
  items.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");

    itemCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <p><strong>${item.price}</strong></p>
    `;

    itemList.appendChild(itemCard);
  });
}

// Initialize the script based on the current page
if (document.getElementById("item-list")) {
  loadItems(); // Load items on the home page
}

if (document.getElementById("sell-form")) {
  handleSellForm(); // Attach the form handler on the sell page
}
