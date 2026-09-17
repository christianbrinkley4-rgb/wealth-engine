/**
 * Stand-in for the `npm:@supabase/supabase-js` client the website-inquiry Edge
 * Function imports. Deno resolves that specifier; Node cannot, so vitest.config
 * aliases it here. This lets the function's request handling — authorization,
 * validation, dispatch and response shape — be tested without a database and
 * without a Deno runtime.
 *
 * It is deliberately dumb: it records what was asked for and returns what the
 * test told it to. It models no SQL behaviour, because the SQL is unapplied and
 * its logic is checked separately as source.
 */

export type QueryResult = {
  data: unknown;
  error: { code?: string; message?: string } | null;
};

type Chain = {
  select: (...args: unknown[]) => Chain;
  eq: (...args: unknown[]) => Chain;
  limit: (count: number) => Promise<QueryResult>;
  maybeSingle: () => Promise<QueryResult>;
};

const ALLOWED_KEY: QueryResult = { data: { name: "wealth-engine" }, error: null };

export const edgeStub = {
  /** What the website_ingress_keys lookup answers. Default: the key is valid. */
  key: ALLOWED_KEY as QueryResult,
  /** Tables read, in order. */
  tables: [] as string[],
  /** Every rpc the function made, in order, with the arguments it passed. */
  rpcCalls: [] as { name: string; args: Record<string, unknown> }[],
  /** What a named rpc answers. Anything unset answers { data: null, error: null }. */
  rpcResults: new Map<string, QueryResult>(),
  reset() {
    edgeStub.key = ALLOWED_KEY;
    edgeStub.tables = [];
    edgeStub.rpcCalls = [];
    edgeStub.rpcResults = new Map();
  },
};

/** The url, service key and auth options the function passes are not used here. */
export function createClient() {
  return {
    from(table: string) {
      edgeStub.tables.push(table);
      const chain: Chain = {
        select: () => chain,
        eq: () => chain,
        limit: async () => ({ data: [], error: null }),
        maybeSingle: async () => edgeStub.key,
      };
      return chain;
    },
    async rpc(name: string, args: Record<string, unknown>): Promise<QueryResult> {
      edgeStub.rpcCalls.push({ name, args });
      return edgeStub.rpcResults.get(name) ?? { data: null, error: null };
    },
  };
}
