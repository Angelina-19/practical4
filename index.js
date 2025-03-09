const searchInput = document.getElementById('searchInput');
const list = document.getElementById('myList');
const sortSelect = document.getElementById('sortSelect');
const noResults = document.getElementById('noResults');

let items = [
    { text: "Яблука", date: new Date(2025, 1, 27) },
    { text: "Груші", date: new Date(2025, 1, 28) },
    { text: "Вишні", date: new Date(2025, 2, 3) },
    { text: "Виноград", date: new Date(2025, 2, 5) },
    { text: "Черешні", date: new Date(2025, 2, 7) },
    { text: "Полуниця", date: new Date(2025, 2, 8) }
];

function displayItems() {
    list.innerHTML = '';
    if (items.length === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.text;
            list.appendChild(li);
    });
}
}

function filterItems() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredItems = items.filter(item => item.text.toLowerCase().includes(searchTerm));
    if (filteredItems.length === 0 && searchTerm !== '') {
      noResults.style.display = 'block'; 
    } else {
      noResults.style.display = 'none'; 
      items = filteredItems;
      displayItems();
    }
  }
 
  
  function sortItems() {
    const sortValue = sortSelect.value;
    if (sortValue === 'alphabetical') {
      items.sort((a, b) => a.text.localeCompare(b.text));
    } else if (sortValue === 'date') {
      items.sort((a, b) => a.date - b.date);
    }
    displayItems();
  }
  
  function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
  }
  
  searchInput.addEventListener('input', filterItems);
  sortSelect.addEventListener('change', sortItems);
  
  document.getElementById('addItem').addEventListener('click', () => {
    const newItemText = prompt('Введіть текст нового елементу:');
    if (newItemText) {
      items.push({ text: newItemText, date: new Date() });
      saveItems();
      displayItems();
    }
  });
  
  list.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      const itemText = event.target.textContent;
      items = items.filter(item => item.text !== itemText);
      saveItems();
      displayItems();
    }
  });
  
  displayItems();
