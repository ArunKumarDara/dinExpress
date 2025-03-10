import { Link } from "react-router"
import { ShoppingBag, Menu, Sun, Moon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useTheme } from "@/context/theme-provider"

export function Navbar() {
    const { theme, setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center mx-auto px-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                        <MobileNav />
                    </SheetContent>
                </Sheet>
                <Link to="/" className="mr-6 flex items-center space-x-2">
                    <ShoppingBag className="h-6 w-6" />
                    <span className="font-bold inline-block">DineExpress</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link
                        to="/restaurants"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Restaurants
                    </Link>
                    <Link
                        to="/grocery"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Grocery
                    </Link>
                    <Link
                        to="/bakery"
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                        Bakery
                    </Link>
                </nav>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="mr-2"
                    >
                        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <User className="h-6 w-6" />
                                <span className="sr-only">Open user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem asChild>
                                <Link to="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/orders">Orders</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/addresses">Addresses</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" className="relative">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span className="ml-2 rounded-full bg-primary-foreground px-2 py-0.5 text-xs font-semibold">
                            0
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}


function MobileNav() {
    return (
        <nav className="flex flex-col space-y-4 p-4">
            <Link
                to="/"
                className="text-sm font-medium hover:text-foreground/80 text-foreground/60"
            >
                Home
            </Link>
            <Link
                to="/restaurants"
                className="text-sm font-medium hover:text-foreground/80 text-foreground/60"
            >
                Restaurants
            </Link>
            <Link
                to="/grocery"
                className="text-sm font-medium hover:text-foreground/80 text-foreground/60"
            >
                Grocery
            </Link>
            <Link
                to="/bakery"
                className="text-sm font-medium hover:text-foreground/80 text-foreground/60"
            >
                Bakery
            </Link>
            <Link
                to="/orders"
                className="text-sm font-medium hover:text-foreground/80 text-foreground/60"
            >
                Orders
            </Link>
        </nav>
    )
}