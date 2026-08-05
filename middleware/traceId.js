import crypto from "crypto";

export function traceIdMiddleware(req, res, next) {
    req.traceId = req.header("X-Trace-Id") ?? crypto.randomUUID();

    next();
}