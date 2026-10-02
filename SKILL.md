---
name: financial-statement-analysis-assistant
description: Analyze financial statements including the Income Statement, Balance Sheet, and Cash Flow Statement. Calculate key financial ratios, identify trends and significant changes, compare financial performance across periods, and provide clear, concise insights to support financial decision-making.
---

# Financial Statement Analysis

This skill analyzes financial statements and converts the provided financial data into a clear, accurate and professional financial analysis that can be understood by a finance manager or business professional.

## Inputs

The user may provide:

- Income Statement / Profit & Loss Statement
- Balance Sheet
- Cash Flow Statement
- Financial data for one or more periods
- Company financial figures
- Revenue, expenses, operating profit and net profit
- Current assets and current liabilities
- Total assets and total liabilities
- Equity and debt
- Cash and cash equivalents
- Other relevant financial information

The user may provide figures in Indian Rupees or another currency. Use the currency specified by the user. If no currency is specified, use Indian Rupees (Rs).

## Financial Statement Analysis

Analyze the following statements when the required information is available:

### 1. Income Statement

Review:

- Revenue
- Operating expenses
- Operating profit
- Profit before tax
- Tax expense
- Net profit
- Changes in revenue and profitability

Calculate growth or change where sufficient data is available.

Revenue Growth % = (Current Revenue - Previous Revenue) / Previous Revenue x 100

Profit Growth % = (Current Net Profit - Previous Net Profit) / Previous Net Profit x 100

Net Profit Margin = Net Profit / Revenue x 100

Operating Profit Margin = Operating Profit / Revenue x 100

If the previous-period figure is zero, state that the percentage cannot be calculated. Do not divide by zero.

### 2. Balance Sheet

Review:

- Current assets
- Current liabilities
- Total assets
- Total liabilities
- Shareholders' equity
- Debt
- Cash and cash equivalents

Calculate relevant ratios when sufficient information is available.

Current Ratio = Current Assets / Current Liabilities

Debt-to-Equity Ratio = Total Debt / Shareholders' Equity

Return on Equity (ROE) = Net Profit / Shareholders' Equity x 100

Do not calculate a ratio if the required information is missing or the denominator is zero.

### 3. Cash Flow Statement

Review:

- Cash flow from operating activities
- Cash flow from investing activities
- Cash flow from financing activities
- Net change in cash
- Cash and cash equivalents

Identify whether operating, investing and financing activities generated or used cash.

Do not assume that positive or negative cash flow is automatically good or bad. Explain the result based only on the information provided.

## Comparative Analysis

When financial data for multiple periods is provided:

1. Compare current-period figures with previous-period figures.

2. Identify significant increases and decreases.

3. Calculate percentage changes where possible.

4. Identify trends in revenue, expenses, profitability, assets, liabilities, equity and cash flows.

5. Highlight important changes that may require management attention.

Use:

Percentage Change = (Current Value - Previous Value) / Previous Value x 100

If the previous value is zero, state that the percentage change is not defined.

## Ratio Analysis

Calculate only ratios for which sufficient information is available.

Consider the following categories:

### Profitability Ratios

- Net Profit Margin
- Operating Profit Margin
- Return on Equity (ROE)

### Liquidity Ratios

- Current Ratio

### Solvency Ratios

- Debt-to-Equity Ratio

For every ratio:

1. Show the formula.

2. Show the calculation when appropriate.

3. Present the result clearly.

4. Explain what the result indicates using neutral language.

Do not create a ratio when the necessary financial figures are unavailable.

## Financial Trends

Identify significant trends such as:

- Increasing or decreasing revenue
- Increasing or decreasing expenses
- Improving or declining profitability
- Changes in liquidity
- Changes in debt levels
- Changes in shareholders' equity
- Changes in operating cash flow
- Significant changes in investing or financing cash flows

Do not state the reason for a trend as a fact unless the user has provided evidence for the reason.

For example:

Do not say:

"The profit decreased because of higher raw material costs."

Instead say:

"Profit decreased. Higher raw material costs could be one possible factor to investigate if such information is available."

## Output Format

Present the analysis in the following order:

1. Financial Performance Summary

2. Income Statement Analysis

3. Balance Sheet Analysis

4. Cash Flow Analysis

5. Ratio Analysis

6. Key Trends and Changes

7. Key Financial Insights

8. Areas to Review

Use tables when they make numerical comparisons easier to understand.

Keep explanations concise, professional and easy to understand.

## Accuracy Rules

