const {
    listProducts,
    listProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct,
  } = require("./axios.js");
  
  const All = require("./all.js");
  const all = new All();
  
  async function listarProductos() {
    all.add("TRAER PRODUCTO");
    const response = await listProducts();
    if (response.status === 200) {
      all.complete("TRAER PRODUCTO");
    } else {
      console.log(all.list());
    }
  }
  
  async function listarProductoPorId() {
    all.add("TRAER POR ID");
    const response = await listProductById(1);
    if (response.status === 200) {
     all.complete("TRAER POR ID");
    } else {
      console.log(all.list());
    }
  }
  
  async function guardarProducto() {
    all.add("GUARDAR PRODUCTO");
    const response = await saveNewProduct();
    if (response.status === 200) {
      all.complete("GUARDAR PRODUCTO");
    } else {
      console.log(all.list());
    }
  }
  
  async function modificarProducto() {
    all.add("MODIFICAR PRODUCTO");
    const response = await updateProduct(4);
    if (response.status === 200) {
      all.complete("MODIFICAR PRODUCTO");
    } else {
      console.log(all.list());
    }
  }
  
  async function quitarProducto() {
    all.add("ELIMINAR PRODUCTO");
    const response = await deleteProduct(4);
    if (response.status === 200) {
      all.complete("ELIMINAR PRODUCTO");
    } else {
      console.log(all.list());
    }
  }
  
  listarProductos()
    .then(() => listarProductoPorId())
    .then(() => guardarProducto())
    .then(() => modificarProducto())
    .then(() => quitarProducto())
    .then(()=> console.log(all.list()))