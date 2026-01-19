import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { paymentCheckout } from "../polar/helper";

// TODO: create reusable modals
interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: UpgradeModalProps["open"]) => void;
}

function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange} defaultOpen={false}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upgrade to pro</AlertDialogTitle>
          <AlertDialogDescription>Get a premium access today to use all features</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={paymentCheckout}>Upgrade now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default UpgradeModal;
