import PageHeader from "@/components/PageHeader";
import ProposalForm from "@/components/proposal/ProposalForm.tsx";

export default function Proposal() {
    return (
        <div className="space-y-10">
            <PageHeader
                title="Proposer un sujet"
                subtitle="Participez à l'amélioration de cette base en suggérant des sujets"
            />
            <ProposalForm />
        </div>
    );
}