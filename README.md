# Mobile App - React Native & Supabase

## 📌 Tech Stack
- **React Native** - Mobile framework
- **Expo Router** - Routing for React Native
- **Tamagui** - UI library for styling
- **Backend** ([like this repo]https://github.com/TrangLe265/liftings-pbs-api) - You can choose to run it locally or deploy it
- **Supabase** - Authentication & database provider

## 🚀 Setup & Running Locally

### 1️⃣ Prerequisites
- Install **Node.js** ([Download here](https://nodejs.org/))
- Install **Expo CLI** globally:
  ```sh
  npm install -g expo-cli
  ```
- Register on **Supabase** ([Sign up here](https://supabase.com/))

### 2️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:
```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_URL=your-backend-api-url 
```
*(Find these values in your Supabase dashboard under Project Settings > API.)*

### 3️⃣ Start the Mobile App
Run the following commands in your terminal:
```sh
npm install  # Install dependencies
npm start    # Start Expo development server
```
Use the **Expo Go** app (iOS/Android) or an emulator to preview the app.


## 🔐 Authorization Flow: Backend with Authentication Middleware
1. User sends a login request via the UI with email and password.
2. Supabase validates credentials and returns an access token.
3. The token is included in the `Authorization` header for future requests.
4. Middleware in the backend verifies the token before allowing access.

#### Please note that it is possible to configure this app to run entirely on Supabase without the need for a backend. 
