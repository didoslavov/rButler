#!/bin/bash

inject_env_variables() {
  local env_file="$1"
  shift
  for var in "$@"; do
    echo "$var" >> "$env_file"
  done
}

echo "Setting up server environment variables..."
inject_env_variables server/.env \
  "PORT=3000" \
  "DB_URI=mongodb+srv://<USER NAME>:<DB PASSWORD>@<DB NAME>.dqs4ylm.mongodb.net/<PROJECT NAME>" \
  "JWT_SECRET=<JWT SECRET>"

cd server || { echo "Failed to change to server directory"; exit 1; }

echo "Installing server dependencies..."
npm install || { echo "Failed to install server dependencies"; exit 1; }

echo "Starting the server in development mode..."
npm run dev || { echo "Failed to start the server"; exit 1; }
