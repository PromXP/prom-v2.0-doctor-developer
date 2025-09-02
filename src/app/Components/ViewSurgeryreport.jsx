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
import ManAvatar from "@/app/Assets/man.png";
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
    [category]: { ...prev[category], [row]: implantTableSelections[category][row] },
  }));
  setImplantTableEditingCell((prev) => ({
    ...prev,
    [category]: { ...prev[category], [row]: true },
  }));
};

const implantTableSaveEdit = (category, row) => {
  setImplantTableSelections((prev) => ({
    ...prev,
    [category]: { ...prev[category], [row]: implantTableTempSelections[category][row] },
  }));
  setImplantTableEditingCell((prev) => ({
    ...prev,
    [category]: { ...prev[category], [row]: false },
  }));
};

const implantTableCancelEdit = (category, row) => {
  setImplantTableTempSelections((prev) => ({
    ...prev,
    [category]: { ...prev[category], [row]: implantTableSelections[category][row] },
  }));
  setImplantTableEditingCell((prev) => ({
    ...prev,
    [category]: { ...prev[category], [row]: false },
  }));
};


  const [showsurgeryreport, setshowsurgeryreport] = useState(true);

  const [isEditingHospital, setIsEditingHospital] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState("Parvathy Hospital"); // stored value
  const [tempHospital, setTempHospital] = useState(selectedHospital); // temporary editing value

  const handleSaveHospital = () => {
    setSelectedHospital(tempHospital); // save temp to main
    setIsEditingHospital(false);
    // Optionally save to API here
  };

  const handleCancelHospital = () => {
    setTempHospital(selectedHospital); // revert temp to stored value
    setIsEditingHospital(false);
  };

  const [isEditingAnaesthetic, setIsEditingAnaesthetic] = useState(false);
  const [selectedType, setSelectedType] = useState("General"); // stored value
  const [tempType, setTempType] = useState(selectedType); // temporary editing value

  const types = ["General", "NerveBlock", "Epidural", "Spinal (Intrathecal)"];

  const handleSelectType = (type) => {
    setTempType(type); // update temp value only
  };

  const handleSaveAnaesthetic = () => {
    setSelectedType(tempType); // save temp to main
    setIsEditingAnaesthetic(false);
  };

  const handleCancelAnaesthetic = () => {
    setTempType(selectedType); // revert temp to stored value
    setIsEditingAnaesthetic(false);
  };

  const [isEditingASA, setIsEditingASA] = useState(false);
  const [selectedASA, setSelectedASA] = useState("1"); // stored value
  const [tempASA, setTempASA] = useState(""); // temporary editing value

  const asaGrades = ["1", "2", "3", "4", "5"];

  const handleSaveASA = () => {
    setSelectedASA(tempASA); // save temp to main
    setIsEditingASA(false);
    // Optionally save to API here
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
    setTempValues(values[tp]); // copy current values for editing
  };

  const handleSave = (tp) => {
    setValues({ ...values, [tp]: tempValues });
    setEditingTimepoint(null);
  };

  const handleCancel = () => {
    setEditingTimepoint(null);
    setTempValues({});
  };

  const handleChange = (tp, motion, val) => {
    setTempValues({ ...tempValues, [motion]: val });
  };

   const [isEditingConsultant, setIsEditingConsultant] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState("Dr. Vetri Kumar");
  const [sameForSurgeon, setSameForSurgeon] = useState(false);
  const [tempConsultant, setTempConsultant] = useState(selectedConsultant);
  const [tempSame, setTempSame] = useState(sameForSurgeon);

  const handleEditConsultant = () => {
    setTempConsultant(selectedConsultant);
    setTempSame(sameForSurgeon);
    setIsEditingConsultant(true);
  };

  const handleSaveConsultant = () => {
    setSelectedConsultant(tempConsultant);
    setSameForSurgeon(tempSame);
    setIsEditingConsultant(false);
    // Optionally save to API
  };

  const handleCancelConsultant = () => {
    setTempConsultant(selectedConsultant);
    setTempSame(sameForSurgeon);
    setIsEditingConsultant(false);
  };

  const [isEditingSurgeon, setIsEditingSurgeon] = useState(false);
  const [selectedSurgeon, setSelectedSurgeon] = useState("Dr. Vetri Kumar");
  const [tempSurgeon, setTempSurgeon] = useState(selectedSurgeon);

  const handleSaveSurgeon = () => {
    setSelectedSurgeon(tempSurgeon);
    setIsEditingSurgeon(false);
  };

  const handleCancelSurgeon = () => {
    setTempSurgeon(selectedSurgeon);
    setIsEditingSurgeon(false);
  };

  const [isEditingAssistant, setIsEditingAssistant] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState("Dr. Vinod Kumar");
  const [tempAssistant, setTempAssistant] = useState(selectedAssistant);

  const handleSaveAssistant = () => {
    setSelectedAssistant(tempAssistant);
    setIsEditingAssistant(false);
  };

  const handleCancelAssistant = () => {
    setTempAssistant(selectedAssistant);
    setIsEditingAssistant(false);
  };

  const [isEditingSecondAssistant, setIsEditingSecondAssistant] = useState(false);
  const [selectedSecondAssistant, setSelectedSecondAssistant] = useState("Dr. Milan Adhikari");
  const [tempSecondAssistant, setTempSecondAssistant] = useState(selectedSecondAssistant);

  const handleSaveSecondAssistant = () => {
    setSelectedSecondAssistant(tempSecondAssistant);
    setIsEditingSecondAssistant(false);
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
  const [selectedProcedure, setSelectedProcedure] = useState("Primary TKA");
  const [tempProcedure, setTempProcedure] = useState(selectedProcedure);

  const handleEditProcedure = () => {
    setTempProcedure(selectedProcedure);
    setIsEditingProcedure(true);
  };

  const handleSaveProcedure = () => {
    setSelectedProcedure(tempProcedure);
    setIsEditingProcedure(false);
    // Optionally, save to API here
  };

  const handleCancelProcedure = () => {
    setTempProcedure(selectedProcedure);
    setIsEditingProcedure(false);
  };


  const sides = ["LEFT KNEE", "RIGHT KNEE"];
  
  const [isEditingSide, setIsEditingSide] = useState(false);
  const [selectedSides, setSelectedSides] = useState(["LEFT KNEE"]);
  const [tempSides, setTempSides] = useState([...selectedSides]);

  const handleEditSide = () => {
    setTempSides([...selectedSides]);
    setIsEditingSide(true);
  };

  const handleSaveSide = () => {
    setSelectedSides([...tempSides]);
    setIsEditingSide(false);
    // Optionally save to API here
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

  const deformities = ["Varus", "Valgus", "Flexion Contraction", "Recurvatum Deformity"];
  
  const [isEditingDeformity, setIsEditingDeformity] = useState(false);
  const [selectedDeformity, setSelectedDeformity] = useState([]); // for multi-select
  const [tempDeformity, setTempDeformity] = useState([]);

  const handleEditDeformity = () => {
    setTempDeformity([...selectedDeformity]);
    setIsEditingDeformity(true);
  };

  const handleSaveDeformity = () => {
    setSelectedDeformity([...tempDeformity]);
    setIsEditingDeformity(false);
    // Optionally save to API here
  };

  const handleCancelDeformity = () => {
    setTempDeformity([...selectedDeformity]);
    setIsEditingDeformity(false);
  };

  const handleToggleDeformity = (grade) => {
    if (tempDeformity.includes(grade)) {
      setTempDeformity(tempDeformity.filter((d) => d !== grade));
    } else {
      setTempDeformity([...tempDeformity, grade]);
    }
  };

  const techOptions = ["Computer Guide", "Robotic", "PSI", "Conventional Instruments"];

  const [isEditingTech, setIsEditingTech] = useState(false);
  const [selectedTech, setSelectedTech] = useState(""); // single select
  const [tempTech, setTempTech] = useState("");

  const handleEditTech = () => {
    setTempTech(selectedTech);
    setIsEditingTech(true);
  };

  const handleSaveTech = () => {
    setSelectedTech(tempTech);
    setIsEditingTech(false);
    // Optionally save to API
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

  const handleSaveAlignment = () => {
    setSelectedAlignment(tempAlignment);
    setIsEditingAlignment(false);
    // Optionally save to API
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

  const handleSaveTorque = () => {
    setSelectedTorque(tempTorque);
    setIsEditingTorque(false);
    // Optionally save to API
  };

  const handleCancelTorque = () => {
    setTempTorque(selectedTorque);
    setIsEditingTorque(false);
  };

  const [isEditingTime, setIsEditingTime] = useState(false);
  const [timeValue, setTimeValue] = useState(""); // stored value
  const [tempTimeValue, setTempTimeValue] = useState("");

  const handleEditTime = () => {
    setTempTimeValue(timeValue);
    setIsEditingTime(true);
  };

  const handleSaveTime = () => {
    setTimeValue(tempTimeValue);
    setIsEditingTime(false);
    // Optionally save to API
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

  const handleSaveTorqued = () => {
    setSelectedTorqued(tempTorqued);
    setIsEditingTorqued(false);
    // Optionally save to API
  };

  const handleCancelTorqued = () => {
    setTempTorqued(selectedTorqued);
    setIsEditingTorqued(false);
  };

  // Values
  const [distalMedialUnwornWorn, setDistalMedialUnwornWorn] = useState("Unworn"); // stored value
  const [tempDistalMedialUnwornWorn, setTempDistalMedialUnwornWorn] = useState(distalMedialUnwornWorn); // temporary editing value
  const [isEditingDistalMedialUnwornWorn, setIsEditingDistalMedialUnwornWorn] = useState(false);

  // Functions
  const handleEditDistalMedialUnwornWorn = () => setIsEditingDistalMedialUnwornWorn(true);
  const handleSaveDistalMedialUnwornWorn = () => {
    setDistalMedialUnwornWorn(tempDistalMedialUnwornWorn);
    setIsEditingDistalMedialUnwornWorn(false);
  };
  const handleCancelDistalMedialUnwornWorn = () => {
    setTempDistalMedialUnwornWorn(distalMedialUnwornWorn);
    setIsEditingDistalMedialUnwornWorn(false);
  };

  const [distalMedialInitialThickness, setDistalMedialInitialThickness] = useState(""); // stored value
  const [tempDistalMedialInitialThickness, setTempDistalMedialInitialThickness] = useState(distalMedialInitialThickness);
  const [isEditingDistalMedialInitialThickness, setIsEditingDistalMedialInitialThickness] = useState(false);

  const handleEditDistalMedialInitialThickness = () => setIsEditingDistalMedialInitialThickness(true);
  const handleSaveDistalMedialInitialThickness = () => {
    setDistalMedialInitialThickness(tempDistalMedialInitialThickness);
    setIsEditingDistalMedialInitialThickness(false);
  };
  const handleCancelDistalMedialInitialThickness = () => {
    setTempDistalMedialInitialThickness(distalMedialInitialThickness);
    setIsEditingDistalMedialInitialThickness(false);
  };

    // States for Y/N
    const [distalMedialRecutYN, setDistalMedialRecutYN] = useState("N");
    const [tempDistalMedialRecutYN, setTempDistalMedialRecutYN] = useState(distalMedialRecutYN);
    const [isEditingDistalMedialRecutYN, setIsEditingDistalMedialRecutYN] = useState(false);

    // States for MM
    const [distalMedialRecutMM, setDistalMedialRecutMM] = useState("0");
    const [tempDistalMedialRecutMM, setTempDistalMedialRecutMM] = useState(distalMedialRecutMM);
    const [isEditingDistalMedialRecutMM, setIsEditingDistalMedialRecutMM] = useState(false);

    // Functions
    const saveDistalMedialRecutYN = () => {
      setDistalMedialRecutYN(tempDistalMedialRecutYN);
      setIsEditingDistalMedialRecutYN(false);
    };

    const cancelDistalMedialRecutYN = () => {
      setTempDistalMedialRecutYN(distalMedialRecutYN);
      setIsEditingDistalMedialRecutYN(false);
    };

    const saveDistalMedialRecutMM = () => {
      setDistalMedialRecutMM(tempDistalMedialRecutMM);
      setIsEditingDistalMedialRecutMM(false);
    };

    const cancelDistalMedialRecutMM = () => {
      setTempDistalMedialRecutMM(distalMedialRecutMM);
      setIsEditingDistalMedialRecutMM(false);
    };


  const [distalMedialWasher, setDistalMedialWasher] = useState("N"); // N or Y
  const [tempDistalMedialWasher, setTempDistalMedialWasher] = useState(distalMedialWasher);

  const [distalMedialWasherMM, setDistalMedialWasherMM] = useState(""); // stored mm value
  const [tempDistalMedialWasherMM, setTempDistalMedialWasherMM] = useState(distalMedialWasherMM);

  const [isEditingDistalMedialWasher, setIsEditingDistalMedialWasher] = useState(false);

  const handleEditDistalMedialWasher = () => setIsEditingDistalMedialWasher(true);
  const handleSaveDistalMedialWasher = () => {
    setDistalMedialWasher(tempDistalMedialWasher);
    setDistalMedialWasherMM(tempDistalMedialWasherMM);
    setIsEditingDistalMedialWasher(false);
  };
  const handleCancelDistalMedialWasher = () => {
    setTempDistalMedialWasher(distalMedialWasher);
    setTempDistalMedialWasherMM(distalMedialWasherMM);
    setIsEditingDistalMedialWasher(false);
  };

  const [distalMedialFinalThickness, setDistalMedialFinalThickness] = useState("");
  const [tempDistalMedialFinalThickness, setTempDistalMedialFinalThickness] = useState(distalMedialFinalThickness);
  const [isEditingDistalMedialFinalThickness, setIsEditingDistalMedialFinalThickness] = useState(false);

  const handleEditDistalMedialFinalThickness = () => setIsEditingDistalMedialFinalThickness(true);
  const handleSaveDistalMedialFinalThickness = () => {
    setDistalMedialFinalThickness(tempDistalMedialFinalThickness);
    setIsEditingDistalMedialFinalThickness(false);
  };
  const handleCancelDistalMedialFinalThickness = () => {
    setTempDistalMedialFinalThickness(distalMedialFinalThickness);
    setIsEditingDistalMedialFinalThickness(false);
  };

    // -------- Unworn / Worn --------
  const [distalLateralUnwornWorn, setDistalLateralUnwornWorn] = useState("Unworn");
  const [tempDistalLateralUnwornWorn, setTempDistalLateralUnwornWorn] = useState(distalLateralUnwornWorn);
  const [isEditingDistalLateralUnwornWorn, setIsEditingDistalLateralUnwornWorn] = useState(false);

  // -------- Initial Thickness --------
  const [distalLateralInitialThickness, setDistalLateralInitialThickness] = useState("");
  const [tempDistalLateralInitialThickness, setTempDistalLateralInitialThickness] = useState(distalLateralInitialThickness);
  const [isEditingDistalLateralInitialThickness, setIsEditingDistalLateralInitialThickness] = useState(false);

  // -------- Recut --------
  const [distalLateralRecutYN, setDistalLateralRecutYN] = useState("N");
  const [tempDistalLateralRecutYN, setTempDistalLateralRecutYN] = useState(distalLateralRecutYN);

  const [distalLateralRecutMM, setDistalLateralRecutMM] = useState("");
  const [tempDistalLateralRecutMM, setTempDistalLateralRecutMM] = useState(distalLateralRecutMM);

  const [isEditingDistalLateralRecutYN, setIsEditingDistalLateralRecutYN] = useState(false);
  const [isEditingDistalLateralRecutMM, setIsEditingDistalLateralRecutMM] = useState(false);

  // Washer Y/N
const [distalLateralWasherYN, setDistalLateralWasherYN] = useState("N");
const [tempDistalLateralWasherYN, setTempDistalLateralWasherYN] = useState(distalLateralWasherYN);
const [isEditingDistalLateralWasherYN, setIsEditingDistalLateralWasherYN] = useState(false);

// Washer MM
const [distalLateralWasherMM, setDistalLateralWasherMM] = useState("");
const [tempDistalLateralWasherMM, setTempDistalLateralWasherMM] = useState(distalLateralWasherMM);
const [isEditingDistalLateralWasherMM, setIsEditingDistalLateralWasherMM] = useState(false);


  // -------- Final Thickness --------
  const [distalLateralFinalThickness, setDistalLateralFinalThickness] = useState("");
  const [tempDistalLateralFinalThickness, setTempDistalLateralFinalThickness] = useState(distalLateralFinalThickness);
  const [isEditingDistalLateralFinalThickness, setIsEditingDistalLateralFinalThickness] = useState(false);

    // -------- Unworn / Worn --------
  const editDistalLateralUnwornWorn = () => setIsEditingDistalLateralUnwornWorn(true);
  const saveDistalLateralUnwornWorn = () => {
    setDistalLateralUnwornWorn(tempDistalLateralUnwornWorn);
    setIsEditingDistalLateralUnwornWorn(false);
  };
  const cancelDistalLateralUnwornWorn = () => {
    setTempDistalLateralUnwornWorn(distalLateralUnwornWorn);
    setIsEditingDistalLateralUnwornWorn(false);
  };

  // -------- Initial Thickness --------
  const editDistalLateralInitialThickness = () => setIsEditingDistalLateralInitialThickness(true);
  const saveDistalLateralInitialThickness = () => {
    setDistalLateralInitialThickness(tempDistalLateralInitialThickness);
    setIsEditingDistalLateralInitialThickness(false);
  };
  const cancelDistalLateralInitialThickness = () => {
    setTempDistalLateralInitialThickness(distalLateralInitialThickness);
    setIsEditingDistalLateralInitialThickness(false);
  };

  // -------- Recut --------
  const saveDistalLateralRecutYN = () => {
    setDistalLateralRecutYN(tempDistalLateralRecutYN);
    setIsEditingDistalLateralRecutYN(false);
  };
  const cancelDistalLateralRecutYN = () => {
    setTempDistalLateralRecutYN(distalLateralRecutYN);
    setIsEditingDistalLateralRecutYN(false);
  };

  const saveDistalLateralRecutMM = () => {
    setDistalLateralRecutMM(tempDistalLateralRecutMM);
    setIsEditingDistalLateralRecutMM(false);
  };
  const cancelDistalLateralRecutMM = () => {
    setTempDistalLateralRecutMM(distalLateralRecutMM);
    setIsEditingDistalLateralRecutMM(false);
  };

  // -------- Washer --------
// Washer Y/N
const saveDistalLateralWasherYN = () => {
  setDistalLateralWasherYN(tempDistalLateralWasherYN);
  setIsEditingDistalLateralWasherYN(false);
};
const cancelDistalLateralWasherYN = () => {
  setTempDistalLateralWasherYN(distalLateralWasherYN);
  setIsEditingDistalLateralWasherYN(false);
};

// Washer MM
const saveDistalLateralWasherMM = () => {
  setDistalLateralWasherMM(tempDistalLateralWasherMM);
  setIsEditingDistalLateralWasherMM(false);
};
const cancelDistalLateralWasherMM = () => {
  setTempDistalLateralWasherMM(distalLateralWasherMM);
  setIsEditingDistalLateralWasherMM(false);
};

  // -------- Final Thickness --------
  const editDistalLateralFinalThickness = () => setIsEditingDistalLateralFinalThickness(true);
  const saveDistalLateralFinalThickness = () => {
    setDistalLateralFinalThickness(tempDistalLateralFinalThickness);
    setIsEditingDistalLateralFinalThickness(false);
  };
  const cancelDistalLateralFinalThickness = () => {
    setTempDistalLateralFinalThickness(distalLateralFinalThickness);
    setIsEditingDistalLateralFinalThickness(false);
  };

// Unworn / Worn
const [postMedUnwornWorn, setPostMedUnwornWorn] = useState("Unworn");
const [tempPostMedUnwornWorn, setTempPostMedUnwornWorn] = useState(postMedUnwornWorn);
const [isEditingPostMedUnwornWorn, setIsEditingPostMedUnwornWorn] = useState(false);

// Initial Thickness
const [postMedInitialThickness, setPostMedInitialThickness] = useState("");
const [tempPostMedInitialThickness, setTempPostMedInitialThickness] = useState(postMedInitialThickness);
const [isEditingPostMedInitialThickness, setIsEditingPostMedInitialThickness] = useState(false);

// Recut Y/N
const [postMedRecutYN, setPostMedRecutYN] = useState("N");
const [tempPostMedRecutYN, setTempPostMedRecutYN] = useState(postMedRecutYN);
const [isEditingPostMedRecutYN, setIsEditingPostMedRecutYN] = useState(false);

// Recut MM
const [postMedRecutMM, setPostMedRecutMM] = useState("0");
const [tempPostMedRecutMM, setTempPostMedRecutMM] = useState(postMedRecutMM);
const [isEditingPostMedRecutMM, setIsEditingPostMedRecutMM] = useState(false);

// Final Thickness
const [postMedFinalThickness, setPostMedFinalThickness] = useState("");
const [tempPostMedFinalThickness, setTempPostMedFinalThickness] = useState(postMedFinalThickness);
const [isEditingPostMedFinalThickness, setIsEditingPostMedFinalThickness] = useState(false);

// Unworn / Worn
const savePostMedUnwornWorn = () => { setPostMedUnwornWorn(tempPostMedUnwornWorn); setIsEditingPostMedUnwornWorn(false); }
const cancelPostMedUnwornWorn = () => { setTempPostMedUnwornWorn(postMedUnwornWorn); setIsEditingPostMedUnwornWorn(false); }

// Initial Thickness
const savePostMedInitialThickness = () => { setPostMedInitialThickness(tempPostMedInitialThickness); setIsEditingPostMedInitialThickness(false); }
const cancelPostMedInitialThickness = () => { setTempPostMedInitialThickness(postMedInitialThickness); setIsEditingPostMedInitialThickness(false); }

// Recut Y/N
const savePostMedRecutYN = () => { setPostMedRecutYN(tempPostMedRecutYN); setIsEditingPostMedRecutYN(false); }
const cancelPostMedRecutYN = () => { setTempPostMedRecutYN(postMedRecutYN); setIsEditingPostMedRecutYN(false); }

// Recut MM
const savePostMedRecutMM = () => { setPostMedRecutMM(tempPostMedRecutMM); setIsEditingPostMedRecutMM(false); }
const cancelPostMedRecutMM = () => { setTempPostMedRecutMM(postMedRecutMM); setIsEditingPostMedRecutMM(false); }

// Final Thickness
const savePostMedFinalThickness = () => { setPostMedFinalThickness(tempPostMedFinalThickness); setIsEditingPostMedFinalThickness(false); }
const cancelPostMedFinalThickness = () => { setTempPostMedFinalThickness(postMedFinalThickness); setIsEditingPostMedFinalThickness(false); }

// Unworn / Worn
const [postLatUnwornWorn, setPostLatUnwornWorn] = useState("Unworn");
const [tempPostLatUnwornWorn, setTempPostLatUnwornWorn] = useState(postLatUnwornWorn);
const [isEditingPostLatUnwornWorn, setIsEditingPostLatUnwornWorn] = useState(false);

// Initial Thickness
const [postLatInitialThickness, setPostLatInitialThickness] = useState("");
const [tempPostLatInitialThickness, setTempPostLatInitialThickness] = useState(postLatInitialThickness);
const [isEditingPostLatInitialThickness, setIsEditingPostLatInitialThickness] = useState(false);

// Recut Y/N
const [postLatRecutYN, setPostLatRecutYN] = useState("N");
const [tempPostLatRecutYN, setTempPostLatRecutYN] = useState(postLatRecutYN);
const [isEditingPostLatRecutYN, setIsEditingPostLatRecutYN] = useState(false);

// Recut MM
const [postLatRecutMM, setPostLatRecutMM] = useState("0");
const [tempPostLatRecutMM, setTempPostLatRecutMM] = useState(postLatRecutMM);
const [isEditingPostLatRecutMM, setIsEditingPostLatRecutMM] = useState(false);

// Final Thickness
const [postLatFinalThickness, setPostLatFinalThickness] = useState("");
const [tempPostLatFinalThickness, setTempPostLatFinalThickness] = useState(postLatFinalThickness);
const [isEditingPostLatFinalThickness, setIsEditingPostLatFinalThickness] = useState(false);


// Unworn / Worn
const savePostLatUnwornWorn = () => { setPostLatUnwornWorn(tempPostLatUnwornWorn); setIsEditingPostLatUnwornWorn(false); }
const cancelPostLatUnwornWorn = () => { setTempPostLatUnwornWorn(postLatUnwornWorn); setIsEditingPostLatUnwornWorn(false); }

// Initial Thickness
const savePostLatInitialThickness = () => { setPostLatInitialThickness(tempPostLatInitialThickness); setIsEditingPostLatInitialThickness(false); }
const cancelPostLatInitialThickness = () => { setTempPostLatInitialThickness(postLatInitialThickness); setIsEditingPostLatInitialThickness(false); }

// Recut Y/N
const savePostLatRecutYN = () => { setPostLatRecutYN(tempPostLatRecutYN); setIsEditingPostLatRecutYN(false); }
const cancelPostLatRecutYN = () => { setTempPostLatRecutYN(postLatRecutYN); setIsEditingPostLatRecutYN(false); }

// Recut MM
const savePostLatRecutMM = () => { setPostLatRecutMM(tempPostLatRecutMM); setIsEditingPostLatRecutMM(false); }
const cancelPostLatRecutMM = () => { setTempPostLatRecutMM(postLatRecutMM); setIsEditingPostLatRecutMM(false); }

// Final Thickness
const savePostLatFinalThickness = () => { setPostLatFinalThickness(tempPostLatFinalThickness); setIsEditingPostLatFinalThickness(false); }
const cancelPostLatFinalThickness = () => { setTempPostLatFinalThickness(postLatFinalThickness); setIsEditingPostLatFinalThickness(false); }

// Worn / Unworn
const [tibialLeftWorn, setTibialLeftWorn] = useState("Worn");
const [tempTibialLeftWorn, setTempTibialLeftWorn] = useState(tibialLeftWorn);
const [isEditingTibialLeftWorn, setIsEditingTibialLeftWorn] = useState(false);

// Thickness MM
const [tibialLeftMM, setTibialLeftMM] = useState("");
const [tempTibialLeftMM, setTempTibialLeftMM] = useState(tibialLeftMM);
const [isEditingTibialLeftMM, setIsEditingTibialLeftMM] = useState(false);

// Worn / Unworn
const saveTibialLeftWorn = () => { setTibialLeftWorn(tempTibialLeftWorn); setIsEditingTibialLeftWorn(false); }
const cancelTibialLeftWorn = () => { setTempTibialLeftWorn(tibialLeftWorn); setIsEditingTibialLeftWorn(false); }

// MM
const saveTibialLeftMM = () => { setTibialLeftMM(tempTibialLeftMM); setIsEditingTibialLeftMM(false); }
const cancelTibialLeftMM = () => { setTempTibialLeftMM(tibialLeftMM); setIsEditingTibialLeftMM(false); }

// Worn / Unworn
const [tibialRightWorn, setTibialRightWorn] = useState("Worn");
const [tempTibialRightWorn, setTempTibialRightWorn] = useState(tibialRightWorn);
const [isEditingTibialRightWorn, setIsEditingTibialRightWorn] = useState(false);

// Thickness MM
const [tibialRightMM, setTibialRightMM] = useState("");
const [tempTibialRightMM, setTempTibialRightMM] = useState(tibialRightMM);
const [isEditingTibialRightMM, setIsEditingTibialRightMM] = useState(false);

// Worn / Unworn
const saveTibialRightWorn = () => { setTibialRightWorn(tempTibialRightWorn); setIsEditingTibialRightWorn(false); }
const cancelTibialRightWorn = () => { setTempTibialRightWorn(tibialRightWorn); setIsEditingTibialRightWorn(false); }

// MM
const saveTibialRightMM = () => { setTibialRightMM(tempTibialRightMM); setIsEditingTibialRightMM(false); }
const cancelTibialRightMM = () => { setTempTibialRightMM(tibialRightMM); setIsEditingTibialRightMM(false); }

const [pclCondition, setPclCondition] = useState("Intact");
const [tempPclCondition, setTempPclCondition] = useState(pclCondition);
const [isEditingPclCondition, setIsEditingPclCondition] = useState(false);

const savePclCondition = () => {
  setPclCondition(tempPclCondition);
  setIsEditingPclCondition(false);
};
const cancelPclCondition = () => {
  setTempPclCondition(pclCondition);
  setIsEditingPclCondition(false);
};

const [tibialVVRecutYN, setTibialVVRecutYN] = useState("N");
const [tempTibialVVRecutYN, setTempTibialVVRecutYN] = useState(tibialVVRecutYN);
const [isEditingTibialVVRecutYN, setIsEditingTibialVVRecutYN] = useState(false);

const [tibialVVRecutMM, setTibialVVRecutMM] = useState("");
const [tempTibialVVRecutMM, setTempTibialVVRecutMM] = useState(tibialVVRecutMM);
const [isEditingTibialVVRecutMM, setIsEditingTibialVVRecutMM] = useState(false);

const saveTibialVVRecutYN = () => {
  setTibialVVRecutYN(tempTibialVVRecutYN);
  setIsEditingTibialVVRecutYN(false);
};
const cancelTibialVVRecutYN = () => {
  setTempTibialVVRecutYN(tibialVVRecutYN);
  setIsEditingTibialVVRecutYN(false);
};

const saveTibialVVRecutMM = () => {
  setTibialVVRecutMM(tempTibialVVRecutMM);
  setIsEditingTibialVVRecutMM(false);
};
const cancelTibialVVRecutMM = () => {
  setTempTibialVVRecutMM(tibialVVRecutMM);
  setIsEditingTibialVVRecutMM(false);
};

const [tibialSlopeRecutYN, setTibialSlopeRecutYN] = useState("N");
const [tempTibialSlopeRecutYN, setTempTibialSlopeRecutYN] = useState(tibialSlopeRecutYN);
const [isEditingTibialSlopeRecutYN, setIsEditingTibialSlopeRecutYN] = useState(false);

const [tibialSlopeRecutMM, setTibialSlopeRecutMM] = useState("");
const [tempTibialSlopeRecutMM, setTempTibialSlopeRecutMM] = useState(tibialSlopeRecutMM);
const [isEditingTibialSlopeRecutMM, setIsEditingTibialSlopeRecutMM] = useState(false);

const saveTibialSlopeRecutYN = () => {
  setTibialSlopeRecutYN(tempTibialSlopeRecutYN);
  setIsEditingTibialSlopeRecutYN(false);
};
const cancelTibialSlopeRecutYN = () => {
  setTempTibialSlopeRecutYN(tibialSlopeRecutYN);
  setIsEditingTibialSlopeRecutYN(false);
};

const saveTibialSlopeRecutMM = () => {
  setTibialSlopeRecutMM(tempTibialSlopeRecutMM);
  setIsEditingTibialSlopeRecutMM(false);
};
const cancelTibialSlopeRecutMM = () => {
  setTempTibialSlopeRecutMM(tibialSlopeRecutMM);
  setIsEditingTibialSlopeRecutMM(false);
};

const [finalCheckOptions, setFinalCheckOptions] = useState([
  "Negligible V-V Laxity in extenstion",
  "2-3 mm of lateral opening with Varus load in 15-30° of flexion"
]);

const [selectedFinalCheck, setSelectedFinalCheck] = useState([]);
const [tempSelectedFinalCheck, setTempSelectedFinalCheck] = useState(selectedFinalCheck);
const [isEditingFinalCheck, setIsEditingFinalCheck] = useState(false);

const toggleTempFinalCheck = (option) => {
  if (tempSelectedFinalCheck.includes(option)) {
    setTempSelectedFinalCheck(tempSelectedFinalCheck.filter(item => item !== option));
  } else {
    setTempSelectedFinalCheck([...tempSelectedFinalCheck, option]);
  }
};

const saveFinalCheck = () => {
  setSelectedFinalCheck(tempSelectedFinalCheck);
  setIsEditingFinalCheck(false);
};

const cancelFinalCheck = () => {
  setTempSelectedFinalCheck(selectedFinalCheck);
  setIsEditingFinalCheck(false);
};

const [tableData, setTableData] = useState(
  [10,11,12,13,14].map(val => ({
    insertThickness: val,
    numTicks: "",
    extOrient: "",
    flex90Orient: "",
    liftOff: "", // "Y" or "N"
    editing: {
      numTicks: false,
      extOrient: false,
      flex90Orient: false,
      liftOff: false
    }
  }))
);

const startEdit = (rowIdx, field) => {
  setTableData(prev => prev.map((r,i) => i===rowIdx ? {
    ...r,
    editing: {...r.editing, [field]: true},
    temp: {...r} // store temp values for editing
  } : r));
};

const cancelEdit = (rowIdx, field) => {
  setTableData(prev => prev.map((r,i) => i===rowIdx ? {
    ...r,
    editing: {...r.editing, [field]: false},
    temp: undefined
  } : r));
};

const saveEdit = (rowIdx, field) => {
  setTableData(prev => prev.map((r,i) => i===rowIdx ? {
    ...r,
    [field]: r.temp[field],
    editing: {...r.editing, [field]: false},
    temp: undefined
  } : r));
};

const updateTemp = (rowIdx, field, value) => {
  setTableData(prev => prev.map((r,i) => i===rowIdx ? {
    ...r,
    temp: {...r.temp, [field]: value}
  } : r));
};

// State variables
const [pfjResurf, setPFJResurf] = useState("");          // Saved value
const [tempPFJResurf, setTempPFJResurf] = useState("");  // Temporary editing value
const [isEditingPFJResurf, setIsEditingPFJResurf] = useState(false);

// Functions

// Save the temporary value as the main value and exit edit mode
const savePFJResurf = () => {
  setPFJResurf(tempPFJResurf);
  setIsEditingPFJResurf(false);
};

// Cancel editing and revert temporary value
const cancelPFJResurf = () => {
  setTempPFJResurf(pfjResurf); // Revert temp value to saved value
  setIsEditingPFJResurf(false);
};

// State variables
const [trachelaResection, setTrachelaResection] = useState("");       // Saved value
const [tempTrachelaResection, setTempTrachelaResection] = useState(""); // Temporary value for editing
const [isEditingTrachelaResection, setIsEditingTrachelaResection] = useState(false);

// Functions

// Save the temporary value
const saveTrachelaResection = () => {
  setTrachelaResection(tempTrachelaResection);
  setIsEditingTrachelaResection(false);
};

// Cancel editing
const cancelTrachelaResection = () => {
  setTempTrachelaResection(trachelaResection); // Revert temp to saved value
  setIsEditingTrachelaResection(false);
};

// State variables
const [patella, setPatella] = useState("");               // Saved value
const [tempPatella, setTempPatella] = useState("");       // Temporary value for editing
const [isEditingPatella, setIsEditingPatella] = useState(false);

// Functions
const savePatella = () => {
  setPatella(tempPatella);
  setIsEditingPatella(false);
};

const cancelPatella = () => {
  setTempPatella(patella); // Revert temp to saved value
  setIsEditingPatella(false);
};

// State variables
const [preResurfacingThickness, setPreResurfacingThickness] = useState("");      // Saved value
const [tempPreResurfacingThickness, setTempPreResurfacingThickness] = useState(""); // Temporary value during editing
const [isEditingPreResurfacing, setIsEditingPreResurfacing] = useState(false);

// Functions
const savePreResurfacing = () => {
  setPreResurfacingThickness(tempPreResurfacingThickness);
  setIsEditingPreResurfacing(false);
};

const cancelPreResurfacing = () => {
  setTempPreResurfacingThickness(preResurfacingThickness); // Revert to saved value
  setIsEditingPreResurfacing(false);
};

const [postResurfacingThickness, setPostResurfacingThickness] = useState(""); 
const [tempPostResurfacingThickness, setTempPostResurfacingThickness] = useState("");
const [isEditingPostResurfacing, setIsEditingPostResurfacing] = useState(false);

// Functions
const savePostResurfacing = () => {
  setPostResurfacingThickness(tempPostResurfacingThickness);
  setIsEditingPostResurfacing(false);
};

const cancelPostResurfacing = () => {
  setTempPostResurfacingThickness(postResurfacingThickness);
  setIsEditingPostResurfacing(false);
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
              src={ManAvatar}
              alt="Patient"
              className={`w-[60px] h-[60px]`}
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
                  width < 400 ? "w-full" : "w-2/5"
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
              <p
                className={`${width < 400 ? "w-full" : "w-1/5"} ${
                  inter.className
                } text-end font-semibold text-[15px] text-[#484848]`}
              >
                BMI: 27
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

      {showsurgeryreport && (
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
                      {selectedHospital}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={() => setIsEditingHospital(true)}
                    />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempHospital}
                      onChange={(e) => setTempHospital(e.target.value)}
                    >
                      <option>Parvathy Hospital</option>
                      <option>ABC Hospital</option>
                      <option>XYZ Hospital</option>
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
                      {selectedType}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={() => setIsEditingAnaesthetic(true)}
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
                    onClick={() => setIsEditingASA(true)}
                  >
                    <span
                      className={`${raleway.className} text-sm text-[#272727] font-semibold`}
                    >
                      {selectedASA || "Select ASA Grade"}
                    </span>
                    <PencilIcon className="w-5 h-5 text-gray-600" />
                  </div>
                ) : (
                  <div
                    className={`${raleway.className} pt-4 flex flex-wrap gap-8 pl-4`}
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
                            type="checkbox"
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

                    <div className="flex items-center space-x-2 mt-4">
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
                <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                  1. Consultant IN-CHARGE
                </label>

                {!isEditingConsultant ? (
                  <div className="flex flex-col gap-4 w-60">
                    <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                      <span className={`${inter.className} text-[#272727] font-semibold text-sm`}>
                        {selectedConsultant}
                      </span>
                      <PencilIcon
                        className="w-5 h-5 text-gray-600 cursor-pointer"
                        onClick={handleEditConsultant}
                      />
                    </div>
                   
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempConsultant}
                      onChange={(e) => setTempConsultant(e.target.value)}
                    >
                      <option>Dr. Vetri Kumar</option>
                      <option>Dr. ABC</option>
                      <option>Dr. XYZ</option>
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
                <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                  2. Operating Surgeon
                </label>

                {!isEditingSurgeon ? (
                  <div className="flex flex-col gap-4 w-60">
                    <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                      <span className={`${inter.className} text-[#272727] font-semibold text-sm`}>
                        {selectedSurgeon}
                      </span>
                      <PencilIcon
                        className="w-5 h-5 text-gray-600 cursor-pointer"
                        onClick={() => setIsEditingSurgeon(true)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempSurgeon}
                      onChange={(e) => setTempSurgeon(e.target.value)}
                    >
                      <option>Dr. Vetri Kumar</option>
                      <option>Dr. ABC</option>
                      <option>Dr. XYZ</option>
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
                <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                  3. First Assistant
                </label>

                {!isEditingAssistant ? (
                  <div className="flex flex-col gap-4 w-60">
                    <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                      <span className={`${inter.className} text-[#272727] font-semibold text-sm`}>
                        {selectedAssistant}
                      </span>
                      <PencilIcon
                        className="w-5 h-5 text-gray-600 cursor-pointer"
                        onClick={() => setIsEditingAssistant(true)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-2 w-60">
                    <select
                      className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                      value={tempAssistant}
                      onChange={(e) => setTempAssistant(e.target.value)}
                    >
                      <option>Dr. Vinod Kumar</option>
                      <option>Dr. ABC</option>
                      <option>Dr. XYZ</option>
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
              <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                4. Second Assistant
              </label>

              {!isEditingSecondAssistant ? (
                <div className="flex flex-col gap-4 w-60">
                  <div className="flex items-center justify-between px-4 py-2 rounded bg-white">
                    <span className={`${inter.className} text-[#272727] font-semibold text-sm`}>
                      {selectedSecondAssistant}
                    </span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-600 cursor-pointer"
                      onClick={() => setIsEditingSecondAssistant(true)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row items-center gap-2 w-60">
                  <select
                    className={`${inter.className} border border-gray-300 rounded px-4 py-2 w-full text-sm text-black/55`}
                    value={tempSecondAssistant}
                    onChange={(e) => setTempSecondAssistant(e.target.value)}
                  >
                    <option>Dr. Milan Adhikari</option>
                    <option>Dr. ABC</option>
                    <option>Dr. XYZ</option>
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
                  <span className={`text-sm ${inter.className} text-[#272727] font-semibold`}>
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
                <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                  Side
                </label>

                {!isEditingSide ? (
                  <div className="flex items-center gap-2">
                    <span className={`${raleway.className} text-base font-semibold text-black`}>
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
                          <span className={`${raleway.className} text-base font-semibold text-black`}>
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
                <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                  Deformity
                </label>

                {!isEditingDeformity ? (
                  <div className="flex items-center gap-2">
                    <span className={`${raleway.className} text-sm font-semibold text-[#272727]`}>
                      {selectedDeformity.length > 0 ? selectedDeformity.join(", ") : "Select"}
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
                          <span className={`${raleway.className} text-xs font-semibold text-[#272727]`}>
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
                <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                  Technological Assistance
                </label>

                {!isEditingTech ? (
                  <div className="flex items-center gap-2">
                    <span className={`${raleway.className} text-sm font-semibold text-[#272727]`}>
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
                        <label key={grade} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="techAssistance"
                            value={grade}
                            checked={tempTech === grade}
                            onChange={() => setTempTech(grade)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span className={`${raleway.className} text-xs font-semibold text-[#272727]`}>
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
                <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                  Alignment Philosophy
                </label>

                {!isEditingAlignment ? (
                  <div className="flex items-center gap-2">
                    <span className={`${raleway.className} text-sm font-semibold text-[#272727]`}>
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
                        <label key={grade} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="alignmentPhilosophy"
                            value={grade}
                            checked={tempAlignment === grade}
                            onChange={() => setTempAlignment(grade)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span className={`${raleway.className} text-xs font-semibold text-[#272727]`}>
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
                      <span className={`${raleway.className} text-sm font-semibold text-[#272727]`}>
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
                        <label key={option} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="torqueUsed"
                            value={option}
                            checked={tempTorque === option}
                            onChange={() => setTempTorque(option)}
                            className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                          />
                          <span className={`${raleway.className} text-xs font-semibold text-[#272727]`}>
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
                <div className={`space-x-12 flex flex-row  `}>
                  <div className="relative w-52">
                    <p
                      className={`${poppins.className} font-medium text-black text-sm  px-4 py-2`}
                    >
                      20-08-2025
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
                        <span className={`${poppins.className} font-medium text-sm text-black`}>
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
                            onChange={(e) => setTempTimeValue(e.target.value)}
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
                      <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>
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
                          <label key={option} className="flex items-center space-x-4 cursor-pointer">
                            <input
                              type="radio"
                              name="torquedStructure"
                              value={option}
                              checked={tempTorqued === option}
                              onChange={() => setTempTorqued(option)}
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span className={`text-xs text-[#272727] ${raleway.className} font-semibold`}>
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
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Unworn / Worn</label>
                          {!isEditingDistalMedialUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalMedialUnwornWorn}</span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingDistalMedialUnwornWorn(true)}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn", "Worn"].map((option) => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="distalMedialUnwornWorn"
                                    value={option}
                                    checked={tempDistalMedialUnwornWorn === option}
                                    onChange={(e) => setTempDistalMedialUnwornWorn(e.target.value)}
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className="text-xs text-[#272727]">{option}</span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={() => {
                                  setDistalMedialUnwornWorn(tempDistalMedialUnwornWorn);
                                  setIsEditingDistalMedialUnwornWorn(false);
                                }}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setTempDistalMedialUnwornWorn(distalMedialUnwornWorn);
                                  setIsEditingDistalMedialUnwornWorn(false);
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Initial Thickness</label>
                          {!isEditingDistalMedialInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalMedialInitialThickness} mm</span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingDistalMedialInitialThickness(true)}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <input
                                type="text"
                                value={tempDistalMedialInitialThickness}
                                onChange={(e) => setTempDistalMedialInitialThickness(e.target.value)}
                                className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"
                              />
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={() => {
                                  setDistalMedialInitialThickness(tempDistalMedialInitialThickness);
                                  setIsEditingDistalMedialInitialThickness(false);
                                }}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setTempDistalMedialInitialThickness(distalMedialInitialThickness);
                                  setIsEditingDistalMedialInitialThickness(false);
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Recut</label>
                          {/* Distal Medial Recut Block */}
                          <div className="flex items-center w-1/2 gap-4">
                            {/* Radio (Y/N) */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalMedialRecutYN ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>
                                    {distalMedialRecutYN}
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() => setIsEditingDistalMedialRecutYN(true)}
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
                                      onChange={(e) => setTempDistalMedialRecutYN(e.target.value)}
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className="text-xs text-[#272727]">N</span>
                                  </label>

                                  <label className="flex items-center gap-1 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="distalMedialRecutYN"
                                      value="Y"
                                      checked={tempDistalMedialRecutYN === "Y"}
                                      onChange={(e) => setTempDistalMedialRecutYN(e.target.value)}
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className="text-xs text-[#272727]">Y</span>
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
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>
                                    {distalMedialRecutMM} mm
                                  </span>
                                  <PencilIcon
                                    className="w-4 h-4 text-gray-600 cursor-pointer"
                                    onClick={() => setIsEditingDistalMedialRecutMM(true)}
                                  />
                                </>
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    value={tempDistalMedialRecutMM}
                                    onChange={(e) => setTempDistalMedialRecutMM(e.target.value)}
                                    className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"
                                  />
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
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Washer</label>
                          {!isEditingDistalMedialWasher ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalMedialWasher} {distalMedialWasherMM} mm</span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingDistalMedialWasher(true)}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["N", "Y"].map((option) => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="distalMedialWasher"
                                    value={option}
                                    checked={tempDistalMedialWasher === option}
                                    onChange={(e) => setTempDistalMedialWasher(e.target.value)}
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className="text-xs text-[#272727]">{option}</span>
                                </label>
                              ))}
                              <input
                                type="text"
                                value={tempDistalMedialWasherMM}
                                onChange={(e) => setTempDistalMedialWasherMM(e.target.value)}
                                className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"
                              />
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={() => {
                                  setDistalMedialWasher(tempDistalMedialWasher);
                                  setDistalMedialWasherMM(tempDistalMedialWasherMM);
                                  setIsEditingDistalMedialWasher(false);
                                }}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setTempDistalMedialWasher(distalMedialWasher);
                                  setTempDistalMedialWasherMM(distalMedialWasherMM);
                                  setIsEditingDistalMedialWasher(false);
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {/* 5. Final Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Final Thickness</label>
                          {!isEditingDistalMedialFinalThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalMedialFinalThickness} mm</span>
                              <PencilIcon
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                                onClick={() => setIsEditingDistalMedialFinalThickness(true)}
                              />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <input
                                type="text"
                                value={tempDistalMedialFinalThickness}
                                onChange={(e) => setTempDistalMedialFinalThickness(e.target.value)}
                                className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"
                              />
                              <ClipboardDocumentCheckIcon
                                className="w-5 h-5 text-green-600 cursor-pointer"
                                onClick={() => {
                                  setDistalMedialFinalThickness(tempDistalMedialFinalThickness);
                                  setIsEditingDistalMedialFinalThickness(false);
                                }}
                              />
                              <XMarkIcon
                                className="w-5 h-5 text-red-600 cursor-pointer"
                                onClick={() => {
                                  setTempDistalMedialFinalThickness(distalMedialFinalThickness);
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
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Unworn / Worn</label>
                          {!isEditingDistalLateralUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalLateralUnwornWorn}</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={editDistalLateralUnwornWorn} />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn","Worn"].map(option => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                  <input type="radio" name="distalLateralUnwornWorn" value={option} checked={tempDistalLateralUnwornWorn===option} onChange={e=>setTempDistalLateralUnwornWorn(e.target.value)} className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"/>
                                  <span className="text-sm text-[#272727]">{option}</span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={saveDistalLateralUnwornWorn}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelDistalLateralUnwornWorn}/>
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Initial Thickness</label>
                          {!isEditingDistalLateralInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalLateralInitialThickness} mm</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={editDistalLateralInitialThickness}/>
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <input type="text" value={tempDistalLateralInitialThickness} onChange={e=>setTempDistalLateralInitialThickness(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"/>
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={saveDistalLateralInitialThickness}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelDistalLateralInitialThickness}/>
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Recut</label>
                          <div className="flex items-center w-1/2 gap-4">
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralRecutYN ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalLateralRecutYN}</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingDistalLateralRecutYN(true)} />
                                </>
                              ) : (
                                <>
                                  {["N","Y"].map(option=>(
                                    <label key={option} className="flex items-center gap-1 cursor-pointer">
                                      <input type="radio" name="distalLateralRecutYN" value={option} checked={tempDistalLateralRecutYN===option} onChange={e=>setTempDistalLateralRecutYN(e.target.value)} className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"/>
                                      <span className="text-xs text-[#272727]">{option}</span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveDistalLateralRecutYN}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelDistalLateralRecutYN}/>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralRecutMM ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalLateralRecutMM} mm</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingDistalLateralRecutMM(true)}/>
                                </>
                              ) : (
                                <>
                                  <input type="text" value={tempDistalLateralRecutMM} onChange={e=>setTempDistalLateralRecutMM(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"/>
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveDistalLateralRecutMM}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelDistalLateralRecutMM}/>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 4. Washer */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Washer</label>
                          
                          <div className="flex items-center w-1/2 gap-4">
                            {/* Y/N */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralWasherYN ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalLateralWasherYN}</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingDistalLateralWasherYN(true)} />
                                </>
                              ) : (
                                <>
                                  {["N","Y"].map(option => (
                                    <label key={option} className="flex items-center gap-1 cursor-pointer">
                                      <input
                                        type="radio"
                                        name="distalLateralWasherYN"
                                        value={option}
                                        checked={tempDistalLateralWasherYN===option}
                                        onChange={e=>setTempDistalLateralWasherYN(e.target.value)}
                                        className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                      />
                                      <span className="text-xs text-[#272727]">{option}</span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveDistalLateralWasherYN}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelDistalLateralWasherYN}/>
                                </>
                              )}
                            </div>

                            {/* MM Input */}
                            <div className="flex items-center gap-2">
                              {!isEditingDistalLateralWasherMM ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalLateralWasherMM} mm</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingDistalLateralWasherMM(true)}/>
                                </>
                              ) : (
                                <>
                                  <input type="text" value={tempDistalLateralWasherMM} onChange={e=>setTempDistalLateralWasherMM(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"/>
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveDistalLateralWasherMM}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelDistalLateralWasherMM}/>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 5. Final Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Final Thickness</label>
                          {!isEditingDistalLateralFinalThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{distalLateralFinalThickness} mm</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={editDistalLateralFinalThickness}/>
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <input type="text" value={tempDistalLateralFinalThickness} onChange={e=>setTempDistalLateralFinalThickness(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs text-[#272727] px-1"/>
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={saveDistalLateralFinalThickness}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelDistalLateralFinalThickness}/>
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
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Unworn / Worn</label>
                          {!isEditingPostMedUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postMedUnwornWorn}</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostMedUnwornWorn(true)} />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn","Worn"].map(option => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                  <input type="radio" name="postMedUnwornWorn" value={option} checked={tempPostMedUnwornWorn===option} onChange={e=>setTempPostMedUnwornWorn(e.target.value)} className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"/>
                                  <span className="text-xs text-[#272727]">{option}</span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={savePostMedUnwornWorn}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelPostMedUnwornWorn}/>
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Initial Thickness</label>
                          {!isEditingPostMedInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postMedInitialThickness} mm</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostMedInitialThickness(true)} />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <input type="text" value={tempPostMedInitialThickness} onChange={e=>setTempPostMedInitialThickness(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs px-1"/>
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={savePostMedInitialThickness}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelPostMedInitialThickness}/>
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Recut</label>
                          <div className="flex items-center w-1/2 gap-4">

                            {/* Y/N */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostMedRecutYN ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postMedRecutYN}</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostMedRecutYN(true)}/>
                                </>
                              ) : (
                                <>
                                  {["N","Y"].map(option => (
                                    <label key={option} className="flex items-center gap-1 cursor-pointer">
                                      <input type="radio" value={option} checked={tempPostMedRecutYN===option} onChange={e=>setTempPostMedRecutYN(e.target.value)} className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"/>
                                      <span className="text-xs text-[#272727]">{option}</span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={savePostMedRecutYN}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelPostMedRecutYN}/>
                                </>
                              )}
                            </div>

                            {/* MM */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostMedRecutMM ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postMedRecutMM} mm</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostMedRecutMM(true)}/>
                                </>
                              ) : (
                                <>
                                  <input type="text" value={tempPostMedRecutMM} onChange={e=>setTempPostMedRecutMM(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs px-1"/>
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={savePostMedRecutMM}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelPostMedRecutMM}/>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 4. Final Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Final Thickness</label>
                          <div className="flex items-center w-1/2 gap-4">
                          {!isEditingPostMedFinalThickness ? (
                            <>
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postMedFinalThickness} mm</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostMedFinalThickness(true)}/>
                            </>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <input type="text" value={tempPostMedFinalThickness} onChange={e=>setTempPostMedFinalThickness(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs px-1"/>
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={savePostMedFinalThickness}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelPostMedFinalThickness}/>
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
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Unworn / Worn</label>
                          {!isEditingPostLatUnwornWorn ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postLatUnwornWorn}</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostLatUnwornWorn(true)} />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              {["Unworn","Worn"].map(option => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                  <input type="radio" name="postLatUnwornWorn" value={option} checked={tempPostLatUnwornWorn===option} onChange={e=>setTempPostLatUnwornWorn(e.target.value)} className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"/>
                                  <span className="text-xs text-[#272727]">{option}</span>
                                </label>
                              ))}
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={savePostLatUnwornWorn}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelPostLatUnwornWorn}/>
                            </div>
                          )}
                        </div>

                        {/* 2. Initial Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Initial Thickness</label>
                          {!isEditingPostLatInitialThickness ? (
                            <div className="flex items-center w-1/2 justify-between">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postLatInitialThickness} mm</span>
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostLatInitialThickness(true)} />
                            </div>
                          ) : (
                            <div className="flex items-center w-1/2 gap-2">
                              <input type="text" value={tempPostLatInitialThickness} onChange={e=>setTempPostLatInitialThickness(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs px-1"/>
                              <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={savePostLatInitialThickness}/>
                              <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelPostLatInitialThickness}/>
                            </div>
                          )}
                        </div>

                        {/* 3. Recut */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Recut</label>
                          <div className="flex items-center w-1/2 gap-4">

                            {/* Y/N */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostLatRecutYN ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postLatRecutYN}</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostLatRecutYN(true)}/>
                                </>
                              ) : (
                                <>
                                  {["N","Y"].map(option => (
                                    <label key={option} className="flex items-center gap-1 cursor-pointer">
                                      <input type="radio" value={option} checked={tempPostLatRecutYN===option} onChange={e=>setTempPostLatRecutYN(e.target.value)} className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"/>
                                      <span className="text-xs text-[#272727]">{option}</span>
                                    </label>
                                  ))}
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={savePostLatRecutYN}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelPostLatRecutYN}/>
                                </>
                              )}
                            </div>

                            {/* MM */}
                            <div className="flex items-center gap-2">
                              {!isEditingPostLatRecutMM ? (
                                <>
                                  <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postLatRecutMM} mm</span>
                                  <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostLatRecutMM(true)}/>
                                </>
                              ) : (
                                <>
                                  <input type="text" value={tempPostLatRecutMM} onChange={e=>setTempPostLatRecutMM(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs px-1"/>
                                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={savePostLatRecutMM}/>
                                  <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelPostLatRecutMM}/>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 4. Final Thickness */}
                        <div className="flex flex-row gap-4">
                          <label className={`${raleway.className} font-semibold text-xs text-[#484848] w-1/2`}>Final Thickness</label>
                          <div className="flex items-center w-1/2 gap-4">
                            {!isEditingPostLatFinalThickness ? (
                              <>
                                <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{postLatFinalThickness} mm</span>
                                <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPostLatFinalThickness(true)}/>
                              </>
                            ) : (
                              <div className="flex items-center w-1/2 gap-2">
                                <input type="text" value={tempPostLatFinalThickness} onChange={e=>setTempPostLatFinalThickness(e.target.value)} className="w-16 h-4 rounded-xs bg-[#D9D9D9] text-xs px-1"/>
                                <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={savePostLatFinalThickness}/>
                                <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelPostLatFinalThickness}/>
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
                    <div className={`w-full flex flex-row gap-2`}>
                      <div className={`w-1/7 h-full flex flex-col justify-between`}>

                        {/* 1. Worn / Unworn */}
                        <div className={`space-y-6 flex flex-col`}>
                          {!isEditingTibialLeftWorn ? (
                            <div className="flex flex-col gap-2">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{tibialLeftWorn}</span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialLeftWorn(true)}/>
                            </div>
                          ) : (
                            ["Worn", "UnWorn"].map((grade) => {
                              const id = `tibialleftworn-${grade}`;
                              return (
                                <label key={id} htmlFor={id} className="flex items-center space-x-4 cursor-pointer">
                                  <input
                                    id={id}
                                    type="radio"
                                    name="tibialLeftWorn"
                                    value={grade}
                                    checked={tempTibialLeftWorn===grade}
                                    onChange={e=>setTempTibialLeftWorn(e.target.value)}
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className={`text-xs text-[#272727] ${raleway.className} font-semibold`}>{grade}</span>
                                </label>
                              )
                            })
                          )}
                          {isEditingTibialLeftWorn && (
                            <div className="flex gap-2 mt-1">
                              <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialLeftWorn}/>
                              <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialLeftWorn}/>
                            </div>
                          )}
                        </div>

                        {/* 2. Thickness MM */}
                        <div className={`flex flex-row gap-1 items-center`}>
                          
                          {!isEditingTibialLeftMM ? (
                            <div className="flex items-center gap-1">
                              <label className={`${raleway.className} font-semibold text-sm text-[#484848]`}>mm</label>
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{tibialLeftMM}</span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialLeftMM(true)}/>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3">
                              <div className={`flex flex-row gap-2`}>
                                <label className={`${raleway.className} font-semibold text-xs text-[#484848]`}>mm</label>
                                <input type="text" value={tempTibialLeftMM} onChange={e=>setTempTibialLeftMM(e.target.value)} className="w-9 h-4 rounded-xs bg-[#D9D9D9] text-xs text-black px-1"/>
                              </div>
                              <div className={`flex flex-row gap-3`}>
                              <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialLeftMM}/>
                              <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialLeftMM}/>
                              </div>
                              
                            </div>
                          )}
                        </div>

                      </div>

                      <div className={`w-5/7 flex items-center`}>
                        <Image
                          src={Tibia}
                          alt="Bone Left"
                          className="w-6/7 pt-3"
                        />
                      </div>

                      <div className={`w-1/7 h-full flex flex-col justify-between`}>

                        {/* 1. Worn / Unworn */}
                        <div className={`space-y-6 flex flex-col`}>
                          {!isEditingTibialRightWorn ? (
                            <div className="flex flex-col gap-2">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{tibialRightWorn}</span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialRightWorn(true)}/>
                            </div>
                          ) : (
                            ["Worn", "UnWorn"].map((grade) => {
                              const id = `tibialrightworn-${grade}`;
                              return (
                                <label key={id} htmlFor={id} className="flex items-center space-x-4 cursor-pointer">
                                  <input
                                    id={id}
                                    type="radio"
                                    name="tibialRightWorn"
                                    value={grade}
                                    checked={tempTibialRightWorn===grade}
                                    onChange={e=>setTempTibialRightWorn(e.target.value)}
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className={`text-xs text-[#272727] ${raleway.className} font-semibold`}>{grade}</span>
                                </label>
                              )
                            })
                          )}
                          {isEditingTibialRightWorn && (
                            <div className="flex gap-2 mt-1">
                              <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialRightWorn}/>
                              <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialRightWorn}/>
                            </div>
                          )}
                        </div>

                        {/* 2. Thickness MM */}
                        <div className={`flex flex-row gap-1 items-center`}>
                          {!isEditingTibialRightMM ? (
                            <div className="flex items-center gap-1">
                              <label className={`${raleway.className} font-semibold text-sm text-[#484848]`}>mm</label>
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{tibialRightMM}</span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialRightMM(true)}/>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3">
                              <div className={`flex flex-row gap-2`}>
                                <label className={`${raleway.className} font-semibold text-sm text-[#484848]`}>mm</label>
                                <input type="text" value={tempTibialRightMM} onChange={e=>setTempTibialRightMM(e.target.value)} className="w-9 h-4 rounded-xs bg-[#D9D9D9] text-xs text-black px-1"/>
                              </div>
                              <div className={`flex flex-row gap-3`}>
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialRightMM}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialRightMM}/>
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
                          <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{pclCondition}</span>
                          <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingPclCondition(true)}/>
                        </div>
                      ) : (
                        <>
                          {["Intact", "Torn", "Excised"].map((grade) => {
                            const id = `pclcondition-${grade}`;
                            return (
                              <label key={id} htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  id={id}
                                  type="radio"
                                  name="pclCondition"
                                  value={grade}
                                  checked={tempPclCondition===grade}
                                  onChange={e=>setTempPclCondition(e.target.value)}
                                  className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                />
                                <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{grade}</span>
                              </label>
                            );
                          })}
                          <div className="flex gap-2 mt-1">
                            <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={savePclCondition}/>
                            <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelPclCondition}/>
                          </div>
                        </>
                      )}

                    </div>


                    </div>
                  </div>

                  <div className={`w-1/2 flex flex-col`}>
                    <div className={`flex flex-col gap-8`}>
                      <div className={`flex flex-row gap-12 items-center pl-20`}>

                        <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                          Tibial V-V Recut
                        </label>

                        {/* Y/N */}
                        <div className={`space-x-3 flex flex-row pl-3.5`}>
                          {!isEditingTibialVVRecutYN ? (
                            <div className="flex items-center gap-2">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>
                                {tibialVVRecutYN}
                              </span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialVVRecutYN(true)}/>
                            </div>
                          ) : (
                            <>
                              {["N","Y"].map((grade) => {
                                const id = `tibialvvrecut-${grade}`;
                                return (
                                  <label key={id} htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      id={id}
                                      type="radio"
                                      name="tibialVVRecutYN"
                                      value={grade}
                                      checked={tempTibialVVRecutYN===grade}
                                      onChange={e=>setTempTibialVVRecutYN(e.target.value)}
                                      className="w-4 h-4 appearance-none rounded-sm bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{grade}</span>
                                  </label>
                                );
                              })}
                              <div className="flex gap-2 mt-1">
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialVVRecutYN}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialVVRecutYN}/>
                              </div>
                            </>
                          )}
                        </div>

                        {/* MM */}
                        <div className={`flex items-center gap-2`}>
                          {!isEditingTibialVVRecutMM ? (
                            <div className="flex items-center gap-1">
                              <label className={`${raleway.className} font-semibold text-sm text-[#484848]`}>mm</label>
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{tibialVVRecutMM}</span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialVVRecutMM(true)}/>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2">
                              <div className="flex items-center gap-2">
                                <label className={`${raleway.className} font-semibold text-sm text-[#484848]`}>mm</label>
                                <input
                                  type="text"
                                  value={tempTibialVVRecutMM}
                                  onChange={e=>setTempTibialVVRecutMM(e.target.value)}
                                  className="w-9 h-4 rounded-xs bg-[#D9D9D9] text-sm px-1 text-black"
                                />
                              </div>
                              <div className="flex gap-2">
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialVVRecutMM}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialVVRecutMM}/>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>


                      <div className={`flex flex-row gap-12 items-center pl-20`}>

                        <label className={`${inter.className} text-base font-semibold text-[#484848]`}>
                          Tibial Slope Recut
                        </label>

                        {/* Y/N */}
                        <div className={`space-x-3 flex flex-row`}>
                          {!isEditingTibialSlopeRecutYN ? (
                            <div className="flex items-center gap-2">
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>
                                {tibialSlopeRecutYN}
                              </span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialSlopeRecutYN(true)}/>
                            </div>
                          ) : (
                            <>
                              {["N","Y"].map((grade) => {
                                const id = `tibialsloperecut-${grade}`;
                                return (
                                  <label key={id} htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                      id={id}
                                      type="radio"
                                      name="tibialSlopeRecutYN"
                                      value={grade}
                                      checked={tempTibialSlopeRecutYN===grade}
                                      onChange={e=>setTempTibialSlopeRecutYN(e.target.value)}
                                      className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                    />
                                    <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{grade}</span>
                                  </label>
                                );
                              })}
                              <div className="flex gap-2 mt-1">
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialSlopeRecutYN}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialSlopeRecutYN}/>
                              </div>
                            </>
                          )}
                        </div>

                        {/* MM */}
                        <div className={`flex items-center gap-2`}>
                          {!isEditingTibialSlopeRecutMM ? (
                            <div className="flex items-center gap-1">
                              <label className={`${raleway.className} font-semibold text-sm text-[#484848]`}>mm</label>
                              <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>{tibialSlopeRecutMM}</span>
                              <PencilIcon className="w-4 h-4 text-gray-600 cursor-pointer" onClick={()=>setIsEditingTibialSlopeRecutMM(true)}/>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2">
                              <div className="flex items-center gap-2">
                                <label className={`${raleway.className} font-semibold text-sm text-[#484848]`}>mm</label>
                                <input
                                  type="text"
                                  value={tempTibialSlopeRecutMM}
                                  onChange={e=>setTempTibialSlopeRecutMM(e.target.value)}
                                  className="w-9 h-4 rounded-xs bg-[#D9D9D9] text-sm text-black px-1"
                                />
                              </div>
                              <div className="flex gap-2">
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={saveTibialSlopeRecutMM}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={cancelTibialSlopeRecutMM}/>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>


                      <div className={`pl-20 pt-14`}>
                        <div className={`flex flex-col gap-4 border-[#AAA8A8] border-2 px-5 pb-5 pt-2`}>
                          <label className={`${inter.className} text-base font-bold text-[#7676A4]`}>
                            Final Check With Spacer Block and Trial Components
                          </label>

                          {!isEditingFinalCheck ? (
                            <div className="flex flex-col space-y-2">
                              {selectedFinalCheck.length === 0 ? (
                                <span className={` ${raleway.className} text-sm text-[#272727] font-semibold`}>None Selected</span>
                              ) : (
                                
                                  <span className={` ${raleway.className} text-sm text-[#272727] font-semibold`}>{selectedFinalCheck || "None Selected"}</span>
                                
                              )}
                              <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={() => setIsEditingFinalCheck(true)} />
                            </div>
                          ) : (
                            <div className="flex flex-col space-y-2">
                              {finalCheckOptions.map(option => (
                                <label key={option} className="flex items-center space-x-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="finalCheck"
                                    value={option}
                                    checked={tempSelectedFinalCheck === option}
                                    onChange={e => setTempSelectedFinalCheck(e.target.value)}
                                    className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                                  />
                                  <span className={`text-sm ${raleway.className} text-[#272727] font-semibold`}>{option}</span>
                                </label>
                              ))}
                              <div className="flex gap-2 mt-2">
                                <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={saveFinalCheck}/>
                                <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelFinalCheck}/>
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
                        {["Insert Thickness","No of Ticks","Extension EXT. ORIENT.","90° Flexion INT. ORIENT.","Lift–Off"].map((header, idx) => (
                          <th key={header} className={`px-4 py-3 bg-black/80 text-white font-bold text-[15px] text-center whitespace-nowrap
                          ${idx === 0 ? "rounded-tl-[8px]" : ""}
                          ${idx === 4 ? "rounded-tr-[8px]" : ""}`}>{header}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="bg-white text-[13px]">
                      {tableData.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                          {/* Insert Thickness */}
                          <td className={`${raleway.className} text-[13px] px-4 py-2 text-center font-semibold text-black border-l-2 border-[#AAA8A8] ${rowIdx===0?"border-t-2":""} ${rowIdx===tableData.length-1?"border-b-2":""}`}>
                            {row.insertThickness} mm
                          </td>

                          {/* No of Ticks */}
                          <td className={`px-4 py-2 text-center ${raleway.className} text-[13px] text-center font-semibold text-black ${rowIdx===0?"border-t-2 border-[#AAA8A8]":""} ${rowIdx===tableData.length-1?"border-b-2 border-[#AAA8A8]":""}`}>
                            {!row.editing.numTicks ? (
                              <div className="flex items-center justify-center gap-2">
                                <span>{row.numTicks || "0"}</span>
                                <PencilIcon className="w-4 h-4 cursor-pointer" onClick={()=>startEdit(rowIdx,"numTicks")}/>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <input type="number" value={row.temp.numTicks} onChange={e=>updateTemp(rowIdx,"numTicks",e.target.value)} className="w-16 border rounded px-2 py-1 text-center"/>
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={()=>saveEdit(rowIdx,"numTicks")}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={()=>cancelEdit(rowIdx,"numTicks")}/>
                              </div>
                            )}
                          </td>

                          {/* Extension EXT. ORIENT. */}
                          <td className={`px-4 py-2 ${raleway.className} text-[13px] text-center font-semibold text-black ${rowIdx===0?"border-t-2 border-[#AAA8A8]":""} ${rowIdx===tableData.length-1?"border-b-2 border-[#AAA8A8]":""}`}>
                            {!row.editing.extOrient ? (
                              <div className="flex justify-center items-center gap-2">
                                <span>{row.extOrient || "—"}</span>
                                <p>Deg</p>
                                <PencilIcon className="w-4 h-4 cursor-pointer" onClick={()=>startEdit(rowIdx,"extOrient")}/>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <input type="text" value={row.temp.extOrient} onChange={e=>updateTemp(rowIdx,"extOrient",e.target.value)} className="w-20 border rounded px-2 py-1 text-center"/>
                                <p>Deg</p>
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={()=>saveEdit(rowIdx,"extOrient")}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={()=>cancelEdit(rowIdx,"extOrient")}/>
                              </div>
                            )}
                          </td>

                          {/* 90° Flexion INT. ORIENT. */}
                          <td className={`px-4 py-2 ${raleway.className} text-[13px] text-center font-semibold text-black ${rowIdx===0?"border-t-2 border-[#AAA8A8]":""} ${rowIdx===tableData.length-1?"border-b-2 border-[#AAA8A8]":""}`}>
                            {!row.editing.flex90Orient ? (
                              <div className="flex justify-center items-center gap-2">
                                <span>{row.flex90Orient || "—"}</span>
                                <p>Deg</p>
                                <PencilIcon className="w-4 h-4 cursor-pointer" onClick={()=>startEdit(rowIdx,"flex90Orient")}/>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <input type="text" value={row.temp.flex90Orient} onChange={e=>updateTemp(rowIdx,"flex90Orient",e.target.value)} className="w-20 border rounded px-2 py-1 text-center"/>
                                <p>Deg</p>
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={()=>saveEdit(rowIdx,"flex90Orient")}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={()=>cancelEdit(rowIdx,"flex90Orient")}/>
                              </div>
                            )}
                          </td>

                          {/* Lift-Off Y/N */}
                          <td className={`border-r-2 border-[#AAA8A8] px-4 py-2 text-center ${raleway.className} text-[13px] text-center font-semibold text-black ${rowIdx===0?"border-t-2":""} ${rowIdx===tableData.length-1?"border-b-2":""}`}>
                            {!row.editing.liftOff ? (
                              <div className="flex justify-center items-center gap-2">
                                <span>{row.liftOff || "—"}</span>
                                <PencilIcon className="w-4 h-4 cursor-pointer" onClick={()=>startEdit(rowIdx,"liftOff")}/>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center gap-3">
                                {["N","Y"].map(option => (
                                  <label key={option} className="flex items-center gap-1 cursor-pointer">
                                    <input type="radio" name={`liftOff-${rowIdx}`} value={option} checked={row.temp.liftOff===option} onChange={e=>updateTemp(rowIdx,"liftOff",e.target.value)} className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"/>
                                    <span className="text-xs text-[#272727] font-semibold">{option}</span>
                                  </label>
                                ))}
                                <ClipboardDocumentCheckIcon className="w-4 h-4 text-green-600 cursor-pointer" onClick={()=>saveEdit(rowIdx,"liftOff")}/>
                                <XMarkIcon className="w-4 h-4 text-red-600 cursor-pointer" onClick={()=>cancelEdit(rowIdx,"liftOff")}/>
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
                    <label className={`${inter.className} text-base font-extrabold text-[#484848]`}>
                      PFJ Resurfacing
                    </label>

                    {!isEditingPFJResurf ? (
                      <div className="flex items-center gap-2">
                        <span className={`text-sm text-[#272727] ${raleway.className} font-semibold`}>
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
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="pfjResurf"
                              value={option}
                              checked={tempPFJResurf === option}
                              onChange={(e) => setTempPFJResurf(e.target.value)}
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span className={`text-xs text-[#272727] ${raleway.className} font-semibold`}>
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
                    <label className={`${inter.className} text-base font-extrabold text-[#484848]`}>
                      Trachela Resection
                    </label>

                    {!isEditingTrachelaResection ? (
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 rounded w-40  text-black text-sm">{trachelaResection}</span>
                        <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={() => setIsEditingTrachelaResection(true)} />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempTrachelaResection}
                          onChange={(e) => setTempTrachelaResection(e.target.value)}
                          className="px-4 py-1 rounded w-40 bg-gray-300 text-black text-sm"
                        />
                        <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-600 cursor-pointer" onClick={saveTrachelaResection} />
                        <XMarkIcon className="w-5 h-5 text-red-600 cursor-pointer" onClick={cancelTrachelaResection} />
                      </div>
                    )}
                  </div>


                  <div className={`flex flex-col gap-6`}>
                    <label className={`${inter.className} text-base font-extrabold text-[#484848]`}>
                      Patella
                    </label>

                    {!isEditingPatella ? (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs text-[#272727] ${raleway.className} font-semibold`}>
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
                          <label key={grade} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="patella"
                              value={grade}
                              checked={tempPatella === grade}
                              onChange={(e) => setTempPatella(e.target.value)}
                              className="w-4 h-4 appearance-none rounded-xs bg-[#D9D9D9] checked:bg-blue-600 cursor-pointer"
                            />
                            <span className={`text-xs text-[#272727] ${raleway.className} font-semibold`}>
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
                    <label className={`${inter.className} text-base font-extrabold text-[#484848]`}>
                      Pre Resurfacing Thickness
                    </label>

                    {!isEditingPreResurfacing ? (
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 rounded w-40  text-[black] text-sm">
                          {preResurfacingThickness || "—"}
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => setIsEditingPreResurfacing(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempPreResurfacingThickness}
                          onChange={(e) => setTempPreResurfacingThickness(e.target.value)}
                          className="px-4 py-1 rounded w-40 bg-gray-300 text-[black] text-sm"
                        />
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
                    <label className={`${inter.className} text-base font-extrabold text-[#484848]`}>
                      Post Resurfacing Thickness
                    </label>

                    {!isEditingPostResurfacing ? (
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1 rounded w-40  text-[black] text-sm">
                          {postResurfacingThickness || "—"}
                        </span>
                        <PencilIcon
                          className="w-5 h-5 text-gray-600 cursor-pointer"
                          onClick={() => setIsEditingPostResurfacing(true)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempPostResurfacingThickness}
                          onChange={(e) => setTempPostResurfacingThickness(e.target.value)}
                          className="px-4 py-1 rounded w-40 bg-gray-300 text-[black] text-sm"
                        />
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

                    <tbody className={`${inter.className} bg-white text-[13px]`}>
                      {rows.map((row, rowIdx, arr) => (
                        <tr key={row}>
                          <td
                            className={`px-4 py-3 text-left font-semibold text-[#010101] ${raleway.className}
                              border-l-2 border-[#AAA8A8]
                              ${rowIdx === 0 ? "border-t-2" : ""}
                              ${rowIdx === arr.length - 1 ? "border-b-2" : ""}`}
                          >
                            {row}
                          </td>

                          {categories.map((col, colIdx) => (
                            <td
                              key={col}
                              className={`px-4 py-3 text-center ${raleway.className} text-[13px] font-semibold text-[#010101]
                                ${colIdx === 3 ? "border-r-2 border-[#AAA8A8]" : ""}
                                ${rowIdx === 0 ? "border-t-2 border-[#AAA8A8]" : ""}
                                ${rowIdx === arr.length - 1 ? "border-b-2 border-[#AAA8A8]" : ""}`}
                            >
                              {implantTableEditingCell[col][row] ? (
                                <div className="flex items-center gap-2 justify-center">
                                  <select
                                    className="w-6/7 border rounded px-2 py-1 text-center text-sm"
                                    value={implantTableTempSelections[col][row]}
                                    onChange={(e) =>
                                      setImplantTableTempSelections({
                                        ...implantTableTempSelections,
                                        [col]: { ...implantTableTempSelections[col], [row]: e.target.value },
                                      })
                                    }
                                  >
                                    <option value="" disabled>Select</option>

                                    {row === "MANUFACTURER" &&
                                      optionsData[col]?.MANUFACTURER?.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}

                                    {row === "MODEL" &&
                                      implantTableTempSelections[col].MANUFACTURER &&
                                      optionsData[col]?.MODEL[implantTableTempSelections[col].MANUFACTURER]?.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}

                                    {row === "SIZE" &&
                                      implantTableTempSelections[col].MODEL &&
                                      optionsData[col]?.SIZE[implantTableTempSelections[col].MODEL]?.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                  </select>

                                  <ClipboardDocumentCheckIcon
                                    className="w-5 h-5 text-green-600 cursor-pointer"
                                    onClick={() => implantTableSaveEdit(col, row)}
                                  />
                                  <XMarkIcon
                                    className="w-5 h-5 text-red-600 cursor-pointer"
                                    onClick={()=>implantTableCancelEdit(col, row)}
                                  />

                                  
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2">
                                  <span>{implantTableSelections[col][row] || "—"}</span>
                                  {/* Edit Icon */}
                                   <PencilIcon className="w-5 h-5 text-gray-600 cursor-pointer" onClick={() => implantTableStartEdit(col, row)} />
                                  
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

      {!showsurgeryreport && (
        <div className={`bg-black rounded-lg w-1/5 py-2 flex mx-auto mt-12`}>
          <p
            className={`${inter.className} font-semibold text-base text-white text-center w-full cursor-pointer`}
            onClick={handlenavigateaddurgeryreport}
          >
            Add Surgery Report
          </p>
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
    </div>
  );
};

export default ViewSurgeryreport;
