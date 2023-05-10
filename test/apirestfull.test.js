const request = require("supertest")("http://localhost:8080/");
const expect = require("chai").expect;

describe("TEST API RESTFULL", () => {
  describe("TRAER PRODUCTO (GET)", () => {
    it("STATUS 200", async () => {
      let response = await request.get("api/productos");
      expect(response.status).to.eql(200);
    });
  });
  describe("LECTURA POR ID (GET)", () => {
    it("STATUS 200", async () => {
      let response = await request.get("api/productos/1");
      expect(response.status).to.eql(200);
    });
  });
  describe("CREACION DE PRODUCTO (POST)", () => {
    it("STATUS 200", async () => {
      let productoNuevo = {
        nombre: "Pulsera Pluma",
        precio: 3000,
        thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/593/902/products/diseno-sin-titulo-2022-02-23t171353-5741-a4f0a01773d14cedfb16456515838255-640-0.jpg",
      };
      let response = await request.post("api/productos").send(productoNuevo);
      expect(response.status).to.eql(200);
      expect(response._body).to.include.keys(
        "nombre",
        "precio",
        "thumbnail",
        "id",
        "timestamp"
      );
      expect(response._body.nombre).to.eql(productoNuevo.nombre);
      expect(response._body.precio).to.eql(productoNuevo.precio);
      expect(response._body.thumbnail).to.eql(productoNuevo.thumbnail);
    });
  });
  describe("MODIFICACION DE PRODUCTO (PUT)", () => {
    it("STATUS 200", async () => {
      let productoModificado = {
        nombre: "Pulsera Daisy",
    precio: 2000,
    thumbnail: "https://cdn.shopify.com/s/files/1/0602/0884/0870/products/P113911-1.jpg?v=1674181189",
      };
      let response = await request.put('api/productos/4').send(productoModificado)
      expect(response.status).to.eql(200);
    });
  });
  describe('ELIMINAR PRODUCTO (DELETE)', () => {
    it("STATUS 200", async () => {
      let response = await request.delete('api/productos/4')
      expect(response.status).to.eql(200);
    })
  })
});