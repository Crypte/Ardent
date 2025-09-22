import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button.tsx"
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext.tsx"
import FieldBlock from "@/components/FieldBlock"

interface LoginFormData {
    email: string
    password: string
}

const schema = yup
    .object({
        email: yup
            .string()
            .required("L'email est obligatoire")
            .email("Format d'email invalide"),
        password: yup
            .string()
            .required("Le mot de passe est obligatoire")
    })
    .required()

export function LoginForm() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const methods = useForm<LoginFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login(data)
            if (result.success) {
                navigate("/")
            }
        } catch {
            // Les erreurs sont gérées par le contexte AuthContext
        }
    }

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-6 w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <div className="text-center text-sm text-muted-foreground">
                            Pas encore de compte ?{" "}
                            <Link to="/auth/register" className="underline underline-offset-4 text-tertiary-foreground">
                                Créer un compte
                            </Link>
                        </div>
                    </div>

                    <FieldBlock
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="m@example.com"
                        indication="Adresse email valide requise"
                    />

                    <FieldBlock
                        name="password"
                        label="Mot de passe"
                        type="password"
                        placeholder="Mot de passe"
                        indication="Saisissez votre mot de passe"
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || !isValid}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connexion...
                            </>
                        ) : (
                            "Se connecter"
                        )}
                    </Button>
                </form>

                <div className="text-center text-sm">
                    <Link
                        to="/auth/forgot-password"
                        className="text-muted-foreground underline underline-offset-4 hover:text-primary"
                        replace
                    >
                        Mot de passe oublié ?
                    </Link>
                </div>

                <div className="text-muted-foreground text-center text-xs text-balance">
                    En continuant, vous acceptez nos {""}
                    <Link to={'https://www.ardent-projet.fr/legal'} target={'_blank'} className="underline underline-offset-4 hover:text-primary">
                        conditions
                    </Link>.
                </div>
            </div>
        </FormProvider>
    )
}