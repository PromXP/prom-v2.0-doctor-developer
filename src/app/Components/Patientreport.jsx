"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

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
import ManAvatar from "@/app/Assets/manavatar.png";
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

const Patientreport = ({handlenavigateviewsurgeryreport}) => {
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

  const questionnaireData = {
    periods: [
      { key: "pre_op", label: "Pre Op", date: "10 July 2025" },
      { key: "6w", label: "6W", date: "20 Aug 2025" },
      { key: "3m", label: "3M", date: "15 Sep 2025" },
      { key: "6m", label: "6M", date: "01 Nov 2025" },
      { key: "1y", label: "1Y", date: "10 Jan 2026" },
      { key: "2y", label: "2Y", date: "30 May 2027" },
    ],
    questionnaires: [
      {
        name: "Oxford Knee Score (OKS)",
        scores: {
          pre_op: "82",
          "6w": "77",
          "3m": "58",
          "6m": "35",
          "1y": "N/A",
          "2y": "",
        },
      },
      {
        name: "Short Form 12  (SF-12)",
        scores: {}, // No data
      },
      {
        name: "Knee Injury and Ostheoarthritis Outcome Score, Joint Replacement (KOOS, JR)",
        scores: {
          pre_op: "50",
          "6w": "42",
          "3m": "",
          "6m": "N/A",
          "1y": "66",
          "2y": "30",
        },
      },

      {
        name: "Forgotten Joint Score (FJS)",
        scores: {
          pre_op: "50",
          "6w": "42",
          "3m": "",
          "6m": "N/A",
          "1y": "66",
          "2y": "30",
        },
      },

      {
        name: "Knee Society Score (KSS)",
        scores: {
          pre_op: "50",
          "6w": "42",
          "3m": "",
          "6m": "N/A",
          "1y": "66",
          "2y": "30",
        },
      },
    ],
  };

  function getTextColor(score) {
    if (score === null || score === undefined || isNaN(score)) return "#9CA3AF"; // gray for missing

    const percent = Math.max(0, Math.min(100, score)) / 100;

    // From red (low) to green (high), via orange/yellow
    const r = Math.round(255 * (1 - percent));
    const g = Math.round(150 + 105 * percent); // start at 150 to get orange/yellow in middle
    const b = 0;

    return `rgb(${r}, ${g}, ${b})`;
  }

  const data = [
    { name: "-3", oks: 45, sf12: 50, koos: 48, kss: 40, fjs: 42 },
    {
      name: "SURGERY",
      oks: null,
      sf12: null,
      koos: null,
      kss: null,
      fjs: null,
    },
    { name: "+42", oks: 50, sf12: 55, koos: 52, kss: 46, fjs: 44 },
    { name: "+90", oks: 60, sf12: 62, koos: 59, kss: 55, fjs: 58 },
    { name: "+180", oks: 70, sf12: 72, koos: 74, kss: 68, fjs: 70 },
    { name: "+365", oks: 80, sf12: 82, koos: 85, kss: 78, fjs: 82 },
    { name: "+730", oks: 85, sf12: 88, koos: 90, kss: 84, fjs: 87 },
  ];

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

  // 1) Base SF-12 dataset (X labels + values)
  const sf12Data = [
    { x: 0, name: "-3", pScore: 45, mScore: 50 },
    { x: 1, name: "SURGERY", pScore: null, mScore: null }, // marker only
    { x: 2, name: "+42", pScore: 50, mScore: 55 },
    { x: 3, name: "+90", pScore: 58, mScore: 60 },
    { x: 4, name: "+180", pScore: 70, mScore: 72 },
    { x: 5, name: "+365", pScore: 78, mScore: 80 },
    { x: 6, name: "+730", pScore: 82, mScore: 85 },
  ];

  // 2) X-axis label source
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

  const TIMEPOINT_ORDER = ["Pre-Op", "6W", "3M", "6M", "1Y", "2Y"];

  const sampleBoxPlotData = TIMEPOINT_ORDER.map((timepoint, index) => {
    // Randomly generate 10–15 sample patient scores for this timepoint
    const scores = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 48)
    );

    // Pick a "patient" value (single dot)
    const patientValue = Math.floor(Math.random() * 48);

    return {
      name: timepoint,
      boxData: scores,
      dotValue: patientValue,
    };
  });

  // Now transform it using your computeBoxStats + useBoxPlot logic
  const databox = useBoxPlot(
    sampleBoxPlotData.map((item, index) => {
      const stats = computeBoxStats(item.boxData, item.dotValue);

      // Ensure valid dot
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
              src={ManAvatar}
              alt="Patient"
              className={`w-[60px] h-[60px]`}
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
                  width < 400 ? "w-full" : "w-1/2"
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
                className={`${raleway.className} text-sm px-4 py-[0.5px] w-1/2 rounded-lg font-semibold bg-[#2B333E] text-white cursor-pointer`}
              >
                Left
              </button>
              <button
                className={`${raleway.className} text-sm px-4 py-[0.5px] w-1/2 rounded-lg font-semibold bg-[#CAD9D6] text-black cursor-pointer`}
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
                      className={`${inter.className} font-bold text-white text-[15px] px-2 py-1 bg-gray-900 rounded-tl-[8px] text-center whitespace-nowrap w-2/5`}
                    >
                      <div className="flex flex-row justify-center items-center gap-4">
                        <p>Questionnaire</p>
                      </div>
                    </th>
                    {questionnaireData.periods.map((period, idx) => (
                      <th
                        key={period.key}
                        className={`px-4 py-3  bg-gray-900 text-center whitespace-nowrap ${
                          inter.className
                        } font-bold text-white text-[15px] ${
                          idx === questionnaireData.periods.length - 1
                            ? "rounded-tr-[8px]"
                            : ""
                        }`}
                      >
                        <div className="flex flex-row items-center gap-1 w-full">
                          <div className={`w-full flex flex-col`}>
                            <span
                              className={`${inter.className} text-center text-[15px]  text-white font-bold`}
                            >
                              {period.label}
                            </span>
                            {/* <span
                              className={`${inter.className} text-[10px]  text-white font-semibold`}
                            >
                              {period.date}
                            </span> */}
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
                        className={`${raleway.className} text-[13px] font-semibold px-4 py-2 text-[#1F2937]`}
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
                              className={`${inter.className} text-[13px] px-4 py-2 font-bold text-center align-middle`}
                              style={{ color }}
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
              data={data}
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

                  // console.log("PROM Payload" + payload);

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
              data={databox.filter(
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

                  const item = databox.find((d) => d.name === label);
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
                data={databox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={databox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#2A333A" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={databox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                data={databox.filter(
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
              data={databox.filter(
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

                  const item = databox.find((d) => d.name === label);
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
                data={databox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={databox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#6888A1" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={databox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                data={databox.filter(
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
              data={databox.filter(
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

                  const item = databox.find((d) => d.name === label);
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
                data={databox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={databox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#9EB5B5" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={databox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                data={databox.filter(
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
              data={databox.filter(
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

                  const item = databox.find((d) => d.name === label);
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
                data={databox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={databox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#D88C8A" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={databox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                data={databox.filter(
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
              data={databox.filter(
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

                  const item = databox.find((d) => d.name === label);
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
                data={databox.filter((item) => item._median !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_median" stroke="#ffffff" />
                )}
                dataKey="_median"
              />
              {/* Min Line */}
              <Scatter
                data={databox.filter((item) => item._min !== undefined)} // Ensure valid data
                shape={(props) => (
                  <HorizonBar {...props} dataKey="_min" stroke="#9EA6B5" />
                )}
                dataKey="_min"
              />
              {/* Max Line */}
              <Scatter
                data={databox.filter((item) => item._max !== undefined)} // Ensure valid data
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
                data={databox.filter(
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
    </div>
  );
};

export default Patientreport;
