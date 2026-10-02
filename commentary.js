// Vercel serverless function.
// Numbers are calculated by ../analysis.js. Claude only writes the narrative,
// following the rules in ../skill/SKILL.md.
const fs = require("fs");
const path = require("path");
const { validate, analyse } = require("../analysis.js");

function loadSkill() {
  try {
    return fs.readFileSync(path.join(process.cwd(), "skill", "SKILL.md"), "utf8");
  } catch (e) {
    return "Write factual financial commentary using only the numbers given. Never state causes as fact. Give no investment, tax or legal advice.";
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST." });
  const body = req.body || {};
  const err = validate(body);
  if (err) return res.status(400).json({ error: err });

  const unit = String(body.unit || "Rs").slice(0, 30);
  const result = analyse(body, body.threshold);
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(200).json({ commentary: null, commentaryError: "ANTHROPIC_API_KEY is not set on the server." });

  const user =
    "Currency/unit: " + unit + ". Significance threshold: " + result.threshold + "%.\n" +
    "All figures below are already calculated. Do not recalculate or change any number.\n\n" +
    JSON.stringify(result, null, 2) +
    "\n\nWrite ONLY these three sections, following the skill: " +
    "1. Financial Performance Summary, 7. Key Financial Insights, 8. Areas to Review. If two companies are given, add two sentences comparing them using only the calculated ratios. " +
    "Keep it under 300 words, plain text, neutral language, no causes stated as fact.";

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL || "claude-sonnet-5-5",
        max_tokens: 900,
        system: loadSkill() + "\n\nReply in plain text only.",
        messages: [{ role: "user", content: user }],
      }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error((data.error && data.error.message) || "Claude API request failed.");
    const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    res.status(200).json({ commentary: text });
  } catch (e) {
    res.status(200).json({ commentary: null, commentaryError: e.message });
  }
};
