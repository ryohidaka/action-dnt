// @see https://github.com/denoland/dnt
// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";
import { dirname, join } from "@std/path";
import { cloneNpmCompatibleFields, loadJSON } from "./utils/index.ts";

/**
 * CLI arguments:
 * 0: package name
 * 1: project directory (contains deno.json and mod.ts)
 * 2: output directory
 * 3: files to copy after build (comma-separated)
 * 4: compiler options (JSON string)
 */
const [pkgName, projectDir, outDir, copyFiles, rawCompilerOptions] = Deno.args;

// Load configuration
const denoJson = loadJSON(projectDir);
if (!denoJson) {
  console.error(`❌ Config file not found in: ${projectDir}`);
  Deno.exit(1);
}
console.debug(denoJson);

const version = denoJson.version as string;
if (!version) {
  console.error("❌ 'version' is required in deno.json");
  Deno.exit(1);
}

// Extract only npm-relevant fields
const baseProps = cloneNpmCompatibleFields(denoJson);

// Determine entry points and output directory.
const entryPoints = [join(projectDir, "mod.ts")];
const compilerOptions = JSON.parse(rawCompilerOptions);

await emptyDir(outDir);

await build({
  entryPoints,
  outDir,
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    ...baseProps,
    name: pkgName,
    version,
  },
  compilerOptions,
  postBuild() {
    if (!copyFiles) return;

    const files = copyFiles.split(",").map((f) => f.trim());
    for (const file of files) {
      const destination = join(outDir, file);
      Deno.mkdirSync(dirname(destination), { recursive: true });
      Deno.copyFileSync(file, destination);
    }
  },
});
