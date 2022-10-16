import { getFromUrl, getData } from "./utils.js";

// Récupérer l'id
let id = getFromUrl('id');

// Récupérer les données du produit
try {
    const product = await getData('http://localhost:3000/api/products/' + id);

    // Afficher le produit
    display(product)


    // Ecouter l'ajout au panier
    listenForCartAddition(product);

} catch (e) {
    document.querySelector('main').innerHTML = "<h1>Le produit sélectionné n'existe pas</h1>"
}




function listenForCartAddition(product) {

    document.querySelector('#addToCart').addEventListener('click', () => {

        const color = document.querySelector('#colors').value;

        const qty = Number(document.querySelector('#quantity').value);

        if (color === "") {
            alert('Veuillez sélectionner une couleur')
            return;
        }

        if (!product.colors.includes(color)) {
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
        const firstTime = !localStorage.getItem('products');

        if (firstTime) {
            const products = [];
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
            localStorage.setItem('products', JSON.stringify(storage));
            alert('ce produit a été ajouté pour la deuxième fois dans votre panier mais une couleur différente.')
            return;
        }

        productExists.qty = Number(productExists.qty) + Number(qty)
        localStorage.setItem('products', JSON.stringify(storage));
        alert('ce produit a été ajouté pour la deuxième fois dans votre panier avec la même couleur.')


    })

}




function display(product) {
    const img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    document.querySelector('.item__img').appendChild(img);

    const title = document.querySelector('#title');
    title.innerText = product.name;

    const price = document.querySelector('#price')
    price.innerText = product.price;

    const description = document.querySelector('#description')
    description.innerText = product.description;

    product.colors.forEach(color => {
        document.querySelector('#colors').innerHTML += `<option>${color}</option>`;
    })

}