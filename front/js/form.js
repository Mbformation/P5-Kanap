import { get } from "./utils.js";

// On écoute la soumission du formulaire
function initForm() {
    document.querySelector('#order').addEventListener('click', async (e) => {
        e.preventDefault();
        // On récupère les éléments DOM du formulaire
        const firstNameInput = document.querySelector('#firstName')
        const lastNameInput = document.querySelector('#lastName')
        const emailInput = document.querySelector('#email')
        const addressInput = document.querySelector('#address')
        const cityInput = document.querySelector('#city')

        // On valide le formulaire
        if (
            !isFirstNameElValid(firstNameInput) ||
            !isLastNameElValid(lastNameInput) ||
            !isAddressElValid(addressInput) ||
            !isCityElValid(cityInput) ||
            !isEmailElValid(emailInput)

        ) {
            return;
        }
        // On prépare le corps de la requête
        const payload = {
            contact: {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                address: addressInput.value,
                city: cityInput.value,
                email: emailInput.value,
            },
            products: get('products').map(a => a.id) // on récupère uniquement les ID de chaque produit
        }

        // On envoie les données à l'API
        const result = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
        // On redirige vers la page confirmation avec le numéro de commande dans l'url
        location.href = `confirmation.html?orderId=${result.orderId}`
    })
}

// On valide le prénom en permettant les accents, les traits d'union et apostrophes pour un maximum de trois mots
function isFirstNameElValid(input) {
    hideError(input)

    const isValid = String(input.value).toLowerCase().match(/^[a-zéèêçïîôà\']{2,50}(-| )?([a-zé\'èêçïîôà]{2,50})?(-| )?([a-zé\'èêçïîôà]{2,50})?$/g);
    if (!isValid) {
        showError(input, "Le prénom n'est pas valide")
        return false;
    }
    return true;
}
// On valide le nom en permettant les accents, les traits d'union et apostrophes pour un maximum de trois mots

function isLastNameElValid(input) {
    hideError(input)

    const isValid = String(input.value).toLowerCase().match(/^[a-zéèêçïîôà\']{2,50}(-| )?([a-zé\'èêçïîôà]{2,50})?(-| )?([a-zé\'èêçïîôà]{2,50})?$/g);
    if (!isValid) {
        showError(input, "Le nom de famille n'est pas valide")
        return false;
    }
    return true;
}
// On valide l'email afin d'avoir au moins un arobase, un point...
function isEmailElValid(input) {
    hideError(input)

    const isValid = String(input.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!isValid) {
        showError(input, "L'email n'est pas valide")
        return false;
    }
    return true;
}

// On vérifie qu'il y a au moins 5 caractères sans espace
function isAddressElValid(input) {
    hideError(input)
    if (input.value.trim(" ").length < 5) {
        showError(input, "L'adresse n'est pas valide")
        return false;
    }
    return true;
}
// On vérifie qu'il y a au moins 3 caractères sans espace

function isCityElValid(input) {
    hideError(input)
    if (input.value.trim(" ").length < 3) {
        showError(input, "La ville n'est pas valide")
        return false;
    }
    return true;
}

// On affiche une erreur avec un message
function showError(input, message) {
    input.nextElementSibling.innerText = message;
}

// On cache l'erreur
function hideError(input) {
    input.nextElementSibling.innerText = '';
}


export { initForm }