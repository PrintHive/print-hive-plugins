#!/usr/bin/env node
/**
 * Local prove for morning-cos-brief payload contract (brief.v1).
 * No network. Exits 0 only when fixtures satisfy the quiet / bucket / allowlist rules.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillDir = dirname(dirname(fileURLToPath(import.meta.url)));
const ALLOWED = new Set([
  "Pulse",
  "PrintHive",
  "Comb",
  "Vertex",
  "Ryujin",
  "Quill",
  "Wisp",
  "Mochi",
  "Closer",
  "Cap",
  "hive-mcp",
]);

function load(name) {
  return JSON.parse(readFileSync(join(skillDir, "fixtures", name), "utf8"));
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function validate(brief, label) {
  assert(brief.version === "1", `${label}: version`);
  assert(brief.timezone === "America/Denver", `${label}: timezone`);
  assert(typeof brief.quiet === "boolean", `${label}: quiet`);
  assert(typeof brief.materialChanged === "boolean", `${label}: materialChanged`);
  assert(brief.quiet !== brief.materialChanged, `${label}: quiet and materialChanged must invert`);

  for (const key of ["shipping", "blocked", "needsJerrod"]) {
    assert(Array.isArray(brief[key]), `${label}: ${key} array`);
    for (const item of brief[key]) {
      assert(typeof item.source === "string" && item.source.length > 0, `${label}: item.source`);
      assert(ALLOWED.has(item.source), `${label}: item.source allowlist (${item.source})`);
      assert(typeof item.summary === "string" && item.summary.length > 0, `${label}: item.summary`);
      const keys = Object.keys(item).sort();
      for (const k of keys) {
        assert(["source", "summary", "evidence", "owner"].includes(k), `${label}: item additionalProperties (${k})`);
      }
    }
  }
  assert(Array.isArray(brief.sourcesPolled), `${label}: sourcesPolled`);
  for (const s of brief.sourcesPolled) {
    assert(ALLOWED.has(s), `${label}: sourcesPolled allowlist (${s})`);
  }

  const bucketCount =
    brief.shipping.length + brief.blocked.length + brief.needsJerrod.length;
  if (brief.quiet) {
    assert(!brief.materialChanged, `${label}: quiet implies !materialChanged`);
    assert(bucketCount === 0, `${label}: quiet implies empty buckets`);
  } else {
    assert(brief.materialChanged, `${label}: non-quiet implies materialChanged`);
    assert(bucketCount > 0, `${label}: non-quiet implies some bucket items`);
  }

  if (brief.floor !== undefined) {
    const f = brief.floor;
    assert(typeof f === "object" && f !== null && !Array.isArray(f), `${label}: floor object`);
    for (const k of Object.keys(f)) {
      assert(["queued", "schedulable", "pauses", "clearBeds"].includes(k), `${label}: floor additionalProperties (${k})`);
    }
    if (f.queued !== undefined) assert(typeof f.queued === "number", `${label}: floor.queued`);
    if (f.schedulable !== undefined) assert(typeof f.schedulable === "number", `${label}: floor.schedulable`);
    if (f.pauses !== undefined) {
      assert(Array.isArray(f.pauses), `${label}: floor.pauses`);
      assert(f.pauses.every((x) => typeof x === "string"), `${label}: floor.pauses strings`);
    }
    if (f.clearBeds !== undefined) {
      assert(Array.isArray(f.clearBeds), `${label}: floor.clearBeds`);
      assert(f.clearBeds.every((x) => typeof x === "string"), `${label}: floor.clearBeds strings`);
    }
  }
}

const material = load("material-changed.json");
const quiet = load("quiet.json");
validate(material, "material-changed");
validate(quiet, "quiet");
assert(material.quiet === false && material.materialChanged === true, "material fixture flags");
assert(quiet.quiet === true && quiet.materialChanged === false, "quiet fixture flags");
assert(material.shipping.length === 1 && material.blocked.length === 1 && material.needsJerrod.length === 1, "material buckets");
assert(quiet.shipping.length === 0 && quiet.blocked.length === 0 && quiet.needsJerrod.length === 0, "quiet buckets");
assert(material.floor && typeof material.floor.queued === "number", "material has optional floor");
assert(quiet.floor === undefined, "quiet omits optional floor");
assert(!("dailyBriefCard" in material) && !("ssrCard" in material), "no SSR card fields");

const topKeys = Object.keys(material);
for (const k of topKeys) {
  assert(
    ["version", "generatedAt", "timezone", "quiet", "materialChanged", "shipping", "blocked", "needsJerrod", "sourcesPolled", "notes", "floor"].includes(k),
    `material top-level allowlist (${k})`
  );
}

console.log("morning-cos-brief prove: ok");
console.log(`  material-changed: shipping=${material.shipping.length} blocked=${material.blocked.length} needsJerrod=${material.needsJerrod.length} floor.queued=${material.floor.queued}`);
console.log(`  quiet: quiet=${quiet.quiet} materialChanged=${quiet.materialChanged}`);
