# Ecoa — Broadcast de mensagens

Envio de mensagens para vários contatos, na hora ou agendado. Monorepo com frontend e Firebase Cloud Functions.

**Acesse:** https://sistema-broadcast.web.app

## Funcionalidades

- Selecionar um ou mais contatos
- Escrever a mensagem
- Enviar imediatamente ou agendar para data/horário futuros
- Visualizar as mensagens criadas e filtrar entre enviadas e agendadas
- Editar e excluir mensagens

```
/
├── firebase.json            # Hosting (web/dist), Functions, Firestore, Storage, Emulators
├── firestore.rules / storage.rules / firestore.indexes.json
├── functions/               # Firebase Cloud Functions (TypeScript, v2)
│   └── src/
│       ├── index.ts         # CRUD de conexões e contatos (onCall) + saveClient
│       ├── messageScheduler.ts # sendMessage/updateMessage/deleteMessage + processScheduledMessages (a cada minuto)
│       ├── firebase.ts      # Admin SDK + região (southamerica-east1)
│       └── lib.ts           # validações e helpers
└── web/                     # React 19 + Vite + TypeScript + Tailwind v4 + React Router
    └── src/
        ├── app/             # router, providers, ProtectedRoute
        ├── layouts/         # AuthLayout, AppLayout (sidebar + topbar)
        ├── pages/
        │   ├── errors/      # 404
        │   ├── auth/        # Login, Cadastro, Recuperar senha
        │   └── app/         # Caixa de entrada, Conexões, Contatos, Relatórios, Configurações
        ├── components/      # layout/ (Sidebar, Topbar, Logo) · ui/ (FormDialog, ConfirmDialog)
        ├── config/          # rotas, navegação da sidebar, mapas de status/canal
        ├── contexts/        # AuthContext (onAuthStateChanged)
        ├── services/        # api.ts (callables), realtime.ts (onSnapshot), auth.ts
        ├── hooks/           # useConnections/useContacts/useMessages (tempo real), useSelectedConnection
        ├── lib/             # firebase.ts, format.ts (cn, números, moeda)
        ├── styles/          # index.css — tokens Tailwind + ordem das camadas
        ├── theme/           # theme.ts — tema MUI
        └── types/
```

## UI: MUI + Tailwind

- **Componentes**: [MUI](https://mui.com) (`@mui/material`) — Button, TextField, Card, Table, Chip, Drawer, Dialog, etc.
- **Estilização**: Tailwind via `className` direto nos componentes MUI. Ícones: `lucide-react`.
- **Tema MUI**: `web/src/theme/theme.ts` (cores da marca, fonte Geist, overrides de componentes).
- **Tokens Tailwind**: `web/src/styles/index.css` (`brand-50…950`, sombras, utilitários `page-title`, `nav-item`).

Como os dois convivem (`web/src/app/providers.tsx`): `StyledEngineProvider enableCssLayer` coloca o MUI em
`@layer mui`, e um `GlobalStyles` fixa a ordem `theme, base, mui, components, utilities`. Assim o reset do
Tailwind não quebra o MUI e qualquer utility do Tailwind sobrescreve o MUI sem `!important`:

```tsx
<Button variant="contained" className="rounded-full px-6">Enviar</Button>
```

Para estilizar partes internas de um componente, use `slotProps` (ex.: `slotProps={{ input: { className: "bg-zinc-50" } }}`)
ou seletores arbitrários (`[&_.MuiOutlinedInput-notchedOutline]:border-0`).

## Rodando

```bash
cd web && cp .env.example .env && npm install && npm run dev
cd functions && npm install && npm run build
firebase emulators:start
```

## Como funciona

- **Dados** (Firestore, sem subcoleções): `clients/{uid}`, `connections`, `contacts` e `messages`.
  Cada usuário do Auth é um cliente; todo documento guarda o `clientId` do dono, e contatos/mensagens guardam o `connectionId`.
- **Isolamento entre clientes**: o `clientId` é sempre preenchido pelas functions a partir do token (nunca vem do front),
  e toda alteração confere se o documento é do cliente logado. As regras do Firestore só liberam leitura quando
  `resource.data.clientId == request.auth.uid` e bloqueiam qualquer escrita direta do navegador.
- **Escritas** passam pelas Cloud Functions (callables). As regras do Firestore só liberam **leitura** dos próprios dados.
- **Leituras** usam `onSnapshot`: as telas atualizam em tempo real.
- **Envio (simulado)**: `sendMessage` grava a mensagem com status `sent` (sem data) ou `scheduled` (data futura).
  O `processScheduledMessages` roda a cada minuto e muda as agendadas vencidas para `sent`, sem depender do app aberto.

## Deploy (Firebase Hosting)

Projeto: `sistema-broadcast` → https://sistema-broadcast.web.app

```bash
npm run deploy:preview    # canal de preview (expira em 7 dias), não afeta produção
npm run deploy:hosting    # produção
npm run deploy:functions
```

O `predeploy` do hosting roda o build do `/web` automaticamente.

### CI (GitHub Actions)

- `firebase-hosting-merge.yml` — push na `main` → deploy em produção
- `firebase-hosting-pull-request.yml` — cada PR ganha uma URL de preview comentada no PR

Secrets necessários no repositório (Settings → Secrets and variables → Actions):

- `FIREBASE_SERVICE_ACCOUNT_SISTEMA_BROADCAST` — JSON de uma service account com papel *Firebase Hosting Admin*
- `VITE_FIREBASE_*` — mesmos valores do `web/.env`
