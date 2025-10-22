import type { JSX } from "react";
import { useState } from "react";
import { Button } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import type { ComponentProps } from "react";

type ButtonVariant = ComponentProps<typeof Button>["variant"];

type Props = {
  buttonTitle: string;
  buttonClassname?: string;
  buttonVariant?: ButtonVariant;
  hasImg?: boolean;
  img?: JSX.Element;
  title?: string;
  description?: string;
  children?: JSX.Element | ((props: { onClose: () => void }) => JSX.Element);
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export const Modal: React.FC<Props> = ({
  buttonTitle,
  buttonClassname = "",
  buttonVariant = "default",
  hasImg = false,
  img,
  title,
  description,
  children,
  open,
  setOpen,
}) => {
  const [openInternal, setOpenInternal] = useState(false);
  const isControlled = typeof open === "boolean" && typeof setOpen === "function";

  const actualOpen = isControlled ? open! : openInternal;
  const setActualOpen = isControlled ? setOpen! : setOpenInternal;

  return (
    <Dialog open={actualOpen} onOpenChange={setActualOpen}>
      <DialogTrigger asChild>
        <Button
          className={buttonClassname}
          title={buttonTitle}
          hasImg={hasImg}
          img={img}
          variant={buttonVariant}
          type="button"
        />
      </DialogTrigger>

      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {typeof children === "function"
          ? children({ onClose: () => setActualOpen(false) })
          : children}
      </DialogContent>
    </Dialog>
  );
};
