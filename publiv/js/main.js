const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const socket = io.connect();

const input = document.getElementById("inputSocket");
const main = document.getElementById("main");
const userStatus = document.getElementById("user-status");
const contextMenu = document.getElementById("context-menu");
const name = document.getElementById("name").innerHTML;
const lastName = document.getElementById("last-name").innerHTML;
const email = document.getElementById("user-name").innerHTML;

socket.on("mensaje", (messages) => {
  const data = JSON.parse(messages);

 
  const author = new schema.Entity(
    "authors",
    {},
    {
      idAttribute: "id",
    }
  );
  const mensaje = new schema.Entity("mensajes", {
    author: author,
  });
  const chat = new schema.Entity("chat", {
    mensajes: [mensaje],
  });
  const denormalizedData = denormalize(data.result, chat, data.entities);

  const rawDataSize = JSON.stringify(denormalizedData).length;
  const compDataSize = messages.length;

  const percent = (compDataSize * 100) / rawDataSize;

  const mensajeCompresion = `Mensajes (compresión: %${percent.toFixed(0)})`;
  compressionRatio.innerHTML = mensajeCompresion;

  const mensajesHTML = denormalizedData.mensajes
    .map(
      (msj) => `
        <div class="message-cont">
        <div class="messenger">
        <div class="avatar-container"><img class="avatar-img"src="${msj.author.avatar}"></div>
        <div class="messenger-card">
        <div class="messenger-alias">Alias: ${msj.author.alias}</div>
        <div class="messenger-alias">Email: ${msj.author.id}</div>
        </div>
        </div>
        <div class="mensaje">Mensaje: ${msj.text}</div>
        </div>
        `
    )
    .join("");
  main.innerHTML = mensajesHTML;
});

async function listarProductos() {
  await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "{ getProducts { nombre, precio, thumbnail } }",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const productosHTML = data.data.getProducts
        .map(
          (pro) => `
        <tr class="tr2">
        <td class="td1">${pro.nombre}</td>
        <td class="td2">${pro.precio}</td>
        <td class="td3"><img class="product-thumbnail" src="${pro.thumbnail}"></td>
        </tr>`
        )
        .join("");
      celdasProductos.innerHTML = productosHTML;
    });
}
listarProductos();

function addMessage() {
  const email = document.getElementById("email").value;
  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const alias = document.getElementById("alias").value;
  const thumbnail = document.getElementById("thumbnail-chat").value;
  const text = document.getElementById("texto").value;
  const mensaje = {
    author: {
      id: email,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      alias: alias,
      avatar: thumbnail,
    },
    text: text,
  };
  if (email == "") {
    return alert("Ingrese su email");
  } else if (nombre == "") {
    return alert("Ingrese su nombre");
  } else if (apellido == "") {
    return alert("Ingrese su apellido");
  } else if (edad == "") {
    return alert("Ingrese su edad");
  } else if (alias == "") {
    return alert("Ingrese un alias");
  } else if (thumbnail == "") {
    return alert("Ingrese su avatar");
  } else if (text == "") {
    return alert("Ingrese un mensaje");
  } else {
    socket.emit("new-message", mensaje);
    return alert("mensaje enviado !");
  }
}

async function addProducto() {
  const producto = {
    nombre: document.getElementById("title").value,
    precio: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  const mutation = `
  mutation CreateProduct($nombre: String!, $precio: Int!, $thumbnail: String!) {
    createProduct(nombre: $nombre, precio: $precio, thumbnail: $thumbnail)
  }
`;

  const variables = {
    nombre: producto.nombre,
    precio: Number(producto.precio),
    thumbnail: producto.thumbnail,
  };

 await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: mutation,
      variables: variables
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
