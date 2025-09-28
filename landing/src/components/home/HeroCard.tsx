import {Badge} from "@/components/ui/badge.tsx"
import StatSection from "@/components/home/StatSection.tsx";

export default function HeroCard() {

    return (
        <div className={'border-none max-w-3xl mx-auto py-28'}>
            <div className=" flex flex-col space-y-4 items-center">
                <div className={'space-y-5 text-center'}>
                    <Badge className={'text-sm'} variant={'secondary'}>La plus grand base de données de savoir 🇫🇷</Badge>
                    <h1 className={'text-8xl italic font-bold'}>L'ignorance n'est plus une option</h1>
                    <StatSection/>
                </div>
            </div>
        </div>
    );
}