"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Raleway, Inter, Poppins } from "next/font/google";

import MainBg from "@/app/Assets/mainbg.png";
import Logo from "@/app/Assets/logo.png";
import Doctor from "@/app/Assets/doctorcover.png";
import Homeicon from "@/app/Assets/homeicon.png";
import Patienticon from "@/app/Assets/fevericon.png";
import Markedicon from "@/app/Assets/bookmark.png";
import Headset from "@/app/Assets/headset.png";

import { Bars3Icon } from "@heroicons/react/24/outline";

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
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import Dailyactivity from "../Components/Dailyactivity";
import Patientlist from "../Components/Patientlist";
import Markedpatient from "../Components/Markedpatient";
import Patientreport from "../Components/Patientreport";
import Surgeryreport from "../Components/Surgeryreport";
import ViewSurgeryreport from "../Components/ViewSurgeryreport";
import AddSurgeryreport from "../Components/AddSurgeryreport";

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

const page = () => {
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

  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFullyHidden, setIsFullyHidden] = useState(true); // for hidden toggle

  const handleOpen = () => {
    setIsFullyHidden(false); // show it
    requestAnimationFrame(() => {
      setIsSidebarOpen(true); // trigger transition
    });
  };

  const handleClose = () => {
    setIsSidebarOpen(false); // start slide-out
  };

  const handlelogout = () => {
    router.replace("/Login");
  };

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("selectedTab") || "Home";
    }
    return "Home";
  });

  const handlenavigatereport = () => {
    setActiveTab("Patientreport");
  };

  const handlenavigatesurgeryreport = () => {
    setActiveTab("Surgeryreport");
  };

  const handlenavigateviewsurgeryreport = () => {
    setActiveTab("ViewSurgeryreport");
  };

  const handlenavigateaddurgeryreport = () => {
    setActiveTab("AddSurgeryreport");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSelected = sessionStorage.getItem("selectedTab");

      if (storedSelected !== null) {
        setActiveTab(storedSelected);
      }
    }
  }, []);

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "Home":
        return <Dailyactivity handlenavigatereport={handlenavigatereport} handlenavigatesurgeryreport={handlenavigatesurgeryreport} />;

      case "Patient":
        return <Patientlist handlenavigatereport={handlenavigatereport} />;

      case "Marked":
        return <Markedpatient handlenavigatereport={handlenavigatereport} />;

      case "Patientreport":
        return <Patientreport handlenavigateviewsurgeryreport={handlenavigateviewsurgeryreport}/>;

      case "Surgeryreport":
        return <Surgeryreport />;

      case "ViewSurgeryreport":
        return <ViewSurgeryreport handlenavigateaddurgeryreport={handlenavigateaddurgeryreport}/>;

      case "AddSurgeryreport":
        return <AddSurgeryreport />;
    }
  };

  return (
    <div
      className={`relative bg-[#CFDADE] min-h-screen w-full overflow-x-hidden`}
    >
      {/* Top-left MainBg */}
      <div className="absolute bottom-0 left-0">
        <Image src={MainBg} alt="MainBg" className="w-[650px] h-[700px]" />
      </div>
      <div className="absolute inset-0 p-2 box-border rounded-4xl">
        <div
          className={`w-full h-full  flex ${
            width >= 1100 ? "flex-row gap-6" : " flex-col gap-1"
          } rounded-4xl border-white border-[1px] bg-white/10 ring-1 ring-white/30 backdrop-blur-sm p-1 shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)]`}
        >
          {width >= 1100 ? (
            <div
              className={`w-[15%] h-full flex flex-col justify-center  rounded-4xl border-white border-[1px] bg-white/20 backdrop-blur-none text-white `}
            >
              <div className="absolute top-6 left-6 flex flex-col items-center">
                <Image src={Logo} alt="XoLabs" className="w-20 h-12" />
                <span
                  className={`${raleway.className} text-lg text-black font-semibold`}
                >
                  Doctor
                </span>
              </div>
              <div className="w-full h-1/5"></div>
              <div
                className={`w-full h-4/5 flex flex-col justify-between py-4`}
              >
                <div
                  className={` ${raleway.className} font-semibold text-base text-black w-full flex flex-col gap-8 pl-6`}
                >
                  <div
                    className={`flex flex-row w-full gap-6 cursor-pointer`}
                    onClick={() => {
                      setActiveTab("Home");
                    }}
                  >
                    <Image src={Homeicon} alt="Home" className={`w-5 h-5`} />
                    <p>Home</p>
                  </div>
                  <div
                    className={`flex flex-row w-full gap-6 cursor-pointer`}
                    onClick={() => {
                      setActiveTab("Patient");
                    }}
                  >
                    <Image src={Patienticon} alt="Home" className={`w-5 h-5`} />
                    <p>Patients</p>
                  </div>
                  <div
                    className={`flex flex-row w-full gap-6 cursor-pointer`}
                    onClick={() => {
                      setActiveTab("Marked");
                    }}
                  >
                    <Image src={Markedicon} alt="Home" className={`w-5 h-5`} />
                    <p>Marked Patients</p>
                  </div>
                </div>
                <div
                  className={`w-full ${raleway.className} font-semibold text-base text-white flex items-center justify-center`}
                >
                  <p
                    className={`bg-[#2A343D] rounded-[20px] px-6 py-1.5 text-center w-3/5 cursor-pointer`}
                    onClick={handlelogout}
                  >
                    LOG OUT
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {/* Top Bar with Hamburger */}
              <div className="w-full flex items-center justify-between px-4 py-3 border-b rounded-t-4xl border-white border-[1px] bg-white/20 backdrop-blur-none">
                <div className="flex items-center flex-col">
                  <Image src={Logo} alt="XoLabs" className="w-16 h-10" />
                  <span
                    className={`${raleway.className} text-lg font-semibold text-black`}
                  >
                    Doctor
                  </span>
                </div>
                <button onClick={handleOpen}>
                  <Bars3Icon className="w-7 h-7 text-black" />
                </button>
              </div>

              {/* Backdrop Overlay */}
              <div
                className={`fixed inset-0 z-40 bg-transparent bg-opacity-40 transition-opacity duration-300 ${
                  isSidebarOpen
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              />

              {/* Sidebar Slide-In from Right */}
              <div
                className={`
                    fixed top-0 -right-2 h-full w-64 bg-white z-50 shadow-lg rounded-2xl transform transition-transform duration-300
                    ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
                    ${isFullyHidden ? "hidden" : ""}
                  `}
                onTransitionEnd={() => {
                  if (!isSidebarOpen) {
                    setIsFullyHidden(true); // Hide after slide-out completes
                  }
                }}
              >
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <h2 className="text-xl font-semibold"></h2>
                  <button onClick={handleClose}>
                    <XMarkIcon className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                <div className={`w-full flex flex-col gap-4`}>
                  <div className="w-full flex flex-col items-center justify-center gap-8 py-4">
                    <div
                      className={`${raleway.className} py-1 px-4 bg-[#1A2E39] rounded-full text-xs w-fit`}
                    >
                      <p className="font-semibold">Doctor Name</p>
                    </div>
                    <div className="w-fit flex flex-row gap-8">
                      <Image src={Headset} alt="Support" className="w-6 h-6" />
                      <ArrowRightStartOnRectangleIcon
                        className="w-6 h-6 text-black"
                        onClick={handlelogout}
                      />
                    </div>
                  </div>
                  <div
                    className={` ${raleway.className} font-semibold text-base text-black w-full flex flex-col gap-8 pl-6`}
                  >
                    <div
                      className={`flex flex-row w-full gap-6 cursor-pointer`}
                      onClick={() => {
                        setActiveTab("Home");
                      }}
                    >
                      <Image src={Homeicon} alt="Home" className={`w-5 h-5`} />
                      <p>Home</p>
                    </div>
                    <div
                      className={`flex flex-row w-full gap-6 cursor-pointer`}
                      onClick={() => {
                        setActiveTab("Patient");
                      }}
                    >
                      <Image
                        src={Patienticon}
                        alt="Home"
                        className={`w-5 h-5`}
                      />
                      <p>Patients</p>
                    </div>
                    <div
                      className={`flex flex-row w-full gap-6 cursor-pointer`}
                      onClick={() => {
                        setActiveTab("Marked");
                      }}
                    >
                      <Image
                        src={Markedicon}
                        alt="Home"
                        className={`w-5 h-5`}
                      />
                      <p>Marked Patients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={` ${
              width >= 1100 ? "w-[85%] rounded-4xl" : "w-full rounded-b-4xl"
            } ${
              isSidebarOpen ? "overflow-y-hidden" : "overflow-y-auto"
            }  h-full bg-white `}
          >
            {renderSelectedComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
