"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
// import Combos from "@/components/Combos";
import Whatsapp from "@/components/Whatsapp";
import Loading from "@/components/Loading";
import Collections from "@/components/Collections";
import Popup from "@/components/Popup";

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
      <Collections />
      <Products />
      {/* <Combos /> */}
      <Whatsapp />
      <Popup />
    </>
  );
};
export default HomePage;
