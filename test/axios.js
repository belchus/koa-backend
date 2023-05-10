const axios = require('axios')

async function listProducts () {
  const response = await axios.get('http://localhost:8080/api/productos')
  return response
}

async function listProductById(id) {
    const response = await axios.get(`http://localhost:8080/api/productos/${id}`)
    return response
}

async function saveNewProduct(){
  const response = axios.post('http://localhost:8080/api/productos',{
        nombre: "Pulsera Pluma",
        precio: 3000,
        thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/593/902/products/diseno-sin-titulo-2022-02-23t171353-5741-a4f0a01773d14cedfb16456515838255-640-0.jpg"
    })
    return response
}

async function updateProduct(id) {
    const response = axios.put(`http://localhost:8080/api/productos/${id}`,{
    nombre: "Pulsera Daisy",
    precio: 2000,
    thumbnail: "https://cdn.shopify.com/s/files/1/0602/0884/0870/products/P113911-1.jpg?v=1674181189"
    })
    return response
}

async function deleteProduct(id) {
  const response = axios.delete(`http://localhost:8080/api/productos/${id}`)
  return response
}

module.exports = {listProducts, listProductById, saveNewProduct, updateProduct, deleteProduct}