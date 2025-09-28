import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "@/pages/Home.tsx";
import NotFound from "@/pages/NotFound.tsx";
import HomeLayout from "@/layout/HomeLayout.tsx";
import LivreBlanc from "@/pages/LivreBlanc.tsx";
import ConditionsUtilisation from "@/pages/ConditionsUtilisation.tsx";
import ScrollToTop from "@/components/ScrollToTop.tsx";
import MentionsLegales from "@/pages/MentionsLegales.tsx";
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite.tsx";

function App() {
    return (
        <div vaul-drawer-wrapper="" className="bg-background">
            <Router>
                <AppContent/>
                <ScrollToTop/>
            </Router>
        </div>
    );
}

function AppContent() {
    return (
        <>
            <Routes>
                <Route element={<HomeLayout/>}>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/livre-blanc" element={<LivreBlanc />} />
                    <Route path="/conditions" element={<ConditionsUtilisation />} />
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/politique" element={<PolitiqueConfidentialite />}/>
                </Route>
            </Routes>
        </>
    );
}

export default App
