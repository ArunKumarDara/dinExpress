import { useParams } from "react-router-dom"
import { Filter, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function GroceryCategory() {
    const { category } = useParams()

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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold capitalize">
                    {category?.replace("-", " ")}
                </h1>
                <div className="flex gap-4">
                    <Select defaultValue="featured">
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Reuse the ProductGrid component from Grocery.tsx */}
            <ProductGrid products={allProducts} />
        </div>
    )
}