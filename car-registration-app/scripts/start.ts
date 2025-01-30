import { exec, execSync } from 'child_process';
import { platform } from 'os';

const isWindows = platform() === 'win32';

const killPort = async (port: number) => {
  try {
    if (isWindows) {
      execSync(`netstat -ano | findstr :${port}`).toString()
        .split('\n')
        .filter(Boolean)
        .forEach(line => {
          const pid = line.split(' ').filter(Boolean).pop();
          if (pid) execSync(`taskkill /F /PID ${pid}`);
        });
    } else {
      // For Unix-like systems, use a more direct approach
      execSync(`lsof -ti:${port} | xargs kill -9 || true`);
    }
    console.log(`Killed process on port ${port}`);
  } catch (error) {
    console.log(`No process running on port ${port}`);
  }
};

const startServices = async () => {
  try {
    // Kill processes on all relevant ports
    await killPort(5168);  // HTTP backend
    await killPort(7214);  // HTTPS backend
    await killPort(5173);  // Frontend

    // Wait a bit to ensure ports are released
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Start backend with explicit profile
    const backend = exec('cd ../CarRegistrationApi && dotnet run --launch-profile https', (error, stdout, stderr) => {
      if (error) {
        console.error(`Backend Error: ${error}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    });

    // Wait for backend to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Start frontend
    const frontend = exec('npm run dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`Frontend Error: ${error}`);
        return;
      }
      console.log(stdout);
      console.error(stderr);
    });

    // Handle process termination
    process.on('SIGINT', () => {
      backend.kill();
      frontend.kill();
      process.exit();
    });

  } catch (error) {
    console.error('Failed to start services:', error);
  }
};

startServices();