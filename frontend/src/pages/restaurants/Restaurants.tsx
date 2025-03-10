import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router"

export default function Restaurants() {
    const navigate = useNavigate()
    const [priceRange, setPriceRange] = useState([0, 1000])

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
                    <p className="text-muted-foreground mt-1">
                        Discover restaurants in your area
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-4">
                    <div className="flex w-full md:w-[300px]">
                        <Input
                            placeholder="Search restaurants..."
                            className="rounded-r-none"
                        />
                        <Button variant="secondary" className="rounded-l-none">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <FilterSidebar
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Desktop Filters Sidebar */}
                <div className="hidden md:block w-[240px] flex-shrink-0">
                    <FilterSidebar
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                </div>

                {/* Restaurant Grid */}
                <div className="flex-1">
                    {/* Sort Options */}
                    <div className="flex justify-end mb-4">
                        <Select defaultValue="recommended">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="recommended">Recommended</SelectItem>
                                <SelectItem value="rating">Rating</SelectItem>
                                <SelectItem value="delivery-time">Delivery Time</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Restaurant Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {restaurants.map((restaurant) => (
                            <RestaurantCard key={restaurant.id} {...restaurant} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

interface FilterSidebarProps {
    priceRange: number[]
    setPriceRange: (value: number[]) => void
    isSheet?: boolean
}

function FilterSidebar({ priceRange, setPriceRange, isSheet }: FilterSidebarProps) {
    return (
        <div className="space-y-6">
            {isSheet && (
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
            )}
            <div className="space-y-4">
                <h3 className="font-medium">Cuisines</h3>
                <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                        {cuisines.map((cuisine) => (
                            <div key={cuisine} className="flex items-center space-x-2">
                                <Checkbox id={cuisine} />
                                <label
                                    htmlFor={cuisine}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {cuisine}
                                </label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
                <h3 className="font-medium">Price Range</h3>
                <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                </div>
            </div>

            {/* Ratings */}
            <div className="space-y-4">
                <h3 className="font-medium">Rating</h3>
                <div className="space-y-3">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                            <Checkbox id={`rating-${rating}`} />
                            <label
                                htmlFor={`rating-${rating}`}
                                className="text-sm font-medium leading-none"
                            >
                                {rating}+ ⭐
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


function RestaurantCard({ name, image, cuisines, rating, deliveryTime, priceForTwo, offers, isPromoted }) {
    const navigate = useNavigate()
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all" onClick={() => navigate(`/restaurants/${name}`)}>
            <div className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-[200px] object-cover"
                />
                {isPromoted && (
                    <Badge className="absolute top-2 left-2" variant="secondary">
                        Promoted
                    </Badge>
                )}
                {offers && offers.length > 0 && (
                    <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-sm p-2 rounded">
                        <p className="line-clamp-1">🎉 {offers[0]}</p>
                    </div>
                )}
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription className="line-clamp-1">
                    {cuisines.join(", ")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                        <Badge variant={rating >= 4.0 ? "default" : "secondary"}>
                            ⭐ {rating}
                        </Badge>
                    </span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{deliveryTime} mins</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">₹{priceForTwo} for two</span>
                </div>
            </CardContent>
        </Card>
    )
}

// Sample Data
const restaurants = [
    {
        id: 1,
        name: "Burger King",
        image: "/buregrking.jpg",
        cuisines: ["American", "Fast Food", "Burgers"],
        rating: 4.2,
        deliveryTime: 25,
        priceForTwo: 400,
        offers: ["50% off up to ₹100", "Free delivery"],
        isPromoted: true,
    },
    {
        id: 2,
        name: "Pizza Hut",
        image: "https://source.unsplash.com/800x600/?pizza",
        cuisines: ["Italian", "Pizza", "Fast Food"],
        rating: 4.0,
        deliveryTime: 35,
        priceForTwo: 600,
        offers: ["20% off on large pizzas"],
        isPromoted: false,
    },
    // Add more restaurants...
]

const cuisines = [
    "American",
    "Chinese",
    "Italian",
    "Indian",
    "Japanese",
    "Mexican",
    "Thai",
    "Mediterranean",
    "Fast Food",
    "Desserts",
    "Beverages",
    // Add more cuisines...
]