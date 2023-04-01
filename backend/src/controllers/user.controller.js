const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { getToken } = require("../common/gettoken.js");
const { uuid } = require("uuidv4");
const nodemailer = require("nodemailer");
const { sendMail } = require("../common/sendmail.js");

exports.signUp = async (req, res) => {
  const code = Math.floor(Math.random() * 9999) + 1000;
  bcrypt.hash(req.body.pass, 10, (err, hash) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      pass: hash,
      confirmed: false,
      code: code,
    })
      .then((user) => {
        sendMail(req.body.email,code)
        res.send(user);
      })
      .catch((err) => console.log(err));
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
        {res.status(401).json({ messege: "verify your email" }); return}
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
exports.verifyUser = async(req, res) =>{
  const code = req.params.code;
  try {
    const result = await User.findOneAndUpdate({code:code},{
      confirmed : true
    });
    res.send('verified')
  } catch (error) {
    console.log(error);
    res.send(error.messege);
  }

  
}
