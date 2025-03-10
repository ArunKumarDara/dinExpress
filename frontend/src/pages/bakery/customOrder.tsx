import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const formSchema = z.object({
    type: z.string().min(1, "Please select a type"),
    occasion: z.string().min(1, "Please select an occasion"),
    date: z.date().optional(),
    servings: z.coerce.number().min(1, "Must be at least 1 serving"),
    description: z.string().optional(),
});

export default function CustomBakeryOrder() {
    const [date, setDate] = useState<Date>();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            occasion: "",
            date: undefined,
            servings: 1,
            description: "",
        },
    });

    const onSubmit = (values: any) => {
        console.log("Form Submitted:", values);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-8">Custom Order</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 max-w-md mx-auto p-4 border rounded-lg"
                            >
                                {/* Type of Baked Good */}
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type of Baked Good</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="cake">Cake</SelectItem>
                                                    <SelectItem value="cupcakes">Cupcakes</SelectItem>
                                                    <SelectItem value="cookies">Cookies</SelectItem>
                                                    <SelectItem value="bread">Bread</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Occasion */}
                                <FormField
                                    control={form.control}
                                    name="occasion"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Occasion</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select occasion" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="birthday">Birthday</SelectItem>
                                                    <SelectItem value="wedding">Wedding</SelectItem>
                                                    <SelectItem value="anniversary">Anniversary</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Delivery Date */}
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Delivery Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-start text-left font-normal"
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(selectedDate) => {
                                                            field.onChange(selectedDate);
                                                            setDate(selectedDate);
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Number of Servings */}
                                <FormField
                                    control={form.control}
                                    name="servings"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Number of Servings</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Special Instructions */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Special Instructions</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe your custom order requirements..."
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Include any dietary restrictions, design preferences, or special requests.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    Request Quote
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>

                {/* Order Guidelines */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Order Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Please place orders at least 48 hours in advance</li>
                                <li>Custom cake orders require a 50% deposit</li>
                                <li>Pricing varies based on design complexity</li>
                                <li>We can accommodate most dietary restrictions</li>
                                <li>Delivery available for orders above ₹1000</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Contact Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">
                                Contact our bakery specialists for assistance with your custom order.
                            </p>
                            <Button variant="outline" className="w-full">
                                Contact Us
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
