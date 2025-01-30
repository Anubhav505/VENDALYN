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
       <div className="bg-white border-t py-12">
        <Products />
        <Combos />
      </div> 

    </>
  );
};
export default HomePage;
