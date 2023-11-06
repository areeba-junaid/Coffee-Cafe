const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const UserModel = require("./user");
const OrderModel = require("./order");
const app = express();

const mongoURI = "mongodb://localhost:27017/customers";
let get_email;
//database
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const store = new MongoDBSession({
  url: mongoURI,
  collection: "mySessions",
});

//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//middleware check if user is logged in or not
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", (req, res) => {
  login = true;
  if (login) res.sendFile(__dirname + "/view/register.html");
  else res.sendFile(__dirname + "/view/home.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/view/login.html");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.redirect("/register");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.redirect("/login");
  }
  req.session.isAuth = true;
  res.redirect("/home");
  get_email = email;
  console.log("logged in ");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/view/register.html");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //check if user already existed
  let user = await UserModel.findOne({ email });

  if (user) {
    return res.redirect("/register");
  }

  const hashedPsw = await bcrypt.hash(password, 12);

  user = new UserModel({
    username: username,
    email: email,
    password: hashedPsw,
  });

  await user.save();

  res.redirect("/login");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/view/home.html");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/feedback", (req, res) => {
  res.sendFile(__dirname + "/view/feedback.html");
});

app.get("/cart", (req, res) => {
  res.sendFile(__dirname + "/view/cart.html");
});

app.post("/order", async (req, res) => {
  const { order, total } = req.body;

  Order = new OrderModel({
    email: get_email,
    order: order,
    total: total,
  });

  await Order.save();
});
//listening
app.listen(1500, () => {
  console.log("Server Running in port 1500");
});
