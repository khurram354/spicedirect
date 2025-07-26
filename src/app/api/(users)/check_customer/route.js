import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import jwt from 'jsonwebtoken'
import sendPasswordLink from "@/helper/sendPasswordLink";

export async function POST(request) {
    try {
        const { id } = await request.json();
        if (!id) { return handleError(null, "missing required field") }
        await dbConnect();
        const customer = await CustomerModel.findById(id);
        if (!customer) { return handleError(null, "customer not found") }
        const customer_email = customer.email;
        if ((!customer_email)) { return handleError(null, "Please enter customer valid email address") }
        const check_customer_email = await CustomerModel.find({ email: customer_email });
        if (check_customer_email.length > 1) { return handleError(null, "Please enter unique email address") };
        const reset_token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const resetLink = `spicedirectwholesale://reset-password?token=${reset_token}`;
        const response = await sendPasswordLink(customer_email, resetLink);

        if (response.accepted.length > 0) {
            return handleSuccess(null, null, "Email sent successfully to:", response.accepted);
        } else { return handleError(null, 'Error sending Link'); }
    } catch (error) { return handleError(error); }
}

