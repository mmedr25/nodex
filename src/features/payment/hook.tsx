import { useState } from "react"
import UpgradeModal from "./components/upgrade-modal"
import { TRPCClientError } from "@trpc/client"

export const useUpgradeModal = () => {
    const [open, setOpen] = useState(false)
    const handleError = (err: unknown) => {
        if (err instanceof TRPCClientError && err?.data?.code === "FORBIDDEN") {
            setOpen(true)
            return true
        }
        return false
    }
    const modal = <UpgradeModal open={open} onOpenChange={setOpen}/>

    return {modal, handleError, open}
}
