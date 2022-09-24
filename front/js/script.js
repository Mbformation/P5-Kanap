fetch('http://localhost:3000/api/products').then(function (res) {
    return res.json();
}).then(function (a) {
    console.log(a)
})