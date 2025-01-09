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
    echo "Please set up your environment variables manually in repo before running the app."
    echo "See docs ➡️ https://github.com/zakmoCA/wdaily/blob/main/README.md#usage"
    echo "Once your env variables are set locally as per sample.env, rerun this script."
    echo "See Gmail SMTP setup help ➡️ https://www.gmass.co/blog/gmail-smtp/#howto"
    exit 1
  fi
fi

node src/app.js "$@"