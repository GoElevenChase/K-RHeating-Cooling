import assert from "node:assert/strict";
import test from "node:test";
import { buildEmailDraft, isAcceptedResponse, validateInquiry, type Inquiry } from "../src/lib/contact";

const valid: Inquiry = { name: "Avery", phone: "(830) 555-0142", email: "avery@example.org", service: "Air Conditioners", message: "Our AC is blowing warm air upstairs.", website: "" };
test("inquiry validation rejects missing information and honeypot input", () => {
  assert.equal(validateInquiry(valid), null);
  assert.equal(validateInquiry({ ...valid, service: "" }), null);
  assert.ok(validateInquiry({ ...valid, email: "invalid" }));
  assert.ok(validateInquiry({ ...valid, name: "" }));
  assert.ok(validateInquiry({ ...valid, phone: "" }));
  assert.ok(validateInquiry({ ...valid, phone: "12-34" }));
  assert.ok(validateInquiry({ ...valid, message: "short" }));
  assert.ok(validateInquiry({ ...valid, website: "bot" }));
  assert.ok(validateInquiry({ ...valid, message: "a".repeat(4001) }));
});
test("email draft safely encodes message characters without inventing delivery", () => {
  const draft = buildEmailDraft("service@example.org", { ...valid, message: "Hello & welcome? Unit #2 is noisy." });
  const url = new URL(draft);
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "service@example.org");
  assert.equal(url.searchParams.get("subject"), "Service request: Air Conditioners");
  assert.match(url.searchParams.get("body")!, /Phone: \(830\) 555-0142/);
  assert.match(url.searchParams.get("body")!, /Hello & welcome\? Unit #2 is noisy\./);
  assert.throws(() => buildEmailDraft("service@example.org", { ...valid, email: "bad" }));
});
test("only an explicit affirmative endpoint response counts as accepted", () => {
  assert.equal(isAcceptedResponse({ ok: true }), true);
  for (const value of [null, "ok", {}, { success: true }, { ok: false }, { ok: "true" }, { ok: 1 }]) assert.equal(isAcceptedResponse(value), false);
});
