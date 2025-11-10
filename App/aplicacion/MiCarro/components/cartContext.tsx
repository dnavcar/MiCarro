import React, { createContext, useContext, useState, ReactNode } from 'react'
import { predecirSiguiente } from './prediction'

type CartContextType = {
  items: string[]
  add: (name: string) => Promise<void>
  remove: (name: string) => Promise<void>
  toggle: (name: string) => Promise<void>
  contains: (name: string) => boolean
  lastPrediction: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([])
  const [lastPrediction, setLastPrediction] = useState<string | null>(null)

  const contains = (name: string) => items.includes(name)

  async function add(name: string) {
    if (contains(name)) return
    const next = [...items, name]
    setItems(next)
    try {
      const pred = await predecirSiguiente(next)
      setLastPrediction(pred)
      console.log('[cartContext] predicted after add:', pred)
    } catch (err) {
      console.warn('[cartContext] prediction failed', err)
    }
  }

  async function remove(name: string) {
    const next = items.filter((i) => i !== name)
    setItems(next)
    try {
      const pred = await predecirSiguiente(next)
      setLastPrediction(pred)
      console.log('[cartContext] predicted after remove:', pred)
    } catch (err) {
      console.warn('[cartContext] prediction after remove failed', err)
    }
  }

  async function toggle(name: string) {
    if (contains(name)) {
      await remove(name)
    } else {
      await add(name)
    }
  }

  return (
    <CartContext.Provider value={{ items, add, remove, toggle, contains, lastPrediction }}>
      {children}
    </CartContext.Provider>
  )
}
