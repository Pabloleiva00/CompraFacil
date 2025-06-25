import React from 'react'

interface TooltipProps {
  children: React.ReactNode
  label: string
}

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>

export const Tooltip: React.FC<TooltipProps> = ({ children }) => <>{children}</>

export const TooltipTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>

export const TooltipContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>
