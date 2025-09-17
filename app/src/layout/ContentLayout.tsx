import { Outlet } from "react-router-dom"
import RandomButton from "@/components/RandomButton.tsx";
import ReadingProgress from "@/components/ReadingProgress.tsx";
import { CurrentResourceProvider } from "@/contexts/CurrentResourceContext";

export default function ContentLayout() {
    return (
        <CurrentResourceProvider>
            <ReadingProgress />
            <Outlet />
            <RandomButton/>
        </CurrentResourceProvider>
    )
}