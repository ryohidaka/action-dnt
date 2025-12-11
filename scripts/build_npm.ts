// @see https://github.com/denoland/dnt
// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt"

/**
 * CLI arguments:
 * 0: package name
 * 1: package version
 * 2: entry points (comma-separated)
 */
const [pkgName, pkgVersion, rawEntryPoints] = Deno.args

const entryPoints = rawEntryPoints.split(",").map((e) => e.trim())

await emptyDir("./npm")

await build({
  entryPoints,
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: pkgName,
    version: pkgVersion,
    description: "Your package.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/username/repo.git",
    },
    bugs: {
      url: "https://github.com/username/repo/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE")
    Deno.copyFileSync("README.md", "npm/README.md")
  },
})
