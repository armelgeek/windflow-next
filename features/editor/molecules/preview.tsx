"use client";
import { useState } from 'react';
import { EmulatorCSR } from './Emulator';
import Tabs from "./tab/Tabs"

import ToggleButton from "./ToggleButton";
import Editor from "./Editor";
import LeftSidebar from './left-bar-tree';
import RightSidebar from './right-bar-panel';
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
        <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <nav className="fixed top-[40px] left-0 right-0 flex border-b bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 shadow-sm">
                <div className="w-[300px] p-3 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 gap-1">
                        <ToggleButton
                            isActive={true}
                            onClick={() => { }}
                        >
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                                Pages
                            </span>
                        </ToggleButton>
                        <ToggleButton
                            isActive={false}
                            onClick={() => { }}
                        >
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                                Components
                            </span>
                        </ToggleButton>
                    </div>
                </div>
                <div className="flex-1 overflow-x-auto border-r border-gray-200 dark:border-gray-700">
                    <div className="p-1">
                        <Tabs />
                    </div>
                </div>
                <div className="w-[270px] p-3">
                    <div className="w-full">
                        <div className="py-0.5 px-1 flex bg-gray-100 dark:bg-gray-700 rounded-lg items-center gap-1">
                            <ToggleButton
                                isActive={true}
                                onClick={() => { }}
                            >
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                                    </svg>
                                    Style
                                </span>
                            </ToggleButton>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex pt-[89px] h-full">
                <div className="w-[300px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                    <LeftSidebar />
                </div>
                
                <main className="flex-1 relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-auto">
                    <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/30 bg-[length:20px_20px]"></div>
                    <div className="relative" style={getStyle()}>
                        <EmulatorCSR
                            cssLinks={cssLinks}
                            documentSize={{
                                width: width * zoom,
                                height: height * zoom
                            }}
                            scale={zoom}
                        >
                            <Editor />
                        </EmulatorCSR>
                    </div>
                </main>

                <div className="w-[270px] border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
}
