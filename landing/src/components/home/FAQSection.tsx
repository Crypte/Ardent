import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx";

const faqData = [
  {
    question: "Comment utiliser Ardent ?",
    answer: "Ardent est simple à utiliser : parcourez les ressources, découvrez de nouveaux contenus grâce au bouton aléatoire, et suivez votre progression d'apprentissage via votre profil."
  },
  {
    question: "Les ressources sont-elles gratuites ?",
    answer: "Oui, toutes les ressources sur Ardent sont accessibles gratuitement. Notre mission est de rendre l'apprentissage du développement accessible à tous."
  },
  {
    question: "Puis-je suggérer des ressources ?",
    answer: "Absolument ! Nous encourageons la communauté à partager leurs découvertes. Contactez-nous via le formulaire de contact pour soumettre vos suggestions."
  },
  {
    question: "Comment fonctionne le système de progression ?",
    answer: "Votre progression est automatiquement suivie lorsque vous consultez des ressources. Vous pouvez voir vos statistiques dans votre profil utilisateur."
  },
  {
    question: "Y a-t-il une application mobile ?",
    answer: "Pour l'instant, Ardent est accessible via navigateur web. Une application mobile est en cours de développement et sera bientôt disponible."
  },
  {
    question: "Comment puis-je signaler un problème ?",
    answer: "Vous pouvez nous contacter via le formulaire de support ou directement par email. Nous répondons généralement sous 24h."
  }
];

export default function FAQSection() {
  return (
    <section className="py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-semibold mb-2">FAQ</h2>
        <p className="text-lg text-muted-foreground">Peut-être une réponse facile ?</p>
      </div>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <Accordion key={index} type="single" collapsible className="w-full">
            <AccordionItem value={`item-${index}`} className="bg-muted rounded-lg border-0 px-4">
              <AccordionTrigger className="text-left hover:bg-muted rounded-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}