// Versions
const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// Dark Mode
const btDarkMode = document.getElementById('toggle-dark-mode');
btDarkMode.addEventListener('click', async () => {
  const isDarkMode = await darkMode.toggle();
  document.getElementById('theme-source').innerHTML = isDarkMode
    ? 'Ligth'
    : 'Dark';
});

const btResetMode = document.getElementById('reset-to-system');
btResetMode.addEventListener('click', async () => {
  await darkMode.system();
  document.getElementById('theme-source').innerHTML = 'System';
});

const btSearchProdutos = document.querySelector('#search-product');
btSearchProdutos.addEventListener('click', async () => {
  const dataSearch = document.querySelector('.desc-product');
  if (!dataSearch.value) {
    window.alert('informe um produto');
    return false;
  }
  const products = await dados.products([dataSearch.value]);
  const divProdutos = document.querySelector('.result-produtos');
  divProdutos.innerHTML = `${JSON.stringify(products)}`;
});
