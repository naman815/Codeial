const nodemailer = require('../config/nodemailer');


//another way of exporting a method
exports.newComment = (comment) => {
    nodemailer.transporter.sendMail({
        from: 'codeial.com',
        to : comment.user.email,
        subject : "New Comment Published",
        html : '<h1>Your comment is published</h1>'
    }, (err,info) => {
        if(err){
            console.log('error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    })
}