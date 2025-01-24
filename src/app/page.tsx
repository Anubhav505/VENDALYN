"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Combos from "@/components/Combos";
import Loading from "@/components/Loading";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Hero />
      <div className="bg-white border-t">
        <div className="mt-12 flex flex-col gap-6 mb-4">
          <h2 className="nav font-semibold text-[4vw] text-center">HOT PRODUCTS</h2>
        </div>
        <Products />
        <div className="mt-12 flex flex-col gap-6 mb-4">
          <h2 className="nav font-semibold text-[4vw] text-center">COMBOS</h2>
        </div>
        <Combos />
      </div>

    </>
  );
};
export default HomePage;
