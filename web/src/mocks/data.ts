/**
 * Dados estáticos apenas para visualizar o layout.
 * Substitua pelos services (Firestore/Functions).
 */
import type { Campaign, Contact } from "@/types";

export const STATS = [
  { label: "Mensagens enviadas", value: "248.391", delta: "+12,4%", up: true },
  { label: "Taxa de entrega", value: "98,7%", delta: "+0,3%", up: true },
  { label: "Taxa de leitura", value: "64,2%", delta: "+4,1%", up: true },
  { label: "Descadastros", value: "0,21%", delta: "-0,05%", up: false },
];

export const CHART_BARS = [42, 58, 51, 66, 72, 61, 80, 74, 88, 69, 92, 85, 97, 90];

export const CAMPAIGNS: Campaign[] = [
  { id: "cmp_01", name: "Black Friday — Aviso antecipado", channel: "whatsapp", status: "sending", audience: "Clientes VIP", recipients: 18420, delivered: 12011, opened: 8402, clicked: 2210, date: "Hoje, 14:30" },
  { id: "cmp_02", name: "Newsletter de outubro", channel: "email", status: "scheduled", audience: "Assinantes newsletter", recipients: 42310, delivered: 0, opened: 0, clicked: 0, date: "03 out, 09:00" },
  { id: "cmp_03", name: "Carrinho abandonado — lembrete", channel: "whatsapp", status: "sent", audience: "Carrinhos 24h", recipients: 3210, delivered: 3188, opened: 2610, clicked: 911, date: "28 set, 18:00" },
  { id: "cmp_04", name: "Código de confirmação — evento", channel: "sms", status: "sent", audience: "Inscritos evento", recipients: 1290, delivered: 1281, opened: 0, clicked: 0, date: "26 set, 10:12" },
  { id: "cmp_05", name: "Reativação de clientes inativos", channel: "email", status: "draft", audience: "Inativos 90d", recipients: 9821, delivered: 0, opened: 0, clicked: 0, date: "Editado há 2h" },
  { id: "cmp_06", name: "Lançamento coleção verão", channel: "whatsapp", status: "paused", audience: "Todos os contatos", recipients: 61002, delivered: 22004, opened: 15210, clicked: 4102, date: "24 set, 12:00" },
  { id: "cmp_07", name: "Pesquisa NPS trimestral", channel: "email", status: "failed", audience: "Clientes ativos", recipients: 12002, delivered: 410, opened: 120, clicked: 12, date: "22 set, 15:40" },
];

export const CONTACTS: Contact[] = [
  { id: "ct_01", name: "Mariana Costa", email: "mariana.costa@email.com", phone: "+55 11 98812-3401", tags: ["VIP", "SP"], status: "subscribed", createdAt: "12 set 2026" },
  { id: "ct_02", name: "Rafael Almeida", email: "rafa.almeida@email.com", phone: "+55 21 99120-5532", tags: ["Lead"], status: "subscribed", createdAt: "10 set 2026" },
  { id: "ct_03", name: "Juliana Pires", email: "ju.pires@email.com", phone: "+55 31 98455-7710", tags: ["Cliente", "MG"], status: "unsubscribed", createdAt: "02 set 2026" },
  { id: "ct_04", name: "Bruno Henrique", email: "bruno.h@email.com", phone: "+55 41 99780-1123", tags: ["Cliente"], status: "subscribed", createdAt: "28 ago 2026" },
  { id: "ct_05", name: "Camila Rocha", email: "camila.rocha@email.com", phone: "+55 51 98101-6654", tags: ["VIP"], status: "bounced", createdAt: "21 ago 2026" },
  { id: "ct_06", name: "Diego Martins", email: "diego.m@email.com", phone: "+55 61 99234-0098", tags: ["Lead", "Evento"], status: "subscribed", createdAt: "19 ago 2026" },
  { id: "ct_07", name: "Fernanda Lima", email: "fe.lima@email.com", phone: "+55 71 98670-4412", tags: ["Cliente"], status: "subscribed", createdAt: "15 ago 2026" },
  { id: "ct_08", name: "Lucas Oliveira", email: "lucas.oli@email.com", phone: "+55 85 99001-7765", tags: ["Lead"], status: "subscribed", createdAt: "11 ago 2026" },
];

