"use client";
import TemplatePreview from "@/features/templates/components/organisms/template-preview";
import { useParams } from "next/navigation"

export default function Page() {
    const params = useParams();
    const { slug } = params;
    if (!slug) {
        return;
    }
    return (
        <>
            <TemplatePreview slug={slug} />
        </>
    )
}