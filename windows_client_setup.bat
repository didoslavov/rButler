 @echo off

echo Setting up client environment variables...

(
  echo VITE_BASE_URL=http://localhost:3000
  echo VITE_SUPABASE_URL=https://cxswmrfheqrkzrsexvrl.supabase.co
  echo VITE_SUPABASE_BUCKET=/storage/v1/object/public/avatars/
  echo VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4c3dtcmZoZXFya3pyc2V4dnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDg0MDUsImV4cCI6MjAxNDIyNDQwNX0.NBQTc_i5rHnRdDvFAvVTVFE7pjV69KGFfihG0Ths9QQ
  echo VITE_OPENWEATHER_API_KEY=65c8bce3c3835f283c727ae2bbd5cf75
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

