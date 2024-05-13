const qrcode = require("qrcode-terminal");
const express = require("express");
const { Client, MessageMedia, LocalAuth } = require("whatsapp-web.js");
const { body, validationResult } = require("express-validator");
const cors = require("cors")
const http = require("http");
const app = express();
const server = http.createServer(app);

const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});


app.use(cors())
app.use(express.json({ limit: "5mb" }));

client.initialize();

app.post(
  "/sendMessage",
  async (req, res) => {
    const number = req.body.telefone;
    const id = req.body.id;
    const nome = req.body.nome;

    let message = `Olá, ${nome}, recebemos sua reserva e o seu id e ${id}`

    let numberUser;

    if (number.length === 12) {
      numberUser = number + "@c.us";
    }

    if (number.length === 13) {
      const splitNumber = number.replace("9", "");
      numberUser = `${splitNumber}` + "@c.us";
    }

    console.log(numberUser, message);

    client
      .sendMessage(numberUser, message)
      .then((response) => {
        res.status(200).json({
          status: true,
          message: "Mensagem enviada",
          response: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: "Mensagem não enviada",
          response: err.text,
        });
      });
  }
);

app.post("/sendFile", (req, res) => {
  const { number, data, message, mimetype, filename } = req.body;

  if (!number || !data || !message || !mimetype || !filename) {
    return res.status(400).json({
      error:
        "Número de telefone, message, mimetype e filename são obrigatórios.",
    });
  }

  let numberUser;

  if (number.length === 12) {
    numberUser = number + "@c.us";
  }

  if (number.length === 13) {
    const splitNumber = number.replace("9", "");
    numberUser = `${splitNumber}` + "@c.us";
  }

  const filesize = null; // You can calculate and provide the actual file size here

  const messageMedia = new MessageMedia(mimetype, data, filename, filesize);

  client
    .sendMessage(numberUser, messageMedia, {
      caption: `${message}`,
    })
    .then(() => {
      res.json({ message: "Arquivo enviado com sucesso." });
    })
    .catch((error) => {
      res.status(500).json({ error: "Erro ao enviar o arquivo." });
    });
});

app.get("/groups", async (_req, res) => {
  const chats = await client.getChats();

  const group = chats.filter((chat) => chat.isGroup);

  const groups = group.map((item) => ({
    name: item.name,
    number: item.id._serialized,
  }));

  groups.pop();

  res.status(200).json(groups);
});

server.listen(3002, function () {
  console.log("Aplicação rodando na porta: 3002");
});
