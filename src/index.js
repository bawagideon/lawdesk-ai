/**
 * LawDesk AI — Corporate Legal & Regulatory Compliance RAG Engine
 * CAMA 2020 statutory retrieval, NDPA 2023 compliance auditing, contract clause liability screening, and retainer scheduling.
 */
class LawDeskEngine {
  constructor(options = {}) {
    this.firmName = options.firmName || "Lexis Juris Corporate Advisory";
    this.statutes = new Map();
    this.consultations = new Map();
  }

  indexStatute(statute) {
    if (!statute.section || !statute.act || !statute.content) {
      throw new Error("Statute section, act, and content are required");
    }
    const key = `${statute.act}-${statute.section}`;
    const record = {
      key,
      act: statute.act,
      section: statute.section,
      title: statute.title || "",
      content: statute.content,
      penalties: statute.penalties || null
    };
    this.statutes.set(key, record);
    return record;
  }

  queryStatute(act, section) {
    const key = `${act}-${section}`;
    return this.statutes.get(key) || null;
  }

  auditContractClause(clauseText) {
    if (!clauseText || typeof clauseText !== 'string') {
      throw new Error("clauseText is required");
    }

    const lower = clauseText.toLowerCase();
    const risks = [];
    let severity = "LOW";

    if (lower.includes("indemnify") && lower.includes("consequential")) {
      risks.push("Uncapped consequential liability exposed in indemnity covenant.");
      severity = "CRITICAL";
    }
    if (!lower.includes("cap") && !lower.includes("ceiling") && !lower.includes("limited to")) {
      risks.push("No monetary liability ceiling (12-month fees paid cap recommended).");
      if (severity !== "CRITICAL") severity = "HIGH";
    }
    if (lower.includes("sole discretion")) {
      risks.push("Unilateral discretionary termination clause without cure period.");
      if (severity === "LOW") severity = "MEDIUM";
    }

    return {
      severity,
      risksFound: risks.length,
      defectSummary: risks,
      suggestedRemedy: severity === "CRITICAL" 
        ? "Strike 'consequential and indirect damages' and insert mutual liability cap equal to 100% of aggregate fees paid in preceding 12 months."
        : "Standard commercial protections apply."
    };
  }

  bookPartnerConsultation({ clientEmail, topic, counselTier = "Partner" }) {
    const consultationId = `LEX-${Date.now()}`;
    const fee = counselTier === 'Managing Partner' ? 100000 : 50000;
    const booking = {
      consultationId,
      clientEmail,
      topic,
      counselTier,
      fee,
      currency: "NGN",
      status: "reserved",
      createdAt: new Date().toISOString()
    };
    this.consultations.set(consultationId, booking);
    return booking;
  }
}

module.exports = { LawDeskEngine };
