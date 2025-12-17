# Deno to Node Transform (dnt) for GitHub Actions

[![GitHub Release](https://img.shields.io/github/v/release/ryohidaka/action-dnt)](https://github.com/ryohidaka/action-dnt/releases/)
[![Test Action](https://github.com/ryohidaka/action-dnt/actions/workflows/test.yml/badge.svg)](https://github.com/ryohidaka/action-dnt/actions/workflows/test.yml)

GitHub Actions to convert Deno to npm package using
[@deno/dnt](https://github.com/denoland/dnt).

## Usage

```yml
on: [push]

jobs:
  dnt:
    runs-on: ubuntu-latest
    steps:
      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: latest

      - name: Run @deno/dnt
        uses: ryohidaka/action-dnt@v0.1.0
        with:
          name: my-package
          project-dir: .
          out-dir: ./npm
          copy-files: "README.md,LICENSE"
          compiler-options: '{"target":"ES2023","lib":["ESNext"]}'
          deno-version: stable

      - name: Publish to npm
        run: cd npm && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Inputs

| Input              | Description                                                           | Required | Default  |
| ------------------ | --------------------------------------------------------------------- | -------- | -------- |
| `name`             | NPM package name                                                      | ✅       |          |
| `project-dir`      | Project directory (contains `deno.json` and `mod.ts`)                 |          | `.`      |
| `out-dir`          | Directory to output                                                   |          | `./npm`  |
| `copy-files`       | Additional files or directories to copy                               |          |          |
| `compiler-options` | TypeScript compiler options to pass to DNT (e.g. target, lib, strict) |          | `{}`     |
| `deno-version`     | Deno version to use                                                   |          | `stable` |
