const {exec} = require('child_process');

// Start Angular server
const angularProcess = exec('ng serve');

angularProcess.stdout.on('data', (data) => {
  console.log(`[Angular]: ${data}`);
});

angularProcess.stderr.on('data', (data) => {
  console.error(`[Angular Error]: ${data}`);
});

angularProcess.on('close', (code) => {
  console.log(`[Angular]: Process exited with code ${code}`);
});

const backendProcess = exec('node backend/server.js');

backendProcess.stdout.on('data', (data) => {
  console.log(`[Backend]: ${data}`);
});

backendProcess.stderr.on('data', (data) => {
  console.error(`[Backend Error]: ${data}`);
});

backendProcess.on('close', (code) => {
  console.log(`[Backend]: Process exited with code ${code}`);
});
