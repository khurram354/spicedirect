import { createTransport } from "nodemailer";

const sendOrderCRMEmailFromMobile = async (name, email, message) => {
    const transporter = createTransport({
        host: "smtp.office365.com",
        // host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const resp = await transporter.sendMail({
        from:`"Spice Direct Mobile App" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: "Spice Direct Mobile App Order Message",
        html: `
        <h4>Name: ${name} </h4>
        <h4>From: ${email} </h4>
      <p>${message}</p>
      `
    });
    return resp
}

export default sendOrderCRMEmailFromMobile