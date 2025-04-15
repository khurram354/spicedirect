import sendEmail from "@/helper/senEmail";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
    try {
        const { fName, lName, pNumber, email, message } = await request.json();
        let name = fName + " "+ lName
       const response = await sendEmail(name, email, pNumber, message);
       if (response.accepted.length > 0) { return handleSuccess(null, null, "Email sent successfully to:", response.accepted);
      } else { return handleError(null, 'Error sending Email');}
        return handleSuccess(null, null, "email sent successfully");
    } catch (error) {handleError(error)}
}