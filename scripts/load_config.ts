import { existsSync } from "@std/fs";

const DEFAULT_CONFIG_FILES = [".dnt-config.json"];

/**
 * Load JSON configuration from a file.
 * @param path Optional path to the config file. Defaults to DEFAULT_CONFIG_FILES.
 * @returns Parsed configuration object, or empty object if no file found.
 */
export function loadConfigFile(path?: string): Record<string, unknown> {
  const pathsToCheck = path ? [path] : DEFAULT_CONFIG_FILES;

  for (const filePath of pathsToCheck) {
    if (existsSync(filePath)) {
      const content = Deno.readTextFileSync(filePath);
      return JSON.parse(content);
    }
  }

  return {};
}
