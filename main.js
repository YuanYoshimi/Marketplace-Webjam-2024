// Function to load items from localStorage and display them on the homepage
function loadItems() {
  const itemList = document.getElementById("item-list");
  const items = JSON.parse(localStorage.getItem("items")) || []; // Get items from localStorage

  // Clear the item list
  itemList.innerHTML = "";

  // Check if there are items to display
  if (items.length === 0) {
    itemList.innerHTML = `<p>No items available. Add some items from the <a href="listing.html">Sell Item</a> page!</p>`;
    return;
  }

  // Loop through items and create cards for each
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

  // Add event listeners to "More Details" buttons
  const detailButtons = document.querySelectorAll(".details-button");
  detailButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      showItemDetails(items[index]);
    });
  });
}

// Function to show item details in a modal
function showItemDetails(item) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-title").textContent = item.name;
  document.getElementById("modal-image").src = item.image;
  document.getElementById("modal-price").textContent = item.price;
  document.getElementById("modal-description").textContent = item.description;
  document.getElementById("modal-condition").textContent = item.condition;
  document.getElementById("modal-phone").textContent = item.phone;
  document.getElementById("modal-email").textContent = item.email;

  modal.style.display = "block";

  // Close the modal when the close button is clicked
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Initialize the script on the homepage
if (document.getElementById("item-list")) {
  loadItems();
}
