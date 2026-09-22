import {create} from "zustand"
import type { CartItem, Dessert } from "../types"

type cartState = {
    items: CartItem[],
    isOrderConfirmed: boolean,
    addItem: (dessert:Dessert) => void,
    incrementItem: (name: string) => void,
    decrementItem: (name: string) => void,
    removeItem: (name: string) => void,
    handelOrderConfirm: ()=>void,
    handelStartNewOrder: ()=>void
}

export const useCartStore = create<cartState>((set)=>({
    items: [],
    isOrderConfirmed: false,
    addItem: (dessert) => set((state)=>({
        items: [...state.items, {...dessert, quantity: 1}]
    })),
    incrementItem: (name: string) => set(state=>({
        items: state.items.map(item =>
            item.name == name ? {...item, quantity: item.quantity + 1} : item
        )
    })),
    decrementItem: (name: string) => set(state=>({
        items: state.items
            .map(item =>
                item.name == name ? {...item, quantity: item.quantity - 1} : item
            )
            .filter(item => item.quantity > 0)
    })),
    removeItem: (name: string) => set(state=>({
        items: state.items.filter(item => item.name !== name)
    })),
    handelOrderConfirm: () => set(state=>({
        isOrderConfirmed: true
    })),
    handelStartNewOrder: () => set(state=>({
        items: [],
        isOrderConfirmed: false
    })),
}))