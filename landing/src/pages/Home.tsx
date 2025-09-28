import HeroCard from "@/components/home/HeroCard.tsx";
import PlanCard from "@/components/home/PlanCard.tsx";
import SocialSection from "@/components/home/SocialSection.tsx";
import FAQSection from "@/components/home/FAQSection.tsx";

export default function Home() {
    return (
        <div className="min-h-screen">
            <HeroCard/>
            <PlanCard/>
            <FAQSection/>
            <SocialSection/>
        </div>
    )
}
