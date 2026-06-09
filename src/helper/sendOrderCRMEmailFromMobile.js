import { createTransport } from "nodemailer";
import puppeteer from "puppeteer";

const sendOrderCRMEmailFromMobile = async (name, email, orderPayload) => {
    const payload = orderPayload?.orderPayload || orderPayload;
    const orderDate = payload?.ot_date ? new Date(payload.ot_date).toLocaleDateString("en-GB") : "N/A";
    const deliveryDate = payload?.invoice_date ? new Date(payload.invoice_date).toLocaleDateString("en-GB") : "N/A";
    const itemsHTML = (payload?.items || [])
        .map(
            (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
        </tr> 
    `
        )
        .join("");
    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    body {
        font-family: Arial, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
    }
    .container {
        padding: 15px;
    }
    .header {
        text-align: center;
        margin-bottom: 15px;
    }
    .logo {
        width: 60px;
        height: auto;
        margin-bottom: 5px;
    }
    .header h1 {
        margin: 0;
        color: #1d3557;
        font-size: 24px;
        line-height: 1.1;
    }
    .address {
        margin: 2px 0 0 0;
        font-size: 13px;
        color: #666;
    }
    .info-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
    }
    .info-table td {
        width: 50%;
        vertical-align: top;
        padding: 5px;
    }
    .info-box {
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fafafa;
        padding: 8px 10px;
    }
    .info-box h3 {
        margin: 0 0 6px 0;
        font-size: 14px;
        color: #1d3557;
    }
    .info-box p {
        margin: 3px 0;
        font-size: 13px;
        line-height: 1.3;
    }
    .delivery-note {
        margin-bottom: 10px;
        padding: 10px;
        background: #f8fff8;
        border-left: 4px solid #28a745;
    }
    .delivery-note h3 {
        margin: 0 0 5px 0;
        font-size: 14px;
    }
    .delivery-note p {
        margin: 0;
        font-size: 13px;
    }
    table.products {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
    }
    table.products th {
        background: #6c757d;
        font-weight: bold;
        color: #ffffff;
    }
    table.products th,
    table.products td {
        border: 1px solid #ddd;
        padding: 8px;
        font-size: 13px;
        text-align: left;
    }
    table.products tr:nth-child(even) {
        background: #fafafa;
    }
    .footer {
        margin-top: 15px;
        text-align: center;
        color: #666;
        font-size: 11px;
    }
</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img
                src="https://spicedirectwholesale.co.uk/spice-direct-wholesale.jpg"
                class="logo"
                alt="Spice Direct"
            />
            <h1>Spice Direct Wholesale</h1>
            <div class="address">
                225 Bernard Street, Glasgow G40 3NX, UK
            </div>
        </div>
        <table class="info-table">
            <tr>
                <td>
                    <div class="info-box">
                        <h3>Customer</h3>
                        <p><b>Name:</b> ${name}</p>
                        <p><b>Email:</b> ${email}</p>
                    </div>
                </td>
                <td>
                    <div class="info-box">
                        <h3>Order Info</h3>
                        <p><b>Order Date:</b> ${orderDate}</p>
                        <p><b>Delivery Date:</b> ${deliveryDate}</p>
                    </div>
                </td>
            </tr>
        </table>
        <div class="delivery-note">
            <h3>Delivery Instructions</h3>
            <p>${payload?.deliveryNote?.trim() ? payload.deliveryNote : "No delivery instructions provided"}</p>
        </div>
        <table class="products">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Qty</th>
                </tr>
            </thead>
            <tbody>${itemsHTML}</tbody>
        </table>
        <div class="footer">
            Generated on ${new Date().toLocaleString("en-GB")}
        </div>
    </div>
</body>
</html>
`;
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
        ],
    });
    const page = await browser.newPage();
    await page.setContent(html, {
        waitUntil: "networkidle0",
    });
    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "5mm",
            right: "10mm",
            bottom: "10mm",
            left: "10mm",
        },
    });
    await browser.close();
    const transporter = createTransport({
        // host: "smtp.gmail.com",
        host:"smtp.office365.com",
        port: 587,
        // secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const resp = await transporter.sendMail({
        from: `"Spice Direct Mobile App" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Order - ${name} (${email})`,
        text: `
Customer: ${name}
Email: ${email}
Order Date: ${orderDate}
Delivery Date: ${deliveryDate}
Delivery Instructions:
${payload?.deliveryNote || "No delivery instructions provided"}
        `,
        attachments: [
            {
                filename: `invoice_${Date.now()}.pdf`,
                content: pdfBuffer,
                contentType: "application/pdf",
            },
        ],
    });

    return resp;
};
export default sendOrderCRMEmailFromMobile;