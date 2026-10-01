import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { setGlobalOptions } from "firebase-functions/v2";

/** Mesma região do Firestore. O front usa este valor em getFunctions(). */
export const REGION = "southamerica-east1";

// Fica aqui (e não no index) porque este módulo é importado antes de qualquer function ser definida.
setGlobalOptions({ region: REGION, maxInstances: 10 });

// Nas Cloud Functions o Admin SDK usa as credenciais do ambiente automaticamente.
const app = getApps()[0] ?? initializeApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
