import { getFromUrl } from "./utils.js";

const orderId = getFromUrl('orderId');
document.querySelector('#orderId').innerText = orderId;
localStorage.clear()