import { useState, useEffect, useCallback } from 'react'
import { PASSWORD_REQUIREMENTS, AUTH_MESSAGES } from '@/constants/auth'

interface ValidationError {
  field: string
  message: string
}

interface FormData {
  email?: string
  password?: string
  confirmPassword?: string
  name?: string
}

interface ValidationRules {
  email?: boolean
  password?: boolean
  confirmPassword?: boolean
  name?: boolean
}

export const useFormValidation = (
  formData: FormData,
  rules: ValidationRules,
  debounceMs: number = 500
) => {
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [isValidating, setIsValidating] = useState(false)

  // Fonction pour valider l'email
  const validateEmail = useCallback((email: string): ValidationError | null => {
    if (!email) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { field: 'email', message: AUTH_MESSAGES.INVALID_EMAIL }
    }
    return null
  }, [])

  // Fonction pour valider le mot de passe
  const validatePassword = useCallback((password: string): ValidationError | null => {
    if (!password) return null
    const isStrong = PASSWORD_REQUIREMENTS.every(req => req.regex.test(password))
    if (!isStrong) {
      return { field: 'password', message: AUTH_MESSAGES.WEAK_PASSWORD }
    }
    return null
  }, [])

  // Fonction pour valider la confirmation de mot de passe
  const validateConfirmPassword = useCallback((password: string, confirmPassword: string): ValidationError | null => {
    if (!confirmPassword) return null
    if (password !== confirmPassword) {
      return { field: 'confirmPassword', message: AUTH_MESSAGES.PASSWORDS_MUST_MATCH }
    }
    return null
  }, [])

  // Fonction pour valider le nom
  const validateName = useCallback((name: string): ValidationError | null => {
    if (!name) return null
    if (name.trim().length < 2) {
      return { field: 'name', message: 'Le nom doit contenir au moins 2 caractères' }
    }
    return null
  }, [])

  // Fonction de validation principale
  const validate = useCallback(() => {
    const newErrors: ValidationError[] = []

    if (rules.email && formData.email !== undefined) {
      const error = validateEmail(formData.email)
      if (error) newErrors.push(error)
    }

    if (rules.password && formData.password !== undefined) {
      const error = validatePassword(formData.password)
      if (error) newErrors.push(error)
    }

    if (rules.confirmPassword && formData.password !== undefined && formData.confirmPassword !== undefined) {
      const error = validateConfirmPassword(formData.password, formData.confirmPassword)
      if (error) newErrors.push(error)
    }

    if (rules.name && formData.name !== undefined) {
      const error = validateName(formData.name)
      if (error) newErrors.push(error)
    }

    return newErrors
  }, [formData, rules, validateEmail, validatePassword, validateConfirmPassword, validateName])

  // Validation avec debounce
  useEffect(() => {
    setIsValidating(true)
    const timer = setTimeout(() => {
      const newErrors = validate()
      setErrors(newErrors)
      setIsValidating(false)
    }, debounceMs)

    return () => {
      clearTimeout(timer)
      setIsValidating(false)
    }
  }, [validate, debounceMs])

  // Marquer un champ comme touché
  const markAsTouched = useCallback((field: string) => {
    setTouched(prev => new Set(prev).add(field))
  }, [])

  // Obtenir l'erreur pour un champ spécifique
  const getFieldError = useCallback((field: string): string | null => {
    if (!touched.has(field)) return null
    const error = errors.find(e => e.field === field)
    return error ? error.message : null
  }, [errors, touched])

  // Vérifier si le formulaire est valide
  const isValid = errors.length === 0 && 
    Object.keys(rules).every(field => {
      const value = formData[field as keyof FormData]
      return value !== undefined && value !== ''
    })

  // Obtenir la force du mot de passe
  const getPasswordStrength = useCallback((password: string) => {
    if (!password) return { score: 0, requirements: PASSWORD_REQUIREMENTS.map(req => ({ ...req, met: false })) }
    
    const requirements = PASSWORD_REQUIREMENTS.map(req => ({
      ...req,
      met: req.regex.test(password)
    }))
    
    const score = requirements.filter(req => req.met).length
    
    return { score, requirements }
  }, [])

  return {
    errors,
    touched,
    isValidating,
    isValid,
    markAsTouched,
    getFieldError,
    getPasswordStrength,
    validate: () => {
      const newErrors = validate()
      setErrors(newErrors)
      return newErrors.length === 0
    }
  }
}