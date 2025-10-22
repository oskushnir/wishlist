import React, { type JSX } from "react"
import { Link } from "react-router-dom"
import { Button as ButtonComponent } from "./ui/button"

type Props = {
  linkTo?: string;
  title: string;
  hasImg?: boolean;
  img?: JSX.Element;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
} & React.ComponentProps<typeof ButtonComponent>

export const Button: React.FC<Props> = ({
  linkTo,
  title,
  className,
  variant,
  hasImg,
  img,
  ...rest
}) => {
  const buttonContent = (
    <div className="flex gap-2 justify-center items-center">
      {hasImg && img}
      {title}
    </div>
  );

  if (linkTo) {
    return (
      <ButtonComponent
        className={`${className ?? ""} cursor-pointer`}
        variant={variant}
        {...rest}
        asChild
      >
        <Link to={linkTo}>
          {buttonContent}
        </Link>
      </ButtonComponent>
    )
  }

  return (
    <ButtonComponent
      className={`${className ?? ""} cursor-pointer`}
      variant={variant}
      {...rest}
    >
      {buttonContent}
    </ButtonComponent>
  )
}