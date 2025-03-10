import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Hero Section */}
            <section className="space-y-6 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Food & Groceries, Delivered Fast
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Order from your favorite restaurants, grocery stores, and bakeries with instant delivery.
                </p>
                <div className="flex items-center space-x-2 max-w-md mx-auto">
                    <Input placeholder="Enter your delivery address" className="h-12" />
                    <Button size="lg">
                        <Search className="mr-2 h-4 w-4" />
                        Find Food
                    </Button>
                </div>
            </section>

            {/* Main Content */}
            <Tabs defaultValue="restaurants" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 h-14">
                    <TabsTrigger value="restaurants" className="py-2">Restaurants</TabsTrigger>
                    <TabsTrigger value="grocery" className="py-2">Grocery</TabsTrigger>
                    <TabsTrigger value="bakery" className="py-2">Bakery</TabsTrigger>
                </TabsList>

                <TabsContent value="restaurants" className="space-y-6">
                    {/* Featured Restaurants */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Popular Restaurants</h2>
                        <ScrollArea className="w-full whitespace-nowrap">
                            <div className="flex space-x-4 pb-4">
                                {restaurants.map((restaurant) => (
                                    <RestaurantCard key={restaurant.id} {...restaurant} />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </section>

                    {/* Cuisine Types */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Cuisines</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {cuisines.map((cuisine) => (
                                <CuisineCard key={cuisine.id} {...cuisine} />
                            ))}
                        </div>
                    </section>
                </TabsContent>

                <TabsContent value="grocery" className="space-y-6">
                    {/* Grocery Stores */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Grocery Stores</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groceryStores.map((store) => (
                                <StoreCard key={store.id} {...store} />
                            ))}
                        </div>
                    </section>
                </TabsContent>

                <TabsContent value="bakery" className="space-y-6">
                    {/* Bakeries */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Popular Bakeries</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bakeries.map((bakery) => (
                                <BakeryCard key={bakery.id} {...bakery} />
                            ))}
                        </div>
                    </section>
                </TabsContent>
            </Tabs>
        </div>
    )
}

// ... existing code ...

// Component for Store Cards
function StoreCard({ name, image, rating, deliveryTime, categories }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-[200px] object-cover"
                />
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex items-center">
                            ⭐ {rating}
                        </span>
                        <span>•</span>
                        <span>{deliveryTime} mins</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {categories.join(" • ")}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

// Component for Bakery Cards
function BakeryCard({ name, image, rating, deliveryTime, specialties }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
                <div className="relative">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-[200px] object-cover"
                    />
                    {specialties.includes("Bestseller") && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                            Bestseller
                        </span>
                    )}
                </div>
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex items-center">
                            ⭐ {rating}
                        </span>
                        <span>•</span>
                        <span>{deliveryTime} mins</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {specialties.slice(0, 3).join(" • ")}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

function RestaurantCard({ name, image, rating, cuisine, deliveryTime }) {
    return (
        <Card className="w-[300px] shrink-0">
            <CardContent className="p-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                />
                <div className="p-4 space-y-2">
                    <h3 className="font-semibold">{name}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>⭐ {rating}</span>
                        <span>{cuisine}</span>
                        <span>{deliveryTime} mins</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Component for Cuisine Cards
function CuisineCard({ name, image }) {
    return (
        <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
                <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 mx-auto mb-2 rounded-full"
                />
                <h3 className="font-medium">{name}</h3>
            </CardContent>
        </Card>
    )
}

// Sample data (you should move this to a separate file)
const restaurants = [
    {
        id: 1,
        name: "Burger King",
        image: "https://example.com/burger.jpg",
        rating: 4.5,
        cuisine: "Fast Food",
        deliveryTime: 30,
    },
    // Add more restaurants...
]

const cuisines = [
    {
        id: 1,
        name: "Pizza",
        image: "https://example.com/pizza.jpg",
    },
    // Add more cuisines...
]

const groceryStores = [
    {
        id: 1,
        name: "Fresh Market",
        image: "https://example.com/market.jpg",
        rating: 4.8,
        deliveryTime: 45,
    },
    // Add more stores...
]

const bakeries = [
    {
        id: 1,
        name: "Sweet Delights",
        image: "https://example.com/bakery.jpg",
        rating: 4.7,
        deliveryTime: 40,
    },
    // Add more bakeries...
]