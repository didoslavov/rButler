 @echo off

echo Setting up server environment variables...

(
  echo PORT=3000
  echo DB_URI=mongodb+srv://didoslavov:FYe72ng2bCQQijst@rbutler.dqs4ylm.mongodb.net/rButler
  echo JWT_SECRET=WhispersInSilkGlovesAndTails
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

