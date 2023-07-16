import type { AppProps } from 'next/app';
import {SessionProvider} from 'next-auth/react';
import AppLayout from '@/components/hocs/AppLayout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider session={pageProps.session}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionProvider>
  );
};
