const data = await getData();

display(data)

function display(data) {
    let html = '';

    data.forEach(product => {
        html += renderProduct(product)
    });

    document.querySelector('#items').innerHTML = html
}

function renderProduct(product) {
    return `
    <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>`;
}

async function getData() {
    return fetch('http://localhost:3000/api/products').then((res) => res.json())
}