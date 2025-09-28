import {Outlet} from "react-router-dom"
import Footer from "@/components/Footer.tsx";
import Navbar from "@/components/Navbar.tsx";

export default function HomeLayout() {
    return (
        <main>
            <Navbar />
            <div className={'container mx-auto py-12'}>
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}