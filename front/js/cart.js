import { getData, get, money, store } from "./utils.js";
import { initForm } from "./form.js";

const data = await getData('http://localhost:3000/api/products');

if (!get('products') || get('products').length === 0) {
    document.querySelector('h1').innerText = 'Votre panier est vide';
    document.querySelector('.cart').remove();
} else {
    const products = buildCompleteList(data);

    display(products)

    listenForProductQtyChange();
    listenForProductDeletion();

}

function listenForProductDeletion() {
    document.querySelectorAll('.deleteItem').forEach(input => {
        input.addEventListener('click', (e) => {
            const id = input.closest('.cart__item').dataset.id
            const color = input.closest('.cart__item').dataset.color

            const storage = get('products');
            const index = storage.findIndex(a => a.id == id && color == a.color);
            storage.splice(index, 1);
            product.qty = qty
            store('products', storage)
            location.reload();
        })
    })
}

function listenForProductQtyChange() {
    document.querySelectorAll('.itemQuantity').forEach(input => {
        input.addEventListener('input', (e) => {
            const qty = e.target.value
            const id = input.closest('.cart__item').dataset.id
            const color = input.closest('.cart__item').dataset.color

            const storage = get('products');
            const product = storage.find(a => a.id == id && color == a.color);

            product.qty = qty
            store('products', storage)
            location.reload();
        })
    })
}

function display(products) {

    products.forEach(product => {
        document.querySelector('#cart__items').innerHTML += displayProduct(product)
    })

    countTotals(products);
}

function countTotals(products) {
    let total = 0;
    const qty = 0;

    products.forEach(product => {
        qty += Number(product.qty);
        total += Number(product.qty) * Number(product.price)
    })

    document.querySelector('.totalQuantity').innerText = qty
    document.querySelector('.totalPrice').innerText = money(total)
}

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
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> -->`
}