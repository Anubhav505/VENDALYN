import Hero from "@/components/Hero"
import Products from "@/components/Products"
// import Combos from "@/components/Combos"
// import BestSeller from "@/components/BestSeller"
// import Catagory from "@/components/Catagory"

const HomePage = () => {
  return (
    <>
      <Hero />
      <div className="mt-12 flex flex-col gap-6 mb-4">
        <h2 className="heading font-semibold text-[4vw] text-center text-red-500">TRENDING PRODUCTS</h2>
      </div>

      <Products />
      {/* <Combos />  */}
      {/* <BestSeller /> */}
      {/* <Catagory /> */}
    </>
  )
}

export default HomePage