import { spawnSync } from "child_process";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface GeneratorOptions {
  url: string;
  output: string;
  name?: string;
  templates?: string;
}

export async function generateTypes(options: GeneratorOptions): Promise<void> {
  try {
    if (!options.url) {
      throw new Error("URL must be provided");
    }

    const outputDir = resolve(process.cwd(), options.output);
    const templatesDir = options.templates
      ? resolve(process.cwd(), options.templates)
      : join(__dirname, "templates");

    const args = [
      "swagger-typescript-api",
      "-p",
      options.url.trim(),
      "-o",
      outputDir,
      "-n",
      options.name || "types.ts",
      "-t",
      templatesDir,
      "--extract-request-params",
      "--extract-request-body",
      "--extract-response-body",
      "--extract-response-error",
      "--extract-enums",
      "--no-client",
      "--route-types",
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
    console.error("Error generating types:", error);
    throw error;
  }
}
