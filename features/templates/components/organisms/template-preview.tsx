"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTemplate } from '../../hooks/use-template-info';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TemplatePreview = ({ slug }: { slug: string }) => {
    const { template } = useTemplate(slug);
    const [selectedPageId, setSelectedPageId] = useState<string>("");
    const [selectedPage, setSelectedPage] = useState<any>(null);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const iframeRef = useRef<HTMLIFrameElement>(null);
   
    const pages = React.useMemo(() => template?.pages || [], [template?.pages]);

    useEffect(() => {
        if (pages.length > 0 && !selectedPageId) {
            const firstPageId = pages[0].id || `page-0`;
            setSelectedPageId(firstPageId);
            setSelectedPage(pages[0]);
        }
    }, [pages, selectedPageId]);
    
    useEffect(() => {
        if (selectedPage && iframeRef.current) {
            const iframe = iframeRef.current;
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            
            if (iframeDoc) {
                const htmlContent = `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${selectedPage.name || 'Template Preview'}</title>
                        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                        <script src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"></script>
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                            }
                            ${selectedPage.css || ''}
                        </style>
                    </head>
                    <body>
                        ${selectedPage.html || ''}
                    </body>
                    </html>
                `;
                
                iframeDoc.open();
                iframeDoc.write(htmlContent);
                iframeDoc.close();
            }
        }
    }, [selectedPage]);
    
    const handlePageChange = (value: string) => {
        setSelectedPageId(value);
        const selectedPage = pages.find(page => (page.id || `page-${pages.indexOf(page)}`) === value);
        setSelectedPage(selectedPage);
    };

    const toggleControls = () => {
        setControlsVisible(!controlsVisible);
    };

    const getIframeWidth = () => {
        switch (viewMode) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            case 'desktop': return '100%';
            default: return '100%';
        }
    };
    
    if (!template) {
        return null;
    }
    
    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
            <div className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out ${controlsVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="bg-white bg-opacity-80 backdrop-blur-md border-b border-gray-200 shadow-sm p-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href={'/templates'}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors duration-200"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="18" 
                                    height="18" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                                Back to Templates
                            </Link>
                            
                            <div className="font-semibold border-l pl-4 ml-2 text-gray-800">
                                {template.title || 'Template Preview'}
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('mobile')}
                                    className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    title="Mobile view"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="7" height="16" x="8.5" y="4" rx="1" />
                                        <path d="M11 5h2" />
                                        <path d="M12 17v2" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('tablet')}
                                    className={`p-2 rounded ${viewMode === 'tablet' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    title="Tablet view"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="12" height="16" x="6" y="4" rx="1" />
                                        <path d="M12 17v.01" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('desktop')}
                                    className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    title="Desktop view"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="12" x="3" y="6" rx="2" />
                                        <path d="M7 18h10" />
                                        <path d="M12 18v3" />
                                    </svg>
                                </button>
                            </div>

                            {/* Page Selector */}
                            <div className="w-64">
                                <Select value={selectedPageId} onValueChange={handlePageChange}>
                                    <SelectTrigger className="w-full bg-white border border-gray-200 focus:ring-blue-500">
                                        <SelectValue placeholder="Select a page" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pages.length > 0 ? (
                                            pages.map((page, index) => (
                                                <SelectItem key={index} value={page.id || `page-${index}`}>
                                                    {page.name || `Page ${index + 1}`}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="no-pages" disabled>
                                                No pages available
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <button 
                onClick={toggleControls}
                className="fixed top-4 right-4 z-20 bg-gray-800 bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105"
                title={controlsVisible ? "Hide controls" : "Show controls"}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    {controlsVisible ? (
                        <path d="m18 15-6-6-6 6" />
                    ) : (
                        <path d="m6 9 6 6 6-6" />
                    )}
                </svg>
            </button>
            
            <div className="absolute inset-0 flex items-center justify-center w-full h-full pt-16">
                <div 
                    className={`transition-all duration-300 ease-in-out ${viewMode !== 'desktop' ? 'border-8 border-gray-800 rounded-xl shadow-2xl' : ''}`}
                    style={{ 
                        width: getIframeWidth(),
                        height: viewMode === 'desktop' ? '100%' : '85vh',
                        maxHeight: viewMode === 'desktop' ? '100%' : '85vh',
                    }}
                >
                    {selectedPage ? (
                        <iframe 
                            ref={iframeRef}
                            title={`Preview: ${selectedPage.name || 'Template Page'}`}
                            className="w-full h-full border-none bg-white"
                            sandbox="allow-same-origin allow-scripts"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-white text-gray-500">
                            <div className="text-center p-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                                    <path d="M12 2H2v10h10V2Z" />
                                    <path d="M22 2h-5v5h5V2Z" />
                                    <path d="M22 12h-5v10h5V12Z" />
                                    <path d="M12 12H2v10h10V12Z" />
                                </svg>
                                <p className="text-lg font-medium">Select a page to preview</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplatePreview;