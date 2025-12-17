import { parse } from "@std/jsonc";
import { join } from "@std/path";

/**
 * Load a JSON or JSONC configuration file safely from a given directory.
 *
 * It first tries to load `deno.json`, then falls back to `deno.jsonc`.
 * Ensures the top-level structure is an object before returning.
 *
 * @param baseDir The directory path where the config file is located.
 * @param fileName Optional specific file name (default: "deno.json").
 * @returns Parsed object if valid, otherwise null.
 */
export function loadJSON(
  baseDir: string,
  fileName = "deno.json",
): Record<string, unknown> | null {
  const jsonPath = join(baseDir, fileName);
  const jsoncPath = join(
    baseDir,
    fileName.endsWith(".json")
      ? fileName.replace(/\.json$/, ".jsonc")
      : "deno.jsonc",
  );

  try {
    // Try deno.json first
    const text = Deno.readTextFileSync(jsonPath);
    const data = parse(text);
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return data as Record<string, unknown>;
    }
  } catch {
    // Fallback to deno.jsonc
    try {
      const text = Deno.readTextFileSync(jsoncPath);
      const data = parse(text);
      if (data && typeof data === "object" && !Array.isArray(data)) {
        return data as Record<string, unknown>;
      }
    } catch {
      return null;
    }
  }

  return null;
}
