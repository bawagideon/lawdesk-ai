const { test } = require('node:test');
const assert = require('node:assert');
const { LawDeskEngine } = require('../src/index.js');

test('LawDeskEngine: Statutory Corpus Indexing & Query', () => {
  const engine = new LawDeskEngine();
  engine.indexStatute({
    act: "CAMA_2020",
    section: "851",
    title: "Annual Returns Filing",
    content: "Every company must deliver an annual return within 42 days of AGM."
  });

  const res = engine.queryStatute("CAMA_2020", "851");
  assert.ok(res);
  assert.strictEqual(res.section, "851");
  assert.ok(res.content.includes("42 days"));
});

test('LawDeskEngine: Contract Clause Liability Audit', () => {
  const engine = new LawDeskEngine();
  const clause = "Party A agrees to indemnify Party B against all claims, consequential damages and losses without limitation.";
  const audit = engine.auditContractClause(clause);

  assert.strictEqual(audit.severity, "CRITICAL");
  assert.ok(audit.defectSummary.some(d => d.includes("consequential liability")));
});

test('LawDeskEngine: Partner Retainer Booking', () => {
  const engine = new LawDeskEngine();
  const booking = engine.bookPartnerConsultation({
    clientEmail: "ceo@fintech.ng",
    topic: "NDPA DPO Compliance Audit"
  });

  assert.strictEqual(booking.fee, 50000);
  assert.strictEqual(booking.status, "reserved");
});
