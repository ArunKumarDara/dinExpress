import { PropsWithChildren } from "react"
import { Navbar } from "./Navbar"


const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            <header>
                <Navbar />
            </header>
            <main className="min-h-screen container mx-auto px-4 py-8 flex-1">
                {children}
            </main>
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p> made with love by aurn</p>
                </div>
            </footer>
        </div>
    )
}

export default Layout