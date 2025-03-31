import React from 'react'
import { Template } from '../../config/template.type'
import Link from 'next/link'

const TemplateCard = ({ template, index }: {
    template: Template,
    index: number
}) => {
    return (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative h-48 bg-gray-100">
                <img src="https://placehold.co/400x300" alt={`Template ${template.title}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center transition-all">
                    <Link href={`/preview/${template.slug}`} className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium transition-all">
                        Prévisualiser
                    </Link>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
            </div>
        </div>
    )
}

export default TemplateCard
