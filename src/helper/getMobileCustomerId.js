import jwt from 'jsonwebtoken';
import CustomerModel from '@/models/customerSchema';
import dbConnect from '@/lib/db';

export async function getMobileCustomerId(req){
    const authHeader = req.headers.get('authorization');
    if(authHeader && authHeader.startsWith(`Bearer `)){
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            await dbConnect();
            const customer = await CustomerModel.findById(decoded.id);
            if(!customer){return null};
            return decoded.id
        } catch (error) {
            return null;
        }
    };
    return null;
}