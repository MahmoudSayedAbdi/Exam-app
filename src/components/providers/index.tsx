import { ReactNode } from 'react';
import NextAuthProvider from './components/next-auth.provider';
import ReactQueryProvider from './components/react-query-provider';
import { ThemeProvider } from './components/theme-provider';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem themes={['dark', 'light']} disableTransitionOnChange>
            <NextAuthProvider>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </NextAuthProvider>
        </ThemeProvider>
    );
}
