import { Badge } from "@/components/ui/badge"

interface ResourceHeaderProps {
    theme:string
    title: string
    created:string
    isViewed:boolean
}

export default function ResourceHeader({ title, theme, created, isViewed}: ResourceHeaderProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ]
        
        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()
        
        return `${day} ${month} ${year}`
    }
    
    const formattedDate = formatDate(created)
    return (
        <div className={'mb-10 space-y-3'}>
            <div className={'flex items-center justify-between gap-5'}>
                <div className={'flex items-center gap-4 flex-wrap'}>
                    {isViewed && (
                        <Badge className={'bg-tertiary text-tertiary-foreground '}>Déjà vu</Badge>
                    )}
                    <Badge variant={'secondary'}>{theme}</Badge>
                </div>
            </div>
            <h1 className="lg:text-4xl text-3xl italic font-bold">{title}</h1>
            <div className={'text-sm flex items-center gap-2'}>Le {formattedDate} par
                <Badge  variant={'secondary'} className="rounded-full gap-1 pl-0.5 pr-1.5">
                        <img
                            className="size-4 rounded-full"
                            src="/ArdentLogo.svg"
                            alt="Profile image Ardent"
                            width={24}
                            height={24}
                            aria-hidden="true"
                        />
                     Ardent
                </Badge>
            </div>
        </div>
    )
}
