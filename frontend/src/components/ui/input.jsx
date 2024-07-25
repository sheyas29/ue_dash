import * as React from 'react';
import { cn } from '../../lib/util'; // Ensure this utility is correct

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 caret-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };
