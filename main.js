// Sample items for demonstration
const items = [
    { id: 1, name: "Laptop", price: "$500", description: "Used MacBook Pro", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Textbooks", price: "$50", description: "Engineering Textbooks", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Desk Chair", price: "$30", description: "Comfortable chair for your desk", image: "https://via.placeholder.com/150" },
  ];
  
  // Dynamically load items into the homepage
  const itemList = document.getElementById("item-list");
  
  function loadItems() {
    items.forEach(item => {
      const itemCard = document.createElement("div");
      itemCard.classList.add("item-card");
      itemCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p><strong>${item.price}</strong></p>
        <a href="item-details.html?id=${item.id}">View Details</a>
      `;
      itemList.appendChild(itemCard);
    });
  }
  
  if (itemList) loadItems();
  