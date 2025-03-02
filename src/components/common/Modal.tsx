import { ReactNode } from "react";
import {
  DialogActionTrigger,
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
}

const Modal = ({
  title,
  triggerChild,
  body,
  size = "cover",
  placement = "center",
  footer,
}: DialogProps) => {
  return (
    <DialogRoot size={size} placement={placement}>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">{body}</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>{footer}</DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default Modal;
