const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("imageUrl");

const form = document.getElementById("product-form");
const myURL = "https://striveschool-api.herokuapp.com/api/product";

const addressBarContent = new URLSearchParams(location.search);

const productId = addressBarContent.get("productId");
console.log(productId);

if (productId) {
  // cambiamo il titolo del form
  document.getElementById("form-title").innerText = "Form di modifica evento";
  // recupero le informazioni da riempire nel form con una fetch() CHIRURGICA
  fetch(myURL + productId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "non sono riuscito a recuperare l'evento per ripopolare il form"
        );
      }
    })
    .then((singleProduct) => {
      // ho ottenuto i dettagli di un singolo concerto!
      // ripopolo il form
      nameInput.value = singleProduct.name;
      descriptionInput.value = singleProduct.description;
      brandInput.value = singleProduct.brand;

      priceInput.value = singleProduct.price;
      imageUrlInput.value = singleProduct.imageUrl;
    })
    .catch((err) => {
      console.log(err);
    });
}

// sovrascrivo il comportamento di default del form
form.addEventListener("submit", function (e) {
  e.preventDefault(); // evitiamo che la pagina si aggiorni!
  // ora raccolgo i dati del form
  // genero un oggetto

  // la FORMA (schema) dell'oggetto da inviare alle API non è a caso!
  // è stata pensata dal backender che ha creato l'API
  // in genere, vi verrà fornita

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    price: priceInput.value,
    imageUrl: imageUrlInput.value,
  };

  console.log("ecco i dati raccolti dal form che sto per inviare:", newProduct);

  // ora facciamo una fetch() però NON con il metodo GET (che riceve dati), ma con POST (che crea una nuova entità)

  // URL DA UTILIZZARE
  // per GET e POST l'indirizzo da utilizzare è lo stesso!

  // se siamo in modalità modifica, la fetch sul bottone di submit va modificata:
  // 1) il metodo non sarà più POST ma sarà PUT
  // 2) dovrei cambiare l'URL da "indirizzo generico" a "indirizzo specifico"

  let URLToUse;
  let methodToUse;

  if (productId) {
    methodToUse = "PUT";
    URLToUse = myURL + productId;
  } else {
    methodToUse = "POST";
    URLToUse = myURL;
  }

  fetch(URLToUse, {
    method: methodToUse, // alcune volte sarà PUT
    // method: concertId ? 'PUT' : 'POST', // alcune volte sarà PUT, metodo extreme delle 13:11 con operatore ternario
    body: JSON.stringify(newProduct), // il body in una fetch può essere SOLAMENTE una stringa
    headers: {
      "Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDNjNTE4N2U1YzAwMTgxNGM2MzMiLCJpYXQiOjE3MDU2NTcyODUsImV4cCI6MTcwNjg2Njg4NX0.QajPDom7fZ4_g7HJBlYYz1f4U-THv-WSIdyg8IrDCig",
      // se avessimo un'autenticazione, la inseriremmo con una proprietà Authorization
      "Content-Type": "application/json", // informiamo l'API che , nonostante il body sia una stringa, in origina era un oggetto
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        // il concerto è stato creato correttamente!
        alert("prodotto SALVATO!");
        // svuoto il form
        nameInput.value = "";
        descriptionInput.value = "";
        brandInput.value = "";
        priceInput.value = "";
        imageUrlInput.value = "";
      } else {
        alert("PROBLEMA NEL SALVATAGGIO!");
        // hai sbagliato qualcosa nella richiesta?
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