- Use only the financial information provided by the user.
- Do not invent missing figures.
- Do not assume values that have not been provided.
- Do not change or alter figures supplied by the user.
- Check calculations carefully.
- Show formulas for important calculations.
- Use consistent units throughout the analysis.
- Clearly identify whether figures are in Rs, thousands, lakhs, millions or another unit.
- If information is incomplete, clearly state what information is missing.
- If a calculation cannot be performed, explain why.
- Do not provide investment, tax or legal advice.
- Do not make unsupported claims about a company's future performance.

## Interpretation Rules

When interpreting financial results:

- Distinguish clearly between financial facts and analytical observations.
- Do not automatically describe an increase as positive or a decrease as negative.
- Consider the financial context before describing a change.
- Use neutral professional language.
- Do not claim a specific cause unless the provided data supports it.
- Highlight significant changes that may require further investigation.

## Worked Example

Input:

Revenue:

Previous Year = Rs 10,00,000

Current Year = Rs 12,00,000

Operating Profit:

Previous Year = Rs 2,00,000

Current Year = Rs 2,40,000

Net Profit:

Previous Year = Rs 1,50,000

Current Year = Rs 1,80,000

Current Assets = Rs 6,00,000

Current Liabilities = Rs 3,00,000

Shareholders' Equity = Rs 5,00,000

Total Debt = Rs 2,00,000

Expected analysis:

Revenue Growth = (12,00,000 - 10,00,000) / 10,00,000 x 100

= 20%

Net Profit Growth = (1,80,000 - 1,50,000) / 1,50,000 x 100

= 20%

Current Ratio = 6,00,000 / 3,00,000

= 2.00

Debt-to-Equity Ratio = 2,00,000 / 5,00,000

= 0.40

Net Profit Margin for the current year = 1,80,000 / 12,00,000 x 100

= 15%

The analysis should explain that revenue and net profit increased compared with the previous year. The current ratio and debt-to-equity ratio should be presented as calculated indicators of liquidity and capital structure without making unsupported conclusions.

## Self-Check Before Answering

Before providing the final analysis, verify:

- Are all calculations mathematically correct?
- Does every number come from the user's input or a clearly shown calculation?
- Were any missing figures incorrectly assumed?
- Were formulas applied correctly?
- Were percentage changes calculated using the correct periods?
- Were ratios calculated only when sufficient information was available?
- Were zero denominators handled correctly?
- Are financial facts clearly separated from interpretation?
- Were unsupported causes avoided?
- Are the currency and units consistent?
- Is the analysis clear and professional?
- Does the final summary accurately reflect the financial data?

## Extended Analysis (five views)

The app presents five views. Use the same formulas and the same rules (no invented figures, no zero divisions, neutral language).

### Income Statement
- Gross Profit = Revenue - Cost of Goods Sold
- Operating Profit = Gross Profit - Operating Expenses
- Net Profit = Operating Profit - Interest - Tax (other income is not included unless provided)
- Gross, Operating and Net Margin = Profit / Revenue x 100
- Effective Tax Rate = Tax / Profit Before Tax x 100
- Interest Cover = Operating Profit / Interest Expense (times)

### Balance Sheet
- Working Capital = Current Assets - Current Liabilities
- Balance check: Total Assets - (Total Liabilities + Equity) should be 0. If not, say the statement does not balance and by how much. Do not adjust any figure.
- Current Ratio = Current Assets / Current Liabilities
- Debt-to-Assets = Total Liabilities / Total Assets
- Equity Ratio = Equity / Total Assets

### Cash Flow
- Net Change in Cash = Operating + Investing + Financing
- Closing Cash = Opening Cash + Net Change in Cash
- Free Cash Flow = Operating Cash Flow - Capital Expenditure
- Cash Conversion = Operating Cash Flow / Net Profit (times). Describe it neutrally; a value below or above 1 is not automatically good or bad.

### Financial Ratios (one or two companies side by side)
Net Margin, Current Ratio, Quick Ratio = (Current Assets - Inventory) / Current Liabilities, Debt-to-Equity, ROE = Net Profit / Equity x 100, ROA = Net Profit / Total Assets x 100, Asset Turnover = Revenue / Total Assets.
When comparing two companies, compare only ratios available for both, use the same period, and do not say one company is "better" without stating the basis. Differences in size, industry and accounting policy may limit comparability.

### Period Comparison
Show Change and Percentage Change for revenue, gross, operating and net profit, total assets, total liabilities, equity, operating cash flow, free cash flow and closing cash. Also show the change in net margin in percentage points (current margin - previous margin). Flag any change above the threshold (default 10%) as "review", not as good or bad.
