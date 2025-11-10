import React, { useState, useEffect } from "react";
import WelcomeScreen from "../components/WelcomeScreen";
import StoreMap from "../components/StoreMap";
import RecommendationPanel from "../components/RecommendationPanel";
import ShoppingListPanel from "../components/ShoppingListPanel";
import CartSummary from "../components/CartSummary";
import BottomBar from "../components/BottomBar";
import productsData from "../data/products.json";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [cart, setCart] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  // Simula detección de productos en el carrito
  /*useEffect(() => {
    const interval = setInterval(() => {
      if (cart.length < productsData.length) {
        setCart((c) => [...c, productsData[c.length]]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [cart]);*/

/*  useEffect(() => {
    // Siguiente producto sugerido
    const next = productsData.find((p) => !cart.includes(p));
    setRecommendation(next || null);
  }, [cart]);*/

  return screen === "welcome" ? (
    <WelcomeScreen
      onEnter={() => setScreen("main")}
      onLinkQR={() => setScreen("main")}
    />
  ) : (
    <div className="min-h-screen bg-gray-50 p-4 grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <StoreMap products={productsData} highlightProduct={recommendation} />
      </div>
      <div className="col-span-4 flex flex-col">
        <RecommendationPanel
          product={recommendation}
          onGoTo={() => alert(`Ruta hacia producto ${recommendation}`)}
        />
        <ShoppingListPanel products={productsData} />
        <CartSummary cart={cart} />
      </div>
      <BottomBar cart={cart} onPay={() => alert("Proceso de pago")} />
    </div>
  );
}
