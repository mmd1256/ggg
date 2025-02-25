const searchContainer = document.querySelector('.search-container');
const searchLogo = document.querySelector('.search-logo');
const searchInput = document.querySelector('#search-input');

searchLogo.addEventListener('click', () => {
  searchContainer.classList.toggle('expanded');
  searchInput.focus();
});

searchInput.addEventListener('blur', () => {
  searchContainer.classList.remove('expanded');
});