export const AUDIENCES = [
  { id: "au_01", name: "Clientes VIP", type: "Segmento dinâmico", rule: "Gasto total > R$ 2.000", count: 18420, updated: "há 5 min" },
  { id: "au_02", name: "Assinantes newsletter", type: "Lista", rule: "Importada via CSV", count: 42310, updated: "ontem" },
  { id: "au_03", name: "Carrinhos 24h", type: "Segmento dinâmico", rule: "Evento: carrinho_abandonado nas últimas 24h", count: 3210, updated: "há 1 min" },
  { id: "au_04", name: "Inativos 90d", type: "Segmento dinâmico", rule: "Última compra > 90 dias", count: 9821, updated: "há 1h" },
  { id: "au_05", name: "Inscritos evento", type: "Lista", rule: "Formulário de inscrição", count: 1290, updated: "26 set" },
];

export const TEMPLATES = [
  { id: "tp_01", name: "Boas-vindas", channel: "whatsapp", category: "Marketing", status: "Aprovado", preview: "Olá {{nome}}! 👋 Que bom ter você por aqui. Use o cupom BEMVINDO10 na sua primeira compra." },
  { id: "tp_02", name: "Carrinho abandonado", channel: "whatsapp", category: "Utilidade", status: "Aprovado", preview: "{{nome}}, você esqueceu alguns itens no carrinho. Finalize agora e ganhe frete grátis." },
  { id: "tp_03", name: "Newsletter mensal", channel: "email", category: "Marketing", status: "Ativo", preview: "As novidades do mês, conteúdos selecionados e ofertas exclusivas para você." },
  { id: "tp_04", name: "Código de verificação", channel: "sms", category: "Autenticação", status: "Ativo", preview: "Seu código Ecoa é {{codigo}}. Válido por 10 minutos." },
  { id: "tp_05", name: "Confirmação de pedido", channel: "whatsapp", category: "Utilidade", status: "Em análise", preview: "Pedido #{{pedido}} confirmado! Acompanhe a entrega pelo link: {{link}}" },
  { id: "tp_06", name: "Pesquisa de satisfação", channel: "email", category: "Marketing", status: "Rascunho", preview: "De 0 a 10, quanto você recomendaria a gente para um amigo?" },
];

export const AUTOMATIONS = [
  { id: "au_01", name: "Fluxo de boas-vindas", trigger: "Contato criado", steps: 4, active: true, runs: 3402, conversion: "18,2%" },
  { id: "au_02", name: "Recuperação de carrinho", trigger: "Carrinho abandonado", steps: 3, active: true, runs: 1290, conversion: "24,6%" },
  { id: "au_03", name: "Aniversariantes do mês", trigger: "Data: aniversário", steps: 2, active: false, runs: 220, conversion: "9,1%" },
  { id: "au_04", name: "Pós-compra + avaliação", trigger: "Pedido entregue", steps: 5, active: true, runs: 2104, conversion: "31,0%" },
];

export const CONVERSATIONS = [
  { id: "cv_01", name: "Mariana Costa", last: "Perfeito, vou aproveitar o cupom!", time: "14:32", unread: 2, channel: "whatsapp" },
  { id: "cv_02", name: "Rafael Almeida", last: "Qual o prazo de entrega para o RJ?", time: "14:10", unread: 1, channel: "whatsapp" },
  { id: "cv_03", name: "Bruno Henrique", last: "Obrigado pelo retorno 🙏", time: "12:48", unread: 0, channel: "whatsapp" },
  { id: "cv_04", name: "Fernanda Lima", last: "SAIR", time: "Ontem", unread: 0, channel: "sms" },
  { id: "cv_05", name: "Diego Martins", last: "Consigo trocar o tamanho?", time: "Ontem", unread: 0, channel: "whatsapp" },
];

export const PLANS = [
  { name: "Starter", price: "R$ 97", period: "/mês", description: "Para quem está começando a falar com a base.", features: ["5.000 mensagens/mês", "1 número de WhatsApp", "E-mail ilimitado", "Relatórios básicos"], highlighted: false },
  { name: "Growth", price: "R$ 297", period: "/mês", description: "Para times que vivem de campanhas e automações.", features: ["50.000 mensagens/mês", "3 números de WhatsApp", "Automações ilimitadas", "Segmentos dinâmicos", "Caixa de entrada compartilhada"], highlighted: true },
  { name: "Scale", price: "Sob consulta", period: "", description: "Volume alto, SLA dedicado e infraestrutura própria.", features: ["Volume personalizado", "Números ilimitados", "SSO e auditoria", "Gerente de conta", "SLA 99,99%"], highlighted: false },
];
