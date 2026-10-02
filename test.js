// Run: node test.js   (checks every formula by hand-calculated values)
const assert = require("assert");
const { analyse, validate } = require("./analysis.js");
const A = {
  prev: { revenue: "1000000", cogs: "600000", opex: "200000", interest: "20000", tax: "30000" },
  cur: { revenue: "12,00,000", cogs: "720000", opex: "240000", interest: "20000", tax: "40000",
    currentAssets: "600000", inventory: "150000", totalAssets: "1000000", currentLiabilities: "300000",
    totalLiabilities: "500000", debt: "200000", equity: "500000",
    cfo: "200000", cfi: "-120000", cff: "-30000", openCash: "100000", capex: "110000" },
};
const inp = { companies: [{ name: "A", ...A }] };
assert.strictEqual(validate(inp), null);
const a = analyse(inp, 10).companies[0], c = a.cur;
const exp = { gross: 480000, op: 240000, net: 180000, gm: 40, om: 20, nm: 15, taxRate: 18.18, icr: 12, wc: 300000, check: 0,
  cr: 2, d2a: 0.5, er: 0.5, netChange: 50000, closing: 150000, fcf: 90000, conv: 1.11, quick: 1.5, de: 0.4, roe: 36, roa: 18, turn: 1.2 };
for (const k in exp) assert.strictEqual(c[k], exp[k], k + " expected " + exp[k] + " got " + c[k]);
assert.strictEqual(a.compare.find((r) => r.key === "revenue").pct, 20);
assert.strictEqual(a.compare.find((r) => r.key === "net").pct, 20);
assert.strictEqual(a.netMarginChangePts, 0);
// zero denominator and missing data give null, never a wrong number
assert.strictEqual(analyse({ companies: [{ prev: { revenue: "0" }, cur: { revenue: "5" } }] }).companies[0].compare[0].pct, null);
assert.strictEqual(analyse({ companies: [{ prev: {}, cur: { revenue: "5" } }] }).companies[0].cur.gm, null);
assert.ok(validate({ companies: [{ prev: { revenue: "abc" }, cur: {} }] }));
assert.ok(validate({ companies: [{ prev: { revenue: "-5" }, cur: {} }] }));
console.log("All tests passed");
