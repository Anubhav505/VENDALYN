import Hero from "@/components/Hero"
import Products from "@/components/Products"
import Combos from "@/components/Combos"
// import BestSeller from "@/components/BestSeller"
// import Catagory from "@/components/Catagory"

const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="mt-12 flex flex-col gap-6 mb-4">
        <h2 className="heading font-semibold text-[4vw] text-center">HOT PRODUCTS</h2>
      </div>

      <Products />
      <div className="mt-12 flex flex-col gap-6 mb-4">
        <h2 className="heading font-semibold text-[4vw] text-center">COMBOS</h2>
      </div>
      <Combos /> 
      {/* <BestSeller /> */}
      {/* <Catagory /> */}
    </>
  )
}

export default HomePage