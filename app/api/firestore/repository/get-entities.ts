import type { CollectionReference, Query } from 'firebase-admin/firestore';
import { firestore } from '#/utils/.server/firestore';
import { modelConverter } from './_converter';

export async function getEntities<T extends { id: string }>(
  path: string,
  constraints?: (collection: CollectionReference<T>) => Query<T>,
) {
  const docsRef = firestore.collection(path).withConverter(modelConverter<T>());
  const constrainedDocsRef = constraints ? constraints(docsRef) : docsRef;

  const snapshot = await constrainedDocsRef.get();
  return snapshot.docs.map((doc) => doc.data());
}
