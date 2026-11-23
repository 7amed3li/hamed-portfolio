#!/usr/bin/env node
/**
 * IndexNow submission script for instant Bing / Copilot / ChatGPT Search indexing.
 *
 * Usage:
 *   node scripts/ping-indexnow.mjs --dry-run --base-url=http://127.0.0.1:3099
 *   node scripts/ping-indexnow.mjs
 */

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const baseArg = args.find((a) => a.startsWith("--base-url="));
const baseUrl = (baseArg ? baseArg.split("=")[1] : "https://www.hamedmohamed.dev").replace(/\/+$/, "");

const HOST = "www.hamedmohamed.dev";
const KEY = "8f4c2e19a7b64d309e51c8a2f7b4d6e3";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function run() {
  const smRes = await fetch(`${baseUrl}/sitemap.xml`);
  if (!smRes.ok) {
    throw new Error(`Failed to fetch ${baseUrl}/sitemap.xml: HTTP ${smRes.status}`);
  }
  const smXml = await smRes.text();
  const urlList = [...smXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urlList.length === 0) {
    throw new Error("No <loc> entries found in sitemap.xml");
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  if (dryRun) {
    console.log(JSON.stringify({ dryRun: true, endpoint: "https://api.indexnow.org/indexnow", urlCount: urlList.length, keyLocation: KEY_LOCATION, sample: urlList.slice(0, 3) }, null, 2));
    return;
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  console.log(JSON.stringify({ status: res.status, ok: res.ok, urlCount: urlList.length, response: body }, null, 2));
  if (!res.ok) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
