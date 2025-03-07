import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { storage } from './storage/resource';
import { processFile } from './storage/process-file/resource';
import { data } from './data/resource';


defineBackend({
  auth,
  storage,
  data,
  processFile
});
