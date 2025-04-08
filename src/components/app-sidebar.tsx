import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import HomeComponents from "./HomeComponents"

export function AppSidebar() {
    return (
        <Sidebar className="px-4">
            <SidebarContent  className="bg-white">
                <SidebarGroup />
                    <HomeComponents />
                <SidebarGroup />
            </SidebarContent>
        </Sidebar>
    )
}
