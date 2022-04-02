import { Storage } from '@google-cloud/storage';
import path from 'path';

console.log(path.join(__dirname, '../gcp-storage-service-account.json'));

let storageClient = new Storage({
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  },

  projectId: 'databoy-radio-api-stage',
});

export { storageClient };
