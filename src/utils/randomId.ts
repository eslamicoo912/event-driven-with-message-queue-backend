import crypto from "crypto";

export function randomId(): string {
  return crypto.randomBytes(12).toString("hex");
}
