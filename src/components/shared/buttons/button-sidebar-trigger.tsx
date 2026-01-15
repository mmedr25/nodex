"use client"
import { useSidebar } from "@/components/ui/sidebar"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ButtonSidebarTrigger() {
  const { toggleSidebar } = useSidebar()

  return <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size={"sm"} onClick={toggleSidebar}>
            <MenuIcon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toogle sidebar</p>
      </TooltipContent>
    </Tooltip>
}


