"use client";

import React, { useState, useEffect } from 'react';
import { useTemplate } from '../../hooks/use-template-info';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Head from 'next/head';

const TemplatePreview = ({ slug }: { slug: string }) => {
    const { template } = useTemplate(slug);
    const [selectedPageId, setSelectedPageId] = useState<string>("");
    const [selectedPage, setSelectedPage] = useState<any>(null);
   
    const pages = React.useMemo(() => template?.pages || [], [template?.pages]);

    useEffect(() => {
        if (pages.length > 0 && !selectedPageId) {
            const firstPageId = pages[0].id || `page-0`;
            setSelectedPageId(firstPageId);
            setSelectedPage(pages[0]);
        }
    }, [pages, selectedPageId]);
    
    const handlePageChange = (value: string) => {
        setSelectedPageId(value);
        const selectedPage = pages.find(page => (page.id || `page-${pages.indexOf(page)}`) === value);
        setSelectedPage(selectedPage);
    };
     
    if (!template) {
        return null;
    }
    
    
    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex flex-row my-4 px-5 gap-3 justify-between items-center border-b pb-3'>
                <div>
                    <Link
                        href={'/templates'}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Go Back
                    </Link>
                </div>
                <div className="font-semibold">
                    {template.title || 'Template Preview'}
                </div>
            </div>
            
            <div className="px-5 py-4">
                <div className="w-full max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Page
                    </label>
                    <Select value={selectedPageId} onValueChange={handlePageChange}>
                        <SelectTrigger className="w-full">
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
                
                <div className="mt-8 border rounded-lg p-4 bg-gray-50">
                    {selectedPage ? (
                        <div>
                            <Head>
                                <style>{selectedPage.css}</style>
                             </Head>
                            <div dangerouslySetInnerHTML={{ __html: selectedPage.html || '' }} />
                        </div>
                    ) : (
                        <div className="text-center text-gray-500">
                            Select a page to preview content
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplatePreview;