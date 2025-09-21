async function updateStatus() {
    try {
        // Call the backend API
        const res = await fetch("http://192.168.2.104:3000/status");
        const data = await res.json();

        const now = new Date();
        const formatted = now.toLocaleDateString("en-GB") + " " + now.toLocaleTimeString("en-GB");
        document.getElementById("last-checked").textContent = "Last checked: " + formatted;

        document.getElementById("error").textContent = "";

        document.getElementById("ping-router").innerHTML =
            data.router ? "<span class='ok'>✅ Reachable</span>" : "<span class='fail'>❌ Unreachable</span>";

        document.getElementById("ping-switch").innerHTML =
            data.switch ? "<span class='ok'>✅ Reachable</span>" : "<span class='fail'>❌ Unreachable</span>";

        document.getElementById("ping-ap-1").innerHTML =
            data.ap1 ? "<span class='ok'>✅ Reachable</span>" : "<span class='fail'>❌ Unreachable</span>";

        document.getElementById("ping-ap-2").innerHTML =
            data.ap2 ? "<span class='ok'>✅ Reachable</span>" : "<span class='fail'>❌ Unreachable</span>";

        document.getElementById("ping-dns").innerHTML =
            data.dns ? "<span class='ok'>✅ Reachable</span>" : "<span class='fail'>❌ Unreachable</span>";

        document.getElementById("service-unifi").innerHTML =
            data.dns ? "<span class='ok'>✅ Up and Running</span>" : "<span class='fail'>❌ Down</span>";

    } catch (err) {
        console.error("Fetch error:", err);
        document.getElementById("error").textContent = "Error fetching status.";
    }
}

updateStatus();
setInterval(updateStatus, 10000);
