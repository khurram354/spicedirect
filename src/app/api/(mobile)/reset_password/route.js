import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { token, password } = await request.json();
        if (!token ||!password) { return handleError(null, "missing required field") }
        await dbConnect();
        let decodeToken;
        decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        const customerId = decodeToken.customerId;
        const customer = await CustomerModel.findById(customerId);
        if (!customer) { return handleError(null, "customer not found") }
        const hashPassword = await bcrypt.hash(password, 10);
        await CustomerModel.findByIdAndUpdate(customerId,{ password: hashPassword, status:true });
        const tokenData = {id:customer._id, email:customer.email}
        const LoginToken = jwt.sign(tokenData,process.env.JWT_SECRET, {expiresIn: '30d'});
        const plainCustomer = customer.toObject();
        const deliverydays = plainCustomer.zones.map((zone,index)=>zone!=null?index:null).filter(index=>index!=null);
        const userId = customer._id;
        return handleSuccess({LoginToken, deliverydays, userId}, "token", "Password reset successfully");
    } catch (jwtError) {
      if (jwtError.name === 'TokenExpiredError') {
        return handleError(null, "Reset link has expired. Please request a new one.");
      } else if (jwtError.name === 'JsonWebTokenError') {
        return handleError(null, "Invalid or malformed token.");
      } else {
        return handleError(null, "Unknown token error");
      }
     }
}

