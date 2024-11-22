// Load items dynamically on the Home Page
function loadItems() {
  const itemList = document.getElementById("item-list");
  const items = JSON.parse(localStorage.getItem("items")) || [];

  // Clear the item list
  itemList.innerHTML = "";

  if (items.length === 0) {
    itemList.innerHTML = `<p>No items available. Add some items from the <a href="listing.html">Sell Item</a> page!</p>`;
    return;
  }

  // Create item cards
  items.forEach((item, index) => {
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");

    itemCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h2>${item.name}</h2>
      <p><strong>Price:</strong> ${item.price}</p>
      <button class="details-button" data-index="${index}">More Details</button>
    `;

    itemList.appendChild(itemCard);
  });

  // Attach event listeners to "More Details" buttons
  const detailButtons = document.querySelectorAll(".details-button");
  detailButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      showDetails(items[index]); // Pass the correct item to the modal
    });
  });
}

// Show item details in a modal
function showDetails(item) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  // Populate modal content with the item's details
  document.getElementById("modal-title").textContent = item.name;
  document.getElementById("modal-image").src = item.image;
  document.getElementById("modal-price").textContent = item.price;
  document.getElementById("modal-condition").textContent = item.condition;
  document.getElementById("modal-description").textContent = item.description;
  document.getElementById("modal-phone").textContent = item.phone;
  document.getElementById("modal-email").textContent = item.email;

  // Close modal when the close button is clicked
  const closeButton = document.querySelector(".close-button");
  closeButton.onclick = () => {
    modal.style.display = "none";
  };

  // Close modal when clicking outside the modal content
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// Handle Sell Form Submission
function handleSellForm() {
  const sellForm = document.getElementById("sell-form");

  if (sellForm) {
    sellForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Collect form data
      const name = document.getElementById("item-name").value;
      const price = `$${document.getElementById("item-price").value}`;
      const condition = document.getElementById("item-condition").value;
      const phone = document.getElementById("user-phone").value;
      const email = document.getElementById("user-email").value;
      const description = document.getElementById("item-description").value;
      const imageInput = document.getElementById("item-image");

      // Validate image input
      if (imageInput.files.length === 0) {
        alert("Please upload a valid image.");
        return;
      }

      // Convert image to Base64
      const imageFile = imageInput.files[0];
      const image = await convertToBase64(imageFile);

      // Create new item object
      const newItem = { name, price, condition, phone, email, description, image };

      // Save to localStorage
      const items = JSON.parse(localStorage.getItem("items")) || [];
      items.push(newItem);
      localStorage.setItem("items", JSON.stringify(items));

      // Redirect to home page
      window.location.href = "index.html";
    });
  }
}

// Convert image to Base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// Initialize based on the current page
if (document.getElementById("item-list")) loadItems();
if (document.getElementById("sell-form")) handleSellForm();


// Function to clear localStorage
function clearDatabase() {
  localStorage.clear(); // Clear all stored items
  alert("Local database cleared!"); // Notify the user
  window.location.reload(); // Refresh the page to reflect changes
}

// Attach the function to the button with the ID "clear-button"
document.addEventListener("DOMContentLoaded", () => {
  const clearButton = document.getElementById("clear-button");
  if (clearButton) {
    clearButton.addEventListener("click", clearDatabase);
  }
});
