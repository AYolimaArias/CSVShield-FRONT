import styles from "../Button/module.css";
import clsx from "clsx";

const Button = ({
  variant = "primary",
  size = "md",
  icon,
  href,
  className,
  children,

  ...delegated
}) => {
  const Tag = typeof href === "string" ? "a" : "button";

  const variantStyle = clsx(
    variant === "primary" && styles.default,
    variant === "secondary" && styles.secondary
  );
  const sizeStyle = clsx(
    size === "sm" && styles.sm,
    size === "md" && styles.md,
    size === "lg" && styles.lg
  );
  const styleFinal = clsx(
    variantStyle,
    sizeStyle,
    "flex gap-2 items-center",
    Tag === "a" && "underline underline-offset-4 decoration-2",
    className
  );

  return (
    <Tag {...delegated} href={href} className={styleFinal}>
      {icon}
      {children}
    </Tag>
  );
};
export default Button;
