import { useCallback } from 'react'

// Types d'erreurs standardisés
export interface AppError {
    code: string
    message: string
    details?: any
    timestamp: Date
}

// Codes d'erreurs spécifiques à l'application
export const ErrorCodes = {
    NETWORK_ERROR: 'NETWORK_ERROR',
    AUTH_ERROR: 'AUTH_ERROR',
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
    NO_UNVIEWED_RESOURCES: 'NO_UNVIEWED_RESOURCES',
    DATABASE_ERROR: 'DATABASE_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR'
} as const

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes]

export function useErrorHandler() {
    // Normaliser les erreurs pour avoir un format consistant
    const normalizeError = useCallback((error: unknown): AppError => {
        if (error instanceof Error) {
            // Déterminer le code d'erreur basé sur le message
            let code: ErrorCode = ErrorCodes.UNKNOWN_ERROR
            
            if (error.message.includes('NO_UNVIEWED_RESOURCES')) {
                code = ErrorCodes.NO_UNVIEWED_RESOURCES
            } else if (error.message.includes('fetch') || error.message.includes('network')) {
                code = ErrorCodes.NETWORK_ERROR
            } else if (error.message.includes('auth')) {
                code = ErrorCodes.AUTH_ERROR
            } else if (error.message.includes('not found')) {
                code = ErrorCodes.RESOURCE_NOT_FOUND
            }

            return {
                code,
                message: error.message,
                details: error.stack,
                timestamp: new Date()
            }
        }

        if (typeof error === 'string') {
            return {
                code: ErrorCodes.UNKNOWN_ERROR,
                message: error,
                timestamp: new Date()
            }
        }

        return {
            code: ErrorCodes.UNKNOWN_ERROR,
            message: 'Une erreur inconnue s\'est produite',
            details: error,
            timestamp: new Date()
        }
    }, [])

    // Logger les erreurs de manière centralisée
    const logError = useCallback((error: AppError) => {
        console.error(`[${error.timestamp.toISOString()}] ${error.code}: ${error.message}`, error.details)
        
        // Ici on pourrait ajouter un service d'analytics ou de logging externe
        // analytics.track('error', { code: error.code, message: error.message })
    }, [])

    // Handler principal pour gérer les erreurs
    const handleError = useCallback((error: unknown): AppError => {
        const normalizedError = normalizeError(error)
        logError(normalizedError)
        return normalizedError
    }, [normalizeError, logError])

    // Fonction utilitaire pour créer une erreur spécifique
    const createError = useCallback((code: ErrorCode, message: string, details?: any): AppError => {
        return {
            code,
            message,
            details,
            timestamp: new Date()
        }
    }, [])

    // Fonction pour vérifier si une erreur est d'un type spécifique
    const isErrorOfType = useCallback((error: AppError, code: ErrorCode): boolean => {
        return error.code === code
    }, [])

    // Messages d'erreur user-friendly
    const getErrorMessage = useCallback((error: AppError): string => {
        switch (error.code) {
            case ErrorCodes.NO_UNVIEWED_RESOURCES:
                return 'Toutes les ressources ont été vues'
            case ErrorCodes.NETWORK_ERROR:
                return 'Erreur de connexion. Vérifiez votre connexion internet.'
            case ErrorCodes.AUTH_ERROR:
                return 'Erreur d\'authentification. Veuillez vous reconnecter.'
            case ErrorCodes.RESOURCE_NOT_FOUND:
                return 'La ressource demandée est introuvable'
            case ErrorCodes.DATABASE_ERROR:
                return 'Erreur de base de données. Veuillez réessayer plus tard.'
            case ErrorCodes.VALIDATION_ERROR:
                return 'Données invalides'
            default:
                return error.message || 'Une erreur s\'est produite'
        }
    }, [])

    return {
        handleError,
        createError,
        isErrorOfType,
        getErrorMessage,
        ErrorCodes
    }
}