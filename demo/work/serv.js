const axios = require("axios");

const shareURL = "https://europe-west1.gcp.databricks.com/api/2.0/delta-sharing/metastores/9beaf95c-f223-4e17-b954-7d0e4df26e3c";
const bearerToken = "UXcM-0WkHq8P3oH-VWRSkFoeLhRdgneID7mWXR2hlZVSVkKVdf1C2bvZs4S27dDs";  // Get this from config.share

async function getDeltaData() {
    try {
        const response = await axios.get(`${shareURL}/start_hack_2025/start_hack_2025/ev3_dataprofile`, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getDeltaData();