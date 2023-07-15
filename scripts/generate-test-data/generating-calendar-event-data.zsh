#!/usr/bin/env zsh
echo "Generating test release data..."
source .env

baseUrl="http://localhost:$PORT/api"
requestUrl="$baseUrl/calendar-events"

generatedFilesDirectory=scripts/generate-test-data/generated-files
generatedFilesPath="$generatedFilesDirectory"/calendar-event-ids.txt
rm -f $generatedFilesPath
mkdir -p $generatedFilesDirectory

i=0
cat scripts/generate-test-data/test-data/calendar-events.txt | while read calendarEvent;
do
    updateStartTime="${calendarEvent/startTimePlaceholder/"$(date -v +"$i"d -u +"%Y-%m-%dT%H:%M:%SZ")"}"
    body="${updateStartTime/endTimePlaceholder/"$(date -v +"$i"d -v +2H -u +"%Y-%m-%dT%H:%M:%SZ")"}"
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
