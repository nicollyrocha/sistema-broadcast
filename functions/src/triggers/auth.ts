import { beforeUserCreated } from "firebase-functions/v2/identity";

export const onUserCreated = beforeUserCreated(async (_event) => {
  // TODO: criar workspace padrão / perfil do usuário
  return;
});
