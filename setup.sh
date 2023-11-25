#!/bin/bash

inject_env_variables() {
  local env_file="$1"
  shift
  for var in "$@"; do
    echo "$var" >> "$env_file"
  done
}

setup_server() {
  echo "Setting up server environment variables..."
  inject_env_variables server/.env \
    "PORT=3000" \
    "DB_URI=mongodb+srv://didoslavov:FYe72ng2bCQQijst@rbutler.dqs4ylm.mongodb.net/rButler" \
    "JWT_SECRET=WhispersInSilkGlovesAndTails"

  cd server || exit

  echo "Installing server dependencies..."
  npm install

  echo "Starting the server in development mode..."
  npm run dev
}

setup_client() {
  echo "Setting up client environment variables..."
  inject_env_variables client/.env \
    "VITE_BASE_URL=https://rbutler-api.onrender.com" \
    "VITE_SUPABASE_URL=https://cxswmrfheqrkzrsexvrl.supabase.co" \
    "VITE_SUPABASE_BUCKET=/storage/v1/object/public/avatars/" \
    "VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4c3dtcmZoZXFya3pyc2V4dnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDg0MDUsImV4cCI6MjAxNDIyNDQwNX0.NBQTc_i5rHnRdDvFAvVTVFE7pjV69KGFfihG0Ths9QQ" \
    "VITE_OPENWEATHER_API_KEY=65c8bce3c3835f283c727ae2bbd5cf75" \
    "VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5"

  cd client || exit

  echo "Installing client dependencies..."
  npm install

  echo "Starting the client in development mode..."
  npm run dev

  echo "Opening the client in the default web browser..."
  xdg-open http://localhost:5173
}

echo "Setting up environment variables..."
