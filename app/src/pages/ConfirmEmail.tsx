import { useSearchParams } from "react-router-dom"
import ConfirmEmailForm from "@/components/auth/ConfirmEmailForm"

export default function ConfirmEmail() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")

    return (
        <ConfirmEmailForm token={token} />
    )
}
