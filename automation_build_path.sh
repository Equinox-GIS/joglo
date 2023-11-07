#!/bin/bash

cd "../joglo_build_dev"

# Get the current date in the format ddmmyyyy
current_date=$(date +'%d%m%Y')
folder_name=$current_date

# Check if the folder already exists
if [ -d "$folder_name" ]; then
    cp "../joglo/*" "$folder_name"
else
    # If the folder doesn't exist, create it
    mkdir "$folder_name"
    cp "../joglo/*" "$folder_name"
fi
