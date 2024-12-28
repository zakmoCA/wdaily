#!/bin/bash

ENV_FILE=".env"

rm -f $ENV_FILE

mock_inputs=("test_email@gmail.com" "test_password" "smtp.example.com" "587")
mock_prompt() {
    echo "${mock_inputs[$1]}"
}

echo "running test for .env creation..."
source ./setup.sh

if [ ! -f "$ENV_FILE" ]; then
    echo "test failed: .env file not created."
    exit 1
fi

source $ENV_FILE
if [[ "$MY_EMAIL" == "test_email@gmail.com" && "$PASS" == "test_password" && "$SMTP_HOST" == "smtp.example.com" && "$SMTP_PORT" == "587" ]]; then
    echo "test passed: .env file correctly populated."
else
    echo "test failed: incorrect .env content."
fi
