import { Outlet } from "react-router-dom"
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container py-10 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}