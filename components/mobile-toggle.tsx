import { Menu } from "lucide-react"



import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ServerSidebar } from "./server/server-sidebar";


export const MobileToggle = ({
    serverId
}: { serverId: string }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden" size='icon'>
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className="p-0 flex gap-0">
                <SheetHeader>
                    <SheetTitle />
                    <SheetDescription />
                </SheetHeader>
                <div className="w-[72px]">
                    <NavigationSidebar/>
                </div>
                <ServerSidebar serverId={serverId}/>
            </SheetContent>
        </Sheet>
    )
}