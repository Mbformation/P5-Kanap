import { get } from "./utils.js";

function initForm() {
    listenForSubmission()

}

function listenForSubmission() {
    document.querySelector('order').addEventListener('click', async (e) => {
        e.preventDefault();
        const firstNameInput = document.querySelector('#firstName')
        const lastNameInput = document.querySelector('#lastName')
        const emailInput = document.querySelector('#email')
        const addressInput = document.querySelector('#address')
        const cityInput = document.querySelector('#city')

        if (
            !isFirstNameElValid(firstNameInput) ||
            !isLastNameElValid(lastNameInput) ||
            !isEmailElValid(emailInput) ||
            !isAddressElValid(addressInput) ||
            !isCityElValid(cityInput)

        ) {
            console.log('Erreur Input')
            return;
        }
        const payload = {
            contact: {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                address: addressInput.value,
                city: cityInput.value,
                email: emailInput.value,
            },
            products: get('products').map(a => a.id)
        }

        const result = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())

        location.href = `confirmation.html?orderId=${result.orderID}`
    })
}

function isFirstNameElValid(input) {
    hideError(input)
    if (input.value.length < 5) {
        showError(input, "Le prénom n'est pas valide")
        return false;
    }
    return true;
}

function isLastNameElValid(input) {
    hideError(input)
    if (input.value.length < 3) {
        showError(input, "Le nom de famille n'est pas valide")
        return false;
    }
    return true;
}

function isEmailElValid(input) {
    hideError(input)

    const isValid = String(input.value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!isValid) {
        showError(input, "L'email n'est pas valide")
        return false;
    }
    return true;
}

function isAddressElValid(input) {
    hideError(input)
    if (input.value.length < 10) {
        showError(input, "L'adresse n'est pas valide")
        return false;
    }
    return true;
}

function isCityElValid(input) {
    hideError(input)
    if (input.value.length < 5) {
        showError(input, "La ville n'est pas valide")
        return false;
    }
    return true;
}

function showError(input, message) {
    input.nextElementSibling.innerText = message;
}

function hideError(input, message) {
    input.nextElementSibling.innerText = '';
}


export { initForm }