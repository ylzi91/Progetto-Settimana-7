const myAdmin = document.getElementById('myAdmin')
const myProdArray = []
const CartArray = []
myAdmin.addEventListener('click', function (e) {
    e.target.innerText = e.target.innerText === 'Sono amministratore' ? 'Non sono amministratore' : 'Sono amministratore'
    const btnMod = document.querySelectorAll('.btnMod')
    const btnDel = document.querySelectorAll('.btnDel')
    const crateLink = document.getElementById('createLink')
    crateLink.classList.toggle('d-none')
    for (let i = 0; i < btnMod.length; i++) {
        btnMod[i].classList.toggle('d-none')
        btnDel[i].classList.toggle('d-none')
    }

})

const getProduct = function () {
    // fetch!
    const URL = 'https://striveschool-api.herokuapp.com/api/product'
    fetch(URL, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTlmN2YyNjBjYzAwMTVjYzBkZDgiLCJpYXQiOjE3MjE5ODE0MzEsImV4cCI6MTcyMzE5MTAzMX0.V0DjmVnCBOx7_b0cAXEgG___uVbNpJ2GCZ_B8abFOxk"
        }

    })
        .then((response) => {
            console.log(response)
            if (response.ok) {
                // OK!
                // proseguiamo, e cerchiamo di estrarre il JSON da questa response!
                return response.json()
            } else {
                // qua il server ci risponde! però non abbiamo quello che cercavamo,
                // perchè l'indirizzo era sbagliato, non siamo autorizzati a vedere i concerti etc.
                throw new Error('Errore nella chiamata, response non OK')
            }
        })
        .then((arrayProduct) => {
            const prodRow = document.getElementById('prodRow')
            prodRow.innerHTML = ''
            showProduct(arrayProduct, prodRow)
        })
        .catch((error) => {
            // non c'è internet, oppure il server proprio non esiste!
            console.log('ERRORE!', error)
        })

}

function showProduct(myArray = [], prodRow) {

    myArray.forEach((product, index) => {
        myProdArray.push(product)
        const newProdCol = `
        <div class="col mb-3">
                    <div class="card">
                        <img src="${product.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text"> Brand: ${product.brand}</p>
                            <p class="card-text"><a href = "./dettagli.html?vhsId=${product._id}" class= " btn border border-black rounded-0 ">Vedi dettagli</a></p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary d-flex w-75 mx-auto flex-column">
                                <button onclick = "buyProd(${index}, event)" class="btn btn-success mb-2">Compra</button>
                                <a href = "./Inserimento.html?vhsId=${product._id}" class="btn btnMod btn-warning d-none mb-2">Modifica</a>
                                <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick = "deleteItem('${product._id}')" class="btn btnDel btn-danger d-none mb-2">Elimina</button>
                            </small>
                        </div>
                    </div>
                </div>
        `

        prodRow.innerHTML += newProdCol
    })

   

}
getProduct()

function deleteItem(idDelProduct) {
    const confirmDel = document.getElementById('confirmDel')
    confirmDel.addEventListener('click', function () {
        const URL = 'https://striveschool-api.herokuapp.com/api/product/' + idDelProduct
        fetch(URL, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTlmN2YyNjBjYzAwMTVjYzBkZDgiLCJpYXQiOjE3MjE5ODE0MzEsImV4cCI6MTcyMzE5MTAzMX0.V0DjmVnCBOx7_b0cAXEgG___uVbNpJ2GCZ_B8abFOxk"
            }

        })
            .then(() => getProduct())
    })

}

function buyProd(index, e){
    e.target.disabled = true
    CartArray.push({
        name: myProdArray[index].name,
        price: myProdArray[index].price,
        imageUrl: myProdArray[index].imageUrl
    })
    localStorage.setItem('myProdName', JSON.stringify(CartArray))

}

