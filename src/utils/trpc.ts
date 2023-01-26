import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { getAbsoluteUrl } from '~/utils/absolute-url';
import superjson from 'superjson';

export const trpc = createTRPCNext({
  config({ ctx }) {
    return {
      transformer: superjson,

      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      links: [
        httpBatchLink({
          url: `${getAbsoluteUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});
