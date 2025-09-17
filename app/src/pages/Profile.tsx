import { useAuth } from "@/contexts/AuthContext"
import {PasswordResetCard} from "@/components/profile/PasswordResetCard.tsx";
import {DeleteAccountCard} from "@/components/profile/DeleteAccountCard.tsx";
import {PersonalInfoCard} from "@/components/profile/PersonalInfoCard.tsx";
import {ProgressionCard} from "@/components/profile/ProgressionCard.tsx";

export default function Profile() {
    const { user, logout } = useAuth()

    return (
        <div className="space-y-10">
            {user && (
                <>
                    <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Paramètres du compte</h1>
                            <p className="text-muted-foreground">
                                Gérez vos informations personnelles
                            </p>
                        </div>
                    </div>
                <PersonalInfoCard
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    verified={user.verified}
                />
                <ProgressionCard />
                <PasswordResetCard email={user.email}/>
                <DeleteAccountCard id={user.id} onAccountDeleted={logout}/>

                </>
            )}
        </div>
    );
}
