import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { X, LinkIcon, Plus } from "lucide-react"
import { useProposal } from "@/hooks/useProposal.ts"
import FieldBlock from "@/components/FieldBlock"

interface ProposalFormData {
    title: string
    description: string
}

interface ProposalSubmitData extends ProposalFormData {
    source: string[] | null
    user_id: string
}

const schema = yup
    .object({
        title: yup
            .string()
            .required("Le titre est obligatoire")
            .min(3, "Au moins 3 caractères"),
        description: yup
            .string()
            .required("La description est obligatoire")
            .min(10, "Au moins 10 caractères"),
    })
    .required()

export default function ProposalForm() {
    const [source, setsource] = useState<string[]>([])
    const [currentressource, setCurrentressource] = useState<string>('')
    const { submitProposal, isSubmitting } = useProposal()

    const methods = useForm<ProposalFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: ''
        }
    })

    const {
        handleSubmit,
        reset,
        formState: { isValid, isDirty }
    } = methods

    const addressource = () => {
        if (currentressource.trim()) {
            setsource([...source, currentressource.trim()])
            setCurrentressource('')
        }
    }

    const removeressource = (index: number) => {
        const newsource = source.filter((_, i) => i !== index)
        setsource(newsource)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentressource.trim()) {
            e.preventDefault()
            addressource()
        }
    }

    const resetForm = () => {
        reset()
        setsource([])
        setCurrentressource('')
    }

    const onSubmit = async (data: ProposalFormData) => {
        const proposalData: ProposalSubmitData = {
            ...data,
            source: source.length > 0 ? source : null,
            user_id: ''
        }

        const success = await submitProposal(proposalData)
        if (success) {
            resetForm()
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
                <FieldBlock
                    name="title"
                    label="Titre du sujet"
                    placeholder="Ex: Introduction au machine learning"
                    indication="Au moins 3 caractères"
                />

                <FieldBlock
                    name="description"
                    label="Description"
                    type="textarea"
                    placeholder="Décrivez le sujet que vous aimeriez voir traité..."
                    className="min-h-[100px]"
                    indication="Au moins 10 caractères"
                />

                        <div className="border-tertiary-foreground w-full flex flex-col rounded-xl border border-dashed p-4 transition-colors">
                            {source.length > 0 ? (
                                <div className="flex w-full flex-col gap-3">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="truncate text-sm font-medium">
                                            Ressources ajoutées ({source.length})
                                        </h3>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setsource([])}
                                            type="button"
                                        >
                                            <X className="-ms-0.5 size-3.5 opacity-60" />
                                            Tout supprimer
                                        </Button>
                                    </div>
                                    <div className="w-full space-y-2">
                                        {source.map((ressource, index) => (
                                            <div
                                                key={index}
                                                className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                                                        <LinkIcon className="size-4 opacity-60" />
                                                    </div>
                                                    <div className="flex min-w-0 flex-col gap-0.5">
                                                        <p className="truncate text-[13px] font-medium">
                                                            {ressource}
                                                        </p>
                                                        <p className="text-muted-foreground text-xs">
                                                            Ressource documentaire
                                                        </p>
                                                    </div>
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => removeressource(index)}
                                                    type="button"
                                                >
                                                    <X className="size-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}

                                        <div className="flex gap-2 mt-2">
                                            <Input
                                                placeholder="Ajouter une ressource..."
                                                value={currentressource}
                                                onChange={(e) => setCurrentressource(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                className="flex-1"
                                            />
                                            {currentressource.trim() && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={addressource}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center py-10">
                                    <div
                                        className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                    >
                                        <LinkIcon className="size-4 text-tertiary-foreground" />
                                    </div>
                                    <p className="mb-1.5 text-sm font-medium">Ajouter des ressources</p>
                                    <p className="text-muted-foreground text-xs mb-4">
                                        Liens, documentations, références utiles pour ce sujet
                                    </p>
                                    <div className="flex gap-2 w-full max-w-sm">
                                        <Input
                                            placeholder="Lien ou nom de ressource"
                                            value={currentressource}
                                            onChange={(e) => setCurrentressource(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            className="flex-1"
                                        />
                                        {currentressource.trim() && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={addressource}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )}
                    </div>

                    <div className="flex gap-3 justify-end">
                        {isDirty && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={resetForm}
                                disabled={isSubmitting}
                            >
                                Réinitialiser
                            </Button>
                        )}
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                        >
                            {isSubmitting ? "Envoi en cours..." : "Soumettre la proposition"}
                        </Button>
                    </div>
                </form>
        </FormProvider>
    )
}