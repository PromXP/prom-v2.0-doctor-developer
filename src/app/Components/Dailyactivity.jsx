"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import axios from "axios";
import { API_URL } from "../libs/global";

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
import Womanavatar from "@/app/Assets/woman.png";

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

const Dailyactivity = ({
  handlenavigatereport,
  handlenavigatesurgeryreport,
}) => {
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

  const [patientdata, setPatientdata] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [showAlert, setshowAlert] = useState(false);
  const [alermessage, setAlertMessage] = useState("");

  const showWarning = (message) => {
    setAlertMessage(message);
    setshowAlert(true);
    setTimeout(() => setshowAlert(false), 4000);
  };

  // 🛠️ Extract numeric score from score string
  const extractScore = (scoreStr) => {
    if (!scoreStr || typeof scoreStr !== "string") return null;
    const match = scoreStr.match(/:\s*(\d+)/); // capture first number
    return match ? parseFloat(match[1]) : null;
  };

  // 🛠️ Compute overall scores for a side
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
          `${API_URL}patients/by-doctor-uhid/${adminUhid}`
        );
        // console.log("✅ API Response:", res.data);

        // setPatients1(res.data.patients || []);

        const apiPatients = res.data.patients || [];

        // 🔄 Map API data → static UI format
        const mapped = apiPatients.map((p, i) => {
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
            uhid: p.uhid,
            dob: p.Patient?.birthDate ?? "NA",
            period: p.Patient_Status_Left || "NA",
            period_right: p.Patient_Status_Right || "NA",
            status: i % 3 === 0 ? "COMPLETED" : "PENDING",
            left_compliance: p.Medical_Left_Completion ?? 0,
            right_compliance: p.Medical_Right_Completion ?? 0,
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
              p.Patient?.gender?.toLowerCase() === "male"
                ? ManAvatar
                : Womanavatar,
          };
        });

        
        setPatientdata(mapped);
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

  useEffect(() => {
    if (patientdata.length > 0) {
      setSelectedId(patientdata[0].uhid);
    }
  }, [patientdata]);

  const selectedPatient = patientdata.find((p) => p.uhid === selectedId);

  const questionnaireNameMap = {
    oks: "Oxford Knee Score (OKS)",
    oxford_knee_score: "Oxford Knee Score (OKS)",
    sf12: "Short Form - 12 (SF-12)",
    sf_12: "Short Form - 12 (SF-12)",
    kss: "Knee Society Score (KSS)",
    knee_society_score: "Knee Society Score (KSS)",
    koos_jr:
      "Knee Injury and Osteoarthritis Outcome Score, Joint Replacement (KOOS JR)",
    fjs: "Forgotten Joint Score (FJS)",
    forgotten_joint_score: "Forgotten Joint Score (FJS)",
  };

  function getFullQuestionnaireName(label) {
    const key = label.toLowerCase().replace(/\s+/g, "_"); // normalize
    return questionnaireNameMap[key] || label; // fallback if not in map
  }

  function isWithinPeriod(currentPeriod, checkPeriod) {
    const validOrder = ["Pre Op", "6W", "3M", "6M", "1Y", "2Y"];

    const currentIndex = validOrder.indexOf(currentPeriod);
    const checkIndex = validOrder.indexOf(checkPeriod);

    if (currentIndex === -1 || checkIndex === -1) {
      return false; // invalid periods
    }

    return checkIndex <= currentIndex;
  }

  function getPendingQuestionnaires(patient) {
    const pending = [];

    if (patient.doctor_left === patient.doctor && patient.left_questionnaires) {
      Object.entries(patient.left_questionnaires).forEach(([label, qset]) => {
        if (qset) {
          Object.entries(qset).forEach(([period, q]) => {
            if (isWithinPeriod(patient.period, period) && !q.completed) {
              pending.push({
                label: getFullQuestionnaireName(label), // ✅ use full name
                side: "L",
                period,
              });
            }
          });
        }
      });
    }

    if (
      patient.doctor_right === patient.doctor &&
      patient.right_questionnaires
    ) {
      Object.entries(patient.right_questionnaires).forEach(([label, qset]) => {
        if (qset) {
          Object.entries(qset).forEach(([period, q]) => {
            if (isWithinPeriod(patient.period_right, period) && !q.completed) {
              pending.push({
                label: getFullQuestionnaireName(label), // ✅ use full name
                side: "R",
                period,
              });
            }
          });
        }
      });
    }

    return pending;
  }

  // helper to safely sum scores from questionnaire objects
  const generateBarData = (patients) => {
    // Totals
    let oksLeft = 0,
      oksRight = 0,
      sf12Left = 0,
      sf12Right = 0,
      koosLeft = 0,
      koosRight = 0,
      fjsLeft = 0,
      fjsRight = 0,
      kssLeft = 0,
      kssRight = 0;

    patients.forEach((p) => {
      // ✅ Left side
      if (p.doctor_left === p.doctor && p.overall_scores?.left) {
        oksLeft += parseFloat(p.overall_scores.left.OKS ?? 0);
        sf12Left += parseFloat(p.overall_scores.left.SF12 ?? 0);
        koosLeft += parseFloat(p.overall_scores.left.KOOS_JR ?? 0);
        fjsLeft += parseFloat(p.overall_scores.left.FJS ?? 0);
        kssLeft += parseFloat(p.overall_scores.left.KSS ?? 0);
      }

      // ✅ Right side
      if (p.doctor_right === p.doctor && p.overall_scores?.right) {
        oksRight += parseFloat(p.overall_scores.right.OKS ?? 0);
        sf12Right += parseFloat(p.overall_scores.right.SF12 ?? 0);
        koosRight += parseFloat(p.overall_scores.right.KOOS_JR ?? 0);
        fjsRight += parseFloat(p.overall_scores.right.FJS ?? 0);
        kssRight += parseFloat(p.overall_scores.right.KSS ?? 0);
      }
    });

    // ✅ Return grouped bardata
    return [
      { name: "OKS", left: oksLeft, right: oksRight },
      { name: "SF-12", left: sf12Left, right: sf12Right },
      { name: "KOOS, JR", left: koosLeft, right: koosRight },
      { name: "FJS", left: fjsLeft, right: fjsRight },
      { name: "KSS", left: kssLeft, right: kssRight },
    ];
  };

  // usage
  const bardata = generateBarData(patientdata);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const left = payload.find((p) => p.dataKey === "left")?.value ?? 0;
      const right = payload.find((p) => p.dataKey === "right")?.value ?? 0;

      return (
        <div
          className={`${poppins.className} bg-white p-2 shadow-md rounded text-sm`}
        >
          <p className="font-semibold text-black">{label}</p>
          <p className="text-blue-600">Left: {left}</p>
          <p className="text-pink-600">Right: {right}</p>
        </div>
      );
    }
    return null;
  };

  const [preOpCount, setPreOpCount] = useState(0);
  const [postOpCount, setPostOpCount] = useState(0);

  useEffect(() => {
    if (!patientdata || patientdata.length === 0) return;

    let pre = 0;
    let post = 0;
    let pre_left=0;
    let post_left=0;
    let pre_right=0;
    let post_right=0;
    console.log("🔄 Mapped Patients:", patientdata);

    patientdata.forEach((p) => {
      // ✅ Left side condition
      if (p.doctor_left === p.doctor && p.period) {
        if (p.period === "Pre Op") 
          pre_left++;
        else post_left++;
      }

      // ✅ Right side condition
      if (p.doctor_right === p.doctor && p.period_right) {
        if (p.period_right === "Pre Op") pre_right++;
        else  post_right++;
      }
    });

    setPreOpCount(pre_left+pre_right);
    setPostOpCount(post_left+post_right);
  }, [patientdata]); // recalc when patients or doctor changes

  return (
    <div
      className={`w-full overflow-y-auto h-full flex flex-col py-8 ${
        width >= 500 ? "px-12" : "px-8"
      } rounded-4xl gap-8 inline-scroll`}
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
          Daily Activity
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
        className={`w-full flex gap-8 ${
          width >= 1000 ? "flex-row" : "flex-col h-fit"
        }`}
      >
        <div
          className={`${
            width >= 1000 ? "w-1/3" : "w-full h-full"
          } flex flex-col gap-4`}
        >
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
                    className={`w-full flex ${
                      width >= 1350
                        ? "flex-row"
                        : width < 1350 && width >= 1000
                        ? "flex-col"
                        : width < 1000 && width >= 600
                        ? "flex-row"
                        : "flex-col gap-2"
                    }`}
                  >
                    <div
                      className={` flex items-start ${
                        width < 710 ? "flex-col" : "flex-row"
                      }
                        
                    ${
                      width >= 1350
                        ? "w-1/2"
                        : width < 1350 && width >= 1000
                        ? "w-full"
                        : width < 1000 && width >= 600
                        ? "w-1/2"
                        : "w-full"
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
                            {selectedPatient?.name ?? "Patient Name"}
                          </p>
                        </div>
                        <p
                          className={`${
                            poppins.className
                          } font-normal text-sm text-[#0F0F0F] ${
                            width < 530 ? "text-center" : "text-start"
                          }`}
                        >
                          {selectedPatient
                            ? `${selectedPatient.age}, ${selectedPatient.gender}`
                            : "Age, Gender"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col

                      ${
                        width >= 1350
                          ? "w-1/2 gap-2 justify-end"
                          : width < 1350 && width >= 1000
                          ? "w-full justify-start"
                          : width < 1000 && width >= 600
                          ? "w-1/2 gap-2 justify-end"
                          : "w-full justify-start"
                      }

                      `}
                    >
                      <p
                        className={`${
                          inter.className
                        } text-[#484848] font-semibold text-base ${
                          width < 530 ? "w-full text-center" : "w-full text-end"
                        }
                          ${
                            width >= 1350
                              ? "text-end"
                              : width < 1350 && width >= 1000
                              ? "text-start"
                              : width < 1000 && width >= 600
                              ? "text-end"
                              : width < 600 && width >= 530
                              ? "text-start"
                              : "text-center"
                          }

                          `}
                      >
                        {selectedPatient ? (
                          <>
                            L:{" "}
                            {selectedPatient.doctor_left ===
                            selectedPatient.doctor
                              ? selectedPatient.period
                              : "NA"}
                            <br />
                            R:{" "}
                            {selectedPatient.doctor_right ===
                            selectedPatient.doctor
                              ? selectedPatient.period
                              : "NA"}
                          </>
                        ) : (
                          <>
                            L: NA
                            <br />
                            R: NA
                          </>
                        )}
                      </p>
                      <p
                        className={`uppercase ${
                          poppins.className
                        } font-medium text-base text-[#222222] opacity-50 
                        
                        ${
                          width >= 1350
                            ? "text-end"
                            : width < 1350 && width >= 1000
                            ? "text-start"
                            : width < 1000 && width >= 600
                            ? "text-end"
                            : width < 600 && width >= 530
                            ? "text-start"
                            : "text-center"
                        }

                        `}
                      >
                        {selectedPatient ? selectedPatient.uhid : "UHID"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`w-full flex ${
                width >= 530 ? "flex-row" : "flex-col"
              } gap-4`}
            >
              <div className={`${width >= 530 ? "w-3/4" : "w-full"}`}>
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
                className={`${
                  width >= 530
                    ? "w-1/4 flex-col items-center gap-8"
                    : "w-full flex-row items-center gap-4"
                } flex   justify-between `}
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
                className={`w-full flex flex-col ${raleway.className} font-semibold text-xs text-[#696969] gap-1 max-h-40 overflow-y-auto inline-Scroll`}
              >
                {selectedPatient ? (
                  getPendingQuestionnaires(selectedPatient).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg px-3 py-1.5 hover:bg-[#f1f1f1] transition"
                      >
                        <span className="font-semibold text-gray-800  w-2/3">
                          {item.label}
                        </span>
                        <div className="flex gap-2 text-[10px] font-medium w-1/3 justify-between">
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 w-fit">
                            {item.side}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 w-fit">
                            {item.period}
                          </span>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <span className="text-gray-400 text-center py-2">
                    No pending questionnaires
                  </span>
                )}
              </div>
            </div>
            <div
              className={`w-full flex ${
                width >= 1300
                  ? "flex-row gap-12"
                  : "flex-col items-center gap-6"
              } 
              ${
                width >= 1350
                  ? "flex-row gap-12"
                  : width < 1350 && width >= 1000
                  ? "flex-col items-center gap-6"
                  : width < 1000 && width >= 600
                  ? "flex-row gap-12"
                  : "flex-col items-center gap-6"
              }`}
            >
              <p
                className={`${
                  width >= 400 ? "w-1/2" : "w-2/3"
                } text-center bg-[#2A343D] px-4 py-1 text-white ${
                  inter.className
                } font-medium text-[15px] rounded-[10px] cursor-pointer`}
                onClick={handlenavigatesurgeryreport}
              >
                Surgery
              </p>
              <p
                className={`${
                  width >= 400 ? "w-1/2" : "w-2/3"
                } text-center bg-[#2A343D] px-4 py-1 text-white ${
                  inter.className
                } font-medium text-[15px] rounded-[10px] cursor-pointer`}
                onClick={handlenavigatereport}
              >
                View Report
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${
            width >= 1000 ? "w-2/3" : "w-full h-full min-h-[600px]"
          } flex flex-col justify-between gap-2 border-[#EBEBEB] border-[1.3px] rounded-[10px] py-4 px-4 h-full`}
        >
          <p
            className={`${inter.className} font-bold text-[22px] text-[#2B333E]`}
          >
            Overall Patient Stats
          </p>
          <div
            className={`w-full flex ${
              width >= 700 ? "flex-row px-6" : "flex-col gap-6"
            } `}
          >
            <p
              className={`${
                poppins.className
              } font-medium text-base text-[#475467] opacity-50 ${
                width >= 700 ? "w-2/5" : "w-full"
              }`}
            >
              Comparison of scores over questionnaires
            </p>
            <div
              className={`${
                width >= 700 ? "w-3/5 justify-end" : "w-full justify-center"
              } flex flex-row gap-6 `}
            >
              <div className={`w-fit flex flex-col items-center gap-1`}>
                <p
                  className={`${inter.className} font-bold text-2xl text-white py-1.5 px-4 bg-[#2A343D] rounded-[10px]`}
                >
                  {preOpCount??"NA"}
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
                  {postOpCount??"NA"}
                </p>
                <p
                  className={`${raleway.className} font-medium text-[10px] text-[#2B2B2B]`}
                >
                  Post Op
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-full pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bardata}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
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
                  axisLine={false}
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
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} />

                {/* ✅ Two bars per questionnaire */}
                <Bar
                  dataKey="left"
                  fill="#8884d8"
                  radius={[8, 8, 0, 0]}
                  barSize={22}
                />
                <Bar
                  dataKey="right"
                  fill="#82ca9d"
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
          {patientdata.map((patient) => {
            const isSelected = selectedId === patient.uhid;

            return (
              <div
                key={patient.uhid}
                onClick={() => setSelectedId(patient.uhid)}
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
                    className={`uppercase ${
                      poppins.className
                    } font-medium text-base opacity-50 ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    ID: {patient.uhid}
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
                    L:{" "}
                    {patient.doctor_left === patient.doctor
                      ? patient.period
                      : "NA"}
                  </p>
                  <p
                    className={`font-semibold text-sm ${
                      isSelected ? "text-white" : "text-black"
                    }`}
                  >
                    R:{" "}
                    {patient.doctor_right === patient.doctor
                      ? patient.period_right
                      : "NA"}
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

      {showAlert && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`${poppins.className} bg-yellow-100 border border-red-400 text-yellow-800 px-6 py-3 rounded-lg shadow-lg animate-fade-in-out`}
          >
            {alermessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dailyactivity;
