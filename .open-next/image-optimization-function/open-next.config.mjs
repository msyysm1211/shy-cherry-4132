import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);import bannerUrl from 'url';const __dirname = bannerUrl.fileURLToPath(new URL('.', import.meta.url));
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS2 = (cb, mod2) => function __require2() {
  return mod2 || (0, cb[__getOwnPropNames2(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// .pcg/overrides/adapters/wrappers/node-server.js
var require_node_server = __commonJS2({
  ".pcg/overrides/adapters/wrappers/node-server.js"(exports, module) {
    "use strict";
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __commonJS = (cb, mod2) => function __require2() {
      return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
    };
    var require_gateway_auth = __commonJS({
      "dist/runtime/gateway-auth.js"(exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.gatewayFetch = exports2.signGatewayHeaders = exports2.loadGatewayAuthConfig = void 0;
        var crypto_1 = __require("crypto");
        var DEFAULT_TTL_MS = 5 * 60 * 1e3;
        var DEFAULT_TIMEOUT_MS = 5e3;
        function _fetch(input, init) {
          var _a, _b;
          const gf = globalThis.fetch;
          const fn = gf.__nextPatched ? (_b = (_a = gf._nextOriginalFetch) !== null && _a !== void 0 ? _a : globalThis.__originalFetch) !== null && _b !== void 0 ? _b : gf : gf;
          return fn(input, init);
        }
        function loadGatewayAuthConfig() {
          const gatewayUrl = process.env.ESA_CACHE_GW_GATEWAY_ENDPOINT;
          const secret = process.env.ESA_CACHE_GW_AUTH_KEY;
          const aliuid = process.env.ESA_CACHE_GW_ALIUID;
          const routinename = process.env.ESA_CACHE_GW_ROUTINENAME;
          const version = process.env.ESA_CACHE_GW_VERSION;
          const missing = [];
          if (!gatewayUrl)
            missing.push("ESA_CACHE_GW_GATEWAY_ENDPOINT");
          if (!secret)
            missing.push("ESA_CACHE_GW_AUTH_KEY");
          if (!aliuid)
            missing.push("ESA_CACHE_GW_ALIUID");
          if (!routinename)
            missing.push("ESA_CACHE_GW_ROUTINENAME");
          if (!version)
            missing.push("ESA_CACHE_GW_VERSION");
          if (missing.length > 0) {
            console.error(`[gateway-auth] \u7F3A\u5C11\u5FC5\u9700\u7684\u73AF\u5883\u53D8\u91CF: ${missing.join(", ")}`);
            return null;
          }
          return {
            gatewayUrl: gatewayUrl.replace(/\/+$/, ""),
            secret,
            aliuid,
            routinename,
            version
          };
        }
        exports2.loadGatewayAuthConfig = loadGatewayAuthConfig;
        function signGatewayHeaders(cfg, ttlMs = DEFAULT_TTL_MS) {
          const expires = String(Date.now() + ttlMs);
          const authKey = (0, crypto_1.createHmac)("sha256", cfg.secret).update(`${cfg.aliuid}${cfg.routinename}${cfg.version}`).digest("hex");
          const md5Hash = (0, crypto_1.createHash)("md5").update(`${authKey}${expires}${cfg.aliuid}${cfg.routinename}${cfg.version}`).digest("hex");
          return {
            authorization: `${expires}-${md5Hash}`,
            aliuid: cfg.aliuid,
            routinename: cfg.routinename,
            version: cfg.version
          };
        }
        exports2.signGatewayHeaders = signGatewayHeaders;
        async function gatewayFetch(cfg, pathOrUrl, init) {
          var _a, _b;
          const url = pathOrUrl.startsWith("/") ? `${cfg.gatewayUrl}${pathOrUrl}` : pathOrUrl;
          const signed = signGatewayHeaders(cfg);
          const headers = new Headers(init === null || init === void 0 ? void 0 : init.headers);
          headers.set("Authorization", signed.authorization);
          headers.set("AliUid", signed.aliuid);
          headers.set("RoutineName", signed.routinename);
          headers.set("Version", signed.version);
          const timeoutMs = (_a = init === null || init === void 0 ? void 0 : init.timeoutMs) !== null && _a !== void 0 ? _a : DEFAULT_TIMEOUT_MS;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), timeoutMs);
          try {
            return await _fetch(url, {
              ...init,
              headers,
              signal: (_b = init === null || init === void 0 ? void 0 : init.signal) !== null && _b !== void 0 ? _b : controller.signal
            });
          } finally {
            clearTimeout(timer);
          }
        }
        exports2.gatewayFetch = gatewayFetch;
      }
    });
    var require_image_config = __commonJS({
      "dist/runtime/image-config.js"(exports, module) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        exports._setMatcherForTests = exports._resetImageConfigCacheForTests = exports.validateImageUrl = void 0;
        var fs = __require("fs");
        var path = __require("path");
        var cachedConfig;
        var cachedMatcher;
        var warnedMatcherMissing = false;
        function configFilePath() {
          return path.resolve(process.cwd(), ".next", "required-server-files.json");
        }
        function loadImageConfig() {
          var _a, _b, _c;
          if (cachedConfig !== void 0)
            return cachedConfig;
          const filePath = configFilePath();
          let raw;
          try {
            raw = fs.readFileSync(filePath, "utf-8");
          } catch (err) {
            console.warn(`[image-config] required-server-files.json not found at ${filePath} \u2014 allowing all image URLs (${(_a = err.code) !== null && _a !== void 0 ? _a : err.message})`);
            cachedConfig = { mode: "config-missing" };
            return cachedConfig;
          }
          try {
            const parsed = JSON.parse(raw);
            const images = (_c = (_b = parsed === null || parsed === void 0 ? void 0 : parsed.config) === null || _b === void 0 ? void 0 : _b.images) !== null && _c !== void 0 ? _c : {};
            cachedConfig = {
              mode: "loaded",
              images: {
                remotePatterns: Array.isArray(images.remotePatterns) ? images.remotePatterns : [],
                domains: Array.isArray(images.domains) ? images.domains : [],
                unoptimized: images.unoptimized === true
              }
            };
            return cachedConfig;
          } catch (err) {
            console.warn(`[image-config] failed to parse ${filePath}: ${err.message} \u2014 allowing all image URLs`);
            cachedConfig = { mode: "config-missing" };
            return cachedConfig;
          }
        }
        function loadMatcher() {
          if (cachedMatcher !== void 0)
            return cachedMatcher;
          try {
            const dynamicRequire = eval("require");
            const mod = dynamicRequire("next/dist/shared/lib/match-remote-pattern");
            const hasRemoteMatch = mod === null || mod === void 0 ? void 0 : mod.hasRemoteMatch;
            if (typeof hasRemoteMatch !== "function") {
              throw new Error("hasRemoteMatch not exported");
            }
            cachedMatcher = hasRemoteMatch;
            return cachedMatcher;
          } catch (err) {
            if (!warnedMatcherMissing) {
              warnedMatcherMissing = true;
              console.warn(`[image-config] cannot load next/dist/shared/lib/match-remote-pattern (${err.message}) \u2014 falling back to deny-external-only mode`);
            }
            cachedMatcher = null;
            return null;
          }
        }
        function validateImageUrl(absoluteUrl, hostHeader) {
          const cfg = loadImageConfig();
          if (cfg.mode === "config-missing") {
            return { ok: true, reason: "config-missing" };
          }
          const { images } = cfg;
          if (images.unoptimized) {
            return { ok: true, reason: "unoptimized" };
          }
          const reqHost = hostHeader.toLowerCase();
          const urlHost = absoluteUrl.host.toLowerCase();
          if (reqHost && reqHost === urlHost) {
            return { ok: true, reason: "same-origin" };
          }
          const matcher = loadMatcher();
          if (matcher === null) {
            return { ok: false, reason: "matcher-unavailable" };
          }
          if (matcher(images.domains, images.remotePatterns, absoluteUrl)) {
            return { ok: true, reason: "pattern-match" };
          }
          return { ok: false, reason: "remote-pattern-not-matched" };
        }
        exports.validateImageUrl = validateImageUrl;
        function _resetImageConfigCacheForTests() {
          cachedConfig = void 0;
          cachedMatcher = void 0;
          warnedMatcherMissing = false;
        }
        exports._resetImageConfigCacheForTests = _resetImageConfigCacheForTests;
        function _setMatcherForTests(impl) {
          cachedMatcher = impl;
        }
        exports._setMatcherForTests = _setMatcherForTests;
      }
    });
    var require_image_proxy = __commonJS({
      "dist/runtime/image-proxy.js"(exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.handleImageProxy = void 0;
        var stream_1 = __require("stream");
        var gateway_auth_1 = require_gateway_auth();
        var image_config_1 = require_image_config();
        var GATEWAY_TIMEOUT_MS = 1e4;
        var PASSTHROUGH_HEADERS = [
          "content-type",
          "content-length",
          "cache-control",
          "etag",
          "vary",
          "last-modified",
          "content-security-policy"
        ];
        function resolveAbsoluteUrl(rawUrl, req) {
          if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
            return rawUrl;
          }
          const host = req.headers["host"];
          if (!host)
            return null;
          const protoHeader = req.headers["x-forwarded-proto"];
          const proto = (Array.isArray(protoHeader) ? protoHeader[0] : protoHeader) || (Array.isArray(protoHeader) ? protoHeader[0] : protoHeader) || "https";
          const path3 = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
          return `${proto}://${host}${path3}`;
        }
        function writeJson(res, status, body) {
          res.statusCode = status;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify(body));
        }
        async function handleImageProxy(req, res) {
          const reqUrl = req.url || "";
          const qIdx = reqUrl.indexOf("?");
          if (qIdx === -1) {
            return writeJson(res, 400, { error: "Missing query parameters" });
          }
          const params = new URLSearchParams(reqUrl.slice(qIdx + 1));
          const rawUrl = params.get("url");
          const w = params.get("w");
          const q = params.get("q");
          if (!rawUrl || !w) {
            return writeJson(res, 400, {
              error: "Missing required parameters: url, w"
            });
          }
          const absoluteUrl = resolveAbsoluteUrl(rawUrl, req);
          if (!absoluteUrl) {
            return writeJson(res, 500, {
              error: "Cannot resolve absolute URL: missing Host header"
            });
          }
          let parsedUrl;
          try {
            parsedUrl = new URL(absoluteUrl);
          } catch (_a) {
            return writeJson(res, 400, { error: "Invalid url parameter" });
          }
          const hostHeader = req.headers["host"] || "";
          const verdict = (0, image_config_1.validateImageUrl)(parsedUrl, hostHeader);
          if (!verdict.ok) {
            return writeJson(res, 400, { error: "url not allowed" });
          }
          const cfg = (0, gateway_auth_1.loadGatewayAuthConfig)();
          if (!cfg) {
            return writeJson(res, 500, {
              error: "Gateway auth config missing"
            });
          }
          const upstreamParams = new URLSearchParams({ url: absoluteUrl, w });
          if (q)
            upstreamParams.set("q", q);
          const upstreamPath = `/image/optimize?${upstreamParams}`;
          const ifNoneMatch = req.headers["if-none-match"];
          const upstreamHeaders = {};
          if (typeof ifNoneMatch === "string") {
            upstreamHeaders["if-none-match"] = ifNoneMatch;
          }
          const accept = req.headers["accept"];
          if (typeof accept === "string") {
            upstreamHeaders["accept"] = accept;
          }
          let upstream;
          try {
            upstream = await (0, gateway_auth_1.gatewayFetch)(cfg, upstreamPath, {
              method: "GET",
              headers: upstreamHeaders,
              timeoutMs: GATEWAY_TIMEOUT_MS
            });
          } catch (err) {
            if (err.name === "AbortError") {
              console.warn(`[image-proxy] Gateway timeout after ${GATEWAY_TIMEOUT_MS}ms: ${absoluteUrl}`);
              return writeJson(res, 504, { error: "Upstream timeout" });
            }
            console.warn(`[image-proxy] Gateway fetch error: ${err.message} (url=${absoluteUrl})`);
            return writeJson(res, 502, { error: "Bad gateway" });
          }
          res.statusCode = upstream.status;
          for (const name of PASSTHROUGH_HEADERS) {
            const value = upstream.headers.get(name);
            if (value !== null) {
              res.setHeader(name, value);
            }
          }
          if (upstream.status === 304 || !upstream.body) {
            res.end();
            return;
          }
          try {
            const nodeStream = stream_1.Readable.fromWeb(upstream.body);
            nodeStream.on("error", (err) => {
              console.warn(`[image-proxy] Stream error: ${err.message}`);
              if (!res.writableEnded)
                res.end();
            });
            nodeStream.pipe(res);
          } catch (err) {
            console.warn(`[image-proxy] Pipe setup failed: ${err.message}`);
            if (!res.headersSent) {
              writeJson(res, 502, { error: "Stream setup failed" });
            } else if (!res.writableEnded) {
              res.end();
            }
          }
        }
        exports2.handleImageProxy = handleImageProxy;
      }
    });
    var require_edge_context = __commonJS({
      "dist/runtime/edge-context.js"(exports2) {
        "use strict";
        var _a;
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.getCacheTags = exports2.setCacheTags = exports2.getEdgeContext = exports2.runWithEdgeContext = exports2.buildEdgeContextFromHeaders = void 0;
        var node_async_hooks_1 = __require("node:async_hooks");
        var ALS_KEY = Symbol.for("pcg.edgeContext.als");
        var globalRef = globalThis;
        var storage = (_a = globalRef[ALS_KEY]) !== null && _a !== void 0 ? _a : globalRef[ALS_KEY] = new node_async_hooks_1.AsyncLocalStorage();
        var SITE_ID_HEADER = "x-alicdn-site-id";
        var HOSTNAME_HEADER = "host";
        var FORWARDED_HOSTNAME_HEADER = "x-forwarded-host";
        function pickHeader(headers, name) {
          var _a2;
          return (_a2 = headers[name]) !== null && _a2 !== void 0 ? _a2 : headers[name.toLowerCase()];
        }
        function parseHostname(raw) {
          var _a2;
          if (!raw)
            return void 0;
          const first = (_a2 = raw.split(",")[0]) === null || _a2 === void 0 ? void 0 : _a2.trim();
          return first || void 0;
        }
        function parseSiteId(raw) {
          if (!raw)
            return void 0;
          const trimmed = raw.trim();
          if (!trimmed)
            return void 0;
          const n = Number(trimmed);
          return Number.isFinite(n) && trimmed === String(n) ? n : trimmed;
        }
        function buildEdgeContextFromHeaders(headers) {
          var _a2;
          const ctx = {};
          const siteId = parseSiteId(pickHeader(headers, SITE_ID_HEADER));
          if (siteId !== void 0)
            ctx.siteId = siteId;
          const hostname = (_a2 = parseHostname(pickHeader(headers, HOSTNAME_HEADER))) !== null && _a2 !== void 0 ? _a2 : parseHostname(pickHeader(headers, FORWARDED_HOSTNAME_HEADER));
          if (hostname)
            ctx.hostname = hostname;
          return ctx;
        }
        exports2.buildEdgeContextFromHeaders = buildEdgeContextFromHeaders;
        function runWithEdgeContext(headers, fn) {
          const ctx = buildEdgeContextFromHeaders(headers);
          return storage.run(ctx, fn);
        }
        exports2.runWithEdgeContext = runWithEdgeContext;
        function getEdgeContext() {
          var _a2;
          return (_a2 = storage.getStore()) !== null && _a2 !== void 0 ? _a2 : {};
        }
        exports2.getEdgeContext = getEdgeContext;
        function setCacheTags(tags) {
          const store = storage.getStore();
          if (store)
            store.cacheTags = tags;
        }
        exports2.setCacheTags = setCacheTags;
        function getCacheTags() {
          var _a2;
          return (_a2 = storage.getStore()) === null || _a2 === void 0 ? void 0 : _a2.cacheTags;
        }
        exports2.getCacheTags = getCacheTags;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var http = __require("http");
    var fs2 = __require("fs");
    var path2 = __require("path");
    var image_proxy_1 = require_image_proxy();
    var edge_context_1 = require_edge_context();
    var MIME_TYPES = {
      ".js": "application/javascript",
      ".mjs": "application/javascript",
      ".css": "text/css",
      ".html": "text/html",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
      ".ttf": "font/ttf",
      ".map": "application/json",
      ".txt": "text/plain",
      ".webp": "image/webp"
    };
    function parseQuery(url) {
      const idx = url.indexOf("?");
      if (idx === -1)
        return {};
      const params = {};
      const searchParams = new URLSearchParams(url.slice(idx + 1));
      for (const [key, value] of searchParams) {
        const existing = params[key];
        if (existing === void 0) {
          params[key] = value;
        } else if (Array.isArray(existing)) {
          existing.push(value);
        } else {
          params[key] = [existing, value];
        }
      }
      return params;
    }
    function parseCookies(cookieHeader) {
      if (!cookieHeader)
        return {};
      const cookies = {};
      for (const pair of cookieHeader.split(";")) {
        const eqIdx = pair.indexOf("=");
        if (eqIdx === -1)
          continue;
        const name = pair.slice(0, eqIdx).trim();
        const value = pair.slice(eqIdx + 1).trim();
        if (name)
          cookies[name] = value;
      }
      return cookies;
    }
    function flattenHeaders(rawHeaders) {
      const headers = {};
      for (const [key, value] of Object.entries(rawHeaders)) {
        if (value === void 0)
          continue;
        headers[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : value;
      }
      return headers;
    }
    async function readBody(req) {
      if (req.method === "GET" || req.method === "HEAD")
        return void 0;
      return new Promise((resolve, reject) => {
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        req.on("error", reject);
      });
    }
    function serveStaticFile(assetsDir, req, res) {
      var _a, _b;
      const urlPath = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("?")[0]) !== null && _b !== void 0 ? _b : "/";
      if (urlPath === "/" || !urlPath.startsWith("/"))
        return false;
      const filePath = path2.join(assetsDir, urlPath);
      const normalizedPath = path2.normalize(filePath);
      if (!normalizedPath.startsWith(assetsDir)) {
        res.writeHead(403);
        res.end();
        return true;
      }
      let stat;
      try {
        stat = fs2.statSync(normalizedPath);
      } catch (_c) {
        return false;
      }
      if (!stat.isFile())
        return false;
      const ext = path2.extname(normalizedPath);
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      const isHashedAsset = urlPath.startsWith("/_next/static/");
      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": stat.size,
        "Cache-Control": isHashedAsset ? "public, max-age=31536000, immutable" : "public, max-age=60"
      });
      fs2.createReadStream(normalizedPath).pipe(res);
      return true;
    }
    function bridgeOpenNextHandler(handler) {
      return async (req, res) => {
        var _a, _b, _c, _d, _e, _f;
        try {
          const rawUrl = req.url || "/";
          const headers = flattenHeaders(req.headers);
          const body = await readBody(req);
          const host = headers["host"] || `localhost:${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000"}`;
          const proto = ((_c = (_b = headers["x-forwarded-proto"]) === null || _b === void 0 ? void 0 : _b.split(",")[0]) === null || _c === void 0 ? void 0 : _c.trim()) || "http";
          const absoluteUrl = new URL(`${proto}://${host}${rawUrl}`);
          const event = {
            type: "core",
            method: req.method || "GET",
            rawPath: absoluteUrl.pathname,
            url: absoluteUrl.href,
            body,
            headers,
            query: parseQuery(rawUrl),
            cookies: parseCookies(headers["cookie"]),
            remoteAddress: ((_e = (_d = headers["x-forwarded-for"]) === null || _d === void 0 ? void 0 : _d.split(",")[0]) === null || _e === void 0 ? void 0 : _e.trim()) || headers["x-real-ip"] || ((_f = req.socket) === null || _f === void 0 ? void 0 : _f.remoteAddress) || "127.0.0.1"
          };
          const abortController = new AbortController();
          res.on("close", () => abortController.abort());
          const streamCreator = {
            writeHeaders(prelude) {
              const cacheTags = (0, edge_context_1.getCacheTags)();
              if (cacheTags) {
                res.setHeader("Cache-Tag", cacheTags);
              }
              delete prelude.headers["x-next-cache-tags"];
              res.setHeader("Set-Cookie", prelude.cookies);
              res.writeHead(prelude.statusCode, prelude.headers);
              res.flushHeaders();
              return res;
            },
            abortSignal: abortController.signal
          };
          await (0, edge_context_1.runWithEdgeContext)(headers, () => handler(event, { streamCreator }));
        } catch (err) {
          if (!res.headersSent) {
            const isDev = process.env.NODE_ENV !== "production";
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
              error: "Internal Server Error",
              ...isDev && { message: err.message, stack: err.stack }
            }));
          } else if (!res.writableEnded) {
            res.end();
          }
        }
      };
    }
    async function wrapper(handler) {
      var _a;
      const port = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : "3000", 10);
      const assetsDir = path2.resolve(process.cwd(), "..", "..", "assets");
      if (!fs2.existsSync(assetsDir)) {
        console.warn(`[pcg-node] assets directory not found at ${assetsDir} \u2014 static file requests will fall through to Next handler`);
      }
      const dispatchToNext = bridgeOpenNextHandler(handler);
      const server = http.createServer(async (req, res) => {
        var _a2, _b;
        const urlPath = (_b = (_a2 = req.url) === null || _a2 === void 0 ? void 0 : _a2.split("?")[0]) !== null && _b !== void 0 ? _b : "/";
        if (urlPath === "/__health") {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("OK");
          return;
        }
        if (urlPath === "/_next/image") {
          try {
            await (0, image_proxy_1.handleImageProxy)(req, res);
          } catch (err) {
            console.error("[pcg-node] image-proxy error:", err);
            if (!res.headersSent) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Image proxy failed" }));
            } else if (!res.writableEnded) {
              res.end();
            }
          }
          return;
        }
        if (serveStaticFile(assetsDir, req, res))
          return;
        await dispatchToNext(req, res);
      });
      let shuttingDown = false;
      const shutdown = (signal) => {
        if (shuttingDown)
          return;
        shuttingDown = true;
        console.log(`[pcg-node] ${signal} received, shutting down...`);
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(0), 5e3).unref();
      };
      process.on("SIGINT", () => shutdown("SIGINT"));
      process.on("SIGTERM", () => shutdown("SIGTERM"));
      await new Promise((resolve) => {
        server.listen(port, () => {
          console.log(`[pcg-node] Listening on port ${port}`);
          console.log(`[pcg-node]   assets:  ${assetsDir}`);
          console.log(`[pcg-node]   routes:  /__health, /_next/image, /_next/static/*, <next>`);
          resolve();
        });
      });
    }
    var wrapperDef = {
      wrapper,
      name: "pcg-node",
      supportStreaming: true
    };
    exports.default = wrapperDef;
  }
});

