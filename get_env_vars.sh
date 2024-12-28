#!/bin/bash

# env setup script for wdaily
echo "welcome to the wdaily .env setup script"

# prompt for email and app password
read -p "enter your email (e.g., your_email@gmail.com): " MY_EMAIL
read -p "enter your email app password: " PASS
read -p "enter smtp host (default: smtp.gmail.com): " SMTP_HOST
read -p "enter smtp port (default: 465): " SMTP_PORT

# set default values for smtp if not provided
SMTP_HOST=${SMTP_HOST:-smtp.gmail.com}
SMTP_PORT=${SMTP_PORT:-465}

# write to .env
ENV_FILE=".env"
echo "writing configuration to $ENV_FILE..."
cat <<EOF > $ENV_FILE
# generated by setup script
MY_EMAIL="$MY_EMAIL"
PASS="$PASS"
SMTP_HOST="$SMTP_HOST"
SMTP_PORT=$SMTP_PORT
EOF

echo ".env file created successfully! 🎉"