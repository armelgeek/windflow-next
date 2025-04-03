"use client";
import React from 'react'
import { useGetTemplateOverview } from '../../hooks/use-template-info';
import TemplateCard from '../molecules/template-card';
const TemplateOverview = () => {
    const { templates, isLoading } = useGetTemplateOverview();
    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates && templates.map((template, index) => (
                <TemplateCard key={index}  row={{
                    original: template
                }} template={template} index={index} />
            ))}
        </div>
    )
}

export default TemplateOverview
