// @see https://github.com/denoland/dnt
// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt"
import { join, dirname } from "@std/path"
import { loadConfigFile } from "./load_config.ts"

/**
 * CLI arguments:
 * 0: package name
 * 1: package version
 * 2: entry points (comma-separated)
 * 3: output directory
 * 4: files to copy after build (comma-separated)
 * 5: package properties (JSON string)
 * 6: compiler options (JSON string)
 * 7: optional config file path
 */
const [
  pkgName,
  pkgVersion,
  rawEntryPoints,
  outDir,
  copyFiles,
  rawPackageProps,
  rawCompilerOptions,
  configFilePath,
] = Deno.args

const entryPoints = rawEntryPoints.split(",").map((e) => e.trim())
const fileConfig = loadConfigFile(configFilePath)
const cliPackageProps = JSON.parse(rawPackageProps)
const cliCompilerOptions = JSON.parse(rawCompilerOptions)

// Merge priority: file config > CLI input
const packageProperties = { ...cliPackageProps, ...(fileConfig.package ?? {}) }
const compilerOptions = {
  ...cliCompilerOptions,
  ...(fileConfig.compilerOptions ?? {}),
}

await emptyDir(outDir)

await build({
  entryPoints,
  outDir,
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    name: pkgName,
    version: pkgVersion,
    ...packageProperties,
  },
  compilerOptions,
  postBuild() {
    if (!copyFiles) return

    const files = copyFiles.split(",").map((f) => f.trim())
    for (const file of files) {
      const destination = join(outDir, file)
      Deno.mkdirSync(dirname(destination), { recursive: true })
      Deno.copyFileSync(file, destination)
    }
  },
})
