import { Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export default function Grocery() {
    return (
        <div className="container mx-auto px-4 py-6">
            {/* Hero Section */}
            <section className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Grocery Delivery</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="bg-gradient-to-r from-green-500 to-emerald-700 text-white">
                        <CardHeader>
                            <CardTitle>Fresh Produce</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Get fresh vegetables and fruits delivered daily</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-blue-500 to-indigo-700 text-white">
                        <CardHeader>
                            <CardTitle>Daily Essentials</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Never run out of your daily necessities</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-r from-purple-500 to-pink-700 text-white md:col-span-2 lg:col-span-1">
                        <CardHeader>
                            <CardTitle>Express Delivery</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Get your groceries in under 30 minutes</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for items..." className="pl-8" />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* Categories Tabs */}
            <Tabs defaultValue="all" className="space-y-8">
                <ScrollArea className="w-full whitespace-nowrap">
                    <TabsList className="inline-flex w-full justify-start">
                        <TabsTrigger value="all">All Items</TabsTrigger>
                        <TabsTrigger value="fruits">Fruits & Vegetables</TabsTrigger>
                        <TabsTrigger value="dairy">Dairy & Eggs</TabsTrigger>
                        <TabsTrigger value="pantry">Pantry</TabsTrigger>
                        <TabsTrigger value="beverages">Beverages</TabsTrigger>
                        <TabsTrigger value="snacks">Snacks</TabsTrigger>
                        <TabsTrigger value="household">Household</TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="all" className="space-y-8">
                    <ProductGrid products={allProducts} />
                </TabsContent>
                {/* Add other TabsContent components for other categories */}
            </Tabs>
        </div>
    )
}

function ProductGrid({ products }: { products: GroceryProduct[] }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

interface GroceryProduct {
    id: number
    name: string
    price: number
    originalPrice?: number
    image: string
    unit: string
    category: string
    inStock: boolean
    discount?: number
}

function ProductCard({ product }: { product: GroceryProduct }) {
    return (
        <Card className="group relative">
            <CardContent className="p-0">
                <div className="relative aspect-square">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.discount && (
                        <Badge className="absolute top-2 right-2 bg-red-500">
                            {product.discount}% OFF
                        </Badge>
                    )}
                </div>
                <div className="p-4 space-y-2">
                    <h3 className="font-medium line-clamp-2">{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                                ₹{product.originalPrice}
                            </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                            per {product.unit}
                        </span>
                    </div>
                    <Button className="w-full" disabled={!product.inStock}>
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

// Sample data
const allProducts: GroceryProduct[] = [
    {
        id: 1,
        name: "Fresh Organic Bananas",
        price: 40,
        originalPrice: 50,
        image: "https://source.unsplash.com/400x400/?banana",
        unit: "dozen",
        category: "fruits",
        inStock: true,
        discount: 20,
    },
    // Add more products...
]