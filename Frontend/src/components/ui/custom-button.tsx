
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  ...props
}) => {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "after:absolute after:inset-0 after:z-[-1] after:opacity-0 after:transition-opacity",
        "hover:after:opacity-10",
        "after:bg-white",
        "shadow-button hover:shadow-md",
        "disabled:shadow-none",
        className
      )}
      variant={variant}
      size={size}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export { CustomButton };
