const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.FOOTBALL_API_KEY || "d6cb55bd701842a0a9db7b6c34865e6e";

app.use(cors({ origin: "*" }));

app.get("/wc/matches", async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.query;
    const url = `https://api.football-data.org/v4/competitions/WC/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const r = await fetch(url, { headers: { "X-Auth-Token": API_KEY } });
    if (!r.ok) { return res.status(r.status).json({ error: `API error ${r.status}` }); }
    const data = await r.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
