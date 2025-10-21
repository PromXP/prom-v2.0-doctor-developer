"use client";

import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";

import axios from "axios";
import { API_URL } from "../libs/global";

import { Raleway, Inter, Poppins } from "next/font/google";
import { isEqual } from "lodash";
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
  ArrowLeftIcon,
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

const AddSurgeryreport = ({ handleclosereport }) => {
  const [uhid, setUhid] = useState(null);

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

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const [doctorName, setDoctorName] = useState("");
  const [showAlert, setshowAlert] = useState(false);
  const [alermessage, setAlertMessage] = useState("");

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
    setSelected((prev) => {
      const updated = { ...prev, [tp]: !prev[tp] };

      // If unchecked, also remove from surgeryData.rom
      if (!updated[tp]) {
        setSurgeryData((prevData) => {
          const updatedRecords = [...prevData.patient_records];
          updatedRecords[0].rom = updatedRecords[0].rom.filter(
            (r) => r.period !== tp
          );
          return { ...prevData, patient_records: updatedRecords };
        });
      }

      return updated;
    });
  };

  const handleROMChange = (tp, field, value) => {
    const numericValue = Number(value);

    if (isNaN(numericValue) || numericValue < 0 || numericValue > 360) {
      showWarning("Please enter a valid ROM angle between 0° and 360°");
      return; // Stop execution, do not update state
    }

    setSurgeryData((prevData) => {
      const updatedRecords = [...prevData.patient_records];
      const romArray = updatedRecords[0].rom;

      const index = romArray.findIndex((r) => r.period === tp);
      if (index >= 0) {
        // If value is empty, revert to "NA"
        romArray[index][field] = value.trim() === "" ? "NA" : value;
      }

      updatedRecords[0].rom = romArray;
      return { ...prevData, patient_records: updatedRecords };
    });
  };

  useEffect(() => {
    setSurgeryData((prevData) => {
      const updatedRecords = [...prevData.patient_records];

      // Initialize ROM with all time points as "NA"
      updatedRecords[0].rom = timepoints.map((tp) => ({
        period: tp,
        flexion: "NA",
        extension: "NA",
      }));

      return { ...prevData, patient_records: updatedRecords };
    });
  }, []);

  const [pfjResurf, setPfjResurf] = useState("N"); // Track PFJ selection
  const [preResurfacing, setPreResurfacing] = useState("");
  const [postResurfacing, setPostResurfacing] = useState("");
  const consultantOptions = ["Dr. Vetri Kumar"];
  const surgeonOptions = ["Dr. Vetri Kumar"];
  const firstAssistantOptions = ["Dr. Vetri Kumar", "Dr. Vinod Kumar"];
  const secondAssistantOptions = ["Dr. Vinod Kumar", "Dr. Milan Adhikari"];

  const [selections, setSelections] = useState({
    FEMUR: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
    TIBIA: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
    INSERT: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
    PATELLA: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
  });

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  const initialThicknessTable = [10, 11, 12, 13, 14].map((val) => ({
    thickness: val,
    numOfTicks: 0,
    extensionExtOrient: "NA",
    flexionIntOrient: "NA",
    liftOff: "NA",
  }));

  const [surgeryData, setSurgeryData] = useState(() => ({
    uhid: "NA",
    side: "NA",
    patient_records: [
      {
        patuhid: "NA",
        hospital_name: "NA",
        anaesthetic_type: "NA",
        asa_grade: "NA",
        rom: [
          {
            period: "NA",
            flexion: "NA",
            extension: "NA",
          },
        ],
        consultant_incharge: consultantOptions[0] || "NA",
        operating_surgeon: surgeonOptions[0] || "NA",
        first_assistant: firstAssistantOptions[0] || "NA",
        second_assistant: secondAssistantOptions[0] || "NA",
        mag_proc: "NA",
        side: "NA",
        surgery_indication: "NA",
        tech_assist: "NA",
        align_phil: "NA",
        torq_used: "NA",
        op_date: "NA",
        op_time: "NA",
        components_details: {
          FEMUR: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
          TIBIA: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
          INSERT: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
          PATELLA: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
        },
        bone_resection: {
          acl: "NA",
          distal_medial: {
            wear: "NA",
            initial_thickness: "NA",
            recut: "NA",
            recutvalue: "NA",
            washer: "NA",
            washervalue: "NA",
            final_thickness: "NA",
          },
          distal_lateral: {
            wear: "NA",
            initial_thickness: "NA",
            recut: "NA",
            recutvalue: "NA",
            washer: "NA",
            washervalue: "NA",
            final_thickness: "NA",
          },
          posterial_medial: {
            wear: "NA",
            initial_thickness: "NA",
            recut: "NA",
            recutvalue: "NA",
            final_thickness: "NA",
          },
          posterial_lateral: {
            wear: "NA",
            initial_thickness: "NA",
            recut: "NA",
            recutvalue: "NA",
            final_thickness: "NA",
          },
          tibial_resection_left: {
            wear: "NA",
            value: "NA",
          },
          tibial_resection_right: {
            wear: "NA",
            value: "NA",
          },
          pcl: "NA",
          tibialvvrecut: {
            wear: "NA",
            value: "NA",
          },
          tibialsloperecut: {
            wear: "NA",
            value: "NA",
          },
          final_check: "NA",
          thickness_table: initialThicknessTable, // ✅ keep your imported table
          pfj_resurfacing: "NA",
          trachela_resection: "NA",
          patella: "NA",
          preresurfacing: "NA",
          postresurfacing: "NA",
        },
        posting_timestamp: "NA",
      },
    ],
  }));

  useEffect(() => {
    const storedUHID = sessionStorage.getItem("selectedUHID");
    if (storedUHID) {
      // ✅ Update both uhid and patient_records[0].patuhid
      setSurgeryData((prevData) => ({
        ...prevData,
        uhid: storedUHID,
        patient_records: prevData.patient_records.map((record, index) =>
          index === 0 ? { ...record, patuhid: storedUHID } : record
        ),
      }));

      // ✅ Also update the separate uhid state
      setUhid(storedUHID);

      fetchPatientData(storedUHID);
    } else {
      setLoading(false);
    }
  }, []);

  const [thicknessTable, setThicknessTable] = useState(
    [10, 11, 12, 13, 14].map((val) => ({
      thickness: val,
      numOfTicks: 0,
      extensionExtOrient: "",
      flexionIntOrient: "",
      liftOff: "",
    }))
  );

  // Handle PFJ Resurfacing selection
  const handlePfjChange = (value) => {
    setPfjResurf(value);

    setSurgeryData((prev) => {
      const updated = { ...prev };
      const record = updated.patient_records[0];

      // Store PFJ resurfacing
      record.bone_resection.pfj_resurfacing = value;

      if (value === "Y") {
        // Keep current pre/post values
        record.bone_resection.preresurfacing = preResurfacing;
        record.bone_resection.postresurfacing = postResurfacing;
      } else {
        // Clear pre/post values if "N"
        record.bone_resection.preresurfacing = "";
        record.bone_resection.postresurfacing = "";
      }

      return updated;
    });
  };

  // Handle Pre and Post resurfacing changes
  const handlePreResurfacingChange = (value) => {
    setPreResurfacing(value);
    setSurgeryData((prev) => {
      const updated = { ...prev };
      const record = updated.patient_records[0];
      record.bone_resection.preresurfacing = pfjResurf === "Y" ? value : "";
      return updated;
    });
  };

  const handlePostResurfacingChange = (value) => {
    setPostResurfacing(value);
    setSurgeryData((prev) => {
      const updated = { ...prev };
      const record = updated.patient_records[0];
      record.bone_resection.postresurfacing = pfjResurf === "Y" ? value : "";
      return updated;
    });
  };

  const [opside, setOpside] = useState("LEFT KNEE");

  const verifySurgeryDate = async (uhid, op_date) => {
    try {
      const lowercaseUHID = uhid.toLowerCase();
      const formattedOpDate = `op-${op_date}`;

      const response = await axios.get(
        `${API_URL}get-surgery/${lowercaseUHID}/${formattedOpDate}`
      );

      if (response.status === 200 && response.data) {
        return "NA"; // ✅ Keep original date if valid
      } else {
        return op_date; // ✅ Not valid
      }
    } catch (err) {
      console.warn(`No surgery report for ${uhid} at ${op_date}`);
      return op_date; // ✅ Treat error as invalid
    }
  };

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
        let surgeryLeft = patient?.Medical?.surgery_date_left || "NA";
        let surgeryRight = patient?.Medical?.surgery_date_right || "NA";

        // ✅ Validate surgery dates with fetchSurgeryReport
        if (surgeryLeft !== "NA") {
          surgeryLeft = await verifySurgeryDate(uhid, surgeryLeft);
        }
        if (surgeryRight !== "NA") {
          surgeryRight = await verifySurgeryDate(uhid, surgeryRight);
        }

        // ✅ Determine side
        let side = "left";
        if (surgeryLeft !== "NA" && surgeryRight === "NA") {
          side = "left";
        } else if (surgeryRight !== "NA" && surgeryLeft === "NA") {
          side = "right";
        } else if (surgeryLeft !== "NA" && surgeryRight !== "NA") {
          side = "left"; // Default to left if both exist
        }

        // ✅ Pick operation date
        const op_date =
          surgeryLeft !== "NA"
            ? surgeryLeft
            : surgeryRight !== "NA"
            ? surgeryRight
            : "NA";

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
          surgery_left: surgeryLeft,
          surgery_right: surgeryRight,
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

        setSurgeryData((prev) => ({
          ...prev,
          uhid,
          side,
          patient_records: prev.patient_records.map((record, index) =>
            index === 0
              ? {
                  ...record,
                  patuhid: uhid,
                  side,
                  op_date: sessionStorage.getItem("op_date"), // ✅ If you want operation date set too
                }
              : record
          ),
        }));
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
  const [op_date, setop_date] = useState("");

  // Determine side based on selected surgery
  const getSideFromSurgery = (surgery) => {
    if (!surgery) return "";
    const left =
      patientData?.surgery_left !== "NA" ? patientData?.surgery_left : null;
    const right =
      patientData?.surgery_right !== "NA" ? patientData?.surgery_right : null;

    if (surgery === left && surgery === right) {
      return "left";
    } else if (surgery === left) {
      return "left";
    } else if (surgery === right) {
      return "right";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsConfirmOpen(false);
        setlogoutconfirm(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // after patientData is set, update surgeries
  useEffect(() => {
    if (patientData) {
      const s = [
        patientData?.surgery_left !== "NA" ? patientData?.surgery_left : null,
        patientData?.surgery_right !== "NA" ? patientData?.surgery_right : null,
      ].filter(Boolean); // remove null/NA

      setSurgeries(s);
      const defaultSurgery = s[0] || "";
      setSelectedSurgery(defaultSurgery);
      setop_date(sessionStorage.getItem("op_date"));

      // Update side and opside based on default selection
      const computedSide = getSideFromSurgery(defaultSurgery);
      setOpside(computedSide);
      setSurgeryData((prev) => ({
        ...prev,
        side: computedSide,
        patient_records: prev.patient_records.map((record, index) =>
          index === 0
            ? {
                ...record,
                side: computedSide,
                op_date: sessionStorage.getItem("op_date"),
              }
            : record
        ),
      }));
    }
  }, [patientData]);

  // whenever selectedSurgery changes, update op_date and side dynamically
  useEffect(() => {
    if (selectedSurgery && patientData?.uhid) {
      setop_date(sessionStorage.getItem("op_date"));

      const computedSide = getSideFromSurgery(selectedSurgery);
      setOpside(computedSide);

      console.log("Default Surgery Date:", selectedSurgery);

      setSurgeryData((prev) => ({
        ...prev,
        side: computedSide,
        patient_records: prev.patient_records.map((record, index) =>
          index === 0
            ? {
                ...record,
                side: computedSide,
                op_date: sessionStorage.getItem("op_date"),
              }
            : record
        ),
      }));
    }
  }, [selectedSurgery, patientData?.uhid]);

  const messages = [
    "Almost there, preparing patient surgery report...",
    "Hang tight! almost done...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
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

  const personal = patientData.Patient || {};
  const medical = patientData.Medical || {};
  const practitioners = patientData.Practitioners || {};

  // Function to calculate age
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

  const handleChange = (field, value) => {
    setSurgeryData((prev) => ({
      ...prev,
      patient_records: [
        {
          ...prev.patient_records[0],
          [field]: value,
        },
      ],
    }));
  };

  const saveDraft = async (data) => {
    const defaultData = {
      patuhid: sessionStorage.getItem("selectedUHID") || "NA",
      hospital_name: "NA",
      anaesthetic_type: "NA",
      asa_grade: "NA",
      rom: [
        { period: "Preop", flexion: "NA", extension: "NA" },
        { period: "1Month", flexion: "NA", extension: "NA" },
        { period: "3Month", flexion: "NA", extension: "NA" },
        { period: "6Month", flexion: "NA", extension: "NA" },
        { period: "1Year", flexion: "NA", extension: "NA" },
        { period: "2Year", flexion: "NA", extension: "NA" },
        { period: "3Year", flexion: "NA", extension: "NA" },
        { period: "4Year", flexion: "NA", extension: "NA" },
        { period: "5Year", flexion: "NA", extension: "NA" },
        { period: "10Year", flexion: "NA", extension: "NA" },
      ],
      consultant_incharge: "Dr. Vetri Kumar",
      operating_surgeon: "Dr. Vetri Kumar",
      first_assistant: "Dr. Vetri Kumar",
      second_assistant: "Dr. Vinod Kumar",
      mag_proc: "NA",
      side: "left",
      surgery_indication: "NA",
      tech_assist: "NA",
      align_phil: "NA",
      torq_used: "NA",
      op_date: sessionStorage.getItem("op_date"),
      op_time: "NA",
      components_details: {
        FEMUR: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
        TIBIA: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
        INSERT: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
        PATELLA: { MANUFACTURER: "NA", MODEL: "NA", SIZE: "NA" },
      },
      bone_resection: {
        acl: "NA",
        distal_medial: {
          wear: "NA",
          initial_thickness: "NA",
          recut: "NA",
          recutvalue: "NA",
          washer: "NA",
          washervalue: "NA",
          final_thickness: "NA",
        },
        distal_lateral: {
          wear: "NA",
          initial_thickness: "NA",
          recut: "NA",
          recutvalue: "NA",
          washer: "NA",
          washervalue: "NA",
          final_thickness: "NA",
        },
        posterial_medial: {
          wear: "NA",
          initial_thickness: "NA",
          recut: "NA",
          recutvalue: "NA",
          final_thickness: "NA",
        },
        posterial_lateral: {
          wear: "NA",
          initial_thickness: "NA",
          recut: "NA",
          recutvalue: "NA",
          final_thickness: "NA",
        },
        tibial_resection_left: { wear: "NA", value: "NA" },
        tibial_resection_right: { wear: "NA", value: "NA" },
        pcl: "NA",
        tibialvvrecut: { wear: "NA", value: "NA" },
        tibialsloperecut: { wear: "NA", value: "NA" },
        final_check: "NA",
        thickness_table: [
          {
            thickness: 10,
            numOfTicks: 0,
            extensionExtOrient: "NA",
            flexionIntOrient: "NA",
            liftOff: "NA",
          },
          {
            thickness: 11,
            numOfTicks: 0,
            extensionExtOrient: "NA",
            flexionIntOrient: "NA",
            liftOff: "NA",
          },
          {
            thickness: 12,
            numOfTicks: 0,
            extensionExtOrient: "NA",
            flexionIntOrient: "NA",
            liftOff: "NA",
          },
          {
            thickness: 13,
            numOfTicks: 0,
            extensionExtOrient: "NA",
            flexionIntOrient: "NA",
            liftOff: "NA",
          },
          {
            thickness: 14,
            numOfTicks: 0,
            extensionExtOrient: "NA",
            flexionIntOrient: "NA",
            liftOff: "NA",
          },
        ],
        pfj_resurfacing: "NA",
        trachela_resection: "NA",
        patella: "NA",
        preresurfacing: "NA",
        postresurfacing: "NA",
      },
      posting_timestamp: "NA",
    };

    const cleanDefaultData = { ...defaultData };
    const cleanData = {
      patient_records: data.patient_records.map((record, index) =>
        index === 0 ? record : record
      ),
    };

    // console.log("Clean Data:", cleanData.patient_records[0]);
    // console.log("Clean Default Data:", cleanDefaultData);

    // return;

    const isUnchanged = isEqual(cleanDefaultData, cleanData.patient_records[0]);

    if (isUnchanged) {
      setIsConfirmOpen(false);
      showWarning("Enter at least one field to draft."); // no changes detected

      return;
    }

    try {
      const currentTimestamp = new Date().toISOString(); // ✅ ISO format timestamp

      // ✅ Create updated data with posting_timestamp
      const updatedData = {
        ...data,
        patient_records: data.patient_records.map((record, index) =>
          index === 0
            ? {
                ...record,
                posting_timestamp: currentTimestamp,
                bone_resection: {
                  ...record.bone_resection,
                  thickness_table: record.bone_resection.thickness_table.map(
                    (item) => ({
                      ...item,
                      numOfTicks: item.numOfTicks.toString(), // ✅ convert only here
                    })
                  ),
                },
              }
            : record
        ),
      };

      // console.log("📦 Sending Draft Data:", updatedData);
      // return;

      const response = await axios.post(
        `${API_URL}post-surgery/fhir`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("✅ Draft saved successfully:", response.data);

      sessionStorage.setItem("selectedTab", "Home");
      showWarning("Draft saved successfully!");
      handleclosereport();
      showWarning("Draft saved successfully!");
      return response.data;
    } catch (error) {
      console.error("❌ Error saving draft:", error);
      throw error;
    }
  };

  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format

  const showWarning = (message) => {
    setAlertMessage(message);
    setshowAlert(true);
    setTimeout(() => setshowAlert(false), 4000);
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
                  {patientData?.name}
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
                  {patientData?.uhid ?? "N/A"}
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
                {"Dr. " + doctorName ?? "Doctor Name"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        className="flex items-center space-x-2 w-fit pt-[40px] cursor-pointer"
        onClick={handleclosereport}
      >
        <ArrowLeftIcon className="h-5 w-5 text-black cursor-pointer" />
        <p className={`${raleway.className} text-md font-bold text-black`}>
          Back to View Reports
        </p>
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
              className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
              value={surgeryData.patient_records[0].hospital_name}
              onChange={(e) =>
                setSurgeryData((prevData) => ({
                  ...prevData,
                  patient_records: [
                    {
                      ...prevData.patient_records[0],
                      hospital_name: e.target.value,
                    },
                  ],
                }))
              }
            >
              <option value="">Select Hospital</option>
              <option value="Parvathy Hospital">Parvathy Hospital</option>
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
                      name="anaesthetic-type"
                      type="radio"
                      value={type}
                      checked={
                        surgeryData.patient_records[0].anaesthetic_type === type
                      }
                      onChange={(e) =>
                        setSurgeryData((prev) => ({
                          ...prev,
                          patient_records: [
                            {
                              ...prev.patient_records[0],
                              anaesthetic_type: e.target.value,
                            },
                          ],
                        }))
                      }
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
                      type="radio"
                      name="asa-grades"
                      value={grade}
                      checked={
                        surgeryData.patient_records[0].asa_grade === grade
                      }
                      onChange={(e) =>
                        setSurgeryData((prev) => ({
                          ...prev,
                          patient_records: [
                            {
                              ...prev.patient_records[0],
                              asa_grade: e.target.value,
                            },
                          ],
                        }))
                      }
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
                      {["Flexion", "Extension"].map((motion) => {
                        const currentValue =
                          surgeryData.patient_records[0].rom.find(
                            (r) => r.period === tp
                          )?.[motion.toLowerCase()];

                        return (
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
                              value={
                                currentValue === "NA" ? "" : currentValue || ""
                              }
                              onChange={(e) =>
                                handleROMChange(
                                  tp,
                                  motion.toLowerCase(),
                                  e.target.value
                                )
                              }
                              placeholder={`Enter ${motion}`}
                            />
                          </div>
                        );
                      })}
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
          {/* Consultant */}
          <div className="flex items-center space-x-8">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              1. Consultant IN-CHARGE
            </label>
            <div className="flex flex-col gap-4">
              <select
                className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
                value={surgeryData.patient_records[0].consultant_incharge}
                onChange={(e) =>
                  handleChange("consultant_incharge", e.target.value)
                }
              >
                {consultantOptions.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
              </select>
              <div className={`w-fit flex flex-row gap-2 items-center`}>
                <input
                  type="checkbox"
                  className="w-4 h-4 appearance-none rounded-sm border border-gray-300 bg-gray-300 checked:bg-blue-600 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleChange(
                        "operating_surgeon",
                        surgeryData.patient_records[0].consultant_incharge
                      );
                    }
                  }}
                />
                <label
                  className={`${raleway.className} text-xs font-semibold select-none text-[#272727]`}
                >
                  Same for Surgeon
                </label>
              </div>
            </div>
          </div>

          {/* Operating Surgeon */}
          <div className="flex items-center space-x-16">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              2. Operating Surgeon
            </label>
            <select
              className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
              value={surgeryData.patient_records[0].operating_surgeon}
              onChange={(e) =>
                handleChange("operating_surgeon", e.target.value)
              }
            >
              {surgeonOptions.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>

          {/* First Assistant */}
          <div className="flex items-center space-x-25">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              3. First Assistant
            </label>
            <select
              className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
              value={surgeryData.patient_records[0].first_assistant}
              onChange={(e) => handleChange("first_assistant", e.target.value)}
            >
              {firstAssistantOptions.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>

          {/* Second Assistant */}
          <div className="flex items-center space-x-19">
            <label
              className={`${inter.className} text-base font-semibold text-[#484848]`}
            >
              4. Second Assistant
            </label>
            <select
              className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-60 text-sm text-black/55`}
              value={surgeryData.patient_records[0].second_assistant}
              onChange={(e) => handleChange("second_assistant", e.target.value)}
            >
              {secondAssistantOptions.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
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

        <div className="space-x-6 flex flex-row pt-[33px] pl-[23px]">
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
                  type="radio"
                  name="manage-procedure"
                  value={grade}
                  checked={surgeryData.patient_records[0].mag_proc === grade} // ✅ Controlled
                  onChange={(e) =>
                    setSurgeryData((prev) => ({
                      ...prev,
                      patient_records: prev.patient_records.map(
                        (record, index) =>
                          index === 0
                            ? { ...record, mag_proc: e.target.value } // ✅ Update only first record
                            : record
                      ),
                    }))
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
            <div className="space-x-6 flex flex-row">
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
                      checked={surgeryData.patient_records[0].surgery_indication
                        ?.split(", ")
                        .includes(grade)} // ✅ Split string to check
                      onChange={(e) => {
                        setSurgeryData((prev) => {
                          const updatedRecords = [...prev.patient_records];
                          let indications =
                            updatedRecords[0].surgery_indication?.split(", ") ||
                            [];

                          if (grade === "Varus" || grade === "Valgus") {
                            if (e.target.checked) {
                              // Remove other Varus/Valgus if selected
                              indications = indications.filter(
                                (item) => item !== "Varus" && item !== "Valgus"
                              );
                              indications.push(grade);
                            } else {
                              // Uncheck current
                              indications = indications.filter(
                                (item) => item !== grade
                              );
                            }
                          } else {
                            // Multi-select for remaining
                            if (e.target.checked) {
                              if (!indications.includes(grade))
                                indications.push(grade);
                            } else {
                              indications = indications.filter(
                                (item) => item !== grade
                              );
                            }
                          }

                          // ✅ Convert back to comma-separated string
                          updatedRecords[0].surgery_indication =
                            indications.join(", ");

                          return {
                            ...prev,
                            patient_records: updatedRecords,
                          };
                        });
                      }}
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
            <div className="space-x-6 flex flex-row">
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
                      type="radio"
                      name="tech-assist"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                      onChange={() => {
                        setSurgeryData((prev) => {
                          const updatedRecords = [...prev.patient_records];
                          updatedRecords[0].tech_assist = grade;

                          return {
                            ...prev,
                            patient_records: updatedRecords,
                          };
                        });
                      }}
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
            <div className="space-x-6 flex flex-row">
              {["MA", "KA", "rKA", "FA", "iKA", "Hybrid"].map((grade) => {
                const id = `alignphil-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="radio"
                      name="alignment-philo"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                      onChange={() => {
                        setSurgeryData((prev) => {
                          const updatedRecords = [...prev.patient_records];
                          updatedRecords[0].align_phil = grade;
                          return {
                            ...prev,
                            patient_records: updatedRecords,
                          };
                        });
                      }}
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
            <div className="space-y-6 flex flex-col pl-8">
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
                      type="radio"
                      name="torni-used"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                      onChange={() => {
                        setSurgeryData((prev) => {
                          const updatedRecords = [...prev.patient_records];
                          updatedRecords[0].torq_used = grade;
                          return {
                            ...prev,
                            patient_records: updatedRecords,
                          };
                        });
                      }}
                      checked={
                        surgeryData.patient_records[0].torq_used === grade
                      }
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
            <div className={`space-x-12 flex flex-row`}>
              {/* ✅ Display surgery date from patientData */}
              <div className="relative w-52">
                <p
                  className={`${poppins.className} font-medium text-black text-sm px-4 py-2`}
                >
                  {sessionStorage.getItem("op_date") || "DD/MM/YYYY"}
                </p>
                <Image
                  src={Calendar}
                  alt="Calendar"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
                />
              </div>

              {/* ✅ Time input */}
              <div className="relative w-52">
                <input
                  type="text"
                  placeholder="HH:MM"
                  maxLength={5} // 2 digits + ":" + 2 digits
                  className={`${poppins.className} font-medium border border-gray-300 rounded px-4 py-2 pr-10 w-full text-sm text-black`}
                  value={surgeryData.patient_records[0].op_time || ""}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, ""); // remove non-digits
                    if (val.length >= 3) {
                      val = val.slice(0, 2) + ":" + val.slice(2, 4);
                    }
                    setSurgeryData((prev) => {
                      const updatedRecords = [...prev.patient_records];
                      updatedRecords[0].op_time = val;
                      return {
                        ...prev,
                        patient_records: updatedRecords,
                      };
                    });
                  }}
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
            <div className="space-y-6 flex flex-col pl-8">
              {["Intact", "Torn", "Reconstructed"].map((grade) => {
                const id = `acl-${grade}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <input
                      id={id}
                      type="radio"
                      name="acl-conditions"
                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                      onChange={() => {
                        setSurgeryData((prev) => {
                          const updatedRecords = [...prev.patient_records];
                          updatedRecords[0].bone_resection.acl = grade;
                          return {
                            ...prev,
                            patient_records: updatedRecords,
                          };
                        });
                      }}
                      checked={
                        surgeryData.patient_records[0].bone_resection.acl ===
                        grade
                      }
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
                    <div className="flex flex-row gap-4">
                      {["Unworn", "Worn"].map((status) => (
                        <div key={status} className="flex flex-row gap-4 w-1/2">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                          >
                            {status}
                          </label>
                          <input
                            type="radio"
                            name="distal-medial-status"
                            className="w-4 h-4 rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                            onChange={() => {
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_medial.wear =
                                  status;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
                            }}
                            checked={
                              surgeryData.patient_records[0].bone_resection
                                .distal_medial.wear === status
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                      <div className="flex flex-row gap-4 w-1/2">
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Initial Thickness
                        </label>
                      </div>

                      <div className="flex flex-row gap-1 w-1/2 items-center">
                        <select
                          className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                          value={
                            surgeryData.patient_records[0].bone_resection
                              .distal_medial.initial_thickness
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setSurgeryData((prev) => {
                              const updatedRecords = [...prev.patient_records];
                              updatedRecords[0].bone_resection.distal_medial.initial_thickness =
                                value;
                              return {
                                ...prev,
                                patient_records: updatedRecords,
                              };
                            });
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
                    </div>

                    <div className="flex flex-row items-center gap-4">
                      {/* Recut Radio Buttons */}
                      <div className="flex flex-row gap-4 w-1/2">
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Recut
                        </label>
                        <div className="space-x-3 flex flex-row pl-2.5">
                          {["N", "Y"].map((grade) => {
                            const id = `distal-medial-recut-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="radio"
                                  name="distal-medial-recut"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  onChange={() => {
                                    setSurgeryData((prev) => {
                                      const updatedRecords = [
                                        ...prev.patient_records,
                                      ];
                                      updatedRecords[0].bone_resection.distal_medial.recut =
                                        grade;
                                      return {
                                        ...prev,
                                        patient_records: updatedRecords,
                                      };
                                    });
                                  }}
                                  checked={
                                    surgeryData.patient_records[0]
                                      .bone_resection.distal_medial.recut ===
                                    grade
                                  }
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

                      {/* Recut Value Select */}
                      <div className="flex flex-row gap-1 w-1/2">
                        <div className="flex flex-row gap-1 w-full items-center">
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .distal_medial.recutvalue
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_medial.recutvalue =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                      {/* Washer Radio Buttons */}
                      <div className="flex flex-row gap-4 w-1/2">
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Washer
                        </label>
                        <div className="space-x-3 flex flex-row">
                          {["N", "Y"].map((grade) => {
                            const id = `distal-medial-washer-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="radio"
                                  name="distal-medial-washer"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  onChange={() => {
                                    setSurgeryData((prev) => {
                                      const updatedRecords = [
                                        ...prev.patient_records,
                                      ];
                                      updatedRecords[0].bone_resection.distal_medial.washer =
                                        grade;
                                      return {
                                        ...prev,
                                        patient_records: updatedRecords,
                                      };
                                    });
                                  }}
                                  checked={
                                    surgeryData.patient_records[0]
                                      .bone_resection.distal_medial.washer ===
                                    grade
                                  }
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

                      {/* Washer Value Select */}
                      <div className="flex flex-row gap-1 w-1/2">
                        <div className="flex flex-row gap-1 w-full items-center">
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .distal_medial.washervalue
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_medial.washervalue =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                      <div className="flex flex-row gap-4 w-1/2">
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Final Thickness
                        </label>
                      </div>

                      <div className="flex flex-row gap-1 w-1/2">
                        <div className="flex flex-row gap-1 w-full items-center">
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .distal_medial.final_thickness
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_medial.final_thickness =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                    <div className="flex flex-row gap-4">
                      {["Unworn", "Worn"].map((status) => (
                        <div key={status} className="flex flex-row gap-4 w-1/2">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                          >
                            {status}
                          </label>
                          <input
                            type="radio"
                            name="distal-lateral-status"
                            className="w-4 h-4 rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                            onChange={() => {
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_lateral.wear =
                                  status;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
                            }}
                            checked={
                              surgeryData.patient_records[0].bone_resection
                                .distal_lateral.wear === status
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className={`flex flex-row gap-4 items-center`}>
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Initial Thickness
                        </label>
                      </div>
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <div
                          className={`flex flex-row gap-1 w-full items-center`}
                        >
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .distal_lateral.initial_thickness
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_lateral.initial_thickness =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                      </div>
                    </div>

                    <div className={`flex flex-row items-center gap-4`}>
                      {/* Recut radio buttons */}
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Recut
                        </label>
                        <div className={`space-x-3 flex flex-row pl-2.5`}>
                          {["N", "Y"].map((grade) => (
                            <label
                              key={grade}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="distal-lateral-recut"
                                className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                value={grade}
                                checked={
                                  surgeryData.patient_records[0].bone_resection
                                    .distal_lateral.recut === grade
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSurgeryData((prev) => {
                                    const updatedRecords = [
                                      ...prev.patient_records,
                                    ];
                                    updatedRecords[0].bone_resection.distal_lateral.recut =
                                      value;
                                    return {
                                      ...prev,
                                      patient_records: updatedRecords,
                                    };
                                  });
                                }}
                              />
                              <span
                                className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {grade}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Recut value select */}
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <div
                          className={`flex flex-row gap-1 w-full items-center`}
                        >
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .distal_lateral.recutvalue
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_lateral.recutvalue =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                      </div>
                    </div>

                    <div className={`flex flex-row items-center gap-4`}>
                      {/* Washer radio buttons */}
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Washer
                        </label>
                        <div className={`space-x-3 flex flex-row`}>
                          {["N", "Y"].map((grade) => (
                            <label
                              key={grade}
                              className="flex items-center space-x-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="distal-lateral-washer"
                                className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                value={grade}
                                checked={
                                  surgeryData.patient_records[0].bone_resection
                                    .distal_lateral.washer === grade
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSurgeryData((prev) => {
                                    const updatedRecords = [
                                      ...prev.patient_records,
                                    ];
                                    updatedRecords[0].bone_resection.distal_lateral.washer =
                                      value;
                                    return {
                                      ...prev,
                                      patient_records: updatedRecords,
                                    };
                                  });
                                }}
                              />
                              <span
                                className={`text-xs text-[#272727] ${raleway.className} font-semibold`}
                              >
                                {grade}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Washer value select */}
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <div
                          className={`flex flex-row gap-1 w-full items-center`}
                        >
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .distal_lateral.washervalue
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_lateral.washervalue =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                      </div>
                    </div>

                    <div className={`flex flex-row items-center gap-4`}>
                      {/* Label */}
                      <div className={`flex flex-row gap-4 w-1/2`}>
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Final Thickness
                        </label>
                      </div>

                      {/* Select input */}
                      <div className={`flex flex-row gap-1 w-1/2`}>
                        <div
                          className={`flex flex-row gap-1 w-full items-center`}
                        >
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .distal_lateral.final_thickness
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.distal_lateral.final_thickness =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                    <div className="flex flex-row gap-4">
                      {["Unworn", "Worn"].map((status) => (
                        <div key={status} className="flex flex-row gap-4 w-1/2">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                          >
                            {status}
                          </label>
                          <input
                            type="radio"
                            name="post-medial-wear"
                            className="w-4 h-4 rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                            onChange={() => {
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.posterial_medial.wear =
                                  status;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
                            }}
                            checked={
                              surgeryData.patient_records[0].bone_resection
                                .posterial_medial.wear === status
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className={`flex flex-row gap-4`}>
                      <div
                        className={`flex flex-row gap-4 w-full items-center`}
                      >
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}
                        >
                          Initial Thickness
                        </label>
                        <div className={`flex flex-row gap-1 w-1/2`}>
                          <div
                            className={`flex flex-row gap-1 w-full items-center`}
                          >
                            <select
                              className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                              value={
                                surgeryData.patient_records[0].bone_resection
                                  .posterial_medial.initial_thickness || "0 mm"
                              }
                              onChange={(e) => {
                                const value = e.target.value;
                                setSurgeryData((prev) => {
                                  const updatedRecords = [
                                    ...prev.patient_records,
                                  ];
                                  updatedRecords[0].bone_resection.posterial_medial.initial_thickness =
                                    value;
                                  return {
                                    ...prev,
                                    patient_records: updatedRecords,
                                  };
                                });
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
                        </div>
                      </div>
                    </div>
                    <div className={`flex flex-row gap-4`}>
                      <div
                        className={`flex flex-row gap-4 w-full items-center`}
                      >
                        <div
                          className={`flex flex-row gap-4 w-full items-center`}
                        >
                          <div className="flex flex-row gap-4 items-center w-1/2">
                            <label
                              className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                            >
                              Recut
                            </label>
                            <div className={`space-x-3 flex flex-row pl-2.5 `}>
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
                                      type="radio"
                                      name="post-medial-recut"
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                      checked={
                                        surgeryData.patient_records[0]
                                          .bone_resection.posterial_medial
                                          .recut === grade
                                      }
                                      onChange={() => {
                                        const selected = grade;
                                        setSurgeryData((prev) => {
                                          const updatedRecords = [
                                            ...prev.patient_records,
                                          ];
                                          updatedRecords[0].bone_resection.posterial_medial.recut =
                                            selected;
                                          return {
                                            ...prev,
                                            patient_records: updatedRecords,
                                          };
                                        });
                                      }}
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
                            <div
                              className={`flex flex-row gap-1 w-full items-center`}
                            >
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={
                                  surgeryData.patient_records[0].bone_resection
                                    .posterial_medial.recutvalue || "0 mm"
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSurgeryData((prev) => {
                                    const updatedRecords = [
                                      ...prev.patient_records,
                                    ];
                                    updatedRecords[0].bone_resection.posterial_medial.recutvalue =
                                      value;
                                    return {
                                      ...prev,
                                      patient_records: updatedRecords,
                                    };
                                  });
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
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`flex flex-row gap-4`}>
                      <div className={`flex flex-row gap-4 w-full`}>
                        <div
                          className={`flex flex-row gap-4 w-full items-center`}
                        >
                          <label
                            className={`${raleway.className} font-semibold text-xs w-1/2 text-[#484848]`}
                          >
                            Final Thickness
                          </label>
                          <div className={`flex flex-row gap-1 w-1/2`}>
                            <div
                              className={`flex flex-row gap-1 w-full items-center`}
                            >
                              <select
                                className={`${raleway.className} border px-2 py-1 w-full mr-1 rounded text-black`}
                                value={
                                  surgeryData.patient_records[0].bone_resection
                                    .posterial_medial.final_thickness || "0 mm"
                                }
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setSurgeryData((prev) => {
                                    const updatedRecords = [
                                      ...prev.patient_records,
                                    ];
                                    updatedRecords[0].bone_resection.posterial_medial.final_thickness =
                                      value;
                                    return {
                                      ...prev,
                                      patient_records: updatedRecords,
                                    };
                                  });
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
                          </div>
                        </div>
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
                    <div className="flex flex-row gap-4">
                      {["Unworn", "Worn"].map((status) => (
                        <div key={status} className="flex flex-row gap-4 w-1/2">
                          <label
                            className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                          >
                            {status}
                          </label>
                          <input
                            type="radio"
                            name="post-lateral-status"
                            className="w-4 h-4 rounded-xs appearance-none text-xs bg-[#D9D9D9] checked:bg-blue-500 focus:ring-0 cursor-pointer"
                            onChange={() => {
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.posterial_lateral.wear =
                                  status;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
                            }}
                            checked={
                              surgeryData.patient_records[0].bone_resection
                                .posterial_lateral.wear === status
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className={`flex flex-row gap-4`}>
                      <div className="flex flex-row gap-1 w-full">
                        <div className="flex flex-row w-full gap-4 items-center">
                          <label
                            className={`${raleway.className} font-semibold text-xs w-1/2 text-[#484848]`}
                          >
                            Initial Thickness
                          </label>
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-1/2 text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .posterial_lateral.initial_thickness || "0 mm"
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.posterial_lateral.initial_thickness =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                      </div>
                    </div>
                    <div className="flex flex-row gap-4">
                      {/* Recut Y/N */}
                      <div className="flex flex-row gap-4 items-center w-1/2">
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Recut
                        </label>
                        <div className="space-x-3 flex flex-row pl-2.5">
                          {["N", "Y"].map((grade) => {
                            const id = `post-lateral-recut-${grade}`;
                            return (
                              <label
                                key={id}
                                htmlFor={id}
                                className="flex items-center space-x-2 cursor-pointer"
                              >
                                <input
                                  id={id}
                                  type="radio"
                                  name="post-lateral-recut"
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  checked={
                                    surgeryData.patient_records[0]
                                      .bone_resection.posterial_lateral
                                      .recut === grade
                                  }
                                  onChange={() => {
                                    setSurgeryData((prev) => {
                                      const updatedRecords = [
                                        ...prev.patient_records,
                                      ];
                                      updatedRecords[0].bone_resection.posterial_lateral.recut =
                                        grade;
                                      return {
                                        ...prev,
                                        patient_records: updatedRecords,
                                      };
                                    });
                                  }}
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

                      {/* Recut Value */}
                      <div className="flex flex-row gap-1 w-1/2">
                        <div className="flex flex-row gap-1 w-full items-center">
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .posterial_lateral.recutvalue || "0 mm"
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.posterial_lateral.recutvalue =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                      </div>
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                      {/* Label */}
                      <div className="flex flex-row gap-4 w-1/2">
                        <label
                          className={`${raleway.className} font-semibold text-xs text-[#484848]`}
                        >
                          Final Thickness
                        </label>
                      </div>

                      {/* Select Final Thickness */}
                      <div className="flex flex-row gap-1 w-1/2">
                        <div className="flex flex-row gap-1 w-full items-center">
                          <select
                            className={`${raleway.className} border px-2 py-1 mr-1 rounded w-full text-black`}
                            value={
                              surgeryData.patient_records[0].bone_resection
                                .posterial_lateral.final_thickness || "0 mm"
                            }
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.posterial_lateral.final_thickness =
                                  value;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
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
                    {/* Status: Worn / UnWorn */}
                    <div className={`space-y-6 flex flex-col`}>
                      {["Worn", "UnWorn"].map((grade) => {
                        const id = `tibial-left-status-${grade}`;
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <input
                              id={id}
                              type="radio"
                              name="tibial-left-status"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                              checked={
                                surgeryData.patient_records[0].bone_resection
                                  .tibial_resection_left.wear === grade
                              }
                              onChange={() => {
                                setSurgeryData((prev) => {
                                  const updatedRecords = [
                                    ...prev.patient_records,
                                  ];
                                  updatedRecords[0].bone_resection.tibial_resection_left.wear =
                                    grade;
                                  return {
                                    ...prev,
                                    patient_records: updatedRecords,
                                  };
                                });
                              }}
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

                    {/* Value Selection */}
                    <div className={`flex flex-row gap-1`}>
                      <div
                        className={`flex flex-row gap-1 w-full items-center`}
                      >
                        <select
                          className={`${raleway.className} border px-2 py-1 truncate rounded w-full text-black`}
                          value={
                            surgeryData.patient_records[0].bone_resection
                              .tibial_resection_left.value
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setSurgeryData((prev) => {
                              const updatedRecords = [...prev.patient_records];
                              updatedRecords[0].bone_resection.tibial_resection_left.value =
                                value;
                              return {
                                ...prev,
                                patient_records: updatedRecords,
                              };
                            });
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
                    </div>
                  </div>

                  <div className={`w-5/7 flex items-center justify-center`}>
                    <Image src={Tibia} alt="Bone Left" className="w-6/7 pt-3" />
                  </div>
                  <div className={`w-1/7 h-full flex flex-col justify-between`}>
                    {/* Status: Worn / UnWorn */}
                    <div className={`space-y-6 flex flex-col`}>
                      {["Worn", "UnWorn"].map((grade) => {
                        const id = `tibial-right-status-${grade}`;
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className="flex items-center space-x-4 cursor-pointer"
                          >
                            <input
                              id={id}
                              type="radio"
                              name="tibial-right-status"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                              checked={
                                surgeryData.patient_records[0].bone_resection
                                  .tibial_resection_right.wear === grade
                              }
                              onChange={() => {
                                setSurgeryData((prev) => {
                                  const updatedRecords = [
                                    ...prev.patient_records,
                                  ];
                                  updatedRecords[0].bone_resection.tibial_resection_right.wear =
                                    grade;
                                  return {
                                    ...prev,
                                    patient_records: updatedRecords,
                                  };
                                });
                              }}
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

                    {/* Value Selection */}
                    <div className={`flex flex-row gap-1`}>
                      <div
                        className={`flex flex-row gap-1 w-full items-center`}
                      >
                        <select
                          className={`${raleway.className} border px-2 py-1 truncate rounded w-full text-black`}
                          value={
                            surgeryData.patient_records[0].bone_resection
                              .tibial_resection_right.value
                          }
                          onChange={(e) => {
                            const value = e.target.value;
                            setSurgeryData((prev) => {
                              const updatedRecords = [...prev.patient_records];
                              updatedRecords[0].bone_resection.tibial_resection_right.value =
                                value;
                              return {
                                ...prev,
                                patient_records: updatedRecords,
                              };
                            });
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
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col gap-4`}>
                  <label
                    className={`${inter.className} text-base font-semibold text-[#484848]`}
                  >
                    PCL Condition
                  </label>
                  <div className={`space-x-6 flex flex-row`}>
                    {["Intact", "Torn", "Excised"].map((grade) => {
                      const id = `pclcondition-${grade}`;
                      return (
                        <label
                          key={id}
                          htmlFor={id}
                          className="flex items-center space-x-4 cursor-pointer"
                        >
                          <input
                            id={id}
                            type="radio"
                            name="pcl-cond"
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            checked={
                              surgeryData.patient_records[0].bone_resection
                                .pcl === grade
                            }
                            onChange={() => {
                              setSurgeryData((prev) => {
                                const updatedRecords = [
                                  ...prev.patient_records,
                                ];
                                updatedRecords[0].bone_resection.pcl = grade;
                                return {
                                  ...prev,
                                  patient_records: updatedRecords,
                                };
                              });
                            }}
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

                    {/* Radio Buttons for N/Y */}
                    <div className={`space-x-3 flex flex-row pl-3.5`}>
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
                              type="radio"
                              name="tibial-v-v"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                              checked={
                                surgeryData.patient_records[0].bone_resection
                                  .tibialvvrecut.wear === grade
                              }
                              onChange={() => {
                                setSurgeryData((prev) => {
                                  const updatedRecords = [
                                    ...prev.patient_records,
                                  ];
                                  updatedRecords[0].bone_resection.tibialvvrecut =
                                    {
                                      ...updatedRecords[0].bone_resection
                                        .tibialvvrecut,
                                      wear: grade,
                                    };
                                  return {
                                    ...prev,
                                    patient_records: updatedRecords,
                                  };
                                });
                              }}
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

                    {/* Thickness Select */}
                    <div className={`flex flex-row gap-1 w-1/2 items-center`}>
                      <select
                        className={`${raleway.className} border px-2 py-1 w-28 mr-1 rounded w-1/4 text-black`}
                        value={
                          surgeryData.patient_records[0].bone_resection
                            .tibialvvrecut.value || ""
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          setSurgeryData((prev) => {
                            const updatedRecords = [...prev.patient_records];
                            updatedRecords[0].bone_resection.tibialvvrecut = {
                              ...updatedRecords[0].bone_resection.tibialvvrecut,
                              value: val,
                            };
                            return { ...prev, patient_records: updatedRecords };
                          });
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
                  </div>
                  <div className={`flex flex-row gap-12 items-center pl-20`}>
                    <label
                      className={`${inter.className} text-base font-semibold text-[#484848]`}
                    >
                      Tibial Slope Recut
                    </label>

                    {/* Radio Buttons N/Y */}
                    <div className={`space-x-3 flex flex-row`}>
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
                              type="radio"
                              name="tibial-slope"
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                              checked={
                                surgeryData.patient_records[0].bone_resection
                                  .tibialsloperecut.wear === grade
                              }
                              onChange={() => {
                                setSurgeryData((prev) => {
                                  const updatedRecords = [
                                    ...prev.patient_records,
                                  ];
                                  updatedRecords[0].bone_resection.tibialsloperecut =
                                    {
                                      ...updatedRecords[0].bone_resection
                                        .tibialsloperecut,
                                      wear: grade,
                                    };
                                  return {
                                    ...prev,
                                    patient_records: updatedRecords,
                                  };
                                });
                              }}
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

                    {/* Thickness Select */}
                    <div className={`flex flex-row gap-1 w-1/2 items-center`}>
                      <select
                        className={`${raleway.className} border px-2 py-1 w-28 mr-1 rounded w-1/4 text-black`}
                        value={
                          surgeryData.patient_records[0].bone_resection
                            .tibialsloperecut.value || ""
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          setSurgeryData((prev) => {
                            const updatedRecords = [...prev.patient_records];
                            updatedRecords[0].bone_resection.tibialsloperecut =
                              {
                                ...updatedRecords[0].bone_resection
                                  .tibialsloperecut,
                                value: val,
                              };
                            return { ...prev, patient_records: updatedRecords };
                          });
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
                      <div className={`space-y-6 flex flex-col`}>
                        {[
                          "Negligible V-V Laxity in extenstion",
                          "2-3 mm of lateral opening with Varus load in 15-30° of flexion",
                        ].map((grade) => {
                          const id = `finalcheck-${grade}`;
                          return (
                            <label
                              key={id}
                              htmlFor={id}
                              className="flex items-center space-x-4 cursor-pointer"
                            >
                              <input
                                id={id}
                                type="radio"
                                name="final-check"
                                className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                checked={
                                  surgeryData.patient_records[0].bone_resection
                                    .final_check === grade
                                }
                                onChange={() => {
                                  setSurgeryData((prev) => {
                                    const updatedRecords = [
                                      ...prev.patient_records,
                                    ];
                                    updatedRecords[0].bone_resection.final_check =
                                      grade;
                                    return {
                                      ...prev,
                                      patient_records: updatedRecords,
                                    };
                                  });
                                }}
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
                  {surgeryData.patient_records[0].bone_resection.thickness_table.map(
                    (row, rowIdx, arr) => (
                      <tr key={rowIdx}>
                        {/* Insert Thickness */}
                        <td
                          className={`${
                            raleway.className
                          } text-[13px] px-4 py-2 text-center font-semibold text-black border-l-2 border-[#AAA8A8] ${
                            rowIdx === 0 ? "border-t-2" : ""
                          } ${rowIdx === arr.length - 1 ? "border-b-2" : ""}`}
                        >
                          {row.thickness} mm
                        </td>

                        {/* No of Ticks */}
                        <td
                          className={`px-4 py-2 text-center ${
                            raleway.className
                          } text-[13px] font-semibold text-black ${
                            rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                          } ${
                            rowIdx === arr.length - 1
                              ? "border-b-2 border-[#AAA8A8]"
                              : ""
                          }`}
                        >
                          <input
                            type="number"
                            value={row.numOfTicks}
                            className="w-16 border rounded px-2 py-1 text-center"
                            placeholder="0"
                            onChange={(e) => {
                              const value = e.target.value;
                              setSurgeryData((prev) => {
                                const updated = [...prev.patient_records];
                                updated[0].bone_resection.thickness_table[
                                  rowIdx
                                ].numOfTicks = value;
                                return { ...prev, patient_records: updated };
                              });
                            }}
                          />
                        </td>

                        {/* Extension EXT. Orient */}
                        <td
                          className={`px-4 py-2 ${
                            raleway.className
                          } text-[13px] text-center font-semibold text-black ${
                            rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                          } ${
                            rowIdx === arr.length - 1
                              ? "border-b-2 border-[#AAA8A8]"
                              : ""
                          }`}
                        >
                          <div className="flex justify-center items-center space-x-2">
                            <input
                              type="text"
                              value={row.extensionExtOrient}
                              className="w-20 border rounded px-2 py-1 text-center"
                              placeholder="—"
                              onChange={(e) => {
                                const value = e.target.value;
                                setSurgeryData((prev) => {
                                  const updated = [...prev.patient_records];
                                  updated[0].bone_resection.thickness_table[
                                    rowIdx
                                  ].extensionExtOrient = value;
                                  return { ...prev, patient_records: updated };
                                });
                              }}
                            />
                            <p>Deg</p>
                          </div>
                        </td>

                        {/* 90° Flexion INT. Orient */}
                        <td
                          className={`px-4 py-2 ${
                            raleway.className
                          } text-[13px] text-center font-semibold text-black ${
                            rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""
                          } ${
                            rowIdx === arr.length - 1
                              ? "border-b-2 border-[#AAA8A8]"
                              : ""
                          }`}
                        >
                          <div className="flex justify-center items-center space-x-2">
                            <input
                              type="text"
                              value={row.flexionIntOrient}
                              className="w-20 border rounded px-2 py-1 text-center"
                              placeholder="—"
                              onChange={(e) => {
                                const value = e.target.value;
                                setSurgeryData((prev) => {
                                  const updated = [...prev.patient_records];
                                  updated[0].bone_resection.thickness_table[
                                    rowIdx
                                  ].flexionIntOrient = value;
                                  return { ...prev, patient_records: updated };
                                });
                              }}
                            />
                            <p>Deg</p>
                          </div>
                        </td>

                        {/* Lift-Off */}
                        <td
                          className={`border-r-2 border-[#AAA8A8] px-4 py-2 text-center ${
                            raleway.className
                          } text-[13px] font-semibold text-black ${
                            rowIdx === 0 ? "border-t-2" : ""
                          } ${rowIdx === arr.length - 1 ? "border-b-2" : ""}`}
                        >
                          <div className="space-x-6 flex flex-row justify-center items-center">
                            {["N", "Y"].map((grade) => {
                              const id = `liftoff-${rowIdx}-${grade}`;
                              return (
                                <label
                                  key={id}
                                  className="flex items-center space-x-2 cursor-pointer"
                                >
                                  <input
                                    id={id}
                                    type="radio"
                                    name={`lift-off-${rowIdx}`}
                                    checked={row.liftOff === grade}
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    onChange={() => {
                                      setSurgeryData((prev) => {
                                        const updated = [
                                          ...prev.patient_records,
                                        ];
                                        updated[0].bone_resection.thickness_table[
                                          rowIdx
                                        ].liftOff = grade;
                                        return {
                                          ...prev,
                                          patient_records: updated,
                                        };
                                      });
                                    }}
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
                    )
                  )}
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
                <div className="space-x-6 flex flex-row">
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
                          type="radio"
                          name="pfj"
                          value={grade}
                          checked={pfjResurf === grade}
                          onChange={(e) => handlePfjChange(e.target.value)}
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

              <div className="flex flex-row gap-28">
                <label
                  className={`${inter.className} text-base font-extrabold text-[#484848]`}
                >
                  Trachela Resection
                </label>
                <div>
                  <div className="flex flex-row gap-1 w-1/2 items-center">
                    <select
                      className={`${raleway.className} border px-2 py-1 w-28 mr-1 rounded w-1/4 text-black`}
                      onChange={(e) =>
                        setSurgeryData((prev) => {
                          const updated = { ...prev };
                          updated.patient_records[0].bone_resection.trachela_resection =
                            e.target.value;
                          return updated;
                        })
                      }
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
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <label
                  className={`${inter.className} text-base font-extrabold text-[#484848]`}
                >
                  Patella
                </label>
                <div className="space-x-6 flex flex-row">
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
                          type="radio"
                          name="patella"
                          className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          onChange={() =>
                            setSurgeryData((prev) => {
                              const updated = { ...prev };
                              updated.patient_records[0].bone_resection.patella =
                                grade;
                              return updated;
                            })
                          }
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

              {pfjResurf === "Y" && (
                <>
                  <div className="flex flex-row gap-[49px]">
                    <label
                      className={`${inter.className} text-base font-extrabold text-[#484848]`}
                    >
                      Pre Resurfacing Thickness
                    </label>
                    <div className="flex flex-row gap-1 w-1/2 items-center">
                      <select
                        className={`${raleway.className} border px-2 py-1 w-28 mr-1 rounded w-1/4 text-black`}
                        value={preResurfacing}
                        onChange={(e) =>
                          handlePreResurfacingChange(e.target.value)
                        }
                      >
                        {Array.from({ length: 32 }, (_, i) => {
                          const value = (i * 0.5).toFixed(1);
                          return (
                            <option
                              key={value}
                              value={value}
                            >{`${value} mm`}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-row gap-10">
                    <label
                      className={`${inter.className} text-base font-extrabold text-[#484848]`}
                    >
                      Post Resurfacing Thickness
                    </label>
                    <div className="flex flex-row gap-1 w-1/2 items-center">
                      <select
                        className={`${raleway.className} border px-2 py-1 w-28 mr-1 rounded w-1/4 text-black`}
                        value={postResurfacing}
                        onChange={(e) =>
                          handlePostResurfacingChange(e.target.value)
                        }
                      >
                        {Array.from({ length: 32 }, (_, i) => {
                          const value = (i * 0.5).toFixed(1);
                          return (
                            <option
                              key={value}
                              value={value}
                            >{`${value} mm`}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white flex flex-col h-full w-full pt-10">
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
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelections({
                                ...selections,
                                [col]: {
                                  ...selections[col],
                                  [row]: value,
                                  ...(row === "MANUFACTURER" && {
                                    MODEL: "NA",
                                    SIZE: "NA",
                                  }),
                                  ...(row === "MODEL" && { SIZE: "NA" }),
                                },
                              });

                              // Update surgeryData.components_details directly
                              setSurgeryData((prev) => {
                                const updated = { ...prev };
                                updated.patient_records[0].components_details[
                                  col
                                ][row] = value;

                                // Reset dependent fields if needed
                                if (row === "MANUFACTURER") {
                                  updated.patient_records[0].components_details[
                                    col
                                  ].MODEL = "NA";
                                  updated.patient_records[0].components_details[
                                    col
                                  ].SIZE = "NA";
                                }
                                if (row === "MODEL") {
                                  updated.patient_records[0].components_details[
                                    col
                                  ].SIZE = "NA";
                                }

                                return updated;
                              });
                            }}
                          >
                            <option value="NA" disabled>
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

      <div className={`w-full flex flex-row justify-between pt-[40px]`}>
        <p
          className={`${raleway.className} w-fit text-center bg-[#2A343D] px-6 py-2 text-white ${inter.className} font-medium text-lg  cursor-pointer`}
        >
          Reset
        </p>
        <p
          className={`${raleway.className} text-center bg-[#2A343D] px-6 py-2 text-white ${inter.className} font-medium text-lg cursor-pointer`}
          onClick={() => setIsConfirmOpen(true)}
        >
          Draft
        </p>
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

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl p-6 max-w-sm w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // prevent close on modal content click
          >
            <h2
              className={`text-xl font-bold mb-4 text-black ${poppins.className}`}
            >
              Confirm Submission
            </h2>
            <p
              className={`mb-6 font-normal text-black text-center ${poppins.className}`}
            >
              Are you sure you want to save as a draft ?
            </p>
            <div
              className={`flex justify-end gap-4 ${poppins.className} font-semibold`}
            >
              <button
                className="px-4 py-2 rounded bg-gray-300 text-white hover:bg-gray-400 cursor-pointer"
                onClick={() => setIsConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-[#4EADA7] text-white hover:bg-[#3b8f8b] cursor-pointer"
                onClick={async () => {
                  // console.log("Surgery Report Data:", surgeryData);

                  try {
                    const result = await saveDraft(surgeryData);
                    // return;
                  } catch (error) {
                    console.error("Error saving draft:", error);
                    showWarning("Failed to save draft.");
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSurgeryreport;
