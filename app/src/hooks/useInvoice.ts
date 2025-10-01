import { useState } from 'react'
import { pb } from '@/pocketbase/pocketbase'
import { toast } from 'sonner'

interface InvoiceResponse {
    invoice_url: string
    invoice_pdf: string
}

export function useInvoice() {
    const [isLoading, setIsLoading] = useState(false)

    const downloadInvoice = async () => {
        setIsLoading(true)
        try {
            const response = await pb.send<InvoiceResponse>('/get-invoice', {
                method: 'GET',
            })

            if (response.invoice_pdf) {
                // Ouvrir le PDF dans un nouvel onglet
                window.open(response.invoice_pdf, '_blank')
            } else if (response.invoice_url) {
                // Fallback sur l'URL hébergée
                window.open(response.invoice_url, '_blank')
            } else {
                toast.error("Aucune facture disponible")
            }
        } catch (error: any) {
            console.error('Erreur lors de la récupération de la facture:', error)

            if (error?.status === 404) {
                toast.error("Aucune facture trouvée")
            } else if (error?.status === 403) {
                toast.error("Vous devez être premium pour accéder aux factures")
            } else {
                toast.error(error?.message || "Erreur lors de la récupération de la facture")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        downloadInvoice,
        isLoading
    }
}