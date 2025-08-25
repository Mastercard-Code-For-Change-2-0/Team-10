# Server (Express API)

Minimal Express server is wired and exposes:
- GET /health — healthcheck
- GET / — API info

Run without npm (if npm is broken):

```bash
# macOS sometimes reserves 5000; we default to 5050
PORT=5050 node index.js
```

Or with nodemon demo entry:

```bash
PORT=5050 npx nodemon index-demo.js
```

Troubleshooting:
- If `npm start` prints "Exit prior to config file resolving", your npm CLI is corrupted. Run Node directly as above or reinstall npm/node.
- Port 5000 may be occupied by macOS Control Center. Use 5050 or free the port.

Environment:
- Copy `.env.example` to `.env` and adjust values as needed.
