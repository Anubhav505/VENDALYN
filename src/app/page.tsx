"use client"
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Combos from "@/components/Combos";
import Loading from "@/components/Loading"; // Import the Loading component

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000); // Simulating a 2-second loading time
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loading />; // Display the loading screen while loading
  }

  return (
    <>
      <Hero />

      <div className="mt-12 flex flex-col gap-6 mb-4">
        <h2 className="nav font-semibold text-[4vw] text-center">HOT PRODUCTS</h2>
      </div>

      <Products />

      <div className="mt-12 flex flex-col gap-6 mb-4">
        <h2 className="nav font-semibold text-[4vw] text-center">COMBOS</h2>
      </div>

      <Combos />
      {/* <BestSeller /> */}
      {/* <Catagory /> */}
    </>
  );
};

export default HomePage;
