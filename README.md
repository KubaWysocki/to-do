# Project Setup Instructions

To run this project, you will need to have `docker` installed as well as Node.js, preferably version 20.3.1.

## Steps to Run the Project

1. **Install Dependencies**
    - Navigate to both the `/mobile` and `/backend` directories and run the following command to install dependencies:
      ```sh
      npm i
      ```

2. **Set Up PostgreSQL Database**
    - In the `/backend` directory, run:
      ```sh
      docker compose up -d
      ```

3. **Set Up Database with Prisma**
    - In the `/backend` directory, run the following command to set up the database:
      ```sh
      npx prisma migrate dev --name "init"
      ```
    - Additionally, seed the database with some dummy data by running:
      ```sh
      npx prisma db seed
      ```

4. **Start the Backend Server**
    - In the `/backend` directory, run:
      ```sh
      npm start
      ```

5. **Start the Mobile Application**
    - In the `/mobile` directory, run:
      ```sh
      npm start
      ```

6. **Connecting mobile app to backend**
    - App should connect with all emulators out of the box. In order to connect from remote devices and Expo GO set `BASE_URL` in `mobile/utils/fetcher.ts` to ip of the device running the backend server. The backend accepts all connections, so you should be able to connect as long as your network configuration allows for such maneuvers.

## Additional tech

https://swr.vercel.app/

https://zod.dev/

https://www.npmjs.com/package/zod-prisma-types

https://reactnativepaper.com/