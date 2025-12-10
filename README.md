# Dnt

[![GitHub Release](https://img.shields.io/github/v/release/ryohidaka/action-dnt)](https://github.com/ryohidaka/action-dnt/releases/)
[![Test Action](https://github.com/ryohidaka/action-dnt/actions/workflows/test.yml/badge.svg)](https://github.com/ryohidaka/action-dnt/actions/workflows/test.yml)

GitHub Actions to convert Deno to npm package.

## Usage

```yml
on: [push]

jobs:
  dnt:
    runs-on: ubuntu-latest
    steps:
      - uses: ryohidaka/action-dnt@v1
```

## Inputs

| Input | Description | Required | Default |
| ----- | ----------- | -------- | ------- |
| ``    |             | ✅       | ``      |

## Outputs

| Output | Description | Example |
| ------ | ----------- | ------- |
| ``     |             | ``      |
