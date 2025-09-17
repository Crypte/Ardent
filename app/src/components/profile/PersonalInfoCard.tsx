import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {AlertCircle, Loader2, Undo2} from "lucide-react"
import { Credenza, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle } from "@/components/ui/credenza"
import { Separator } from "@/components/ui/separator"
import { usePersonalInfo } from "@/hooks/usePersonalInfo"
import {CONTACT} from "@/constants/contact.ts";

interface PersonalInfoCardProps {
    id: string
    email: string
    name: string
    verified: boolean
}

export function PersonalInfoCard({ id, name, email, verified }: PersonalInfoCardProps) {
    const {
        currentName,
        setCurrentName,
        error,
        validateName,
        isSaving,
        showConfirm,
        setShowConfirm,
        handleSave,
        resetName,
    } = usePersonalInfo(id, name)

    return (
        <>
            <div>
                <Card className="border rounded-lg">
                    <CardHeader>
                        <CardTitle className={'text-xl'}>
                            Profil
                        </CardTitle>
                        <CardDescription>
                            Vos informations clés
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="space-y-6">
                        <Input className={'lg:w-1/3 sm:w-1/2 '} value={id} copy={true} tooltipText={'Copier'} label={"Votre identifiant unique"}/>
                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 align-top">
                            {/* Name Section */}
                            <div>
                                    {error && (
                                        <span className="text-xs text-destructive ml-2 inline-flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                            {error}
                                    </span>
                                    )}
                                <Input
                                    id="firstName"
                                    label={"Prénom"}
                                    value={currentName}
                                    maxLength={20}
                                    onChange={(e) => {
                                        setCurrentName(e.target.value)
                                        if (error) validateName()
                                    }}
                                    onBlur={validateName}
                                    className={`${error ? "border-destructive focus:ring-destructive/20" : ""}`}
                                />
                            </div>
                            <div>
                                <div className="relative">
                                    <Input id="email" label={'Email'} type="email" value={email} disabled />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    {verified && (
                                        <p className={'text-green-500'}>Votre email est vérifié </p>
                                    )} Besoin de changer d'e-mail ? Contactez le support à{" "}
                                    <a 
                                        href={`mailto:${CONTACT.CONTACT_EMAIL}`}
                                        className="text-tertiary-foreground hover:underline"
                                    >
                                        {CONTACT.CONTACT_EMAIL}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end space-x-3">
                        {currentName.trim() !== name && !isSaving ? (
                            <Button
                                variant="outline"
                                onClick={resetName}
                                disabled={isSaving}
                            >
                                <Undo2/>
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        <Button
                            onClick={() => validateName() && currentName.trim() !== name && setShowConfirm(true)}
                            disabled={currentName.trim() === name || isSaving || !!error}
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                    Enregistrement...
                                </>
                            ) : (
                                <>Mettre à jour le profil</>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <Credenza open={showConfirm} onOpenChange={setShowConfirm}>
                <CredenzaContent>
                    <CredenzaHeader>
                        <CredenzaTitle>Confirmer les modifications</CredenzaTitle>
                        <CredenzaDescription>
                            Voulez-vous vraiment changer votre nom de &quot;{name}&quot; à &quot;{currentName.trim()}&quot; ?
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <CredenzaFooter>
                        <CredenzaClose asChild>
                            <Button variant="ghost" onClick={() => {
                                setCurrentName(name)
                                setShowConfirm(false)
                            }}>
                                Annuler
                            </Button>
                        </CredenzaClose>
                        <CredenzaClose asChild>
                            <Button onClick={handleSave}>Confirmer</Button>
                        </CredenzaClose>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza>
        </>
    )
}