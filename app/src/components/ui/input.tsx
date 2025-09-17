import * as React from "react"
import { useState } from "react"
import { EyeIcon, EyeOffIcon, CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  copy?: boolean
  tooltipText?: string
  maxWidth?: string
}

function Input({ className, type, label, copy = false, tooltipText = "Copy to clipboard", ...props }: InputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)
  
  const handleCopy = () => {
    if (props.value) {
      navigator.clipboard.writeText(String(props.value))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const inputElement = copy ? (
    <div className={cn("relative", className)}>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base sm:text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 pe-9",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
        readOnly
        {...props}
      />
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed"
              aria-label={copied ? "Copied" : tooltipText}
              type="button"
            >
              <div
                className={cn(
                  "transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  "absolute inset-0 flex items-center justify-center"
                )}
              >
                <CheckIcon className="stroke-emerald-500" size={16} aria-hidden="true" />
              </div>
              <div
                className={cn(
                  "transition-all",
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                )}
              >
                <CopyIcon size={16} aria-hidden="true" />
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {copied ? "Copied!" : tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  ) : type === "password" ? (
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base sm:text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 pe-9",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        aria-pressed={isVisible}
      >
        {isVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  ) : (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base sm:text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )

  if (label) {
    return (
      <div className="grid gap-2">
        <label htmlFor={props.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
        {inputElement}
      </div>
    )
  }

  return inputElement
}

export { Input }