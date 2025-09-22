import {Outlet} from "react-router-dom"
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";


export default function ContentLayout() {
    return (
        <main>
            <Navbar />
            <div className={'container py-4'}>
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}