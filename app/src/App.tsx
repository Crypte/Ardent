import "./App.css"
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import FullScreenLoader from "@/components/FullScreenLoader"
import ScrollToTop from "@/components/ScrollToTop"
import { AppRoutes } from "./routes"



function App() {
    return (
        <div vaul-drawer-wrapper="" className="bg-background relative">
        <Router>
                <ScrollToTop />
                <AuthProvider>
                <AppContent/><Toaster richColors theme={'light'} position={'bottom-center'} duration={4000} />
                </AuthProvider>
            </Router>
        </div>
    );

}
function AppContent() {
    const { loading } = useAuth()

    if (loading) {
        return <FullScreenLoader />
    }

    return <AppRoutes />
}

export default App;
