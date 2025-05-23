#!/bin/bash
# filepath: ./simular.sh

SERIAL_PORT="${1:-/dev/pts/3}"

START_TIME=$(date +%s%3N)
LAST_LAP_QUARTER=0

while true; do
    NOW=$(date +%s%3N)
    ELAPSED_MS=$((NOW - START_TIME))

    # Exit after 1 minute (60,000 ms)
    if (( ELAPSED_MS >= 60000 )); then
        break
    fi

    MINUTES=$((ELAPSED_MS / 60000))
    SECONDS=$(( (ELAPSED_MS / 1000) % 60 ))
    MILLISECONDS=$((ELAPSED_MS % 1000))

    TIME_STR=$(printf "%02d:%02d:%02d" $MINUTES $SECONDS $MILLISECONDS)

    LAP_QUARTER=$((ELAPSED_MS / 15000)) # 15,000 ms = 15 seconds

    if (( LAP_QUARTER > LAST_LAP_QUARTER )); then
        echo -ne "vuelta " > "$SERIAL_PORT"
        LAST_LAP_QUARTER=$LAP_QUARTER
    fi

    echo -ne "$TIME_STR\n" > "$SERIAL_PORT"

    sleep 0.02
done