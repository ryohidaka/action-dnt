/**
 * Clone usable fields from deno.json for npm package conversion.
 *
 * This function removes Deno-specific configuration keys
 * (e.g., `tasks`, `imports`, `fmt`, etc.) that are not relevant
 * to npm package metadata.
 *
 * @param obj The raw deno.json (or deno.jsonc) object.
 * @returns A new object containing only the fields applicable to package.json.
 */
export function cloneNpmCompatibleFields(
  obj: Record<string, unknown>,
): Record<string, unknown> {
  // Deno-specific fields that should not be included in package.json
  const denoOnlyKeys = [
    "tasks",
    "imports",
    "fmt",
    "lint",
    "test",
    "compilerOptions",
    "nodeModulesDir",
    "lock",
    "exclude",
    "unstable",
  ];

  const result: Record<string, unknown> = {};

  // Copy only non-Deno fields
  for (const [key, value] of Object.entries(obj)) {
    if (!denoOnlyKeys.includes(key)) {
      result[key] = value;
    }
  }

  return result;
}
