# Financial Statement Analysis Assistant

A small web app with five views for one or two companies and two periods: Income Statement, Balance Sheet, Cash Flow, Financial Ratios (side by side) and Period Comparison.

- **Exact maths in code:** growth %, percentage changes, margins, ROE, current ratio and debt-to-equity are calculated in `analysis.js`, not by the AI.
- **Missing data handled:** a ratio is shown only when its inputs exist; zero denominators give "not defined" instead of a wrong number.
- **Claude writes the commentary** (summary, insights, areas to review) following the rules in `skill/SKILL.md`. It receives the calculated numbers and never does arithmetic.
- If the AI call fails, the tables still work.

## Files
| File | Purpose |
|---|---|
| `index.html` | The page the user sees |
| `analysis.js` | Calculation engine (browser and server share it) |
| `api/commentary.js` | Serverless function that calls the Claude API |
| `skill/SKILL.md` | The Claude Skill (instructions, formulas, accuracy rules) |
| `test.js` | Checks the maths against the worked example (`node test.js`) |
| `vercel.json`, `package.json` | Deployment config |

## Deploy
1. Upload all files to a GitHub repository, keeping the `api` and `skill` folders.
2. At vercel.com sign in with GitHub, import the repository, leave build settings as they are.
3. Before deploying, add environment variable `ANTHROPIC_API_KEY` (from console.anthropic.com). Set a low monthly spend limit there. Never put the key in the code.
4. Deploy, open the Vercel link, click **Load worked example**, then **Analyse**.

## Test by hand
Click **Load worked example**. Company A current period should show: gross margin 40%, operating margin 20%, net margin 15%, tax rate 18.18%, interest cover 12, working capital 3,00,000, balance check 0, current ratio 2.00, quick ratio 1.50, debt-to-equity 0.40, ROE 36%, ROA 18%, asset turnover 1.20, closing cash 1,50,000, free cash flow 90,000. Revenue and net profit change +20%, net margin change 0 points. Run `node test.js` to check all of this automatically.

## Limits
Two periods, up to two companies, one currency/unit, figures only as entered. Not investment, tax or legal advice.
