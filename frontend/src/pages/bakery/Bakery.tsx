import { useState } from "react"
import { Search, Filter, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate } from "react-router"

export default function Bakery() {
    const [selectedCategory, setSelectedCategory] = useState("all")
    const navigate = useNavigate()
    return (
        <div className="container mx-auto px-4 py-6">
            {/* Hero Section */}
            <section className="relative h-[300px] rounded-xl overflow-hidden mb-8">
                <img
                    src="https://source.unsplash.com/1600x400/?bakery"
                    alt="Bakery"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
                    <div className="text-white p-8">
                        <h1 className="text-4xl font-bold mb-2">Fresh Baked Daily</h1>
                        <p className="text-lg mb-4">Artisanal breads, cakes, and pastries</p>
                        <Button variant="secondary" size="lg" onClick={() => navigate("/bakery/pre-order")}>
                            Pre-order Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search bakery items..." className="pl-8" />
                </div>
                <Select defaultValue="featured">
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* Categories */}
            <Tabs defaultValue="all" className="space-y-8">
                <TabsList className="flex flex-wrap h-auto gap-2">
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="cakes">Cakes</TabsTrigger>
                    <TabsTrigger value="pastries">Pastries</TabsTrigger>
                    <TabsTrigger value="bread">Bread</TabsTrigger>
                    <TabsTrigger value="cookies">Cookies</TabsTrigger>
                    <TabsTrigger value="donuts">Donuts</TabsTrigger>
                    <TabsTrigger value="custom">Custom Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-8">
                    {/* Featured Items */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Featured Items</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {featuredItems.map((item) => (
                                <BakeryItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>

                    {/* Best Sellers */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {bestSellers.map((item) => (
                                <BakeryItemCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                </TabsContent>

                {/* Add other TabsContent components for other categories */}
            </Tabs>
        </div>
    )
}

interface BakeryItem {
    id: number
    name: string
    description: string
    price: number
    image: string
    category: string
    rating: number
    preparationTime: number
    isCustomizable?: boolean
    isVegan?: boolean
    allergens?: string[]
    available: boolean
}

function BakeryItemCard({ item }: { item: BakeryItem }) {
    const [quantity, setQuantity] = useState(0)

    return (
        <Card className="group overflow-hidden">
            <CardContent className="p-0">
                <div className="relative aspect-square">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {!item.available && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Badge variant="destructive" className="text-lg">
                                Sold Out
                            </Badge>
                        </div>
                    )}
                </div>
                <div className="p-4 space-y-3">
                    <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {item.rating}
                        </div>
                        <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.preparationTime} mins
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">₹{item.price}</span>
                        {item.available && (
                            quantity > 0 ? (
                                <div className="flex items-center border rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-none"
                                        onClick={() => setQuantity(Math.max(0, quantity - 1))}
                                    >
                                        <span className="text-lg font-semibold">-</span>
                                    </Button>
                                    <span className="w-8 text-center font-medium">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-none"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <span className="text-lg font-semibold">+</span>
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={() => setQuantity(1)}
                                >
                                    Add
                                </Button>
                            )
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {item.isCustomizable && (
                            <Badge variant="secondary">Customizable</Badge>
                        )}
                        {item.isVegan && (
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Vegan
                            </Badge>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Sample Data
const featuredItems: BakeryItem[] = [
    {
        id: 1,
        name: "Classic Chocolate Cake",
        description: "Rich chocolate layers with smooth ganache and fresh berries",
        price: 599,
        image: "https://source.unsplash.com/400x400/?chocolate-cake",
        category: "cakes",
        rating: 4.8,
        preparationTime: 30,
        isCustomizable: true,
        allergens: ["eggs", "dairy", "gluten"],
        available: true,
    },
    {
        id: 2,
        name: "Sourdough Bread",
        description: "Artisanal sourdough bread made with organic flour",
        price: 149,
        image: "https://source.unsplash.com/400x400/?sourdough-bread",
        category: "bread",
        rating: 4.9,
        preparationTime: 20,
        isVegan: true,
        allergens: ["gluten"],
        available: true,
    },
    // Add more items...
]

const bestSellers: BakeryItem[] = [
    {
        id: 3,
        name: "Butter Croissant",
        description: "Flaky, buttery layers of pure indulgence",
        price: 79,
        image: "https://source.unsplash.com/400x400/?croissant",
        category: "pastries",
        rating: 4.7,
        preparationTime: 15,
        allergens: ["dairy", "gluten"],
        available: true,
    },
    // Add more items...
]