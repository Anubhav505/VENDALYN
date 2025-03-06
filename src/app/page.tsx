"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Loading from "@/components/Loading";
import Collections from "@/components/Collections";
import Popup from "@/components/Popup";
let hasLoaded = false;

const HomePage = () => {
  const [loading, setLoading] = useState(!hasLoaded);

  useEffect(() => {
    if (!hasLoaded) {
      setTimeout(() => {
        setLoading(false);
        hasLoaded = true;
      }, 3000);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Hero />
      <Collections />
      <Products />
      <Popup />
    </>
  );
};

export default HomePage;
