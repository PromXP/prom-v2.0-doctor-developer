"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { useRouter } from "next/navigation";

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
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";

import Headset from "@/app/Assets/headset.png";
import Search from "@/app/Assets/searchicon.png";
import ManAvatar from "@/app/Assets/man.png";
import WomanAvatar from "@/app/Assets/woman.png";
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

const ViewSurgeryreport = ({ handlenavigateaddurgeryreport }) => {
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

  const [logoutconfirm, setlogoutconfirm] = useState(false);

  const router = useRouter();

  const handlelogout = () => {
    console.clear();
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    router.replace("/Login");
  };

  const [showAlert, setshowAlert] = useState(false);
  const [alermessage, setAlertMessage] = useState("");
  const showWarning = (message) => {
    setAlertMessage(message);
    setshowAlert(true);
    setTimeout(() => setshowAlert(false), 4000);
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

  // Saved selections
  const [implantTableSelections, setImplantTableSelections] = useState({
    FEMUR: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    TIBIA: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    INSERT: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    PATELLA: { MANUFACTURER: "", MODEL: "", SIZE: "" },
  });

  // Temp selections for editing
  const [implantTableTempSelections, setImplantTableTempSelections] = useState({
    FEMUR: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    TIBIA: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    INSERT: { MANUFACTURER: "", MODEL: "", SIZE: "" },
    PATELLA: { MANUFACTURER: "", MODEL: "", SIZE: "" },
  });

  // Track editing per cell
  const [implantTableEditingCell, setImplantTableEditingCell] = useState({
    FEMUR: { MANUFACTURER: false, MODEL: false, SIZE: false },
    TIBIA: { MANUFACTURER: false, MODEL: false, SIZE: false },
    INSERT: { MANUFACTURER: false, MODEL: false, SIZE: false },
    PATELLA: { MANUFACTURER: false, MODEL: false, SIZE: false },
  });

  const implantTableStartEdit = (category, row) => {
    setImplantTableTempSelections((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [row]: implantTableSelections[category][row],
      },
    }));
    setImplantTableEditingCell((prev) => ({
      ...prev,
      [category]: { ...prev[category], [row]: true },
    }));
  };

  const implantTableSaveEdit = async (category, row) => {
    // 1️⃣ Update local state
    setImplantTableSelections((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [row]: implantTableTempSelections[category][row],
      },
    }));

    // 2️⃣ Stop editing locally
    setImplantTableEditingCell((prev) => ({
      ...prev,
      [category]: { ...prev[category], [row]: false },
    }));

    try {
      // 3️⃣ Prepare PATCH payload for this individual cell
      const payload = {
        uhid: uhid.toLowerCase(), // your current patient UHID
        field: category, // e.g., "FEMUR"
        component_values: {
          [row]: implantTableTempSelections[category][row], // e.g., MANUFACTURER, MODEL, SIZE
        },
        op_date: `op-${op_date}`,
      };

      // ✅ Log payload before sending
      // console.log(
      //   "⚡ PATCH payload for implant cell:",
      //   JSON.stringify(payload, null, 2)
      // );

      // 4️⃣ Send PATCH request
      const response = await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      // console.log(`${category} ${row} update response:`, response.data);
    } catch (error) {
      console.error(`Failed to save ${category} ${row}:`, error);
    }
  };

  const implantTableCancelEdit = (category, row) => {
    setImplantTableTempSelections((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [row]: implantTableSelections[category][row],
      },
    }));
    setImplantTableEditingCell((prev) => ({
      ...prev,
      [category]: { ...prev[category], [row]: false },
    }));
  };

  const [uhid, setUhid] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingsurg, setLoadingsurg] = useState(true);
  const [op_date, setop_date] = useState("");
  const [opside, setOpside] = useState("LEFT KNEE");
  // state for surgeries + selected surgery

  const fetchPatientData = async (uhid) => {
    try {
      // console.log("Fetching patient data for UHID:", uhid);
      const response = await axios.get(`${API_URL}patients/${uhid}`);
      // console.log("API Full Response:", response);
      // console.log("API Response Data:", response.data);

      if (response.data && response.data.patient) {
        const patient = response.data.patient;
        // console.log("Patient Found:", patient);

        // ✅ Extract surgery dates
        const surgeryLeft =
          patient?.Medical?.surgery_date_left &&
          patient.Medical.surgery_date_left !== "1001-01-01"
            ? patient.Medical.surgery_date_left
            : "";

        const surgeryRight =
          patient?.Medical?.surgery_date_right &&
          patient.Medical.surgery_date_right !== "1001-01-01"
            ? patient.Medical.surgery_date_right
            : "";

        // ✅ Determine side
        let side = "left";
        if (surgeryLeft && !surgeryRight) {
          side = "left";
          setOpside("LEFT KNEE");
        } else if (!surgeryLeft && surgeryRight) {
          side = "right";
          setOpside("RIGHT KNEE");
        } else if (surgeryLeft && surgeryRight) {
          side = "left"; // Default to left if both exist
          setOpside("LEFT KNEE, RIGHT KNEE");
        }

        // ✅ Optionally pick op_date
        setop_date(surgeryLeft || surgeryRight || "NA");
        const apiPatients = response.data.patient || [];
        // ✅ Update state
        const mapped = {
          // ✅ Only calculate if doctor is assigned
          // assume doctorUhid = res.data[0]?.uhid

          name: apiPatients.Patient?.name || "Unknown",
          age: apiPatients.Patient?.birthDate
            ? new Date().getFullYear() -
              new Date(apiPatients.Patient.birthDate).getFullYear()
            : "NA",
          gender:
            apiPatients.Patient?.gender?.toLowerCase() === "male"
              ? "Male"
              : "Female",
          uhid: apiPatients.Patient?.uhid,
          period: apiPatients.Patient_Status_Left || "NA",
          period_right: apiPatients.Patient_Status_Right || "NA",
          activation_status: apiPatients.Activation_Status ?? "True",
          patient_initial_status: apiPatients.patient_current_status ?? "NA",
          surgery_left:
            apiPatients.Medical?.surgery_date_left &&
            apiPatients.Medical.surgery_date_left !== "1001-01-01"
              ? apiPatients.Medical.surgery_date_left
              : "NA",

          surgery_right:
            apiPatients.Medical?.surgery_date_right &&
            apiPatients.Medical.surgery_date_right !== "1001-01-01"
              ? apiPatients.Medical.surgery_date_right
              : "NA",

          doctor_left: apiPatients.Practitioners?.left_doctor,
          doctor_right: apiPatients.Practitioners?.right_doctor,
          vip: apiPatients.VIP_Status ?? false,
          opd: apiPatients.Appointments?.[0].start ?? "NA",

          avatar:
            apiPatients.Patient?.photo && apiPatients.Patient?.photo !== "NA"
              ? apiPatients.Patient.photo
              : apiPatients.Patient?.gender?.toLowerCase() === "male"
              ? ManAvatar
              : WomanAvatar,

          bmi:
            apiPatients.Medical?.height && apiPatients.Medical?.weight
              ? (() => {
                  const h = parseFloat(
                    apiPatients.Medical.height.match(/[\d.]+/)?.[0]
                  );
                  const w = parseFloat(
                    apiPatients.Medical.weight.match(/[\d.]+/)?.[0]
                  );
                  return h && w ? (w / Math.pow(h / 100, 2)).toFixed(1) : "NA";
                })()
              : "NA",
        };

        setPatientData(mapped);

        // setSurgeryData((prev) => ({
        //   ...prev,
        //   uhid,
        //   side,
        //   patient_records: prev.patient_records.map((record, index) =>
        //     index === 0
        //       ? {
        //           ...record,
        //           patuhid: uhid,
        //           side,
        //           op_date, // ✅ If you want operation date set too
        //         }
        //       : recrd
        //   ),
        // }));
      } else {
        console.warn("No patient data found in response");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      setLoading(false);
    }
  };

  const [surgeries, setSurgeries] = useState([]);
  const [selectedSurgery, setSelectedSurgery] = useState("");

  // after patientData is set, update surgeries
  // In your useEffect
  useEffect(() => {
    if (patientData) {
      const surgeryOptions = [];

      if (
        patientData?.surgery_left &&
        patientData.surgery_left !== "NA" &&
        patientData.surgery_left !== "1001-01-01"
      ) {
        surgeryOptions.push({
          label: `Left Knee - ${patientData.surgery_left}`,
          value: patientData.surgery_left,
        });
      }

      if (
        patientData?.surgery_right &&
        patientData.surgery_right !== "NA" &&
        patientData.surgery_right !== "1001-01-01"
      ) {
        surgeryOptions.push({
          label: `Right Knee - ${patientData.surgery_right}`,
          value: patientData.surgery_right,
        });
      }

      setSurgeries(surgeryOptions);

      // Set default selected surgery
      if (surgeryOptions.length > 0) {
        setSelectedSurgery(surgeryOptions[0].value);
        setop_date(surgeryOptions[0].value);
      }
    }
  }, [patientData]);

  // whenever selectedSurgery changes, call API
  useEffect(() => {
    if (selectedSurgery && patientData?.uhid) {
      // console.log("Fetching surgery report for:", selectedSurgery);
      setop_date(selectedSurgery); // update op_date state
      fetchSurgeryReport(patientData?.uhid, selectedSurgery);
    }
  }, [selectedSurgery]);

  const fetchSurgeryReport = async (storedUHID, op_date) => {
    try {
      setshowsurgeryreport(true);
      const lowercaseUHID = storedUHID.toLowerCase();
      // console.log(op_date);
      const formattedOpDate = `op-${op_date}`;
      // console.log(formattedOpDate);
      const response = await axios.get(
        `${API_URL}get-surgery/${lowercaseUHID}/${formattedOpDate}`
      );
      setLoadingsurg(false);

      // console.log("Surgery", response.data.entry);

      const components28 = response.data.entry[28].resource.component;
      const components27 = response.data.entry[27].resource.component;

      // console.log("surgery report entry 28", response.data.entry[28]);
      // console.log("surgery report entry 27", response.data.entry[27]);

      // ✅ Helper functions for both entries
      const getValue28 = (key) =>
        components28.find((c) => c.code.text === key)?.valueString || "";
      const getValue27 = (key) =>
        components27.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract values from entry 30
      const hospitalName = getValue28("hospital_name");
      const anaestheticType = getValue28("anaesthetic_type");
      const asaGrade = getValue28("asa_grade");
      const consultant = getValue28("consultant_incharge");
      const surgeon = getValue28("operating_surgeon");
      const firstAssistant = getValue28("first_assistant");
      const secondAssistant = getValue28("second_assistant");
      const procedure = getValue28("mag_proc");
      const sideValue = getValue28("side");
      const deformityValue = getValue28("surgery_indication");
      const techAssist = getValue28("tech_assist");
      const alignment = getValue28("align_phil");
      const torqueUsed = getValue28("torq_used");
      const operationTime = getValue28("op_time");
      const operationDate = getValue28("op_date");

      // Assuming response.data.entry contains entries 2 to 11 for ROM
      const romEntriesMap = timepoints.reduce((acc, tp, idx) => {
        acc[tp] = 0 + idx; // Preop => entry[2], 1Month => entry[3], ... 10Year => entry[11]
        return acc;
      }, {});

      // Helper function to get component value
      const getComponentValue = (components, key) =>
        components.find((c) => c.code.text.toLowerCase() === key.toLowerCase())
          ?.valueString || "";

      // Populate values
      const updatedValues = { ...values };

      Object.entries(romEntriesMap).forEach(([tp, index]) => {
        const components =
          response.data.entry[index]?.resource?.component || [];
        const flexion = getComponentValue(components, "flexion");
        const extension = getComponentValue(components, "extension");

        updatedValues[tp] = { Flexion: flexion, Extension: extension };
      });

      setValues(updatedValues);

      // ✅ Extract ACL from entry 29
      const aclStatus = getValue27("acl"); // e.g., "Torn"

      const pclConditionValue = getValue27("pcl"); // e.g., "Excised"
      setPclCondition(pclConditionValue);
      setTempPclCondition(pclConditionValue);

      const finalCheckValue = getValue27("final_check"); // e.g., "Negligible V-V Laxity in extenstion"
      setSelectedFinalCheck([finalCheckValue]);
      setTempSelectedFinalCheck([finalCheckValue]);

      const pfjResurfacing = getValue27("pfj_resurfacing"); // e.g., "Y"
      setPFJResurf(pfjResurfacing);
      setTempPFJResurf(pfjResurfacing);

      const trachelaResectionValue = getValue27("trachela_resection"); // e.g., "10.0 mm"
      setTrachelaResection(trachelaResectionValue);
      setTempTrachelaResection(trachelaResectionValue);

      const patellaValue = getValue27("patella"); // e.g., "UnWorn"
      setPatella(patellaValue);
      setTempPatella(patellaValue);

      const preResurfacingValue = getValue27("preresurfacing"); // e.g., "10.0"
      setPreResurfacingThickness(preResurfacingValue);
      setTempPreResurfacingThickness(preResurfacingValue);

      const postResurfacingValue = getValue27("postresurfacing"); // e.g., "8.0"
      setPostResurfacingThickness(postResurfacingValue);
      setTempPostResurfacingThickness(postResurfacingValue);

      // ✅ Update states for entry 28 values
      setSelectedProcedure(procedure);
      setTempProcedure(procedure);

      setSelectedHospital(hospitalName);
      setTempHospital(hospitalName);

      setSelectedType(anaestheticType);
      setTempType(anaestheticType);

      setSelectedASA(asaGrade);
      setTempASA(asaGrade);

      setSelectedConsultant(consultant);
      setTempConsultant(consultant);

      setSelectedSurgeon(surgeon);
      setTempSurgeon(surgeon);

      setSelectedAssistant(firstAssistant);
      setTempAssistant(firstAssistant);

      setSelectedSecondAssistant(secondAssistant);
      setTempSecondAssistant(secondAssistant);

      setSelectedTech(techAssist);
      setTempTech(techAssist);

      setSelectedAlignment(alignment);
      setTempAlignment(alignment);

      setSelectedTorque(torqueUsed);
      setTempTorque(torqueUsed);

      setTimeValue(operationTime);
      setTempTimeValue(operationTime);

      setTimedate(operationDate);

      // ✅ Update ACL (torqued options)
      setSelectedTorqued(aclStatus);
      setTempTorqued(aclStatus);

      // ✅ Handle sides
      let sidesArray = [];
      if (sideValue.toLowerCase().includes("left"))
        sidesArray.push("LEFT KNEE");
      if (sideValue.toLowerCase().includes("right"))
        sidesArray.push("RIGHT KNEE");

      setSelectedSides(sidesArray);
      setTempSides(sidesArray);

      // ✅ Handle deformities
      let deformityArray = deformityValue
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d && d !== "NA");
      setSelectedDeformity(deformityArray);
      setTempDeformity(deformityArray);

      // console.log("Hospital Name:", hospitalName);
      // console.log("ACL Status:", aclStatus);

      const components14 = response.data.entry[14].resource.component;
      const getValue14 = (key) =>
        components14.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract and set values for distal medial section
      const distalMedialStatus = getValue14("wear"); // e.g., "Worn"
      setDistalMedialUnwornWorn(distalMedialStatus);
      setTempDistalMedialUnwornWorn(distalMedialStatus);

      const distalMedialInitial = getValue14("initial_thickness"); // e.g., "9.0 mm"
      setDistalMedialInitialThickness(distalMedialInitial);
      setTempDistalMedialInitialThickness(distalMedialInitial);

      const distalMedialRecutValue = getValue14("recutvalue"); // e.g., "9.5 mm"
      setDistalMedialRecutMM(distalMedialRecutValue);
      setTempDistalMedialRecutMM(distalMedialRecutValue);

      const distalMedialRecutYNValue = getValue14("recut"); // e.g., "Y"
      setDistalMedialRecutYN(distalMedialRecutYNValue);
      setTempDistalMedialRecutYN(distalMedialRecutYNValue);

      const distalMedialWasherValue = getValue14("washer"); // e.g., "N"
      setDistalMedialWasherYN(distalMedialWasherValue);
      setTempDistalMedialWasherYN(distalMedialWasherValue);

      const distalMedialWasherMMValue = getValue14("washervalue"); // e.g., "8.5 mm"
      setDistalMedialWasherMM(distalMedialWasherMMValue);
      setTempDistalMedialWasherMM(distalMedialWasherMMValue);

      const distalMedialFinal = getValue14("final_thickness"); // e.g., "8.5 mm"
      setDistalMedialFinalThickness(distalMedialFinal);
      setTempDistalMedialFinalThickness(distalMedialFinal);

      const components15 = response.data.entry[15].resource.component;
      const getValue15 = (key) =>
        components15.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract and set values for distal lateral section
      const distalLateralStatus = getValue15("wear"); // e.g., "Worn"
      setDistalLateralUnwornWorn(distalLateralStatus);
      setTempDistalLateralUnwornWorn(distalLateralStatus);

      const distalLateralInitial = getValue15("initial_thickness"); // e.g., "9.0 mm"
      setDistalLateralInitialThickness(distalLateralInitial);
      setTempDistalLateralInitialThickness(distalLateralInitial);

      const distalLateralRecutValue = getValue15("recutvalue"); // e.g., "9.5 mm"
      setDistalLateralRecutMM(distalLateralRecutValue);
      setTempDistalLateralRecutMM(distalLateralRecutValue);

      const distalLateralRecutYNValue = getValue15("recut"); // e.g., "N"
      setDistalLateralRecutYN(distalLateralRecutYNValue);
      setTempDistalLateralRecutYN(distalLateralRecutYNValue);

      const distalLateralWasherYNValue = getValue15("washer"); // e.g., "N"
      setDistalLateralWasherYN(distalLateralWasherYNValue);
      setTempDistalLateralWasherYN(distalLateralWasherYNValue);

      const distalLateralWasherMMValue = getValue15("washervalue"); // e.g., "9.0 mm"
      setDistalLateralWasherMM(distalLateralWasherMMValue);
      setTempDistalLateralWasherMM(distalLateralWasherMMValue);

      const distalLateralFinal = getValue15("final_thickness"); // e.g., "8.0 mm"
      setDistalLateralFinalThickness(distalLateralFinal);
      setTempDistalLateralFinalThickness(distalLateralFinal);

      const components16 = response.data.entry[16].resource.component;
      const getValue16 = (key) =>
        components16.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract and set values for posterial medial section
      const postMedWear = getValue16("wear"); // e.g., "Worn"
      setPostMedUnwornWorn(postMedWear);
      setTempPostMedUnwornWorn(postMedWear);

      const postMedInitial = getValue16("initial_thickness"); // e.g., "8.0 mm"
      setPostMedInitialThickness(postMedInitial);
      setTempPostMedInitialThickness(postMedInitial);

      const postMedRecutYNValue = getValue16("recut"); // e.g., "Y"
      setPostMedRecutYN(postMedRecutYNValue);
      setTempPostMedRecutYN(postMedRecutYNValue);

      const postMedRecutValue = getValue16("recutvalue"); // e.g., "8.5 mm"
      setPostMedRecutMM(postMedRecutValue);
      setTempPostMedRecutMM(postMedRecutValue);

      const postMedFinal = getValue16("final_thickness"); // e.g., "9.0 mm"
      setPostMedFinalThickness(postMedFinal);
      setTempPostMedFinalThickness(postMedFinal);

      const components17 = response.data.entry[17].resource.component;
      const getValue17 = (key) =>
        components17.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract and set values for posterial lateral section
      const postLatStatus = getValue17("wear"); // e.g., "Unworn"
      setPostLatUnwornWorn(postLatStatus);
      setTempPostLatUnwornWorn(postLatStatus);

      const postLatInitial = getValue17("initial_thickness"); // e.g., "9.0 mm"
      setPostLatInitialThickness(postLatInitial);
      setTempPostLatInitialThickness(postLatInitial);

      const postLatRecutYNValue = getValue17("recut"); // e.g., "N"
      setPostLatRecutYN(postLatRecutYNValue);
      setTempPostLatRecutYN(postLatRecutYNValue);

      const postLatRecutValue = getValue17("recutvalue"); // e.g., "8.5 mm"
      setPostLatRecutMM(postLatRecutValue);
      setTempPostLatRecutMM(postLatRecutValue);

      const postLatFinal = getValue17("final_thickness"); // e.g., "9.0 mm"
      setPostLatFinalThickness(postLatFinal);
      setTempPostLatFinalThickness(postLatFinal);

      const components18 = response.data.entry[18].resource.component;
      const getValue18 = (key) =>
        components18.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract and set values for tibial_resection_left section
      const tibialLeftStatus = getValue18("wear"); // e.g., "UnWorn"
      setTibialLeftWorn(tibialLeftStatus);
      setTempTibialLeftWorn(tibialLeftStatus);

      const tibialLeftValue = getValue18("value"); // e.g., "8.5 mm"
      setTibialLeftMM(tibialLeftValue);
      setTempTibialLeftMM(tibialLeftValue);

      const components19 = response.data.entry[19].resource.component;
      const getValue19 = (key) =>
        components19.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract and set values for tibial_resection_right section
      const tibialRightStatus = getValue19("wear"); // e.g., "Worn"
      setTibialRightWorn(tibialRightStatus);
      setTempTibialRightWorn(tibialRightStatus);

      const tibialRightValue = getValue19("value"); // e.g., "8.5 mm"
      setTibialRightMM(tibialRightValue);
      setTempTibialRightMM(tibialRightValue);

      const components20 = response.data.entry[20].resource.component;
      const getValue20 = (key) =>
        components20.find((c) => c.code.text === key)?.valueString || "";

      // console.log("surgery report entry 20", response.data.entry[20]);

      // ✅ Extract and set values for tibialvvrecut section
      const tibialVVStatus = getValue20("wear"); // e.g., "Y"
      setTibialVVRecutYN(tibialVVStatus);
      setTempTibialVVRecutYN(tibialVVStatus);

      const tibialVVValue = getValue20("value"); // e.g., "10.0 mm"
      setTibialVVRecutMM(tibialVVValue);
      setTempTibialVVRecutMM(tibialVVValue);

      const components21 = response.data.entry[21].resource.component;
      const getValue21 = (key) =>
        components21.find((c) => c.code.text === key)?.valueString || "";

      // ✅ Extract and set values for tibial_slope section
      const tibialSlopeStatus = getValue21("wear"); // e.g., "Y"
      setTibialSlopeRecutYN(tibialSlopeStatus);
      setTempTibialSlopeRecutYN(tibialSlopeStatus);

      const tibialSlopeValue = getValue21("value"); // e.g., "10.0 mm"
      setTibialSlopeRecutMM(tibialSlopeValue);
      setTempTibialSlopeRecutMM(tibialSlopeValue);

      // ✅ Fill tableData from entry[21] to entry[26] and log entries
      let thicknessTable = [...tableData]; // use existing state as base

      for (let i = 0; i < 5; i++) {
        const entryIndex = 22 + i;
        const currentEntry = response.data.entry[entryIndex];

        // console.log(`Surgery report entry ${entryIndex}:`, currentEntry);

        if (!currentEntry || !currentEntry.resource?.component) continue;

        const components = currentEntry.resource.component;

        const thickness =
          components.find((c) => c.code.text === "thickness")?.valueString ||
          thicknessTable[i].insertThickness;
        const numTicks =
          components.find((c) => c.code.text === "numOfTicks")?.valueString ||
          "";
        const extOrient =
          components.find((c) => c.code.text === "extensionExtOrient")
            ?.valueString || "";
        const flex90Orient =
          components.find((c) => c.code.text === "flexionIntOrient")
            ?.valueString || "";
        const liftOff =
          components.find((c) => c.code.text === "liftOff")?.valueString || "";

        thicknessTable[i] = {
          ...thicknessTable[i],
          insertThickness: thickness,
          numTicks,
          extOrient,
          flex90Orient,
          liftOff,
        };
      }

      setTableData(thicknessTable);

      // Assuming response.data.entry[12-15] exist
      const entriesMap = {
        FEMUR: 10,
        TIBIA: 11,
        INSERT: 12,
        PATELLA: 13,
      };

      Object.entries(entriesMap).forEach(([category, index]) => {
        const components =
          response.data.entry[index]?.resource?.component || [];
        const getValue = (key) =>
          components.find((c) => c.code.text === key)?.valueString || "";

        const manufacturer = getValue("MANUFACTURER");
        const model = getValue("MODEL");
        const size = getValue("SIZE");

        // ✅ Set main state
        setImplantTableSelections((prev) => ({
          ...prev,
          [category]: { MANUFACTURER: manufacturer, MODEL: model, SIZE: size },
        }));

        // ✅ Set temp state
        setImplantTableTempSelections((prev) => ({
          ...prev,
          [category]: { MANUFACTURER: manufacturer, MODEL: model, SIZE: size },
        }));
      });
    } catch (error) {
      setshowsurgeryreport(false);
      setLoadingsurg(false);
      console.error("Error fetching surgery report:", error);
    } finally {
      setLoading(false);
      setLoadingsurg(false);
    }
  };

  useEffect(() => {
    const storedUHID = sessionStorage.getItem("selectedUHID");
    if (storedUHID) {
      setUhid(storedUHID);
      fetchPatientData(storedUHID);
    } else {
      setLoading(false);
    }
  }, []);

  const [showsurgeryreport, setshowsurgeryreport] = useState(false);

  const [isEditingHospital, setIsEditingHospital] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(""); // ✅ initially empty
  const [tempHospital, setTempHospital] = useState("");

  const handleSaveHospital = async () => {
    try {
      if (!tempHospital) return;
      const lowercaseUHID = uhid.toLowerCase();
      const payload = {
        uhid: lowercaseUHID, // patient UHID
        field: "hospital_name", // field to update
        value: tempHospital, // new hospital
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2)); // ✅ log JSON

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedHospital(tempHospital);
      setIsEditingHospital(false);
    } catch (error) {
      console.error("Failed to update hospital:", error);
    }
  };

  const handleCancelHospital = () => {
    setTempHospital(selectedHospital);
    setIsEditingHospital(false);
  };

  const [isEditingAnaesthetic, setIsEditingAnaesthetic] = useState(false);
  const [selectedType, setSelectedType] = useState(""); // stored value
  const [tempType, setTempType] = useState(""); // temporary editing value

  const types = ["General", "NerveBlock", "Epidural", "Spinal (Intrathecal)"];

  const handleSelectType = (type) => {
    setTempType(type); // update temp value only
  };

  const handleSaveAnaesthetic = async () => {
    try {
      if (!tempType) return;

      const lowercaseUHID = uhid.toLowerCase();
      const payload = {
        uhid: lowercaseUHID, // patient UHID
        field: "anaesthetic_type", // field to update in backend
        value: tempType, // selected type
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2)); // log JSON

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedType(tempType);
      setIsEditingAnaesthetic(false);
    } catch (error) {
      console.error("Failed to update anaesthetic type:", error);
    }
  };

  const handleCancelAnaesthetic = () => {
    setTempType(selectedType); // revert temp to stored value
    setIsEditingAnaesthetic(false);
  };

  const [isEditingASA, setIsEditingASA] = useState(false);
  const [selectedASA, setSelectedASA] = useState(""); // stored value
  const [tempASA, setTempASA] = useState(""); // temporary editing value

  const asaGrades = ["1", "2", "3", "4", "5"];

  const handleSaveASA = async () => {
    try {
      if (!tempASA) return;

      const lowercaseUHID = uhid.toLowerCase();
      const payload = {
        uhid: lowercaseUHID,
        field: "asa_grade",
        value: tempASA,
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2)); // log JSON

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedASA(tempASA);
      setIsEditingASA(false);
    } catch (error) {
      console.error("Failed to update ASA grade:", error);
    }
  };

  const handleCancelASA = () => {
    setTempASA(selectedASA); // revert temp to stored value
    setIsEditingASA(false);
  };

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

  const motions = ["Flexion", "Extension"];

  // Store values for each timepoint and motion
  const initialValues = timepoints.reduce((acc, tp) => {
    acc[tp] = { Flexion: "", Extension: "" };
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);
  const [editingTimepoint, setEditingTimepoint] = useState(null);
  const [tempValues, setTempValues] = useState({}); // store temporary edits

  const handleEdit = (tp) => {
    setEditingTimepoint(tp);
    setTempValues(0); // copy current values for editing
  };

  const handleSave = async (tp) => {
    // 1️⃣ Update local state
    setValues({ ...values, [tp]: tempValues });
    setEditingTimepoint(null);

    const lowercaseUHID = uhid.toLowerCase(); // make sure uhid is in scope

    try {
      for (const motion of motions) {
        const payload = {
          uhid: lowercaseUHID,
          period: tp, // e.g., "Preop"
          field: motion.toLowerCase(), // "flexion" or "extension"
          value: tempValues[motion], // value for that motion
          op_date: `op-${op_date}`,
        };

        // ✅ Console payload before sending
        // console.log(
        //   `⚡ PATCH payload for ${motion}:`,
        //   JSON.stringify(payload, null, 2)
        // );

        // 2️⃣ Send PATCH request using API_URL
        const response = await axios.patch(
          `${API_URL}patient_surgery_details/update_field`,
          payload
        );

        // console.log(`ROM update response for ${motion}:`, response.data);
      }
    } catch (error) {
      console.error(`Failed to save ROM for ${tp}:`, error);
    }

    // 3️⃣ Clear tempValues after saving
    setTempValues({});
  };

  const handleCancel = () => {
    setEditingTimepoint(null);
    setTempValues({});
  };

  const handleChange = (tp, motion, val) => {
    const numericValue = Number(val);

    if (isNaN(numericValue) || numericValue < 0 || numericValue > 360) {
      showWarning("Please enter a valid ROM angle between 0° and 360°");
      return; // Stop execution, do not update state
    }

    setTempValues({ ...tempValues, [motion]: val });
  };

  const [isEditingConsultant, setIsEditingConsultant] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(""); // stored value
  const [tempConsultant, setTempConsultant] = useState(""); // temporary edit
  const consultants = ["Dr. Vetri Kumar"];

  const handleEditConsultant = () => {
    setTempConsultant(selectedConsultant || consultants[0]); // default to first option
    setIsEditingConsultant(true);
  };

  const handleSaveConsultant = async () => {
    try {
      if (!tempConsultant) return;

      const lowercaseUHID = uhid.toLowerCase();
      const payload = {
        uhid: lowercaseUHID,
        field: "consultant_incharge",
        value: tempConsultant,
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedConsultant(tempConsultant);
      setIsEditingConsultant(false);
    } catch (error) {
      console.error("Failed to update consultant:", error);
    }
  };

  const handleCancelConsultant = () => {
    setTempConsultant(selectedConsultant);
    setIsEditingConsultant(false);
  };

  const [isEditingSurgeon, setIsEditingSurgeon] = useState(false);
  const [selectedSurgeon, setSelectedSurgeon] = useState(""); // stored value
  const [tempSurgeon, setTempSurgeon] = useState(""); // temp edit
  const surgeons = ["Dr. Vetri Kumar"];

  const handleEditSurgeon = () => {
    setTempSurgeon(selectedSurgeon || surgeons[0]); // default first option
    setIsEditingSurgeon(true);
  };

  const handleSaveSurgeon = async () => {
    try {
      if (!tempSurgeon) return;

      const lowercaseUHID = uhid.toLowerCase();
      const payload = {
        uhid: lowercaseUHID,
        field: "operating_surgeon",
        value: tempSurgeon,
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedSurgeon(tempSurgeon);
      setIsEditingSurgeon(false);
    } catch (error) {
      console.error("Failed to update surgeon:", error);
    }
  };

  const handleCancelSurgeon = () => {
    setTempSurgeon(selectedSurgeon);
    setIsEditingSurgeon(false);
  };

  const [isEditingAssistant, setIsEditingAssistant] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState(""); // stored value
  const [tempAssistant, setTempAssistant] = useState(""); // temporary edit
  const assistants = ["Dr. Vetri Kumar", "Dr. Vinod Kumar"];

  const handleEditAssistant = () => {
    setTempAssistant(selectedAssistant || assistants[0]); // default to first
    setIsEditingAssistant(true);
  };

  const handleSaveAssistant = async () => {
    try {
      if (!tempAssistant) return;

      const lowercaseUHID = uhid.toLowerCase();
      const payload = {
        uhid: lowercaseUHID,
        field: "first_assistant",
        value: tempAssistant,
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedAssistant(tempAssistant);
      setIsEditingAssistant(false);
    } catch (error) {
      console.error("Failed to update assistant:", error);
    }
  };

  const handleCancelAssistant = () => {
    setTempAssistant(selectedAssistant);
    setIsEditingAssistant(false);
  };

  const [isEditingSecondAssistant, setIsEditingSecondAssistant] =
    useState(false);
  const [selectedSecondAssistant, setSelectedSecondAssistant] = useState(""); // stored value
  const [tempSecondAssistant, setTempSecondAssistant] = useState(""); // temporary edit
  const secondAssistants = ["Dr. Vinod Kumar", "Dr. Milan Adhikari"];

  const handleEditSecondAssistant = () => {
    setTempSecondAssistant(selectedSecondAssistant || secondAssistants[0]); // default first option
    setIsEditingSecondAssistant(true);
  };

  const handleSaveSecondAssistant = async () => {
    try {
      if (!tempSecondAssistant) return;

      const lowercaseUHID = uhid.toLowerCase();
      const payload = {
        uhid: lowercaseUHID,
        field: "second_assistant",
        value: tempSecondAssistant,
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedSecondAssistant(tempSecondAssistant);
      setIsEditingSecondAssistant(false);
    } catch (error) {
      console.error("Failed to update second assistant:", error);
    }
  };

  const handleCancelSecondAssistant = () => {
    setTempSecondAssistant(selectedSecondAssistant);
    setIsEditingSecondAssistant(false);
  };

  const procedures = [
    "Primary TKA",
    "Primary UKA",
    "Revision HTO to TKA",
    "Revision UKA to TKA",
    "TKA to Revision TKA",
  ];

  const [isEditingProcedure, setIsEditingProcedure] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(
    procedures[0] || ""
  ); // default to first
  const [tempProcedure, setTempProcedure] = useState(selectedProcedure);

  const handleEditProcedure = () => {
    setTempProcedure(selectedProcedure);
    setIsEditingProcedure(true);
  };

  const handleSaveProcedure = async () => {
    try {
      if (!tempProcedure) return;

      const lowercaseUHID = uhid.toLowerCase(); // your patient UHID

      const payload = {
        uhid: lowercaseUHID, // patient UHID
        field: "mag_proc", // field in your Observation JSON
        value: tempProcedure, // selected procedure
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedProcedure(tempProcedure);
      setIsEditingProcedure(false);
    } catch (error) {
      console.error("Failed to update procedure:", error);
    }
  };

  const handleCancelProcedure = () => {
    setTempProcedure(selectedProcedure);
    setIsEditingProcedure(false);
  };

  const sides = ["LEFT KNEE", "RIGHT KNEE"];

  const [isEditingSide, setIsEditingSide] = useState(false);
  const [selectedSides, setSelectedSides] = useState([""]);
  const [tempSides, setTempSides] = useState([...selectedSides]);

  const handleEditSide = () => {
    setTempSides([...selectedSides]);
    setIsEditingSide(true);
  };

  const handleSaveSide = async () => {
    try {
      if (tempSides.length === 0) return;

      const lowercaseUHID = uhid.toLowerCase(); // your patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: "side", // field in your Observation JSON
        value: tempSides.join(", "), // send as comma-separated string
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedSides([...tempSides]);
      setIsEditingSide(false);
    } catch (error) {
      console.error("Failed to update side:", error);
    }
  };

  const handleCancelSide = () => {
    setTempSides([...selectedSides]);
    setIsEditingSide(false);
  };

  const handleToggleSide = (side) => {
    if (tempSides.includes(side)) {
      setTempSides(tempSides.filter((s) => s !== side));
    } else {
      setTempSides([...tempSides, side]);
    }
  };

  const deformities = [
    "Varus",
    "Valgus",
    "Flexion Contraction",
    "Recurvatum Deformity",
  ];

  const [isEditingDeformity, setIsEditingDeformity] = useState(false);
  const [selectedDeformity, setSelectedDeformity] = useState([]); // for multi-select
  const [tempDeformity, setTempDeformity] = useState([]);

  const handleEditDeformity = () => {
    setTempDeformity([...selectedDeformity]);
    setIsEditingDeformity(true);
  };

  const handleSaveDeformity = async () => {
    try {
      if (tempDeformity.length === 0) return;

      const lowercaseUHID = uhid.toLowerCase(); // patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: "surgery_indication", // field name in your backend
        value: tempDeformity.join(", "), // send as comma-separated string
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedDeformity([...tempDeformity]);
      setIsEditingDeformity(false);
    } catch (error) {
      console.error("Failed to update deformity:", error);
    }
  };

  const handleCancelDeformity = () => {
    setTempDeformity([...selectedDeformity]);
    setIsEditingDeformity(false);
  };

const handleToggleDeformity = (grade) => {
  if (grade === "Varus" || grade === "Valgus") {
    // Single-select logic for Varus/Valgus
    if (tempDeformity.includes(grade)) {
      // unselect if already selected
      setTempDeformity(tempDeformity.filter((g) => g !== grade));
    } else {
      // replace any previous Varus/Valgus selection
      const others = tempDeformity.filter((g) => g !== "Varus" && g !== "Valgus");
      setTempDeformity([...others, grade]);
    }
  } else {
    // Multi-select logic for the rest
    if (tempDeformity.includes(grade)) {
      setTempDeformity(tempDeformity.filter((g) => g !== grade));
    } else {
      setTempDeformity([...tempDeformity, grade]);
    }
  }
};


  const techOptions = [
    "Computer Guide",
    "Robotic",
    "PSI",
    "Conventional Instruments",
  ];

  const [isEditingTech, setIsEditingTech] = useState(false);
  const [selectedTech, setSelectedTech] = useState(""); // single select
  const [tempTech, setTempTech] = useState("");

  const handleEditTech = () => {
    setTempTech(selectedTech);
    setIsEditingTech(true);
  };

  const handleSaveTech = async () => {
    try {
      if (!tempTech) return;

      const lowercaseUHID = uhid.toLowerCase(); // patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: "tech_assist", // field name in backend
        value: tempTech, // selected option
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedTech(tempTech);
      setIsEditingTech(false);
    } catch (error) {
      console.error("Failed to update technological assistance:", error);
    }
  };

  const handleCancelTech = () => {
    setTempTech(selectedTech);
    setIsEditingTech(false);
  };

  const alignmentOptions = ["MA", "KA", "rKA", "FA", "iKA", "Hybrid"];

  const [isEditingAlignment, setIsEditingAlignment] = useState(false);
  const [selectedAlignment, setSelectedAlignment] = useState(""); // single select
  const [tempAlignment, setTempAlignment] = useState("");

  const handleEditAlignment = () => {
    setTempAlignment(selectedAlignment);
    setIsEditingAlignment(true);
  };

  const handleSaveAlignment = async () => {
    try {
      if (!tempAlignment) return;

      const lowercaseUHID = uhid.toLowerCase(); // patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: "align_phil", // backend field name
        value: tempAlignment, // selected alignment
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedAlignment(tempAlignment);
      setIsEditingAlignment(false);
    } catch (error) {
      console.error("Failed to update alignment philosophy:", error);
    }
  };

  const handleCancelAlignment = () => {
    setTempAlignment(selectedAlignment);
    setIsEditingAlignment(false);
  };

  const options = ["Yes", "No"];

  const [isEditingTorque, setIsEditingTorque] = useState(false);
  const [selectedTorque, setSelectedTorque] = useState(""); // single select
  const [tempTorque, setTempTorque] = useState("");

  const handleEditTorque = () => {
    setTempTorque(selectedTorque);
    setIsEditingTorque(true);
  };

  const handleSaveTorque = async () => {
    try {
      if (!tempTorque) return;

      const lowercaseUHID = uhid.toLowerCase(); // patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: "torq_used", // backend field name
        value: tempTorque, // selected option
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedTorque(tempTorque);
      setIsEditingTorque(false);
    } catch (error) {
      console.error("Failed to update Torniquet Used:", error);
    }
  };

  const handleCancelTorque = () => {
    setTempTorque(selectedTorque);
    setIsEditingTorque(false);
  };

  const [timeDate, setTimedate] = useState(""); // stored value

  const [isEditingTime, setIsEditingTime] = useState(false);
  const [timeValue, setTimeValue] = useState(""); // stored value
  const [tempTimeValue, setTempTimeValue] = useState("");

  const handleEditTime = () => {
    setTempTimeValue(timeValue);
    setIsEditingTime(true);
  };

  const handleSaveTime = async () => {
    try {
      if (!tempTimeValue) return;

      const lowercaseUHID = uhid.toLowerCase(); // patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: "op_time", // backend field name
        value: tempTimeValue, // new time value
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setTimeValue(tempTimeValue);
      setIsEditingTime(false);
    } catch (error) {
      console.error("Failed to update Operation Time:", error);
    }
  };

  const handleCancelTime = () => {
    setTempTimeValue(timeValue);
    setIsEditingTime(false);
  };

  const torquedOptions = ["Intact", "Torn", "Reconstructed"]; // unique variable
  const [isEditingTorqued, setIsEditingTorqued] = useState(false);
  const [selectedTorqued, setSelectedTorqued] = useState(""); // stored value
  const [tempTorqued, setTempTorqued] = useState("");

  const handleEditTorqued = () => {
    setTempTorqued(selectedTorqued);
    setIsEditingTorqued(true);
  };

  const handleSaveTorqued = async () => {
    try {
      if (!tempTorqued) return;

      const lowercaseUHID = uhid.toLowerCase(); // patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: "acl", // backend field name from your JSON ("acl" in bone_resection component)
        value: tempTorqued, // selected option
        op_date: `op-${op_date}`,
      };

      // console.log("Payload to send:", JSON.stringify(payload, null, 2));

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );

      setSelectedTorqued(tempTorqued);
      setIsEditingTorqued(false);
    } catch (error) {
      console.error("Failed to update Torqued Structure:", error);
    }
  };

  const handleCancelTorqued = () => {
    setTempTorqued(selectedTorqued);
    setIsEditingTorqued(false);
  };

  const saveField = async (fieldName, value) => {
    try {
      if (!value) return;

      const lowercaseUHID = uhid.toLowerCase(); // patient UHID
      const payload = {
        uhid: lowercaseUHID,
        field: fieldName,
        value: value,
        op_date: `op-${op_date}`,
      };

      // console.log(
      //   `Payload to send for ${fieldName}:`,
      //   JSON.stringify(payload, null, 2)
      // );

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
    } catch (error) {
      console.error(`Failed to update ${fieldName}:`, error);
    }
  };

  // Values
  const [distalMedialUnwornWorn, setDistalMedialUnwornWorn] = useState(""); // stored value
  const [tempDistalMedialUnwornWorn, setTempDistalMedialUnwornWorn] = useState(
    distalMedialUnwornWorn
  ); // temporary editing value
  const [isEditingDistalMedialUnwornWorn, setIsEditingDistalMedialUnwornWorn] =
    useState(false);

  // Functions
  const handleEditDistalMedialUnwornWorn = () =>
    setIsEditingDistalMedialUnwornWorn(true);

  const handleSaveDistalMedialUnwornWorn = async () => {
    setDistalMedialUnwornWorn(tempDistalMedialUnwornWorn);
    setIsEditingDistalMedialUnwornWorn(false);
    await saveField("distal_medial,wear", tempDistalMedialUnwornWorn);
  };

  const handleCancelDistalMedialUnwornWorn = () => {
    setTempDistalMedialUnwornWorn(distalMedialUnwornWorn);
    setIsEditingDistalMedialUnwornWorn(false);
  };

  const [distalMedialInitialThickness, setDistalMedialInitialThickness] =
    useState(""); // stored value
  const [
    tempDistalMedialInitialThickness,
    setTempDistalMedialInitialThickness,
  ] = useState(distalMedialInitialThickness);
  const [
    isEditingDistalMedialInitialThickness,
    setIsEditingDistalMedialInitialThickness,
  ] = useState(false);

  const handleEditDistalMedialInitialThickness = () =>
    setIsEditingDistalMedialInitialThickness(true);
  const handleSaveDistalMedialInitialThickness = async () => {
    setDistalMedialInitialThickness(tempDistalMedialInitialThickness);
    setIsEditingDistalMedialInitialThickness(false);
    await saveField(
      "distal_medial,initial_thickness",
      tempDistalMedialInitialThickness
    );
  };
  const handleCancelDistalMedialInitialThickness = () => {
    setTempDistalMedialInitialThickness(distalMedialInitialThickness);
    setIsEditingDistalMedialInitialThickness(false);
  };

  // States for Y/N
  const [distalMedialRecutYN, setDistalMedialRecutYN] = useState("");
  const [tempDistalMedialRecutYN, setTempDistalMedialRecutYN] =
    useState(distalMedialRecutYN);
  const [isEditingDistalMedialRecutYN, setIsEditingDistalMedialRecutYN] =
    useState(false);

  // States for MM
  const [distalMedialRecutMM, setDistalMedialRecutMM] = useState("");
  const [tempDistalMedialRecutMM, setTempDistalMedialRecutMM] =
    useState(distalMedialRecutMM);
  const [isEditingDistalMedialRecutMM, setIsEditingDistalMedialRecutMM] =
    useState(false);

  // Functions
  const saveDistalMedialRecutYN = async () => {
    setDistalMedialRecutYN(tempDistalMedialRecutYN);
    setIsEditingDistalMedialRecutYN(false);
    await saveField("distal_medial,recut", tempDistalMedialRecutYN);
  };

  const cancelDistalMedialRecutYN = () => {
    setTempDistalMedialRecutYN(distalMedialRecutYN);
    setIsEditingDistalMedialRecutYN(false);
  };

  const saveDistalMedialRecutMM = async () => {
    setDistalMedialRecutMM(tempDistalMedialRecutMM);
    setIsEditingDistalMedialRecutMM(false);
    await saveField("distal_medial,recutvalue", tempDistalMedialRecutMM);
  };

  const cancelDistalMedialRecutMM = () => {
    setTempDistalMedialRecutMM(distalMedialRecutMM);
    setIsEditingDistalMedialRecutMM(false);
  };

  // States for Y/N
  const [distalMedialWasherYN, setDistalMedialWasherYN] = useState("");
  const [tempDistalMedialWasherYN, setTempDistalMedialWasherYN] =
    useState(distalMedialWasherYN);
  const [isEditingDistalMedialWasherYN, setIsEditingDistalMedialWasherYN] =
    useState(false);

  // States for MM
  const [distalMedialWasherMM, setDistalMedialWasherMM] = useState("");
  const [tempDistalMedialWasherMM, setTempDistalMedialWasherMM] =
    useState(distalMedialWasherMM);
  const [isEditingDistalMedialWasherMM, setIsEditingDistalMedialWasherMM] =
    useState(false);

  // Functions
  const saveDistalMedialWasherYN = async () => {
    setDistalMedialWasherYN(tempDistalMedialWasherYN);
    setIsEditingDistalMedialWasherYN(false);
    await saveField("distal_medial,washer", tempDistalMedialWasherYN);
  };

  const cancelDistalMedialWasherYN = () => {
    setTempDistalMedialWasherYN(distalMedialWasherYN);
    setIsEditingDistalMedialWasherYN(false);
  };

  const saveDistalMedialWasherMM = async () => {
    setDistalMedialWasherMM(tempDistalMedialWasherMM);
    setIsEditingDistalMedialWasherMM(false);
    await saveField("distal_medial,washervalue", tempDistalMedialWasherMM);
  };

  const cancelDistalMedialWasherMM = () => {
    setTempDistalMedialWasherMM(distalMedialWasherMM);
    setIsEditingDistalMedialWasherMM(false);
  };

  const [distalMedialFinalThickness, setDistalMedialFinalThickness] =
    useState("");
  const [tempDistalMedialFinalThickness, setTempDistalMedialFinalThickness] =
    useState(distalMedialFinalThickness);
  const [
    isEditingDistalMedialFinalThickness,
    setIsEditingDistalMedialFinalThickness,
  ] = useState(false);

  const handleEditDistalMedialFinalThickness = () =>
    setIsEditingDistalMedialFinalThickness(true);
  const handleSaveDistalMedialFinalThickness = async () => {
    setDistalMedialFinalThickness(tempDistalMedialFinalThickness);
    setIsEditingDistalMedialFinalThickness(false);
    await saveField(
      "distal_medial,final_thickness",
      tempDistalMedialFinalThickness
    );
  };
  const handleCancelDistalMedialFinalThickness = () => {
    setTempDistalMedialFinalThickness(distalMedialFinalThickness);
    setIsEditingDistalMedialFinalThickness(false);
  };

  // -------- Unworn / Worn --------
  const [distalLateralUnwornWorn, setDistalLateralUnwornWorn] = useState("");
  const [tempDistalLateralUnwornWorn, setTempDistalLateralUnwornWorn] =
    useState(distalLateralUnwornWorn);
  const [
    isEditingDistalLateralUnwornWorn,
    setIsEditingDistalLateralUnwornWorn,
  ] = useState(false);

  // -------- Initial Thickness --------
  const [distalLateralInitialThickness, setDistalLateralInitialThickness] =
    useState("");
  const [
    tempDistalLateralInitialThickness,
    setTempDistalLateralInitialThickness,
  ] = useState(distalLateralInitialThickness);
  const [
    isEditingDistalLateralInitialThickness,
    setIsEditingDistalLateralInitialThickness,
  ] = useState(false);

  // -------- Recut --------
  const [distalLateralRecutYN, setDistalLateralRecutYN] = useState("");
  const [tempDistalLateralRecutYN, setTempDistalLateralRecutYN] =
    useState(distalLateralRecutYN);

  const [distalLateralRecutMM, setDistalLateralRecutMM] = useState("");
  const [tempDistalLateralRecutMM, setTempDistalLateralRecutMM] =
    useState(distalLateralRecutMM);

  const [isEditingDistalLateralRecutYN, setIsEditingDistalLateralRecutYN] =
    useState(false);
  const [isEditingDistalLateralRecutMM, setIsEditingDistalLateralRecutMM] =
    useState(false);

  // Washer Y/N
  const [distalLateralWasherYN, setDistalLateralWasherYN] = useState("");
  const [tempDistalLateralWasherYN, setTempDistalLateralWasherYN] = useState(
    distalLateralWasherYN
  );
  const [isEditingDistalLateralWasherYN, setIsEditingDistalLateralWasherYN] =
    useState(false);

  // Washer MM
  const [distalLateralWasherMM, setDistalLateralWasherMM] = useState("");
  const [tempDistalLateralWasherMM, setTempDistalLateralWasherMM] = useState(
    distalLateralWasherMM
  );
  const [isEditingDistalLateralWasherMM, setIsEditingDistalLateralWasherMM] =
    useState(false);

  // -------- Final Thickness --------
  const [distalLateralFinalThickness, setDistalLateralFinalThickness] =
    useState("");
  const [tempDistalLateralFinalThickness, setTempDistalLateralFinalThickness] =
    useState(distalLateralFinalThickness);
  const [
    isEditingDistalLateralFinalThickness,
    setIsEditingDistalLateralFinalThickness,
  ] = useState(false);

  const saveDistalLateralField = async (fieldName, value) => {
    try {
      const payload = {
        uhid: uhid.toLowerCase(),
        field: fieldName,
        value: value,
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(`${fieldName} saved:`, value);
    } catch (err) {
      // console.error(`Failed to save ${fieldName}:`, err);
    }
  };

  // -------- Unworn / Worn --------
  const editDistalLateralUnwornWorn = () =>
    setIsEditingDistalLateralUnwornWorn(true);
  const saveDistalLateralUnwornWorn = async () => {
    setDistalLateralUnwornWorn(tempDistalLateralUnwornWorn);
    setIsEditingDistalLateralUnwornWorn(false);
    await saveDistalLateralField(
      "distal_lateral,wear",
      tempDistalLateralUnwornWorn
    );
  };
  const cancelDistalLateralUnwornWorn = () => {
    setTempDistalLateralUnwornWorn(distalLateralUnwornWorn);
    setIsEditingDistalLateralUnwornWorn(false);
  };

  // -------- Initial Thickness --------
  const editDistalLateralInitialThickness = () =>
    setIsEditingDistalLateralInitialThickness(true);
  const saveDistalLateralInitialThickness = async () => {
    setDistalLateralInitialThickness(tempDistalLateralInitialThickness);
    setIsEditingDistalLateralInitialThickness(false);
    await saveDistalLateralField(
      "distal_lateral,initial_thickness",
      tempDistalLateralInitialThickness
    );
  };
  const cancelDistalLateralInitialThickness = () => {
    setTempDistalLateralInitialThickness(distalLateralInitialThickness);
    setIsEditingDistalLateralInitialThickness(false);
  };

  // -------- Recut --------
  const saveDistalLateralRecutYN = async () => {
    setDistalLateralRecutYN(tempDistalLateralRecutYN);
    setIsEditingDistalLateralRecutYN(false);
    await saveDistalLateralField(
      "distal_lateral,recut",
      tempDistalLateralRecutYN
    );
  };
  const cancelDistalLateralRecutYN = () => {
    setTempDistalLateralRecutYN(distalLateralRecutYN);
    setIsEditingDistalLateralRecutYN(false);
  };

  const saveDistalLateralRecutMM = async () => {
    setDistalLateralRecutMM(tempDistalLateralRecutMM);
    setIsEditingDistalLateralRecutMM(false);
    await saveDistalLateralField(
      "distal_lateral,recutvalue",
      tempDistalLateralRecutMM
    );
  };
  const cancelDistalLateralRecutMM = () => {
    setTempDistalLateralRecutMM(distalLateralRecutMM);
    setIsEditingDistalLateralRecutMM(false);
  };

  // -------- Washer --------
  // Washer Y/N
  const saveDistalLateralWasherYN = async () => {
    setDistalLateralWasherYN(tempDistalLateralWasherYN);
    setIsEditingDistalLateralWasherYN(false);
    await saveDistalLateralField(
      "distal_lateral,washer",
      tempDistalLateralWasherYN
    );
  };
  const cancelDistalLateralWasherYN = () => {
    setTempDistalLateralWasherYN(distalLateralWasherYN);
    setIsEditingDistalLateralWasherYN(false);
  };

  // Washer MM
  const saveDistalLateralWasherMM = async () => {
    setDistalLateralWasherMM(tempDistalLateralWasherMM);
    setIsEditingDistalLateralWasherMM(false);
    await saveDistalLateralField(
      "distal_lateral,washervalue",
      tempDistalLateralWasherMM
    );
  };
  const cancelDistalLateralWasherMM = () => {
    setTempDistalLateralWasherMM(distalLateralWasherMM);
    setIsEditingDistalLateralWasherMM(false);
  };

  // -------- Final Thickness --------
  const editDistalLateralFinalThickness = () =>
    setIsEditingDistalLateralFinalThickness(true);
  const saveDistalLateralFinalThickness = async () => {
    setDistalLateralFinalThickness(tempDistalLateralFinalThickness);
    setIsEditingDistalLateralFinalThickness(false);
    await saveDistalLateralField(
      "distal_lateral,final_thickness",
      tempDistalLateralFinalThickness
    );
  };
  const cancelDistalLateralFinalThickness = () => {
    setTempDistalLateralFinalThickness(distalLateralFinalThickness);
    setIsEditingDistalLateralFinalThickness(false);
  };

  const savePostMedField = async (fieldName, value) => {
    try {
      const payload = {
        uhid: uhid.toLowerCase(),
        field: fieldName,
        value: value,
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(`${fieldName} saved:`, value);
    } catch (err) {
      console.error(`Failed to save ${fieldName}:`, err);
    }
  };

  // Unworn / Worn
  const [postMedUnwornWorn, setPostMedUnwornWorn] = useState("");
  const [tempPostMedUnwornWorn, setTempPostMedUnwornWorn] =
    useState(postMedUnwornWorn);
  const [isEditingPostMedUnwornWorn, setIsEditingPostMedUnwornWorn] =
    useState(false);

  // Initial Thickness
  const [postMedInitialThickness, setPostMedInitialThickness] = useState("");
  const [tempPostMedInitialThickness, setTempPostMedInitialThickness] =
    useState(postMedInitialThickness);
  const [
    isEditingPostMedInitialThickness,
    setIsEditingPostMedInitialThickness,
  ] = useState(false);

  // Recut Y/N
  const [postMedRecutYN, setPostMedRecutYN] = useState("");
  const [tempPostMedRecutYN, setTempPostMedRecutYN] = useState(postMedRecutYN);
  const [isEditingPostMedRecutYN, setIsEditingPostMedRecutYN] = useState(false);

  // Recut MM
  const [postMedRecutMM, setPostMedRecutMM] = useState("");
  const [tempPostMedRecutMM, setTempPostMedRecutMM] = useState(postMedRecutMM);
  const [isEditingPostMedRecutMM, setIsEditingPostMedRecutMM] = useState(false);

  // Final Thickness
  const [postMedFinalThickness, setPostMedFinalThickness] = useState("");
  const [tempPostMedFinalThickness, setTempPostMedFinalThickness] = useState(
    postMedFinalThickness
  );
  const [isEditingPostMedFinalThickness, setIsEditingPostMedFinalThickness] =
    useState(false);

  // Unworn / Worn
  const savePostMedUnwornWorn = async () => {
    setPostMedUnwornWorn(tempPostMedUnwornWorn);
    setIsEditingPostMedUnwornWorn(false);
    await savePostMedField("posterial_medial,wear", tempPostMedUnwornWorn);
  };
  const cancelPostMedUnwornWorn = () => {
    setTempPostMedUnwornWorn(postMedUnwornWorn);
    setIsEditingPostMedUnwornWorn(false);
  };

  // Initial Thickness
  const savePostMedInitialThickness = async () => {
    setPostMedInitialThickness(tempPostMedInitialThickness);
    setIsEditingPostMedInitialThickness(false);
    await savePostMedField(
      "posterial_medial,initial_thickness",
      tempPostMedInitialThickness
    );
  };
  const cancelPostMedInitialThickness = () => {
    setTempPostMedInitialThickness(postMedInitialThickness);
    setIsEditingPostMedInitialThickness(false);
  };

  // Recut Y/N
  const savePostMedRecutYN = async () => {
    setPostMedRecutYN(tempPostMedRecutYN);
    setIsEditingPostMedRecutYN(false);
    await savePostMedField("posterial_medial,recut", tempPostMedRecutYN);
  };
  const cancelPostMedRecutYN = () => {
    setTempPostMedRecutYN(postMedRecutYN);
    setIsEditingPostMedRecutYN(false);
  };

  // Recut MM
  const savePostMedRecutMM = async () => {
    setPostMedRecutMM(tempPostMedRecutMM);
    setIsEditingPostMedRecutMM(false);
    await savePostMedField("posterial_medial,recutvalue", tempPostMedRecutMM);
  };
  const cancelPostMedRecutMM = () => {
    setTempPostMedRecutMM(postMedRecutMM);
    setIsEditingPostMedRecutMM(false);
  };

  // Final Thickness
  const savePostMedFinalThickness = async () => {
    setPostMedFinalThickness(tempPostMedFinalThickness);
    setIsEditingPostMedFinalThickness(false);
    await savePostMedField(
      "posterial_medial,final_thickness",
      tempPostMedFinalThickness
    );
  };
  const cancelPostMedFinalThickness = () => {
    setTempPostMedFinalThickness(postMedFinalThickness);
    setIsEditingPostMedFinalThickness(false);
  };

  const savePostLatField = async (fieldName, value) => {
    try {
      const payload = {
        uhid: uhid.toLowerCase(),
        field: fieldName,
        value: value,
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(`${fieldName} saved:`, value);
    } catch (err) {
      console.error(`Failed to save ${fieldName}:`, err);
    }
  };

  // Unworn / Worn
  const [postLatUnwornWorn, setPostLatUnwornWorn] = useState("");
  const [tempPostLatUnwornWorn, setTempPostLatUnwornWorn] =
    useState(postLatUnwornWorn);
  const [isEditingPostLatUnwornWorn, setIsEditingPostLatUnwornWorn] =
    useState(false);

  // Initial Thickness
  const [postLatInitialThickness, setPostLatInitialThickness] = useState("");
  const [tempPostLatInitialThickness, setTempPostLatInitialThickness] =
    useState(postLatInitialThickness);
  const [
    isEditingPostLatInitialThickness,
    setIsEditingPostLatInitialThickness,
  ] = useState(false);

  // Recut Y/N
  const [postLatRecutYN, setPostLatRecutYN] = useState("");
  const [tempPostLatRecutYN, setTempPostLatRecutYN] = useState(postLatRecutYN);
  const [isEditingPostLatRecutYN, setIsEditingPostLatRecutYN] = useState(false);

  // Recut MM
  const [postLatRecutMM, setPostLatRecutMM] = useState("");
  const [tempPostLatRecutMM, setTempPostLatRecutMM] = useState(postLatRecutMM);
  const [isEditingPostLatRecutMM, setIsEditingPostLatRecutMM] = useState(false);

  // Final Thickness
  const [postLatFinalThickness, setPostLatFinalThickness] = useState("");
  const [tempPostLatFinalThickness, setTempPostLatFinalThickness] = useState(
    postLatFinalThickness
  );
  const [isEditingPostLatFinalThickness, setIsEditingPostLatFinalThickness] =
    useState(false);

  // Unworn / Worn
  const savePostLatUnwornWorn = async () => {
    setPostLatUnwornWorn(tempPostLatUnwornWorn);
    setIsEditingPostLatUnwornWorn(false);
    await savePostLatField("posterial_lateral,wear", tempPostLatUnwornWorn);
  };
  const cancelPostLatUnwornWorn = () => {
    setTempPostLatUnwornWorn(postLatUnwornWorn);
    setIsEditingPostLatUnwornWorn(false);
  };

  // Initial Thickness
  const savePostLatInitialThickness = async () => {
    setPostLatInitialThickness(tempPostLatInitialThickness);
    setIsEditingPostLatInitialThickness(false);
    await savePostLatField(
      "posterial_lateral,initial_thickness",
      tempPostLatInitialThickness
    );
  };
  const cancelPostLatInitialThickness = () => {
    setTempPostLatInitialThickness(postLatInitialThickness);
    setIsEditingPostLatInitialThickness(false);
  };

  // Recut Y/N
  const savePostLatRecutYN = async () => {
    setPostLatRecutYN(tempPostLatRecutYN);
    setIsEditingPostLatRecutYN(false);
    await savePostLatField("posterial_lateral,recut", tempPostLatRecutYN);
  };
  const cancelPostLatRecutYN = () => {
    setTempPostLatRecutYN(postLatRecutYN);
    setIsEditingPostLatRecutYN(false);
  };

  // Recut MM
  const savePostLatRecutMM = async () => {
    setPostLatRecutMM(tempPostLatRecutMM);
    setIsEditingPostLatRecutMM(false);
    await savePostLatField("posterial_lateral,recutvalue", tempPostLatRecutMM);
  };
  const cancelPostLatRecutMM = () => {
    setTempPostLatRecutMM(postLatRecutMM);
    setIsEditingPostLatRecutMM(false);
  };

  // Final Thickness
  const savePostLatFinalThickness = async () => {
    setPostLatFinalThickness(tempPostLatFinalThickness);
    setIsEditingPostLatFinalThickness(false);
    await savePostLatField(
      "posterial_lateral,final_thickness",
      tempPostLatFinalThickness
    );
  };
  const cancelPostLatFinalThickness = () => {
    setTempPostLatFinalThickness(postLatFinalThickness);
    setIsEditingPostLatFinalThickness(false);
  };

  const saveTibialLeftField = async (fieldName, value) => {
    try {
      const payload = {
        uhid: uhid.toLowerCase(),
        field: fieldName,
        value: value,
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(`${fieldName} saved:`, value);
    } catch (err) {
      // console.error(`Failed to save ${fieldName}:`, err);
    }
  };

  // Worn / Unworn
  const [tibialLeftWorn, setTibialLeftWorn] = useState("");
  const [tempTibialLeftWorn, setTempTibialLeftWorn] = useState(tibialLeftWorn);
  const [isEditingTibialLeftWorn, setIsEditingTibialLeftWorn] = useState(false);

  // Thickness MM
  const [tibialLeftMM, setTibialLeftMM] = useState("");
  const [tempTibialLeftMM, setTempTibialLeftMM] = useState(tibialLeftMM);
  const [isEditingTibialLeftMM, setIsEditingTibialLeftMM] = useState(false);

  // Worn / Unworn
  const saveTibialLeftWorn = async () => {
    setTibialLeftWorn(tempTibialLeftWorn);
    setIsEditingTibialLeftWorn(false);
    await saveTibialLeftField("tibial_resection_left,wear", tempTibialLeftWorn);
  };
  const cancelTibialLeftWorn = () => {
    setTempTibialLeftWorn(tibialLeftWorn);
    setIsEditingTibialLeftWorn(false);
  };

  // MM
  const saveTibialLeftMM = async () => {
    setTibialLeftMM(tempTibialLeftMM);
    setIsEditingTibialLeftMM(false);
    await saveTibialLeftField("tibial_resection_left,value", tempTibialLeftMM);
  };
  const cancelTibialLeftMM = () => {
    setTempTibialLeftMM(tibialLeftMM);
    setIsEditingTibialLeftMM(false);
  };

  const saveTibialField = async (side, fieldName, value) => {
    try {
      const payload = {
        side, // "left" or "right"
        field: fieldName,
        value: value,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(`${side} tibial ${fieldName} saved:`, value);
    } catch (err) {
      // console.error(`Failed to save ${side} tibial ${fieldName}:`, err);
    }
  };

  // Worn / Unworn
  const [tibialRightWorn, setTibialRightWorn] = useState("");
  const [tempTibialRightWorn, setTempTibialRightWorn] =
    useState(tibialRightWorn);
  const [isEditingTibialRightWorn, setIsEditingTibialRightWorn] =
    useState(false);

  // Thickness MM
  const [tibialRightMM, setTibialRightMM] = useState("");
  const [tempTibialRightMM, setTempTibialRightMM] = useState(tibialRightMM);
  const [isEditingTibialRightMM, setIsEditingTibialRightMM] = useState(false);

  // Worn / Unworn
  const saveTibialRightWorn = async () => {
    setTibialRightWorn(tempTibialRightWorn);
    setIsEditingTibialRightWorn(false);
    await saveTibialField(
      "right",
      "tibial_resection_right,wear",
      tempTibialRightWorn
    );
  };
  const cancelTibialRightWorn = () => {
    setTempTibialRightWorn(tibialRightWorn);
    setIsEditingTibialRightWorn(false);
  };

  // MM
  const saveTibialRightMM = async () => {
    setTibialRightMM(tempTibialRightMM);
    setIsEditingTibialRightMM(false);
    await saveTibialField(
      "right",
      "tibial_resection_right,value",
      tempTibialRightMM
    );
  };
  const cancelTibialRightMM = () => {
    setTempTibialRightMM(tibialRightMM);
    setIsEditingTibialRightMM(false);
  };

  const [pclCondition, setPclCondition] = useState("");
  const [tempPclCondition, setTempPclCondition] = useState(pclCondition);
  const [isEditingPclCondition, setIsEditingPclCondition] = useState(false);

  const savePclCondition = async () => {
    setPclCondition(tempPclCondition);
    setIsEditingPclCondition(false);

    try {
      const payload = {
        field: "pcl",
        value: tempPclCondition,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("PCL Condition saved:", tempPclCondition);
    } catch (err) {
      // console.error("Failed to save PCL Condition:", err);
    }
  };

  const cancelPclCondition = () => {
    setTempPclCondition(pclCondition);
    setIsEditingPclCondition(false);
  };

  const [tibialVVRecutYN, setTibialVVRecutYN] = useState("");
  const [tempTibialVVRecutYN, setTempTibialVVRecutYN] =
    useState(tibialVVRecutYN);
  const [isEditingTibialVVRecutYN, setIsEditingTibialVVRecutYN] =
    useState(false);

  const [tibialVVRecutMM, setTibialVVRecutMM] = useState("");
  const [tempTibialVVRecutMM, setTempTibialVVRecutMM] =
    useState(tibialVVRecutMM);
  const [isEditingTibialVVRecutMM, setIsEditingTibialVVRecutMM] =
    useState(false);

  const saveTibialVVRecutYN = async () => {
    setTibialVVRecutYN(tempTibialVVRecutYN);
    setIsEditingTibialVVRecutYN(false);

    try {
      const payload = {
        field: "tibialvvrecut,wear", // backend field for status
        value: tempTibialVVRecutYN,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("Tibial VV Recut Y/N saved:", tempTibialVVRecutYN);
    } catch (err) {
      // console.error("Failed to save Tibial VV Recut Y/N:", err);
    }
  };
  const cancelTibialVVRecutYN = () => {
    setTempTibialVVRecutYN(tibialVVRecutYN);
    setIsEditingTibialVVRecutYN(false);
  };

  const saveTibialVVRecutMM = async () => {
    setTibialVVRecutMM(tempTibialVVRecutMM);
    setIsEditingTibialVVRecutMM(false);

    try {
      const payload = {
        field: "tibialvvrecut,value", // backend field for value
        value: tempTibialVVRecutMM,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("Tibial VV Recut MM saved:", tempTibialVVRecutMM);
    } catch (err) {
      // console.error("Failed to save Tibial VV Recut MM:", err);
    }
  };
  const cancelTibialVVRecutMM = () => {
    setTempTibialVVRecutMM(tibialVVRecutMM);
    setIsEditingTibialVVRecutMM(false);
  };

  const [tibialSlopeRecutYN, setTibialSlopeRecutYN] = useState("");
  const [tempTibialSlopeRecutYN, setTempTibialSlopeRecutYN] =
    useState(tibialSlopeRecutYN);
  const [isEditingTibialSlopeRecutYN, setIsEditingTibialSlopeRecutYN] =
    useState(false);

  const [tibialSlopeRecutMM, setTibialSlopeRecutMM] = useState("");
  const [tempTibialSlopeRecutMM, setTempTibialSlopeRecutMM] =
    useState(tibialSlopeRecutMM);
  const [isEditingTibialSlopeRecutMM, setIsEditingTibialSlopeRecutMM] =
    useState(false);

  const saveTibialSlopeRecutYN = async () => {
    setTibialSlopeRecutYN(tempTibialSlopeRecutYN);
    setIsEditingTibialSlopeRecutYN(false);

    try {
      const payload = {
        field: "tibialsloperecut,wear",
        value: tempTibialSlopeRecutYN,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("Tibial Slope Recut Y/N saved:", tempTibialSlopeRecutYN);
    } catch (err) {
      // console.error("Failed to save Tibial Slope Recut Y/N:", err);
    }
  };
  const cancelTibialSlopeRecutYN = () => {
    setTempTibialSlopeRecutYN(tibialSlopeRecutYN);
    setIsEditingTibialSlopeRecutYN(false);
  };

  const saveTibialSlopeRecutMM = async () => {
    setTibialSlopeRecutMM(tempTibialSlopeRecutMM);
    setIsEditingTibialSlopeRecutMM(false);

    try {
      const payload = {
        field: "tibialsloperecut,value",
        value: tempTibialSlopeRecutMM,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("Tibial Slope Recut MM saved:", tempTibialSlopeRecutMM);
    } catch (err) {
      // console.error("Failed to save Tibial Slope Recut MM:", err);
    }
  };
  const cancelTibialSlopeRecutMM = () => {
    setTempTibialSlopeRecutMM(tibialSlopeRecutMM);
    setIsEditingTibialSlopeRecutMM(false);
  };

  const [finalCheckOptions, setFinalCheckOptions] = useState([
    "Negligible V-V Laxity in extenstion",
    "2-3 mm of lateral opening with Varus load in 15-30° of flexion",
  ]);

  const [selectedFinalCheck, setSelectedFinalCheck] = useState([]);
  const [tempSelectedFinalCheck, setTempSelectedFinalCheck] =
    useState(selectedFinalCheck);
  const [isEditingFinalCheck, setIsEditingFinalCheck] = useState(false);

  const toggleTempFinalCheck = (option) => {
    if (tempSelectedFinalCheck.includes(option)) {
      setTempSelectedFinalCheck(
        tempSelectedFinalCheck.filter((item) => item !== option)
      );
    } else {
      setTempSelectedFinalCheck([...tempSelectedFinalCheck, option]);
    }
  };

  const saveFinalCheck = async () => {
    setSelectedFinalCheck(tempSelectedFinalCheck);
    setIsEditingFinalCheck(false);

    try {
      // Ensure tempSelectedFinalCheck is always an array
      const finalCheckArray = Array.isArray(tempSelectedFinalCheck)
        ? tempSelectedFinalCheck
        : [tempSelectedFinalCheck];

      const payload = {
        field: "final_check",
        value: finalCheckArray.join(", "), // convert to string for backend
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("Final Check saved:", payload.value);
    } catch (err) {
      // console.error("Failed to save Final Check:", err);
    }
  };

  const cancelFinalCheck = () => {
    setTempSelectedFinalCheck(selectedFinalCheck);
    setIsEditingFinalCheck(false);
  };

  const [tableData, setTableData] = useState(
    [10, 11, 12, 13, 14].map((val) => ({
      insertThickness: val,
      numTicks: "",
      extOrient: "",
      flex90Orient: "",
      liftOff: "", // "Y" or "N"
      editing: {
        numTicks: false,
        extOrient: false,
        flex90Orient: false,
        liftOff: false,
      },
    }))
  );

  const startEdit = (rowIdx, field) => {
    setTableData((prev) =>
      prev.map((r, i) =>
        i === rowIdx
          ? {
              ...r,
              editing: { ...r.editing, [field]: true },
              temp: { ...r }, // store temp values for editing
            }
          : r
      )
    );
  };

  const cancelEdit = (rowIdx, field) => {
    setTableData((prev) =>
      prev.map((r, i) =>
        i === rowIdx
          ? {
              ...r,
              editing: { ...r.editing, [field]: false },
              temp: undefined,
            }
          : r
      )
    );
  };

  const fieldMap = {
    numTicks: "numOfTicks",
    extOrient: "extensionExtOrient",
    flex90Orient: "flexionIntOrient",
    liftOff: "liftOff",
  };

  const saveEdit = async (rowIdx, field) => {
    setTableData((prev) =>
      prev.map((r, i) =>
        i === rowIdx
          ? {
              ...r,
              [field]: r.temp[field],
              editing: { ...r.editing, [field]: false },
              temp: undefined,
            }
          : r
      )
    );

    try {
      const thickness = tableData[rowIdx].insertThickness;
      const backendField = fieldMap[field]; // map to backend name

      const payload = {
        uhid: uhid.toLowerCase(),
        update_values: { [backendField]: tableData[rowIdx].temp[field] },
        thickness: thickness,
        op_date: `op-${op_date}`,
      };

      // console.log("Patch payload for thickness_table row:", payload);

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(
      //   `Row ${rowIdx} field "${field}" saved:`,
      //   tableData[rowIdx].temp[field]
      // );
    } catch (err) {
      // console.error(`Failed to save Row ${rowIdx} field "${field}":`, err);
    }
  };

  const updateTemp = (rowIdx, field, value) => {
    setTableData((prev) =>
      prev.map((r, i) =>
        i === rowIdx
          ? {
              ...r,
              temp: { ...r.temp, [field]: value },
            }
          : r
      )
    );
  };

  // State variables
  const [pfjResurf, setPFJResurf] = useState(""); // Saved value
  const [tempPFJResurf, setTempPFJResurf] = useState(""); // Temporary editing value
  const [isEditingPFJResurf, setIsEditingPFJResurf] = useState(false);

  // Functions

  // Save the temporary value as the main value and exit edit mode
  const savePFJResurf = async () => {
    setPFJResurf(tempPFJResurf);
    setIsEditingPFJResurf(false);

    try {
      const payload = {
        field: "pfj_resurfacing", // match the backend field name
        value: tempPFJResurf,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };

      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("PFJ Resurfacing saved:", tempPFJResurf);
    } catch (err) {
      // console.error("Failed to save PFJ Resurfacing:", err);
    }
  };

  // Cancel editing and revert temporary value
  const cancelPFJResurf = () => {
    setTempPFJResurf(pfjResurf); // Revert temp value to saved value
    setIsEditingPFJResurf(false);
  };

  // State variables
  const [trachelaResection, setTrachelaResection] = useState(""); // Saved value
  const [tempTrachelaResection, setTempTrachelaResection] = useState(""); // Temporary value for editing
  const [isEditingTrachelaResection, setIsEditingTrachelaResection] =
    useState(false);

  // Functions

  // Save the temporary value
  const saveTrachelaResection = async () => {
    setTrachelaResection(tempTrachelaResection);
    setIsEditingTrachelaResection(false);

    try {
      const payload = {
        field: "trachela_resection",
        value: tempTrachelaResection,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("Trachela Resection saved:", tempTrachelaResection);
    } catch (err) {
      // console.error("Failed to save Trachela Resection:", err);
    }
  };

  // Cancel editing
  const cancelTrachelaResection = () => {
    setTempTrachelaResection(trachelaResection); // Revert temp to saved value
    setIsEditingTrachelaResection(false);
  };

  // State variables
  const [patella, setPatella] = useState(""); // Saved value
  const [tempPatella, setTempPatella] = useState(""); // Temporary value for editing
  const [isEditingPatella, setIsEditingPatella] = useState(false);

  // Functions
  const savePatella = async () => {
    setPatella(tempPatella);
    setIsEditingPatella(false);

    try {
      const payload = {
        field: "patella",
        value: tempPatella,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log("Patella saved:", tempPatella);
    } catch (err) {
      // console.error("Failed to save Patella:", err);
    }
  };

  const cancelPatella = () => {
    setTempPatella(patella); // Revert temp to saved value
    setIsEditingPatella(false);
  };

  // State variables
  const [preResurfacingThickness, setPreResurfacingThickness] = useState(""); // Saved value
  const [tempPreResurfacingThickness, setTempPreResurfacingThickness] =
    useState(""); // Temporary value during editing
  const [isEditingPreResurfacing, setIsEditingPreResurfacing] = useState(false);

  // Functions
  const savePreResurfacing = async () => {
    setPreResurfacingThickness(tempPreResurfacingThickness);
    setIsEditingPreResurfacing(false);

    try {
      const payload = {
        field: "preresurfacing",
        value: tempPreResurfacingThickness,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(
      //   "Pre-Resurfacing Thickness saved:",
      //   tempPreResurfacingThickness
      // );
    } catch (err) {
      // console.error("Failed to save Pre-Resurfacing Thickness:", err);
    }
  };

  const cancelPreResurfacing = () => {
    setTempPreResurfacingThickness(preResurfacingThickness); // Revert to saved value
    setIsEditingPreResurfacing(false);
  };

  const [postResurfacingThickness, setPostResurfacingThickness] = useState("");
  const [tempPostResurfacingThickness, setTempPostResurfacingThickness] =
    useState("");
  const [isEditingPostResurfacing, setIsEditingPostResurfacing] =
    useState(false);

  // Functions
  const savePostResurfacing = async () => {
    setPostResurfacingThickness(tempPostResurfacingThickness);
    setIsEditingPostResurfacing(false);

    try {
      const payload = {
        field: "postresurfacing",
        value: tempPostResurfacingThickness,
        uhid: uhid.toLowerCase(),
        op_date: `op-${op_date}`,
      };
      await axios.patch(
        `${API_URL}patient_surgery_details/update_field`,
        payload
      );
      // console.log(
      //   "Post-Resurfacing Thickness saved:",
      //   tempPostResurfacingThickness
      // );
    } catch (err) {
      // console.error("Failed to save Post-Resurfacing Thickness:", err);
    }
  };

    useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setlogoutconfirm(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const cancelPostResurfacing = () => {
    setTempPostResurfacingThickness(postResurfacingThickness);
    setIsEditingPostResurfacing(false);
  };

  const messages = [
    "Fetching surgery reports from the database...",
    "Almost there, preparing patient surgery data...",
    "Optimizing report results...",
    "Hang tight! Loading the surgery reports...",
  ];

  const messages1 = [
    "Gathering surgery data...",
    "Checking patient details...",
    "Organizing your report...",
    "Almost done, getting everything ready...",
  ];

  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex1((prev) => (prev + 1) % messages1.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  if (loading)
    return (
      <div className="flex space-x-2 py-4 items-center w-full justify-center">
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
    );

  if (!patientData) return <p>No patient data found for UHID: {uhid}</p>;

  const calculateAge = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Capitalize gender
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
              src={patientData?.avatar || ManAvatar}
              alt="Patient"
              width={60}
              height={60}
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
                  {patientData?.name ?? "NA"}
                </p>
                <p
                  className={`${poppins.className} font-normal text-sm text-black`}
                >
                  {patientData?.age ?? "N/A"}
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
                  L:{" "}
                  {patientData?.doctor_left === sessionStorage.getItem("doctor")
                    ? patientData?.period
                    : "NA"}
                  <br />
                  R:{" "}
                  {patientData?.doctor_right ===
                  sessionStorage.getItem("doctor")
                    ? patientData?.period_right
                    : "NA"}
                </p>
                <p
                  className={`${poppins.className} font-medium text-base text-[#222222] opacity-50 border-r-2 border-r-[#EBEBEB]`}
                >
                  {patientData?.uhid}
                </p>
              </div>
              <p
                className={`${width < 400 ? "w-full" : "w-1/5"} ${
                  inter.className
                } text-end font-semibold text-[15px] text-[#484848]`}
              >
                BMI:{patientData?.bmi ?? "N/A"}
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

      {patientData.surgery_left !== patientData.surgery_right && (
        <div className="flex items-center space-x-2 w-60 pt-[40px]" title="Select the knee to view the surgery report">
          <select
            className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm font-semibold text-black cursor-pointer`}
            value={selectedSurgery}
            onChange={(e) => {
              const newSurgery = e.target.value;
              setSelectedSurgery(newSurgery);
              setop_date(newSurgery);
              if (patientData?.uhid)
                fetchSurgeryReport(patientData.uhid, newSurgery);
              sessionStorage.setItem("op_date", newSurgery);
            }}
          >
            {surgeries.map((surgery, index) => (
              <option key={index} value={surgery.value}>
                {surgery.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {loadingsurg && (
        <div className="flex space-x-2 py-4 items-center w-full justify-center">
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
            {messages1[index1]}
          </span>
        </div>
      )}

      {showsurgeryreport && !loadingsurg && (
        <>
          <div className={`w-full flex flex-col pt-[60px]`}>
            <h2
              className={`${inter.className} text-base font-bold pl-[23px]`}
              style={{ color: "#7676A4" }}
            >
              Operation Details
            </h2>
            <div className="h-[2px] w-full bg-gray-200 mt-[14px]"></div>

            <div className={`space-y-6 pt-[33px] pl-[23px]`}>
              <div className="flex items-center space-x-4">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  1. Select Hospital
                </label>

                {!isEditingHospital ? (
                  <div className="flex items-center space-x-6 rounded px-4 py-2 w-60">
                    <span
                      className={`${inter.className} text-[#272727] font-semibold text-sm`}
                    >
                      {selectedHospital || "Parvathy Hospital"}{" "}
                      {/* default to first option if empty */}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={() => {
                        setIsEditingHospital(true);
                        setTempHospital(
                          selectedHospital || "Parvathy Hospital" // default to first option if none selected
                        );
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempHospital} // reflects selected or default
                      onChange={(e) => setTempHospital(e.target.value)}
                    >
                      <option value="Parvathy Hospital">
                        Parvathy Hospital
                      </option>
                    </select>

                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveHospital}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelHospital}
                    />
                  </div>
                )}
              </div>

              <div className="pt-8 flex flex-col">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  2. Anaesthetic Type
                </label>

                {!isEditingAnaesthetic ? (
                  <div className="flex items-center space-x-2 pt-4 pl-4">
                    <span
                      className={`${raleway.className} text-sm text-[#272727] font-semibold`}
                    >
                      {selectedType || types[0]} {/* default to first type */}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={() => {
                        setIsEditingAnaesthetic(true);
                        setTempType(selectedType || types[0]); // default to first type for editing
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={`${raleway.className} pt-4 flex text-sm text-[#272727] font-semibold flex-col gap-4 pl-4`}
                  >
                    {types.map((type) => {
                      const id = `anaesthetic-${type}`;
                      return (
                        <label
                          key={type}
                          htmlFor={id}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            id={id}
                            type="radio"
                            name="anaestheticType"
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            checked={tempType === type}
                            onChange={() => handleSelectType(type)}
                          />
                          <span className="text-xs text-black">{type}</span>
                        </label>
                      );
                    })}

                    <div className="flex space-x-2 mt-2">
                      <ClipboardDocumentCheckIcon
                        className="w-5 h-5 text-green-600 cursor-pointer"
                        onClick={handleSaveAnaesthetic}
                      />
                      <XMarkIcon
                        className="w-5 h-5 text-red-600 cursor-pointer"
                        onClick={handleCancelAnaesthetic}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8 flex flex-col">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  3. ASA Grades
                </label>

                {!isEditingASA ? (
                  <div
                    className="flex items-center space-x-6 pt-4 rounded px-4 py-2 w-full cursor-pointer"
                    onClick={() => {
                      setIsEditingASA(true);
                      setTempASA(selectedASA || asaGrades[0]); // default to first grade
                    }}
                  >
                    <span
                      className={`${raleway.className} text-sm text-[#272727] font-semibold`}
                    >
                      {selectedASA || asaGrades[0]}{" "}
                      {/* show default if empty */}
                    </span>
                    <PencilIcon className="w-5 h-5 text-gray-600" />
                  </div>
                ) : (
                  <div
                    className={`${raleway.className} pt-4 flex flex-wrap gap-8 pl-4 items-center`}
                  >
                    {asaGrades.map((grade) => {
                      const id = `asa-${grade}`;
                      return (
                        <label
                          key={id}
                          htmlFor={id}
                          className="flex items-center space-x-4 cursor-pointer"
                        >
                          <input
                            id={id}
                            type="radio" // switched to radio for single selection
                            name="asaGrade"
                            checked={tempASA === grade}
                            onChange={() => setTempASA(grade)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span className="text-xs text-[#272727]">
                            {grade}
                          </span>
                        </label>
                      );
                    })}

                    <div className="flex items-center space-x-2">
                      <ClipboardDocumentCheckIcon
                        className="w-5 h-5 text-green-600 cursor-pointer"
                        onClick={handleSaveASA}
                      />
                      <XMarkIcon
                        className="w-5 h-5 text-red-600 cursor-pointer"
                        onClick={handleCancelASA}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8 flex flex-col">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  4. Pre OP - ROM
                </label>

                <div
                  className={`${raleway.className} pt-5 flex flex-col gap-6 pl-4`}
                >
                  {timepoints.map((tp) => (
                    <div key={tp} className="flex items-center space-x-4">
                      <span
                        className={`${raleway.className} font-semibold w-20 text-xs text-[#272727]`}
                      >
                        {tp}
                      </span>

                      {motions.map((motion) => (
                        <input
                          key={motion}
                          type="text"
                          value={
                            editingTimepoint === tp
                              ? tempValues[motion]
                              : values[tp][motion]
                          }
                          disabled={editingTimepoint !== tp}
                          onChange={(e) =>
                            handleChange(tp, motion, e.target.value)
                          }
                          className="px-4 py-1 rounded w-40 bg-gray-300 text-[black] text-sm"
                        />
                      ))}

                      {editingTimepoint !== tp ? (
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => handleEdit(tp)}
                        />
                      ) : (
                        <>
                          <ClipboardDocumentCheckIcon
                            className="w-5 h-5 text-green-600 cursor-pointer"
                            onClick={() => handleSave(tp)}
                          />
                          <XMarkIcon
                            className="w-5 h-5 text-red-600 cursor-pointer"
                            onClick={handleCancel}
                          />
                        </>
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
              <div className="flex items-center space-x-8">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  1. Consultant IN-CHARGE
                </label>

                {!isEditingConsultant ? (
                  <div
                    className="flex flex-col gap-4 w-60 cursor-pointer"
                    onClick={handleEditConsultant}
                  >
                    <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                      <span
                        className={`${inter.className} text-[#272727] font-semibold text-sm`}
                      >
                        {selectedConsultant || consultants[0]}{" "}
                        {/* default first option */}
                      </span>
                      <PencilIcon className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempConsultant}
                      onChange={(e) => setTempConsultant(e.target.value)}
                    >
                      {consultants.map((consultant) => (
                        <option key={consultant} value={consultant}>
                          {consultant}
                        </option>
                      ))}
                    </select>
                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveConsultant}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelConsultant}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-15.5">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  2. Operating Surgeon
                </label>

                {!isEditingSurgeon ? (
                  <div
                    className="flex flex-col gap-4 w-60 cursor-pointer"
                    onClick={handleEditSurgeon}
                  >
                    <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                      <span
                        className={`${inter.className} text-[#272727] font-semibold text-sm`}
                      >
                        {selectedSurgeon || surgeons[0]}{" "}
                        {/* default first option */}
                      </span>
                      <PencilIcon className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempSurgeon}
                      onChange={(e) => setTempSurgeon(e.target.value)}
                    >
                      {surgeons.map((surgeon) => (
                        <option key={surgeon} value={surgeon}>
                          {surgeon}
                        </option>
                      ))}
                    </select>
                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveSurgeon}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelSurgeon}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-[97.3px]">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  3. First Assistant
                </label>

                {!isEditingAssistant ? (
                  <div
                    className="flex flex-col gap-4 w-60 cursor-pointer"
                    onClick={handleEditAssistant}
                  >
                    <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                      <span
                        className={`${inter.className} text-[#272727] font-semibold text-sm`}
                      >
                        {selectedAssistant || assistants[0]}{" "}
                        {/* default first option */}
                      </span>
                      <PencilIcon className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempAssistant}
                      onChange={(e) => setTempAssistant(e.target.value)}
                    >
                      {assistants.map((assistant) => (
                        <option key={assistant} value={assistant}>
                          {assistant}
                        </option>
                      ))}
                    </select>
                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveAssistant}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelAssistant}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-[72.8px]">
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  4. Second Assistant
                </label>

                {!isEditingSecondAssistant ? (
                  <div
                    className="flex flex-col gap-4 w-60 cursor-pointer"
                    onClick={handleEditSecondAssistant}
                  >
                    <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                      <span
                        className={`${inter.className} text-[#272727] font-semibold text-sm`}
                      >
                        {selectedSecondAssistant || secondAssistants[0]}{" "}
                        {/* default first option */}
                      </span>
                      <PencilIcon className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempSecondAssistant}
                      onChange={(e) => setTempSecondAssistant(e.target.value)}
                    >
                      {secondAssistants.map((assistant) => (
                        <option key={assistant} value={assistant}>
                          {assistant}
                        </option>
                      ))}
                    </select>
                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveSecondAssistant}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelSecondAssistant}
                    />
                  </div>
                )}
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
              {!isEditingProcedure ? (
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-sm ${inter.className} text-[#272727] font-semibold`}
                  >
                    {selectedProcedure}
                  </span>
                  <PencilIcon
                    className="w-5 h-5 text-gray-600 cursor-pointer"
                    onClick={handleEditProcedure}
                  />
                </div>
              ) : (
                <>
                  {procedures.map((procedure) => {
                    const id = `magproc-${procedure}`;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex items-center space-x-4 cursor-pointer"
                      >
                        <input
                          id={id}
                          type="radio"
                          name="surgeryProcedure"
                          value={procedure}
                          checked={tempProcedure === procedure}
                          onChange={(e) => setTempProcedure(e.target.value)}
                          className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                        />
                        <span
                          className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                        >
                          {procedure}
                        </span>
                      </label>
                    );
                  })}

                  <ClipboardDocumentCheckIcon
                    className="w-5 h-5 text-green-600 cursor-pointer"
                    onClick={handleSaveProcedure}
                  />
                  <XMarkIcon
                    className="w-5 h-5 text-red-600 cursor-pointer"
                    onClick={handleCancelProcedure}
                  />
                </>
              )}
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

                {!isEditingSide ? (
                  <div className="flex items-center gap-2">
                    <span
                      className={`${raleway.className} text-base font-semibold text-black`}
                    >
                      {selectedSides.join(", ")}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={handleEditSide}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-4">
                      {sides.map((side) => (
                        <label
                          key={side}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={tempSides.includes(side)}
                            onChange={() => handleToggleSide(side)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span
                            className={`${raleway.className} text-base font-semibold text-black`}
                          >
                            {side}
                          </span>
                        </label>
                      ))}
                    </div>

                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveSide}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelSide}
                    />
                  </div>
                )}
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

                {!isEditingDeformity ? (
                  <div className="flex items-center gap-2">
                    <span
                      className={`${raleway.className} text-sm font-semibold text-[#272727]`}
                    >
                      {selectedDeformity.length > 0
                        ? selectedDeformity.join(", ")
                        : "Select"}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={handleEditDeformity}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-6">
                      {deformities.map((grade) => (
                        <label
                          key={grade}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={tempDeformity.includes(grade)}
                            onChange={() => handleToggleDeformity(grade)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span
                            className={`${raleway.className} text-xs font-semibold text-[#272727]`}
                          >
                            {grade}
                          </span>
                        </label>
                      ))}
                    </div>

                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveDeformity}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelDeformity}
                    />
                  </div>
                )}
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

                {!isEditingTech ? (
                  <div className="flex items-center gap-2">
                    <span
                      className={`${raleway.className} text-sm font-semibold text-[#272727]`}
                    >
                      {selectedTech || "Select"}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={handleEditTech}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-6">
                      {techOptions.map((grade) => (
                        <label
                          key={grade}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="techAssistance"
                            value={grade}
                            checked={tempTech === grade}
                            onChange={() => setTempTech(grade)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span
                            className={`${raleway.className} text-xs font-semibold text-[#272727]`}
                          >
                            {grade}
                          </span>
                        </label>
                      ))}
                    </div>

                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveTech}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelTech}
                    />
                  </div>
                )}
              </div>

              <div className={`flex flex-row gap-20.25`}>
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  Alignment Philosophy
                </label>

                {!isEditingAlignment ? (
                  <div className="flex items-center gap-2">
                    <span
                      className={`${raleway.className} text-sm font-semibold text-[#272727]`}
                    >
                      {selectedAlignment || "Select"}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={handleEditAlignment}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-6">
                      {alignmentOptions.map((grade) => (
                        <label
                          key={grade}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="alignmentPhilosophy"
                            value={grade}
                            checked={tempAlignment === grade}
                            onChange={() => setTempAlignment(grade)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span
                            className={`${raleway.className} text-xs font-semibold text-[#272727]`}
                          >
                            {grade}
                          </span>
                        </label>
                      ))}
                    </div>

                    <ClipboardDocumentCheckIcon
                      className="w-5 h-5 text-green-600 cursor-pointer"
                      onClick={handleSaveAlignment}
                    />
                    <XMarkIcon
                      className="w-5 h-5 text-red-600 cursor-pointer"
                      onClick={handleCancelAlignment}
                    />
                  </div>
                )}
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
                <div className={`space-y-6 flex flex-col pl-8`}>
                  {!isEditingTorque ? (
                    <div className="flex items-center gap-2">
                      <span
                        className={`${raleway.className} text-sm font-semibold text-[#272727]`}
                      >
                        {selectedTorque || "Select"}
                      </span>
                      <PencilIcon
                        className="w-5 h-5 text-gray-600 cursor-pointer"
                        onClick={handleEditTorque}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      {options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="torqueUsed"
                            value={option}
                            checked={tempTorque === option}
                            onChange={() => setTempTorque(option)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span
                            className={`${raleway.className} text-xs font-semibold text-[#272727]`}
                          >
                            {option}
                          </span>
                        </label>
                      ))}

                      <ClipboardDocumentCheckIcon
                        className="w-5 h-5 text-green-600 cursor-pointer"
                        onClick={handleSaveTorque}
                      />
                      <XMarkIcon
                        className="w-5 h-5 text-red-600 cursor-pointer"
                        onClick={handleCancelTorque}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className={`flex flex-col gap-4`}>
                <label
                  className={`${inter.className} text-base font-semibold text-[#484848]`}
                >
                  2. Operative Date and Duration
                </label>
                <div className="space-x-12 flex flex-row">
                  <div className="relative w-52">
                    <p
                      className={`${poppins.className} font-medium text-black text-sm px-4 py-2`}
                    >
                      {timeDate ? timeDate : "Select Date"}
                    </p>
                    <Image
                      src={Calendar}
                      alt="Calendar"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                    />
                  </div>

                  <div className="relative w-52 flex items-center gap-2">
                    {!isEditingTime ? (
                      <div className="flex items-center justify-between w-full px-2 py-2 rounded bg-white">
                        <span
                          className={`${poppins.className} font-medium text-sm text-black`}
                        >
                          {timeValue || "HH:MM"}
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={handleEditTime}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center w-full gap-2">
                        <div className="relative w-full">
                          <input
                            type="text"
                            placeholder="HH:MM"
                            value={tempTimeValue}
                            maxLength={5} // 2 digits + ":" + 2 digits
                            onChange={(e) => {
                              let val = e.target.value.replace(/\D/g, ""); // remove non-digits
                              if (val.length >= 3) {
                                val = val.slice(0, 2) + ":" + val.slice(2, 4);
                              }

                              setTempTimeValue(val); // update your existing temp state
                            }}
                            className={`${poppins.className} font-medium border border-gray-300 rounded px-4 py-2 pr-10 w-full text-sm text-black`}
                          />
                          <Image
                            src={Clock}
                            alt="Clock"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                          />
                        </div>
                        <ClipboardDocumentCheckIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={handleSaveTime}
                        />
                        <XMarkIcon
                          className="w-5 h-5 text-red-600 cursor-pointer"
                          onClick={handleCancelTime}
                        />
                      </div>
                    )}
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
                <div className={`flex flex-col pl-8 space-y-2`}>
                  {!isEditingTorqued ? (
                    <div className="flex items-center justify-between w-52 px-2 py-2 rounded  bg-white">
                      <span
                        className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                      >
                        {selectedTorqued || "Select"}
                      </span>
                      <PencilIcon
                        className="w-5 h-5 text-gray-600 cursor-pointer"
                        onClick={handleEditTorqued}
                      />
                    </div>
                  ) : (
                    <div className={`flex flex-col items-start gap-4`}>
                      <div className="space-y-4 flex flex-col">
                        {torquedOptions.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="torquedStructure"
                              value={option}
                              checked={tempTorqued === option}
                              onChange={() => setTempTorqued(option)}
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span
                              className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                      <div className="flex flex-row justify-start gap-4">
                        <ClipboardDocumentCheckIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={handleSaveTorqued}
                        />
                        <XMarkIcon
                          className="w-5 h-5 text-red-600 cursor-pointer"
                          onClick={handleCancelTorqued}
                        />
                      </div>
                    </div>
                  )}
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
                  Target Thickness: 8mm Unworn, 6mm Worn (No Cartilage) When
                  initial thickness misses target – recut or use a washer
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
                    <div className={`flex flex-row gap-8 w-full`}>
                      <Image
                        src={MedialCondyle}
                        alt="Bone Left"
                        className="w-[123px] h-[176px] pt-2"
                      />
                      <div className="w-full flex flex-col gap-4 py-4">
                        {/* 1. Unworn / Worn */}
                        <div className="flex flex-row gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Unworn / Worn
                          </label>
                          {!isEditingDistalMedialUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {distalMedialUnwornWorn}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingDistalMedialUnwornWorn(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn", "Worn"].map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="distalMedialUnwornWorn"
                                    value={option}
                                    checked={
                                      tempDistalMedialUnwornWorn === option
                                    }
                                    onChange={(e) =>
                                      setTempDistalMedialUnwornWorn(
                                        e.target.value
                                      )
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className="text-xs text-[#272727]">
                                    {option}
                                  </span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={() => {
                                  setDistalMedialUnwornWorn(
                                    tempDistalMedialUnwornWorn
                                  );
                                  handleSaveDistalMedialUnwornWorn();
                                  setIsEditingDistalMedialUnwornWorn(false);
                                }}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setTempDistalMedialUnwornWorn(
                                    distalMedialUnwornWorn
                                  );
                                  setIsEditingDistalMedialUnwornWorn(false);
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Initial Thickness
                          </label>
                          {!isEditingDistalMedialInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {distalMedialInitialThickness}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingDistalMedialInitialThickness(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={
                                  tempDistalMedialInitialThickness || "0 mm"
                                }
                                onChange={(e) => {
                                  setTempDistalMedialInitialThickness(
                                    e.target.value
                                  );
                                }}
                              >
                                {Array.from({ length: 32 }, (_, i) => {
                                  const value = (i * 0.5).toFixed(1);
                                  const label = `${value} mm`;
                                  return (
                                    <option key={value} value={label}>
                                      {label}
                                    </option>
                                  );
                                })}
                              </select>

                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={() => {
                                  setDistalMedialInitialThickness(
                                    tempDistalMedialInitialThickness
                                  );
                                  setIsEditingDistalMedialInitialThickness(
                                    false
                                  );
                                  handleSaveDistalMedialInitialThickness();
                                }}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setTempDistalMedialInitialThickness(
                                    distalMedialInitialThickness
                                  );
                                  setIsEditingDistalMedialInitialThickness(
                                    false
                                  );
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Recut
                          </label>
                          {/* Distal Medial Recut Block */}
                          <div className="flex items-center w-1/2 gap-4">
                            {/* Radio (Y/N) */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalMedialRecutYN ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalMedialRecutYN}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalMedialRecutYN(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="distalMedialRecutYN"
                                      value="N"
                                      checked={tempDistalMedialRecutYN === "N"}
                                      onChange={(e) =>
                                        setTempDistalMedialRecutYN(
                                          e.target.value
                                        )
                                      }
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className="text-xs text-[#272727]">
                                      N
                                    </span>
                                  </label>

                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="distalMedialRecutYN"
                                      value="Y"
                                      checked={tempDistalMedialRecutYN === "Y"}
                                      onChange={(e) =>
                                        setTempDistalMedialRecutYN(
                                          e.target.value
                                        )
                                      }
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className="text-xs text-[#272727]">
                                      Y
                                    </span>
                                  </label>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalMedialRecutYN}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalMedialRecutYN}
                                  />
                                </>
                              )}
                            </div>

                            {/* MM Input */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalMedialRecutMM ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalMedialRecutMM}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalMedialRecutMM(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <select
                                    className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                    value={tempDistalMedialRecutMM || "0 mm"}
                                    onChange={(e) => {
                                      setTempDistalMedialRecutMM(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {Array.from({ length: 32 }, (_, i) => {
                                      const value = (i * 0.5).toFixed(1);
                                      const label = `${value} mm`;
                                      return (
                                        <option key={value} value={label}>
                                          {label}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalMedialRecutMM}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalMedialRecutMM}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 4. Washer */}
                        <div className="flex flex-row gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Washer
                          </label>
                          {/* Distal Medial Recut Block */}
                          <div className="flex items-center w-1/2 gap-4">
                            {/* Radio (Y/N) */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalMedialWasherYN ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalMedialWasherYN}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalMedialWasherYN(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="distalMedialWasherYN"
                                      value="N"
                                      checked={tempDistalMedialWasherYN === "N"}
                                      onChange={(e) =>
                                        setTempDistalMedialWasherYN(
                                          e.target.value
                                        )
                                      }
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className="text-xs text-[#272727]">
                                      N
                                    </span>
                                  </label>

                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="distalMedialWasherYN"
                                      value="Y"
                                      checked={tempDistalMedialWasherYN === "Y"}
                                      onChange={(e) =>
                                        setTempDistalMedialWasherYN(
                                          e.target.value
                                        )
                                      }
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className="text-xs text-[#272727]">
                                      Y
                                    </span>
                                  </label>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalMedialWasherYN}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalMedialWasherYN}
                                  />
                                </>
                              )}
                            </div>

                            {/* MM Input */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalMedialWasherMM ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalMedialWasherMM}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalMedialWasherMM(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <select
                                    className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                    value={tempDistalMedialWasherMM || "0 mm"}
                                    onChange={(e) => {
                                      setTempDistalMedialWasherMM(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {Array.from({ length: 32 }, (_, i) => {
                                      const value = (i * 0.5).toFixed(1);
                                      const label = `${value} mm`;
                                      return (
                                        <option key={value} value={label}>
                                          {label}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalMedialWasherMM}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalMedialWasherMM}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 5. Final Thickness */}
                        <div className="flex flex-row gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Final Thickness
                          </label>
                          {!isEditingDistalMedialFinalThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {distalMedialFinalThickness}{" "}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingDistalMedialFinalThickness(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={tempDistalMedialFinalThickness || "0 mm"}
                                onChange={(e) => {
                                  setTempDistalMedialFinalThickness(
                                    e.target.value
                                  );
                                }}
                              >
                                {Array.from({ length: 32 }, (_, i) => {
                                  const value = (i * 0.5).toFixed(1);
                                  const label = `${value} mm`;
                                  return (
                                    <option key={value} value={label}>
                                      {label}
                                    </option>
                                  );
                                })}
                              </select>

                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={() => {
                                  setDistalMedialFinalThickness(
                                    tempDistalMedialFinalThickness
                                  );
                                  setIsEditingDistalMedialFinalThickness(false);
                                  handleSaveDistalMedialFinalThickness();
                                }}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setTempDistalMedialFinalThickness(
                                    distalMedialFinalThickness
                                  );
                                  setIsEditingDistalMedialFinalThickness(false);
                                }}
                              />
                            </div>
                          )}
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
                      <div className="w-full flex flex-col gap-4 py-4">
                        {/* 1. Unworn / Worn */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Unworn / Worn
                          </label>
                          {!isEditingDistalLateralUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {distalLateralUnwornWorn}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={editDistalLateralUnwornWorn}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn", "Worn"].map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="distalLateralUnwornWorn"
                                    value={option}
                                    checked={
                                      tempDistalLateralUnwornWorn === option
                                    }
                                    onChange={(e) =>
                                      setTempDistalLateralUnwornWorn(
                                        e.target.value
                                      )
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className="text-sm text-[#272727]">
                                    {option}
                                  </span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={saveDistalLateralUnwornWorn}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={cancelDistalLateralUnwornWorn}
                              />
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Initial Thickness
                          </label>
                          {!isEditingDistalLateralInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {distalLateralInitialThickness}{" "}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={editDistalLateralInitialThickness}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={
                                  tempDistalLateralInitialThickness || "0 mm"
                                }
                                onChange={(e) => {
                                  setTempDistalLateralInitialThickness(
                                    e.target.value
                                  );
                                }}
                              >
                                {Array.from({ length: 32 }, (_, i) => {
                                  const value = (i * 0.5).toFixed(1);
                                  const label = `${value} mm`;
                                  return (
                                    <option key={value} value={label}>
                                      {label}
                                    </option>
                                  );
                                })}
                              </select>

                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={saveDistalLateralInitialThickness}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={cancelDistalLateralInitialThickness}
                              />
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Recut
                          </label>
                          <div className="flex items-center w-1/2 gap-4">
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralRecutYN ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalLateralRecutYN}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalLateralRecutYN(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  {["N", "Y"].map((option) => (
                                    <label
                                      key={option}
                                      className="flex items-center gap-1 cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        name="distalLateralRecutYN"
                                        value={option}
                                        checked={
                                          tempDistalLateralRecutYN === option
                                        }
                                        onChange={(e) =>
                                          setTempDistalLateralRecutYN(
                                            e.target.value
                                          )
                                        }
                                        className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                      />
                                      <span className="text-xs text-[#272727]">
                                        {option}
                                      </span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalLateralRecutYN}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalLateralRecutYN}
                                  />
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralRecutMM ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalLateralRecutMM}{" "}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalLateralRecutMM(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <select
                                    className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                    value={tempDistalLateralRecutMM || "0 mm"}
                                    onChange={(e) => {
                                      setTempDistalLateralRecutMM(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {Array.from({ length: 32 }, (_, i) => {
                                      const value = (i * 0.5).toFixed(1);
                                      const label = `${value} mm`;
                                      return (
                                        <option key={value} value={label}>
                                          {label}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalLateralRecutMM}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalLateralRecutMM}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 4. Washer */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Washer
                          </label>

                          <div className="flex items-center w-1/2 gap-4">
                            {/* Y/N */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralWasherYN ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalLateralWasherYN}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalLateralWasherYN(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  {["N", "Y"].map((option) => (
                                    <label
                                      key={option}
                                      className="flex items-center gap-1 cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        name="distalLateralWasherYN"
                                        value={option}
                                        checked={
                                          tempDistalLateralWasherYN === option
                                        }
                                        onChange={(e) =>
                                          setTempDistalLateralWasherYN(
                                            e.target.value
                                          )
                                        }
                                        className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                      />
                                      <span className="text-xs text-[#272727]">
                                        {option}
                                      </span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalLateralWasherYN}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalLateralWasherYN}
                                  />
                                </>
                              )}
                            </div>

                            {/* MM Input */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralWasherMM ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {distalLateralWasherMM}{" "}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingDistalLateralWasherMM(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <select
                                    className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                    value={tempDistalLateralWasherMM || "0 mm"}
                                    onChange={(e) => {
                                      setTempDistalLateralWasherMM(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {Array.from({ length: 32 }, (_, i) => {
                                      const value = (i * 0.5).toFixed(1);
                                      const label = `${value} mm`;
                                      return (
                                        <option key={value} value={label}>
                                          {label}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={saveDistalLateralWasherMM}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelDistalLateralWasherMM}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 5. Final Thickness */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Final Thickness
                          </label>
                          {!isEditingDistalLateralFinalThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {distalLateralFinalThickness}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={editDistalLateralFinalThickness}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={
                                  tempDistalLateralFinalThickness || "0 mm"
                                }
                                onChange={(e) => {
                                  setTempDistalLateralFinalThickness(
                                    e.target.value
                                  );
                                }}
                              >
                                {Array.from({ length: 32 }, (_, i) => {
                                  const value = (i * 0.5).toFixed(1);
                                  const label = `${value} mm`;
                                  return (
                                    <option key={value} value={label}>
                                      {label}
                                    </option>
                                  );
                                })}
                              </select>

                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={saveDistalLateralFinalThickness}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={cancelDistalLateralFinalThickness}
                              />
                            </div>
                          )}
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
                  Target Thickness: 7mm Unworn, 5mm Worn (No Cartilage) When
                  initial thickness misses target – recut
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
                    <div className={`flex flex-row gap-8 w-full`}>
                      <Image
                        src={MedialCondyle}
                        alt="Bone Left"
                        className="w-[123px] h-[176px] pt-2"
                      />
                      <div className="w-full flex flex-col gap-4 justify-between py-4">
                        {/* 1. Unworn / Worn */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Unworn / Worn
                          </label>
                          {!isEditingPostMedUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {postMedUnwornWorn}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingPostMedUnwornWorn(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn", "Worn"].map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="postMedUnwornWorn"
                                    value={option}
                                    checked={tempPostMedUnwornWorn === option}
                                    onChange={(e) =>
                                      setTempPostMedUnwornWorn(e.target.value)
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className="text-xs text-[#272727]">
                                    {option}
                                  </span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={savePostMedUnwornWorn}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={cancelPostMedUnwornWorn}
                              />
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Initial Thickness
                          </label>
                          {!isEditingPostMedInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {postMedInitialThickness}{" "}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingPostMedInitialThickness(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={tempPostMedInitialThickness || "0 mm"}
                                onChange={(e) => {
                                  setTempPostMedInitialThickness(
                                    e.target.value
                                  );
                                }}
                              >
                                {Array.from({ length: 32 }, (_, i) => {
                                  const value = (i * 0.5).toFixed(1);
                                  const label = `${value} mm`;
                                  return (
                                    <option key={value} value={label}>
                                      {label}
                                    </option>
                                  );
                                })}
                              </select>

                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={savePostMedInitialThickness}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={cancelPostMedInitialThickness}
                              />
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Recut
                          </label>
                          <div className="flex items-center w-1/2 gap-4">
                            {/* Y/N */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostMedRecutYN ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {postMedRecutYN}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingPostMedRecutYN(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  {["N", "Y"].map((option) => (
                                    <label
                                      key={option}
                                      className="flex items-center gap-1 cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        value={option}
                                        checked={tempPostMedRecutYN === option}
                                        onChange={(e) =>
                                          setTempPostMedRecutYN(e.target.value)
                                        }
                                        className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                      />
                                      <span className="text-xs text-[#272727]">
                                        {option}
                                      </span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={savePostMedRecutYN}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelPostMedRecutYN}
                                  />
                                </>
                              )}
                            </div>

                            {/* MM */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostMedRecutMM ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {postMedRecutMM}{" "}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingPostMedRecutMM(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <select
                                    className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                    value={tempPostMedRecutMM || "0 mm"}
                                    onChange={(e) => {
                                      setTempPostMedRecutMM(e.target.value);
                                    }}
                                  >
                                    {Array.from({ length: 32 }, (_, i) => {
                                      const value = (i * 0.5).toFixed(1);
                                      const label = `${value} mm`;
                                      return (
                                        <option key={value} value={label}>
                                          {label}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={savePostMedRecutMM}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelPostMedRecutMM}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 4. Final Thickness */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Final Thickness
                          </label>
                          <div className="flex items-center w-1/2 justify-between gap-4">
                            {!isEditingPostMedFinalThickness ? (
                              <>
                                <span
                                  className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {postMedFinalThickness}{" "}
                                </span>
                                <PencilIcon
                                  className="w-5 h-5 text-gray-600 cursor-pointer"
                                  onClick={() =>
                                    setIsEditingPostMedFinalThickness(true)
                                  }
                                />
                              </>
                            ) : (
                              <div className="flex items-center w-full gap-2">
                                <select
                                  className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                  value={tempPostMedFinalThickness || "0 mm"}
                                  onChange={(e) => {
                                    setTempPostMedFinalThickness(
                                      e.target.value
                                    );
                                  }}
                                >
                                  {Array.from({ length: 32 }, (_, i) => {
                                    const value = (i * 0.5).toFixed(1);
                                    const label = `${value} mm`;
                                    return (
                                      <option key={value} value={label}>
                                        {label}
                                      </option>
                                    );
                                  })}
                                </select>

                                <ClipboardDocumentCheckIcon
                                  className="w-5 h-5 text-green-600 cursor-pointer"
                                  onClick={savePostMedFinalThickness}
                                />
                                <XMarkIcon
                                  className="w-5 h-5 text-red-600 cursor-pointer"
                                  onClick={cancelPostMedFinalThickness}
                                />
                              </div>
                            )}
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
                      <div className="w-full flex flex-col gap-4 justify-between py-4">
                        {/* 1. Unworn / Worn */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Unworn / Worn
                          </label>
                          {!isEditingPostLatUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {postLatUnwornWorn}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingPostLatUnwornWorn(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn", "Worn"].map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="postLatUnwornWorn"
                                    value={option}
                                    checked={tempPostLatUnwornWorn === option}
                                    onChange={(e) =>
                                      setTempPostLatUnwornWorn(e.target.value)
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className="text-xs text-[#272727]">
                                    {option}
                                  </span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={savePostLatUnwornWorn}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={cancelPostLatUnwornWorn}
                              />
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Initial Thickness
                          </label>
                          {!isEditingPostLatInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {postLatInitialThickness}{" "}
                              </span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingPostLatInitialThickness(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={tempPostLatInitialThickness || "0 mm"}
                                onChange={(e) => {
                                  setTempPostLatInitialThickness(
                                    e.target.value
                                  );
                                }}
                              >
                                {Array.from({ length: 32 }, (_, i) => {
                                  const value = (i * 0.5).toFixed(1);
                                  const label = `${value} mm`;
                                  return (
                                    <option key={value} value={label}>
                                      {label}
                                    </option>
                                  );
                                })}
                              </select>

                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={savePostLatInitialThickness}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={cancelPostLatInitialThickness}
                              />
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Recut
                          </label>
                          <div className="flex items-center w-1/2 gap-4">
                            {/* Y/N */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostLatRecutYN ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {postLatRecutYN}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingPostLatRecutYN(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  {["N", "Y"].map((option) => (
                                    <label
                                      key={option}
                                      className="flex items-center gap-1 cursor-pointer"
                                    >
                                      <input
                                        type="radio"
                                        value={option}
                                        checked={tempPostLatRecutYN === option}
                                        onChange={(e) =>
                                          setTempPostLatRecutYN(e.target.value)
                                        }
                                        className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                      />
                                      <span className="text-xs text-[#272727]">
                                        {option}
                                      </span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={savePostLatRecutYN}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelPostLatRecutYN}
                                  />
                                </>
                              )}
                            </div>

                            {/* MM */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostLatRecutMM ? (
                                <>
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {postLatRecutMM}{" "}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      setIsEditingPostLatRecutMM(true)
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <select
                                    className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                    value={tempPostLatRecutMM || "0 mm"}
                                    onChange={(e) => {
                                      setTempPostLatRecutMM(e.target.value);
                                    }}
                                  >
                                    {Array.from({ length: 32 }, (_, i) => {
                                      const value = (i * 0.5).toFixed(1);
                                      const label = `${value} mm`;
                                      return (
                                        <option key={value} value={label}>
                                          {label}
                                        </option>
                                      );
                                    })}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-4 h-4 text-green-600 cursor-pointer"
                                    onClick={savePostLatRecutMM}
                                  />
                                  <XMarkIcon
                                    className="w-4 h-4 text-red-600 cursor-pointer"
                                    onClick={cancelPostLatRecutMM}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 4. Final Thickness */}
                        <div className="flex flex-row gap-4">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                          >
                            Final Thickness
                          </label>
                          <div className="flex items-center w-1/2 justify-between gap-4">
                            {!isEditingPostLatFinalThickness ? (
                              <>
                                <span
                                  className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                >
                                  {postLatFinalThickness}{" "}
                                </span>
                                <PencilIcon
                                  className="w-5 h-5 text-gray-600 cursor-pointer"
                                  onClick={() =>
                                    setIsEditingPostLatFinalThickness(true)
                                  }
                                />
                              </>
                            ) : (
                              <div className="flex items-center w-full gap-2">
                                <select
                                  className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                  value={tempPostLatFinalThickness || "0 mm"}
                                  onChange={(e) => {
                                    setTempPostLatFinalThickness(
                                      e.target.value
                                    );
                                  }}
                                >
                                  {Array.from({ length: 32 }, (_, i) => {
                                    const value = (i * 0.5).toFixed(1);
                                    const label = `${value} mm`;
                                    return (
                                      <option key={value} value={label}>
                                        {label}
                                      </option>
                                    );
                                  })}
                                </select>

                                <ClipboardDocumentCheckIcon
                                  className="w-5 h-5 text-green-600 cursor-pointer"
                                  onClick={savePostLatFinalThickness}
                                />
                                <XMarkIcon
                                  className="w-5 h-5 text-red-600 cursor-pointer"
                                  onClick={cancelPostLatFinalThickness}
                                />
                              </div>
                            )}
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
                    <div className={`w-full flex flex-row `}>
                      <div
                        className={`w-1/7 h-full flex flex-col justify-between`}
                      >
                        {/* 1. Worn / Unworn */}
                        <div className={`space-y-6 flex flex-col`}>
                          {!isEditingTibialLeftWorn ? (
                            <div className="flex flex-col gap-2">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialLeftWorn}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingTibialLeftWorn(true)}
                              />
                            </div>
                          ) : (
                            ["Worn", "UnWorn"].map((grade) => {
                              const id = `tibialleftworn-${grade}`;
                              return (
                                <label
                                  key={id}
                                  htmlFor={id}
                                  className="flex items-center space-x-4 cursor-pointer"
                                >
                                  <input
                                    id={id}
                                    type="radio"
                                    name="tibialLeftWorn"
                                    value={grade}
                                    checked={tempTibialLeftWorn === grade}
                                    onChange={(e) =>
                                      setTempTibialLeftWorn(e.target.value)
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span
                                    className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {grade}
                                  </span>
                                </label>
                              );
                            })
                          )}
                          {isEditingTibialLeftWorn && (
                            <div className="flex gap-2 mt-1">
                              <ClipboardDocumentCheckIcon
                                className="w-4 h-4 text-green-600 cursor-pointer"
                                onClick={saveTibialLeftWorn}
                              />
                              <XMarkIcon
                                className="w-4 h-4 text-red-600 cursor-pointer"
                                onClick={cancelTibialLeftWorn}
                              />
                            </div>
                          )}
                        </div>

                        {/* 2. Thickness MM */}
                        <div className={`flex flex-row gap-1 items-center`}>
                          {!isEditingTibialLeftMM ? (
                            <div className="flex items-center gap-1">
                              <label
                                className={`${raleway.className} font-semibold text-sm text-[#484848]`}
                              ></label>
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialLeftMM}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingTibialLeftMM(true)}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3">
                              <div className={`flex flex-row gap-2`}>
                                <label
                                  className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                                ></label>
                                <select
                                  className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                  value={tempTibialLeftMM || "0 mm"}
                                  onChange={(e) => {
                                    setTempTibialLeftMM(e.target.value);
                                  }}
                                >
                                  {Array.from({ length: 32 }, (_, i) => {
                                    const value = (i * 0.5).toFixed(1);
                                    const label = `${value} mm`;
                                    return (
                                      <option key={value} value={label}>
                                        {label}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className={`flex flex-row gap-3`}>
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={saveTibialLeftMM}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={cancelTibialLeftMM}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={`w-5/7 flex items-center justify-center`}>
                        <Image
                          src={Tibia}
                          alt="Bone Left"
                          className="w-6/7 pt-3"
                        />
                      </div>

                      <div
                        className={`w-1/7 h-full flex flex-col justify-between`}
                      >
                        {/* 1. Worn / Unworn */}
                        <div className={`space-y-6 flex flex-col`}>
                          {!isEditingTibialRightWorn ? (
                            <div className="flex flex-col gap-2">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialRightWorn}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingTibialRightWorn(true)
                                }
                              />
                            </div>
                          ) : (
                            ["Worn", "UnWorn"].map((grade) => {
                              const id = `tibialrightworn-${grade}`;
                              return (
                                <label
                                  key={id}
                                  htmlFor={id}
                                  className="flex items-center space-x-4 cursor-pointer"
                                >
                                  <input
                                    id={id}
                                    type="radio"
                                    name="tibialRightWorn"
                                    value={grade}
                                    checked={tempTibialRightWorn === grade}
                                    onChange={(e) =>
                                      setTempTibialRightWorn(e.target.value)
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span
                                    className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {grade}
                                  </span>
                                </label>
                              );
                            })
                          )}
                          {isEditingTibialRightWorn && (
                            <div className="flex gap-2 mt-1">
                              <ClipboardDocumentCheckIcon
                                className="w-4 h-4 text-green-600 cursor-pointer"
                                onClick={saveTibialRightWorn}
                              />
                              <XMarkIcon
                                className="w-4 h-4 text-red-600 cursor-pointer"
                                onClick={cancelTibialRightWorn}
                              />
                            </div>
                          )}
                        </div>

                        {/* 2. Thickness MM */}
                        <div className={`flex flex-row gap-1 items-center`}>
                          {!isEditingTibialRightMM ? (
                            <div className="flex items-center gap-1">
                              <label
                                className={`${raleway.className} font-semibold text-sm text-[#484848]`}
                              ></label>
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialRightMM}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingTibialRightMM(true)}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3">
                              <div className={`flex flex-row gap-2`}>
                                <label
                                  className={`${raleway.className} font-semibold text-sm text-[#484848]`}
                                ></label>

                                <select
                                  className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                  value={tempTibialRightMM || "0 mm"}
                                  onChange={(e) => {
                                    setTempTibialRightMM(e.target.value);
                                  }}
                                >
                                  {Array.from({ length: 32 }, (_, i) => {
                                    const value = (i * 0.5).toFixed(1);
                                    const label = `${value} mm`;
                                    return (
                                      <option key={value} value={label}>
                                        {label}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className={`flex flex-row gap-3`}>
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={saveTibialRightMM}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={cancelTibialRightMM}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`flex flex-col gap-4`}>
                      <label
                        className={`${inter.className} text-base font-semibold text-[#484848]`}
                      >
                        PCL Condition
                      </label>
                      <div className={`space-x-6 flex flex-row items-center`}>
                        {!isEditingPclCondition ? (
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {pclCondition}
                            </span>
                            <PencilIcon
                              className="w-4 h-4 text-gray-600 cursor-pointer"
                              onClick={() => setIsEditingPclCondition(true)}
                            />
                          </div>
                        ) : (
                          <>
                            {["Intact", "Torn", "Excised"].map((grade) => {
                              const id = `pclcondition-${grade}`;
                              return (
                                <label
                                  key={id}
                                  htmlFor={id}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    id={id}
                                    type="radio"
                                    name="pclCondition"
                                    value={grade}
                                    checked={tempPclCondition === grade}
                                    onChange={(e) =>
                                      setTempPclCondition(e.target.value)
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span
                                    className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                  >
                                    {grade}
                                  </span>
                                </label>
                              );
                            })}
                            <div className="flex gap-2 mt-1">
                              <ClipboardDocumentCheckIcon
                                className="w-4 h-4 text-green-600 cursor-pointer"
                                onClick={savePclCondition}
                              />
                              <XMarkIcon
                                className="w-4 h-4 text-red-600 cursor-pointer"
                                onClick={cancelPclCondition}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`w-1/2 flex flex-col`}>
                    <div className={`flex flex-col gap-8`}>
                      <div
                        className={`flex flex-row gap-12 items-center pl-20`}
                      >
                        <label
                          className={`${inter.className} text-base font-semibold text-[#484848]`}
                        >
                          Tibial V-V Recut
                        </label>

                        {/* Y/N */}
                        <div className={`space-x-3 flex flex-row pl-3.5`}>
                          {!isEditingTibialVVRecutYN ? (
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialVVRecutYN}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingTibialVVRecutYN(true)
                                }
                              />
                            </div>
                          ) : (
                            <>
                              {["N", "Y"].map((grade) => {
                                const id = `tibialvvrecut-${grade}`;
                                return (
                                  <label
                                    key={id}
                                    htmlFor={id}
                                    className="flex items-center space-x-2 cursor-pointer"
                                  >
                                    <input
                                      id={id}
                                      type="radio"
                                      name="tibialVVRecutYN"
                                      value={grade}
                                      checked={tempTibialVVRecutYN === grade}
                                      onChange={(e) =>
                                        setTempTibialVVRecutYN(e.target.value)
                                      }
                                      className="w-4 h-4 appearance-none rounded-sm bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span
                                      className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                    >
                                      {grade}
                                    </span>
                                  </label>
                                );
                              })}
                              <div className="flex gap-2 mt-1">
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={saveTibialVVRecutYN}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={cancelTibialVVRecutYN}
                                />
                              </div>
                            </>
                          )}
                        </div>

                        {/* MM */}
                        <div className={`flex items-center gap-2`}>
                          {!isEditingTibialVVRecutMM ? (
                            <div className="flex items-center gap-1">
                              <label
                                className={`${raleway.className} font-semibold text-sm text-[#484848]`}
                              ></label>
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialVVRecutMM}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingTibialVVRecutMM(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2 items-center">
                              <div className="flex items-center gap-2">
                                <label
                                  className={`${raleway.className} font-semibold text-sm text-[#484848]`}
                                ></label>
                                <select
                                  className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                  value={tempTibialVVRecutMM || "0 mm"}
                                  onChange={(e) => {
                                    setTempTibialVVRecutMM(e.target.value);
                                  }}
                                >
                                  {Array.from({ length: 32 }, (_, i) => {
                                    const value = (i * 0.5).toFixed(1);
                                    const label = `${value} mm`;
                                    return (
                                      <option key={value} value={label}>
                                        {label}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={saveTibialVVRecutMM}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={cancelTibialVVRecutMM}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div
                        className={`flex flex-row gap-12 items-center pl-20`}
                      >
                        <label
                          className={`${inter.className} text-base font-semibold text-[#484848]`}
                        >
                          Tibial Slope Recut
                        </label>

                        {/* Y/N */}
                        <div className={`space-x-3 flex flex-row`}>
                          {!isEditingTibialSlopeRecutYN ? (
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialSlopeRecutYN}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingTibialSlopeRecutYN(true)
                                }
                              />
                            </div>
                          ) : (
                            <>
                              {["N", "Y"].map((grade) => {
                                const id = `tibialsloperecut-${grade}`;
                                return (
                                  <label
                                    key={id}
                                    htmlFor={id}
                                    className="flex items-center space-x-2 cursor-pointer"
                                  >
                                    <input
                                      id={id}
                                      type="radio"
                                      name="tibialSlopeRecutYN"
                                      value={grade}
                                      checked={tempTibialSlopeRecutYN === grade}
                                      onChange={(e) =>
                                        setTempTibialSlopeRecutYN(
                                          e.target.value
                                        )
                                      }
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span
                                      className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                                    >
                                      {grade}
                                    </span>
                                  </label>
                                );
                              })}
                              <div className="flex gap-2 mt-1">
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={saveTibialSlopeRecutYN}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={cancelTibialSlopeRecutYN}
                                />
                              </div>
                            </>
                          )}
                        </div>

                        {/* MM */}
                        <div className={`flex items-center gap-2`}>
                          {!isEditingTibialSlopeRecutMM ? (
                            <div className="flex items-center gap-1">
                              <label
                                className={`${raleway.className} font-semibold text-sm text-[#484848]`}
                              ></label>
                              <span
                                className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {tibialSlopeRecutMM}
                              </span>
                              <PencilIcon
                                className="w-4 h-4 text-gray-600 cursor-pointer"
                                onClick={() =>
                                  setIsEditingTibialSlopeRecutMM(true)
                                }
                              />
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2 items-center">
                              <div className="flex items-center gap-2">
                                <label
                                  className={`${raleway.className} font-semibold text-sm text-[#484848]`}
                                ></label>
                                <select
                                  className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                  value={tempTibialSlopeRecutMM || "0 mm"}
                                  onChange={(e) => {
                                    setTempTibialSlopeRecutMM(e.target.value);
                                  }}
                                >
                                  {Array.from({ length: 32 }, (_, i) => {
                                    const value = (i * 0.5).toFixed(1);
                                    const label = `${value} mm`;
                                    return (
                                      <option key={value} value={label}>
                                        {label}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={saveTibialSlopeRecutMM}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={cancelTibialSlopeRecutMM}
                                />
                              </div>
                            </div>
                          )}
                        </div>
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

                          {!isEditingFinalCheck ? (
                            <div className="flex flex-col space-y-2">
                              {selectedFinalCheck.length === 0 ? (
                                <span
                                  className={` ${raleway.className} text-sm text-[#272727] font-semibold`}
                                >
                                  None Selected
                                </span>
                              ) : (
                                <span
                                  className={` ${raleway.className} text-sm text-[#272727] font-semibold`}
                                >
                                  {selectedFinalCheck || "None Selected"}
                                </span>
                              )}
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingFinalCheck(true)}
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col space-y-2">
                              {finalCheckOptions.map((option) => (
                                <label
                                  key={option}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    name="finalCheck"
                                    value={option}
                                    checked={tempSelectedFinalCheck === option}
                                    onChange={(e) =>
                                      setTempSelectedFinalCheck(e.target.value)
                                    }
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span
                                    className={`text-sm ${raleway.className} text-[#272727] font-semibold`}
                                  >
                                    {option}
                                  </span>
                                </label>
                              ))}
                              <div className="flex gap-2 mt-2">
                                <ClipboardDocumentCheckIcon
                                  className="w-5 h-5 text-green-600 cursor-pointer"
                                  onClick={saveFinalCheck}
                                />
                                <XMarkIcon
                                  className="w-5 h-5 text-red-600 cursor-pointer"
                                  onClick={cancelFinalCheck}
                                />
                              </div>
                            </div>
                          )}
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
                            className={`px-4 py-3 bg-black/80 text-white font-bold text-[15px] text-center whitespace-nowrap
                          ${idx === 0 ? "rounded-tl-[8px]" : ""}
                          ${idx === 4 ? "rounded-tr-[8px]" : ""}`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="bg-white text-[13px]">
                      {tableData.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          {/* Insert Thickness */}
                          <td
                            className={`${
                              raleway.className
                            } text-[13px] px-4 py-2 text-center font-semibold text-black border-l-2 border-[#AAA8A8] ${
                              rowIdx === 0 ? "border-t-2" : ""
                            } ${
                              rowIdx === tableData.length - 1
                                ? "border-b-2"
                                : ""
                            }`}
                          >
                            {row.insertThickness} mm
                          </td>

                          {/* No of Ticks */}
                          <td
                            className={`px-4 py-2 text-center ${
                              raleway.className
                            } text-[13px] text-center font-semibold text-black ${
                              rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                            } ${
                              rowIdx === tableData.length - 1
                                ? "border-b-2 border-[#AAA8A8]"
                                : ""
                            }`}
                          >
                            {!row.editing.numTicks ? (
                              <div className="flex items-center justify-center gap-2">
                                <span>{row.numTicks || "0"}</span>
                                <PencilIcon
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() => startEdit(rowIdx, "numTicks")}
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <input
                                  type="number"
                                  value={row.temp.numTicks}
                                  onChange={(e) =>
                                    updateTemp(
                                      rowIdx,
                                      "numTicks",
                                      e.target.value
                                    )
                                  }
                                  className="w-16 border rounded px-2 py-1 text-center"
                                />
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={() => saveEdit(rowIdx, "numTicks")}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={() => cancelEdit(rowIdx, "numTicks")}
                                />
                              </div>
                            )}
                          </td>

                          {/* Extension EXT. ORIENT. */}
                          <td
                            className={`px-4 py-2 ${
                              raleway.className
                            } text-[13px] text-center font-semibold text-black ${
                              rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                            } ${
                              rowIdx === tableData.length - 1
                                ? "border-b-2 border-[#AAA8A8]"
                                : ""
                            }`}
                          >
                            {!row.editing.extOrient ? (
                              <div className="flex justify-center items-center gap-2">
                                <span>{row.extOrient || "—"}</span>
                                <p>Deg</p>
                                <PencilIcon
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() => startEdit(rowIdx, "extOrient")}
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <input
                                  type="text"
                                  value={row.temp.extOrient}
                                  onChange={(e) =>
                                    updateTemp(
                                      rowIdx,
                                      "extOrient",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 border rounded px-2 py-1 text-center"
                                />
                                <p>Deg</p>
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={() => saveEdit(rowIdx, "extOrient")}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={() =>
                                    cancelEdit(rowIdx, "extOrient")
                                  }
                                />
                              </div>
                            )}
                          </td>

                          {/* 90° Flexion INT. ORIENT. */}
                          <td
                            className={`px-4 py-2 ${
                              raleway.className
                            } text-[13px] text-center font-semibold text-black ${
                              rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                            } ${
                              rowIdx === tableData.length - 1
                                ? "border-b-2 border-[#AAA8A8]"
                                : ""
                            }`}
                          >
                            {!row.editing.flex90Orient ? (
                              <div className="flex justify-center items-center gap-2">
                                <span>{row.flex90Orient || "—"}</span>
                                <p>Deg</p>
                                <PencilIcon
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() =>
                                    startEdit(rowIdx, "flex90Orient")
                                  }
                                />
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <input
                                  type="text"
                                  value={row.temp.flex90Orient}
                                  onChange={(e) =>
                                    updateTemp(
                                      rowIdx,
                                      "flex90Orient",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 border rounded px-2 py-1 text-center"
                                />
                                <p>Deg</p>
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={() =>
                                    saveEdit(rowIdx, "flex90Orient")
                                  }
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={() =>
                                    cancelEdit(rowIdx, "flex90Orient")
                                  }
                                />
                              </div>
                            )}
                          </td>

                          {/* Lift-Off Y/N */}
                          <td
                            className={`border-r-2 border-[#AAA8A8] px-4 py-2 text-center ${
                              raleway.className
                            } text-[13px] text-center font-semibold text-black ${
                              rowIdx === 0 ? "border-t-2" : ""
                            } ${
                              rowIdx === tableData.length - 1
                                ? "border-b-2"
                                : ""
                            }`}
                          >
                            {!row.editing.liftOff ? (
                              <div className="flex justify-center items-center gap-2">
                                <span>{row.liftOff || "—"}</span>
                                <PencilIcon
                                  className="w-4 h-4 cursor-pointer"
                                  onClick={() => startEdit(rowIdx, "liftOff")}
                                />
                              </div>
                            ) : (
                              <div className="flex justify-center items-center gap-3">
                                {["N", "Y"].map((option) => (
                                  <label
                                    key={option}
                                    className="flex items-center gap-1 cursor-pointer"
                                  >
                                    <input
                                      type="radio"
                                      name={`liftOff-${rowIdx}`}
                                      value={option}
                                      checked={row.temp.liftOff === option}
                                      onChange={(e) =>
                                        updateTemp(
                                          rowIdx,
                                          "liftOff",
                                          e.target.value
                                        )
                                      }
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className="text-xs text-[#272727] font-semibold">
                                      {option}
                                    </span>
                                  </label>
                                ))}
                                <ClipboardDocumentCheckIcon
                                  className="w-4 h-4 text-green-600 cursor-pointer"
                                  onClick={() => saveEdit(rowIdx, "liftOff")}
                                />
                                <XMarkIcon
                                  className="w-4 h-4 text-red-600 cursor-pointer"
                                  onClick={() => cancelEdit(rowIdx, "liftOff")}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className={`w-full flex flex-col pt-10`}>
                <div className={`flex flex-col gap-8`}>
                  <div className="flex flex-col gap-6">
                    <label
                      className={`${inter.className} text-base font-extrabold text-[#484848]`}
                    >
                      PFJ Resurfacing
                    </label>

                    {!isEditingPFJResurf ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm text-[#272727] ${raleway.className} font-semibold`}
                        >
                          {pfjResurf || "—"}
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => setIsEditingPFJResurf(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        {["N", "Y"].map((option) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="pfjResurf"
                              value={option}
                              checked={tempPFJResurf === option}
                              onChange={(e) => setTempPFJResurf(e.target.value)}
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span
                              className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {option}
                            </span>
                          </label>
                        ))}

                        <ClipboardDocumentCheckIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={savePFJResurf}
                        />
                        <XMarkIcon
                          className="w-5 h-5 text-red-600 cursor-pointer"
                          onClick={cancelPFJResurf}
                        />
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-row gap-28 items-center`}>
                    <label
                      className={`${inter.className} text-base font-extrabold text-[#484848]`}
                    >
                      Trachela Resection
                    </label>

                    {!isEditingTrachelaResection ? (
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 rounded w-40  text-black text-sm">
                          {trachelaResection}
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => setIsEditingTrachelaResection(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <select
                          className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                          value={tempTrachelaResection || "0 mm"}
                          onChange={(e) => {
                            setTempTrachelaResection(e.target.value);
                          }}
                        >
                          {Array.from({ length: 32 }, (_, i) => {
                            const value = (i * 0.5).toFixed(1);
                            const label = `${value} mm`;
                            return (
                              <option key={value} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </select>

                        <ClipboardDocumentCheckIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={saveTrachelaResection}
                        />
                        <XMarkIcon
                          className="w-5 h-5 text-red-600 cursor-pointer"
                          onClick={cancelTrachelaResection}
                        />
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-col gap-6`}>
                    <label
                      className={`${inter.className} text-base font-extrabold text-[#484848]`}
                    >
                      Patella
                    </label>

                    {!isEditingPatella ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                        >
                          {patella}
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => setIsEditingPatella(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        {["Worn", "UnWorn"].map((grade) => (
                          <label
                            key={grade}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="patella"
                              value={grade}
                              checked={tempPatella === grade}
                              onChange={(e) => setTempPatella(e.target.value)}
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span
                              className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                            >
                              {grade}
                            </span>
                          </label>
                        ))}
                        <ClipboardDocumentCheckIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={savePatella}
                        />
                        <XMarkIcon
                          className="w-5 h-5 text-red-600 cursor-pointer"
                          onClick={cancelPatella}
                        />
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-row gap-[49px] items-center`}>
                    <label
                      className={`${inter.className} text-base font-extrabold text-[#484848]`}
                    >
                      Pre Resurfacing Thickness
                    </label>

                    {!isEditingPreResurfacing ? (
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 rounded w-40  text-[black] text-sm">
                          {preResurfacingThickness || "—"} mm
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => setIsEditingPreResurfacing(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <select
                          className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                          value={tempPreResurfacingThickness || "0 mm"}
                          onChange={(e) => {
                            setTempPreResurfacingThickness(e.target.value);
                          }}
                        >
                          {Array.from({ length: 32 }, (_, i) => {
                            const value = (i * 0.5).toFixed(1);
                            const label = `${value} mm`;
                            return (
                              <option key={value} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </select>

                        <ClipboardDocumentCheckIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={savePreResurfacing}
                        />
                        <XMarkIcon
                          className="w-5 h-5 text-red-600 cursor-pointer"
                          onClick={cancelPreResurfacing}
                        />
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-row gap-10 items-center`}>
                    <label
                      className={`${inter.className} text-base font-extrabold text-[#484848]`}
                    >
                      Post Resurfacing Thickness
                    </label>

                    {!isEditingPostResurfacing ? (
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 rounded w-40  text-[black] text-sm">
                          {postResurfacingThickness || "—"} mm
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => setIsEditingPostResurfacing(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <select
                          className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                          value={tempPostResurfacingThickness || "0 mm"}
                          onChange={(e) => {
                            setTempPostResurfacingThickness(e.target.value);
                          }}
                        >
                          {Array.from({ length: 32 }, (_, i) => {
                            const value = (i * 0.5).toFixed(1);
                            const label = `${value} mm`;
                            return (
                              <option key={value} value={label}>
                                {label}
                              </option>
                            );
                          })}
                        </select>

                        <ClipboardDocumentCheckIcon
                          className="w-5 h-5 text-green-600 cursor-pointer"
                          onClick={savePostResurfacing}
                        />
                        <XMarkIcon
                          className="w-5 h-5 text-red-600 cursor-pointer"
                          onClick={cancelPostResurfacing}
                        />
                      </div>
                    )}
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

                    <tbody
                      className={`${inter.className} bg-white text-[13px]`}
                    >
                      {rows.map((row, rowIdx, arr) => (
                        <tr key={row}>
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

                          {categories.map((col, colIdx) => (
                            <td
                              key={col}
                              className={`px-4 py-3 text-center ${
                                raleway.className
                              } text-[13px] font-semibold text-[#010101]
                                ${
                                  colIdx === 3
                                    ? "border-r-2 border-[#AAA8A8]"
                                    : ""
                                }
                                ${
                                  rowIdx === 0
                                    ? "border-t-2 border-[#AAA8A8]"
                                    : ""
                                }
                                ${
                                  rowIdx === arr.length - 1
                                    ? "border-b-2 border-[#AAA8A8]"
                                    : ""
                                }`}
                            >
                              {implantTableEditingCell[col][row] ? (
                                <div className="flex items-center gap-2 justify-center">
                                  <select
                                    className="w-6/7 border rounded px-2 py-1 text-center text-sm"
                                    value={implantTableTempSelections[col][row]}
                                    onChange={(e) =>
                                      setImplantTableTempSelections({
                                        ...implantTableTempSelections,
                                        [col]: {
                                          ...implantTableTempSelections[col],
                                          [row]: e.target.value,
                                        },
                                      })
                                    }
                                  >
                                    <option value="" disabled>
                                      Select
                                    </option>

                                    {row === "MANUFACTURER" &&
                                      optionsData[col]?.MANUFACTURER?.map(
                                        (opt) => (
                                          <option key={opt} value={opt}>
                                            {opt}
                                          </option>
                                        )
                                      )}

                                    {row === "MODEL" &&
                                      implantTableTempSelections[col]
                                        .MANUFACTURER &&
                                      optionsData[col]?.MODEL[
                                        implantTableTempSelections[col]
                                          .MANUFACTURER
                                      ]?.map((opt) => (
                                        <option key={opt} value={opt}>
                                          {opt}
                                        </option>
                                      ))}

                                    {row === "SIZE" &&
                                      implantTableTempSelections[col].MODEL &&
                                      optionsData[col]?.SIZE[
                                        implantTableTempSelections[col].MODEL
                                      ]?.map((opt) => (
                                        <option key={opt} value={opt}>
                                          {opt}
                                        </option>
                                      ))}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-5 h-5 text-green-600 cursor-pointer"
                                    onClick={() =>
                                      implantTableSaveEdit(col, row)
                                    }
                                  />
                                  <XMarkIcon
                                    className="w-5 h-5 text-red-600 cursor-pointer"
                                    onClick={() =>
                                      implantTableCancelEdit(col, row)
                                    }
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2">
                                  <span>
                                    {implantTableSelections[col][row] || "—"}
                                  </span>
                                  {/* Edit Icon */}
                                  <PencilIcon
                                    className="w-5 h-5 text-gray-600 cursor-pointer"
                                    onClick={() =>
                                      implantTableStartEdit(col, row)
                                    }
                                  />
                                </div>
                              )}
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
        </>
      )}

      {!showsurgeryreport && !loadingsurg && (
        <div className={`bg-black rounded-lg w-1/5 py-2 flex mx-auto mt-12`}>
          <p
            className={`${inter.className} font-semibold text-base text-white text-center w-full cursor-pointer`}
            onClick={handlenavigateaddurgeryreport}
          >
            Add Surgery Report
          </p>
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

export default ViewSurgeryreport;