// .pcg/overrides/adapters/converters/passthrough.js
var require_passthrough = __commonJS2({
  ".pcg/overrides/adapters/converters/passthrough.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var converter = {
      convertFrom: async (event) => event,
      convertTo: async (result) => result,
      name: "passthrough"
    };
    exports2.default = converter;
  }
});

// .pcg/overrides/overrides/incrementalCache/gateway.js
var require_gateway = __commonJS2({
  ".pcg/overrides/overrides/incrementalCache/gateway.js"(exports2) {
    "use strict";
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __commonJS3 = (cb, mod2) => function __require2() {
      return mod2 || (0, cb[__getOwnPropNames3(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
    };
    var require_types = __commonJS3({
      "dist/_protocol/types.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
      }
    });
    var require_keys = __commonJS3({
      "dist/_protocol/keys.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.buildPageMetadataKey = exports22.buildTagKey = exports22.buildStaticAssetKey = exports22.buildOssKey = void 0;
        function stripLeadingSlash(s) {
          return s.replace(/^\/+/, "");
        }
        function buildOssKey(params) {
          const { appId, buildId, cacheType = "cache" } = params;
          const key = stripLeadingSlash(params.key);
          if (cacheType === "fetch") {
            return `${appId}/__fetch/${buildId}/${key}`;
          }
          return `${appId}/${buildId}/${key}.cache`;
        }
        exports22.buildOssKey = buildOssKey;
        function buildStaticAssetKey(params) {
          const p = stripLeadingSlash(params.path);
          return `${params.appId}/_next/static/${p}`;
        }
        exports22.buildStaticAssetKey = buildStaticAssetKey;
        function buildTagKey(params) {
          return {
            app_id: params.appId,
            tag: `${params.buildId}/${params.tag}`,
            path: `${params.buildId}/${params.path}`
          };
        }
        exports22.buildTagKey = buildTagKey;
        function buildPageMetadataKey(params) {
          return {
            app_id: params.appId,
            url: params.url
          };
        }
        exports22.buildPageMetadataKey = buildPageMetadataKey;
      }
    });
    var require_endpoints = __commonJS3({
      "dist/_protocol/endpoints.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.buildCentralEndpoints = void 0;
        function stripTrailingSlashes(s) {
          return s.replace(/\/+$/, "");
        }
        function buildCentralEndpoints(base) {
          const b = stripTrailingSlashes(base);
          return {
            base: b,
            cache: `${b}/cache`,
            cacheRefresh: `${b}/cache/refresh`,
            revalidateTag: `${b}/revalidate/tag`,
            revalidatePath: `${b}/revalidate/path`,
            tagByTag: `${b}/tag/by-tag`,
            tagByPath: `${b}/tag/by-path`,
            tagLastModified: `${b}/tag/last-modified`,
            tagWrite: `${b}/tag/write`,
            deploySts: `${b}/deploy/sts-token`,
            deployTags: `${b}/deploy/tags`
          };
        }
        exports22.buildCentralEndpoints = buildCentralEndpoints;
      }
    });
    var require_protocol = __commonJS3({
      "dist/_protocol/index.js"(exports22) {
        "use strict";
        var __createBinding = exports22 && exports22.__createBinding || (Object.create ? function(o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          var desc = Object.getOwnPropertyDescriptor(m, k);
          if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() {
              return m[k];
            } };
          }
          Object.defineProperty(o, k2, desc);
        } : function(o, m, k, k2) {
          if (k2 === void 0) k2 = k;
          o[k2] = m[k];
        });
        var __exportStar = exports22 && exports22.__exportStar || function(m, exports3) {
          for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
        };
        Object.defineProperty(exports22, "__esModule", { value: true });
        __exportStar(require_types(), exports22);
        __exportStar(require_keys(), exports22);
        __exportStar(require_endpoints(), exports22);
      }
    });
    var require_gateway_auth2 = __commonJS3({
      "dist/runtime/gateway-auth.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.gatewayFetch = exports22.signGatewayHeaders = exports22.loadGatewayAuthConfig = void 0;
        var crypto_1 = __require("crypto");
        var DEFAULT_TTL_MS = 5 * 60 * 1e3;
        var DEFAULT_TIMEOUT_MS = 5e3;
        function _fetch(input, init) {
          var _a, _b;
          const gf = globalThis.fetch;
          const fn = gf.__nextPatched ? (_b = (_a = gf._nextOriginalFetch) !== null && _a !== void 0 ? _a : globalThis.__originalFetch) !== null && _b !== void 0 ? _b : gf : gf;
          return fn(input, init);
        }
        function loadGatewayAuthConfig() {
          const gatewayUrl = process.env.ESA_CACHE_GW_GATEWAY_ENDPOINT;
          const secret = process.env.ESA_CACHE_GW_AUTH_KEY;
          const aliuid = process.env.ESA_CACHE_GW_ALIUID;
          const routinename = process.env.ESA_CACHE_GW_ROUTINENAME;
          const version = process.env.ESA_CACHE_GW_VERSION;
          const missing = [];
          if (!gatewayUrl)
            missing.push("ESA_CACHE_GW_GATEWAY_ENDPOINT");
          if (!secret)
            missing.push("ESA_CACHE_GW_AUTH_KEY");
          if (!aliuid)
            missing.push("ESA_CACHE_GW_ALIUID");
          if (!routinename)
            missing.push("ESA_CACHE_GW_ROUTINENAME");
          if (!version)
            missing.push("ESA_CACHE_GW_VERSION");
          if (missing.length > 0) {
            console.error(`[gateway-auth] \u7F3A\u5C11\u5FC5\u9700\u7684\u73AF\u5883\u53D8\u91CF: ${missing.join(", ")}`);
            return null;
          }
          return {
            gatewayUrl: gatewayUrl.replace(/\/+$/, ""),
            secret,
            aliuid,
            routinename,
            version
          };
        }
        exports22.loadGatewayAuthConfig = loadGatewayAuthConfig;
        function signGatewayHeaders(cfg, ttlMs = DEFAULT_TTL_MS) {
          const expires = String(Date.now() + ttlMs);
          const authKey = (0, crypto_1.createHmac)("sha256", cfg.secret).update(`${cfg.aliuid}${cfg.routinename}${cfg.version}`).digest("hex");
          const md5Hash = (0, crypto_1.createHash)("md5").update(`${authKey}${expires}${cfg.aliuid}${cfg.routinename}${cfg.version}`).digest("hex");
          return {
            authorization: `${expires}-${md5Hash}`,
            aliuid: cfg.aliuid,
            routinename: cfg.routinename,
            version: cfg.version
          };
        }
        exports22.signGatewayHeaders = signGatewayHeaders;
        async function gatewayFetch(cfg, pathOrUrl, init) {
          var _a, _b;
          const url = pathOrUrl.startsWith("/") ? `${cfg.gatewayUrl}${pathOrUrl}` : pathOrUrl;
          const signed = signGatewayHeaders(cfg);
          const headers = new Headers(init === null || init === void 0 ? void 0 : init.headers);
          headers.set("Authorization", signed.authorization);
          headers.set("AliUid", signed.aliuid);
          headers.set("RoutineName", signed.routinename);
          headers.set("Version", signed.version);
          const timeoutMs = (_a = init === null || init === void 0 ? void 0 : init.timeoutMs) !== null && _a !== void 0 ? _a : DEFAULT_TIMEOUT_MS;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), timeoutMs);
          try {
            return await _fetch(url, {
              ...init,
              headers,
              signal: (_b = init === null || init === void 0 ? void 0 : init.signal) !== null && _b !== void 0 ? _b : controller.signal
            });
          } finally {
            clearTimeout(timer);
          }
        }
        exports22.gatewayFetch = gatewayFetch;
      }
    });
    var require_edge_context2 = __commonJS3({
      "dist/runtime/edge-context.js"(exports22) {
        "use strict";
        var _a;
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.getCacheTags = exports22.setCacheTags = exports22.getEdgeContext = exports22.runWithEdgeContext = exports22.buildEdgeContextFromHeaders = void 0;
        var node_async_hooks_1 = __require("node:async_hooks");
        var ALS_KEY = Symbol.for("pcg.edgeContext.als");
        var globalRef = globalThis;
        var storage = (_a = globalRef[ALS_KEY]) !== null && _a !== void 0 ? _a : globalRef[ALS_KEY] = new node_async_hooks_1.AsyncLocalStorage();
        var SITE_ID_HEADER = "x-alicdn-site-id";
        var HOSTNAME_HEADER = "host";
        var FORWARDED_HOSTNAME_HEADER = "x-forwarded-host";
        function pickHeader(headers, name) {
          var _a2;
          return (_a2 = headers[name]) !== null && _a2 !== void 0 ? _a2 : headers[name.toLowerCase()];
        }
        function parseHostname(raw) {
          var _a2;
          if (!raw)
            return void 0;
          const first = (_a2 = raw.split(",")[0]) === null || _a2 === void 0 ? void 0 : _a2.trim();
          return first || void 0;
        }
        function parseSiteId(raw) {
          if (!raw)
            return void 0;
          const trimmed = raw.trim();
          if (!trimmed)
            return void 0;
          const n = Number(trimmed);
          return Number.isFinite(n) && trimmed === String(n) ? n : trimmed;
        }
        function buildEdgeContextFromHeaders(headers) {
          var _a2;
          const ctx = {};
          const siteId = parseSiteId(pickHeader(headers, SITE_ID_HEADER));
          if (siteId !== void 0)
            ctx.siteId = siteId;
          const hostname = (_a2 = parseHostname(pickHeader(headers, HOSTNAME_HEADER))) !== null && _a2 !== void 0 ? _a2 : parseHostname(pickHeader(headers, FORWARDED_HOSTNAME_HEADER));
          if (hostname)
            ctx.hostname = hostname;
          return ctx;
        }
        exports22.buildEdgeContextFromHeaders = buildEdgeContextFromHeaders;
        function runWithEdgeContext(headers, fn) {
          const ctx = buildEdgeContextFromHeaders(headers);
          return storage.run(ctx, fn);
        }
        exports22.runWithEdgeContext = runWithEdgeContext;
        function getEdgeContext() {
          var _a2;
          return (_a2 = storage.getStore()) !== null && _a2 !== void 0 ? _a2 : {};
        }
        exports22.getEdgeContext = getEdgeContext;
        function setCacheTags(tags) {
          const store = storage.getStore();
          if (store)
            store.cacheTags = tags;
        }
        exports22.setCacheTags = setCacheTags;
        function getCacheTags() {
          var _a2;
          return (_a2 = storage.getStore()) === null || _a2 === void 0 ? void 0 : _a2.cacheTags;
        }
        exports22.getCacheTags = getCacheTags;
      }
    });
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs3 = __require("fs");
    var path3 = __require("path");
    var protocol_1 = require_protocol();
    var gateway_auth_1 = require_gateway_auth2();
    var edge_context_12 = require_edge_context2();
    var GET_TIMEOUT = 5e3;
    var SET_TIMEOUT = 1e4;
    var DELETE_TIMEOUT = 5e3;
    function buildKey(config2, key, isFetchOrType) {
      let cacheType;
      if (typeof isFetchOrType === "string") {
        cacheType = isFetchOrType === "fetch" ? "fetch" : "cache";
      } else {
        cacheType = isFetchOrType ? "fetch" : "cache";
      }
      return (0, protocol_1.buildOssKey)({
        appId: `${config2.aliuid}/${config2.routinename}`,
        buildId: config2.version,
        key,
        cacheType
      });
    }
    var GatewayIncrementalCache = class {
      constructor() {
        this.name = "gateway-incremental-cache";
        this.config = null;
        this.configLoaded = false;
      }
      /**
       * 延迟加载配置，避免在构造函数中因环境变量缺失而阻塞 Function 启动。
       */
      getConfig() {
        if (!this.configLoaded) {
          this.config = (0, gateway_auth_1.loadGatewayAuthConfig)();
          this.configLoaded = true;
        }
        return this.config;
      }
      /**
       * 从 Gateway 读取缓存。
       * Gateway 不可用时降级读 .open-next/cache/ 下的预构建文件(本地开发)。
       */
      async get(key, isFetch) {
        var _a, _b;
        const config2 = this.getConfig();
        if (!config2)
          return this.getFromLocalCache(key, isFetch);
        const ossKey = buildKey(config2, key, isFetch);
        try {
          const res = await (0, gateway_auth_1.gatewayFetch)(config2, `/storage/${ossKey}`, {
            method: "GET",
            timeoutMs: GET_TIMEOUT
          });
          if (res.status === 404)
            return null;
          if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
              console.error(`[incrementalCache] GET \u88AB\u62D2\u7EDD: key="${ossKey}" (${res.status})\uFF0C\u8BF7\u68C0\u67E5\u7B7E\u540D secret \u6216 key \u524D\u7F00`);
            } else {
              console.warn(`[incrementalCache] GET \u5931\u8D25: key="${ossKey}", \u72B6\u6001\u7801=${res.status}`);
            }
            return null;
          }
          const body = await res.text();
          let envelope;
          try {
            envelope = JSON.parse(body);
          } catch (_c) {
            console.warn(`[incrementalCache] JSON \u89E3\u6790\u5931\u8D25: key="${ossKey}"`);
            return null;
          }
          if (!envelope || typeof envelope !== "object" || typeof envelope.lastModified !== "number") {
            console.warn(`[incrementalCache] envelope \u683C\u5F0F\u5F02\u5E38\u6216\u7F3A lastModified: key="${ossKey}"`);
            return null;
          }
          const val = envelope.value;
          const tags = (_b = (_a = val === null || val === void 0 ? void 0 : val.meta) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b["x-next-cache-tags"];
          if (typeof tags === "string") {
            (0, edge_context_12.setCacheTags)(tags);
          }
          return { value: envelope.value, lastModified: envelope.lastModified };
        } catch (err) {
          if (err.name === "AbortError") {
            console.warn(`[incrementalCache] GET \u8D85\u65F6: key="${ossKey}" (${GET_TIMEOUT}ms)`);
          } else {
            console.warn(`[incrementalCache] GET \u5F02\u5E38: key="${ossKey}", ${err.message}`);
          }
          return null;
        }
      }
      /**
       * 向 Gateway 写入缓存。
       */
      async set(key, value, isFetch) {
        var _a, _b;
        const tags = (_b = (_a = value === null || value === void 0 ? void 0 : value.meta) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b["x-next-cache-tags"];
        if (typeof tags === "string") {
          (0, edge_context_12.setCacheTags)(tags);
        }
        const config2 = this.getConfig();
        if (!config2)
          return;
        const ossKey = buildKey(config2, key, isFetch);
        const body = JSON.stringify({ lastModified: Date.now(), value });
        try {
          const res = await (0, gateway_auth_1.gatewayFetch)(config2, `/storage/${ossKey}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body,
            timeoutMs: SET_TIMEOUT
          });
          if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
              console.error(`[incrementalCache] PUT \u88AB\u62D2\u7EDD: key="${ossKey}" (${res.status})\uFF0C\u8BF7\u68C0\u67E5\u7B7E\u540D secret \u6216 key \u524D\u7F00`);
            } else {
              console.warn(`[incrementalCache] PUT \u5931\u8D25: key="${ossKey}", \u72B6\u6001\u7801=${res.status}`);
            }
          }
        } catch (err) {
          if (err.name === "AbortError") {
            console.warn(`[incrementalCache] PUT \u8D85\u65F6: key="${ossKey}" (${SET_TIMEOUT}ms)`);
          } else {
            console.warn(`[incrementalCache] PUT \u5F02\u5E38: key="${ossKey}", ${err.message}`);
          }
        }
      }
      /**
       * 本地开发降级:读 .open-next/cache/{buildId}/{key}.cache。
       * 仅在 Gateway 不可用时启用,让 pcg serve 本地也能走 cache HIT 路径。
       */
      getFromLocalCache(key, _isFetch) {
        var _a, _b;
        try {
          const cacheDir = path3.resolve(process.cwd(), "..", "..", "cache");
          const buildIds = fs3.readdirSync(cacheDir).filter((d) => {
            try {
              return fs3.statSync(path3.join(cacheDir, d)).isDirectory();
            } catch (_a2) {
              return false;
            }
          });
          for (const bid of buildIds) {
            const filePath = path3.join(cacheDir, bid, `${key}.cache`);
            try {
              const raw = fs3.readFileSync(filePath, "utf-8");
              const value = JSON.parse(raw);
              const stat = fs3.statSync(filePath);
              const tags = (_b = (_a = value === null || value === void 0 ? void 0 : value.meta) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b["x-next-cache-tags"];
              if (typeof tags === "string") {
                (0, edge_context_12.setCacheTags)(tags);
              }
              console.log(`[incrementalCache] local cache HIT: key="${key}" tags=${tags !== null && tags !== void 0 ? tags : "\u2205"}`);
              return { value, lastModified: stat.mtimeMs };
            } catch (_c) {
              continue;
            }
          }
        } catch (_d) {
        }
        return null;
      }
      /**
       * 通过 Gateway 删除缓存。
       */
      async delete(key, isFetch) {
        const config2 = this.getConfig();
        if (!config2)
          return;
        const ossKey = buildKey(config2, key, isFetch);
        try {
          const res = await (0, gateway_auth_1.gatewayFetch)(config2, `/storage/${ossKey}`, {
            method: "DELETE",
            timeoutMs: DELETE_TIMEOUT
          });
          if (res.status === 404)
            return;
          if (!res.ok) {
            if (res.status === 401 || res.status === 403) {
              console.error(`[incrementalCache] DELETE \u88AB\u62D2\u7EDD: key="${ossKey}" (${res.status})\uFF0C\u8BF7\u68C0\u67E5\u7B7E\u540D secret \u6216 key \u524D\u7F00`);
            } else {
              console.warn(`[incrementalCache] DELETE \u5931\u8D25: key="${ossKey}", \u72B6\u6001\u7801=${res.status}`);
            }
          }
        } catch (err) {
          if (err.name === "AbortError") {
            console.warn(`[incrementalCache] DELETE \u8D85\u65F6: key="${ossKey}" (${DELETE_TIMEOUT}ms)`);
          } else {
            console.warn(`[incrementalCache] DELETE \u5F02\u5E38: key="${ossKey}", ${err.message}`);
          }
        }
      }
    };
    exports2.default = GatewayIncrementalCache;
  }
});

// .pcg/overrides/overrides/tagCache/gateway.js
var require_gateway2 = __commonJS2({
  ".pcg/overrides/overrides/tagCache/gateway.js"(exports2) {
    "use strict";
    var __getOwnPropNames3 = Object.getOwnPropertyNames;
    var __commonJS3 = (cb, mod2) => function __require2() {
      return mod2 || (0, cb[__getOwnPropNames3(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
    };
    var require_gateway_auth2 = __commonJS3({
      "dist/runtime/gateway-auth.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.gatewayFetch = exports22.signGatewayHeaders = exports22.loadGatewayAuthConfig = void 0;
        var crypto_1 = __require("crypto");
        var DEFAULT_TTL_MS = 5 * 60 * 1e3;
        var DEFAULT_TIMEOUT_MS = 5e3;
        function _fetch(input, init) {
          var _a, _b;
          const gf = globalThis.fetch;
          const fn = gf.__nextPatched ? (_b = (_a = gf._nextOriginalFetch) !== null && _a !== void 0 ? _a : globalThis.__originalFetch) !== null && _b !== void 0 ? _b : gf : gf;
          return fn(input, init);
        }
        function loadGatewayAuthConfig() {
          const gatewayUrl = process.env.ESA_CACHE_GW_GATEWAY_ENDPOINT;
          const secret = process.env.ESA_CACHE_GW_AUTH_KEY;
          const aliuid = process.env.ESA_CACHE_GW_ALIUID;
          const routinename = process.env.ESA_CACHE_GW_ROUTINENAME;
          const version = process.env.ESA_CACHE_GW_VERSION;
          const missing = [];
          if (!gatewayUrl)
            missing.push("ESA_CACHE_GW_GATEWAY_ENDPOINT");
          if (!secret)
            missing.push("ESA_CACHE_GW_AUTH_KEY");
          if (!aliuid)
            missing.push("ESA_CACHE_GW_ALIUID");
          if (!routinename)
            missing.push("ESA_CACHE_GW_ROUTINENAME");
          if (!version)
            missing.push("ESA_CACHE_GW_VERSION");
          if (missing.length > 0) {
            console.error(`[gateway-auth] \u7F3A\u5C11\u5FC5\u9700\u7684\u73AF\u5883\u53D8\u91CF: ${missing.join(", ")}`);
            return null;
          }
          return {
            gatewayUrl: gatewayUrl.replace(/\/+$/, ""),
            secret,
            aliuid,
            routinename,
            version
          };
        }
        exports22.loadGatewayAuthConfig = loadGatewayAuthConfig;
        function signGatewayHeaders(cfg, ttlMs = DEFAULT_TTL_MS) {
          const expires = String(Date.now() + ttlMs);
          const authKey = (0, crypto_1.createHmac)("sha256", cfg.secret).update(`${cfg.aliuid}${cfg.routinename}${cfg.version}`).digest("hex");
          const md5Hash = (0, crypto_1.createHash)("md5").update(`${authKey}${expires}${cfg.aliuid}${cfg.routinename}${cfg.version}`).digest("hex");
          return {
            authorization: `${expires}-${md5Hash}`,
            aliuid: cfg.aliuid,
            routinename: cfg.routinename,
            version: cfg.version
          };
        }
        exports22.signGatewayHeaders = signGatewayHeaders;
        async function gatewayFetch(cfg, pathOrUrl, init) {
          var _a, _b;
          const url = pathOrUrl.startsWith("/") ? `${cfg.gatewayUrl}${pathOrUrl}` : pathOrUrl;
          const signed = signGatewayHeaders(cfg);
          const headers = new Headers(init === null || init === void 0 ? void 0 : init.headers);
          headers.set("Authorization", signed.authorization);
          headers.set("AliUid", signed.aliuid);
          headers.set("RoutineName", signed.routinename);
          headers.set("Version", signed.version);
          const timeoutMs = (_a = init === null || init === void 0 ? void 0 : init.timeoutMs) !== null && _a !== void 0 ? _a : DEFAULT_TIMEOUT_MS;
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), timeoutMs);
          try {
            return await _fetch(url, {
              ...init,
              headers,
              signal: (_b = init === null || init === void 0 ? void 0 : init.signal) !== null && _b !== void 0 ? _b : controller.signal
            });
          } finally {
            clearTimeout(timer);
          }
        }
        exports22.gatewayFetch = gatewayFetch;
      }
    });
    var require_edge_context2 = __commonJS3({
      "dist/runtime/edge-context.js"(exports22) {
        "use strict";
        var _a;
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.getCacheTags = exports22.setCacheTags = exports22.getEdgeContext = exports22.runWithEdgeContext = exports22.buildEdgeContextFromHeaders = void 0;
        var node_async_hooks_1 = __require("node:async_hooks");
        var ALS_KEY = Symbol.for("pcg.edgeContext.als");
        var globalRef = globalThis;
        var storage = (_a = globalRef[ALS_KEY]) !== null && _a !== void 0 ? _a : globalRef[ALS_KEY] = new node_async_hooks_1.AsyncLocalStorage();
        var SITE_ID_HEADER = "x-alicdn-site-id";
        var HOSTNAME_HEADER = "host";
        var FORWARDED_HOSTNAME_HEADER = "x-forwarded-host";
        function pickHeader(headers, name) {
          var _a2;
          return (_a2 = headers[name]) !== null && _a2 !== void 0 ? _a2 : headers[name.toLowerCase()];
        }
        function parseHostname(raw) {
          var _a2;
          if (!raw)
            return void 0;
          const first = (_a2 = raw.split(",")[0]) === null || _a2 === void 0 ? void 0 : _a2.trim();
          return first || void 0;
        }
        function parseSiteId(raw) {
          if (!raw)
            return void 0;
          const trimmed = raw.trim();
          if (!trimmed)
            return void 0;
          const n = Number(trimmed);
          return Number.isFinite(n) && trimmed === String(n) ? n : trimmed;
        }
        function buildEdgeContextFromHeaders(headers) {
          var _a2;
          const ctx = {};
          const siteId = parseSiteId(pickHeader(headers, SITE_ID_HEADER));
          if (siteId !== void 0)
            ctx.siteId = siteId;
          const hostname = (_a2 = parseHostname(pickHeader(headers, HOSTNAME_HEADER))) !== null && _a2 !== void 0 ? _a2 : parseHostname(pickHeader(headers, FORWARDED_HOSTNAME_HEADER));
          if (hostname)
            ctx.hostname = hostname;
          return ctx;
        }
        exports22.buildEdgeContextFromHeaders = buildEdgeContextFromHeaders;
        function runWithEdgeContext(headers, fn) {
          const ctx = buildEdgeContextFromHeaders(headers);
          return storage.run(ctx, fn);
        }
        exports22.runWithEdgeContext = runWithEdgeContext;
        function getEdgeContext() {
          var _a2;
          return (_a2 = storage.getStore()) !== null && _a2 !== void 0 ? _a2 : {};
        }
        exports22.getEdgeContext = getEdgeContext;
        function setCacheTags(tags) {
          const store = storage.getStore();
          if (store)
            store.cacheTags = tags;
        }
        exports22.setCacheTags = setCacheTags;
        function getCacheTags() {
          var _a2;
          return (_a2 = storage.getStore()) === null || _a2 === void 0 ? void 0 : _a2.cacheTags;
        }
        exports22.getCacheTags = getCacheTags;
      }
    });
    var require_build_id = __commonJS3({
      "dist/runtime/build-id.js"(exports22) {
        "use strict";
        Object.defineProperty(exports22, "__esModule", { value: true });
        exports22.__setBuildIdForTest = exports22.__resetBuildIdCache = exports22.loadBuildId = void 0;
        var fs3 = __require("fs");
        var path3 = __require("path");
        var cached;
        function loadBuildId() {
          var _a;
          if (cached !== void 0)
            return cached;
          const p = path3.join(__dirname, ".next", "BUILD_ID");
          try {
            const v = fs3.readFileSync(p, "utf-8").trim();
            cached = v || null;
          } catch (err) {
            if ((err === null || err === void 0 ? void 0 : err.code) !== "ENOENT") {
              console.warn(`[build-id] BUILD_ID read error ${p}: ${(_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err}`);
            } else {
              console.warn(`[build-id] BUILD_ID not found at ${p}`);
            }
            cached = null;
          }
          return cached;
        }
        exports22.loadBuildId = loadBuildId;
        function __resetBuildIdCache() {
          cached = void 0;
        }
        exports22.__resetBuildIdCache = __resetBuildIdCache;
        function __setBuildIdForTest(v) {
          cached = v;
        }
        exports22.__setBuildIdForTest = __setBuildIdForTest;
      }
    });
    Object.defineProperty(exports2, "__esModule", { value: true });
    var gateway_auth_1 = require_gateway_auth2();
    var edge_context_12 = require_edge_context2();
    var build_id_1 = require_build_id();
    var QUERY_TIMEOUT = 3e3;
    var WRITE_TIMEOUT = 5e3;
    var BATCH_SIZE = 200;
    var PURGE_TIMEOUT = 15e3;
    function stripLeadingSlash(s) {
      return s.replace(/^\/+/, "");
    }
    var GatewayTagCache = class {
      constructor() {
        this.name = "gateway-tag-cache";
        this.mode = "nextMode";
        this.config = null;
        this.configLoaded = false;
      }
      getConfig() {
        if (!this.configLoaded) {
          this.config = (0, gateway_auth_1.loadGatewayAuthConfig)();
          this.configLoaded = true;
        }
        return this.config;
      }
      /**
       * 拼 TableStore tag 主键:`{buildId}/{tag}`。
       *
       * 使用 BUILD_ID(Next.js 构建产物身份)而非 cfg.version(ESA 平台版本号),
       * 原因:同一个 buildId 内 manifest 与 tag 行身份严格一致,避免
       * 部署侧注入 ESA_CACHE_GW_VERSION 与构建期 BUILD_ID 不一致时 key 全部错位。
       *
       * BUILD_ID 读不到(老 bundle / 错误可靠度) → 降级为不加前缀,与老版本行为兼容。
       */
      buildTagKey(tag) {
        const buildId = (0, build_id_1.loadBuildId)();
        const prefix = buildId ? `${buildId}/` : "";
        return `${prefix}${stripLeadingSlash(tag)}`;
      }
      async getLastRevalidated(tags) {
        const config2 = this.getConfig();
        if (!config2)
          return 0;
        try {
          const rows = await this.batchGetTags(config2, tags);
          let maxRevalidatedAt = 0;
          for (const row of rows) {
            if (row.revalidatedAt && row.revalidatedAt > maxRevalidatedAt) {
              maxRevalidatedAt = row.revalidatedAt;
            }
          }
          return maxRevalidatedAt;
        } catch (err) {
          console.warn(`[tagCache] getLastRevalidated error: ${err.message}`);
          return 0;
        }
      }
      async hasBeenRevalidated(tags, lastModified) {
        const config2 = this.getConfig();
        if (!config2)
          return false;
        if (tags.length === 0)
          return false;
        try {
          const rows = await this.batchGetTags(config2, tags);
          const now = Date.now();
          const lm = lastModified !== null && lastModified !== void 0 ? lastModified : 0;
          for (const row of rows) {
            if (row.expire !== void 0) {
              if (row.expire <= now && row.expire > lm) {
                return true;
              }
              continue;
            }
            if (row.revalidatedAt !== void 0 && row.revalidatedAt > lm) {
              return true;
            }
          }
          return false;
        } catch (err) {
          console.warn(`[tagCache] hasBeenRevalidated error: ${err.message}`);
          return false;
        }
      }
      async isStale(tags, lastModified) {
        var _a;
        const config2 = this.getConfig();
        if (!config2)
          return false;
        if (tags.length === 0)
          return false;
        try {
          const rows = await this.batchGetTags(config2, tags);
          const lm = lastModified !== null && lastModified !== void 0 ? lastModified : 0;
          for (const row of rows) {
            if (row.stale === void 0)
              continue;
            const revalidatedAt = (_a = row.revalidatedAt) !== null && _a !== void 0 ? _a : 0;
            if (revalidatedAt > lm && row.stale >= lm) {
              return true;
            }
          }
          return false;
        } catch (err) {
          console.warn(`[tagCache] isStale error: ${err.message}`);
          return false;
        }
      }
      async writeTags(tags) {
        if (!tags || tags.length === 0)
          return;
        const config2 = this.getConfig();
        if (!config2)
          return;
        const writeTs = Date.now();
        const rows = tags.map((input) => {
          const tagStr = typeof input === "string" ? input : input.tag;
          const stale = typeof input === "string" ? void 0 : input.stale;
          const expire = typeof input === "string" ? void 0 : input.expire;
          const tagKey = this.buildTagKey(tagStr);
          const revalidatedAt = stale !== null && stale !== void 0 ? stale : writeTs;
          const staleStr = stale === void 0 ? "\u2205" : String(stale);
          const expireStr = expire === void 0 ? "\u2205" : String(expire);
          console.log(`[tagCache] writeTags: tag="${tagStr}" key="${tagKey}" revalidatedAt=${revalidatedAt} stale=${staleStr} expire=${expireStr}`);
          const columns = [
            { name: "revalidatedAt", value: revalidatedAt }
          ];
          if (stale !== void 0) {
            columns.push({ name: "stale", value: stale });
          }
          if (expire !== void 0) {
            columns.push({ name: "expire", value: expire });
          }
          return {
            primaryKey: [
              { name: "app_id", value: `${config2.aliuid}/${config2.routinename}` },
              { name: "tag", value: tagKey }
            ],
            columns
          };
        });
        await this.batchWrite(config2, rows);
        const tagStrs = tags.map((t) => typeof t === "string" ? t : t.tag).filter((s) => typeof s === "string" && s.length > 0);
        if (tagStrs.length > 0) {
          this.purgeByCacheTags(config2, tagStrs).catch((err) => {
            var _a;
            console.warn(`[tagCache] cacheTags purge failed: ${(_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err}`);
          });
        }
      }
      // ---- private methods ----
      async batchGetTags(config2, tags) {
        var _a, _b;
        const tagKeys = tags.map((tag) => this.buildTagKey(tag));
        console.log(`[tagCache] batchGetTags: tags=${JSON.stringify(tags)} keys=${JSON.stringify(tagKeys)}`);
        const primaryKeys = tags.map((tag) => [
          { name: "app_id", value: `${config2.aliuid}/${config2.routinename}` },
          { name: "tag", value: this.buildTagKey(tag) }
        ]);
        const res = await (0, gateway_auth_1.gatewayFetch)(config2, "/table/batch-get-row", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ primaryKeys }),
          timeoutMs: QUERY_TIMEOUT
        });
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            console.error(`[tagCache] batch-get-row rejected (${res.status})`);
          } else {
            console.warn(`[tagCache] batch-get-row failed: status=${res.status}`);
          }
          return [];
        }
        const data = await res.json();
        console.log(`[tagCache] batch-get-row ok: tags=${tags.length} rows=${(_b = (_a = data.rows) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0}`);
        if (!data.rows)
          return [];
        return data.rows.map((row) => {
          var _a2;
          const result = {};
          for (const col of (_a2 = row.columns) !== null && _a2 !== void 0 ? _a2 : []) {
            if (col.name === "revalidatedAt" && typeof col.value === "number") {
              result.revalidatedAt = col.value;
            } else if (col.name === "stale" && typeof col.value === "number") {
              result.stale = col.value;
            } else if (col.name === "expire" && typeof col.value === "number") {
              result.expire = col.value;
            }
          }
          return result;
        });
      }
      async batchWrite(config2, rows) {
        if (rows.length === 0)
          return;
        for (let i = 0; i < rows.length; i += BATCH_SIZE) {
          const batch = rows.slice(i, i + BATCH_SIZE);
          try {
            const res = await (0, gateway_auth_1.gatewayFetch)(config2, "/table/batch-write", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ rows: batch }),
              timeoutMs: WRITE_TIMEOUT
            });
            if (res.status === 401 || res.status === 403) {
              console.error(`[tagCache] batch-write rejected (${res.status})`);
              return;
            }
            if (!res.ok) {
              console.warn(`[tagCache] batch-write failed: status=${res.status}`);
            } else {
              console.log(`[tagCache] batch-write ok: rows=${batch.length}`);
            }
          } catch (err) {
            if (err.name === "AbortError") {
              console.warn(`[tagCache] batch-write timeout (${WRITE_TIMEOUT}ms)`);
            } else {
              console.warn(`[tagCache] batch-write error: ${err.message}`);
            }
          }
        }
      }
      /**
       * 调 Gateway /cache/refresh(cacheTags) 触发 ESA PurgeCaches Type=cachetag。
       * hostname / siteId 从当前请求的 edge context 读取,缺失则 skip。
       */
      async purgeByCacheTags(config2, tags) {
        var _a;
        const { hostname, siteId } = (0, edge_context_12.getEdgeContext)();
        if (!hostname || siteId === void 0 || siteId === "") {
          console.warn(`[tagCache] cacheTags purge skip: edge context missing (hostname=${hostname !== null && hostname !== void 0 ? hostname : "\u2205"} siteId=${siteId !== null && siteId !== void 0 ? siteId : "\u2205"})`);
          return;
        }
        const body = { hostname, siteId, cacheTags: tags };
        try {
          const res = await (0, gateway_auth_1.gatewayFetch)(config2, "/cache/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            timeoutMs: PURGE_TIMEOUT
          });
          if (!res.ok) {
            let detail = "";
            try {
              detail = (await res.text()).slice(0, 200);
            } catch (_b) {
            }
            console.warn(`[tagCache] cacheTags purge failed: status=${res.status} tags=${tags.length} ${detail}`);
            return;
          }
          console.log(`[tagCache] cacheTags purge ok: tags=${tags.length}`);
        } catch (err) {
          console.warn(`[tagCache] cacheTags purge error: ${(_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : err}`);
        }
      }
    };
    exports2.default = GatewayTagCache;
  }
});

// open-next.config.ts
var config = {
  default: {
    override: {
      wrapper: () => Promise.resolve().then(() => __toESM(require_node_server())).then((m) => m.default),
      converter: () => Promise.resolve().then(() => __toESM(require_passthrough())).then((m) => m.default),
      incrementalCache: () => Promise.resolve().then(() => __toESM(require_gateway())).then((m) => new m.default()),
      tagCache: () => Promise.resolve().then(() => __toESM(require_gateway2())).then((m) => new m.default()),
      queue: "direct",
      proxyExternalRequest: "fetch"
    }
  },
  imageOptimization: {
    install: false
  },
  buildOutputPath: ".",
  appPath: "."
};
var open_next_config_default = config;
export {
  open_next_config_default as default
};
