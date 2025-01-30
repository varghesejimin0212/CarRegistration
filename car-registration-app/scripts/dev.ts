import { exec } from 'child_process';
import { platform } from 'os';

const isWindows = platform() === 'win32';

const killPort = async (port: number) => {
  const command = isWindows
    ? `netstat -ano | findstr :${port}`
    : `lsof -i :${port} -t`;

  try {
    const { stdout } = await exec(command);
    const pid = isWindows
      ? stdout.split('\n')[0].split(' ').filter(Boolean).pop()
      : stdout.trim();

    if (pid) {
      await exec(isWindows ? `taskkill /F /PID ${pid}` : `kill -9 ${pid}`);
      console.log(`Killed process on port ${port}`);
    }
  } catch (error) {
    console.log(`No process running on port ${port}`);
  }
};

const startFrontend = async () => {
  try {
    // Kill any process using port 5173
    await killPort(5173);
    
    // Start Vite dev server
    exec('npm run dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    });
  } catch (error) {
    console.error('Failed to start frontend:', error);
  }
};

startFrontend();