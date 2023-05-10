
const koa = require("koa");
const parser = require("koa-bodyparser");
const session = require("koa-session");
const sessionMongoose = require("koa-session-mongoose");
const views = require("koa-views");
const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const static = require("koa-static");
const Router = require("koa-router");
const override = require("koa-methodoverride");
const app = new koa();
const route = new Router();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {});
require("./utils/socketService.js")(io);
const logger = require("./utils/logger.js");

const flash = require("koa-connect-flash");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const cookieParser = require("koa-cookie").default;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const { PORT, mode, DAO } = require("./utils/yargs.js");

if (mode == "CLUSTER") {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    logger.info(`Proceso Maestro: ${process.pid}`);
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`el worker ${worker.process.pid} se ha cerrado`);
    });
  } else {
    iniciarServidor();
  }
} else {
  iniciarServidor();
}

//servidor
function iniciarServidor() {
  mongoose
    .connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info(`Conexión con MongoDbAtlas exitosa`);
      return httpServer.listen(PORT, () => {
        logger.info(
          `Servidor Koa con WebSocket iniciado en modo ${mode} escuchando el puerto ${PORT} - Proceso N° ${process.pid} - DAO tipo: ${DAO}`
        );
      });
    });
}

//middlewares
app.use(views("./views", { map: { html: "nunjucks" } }));
app.use(cookieParser());
app.keys = [process.env.SESSION_SECRET];
app.use(
  session(
    {
      store: sessionMongoose.create({
        modelName: "sessions",
        expires: 86400,
      }),
    },
    app
  )
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(override("_method"));
app.use(parser());
app.use(route.routes());
app.use(static("./public"));

//passport
const { findUser, findUserById } = require("./controllers/usuarios.js");
const initializePassport = require("./config/passport.js");
initializePassport(
  passport,
  (email) => findUser(email),
  (id) => findUserById(id)
);


/*
const routes = require("./routes/newRoutes.js");
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const flash = require("express-flash");
const cluster = require("cluster");
const multer = require("multer");
const logger = require("./utils/logger.js");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const Router = require("koa-router");
const koa = require("koa");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoUrl = process.env.MONGOURL;
const userHandler = require("./classes/userH.js");
const usr = new userHandler(mongoUrl);
const { iniciarServidorFirebase, connectDB } = require("./config.js");
app.engine(
  "hbs",
  engine({
    defaultLayout: false,
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOURL,
      mongoOptions: advancedOptions,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const initializePassport = require("./config/passport.js");
initializePassport(
  passport,
  (email) => usr.findUserByMail(email),
  (id) => usr.findUserById(id)
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./publiv/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

function auth(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
}
function notAuth(req, res, next) {
  if (req.user) {
    return res.redirect("/");
  } else {
    return next();
  }
}

const iniciarServidor = async () => {
  try {
    iniciarServidorFirebase();
    connectDB().then(logger.info("MongoDb se encuentra conectado"));
    const server = app.listen(PORT, () => {
      logger.info(
        `Servidor Express iniciado en modo ${mode} escuchando en el puerto ${
          server.address().port
        } - Proceso N°: ${process.pid} `
      );
    });
    server.on("error", (error) => logger.error(`Error en servidor ${error}`));
  } catch (error) {
    logger.error(error);
  }
};

const {PORT, mode} = require ("./utils/yargs.js")


if (mode == "CLUSTER") {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    
    logger.info(`Proceso Maestro: ${process.pid}`);
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`el worker ${worker.process.pid} se ha cerrado`);
    });
  } else {
    iniciarServidor();
  }
} else {
  iniciarServidor();
}
*/
app.use("/", routes);
let api = require("../routes/routeskoa.js");
let front = require("../routes/index.js");
app.use(api.routes());
app.use(info.routes());
app.use(front.routes());