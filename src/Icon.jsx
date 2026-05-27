import React from 'react';
import * as LucideIcons from 'lucide-react';

export const Icon = ({ name, size = 20, strokeWidth = 1.75, className = "" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return <span className={className} style={{ width: size, height: size, display: 'inline-block' }} />;
  }
  return <LucideIcon size={size} strokeWidth={strokeWidth} className={className} />;
};
