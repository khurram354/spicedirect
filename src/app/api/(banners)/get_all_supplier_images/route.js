import dbConnect from "@/lib/db";
import SupplierImageModel from "@/models/supplierSchema";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";
export async function GET() {
    try {
        await dbConnect();
        const suppliers = await SupplierImageModel.find({});
        if (!suppliers || suppliers.length === 0) {
            return handleError(null, "slider images not found");
        }
        return handleSuccess(suppliers, 'suppliers', 'get suppliers successfully')
    } catch (error) {return handleError(error);}
}

