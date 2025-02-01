export default function Hero() {
return(
<div className="sticky top-0 w-full overflow-hidden text-white -z-50">
    <video src="https://res.cloudinary.com/daexpmksd/video/upload/v1738404494/site_final_uj7cfj.mp4"
    className="object-cover w-full block sm:hidden h-[93vh]" 
        loop 
        muted 
        autoPlay
        playsInline/>

    <video 
        src="/hero.mp4" 
        className="object-cover sm:h-[93vh] w-full hidden sm:block" 
        loop 
        muted 
        autoPlay
        playsInline
    />
    <h1 className="nav text-[2.5vw] absolute bottom-10 w-full text-center">
         IN THE 7<sup>th</sup> HEAVEN
      </h1>
</div>
)
}