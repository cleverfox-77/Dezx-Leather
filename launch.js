// F:\leather\launch.js
const { spawn } = require('child_process');
const next = spawn('node', [
  './node_modules/next/dist/bin/next',
  'dev',
  '-p', '9002'  // Changed from 'cp' to '-p'
]);

next.stdout.on('data', (data) => {
  console.log(data.toString());
});

next.stderr.on('data', (data) => {
  console.error(data.toString());
});