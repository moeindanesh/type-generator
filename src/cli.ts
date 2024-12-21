#!/usr/bin/env bun

import { Command } from "commander";
import { resolve, join } from "path";
import { spawnSync } from "child_process";

const program = new Command();

program
  .name("swagger-type-gen")
  .description("Generate TypeScript types from Swagger/OpenAPI JSON")
  .version("1.0.0")
  .requiredOption("-u, --url <url>", "Swagger JSON URL")
  .option("-o, --output <directory>", "Output directory", "./src/types")
  .option("-n, --name <filename>", "Output filename", "types.ts")
  .option("-t, --templates <directory>", "Templates directory")
  .action(async (options) => {
    try {
      if (!options.url) {
        throw new Error("URL is required");
      }

      console.log(`Generating types from ${options.url}`);

      const outputDir = resolve(process.cwd(), options.output);
      const templatesDir = options.templates
        ? resolve(process.cwd(), options.templates)
        : join(import.meta.dir, "templates");

      const args = [
        "swagger-typescript-api",
        "-p",
        options.url.trim(),
        "-o",
        outputDir,
        "-n",
        options.name,
        "-t",
        templatesDir,
        "--extract-request-params",
        "--extract-request-body",
        "--extract-response-body",
        "--extract-response-error",
        "--extract-enums",
        "--single-http-client",
      ];

      const result = spawnSync("bunx", args, {
        stdio: "inherit",
        shell: true,
      });

      if (result.error) {
        throw result.error;
      }

      if (result.status !== 0) {
        throw new Error(`Process exited with status ${result.status}`);
      }

      console.log("Types generated successfully!");
    } catch (error) {
      console.error("Failed to generate types:", error);
      process.exit(1);
    }
  });

program.parse();
