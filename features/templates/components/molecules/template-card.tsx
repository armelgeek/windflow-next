"use client";

import React from 'react';
import { Template } from '../../config/template.type';
import Link from 'next/link';
import { useTemplateMutations } from '../../hooks/use-template-info';
import { authClient } from '@/auth-client';
import { useRouter } from 'next/navigation';
import { FlexibleViewActions } from '../organisms/flexible-view-actions';
const TemplateCard = ({ template, row, index }: {
    template: Template,
    row: unknown
    index: number
}) => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const { createAsProject } = useTemplateMutations();

    const handleCreateProject = async () => {
        await createAsProject({
            name: `(Copy)- ${template.title}`,
            templateId: template.id,
            userId: session?.user?.id
        });
        router.push('/projects');
    };

    return (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all">
            <div className="relative h-48 bg-gray-100">
                <img src="https://placehold.co/400x300" alt={`Template ${template.title}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center  justify-center gap-3 transition-all">
                    <div className='flex flex-col gap-3'>
                        <Link
                            href={`/preview/${template.slug}`}
                            className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium transition-all hover:bg-gray-50"
                        >
                            Prévisualiser
                        </Link>
                        <button
                            onClick={handleCreateProject}
                            className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-slate-900 text-white  rounded-md shadow-sm text-sm font-medium transition-all"
                            disabled={!session?.user}
                        >
                            Créer un projet
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold">{template.title}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>

                <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                        {template.pages?.length || 0} page{template.pages?.length !== 1 ? 's' : ''}
                    </span>
                </div>
                {session?.user && (
                    <div>
                        {template.userId == session?.user.id && (
                            <div className='mt-3'>
                                <FlexibleViewActions row={row} />
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default TemplateCard;