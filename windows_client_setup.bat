 @echo off

echo Setting up client environment variables...

(
  echo VITE_BASE_URL=http://localhost:3000
  echo VITE_SUPABASE_URL=<SUPABASE URL>
  echo VITE_SUPABASE_BUCKET=/storage/v1/object/public/<BUCKET NAME>/
  echo VITE_SUPABASE_API_KEY=<SUPABASE API KEY>
  echo VITE_OPENWEATHER_API_KEY=<OPER WHEATHER API KEY>
  echo VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
) > client\.env

cd client || (
  echo Failed to change to client directory
  exit /b 1
)

echo Installing client dependencies...
npm install || (
  echo Failed to install client dependencies
  exit /b 1
)

echo Starting the client in development mode...
npm run dev || (
  echo Failed to start the client
  exit /b 1
)

echo Client setup complete! Open the following link in your web browser:
echo http://localhost:5173

