#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

port_open() {
  curl -sf -o /dev/null --max-time 2 "http://127.0.0.1:$1/"
}

if ! port_open 5000; then
  tmux has-session -t iot_socket 2>/dev/null && tmux kill-session -t iot_socket
  tmux new-session -d -s iot_socket "node .cursor/dev-socket-server.js"
fi

if ! port_open 8080; then
  tmux has-session -t iot_h5 2>/dev/null && tmux kill-session -t iot_h5
  tmux new-session -d -s iot_h5 "npm run dev:h5"
fi

for _ in $(seq 1 90); do
  if port_open 5000 && port_open 8080; then
    echo "ready: h5 on 8080, socket on 5000"
    exit 0
  fi
  sleep 2
done

echo "timed out waiting for services" >&2
tmux capture-pane -pt iot_h5 -S -120 || true
tmux capture-pane -pt iot_socket -S -40 || true
exit 1
