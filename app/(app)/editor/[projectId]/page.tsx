'use client';
import Editor from "@/features/editor/components/organisms/Editor";
import { useProject } from "@/features/project/hooks/use-project";
import { useParams } from "next/navigation"

export default function EditorPage() {
    const params = useParams();
    const projectId = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId || '';
    const { project }  = useProject(projectId);
    if(!project) return null;
    return (
        <Editor project={project}/>
    )
}