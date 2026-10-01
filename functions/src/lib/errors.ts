import { HttpsError } from "firebase-functions/v2/https";

export const unauthenticated = () => new HttpsError("unauthenticated", "Faça login para continuar.");
export const forbidden = () => new HttpsError("permission-denied", "Sem permissão para esta ação.");
export const invalid = (msg: string) => new HttpsError("invalid-argument", msg);
