import { createTransport } from "nodemailer";

const sendEmail = async (name,from, mobileNo, message) => {
    const transporter = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
        // host: 'smtp.office365.com',
        // port: 587,
        // auth: {
        //            user: process.env.EMAIL_USER,
        //     pass: process.env.EMAIL_PASSWORD
        // }
    });
    const resp = await transporter.sendMail({
        to: process.env.EMAIL_USER,
        replyTo: from,
        subject: "Spice Direct Wholesale",
        html: `
        <h4>Name: ${name} </h4>
        <h4>Mobile Number: ${mobileNo} </h4>
        <h4>From: ${from} </h4>
      <p>${message}</p>
      `
    });
    return resp
}

export default sendEmail