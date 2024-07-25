import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/util'; // Import from alias

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-custom text-custom-foreground hover:bg-custom/90 focus:ring-custom',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
        ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent',
        link: 'text-custom underline-offset-4 hover:underline focus:ring-custom',
      },
      size: {
        default: 'h-10 px-4 py-2 mx-1',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
