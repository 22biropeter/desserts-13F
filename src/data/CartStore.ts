import {create} from "zustand"
import type { CartItem, Dessert } from "../types"

type cartState = {
    items: CartItem[],
    addItem: (dessert:Dessert) => void,
    incrementItem: (name: string) => void,
    decrementItem: (name: string) => void,
    removeItem: (name: string) => void,
    clearCart: ()=>void,

}

export const useCartStore = create<cartState>((set)=>({
    items: [],
    addItem: (dessert) => set((state)=>({
        items: [...state.items, {...dessert, quantity: 1}]
    })),
    incrementItem: (name: string) => set(state=>({})),
    decrementItem: (name: string) => set(state=>({})),
    removeItem: (name: string) => set(state=>({})),
    clearCart: ()=> set(state=>({})),
}))