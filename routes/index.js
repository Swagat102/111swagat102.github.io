var express = require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: '.' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});


router.get('/events', function(req, res, next) {
  res.render('gallery', { title: 'Express' });
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

router.get('/latestupdates', function(req, res, next) {
  res.render('latestupdates', { title: 'Express' });
});

router.post('/submit', function(req, res, next){
  //res.render('booked', ); 
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  var date = req.body.date;
  var time = req.body.time;
  fs.appendFile('bookingdetails.txt' , `name: ${name}, email: ${email}, number: ${number}, date: ${date}, time${time} \n`, function(error){
if (error) {
  console.log(error)
}
  });
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pawan.teach.demo@gmail.com',
      pass: 'ffjqphllixaynizc',
    }
  }) 
  var mailOptions = {
    from: 'FruitFul_Care@gmail.com',
    to: req.body.email,
    subject: 'Appointment has been booked',
    text: `Congratulations ${req.body.name}!\n Your appointment have been confirmed on ${req.body.date} at ${req.body.time}...`
  } 

   transporter.sendMail(mailOptions,function (error, info){
if (error) {
  console.log(error)
}
else{
  res.render('booked',{name:req.body.name});
}
   });
});



module.exports = router;


