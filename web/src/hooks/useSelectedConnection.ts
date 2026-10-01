import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useConnections } from "./useRealtime";

const STORAGE_KEY = "conexaoSelecionada";
export const CONNECTION_PARAM = "conexao";

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // sem storage (aba anônima etc.): só não lembra a escolha
  }
}

/**
 * Conexão em uso nas telas de contatos/mensagens.
 * Ordem: ?conexao= na URL → última escolhida (localStorage) → primeira da lista.
 */
export function useSelectedConnection() {
  const connections = useConnections();
  const [params, setParams] = useSearchParams();

  const requested = params.get(CONNECTION_PARAM) ?? readStored();
  const selected =
    connections.data.find((c) => c.id === requested) ?? connections.data[0] ?? null;

  useEffect(() => {
    if (selected) store(selected.id);
  }, [selected]);

  function select(id: string) {
    store(id);
    const next = new URLSearchParams(params);
    next.set(CONNECTION_PARAM, id);
    setParams(next, { replace: true });
  }

  return { connections: connections.data, loading: connections.loading, error: connections.error, selected, select };
}
