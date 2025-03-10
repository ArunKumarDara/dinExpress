import React, { useState } from 'react'
import { Card, Badge, Button, SheetHeader, SheetTitle, ScrollArea } from '@/components/ui'

// Add this new interface for cart items
interface CartItem extends MenuItem {
    quantity: number
}

// Update the state type
const [cart, setCart] = useState<CartItem[]>([])

// Update the MenuItem component
function MenuItem({ item, onAddToCart }: { item: MenuItem; onAddToCart: () => void }) {
    const [quantity, setQuantity] = useState(0)

    const handleAddToCart = (action: 'add' | 'remove') => {
        if (action === 'add') {
            setQuantity(prev => prev + 1)
            onAddToCart()
        } else {
            setQuantity(prev => Math.max(0, prev - 1))
            // Call remove from cart function
        }
    }

    return (
        <Card className="flex">
            <div className="flex-1 p-4">
                <div className="flex items-center gap-2">
                    {item.isVeg ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">Veg</Badge>
                    ) : (
                        <Badge variant="secondary" className="bg-red-100 text-red-700">Non-veg</Badge>
                    )}
                    {item.isBestseller && (
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">Bestseller</Badge>
                    )}
                    {item.isSpicy && <span>🌶️</span>}
                </div>
                <h3 className="font-semibold mt-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="font-semibold">₹{item.price}</span>

                    {/* New Quantity Counter */}
                    <div className="flex items-center gap-2">
                        {quantity > 0 ? (
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => handleAddToCart('remove')}
                                >
                                    <span className="text-lg font-semibold">-</span>
                                </Button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-none"
                                    onClick={() => handleAddToCart('add')}
                                >
                                    <span className="text-lg font-semibold">+</span>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                className="h-8 px-3"
                                onClick={() => handleAddToCart('add')}
                            >
                                ADD
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-[120px] relative">
                <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover rounded-r-lg"
                />
            </div>
        </Card>
    )
}

// Update the main component to handle quantities
export default function RestaurantMenu() {
    const [cart, setCart] = useState<CartItem[]>([])

    const addToCart = (item: MenuItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            }
            return [...prevCart, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (itemId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === itemId)
            if (existingItem?.quantity === 1) {
                return prevCart.filter(item => item.id !== itemId)
            }
            return prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        })
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    // ... rest of the component
}

// Update CartSidebar to show quantities
function CartSidebar({
    cart,
    removeFromCart,
    total
}: {
    cart: CartItem[]
    removeFromCart: (id: number) => void
    total: number
}) {
    return (
        <div className="h-full flex flex-col">
            <SheetHeader>
                <SheetTitle>Your Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1 -mx-4 px-4">
                <div className="space-y-4 py-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {item.isVeg ? <span>🟢</span> : <span>🔴</span>}
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>₹{item.price}</span>
                                        <span>×</span>
                                        <span>{item.quantity}</span>
                                        <span>=</span>
                                        <span>₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">₹{total}</span>
                </div>
                <Button className="w-full">
                    Checkout
                </Button>
            </div>
        </div>
    )
} 