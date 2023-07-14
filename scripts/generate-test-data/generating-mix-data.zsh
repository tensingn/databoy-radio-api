#!/usr/bin/env zsh
echo "Generating test mix data..."
source .env

baseUrl="http://localhost:$PORT/api"
requestUrl="$baseUrl/mixes"

generatedFilesDirectory=scripts/generate-test-data/generated-files
generatedFilesPath="$generatedFilesDirectory"/mixIds.txt
rm -f $generatedFilesPath
mkdir -p $generatedFilesDirectory

while read mix <&3 && read releaseId <&4;
do
    body="${mix/releaseIdPlaceholder/"$releaseId"}"
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
done 3<scripts/generate-test-data/test-data/mixes.txt 4<scripts/generate-test-data/generated-files/releaseIds.txt
