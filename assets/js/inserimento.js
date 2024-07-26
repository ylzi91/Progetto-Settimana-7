const vhsId = new URLSearchParams(location.search).get('vhsId')
// eventId può essere O una stringa, O null
console.log('EVENTID', vhsId)

if (vhsId) {

    fetch('https://striveschool-api.herokuapp.com/api/product/' + vhsId, {
        method: 'GET',
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTlmN2YyNjBjYzAwMTVjYzBkZDgiLCJpYXQiOjE3MjE5ODE0MzEsImV4cCI6MTcyMzE5MTAzMX0.V0DjmVnCBOx7_b0cAXEgG___uVbNpJ2GCZ_B8abFOxk",
        }
    })
        .then((response) => {
            if (response.ok) {
                // la chiamata è andata a buon fine
                return response.json()
            } else {
                throw new Error('errore nel recupero del singolo concerto')
            }
        })
        .then((singleProduct) => {
            console.log(singleProduct)
            document.getElementById('name').value = singleProduct.name
            document.getElementById('description').value = singleProduct.description
            document.getElementById('brand').value = singleProduct.brand
            document.getElementById('price').value = parseInt(singleProduct.price)
            document.getElementById('imgUrl').value = singleProduct.imageUrl
            document.getElementsByClassName('btn')[0].innerText = 'Modifica Prodotto'
        })
        .catch((err) => {
            console.log(err)
        })
}

class Product {
    constructor(_name, _description, _price, _brand, _imageUrl) {
        this.name = _name
        this.description = _description
        this.price = _price
        this.brand = _brand
        this.imageUrl = _imageUrl

    }
}

const eventForm = document.getElementById('event-form')
eventForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const brand = document.getElementById('brand').value
    const imageUrl = document.getElementById('imgUrl').value




    const newProduct = new Product(
        name,
        description,
        price,
        brand,
        imageUrl
    )

    let methodToUse
    if (vhsId) {
        // modalità modifica
        methodToUse = 'PUT'
    } else {
        // modalità creazione
        methodToUse = 'POST'
    }


    const URL = 'https://striveschool-api.herokuapp.com/api/product/'

    let URLToUse
    if (vhsId) {
        // modalità modifica
        URLToUse = URL + vhsId
    } else {
        // modalità creazione
        URLToUse = URL
    }

    fetch(URLToUse, {

        method: methodToUse,

        body: JSON.stringify(newProduct),
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzNTlmN2YyNjBjYzAwMTVjYzBkZDgiLCJpYXQiOjE3MjE5ODE0MzEsImV4cCI6MTcyMzE5MTAzMX0.V0DjmVnCBOx7_b0cAXEgG___uVbNpJ2GCZ_B8abFOxk",
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                const myDiv = document.getElementsByClassName('col-12')[0]
                const mySpan = document.createElement('span')
                mySpan.innerText = vhsId ? 'Modificato Correttamente' : 'Salvato Correttamente'
                mySpan.classList.add('text-success')
                myDiv.appendChild(mySpan)
                eventForm.reset()

                
                
            } else {
                alert('ERRORE NEL SALVATAGGIO!')
                throw new Error('Errore nel salvataggio del concerto')
            }
        })
        .catch((err) => {
            console.log('ERRORE', err)
        })
})