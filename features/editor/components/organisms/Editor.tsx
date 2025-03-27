'use client';
import React, { useEffect, useState } from "react";

import { useEditor } from "../../hooks/useEditor";
import { usePages } from "../../hooks/usePages";
import { useTemplate } from "../../hooks/useTemplate";
import { useExport } from "../../hooks/useExport";

import Sidebar from "../molecules/Sidebar";
import Canvas from "../molecules/Canvas";
import TemplateModal from "../molecules/TemplateModal";
import AddPageModal from "../molecules/AddPageModal";
import { usePageLists } from "@/features/pages/hooks/use-page-info";
import { useTableParams } from "@/shared/hooks/use-table-params";
import { createPortal } from "react-dom";


const DragDropLoadingOverlay = ({isDragging}: {isDragging: boolean}) => {
  if (!isDragging) return null;
  
  // Sélectionner uniquement la zone des frames
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Plus transparent que l'overlay de page
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        pointerEvents: 'none', // Permet le clic à travers l'overlay
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
              <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.8s"
                  repeatCount="indefinite"/>
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
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <div className="loading-spinner">
        <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#09f">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"/>
              </path>
            </g>
          </g>
        </svg>
        <p style={{ marginTop: '10px' }}>Chargement de la page...</p>
      </div>
    </div>,
    framesContainer
  );
};
const EditorComponent = ({pageData }:  {
  pageData: any
}) => {
  const { editorRef } = useEditor();

  const { 
    isOpen,
    setIsOpen,
    pages, 
    currentPage, 
    switchToPage, 
    handleAddPage, 
    handleAddPageSubmit, 
    handleDeletePage, 
    handleSavePage,  
    showAddPageModal, 
    newPageName, 
    setNewPageName,
    setShowAddPageModal,
    showPageTransition,
    isDragging
  } = usePages(editorRef, pageData);
  
  const { 
    templateDetails, 
    handleModalChange, 
    handleSaveTemplate, 
    handleModalSubmit, 
    showModal,
    setShowModal 
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
        handleSavePage={handleSavePage}
        handleSaveTemplate={handleSaveTemplate}
        handleExportZip={handleExportZip}
        isExporting={isExporting}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      
      <Canvas editorRef={editorRef} showPageTransition={showPageTransition} />

      {showModal && (
        <TemplateModal
          templateDetails={templateDetails}
          handleModalChange={handleModalChange}
          handleModalSubmit={handleModalSubmit}
          setShowModal={setShowModal}
        />
      )}

      {showAddPageModal && (
        <AddPageModal
          newPageName={newPageName}
          setNewPageName={setNewPageName}
          handleAddPageSubmit={handleAddPageSubmit}
          setShowAddPageModal={setShowAddPageModal}
        />
      )}
        <PageTransitionOverlay showPageTransition={showPageTransition} />
        <DragDropLoadingOverlay isDragging={isDragging}/>
    </div>
  );
}
const Editor = ({project}: {
  project: any
}) => {
 
  const filters = useTableParams();
  const { data: pagesData } = usePageLists({ 
      ...filters,
      projectId:project.id
    });

  if(!pagesData) return;
  return <EditorComponent  pageData={pagesData} />
}
export default Editor;