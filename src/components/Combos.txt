"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Combo {
    _id: string;
    name: string;
    price: number;
    description: string;
    image_1: string;
}

const Combos = () => {
    const [combos, setCombos] = useState<Combo[]>([]);

    useEffect(() => {
        const fetchCombos = async () => {
            try {
                const response = await fetch("/api/combos");
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCombos(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchCombos();
    }, []);

    const router = useRouter();
    const handleComboClick = (combo: Combo) => {
        router.push(`/combo/${combo._id}`);
    };

    return (
        <div>
            <div className="mb-4 flex flex-col gap-6">
                <h2 className="heading font-semibold text-[4vw] text-center">MAKAR SANKRANTI COMBO</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 px-2">
                {combos.length > 0 ? (
                    combos.map((combo) => (
                        <div
                            key={combo._id}
                            onClick={() => handleComboClick(combo)}
                            className="product shadow-md rounded-md overflow-hidden"
                        >
                            <div className="relative h-52 md:h-[30vw] rounded-md">
                                <Image src={combo.image_1} layout="fill" objectFit="cover" alt="Combo Image" />
                            </div>
                            <div className="p-3">
                                <div className="text-base font-semibold">{combo.name}</div>
                                <div className="text-sm flex justify-start gap-4">
                                    <p className=" text-gray-500 line-through">&#8377;2599</p>
                                    <p>&#8377;{combo.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Combos Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Combos;
