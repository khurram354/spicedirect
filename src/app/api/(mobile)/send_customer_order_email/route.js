import sendOrderCRMEmailFromMobile from "@/helper/sendOrderCRMEmailFromMobile";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();
       const response = await sendOrderCRMEmailFromMobile(name, email, message);
       if (response.accepted.length > 0) { return handleSuccess(null, null, "Email sent successfully to:", response.accepted);
      } else { return handleError(null, 'Error sending Email');}
        return handleSuccess(null, null, "email sent successfully");
    } catch (error) {handleError(error)}
}