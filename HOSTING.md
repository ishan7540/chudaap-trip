# Hosting Guide for Chudaap Trip

This guide explains how to host the MERN stack (MongoDB, Express, React, Node.js) Chudaap Trip application online so your friend group can access it from anywhere.

The easiest and most cost-effective way to host this application is using **Render** (for the backend), **Vercel** (for the frontend), and **MongoDB Atlas** (for the database). All three have generous free tiers.

---

## 1. Setup MongoDB Atlas (Database)
You need a cloud database that your backend can connect to.

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Build a new cluster (select the FREE `M0 Sandbox` tier).
3. Create a Database User (give it a username and password — **remember the password**).
4. Under "Network Access", add `0.0.0.0/0` to allow connections from anywhere (needed for cloud hosting).
5. Click "Connect", choose "Connect your application", and copy the connection string.
6. Replace `<password>` in the connection string with the password you created. Keep this URI handy.

---

## 2. Push Your Code to GitHub
You need your code on GitHub to deploy it easily.

1. Open a terminal in the root `chudaap_trip` directory.
2. Initialize git and push to a new repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Go to [GitHub](https://github.com/), create a new repository, and follow the instructions to push your local code to the GitHub repo.

---

## 3. Host the Backend on Render
Render is perfect for Node.js/Express backends with Socket.IO.

1. Go to [Render](https://render.com/) and sign in with GitHub.
2. Click **New +** and select **Web Service**.
3. Connect your `chudaap_trip` GitHub repository.
4. Fill in the settings:
   - **Name**: `chudaap-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Scroll down to **Environment Variables** and add:
   - `MONGODB_URI`: (Paste your MongoDB Atlas connection string from step 1)
   - `JWT_SECRET`: `super_secret_jwt_key_123` (Or make up a secure string)
   - `FRONTEND_URL`: (Leave this blank for now. Once you have your Vercel URL, you can come back and add it to secure your API to only your frontend).
6. Click **Create Web Service**.
7. Wait a few minutes for it to build. Once live, copy the URL Render gives you (e.g., `https://chudaap-backend.onrender.com`). *Remove any trailing slashes from the URL.*

*Note: Since the DB is fresh on the cloud, you'll need to seed it. You can do this by temporarily running `MONGODB_URI="your-atlas-uri" node server/seed.js` on your local machine.*

---

## 4. Host the Frontend on Vercel
Vercel is the best platform for React/Vite apps.

Before deploying, you need to tell the frontend where the backend lives on the internet.

1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New Project**.
3. Import your `chudaap_trip` GitHub repository.
4. Fill in the settings:
   - **Project Name**: `chudaap-trip`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
5. **CRITICAL STEP**: Click on **Environment Variables** and add:
   - **Key**: `VITE_API_URL`
   - **Value**: (Paste the Render URL from step 3.7. Example: `https://chudaap-backend.onrender.com`)
6. Click **Deploy**.
7. Wait 1-2 minutes. Vercel will give you a live URL (e.g., `https://chudaap-trip.vercel.app`).
8. *(Optional but Recommended)*: Go back to Render's Environment Variables and add `FRONTEND_URL` with your new Vercel URL to secure your backend.

---

## 5. Share with the Group!
Send the Vercel URL to the boys in the WhatsApp group. They can now register, view destinations, drag-and-drop their rankings, and the leaderboard will update in real-time thanks to the Render backend and MongoDB Atlas.
