import {Outlet} from "react-router-dom"
import Footer from "@/components/Footer.tsx";

export default function HomeLayout() {
    return (
        <div className=" flex flex-col min-h-screen ">
            {/* Contenu centré verticalement */}
            <div className="flex-1 container flex items-center justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}