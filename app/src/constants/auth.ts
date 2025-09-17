export const AUTH_MESSAGES = {
  // Messages de succès
  LOGIN_SUCCESS: "Connexion réussie",
  LOGIN_SUCCESS_DESC: "Vous êtes maintenant connecté.",
  LOGOUT_SUCCESS: "Déconnexion réussie",
  LOGOUT_SUCCESS_DESC: "Vous avez été déconnecté",
  REGISTER_SUCCESS: "Inscription réussie",
  REGISTER_SUCCESS_DESC: "Un email de vérification a été envoyé. Veuillez vérifier votre boîte mail et valider votre compte avant d'essayer de vous connecter.",
  PASSWORD_RESET_SENT: "Email envoyé",
  PASSWORD_RESET_SENT_DESC: "Un lien de réinitialisation a été envoyé à votre adresse.",
    PASSWORD_RESET_SENT_FORGOT: "Si votre adresse existe dans notre base, un lien de réinitialisation a été envoyé.",
  PASSWORD_RESET_SUCCESS: "Mot de passe réinitialisé",
  PASSWORD_RESET_SUCCESS_DESC: "Votre mot de passe a été réinitialisé avec succès.",

  // Messages d'erreur
  LOGIN_ERROR: "Impossible de vous authentifier",
  LOGIN_ERROR_DESC: "Veuillez rééssayer en vérifiant vos identifiants et que votre compte est validé (confirmation par mail)",
  REGISTER_ERROR: "Une erreur est survenue lors de l'inscription",
  REGISTER_ERROR_DESC: "Veuillez rééssayer en vous assurant qu'un compte n'existe pas déjà lié à cette adresse email et que vos mots de passe correspondent.",
  PASSWORD_RESET_ERROR: "Impossible d'envoyer l'email de réinitialisation",
  SESSION_EXPIRED: "Session expirée",
  SESSION_EXPIRED_DESC: "Votre session a expiré. Veuillez vous reconnecter.",
  SESSION_INVALID: "Session invalide",
  SESSION_INVALID_DESC: "Votre session n'est plus valide. Veuillez vous reconnecter.",
  AUTH_ERROR: "Erreur d'authentification",
  AUTH_ERROR_DESC: "Impossible de récupérer vos informations. Veuillez vous reconnecter.",
  EMAIL_REQUIRED: "Veuillez saisir votre adresse email.",
  UNEXPECTED_ERROR: "Une erreur inattendue s'est produite. Veuillez réessayer.",

  // Messages de validation
  PASSWORDS_MUST_MATCH: "Les mots de passe doivent être identiques",
  WEAK_PASSWORD: "Le mot de passe ne respecte pas les critères de sécurité",
  INVALID_EMAIL: "Veuillez saisir une adresse email valide",
} as const

export const PASSWORD_REQUIREMENTS = [
  { regex: /.{10,}/, text: "Au moins 10 caractères" },
  { regex: /[0-9]/, text: "Au moins 1 chiffre" },
  { regex: /[a-z]/, text: "Au moins 1 minuscule" },
  { regex: /[A-Z]/, text: "Au moins 1 majuscule" },
  { regex: /[^a-zA-Z0-9]/, text: "Au moins 1 caractère spécial" },
] as const

export const CACHE_CONFIG = {
  USER_CACHE_DURATION: 2 * 60 * 1000, // 2 minutes
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutes
} as const