import type { ServiceAccount } from 'firebase-admin';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { env } from './env';

const svcAccount = {
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY,
} satisfies ServiceAccount;

const apps = getApps();
const firebaseApp =
  apps.length > 0 && apps[0]
    ? apps[0]
    : initializeApp({
        credential: cert(svcAccount),
      });

export const firestore = getFirestore(firebaseApp);
