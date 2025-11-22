const cron = require("node-cron");

function startCronJobs(){
    cron.schedule("0 15 * * *",async()=>{
    // cron.schedule("*/1 * * * *",async()=>{
        try {
            await fetch(`https://www.spicedirectwholesale.co.uk/api/send_notification`)
        } catch (error) {
            console.log("cron-job-error", error)
        }
    },{
        timezone:"Europe/London",
    })
}

startCronJobs();