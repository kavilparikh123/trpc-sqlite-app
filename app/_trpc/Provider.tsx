'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '@/utils/trpc';
import { useState } from 'react';

export default function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}