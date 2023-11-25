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

  cd server || { echo "Failed to change to server directory"; exit 1; }

  echo "Installing server dependencies..."
  npm install || { echo "Failed to install server dependencies"; exit 1; }

  echo "Starting the server in development mode..."
  npm run dev || { echo "Failed to start the server"; exit 1; }

  # Open a new terminal window
  if [[ "$OSTYPE" == "darwin"* ]]; then
    open -a Terminal .
  elif [[ "$OSTYPE" == "msys"* ]]; then
    start cmd /K "echo Opening new Command Prompt window; sleep 2;"
  elif command -v gnome-terminal &> /dev/null; then
    gnome-terminal --working-directory=. &
  elif command -v konsole &> /dev/null; then
    konsole --workdir . &
  elif command -v xterm &> /dev/null; then
    xterm -e "echo Opening new terminal; sleep 2;" &
  else
    echo "Unsupported terminal for opening new window"
  fi
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

  cd client || { echo "Failed to change to client directory"; exit 1; }

  echo "Installing client dependencies..."
  npm install || { echo "Failed to install client dependencies"; exit 1; }

  echo "Starting the client in development mode..."
  npm run dev || { echo "Failed to start the client"; exit 1; }

  echo "Opening the client in the default web browser..."

  # Check the operating system and open the default browser accordingly
  if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:5173
  elif [[ "$OSTYPE" == "msys"* ]]; then
    start http://localhost:5173
  elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:5173
  elif command -v open &> /dev/null; then
    open http://localhost:5173
  elif command -v start &> /dev/null; then
    start http://localhost:5173
  else
    echo "Unsupported operating system for opening browser"
  fi
}

echo "Setting up environment variables..."
setup_server
setup_client
