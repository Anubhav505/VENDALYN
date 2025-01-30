"use client";

interface SizeChartProps {
    onClose: () => void;
}

export default function SizeChart({ onClose }: SizeChartProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-3 z-50">
            <div className="bg-white p-4 rounded-lg max-w-md w-full shadow-lg relative">
                <button className="text-sm px-2 w-full flex justify-end my-2" onClick={onClose}>
                    Close
                </button>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="p-2 border-r text-center">SIZE</th>
                            <th className="p-2 border-r text-center">CHEST (in)</th>
                            <th className="p-2 text-center">LENGTH (in)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {["S", "M", "L", "XL", "2XL"].map((size, index) => (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="p-2 border-r text-center">{size}</td>
                                <td className="p-2 border-r text-center">{41 + index * 2}</td>
                                <td className="p-2 text-center">{26 + index}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="my-3 flex gap-2 flex-col text-justify">
                            <h1 className="text-lg nav">HOW TO MEASURE ?</h1>
                            <p><b className="text-lg nav">Chest</b> : Measure from the stitches below the armpits</p>
                            <p><b className="text-lg nav">Length</b> : Measure from where the shoulder seam meets the collar to the hem.</p>
                        </div>
            </div>
        </div>
    );
}
