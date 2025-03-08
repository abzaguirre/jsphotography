import * as React from "react"
import { cn } from "../../../utils/cn"


function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "text-black bg-white  h-96 resize-none placeholder:text-muted-foreground  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border  px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:ring-blue-400 focus-visible:ring-2",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
