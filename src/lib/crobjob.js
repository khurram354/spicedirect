import cron from "node-cron";

export function startCronJobs(){
    // cron.schedule("0 15 * * *",async()=>{
    cron.schedule("*/1 * * * *",async()=>{
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send_notification`)
        } catch (error) {
            console.log("cron-job-error", error)
        }
    },{
        timezone:"Europe/London",
    })
}