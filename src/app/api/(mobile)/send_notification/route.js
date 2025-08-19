import dbConnect from "@/lib/db";
import CustomerModel from "@/models/customerSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
import admin from "@/lib/firebase";

export async function GET(request) {
    try {
        await dbConnect();
        const todayDate = new Date().getDay();
        const todayOrderCustomer = await CustomerModel.find({ [`zones.${todayDate}`]: { $ne: null }, active: true });
        const activeCustomers = todayOrderCustomer.filter(customer => customer.fcmtoken);
        for (const customer of activeCustomers) {
            const message = {
                token: customer.fcmtoken,
                notification: {
                    title: "Order Reminder 📦",
                    body: `Spice Direct Wholesale, today is your order day! Place your order now.`,
                },
            };
            await admin.messaging().send(message);
        }
        return handleSuccess(null, "token", "fcmtoken added/updatd successfully");
    } catch (error) {
        return handleError(null, "network error");
    }
}