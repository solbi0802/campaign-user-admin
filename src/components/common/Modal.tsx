import { ReactNode } from "react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface DialogProps {
  title?: string;
  triggerChild: ReactNode;
  body: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "cover" | "full";
  placement?: "center" | "top" | "bottom";
  footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({
  title,
  triggerChild,
  body,
  size = "cover",
  placement = "center",
  footer,
  isOpen,
  onClose,
}: DialogProps) => {
  return (
    <DialogRoot
      size={size}
      placement={placement}
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent backgroundColor={"white"} color={"black"}>
        {/* <DialogCloseTrigger color={"gray.500"} /> */}
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <DialogBody pb="4">{body}</DialogBody>
        <DialogFooter justifyContent={"center"}>{footer}</DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default Modal;
