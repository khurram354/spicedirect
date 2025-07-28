import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) { return handleError(null, "Please provide all fields") };
        await dbConnect();
        const customer = await CustomerModel.findOne({ email }).select("+password");
        if (!customer) { return handleError(null, "Invalid email or password") }
        const matchPassword = await bcrypt.compare(password, customer.password);
        if (!matchPassword) { return handleError(null, "Invalid email or password") };
        const tokenData = { id: customer._id, email: customer.email };
        const LoginToken = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '30d' });
        return handleSuccess(LoginToken, "token", "login successfully");
    } catch (error) {
        return handleError(null, "network error");
    }
}