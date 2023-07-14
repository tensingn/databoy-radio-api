#!/usr/bin/env zsh
echo "Generating test release data..."
source .env

baseUrl="http://localhost:$PORT/api"
requestUrl="$baseUrl/releases"

generatedFilesDirectory=scripts/generate-test-data/generated-files
generatedFilesPath="$generatedFilesDirectory"/releaseIds.txt
rm -f $generatedFilesPath
mkdir -p $generatedFilesDirectory

i=0
cat scripts/generate-test-data/test-data/releases.txt | while read release;
do
    body="${release/releaseDatePlaceholder/"$(date -v +"$i"d)"}"
    echo "calling $requestUrl with $body"
    response=$(curl -s -X POST -H "Content-Type: application/json" -d "$body" "$requestUrl")

    if [[ $? -eq 0 ]]; then
        echo "API request successful."
        echo "Response: $response"
        echo $response >> $generatedFilesPath
    else
        echo "API request failed."
        exit 1
    fi
    
    i=$(($i+5))
done
