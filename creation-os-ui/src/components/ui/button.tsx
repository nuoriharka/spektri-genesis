import * as React from "react"
// Note: Avoid Radix Slot to prevent React.Children.only errors during prerender
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-foreground shadow-lg shadow-brand/20 hover:bg-brand/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-10 rounded-md px-4",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-11 w-11",
        xs: "h-9 px-3 rounded-md text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      // Only merge className and other safe props; don't attach ref/disabled to anchors or custom components in SSR
      const { className: childClassName, children: childChildren, ...childRest } = (children as any).props ?? {};
      return React.cloneElement(children as React.ReactElement<any>, {
        ...childRest,
        ...props,
        className: cn(childClassName, classes),
        children: (
          <>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {childChildren}
          </>
        ),
      });
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
