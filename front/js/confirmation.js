import { getFromUrl } from "./utils.js";

// on récupère le numéro de commande de l'url 
const orderId = getFromUrl('orderId');
// on l'affiche dans le DOM
document.querySelector('#orderId').innerText = orderId;
// On vide le panier complètement
localStorage.clear()