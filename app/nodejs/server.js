const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();
const port = 3000;

app.use(cors());

const devices = {
  router: "192.168.2.1",
  switch: "192.168.2.2",
  ap1: "192.168.2.107",
  ap2: "192.168.2.108",
  dns: "1.1.1.1"
};

const services = [""]
//TODO: add unifi, pihole, samba, ..?

function ping(ip) {
  return new Promise((resolve) => {
    exec(`ping -c 1 -W 1 ${ip}`, (error, stdout, stderr) => {
      resolve(!error);
    });
  });
}

app.get("/status", async (req, res) => {
  const results = {};
  for (const [name, ip] of Object.entries(devices)) {
    results[name] = await ping(ip);
  }
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
