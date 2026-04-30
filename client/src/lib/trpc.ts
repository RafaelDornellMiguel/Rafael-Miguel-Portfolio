import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../server/routers'; // ajuste o caminho
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();