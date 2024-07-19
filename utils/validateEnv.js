import dotenv from 'dotenv';
import path from 'path';

const environmentFiles = {
  development: path.resolve('./config/.env.development'),
  production: path.resolve('./config/.env.production'),
  test: path.resolve('./config/.env.test'),
};

dotenv.config({
  path: environmentFiles[process.env.NODE_ENV] || path.resolve('./config/.env'),
});

const requiredEnvVars = [
  'PORT',
  'RATE_LIMIT',
  'TIMEOUT',
  'NEW_RELIC_APP_NAME',
  'NEW_RELIC_LICENSE_KEY',
];

const validateEnv = () => {
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
  if (missingVars.length) {
    console.error(
      `Error: Missing environment variables: ${missingVars.join(', ')}`,
    );
    process.exit(1);
  }
};

validateEnv();

//export default validateEnv;
