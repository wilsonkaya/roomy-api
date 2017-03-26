#!/bin/bash

API="http://localhost:4741"
URL_PATH="/rentals"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "rental": {
      "title": "'"${TITLE}"'",
      "name": "'"${NAME}"'",
      "city": "'"${CITY}"'",
      "description": "'"${DESC}"'",
      "phone": "'"${PHONE}"'"
    }
  }'

echo
