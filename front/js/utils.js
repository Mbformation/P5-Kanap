function getFromUrl(key) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    return params[key];
}


async function getData(url) {
    return fetch(url).then((res) => res.json())
}

export { getFromUrl, getData };