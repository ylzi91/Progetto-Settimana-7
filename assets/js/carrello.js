

myProd = JSON.parse(localStorage.getItem('myProdName'))
console.log(myProd)
const prodRow = document.getElementById('prodRow')
myProd.forEach(element => {
    prodRow.innerHTML += ` <div class="col mb-3">
                    ${element.name}
                    ${element.price}
                    ${element.imageUrl}
                </div>`
});