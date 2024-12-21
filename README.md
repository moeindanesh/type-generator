# @moeindana/type-generator

A lightweight TypeScript type generator for Swagger/OpenAPI specifications. This tool helps you automatically generate TypeScript types from your Swagger/OpenAPI JSON documentation.

## Features

- Generate TypeScript types from Swagger/OpenAPI JSON URLs
- Customizable output directory and filename
- Support for custom templates
- Extracts request parameters, request/response bodies, and enums
- CLI and programmatic usage
- Built with Bun for optimal performance

## Installation

```bash
npm install @moeindana/type-generator
```

## CLI Usage

```bash
npx swagger-type-gen -u https://api.example.com/swagger.json
```

### CLI Options

- `-u, --url <url>` (required): Swagger JSON URL
- `-o, --output <directory>`: Output directory (default: "./src/types")
- `-n, --name <filename>`: Output filename (default: "types.ts")
- `-t, --templates <directory>`: Custom templates directory

## Programmatic Usage

```typescript
import { generateTypes } from "@moeindana/type-generator";

await generateTypes({
  url: "https://api.example.com/swagger.json",
  output: "./src/types",
  name: "api-types.ts",
  // templates: './custom-templates' // optional
});
```

## Custom Templates

You can customize the generated types by providing your own templates. Create a directory with the following template files:

- `data-contracts.ejs`
- `route-type.ejs`
- `data-contract-jsdoc.ejs`
- `route-name.ejs`
- `interface-data-contract.ejs`

Then specify the templates directory using the `-t` option in CLI or `templates` option in programmatic usage.

## License

MIT © [moeindana]
