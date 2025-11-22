import { createTransport } from "nodemailer";

const sendEmail = async (name,from, mobileNo, message) => {
    const transporter = createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const resp = await transporter.sendMail({
        from:`"Spice Direct Wholesale Website" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: from,
        subject: "Spice Direct Wholesale Contact Form",
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