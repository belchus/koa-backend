const fs = require("fs");

async function fileChecker() {
  const fileStructure = `
        [
            {
                "id": "mensajes",
                "mensajes": [
                ]
            }
        ]
        `;
  if (!fs.existsSync("./DB/chats.txt")) {
    try {
      await fs.promises.writeFile("./DB/chats.txt", fileStructure);
    } catch (error) {
      logger.error("error!: ", error);
    }
  }
}

module.exports = { fileChecker };