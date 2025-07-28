import { createTransport } from "nodemailer";

const sendPasswordLink = async (customer_email, resetLink) => {
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
        from: `"Spice Direct Wholesale" <${process.env.EMAIL_USER}>`,
        to: customer_email,
        subject: "Reset Your Password",
        html: `<p>Click the link below to reset your password:</p>
         <a href="${resetLink}">${resetLink}</a>`,
    });
    return resp
}

export default sendPasswordLink