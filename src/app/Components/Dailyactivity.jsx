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
import ManAvatar from "@/app/Assets/manavatar.png";

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

const Dailyactivity = ({handlenavigatereport, handlenavigatesurgeryreport}) => {
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

  const data = [
    { x: 0, line1: 0, line2: 100 },
    { x: 1, line1: 25, line2: 75 },
    { x: 2, line1: 50, line2: 50 },
    { x: 3, line1: 75, line2: 25 },
    { x: 4, line1: 100, line2: 0 },
  ];

  const quespending = [
    "Oxford Knee Score (OKS)",
    "Short Form 12  (SF-12)",
    "Knee Society Score (KSS)",
    "Knee Injury and Ostheoarthritis Outcome Score ,Joint Replacement (KOOS , JR)",
    "Forgotten Joint Score (FJS)",
  ];

  const bardata = [
    { name: "OKS", value: 40 },
    { name: "SF-12", value: 30 },
    { name: "KOOS, JR", value: 20 },
    { name: "FJS", value: 27 },
    { name: "KSS", value: 18 },
  ];

  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 45,
      gender: "Male",
      left: "Pre Op",
      right: "Pre Op",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 52,
      gender: "Female",
      left: "6W",
      right: "3M",
    },
    {
      id: 3,
      name: "Alex Johnson",
      age: 38,
      gender: "Male",
      left: "Pre Op",
      right: "1Y",
    },
    {
      id: 4,
      name: "Emily Brown",
      age: 41,
      gender: "Female",
      left: "3M",
      right: "6M",
    },
    {
      id: 5,
      name: "Chris Evans",
      age: 56,
      gender: "Male",
      left: "6W",
      right: "3M",
    },
    {
      id: 6,
      name: "Sophia Miller",
      age: 33,
      gender: "Female",
      left: "Pre Op",
      right: "Pre Op",
    },
    {
      id: 7,
      name: "Daniel Wilson",
      age: 48,
      gender: "Male",
      left: "1Y",
      right: "2Y",
    },
  ];

  const [selectedId, setSelectedId] = useState(patients[0].id);

  return (
    <div
      className={`w-full overflow-y-auto h-full flex flex-col py-8 ${width>=500?"px-12":"px-8"} rounded-4xl gap-8 inline-scroll`}
    >
      <div className={`w-full flex ${width>=700?"flex-row":"flex-col gap-4"}`}>
        <p
          className={`${raleway.className} font-bold text-2xl text-black ${width>=700?"w-2/5":"w-full"}`}
        >
          Daily Activity
        </p>
        <div className={`flex flex-row ${width>=700?"w-3/5":"w-full"} justify-between gap-12`}>
          <div className={`${width>=1100?"w-2/3":"w-full"}  flex flex-row gap-2 items-center bg-white border-[2px] border-gray-200 rounded-md px-2 py-1`}>
            <Image src={Search} alt="Search" className={`w-4 h-4`} />
            <input
              placeholder="Search ..."
              className={`${raleway.className} font-normal text-black w-full px-2 py-1`}
            />
          </div>
          {width>=1100 && (
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
          )}
        </div>
      </div>
      <div className={`w-full flex gap-8 ${width>=1000?"flex-row":"flex-col h-fit"}`}>
        <div className={`${width>=1000?"w-1/3":"w-full h-full"} flex flex-col gap-4`}>
          <p
            className={`${inter.className} font-medium text-xl text-[#30263B]`}
          >
            Selected Patient
          </p>
          <div
            className={`w-full flex flex-col gap-5 border-[#EBEBEB] border-[1.3px] rounded-[10px] py-6 px-4`}
          >
            <div className={`w-full flex `}>
              <div className={`${width >= 1350 ? "w-full" : "w-full"}`}>
                <div
                  className={`flex gap-4 py-0  w-full ${
                    width < 710 && width >= 640
                      ? "px-0 flex-row items-start"
                      : width < 530
                      ? "flex-col justify-between items-center"
                      : "flex-row items-start"
                  }`}
                >
                  <Image
                    src={ManAvatar}
                    alt="Avatar"
                    className={`rounded-full cursor-pointer ${
                      width < 530 ? "w-12 h-12" : "w-[60px] h-[60px]"
                    }`}
                  />
                  <div
                    className={`w-full flex ${width>=1350?"flex-row": width<1350 && width>=1000 ?"flex-col":
                      width<1000&&width >= 600 ? "flex-row" : "flex-col gap-2"
                    }`}
                  >
                    <div
                      className={` flex items-center ${
                        width < 710 ? "flex-col" : "flex-row"
                      }
                        
                    ${width>=1350?"w-1/2": width<1350 && width>=1000 ?"w-full":
                      width<1000&&width >= 600 ? "w-1/2" : "w-full"
                    }`}
                    >
                      <div
                        className={`flex flex-col ${
                          width < 710 ? "w-full" : "w-full"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p
                            className={`${
                              raleway.className
                            } text-black font-semibold text-lg ${
                              width < 530 ? "w-full text-center" : ""
                            }`}
                          >
                            Patient Name
                          </p>
                        </div>
                        <p
                          className={`${
                            poppins.className
                          } font-normal text-sm text-[#0F0F0F] ${
                            width < 530 ? "text-center" : "text-start"
                          }`}
                        >
                          25, Male
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col

                      ${width>=1350?"w-1/2 gap-2 justify-end": width<1350 && width>=1000 ?"w-full justify-start":
                      width<1000&&width >= 600 ? "w-1/2 gap-2 justify-end" : "w-full justify-start"
                    }

                      `}
                    >

                        <p
                          className={`${
                            inter.className
                          } text-[#484848] font-semibold text-base ${
                            width < 530 ? "w-full text-center" : "w-full text-end"
                          }
                          ${width>=1350?"text-end": width<1350 && width>=1000 ?"text-start":
                      width<1000 && width >= 600 ? "text-end" : width<600 && width >=530? "text-start":"text-center"
                    }

                          `}
                        >
                          L: Preop R: NA
                        </p>
                      <p
                        className={`${
                          poppins.className
                        } font-medium text-base text-[#222222] opacity-50 
                        
                        ${width>=1350?"text-end": width<1350 && width>=1000 ?"text-start":
                      width<1000&&width >= 600 ? "text-end" : width<600 && width >=530? "text-start":"text-center"
                    }

                        `}
                      >
                        ID: 23456789
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`w-full flex ${width>=530?"flex-row":"flex-col"} gap-4`}>
              <div className={`${width>=530?"w-3/4":"w-full"}`}>
                <div className="w-full h-full bg-white rounded-lg">
                  <div className="w-full h-full bg-white rounded-lg">
                    <ResponsiveContainer>
                      <LineChart
                        data={data}
                        margin={{ top: 0, right: 0, left: -40, bottom: 0 }}
                      >
                        <CartesianGrid vertical={false} stroke="#EBEBEB" />
                        <XAxis dataKey="x" hide />
                        <YAxis
                          axisLine={false}
                          tick={{
                            fill: "gray",
                            fontSize: 8,
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                          }}
                        />
                        <Tooltip />

                        {/* First dashed line */}
                        <Line
                          type="monotone"
                          dataKey="line1"
                          stroke="#4A3AFF"
                          strokeDasharray="20 15"
                          strokeWidth={2}
                          dot={false}
                        />

                        {/* Second dashed line */}
                        <Line
                          type="monotone"
                          dataKey="line2"
                          stroke="#962DFF"
                          strokeDasharray="20 15"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div
                className={`${width>=530?"w-1/4 flex-col items-center gap-8":"w-full flex-row items-center gap-4"} flex   justify-between `}
              >
                <div
                  className={`w-full flex flex-row items-center justify-center gap-2 bg-[#FFF5F7] px-2 py-1 rounded-[10px]`}
                >
                  <ArrowDownCircleIcon className="w-4 h-4 text-[#DE8E8A]" />
                  <p
                    className={`${inter.className} font-medium text-sm text-[#DE8E8A]`}
                  >
                    23 %
                  </p>
                </div>
                <div className={`w-full flex flex-col items-center`}>
                  <div
                    className={`w-full flex flex-row items-center justify-center gap-2 bg-[#EBF4F1] px-2 py-1 rounded-[10px]`}
                  >
                    <p
                      className={`${inter.className} font-semibold text-sm text-[#484848]`}
                    >
                      42.73
                    </p>
                  </div>
                  <p
                    className={`${inter.className} font-normal text-[#475467] opacity-50 text-xs`}
                  >
                    Score
                  </p>
                </div>
                <p
                  className={`w-full ${poppins.className} text-center font-normal text-sm text-[#0F0F0F]`}
                >
                  BMI: 27
                </p>
              </div>
            </div>
            <div className={`w-full flex flex-col gap-2`}>
              <p
                className={`${inter.className} font-bold text-sm text-[#2A343D]`}
              >
                Pending
              </p>
              <div
                className={`w-full flex flex-col ${raleway.className} font-semibold text-xs text-[#696969] gap-1`}
              >
                {quespending.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            </div>
            <div
              className={`w-full flex ${
                width >= 1300
                  ? "flex-row gap-12"
                  : "flex-col items-center gap-6"
              } 
              ${width>=1350?"flex-row gap-12": width<1350 && width>=1000 ?"flex-col items-center gap-6":
                      width<1000&&width >= 600 ? "flex-row gap-12" : "flex-col items-center gap-6"
                    }`}
            >
              <p
                className={`${width>=400?"w-1/2":"w-2/3"} text-center bg-[#2A343D] px-4 py-1 text-white ${inter.className} font-medium text-[15px] rounded-[10px] cursor-pointer`}
                onClick={handlenavigatesurgeryreport}
              >
                Surgery
              </p>
              <p
                className={`${width>=400?"w-1/2":"w-2/3"} text-center bg-[#2A343D] px-4 py-1 text-white ${inter.className} font-medium text-[15px] rounded-[10px] cursor-pointer`}
                onClick={handlenavigatereport}
              >
                View Report
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${width>=1000?"w-2/3":"w-full h-full min-h-[600px]"} flex flex-col justify-between gap-2 border-[#EBEBEB] border-[1.3px] rounded-[10px] py-4 px-4 h-full`}
        >
          <p
            className={`${inter.className} font-bold text-[22px] text-[#2B333E]`}
          >
            Overall Patient Stats
          </p>
          <div className={`w-full flex ${width>=700?"flex-row px-6":"flex-col gap-6"} `}>
            <p
              className={`${poppins.className} font-medium text-base text-[#475467] opacity-50 ${width>=700?"w-2/5":"w-full"}`}
            >
              Data with number of patients and their reports
            </p>
            <div className={`${width>=700?"w-3/5 justify-end":"w-full justify-center"} flex flex-row gap-6 `}>
              <div className={`w-fit flex flex-col items-center gap-1`}>
                <p
                  className={`${inter.className} font-bold text-2xl text-white py-1.5 px-4 bg-[#2A343D] rounded-[10px]`}
                >
                  25
                </p>
                <p
                  className={`${raleway.className} font-medium text-[10px] text-[#2B2B2B]`}
                >
                  Pre Op
                </p>
              </div>
              <div className={`w-fit flex flex-col items-center gap-1`}>
                <p
                  className={`${inter.className} font-bold text-2xl text-white py-1.5 px-4 bg-[#2A343D] rounded-[10px]`}
                >
                  42
                </p>
                <p
                  className={`${raleway.className} font-medium text-[10px] text-[#2B2B2B]`}
                >
                  Post Op
                </p>
              </div>
            </div>
          </div>
          <div className={`w-full h-full pt-10`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bardata}
                                      margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                {/* Remove horizontal Y grid lines */}
                <CartesianGrid vertical={false} stroke="#EBEBEB" />

                {/* X Axis */}
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#475467",
                    opacity: 0.5,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                  axisLine={false} // hide x-axis line if you want
                />

                {/* Y Axis */}
                <YAxis
                  tick={{
                    fill: "#475467",
                    opacity: 0.5,
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                  axisLine={false} // no y-axis line
                  tickLine={false} // no small tick lines
                />

                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#8884d8"
                  radius={[8, 8, 0, 0]}
                  barSize={22}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="w-full h-fit">
        <div className="flex flex-row gap-13.5 whitespace-nowrap overflow-x-auto pb-4 inline-scroll">
          {patients.map((patient) => {
            const isSelected = selectedId === patient.id;

            return (
              <div
                key={patient.id}
                onClick={() => setSelectedId(patient.id)}
                className={`w-fit h-fit min-w-[220px] flex-shrink-0 flex flex-col rounded-lg py-3 px-4 gap-2 cursor-pointer transition-colors duration-200 ${
                  isSelected
                    ? "bg-[#2A343D]"
                    : "bg-white border-[#EBEBEB] border-1"
                }`}
              >
                {/* Top Row */}
                <div className="w-full flex flex-row gap-6 items-center">
                  <Image
                    src={ManAvatar}
                    alt="Avatar"
                    className={`rounded-full w-[35px] h-[35px]`}
                  />
                  <div className="flex flex-col gap-1">
                    <p
                      className={`${raleway.className} font-semibold text-lg ${
                        isSelected ? "text-white" : "text-black"
                      }`}
                    >
                      {patient.name}
                    </p>
                    <p
                      className={`${poppins.className} font-normal text-sm ${
                        isSelected ? "text-white" : "text-black"
                      }`}
                    >
                      {patient.age}, {patient.gender}
                    </p>
                  </div>
                </div>

                {/* Center ID */}
                <div className="w-full text-center">
                  <p
                    className={`${
                      poppins.className
                    } font-medium text-base opacity-50 ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    ID: {patient.id}
                  </p>
                </div>

                {/* Bottom L/R */}
                <div
                  className={`${inter.className} w-full flex flex-row justify-between pt-2`}
                >
                  <p
                    className={`font-semibold text-sm ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    L: {patient.left}
                  </p>
                  <p
                    className={`font-semibold text-sm ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    R: {patient.right}
                  </p>
                </div>
              </div>
            );
          })}
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

export default Dailyactivity;
