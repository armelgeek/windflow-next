'use client';
import Editor from "@/features/editor/components/organisms/Editor";
import { useParams } from "next/navigation"

export default function EditorPage() {
    const params = useParams();
    const pageId = params.pageId || '';
    return (
        <Editor pageId={pageId}/>
    )
}