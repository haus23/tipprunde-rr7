import { PrismaClient } from '@prisma/client';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const { FIREBASE_CLIENT_EMAIL, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY } =
  // biome-ignore lint/nursery/noProcessEnv: file is only used as node script
  process.env;

const prisma = new PrismaClient();
const svcAccount = {
  projectId: FIREBASE_PROJECT_ID,
  clientEmail: FIREBASE_CLIENT_EMAIL,
  privateKey: FIREBASE_PRIVATE_KEY,
};

const apps = getApps();
const firebaseApp =
  apps.length > 0 && apps[0]
    ? apps[0]
    : initializeApp({
        credential: cert(svcAccount),
      });

export const firestore = getFirestore(firebaseApp);

async function main() {
  const users = await prisma.user.findMany();

  if (users.length > 0) {
    console.error(
      'Es sind schon User angelegt. Benutzerverwaltung geht nur über die Anwendung.',
    );
    return;
  }

  const snapshot = await firestore.collection('players').get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  let count = 0;

  for (const acc of data) {
    ++count;
    await prisma.user.create({
      data: {
        name: acc.name,
        slug: acc.id,
        email: acc.email || null,
        role: acc.role || 'PLAYER',
      },
    });
  }

  console.info(`Seed erfolgreich. ${count} User/Spieler angelegt.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
