'use client';

import Pages from "@/features/pages/components/templates/Pages";
import { useProject } from "@/features/project/hooks/use-project";
import { useParams } from "next/navigation";

export default function ProjetDetailPage() {
    const params = useParams();
    const slug = params.slug || '';
    const {project} = useProject(slug);
    return (
        <>
            <div className="space-y-4">
                <div className='flex items-center justify-between'>
                    <div className='flex flex-col'>
                        <h2 className="text-2xl font-bold tracking-tight">Gestion du site - [{project?.name}]</h2>
                    </div>
                </div>
                {project && <Pages projectId={project?.id}/>}
            </div>
        </>
    )
}