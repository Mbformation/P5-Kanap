import { getFromUrl, getData } from "./utils.js";

// Récupérer l'id
let id = getFromUrl('id');

// Récupérer les données du produit
const data = await getData('http://localhost:3000/api/products/' + id);
// Afficher le produit

// Ecouter l'ajout au panier