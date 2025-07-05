# How to Deploy Coursa Full Stack App to Render

This guide explains how to deploy the Coursa application (PostgreSQL database, NestJS backend, Angular frontend) to [Render](https://render.com) using the free plan. It covers every step from database setup to frontend deployment.

---

## 1. Prepare Your Codebase

- Ensure your code is pushed to a GitHub repository.
- The project structure should have separate folders for backend (`coursa-be`) and frontend (`coursa-fe`).

---

## 2. Deploy the PostgreSQL Database

1. Go to [Render PostgreSQL](https://dashboard.render.com/new/database) and create a new database.
   - Choose the Free plan.
   - Name it (e.g., `coursa-db`).
   - Select a region close to you.
2. Wait for the database to be provisioned.
3. Copy the connection string (it will look like `postgres://USER:PASSWORD@HOST:PORT/DBNAME`).

---

## 3. Deploy the Backend (NestJS)

1. Go to [Render Web Services](https://dashboard.render.com/new/web) and create a new Web Service.
2. Connect your GitHub repo and select the `coursa-be` directory as the root.
3. Set the following:
   - **Build Command:**
     ```
     npm install && npm run build
     ```
   - **Start Command:**
     ```
     node dist/src/main.js
     ```
     (or adjust if your build output is different)
   - **Root Directory:** `coursa-be`
4. Add environment variables:
   - `DATABASE_URL` (from the Render PostgreSQL connection string)
   - Any other required variables (e.g., `JWT_SECRET`, etc.)
5. Create the service and wait for deployment.
6. **Run Prisma migrations:**
   - Since Render free plan does not allow shell access, run migrations from your local machine:
     ```bash
     export DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DBNAME
     npx prisma db push
     # Or, for migrations:
     npx prisma migrate deploy
     ```
   - (Optional) Seed the database:
     ```bash
     npx ts-node prisma/seeds/seed-courses.ts
     ```

---

## 4. Deploy the Frontend (Angular)

1. Update `coursa-fe/src/environments/environment.prod.ts`:
   ```typescript
   export const environment = {
     production: true,
     googleClientId: 'YOUR_GOOGLE_CLIENT_ID',
     apiBaseUrl: 'https://YOUR-BACKEND-SERVICE.onrender.com'
   };
   ```
2. In `coursa-fe`, install `serve` as a dev dependency:
   ```bash
   npm install serve --save-dev
   ```
3. Go to [Render Web Services](https://dashboard.render.com/new/web) and create a new Web Service.
4. Set the following:
   - **Root Directory:** `coursa-fe`
   - **Build Command:**
     ```
     npm install && npm run build -- --output-path=dist
     ```
   - **Start Command:**
     ```
     npx serve -s dist/coursa-fe/browser
     ```
     (Adjust the path if your build output is different. Use the folder containing `index.html`.)
5. Create the service and wait for deployment.

---

## 5. Configure CORS in the Backend

- In `coursa-be/src/main.ts`, enable CORS for your frontend domain:
  ```typescript
  app.enableCors({
    origin: ['https://coursa-fe.onrender.com'],
    credentials: true,
  });
  ```
- Commit and redeploy the backend.

---

## 6. Test the Application

- Visit your frontend Render URL and verify the app loads and communicates with the backend.
- Check backend endpoints and database connectivity.

---

## 7. (Optional) Add a Custom Domain

- In the Render dashboard, go to your service settings and add a custom domain.
- Follow Render's instructions to update your DNS records.

---

## 8. Troubleshooting

- **CORS errors:** Ensure CORS is enabled in the backend for your frontend domain.
- **Directory listing instead of app:** Make sure the `serve` command points to the correct folder containing `index.html`.
- **Migrations:** If you can't run migrations on Render, run them locally using the remote database connection string.

---

## 9. Best Practices

- Never commit secrets or sensitive credentials to the repo.
- Only public config (like OAuth client IDs) should be in Angular environment files.
- Use environment variables for backend secrets.

---

**You now have a full stack app deployed on Render!** 