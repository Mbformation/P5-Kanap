function getFromUrl(key) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    return params[key];
}


async function getData(url) {
    return fetch(url).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        return new Error();
    })
}

function get(key) {
    if (!localStorage.getItem(key)) {
        return null;
    }
    return JSON.parse(localStorage.getItem(key));
}

function store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function money(value) {
    const formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    });

    return formatter.format(value);
}

export { getFromUrl, getData, get, money, store };