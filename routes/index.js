var express = require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.post('/submit', function(req, res, next){
  //res.render('booked', ); 
  var name = req.body.name;
  var email = req.body.email;
  var number = req.body.number;
  fs.appendFile('bookingdetails.txt' , `name: ${name}, email: ${email}, number: ${number}\n`, function(error){
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
    from: 'ratedr@gmail.com',
    to: req.body.email,
    subject: 'Successfully tickets booked!',
    text: `Congratulations ${req.body.name}! Your tickets have been booked...`
  } 

   transporter.sendMail(mailOptions,function (error, info){
if (error) {
  console.log(error)
}
else{
  res.render('booked');
}
   });
});



module.exports = router;


