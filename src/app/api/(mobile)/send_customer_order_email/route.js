import sendOrderCRMEmailFromMobile from "@/helper/sendOrderCRMEmailFromMobile";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { name, email, orderPayload } = await request.json();
        if(!name || !email || !orderPayload) { return handleError(null, "Missing required fields: name, email, or orderPayload"); }
       const response = await sendOrderCRMEmailFromMobile(name, email, orderPayload);
       if (response.accepted.length > 0) { return handleSuccess(null, null, "Email sent successfully to:", response.accepted);
      } else { return handleError(null, 'Error sending Email');}
        return handleSuccess(null, null, "email sent successfully");
    } catch (error) {handleError(error)}
}