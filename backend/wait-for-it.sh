#!/usr/bin/env bash
# Usage: ./wait-for-it.sh host:port -- command args...
hostport="$1"
shift

host="${hostport%:*}"
port="${hostport#*:}"

echo "Waiting for $host:$port..."

while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "$host:$port is available — executing command"
exec "$@"
