import { useFormContext, type RegisterOptions } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
 name: string;
 label: string;
 type?: "text" | "email" | "password" | "textarea";
 registerOptions?: RegisterOptions;
 placeholder?: string;
 className?: string;
 indication?: string;
}

export default function FieldBlock({ name, label, type="text", registerOptions = {}, placeholder, className, indication}: Props) {
  const { register } = useFormContext();

  return (
    <div className="space-y-2">
      {type === "textarea" ? (
        <Textarea
          label={label}
          id={name}
          placeholder={placeholder}
          className={className}
          {...register(name, registerOptions)}
        />
      ) : (
        <Input
          label={label}
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, registerOptions)}
        />
      )}
        {indication && (
        <p className="text-xs text-muted-foreground">{indication}</p>
      )}
    </div>
  );
}