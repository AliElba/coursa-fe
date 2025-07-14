# CoursaFe

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Environment-Specific Builds

You can build for different environments:

```bash
# Development build (default)
ng build

# Production build
ng build --configuration=production

# Staging build
ng build --configuration=staging
```

Each environment uses different configuration files:
- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`
- **Staging**: `src/environments/environment.stage.ts`

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Running the Angular Frontend Locally with Docker

You can build and run this Angular app locally using Docker to test your production Dockerfile and NGINX setup before deploying to the cloud.

### 1. Build the Docker Image

Open a terminal in the `coursa-fe` directory and run:

```bash
docker build -t coursa-fe:local .
```

This will build the Docker image using your Dockerfile and tag it as `coursa-fe:local`.

### 2. Run the Docker Container

```bash
docker run --rm -p 8080:80 coursa-fe:local
```

This starts a container from your image and maps port 80 in the container to port 8080 on your machine.

### 3. Test in Your Browser

Open your browser and go to:

[http://localhost:8080](http://localhost:8080)

You should see your Angular app running as it would in production.

### 4. Troubleshooting

- If you see a blank page or errors, check the container logs:
  ```bash
  docker logs <container_id>
  ```
- Make sure your `nginx.conf` is present and correct.
- If you make changes, rebuild the image and re-run the container.

---

**This is the best way to verify your Dockerfile and NGINX config before deploying to any cloud!**

## Building and Running the Docker Container in Detached Mode

To build and run your Angular frontend in Docker, follow these steps:

### 1. Build the Docker Image

Open a terminal in the `coursa-fe` directory and run:

```bash
docker build -t coursa-fe .
```

This will build the Docker image using your Dockerfile and tag it as `coursa-fe`.

### 2. Run the Docker Container in Detached Mode

To run the container in the background (so your terminal is not blocked), use the `-d` (detached) flag and assign a name to your container:

```bash
docker run -d --name coursa-fe -p 8080:80 coursa-fe
```

- `-d` runs the container in detached mode (in the background).
- `--name coursa-fe` gives your container a recognizable name.
- `-p 8080:80` maps port 80 in the container to port 8080 on your machine.
- `coursa-fe` is the image name (replace with your tag if different).

You can then view logs with:

```bash
docker logs -f coursa-fe
```

And stop the container with:

```bash
docker stop coursa-fe
```

---

## Publishing Changes from main to stage and prod

To promote your latest changes through the release branches, use the following steps:

1. **Merge main into stage and push:**
   ```sh
   git checkout stage && git merge main && git push
   ```
2. **Merge stage into prod and push:**
   ```sh
   git checkout prod && git merge stage && git push
   ```
3. **Switch back to main for further development:**
   ```sh
   git checkout main
   ```

**Summary:**
- Always merge `main` → `stage` → `prod` in order.
- Push after each merge to update the remote branch.
- Switch back to `main` when done to continue development.

---
