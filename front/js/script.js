
import { getData } from "./utils.js";

// On enregistre les données de l'API
const data = await getData('http://localhost:3000/api/products');

display(data)

// On affiche dans le DOM tous les produits reçus
function display(data) {
  let html = '';

  data.forEach(product => {
    html += renderProduct(product)
  });
  // On injecte la chaîne de caractères dans le DOM
  document.querySelector('#items').innerHTML = html;
}

// On crée une chaîne de caractères qui sera injectée comme html plus tard
function renderProduct(product) {
  return `
    <a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>`;
}

