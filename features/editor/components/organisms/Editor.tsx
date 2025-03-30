'use client';
import React, { useEffect, useState } from "react";

import { useEditor } from "../../hooks/useEditor";
import { usePages } from "../../hooks/usePages";
import { useTemplate } from "../../hooks/useTemplate";
import { useExport } from "../../hooks/useExport";

import Sidebar from "../molecules/Sidebar";
import Canvas from "../molecules/Canvas";
import AddPageModal from "../molecules/AddPageModal";
import { usePages as usePageLists } from "@/features/pages/hooks/use-page-info";
import { useTableParams } from "@/shared/hooks/use-table-params";
import { createPortal } from "react-dom";
import { Page } from "@/features/pages/config/page.type";


const DragDropLoadingOverlay = ({ isDragging }: { isDragging: boolean }) => {
  if (!isDragging) return null;

  const framesContainer = document.querySelector('.gjs-frames');

  if (!framesContainer) return null;

  return createPortal(
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        className="loading-spinner"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '15px 20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <svg width="30" height="30" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#09f">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.8s"
                  repeatCount="indefinite" />
              </path>
            </g>
          </g>
        </svg>
        <p style={{ marginTop: '8px', fontSize: '14px' }}>Chargement...</p>
      </div>
    </div>,
    framesContainer
  );
};


const PageTransitionOverlay = ({ showPageTransition }: {
  showPageTransition: boolean
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!showPageTransition) return null;
  if (!mounted) return null;

  const framesContainer = document.querySelector('.gjs-frames');

  if (!framesContainer) return null;

  return createPortal(
    <div
      className="absolute inset-0 bg-white flex flex-col justify-center items-center z-50"
    >
      <div className="flex flex-col items-center">
        <div className="animate-pulse mb-8">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500"
          >
            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="4" />
            <path
              d="M18 30C18 23.373 23.373 18 30 18C36.627 18 42 23.373 42 30"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="animate-spin origin-center"
              style={{ animationDuration: '1s' }}
            />
          </svg>
        </div>

        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>

        <p className="text-gray-700 font-medium animate-fade-in">Chargement de la page...</p>

        <div className="flex space-x-2 mt-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
        </div>
      </div>
    </div>,
    framesContainer
  );
};
const EditorComponent = ({ pageData, projectId }: {
  pageData: any,
  projectId: string
}) => {
  const { editorRef } = useEditor();
  const [pgs, setPages] = useState<Page[]>([]);

  const {
    isOpen,
    setIsOpen,
    pages,
    currentPage,
    switchToPage,
    handleAddPage,
    handleAddPageSubmit,
    handleDeletePage,
    handleRenamePage,
    handleSavePage,
    showAddPageModal,
    newPageName,
    setNewPageName,
    setShowAddPageModal,
    showPageTransition,
    isDragging,
    isPageLoading
  } = usePages(editorRef, pageData, projectId);

  const {
    templateDetails,
    handleSaveTemplate,
  } = useTemplate(editorRef);

  const {
    handleExportZip,
    isExporting
  } = useExport(editorRef, templateDetails);

  return (
    <div className="flex h-screen">
      <Sidebar
        pages={pages}
        currentPage={currentPage}
        switchToPage={switchToPage}
        handleAddPage={handleAddPage}
        handleDeletePage={handleDeletePage}
        handleRenamePage={handleRenamePage}
        handleSavePage={handleSavePage}
        handleSaveTemplate={handleSaveTemplate}
        handleExportZip={handleExportZip}
        isExporting={isExporting}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <Canvas editorRef={editorRef} />

      {showAddPageModal && (
        <AddPageModal
          newPageName={newPageName}
          setNewPageName={setNewPageName}
          handleAddPageSubmit={handleAddPageSubmit}
          setShowAddPageModal={setShowAddPageModal}
        />
      )}
      <PageTransitionOverlay showPageTransition={showPageTransition || isPageLoading} />
      <DragDropLoadingOverlay isDragging={isDragging} />
    </div>
  );
}
const Editor = ({ project }: {
  project: any
}) => {

  const filters = useTableParams();
  const { data: pagesData } = usePageLists({
    ...filters,
    projectId: project.id
  });

  if (!pagesData) return;
  return (<EditorComponent
    pageData={pagesData}
    projectId={project.id}
  />)
}
export default Editor;