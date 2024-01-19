// questa pagina deve mostrare i dettagli di SOLAMENTE un evento
// come capisco dalla pagina details da quale evento provengo???
// capiamo da dove provengo perchè mi sto passando nell'URL l'_id dell'evento che intendo mostrare

// ora cosa devo fare? devo recuperare quell'id dalla barra degli indirizzi
// una volta che ho l'id, posso fare una fetch() con metodo GET per recuperare le informazioni di quel concerto

// recuperiamo l'ID dalla barra degli indirizzi
const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
// estrapolo dai parametri dell'indirizzo quello che in index.js ho chiamato "concertId"
const productId = addressBarContent.get("productId");
console.log(productId);

// abbiamo recuperato l'id del concerto!
// ora, faccio una get molto specifica (utilizzando questo ID) per recuperare l'oggetto del concerto in questione

const myURL = "https://striveschool-api.herokuapp.com/api/product";

fetch(myURL + productId,{
 
    headers: {
      "Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDNjNTE4N2U1YzAwMTgxNGM2MzMiLCJpYXQiOjE3MDU2NTcyODUsImV4cCI6MTcwNjg2Njg4NX0.QajPDom7fZ4_g7HJBlYYz1f4U-THv-WSIdyg8IrDCig",
  }
}) // 'https://striveschool-api.herokuapp.com/api/agenda/65a900b72c3f480018af82a9'
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nella chiamata");
    }
  })
  .then((singleProduct) => {
    console.log(singleProduct);
    // modifichiamo la card sulla base dei dati che abbiamo ottenuto da questa GET "chirurgica"
    document.getElementById("name").innerText = singleProduct.name;
    document.getElementById("description").innerText =
      singleProduct.description;
    document.getElementById("brand").innerText = singleProduct.brand;
    document.getElementById("price").innerText = singleProduct.price + "€";
    document.getElementById("imageUrl").innerText = singleProduct.imageUrl;

    // TASTO DELETE
    document.getElementById("delete").addEventListener("click", function () {
      // per eliminare una risorsa, è solamente necessario operare una fetch() con method 'DELETE'
      // myURL ? NO
      // myURL + / + concertId
      fetch(myURL +  productId, {
        headers: {
          "Authorization":
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDNjNTE4N2U1YzAwMTgxNGM2MzMiLCJpYXQiOjE3MDU2NTcyODUsImV4cCI6MTcwNjg2Njg4NX0.QajPDom7fZ4_g7HJBlYYz1f4U-THv-WSIdyg8IrDCig",
        },
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // cancellazione andata a buon fine
            alert("cancellato!");
            location.assign("./index.html"); // riportiamo l'utente in home :)
          } else {
            alert("problema nella cancellazione ");
            throw new Error("errore nella cancellazione");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // TASTO MODIFICA
    document
      .getElementById("edit")
      .setAttribute("href", "./backoffice.html?productId=" + singleProduct._id);
  })
  .catch((err) => {
    console.log(err);
  });

// GET su myURL -> TUTTI I CONCERTI (array)
// GET SU myURL / id -> SINGOLO CONCERTO (oggetto)
