import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="text-center py-12 space-y-4">
      <div className="flex justify-center text-muted-foreground">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="lems-button-primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};