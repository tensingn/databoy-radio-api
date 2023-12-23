#!/usr/bin/env zsh
echo "Generating test track data..."
source .env

baseUrl="http://localhost:$PORT/api"
requestUrl="$baseUrl/tracks"

generatedFilesDirectory=scripts/generate-test-data/generated-files
generatedFilesPath="$generatedFilesDirectory"/trackIds.txt
rm -f $generatedFilesPath
mkdir -p $generatedFilesDirectory

while read track <&3 && read releaseId <&4;
do
    body="${track/releaseIdPlaceholder/"$releaseId"}"
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
done 3<scripts/generate-test-data/test-data/tracks.txt 4<scripts/generate-test-data/generated-files/releaseIds.txt
