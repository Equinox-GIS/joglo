#!/bin/bash
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

npm install
npm run build

# Get the current date in the format ddmmyyyy
current_date=$(date +'%d%m%Y')
folder_name=$current_date

# Check if the folder already exists
if [ -d "../joglo_build_dev/$folder_name" ]; then
    cp -r ./dist/* ../joglo_build_dev/$folder_name
else
    # If the folder doesn't exist, create it
    mkdir "../joglo_build_dev/$folder_name"
    cp -r ./dist/* ../joglo_build_dev/$folder_name
fi
