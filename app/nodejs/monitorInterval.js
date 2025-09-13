async function updateStatus() {
    try {
        // Call the backend API
        const res = await fetch("http://192.168.2.104:3000/status");
        const data = await res.json();

        // Update Ping
        document.getElementById("ping").innerHTML =
            data.ping ? "<span class='ok'>✅ Reachable</span>"
                : "<span class='fail'>❌ Down</span>";

        // Update Webserver
        document.getElementById("web").innerHTML =
            data.web ? "<span class='ok'>✅ Running</span>"
                : "<span class='fail'>❌ Down</span>";

        // Update SSH
        document.getElementById("ssh").innerHTML =
            data.ssh ? "<span class='ok'>✅ Open</span>"
                : "<span class='fail'>❌ Closed</span>";

        // Clear error message
        document.getElementById("error").textContent = "";

    } catch (err) {
        console.error("Fetch error:", err);
        document.getElementById("error").textContent = "Error fetching status.";
    }
}

// Run once immediately, then every 5s
updateStatus();
setInterval(updateStatus, 5000);
