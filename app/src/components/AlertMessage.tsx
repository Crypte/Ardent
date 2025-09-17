import {
    CircleAlertIcon,
    CheckCircle2Icon,
    InfoIcon,
    AlertTriangleIcon,
} from "lucide-react"
import clsx from "clsx"

interface AlertMessageProps {
    title: string
    description?: string
    list?: string[]
    variant?: "error" | "success" | "warning" | "info"
    className?: string
}

const variantStyles = {
    error: {
        icon: CircleAlertIcon,
        text: "text-red-600",
        border: "border-red-500/50",
    },
    success: {
        icon: CheckCircle2Icon,
        text: "text-green-600",
        border: "border-green-500/50",
    },
    warning: {
        icon: AlertTriangleIcon,
        text: "text-yellow-700",
        border: "border-yellow-500/50",
    },
    info: {
        icon: InfoIcon,
        text: "text-blue-600",
        border: "border-blue-500/50",
    },
}

export function AlertMessage({
                                 title,
                                 description,
                                 list,
                                 variant = "error",
                                 className,
                             }: AlertMessageProps) {
    const { icon: Icon, text, border } = variantStyles[variant]

    return (
        <div className={clsx("rounded-md px-4 py-3 border", text, border, className)}>
            <div className="flex gap-3">
                <Icon className="mt-0.5 shrink-0 opacity-60" size={16} aria-hidden="true" />
                <div className="grow space-y-1">
                    <p className="text-sm font-medium">{title}</p>

                    {description && (
                        <p className="text-sm opacity-80">{description}</p>
                    )}

                    {list && list.length > 0 && (
                        <ul className="list-inside list-disc text-sm opacity-80">
                            {list.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}