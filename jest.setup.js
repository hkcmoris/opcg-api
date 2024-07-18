// jest.setup.js
import { app } from './app.js';
const http = require('http');

let server;
let port;

beforeAll(async () => {
  const getAvailablePort = () => {
    return new Promise((resolve, reject) => {
      const tempServer = http.createServer();
      tempServer.listen(0, () => {
        const port = tempServer.address().port;
        tempServer.close(() => resolve(port));
      });
      tempServer.on('error', reject);
    });
  };
  port = await getAvailablePort();
  process.env.PORT = port; // Set the port for the current process
  server = app.listen(port, () =>
    console.log(`Server running on port ${port}`),
  );
});

afterAll(() => {
  if (server && server.listening) {
    server.close();
  }
});

export { server, port };
