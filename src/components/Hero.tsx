export default function Hero() {
return(
<div className="sticky top-0 w-full overflow-hidden text-white -z-50">
<video 
        src="/hero.mp4" 
        className="object-contain sm:h-[93vh] w-full" 
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