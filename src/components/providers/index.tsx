import NextAuthProvider from './components/next-auth.provider';
import ReactQueryProvider from './components/react-query-provider';
import { ThemeProvider } from './components/theme-provider';

type ProvidersProps = {
    children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <NextAuthProvider>
            <ReactQueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    themes={['dark', 'light']}
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </ReactQueryProvider>
        </NextAuthProvider>
    );
}
