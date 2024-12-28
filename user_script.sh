#!/bin/bash

mkdir -p ~/bin
cp src/app.js ~/bin/wdaily
chmod +x ~/bin/wdaily

# env vars set?
if [[ ! -f ".env" ]]; then
  echo "Environment variables not found. Setting up...? (Y/y)"
  read -r setup_choice < /dev/tty

  if [[ $setup_choice =~ ^[Yy]$ ]]; then
    node src/init_user_env_vars.js
  else
    echo "Please set up your environment variables manually before running the app."
    provide_google_app_password_instructions
    echo "Once your env variables are set, rerun this script."
    exit 1
  fi
fi

node src/app.js "$@"