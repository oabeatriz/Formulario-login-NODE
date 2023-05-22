const express = require('express');
const porta = 5500;
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');


app.use(session({ secret: '1234567890', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }));

login = 'admin'
password = '1234'

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/views'))


app.post("/", (req, res) => {
 if(req.body.login == login && req.body.password == password){
  res.session.login = login;
res.render('logado');
  
 }

  res.render('login');

})


app.get('/', (req, res) => {
  if(req.session.login){
    res.render('logado')
  }else {
    res.render('login')
  }

})

app.get("/email", async (req, res) => {
  const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
          user: "47d75705e8dd37",
          pass: "f2874sef6cd11e8"
      }
  });

  var message = {
    from: "anabiaoliveira899@hotmail.com",
    to: "atividadeturmacariacica01@gmail.com",
    subject: "Atividade prática da semana 04",
    text: "Mediador, \n\n segue a atividade prática desta semana.",
    html: "Mediador, <br> <br> o arquivo da semana 04 já foi enviado!"
  }

 transport.sendMail(message, function(err) {
  if (err)
    return res.status(400).json({
      erro: true,
      mensagem: "Erro, email não enviado"
    })
   
  else
    res.render('email')
  })
})


















app.listen(porta, () => {console.log("Servidor rodando")});