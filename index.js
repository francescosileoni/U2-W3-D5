// recupero i dati con una fetch

const generateCards = function (arrayOfShoes) {
  // manipolazione del DOM
  arrayOfShoes.forEach((product) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-md-4", "col-lg-3");
    newCol.innerHTML = `
          <div class="card h-100">
              <img src="https://img01.ztat.net/article/spp-media-p1/50dc675d61474d7da058651b2b4ec1c9/85c34de6176544089418efb3eea1c841.jpg?imwidth=1800&filter=packshot" class="card-img-top" alt="...">
              <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text flex-grow-1">${product.description}</p>
                  <p class="card-text">${product.brand}</p>
                  <p class="card-text">${product.imagUrl}</p>
                  <a href="#" class="btn btn-primary"><i class="bi bi-cart-check me-2"></i>${
                    product.price || "?"
                  }€</a>
                  <a href="./details.html?productId=${
                    product._id
                  }" class="btn btn-success mt-2"><i class="bi bi-caret-right"></i></i>
                   VAI AI DETTAGLI 
                  </a>
              </div>
          </div>
          `;
    // ci manca solo da appendere questa col alla row degli eventi
    const eventsRow = document.getElementById("events-row");
    eventsRow.appendChild(newCol);
  });
};

const getShoes = function () {
  const myURL = "https://striveschool-api.herokuapp.com/api/product";
  fetch(myURL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDNjNTE4N2U1YzAwMTgxNGM2MzMiLCJpYXQiOjE3MDU2NTcyODUsImV4cCI6MTcwNjg2Njg4NX0.QajPDom7fZ4_g7HJBlYYz1f4U-THv-WSIdyg8IrDCig",
    },
  })
    .then((response) => {
      // tutto bene, ho ottenuto una response dal server
      console.log("response", response);
      if (response.ok) {
        // ci informa che la chiamata ha avuto esito positivo es. 200
        // solo qui posso "provare" ad estrarre il JSON trasportato (i dati)
        return response.json();
      } else {
        // mi auto-lancio nel catch() per comodità
        throw new Error("errore nella chiamata");
      }
    })
    .then((data) => {
      console.log("DATA", data);
      // in questo blocco then abbiamo accesso a "data"
      // con "data" noi ora manipoleremo il DOM e creeremo le cards/slides per mostrare i concerti disponibili
      generateCards(data);
    })
    .catch((err) => {
      // il server non è stato contattato oppure sono finito qui dentro
      // perchè ho generato artificialmente un errore
      console.log(err);
    });
};
getShoes();

