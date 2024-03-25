#!/bin/bash

inject_env_variables() {
  local env_file="$1"
  shift
  for var in "$@"; do
    echo "$var" >> "$env_file"
  done
}

echo "Setting up client environment variables..."
inject_env_variables client/.env \
  "VITE_BASE_URL=http://localhost:3000" \
  "VITE_SUPABASE_URL=<SUPABASE URL>" \
  "VITE_SUPABASE_BUCKET=/storage/v1/object/public/<BUCKET NAME>/" \
  "VITE_SUPABASE_API_KEY=<API KEY>" \
  "VITE_OPENWEATHER_API_KEY=<API KEY>" \
  "VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5"

cd client || { echo "Failed to change to client directory"; exit 1; }

echo "Installing client dependencies..."
npm install || { echo "Failed to install client dependencies"; exit 1; }

echo "Starting the client in development mode..."
npm run dev || { echo "Failed to start the client"; exit 1; }

echo "Client setup complete! Open the following link in your web browser:"
echo "http://localhost:5173"
