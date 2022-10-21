import { getData, get, money, store } from "./utils.js";
import { initForm } from "./form.js";

const data = await getData('http://localhost:3000/api/products');

// On vérifie si le panier est vide
if (!get('products') || get('products').length === 0) {
    document.querySelector('h1').innerText = 'Votre panier est vide';
    document.querySelector('.cart').remove();
} else {
    // On récupère les produits du panier en y ajoutant toutes les données correspondantes (nom, description...)
    const products = buildCompleteList(data);

    display(products)
    countTotals(products);
    listenForProductQtyChange();
    listenForProductDeletion();
    initForm();
}

// On écoute lorsque un utilisateur veut supprimer un produit du panier
function listenForProductDeletion() {
    // On itère sur tous les boutons delete pour attacher sur chacun d'entre eux un listener
    document.querySelectorAll('.deleteItem').forEach(input => {
        input.addEventListener('click', (e) => {
            const id = input.closest('.cart__item').dataset.id
            const color = input.closest('.cart__item').dataset.color

            const storage = get('products');
            const index = storage.findIndex(a => a.id == id && color == a.color); // on trouve l'index du produit à supprimer
            storage.splice(index, 1); // on supprime le produit du tableau
            store('products', storage)
            if (storage.length === 0) {
                // S'il n'y a plus de produit dans le panier, on le nettoie complètement
                localStorage.clear()
            }
            // On raffraichit la page pour actualiser les totaux
            location.reload();
        })
    })
}
// On écoute lorsque l'utilisateur souhaite changer la quantité
function listenForProductQtyChange() {
    // On itère sur tous les champs quantité pour attacher sur chacun d'entre eux un listener
    document.querySelectorAll('.itemQuantity').forEach(input => {
        input.addEventListener('input', (e) => {
            const qty = e.target.value // on récupère la nouvelle quantité voulue
            if (qty < 1 || qty > 99) { // On vérifie que la quantité est bien comprise entre 1 et 100
                alert("Merci de sélectionner une quantité entre 1 et 100")
                return;
            }
            const id = input.closest('.cart__item').dataset.id
            const color = input.closest('.cart__item').dataset.color
            const storage = get('products');
            const product = storage.find(a => a.id == id && color == a.color); // on trouve le produit à modifier 
            product.qty = qty; // on modifie le produit
            // comme les tableaux et objets son passés par référence, il n'est pas nécessaire de modifier explicitement le tableau
            // car en modifiant un de ses éléments tout le tableau est modifié
            store('products', storage) // on enregistre le tableau modifié 
            // On raffraichit la page pour actualiser les totaux
            location.reload();
        })
    })
}
// On affiche les produits
function display(products) {

    products.forEach(product => {
        document.querySelector('#cart__items').innerHTML += displayProduct(product)
    })


}

// On calcule les totaux et on les affiche
function countTotals(products) {
    let total = 0;
    let qty = 0;

    products.forEach(product => {
        qty += Number(product.qty);
        total += Number(product.qty) * Number(product.price)
    })

    document.querySelector('#totalQuantity').innerText = qty
    document.querySelector('#totalPrice').innerText = money(total)
}

// On construit un tableau complet 
function buildCompleteList(products) {
    const list = [];
    const storage = get('products');
    storage.forEach(element => {
        const details = products.find(a => a._id == element.id)
        element.name = details.name;
        element.altTxt = details.altTxt;
        element.colors = details.colors;
        element.description = details.description;
        element.imageUrl = details.imageUrl;
        element.price = details.price;
        list.push(element)
    });

    return list;
}

// On crée une chaîne de caractères qui sera injectée comme html plus tard pour un produit
function displayProduct(product) {
    return `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${money(product.price)}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
}