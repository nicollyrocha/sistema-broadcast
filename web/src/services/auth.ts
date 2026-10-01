import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { saveClient } from "./api";

export async function signUp(name: string, email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email.trim(), password);
  await updateProfile(user, { displayName: name.trim() });
  await saveClient({ name }).catch(console.error); // não bloqueia o login se falhar
  return user;
}

/** remember = false: a sessão acaba ao fechar o navegador. */
export async function signIn(email: string, password: string, remember = true) {
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  const { user } = await signInWithEmailAndPassword(auth, email.trim(), password);
  await saveClient({}).catch(console.error); // não bloqueia o login se falhar
  return user;
}

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
  await saveClient({}).catch(console.error); // não bloqueia o login se falhar
  return user;
}

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email.trim());

export const signOut = () => firebaseSignOut(auth);

/** Traduz os códigos de erro mais comuns do Firebase Auth. */
export function authErrorMessage(error: unknown): string {
  const code = (error as { code?: string })?.code ?? "";
  const messages: Record<string, string> = {
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/invalid-email": "E-mail inválido.",
    "auth/email-already-in-use": "Este e-mail já está cadastrado.",
    "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente em alguns minutos.",
    "auth/popup-closed-by-user": "Login com Google cancelado.",
    "auth/cancelled-popup-request": "Login com Google cancelado.",
    "auth/popup-blocked": "O navegador bloqueou a janela do Google. Libere pop-ups e tente de novo.",
    "auth/operation-not-allowed": "Este método de login não está ativado no Firebase.",
    "auth/configuration-not-found": "O Firebase Authentication ainda não foi ativado neste projeto.",
    "auth/user-disabled": "Esta conta foi desativada.",
    "auth/missing-password": "Informe a senha.",
    "auth/network-request-failed": "Sem conexão com a internet.",
  };
  return messages[code] ?? "Não foi possível concluir. Tente novamente.";
}
