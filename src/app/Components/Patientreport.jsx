"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

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

const Patientreport = ({ handlenavigateviewsurgeryreport }) => {
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

  let patientReportId = null;

  if (typeof window !== "undefined") {
    patientReportId = sessionStorage.getItem("patientreportid");
  }

  useEffect(() => {
    if (!patientReportId) {
      showWarning("No patient report found");
      return;
    }

    const fetchPatientReminder = async () => {
      try {
        const res = await axios.get(
          `${API_URL}patients-by-uhid/${patientReportId}`
        );

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

        // calculate BMI
        const calculateBMI = (heightStr, weightStr) => {
          if (!heightStr || !weightStr) return "NA";
          const heightVal = parseFloat(heightStr.replace("cm", "").trim());
          const weightVal = parseFloat(weightStr.replace("kg", "").trim());
          if (isNaN(heightVal) || isNaN(weightVal) || heightVal === 0)
            return "NA";
          const heightM = heightVal / 100; // convert cm → m
          return (weightVal / (heightM * heightM)).toFixed(1); // 1 decimal place
        };

        const bmi = calculateBMI(
          patient.Medical?.height,
          patient.Medical?.weight
        );

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

        const pickedData = {
          name: patient.Patient?.name ?? "NA",
          age: calculateAge(patient.Patient?.birthDate),
          gender: patient.Patient?.gender ?? "NA",
          phone: patient.Patient?.phone ?? "NA",
          email: patient.Patient?.email ?? "NA",
          uhid: patient.uhid ?? "NA",
          statusLeft: patient.Patient_Status_Left ?? "NA",
          statusRight: patient.Patient_Status_Right ?? "NA",
          leftCompleted: patient.Medical_Left_Completed_Count ?? "NA",
          leftPending: patient.Medical_Left_Pending_Count ?? "NA",
          rightCompleted: patient.Medical_Right_Completed_Count ?? "NA",
          rightPending: patient.Medical_Right_Pending_Count ?? "NA",
          bmi: bmi, // ✅ store BMI instead of height/weight
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
        };

        const ques = {
          questionnaire_left: patient.Medical_Left ?? {},
          questionnaire_right: patient.Medical_Right ?? {},
        };

        setselectedpatientques(ques);

        setpatientbasic(pickedData);

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
          `${API_URL}patients/by-doctor-uhid/${adminUhid}`
        );
        // console.log("✅ API Response:", res.data);

        // setPatients1(res.data.patients || []);

        const apiPatients = res.data.patients || [];

        // 🔄 Map API data → static UI format
        const mapped = apiPatients
          .filter((p) => p.uhid !== patientReportId) // remove only that patient
          .map((p) => ({
            left_questionnaires: p.Medical_Left ?? {},
            right_questionnaires: p.Medical_Right ?? {},
          }));

        setpatientsques(consolidateQuestionnaires(mapped));
        console.log("Other patients scores", consolidateQuestionnaires(mapped));
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
  const oksBoxPlotDataLeft = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_left,
    "OKS",
    "left"
  );

  // Right side OKS
  const oksBoxPlotDataRight = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_right,
    "OKS",
    "right"
  );

  const oksBoxPlotData =
    handlequestableswitch === "left" ? oksBoxPlotDataLeft : oksBoxPlotDataRight;

  const oksDatabox = useBoxPlot(
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
    })
  );

  // Left side OKS
  const sf12BoxPlotDataLeft = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_left,
    "SF12",
    "left"
  );

  // Right side OKS
  const sf12BoxPlotDataRight = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_right,
    "SF12",
    "right"
  );

  const sf12BoxPlotData =
    handlequestableswitch === "left"
      ? sf12BoxPlotDataLeft
      : sf12BoxPlotDataRight;

  const s12Databox = useBoxPlot(
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
    })
  );

  // Left side OKS
  const kssBoxPlotDataLeft = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_left,
    "KSS",
    "left"
  );

  // Right side OKS
  const kssBoxPlotDataRight = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_right,
    "KSS",
    "right"
  );

  const kssBoxPlotData =
    handlequestableswitch === "left" ? kssBoxPlotDataLeft : kssBoxPlotDataRight;

  const kssDatabox = useBoxPlot(
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
    })
  );

  // Left side OKS
  const koosjrBoxPlotDataLeft = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_left,
    "KOOS_JR",
    "left"
  );

  // Right side OKS
  const koosjrBoxPlotDataRight = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_right,
    "KOOS_JR",
    "right"
  );

  const koosjrBoxPlotData =
    handlequestableswitch === "left"
      ? koosjrBoxPlotDataLeft
      : koosjrBoxPlotDataRight;

  const koosjrDatabox = useBoxPlot(
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
    })
  );

  const fjsBoxPlotDataLeft = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_left,
    "FJS",
    "left"
  );

  // Right side OKS
  const fjsBoxPlotDataRight = buildBoxPlotData(
    patientsquest,
    patientbasic?.questionnaire_right,
    "FJS",
    "right"
  );

  const fjsBoxPlotData =
    handlequestableswitch === "left" ? fjsBoxPlotDataLeft : fjsBoxPlotDataRight;

  const fjsDatabox = useBoxPlot(
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
    })
  );

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

        if (!qPeriods?.[p.label]) {
          // Period itself not present
          scores[p.key] = "-";
          notesMap[p.key] = "-";
        } else if (periodData && !periodData.score) {
          // Period exists but score missing
          scores[p.key] = "NA";

          // Notes
          const [first, second, third, fourth] = periodData.other_notes || [];
          const filtered = [];
          if (first === "No") filtered.push(first);
          if (third === "No") filtered.push(third);
          notesMap[p.key] = filtered.length ? filtered.join(", ") : "NA";
        } else {
          // Period exists and score exists
          const match = periodData.score.match(/:\s*(\d+)/);
          scores[p.key] = match ? match[1] : "NA";

          const [first, second, third, fourth] = periodData.other_notes || [];
          const filtered = [];
          if (first === "No") filtered.push(first);
          if (third === "No") filtered.push(third);
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
          scores[p.key] = match ? match[1] : "NA";

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
  const periodOffsets = [
    { key: "pre_op", label: "Pre Op" },
    { key: "6w", label: "6W" },
    { key: "3m", label: "3M" },
    { key: "6m", label: "6M" },
    { key: "1y", label: "1Y" },
    { key: "2y", label: "2Y" },
  ];

  // ✅ Safe extraction with optional chaining + fallback
  const leftScores = extractQuestionnaireScores(
    patientbasic?.questionnaire_left || {},
    periodOffsets
  );

  const rightScores = extractQuestionnaireScores(
    patientbasic?.questionnaire_right || {},
    periodOffsets
  );

  // Map each period key to chart label and days
  const periodLabelMap = {
    pre_op: "-3",
    surgery: "SURGERY",
    "6w": "+42",
    "3m": "+90",
    "6m": "+180",
    "1y": "+365",
    "2y": "+730",
  };

  const toNumberOrNull = (val) => {
    if (!val || val === "-" || val === "NA") return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };

  // Convert your array of questionnaire scores into chart-ready data
  const buildChartData = (scores) => {
    return periodOffsets.map((p) => {
      const oks =
        scores.find((q) => q.name.includes("Oxford Knee Score"))?.scores?.[
          p.key
        ] || null;
      const sf12 =
        scores.find((q) => q.name.includes("SF-12"))?.scores?.[p.key] || null;
      const koos =
        scores.find((q) => q.name.includes("KOOS"))?.scores?.[p.key] || null;
      const kss =
        scores.find((q) => q.name.includes("Knee Society Score"))?.scores?.[
          p.key
        ] || null;
      const fjs =
        scores.find((q) => q.name.includes("Forgotten Joint Score"))?.scores?.[
          p.key
        ] || null;

      return {
        name: p.label, // your "-3", "SURGERY", "+42", etc.
        oks: oks ? Number(oks) : null,
        sf12: sf12 ? Number(sf12) : null,
        koos: koos ? Number(koos) : null,
        kss: kss ? Number(kss) : null,
        fjs: fjs ? Number(fjs) : null,
      };
    });
  };

  // then use like this
  const chartData =
    handlequestableswitch === "left"
      ? buildChartData(leftScores)
      : buildChartData(rightScores);

  const periodOffsetssf12 = [
    { key: "pre_op", label: "-3" },
    { key: "surgery", label: "SURGERY" },
    { key: "6w", label: "+42" },
    { key: "3m", label: "+90" },
    { key: "6m", label: "+180" },
    { key: "1y", label: "+365" },
    { key: "2y", label: "+730" },
  ];

  const extractSf12Scores = (sf12Data, periodOffsets) => {
    if (!sf12Data || Object.keys(sf12Data).length === 0) return [];

    const map = {
      "Pre Op": "-3",
      "6W": "+42",
      "3M": "+90",
      "6M": "+180",
      "1Y": "+365",
      "2Y": "+730",
    };

    const result = Object.entries(sf12Data).map(([period, details], index) => {
      if (!details?.score) {
        return {
          x: index,
          name: map[period] || period,
          pScore: null,
          mScore: null,
        };
      }

      // Example: "Scores (6W): 53, 23, 30 (Recorded at ...)"
      const match = details.score.match(
        /Scores.*?:\s*([\d]+),\s*([\d]+),\s*([\d]+)/
      );

      const pScore = match ? Number(match[2]) : null; // 2nd
      const mScore = match ? Number(match[3]) : null; // 3rd

      return {
        x: index,
        name: map[period] || period,
        pScore,
        mScore,
      };
    });

    // Insert SURGERY marker between Pre Op (-3) and 6W (+42)
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

  return (
    <div
      className={`w-full overflow-y-auto h-full flex flex-col pt-8 pb-12 inline-scroll ${
        width >= 1000 ? "px-12" : "px-8"
      } rounded-4xl inline-scroll`}
    >
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
                className={`${width < 400 ? "w-full" : "w-1/2"} flex flex-col`}
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
                  L: {patientbasic.statusLeft ?? "NA"} R:{" "}
                  {patientbasic.statusRight ?? "NA"}
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
          className={`${width >= 800 ? "w-1/2" : "w-full"} flex justify-end`}
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
                  onClick={handlenavigateviewsurgeryreport}
                >
                  View Surgery
                </p>
              </div>
              <p
                className={`${inter.className} text-end font-semibold text-[15px] text-[#484848] w-3/7`}
              >
                BMI: 27
              </p>
            </div>

            <div className={`w-full flex flex-row justify-end gap-4`}>
              <div
                className={`w-3/7 flex flex-row items-center justify-center gap-2 bg-[#FFF5F7] px-2 py-1 rounded-[10px]`}
              >
                <ArrowDownCircleIcon className="w-4 h-4 text-[#DE8E8A]" />
                <p
                  className={`${inter.className} font-medium text-[15px] text-[#DE8E8A]`}
                >
                  23 %
                </p>
              </div>
              <div className={`w-3/7 flex flex-col items-center`}>
                <div
                  className={`w-full flex flex-row items-center justify-center gap-2 bg-[#EBF4F1] px-2 py-1 rounded-[10px]`}
                >
                  <p
                    className={`${inter.className} font-semibold text-sm text-[#484848]`}
                  >
                    42.73
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
                  !surgerydatleft || surgerydatleft === "NA"
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
                  !surgerydatleft || surgerydatleft === "NA"
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
                  !surgerydatright || surgerydatright === "NA"
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
                  ${
                    handlequestableswitch === "right"
                      ? "bg-[#2B333E] text-white"
                      : "bg-[#CAD9D6] text-black"
                  }`}
                onClick={
                  !surgerydatright || surgerydatright === "NA"
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
              <table className="min-w-full table-fixed border-separate border-spacing-y-1">
                <thead className="text-[#475467] text-[16px] font-medium text-center">
                  <tr className="rounded-2xl">
                    <th
                      className={`${inter.className} font-bold text-white text-sm px-2 py-1 bg-gray-900 rounded-tl-2xl text-center whitespace-nowrap w-3/5`}
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
                        <div className="flex flex-row items-center gap-1 w-full">
                          <div className={`w-fit flex flex-col`}>
                            <span
                              className={`${inter.className} text-[15px]  text-white font-bold`}
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
                        className={`${raleway.className} font-semibold px-4 py-2 text-[#1F2937]`}
                      >
                        {q.name}
                      </td>

                      {Object.keys(q.scores || {}).length > 0 ? (
                        questionnaireData.periods.map((period) => {
                          const score = q.scores?.[period.key];
                          const color = getTextColor(Number(score));

                          return (
                            <td
                              key={period.key}
                              className={`px-4 py-2 font-bold text-center align-middle ${
                                q.notesMap[period.key] &&
                                q.notesMap[period.key] !== "NA"
                                  ? "cursor-pointer"
                                  : ""
                              }`}
                              style={{ color }}
                              title={
                                q.notesMap[period.key] &&
                                q.notesMap[period.key] !== "NA"
                                  ? q.notesMap[period.key]
                                  : undefined
                              } // Hover text
                            >
                              {score || "—"}
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
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="8 10" vertical={false} />

              <XAxis
                dataKey="name"
                axisLine={{ stroke: "#99a1af " }} // gray-500
                label={{
                  value: "DAYS",
                  position: "insideBottom",
                  offset: -5,
                  style: {
                    fill: "#615E83", // label color
                    fontSize: 14, // label font size
                    fontWeight: 700,
                    fontFamily: "Poppins",
                  },
                }}
                tick={{
                  fill: "#615E83",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "Poppins",
                }} // tick values
              />

              <YAxis
                axisLine={false}
                label={{
                  value: "SCORE",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    fill: "#615E83", // label color
                    fontSize: 14, // label font size
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
                }} // tick values
                domain={[0, 100]}
              />

              <Tooltip
                isAnimationActive={false}
                content={({ active, payload, label }) => {
                  if (label === "SURGERY" || !active || !payload?.length)
                    return null;

                  return (
                    <div className="bg-white p-2 border rounded shadow text-black">
                      <p className="font-semibold">{label} Days</p>
                      {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.stroke }}>
                          {entry.name}: {entry.value}
                        </p>
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
                            checked={selectedQuestionnaires.includes(key)}
                            readOnly
                            className="accent-blue-600 w-3 h-3"
                          />
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: 12,
                              color: selectedQuestionnaires.includes(key)
                                ? colors[key] // Active → real color
                                : "#A0AEC0", // Inactive → gray color
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
                  "#4F46E5", // Indigo
                  "#A855F7", // Purple
                  "#10B981", // Emerald
                  "#F97316", // Orange
                  "#3B82F6", // Blue
                ];

                const labels = {
                  oks: "Oxford Knee Score",
                  sf12: "Short Form - 12",
                  koos: "KOOS",
                  kss: "Knee Society Score",
                  fjs: "Forgotten Joint Score",
                };

                if (!selectedQuestionnaires.includes(key)) {
                  return null; // Don't render if not selected
                }

                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    connectNulls={true} // Continue connecting lines even when there's no data
                    name={labels[key]}
                    stroke={colors[i]}
                    strokeWidth={2}
                    dot={({ cx, cy, payload, index }) => {
                      // Check if the value exists before rendering the dot
                      if (payload[key] == null || payload[key] === 0) {
                        return null; // Don't render the dot if there's no data
                      }

                      return (
                        <circle
                          key={`dot-${index}`} // Ensure unique key
                          cx={cx}
                          cy={cy}
                          r={3}
                          stroke={colors[i]}
                          strokeWidth={1}
                          fill={colors[i]}
                        />
                      );
                    }}
                    activeDot={({ payload }) => {
                      // Only show active dot if there's data
                      if (payload[key] == null || payload[key] === 0) {
                        return null; // Don't render active dot if there's no data
                      }

                      return (
                        <circle
                          r={6}
                          stroke="black"
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
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: -20, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="8 10" vertical={false} />

              <XAxis
                type="number"
                axisLine={{ stroke: "#99a1af " }} // gray-500
                dataKey="x"
                domain={[-0.5, transformedData.length - 0.5]}
                tickFormatter={(tick) => {
                  const i = Math.round(tick);
                  return transformedData[i]?.name || "";
                }}
                ticks={transformedData.map((_, index) => index)}
                allowDecimals={false}
                tick={{
                  fill: "#615E83",
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: "Poppins",
                }}
                label={{
                  value: "DAYS",
                  position: "insideBottom",
                  offset: -5,
                  fontWeight: "bold",
                  fill: "#615E83",
                  style: {
                    fill: "#615E83", // label color
                    fontSize: 14, // label font size
                    fontWeight: 700,
                    fontFamily: "Poppins",
                  },
                }}
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
                    fill: "#615E83", // label color
                    fontSize: 14, // label font size
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
                        {/* {payload.map((entry, index) =>
                          index % 2 !== 0 ? (
                            <div key={index}>{entry.name}: {entry.value}</div>
                          ) : null
                        )} */}
                        PCS: {payload[1].value}
                        <br></br>
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

                  const colors = {
                    pcs: "#6888A1",
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

              {/* Physical Component Summary (PCS) Scatter */}
              <Scatter
                name="Physical (PCS)"
                data={dataPCS.filter(
                  (point) => point.y != null && point.x != null
                )} // Filter out invalid data
                fill="#4071CA"
              >
                <ErrorBar
                  dataKey="error"
                  direction="y"
                  width={4}
                  stroke="#6888A1"
                />
              </Scatter>

              {/* Mental Component Summary (MCS) Scatter */}
              <Scatter
                name="Mental (MCS)"
                data={dataMCS.filter(
                  (point) => point.y != null && point.x != null
                )} // Filter out invalid data
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
              margin={{ top: 10, bottom: 0, left: 0, right: 20 }}
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
                        className={`${poppins.className} font-bold text-black text-sm`}
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
                          <p
                            key={key}
                            className={`${poppins.className} font-medium text-sm`}
                            style={{ color: colorMap[key] }}
                          >
                            {key}:{" "}
                            <span
                              className="font-semibold"
                              style={{ color: colorMap[key] }}
                            >
                              {typeof item[originalKey] === "number"
                                ? item[originalKey].toFixed(2)
                                : item[originalKey]}
                            </span>
                          </p>
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
                data={oksDatabox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={oksDatabox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#2A333A" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={oksDatabox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                  <circle cx={props.cx} cy={props.cy} r={5} fill="#04CE00" />
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
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={s12Databox.filter(
                (item) =>
                  item.min !== undefined &&
                  item._median !== undefined &&
                  item._min !== undefined &&
                  item._max !== undefined
              )} // Filter out undefined data
              barCategoryGap="70%"
              margin={{ top: 10, bottom: 0, left: 0, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip
                content={({ active, label }) => {
                  if (!active) return null;

                  const item = s12Databox.find((d) => d.name === label);
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
                        className={`${poppins.className} font-bold text-black text-sm`}
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
                          <p
                            key={key}
                            className={`${poppins.className} font-medium text-sm`}
                            style={{ color: colorMap[key] }}
                          >
                            {key}:{" "}
                            <span
                              className="font-semibold"
                              style={{ color: colorMap[key] }}
                            >
                              {typeof item[originalKey] === "number"
                                ? item[originalKey].toFixed(2)
                                : item[originalKey]}
                            </span>
                          </p>
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
                data={s12Databox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={s12Databox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#6888A1" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={s12Databox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                data={s12Databox.filter(
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
                  <circle cx={props.cx} cy={props.cy} r={5} fill="#04CE00" />
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
              margin={{ top: 10, bottom: 0, left: 0, right: 20 }}
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
                        className={`${poppins.className} font-bold text-black text-sm`}
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
                          <p
                            key={key}
                            className={`${poppins.className} font-medium text-sm`}
                            style={{ color: colorMap[key] }}
                          >
                            {key}:{" "}
                            <span
                              className="font-semibold"
                              style={{ color: colorMap[key] }}
                            >
                              {typeof item[originalKey] === "number"
                                ? item[originalKey].toFixed(2)
                                : item[originalKey]}
                            </span>
                          </p>
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
                data={kssDatabox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={kssDatabox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#9EB5B5" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={kssDatabox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                  <circle cx={props.cx} cy={props.cy} r={5} fill="#04CE00" />
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
          className={`${
            width >= 1000 ? "w-1/2" : "w-full"
          } h-96 flex flex-col gap-2 rounded-[12px] border-1 border-[#E8E7E7] py-4 px-6`}
        >
          <p
            className={`w-full ${inter.className}  font-bold text-[#2B333E] text-xs`}
          >
            KNEE INJURY AND OSTHEOARTHRITIS OUTCOME SCORE, JOINT REPLACEMENT
          </p>
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
              margin={{ top: 10, bottom: 0, left: 0, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip
                content={({ active, label }) => {
                  if (!active) return null;

                  const item = koosjrDatabox.find((d) => d.name === label);
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
                        className={`${poppins.className} font-bold text-black text-sm`}
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
                          <p
                            key={key}
                            className={`${poppins.className} font-medium text-sm`}
                            style={{ color: colorMap[key] }}
                          >
                            {key}:{" "}
                            <span
                              className="font-semibold"
                              style={{ color: colorMap[key] }}
                            >
                              {typeof item[originalKey] === "number"
                                ? item[originalKey].toFixed(2)
                                : item[originalKey]}
                            </span>
                          </p>
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
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={koosjrDatabox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#D88C8A" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={koosjrDatabox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                  <circle cx={props.cx} cy={props.cy} r={5} fill="#04CE00" />
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
              margin={{ top: 10, bottom: 0, left: 0, right: 20 }}
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
                        className={`${poppins.className} font-bold text-black text-sm`}
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
                          <p
                            key={key}
                            className={`${poppins.className} font-medium text-sm`}
                            style={{ color: colorMap[key] }}
                          >
                            {key}:{" "}
                            <span
                              className="font-semibold"
                              style={{ color: colorMap[key] }}
                            >
                              {typeof item[originalKey] === "number"
                                ? item[originalKey].toFixed(2)
                                : item[originalKey]}
                            </span>
                          </p>
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
                data={fjsDatabox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={fjsDatabox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#9EA6B5" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={fjsDatabox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                  <circle cx={props.cx} cy={props.cy} r={5} fill="#04CE00" />
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

        <div className={`${width >= 1000 ? "w-1/2" : "w-full"}`}> </div>
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

export default Patientreport;
