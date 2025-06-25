import React from 'react'

export const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <hr className={`border-t border-gray-200 my-4 ${className}`} />
)
