import * as React from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`rounded-lg border bg-white text-black shadow-sm ${className}`} {...props} />
))
Card.displayName = "Card"

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardHeader = ({ className = "", ...props }: CardHeaderProps) => (
  <div className={`p-4 border-b ${className}`} {...props} />
)

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle = ({ className = "", ...props }: CardTitleProps) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props} />
)

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardContent = ({ className = "", ...props }: CardContentProps) => (
  <div className={`p-4 ${className}`} {...props} />
)

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardFooter = ({ className = "", ...props }: CardFooterProps) => (
  <div className={`px-4 py-2 border-t ${className}`} {...props} />
)
