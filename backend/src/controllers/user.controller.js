const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { getToken } = require("../common/gettoken.js");
const { uuid } = require("uuidv4");
const nodemailer = require("nodemailer");

exports.signUp = async (req, res) => {
  const html = `
    <h1>Hello</h1>
    `;
  const code = Math.floor(Math.random() * 9999) + 1000;
  const sendMail = async () => {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true,
      auth: {
        user: "temonation123@yahoo.com",
        pass: "tqmsyswranxdkjsp",
      },
    });
    const info = await transporter.sendMail({
      from: "petify-support <temonation123@yahoo.com>",
      to: req.body.email,
      subject: code,
      html: html,
    });
    console.log("messege send: " + info.messageId);
  };
  bcrypt.hash(req.body.pass, 10, (err, hash) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      pass: hash,
      confirmed: false,
      code: code,
    })
      .then((user) => {
        sendMail().catch((e) => console.log(e));
        res.send(user);
      })
      .catch((err) => res.send(err));
  });
};
exports.getUsers = async (req, res) => {
  const body = await User.find({});
  res.send(body);
};
exports.signIn = async (req, res) => {
  const { username, pass } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      if (!user.confirmed)
        res.status(401).json({ messege: "verify your email" });
      bcrypt.compare(pass, user.pass, (err, results) => {
        if (results) {
          const token = getToken(user.username, user._id, user.role);
          console.log(token);
          res.send(token);
        } else {
          res.status(401).json({ messege: "email or pass is incorrect" });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
exports.changeRole = async (req, res) => {
  const id = req.params.id;
  const role = req.body.role;
  const result = await User.findByIdAndUpdate(id, {
    role: role == 500 ? "admin" : role == 501 ? "author" : "user",
  });
  res.send(result);
};
exports.removeUser = async (req, res) => {
  const id = req.params.id;
  await User.deleteOne({ _id: id });
  res.send("deleted");
};
