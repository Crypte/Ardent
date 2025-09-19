import {Outlet} from "react-router-dom"
import Navbar from "@/components/Navbar.tsx";


export default function ContentLayout() {
    return (
        <main>
            <Navbar />
            <div className={'container py-4'}>
                <Outlet />
            </div>
        </main>
    )
}