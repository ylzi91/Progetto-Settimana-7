
const vhsId = new URLSearchParams(location.search).get('vhsId')
console.log('EVENTID', vhsId)
const getDetail = function () {
    // fetch!

    fetch('https://striveschool-api.herokuapp.com/api/product/' + vhsId, {
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
    .then((singleProduct) => {
        showProduct(singleProduct)
    })
    .catch((error) => {
        // non c'è internet, oppure il server proprio non esiste!
        console.log('ERRORE!', error)
    })
    

}

function showProduct(myProduct) {
    const prodRow = document.getElementById('prodRow')
    const span = document.getElementsByTagName('span')[1]
    span.innerText = myProduct.name

        prodRow.innerHTML = `
        <div class="col">
                    <div class="card">
                        <img src="${myProduct.imageUrl}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${myProduct.name}</h5>
                            <p class="card-text"> Brand: ${myProduct.brand}</p>
                            <p class="card-text">${myProduct.description}</p>
                            <p class="card-text">${myProduct.price}€</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">
                                <button class="btn btn-success">Compra</button>
                            </small>
                        </div>
                    </div>
                </div>
        `

}

getDetail()