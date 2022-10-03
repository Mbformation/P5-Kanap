import { getFromUrl, getData } from "./utils.js";

// Récupérer l'id
let id = getFromUrl('id');

// Récupérer les données du produit
const product = await getData('http://localhost:3000/api/products/' + id);

// Afficher le produit
display(product)


// Ecouter l'ajout au panier
listenForCartAddition(product);

function listenForCartAddition(product) {

    document.querySelector('#addToCart').addEventListener('click', () => {

        const color = document.querySelector('#colors').value;

        const qty = Number(document.querySelector('#quantity').value);

        if (color === "") {
            alert('Veuillez sélectionner une couleur')
            return;
        }

        if (!product.color.includes(color)) {
            alert('Veuillez sélectionner une couleur existante')
            return;
        }

        if (qty === '') {
            alert('Veuillez sélectionner une quantité')
            return;
        }

        if (qty < 1 || qty > 100) {
            alert('Veuillez sélectionner une quantité comprise entre 1 et 100')
            return;
        }

        // Enregistrer dans le local storage

        //Première fois
        const firstTime = localStorage.getItem('products');

        if (firstTime) {
            const products = []
            products.push({
                id: product._id,
                color,
                qty
            })
            localStorage.setItem('products', JSON.stringify(products));
            alert('ce produit a été ajouté pour la première fois dans votre panier.')
            return;
        }

        //Est-ce que le produit existe dans le localStorage
        let storage = JSON.parse(localStorage.getItem('products'));

        const productExists = storage.find(a => a.id == product._id && color === a.color)

        if (!productExists) {
            storage.push({
                id: product._id,
                color,
                qty
            })
            localStorage.setItem('products', JSON.stringify(products));
            alert('ce produit a été ajouté pour la deuxième fois dans votre panier mais une couleur différente.')
            return;
        }

        productExists.qty = Number(productExists.qty) + Number(qty)
        localStorage.setItem('products', JSON.stringify(products));
        alert('ce produit a été ajouté pour la deuxième fois dans votre panier avec la même couleur.')


    })

}





function display(product) {
    const img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    document.querySelector('.item__img').appendChild(img)

    document.querySelector('#title').innerHTML += product.name;
    document.querySelector('#price').innerHTML += product.price;
    document.querySelector('#description').innerHTML += product.description;
    for (let i = 0; i < product.colors.length; i++)
        document.querySelector('#colors').innerHTML += '<option>' + product.colors[i] + '</option>';

    /*const title = document.createElement('h1');
    title.setAttribute('src', product.name);
    document.querySelector('.title').appendChild(title)

    const price = document.createElement('span');
    price.setAttribute('src', product.price);
    document.querySelector('#price').appendChild(price)

    const description = document.createElement('p');
    description.setAttribute('src', product.description);
    document.querySelector('#description').appendChild(description)

    const colors = document.createElement('option');
    colors.setAttribute('src', product.colors);
    document.querySelector('#colors').appendChild(colors)*/
}