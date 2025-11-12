import { getMobileCustomerId } from "@/helper/getMobileCustomerId";
import dbConnect from "@/lib/db";
import { handleError } from "@/utils/errorHandler";
import { handleSuccess } from "@/utils/handleSuccess";

export async function POST(request) {
  try {
    const { amount, reference, description } = await request.json();

    if (!amount || !reference) {
      return handleError(null, "Missing required order data");
    }

    const customerId = await getMobileCustomerId(request);
    if (!customerId) return handleError(null, "Customer not found");

    await dbConnect();
    const bodyData = {
      amount: {
        value: amount, 
        currencyCode: "GBP",
      },
      reference,
      description: description || "Mobile order payment",
      autoCapture: true,
    };
    const resp = await fetch("https://api.dojo.tech/payment-intents/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.DOJO_SECRET_KEY}`,
        Version: "2024-02-05",
      },
      body: JSON.stringify(bodyData),
    });

    if (!resp.ok) {
      const errorData = await resp.json();
      return handleError(errorData, "Failed to create Dojo payment intent");
    }
    const data = await resp.json();
    return handleSuccess(data, "data", "Order created successfully");
  } catch (error) {
    return handleError(error);
  }
}
