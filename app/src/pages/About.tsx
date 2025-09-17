import FAQSection from "@/components/about/FAQSection";
import SupportSection from "@/components/about/SupportSection";

export default function About() {
  return (
    <div className="space-y-10">
      <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold mb-2">À Propos</h1>
          <p className="text-muted-foreground">
            Trouvez toutes les réponses à vos questions, contactez notre support et
            rejoignez notre communauté
          </p>
        </div>
      </div>
      <SupportSection />
      <FAQSection />
    </div>
  );
}