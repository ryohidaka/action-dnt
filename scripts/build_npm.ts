// @see https://github.com/denoland/dnt
// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt"

/**
 * CLI arguments:
 * 0: package name
 * 1: package version
 */
const [pkgName, pkgVersion] = Deno.args

await emptyDir("./npm")

await build({
  entryPoints: ["./mod.ts"],
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
