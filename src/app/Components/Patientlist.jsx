"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Raleway, Inter, Poppins } from "next/font/google";
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
import Reportimg from "@/app/Assets/report.png";

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

const Patientlist = ({handlenavigatereport}) => {
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

  const [shownotassigned, setshownotassigned] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const patients = Array.from({ length: 50 }, (_, i) => ({
    name: `Patient ${i + 1}`,
    age: 20 + (i % 30), // age between 20–49
    gender: i % 2 === 0 ? "Male" : "Female",
    uhid: `UHID${1000 + i}`,
    period: ["Pre Op", "6W", "3M", "6M", "1Y", "2Y"][i % 6],
    status: i % 3 === 0 ? "COMPLETED" : "PENDING",
    avatar: i % 2 === 0 ? ManAvatar : ManAvatar,
  }));

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // State for dropdown radios
  const [side, setSide] = useState("left");
  const [operativePeriod, setOperativePeriod] = useState("all");
  const [subOperativePeriod, setSubOperativePeriod] = useState("all");
  const [completionStatus, setCompletionStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // format: yyyy-mm-dd
  });
  const [sortOrder, setSortOrder] = useState("low_to_high");

  // Handlers
  const handleClearAll = () => {
    setSide("left");
    setOperativePeriod("all");
    setSubOperativePeriod("all");
    setCompletionStatus("all");
    setSortOrder("low_to_high");
    setSelectedDate(" ");
  };

  const handleApply = () => {
    // You can do any filtering/apply logic here if needed

    setDropdownOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(patients.length / rowsPerPage);

  // Slice the data
  const paginatedPatients = patients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const generatePageOptions = (total) => {
    const options = [];
    const commonSteps = [5, 10, 25, 50];

    for (let step of commonSteps) {
      if (step < total) {
        options.push(step);
      }
    }

    if (!options.includes(total)) {
      options.push(total); // Add total as last option
    }

    return options;
  };

  return (
    <div
      className={`w-full ${width>=1200?"overflow-y-hidden":"overflow-y-auto"} h-full flex flex-col pt-8 pb-12 inline-scroll ${
        width >= 1000 ? "px-12" : "px-8"
      } rounded-4xl inline-scroll`}
    >
      <div
        className={`w-full flex ${
          width >= 700 ? "flex-row" : "flex-col gap-4"
        }`}
      >
        <p
          className={`${raleway.className} font-bold text-2xl text-black ${
            width >= 700 ? "w-2/5" : "w-full"
          }`}
        >
          Patients
        </p>
        <div
          className={`flex flex-row ${
            width >= 700 ? "w-3/5" : "w-full"
          } justify-between gap-12`}
        >
          <div
            className={`${
              width >= 1100 ? "w-2/3" : "w-full"
            }  flex flex-row gap-2 items-center bg-white border-[2px] border-gray-200 rounded-md px-2 py-1`}
          >
            <Image src={Search} alt="Search" className={`w-4 h-4`} />
            <input
              placeholder="Search ..."
              className={`${raleway.className} font-normal text-black w-full px-2 py-1`}
            />
          </div>
          {width >= 1100 && (
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

      <div
        className={`w-full flex h-[6%] mt-8 ${
          width >= 1265 ? "flex-row" : "flex-col gap-4"
        }`}
      >
        <div
          className={` flex flex-row items-end gap-4 pl-4 ${
            width >= 1265 ? "w-[70%]" : "w-full"
          }`}
        >
          {/* Dropdown SVG Button */}
          <div className={`${raleway.className} relative`}>
            <div
              className="bg-white rounded-lg px-3 py-2 cursor-pointer shadow-lg  border-[#EBEBEB] border-2"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.79 1.61564C12.3029 0.959102 11.8351 0 11.002 0H1.00186C0.168707 0 -0.299092 0.959101 0.213831 1.61564L5.03983 7.72867C5.1772 7.90449 5.25181 8.1212 5.25181 8.34432V13.7961C5.25181 13.9743 5.46724 14.0635 5.59323 13.9375L6.60536 12.9254C6.69913 12.8316 6.75181 12.7044 6.75181 12.5718V8.34432C6.75181 8.1212 6.82643 7.90449 6.96379 7.72867L11.79 1.61564Z"
                  fill="#464F60"
                />
              </svg>
            </div>

            {dropdownOpen && (
              <div
                className="absolute left-0 max-h-[500px] overflow-y-auto mt-2 w-56 bg-white border rounded shadow-md z-10 p-4 text-base text-gray-700 inline-scroll"
                
              >
                {/* Side */}
                <div className="mb-4">
                  <p className="font-semibold mb-1">Side</p>
                  <label className="inline-flex items-center mr-4 cursor-pointer">
                    <input
                      type="radio"
                      className="form-radio"
                      name="side"
                      value="left"
                      checked={side === "left"}
                      onChange={() => setSide("left")}
                    />
                    <span className="ml-2">Left</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="form-radio"
                      name="side"
                      value="right"
                      checked={side === "right"}
                      onChange={() => setSide("right")}
                    />
                    <span className="ml-2">Right</span>
                  </label>
                </div>

                {/* Operative Period */}
                <div className="mb-4">
                  <p className="font-semibold mb-1">Operative Period</p>
                  {["all", "pre-op", "post-op"].map((period) => (
                    <div key={period}>
                      <label className="inline-flex items-center mr-4 cursor-pointer">
                        <input
                          type="radio"
                          className="form-radio"
                          name="operativePeriod"
                          value={period}
                          checked={operativePeriod === period}
                          onChange={() => {
                            setOperativePeriod(period);
                            if (period !== "post-op") {
                              setSubOperativePeriod(""); // reset sub-period if switching away
                            }
                          }}
                        />
                        <span className="ml-2 capitalize">{period}</span>
                      </label>

                      {/* Show sub-options if post-op selected */}
                      {period === "post-op" &&
                        operativePeriod === "post-op" && (
                          <div className="ml-6 mt-2 flex flex-wrap gap-4">
                            {["all", "6 w", "3 m", "6 m", "1 y", "2 y"].map(
                              (sub) => (
                                <label
                                  key={sub}
                                  className="inline-flex items-center cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    className="form-radio"
                                    name="subOperativePeriod"
                                    value={sub}
                                    checked={subOperativePeriod === sub}
                                    onChange={() => setSubOperativePeriod(sub)}
                                  />
                                  <span className="ml-2 capitalize">{sub}</span>
                                </label>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                {/* Completion Status */}
                <div className="mb-4">
                  <p className="font-semibold mb-1">Completion Status</p>
                  {["all", "not_assigned", "pending", "completed"].map(
                    (status) => (
                      <label
                        key={status}
                        className="inline-flex items-center mr-4 cursor-pointer"
                      >
                        <input
                          type="radio"
                          className="form-radio"
                          name="completionStatus"
                          value={status}
                          checked={completionStatus === status}
                          onChange={() => setCompletionStatus(status)}
                        />
                        <span className="ml-2">
                          {status
                            .replace("_", " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </label>
                    )
                  )}
                </div>

                {/* Calendar Date Picker */}
                <div className="mb-4">
                  <p className="font-semibold mb-1 ">Select Date</p>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                  />
                </div>

                {/* Sort */}
                <div>
                  <p className="font-semibold mb-1">Sort</p>
                  {[
                    { label: "Low to High", value: "low_to_high" },
                    { label: "High to Low", value: "high_to_low" },
                  ].map(({ label, value }) => (
                    <label
                      key={value}
                      className="inline-flex items-center mr-4 cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio"
                        name="sortOrder"
                        value={value}
                        checked={sortOrder === value}
                        onChange={() => setSortOrder(value)}
                      />
                      <span className="ml-2">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between mt-4 pt-2 border-t border-gray-300">
                  <button
                    onClick={handleClearAll}
                    className="text-sm font-semibold text-red-600 cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApply}
                    className="text-sm font-semibold text-blue-600 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <p
            className={`${raleway.className} text-[#2B2B2B] font-semibold text-sm w-1/2`}
          >
            Clear All
          </p>
        </div>
      </div>

      <div
        className={`w-full flex flex-col gap-2 ${
          width >= 1000 ? "h-[89%]" : "h-[98%] pb-4"
        } ${width<640?"mt-8":""}`}
      >
        <div
          className={`${poppins.className} h-[5%] flex flex-row items-center justify-end gap-4 px-4 text-[13px] font-medium text-gray-600`}
        >
          {/* Rows per page */}
          <span>Records per page:</span>
          <select
            className="bg-transparent outline-none text-gray-700 font-semibold cursor-pointer"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
          >
            {generatePageOptions(patients.length).map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>

          {/* Pagination controls */}
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            {/* Previous */}
            <button
              className="w-6 h-6 flex items-center justify-center rounded-md bg-white shadow border cursor-pointer"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page Info */}
            <span className="text-gray-700 text-[13px]">
              <span className="text-black">{currentPage}</span>/
              <span>{totalPages}</span>
            </span>

            {/* Next */}
            <button
              className="w-6 h-6 flex items-center justify-center rounded-md bg-white shadow border cursor-pointer"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`w-full h-[95%] flex-1 px-4 pt-2 pb-2 inline-scroll ${
            width >= 1000 ? "overflow-y-auto" : ""
          }`}
        >
          {paginatedPatients.map((patient, index) => (
            <div
              key={index}
              className={`w-full rounded-lg flex  px-3 bg-white border-1 border-[#EBEBEB] ${
                width < 530
                  ? "flex-col justify-center items-center gap-2 py-3"
                  : "flex-row justify-between items-center py-1.5"
              } ${width < 1000 ? "mb-2" : "mb-4"}`}
            >
              {/* LEFT - Avatar + Name + Age */}
              <div
                className={`${
                  width < 640 && width >= 530
                    ? "w-3/5"
                    : width < 530
                    ? "w-full"
                    : "w-[30%]"
                }`}
              >
                <div
                  className={`flex gap-4 py-0 items-center ${
                    width < 710 && width >= 640
                      ? "px-0 flex-row"
                      : width < 530
                      ? "flex-col justify-center items-center"
                      : "px-2 flex-row"
                  }`}
                >
                  <Image
                    src={patient.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className={`rounded-full cursor-pointer ${
                      width < 530 ? "w-11 h-11" : "w-10 h-10"
                    }`}
                  />
                  <div
                    className={`w-full flex items-center ${
                      width < 710 ? "flex-col" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex flex-col ${
                        width < 710 ? "w-full gap-2" : "w-[70%] gap-4"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p
                          className={`${
                            raleway.className
                          } text-[#475467] font-semibold text-lg ${
                            width < 530 ? "w-full text-center" : ""
                          }`}
                        >
                          {patient.name}
                        </p>
                      </div>
                      <p
                        className={`${
                          poppins.className
                        } font-normal text-sm text-[#475467] ${
                          width < 530 ? "text-center" : "text-start"
                        }`}
                      >
                        {patient.age}, {patient.gender}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT - UHID + Period + Status + Report Icon */}
              <div
                className={`flex items-center ${
                  width < 640 && width >= 530
                    ? "w-2/5 flex-col text-center gap-4"
                    : width < 530
                    ? "w-full flex-col text-center gap-4"
                    : "w-[70%] flex-row justify-between"
                }`}
              >
                <div
                  className={`${
                    poppins.className
                  } text-base font-medium text-[#475467] ${
                    width < 710 ? "w-full text-center" : "w-1/5 text-center"
                  }`}
                >
                  UHID {patient.uhid}
                </div>

                <div
                  className={`${
                    inter.className
                  } text-[15px] font-semibold text-[#373737] ${
                    width < 750 ? "w-3/4 text-center" : "w-1/4 text-center"
                  }`}
                >
                  {patient.period}
                </div>

                <div
                  className={`flex flex-col items-center justify-center ${
                    width < 750 ? "w-3/4 text-center" : "w-1/4 text-center"
                  }`}
                >
                  {shownotassigned ? (
                    <div className="w-full flex flex-col items-end relative group">
                      <Image
                        src={Error}
                        alt="Not assigned"
                        className={`w-6 h-6`}
                      />
                      <div className="relative w-full h-1.5 overflow-hidden bg-white cursor-pointer">
                        {/* Filled Progress */}
                        <div
                          className="h-full bg-[#E5E5E5]"
                          style={{
                            width: "100%",
                            backgroundImage: "url('/stripes.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center relative group">
                      {/* Hover Percentage Text */}
                      <div className="absolute -top-7 left-0 transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm font-semibold text-black border-2 border-black px-3 rounded-lg">
                        75%
                      </div>

                      {/* Progress Bar Container */}
                      <div
                        className="relative w-full h-1.5 overflow-hidden bg-[#E5E5E5] cursor-pointer"
                        onClick={() => {
                          setisOpencompliance(true);
                        }}
                      >
                        {/* Filled Progress */}
                        <div
                          className="h-full bg-yellow-400"
                          style={{
                            width: "75%",
                            backgroundImage: "url('/stripes.svg')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`flex flex-row gap-4 items-center ${
                    width < 750 ? "w-3/4 text-center" : "w-1/4"
                  }`}
                >
                  <div
                    className={`${
                      width < 750 ? "w-full text-center" : "w-full"
                    }`}
                  >
                    <Image
                      src={Reportimg}
                      className={`w-8 h-8 mx-auto cursor-pointer`}
                      alt="Report"
                      onClick={handlenavigatereport}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default Patientlist;
