#!/usr/bin/env node
/**
 * Local prove for morning-cos-brief payload contract (brief.v1).
 * No network. Exits 0 only when fixtures satisfy the quiet / bucket rules.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillDir = dirname(dirname(fileURLToPath(import.meta.url)));

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
  for (const key of ["shipping", "blocked", "needsJerrod"]) {
    assert(Array.isArray(brief[key]), `${label}: ${key} array`);
    for (const item of brief[key]) {
      assert(typeof item.source === "string" && item.source.length > 0, `${label}: item.source`);
      assert(typeof item.summary === "string" && item.summary.length > 0, `${label}: item.summary`);
    }
  }
  assert(Array.isArray(brief.sourcesPolled), `${label}: sourcesPolled`);

  const bucketCount =
    brief.shipping.length + brief.blocked.length + brief.needsJerrod.length;
  if (brief.quiet) {
    assert(!brief.materialChanged, `${label}: quiet implies !materialChanged`);
    assert(bucketCount === 0, `${label}: quiet implies empty buckets`);
  } else {
    assert(brief.materialChanged, `${label}: non-quiet implies materialChanged`);
    assert(bucketCount > 0, `${label}: non-quiet implies some bucket items`);
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

console.log("morning-cos-brief prove: ok");
console.log(`  material-changed: shipping=${material.shipping.length} blocked=${material.blocked.length} needsJerrod=${material.needsJerrod.length}`);
console.log(`  quiet: quiet=${quiet.quiet} materialChanged=${quiet.materialChanged}`);
