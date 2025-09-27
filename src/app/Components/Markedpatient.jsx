"use client";

import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

import axios from "axios";
import { API_URL } from "../libs/global";

import { Raleway, Inter, Poppins, Outfit } from "next/font/google";
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
import Womanavatar from "@/app/Assets/woman.png";
import Reportimg from "@/app/Assets/report.png";
import CloseIcon from "@/app/Assets/closeiconwindow.png";
import ExpandIcon from "@/app/Assets/expand.png";
import ShrinkIcon from "@/app/Assets/shrink.png";
import UploadProfile from "@/app/Assets/uploadprofilepic.png";

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

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // add weights as needed
  variable: "--font-outfit", // optional CSS variable name
});

const Markedpatient = ({ handlenavigatereport }) => {
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
  const [patientloading, setPatientloading] = useState(true);

  // Handlers
  const handleClearAll = () => {
    setSide("left");
    setOperativePeriod("all");
    setSubOperativePeriod("all");
    setCompletionStatus("all");
    setSortOrder("low_to_high");
    setSelectedDate(" ");
    setSearchTerm("");
  };

  const handleApply = () => {
    // You can do any filtering/apply logic here if needed

    setDropdownOpen(false);
  };

  const [patientdata, setPatientdata] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [showAlert, setshowAlert] = useState(false);
  const [alermessage, setAlertMessage] = useState("");

  const showWarning = (message) => {
    setAlertMessage(message);
    setshowAlert(true);
    setTimeout(() => setshowAlert(false), 4000);
  };

  const extractScore = (scoreStr) => {
    if (!scoreStr || typeof scoreStr !== "string") return null;
    const match = scoreStr.match(/:\s*(\d+)/); // capture first number
    return match ? parseFloat(match[1]) : null;
  };

  const calculateOverallScores = (sideData) => {
    if (!sideData || sideData === "NA") return {};

    const questionnaires = {};

    for (const [qName, periods] of Object.entries(sideData)) {
      for (const [period, qData] of Object.entries(periods || {})) {
        const numScore = extractScore(qData?.score);
        if (numScore !== null) {
          if (!questionnaires[qName]) {
            questionnaires[qName] = { total: 0, count: 0 };
          }
          questionnaires[qName].total += numScore;
          questionnaires[qName].count += 1;
        }
      }
    }

    // Convert totals → averages
    const overall = {};
    for (const [qName, { total, count }] of Object.entries(questionnaires)) {
      overall[qName] = count > 0 ? (total / count).toFixed(2) : "NA";
    }

    return overall;
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        let adminUhid = null;

        if (typeof window !== "undefined") {
          adminUhid = sessionStorage.getItem("doctor"); // 👈 safe access
        }

        if (!adminUhid) {
          showWarning("No admin UHID found in session");
          return;
        }

        const res = await axios.get(
          `${API_URL}get_admin_doctor_page${adminUhid}`
        );
        // console.log("✅ API Response:", res.data);

        // setPatients1(res.data.patients || []);

        const apiPatients = res.data[0].patients || [];


        const filteredPatients = apiPatients.filter(
          (p) => p.VIP_Status === true
        );

        // 🔄 Map API data → static UI format
        const mapped = filteredPatients.map((p, i) => {
          // ✅ Only calculate if doctor is assigned
          const leftOverallScores = p.Practitioners?.left_doctor
            ? calculateOverallScores(p.Medical_Left)
            : {};

          const rightOverallScores = p.Practitioners?.right_doctor
            ? calculateOverallScores(p.Medical_Right)
            : {};

          return {
            name: p.Patient?.name || "Unknown",
            age: p.Patient?.birthDate
              ? new Date().getFullYear() -
                new Date(p.Patient.birthDate).getFullYear()
              : "NA",
            gender:
              p.Patient?.gender?.toLowerCase() === "male" ? "Male" : "Female",
            uhid: p.Patient?.uhid,
            dob: p.Patient?.birthDate ?? "NA",
            period: p.Patient_Status_Left || "NA",
            period_right: p.Patient_Status_Right || "NA",
            status: i % 3 === 0 ? "COMPLETED" : "PENDING",
            left_compliance: p.Medical_Left_Completion ?? 0,
            right_compliance: p.Medical_Right_Completion ?? 0,
            vip:p.VIP_Status,
            activation_status: p.Activation_Status ?? "True",
            left_questionnaires: p.Medical_Left ?? "NA",
            right_questionnaires: p.Medical_Right ?? "NA",
            patient_initial_status: p.patient_current_status ?? "NA",
            surgery_left: p.Medical?.surgery_date_left ?? "NA",
            surgery_right: p.Medical?.surgery_date_right ?? "NA",
            phone: p.Patient?.phone ?? "NA",
            alterphone: p.Patient?.alterphone ?? "NA",
            email: p.Patient?.email ?? "NA",
            address: p.Patient?.address ?? "NA",
            id_proofs: p.Medical?.id_proofs ?? "NA",
            doctor_left: p.Practitioners?.left_doctor,
            doctor_right: p.Practitioners?.right_doctor,
            doctor: res.data?.doctor_uhid ?? "NA",

            // ✅ New: overall scores (only if doctor exists)
            overall_scores: {
              left: leftOverallScores,
              right: rightOverallScores,
            },
            avatar:
              p.Patient?.photo && p.Patient?.photo !== "NA"
                ? p.Patient.photo
                : p.Patient?.gender?.toLowerCase() === "male"
                ? ManAvatar
                : Womanavatar,
          };
        });
        setPatientloading(false);
        setPatientdata(mapped);
        // console.log("Patient dat", apiPatients);
      } catch (err) {
        console.error("❌ Error fetching patients:", err);
        if (err.response) {
          showWarning(err.response.data.detail || "Failed to fetch patients");
        } else {
          showWarning("Network error");
        }
      }
    };

    fetchPatients();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);



  const getOverallScore = (patient, side) => {
    if (!patient.overall_scores) return 0;

    const scores =
      side === "left"
        ? patient.overall_scores.left
        : patient.overall_scores.right;

    // console.log("Score data", scores + " " + side);

    if (!scores) return 0;

    const total = Object.values(scores).reduce((sum, val) => {
    const num = parseFloat(val);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return Math.round((total / 408) * 100); // ✅ rounded to 2 decimals
  };


  const filteredPatients = patientdata.filter((patient) => {
    // 1️⃣ Side filter
    if (side) {
      const surgeryDate =
        side === "left" ? patient.surgery_left : patient.surgery_right;

      // ❌ filter out if surgery date is missing or "NA"
      if (!surgeryDate || surgeryDate === "NA") return false;
    }

    if (operativePeriod && operativePeriod !== "all") {
      if (
        operativePeriod === "pre-op" &&
        ((side === "left" && patient.period?.toLowerCase() !== "pre op") ||
          (side === "right" &&
            patient.period_right?.toLowerCase() !== "pre op"))
      ) {
        return false;
      }

      if (operativePeriod === "post-op") {
        if (operativePeriod && operativePeriod !== "all") {
          const periodValue =
            side === "left" ? patient.period : patient.period_right;

          if (
            operativePeriod === "pre-op" &&
            periodValue?.toLowerCase() !== "pre op"
          ) {
            return false;
          }

          if (operativePeriod === "post-op") {
            // If sub-period is selected
            if (subOperativePeriod && subOperativePeriod !== "all") {
              // Normalize both sides (remove spaces, lowercase)
              if (
                periodValue?.replace(/\s+/g, "").toLowerCase() !==
                subOperativePeriod.replace(/\s+/g, "").toLowerCase()
              ) {
                return false;
              }
            } else {
              // post-op includes all periods except pre-op
              if (periodValue?.toLowerCase() === "pre op") return false;
            }
          }
        }
      }
    }

    return true;
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const aScore = getOverallScore(a, side);
    const bScore = getOverallScore(b, side);

    if (sortOrder === "low_to_high") {
      return aScore - bScore;
    } else {
      return bScore - aScore;
    }
  });

  // Use searchedPatients if searchTerm exists, otherwise filteredPatients
  const displayedPatients = searchTerm
    ? sortedPatients.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.uhid.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sortedPatients;

  // Whenever data or rowsPerPage change, reset page
  // Reset current page when searchTerm, filteredPatients, or rowsPerPage changes
  // Reset current page when searchTerm or filteredPatients length changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filteredPatients.length]);

  // Optional: adjust rowsPerPage if it exceeds array length
  useEffect(() => {
    if (rowsPerPage > displayedPatients.length) {
      setRowsPerPage(Math.max(5, displayedPatients.length));
    }
  }, [displayedPatients.length]);

  const totalPages = Math.max(
    1,
    Math.ceil(displayedPatients.length / rowsPerPage)
  );

  const paginatedPatients = displayedPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const generatePageOptions = (total) => {
    const options = [5, 10, 25, 50].filter((n) => n < total);
    if (!options.includes(total)) options.push(total);
    return options;
  };

  // Utility: get heatmap color for score (0–100)
  const getHeatmapColor = (score) => {
    const r = score < 50 ? 255 : Math.floor(255 - (score - 50) * 5.1); // red fades after 50
    const g = score > 50 ? 255 : Math.floor(score * 5.1); // green grows after 50
    const b = 0;
    return `rgb(${r}, ${g}, ${b})`;
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [profpat, setshowprofpat] = useState([]);
  const [showprof, setshowprof] = useState(false);
  const [expand, setexpand] = useState(false);

  const [selectedIDs, setSelectedIDs] = useState({});

  const [vipchanged, setVipChanged] = useState(false);

  useEffect(() => {
    if (profpat?.id_proofs) {
      const existing = {};
      const inputs = {};
      Object.keys(profpat.id_proofs).forEach((key) => {
        existing[key] = profpat.id_proofs[key].number;
        inputs[key] = profpat.id_proofs[key].number;
      });
      setSelectedIDs(existing);
    }
  }, [profpat]);

  const handlevipstatus = async (uhid, vip) => {
    // console.log("Status", vip);
    let vip1 = "";
    if (String(vip) === "true") {
      vip1 = "false";
    } else {
      vip1 = "true";
    }
    const payload = {field: "vip_status", value: vip1 };
    // console.log("Status payload", payload);
    try {
      // ✅ API call
      const response = await axios.patch(
        `${API_URL}patients/update-field/${uhid}`,
        payload
      );

      showWarning("Patient vip status update successfull");
      setVipChanged(true);
    } catch (error) {
      console.error("Error updating status:", error);
      showWarning("Failed to update status");
    }
  };

  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const doctorUhid = sessionStorage.getItem("doctor");

    if (doctorUhid) {
      axios
        .get(`${API_URL}getdoctorname/${doctorUhid}`)
        .then((res) => {
          if (res.data?.doctor_name) {
            sessionStorage.setItem("doctorName", res.data.doctor_name);
            setDoctorName(res.data.doctor_name);
          }
        })
        .catch((err) => {
          console.error("❌ Error fetching doctor name:", err);
        });
    }
  }, []);

   const messages = [
    "Fetching patients from the database...",
    "Almost there, preparing data...",
    "Optimizing results...",
    "Hang tight! Just a moment...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full ${
        width >= 1200 ? "overflow-y-hidden" : "overflow-y-auto"
      } h-full flex flex-col pt-8 pb-12 inline-scroll ${
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
          Marked Patients
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
               Dr. {doctorName || "Doctor Name"}
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
          <div ref={dropdownRef} className={`${raleway.className} relative`}>
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
              <div className="absolute left-0 max-h-[500px] overflow-y-auto mt-2 w-56 bg-white border rounded shadow-md z-10 p-4 text-base text-gray-700 inline-scroll">
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
            onClick={handleClearAll}
            className={`${raleway.className} text-[#2B2B2B] font-semibold text-sm w-1/2 cursor-pointer`}
          >
            Clear All
          </p>
        </div>
      </div>

      <div
        className={`w-full flex flex-col gap-2 ${
          width >= 1000 ? "h-[89%]" : "h-[98%] pb-4"
        } ${width < 640 ? "mt-8" : ""}`}
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
            {generatePageOptions(displayedPatients.length).map((count) => (
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
           {patientloading ? (
            <div className="flex space-x-2 w-full justify-center">
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className={`${poppins.className} text-black font-semibold`}>
                {messages[index]}
              </span>
            </div>
          ) :
          paginatedPatients.length > 0 ? (
            paginatedPatients.map((patient, index) => (
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
                      onClick={() => {
                        setshowprof(true);
                        setshowprofpat(patient);
                      }}
            
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
                    <div className="w-full flex flex-col items-center relative group">
                      {/* Hover Percentage Text */}
                      <div className="absolute -top-7 left-0 transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-sm font-semibold text-black border-2 border-black px-3 rounded-lg">
                        {`${getOverallScore(patient, side) ?? 0}%`}
                      </div>

                      {/* Progress Bar Container */}
                      <div
                        className="relative w-full h-1.5 overflow-hidden bg-[#E5E5E5] cursor-pointer"
                        onClick={() => {
                          setisOpencompliance(true);
                        }}
                      >
                        <div
                          className="h-full rounded"
                          style={{
                            width: `${Number(
                              getOverallScore(patient, side) ?? 0
                            )}%`,
                            background: getHeatmapColor(
                              Number(getOverallScore(patient, side) ?? 0)
                            ),
                            backgroundSize: "200% 100%",
                          }}
                        ></div>
                      </div>
                    </div>
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
                        onClick={() => {
                          handlenavigatereport();
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem(
                              "patientreportid",
                              patient.uhid
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p
              className={` ${raleway.className} text-center text-lg font-medium text-gray-400`}
            >
              No Patients found
            </p>
          )}
        </div>
      </div>

      {showAlert && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`${poppins.className} bg-yellow-100 border border-red-400 text-yellow-800 px-6 py-3 rounded-lg shadow-lg animate-fade-in-out`}
          >
            {alermessage}
          </div>
        </div>
      )}

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

      {showprof &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-40 "
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // white with 50% opacity
            }}
          >
            <div
              className={`
                  min-h-[100vh]  flex flex-col items-center justify-center mx-auto my-auto
                  ${width < 950 ? "gap-4 w-full" : "w-5/6"}
                  ${expand ? "w-full" : "p-4"}
                `}
            >
              <div
                className={`w-full bg-[#FCFCFC]  p-4  overflow-y-auto overflow-x-hidden inline-scroll ${
                  width < 1095 ? "flex flex-col gap-4" : ""
                } ${expand ? "max-h-[100vh]" : "max-h-[92vh] rounded-2xl"}`}
              >
                <div
                  className={`w-full bg-[#FCFCFC]  ${
                    width < 760 ? "h-fit" : "h-[80%]"
                  } `}
                >
                  <div
                    className={`w-full h-full rounded-lg flex flex-col gap-12 ${
                      width < 760 ? "py-0" : "py-4 px-8"
                    }`}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <div className="flex flex-col">
<p
                        className={`${inter.className} text-2xl font-semibold text-black`}
                      >
                        Patient Profile
                      </p>
                      <p
                        className={`${inter.className} text-sm font-semibold text-black cursor-pointer`}
                        onClick={()=>{handlevipstatus(profpat?.uhid, String(profpat?.vip));}}
                      >
                        VIP SWITCH
                      </p>
                      </div>
                      <div
                        className={`flex flex-row gap-4 items-center justify-center`}
                      >
                        {expand ? (
                          <Image
                            src={ShrinkIcon}
                            onClick={() => {
                              setexpand(false);
                            }}
                            alt="Expand"
                            className={`w-6 h-6 cursor-pointer`}
                          />
                        ) : (
                          <Image
                            src={ExpandIcon}
                            onClick={() => {
                              setexpand(true);
                            }}
                            alt="Expand"
                            className={`w-12 h-6 cursor-pointer`}
                          />
                        )}
                        <Image
                          src={CloseIcon}
                          alt="Close"
                          className={`w-fit h-6 cursor-pointer`}
                          onClick={() => {
                            setshowprof(false);
                            if(vipchanged){
                            window.location.reload();
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className={`w-full flex gap-12 ${
                        width >= 1200 ? "flex-row" : "flex-col"
                      }`}
                    >
                      <div
                        className={`flex gap-4 ${
                          width >= 1200 ? "w-1/2" : "w-full"
                        } ${width < 700 ? "flex-col" : "flex-row"}`}
                      >
                        <div
                          className={`flex flex-col gap-2 ${
                            width < 700 ? "w-full" : "w-1/2"
                          }`}
                        >
                          <p
                            className={` ${outfit.className} font-bold uppercase text-base text-black/80`}
                          >
                            Name
                          </p>
                          <p
                            className={`w-full text-black
                                font-medium
                                text-lg
                                ${inter.className}`}
                          >
                            {profpat?.name}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex flex-col gap-2 ${
                          width >= 1200 ? "w-1/2" : "w-full"
                        }`}
                      >
                        <p
                          className={` ${outfit.className} font-bold uppercase text-base text-black/80`}
                        >
                          UHID
                        </p>
                        <p
                          className={`w-full text-black
                                font-medium
                                text-lg
                                ${inter.className}`}
                        >
                          {profpat?.uhid}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex gap-12 ${
                        width >= 1200 ? "flex-row" : "flex-col"
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-8 ${
                          width >= 1200 ? "w-1/2" : "w-full"
                        }`}
                      >
                        <div
                          className={`w-full flex  gap-8 ${
                            width < 700 ? "flex-col" : "flex-row"
                          }`}
                        >
                          {/* Gender Dropdown */}
                          <div
                            className={`flex flex-col gap-2 ${
                              width < 700 ? "w-full" : "w-1/3"
                            }`}
                          >
                            <p
                              className={`${outfit.className} font-bold uppercase text-base text-black/80`}
                            >
                              Gender
                            </p>
                            <p
                              className={`w-full text-black
                                font-medium
                                text-lg
                                ${inter.className}`}
                            >
                              {profpat?.gender}
                            </p>
                          </div>

                          {/* Date of Birth Input */}
                          <div
                            className={`flex flex-col gap-2.5 ${
                              width < 700 ? "w-full" : "w-1/3"
                            }`}
                          >
                            <p
                              className={`${outfit.className} font-bold uppercase text-base text-black/80`}
                            >
                              Date of Birth
                            </p>
                            <p
                              className={`w-full text-black
                                font-medium
                                text-lg
                                ${inter.className}`}
                            >
                              {profpat?.dob}
                            </p>
                          </div>
                        </div>

                        <div className={`w-full flex flex-col gap-2`}>
                          <p
                            className={`${outfit.className} font-bold uppercase text-base text-black/80`}
                          >
                            Phone Number
                          </p>

                          <div className="flex items-center gap-2">
                            <span className="text-black/90">
                              {profpat?.phone || "NA"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex flex-col gap-2 justify-between ${
                          width >= 1200 ? "w-1/2" : "w-full"
                        }`}
                      >
                        <div
                          className={`w-full flex  gap-2 ${
                            width < 700 ? "flex-col" : "flex-row"
                          }`}
                        >
                          <div
                            className={`flex flex-col gap-2 ${
                              width < 700 ? "w-full" : "w-4/7"
                            }`}
                          >
                            <p
                              className={`${outfit.className} font-bold uppercase text-base text-black/80`}
                            >
                              Address
                            </p>

                            <div className="flex items-center gap-2">
                              <span className="text-black/90">
                                {profpat?.address || "Not provided"}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`flex items-center justify-center ${
                              width < 700 ? "w-full" : "w-3/7"
                            }`}
                          >
                            <Image
                              src={profpat?.avatar}
                              alt="Upload Profile"
                              className={`w-full h-full`}
                              width={60}
                              height={60}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex gap-12 ${
                        width >= 1200 ? "flex-row" : "flex-col"
                      }`}
                    >
                      <div className={`w-full flex flex-col gap-2`}>
                        <p
                          className={`${outfit.className} font-bold uppercase text-base text-black/80`}
                        >
                          Email
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="text-black/90">
                            {profpat?.email || "NA"}
                          </span>
                        </div>
                      </div>

                      <div className={`w-full flex flex-col gap-2`}>
                        <p
                          className={`${outfit.className} font-bold uppercase text-base text-black/80`}
                        >
                          Alternate Phone Number
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="text-black/90">
                            {profpat?.alterphone || "NA"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex flex-col">
                      <p
                        className={`${outfit.className} font-bold text-base text-black/80`}
                      >
                        ID PROOF
                      </p>
                        <div className="flex flex-wrap justify-between w-full">
                        {Object.keys(selectedIDs).map((id) => {
                          const value = selectedIDs[id] || "";
                          // ✅ Mask last 5 characters
                          const masked =
                            value.length > 5
                              ? value.slice(0, -5) + "*****"
                              : "*".repeat(value.length);

                          return (
                            <div key={id} className="flex flex-col gap-2 mt-2">
                              <label
                                className={`${outfit.className} text-base font-semibold uppercase text-black/80`}
                              >
                                {id} Number
                              </label>

                              <div className="flex items-center gap-2">
                                <span className="text-black/90">{masked}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showAlert && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`${poppins.className} bg-yellow-100 border border-red-400 text-yellow-800 px-6 py-3 rounded-lg shadow-lg animate-fade-in-out`}
          >
            {alermessage}
          </div>
        </div>
      )}
            <style>
              {`
              .inline-scroll::-webkit-scrollbar {
                width: 12px;
              }
              .inline-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .inline-scroll::-webkit-scrollbar-thumb {
                background-color: #076C40;
                border-radius: 8px;
              }
        
              .inline-scroll {
                scrollbar-color: #076C40 transparent;
              }
            `}
            </style>
          </div>,
          document.body // portal target
        )}
    </div>
  );
};

export default Markedpatient;
