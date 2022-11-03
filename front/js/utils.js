// On récupère les données passées dans l'url
function getFromUrl(key) {
    const params = new URLSearchParams(window.location.search)
    return params.get(key);

}

// Requête Http vers l'API
async function getData(url) {
    return fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    })
        .catch(error => {
            alert("Une erreur est survenue. Veuillez vérifier votre connexion.")
        })
}

// On récupère une donnée du local storage, en format utilisable par javascript
function get(key) {
    if (!localStorage.getItem(key)) {
        return null;
    }
    return JSON.parse(localStorage.getItem(key));
}

// On enregistre dans le local storage la paire clé-valeur
function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// On formatte les prix adaptés aux clients français
function money(value) {
    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    });

    return formatter.format(value);
}

export { getFromUrl, getData, get, money, store };