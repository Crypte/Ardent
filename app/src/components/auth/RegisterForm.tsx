import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button.tsx"
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext.tsx"
import { PASSWORD_REQUIREMENTS } from "@/constants/auth"
import FieldBlock from "@/components/FieldBlock"
import { useState } from "react"

interface RegisterFormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const isStrongPassword = (password: string) => {
    return PASSWORD_REQUIREMENTS.every((req) => req.regex.test(password))
}

const schema = yup
    .object({
        name: yup
            .string()
            .required("Le nom est obligatoire")
            .min(2, "Au moins 2 caractères"),
        email: yup
            .string()
            .required("L'email est obligatoire")
            .email("Format d'email invalide"),
        password: yup
            .string()
            .required("Le mot de passe est obligatoire")
            .test("strong-password", "Le mot de passe ne respecte pas les critères", isStrongPassword),
        confirmPassword: yup
            .string()
            .required("La confirmation est obligatoire")
            .oneOf([yup.ref('password')], "Les mots de passe doivent être identiques")
    })
    .required()

export function RegisterForm() {
    const navigate = useNavigate()
    const { register } = useAuth()
    const [showVerificationMessage, setShowVerificationMessage] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const {
        handleSubmit,
        formState: { isValid, isSubmitting }
    } = methods

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const result = await register({
                email: data.email,
                password: data.password,
                passwordConfirm: data.confirmPassword,
                name: data.name.trim(),
            })

            if (result.success) {
                setUserEmail(data.email)
                setShowVerificationMessage(true)
            }
        } catch {
            // Les erreurs sont gérées par le contexte AuthContext
        }
    }

    if (showVerificationMessage) {
        return (
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col items-center gap-4">
                    <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>

                    <div className="text-center space-y-4">
                        <h2 className="text-lg font-semibold">Vérifiez votre email</h2>
                        <p className="text-muted-foreground">
                            Nous venons d'envoyer un mail de vérification à <strong>{userEmail}</strong>.
                        </p>

                        <Button
                            className="w-full"
                            onClick={() => navigate('/login')}
                        >
                            Aller au login
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <FormProvider {...methods}>
            <div className="flex flex-col gap-6 w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                    <div className="flex flex-col items-center gap-2">
                        <img src={'/ArdentLogo.png'} alt={'ArdentLogo'} className={'h-12'}/>
                        <div className="text-center text-sm text-muted-foreground">
                            Déjà un compte ?{" "}
                            <Link to="/login" className="underline underline-offset-4 text-tertiary-foreground w-fit">
                                Se connecter
                            </Link>
                        </div>
                    </div>

                    <FieldBlock
                        name="name"
                        label="Nom complet"
                        placeholder="Jean Dupont"
                        indication="Au moins 2 caractères"
                    />

                    <FieldBlock
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="m@example.com"
                        indication="Email valide requis - Une vérification par email sera nécessaire"
                    />

                    <FieldBlock
                        name="password"
                        label="Mot de passe"
                        type="password"
                        placeholder="Mot de passe"
                        indication="Au moins 10 caractères avec 1 chiffre, 1 minuscule, 1 majuscule et 1 caractère spécial"
                    />

                    <FieldBlock
                        name="confirmPassword"
                        label="Confirmer le mot de passe"
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        indication="Les mots de passe doivent être identiques"
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || !isValid}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Création...
                            </>
                        ) : (
                            "Créer mon compte"
                        )}
                    </Button>
                </form>

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