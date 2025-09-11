// server.js
const { exec } = require('child_process');

// For Windows
exec('npm.cmd run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`[ERROR] ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`[STDERR] ${stderr}`);
  }
  console.log(stdout);
});