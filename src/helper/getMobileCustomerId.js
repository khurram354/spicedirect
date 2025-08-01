import jwt from 'jsonwebtoken';

export function getMobileCustomerId(req){
    const authHeader = req.headers.get('authorization');
    if(authHeader && authHeader.startsWith(`Bearer `)){
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded.id
        } catch (error) {
            return null;
        }
    };
    return null;
}