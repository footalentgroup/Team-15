import React from "react";
import SliderView from "@/components/studentsMonitoring/sliderOptionView";
import Dropdown from "@/components/studentsMonitoring/dropdown";

export default function Attitudinal() {
    return (
        <div>
            <div>
                <SliderView />
            </div>
            <div className="flex gap-4 mt-4">
                <div className="flex flex-col items-center¨ w-[170px]">
                    <button type="button" className="min-w-[170px] min-h-8 bg-yellow-100 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        Rev. Industrial
                    </button>
                    <div className="flex gap-3 flex-col mt-10">
                        <Dropdown />
                        <Dropdown />
                        <Dropdown />
                    </div>
                </div>

                <div className="flex flex-col items-center¨ w-[170px]">
                    <button type="button" className="min-w-[170px] min-h-8 bg-yellow-100 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        Rev. Francesa
                    </button>
                    <div className="flex gap-3 flex-col mt-10">
                        <Dropdown />
                        <Dropdown />
                        <Dropdown />
                    </div>
                </div>

                <div className="flex flex-col items-center  w-[170px]">
                    <button type="button" className="min-w-[170px] min-h-8 bg-yellow-100 text-black border-2 border-black font-semibold text-sm px-4 rounded-md filter drop-shadow-[4px_4px_0px_#000000]">
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}