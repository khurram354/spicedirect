import { handleError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
       const response = NextResponse.json({
        success:true,
        message: "logout successfully"
       });
       console.log(response)
       response.cookies.set("sdwtkn", '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/'
       });
       return response;
    } catch (error) {
        return handleError(error)}
}