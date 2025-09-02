"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Raleway, Inter, Poppins } from "next/font/google";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  ChevronRightIcon,
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  ChevronLeftIcon,
  ClipboardDocumentCheckIcon,
  XMarkIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/16/solid";

import Headset from "@/app/Assets/headset.png";
import Search from "@/app/Assets/searchicon.png";
import ManAvatar from "@/app/Assets/man.png";
import Calendar from "@/app/Assets/calendar.png";
import Clock from "@/app/Assets/clock.png";
import BoneLeft from "@/app/Assets/boneleft.png";
import Boneright from "@/app/Assets/boneright.png";
import MedialCondyle from "@/app/Assets/medialcondyle.png";
import LateralCondyle from "@/app/Assets/lateralcondyle.png";
import Tibia from "@/app/Assets/tibial.png";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // add the weights you need
  variable: "--font-raleway", // optional CSS variable
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // add weights as needed
  variable: "--font-inter", // optional CSS variable name
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // add weights as needed
  variable: "--font-inter", // optional CSS variable name
});

const AddSurgeryreport = () => {
  const useWindowSize = () => {
    const [size, setSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      const updateSize = () => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      updateSize(); // set initial size
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
  };

  const { width, height } = useWindowSize();

  const categories = ["FEMUR", "TIBIA", "INSERT", "PATELLA"];
  const rows = ["MANUFACTURER", "MODEL", "SIZE"];

  const optionsData = {
    FEMUR: {
      MANUFACTURER: [
        "BIORAD MEDISYS",
        "MICROPORT",
        "Johnson & Johnson MedTech",
      ],
      MODEL: {
        "BIORAD MEDISYS": ["EXCEL MPK"],
        MICROPORT: ["EVOLUATION"],
        "Johnson & Johnson MedTech": [
          "Attune CR Femur Right",
          "Attune CR Femur Left",
          "Attune PS Femur Right",
          "Attune PS Femur Left",
          "PFC Sigma Right",
          "PFC Sigma Left",
        ],
      },
      SIZE: {
        "EXCEL MPK": ["A", "B", "C", "D", "E", "F", "G", "H"],
        EVOLUATION: [
          "1 mm",
          "2 mm",
          "3 mm",
          "4 mm",
          "5 mm",
          "6 mm",
          "7 mm",
          "8 mm",
        ],
        "Attune CR Femur Right": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "3N",
          "4N",
          "5N",
          "6N",
        ],
        "Attune CR Femur Left": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "3N",
          "4N",
          "5N",
          "6N",
        ],
        "Attune PS Femur Right": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "3N",
          "4N",
          "5N",
          "6N",
        ],
        "Attune PS Femur Left": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "3N",
          "4N",
          "5N",
          "6N",
        ],
        "PFC Sigma Right": ["1.5", "2", "2.5", "3", "4", "5"],
        "PFC Sigma Left": ["1.5", "2", "2.5", "3", "4", "5"],
      },
    },
    TIBIA: {
      MANUFACTURER: [
        "BIORAD MEDISYS",
        "MICROPORT",
        "Johnson & Johnson MedTech",
      ],
      MODEL: {
        "BIORAD MEDISYS": ["EXCEL MPK"],
        MICROPORT: ["EVOLUATION"],
        "Johnson & Johnson MedTech": [
          "Attune Splus Tibia",
          "PFC Modular Titanium",
        ],
      },
      SIZE: {
        "EXCEL MPK": ["1", "2", "3", "4", "5", "6"],
        EVOLUATION: [
          "1 mm",
          "2 mm",
          "2+ mm",
          "3 mm",
          "4 mm",
          "5 mm",
          "6 mm",
          "6+ mm",
          "7 mm",
          "8 mm",
        ],
        "Attune Splus Tibia": ["1", "2", "3", "4", "5", "6", "7", "8"],
        "PFC Modular Titanium": ["1.5", "2", "2.5", "3", "4", "5"],
      },
    },
    INSERT: {
      MANUFACTURER: [
        "BIORAD MEDISYS",
        "MICROPORT",
        "Johnson & Johnson MedTech",
      ],
      MODEL: {
        "BIORAD MEDISYS": ["EXCEL MPK"],
        MICROPORT: ["EVOLUATION"],
        "Johnson & Johnson MedTech": [
          "Attune CR Insert",
          "Attune PS Insert",
          "PFC Sigma Posterior Stabilised Insert",
          "PFC Sigma Cruciate Retaining Insert",
        ],
      },
      SIZE: {
        "EXCEL MPK": ["7 mm", "8 mm", "9 mm", "11 mm", "13 mm"],
        EVOLUATION: ["10 mm", "12 mm", "14 mm", "17 mm", "21 mm"],
        "Attune CR Insert": [
          "1*5",
          "1*6",
          "1*7",
          "1*8",
          "1*10",
          "1*12",
          "1*14",
          "2*5",
          "2*6",
          "2*7",
          "2*8",
          "2*10",
          "2*12",
          "2*14",
          "3*5",
          "3*6",
          "3*7",
          "3*8",
          "3*10",
          "3*12",
          "3*14",
          "4*5",
          "4*6",
          "4*7",
          "4*8",
          "4*10",
          "4*12",
          "4*14",
          "5*5",
          "5*6",
          "5*7",
          "5*8",
          "5*10",
          "5*12",
          "5*14",
          "6*5",
          "6*6",
          "6*7",
          "6*8",
          "6*10",
          "6*12",
          "6*14",
          "7*5",
          "7*6",
          "7*7",
          "7*8",
          "7*10",
          "7*12",
          "7*14",
          "8*5",
          "8*6",
          "8*7",
          "8*8",
          "8*10",
          "8*12",
          "8*14",
        ],
        "Attune PS Insert": [
          "1*5",
          "1*6",
          "1*7",
          "1*8",
          "1*10",
          "1*12",
          "1*14",
          "2*5",
          "2*6",
          "2*7",
          "2*8",
          "2*10",
          "2*12",
          "2*14",
          "3*5",
          "3*6",
          "3*7",
          "3*8",
          "3*10",
          "3*12",
          "3*14",
          "4*5",
          "4*6",
          "4*7",
          "4*8",
          "4*10",
          "4*12",
          "4*14",
          "5*5",
          "5*6",
          "5*7",
          "5*8",
          "5*10",
          "5*12",
          "5*14",
          "6*5",
          "6*6",
          "6*7",
          "6*8",
          "6*10",
          "6*12",
          "6*14",
          "7*5",
          "7*6",
          "7*7",
          "7*8",
          "7*10",
          "7*12",
          "7*14",
          "8*5",
          "8*6",
          "8*7",
          "8*8",
          "8*10",
          "8*12",
          "8*14",
        ],
        "PFC Sigma Posterior Stabilised Insert": [
          "1.5*8",
          "1.5*10",
          "1.5*12.5",
          "1.5*15",
          "1.5*17.5",
          "2*8",
          "2*10",
          "2*12.5",
          "2*15",
          "2*17.5",
          "2.5*8",
          "2.5*10",
          "2.5*12.5",
          "2.5*15",
          "2.5*17.5",
          "3*8",
          "3*10",
          "3*12.5",
          "3*15",
          "3*17.5",
          "4*8",
          "4*10",
          "4*12.5",
          "4*15",
          "4*17.5",
          "5*8",
          "5*10",
          "5*12.5",
          "5*15",
          "5*17.5",
        ],
        "PFC Sigma Cruciate Retaining Insert": [
          "1.5*8",
          "1.5*10",
          "1.5*12.5",
          "1.5*15",
          "1.5*17.5",
          "2*8",
          "2*10",
          "2*12.5",
          "2*15",
          "2*17.5",
          "2.5*8",
          "2.5*10",
          "2.5*12.5",
          "2.5*15",
          "2.5*17.5",
          "3*8",
          "3*10",
          "3*12.5",
          "3*15",
          "3*17.5",
          "4*8",
          "4*10",
          "4*12.5",
          "4*15",
          "4*17.5",
          "5*8",
          "5*10",
          "5*12.5",
          "5*15",
          "5*17.5",
        ],
      },
    },
    PATELLA: {
      MANUFACTURER: [
        "BIORAD MEDISYS",
        "MICROPORT",
        "Johnson & Johnson MedTech",
      ],
      MODEL: {
        "BIORAD MEDISYS": ["EXCEL MPK"],
        MICROPORT: ["EVOLUATION"],
        "Johnson & Johnson MedTech": [
          "Attune Medialised Dome Patella",
          "PFC Patella",
        ],
      },
      SIZE: {
        "EXCEL MPK": ["26 mm", "28 mm", "32 mm", "36 mm"],
        EVOLUATION: ["26 mm", "29 mm", "32 mm", "35 mm", "38 mm", "41 mm"],
        "Attune Medialised Dome Patella": ["29", "32", "35", "38", "41"],
        "PFC Patella": ["29", "32", "35", "38", "41"],
      },
    },
  };

  const [selections, setSelections] = useState({
    FEMUR: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    TIBIA: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    INSERT: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    PATELLA: { MANUFACTURER: "", MODEL: "", SIZE: "" },
  });

  const timepoints = [
    "Preop",
    "1Month",
    "3Month",
    "6Month",
    "1Year",
    "2Year",
    "3Year",
    "4Year",
    "5Year",
    "10Year",
  ];

  const [selected, setSelected] = useState({});

  const handleCheckbox = (tp) => {
    setSelected((prev) => ({
      ...prev,
      [tp]: !prev[tp],
    }));
  };

  return (
    <div
      className={`w-full overflow-y-auto h-full flex flex-col pt-8 pb-12 inline-scroll ${
        width >= 1000 ? "px-12" : "px-8"
      } rounded-4xl inline-scroll`}
    >
      <div className={`w-full ${width >= 1100 ? "flex flex-row" : ""} `}>
        <div className={`${width >= 800 ? "w-1/2" : "w-full"}`}>
          <div
            className={`${
              width >= 1000 ? "w-full" : "w-full"
            } flex flex-row gap-4 border-b-2 border-b-[#EBEBEB] py-2 `}
          >
            <Image
              src={ManAvatar}
              alt="Patient"
              className={`w-[60px] h-[60px]`}
            />
            <div
              className={`w-full flex ${
                width < 400 ? "flex-col" : "flex-row"
              } justify-between`}
            >
              <div
                className={`${width < 400 ? "w-full" : "w-2/5"} flex flex-col`}
              >
                <p
                  className={`${raleway.className} font-semibold text-lg text-black`}
                >
                  Patient Name
                </p>
                <p
                  className={`${poppins.className} font-normal text-sm text-black`}
                >
                  Age, Gender
                </p>
              </div>
              <div
                className={`${
                  width < 400 ? "w-full" : "w-2/5"
                } flex flex-col justify-between`}
              >
                <p
                  className={`${inter.className} font-semibold text-[15px] text-[#484848]`}
                >
                  L: Pre Op R: Pre Op
                </p>
                <p
                  className={`${poppins.className} font-medium text-base text-[#222222] opacity-50 border-r-2 border-r-[#EBEBEB]`}
                >
                  Patient ID
                </p>
              </div>
              <p
                className={`${width < 400 ? "w-full" : "w-1/5"} ${
                  inter.className
                } text-end font-semibold text-[15px] text-[#484848]`}
              >
                BMI: 27
              </p>
            </div>
          </div>
        </div>
        {width >= 1100 && (
          <div
            className={`flex flex-row ${
              width >= 700 ? "w-3/5" : "w-full"
            } justify-end gap-12`}
          >
            <div
              className={`w-1/3 flex flex-row justify-between items-center gap-8`}
            >
              <Image src={Headset} alt="support" className={`w-5 h-5`} />
              <p
                className={`${raleway.className} font-semibold text-sm bg-[#2B333E] rounded-[10px] h-fit px-4 py-1`}
              >
                Doctor Name
              </p>
            </div>
          </div>
        )}
      </div>

      <div className={`w-full flex flex-col pt-[60px]`}>
        <h2
          className={`${inter.className} text-base font-bold pl-[23px]`}
          style={{ color: "#7676A4" }}
        >
          Operation Details
        </h2>
        <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

        <div className={`space-y-6 pt-[33px] pl-[23px]`}>
          <div className=" flex items-center space-x-4">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              1. Select Hospital
            </label>
            <select
              className={`${inter.className}  border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
            >
              <option>Parvathy Hospital</option>
            </select>
          </div>

          <div className="pt-8 flex flex-col">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              2. Anaesthetic Types
            </label>
            <div
              className={`${raleway.className} pt-4 flex text-sm text-[#272727] font-semibold flex-col gap-6 pl-4`}
            >
              {[
                "General",
                "NerveBlock",
                "Epidural",
                "Spinal (Intrathecal)",
              ].map((type) => {
                const id = `anaesthetic-${type}`;
                return (
                  <label
                    key={type}
                    htmlFor={id}
                    className="flex items-center space-x-2 mr-6 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                    />
                    <span className="text-xs text-black">{type}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-8 flex flex-col">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              3. ASA Grades
            </label>
            <div
              className={`${raleway.className} pt-4 flex font-semibold flex-wrap gap-8 pl-4`}
            >
              {["1", "2", "3", "4", "5"].map((grade) => {
                const id = `asa-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                    />
                    <span className="text-xs text-[#272727]">{grade}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-8 flex flex-col">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              4. Pre OP - ROM
            </label>

            <div
              className={`${raleway.className} pt-5 flex font-semibold flex-col gap-6 pl-4`}
            >
              {timepoints.map((tp) => (
                <div key={tp} className="flex flex-col gap-2">
                  {/* Checkbox for timepoint */}
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!selected[tp]}
                      onChange={() => handleCheckbox(tp)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-[#272727]">{tp}</span>
                  </label>

                  {/* Conditional inputs for Flexion/Extension */}
                  {selected[tp] && (
                    <div className="flex flex-col pl-4 gap-6 pt-2">
                      {["Flexion", "Extension"].map((motion) => (
                        <div
                          key={motion}
                          className="flex items-center space-x-4"
                        >
                          <span
                            className={`${raleway.className} font-semibold w-20 text-xs text-[#272727]`}
                          >
                            {motion}
                          </span>
                          <input
                            type="text"
                            className="px-4 py-1 rounded w-40 bg-gray-300 text-[black] text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full flex flex-col pt-[60px]`}>
        <h2
          className={`${inter.className} text-base font-bold pl-[23px] text-[#7676A4]`}
        >
          Surgeon Details
        </h2>
        <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

        <div className={`space-y-6 pt-[33px] pl-[23px]`}>
          <div className=" flex items-center space-x-8">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              1. Consultant IN-CHARGE
            </label>

            <div className="flex flex-col gap-4">
              <select
                className={`${inter.className}  border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
              >
                <option>Dr. Vetri Kumar</option>
              </select>
              <div className={`w-fit flex flex-row gap-2 items-center`}>
                <input
                  type="checkbox"
                  className="w-4 h-4 appearance-none rounded-sm border border-gray-300 bg-gray-300 checked:bg-blue-600 cursor-pointer"
                />
                <label
                  className={`${raleway.className} text-xs font-semibold select-none text-[#272727]`}
                >
                  Same for Surgeon
                </label>
              </div>
            </div>
          </div>

          <div className=" flex items-center space-x-16">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              2. Operating Surgeon
            </label>
            <select
              className={`${inter.className}  border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
            >
              <option>Dr. Vetri Kumar</option>
            </select>
          </div>

          <div className=" flex items-center space-x-25">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              3. First Assistant
            </label>
            <select
              className={`${inter.className}  border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
            >
              <option>Dr. Vinod Kumar</option>
            </select>
          </div>

          <div className=" flex items-center space-x-19">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              4. Second Assistant
            </label>
            <select
              className={`${inter.className}  border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
            >
              <option>Dr. Milan Adhikari</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`w-full flex flex-col pt-[60px]`}>
        <h2
          className={`${inter.className} text-base font-bold pl-[23px] text-[#7676A4]`}
        >
          Manage Procedure
        </h2>
        <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

        <div className={`space-x-6 flex flex-row pt-[33px] pl-[23px]`}>
          {[
            "Primary TKA",
            "Primary UKA",
            "Revision HTO to TKA",
            "Revision UKA to TKA",
            "TKA to Revision TKA",
          ].map((grade) => {
            const id = `magproc-${grade}`;
            return (
              <label
                key={id}
                htmlFor={id}
                className="flex items-center space-x-4 cursor-pointer"
              >
                <input
                  id={id}
                  type="checkbox"
                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                />
                <span
                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                >
                  {grade}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={`w-full flex flex-col pt-[60px]`}>
        <h2
          className={`${inter.className} text-base font-bold pl-[23px] text-[#7676A4]`}
        >
          Procedure Details
        </h2>
        <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

        <div className={`flex flex-col pl-[23px] pt-[33px] gap-4`}>
          <div className={`flex flex-row gap-20`}>
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              Side
            </label>
            <label
              className={`${raleway.className} text-base font-semibold text-black`}
            >
              LEFT KNEE
            </label>
          </div>

          <label
            className={`${inter.className} text-base font-semibold text-[#484848] pt-4`}
          >
            Indication of Surgery
          </label>

          <div className={`flex flex-row gap-9`}>
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              Deformity
            </label>
            <div className={`space-x-6 flex flex-row  `}>
              {[
                "Varus",
                "Valgus",
                "Flexion Contraction",
                "Recurvatum Deformity",
              ].map((grade) => {
                const id = `deformity-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                    />
                    <span
                      className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                    >
                      {grade}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full flex flex-col pt-[60px]`}>
        <h2
          className={`${inter.className} text-base font-bold pl-[23px] text-[#7676A4]`}
        >
          Surgical Approach
        </h2>
        <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

        <div className={`flex flex-col pl-[23px] pt-[33px] gap-8`}>
          <div className={`flex flex-row gap-13`}>
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              Technological Assistance
            </label>
            <div className={`space-x-6 flex flex-row  `}>
              {[
                "Computer Guide",
                "Robotic",
                "PSI",
                "Conventional Instruments",
              ].map((grade) => {
                const id = `techassistance-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                    />
                    <span
                      className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                    >
                      {grade}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className={`flex flex-row gap-19`}>
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              Allignment Philosophy
            </label>
            <div className={`space-x-6 flex flex-row  `}>
              {["MA", "KA", "rKA", "FA", "iKA", "Hybrid"].map((grade) => {
                const id = `allginphil-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                    />
                    <span
                      className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                    >
                      {grade}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full flex flex-col pt-[60px]`}>
        <h2
          className={`${inter.className} text-base font-bold pl-[23px] text-[#7676A4]`}
        >
          Intra Operative Events
        </h2>
        <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

        <div className={`flex flex-col pl-[23px] pt-[33px] gap-8`}>
          <div className={`flex flex-col gap-4`}>
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              1. Torniquet Used
            </label>
            <div className={`space-y-6 flex flex-col  pl-8`}>
              {["Yes", "No"].map((grade) => {
                const id = `torqused-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                    />
                    <span
                      className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                    >
                      {grade}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className={`flex flex-col gap-4`}>
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              2. Operative Date and Duration
            </label>
            <div className={`space-x-12 flex flex-row  `}>
              <div className="relative w-52">
                <p
                  className={`${poppins.className} font-medium text-black text-sm  px-4 py-2`}
                >
                  20-08-2025
                </p>
                <Image
                  src={Calendar}
                  alt="Calendar"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                />
              </div>

              <div className="relative w-52">
                <input
                  type="text"
                  placeholder="HH:MM"
                  className={`${poppins.className} font-medium border border-gray-300 rounded px-4 py-2 pr-10 w-full text-sm text-black`}
                />
                <Image
                  src={Clock}
                  alt="Clock"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full flex flex-col pt-[60px]`}>
        <h2
          className={`${inter.className} text-base font-bold pl-[23px] text-[#7676A4]`}
        >
          Bone Resection
        </h2>
        <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

        <div className={`flex flex-col pl-[23px] pt-[33px] gap-8`}>
          <div className={`flex flex-col gap-4`}>
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              1. ACL Condition
            </label>
            <div className={`space-y-6 flex flex-col  pl-8`}>
              {["Intact", "Torn", "Reconstructed"].map((grade) => {
                const id = `torqused-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="checkbox"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                    />
                    <span
                      className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                    >
                      {grade}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className={`flex flex-col gap-2 items-center`}>
            <p
              className={`${inter.className} text-base font-extrabold text-[#484848]`}
            >
              DISTAL FEMORAL RESECTION
            </p>
            <p
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              Target Thickness: 8mm Unworn, 6mm Worn (No Cartilage) When initial
              thickness misses target – recut or use a washer
            </p>
            <div className={`w-full flex flex-row pt-10`}>
              <div className={`w-1/2 flex flex-col`}>
                <div className={`flex flex-row justify-end gap-4 w-8/9`}>
                  <Image
                    src={BoneLeft}
                    alt="Bone Left"
                    className="w-4/7 pt-3"
                  />
                  <p
                    className={`${inter.className} font-extrabold text-base text-[#484848] `}
                  >
                    MEDIAL CONDYLE
                  </p>
                </div>
                <div className={`flex flex-row gap-8 w-8/9`}>
                  <Image
                    src={MedialCondyle}
                    alt="Bone Left"
                    className="w-[123px] h-[176px] pt-2"
                  />
                  <div
                    className={`w-3/5 flex flex-col gap-4 justify-between py-4`}
                  >
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Unworn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Worn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Initial Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Recut
                        </label>
                        <div className={`space-x-3 flex flex-row  pl-2.5`}>
                          {["N", "Y"].map((grade) => {
                            const id = `medcondrecut-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span
                                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {grade}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Washer
                        </label>
                        <div className={`space-x-3 flex flex-row  `}>
                          {["N", "Y"].map((grade) => {
                            const id = `medcondwasher-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span
                                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {grade}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Final Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`w-1/2 flex flex-col items-end`}>
                <div className={`flex flex-row justify-start gap-4 w-8/9`}>
                  <p
                    className={`${inter.className} font-extrabold text-base text-[#484848]`}
                  >
                    LATERAL CONDYLE
                  </p>
                  <Image
                    src={Boneright}
                    alt="Bone Left"
                    className="w-4/7 pt-3"
                  />
                </div>
                <div className={`flex flex-row gap-8 w-8/9 justify-end`}>
                  <div
                    className={`w-3/5 flex flex-col gap-4 justify-between py-4`}
                  >
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Unworn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Worn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Initial Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Recut
                        </label>
                        <div className={`space-x-3 flex flex-row  pl-2.5`}>
                          {["N", "Y"].map((grade) => {
                            const id = `medcondrecut-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span
                                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {grade}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Washer
                        </label>
                        <div className={`space-x-3 flex flex-row  `}>
                          {["N", "Y"].map((grade) => {
                            const id = `medcondwasher-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span
                                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {grade}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Final Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <Image
                    src={LateralCondyle}
                    alt="Bone Left"
                    className="w-[123px] h-[176px] pt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-2 items-center pt-10`}>
            <p
              className={`${inter.className} text-base font-extrabold text-[#484848]`}
            >
              POSTERIOR FEMORAL RESECTION
            </p>
            <p
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              Target Thickness: 7mm Unworn, 5mm Worn (No Cartilage) When initial
              thickness misses target – recut
            </p>
            <div className={`w-full flex flex-row pt-10`}>
              <div className={`w-1/2 flex flex-col`}>
                <div className={`flex flex-row justify-end gap-4 w-8/9`}>
                  <Image
                    src={BoneLeft}
                    alt="Bone Left"
                    className="w-4/7 pt-3"
                  />
                  <p
                    className={`${inter.className} font-extrabold text-base text-[#484848] `}
                  >
                    MEDIAL CONDYLE
                  </p>
                </div>
                <div className={`flex flex-row gap-8 w-8/9`}>
                  <Image
                    src={MedialCondyle}
                    alt="Bone Left"
                    className="w-[123px] h-[176px] pt-2"
                  />
                  <div
                    className={`w-3/5 flex flex-col gap-4 justify-between py-4`}
                  >
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Unworn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Worn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Initial Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Recut
                        </label>
                        <div className={`space-x-3 flex flex-row  pl-2.5`}>
                          {["N", "Y"].map((grade) => {
                            const id = `medcondrecut-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span
                                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {grade}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Final Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`w-1/2 flex flex-col items-end`}>
                <div className={`flex flex-row justify-start gap-4 w-8/9`}>
                  <p
                    className={`${inter.className} font-extrabold text-base text-[#484848]`}
                  >
                    LATERAL CONDYLE
                  </p>
                  <Image
                    src={Boneright}
                    alt="Bone Left"
                    className="w-4/7 pt-3"
                  />
                </div>
                <div className={`flex flex-row gap-8 w-8/9 justify-end`}>
                  <div
                    className={`w-3/5 flex flex-col gap-4 justify-between py-4`}
                  >
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Unworn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Worn
                        </label>
                        <input
                          type="checkbox"
                          className="w-4 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Initial Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Recut
                        </label>
                        <div className={`space-x-3 flex flex-row  pl-2.5`}>
                          {["N", "Y"].map((grade) => {
                            const id = `medcondrecut-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span
                                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {grade}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Final Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          mm
                        </label>
                        <input
                          type="text"
                          className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <Image
                    src={LateralCondyle}
                    alt="Bone Left"
                    className="w-[123px] h-[176px] pt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-2 items-center pt-10`}>
            <p
              className={`${inter.className} text-base font-extrabold text-[#484848]`}
            >
              TIBIAL RESECTION
            </p>
            <p
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              Target: Equal Thickness measured at Base of Tibial Spines
            </p>
            <div className={`w-full flex flex-row pt-10`}>
              <div className={`w-1/2 flex flex-col gap-12`}>
                <div className={`w-full flex flex-row gap-2`}>
                  <div className={`w-1/7 h-full flex flex-col justify-between`}>
                    <div className={`space-y-6 flex flex-col`}>
                      {["Worn", "UnWord"].map((grade) => {
                        const id = `tibialeftworn-${grade}`;
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <input
                              id={id}
                              type="checkbox"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span
                              className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {grade}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <div className={`flex flex-row gap-1`}>
                      <label
                        className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                      >
                        mm
                      </label>
                      <input
                        type="text"
                        className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className={`w-5/7 flex items-center`}>
                    <Image src={Tibia} alt="Bone Left" className="w-6/7 pt-3" />
                  </div>
                  <div className={`w-1/7 h-full flex flex-col justify-between`}>
                    <div className={`space-y-6 flex flex-col`}>
                      {["Worn", "UnWord"].map((grade) => {
                        const id = `tibiarightworn-${grade}`;
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <input
                              id={id}
                              type="checkbox"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span
                              className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {grade}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <div className={`flex flex-row gap-1`}>
                      <label
                        className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                      >
                        mm
                      </label>
                      <input
                        type="text"
                        className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col gap-4`}>
                  <label
                    className={`${inter.className} text-base font-semibold text-[#484848]`}
                  >
                    PCL Condition
                  </label>
                  <div className={`space-x-6 flex flex-row  `}>
                    {["Intact", "Torn", "Excised"].map((grade) => {
                      const id = `pclcondtion-${grade}`;
                      return (
                        <label
                          key={id}
                          htmlFor={id}
                          className="flex items-center space-x-4 cursor-pointer"
                        >
                          <input
                            id={id}
                            type="checkbox"
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span
                            className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                          >
                            {grade}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={`w-1/2 flex flex-col`}>
                <div className={`flex flex-col gap-8`}>
                  <div className={`flex flex-row gap-12 items-center pl-20`}>
                    <label
                      className={`${inter.className} text-base font-semibold text-[#484848]`}
                    >
                      Tibial V-V Recut
                    </label>
                    <div className={`space-x-3 flex flex-row  pl-3.5`}>
                      {["N", "Y"].map((grade) => {
                        const id = `tibialvvrecut-${grade}`;
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <input
                              id={id}
                              type="checkbox"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span
                              className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {grade}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <div className={`flex flex-row gap-12 items-center pl-20`}>
                    <label
                      className={`${inter.className} text-base font-semibold text-[#484848]`}
                    >
                      Tibial Slope Recut
                    </label>
                    <div className={`space-x-3 flex flex-row  `}>
                      {["N", "Y"].map((grade) => {
                        const id = `tibialsloperecut-${grade}`;
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <input
                              id={id}
                              type="checkbox"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span
                              className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {grade}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    <input
                      type="text"
                      className="w-9 h-4  rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <div className={`pl-20 pt-14`}>
                    <div
                      className={`flex flex-col gap-4 border-[#AAA8A8] border-2 px-5 pb-5 pt-2`}
                    >
                      <label
                        className={`${inter.className} text-base font-bold text-[#7676A4]`}
                      >
                        Final Check With Spacer Block and Trial Components
                      </label>
                      <div className={`space-y-6 flex flex-col  `}>
                        {[
                          "Negligible V-V Laxity in extenstion",
                          "2-3 mm of lateral opening with Varus load in 15-30° of flexion",
                        ].map((grade) => {
                          const id = `pclcondtion-${grade}`;
                          return (
                            <label
                              key={id}
                              htmlFor={id}
                              className="flex items-center space-x-4 cursor-pointer"
                            >
                              <input
                                id={id}
                                type="checkbox"
                                className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                              />
                              <span
                                className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {grade}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col gap-4  h-full w-full pt-10">
            <div className="w-full overflow-x-auto h-full overflow-y-auto">
              <table className="min-w-full table-fixed border-separate border-spacing-y-0">
                <thead className="text-[#475467] text-[16px] font-medium text-center">
                  <tr className={`rounded-2xl ${inter.className}`}>
                    {[
                      "Insert Thickness",
                      "No of Ticks",
                      "Extension EXT. ORIENT.",
                      "90° Flexion INT. ORIENT.",
                      "Lift–Off",
                    ].map((header, idx) => (
                      <th
                        key={header}
                        className={` px-4 py-3 bg-black/80 text-white font-bold text-[15px] text-center whitespace-nowrap
                ${idx === 0 ? "rounded-tl-[8px]" : ""}
                ${idx === 4 ? "rounded-tr-[8px]" : ""}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="bg-white text-[13px]">
                  {[10, 11, 12, 13, 14].map((val, rowIdx, arr) => (
                    <tr key={rowIdx}>
                      {/* Insert Thickness */}
                      <td
                        className={`${
                          raleway.className
                        } text-[13px] px-4 py-2 text-center font-semibold text-black border-l-2 border-[#AAA8A8] ${
                          rowIdx === 0 ? "border-t-2" : ""
                        }
                ${rowIdx === arr.length - 1 ? "border-b-2" : ""}`}
                      >
                        {val} mm
                      </td>

                      {/* No of Ticks */}
                      <td
                        className={`px-4 py-2 text-center ${
                          raleway.className
                        } text-[13px] text-center font-semibold text-black ${
                          rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                        }
                ${
                  rowIdx === arr.length - 1 ? "border-b-2 border-[#AAA8A8]" : ""
                }`}
                      >
                        <input
                          type="number"
                          className="w-16 border rounded px-2 py-1 text-center"
                          placeholder="0"
                        />
                      </td>

                      {/* Extension Ext. Orient. */}
                      {/* Extension Ext. Orient. */}
                      <td
                        className={`px-4 py-2 ${
                          raleway.className
                        } text-[13px] text-center font-semibold text-black ${
                          rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                        }
                ${
                  rowIdx === arr.length - 1 ? "border-b-2 border-[#AAA8A8]" : ""
                }`}
                      >
                        <div className="flex justify-center items-center space-x-2">
                          <input
                            type="text"
                            className="w-20 border rounded px-2 py-1 text-center"
                            placeholder="—"
                          />
                          <p>Deg</p>
                        </div>
                      </td>

                      {/* 90° Flexion Int. Orient. */}
                      <td
                        className={`px-4 py-2 ${
                          raleway.className
                        } text-[13px] text-center font-semibold text-black ${
                          rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                        }
                ${
                  rowIdx === arr.length - 1 ? "border-b-2 border-[#AAA8A8]" : ""
                }`}
                      >
                        <div className="flex justify-center items-center space-x-2">
                          <input
                            type="text"
                            className="w-20 border rounded px-2 py-1 text-center"
                            placeholder="—"
                          />
                          <p>Deg</p>
                        </div>
                      </td>

                      {/* Lift-Off (Y/N) */}
                      <td
                        className={`border-r-2 border-[#AAA8A8] px-4 py-2 text-center ${
                          raleway.className
                        } text-[13px] text-center font-semibold text-black ${
                          rowIdx === 0 ? "border-t-2" : ""
                        }
                ${rowIdx === arr.length - 1 ? "border-b-2" : ""}`}
                      >
                        <div
                          className={`space-x-6 flex flex-row justify-center items-center`}
                        >
                          {["N", "Y"].map((grade) => {
                            const id = `liftoff-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="checkbox"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span
                                  className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {grade}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className={`w-full flex flex-col pt-10`}>
            <div className={`flex flex-col gap-8`}>
              <div className={`flex flex-col gap-6`}>
                <label
                  className={`${inter.className} text-base font-extrabold text-[#484848]`}
                >
                  PFJ Resurfacing
                </label>
                <div className={`space-x-6 flex flex-row  `}>
                  {["N", "Y"].map((grade) => {
                    const id = `pfjresurf-${grade}`;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex items-center space-x-4 cursor-pointer"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                        />
                        <span
                          className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                        >
                          {grade}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className={`flex flex-row gap-28`}>
                <label
                  className={`${inter.className} text-base font-extrabold text-[#484848]`}
                >
                  Trachela Resection
                </label>
                <div className={` `}>
                  <input
                    type="text"
                    className="px-4 py-1 rounded w-40 bg-gray-300 text-[black] text-sm"
                  />
                </div>
              </div>

              <div className={`flex flex-col gap-6`}>
                <label
                  className={`${inter.className} text-base font-extrabold text-[#484848]`}
                >
                  Patella
                </label>
                <div className={`space-x-6 flex flex-row  `}>
                  {["Worn", "UnWorn"].map((grade) => {
                    const id = `patella-${grade}`;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex items-center space-x-4 cursor-pointer"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                        />
                        <span
                          className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                        >
                          {grade}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className={`flex flex-row gap-[49px]`}>
                <label
                  className={`${inter.className} text-base font-extrabold text-[#484848]`}
                >
                  Pre Resurfacing Thickness
                </label>
                <div className={` `}>
                  <input
                    type="text"
                    className="px-4 py-1 rounded w-40 bg-gray-300 text-[black] text-sm"
                  />
                </div>
              </div>

              <div className={`flex flex-row gap-10`}>
                <label
                  className={`${inter.className} text-base font-extrabold text-[#484848]`}
                >
                  Post Resurfacing Thickness
                </label>
                <div className={` `}>
                  <input
                    type="text"
                    className="px-4 py-1 rounded w-40 bg-gray-300 text-[black] text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col  h-full w-full pt-10">
            <h2
              className={`${inter.className} text-base font-bold pl-[23px] text-[#7676A4]`}
            >
              Component Selection
            </h2>
            <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>
            <div className="w-full overflow-x-auto h-full overflow-y-auto pt-[33px] inline-scroll">
              <table className="min-w-full table-fixed border-separate border-spacing-0">
                {/* Table Head */}
                <thead className="text-[#475467] text-[16px] font-medium text-center">
                  <tr className={`rounded-2xl ${inter.className}`}>
                    <th className="px-4 py-3 bg-black/80 text-white font-bold text-[15px] text-center rounded-tl-[8px]"></th>
                    {categories.map((header, idx) => (
                      <th
                        key={header}
                        className={`px-4 py-3 bg-black/80 text-white font-bold text-[15px] text-center whitespace-nowrap
                      ${idx === 3 ? "rounded-tr-[8px]" : ""}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className={`${inter.className} bg-white text-[13px]`}>
                  {rows.map((row, rowIdx, arr) => (
                    <tr key={row}>
                      {/* Row label */}
                      <td
                        className={`px-4 py-3 text-left font-semibold text-[#010101] ${
                          raleway.className
                        }
                      border-l-2 border-[#AAA8A8]
                      ${rowIdx === 0 ? "border-t-2" : ""}
                      ${rowIdx === arr.length - 1 ? "border-b-2" : ""}`}
                      >
                        {row}
                      </td>

                      {/* Dropdowns */}
                      {categories.map((col, colIdx) => (
                        <td
                          key={col}
                          className={`px-4 py-3 text-center ${
                            raleway.className
                          } text-[13px] font-semibold text-[#010101]
                        ${colIdx === 3 ? "border-r-2 border-[#AAA8A8]" : ""}
                        ${rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""}
                        ${
                          rowIdx === arr.length - 1
                            ? "border-b-2 border-[#AAA8A8]"
                            : ""
                        }`}
                        >
                          <select
                            className="w-6/7 border rounded px-2 py-1 text-center text-sm"
                            value={selections[col][row]}
                            onChange={(e) =>
                              setSelections({
                                ...selections,
                                [col]: {
                                  ...selections[col],
                                  [row]: e.target.value,
                                  ...(row === "MANUFACTURER" && {
                                    MODEL: "",
                                    SIZE: "",
                                  }),
                                  ...(row === "MODEL" && { SIZE: "" }),
                                },
                              })
                            }
                          >
                            <option value="" disabled>
                              Select
                            </option>

                            {/* Directly map options from data */}
                            {row === "MANUFACTURER" &&
                              optionsData[col]?.MANUFACTURER?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}

                            {row === "MODEL" &&
                              selections[col].MANUFACTURER &&
                              optionsData[col]?.MODEL[
                                selections[col].MANUFACTURER
                              ]?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}

                            {row === "SIZE" &&
                              selections[col].MODEL &&
                              optionsData[col]?.SIZE[
                                selections[col].MODEL
                              ]?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
            .inline-scroll::-webkit-scrollbar {
              width: 12px;
            }
            .inline-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .inline-scroll::-webkit-scrollbar-thumb {
              background-color: #424335;
              border-radius: 8px;
            }
      
            .inline-scroll {
              scrollbar-color: #424335 transparent;
            }
          `}
      </style>
    </div>
  );
};

export default AddSurgeryreport;
