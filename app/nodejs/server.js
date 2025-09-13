const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// CORS aktivieren
app.use(cors());

app.get("/status", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
