"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useDeepCompareMemo } from "use-deep-compare";

import axios from "axios";
import { API_URL } from "../libs/global";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ScatterChart,
  Scatter,
  ErrorBar,
  LabelList,
  ComposedChart,
  Bar,
} from "recharts";

import { Raleway, Inter, Poppins, WDXL_Lubrifont_JP_N } from "next/font/google";
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
  ArrowRightStartOnRectangleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";

import Headset from "@/app/Assets/headset.png";
import Search from "@/app/Assets/searchicon.png";
import ManAvatar from "@/app/Assets/man.png";
import Womanavatar from "@/app/Assets/woman.png";
import Reportimg from "@/app/Assets/report.png";
import Heatmap from "@/app/Assets/heatmap.png";

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

// === Helper functions ===
const quantile = (arr, q) => {
  const pos = (arr.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return arr[base] + rest * (arr[base + 1] - arr[base]);
};

const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

const computeBoxStats = (data, mean) => {
  const sorted = [...data].sort((a, b) => a - b);
  return {
    min: sorted[0],
    lowerQuartile: quantile(sorted, 0.25),
    median: quantile(sorted, 0.5),
    upperQuartile: quantile(sorted, 0.75),
    max: sorted[sorted.length - 1],
    Patient: mean,
  };
};

// === Shape Components ===
const HorizonBar = ({
  cx,
  cy,
  payload,
  dataKey,
  width = 30,
  stroke = "#2A333A",
}) => {
  if (cx == null || cy == null || !payload) return null;

  const isMedian = dataKey === "_median";
  const length = isMedian ? 30 : 10;

  // default median color can still be overridden by stroke
  const lineColor = isMedian ? stroke : stroke;

  return (
    <line
      x1={cx - length / 2}
      y1={cy}
      x2={cx + length / 2}
      y2={cy}
      stroke={lineColor}
      strokeWidth={2}
    />
  );
};

const DotBar = ({ x, y, width, height, stroke = "#2A333A" }) => {
  if (x == null || y == null || width == null || height == null) return null;

  return (
    <line
      x1={x + width / 2}
      y1={y + height}
      x2={x + width / 2}
      y2={y}
      stroke={stroke}
      strokeWidth={3}
      strokeDasharray="0"
    />
  );
};

// === Hook to structure data for chart ===
const useBoxPlot = (boxPlots) => {
  return useMemo(
    () =>
      boxPlots.map((v) => {
        // Ensure all required data points (min, median, etc.) are valid numbers, otherwise set to null.
        const min = !isNaN(v.min) ? v.min : null;
        const max = !isNaN(v.max) ? v.max : null;
        const lowerQuartile = !isNaN(v.lowerQuartile) ? v.lowerQuartile : null;
        const upperQuartile = !isNaN(v.upperQuartile) ? v.upperQuartile : null;
        const median = !isNaN(v.median) ? v.median : null;
        const Patient = !isNaN(v.Patient) ? v.Patient : null;

        return {
          name: v.name,
          min: min,
          bottomWhisker:
            lowerQuartile !== null && min !== null ? lowerQuartile - min : null,
          bottomBox:
            median !== null && lowerQuartile !== null
              ? median - lowerQuartile
              : null,
          topBox:
            upperQuartile !== null && median !== null
              ? upperQuartile - median
              : null,
          topWhisker:
            max !== null && upperQuartile !== null ? max - upperQuartile : null,
          medianLine: 0.0001, // dummy to render median bar
          maxLine: 0.0001, // dummy to render max bar
          minLine: 0.0001, // dummy to render min bar (optional)
          Patient: Patient,
          size: 250,
          _median: median, // actual Y position for rendering line
          _max: max,
          _min: min,
        };
      }),
    [boxPlots]
  );
};

const periodOffsets = [
  { key: "pre_op", label: "Pre Op" },
  { key: "6w", label: "6W" },
  { key: "3m", label: "3M" },
  { key: "6m", label: "6M" },
  { key: "1y", label: "1Y" },
  { key: "2y", label: "2Y" },
];

const Patientreport = React.memo(({ handlenavigateviewsurgeryreport }) => {
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

  const [patientbasic, setpatientbasic] = useState({});
  const [selectpatientquest, setselectedpatientques] = useState({});
  const [patientsquest, setpatientsques] = useState([]);
  const [surgerydatleft, setsurgeryDateleft] = useState("");
  const [surgerydatright, setsurgeryDateright] = useState("");
  const [loading, setloading] = useState(true);

  let patientReportId = null;

  if (typeof window !== "undefined") {
    patientReportId = sessionStorage.getItem("patientreportid");
  }

  useEffect(() => {
    if (!patientReportId) {
      showWarning("No patient report found");
      return;
    }

    const extractScore = (scoreStr) => {
      if (!scoreStr || typeof scoreStr !== "string") return null;
      const match = scoreStr.match(/:\s*(\d+)/); // capture first number
      return match ? parseFloat(match[1]) : null;
    };

    const KOOSJR_MAP = [
      100.0, 91.975, 84.6, 79.914, 76.332, 73.342, 70.704, 68.284, 65.994,
      63.776, 61.583, 59.381, 57.14, 54.84, 52.465, 50.012, 47.487, 44.905,
      42.281, 39.625, 36.931, 34.174, 31.307, 28.251, 24.875, 20.941, 15.939,
      8.291, 0.0,
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
      function calcAverage(side) {
        if (!side || Object.keys(side).length === 0) return null;

        const total = Object.values(side).reduce((sum, val) => {
          const num = parseFloat(val);
          return sum + (isNaN(num) ? 0 : num);
        }, 0);

        return parseFloat(((total / 408) * 100).toFixed(2));
      }

      const leftAvg = calcAverage(left);
      const rightAvg = calcAverage(right);

      if (leftAvg !== null && rightAvg !== null)
        return parseFloat(((leftAvg + rightAvg) / 2).toFixed(2));

      if (leftAvg !== null) return leftAvg;
      if (rightAvg !== null) return rightAvg;

      return "NA";
    }

    const fetchPatientReminder = async () => {
      try {
        const res = await axios.get(`${API_URL}patients/${patientReportId}`);

        const patient = res.data.patient;

        // calculate age from birthDate
        const calculateAge = (dob) => {
          if (!dob) return "NA";
          const birth = new Date(dob);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          return age;
        };

        const TOTAL_PERIODS = 6; // expected periods for each questionnaire

        function checkCompletion(sideData) {
          if (!sideData || Object.keys(sideData).length === 0) {
            return "Pending"; // no questionnaires = pending
          }

          for (const [qName, qData] of Object.entries(sideData)) {
            const periods = Object.keys(qData || {});
            if (periods.length < TOTAL_PERIODS) {
              return "Pending"; // ❌ this questionnaire incomplete
            }
          }

          return "Completed"; // ✅ all questionnaires have 6 periods
        }

        // Usage:
        const statusLeft = checkCompletion(patient.Medical_Left);
        const statusRight = checkCompletion(patient.Medical_Right);

        const leftOverallScores =
          patient.Practitioners?.left_doctor ===
          sessionStorage.getItem("doctor")
            ? calculateOverallScores(patient.Medical_Left)
            : {};

        const rightOverallScores =
          patient.Practitioners?.right_doctor ===
          sessionStorage.getItem("doctor")
            ? calculateOverallScores(patient.Medical_Right)
            : {};

        const overallCombined = getCombinedAverage(
          leftOverallScores,
          rightOverallScores
        );

        const pickedData = {
          name: patient.Patient?.name ?? "NA",
          age: calculateAge(patient.Patient?.birthDate),
          gender: patient.Patient?.gender ?? "NA",
          phone: patient.Patient?.phone ?? "NA",
          email: patient.Patient?.email ?? "NA",
          uhid: patient.Patient?.uhid ?? "NA",
          statusLeft: patient.Patient_Status_Left ?? "NA",
          statusRight: patient.Patient_Status_Right ?? "NA",
          leftCompleted: patient.Medical_Left_Completed_Count ?? "NA",
          leftPending: patient.Medical_Left_Pending_Count ?? "NA",
          rightCompleted: patient.Medical_Right_Completed_Count ?? "NA",
          rightPending: patient.Medical_Right_Pending_Count ?? "NA",
          left_doctor:
            patient.Practitioners?.left_doctor &&
            patient.Practitioners.left_doctor !== "NA"
              ? patient.Practitioners.left_doctor
              : "Doctor",
          right_doctor:
            patient.Practitioners?.right_doctor &&
            patient.Practitioners.right_doctor !== "NA"
              ? patient.Practitioners.right_doctor
              : "Doctor",
          surgery_left: patient.Medical?.surgery_date_left ?? "NA",
          surgery_right: patient.Medical?.surgery_date_right ?? "NA",
          questionnaire_left: patient.Medical_Left ?? {},
          questionnaire_right: patient.Medical_Right ?? {},
          questionnaireStatusLeft: checkCompletion(patient.Medical_Left),
          questionnaireStatusRight: checkCompletion(patient.Medical_Right),
          vip: patient.VIP_Status ?? false,
          avatar:
            patient.Patient?.photo && patient.Patient?.photo !== "NA"
              ? patient.Patient.photo
              : patient.Patient?.gender?.toLowerCase() === "male"
              ? ManAvatar
              : Womanavatar,
          height: patient.Medical?.height
            ? patient.Medical.height.match(/[\d.]+/)?.[0] || "NA"
            : "NA",

          weight: patient.Medical?.weight
            ? patient.Medical.weight.match(/[\d.]+/)?.[0] || "NA"
            : "NA",

          bmi:
            patient.Medical?.height && patient.Medical?.weight
              ? (() => {
                  const h = parseFloat(
                    patient.Medical.height.match(/[\d.]+/)?.[0]
                  );
                  const w = parseFloat(
                    patient.Medical.weight.match(/[\d.]+/)?.[0]
                  );
                  return h && w ? (w / Math.pow(h / 100, 2)).toFixed(1) : "NA";
                })()
              : "NA",
          total_combined: overallCombined,
        };

        const ques = {
          questionnaire_left: patient.Medical_Left ?? {},
          questionnaire_right: patient.Medical_Right ?? {},
        };

        setselectedpatientques(ques);

        setpatientbasic(pickedData);

        setloading(false);

        console.log("Fetched patient reminder data:", pickedData);
      } catch (err) {
        console.error("Error fetching patient reminder:", err);
      }
    };

    fetchPatientReminder();
  }, [patientReportId]);

  useEffect(() => {
    const fetchPatients = async () => {
      const consolidateQuestionnaires = (patients) => {
        const consolidated = { left: {}, right: {} };

        const extractScore = (scoreStr) => {
          if (!scoreStr) return "NA";
          const match = scoreStr.match(/:\s*(\d+)/);
          return match ? match[1] : "NA";
        };

        const processSide = (sideKey, questionnaires) => {
          Object.entries(questionnaires || {}).forEach(([qName, qData]) => {
            if (!consolidated[sideKey][qName]) {
              consolidated[sideKey][qName] = {};
            }

            Object.entries(qData || {}).forEach(([period, details]) => {
              if (!consolidated[sideKey][qName][period]) {
                consolidated[sideKey][qName][period] = [];
              }
              consolidated[sideKey][qName][period].push(
                details?.score ? extractScore(details.score) : "NA"
              );
            });
          });
        };

        patients.forEach((p) => {
          processSide("left", p.left_questionnaires);
          processSide("right", p.right_questionnaires);
        });

        return consolidated;
      };

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

        // 🔄 Map API data → static UI format
        const mapped = apiPatients
          .filter((p) => p.uhid !== patientReportId) // remove only that patient
          .map((p) => ({
            left_questionnaires: p.Medical_Left ?? {},
            right_questionnaires: p.Medical_Right ?? {},
          }));

        setpatientsques(consolidateQuestionnaires(mapped));
        // console.log("Other patients scores", consolidateQuestionnaires(mapped));
      } catch (err) {
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
    if (patientbasic) {
      setsurgeryDateleft(patientbasic.surgery_left || "");
      setsurgeryDateright(patientbasic.surgery_right || "");
    }
  }, [patientbasic]);

  const [handlequestableswitch, sethandlequestableswitch] = useState("left");

  function getTextColor(score) {
    if (score === null || score === undefined || isNaN(score)) return "#9CA3AF"; // gray for missing

    const percent = Math.max(0, Math.min(100, score)) / 100;

    // From red (low) to green (high), via orange/yellow
    const r = Math.round(255 * (1 - percent));
    const g = Math.round(150 + 105 * percent); // start at 150 to get orange/yellow in middle
    const b = 0;

    return `rgb(${r}, ${g}, ${b})`;
  }

  const [selectedQuestionnaires, setSelectedQuestionnaires] = useState([
    "oks",
    "sf12",
    "koos",
    "kss",
    "fjs", // initially all selected
  ]);

  function toggleQuestionnaire(key) {
    setSelectedQuestionnaires(
      (prev) =>
        prev.includes(key)
          ? prev.filter((item) => item !== key) // remove if already selected
          : [...prev, key] // add if not selected
    );
  }

  const questionnaireLeft = useMemo(
    () => patientbasic?.questionnaire_left || {},
    [JSON.stringify(patientbasic?.questionnaire_left)]
  );

  const questionnaireRight = useMemo(
    () => patientbasic?.questionnaire_right || {},
    [JSON.stringify(patientbasic?.questionnaire_right)]
  );

  const TIMEPOINT_ORDER = ["Pre Op", "6W", "3M", "6M", "1Y", "2Y"];

  function buildBoxPlotData(
    consolidated,
    targetPatient,
    questionnaireKey,
    side = "left"
  ) {
    return TIMEPOINT_ORDER.map((timepoint, idx) => {
      // Collect group scores from other patients (side-based)
      const groupScores =
        consolidated?.[side]?.[questionnaireKey]?.[timepoint] || [];

      // Patient’s own score (side-based)
      const patientScoreRaw =
        targetPatient?.[questionnaireKey]?.[timepoint]?.score || "";
      const match = patientScoreRaw.match(/:\s*(\d+)/);
      const patientScore = match ? Number(match[1]) : undefined;

      return {
        name: timepoint,
        boxData: groupScores.map(Number).filter((s) => !isNaN(s)),
        dotValue: patientScore,
      };
    });
  }

  // Left side OKS
  const oksBoxPlotDataLeft = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireLeft, "OKS", "left"),
    [patientsquest, questionnaireLeft]
  );

  // Right side OKS
  const oksBoxPlotDataRight = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireRight, "OKS", "right"),
    [patientsquest, questionnaireRight]
  );

  const oksBoxPlotData =
    handlequestableswitch === "left" ? oksBoxPlotDataLeft : oksBoxPlotDataRight;

  // 1️⃣ Memoize your data first
  const oksDataInput = useMemo(
    () =>
      oksBoxPlotData.map((item, index) => {
        const stats = computeBoxStats(item.boxData, item.dotValue);

        if (
          stats.Patient === undefined ||
          isNaN(stats.Patient) ||
          stats.Patient > 48
        ) {
          stats.Patient = undefined;
        }

        return {
          name: item.name,
          x: index * 10,
          ...stats,
        };
      }),
    [oksBoxPlotData]
  );

  // 2️⃣ Call your hook at top level with memoized data
  const oksDatabox = useBoxPlot(oksDataInput);

  // Left side OKS
  const sf12BoxPlotDataLeft = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireLeft, "SF12", "left"),
    [patientsquest, questionnaireLeft]
  );

  const sf12BoxPlotDataRight = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireRight, "SF12", "right"),
    [patientsquest, questionnaireRight]
  );

  const sf12BoxPlotData =
    handlequestableswitch === "left"
      ? sf12BoxPlotDataLeft
      : sf12BoxPlotDataRight;

  // 1️⃣ Memoize the transformed data
  const sf12DataInput = useMemo(
    () =>
      sf12BoxPlotData.map((item, index) => {
        const stats = computeBoxStats(item.boxData, item.dotValue);

        if (stats.Patient === undefined || isNaN(stats.Patient)) {
          stats.Patient = undefined;
        }

        return {
          name: item.name,
          x: index * 10,
          ...stats,
        };
      }),
    [sf12BoxPlotData]
  );

  // 2️⃣ Call the hook at top level with memoized data
  const sf12Databox = useBoxPlot(sf12DataInput);

  // Left side KSS
  const kssBoxPlotDataLeft = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireLeft, "KSS", "left"),
    [patientsquest, questionnaireLeft]
  );

  // Right side KSS
  const kssBoxPlotDataRight = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireRight, "KSS", "right"),
    [patientsquest, questionnaireRight]
  );

  const kssBoxPlotData =
    handlequestableswitch === "left" ? kssBoxPlotDataLeft : kssBoxPlotDataRight;

  // 1️⃣ Memoize transformed data
  const kssDataInput = useMemo(
    () =>
      kssBoxPlotData.map((item, index) => {
        const stats = computeBoxStats(item.boxData, item.dotValue);

        if (stats.Patient === undefined || isNaN(stats.Patient)) {
          stats.Patient = undefined;
        }

        return {
          name: item.name,
          x: index * 10,
          ...stats,
        };
      }),
    [kssBoxPlotData]
  );

  // 2️⃣ Call the hook at top level
  const kssDatabox = useBoxPlot(kssDataInput);

  // Left side KOOS_JR
  const koosjrBoxPlotDataLeft = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireLeft, "KOOS_JR", "left"),
    [patientsquest, questionnaireLeft]
  );

  // Right side KOOS_JR
  const koosjrBoxPlotDataRight = useMemo(
    () =>
      buildBoxPlotData(patientsquest, questionnaireRight, "KOOS_JR", "right"),
    [patientsquest, questionnaireRight]
  );

  const koosjrBoxPlotData =
    handlequestableswitch === "left"
      ? koosjrBoxPlotDataLeft
      : koosjrBoxPlotDataRight;

  // 1️⃣ Memoize transformed data
  const koosjrDataInput = useMemo(
    () =>
      koosjrBoxPlotData.map((item, index) => {
        const stats = computeBoxStats(item.boxData, item.dotValue);

        if (stats.Patient === undefined || isNaN(stats.Patient)) {
          stats.Patient = undefined;
        }

        return {
          name: item.name,
          x: index * 10,
          ...stats,
        };
      }),
    [koosjrBoxPlotData]
  );

  // 2️⃣ Call the hook at top level
  const koosjrDatabox = useBoxPlot(koosjrDataInput);

  // Left side FJS
  const fjsBoxPlotDataLeft = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireLeft, "FJS", "left"),
    [patientsquest, questionnaireLeft]
  );

  // Right side FJS
  const fjsBoxPlotDataRight = useMemo(
    () => buildBoxPlotData(patientsquest, questionnaireRight, "FJS", "right"),
    [patientsquest, questionnaireRight]
  );

  const fjsBoxPlotData =
    handlequestableswitch === "left" ? fjsBoxPlotDataLeft : fjsBoxPlotDataRight;

  // 1️⃣ Memoize transformed data
  const fjsDataInput = useMemo(
    () =>
      fjsBoxPlotData.map((item, index) => {
        const stats = computeBoxStats(item.boxData, item.dotValue);

        if (stats.Patient === undefined || isNaN(stats.Patient)) {
          stats.Patient = undefined;
        }

        return {
          name: item.name,
          x: index * 10,
          ...stats,
        };
      }),
    [fjsBoxPlotData]
  );

  // 2️⃣ Call the hook at the top level
  const fjsDatabox = useBoxPlot(fjsDataInput);

  const [showAlert, setshowAlert] = useState(false);
  const [alermessage, setAlertMessage] = useState("");

  const showWarning = (message) => {
    setAlertMessage(message);
    setshowAlert(true);
    setTimeout(() => setshowAlert(false), 4000);
  };

  const QUESTIONNAIRE_NAMES = {
    OKS: "Oxford Knee Score (OKS)",
    SF12: "Short Form - 12 (SF-12)",
    KOOS_JR:
      "Knee Injury and Osteoarthritis Outcome Score, Joint Replacement (KOOS, JR)",
    KSS: "Knee Society Score (KSS)",
    FJS: "Forgotten Joint Score (FJS)",
  };

  const KOOSJR_MAP = [
    100.0, 91.975, 84.6, 79.914, 76.332, 73.342, 70.704, 68.284, 65.994, 63.776,
    61.583, 59.381, 57.14, 54.84, 52.465, 50.012, 47.487, 44.905, 42.281,
    39.625, 36.931, 34.174, 31.307, 28.251, 24.875, 20.941, 15.939, 8.291, 0.0,
  ];

  const transformApiDataToStaticWithDates = (apiData, surgeryDateLeft) => {
    if (!apiData) return { periods: [], questionnaires: [] };

    const periodOffsets = [
      { key: "pre_op", label: "Pre Op", offset: -1 },
      { key: "6w", label: "6W", offset: 42 },
      { key: "3m", label: "3M", offset: 90 },
      { key: "6m", label: "6M", offset: 180 },
      { key: "1y", label: "1Y", offset: 365 },
      { key: "2y", label: "2Y", offset: 730 },
    ];

    const periods = periodOffsets.map((p) => ({
      key: p.key,
      label: p.label,
    }));

    const questionnaires = Object.entries(apiData).map(([qKey, qPeriods]) => {
      const scores = {};
      const notesMap = {};

      periodOffsets.forEach((p) => {
        const periodData = qPeriods?.[p.label];
        // console.log("Questionnaire API Data outside:", periodData);

        if (!qPeriods?.[p.label]) {
          // Period itself not present
          scores[p.key] = "-";
          notesMap[p.key] = "-";
        } else if (periodData && !periodData.score) {
          // Period exists but score missing
          scores[p.key] = "NA";

          // console.log("Questionnaire API Data inside:", periodData);

          // Notes
          const [first, second, third, fourth] = periodData.other_notes || [];
          const filtered = [];
          if (first === "filledBy: Self") filtered.push(first);
          if (third === "otherPain: No") filtered.push(third);
          notesMap[p.key] = filtered.length ? filtered.join(", ") : "NA";
        } else {
          // Period exists and score exists
          const match = periodData.score.match(/:\s*(\d+)/);
          if (QUESTIONNAIRE_NAMES[qKey]) {
            if (QUESTIONNAIRE_NAMES[qKey].includes("KOOS")) {
              // ✅ Special handling for KOOS

              scores[p.key] = match ? KOOSJR_MAP[match[1]] : "NA";
            } else {
              scores[p.key] = match ? match[1] : "NA";
            }
          }
          const [first, second, third, fourth] = periodData.other_notes || [];
          const filtered = [];
          if (first === "filledBy: Self") {
            filtered.push(first);
          } else {
            filtered.push(first);
            filtered.push(second);
          }

          if (third === "otherPain: No") {
            filtered.push(third);
          } else {
            filtered.push(third);
            filtered.push(fourth);
          }
          notesMap[p.key] = filtered.length ? filtered.join(", ") : "NA";
        }
      });

      const fullName = QUESTIONNAIRE_NAMES[qKey] || qKey;

      return { name: fullName, scores, notesMap };
    });

    return { periods, questionnaires };
  };

  // Usage
  const staticLeft = surgerydatleft
    ? transformApiDataToStaticWithDates(
        patientbasic?.questionnaire_left,
        surgerydatleft
      )
    : { periods: [], questionnaires: [] };

  const staticRight = surgerydatright
    ? transformApiDataToStaticWithDates(
        patientbasic?.questionnaire_right,
        surgerydatright
      )
    : { periods: [], questionnaires: [] };

  const questionnaireData =
    handlequestableswitch === "left" ? staticLeft : staticRight;

  const extractQuestionnaireScores = (apiData, periodOffsets) => {
    if (!apiData) return [];

    return Object.entries(apiData).map(([qKey, qPeriods]) => {
      const scores = {};
      const notesMap = {};

      periodOffsets.forEach((p) => {
        const periodData = qPeriods?.[p.label];

        if (!qPeriods?.[p.label]) {
          // Period itself not present
          scores[p.key] = "-";
          notesMap[p.key] = "-";
        } else if (periodData && !periodData.score) {
          // Period exists but score missing
          scores[p.key] = "NA";

          // Notes extraction
          const [first, , third] = periodData.other_notes || [];
          const filtered = [];
          if (first === "No") filtered.push(first);
          if (third === "No") filtered.push(third);
          notesMap[p.key] = filtered.length ? filtered.join(", ") : "NA";
        } else {
          // Period exists and score exists
          const match = periodData.score.match(/:\s*(\d+)/);

          if (QUESTIONNAIRE_NAMES[qKey]) {
            if (QUESTIONNAIRE_NAMES[qKey].includes("KOOS")) {
              // ✅ Special handling for KOOS

              scores[p.key] = match ? KOOSJR_MAP[match[1]] : "NA";
            } else {
              scores[p.key] = match ? match[1] : "NA";
            }
          }

          const [first, , third] = periodData.other_notes || [];
          const filtered = [];
          if (first === "No") filtered.push(first);
          if (third === "No") filtered.push(third);
          notesMap[p.key] = filtered.length ? filtered.join(", ") : "NA";
        }
      });

      const fullName = QUESTIONNAIRE_NAMES[qKey] || qKey;

      return { name: fullName, scores, notesMap };
    });
  };

  // ✅ Usage for left and right

  // ✅ Safe extraction with optional chaining + fallback
  const leftScores = useMemo(
    () => extractQuestionnaireScores(questionnaireLeft, periodOffsets),
    [questionnaireLeft, periodOffsets]
  );

  const rightScores = useMemo(
    () => extractQuestionnaireScores(questionnaireRight, periodOffsets),
    [questionnaireRight, periodOffsets]
  );

  // Convert your array of questionnaire scores into chart-ready data
  const buildChartData = (scores) => {
    return (
      periodOffsets
        .map((p) => {
          const dataPoint = { name: p.label };

          const oksVal = scores.find((q) =>
            q.name.includes("Oxford Knee Score")
          )?.scores?.[p.key];
          if (oksVal != null) dataPoint.oks = Number(oksVal);

          const sf12Val = scores.find((q) => q.name.includes("SF-12"))
            ?.scores?.[p.key];
          if (sf12Val != null) dataPoint.sf12 = Number(sf12Val);

          const koosVal = scores.find((q) => q.name.includes("KOOS"))?.scores?.[
            p.key
          ];
          if (koosVal != null) dataPoint.koos = Number(koosVal);

          const kssVal = scores.find((q) =>
            q.name.includes("Knee Society Score")
          )?.scores?.[p.key];
          if (kssVal != null) dataPoint.kss = Number(kssVal);

          const fjsVal = scores.find((q) =>
            q.name.includes("Forgotten Joint Score")
          )?.scores?.[p.key];
          if (fjsVal != null) dataPoint.fjs = Number(fjsVal);

          return dataPoint;
        })
        // ✅ Remove entries where only "name" exists (i.e., all scores were null)
        .filter((d) => Object.keys(d).length > 1)
    );
  };

  // Usage
  const chartData = useMemo(() => {
    return handlequestableswitch === "left"
      ? buildChartData(leftScores)
      : buildChartData(rightScores);
  }, [handlequestableswitch, leftScores, rightScores]);

  console.log("Chart Data:", chartData);

  const periodOffsetssf12 = [
    { key: "pre_op", label: "-3" },
    { key: "surgery", label: "SURGERY" },
    { key: "6w", label: "+42" },
    { key: "3m", label: "+90" },
    { key: "6m", label: "+180" },
    { key: "1y", label: "+365" },
    { key: "2y", label: "+730" },
  ];

  const extractSf12Scores = (sf12Data) => {
    // console.log("Extracting SF12 from:", sf12Data);

    if (!sf12Data || Object.keys(sf12Data).length === 0) return [];

    const map = {
      "Pre Op": "-3",
      "6W": "+42",
      "3M": "+90",
      "6M": "+180",
      "1Y": "+365",
      "2Y": "+730",
    };

    // ensure iteration in desired order
    const periods = Object.keys(map);

    const result = periods.map((period, index) => {
      const details = sf12Data[period];

      if (!details?.score) {
        return {
          x: index,
          name: map[period],
          pScore: null,
          mScore: null,
        };
      }

      // Example: "Scores (Pre Op): 48, 33, 15 (Recorded at ...)"
      const match = details.score.match(
        /Scores.*?:\s*([\d]+),\s*([\d]+),\s*([\d]+)/
      );

      const pScore = match ? Number(match[2]) : null; // 2nd
      const mScore = match ? Number(match[3]) : null; // 3rd

      return {
        x: index,
        name: map[period],
        pScore,
        mScore,
      };
    });

    // Insert SURGERY marker right after Pre Op (-3)
    result.splice(1, 0, { x: 1, name: "SURGERY", pScore: null, mScore: null });

    // Recalculate x index
    return result.map((r, i) => ({ ...r, x: i }));
  };

  // ✅ Now call with SF12 directly
  const leftSf12 = extractSf12Scores(
    patientbasic?.questionnaire_left?.SF12,
    periodOffsetssf12
  );
  const rightSf12 = extractSf12Scores(
    patientbasic?.questionnaire_right?.SF12,
    periodOffsetssf12
  );

  // 2) X-axis label source
  const sf12Data = handlequestableswitch === "left" ? leftSf12 : rightSf12;

  const transformedData = sf12Data.map(({ name }) => ({ name }));

  // 3) Index for the surgery reference line
  const surgeryIndex = sf12Data.findIndex((d) => d.name === "SURGERY");

  // 4) Scatter series with constant error bars [10, 10]
  const dataPCS = sf12Data
    .filter((d) => d.pScore !== null)
    .map((d) => ({
      x: d.x - 0.1,
      y: d.pScore,
      error: [10, 10],
    }));

  const dataMCS = sf12Data
    .filter((d) => d.mScore !== null)
    .map((d) => ({
      x: d.x + 0.1,
      y: d.mScore,
      error: [10, 10],
    }));

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
    "Fetching patient data...",
    "Almost ready! Finalizing analysis...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [logoutconfirm, setlogoutconfirm] = useState(false);

  const router = useRouter();

  const handlelogout = () => {
    console.clear();
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    router.replace("/Login");
  };

  const fixedXAxisTicks = ["Pre Op", "6W", "3M", "6M", "1Y", "2Y"];
  const fixedXAxisTicksdays = [
    "-3",
    "SURGERY",
    "+42",
    "+90",
    "+180",
    "+365",
    "+730",
  ];

  

  const [isFloatingNoteVisible, setIsFloatingNoteVisible] = useState(false);
  const [floatingNote, setFloatingNote] = useState("");
  const [floatingName, setFloatingName] = useState("");
  const [floatingKey, setFloatingKey] = useState("");
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const tabRef = useRef(null);

  const handleNoteOpen = (note, name, key) => {
    setFloatingNote(note);
    setFloatingName(name);
    setFloatingKey(key);
    setIsFloatingNoteVisible(true);
  };

  // 1) keep your existing selectstart effect as-is
  useEffect(() => {
    const handleSelectStart = (e) => {
      if (isDragging) e.preventDefault();
    };
    document.addEventListener("selectstart", handleSelectStart);
    return () => document.removeEventListener("selectstart", handleSelectStart);
  }, [isDragging]);

  // 2) Combined mouse + touch move effect (replace your existing mouse-only effect with this)
  useEffect(() => {
    const NOTE_WIDTH = 300; // keep same as your bounding
    const NOTE_HEIGHT = 200; // keep same as your bounding

    const handlePointerMove = (clientX, clientY) => {
      setPosition((prev) => {
        const newX = clientX - offset.x;
        const newY = clientY - offset.y;

        const boundedX = Math.min(
          window.innerWidth - NOTE_WIDTH,
          Math.max(20, newX)
        );
        const boundedY = Math.min(
          window.innerHeight - NOTE_HEIGHT,
          Math.max(20, newY)
        );

        return { x: boundedX, y: boundedY };
      });
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handlePointerMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      // Prevent page scrolling while dragging
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) handlePointerMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
      if (isDragging) setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, offset]);

  // 3) Add touchstart listener (to behave like your mousedown starter).
  //     This does not require editing the mouse header onMouseDown (but you should add the class to the header for robust target detection).
  useEffect(() => {
    const handleTouchStart = (e) => {
      // Only start dragging if touch started on the header element
      const touch = e.touches?.[0];
      if (!touch) return;

      // If the touch target (or its ancestor) has the header class, begin drag
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (target && target.closest && target.closest(".floating-note-header")) {
        // Prevent page scroll jitter when starting drag
        e.preventDefault();
        setIsDragging(true);
        setOffset((prev) => ({
          // compute offset similar to your mouse logic
          x: touch.clientX - position.x,
          y: touch.clientY - position.y,
        }));
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
    };
  }, [position]);

  // 4) Keep your centering effect for initial open as-is
  useEffect(() => {
    if (isFloatingNoteVisible) {
      setPosition({
        x: window.innerWidth / 2 - 150, // half width of the note
        y: window.innerHeight / 2 - 100,
      });
    }
  }, [isFloatingNoteVisible]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setlogoutconfirm(false);
        setIsFloatingNoteVisible(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      className={`w-full overflow-y-auto h-full flex flex-col pt-8 pb-12 inline-scroll ${
        width >= 1000 ? "px-12" : "px-8"
      } rounded-4xl inline-scroll`}
    >
      {loading ? (
        <div className="flex space-x-2 py-2 w-full justify-center">
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
      ) : (
        <>
          <div className={`w-full ${width >= 1100 ? "flex flex-row" : ""} `}>
            <p
              className={`${raleway.className} font-bold text-2xl text-black ${
                width >= 700 ? "w-2/5" : "w-full"
              }`}
            >
              Patient Report
            </p>
            {width >= 1100 && (
              <div
                className={`flex flex-row ${
                  width >= 700 ? "w-3/5" : "w-full"
                } justify-end gap-12`}
              >
                <div
                  className={`w-1/3 flex flex-row justify-end items-center gap-8`}
                >
                  <ArrowRightStartOnRectangleIcon
                    className="w-6 h-6 text-black cursor-pointer"
                    onClick={() => setlogoutconfirm(true)}
                  />

                  <p
                    className={`${raleway.className} font-semibold text-sm bg-[#2B333E] rounded-[10px] h-fit px-4 py-1`}
                  >
                    Dr. {doctorName || "Doctor Name"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div
            className={`w-full flex ${
              width >= 800 ? "flex-row" : "flex-col gap-4"
            }  pt-8`}
          >
            <div className={`${width >= 800 ? "w-1/2" : "w-full"}`}>
              <div
                className={`${
                  width >= 1000 ? "w-6/7" : "w-full"
                } flex flex-row gap-4 border-b-2 border-b-[#EBEBEB] py-2 `}
              >
                <Image
                  src={patientbasic?.avatar || ManAvatar}
                  alt="Patient"
                  className={`w-[60px] h-[60px]`}
                  width={60}
                  height={60}
                />
                <div
                  className={`w-full flex ${
                    width < 400 ? "flex-col" : "flex-row"
                  } gap-2`}
                >
                  <div
                    className={`${
                      width < 400 ? "w-full" : "w-1/2"
                    } flex flex-col`}
                  >
                    <p
                      className={`${raleway.className} font-semibold text-lg text-black`}
                    >
                      {patientbasic?.name ?? "Patient Name"}
                    </p>
                    <p
                      className={`${poppins.className} font-normal text-sm text-black`}
                    >
                      {patientbasic?.age ?? "Age"},{" "}
                      {patientbasic?.gender ?? "Gender"}
                    </p>
                  </div>
                  <div
                    className={`${
                      width < 400 ? "w-full" : "w-1/2"
                    } flex flex-col justify-between`}
                  >
                    <p
                      className={`${inter.className} font-semibold text-[15px] text-[#484848]`}
                    >
                      L:{" "}
                      {patientbasic?.left_doctor ===
                      sessionStorage.getItem("doctor")
                        ? patientbasic?.statusLeft
                        : "NA"}
                      <br />
                      R:{" "}
                      {patientbasic?.right_doctor ===
                      sessionStorage.getItem("doctor")
                        ? patientbasic?.statusRight
                        : "NA"}
                    </p>
                    <p
                      className={`${poppins.className} font-medium text-base text-[#222222] opacity-50 border-r-2 border-r-[#EBEBEB]`}
                    >
                      {patientbasic.uhid ?? "Patient ID"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${
                width >= 800 ? "w-1/2" : "w-full"
              } flex justify-end`}
            >
              <div
                className={`${
                  width >= 1000 ? "w-1/2" : "w-2/3"
                } flex flex-col justify-between`}
              >
                <div className={`w-full flex flex-row justify-end gap-4`}>
                  <div className={`bg-black rounded-lg w-3/7 py-1 px-3 flex`}>
                    <p
                      className={`${inter.className} font-semibold text-sm text-white text-center w-full cursor-pointer`}
                      onClick={() => {
                        handlenavigateviewsurgeryreport();
                        if (typeof window !== "undefined") {
                          sessionStorage.setItem(
                            "selectedUHID",
                            patientbasic.uhid
                          );
                        }
                      }}
                      title="Click to view surgery report"
                    >
                      View Surgery
                    </p>
                  </div>
                </div>

                <div className={`w-full flex flex-row justify-end gap-4`}>
                  <div
                    className={`w-3/7 flex flex-row items-center justify-center gap-2 bg-[#FFF5F7] px-2 py-1 rounded-[10px]`}
                  >
                    {/* <ArrowDownCircleIcon className="w-4 h-4 text-[#DE8E8A]" />
                <p
                  className={`${inter.className} font-medium text-[15px] text-[#DE8E8A]`}
                >
                  23 %
                </p> */}

                    <p
                      className={`${inter.className} text-start font-semibold text-[15px] text-[#484848] w-full`}
                    >
                      BMI: {patientbasic?.bmi || "NA"}
                    </p>
                  </div>
                  <div className={`w-3/7 flex flex-col items-center`}>
                    <div
                      className={`w-full flex flex-row items-center justify-center gap-2 bg-[#EBF4F1] px-2 py-1 rounded-[10px]`}
                    >
                      <p
                        className={`${inter.className} font-semibold text-sm text-[#484848]`}
                      >
                        SCORE: {patientbasic?.total_combined || "NA"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`w-full ${width >= 800 ? "pt-4" : "pt-8"} `}>
            <div
              className={`w-full flex flex-col gap-2 ${
                width < 1300 ? "h-fit" : ""
              }`}
            >
              <div
                className={`w-full flex px-2  ${
                  width >= 700
                    ? "flex-row justify-between"
                    : "flex-col items-center gap-8"
                }`}
              >
                <div
                  className={`flex items-center justify-end ${
                    width >= 1000
                      ? "w-1/6 gap-4"
                      : width < 1000 && width >= 700
                      ? "w-1/2 gap-8"
                      : " w-full gap-8"
                  }
              `}
                >
                  <button
                    className={`${
                      raleway.className
                    } text-sm px-4 py-[0.5px] w-1/2 rounded-lg font-semibold   ${
                      patientbasic?.left_doctor !==
                      sessionStorage.getItem("doctor")
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }
                  ${
                    handlequestableswitch === "left"
                      ? "bg-[#2B333E] text-white"
                      : "bg-[#CAD9D6] text-black"
                  }
                  `}
                    onClick={
                      patientbasic?.left_doctor !==
                      sessionStorage.getItem("doctor")
                        ? undefined
                        : () => {
                            sethandlequestableswitch("left");
                          }
                    }
                  >
                    Left
                  </button>
                  <button
                    className={`${
                      raleway.className
                    } text-sm px-4 py-[0.5px] w-1/2 rounded-lg font-semibold   ${
                      patientbasic?.right_doctor !==
                      sessionStorage.getItem("doctor")
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                    }
                  ${
                    handlequestableswitch === "right"
                      ? "bg-[#2B333E] text-white"
                      : "bg-[#CAD9D6] text-black"
                  }`}
                    onClick={
                      patientbasic?.right_doctor !==
                      sessionStorage.getItem("doctor")
                        ? undefined
                        : () => {
                            sethandlequestableswitch("right");
                          }
                    }
                  >
                    Right
                  </button>
                </div>
                <Image src={Heatmap} alt="heatmap" />
              </div>

              <div className="bg-white rounded-2xl px-2 py-1 flex flex-col gap-4  h-full w-full">
                <div className="w-full overflow-x-auto h-full overflow-y-auto">
                  {!questionnaireData ||
                  !questionnaireData.questionnaires ||
                  !questionnaireData.questionnaires.length > 0 ? (
                    <div className="flex space-x-2 py-2 w-full justify-center">
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
                      <span
                        className={`${poppins.className} text-black font-semibold`}
                      >
                        {messages[index]}
                      </span>
                    </div>
                  ) : (
                    <table className="min-w-full table-fixed border-separate border-spacing-y-1">
                      <thead className="text-[#475467] text-[16px] font-medium text-center">
                        <tr className="rounded-2xl">
                          <th
                            className={`${inter.className} font-bold text-white text-sm px-2 py-1 bg-gray-900 rounded-tl-2xl text-center whitespace-nowrap w-3/7`}
                          >
                            <div className="flex flex-row justify-center items-center gap-4">
                              <p>Questionnaire</p>
                            </div>
                          </th>
                          {questionnaireData.periods.map((period, idx) => (
                            <th
                              key={period.key}
                              className={`px-4 py-3  bg-gray-900 text-center whitespace-nowrap ${
                                idx === questionnaireData.periods.length - 1
                                  ? "rounded-tr-2xl"
                                  : ""
                              }`}
                            >
                              <div className="flex flex-row items-center justify-center gap-1 w-full">
                                <div className={`w-fit flex flex-col`}>
                                  <span
                                    className={`${inter.className} text-[15px] text-center  text-white font-bold`}
                                  >
                                    {period.label}
                                  </span>
                                </div>

                                {/* <div
                                className={`${inter.className} font-bold text-white text-sm flex items-center justify-between gap-2 w-full`}
                              >
                                {" "}
                              </div> */}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="bg-white text-[13px]">
                        {questionnaireData.questionnaires.map((q, index) => (
                          <tr key={index} className="">
                            <td
                              className={`${raleway.className} font-semibold px-4 py-2 text-[#1F2937] truncate`}
                            >
                              {q.name}
                            </td>

                            {Object.keys(q.scores || {}).length > 0 ? (
                              questionnaireData.periods.map((period) => {
                                const score = q.scores?.[period.key];
                                let score1 = score;
                                const num = Number(score1);

                                if (!isNaN(num)) {
                                  if (q.name.includes("OKS")) {
                                    score1 = ((num / 48) * 100).toFixed(1); // convert to 100
                                  } else if (q.name.includes("FJS")) {
                                    score1 = ((num / 60) * 100).toFixed(1); // convert to 100
                                  }
                                }

                                const color = getTextColor(Number(score1));

                                return (
                                  <td
                                    key={period.key}
                                    className={`relative px-4 py-2 font-bold text-center align-middle ${
                                      q.notesMap[period.key] &&
                                      q.notesMap[period.key] !== "NA"
                                        ? "group cursor-pointer"
                                        : ""
                                    }`}
                                    style={{ color }}
                                  >
                                    {score || "—"}
                                    {q.notesMap[period.key] &&
                                      q.notesMap[period.key] !== "NA" &&
                                      q.notesMap[period.key] !== "EXPIRED" &&
                                      score !== "-" && (
                                        <button
                                          onClick={() =>
                                            handleNoteOpen(
                                              q.notesMap[period.key],
                                              q.name,
                                              period.label
                                            )
                                          }
                                          className="ml-2 text-gray-500 hover:text-black cursor-pointer"
                                          title="View Note"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 inline-block"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                          </svg>
                                        </button>
                                      )}
                                  </td>
                                );
                              })
                            ) : (
                              <td
                                colSpan={6}
                                className={`${inter.className} font-bold text-[13px] px-4 py-4 text-center text-[#3b3b3b]`}
                              >
                                No questionnaires assigned
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`w-full h-fit flex ${
              width >= 1000 ? "flex-row pt-4" : "flex-col pt-6"
            }  gap-6`}
          >
            <div
              className={`${
                width >= 1000 ? "w-1/2" : "w-full"
              } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
            >
              <p
                className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
              >
                PROM ANALYSIS
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 30 }} // extra bottom space for custom axis
                    >
                      <CartesianGrid strokeDasharray="8 10" vertical={false} />

                      {/* Hide the original XAxis */}
                      {/* <XAxis ... /> */}

                      <YAxis
                        axisLine={false}
                        label={{
                          value: "SCORE",
                          angle: -90,
                          position: "insideLeft",
                          style: {
                            fill: "#615E83",
                            fontSize: 14,
                            fontWeight: 700,
                            fontFamily: "Poppins",
                          },
                          dx: 15,
                        }}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "Poppins",
                        }}
                        domain={[0, 100]}
                      />

                      <Tooltip
                        isAnimationActive={false}
                        content={({ active, payload, label }) => {
                          if (
                            label === "SURGERY" ||
                            !active ||
                            !payload?.length
                          )
                            return null;
                          return (
                            <div className="bg-white w-full p-2 border rounded shadow text-black">
                              <p className="font-semibold text-center">
                                {fixedXAxisTicks[label]}
                              </p>
                              {payload.map((entry, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between w-full text-sm"
                                  style={{ color: entry.stroke }}
                                >
                                  <span>{entry.name}</span>
                                  <span className="text-right font-medium pl-4">
                                    {entry.value == null || isNaN(entry.value)
                                      ? "NA"
                                      : entry.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          );
                        }}
                      />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingBottom: 20 }}
                        content={() => {
                          const labels = {
                            oks: "OKS",
                            sf12: "SF-12",
                            koos: "KOOS",
                            kss: "KSS",
                            fjs: "FJS",
                          };
                          const colors = {
                            oks: "#4F46E5",
                            sf12: "#A855F7",
                            koos: "#10B981",
                            kss: "#F97316",
                            fjs: "#3B82F6",
                          };

                          return (
                            <ul className="flex gap-6 list-none m-0 p-0">
                              {Object.entries(labels).map(([key, label]) => (
                                <li
                                  key={key}
                                  className={`${poppins.className} font-medium text-[10px] flex items-center gap-2 cursor-pointer select-none`}
                                  onClick={() => toggleQuestionnaire(key)}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedQuestionnaires.includes(
                                      key
                                    )}
                                    readOnly
                                    className="accent-blue-600 w-3 h-3"
                                  />
                                  <span
                                    style={{
                                      fontWeight: 700,
                                      fontSize: 12,
                                      color: selectedQuestionnaires.includes(
                                        key
                                      )
                                        ? colors[key]
                                        : "#A0AEC0",
                                    }}
                                  >
                                    {label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }}
                      />

                      <ReferenceLine
                        x="SURGERY"
                        stroke="#AAA7FF"
                        strokeWidth={1.5}
                        ifOverflow="visible"
                        isFront
                      />

                      {["oks", "sf12", "koos", "kss", "fjs"].map((key, i) => {
                        const colors = [
                          "#4F46E5",
                          "#A855F7",
                          "#10B981",
                          "#F97316",
                          "#3B82F6",
                        ];
                        const labels = {
                          oks: "Oxford Knee Score",
                          sf12: "Short Form - 12",
                          koos: "KOOS",
                          kss: "Knee Society Score",
                          fjs: "Forgotten Joint Score",
                        };

                        if (!selectedQuestionnaires.includes(key)) return null;

                        return (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            connectNulls={false} // 🔹 Do NOT connect missing data
                            isAnimationActive={false} // 🔹 Prevent flicker on update
                            name={labels[key]}
                            stroke={colors[i]}
                            strokeWidth={2}
                            dot={({ cx, cy, payload }) => {
                              // Only render a dot if the current value is a valid number
                              const val = payload?.[key];
                              if (val == null || isNaN(val)) return null;
                              return (
                                <circle
                                  cx={cx}
                                  cy={cy}
                                  r={3.5}
                                  stroke={colors[i]}
                                  strokeWidth={1}
                                  fill={colors[i]}
                                />
                              );
                            }}
                            activeDot={({ payload }) => {
                              const val = payload?.[key];
                              if (val == null || isNaN(val)) return null;
                              return (
                                <circle
                                  r={6}
                                  stroke="#000"
                                  strokeWidth={2}
                                  fill="white"
                                />
                              );
                            }}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Custom Static X Axis */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 25px",
                    marginTop: -10,
                  }}
                >
                  {fixedXAxisTicks.map((period) => (
                    <span
                      key={period}
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#615E83",
                        fontFamily: "Poppins",
                      }}
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`${
                width >= 1000 ? "w-1/2" : "w-full"
              } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
            >
              <p
                className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
              >
                SHORT FORM 12 (PCS vs MCS)
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: -20, right: 20, left: 0, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="8 10" vertical={false} />

                      {/* Keep XAxis but hide ticks and axis line */}
                      <XAxis
                        type="number"
                        dataKey="x"
                        domain={[-0.5, transformedData.length - 0.5]}
                        hide={true} // hide default labels and line
                      />

                      <YAxis
                        type="number"
                        axisLine={false}
                        dataKey="y"
                        domain={["dataMin - 10", "dataMax + 10"]}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: 600,
                          fontFamily: "Poppins",
                        }}
                        label={{
                          value: "SCORE",
                          angle: -90,
                          position: "insideLeft",
                          offset: 10,
                          fontWeight: "bold",
                          fill: "#615E83",
                          style: {
                            fill: "#615E83",
                            fontSize: 14,
                            fontWeight: 700,
                            fontFamily: "Poppins",
                          },
                        }}
                      />

                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div
                                className={`${inter.className} flex flex-col font-semibold text-black text-xs bg-white px-2 py-1 rounded-sm border-black border-1`}
                              >
                                PCS: {payload[1].value}
                                <br />
                                MCS: {payload[3].value}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingBottom: 20 }}
                        content={() => {
                          const labels = {
                            pcs: "Physical Component Summary (PCS)",
                            mcs: "Mental Component Summary (MCS)",
                          };
                          const colors = { pcs: "#6888A1", mcs: "#2A333A" };
                          return (
                            <ul className={`flex flex-col items-end`}>
                              {Object.entries(labels).map(([key, label]) => (
                                <li
                                  key={key}
                                  className={`flex flex-row items-center gap-2 w-2/5`}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      backgroundColor: colors[key],
                                    }}
                                  />
                                  <span
                                    className={`${inter.className} font-medium text-[10px] text-black`}
                                  >
                                    {label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }}
                      />

                      <ReferenceLine
                        x={surgeryIndex}
                        stroke="#AAA7FF"
                        strokeWidth={1.5}
                        label={{
                          value: "Surgery",
                          position: "top",
                          fill: "limegreen",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      />

                      {/* PCS Scatter */}
                      <Scatter
                        name="Physical (PCS)"
                        data={dataPCS.filter(
                          (point) => point.y != null && point.x != null
                        )}
                        fill="#4071CA"
                      >
                        <ErrorBar
                          dataKey="error"
                          direction="y"
                          width={4}
                          stroke="#6888A1"
                        />
                      </Scatter>

                      {/* MCS Scatter */}
                      <Scatter
                        name="Mental (MCS)"
                        data={dataMCS.filter(
                          (point) => point.y != null && point.x != null
                        )}
                        fill="#4071CA"
                      >
                        <ErrorBar
                          dataKey="error"
                          direction="y"
                          width={4}
                          stroke="#2A333A"
                        />
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>

                {/* Custom static X Axis */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "50px", // only left padding
                    paddingRight: "0", // right goes to the end
                    marginTop: -10,
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    fontSize: 12,
                    color: "#615E83",
                  }}
                >
                  {fixedXAxisTicksdays.map((label) => (
                    <span key={label} style={{ flex: 1, textAlign: "center" }}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`w-full h-fit flex ${
              width >= 1000 ? "flex-row pt-4" : "flex-col pt-6"
            } gap-6`}
          >
            <div
              className={`${
                width >= 1000 ? "w-1/2" : "w-full"
              } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
            >
              <p
                className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
              >
                OXFORD KNEE SCORE
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={oksDatabox.filter(
                        (item) =>
                          item.min !== undefined &&
                          item._median !== undefined &&
                          item._min !== undefined &&
                          item._max !== undefined
                      )} // Filter out undefined data
                      barCategoryGap="70%"
                      margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip
                        content={({ active, label }) => {
                          if (!active) return null;

                          const item = oksDatabox.find((d) => d.name === label);
                          if (!item) return null;

                          const renameMap = {
                            bottomWhisker: "poorestFunctionObserved",
                            bottomBox: "belowAverageFunctionRange",
                            topBox: "aboveAverageFunctionRange",
                            topWhisker: "bestFunctionObserved",
                            _median: "groupMedianFunctionScore",
                            _min: "lowestFunctionScore",
                            _max: "highestFunctionScore",
                            Patient: "patientScore",
                          };

                          // Chart colors for each key
                          const colorMap = {
                            patientScore: "#04CE00", // green
                            highestFunctionScore: "#1F77B4", // blue
                            lowestFunctionScore: "#1F77B4", // blue (paired)
                            bestFunctionObserved: "#9467BD", // purple
                            poorestFunctionObserved: "#9467BD", // purple (paired)
                            aboveAverageFunctionRange: "#FF7F0E", // orange
                            belowAverageFunctionRange: "#FF7F0E", // orange (paired)
                            groupMedianFunctionScore: "#000000", // white
                          };
                          const displayOrder = [
                            "patientScore",
                            "highestFunctionScore",
                            "bestFunctionObserved",
                            "aboveAverageFunctionRange",
                            "groupMedianFunctionScore",
                            "belowAverageFunctionRange",
                            "poorestFunctionObserved",
                            "lowestFunctionScore",
                          ];

                          return (
                            <div className="font-semibold text-black text-xs bg-white px-2 py-1 rounded-sm border-black border-1">
                              <p
                                className={`${poppins.className} text-center font-bold text-black text-sm`}
                              >
                                {`Timepoint: ${label}`}
                              </p>
                              {displayOrder.map((key) => {
                                const originalKey = Object.keys(renameMap).find(
                                  (k) => renameMap[k] === key
                                );
                                if (!originalKey || item[originalKey] == null)
                                  return null;

                                return (
                                  <div
                                    key={key}
                                    className={`${poppins.className} flex justify-between text-sm font-medium`}
                                    style={{ color: colorMap[key] }}
                                  >
                                    <span>{key}:</span>
                                    <span
                                      className="font-semibold text-right"
                                      style={{
                                        color: colorMap[key],
                                        minWidth: "50px",
                                      }}
                                    >
                                      {typeof item[originalKey] === "number"
                                        ? item[originalKey].toFixed(2)
                                        : item[originalKey]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      />

                      <Bar stackId="a" dataKey="min" fill="none" />
                      <Bar
                        stackId="a"
                        dataKey="bottomWhisker"
                        shape={<DotBar stroke="#2A333A" />}
                      />
                      <Bar
                        stackId="a"
                        dataKey="bottomBox"
                        fill="#2A333A"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topBox"
                        fill="#2A333A"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topWhisker"
                        shape={<DotBar stroke="#2A333A" />}
                      />
                      {/* Median Line */}
                      <Scatter
                        data={oksDatabox.filter(
                          (item) => item._median !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_median"
                            stroke="#ffffff"
                          />
                        )}
                        dataKey="_median"
                      />
                      {/* Min Line */}
                      <Scatter
                        data={oksDatabox.filter(
                          (item) => item._min !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_min"
                            stroke="#2A333A"
                          />
                        )}
                        dataKey="_min"
                      />
                      {/* Max Line */}
                      <Scatter
                        data={oksDatabox.filter(
                          (item) => item._max !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_max"
                            fill="#2A333A"
                            stroke="#2A333A"
                          />
                        )}
                        dataKey="_max"
                      />
                      <ZAxis type="number" dataKey="size" range={[0, 250]} />
                      <Scatter
                        data={oksDatabox.filter(
                          (item) =>
                            item.Patient !== undefined &&
                            item.Patient !== null &&
                            !isNaN(item.Patient) &&
                            item.Patient < 100 // optional: clamp to realistic max
                        )}
                        dataKey="Patient"
                        fill="#2A333A"
                        stroke="#2A333A"
                        shape={(props) => (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={5}
                            fill="#04CE00"
                          />
                        )}
                      />
                      <XAxis
                        dataKey="name"
                        type="category"
                        allowDuplicatedCategory={false}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={{ stroke: "#99a1af " }} // gray-500
                        tickLine={{ stroke: "#615E83" }}
                        hide={true}
                      />
                      <YAxis
                        label={{
                          value: "SCORE",
                          angle: -90,
                          position: "insideLeft",
                          offset: 20,
                          style: {
                            textAnchor: "middle",
                            fill: "#615E83",
                            fontSize: 14,
                            fontWeight: "700",
                            fontFamily: "Poppins",
                          },
                        }}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={false}
                        tickLine={{ stroke: "#615E83" }}
                        domain={[0, 48]}
                      />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingBottom: 20 }}
                        content={() => {
                          const labels = {
                            pcs: "Oxford Knee Score (OKS)",
                            mcs: "Other Patients",
                          };

                          const colors = {
                            pcs: "#04CE00",
                            mcs: "#2A333A",
                          };

                          return (
                            <ul className={`flex flex-col items-end`}>
                              {Object.entries(labels).map(([key, label]) => (
                                <li
                                  key={key}
                                  className={`flex flex-row items-center gap-2 w-2/5`}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      backgroundColor: colors[key],
                                    }}
                                  />
                                  <span
                                    className={`${inter.className} font-medium text-[10px] text-black`}
                                  >
                                    {label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Static X Axis */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "70px",
                    paddingRight: "50px",
                    marginTop: -10,
                  }}
                >
                  {fixedXAxisTicks.map((period) => (
                    <span
                      key={period}
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#615E83",
                        fontFamily: "Poppins",
                      }}
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`${
                width >= 1000 ? "w-1/2" : "w-full"
              } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
            >
              <p
                className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
              >
                SHORT FORM 12
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={sf12Databox.filter(
                        (item) =>
                          item.min !== undefined &&
                          item._median !== undefined &&
                          item._min !== undefined &&
                          item._max !== undefined
                      )} // Filter out undefined data
                      barCategoryGap="70%"
                      margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip
                        content={({ active, label }) => {
                          if (!active) return null;

                          const item = sf12Databox.find(
                            (d) => d.name === label
                          );
                          if (!item) return null;

                          const renameMap = {
                            bottomWhisker: "poorestFunctionObserved",
                            bottomBox: "belowAverageFunctionRange",
                            topBox: "aboveAverageFunctionRange",
                            topWhisker: "bestFunctionObserved",
                            _median: "groupMedianFunctionScore",
                            _min: "lowestFunctionScore",
                            _max: "highestFunctionScore",
                            Patient: "patientScore",
                          };

                          // Chart colors for each key
                          const colorMap = {
                            patientScore: "#04CE00", // green
                            highestFunctionScore: "#1F77B4", // blue
                            lowestFunctionScore: "#1F77B4", // blue (paired)
                            bestFunctionObserved: "#9467BD", // purple
                            poorestFunctionObserved: "#9467BD", // purple (paired)
                            aboveAverageFunctionRange: "#FF7F0E", // orange
                            belowAverageFunctionRange: "#FF7F0E", // orange (paired)
                            groupMedianFunctionScore: "#000000", // white
                          };
                          const displayOrder = [
                            "patientScore",
                            "highestFunctionScore",
                            "bestFunctionObserved",
                            "aboveAverageFunctionRange",
                            "groupMedianFunctionScore",
                            "belowAverageFunctionRange",
                            "poorestFunctionObserved",
                            "lowestFunctionScore",
                          ];

                          return (
                            <div className="font-semibold text-black text-xs bg-white px-2 py-1 rounded-sm border-black border-1">
                              <p
                                className={`${poppins.className} text-center font-bold text-black text-sm`}
                              >
                                {`Timepoint: ${label}`}
                              </p>
                              {displayOrder.map((key) => {
                                const originalKey = Object.keys(renameMap).find(
                                  (k) => renameMap[k] === key
                                );
                                if (!originalKey || item[originalKey] == null)
                                  return null;

                                return (
                                  <div
                                    key={key}
                                    className={`${poppins.className} flex justify-between text-sm font-medium`}
                                    style={{ color: colorMap[key] }}
                                  >
                                    <span>{key}:</span>
                                    <span
                                      className="font-semibold text-right"
                                      style={{
                                        color: colorMap[key],
                                        minWidth: "50px",
                                      }}
                                    >
                                      {typeof item[originalKey] === "number"
                                        ? item[originalKey].toFixed(2)
                                        : item[originalKey]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      />

                      <Bar stackId="a" dataKey="min" fill="none" />
                      <Bar
                        stackId="a"
                        dataKey="bottomWhisker"
                        shape={<DotBar stroke="#6888A1" />}
                      />
                      <Bar
                        stackId="a"
                        dataKey="bottomBox"
                        fill="#6888A1"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topBox"
                        fill="#6888A1"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topWhisker"
                        shape={<DotBar stroke="#6888A1" />}
                      />
                      {/* Median Line */}
                      <Scatter
                        data={sf12Databox.filter(
                          (item) => item._median !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_median"
                            stroke="#ffffff"
                          />
                        )}
                        dataKey="_median"
                      />
                      {/* Min Line */}
                      <Scatter
                        data={sf12Databox.filter(
                          (item) => item._min !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_min"
                            stroke="#6888A1"
                          />
                        )}
                        dataKey="_min"
                      />
                      {/* Max Line */}
                      <Scatter
                        data={sf12Databox.filter(
                          (item) => item._max !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_max"
                            fill="#6888A1"
                            stroke="#6888A1"
                          />
                        )}
                        dataKey="_max"
                      />
                      <ZAxis type="number" dataKey="size" range={[0, 250]} />
                      <Scatter
                        data={sf12Databox.filter(
                          (item) =>
                            item.Patient !== undefined &&
                            item.Patient !== null &&
                            !isNaN(item.Patient) &&
                            item.Patient < 100 // optional: clamp to realistic max
                        )}
                        dataKey="Patient"
                        fill="#2A333A"
                        stroke="#2A333A"
                        shape={(props) => (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={5}
                            fill="#04CE00"
                          />
                        )}
                      />
                      <XAxis
                        dataKey="name"
                        type="category"
                        allowDuplicatedCategory={false}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={{ stroke: "#99a1af " }} // gray-500
                        tickLine={{ stroke: "#615E83" }}
                        hide={true}
                      />
                      <YAxis
                        label={{
                          value: "SCORE",
                          angle: -90,
                          position: "insideLeft",
                          offset: 20,
                          style: {
                            textAnchor: "middle",
                            fill: "#615E83",
                            fontSize: 14,
                            fontWeight: "700",
                            fontFamily: "Poppins",
                          },
                        }}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={false}
                        tickLine={{ stroke: "#615E83" }}
                        domain={[0, 48]}
                      />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingBottom: 20 }}
                        content={() => {
                          const labels = {
                            pcs: "Short Form - 12 (SF-12)",
                            mcs: "Other Patients",
                          };

                          const colors = {
                            pcs: "#04CE00",
                            mcs: "#6888A1",
                          };

                          return (
                            <ul className={`flex flex-col items-end`}>
                              {Object.entries(labels).map(([key, label]) => (
                                <li
                                  key={key}
                                  className={`flex flex-row items-center gap-2 w-2/5`}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      backgroundColor: colors[key],
                                    }}
                                  />
                                  <span
                                    className={`${inter.className} font-medium text-[10px] text-black`}
                                  >
                                    {label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "70px",
                    paddingRight: "50px",
                    marginTop: -10,
                  }}
                >
                  {fixedXAxisTicks.map((period) => (
                    <span
                      key={period}
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#615E83",
                        fontFamily: "Poppins",
                      }}
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`w-full h-fit flex ${
              width >= 1000 ? "flex-row pt-4" : "flex-col pt-6"
            } gap-6`}
          >
            <div
              className={`${
                width >= 1000 ? "w-1/2" : "w-full"
              } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
            >
              <p
                className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
              >
                KNEE SOCIETY SCORE
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={kssDatabox.filter(
                        (item) =>
                          item.min !== undefined &&
                          item._median !== undefined &&
                          item._min !== undefined &&
                          item._max !== undefined
                      )} // Filter out undefined data
                      barCategoryGap="70%"
                      margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip
                        content={({ active, label }) => {
                          if (!active) return null;

                          const item = kssDatabox.find((d) => d.name === label);
                          if (!item) return null;

                          const renameMap = {
                            bottomWhisker: "poorestFunctionObserved",
                            bottomBox: "belowAverageFunctionRange",
                            topBox: "aboveAverageFunctionRange",
                            topWhisker: "bestFunctionObserved",
                            _median: "groupMedianFunctionScore",
                            _min: "lowestFunctionScore",
                            _max: "highestFunctionScore",
                            Patient: "patientScore",
                          };

                          // Chart colors for each key
                          const colorMap = {
                            patientScore: "#04CE00", // green
                            highestFunctionScore: "#1F77B4", // blue
                            lowestFunctionScore: "#1F77B4", // blue (paired)
                            bestFunctionObserved: "#9467BD", // purple
                            poorestFunctionObserved: "#9467BD", // purple (paired)
                            aboveAverageFunctionRange: "#FF7F0E", // orange
                            belowAverageFunctionRange: "#FF7F0E", // orange (paired)
                            groupMedianFunctionScore: "#000000", // white
                          };
                          const displayOrder = [
                            "patientScore",
                            "highestFunctionScore",
                            "bestFunctionObserved",
                            "aboveAverageFunctionRange",
                            "groupMedianFunctionScore",
                            "belowAverageFunctionRange",
                            "poorestFunctionObserved",
                            "lowestFunctionScore",
                          ];

                          return (
                            <div className="font-semibold text-black text-xs bg-white px-2 py-1 rounded-sm border-black border-1">
                              <p
                                className={`${poppins.className} text-center font-bold text-black text-sm`}
                              >
                                {`Timepoint: ${label}`}
                              </p>
                              {displayOrder.map((key) => {
                                const originalKey = Object.keys(renameMap).find(
                                  (k) => renameMap[k] === key
                                );
                                if (!originalKey || item[originalKey] == null)
                                  return null;

                                return (
                                  <div
                                    key={key}
                                    className={`${poppins.className} flex justify-between text-sm font-medium`}
                                    style={{ color: colorMap[key] }}
                                  >
                                    <span>{key}:</span>
                                    <span
                                      className="font-semibold text-right"
                                      style={{
                                        color: colorMap[key],
                                        minWidth: "50px",
                                      }}
                                    >
                                      {typeof item[originalKey] === "number"
                                        ? item[originalKey].toFixed(2)
                                        : item[originalKey]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      />

                      <Bar stackId="a" dataKey="min" fill="none" />
                      <Bar
                        stackId="a"
                        dataKey="bottomWhisker"
                        shape={<DotBar stroke="#9EB5B5" />}
                      />
                      <Bar
                        stackId="a"
                        dataKey="bottomBox"
                        fill="#9EB5B5"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topBox"
                        fill="#9EB5B5"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topWhisker"
                        shape={<DotBar stroke="#9EB5B5" />}
                      />
                      {/* Median Line */}
                      <Scatter
                        data={kssDatabox.filter(
                          (item) => item._median !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_median"
                            stroke="#ffffff"
                          />
                        )}
                        dataKey="_median"
                      />
                      {/* Min Line */}
                      <Scatter
                        data={kssDatabox.filter(
                          (item) => item._min !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_min"
                            stroke="#9EB5B5"
                          />
                        )}
                        dataKey="_min"
                      />
                      {/* Max Line */}
                      <Scatter
                        data={kssDatabox.filter(
                          (item) => item._max !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_max"
                            fill="#9EB5B5"
                            stroke="#9EB5B5"
                          />
                        )}
                        dataKey="_max"
                      />
                      <ZAxis type="number" dataKey="size" range={[0, 250]} />
                      <Scatter
                        data={kssDatabox.filter(
                          (item) =>
                            item.Patient !== undefined &&
                            item.Patient !== null &&
                            !isNaN(item.Patient) &&
                            item.Patient < 100 // optional: clamp to realistic max
                        )}
                        dataKey="Patient"
                        fill="#2A333A"
                        stroke="#2A333A"
                        shape={(props) => (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={5}
                            fill="#04CE00"
                          />
                        )}
                      />
                      <XAxis
                        dataKey="name"
                        type="category"
                        allowDuplicatedCategory={false}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={{ stroke: "#99a1af " }} // gray-500
                        tickLine={{ stroke: "#615E83" }}
                        hide={true}
                      />
                      <YAxis
                        label={{
                          value: "SCORE",
                          angle: -90,
                          position: "insideLeft",
                          offset: 20,
                          style: {
                            textAnchor: "middle",
                            fill: "#615E83",
                            fontSize: 14,
                            fontWeight: "700",
                            fontFamily: "Poppins",
                          },
                        }}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={false}
                        tickLine={{ stroke: "#615E83" }}
                        domain={[0, 48]}
                      />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingBottom: 20 }}
                        content={() => {
                          const labels = {
                            pcs: "Knee Society Score (KSS)",
                            mcs: "Other Patients",
                          };

                          const colors = {
                            pcs: "#04CE00",
                            mcs: "#9EB5B5",
                          };

                          return (
                            <ul className={`flex flex-col items-end`}>
                              {Object.entries(labels).map(([key, label]) => (
                                <li
                                  key={key}
                                  className={`flex flex-row items-center gap-2 w-2/5`}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      backgroundColor: colors[key],
                                    }}
                                  />
                                  <span
                                    className={`${inter.className} font-medium text-[10px] text-black`}
                                  >
                                    {label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "70px",
                    paddingRight: "50px",
                    marginTop: -10,
                  }}
                >
                  {fixedXAxisTicks.map((period) => (
                    <span
                      key={period}
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#615E83",
                        fontFamily: "Poppins",
                      }}
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`${
                width >= 1000 ? "w-1/2" : "w-full"
              } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
            >
              <p
                className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
              >
                KNEE INJURY AND OSTHEOARTHRITIS OUTCOME SCORE, JOINT REPLACEMENT
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={koosjrDatabox.filter(
                        (item) =>
                          item.min !== undefined &&
                          item._median !== undefined &&
                          item._min !== undefined &&
                          item._max !== undefined
                      )} // Filter out undefined data
                      barCategoryGap="70%"
                      margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip
                        content={({ active, label }) => {
                          if (!active) return null;

                          const item = koosjrDatabox.find(
                            (d) => d.name === label
                          );
                          if (!item) return null;

                          const renameMap = {
                            bottomWhisker: "poorestFunctionObserved",
                            bottomBox: "belowAverageFunctionRange",
                            topBox: "aboveAverageFunctionRange",
                            topWhisker: "bestFunctionObserved",
                            _median: "groupMedianFunctionScore",
                            _min: "lowestFunctionScore",
                            _max: "highestFunctionScore",
                            Patient: "patientScore",
                          };

                          // Chart colors for each key
                          const colorMap = {
                            patientScore: "#04CE00", // green
                            highestFunctionScore: "#1F77B4", // blue
                            lowestFunctionScore: "#1F77B4", // blue (paired)
                            bestFunctionObserved: "#9467BD", // purple
                            poorestFunctionObserved: "#9467BD", // purple (paired)
                            aboveAverageFunctionRange: "#FF7F0E", // orange
                            belowAverageFunctionRange: "#FF7F0E", // orange (paired)
                            groupMedianFunctionScore: "#000000", // white
                          };
                          const displayOrder = [
                            "patientScore",
                            "highestFunctionScore",
                            "bestFunctionObserved",
                            "aboveAverageFunctionRange",
                            "groupMedianFunctionScore",
                            "belowAverageFunctionRange",
                            "poorestFunctionObserved",
                            "lowestFunctionScore",
                          ];

                          return (
                            <div className="font-semibold text-black text-xs bg-white px-2 py-1 rounded-sm border-black border-1">
                              <p
                                className={`${poppins.className} text-center font-bold text-black text-sm`}
                              >
                                {`Timepoint: ${label}`}
                              </p>
                              {displayOrder.map((key) => {
                                const originalKey = Object.keys(renameMap).find(
                                  (k) => renameMap[k] === key
                                );
                                if (!originalKey || item[originalKey] == null)
                                  return null;

                                return (
                                  <div
                                    key={key}
                                    className={`${poppins.className} flex justify-between text-sm font-medium`}
                                    style={{ color: colorMap[key] }}
                                  >
                                    <span>{key}:</span>
                                    <span
                                      className="font-semibold text-right"
                                      style={{
                                        color: colorMap[key],
                                        minWidth: "50px",
                                      }}
                                    >
                                      {typeof item[originalKey] === "number"
                                        ? item[originalKey].toFixed(2)
                                        : item[originalKey]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      />

                      <Bar stackId="a" dataKey="min" fill="none" />
                      <Bar
                        stackId="a"
                        dataKey="bottomWhisker"
                        shape={<DotBar stroke="#D88C8A" />}
                      />
                      <Bar
                        stackId="a"
                        dataKey="bottomBox"
                        fill="#D88C8A"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topBox"
                        fill="#D88C8A"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topWhisker"
                        shape={<DotBar stroke="#D88C8A" />}
                      />
                      {/* Median Line */}
                      <Scatter
                        data={koosjrDatabox.filter(
                          (item) => item._median !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_median"
                            stroke="#ffffff"
                          />
                        )}
                        dataKey="_median"
                      />
                      {/* Min Line */}
                      <Scatter
                        data={koosjrDatabox.filter(
                          (item) => item._min !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_min"
                            stroke="#D88C8A"
                          />
                        )}
                        dataKey="_min"
                      />
                      {/* Max Line */}
                      <Scatter
                        data={koosjrDatabox.filter(
                          (item) => item._max !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_max"
                            fill="#D88C8A"
                            stroke="#D88C8A"
                          />
                        )}
                        dataKey="_max"
                      />
                      <ZAxis type="number" dataKey="size" range={[0, 250]} />
                      <Scatter
                        data={koosjrDatabox.filter(
                          (item) =>
                            item.Patient !== undefined &&
                            item.Patient !== null &&
                            !isNaN(item.Patient) &&
                            item.Patient < 100 // optional: clamp to realistic max
                        )}
                        dataKey="Patient"
                        fill="#2A333A"
                        stroke="#2A333A"
                        shape={(props) => (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={5}
                            fill="#04CE00"
                          />
                        )}
                      />
                      <XAxis
                        dataKey="name"
                        type="category"
                        allowDuplicatedCategory={false}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={{ stroke: "#99a1af " }} // gray-500
                        tickLine={{ stroke: "#615E83" }}
                        hide={true}
                      />
                      <YAxis
                        label={{
                          value: "SCORE",
                          angle: -90,
                          position: "insideLeft",
                          offset: 20,
                          style: {
                            textAnchor: "middle",
                            fill: "#615E83",
                            fontSize: 14,
                            fontWeight: "700",
                            fontFamily: "Poppins",
                          },
                        }}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={false}
                        tickLine={{ stroke: "#615E83" }}
                        domain={[0, 28]}
                      />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingBottom: 20 }}
                        content={() => {
                          const labels = {
                            pcs: "KOOS, JR",
                            mcs: "Other Patients",
                          };

                          const colors = {
                            pcs: "#04CE00",
                            mcs: "#D88C8A",
                          };

                          return (
                            <ul className={`flex flex-col items-end`}>
                              {Object.entries(labels).map(([key, label]) => (
                                <li
                                  key={key}
                                  className={`flex flex-row items-center gap-2 w-2/5`}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      backgroundColor: colors[key],
                                    }}
                                  />
                                  <span
                                    className={`${inter.className} font-medium text-[10px] text-black`}
                                  >
                                    {label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "70px",
                    paddingRight: "50px",
                    marginTop: -10,
                  }}
                >
                  {fixedXAxisTicks.map((period) => (
                    <span
                      key={period}
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#615E83",
                        fontFamily: "Poppins",
                      }}
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`w-full h-fit flex ${
              width >= 1000 ? "flex-row pt-4" : "flex-col pt-6"
            } gap-6`}
          >
            <div
              className={`${
                width >= 1000 ? "w-1/2" : "w-full"
              } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
            >
              <p
                className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
              >
                FORGOTTEN JOINT SCORE
              </p>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={fjsDatabox.filter(
                        (item) =>
                          item.min !== undefined &&
                          item._median !== undefined &&
                          item._min !== undefined &&
                          item._max !== undefined
                      )} // Filter out undefined data
                      barCategoryGap="70%"
                      margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip
                        content={({ active, label }) => {
                          if (!active) return null;

                          const item = fjsDatabox.find((d) => d.name === label);
                          if (!item) return null;

                          const renameMap = {
                            bottomWhisker: "poorestFunctionObserved",
                            bottomBox: "belowAverageFunctionRange",
                            topBox: "aboveAverageFunctionRange",
                            topWhisker: "bestFunctionObserved",
                            _median: "groupMedianFunctionScore",
                            _min: "lowestFunctionScore",
                            _max: "highestFunctionScore",
                            Patient: "patientScore",
                          };

                          // Chart colors for each key
                          const colorMap = {
                            patientScore: "#04CE00", // green
                            highestFunctionScore: "#1F77B4", // blue
                            lowestFunctionScore: "#1F77B4", // blue (paired)
                            bestFunctionObserved: "#9467BD", // purple
                            poorestFunctionObserved: "#9467BD", // purple (paired)
                            aboveAverageFunctionRange: "#FF7F0E", // orange
                            belowAverageFunctionRange: "#FF7F0E", // orange (paired)
                            groupMedianFunctionScore: "#000000", // white
                          };
                          const displayOrder = [
                            "patientScore",
                            "highestFunctionScore",
                            "bestFunctionObserved",
                            "aboveAverageFunctionRange",
                            "groupMedianFunctionScore",
                            "belowAverageFunctionRange",
                            "poorestFunctionObserved",
                            "lowestFunctionScore",
                          ];

                          return (
                            <div className="font-semibold text-black text-xs bg-white px-2 py-1 rounded-sm border-black border-1">
                              <p
                                className={`${poppins.className} text-center font-bold text-black text-sm`}
                              >
                                {`Timepoint: ${label}`}
                              </p>
                              {displayOrder.map((key) => {
                                const originalKey = Object.keys(renameMap).find(
                                  (k) => renameMap[k] === key
                                );
                                if (!originalKey || item[originalKey] == null)
                                  return null;

                                return (
                                  <div
                                    key={key}
                                    className={`${poppins.className} flex justify-between text-sm font-medium`}
                                    style={{ color: colorMap[key] }}
                                  >
                                    <span>{key}:</span>
                                    <span
                                      className="font-semibold text-right"
                                      style={{
                                        color: colorMap[key],
                                        minWidth: "50px",
                                      }}
                                    >
                                      {typeof item[originalKey] === "number"
                                        ? item[originalKey].toFixed(2)
                                        : item[originalKey]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      />

                      <Bar stackId="a" dataKey="min" fill="none" />
                      <Bar
                        stackId="a"
                        dataKey="bottomWhisker"
                        shape={<DotBar stroke="#9EA6B5" />}
                      />
                      <Bar
                        stackId="a"
                        dataKey="bottomBox"
                        fill="#9EA6B5"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topBox"
                        fill="#9EA6B5"
                        radius={[4, 0, 0, 4]}
                      />
                      <Bar
                        stackId="a"
                        dataKey="topWhisker"
                        shape={<DotBar stroke="#9EA6B5" />}
                      />
                      {/* Median Line */}
                      <Scatter
                        data={fjsDatabox.filter(
                          (item) => item._median !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_median"
                            stroke="#ffffff"
                          />
                        )}
                        dataKey="_median"
                      />
                      {/* Min Line */}
                      <Scatter
                        data={fjsDatabox.filter(
                          (item) => item._min !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_min"
                            stroke="#9EA6B5"
                          />
                        )}
                        dataKey="_min"
                      />
                      {/* Max Line */}
                      <Scatter
                        data={fjsDatabox.filter(
                          (item) => item._max !== undefined
                        )} // Ensure valid data
                        shape={(props) => (
                          <HorizonBar
                            {...props}
                            dataKey="_max"
                            fill="#9EA6B5"
                            stroke="#9EA6B5"
                          />
                        )}
                        dataKey="_max"
                      />
                      <ZAxis type="number" dataKey="size" range={[0, 250]} />
                      <Scatter
                        data={fjsDatabox.filter(
                          (item) =>
                            item.Patient !== undefined &&
                            item.Patient !== null &&
                            !isNaN(item.Patient) &&
                            item.Patient < 100 // optional: clamp to realistic max
                        )}
                        dataKey="Patient"
                        fill="#2A333A"
                        stroke="#2A333A"
                        shape={(props) => (
                          <circle
                            cx={props.cx}
                            cy={props.cy}
                            r={5}
                            fill="#04CE00"
                          />
                        )}
                      />
                      <XAxis
                        dataKey="name"
                        type="category"
                        allowDuplicatedCategory={false}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={{ stroke: "#99a1af " }} // gray-500
                        tickLine={{ stroke: "#615E83" }}
                        hide={true}
                      />
                      <YAxis
                        label={{
                          value: "SCORE",
                          angle: -90,
                          position: "insideLeft",
                          offset: 20,
                          style: {
                            textAnchor: "middle",
                            fill: "#615E83",
                            fontSize: 14,
                            fontWeight: "700",
                            fontFamily: "Poppins",
                          },
                        }}
                        tick={{
                          fill: "#615E83",
                          fontSize: 12,
                          fontWeight: "600",
                          fontFamily: "Poppins",
                        }}
                        axisLine={false}
                        tickLine={{ stroke: "#615E83" }}
                        domain={[0, 48]}
                      />

                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        wrapperStyle={{ paddingBottom: 20 }}
                        content={() => {
                          const labels = {
                            pcs: "Forgotten Joint Score (FJS)",
                            mcs: "Other Patients",
                          };

                          const colors = {
                            pcs: "#04CE00",
                            mcs: "#9EA6B5",
                          };

                          return (
                            <ul className={`flex flex-col items-end`}>
                              {Object.entries(labels).map(([key, label]) => (
                                <li
                                  key={key}
                                  className={`flex flex-row items-center gap-2 w-2/5`}
                                >
                                  <span
                                    style={{
                                      display: "inline-block",
                                      width: 7,
                                      height: 7,
                                      borderRadius: "50%",
                                      backgroundColor: colors[key],
                                    }}
                                  />
                                  <span
                                    className={`${inter.className} font-medium text-[10px] text-black`}
                                  >
                                    {label}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          );
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "70px",
                    paddingRight: "50px",
                    marginTop: -10,
                  }}
                >
                  {fixedXAxisTicks.map((period) => (
                    <span
                      key={period}
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "#615E83",
                        fontFamily: "Poppins",
                      }}
                    >
                      {period}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${width >= 1000 ? "w-1/2" : "w-full"}`}> </div>
          </div>
        </>
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

      {showAlert && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
          <div
            className={`${poppins.className} bg-yellow-100 border border-red-400 text-yellow-800 px-6 py-3 rounded-lg shadow-lg animate-fade-in-out`}
          >
            {alermessage}
          </div>
        </div>
      )}

      {logoutconfirm &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-40 "
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // white with 50% opacity
            }}
          >
            <div
              className={`min-h-[100vh]  flex flex-col items-center justify-center mx-auto my-auto ${
                width < 950 ? "gap-4 w-full" : "w-1/3"
              }`}
            >
              <div
                className={`w-full bg-[#FCFCFC]  p-4  overflow-y-auto overflow-x-hidden inline-scroll ${
                  width < 1095 ? "flex flex-col gap-4" : ""
                } max-h-[92vh] rounded-2xl`}
              >
                <div
                  className={`w-full bg-[#FCFCFC]  ${
                    width < 760 ? "h-fit" : "h-[80%]"
                  } `}
                >
                  <div
                    className={`w-full h-full rounded-lg flex flex-col gap-8 ${
                      width < 760 ? "py-0" : "py-4 px-4"
                    }`}
                  >
                    <div className={`w-full flex flex-col gap-1`}>
                      <div className="flex flex-row justify-center items-center w-full">
                        <p
                          className={`${inter.className} text-xl font-bold text-black`}
                        >
                          Confirmation
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-full flex gap-2 justify-center items-center ${
                        width >= 1200 ? "flex-col" : "flex-col"
                      }`}
                    >
                      <p
                        className={`${raleway.className} text-lg font-semibold text-black`}
                      >
                        Are you sure need to sign out?
                      </p>
                    </div>

                    <div className={`w-full flex flex-row`}>
                      <div
                        className={`w-full flex flex-row gap-6 items-center ${
                          width < 700 ? "justify-between" : "justify-end"
                        }`}
                      >
                        <button
                          className={`text-black/80 font-normal ${
                            raleway.className
                          } cursor-pointer ${width < 700 ? "w-1/2" : "w-1/2"}`}
                          onClick={() => {
                            setlogoutconfirm(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className={`bg-[#161C10] text-white py-2 font-normal cursor-pointer ${
                            raleway.className
                          } ${width < 700 ? "w-1/2" : "w-1/2"}`}
                          onClick={() => {
                            handlelogout();
                          }}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
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
          document.body
        )}

      {isFloatingNoteVisible &&
        createPortal(
          <div
            className={` ${poppins.className} fixed z-50 rounded-xl shadow-2xl border border-gray-300 bg-gradient-to-br from-white to-gray-50 w-80 select-none inline-scroll floating-note-header`}
            style={{
              top: position.y,
              left: position.x,
              cursor: isDragging ? "grabbing" : "grab",
              transition: isDragging
                ? "none"
                : "top 0.15s ease, left 0.15s ease",
            }}
            onMouseDown={(e) => {
              setIsDragging(true);
              setOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y,
              });
            }}
          >
            {/* Header */}
            <div
              className="flex justify-between items-center bg-black text-white px-3 py-2 rounded-t-xl cursor-move"
              onMouseDown={(e) => {
                setIsDragging(true);
                setOffset({
                  x: e.clientX - position.x,
                  y: e.clientY - position.y,
                });
              }}
            >
              <span className="font-semibold text-sm">🗒️ Patient Note</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFloatingNoteVisible(false);
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  setIsFloatingNoteVisible(false);
                }} // ✅ prevent touch drag start
                className="hover:text-red-300 font-bold cursor-pointer"
                title="Close"
              >
                <XCircleIcon className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Body */}
            <div className="p-3 text-gray-800 text-sm max-h-60 overflow-y-auto">
              {floatingNote ? (
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-800 text-center">
                    {floatingName}
                  </h4>
                  <h5 className="font-semibold text-gray-700 text-center">
                    Period: {floatingKey}
                  </h5>
                  {floatingNote.split(",").map((item, index) => {
                    const [key, value] = item.split(":").map((s) => s.trim());
                    return (
                      <div key={index} className="flex flex-col">
                        <span className="font-semibold text-gray-600 capitalize">
                          {key}
                        </span>
                        <span className="text-black break-words whitespace-pre-wrap">
                          {value || "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No note details available
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
});

export default Patientreport;
