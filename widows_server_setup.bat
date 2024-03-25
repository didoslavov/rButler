 @echo off

echo Setting up server environment variables...

(
  echo PORT=3000
  echo DB_URI=mongodb+srv://<USER NAME>:<DB PASSWORD>@<DB NAME>.dqs4ylm.mongodb.net/<PROJECT NAME>
  echo JWT_SECRET=<JWT SECRET>
) > server\.env

cd server || (
  echo Failed to change to server directory
  exit /b 1
)

echo Installing server dependencies...
npm install || (
  echo Failed to install server dependencies
  exit /b 1
)

echo Starting the server in development mode...
npm run dev || (
  echo Failed to start the server
  exit /b 1
)

