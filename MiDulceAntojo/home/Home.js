const productosPorCategoria = {
  pasteles: [
    { precio: "$ 231", nombre: "Pastel de chocolate" },
    { precio: "$ 890", nombre: "Pastel de fresa" },
    { precio: "$ 565", nombre: "Pastel de vainilla" },
    { precio: "$ 340", nombre: "Pastel red velvet" },
    { precio: "$ 410", nombre: "Pastel tres leches" },
    { precio: "$ 275", nombre: "Pastel de limón" },
    { precio: "$ 231", nombre: "Pastel de chocolate" },
    { precio: "$ 890", nombre: "Pastel de fresa" },
    { precio: "$ 565", nombre: "Pastel de vainilla" },
    { precio: "$ 340", nombre: "Pastel red velvet" },
    { precio: "$ 410", nombre: "Pastel tres leches" },
    { precio: "$ 275", nombre: "Pastel de limón" },
  ],
  galletas: [
    { precio: "$ 45", nombre: "Galleta de avena" },
    { precio: "$ 50", nombre: "Galleta de chispas" },
    { precio: "$ 38", nombre: "Galleta de mantequilla" },
  ],
  postres: [
    { precio: "$ 120", nombre: "Flan de vainilla" },
    { precio: "$ 95", nombre: "Mousse de chocolate" },
    { precio: "$ 150", nombre: "Tiramisú" },
  ],
};

function abrirListaProductos(categoria) {
  fetch("./listaProductos/ListaProductos.html")
    .then((respuesta) => respuesta.text())
    .then((html) => {
      const modalContainer = document.getElementById("modalContainer");
      modalContainer.innerHTML = html;

      document.getElementById("categoriaTitulo").textContent = categoria;

      const productos = productosPorCategoria[categoria] || [];
      const grid = document.getElementById("gridProductos");

      grid.innerHTML = productos
        .map(
          (producto) => `
            <div class="productoItem">
              <div class="productoImagen"></div>
              <p class="productoPrecio">${producto.precio}</p>
              <p class="productoNombre">${producto.nombre}</p>
            </div>
          `,
        )
        .join("");

      document
        .getElementById("contenidoPrincipal")
        .classList.add("blurBackground");
      document.body.classList.add("modalAbierto");
    })
    .catch((error) => console.error("Error al cargar ListaProductos:", error));
}

function cerrarListaProductos() {
  document.getElementById("modalContainer").innerHTML = "";
  document
    .getElementById("contenidoPrincipal")
    .classList.remove("blurBackground");
  document.body.classList.remove("modalAbierto");
}
