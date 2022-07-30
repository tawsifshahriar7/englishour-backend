var express = require('express'),
nodeMailer = require('nodemailer'),
bodyParser = require('body-parser');
const status_codes = require("../../utils/status_code/status_code");
const Moderator = require("../../model/moderator");
const bcrypt = require("bcryptjs");

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var port = 3000;
// app.get('/', function (req, res) {
//     res.render('index');
// });
const ForgotPassword = async (req, res) => {
    const tempPassword = Math.floor(Math.random()*90000) + 10000;
    console.log(tempPassword);
    let email = req.body.Email;
    let moderator = await Moderator.findOne({
        where: { email: email },
    });
    if (moderator === null) {
        console.log("moderator not found");
        return res.status(status_codes.SUCCESS).send("No Moderator with this email found");
    }
    else{
        await Moderator.update(
            {
              password: await bcrypt.hash(tempPassword.toString(), 10),
            },
            {
              where: {
                moderator_id: moderator.dataValues.moderator_id,
              },
            }
          )
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'sizvy06@gmail.com',
                pass: 'kbdtfhnsezqohmmm'
            }
        });
        let mailOptions = {
            from: "sizvy06@gmail.com", // sender address
            to: req.body.Email, // list of receivers
            subject: "Password Reset", // Subject line
            text: "Got it!!!!", // plain text body
            html: '<b>Your Temporary Password is: </b>'+ tempPassword+'<br />'+ '<b>Make sure to change it as soon as you log in</b>' // html body
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(status_codes.ERROR).send(error);
            }
            return res.status(status_codes.SUCCESS).send("Please check your email");
        });
    }
    
};
module.exports = ForgotPassword;