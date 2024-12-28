export default function Catagory () {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 px-2">
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://shop.studioinnate.com/wp-content/uploads/2022/08/3d-hoodie-mockup-1-1280x1280.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Latest Hoodies
            </h3>
            <button className="bg-black bg-opacity-50 text-white px-5 py-2 rounded-lg">
              Shop Collection
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://www.psfreebies.com/wp-content/uploads/String-Bag-Mockup-free-download-1536x1067.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Sport Ascessories
            </h3>
            <button className="bg-black bg-opacity-50 text-white px-5 py-2 rounded-lg">
              Shop Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
