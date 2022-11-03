import { getFromUrl, getData, money, get, store } from "./utils.js";

// Récupérer l'id
let id = getFromUrl('id');

try {
    // Récupérer les données du produit
    const product = await getData('http://localhost:3000/api/products/' + id);

    // Afficher le produit
    display(product)


    // Ecouter l'ajout au panier
    listenForCartAddition(product);

} catch (e) {
    // Si erreur, on affiche un message d'alerte
    document.querySelector('main').innerHTML = "<h1>Le produit sélectionné n'existe pas</h1>"
}



// On écoute le souhait d'utilisateur d'ajouter un produit au panier
function listenForCartAddition(product) {

    document.querySelector('#addToCart').addEventListener('click', () => {

        const color = document.querySelector('#colors').value; // On récupère la couleur souhaitée

        const qty = Number(document.querySelector('#quantity').value); // On récupère la quantité souhaitée

        // On vérifie qu'une couleur a bien été sélectionnée
        if (color === "") {
            alert('Veuillez sélectionner une couleur')
            return;
        }
        // On vérifie que la couleur choisie existe bien
        if (!product.colors.includes(color)) {
            alert('Veuillez sélectionner une couleur existante')
            return;
        }
        // On vérifie qu'une quantité a été choisie
        if (qty === '') {
            alert('Veuillez sélectionner une quantité')
            return;
        }
        // On vérifie que la quantité est comprise entre 1 et 100
        if (qty < 1 || qty > 100) {
            alert('Veuillez sélectionner une quantité comprise entre 1 et 100')
            return;
        }

        // Enregistrer dans le panier

        // On vérifie si le panier est vide
        const isFirstTime = !get('products');

        if (isFirstTime) {
            const products = [];
            products.push({
                id: product._id,
                color,
                qty
            })
            // On enregistre dans le panier
            store('products', products);
            alert("Bravo vous venez d'ajouter un produit pour la première fois. Vous serez redirigé vers la page d'accueil.")
            window.location.href = "/"
            return;
        }

        let storage = get('products');


        const productExists = storage.find(a => a.id == product._id && color === a.color)
        // Si le produit n'existe pas dans le panier
        if (!productExists) {
            storage.push({
                id: product._id,
                color,
                qty
            })
            // On enregistre dans le panier
            store('products', storage);
            alert("Bravo vous venez d'ajouter un produit au panier. Vous serez redirigé vers la page d'accueil.")
            window.location.href = "/"
            return;
        }
        // Si le produit existe dans le panier
        productExists.qty = Number(productExists.qty) + Number(qty)
        // On enregistre dans le panier
        store('products', storage);
        alert("Ce produit a déjà été ajouté dans votre panier avec la même couleur. Vous serez redirigé vers la page d'accueil.")
        window.location.href = "/"


    })
}



// On affiche le produit
function display(product) {
    const img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    document.querySelector('.item__img').appendChild(img);

    const title = document.querySelector('#title');
    title.innerText = product.name;

    const price = document.querySelector('#price')
    price.innerText = money(product.price);

    const description = document.querySelector('#description')
    description.innerText = product.description;

    product.colors.forEach(color => {
        document.querySelector('#colors').innerHTML += `<option>${color}</option>`;
    })

}