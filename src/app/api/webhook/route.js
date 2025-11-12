import dbConnect from "@/lib/db";
import OrdersModel from "@/models/ordersSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import crypto from 'crypto';

export async function POST(request) {
    try { 
        const rawBody = await request.text();
        const signatureHeader = request.headers.get("dojo_signature") ?? '';
        const computedSignature = 'sha256=' + crypto.createHmac("sha256", process.env.DOJO_WEBHOOK_SECRET).update(rawBody).digest("hex").toUpperCase();
        if(computedSignature !== signatureHeader.toUpperCase()){
            console.log("webhook auth error");
            return handleError(null, 'webhook auth error')
        }
        const {payload} = await JSON.parse(rawBody);
        if(payload?.event === 'payment_intent.status_updated'){
            const payment = payload.data.object;
            const orderId = payload.reference?.split(" ")[1] || null;
            await dbConnect();
            if(orderId){
                await OrdersModel.findOneAndUpdate({orderId}, {paymentStatus: payment.status, paymentIntentId: payment.id},{new: true, upsert: true});
                console.log(`oder ${orderId} updated to status: ${payment.status}`)
            }
        }
        return handleSuccess(null, null, "order created successfully")
    } catch (error) {console.log('Webhood Error', error);return handleError(error)}
}   