import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarkdownRenderer from "@/components/MarkdownRenderer.tsx"

export default function Legal() {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-8 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Informations légales</h1>
          <p className="text-muted-foreground">
            Consultez nos conditions d'utilisation, notre politique de confidentialité et nos mentions légales
          </p>
        </div>

        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">
              <span className="hidden sm:inline">Conditions d'utilisation</span>
              <span className="sm:hidden">Conditions</span>
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <span className="hidden sm:inline">Politique de confidentialité</span>
              <span className="sm:hidden">Confidentialité</span>
            </TabsTrigger>
            <TabsTrigger value="legal-info">
              <span className="hidden sm:inline">Mentions légales</span>
              <span className="sm:hidden">Mentions</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="space-y-6 mt-6">
            <MarkdownRenderer 
              filePath="conditions-utilisation"
              fallbackContent="# Conditions d'utilisation\n\nContenu non disponible pour le moment."
              className="prose max-w-none"
            />
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 mt-6">
            <MarkdownRenderer 
              filePath="politique-confidentialite"
              fallbackContent="# Politique de confidentialité\n\nContenu non disponible pour le moment."
              className="prose max-w-none"
            />
          </TabsContent>

          <TabsContent value="legal-info" className="space-y-6 mt-6">
            <MarkdownRenderer 
              filePath="mentions-legales"
              fallbackContent="# Mentions légales\n\nContenu non disponible pour le moment."
              className="prose max-w-none"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}