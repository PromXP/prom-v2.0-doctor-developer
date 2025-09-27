"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";

import axios from "axios";
import { API_URL } from "../libs/global";

import { Raleway, Inter, Poppins, Outfit } from "next/font/google";
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

  const [patientdata, setPatientdata] = useState([]);
  const [patientloading, setPatientloading] = useState(true);

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

  const KOOSJR_MAP = [
    100.0, 91.975, 84.6, 79.914, 76.332, 73.342, 70.704, 68.284, 65.994, 63.776,
    61.583, 59.381, 57.14, 54.84, 52.465, 50.012, 47.487, 44.905, 42.281,
    39.625, 36.931, 34.174, 31.307, 28.251, 24.875, 20.941, 15.939, 8.291, 0.0,
  ];

  // 🛠️ Compute overall scores for a side
  const calculateOverallScores = (sideData) => {
    if (!sideData || sideData === "NA") return {};

    const questionnaires = {};

    for (const [qName, periods] of Object.entries(sideData)) {
      for (const [period, qData] of Object.entries(periods || {})) {
        let numScore = extractScore(qData?.score);
        if (numScore !== null) {
          if (qName === "KOOS_JR") {
            // Ensure score is an integer index within 0–29

            numScore = KOOSJR_MAP[numScore];
          }
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

  function getCombinedAverage(left, right) {
    const maxScores = {
      OKS: 48,
      SF12: 100,
      FJS: 60,
      KOOS_JR: 100,
      KSS: 100,
    };

    const keys = new Set([...Object.keys(left), ...Object.keys(right)]);
    let total = 0;
    let count = 0;

    keys.forEach((key) => {
      const max = maxScores[key] || 100; // default to 100 if missing
      const l = parseFloat(left[key] ?? 0);
      const r = parseFloat(right[key] ?? 0);

      if (l) {
        total += (l / max) * 100; // normalize to 100
        count++;
      }
      if (r) {
        total += (r / max) * 100; // normalize to 100
        count++;
      }
    });

    return count > 0 ? (total / count).toFixed(2) : "NA";
  }

  let adminUhid = null;
  useEffect(() => {
    const fetchPatients = async () => {
      try {
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

        // 🔄 Map API data → static UI format
        const mapped = apiPatients.map((p, i) => {
          // ✅ Only calculate if doctor is assigned
          // assume doctorUhid = res.data[0]?.uhid
          const doctorUhid = res.data[0]?.uhid;

          const leftOverallScores =
            p.Practitioners?.left_doctor === doctorUhid
              ? calculateOverallScores(p.Medical_Left)
              : {};

          const rightOverallScores =
            p.Practitioners?.right_doctor === doctorUhid
              ? calculateOverallScores(p.Medical_Right)
              : {};

          const overallCombined = getCombinedAverage(
            leftOverallScores,
            rightOverallScores
          );

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
            period_left_reverse: p.Patient_Status_Left_Reverse || "NA",
            period_right_reverse: p.Patient_Status_Right_Reverse || "NA",
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
            doctor: res.data[0]?.uhid ?? "NA",
            vip: p.VIP_Status ?? false,
            opd: p.Appointments?.[0].start ?? "NA",

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
            height: p.Medical?.height
              ? p.Medical.height.match(/[\d.]+/)?.[0] || "NA"
              : "NA",

            weight: p.Medical?.weight
              ? p.Medical.weight.match(/[\d.]+/)?.[0] || "NA"
              : "NA",

            bmi:
              p.Medical?.height && p.Medical?.weight
                ? (() => {
                    const h = parseFloat(p.Medical.height.match(/[\d.]+/)?.[0]);
                    const w = parseFloat(p.Medical.weight.match(/[\d.]+/)?.[0]);
                    return h && w
                      ? (w / Math.pow(h / 100, 2)).toFixed(1)
                      : "NA";
                  })()
                : "NA",
            total_combined: overallCombined,
          };
        });

        setPatientloading(false);
        setPatientdata(mapped);
        // console.log("Mapped doctor", mapped);
      } catch (err) {
        setPatientloading(false);
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

  const today = new Date().toISOString().split("T")[0];

  // helpers (put near top of your file)
  const getDateOnly = (val) => {
    if (!val) return null;
    let v = val;

    // handle arrays or objects with start/date
    if (Array.isArray(v)) v = v[0];
    if (typeof v === "object") {
      if (v.start) v = v.start;
      else if (v.date) v = v.date;
      else return null;
    }

    // already in YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(String(v))) return String(v);

    const d = new Date(v);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0];
  };

  const checkGetSurgery = async (uhid, key) => {
    // returns true if "exists" (we should block), false if not exists or error/404
    try {
      const res = await axios.get(
        `${API_URL}get-surgery/${uhid.toLowerCase()}/${key}`
      );
      // treat non-empty response data as existing record
      if (res && res.data && Object.keys(res.data).length > 0) return true;
      return false;
    } catch (err) {
      // 404 or network errors => treat as not found (allow)
      if (err?.response?.status === 404) return false;
      // log for debugging, but return false to allow
      console.warn(
        "get-surgery error (treat as not found):",
        err?.message || err
      );
      return false;
    }
  };

  // main async filter function
  const filterPatients = async (patients = []) => {
    const adminUhid =
      typeof window !== "undefined" ? sessionStorage.getItem("doctor") : null;
    const todayLocal = new Date();
    const yyyy = todayLocal.getFullYear();
    const mm = String(todayLocal.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const dd = String(todayLocal.getDate()).padStart(2, "0");

    const today = `${yyyy}-${mm}-${dd}`;
    // console.log("Today", today);

    const allowedPatients = [];



    for (const p of patients) {
      let allowed = false;
      let matchedSide = null;
      let matchedReason = null;

      // normalize dates
      const leftSurgery = getDateOnly(p.surgery_left);
      const rightSurgery = getDateOnly(p.surgery_right);

      // try picking per-side OPD if available, else fall back to general p.opd
      const generalOpd = getDateOnly(p.opd ?? null);
      const leftOpdDate = generalOpd;
      const rightOpdDate = generalOpd;

      // === Priority checks ===
      // 1) Left OPD (only if admin is left doctor)
      if (!allowed && p.doctor_left === adminUhid && leftOpdDate === today) {
        const exists = await checkGetSurgery(p.uhid, `op-${leftOpdDate}`); // using "op-" prefix for OPD
        if (!exists) {
          allowed = true;
          matchedSide = "left";
          matchedReason = "opd";
        } else {
          allowed = false; // explicitly blocked by existing record
        }
      }

      // 2) Right OPD (only if admin is right doctor)
      if (!allowed && p.doctor_right === adminUhid && rightOpdDate === today) {
        const exists = await checkGetSurgery(p.uhid, `op-${rightOpdDate}`);
        if (!exists) {
          allowed = true;
          matchedSide = "right";
          matchedReason = "opd";
        } else {
          allowed = false;
        }

        if(p.activation_status){
          allowed=true;
        }else{
          allowed=false;
        }
      }

      // 3) Left surgery
      if (!allowed && p.doctor_left === adminUhid && leftSurgery === today) {
        const exists = await checkGetSurgery(p.uhid, "op-" + leftSurgery); // surgery uses plain date key
        if (!exists) {
          allowed = true;
          matchedSide = "left";
          matchedReason = "surgery";
        } else {
          allowed = false;
        }
      }

      // 4) Right surgery
      if (!allowed && p.doctor_right === adminUhid && rightSurgery === today) {
        const exists = await checkGetSurgery(p.uhid, "op-" + rightSurgery);
        if (!exists) {
          allowed = true;
          matchedSide = "right";
          matchedReason = "surgery";
        } else {
          allowed = false;
        }
      }

      if (allowed) {
        allowedPatients.push({ ...p, matchedSide, matchedReason });
      }
    }

    return allowedPatients;
  };

  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const fetchFilteredPatients = async () => {
      const patients = await filterPatients(patientdata);
      setFilteredPatients(patients);
    };

    fetchFilteredPatients();
  }, [patientdata]);

  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    if (filteredPatients.length > 0 && !selectedId) {
      setSelectedId(filteredPatients[0].uhid);
    }
  }, [selectedId, filteredPatients]);

  const selectedPatient = filteredPatients.find((p) => p.uhid === selectedId);

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
            if (
              isWithinPeriod(patient.period_left_reverse, period) &&
              !q.completed
            ) {
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
            if (
              isWithinPeriod(patient.period_right_reverse, period) &&
              !q.completed
            ) {
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

    let leftCount = 0;
    let rightCount = 0;

    patients.forEach((p) => {
      // ✅ Left side
      if (p.doctor_left === p.doctor && p.overall_scores?.left) {
        oksLeft += parseFloat(p.overall_scores.left.OKS ?? 0);
        sf12Left += parseFloat(p.overall_scores.left.SF12 ?? 0);
        koosLeft += parseFloat(p.overall_scores.left.KOOS_JR ?? 0);
        fjsLeft += parseFloat(p.overall_scores.left.FJS ?? 0);
        kssLeft += parseFloat(p.overall_scores.left.KSS ?? 0);
        leftCount++;
      }

      // ✅ Right side
      if (p.doctor_right === p.doctor && p.overall_scores?.right) {
        oksRight += parseFloat(p.overall_scores.right.OKS ?? 0);
        sf12Right += parseFloat(p.overall_scores.right.SF12 ?? 0);
        koosRight += parseFloat(p.overall_scores.right.KOOS_JR ?? 0);
        fjsRight += parseFloat(p.overall_scores.right.FJS ?? 0);
        kssRight += parseFloat(p.overall_scores.right.KSS ?? 0);
        rightCount++;
      }
    });

    // ✅ Return grouped bardata
    return [
      {
        name: "OKS",
        left: leftCount ? (oksLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (oksRight / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "SF-12",
        left: leftCount ? (sf12Left / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (sf12Right / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "KOOS, JR",
        left: leftCount ? (koosLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (koosRight / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "FJS",
        left: leftCount ? (fjsLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (fjsRight / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "KSS",
        left: leftCount ? (kssLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (kssRight / rightCount).toFixed(2) : "0.00",
      },
    ];
  };

  const generateBarDataselected = (p) => {
    // console.log("Selected for bardata", p);
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

    let leftCount = 0;
    let rightCount = 0;

    // ✅ Left side
    if (p.doctor_left === p.doctor && p.overall_scores?.left) {
      oksLeft += parseFloat(p.overall_scores.left.OKS ?? 0);
      sf12Left += parseFloat(p.overall_scores.left.SF12 ?? 0);
      koosLeft += parseFloat(p.overall_scores.left.KOOS_JR ?? 0);
      fjsLeft += parseFloat(p.overall_scores.left.FJS ?? 0);
      kssLeft += parseFloat(p.overall_scores.left.KSS ?? 0);
      leftCount++;
    }

    // ✅ Right side
    if (p.doctor_right === p.doctor && p.overall_scores?.right) {
      oksRight += parseFloat(p.overall_scores.right.OKS ?? 0);
      sf12Right += parseFloat(p.overall_scores.right.SF12 ?? 0);
      koosRight += parseFloat(p.overall_scores.right.KOOS_JR ?? 0);
      fjsRight += parseFloat(p.overall_scores.right.FJS ?? 0);
      kssRight += parseFloat(p.overall_scores.right.KSS ?? 0);
      rightCount++;
    }

    // ✅ Return grouped bardata
    return [
      {
        name: "OKS",
        left: leftCount ? (oksLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (oksRight / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "SF-12",
        left: leftCount ? (sf12Left / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (sf12Right / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "KOOS, JR",
        left: leftCount ? (koosLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (koosRight / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "FJS",
        left: leftCount ? (fjsLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (fjsRight / rightCount).toFixed(2) : "0.00",
      },
      {
        name: "KSS",
        left: leftCount ? (kssLeft / leftCount).toFixed(2) : "0.00",
        right: rightCount ? (kssRight / rightCount).toFixed(2) : "0.00",
      },
    ];
  };

  // usage
  const bardata = generateBarData(patientdata);

  const selectedbardata = generateBarDataselected(
    selectedPatient ? selectedPatient : {}
  );

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

  const [preLeft, setPreLeft] = useState(0);
  const [preRight, setPreRight] = useState(0);
  const [postLeft, setPostLeft] = useState(0);
  const [postRight, setPostRight] = useState(0);

  useEffect(() => {
    if (!patientdata || patientdata.length === 0) return;

    let pre = 0;
    let post = 0;
    let pre_left = 0;
    let post_left = 0;
    let pre_right = 0;
    let post_right = 0;

    patientdata.forEach((p) => {
      // ✅ Left side condition
      if (p.doctor_left === p.doctor && p.period) {
        if (p.period === "Pre Op") pre_left++;
        else post_left++;
      }

      // ✅ Right side condition
      if (p.doctor_right === p.doctor && p.period_right) {
        if (p.period_right === "Pre Op") pre_right++;
        else post_right++;
      }
    });

    setPreLeft(pre_left);
    setPreRight(pre_right);
    setPostLeft(post_left);
    setPostRight(post_right);
  }, [patientdata]); // recalc when patients or doctor changes

  const [profpat, setshowprofpat] = useState([]);
  const [showprof, setshowprof] = useState(false);
  const [expand, setexpand] = useState(false);

  const periods = [
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
  const sides = ["left", "right"];

  const handlevipstatus = async (uhid, vip) => {
    // console.log("Status", vip);
    let vip1 = "";
    if (String(vip) === "true") {
      vip1 = "false";
    } else {
      vip1 = "true";
    }
    const payload = {field: "vip_status", value: vip1 };
    // console.log("Status payload", payload + " " + vip1);
    // return;
    try {
      // ✅ API call
      const response = await axios.patch(
        `${API_URL}patients/update-field/${uhid}`,
        payload
      );

      showWarning("Patient vip status update successfull");
    } catch (error) {
      console.error("Error updating status:", error);
      showWarning("Failed to update status");
    }
  };

  const [showresetpassword, setshowresetpassword] = useState(false);

  useEffect(() => {
    let adminPassword = null;

    if (typeof window !== "undefined") {
      adminPassword = sessionStorage.getItem("doctor_password"); // 👈 safe access
    }

    if (adminPassword === "doctor@123") {
      setshowresetpassword(true);
    }
  }, []);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      showWarning("Please fill in both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      showWarning("Passwords do not match");
      return;
    }
    let adminUhid = null;
    if (typeof window !== "undefined") {
      adminUhid = sessionStorage.getItem("doctor"); // 👈 safe access
    }

    const payload = {
      uhid: adminUhid,
      role: "doctor",
      new_password: newPassword,
    };

    try {
      await axios.patch(`${API_URL}auth/reset-password`, payload);

      showWarning(`Password reset successfull`);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("doctor_password", newPassword); // 👈 safe access
      }
      window.location.reload();
    } catch (error) {
      console.error("Error reset password:", error);
      showWarning(`Failed to reset password for ${profpat?.uhid}`);
    }
  };

  const [side, setSide] = useState("left");
  const [period, setPeriod] = useState("");
  const [flexion, setFlexion] = useState("");
  const [extension, setExtension] = useState("");

  const handlesaveform = async () => {
    let op_date = "";
    if (side === "left") {
      op_date = selectedPatient?.surgery_left;
    } else {
      op_date = selectedPatient?.surgery_right;
    }
    if (!side || !period || !flexion || !extension) {
      showWarning("Please fill in all fields");
      return;
    } else {
      const payload = {
        uhid: selectedPatient?.uhid.toLowerCase(),
        period: period, // e.g., "Preop"
        field: "flexion", // "flexion" or "extension"
        value: flexion, // value for that motion
        op_date: `op-${op_date}`,
      };

      const payload1 = {
        uhid: selectedPatient?.uhid.toLowerCase(),
        period: period, // e.g., "Preop"
        field: "extension", // "flexion" or "extension"
        value: extension, // value for that motion
        op_date: `op-${op_date}`,
      };

      const payload3 = {
        field: "start_end", // "flexion" or "extension"
        value: "1001-01-01", // value for that motion
      };

      // console.log("Payload", payload3);

      try {
        const res = await axios.get(
          `${API_URL}get-surgery/${selectedPatient?.uhid.toLowerCase()}/${
            "op-" + op_date
          }`
        );
        if (res) {
          // console.log("Success1");
        }
      } catch (err) {
        showWarning("Surgery Report not found. Kindly add Surgery Report");
        setshowprof(false);
        return;
      }

      try {
        // ✅ API call
        const response = await axios.patch(
          `${API_URL}patient_surgery_details/update_field`,
          payload
        );

        const response1 = await axios.patch(
          `${API_URL}patient_surgery_details/update_field`,
          payload1
        );

        const response2 = await axios.patch(
          `${API_URL}patients/update-field/${selectedPatient?.uhid}`,
          payload3
        );

        showWarning("ROM submitted successfully");
        setshowprof(false);
      } catch (error) {
        console.error("Error submitting ROM:", error);
        showWarning("Failed to submit ROM");
      }
    }
  };

  const messages = [
    "Analyzing updates...",
    "Hang tight! Preparing today's patients...",
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
      className={`w-full overflow-y-auto h-full flex flex-col py-8 ${
        width >= 500 ? "px-12" : "px-8"
      } rounded-4xl gap-8 inline-scroll`}
    >
      <div
        className={`w-full flex ${
          width >= 700 ? "flex-row justify-between" : "flex-col gap-4"
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
          } justify-end gap-12`}
        >
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
            className={`w-full flex flex-col gap-3 border-[#EBEBEB] border-[1.3px] rounded-[10px] py-6 px-4`}
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
                  {selectedPatient?.avatar ? (
                    <Image
                      src={selectedPatient.avatar}
                      alt="Avatar"
                      className={`rounded-full cursor-pointer ${
                        width < 530 ? "w-12 h-12" : "w-[60px] h-[60px]"
                      }`}
                      width={60}
                      height={60}
                      onDoubleClick={() =>
                        handlevipstatus(
                          selectedPatient.uhid,
                          String(selectedPatient.vip)
                        )
                      }
                    />
                  ) : (
                    <Image
                      src={ManAvatar} // 👈 default fallback if no avatar
                      alt="Default Avatar"
                      className={`rounded-full cursor-pointer ${
                        width < 530 ? "w-12 h-12" : "w-[60px] h-[60px]"
                      }`}
                      width={60}
                      height={60}
                      onDoubleClick={() =>
                        handlevipstatus(
                          selectedPatient.uhid,
                          String(selectedPatient.vip)
                        )
                      }
                    />
                  )}

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
                        ? "w-5/7"
                        : width < 1350 && width >= 1000
                        ? "w-full"
                        : width < 1000 && width >= 600
                        ? "w-5/7"
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
                        <p
                          className={`uppercase ${
                            poppins.className
                          } font-medium text-base text-[#222222] opacity-50 
                        
                        ${
                          width >= 1350
                            ? "text-start"
                            : width < 1350 && width >= 1000
                            ? "text-start"
                            : width < 1000 && width >= 600
                            ? "text-start"
                            : width < 600 && width >= 530
                            ? "text-start"
                            : "text-start"
                        }

                        `}
                        >
                          {selectedPatient ? selectedPatient.uhid : "UHID"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex flex-col

                      ${
                        width >= 1350
                          ? "w-2/7 gap-2 justify-start"
                          : width < 1350 && width >= 1000
                          ? "w-full justify-start"
                          : width < 1000 && width >= 600
                          ? "w-2/7 gap-2 justify-start"
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={selectedbardata}
                        margin={{ top: 0, right: 0, left: -30, bottom: -10 }}
                      >
                        <CartesianGrid vertical={false} stroke="#EBEBEB" />

                        {/* X Axis */}
                        <XAxis
                          dataKey="name"
                          tick={{
                            fill: "#475467",
                            opacity: 1,
                            fontFamily: "Poppins",
                            fontWeight: 500,
                            fontSize: 8,
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
                            fontSize: 12,
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
                          barSize={10}
                        />
                        <Bar
                          dataKey="right"
                          fill="#82ca9d"
                          radius={[8, 8, 0, 0]}
                          barSize={10}
                        />
                      </BarChart>
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
                {/* <div
                  className={`w-full flex flex-row items-center justify-center gap-2 bg-[#FFF5F7] px-2 py-1 rounded-[10px]`}
                >
                  <ArrowDownCircleIcon className="w-4 h-4 text-[#DE8E8A]" />
                  <p
                    className={`${inter.className} font-medium text-sm text-[#DE8E8A]`}
                  >
                    23 %
                  </p>
                </div> */}
                <div className={`w-full flex flex-col items-center`}>
                  <div
                    className={`w-full flex flex-row items-center justify-center gap-2 bg-[#EBF4F1] px-2 py-1 rounded-[10px]`}
                  >
                    <p
                      className={`${inter.className} font-semibold text-sm text-[#484848]`}
                    >
                      {selectedPatient?.total_combined ?? "NA"}
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
                  BMI: {selectedPatient?.bmi ?? "NA"}
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
                  getPendingQuestionnaires(selectedPatient).length > 0 ? (
                    getPendingQuestionnaires(selectedPatient).map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg px-3 py-1.5 hover:bg-[#f1f1f1] transition"
                        >
                          <span className="font-semibold text-gray-800 w-2/3">
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
                    <div className="text-center py-4 text-gray-400 font-medium">
                      No pending questionnaires
                    </div>
                  )
                ) : (
                  <div className="text-center py-4 text-gray-400 font-medium">
                    No pending questionnaires
                  </div>
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
                } font-medium text-[15px] rounded-[10px]
                ${selectedPatient?.uhid ? "cursor-pointer" : ""} `}
                onClick={async () => {
                  const todayLocal = new Date();
                  const yyyy = todayLocal.getFullYear();
                  const mm = String(todayLocal.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
                  const dd = String(todayLocal.getDate()).padStart(2, "0");

                  const today = `${yyyy}-${mm}-${dd}`;
                  const uhid = selectedPatient?.uhid?.toLowerCase();
                  if (!uhid) return;

                  const opdDate = getDateOnly(selectedPatient?.opd);
                  const surgeryLeft = getDateOnly(
                    selectedPatient?.surgery_left
                  );
                  const surgeryRight = getDateOnly(
                    selectedPatient?.surgery_right
                  );

                  // === Priority ===
                  // 1) OPD check
                  if (opdDate === today) {
                    const exists = await checkGetSurgery(uhid, `op-${opdDate}`);
                    if (!exists) {
                      setshowprof(true); // ✅ OPD flow
                      return;
                    }
                  }
                  // console.log(
                  //   "Not allowed — already exists or date not today",
                  //   today,
                  //   uhid,
                  //   surgeryLeft
                  // );

                  // 2) Left surgery check
                  if (surgeryLeft === today) {
                    const exists = await checkGetSurgery(uhid, surgeryLeft);

                    if (!exists) {
                      handlenavigatesurgeryreport(); // ✅ Surgery flow
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem(
                          "selectedUHID",
                          selectedPatient.uhid
                        );
                      }
                      return;
                    }
                  }

                  // 3) Right surgery check
                  if (surgeryRight === today) {
                    const exists = await checkGetSurgery(uhid, surgeryRight);
                    if (!exists) {
                      handlenavigatesurgeryreport(); // ✅ Surgery flow
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem(
                          "selectedUHID",
                          selectedPatient.uhid
                        );
                      }
                      return;
                    }
                  }

                  // ❌ Nothing matched
                }}
              >
                Surgery
              </p>

              <p
                className={`${
                  width >= 400 ? "w-1/2" : "w-2/3"
                } text-center bg-[#2A343D] px-4 py-1 text-white ${
                  inter.className
                } font-medium text-[15px] rounded-[10px]
                 ${selectedPatient?.uhid ? "cursor-pointer" : ""} `}
                onClick={() => {
                  if (selectedPatient.uhid) {
                    handlenavigatereport();
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem(
                        "patientreportid",
                        selectedPatient.uhid
                      );
                    }
                  }
                }}
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
              <div className="w-fit flex flex-col items-center gap-1 relative group">
                <p
                  className={`${inter.className} font-bold text-2xl text-white py-1.5 px-4 bg-[#2A343D] rounded-[10px]`}
                >
                  {preLeft + preRight ?? "NA"}
                </p>
                <p
                  className={`${raleway.className} font-medium text-[10px] text-[#2B2B2B]`}
                >
                  Pre Op
                </p>

                {/* Tooltip */}
                <div
                  className={`${poppins.className} absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm font-medium rounded-md px-2 py-1 whitespace-nowrap`}
                >
                  Left: {preLeft} - Right: {preRight}
                </div>
              </div>

              <div className="w-fit flex flex-col items-center gap-1 relative group">
                <p
                  className={`${inter.className} font-bold text-2xl text-white py-1.5 px-4 bg-[#2A343D] rounded-[10px]`}
                >
                  {postLeft + postRight ?? "NA"}
                </p>
                <p
                  className={`${raleway.className} font-medium text-[10px] text-[#2B2B2B]`}
                >
                  Post Op
                </p>

                {/* Tooltip */}
                <div
                  className={`${poppins.className} absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm font-medium rounded-md px-2 py-1 whitespace-nowrap`}
                >
                  Left: {postLeft} - Right: {postRight}
                </div>
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
          {patientloading || filteredPatients.length === 0 ? (
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
          ) : filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => {
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
                      src={patient.avatar}
                      alt="Avatar"
                      className={`rounded-full w-[35px] h-[35px]`}
                      width={35}
                      height={35}
                      onDoubleClick={() =>
                        handlevipstatus(patient.uhid,String(patient.vip))
                      }
                    />
                    <div className="flex flex-col gap-1">
                      <p
                        className={`${
                          raleway.className
                        } font-semibold text-lg ${
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
            })
          ) : (
            <p
              className={`w-full text-gray-400 text-center ${poppins.className}`}
            >
              No Patients Found for Today
            </p>
          )}
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
                        ${width < 950 ? "gap-4 w-full" : "w-2/3"}
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
                      <p
                        className={`${inter.className} text-2xl font-semibold text-black`}
                      >
                        POST OP ROM
                      </p>
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
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className={`w-full flex gap-12  ${
                        width >= 1200 ? "flex-row" : "flex-col"
                      }`}
                    >
                      {selectedPatient?.surgery_left !==
                        selectedPatient?.surgery_right && (
                        <div
                          className={`flex gap-4 ${
                            width >= 1200 ? "w-1/4" : "w-full"
                          } ${width < 700 ? "flex-col" : "flex-row"}`}
                        >
                          <div
                            className={`flex flex-col gap-2 ${
                              width < 700 ? "w-full" : "w-full"
                            }`}
                          >
                            <p
                              className={` ${outfit.className} font-bold uppercase text-base text-black/80`}
                            >
                              SIDE
                            </p>

                            <select
                              className={`${outfit.className} cursor-pointer border border-gray-300 rounded-md p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              defaultValue=""
                              value={side}
                              onChange={(e) => setSide(e.target.value)}
                            >
                              <option value="" disabled>
                                Select Side
                              </option>
                              {sides.map((period) => (
                                <option key={period} value={period}>
                                  {period}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      <div
                        className={`flex gap-4 ${
                          width >= 1200 ? "w-1/4" : "w-full"
                        } ${width < 700 ? "flex-col" : "flex-row"}`}
                      >
                        <div
                          className={`flex flex-col gap-2 ${
                            width < 700 ? "w-full" : "w-full"
                          }`}
                        >
                          <p
                            className={` ${outfit.className} font-bold uppercase text-base text-black/80`}
                          >
                            PERIOD
                          </p>

                          <select
                            className={`${outfit.className} cursor-pointer border border-gray-300 rounded-md p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            defaultValue=""
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                          >
                            <option value="" disabled>
                              Select Period
                            </option>
                            {periods.map((period) => (
                              <option key={period} value={period}>
                                {period}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div
                        className={`flex flex-col gap-2 ${
                          width >= 1200 ? "w-1/4" : "w-full"
                        }`}
                      >
                        <p
                          className={` ${outfit.className} font-bold uppercase text-base text-black/80`}
                        >
                          Flexion
                        </p>
                        <input
                          type="text"
                          value={flexion}
                          onChange={(e) => setFlexion(e.target.value)}
                          placeholder="Enter flexion"
                          className={`${outfit.className} border border-gray-300 rounded-md p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>

                      <div
                        className={`flex flex-col gap-2 ${
                          width >= 1200 ? "w-1/4" : "w-full"
                        }`}
                      >
                        <p
                          className={` ${outfit.className} font-bold uppercase text-base text-black/80`}
                        >
                          Extension
                        </p>
                        <input
                          type="text"
                          value={extension}
                          onChange={(e) => setExtension(e.target.value)}
                          placeholder="Enter extension"
                          className={`${outfit.className} border border-gray-300 rounded-md p-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                    </div>

                    <p
                      className={`mx-auto ${
                        width >= 400 ? "w-1/5" : "w-1/2"
                      } text-center bg-[#2A343D] px-4 py-1 text-white ${
                        inter.className
                      } font-medium text-lg cursor-pointer`}
                      // onClick={handlenavigatesurgeryreport}
                      // onClick={() => setshowprof(true)}
                      onClick={handlesaveform}
                    >
                      SUBMIT
                    </p>
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

      {showresetpassword &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // white with 50% opacity
            }}
          >
            <div
              className={`
    h-fit flex flex-col items-center justify-center mx-auto my-auto bg-white p-8 rounded-2xl
    ${width < 950 ? "gap-4 w-full" : "w-1/2"}
  `}
            >
              <h2
                className={`${raleway.className} text-2xl font-semibold text-gray-800 mb-6`}
              >
                Reset Password
              </h2>

              <div
                className={`${poppins.className} w-full flex flex-col gap-8`}
              >
                {/* New Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-base text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border-b-2 border-gray-400 outline-none px-2 py-2 text-lg bg-transparent text-black"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                  <label className="text-base text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="text"
                    className="w-full border-b-2 border-gray-400 outline-none px-2 py-2 text-lg bg-transparent text-black"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleResetPassword}
                  className="cursor-pointer mt-4 w-full bg-[#319B8F] text-white font-semibold py-2 rounded-lg hover:bg-[#26776f] transition-all"
                >
                  Reset Password
                </button>
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
                  background-color: #076C40;
                  border-radius: 8px;
                }
          
                .inline-scroll {
                  scrollbar-color: #076C40 transparent;
                }
              `}
            </style>

            {showAlert && (
              <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-6 py-3 rounded-lg shadow-lg animate-fade-in-out">
                  {alermessage}
                </div>
              </div>
            )}
          </div>,
          document.body // Render to body, outside constrained parent.
        )}
    </div>
  );
};

export default Dailyactivity;
