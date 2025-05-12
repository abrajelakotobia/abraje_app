import React from 'react';
import clsx from 'clsx';

interface PlaceholderPatternProps {
  className?: string;
}

export default function PlaceholderPattern({ className }: PlaceholderPatternProps) {
  return (
    <svg
      className={clsx("absolute inset-0 w-full h-full", className)}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="pattern"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="4" height="4" fill="#e5e7eb" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#pattern)" />
    </svg>
  );
}
