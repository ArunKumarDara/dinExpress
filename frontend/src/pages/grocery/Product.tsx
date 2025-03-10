import { useState } from "react"
import { useParams } from "react-router-dom"
import { ChevronLeft, Minus, Plus, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function GroceryProduct() {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)

    // In a real app, fetch product details using the ID
    const product = {
        id: 1,
        name: "Fresh Organic Bananas",
        description: "Sweet and nutritious organic bananas, perfect for snacking or baking.",
        price: 40,
        originalPrice: 50,
        image: "https://source.unsplash.com/800x600/?banana",
        unit: "dozen",
        category: "fruits",
        inStock: true,
        discount: 20,
        nutrition: {
            calories: "89 kcal",
            protein: "1.1g",
            carbs: "22.8g",
            fat: "0.3g",
        },
        storage: "Store at room temperature. Refrigerate to slow ripening.",
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => window.history.back()}
            >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Grocery
            </Button>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Product Image */}
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg object-cover"
                    />
                    {product.discount && (
                        <Badge className="absolute top-4 right-4 bg-red-500">
                            {product.discount}% OFF
                        </Badge>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="mt-2 text-muted-foreground">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-muted-foreground line-through">
                                ₹{product.originalPrice}
                            </span>
                        )}
                        <span className="text-muted-foreground">
                            per {product.unit}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button size="lg" className="flex-1">
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="icon">
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>

                    <Separator />

                    {/* Product Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div>
                                <h4 className="font-medium mb-2">Nutrition Facts (per 100g)</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {Object.entries(product.nutrition).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                            <span className="capitalize">{key}</span>
                                            <span>{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Storage Instructions</h4>
                                <p className="text-sm text-muted-foreground">
                                    {product.storage}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}