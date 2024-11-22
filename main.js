document.addEventListener("DOMContentLoaded", () => {
  // Submit form handler
  const form = document.getElementById("item-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const itemName = document.getElementById("item-name").value;
      const price = document.getElementById("price").value;
      const condition = document.getElementById("condition").value;
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      const description = document.getElementById("description").value;
      const imageInput = document.getElementById("image");
      const image = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : "";

      if (!itemName || !price || !condition || !phone || !email || !description || !image) {
        alert("Please fill in all fields and upload an image.");
        return;
      }

      const item = { name: itemName, price: `$${price}`, condition, phone, email, description, image };

      const items = JSON.parse(localStorage.getItem("marketplaceItems")) || [];
      items.push(item);
      localStorage.setItem("marketplaceItems", JSON.stringify(items));

      alert("Item uploaded successfully!");
      form.reset();
    });
  }

  // Load items on home page
  const itemList = document.getElementById("item-list");
  if (itemList) {
    const items = JSON.parse(localStorage.getItem("marketplaceItems")) || [];
    itemList.innerHTML = items
      .map(
        (item, index) => `
          <div class="item-card">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <h3>${item.name}</h3>
            <p>Price: ${item.price}</p>
            <button class="details-button" data-index="${index}">More Details</button>
          </div>
        `
      )
      .join("");

    // Add modal events
    document.querySelectorAll(".details-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        const item = items[index];
        openModal(item);
      });
    });
  }

  // Modal logic
  const modal = document.getElementById("modal");
  const closeModalButton = document.querySelector(".close-button");

  function openModal(item) {
    document.getElementById("modal-title").innerText = item.name;
    document.getElementById("modal-image").src = item.image;
    document.getElementById("modal-price").innerText = item.price;
    document.getElementById("modal-condition").innerText = item.condition;
    document.getElementById("modal-description").innerText = item.description;
    document.getElementById("modal-phone").innerText = item.phone;
    document.getElementById("modal-email").innerText = item.email;
    modal.style.display = "flex";
  }

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});
