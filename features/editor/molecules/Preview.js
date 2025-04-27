"use client";
import {useState} from 'react';
import FrameComponent from "react-frame-component";
import Emulator from './Emulator';
import { Hero } from './Hero';
import { EmulatorCSR } from './Emulator';
import { ColorPicker } from './ColorPicker';
import ToggleButton from "@/components/core/general/ToggleButton";
import Tabs from "@/components/core/general/Tab/Tabs";
import LeftSidebar from "@/components/core/general/Sidebar/LeftSidebar";
import RightSidebar from "@/components/core/general/Sidebar/RightSidebar";
import Editor from "@/components/core/general/Editor";
import {useEditor} from "@/store/editor";
const DEVICES = {
  'Mobile': { width: 375, height: 550 },
  'Tablet': { width: 768, height: 1024 },
  'Laptop': { width: 1279, height: 768 },
  'Desktop': { width: 1920, height: 1080 },
  'Laptop HD': { width: 1600, height: 900 },
  'Large Mobile': { width: 420, height: 650 },
  'Custom': { width: 1356, height: 720 }
};

const orientations = {
  portrait: 'portrait',
  landscape: 'landscape',
};
export function Preview({ cssLinks }) {
  const [device, setDevice] = useState('Custom');
  const [orientation, setOrientation] = useState(orientations.portrait);
  const [zoom, setZoom] = useState(0.7);

  const deviceDimensions = DEVICES[device];
  const width = orientation === orientations.portrait ? deviceDimensions.width : deviceDimensions.height;
  const height = orientation === orientations.portrait ? deviceDimensions.height : deviceDimensions.width;

  const handleDeviceChange = (event) => setDevice(event.target.value);
  const handleOrientationChange = (event) => setOrientation(event.target.value);
  const handleZoomChange = (event) => setZoom(parseFloat(event.target.value));
  const [marginPosition, setMarginPosition] = useState('both'); // 'none', 'left', 'right', 'both'
  const editor = useEditor();
  const toggleMargin = () => {
    if (marginPosition === 'none') {
      setMarginPosition('left');
    } else if (marginPosition === 'left') {
      setMarginPosition('right');
    } else if (marginPosition === 'right') {
      setMarginPosition('both');
    } else {
      setMarginPosition('none');
    }
  };

  const getStyle = () => {
    let styles = {
      position: "relative",
      display: 'flex',
      flexDirection: 'flex-row',
      justifyContent: 'center',
      height: "calc(100vh - 109px)",
      overflow: "hidden",
      width: '100vw',
      marginTop: "auto",
      marginBottom: "auto"
    };

    if (marginPosition === 'left') {
      styles.marginLeft = "300px";
      styles.width = "calc(100vw - 300px)";
      styles.marginRight = "auto";
    } else if (marginPosition === 'right') {
      styles.marginRight = "270px";
      styles.marginLeft = "auto";
      styles.width = "calc(100vw - 270px)";
    } else if (marginPosition === 'both') {
      styles.marginLeft = "300px";
      styles.marginRight = "270px";
      styles.width = "calc(100vw - 570px)";
    }
    return styles;
  };
    console.log('')
  return (
    <div>
      {/**<div>
        <label>
          Device:
          <select value={device} onChange={handleDeviceChange}>
            {Object.keys(DEVICES).map((deviceKey) => (
              <option key={deviceKey} value={deviceKey}>
                {deviceKey}
              </option>
            ))}
          </select>
        </label>
        <label>
          Orientation:
          <select value={orientation} onChange={handleOrientationChange}>
            {Object.keys(orientations).map((orientationKey) => (
              <option key={orientationKey} value={orientationKey}>
                {orientationKey}
              </option>
            ))}
          </select>
        </label>
        <label>
          Zoom:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={zoom}
            onChange={handleZoomChange}
          />
        </label>
      </div>
          <EmulatorCSR
            cssLinks={cssLinks}
            documentSize={{
              width: width * zoom,
              height: height * zoom
            }}
            scale={zoom}
          >
            <Hero/>
          </EmulatorCSR>**/}
      <nav className="fixed flex left-[0px] w-[calc(100vw-0px)]  border-b shadow-none dark:text-white bg-white dark:bg-dark-700 top-[40px] z-[1]">
     <div className="start py-1">
        <div className="w-[300px] px-3">
          <div className="py-0.5 px-1 flex bg-neutral-300 dark:bg-dark-500 w-full items-center  gap-1 rounded">
              <ToggleButton
                  isActive={true}
                  onClick={() => {}}
              >
                  <span>Pages</span>
              </ToggleButton>
              <ToggleButton
                  isActive={false}
                  onClick={() => {}}
              >
                  <span>Pages</span>
              </ToggleButton>
          </div>
        </div>
     </div>
     <div className="flex w-[calc(100vw-570px)]  pr-2  border-b dark:bg-dark-500">
      <div className="w-full  hover:overflow-x-auto overflow-clip thin-scrollbar">
        <div className="flex flex-row flex-nowrap gap-x-1 py-0.5 px-1">
            <Tabs/>
        </div>
      </div>
     </div>
     <div className="flex flex-row items-center justify-between w-[270px]">
      <div className="px-3 w-full">
        <div className="w-full">
        <div className="py-0.5 px-1 flex bg-neutral-300 dark:bg-dark-500 w-full items-center  gap-1 rounded">
            <ToggleButton
                isActive={true}
                onClick={() => {}}
            >
                <span>Styles</span>
            </ToggleButton>
            <ToggleButton
                isActive={false}
                onClick={() => {}}
            >
                <span>Options</span>
            </ToggleButton>
          </div>
        </div>
      </div>
     </div>
    </nav>
    <div className="pt-20 bg-gray-100 !z-[0] dark:bg-dark-500 overflow-x-auto overflow-y-hidden">
     {(marginPosition === 'left' || marginPosition === 'both') && (
      <LeftSidebar/>
         )}
        <div style={getStyle()}>
            <EmulatorCSR
                cssLinks={cssLinks}
                documentSize={{
                    width: width * zoom,
                    height: height * zoom
                }}
                scale={zoom}
            >
            <Editor/>
            </EmulatorCSR>
        </div>
        {(marginPosition === 'right' || marginPosition === 'both') && (
            <RightSidebar/>
        )}
    </div>
    <div className="fixed left-0 bottom-0 w-[100vw] h-[29px] bg-white dark:bg-dark-700 border-t z-[10]">
        <div className="start gap-x-0.5 mt-[2px] pl-1 text-sm font-medium text-center"></div>
    </div>
    </div>
  );
}
