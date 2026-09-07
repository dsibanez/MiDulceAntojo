const productosLista = {
  pasteles: [
    { precio: "$ 231", nombre: "Pastel de chocolate", id: "pastel-chocolate", imagen: "../imagenes/pastel chocolate.jpg", descripcion: "Delicioso pastel de chocolate con capas de bizcocho esponjoso y relleno de crema de chocolate." },
    { precio: "$ 890", nombre: "Pastel de fresa", id: "pastel-fresa", imagen: "../imagenes/pastel fresa.jpg", descripcion: "Delicioso pastel de fresa con capas de bizcocho esponjoso y relleno de crema de fresa." },
    { precio: "$ 565", nombre: "Pastel de vainilla", id: "pastel-vainilla", imagen: "../imagenes/pastel vainilla.jpg", descripcion: "Delicioso pastel de vainilla con capas de bizcocho esponjoso y relleno de crema de vainilla." },
    { precio: "$ 340", nombre: "Pastel red velvet", id: "pastel-red-velvet", imagen: "../imagenes/pastel red velvet.jpg", descripcion: "Delicioso pastel red velvet con capas de bizcocho esponjoso y relleno de crema de red velvet." },
    { precio: "$ 410", nombre: "Pastel tres leches", id: "pastel-tres-leches", imagen: "../imagenes/pastel tres leches.jpg", descripcion: "Delicioso pastel tres leches con capas de bizcocho esponjoso y relleno de crema de tres leches." },
    { precio: "$ 275", nombre: "Pastel de limón", id: "pastel-limon", imagen: "../imagenes/pastel limon.jpg", descripcion: "Delicioso pastel de limón con capas de bizcocho esponjoso y relleno de crema de limón." },
  ],
  galletas: [
    { precio: "$ 45", nombre: "Galleta de avena", id: "galleta-avena", imagen: "../imagenes/galleta avena.jpg", descripcion: "Galleta crujiente de avena." },
    { precio: "$ 50", nombre: "Galleta de chispas", id: "galleta-chispas", imagen: "../imagenes/galleta chispas.jpg", descripcion: "Galleta clásica con chispas de chocolate." },
    { precio: "$ 38", nombre: "Galleta de mantequilla", id: "galleta-mantequilla", imagen: "../imagenes/galleta mantequilla.jpg", descripcion: "Suave galleta de mantequilla artesanal." },
  ],
  postres: [
    { precio: "$ 120", nombre: "Flan de vainilla", id: "flan-vainilla", imagen: "../imagenes/flan.jpg", descripcion: "Flan casero con caramelo." },
    { precio: "$ 95", nombre: "Mousse de chocolate", id: "mousse-chocolate", imagen: "../imagenes/mousse.jpg", descripcion: "Cremoso mousse de chocolate amargo." },
    { precio: "$ 150", nombre: "Tiramisú", id: "tiramisu", imagen: "../imagenes/tiramisu.jpg", descripcion: "Postre italiano con café y queso mascarpone." },
  ],
};

const productosPorCategoria = {
  pasteles: [
    { precio1: "$ 231", nombre1: "Pastel personalizado", id1: "pasteles-personalizados", imagen1: "../imagenes/pastel personalizado.webp", descripcion1: "personaliza tu pastel" },
    { precio1: "$ 890", nombre1: "Pastel cumpleaños", id1: "pastel-cumpleaños", imagen1: "../imagenes/pastel cumpleaños.jpg", descripcion1: "Los mejores pasteles, perfectos para una ocasion especial." },
    { precio1: "$ 565", nombre1: "Pastel sabores irresistibles", id1: "pastel-irresistible", imagen1: "../imagenes/sabores irresistibles.jpg", descripcion1: "no se que poner." },
  ],
  galletas: [
    { precio1: "$ 45", nombre1: "Galletas de chocolate", id1: "galleta-chocolate", imagen1: "../imagenes/galletas chocolate.jpg", descripcion1: "Galleta crujiente de chocolate." },
    { precio1: "$ 50", nombre1: "Galletas artesanales", id1: "galleta-artesanales", imagen1: "../imagenes/galletas artesanales.jpg", descripcion1: "Galleta artesanal, un sabor nuevo." },
    { precio1: "$ 38", nombre1: "Galletas decoradas", id1: "galleta-decoradas", imagen1: "../imagenes/galletas decoradas.jpg", descripcion1: "Galleta decorada con azúcar glass." },
  ],
  postres: [
    { precio1: "$ 120", nombre1: "Cheesecakes", id1: "cheesecake", imagen1: "../imagenes/cheesecake.jpg", descripcion1: "Flan casero con caramelo." },
    { precio1: "$ 95", nombre1: "Postres de chocolate", id1: "postres-chocolate", imagen1: "../imagenes/postres chocolate.png", descripcion1: "Cremoso mousse de chocolate amargo." },
    { precio1: "$ 150", nombre1: "postres artesanales", id1: "postres-artesanales", imagen1: "../imagenes/postres artesanales.jpg", descripcion1: "Postre artesanal con café y queso mascarpone." },
  ],
};

