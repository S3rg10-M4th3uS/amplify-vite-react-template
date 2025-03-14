import { defineFunction, defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  access: (allow) => ({
    'csv/*': [
    allow.authenticated.to(['read','write']),
    ],
  })
});