// All arithmetic lives here (not in the AI). Used by the browser AND the server.
// Formulas follow skill/SKILL.md exactly. A blank input stays null; nothing is guessed.
(function (root) {
  // [key, label, group, nonNegative]
  const FIELDS = [
    ["revenue", "Revenue", "Income Statement", 1], ["cogs", "Cost of goods sold", "Income Statement", 1],
    ["opex", "Operating expenses (excl. COGS)", "Income Statement", 1], ["interest", "Interest expense", "Income Statement", 1],
    ["tax", "Tax expense", "Income Statement"],
    ["currentAssets", "Current assets", "Balance Sheet", 1], ["inventory", "Inventory", "Balance Sheet", 1],
    ["totalAssets", "Total assets", "Balance Sheet", 1], ["currentLiabilities", "Current liabilities", "Balance Sheet", 1],
    ["totalLiabilities", "Total liabilities", "Balance Sheet", 1], ["debt", "Total debt", "Balance Sheet", 1],
    ["equity", "Shareholders' equity", "Balance Sheet"],
    ["cfo", "Cash flow from operating activities", "Cash Flow"], ["cfi", "Cash flow from investing activities", "Cash Flow"],
    ["cff", "Cash flow from financing activities", "Cash Flow"], ["openCash", "Opening cash", "Cash Flow", 1],
    ["capex", "Capital expenditure (enter as positive)", "Cash Flow", 1],
  ].map(([k, label, g, nn]) => ({ k, label, g, nn }));

  // Calculated lines. t: n=amount, p=percent, x=ratio, c=balance check
  const DEFS = [
    { tab: "income", k: "gross", label: "Gross profit", f: "Revenue - COGS", t: "n" },
    { tab: "income", k: "op", label: "Operating profit", f: "Gross profit - Operating expenses", t: "n" },
    { tab: "income", k: "net", label: "Net profit", f: "Operating profit - Interest - Tax", t: "n" },
    { tab: "income", k: "gm", label: "Gross margin", f: "Gross profit / Revenue x 100", t: "p" },
    { tab: "income", k: "om", label: "Operating margin", f: "Operating profit / Revenue x 100", t: "p" },
    { tab: "income", k: "nm", label: "Net margin", f: "Net profit / Revenue x 100", t: "p" },
    { tab: "income", k: "taxRate", label: "Effective tax rate", f: "Tax / Profit before tax x 100", t: "p" },
    { tab: "income", k: "icr", label: "Interest cover (times)", f: "Operating profit / Interest expense", t: "x" },
    { tab: "balance", k: "wc", label: "Working capital", f: "Current assets - Current liabilities", t: "n" },
    { tab: "balance", k: "check", label: "Balance check", f: "Total assets - (Total liabilities + Equity); 0 = balanced", t: "c" },
    { tab: "balance", k: "cr", label: "Current ratio", f: "Current assets / Current liabilities", t: "x" },
    { tab: "balance", k: "d2a", label: "Debt-to-assets", f: "Total liabilities / Total assets", t: "x" },
    { tab: "balance", k: "er", label: "Equity ratio", f: "Equity / Total assets", t: "x" },
    { tab: "cash", k: "netChange", label: "Net change in cash", f: "Operating + Investing + Financing", t: "n" },
    { tab: "cash", k: "closing", label: "Closing cash", f: "Opening cash + Net change", t: "n" },
    { tab: "cash", k: "fcf", label: "Free cash flow", f: "Operating cash flow - Capex", t: "n" },
    { tab: "cash", k: "conv", label: "Cash conversion (times)", f: "Operating cash flow / Net profit", t: "x" },
    { tab: "ratios", k: "nm", label: "Net margin (%)", f: "Net profit / Revenue x 100", t: "p" },
    { tab: "ratios", k: "cr", label: "Current ratio", f: "Current assets / Current liabilities", t: "x" },
    { tab: "ratios", k: "quick", label: "Quick ratio", f: "(Current assets - Inventory) / Current liabilities", t: "x" },
    { tab: "ratios", k: "de", label: "Debt-to-equity", f: "Total debt / Equity", t: "x" },
    { tab: "ratios", k: "roe", label: "Return on equity (%)", f: "Net profit / Equity x 100", t: "p" },
    { tab: "ratios", k: "roa", label: "Return on assets (%)", f: "Net profit / Total assets x 100", t: "p" },
    { tab: "ratios", k: "turn", label: "Asset turnover (times)", f: "Revenue / Total assets", t: "x" },
  ];
  // Lines used on the Period Comparison tab
  const CMP = [["revenue", "Revenue"], ["gross", "Gross profit"], ["op", "Operating profit"], ["net", "Net profit"],
    ["totalAssets", "Total assets"], ["totalLiabilities", "Total liabilities"], ["equity", "Equity"],
    ["cfo", "Operating cash flow"], ["fcf", "Free cash flow"], ["closing", "Closing cash"]];

  const r2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;
  const has = (v) => v !== null && v !== undefined;
  const sub = (a, b) => (has(a) && has(b) ? r2(a - b) : null);
  const div = (a, b, m = 1) => (has(a) && has(b) && b !== 0 ? r2((a / b) * m) : null);

  // "10,00,000" -> 10000000 ; blank -> null ; junk -> NaN
  function parse(v) {
    if (v === null || v === undefined) return null;
    const s = String(v).replace(/[,\s]/g, "");
    if (s === "") return null;
    return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
  }

  function validate(inp) {
    const cos = inp && inp.companies;
    if (!Array.isArray(cos) || cos.length < 1 || cos.length > 2) return "Provide one or two companies.";
    let count = 0;
    for (const co of cos) for (const p of ["prev", "cur"]) for (const f of FIELDS) {
      const v = parse((co[p] || {})[f.k]);
      const who = (co.name || "Company") + " " + (p === "cur" ? "current" : "previous");
      if (Number.isNaN(v)) return f.label + " (" + who + ") must be a number.";
      if (v !== null) { count++; if (f.nn && v < 0) return f.label + " (" + who + ") cannot be negative."; }
    }
    return count === 0 ? "Enter at least one figure." : null;
  }

  function metrics(raw) {
    const S = {};
    FIELDS.forEach((f) => (S[f.k] = parse((raw || {})[f.k])));
    const m = { ...S };
    m.gross = sub(S.revenue, S.cogs); m.op = sub(m.gross, S.opex);
    m.pbt = sub(m.op, S.interest); m.net = sub(m.pbt, S.tax);
    m.gm = div(m.gross, S.revenue, 100); m.om = div(m.op, S.revenue, 100); m.nm = div(m.net, S.revenue, 100);
    m.taxRate = div(S.tax, m.pbt, 100); m.icr = div(m.op, S.interest);
    m.wc = sub(S.currentAssets, S.currentLiabilities);
    m.check = has(S.totalAssets) && has(S.totalLiabilities) && has(S.equity) ? r2(S.totalAssets - (S.totalLiabilities + S.equity)) : null;
    m.cr = div(S.currentAssets, S.currentLiabilities); m.d2a = div(S.totalLiabilities, S.totalAssets); m.er = div(S.equity, S.totalAssets);
    m.netChange = has(S.cfo) && has(S.cfi) && has(S.cff) ? r2(S.cfo + S.cfi + S.cff) : null;
    m.closing = has(m.netChange) && has(S.openCash) ? r2(S.openCash + m.netChange) : null;
    m.fcf = sub(S.cfo, S.capex); m.conv = div(S.cfo, m.net);
    m.quick = div(sub(S.currentAssets, S.inventory), S.currentLiabilities);
    m.de = div(S.debt, S.equity); m.roe = div(m.net, S.equity, 100); m.roa = div(m.net, S.totalAssets, 100);
    m.turn = div(S.revenue, S.totalAssets);
    return m;
  }

  // Percentage Change = (Current - Previous) / Previous x 100
  function change(c, p) {
    if (!has(c) || !has(p)) return { diff: null, pct: null, note: "Needs both periods" };
    return { diff: r2(c - p), pct: p === 0 ? null : r2(((c - p) / p) * 100), note: p === 0 ? "Not defined (previous is zero)" : null };
  }

  function analyse(inp, threshold) {
    const th = Number.isFinite(Number(threshold)) && threshold !== "" ? Number(threshold) : 10;
    const companies = inp.companies.map((co, i) => {
      const prev = metrics(co.prev), cur = metrics(co.cur);
      const rows = CMP.map(([k, label]) => {
        const c = change(cur[k], prev[k]);
        return { key: k, label, prev: prev[k], cur: cur[k], ...c, significant: c.pct !== null && Math.abs(c.pct) > th };
      });
      const nmChange = sub(cur.nm, prev.nm); // percentage points
      return { name: co.name || "Company " + "AB"[i], prev, cur, compare: rows, netMarginChangePts: nmChange };
    });
    return { threshold: th, companies };
  }

  const api = { FIELDS, DEFS, CMP, parse, validate, analyse };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.FSA = api;
})(typeof window !== "undefined" ? window : this);
