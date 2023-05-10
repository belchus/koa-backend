const {buildSchema} = require('graphql')

const schema = buildSchema(`
type User {
    id: Int
    email: String
    password: String
}
type Product {
    id: Int
    nombre: String
    precio: Int
    thumbnail: String
    timestamp: String
}
input UserInput {
    email: String
    password: String
}
input ProductInput {
    nombre: String
    precio: Int
    thumbnail: String
}
type Query {
    getProducts: [Product]
    getProduct(id: Int) : Product
    getUsers: [User]
    getUser(id: Int) : User
}
type Mutation {
    createProduct(nombre: String, precio: Int, thumbnail: String) : Product!
    deleteProduct(id: Int): Boolean
    editProduct(id: Int, productInput: ProductInput) : Boolean
    createUser(email: String, password: String): User!
}
`)

module.exports = {schema}