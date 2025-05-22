import type { Metadata } from 'next';
import SearchComponenet from '@/components/search-component';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard next app',
};

type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <main className="px-10 py-4 w-full ">
                    <SidebarTrigger />
                    <div className="dashboard flex flex-col gap-10">
                        <SearchComponenet />
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </>
    );
}
