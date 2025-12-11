# Deno to Node Transform (dnt) for GitHub Actions

[![GitHub Release](https://img.shields.io/github/v/release/ryohidaka/action-dnt)](https://github.com/ryohidaka/action-dnt/releases/)
[![Test Action](https://github.com/ryohidaka/action-dnt/actions/workflows/test.yml/badge.svg)](https://github.com/ryohidaka/action-dnt/actions/workflows/test.yml)

GitHub Actions to convert Deno to npm package using [@deno/dnt](https://github.com/denoland/dnt).

## Usage

```yml
on: [push]

jobs:
  dnt:
    runs-on: ubuntu-latest
    steps:
      - uses: ryohidaka/action-dnt@v1
        with:
          deno-version: stable
```

## Inputs

| Input          | Description         | Required | Default  |
| -------------- | ------------------- | -------- | -------- |
| `deno-version` | Deno version to use |          | `stable` |
