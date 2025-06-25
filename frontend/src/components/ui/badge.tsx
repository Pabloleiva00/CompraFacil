import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`inline-block px-2 py-1 text-xs font-semibold text-white bg-gray-600 rounded ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