/* =========================
   LISTA DE PRODUCTOS (VER MÁS)
   ========================= */

function abrirListaProductos(categoria) {
  fetch("./listaProductos/ListaProductos.html")
    .then((respuesta) => respuesta.text())
    .then((html) => {
      const modalContainer = document.getElementById("modalContainer");
      modalContainer.innerHTML = html;

      document.getElementById("categoriaTitulo").textContent = categoria;

      const productos = productosLista[categoria] || [];
      const grid = document.getElementById("gridProductos");

      grid.innerHTML = productos
        .map(
          (producto) => `
            <div class="productoItem" onclick="abrirDetallePorId('${categoria}', '${producto.id}')">
              <div class="productoImagen" style="background-image: url('${producto.imagen}')"></div>
              <p class="productoPrecio">${producto.precio}</p>
              <p class="productoNombre">${producto.nombre}</p>
            </div>
          `
        )
        .join("");

      document.getElementById("contenidoPrincipal").classList.add("blurBackground");
      document.body.classList.add("modalAbierto");
    })
    .catch((error) => console.error("Error al cargar ListaProductos:", error));
}

function cerrarListaProductos() {
  document.getElementById("modalContainer").innerHTML = "";
  document.getElementById("contenidoPrincipal").classList.remove("blurBackground");
  document.body.classList.remove("modalAbierto");
}

/* Busca en productosLista (usado por la grilla del modal "Ver más") */
function abrirDetallePorId(categoria, idProducto) {
  const productos = productosLista[categoria] || [];
  const productoEncontrado = productos.find((p) => p.id === idProducto);

  if (productoEncontrado) {
    abrirDetalleProducto(productoEncontrado);
  }
}

/* Busca en productosPorCategoria (usado por los itemMenor del Home)
   y normaliza los campos con sufijo "1" al mismo molde que espera
   abrirDetalleProducto: { nombre, precio, imagen, descripcion } */
function abrirDetallePorId1(categoria, idProducto) {
  const productos = productosPorCategoria[categoria] || [];
  const productoEncontrado = productos.find((p) => p.id1 === idProducto);

  if (productoEncontrado) {
    const productoNormalizado = {
      nombre: productoEncontrado.nombre1,
      precio: productoEncontrado.precio1,
      imagen: productoEncontrado.imagen1,
      descripcion: productoEncontrado.descripcion1,
    };
    abrirDetalleProducto(productoNormalizado);
  }
}

/* =========================
   MODAL DE DETALLE (único, compartido por ambas fuentes de datos)
   ========================= */

function abrirDetalleProducto(producto) {
  fetch("./detalleProducto/detalleProducto.html")
    .then((respuesta) => respuesta.text())
    .then((html) => {
      const modalContainer = document.getElementById("modalContainer");
      modalContainer.innerHTML = html;

      // Inyección de datos
      document.getElementById("detalleImagen").src = producto.imagen || '';
      document.getElementById("detalleImagen").alt = producto.nombre || '';
      document.getElementById("detalleNombre").textContent = producto.nombre || '';
      document.getElementById("detallePrecio").textContent = producto.precio || '';
      document.getElementById("detalleDescripcion").textContent = producto.descripcion || '';

      // Efectos de fondo
      document.getElementById("contenidoPrincipal").classList.add("blurBackground");
      document.body.classList.add("modalAbierto");
    })
    .catch((error) => console.error("Error al cargar DetalleProducto:", error));
}

function cerrarDetalleProducto() {
  cerrarListaProductos();
}
