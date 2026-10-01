import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { subscribeAllContacts, subscribeConnections, subscribeContacts, subscribeMessages } from "@/services/realtime";
import type { Connection, Contact, Message } from "@/types";

interface RealtimeState<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

/** Assina um listener do Firestore enquanto o componente estiver montado e houver usuário. */
function useSubscription<T>(
  subscribe: ((onChange: (items: T[]) => void, onError: (e: Error) => void) => () => void) | null,
  deps: unknown[],
): RealtimeState<T> {
  const { user } = useAuth();
  const [state, setState] = useState<RealtimeState<T>>({ data: [], loading: true, error: null });

  useEffect(() => {
    if (!user || !subscribe) {
      setState({ data: [], loading: false, error: null });
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    return subscribe(
      (data) => setState({ data, loading: false, error: null }),
      (error) => setState({ data: [], loading: false, error }),
    );
  }, [user?.uid, ...deps]);

  return state;
}

export const useConnections = () =>
  useSubscription<Connection>((onChange, onError) => subscribeConnections(onChange, onError), []);

export const useContacts = (connectionId: string | undefined) =>
  useSubscription<Contact>(
    connectionId ? (onChange, onError) => subscribeContacts(connectionId, onChange, onError) : null,
    [connectionId],
  );

/** Todos os contatos do cliente; só assina quando `enabled` (ex.: diálogo aberto). */
export const useAllContacts = (enabled: boolean) =>
  useSubscription<Contact>(enabled ? (onChange, onError) => subscribeAllContacts(onChange, onError) : null, [enabled]);

export const useMessages = (connectionId: string | undefined) =>
  useSubscription<Message>(
    connectionId ? (onChange, onError) => subscribeMessages(connectionId, onChange, onError) : null,
    [connectionId],
  );
