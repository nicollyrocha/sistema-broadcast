# Ecoa — Broadcast multicanal

Disparos em massa por WhatsApp, e-mail e SMS. Monorepo com frontend e Firebase Cloud Functions.

```
/
├── firebase.json            # Hosting (web/dist), Functions, Firestore, Storage, Emulators
├── firestore.rules / storage.rules / firestore.indexes.json
├── functions/               # Firebase Cloud Functions (TypeScript, v2)
│   └── src/
│       ├── index.ts         # exporta todas as funções
│       ├── callable/        # onCall — chamadas autenticadas do /web
│       ├── http/            # onRequest — webhooks (WhatsApp, Stripe)
│       ├── triggers/        # Auth / Firestore triggers
│       ├── scheduled/       # onSchedule — disparo de campanhas agendadas
│       ├── services/        # integrações com provedores
│       ├── lib/             # admin SDK, erros
│       └── types/
└── web/                     # React 19 + Vite + TypeScript + Tailwind v4 + React Router
    └── src/
        ├── app/             # router, providers, ProtectedRoute
        ├── layouts/         # AuthLayout, AppLayout (sidebar + topbar)
        ├── pages/
        │   ├── errors/      # 404
        │   ├── auth/        # Login, Cadastro, Recuperar senha
        │   └── app/         # Dashboard, Inbox, Campanhas, Automações, Templates,
        │                    # Contatos, Audiências, Relatórios, Canais, Assinatura, Configurações
        ├── components/      # layout/ (Sidebar, Topbar, Logo) · ui/ (seus componentes)
        ├── config/          # rotas, navegação da sidebar, mapas de status/canal
        ├── contexts/        # AuthContext (stub)
        ├── services/        # acesso a Firestore/Functions
        ├── hooks/
        ├── lib/             # firebase.ts, format.ts (cn, números, moeda)
        ├── mocks/           # dados estáticos só para visualizar o layout
        ├── styles/          # index.css — tokens de design + classes base
        └── types/
```

## Design system

Tokens e primitivas em `web/src/styles/index.css`. Combine classes direto no JSX:

| Classe | Uso |
| --- | --- |
| `btn` + `btn-primary` / `btn-secondary` / `btn-ghost` / `btn-dark` / `btn-danger` / `btn-outline-light` | botões; tamanhos `btn-sm`, `btn-lg`, `btn-icon` |
| `card`, `card-header`, `card-title`, `card-body` | superfícies |
| `input`, `label`, `hint`, `checkbox` | formulários |
| `badge` + `badge-success` / `warning` / `danger` / `info` / `brand` / `neutral`, `badge-dot` | status |
| `table` | tabelas |
| `tabs` / `tab active`, `nav-item active` | navegação |
| `page-title`, `page-subtitle`, `eyebrow`, `kbd` | tipografia |

Cor da marca: `brand-50…950` (laranja `#ff5a1f`). Superfícies escuras: `night-700…950`. Fonte: Geist.

## Rodando

```bash
cd web && cp .env.example .env && npm install && npm run dev
cd functions && npm install && npm run build
firebase emulators:start
```

## Próximos passos (lógica)

- `contexts/AuthContext.tsx` → `onAuthStateChanged`; `app/ProtectedRoute.tsx` → redirecionar sem usuário.
- Trocar `mocks/data.ts` por `services/*` + hooks.
- Stepper de nova campanha, filtros, abas de configurações e toggles hoje são estáticos.
- Gráficos do Dashboard/Relatórios são barras em CSS — substituir por uma lib de gráficos.
