# OpenAPI Generator Setup & Usage

This guide explains how to set up and use the OpenAPI generator to generate TypeScript Axios API clients and DTOs from your backend's Swagger/OpenAPI documentation.

---

## 1. Install the Generator

The project already includes the OpenAPI generator CLI as a dev dependency:

```bash
npm install --save-dev @openapitools/openapi-generator-cli
```

---

## 2. Script for Generating API Files

A script is available in `package.json`:

```json
"generate-backend-service": "openapi-generator-cli generate -i <OPENAPI_SPEC_URL> -g typescript-axios -o ./src/app/generated/api --skip-validate-spec -p removeOperationIdPrefix=true --additional-properties=supportsES6=true,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models"
```

- Replace `<OPENAPI_SPEC_URL>` with the actual URL or path to your OpenAPI JSON (e.g., `http://localhost:3000/api-json` or `./openapi.json`).

---

## 3. How to Use

1. **Ensure your backend is running and serving the OpenAPI/Swagger JSON.**
   - The URL should return a JSON file, not an HTML page.
2. **Run the generator script:**
   ```bash
   npm run generate-backend-service
   ```
3. **Generated files** will appear in `src/app/generated/api`.

---

## 4. Troubleshooting

- If you get errors about HTML or YAML parsing, make sure the `-i` parameter points to the actual OpenAPI JSON, not a Swagger UI HTML page.
- You can also download the OpenAPI JSON and use a local file path.

---

## 5. Customization

- You can change the output directory or generator options in the script as needed.
- For more options, see the [OpenAPI Generator documentation](https://openapi-generator.tech/docs/generators/typescript-axios/).

---

## Summary
- **Edit the script** in `package.json` if your OpenAPI spec URL changes.
- **Run the script** after backend changes to keep your frontend API types up to date. 