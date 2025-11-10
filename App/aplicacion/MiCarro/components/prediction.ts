// Shared prediction service used by compra and cart context
export async function predecirSiguiente(productos: string[]): Promise<string> {
  try {
    const url = 'http://10.118.200.118:8000/predict'
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: productos }),
    })

    if (!res.ok) {
      throw new Error(`API error ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data.siguiente_producto || ''
  } catch (err) {
    console.warn('[prediction] error', err)
    throw err
  }
}
