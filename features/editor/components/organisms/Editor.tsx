'use client';
import React from "react";

import { useEditor } from "../../hooks/useEditor";
import { usePages } from "../../hooks/usePages";
import { useTemplate } from "../../hooks/useTemplate";
import { useExport } from "../../hooks/useExport";

import Sidebar from "../molecules/Sidebar";
import Canvas from "../molecules/Canvas";
import TemplateModal from "../molecules/TemplateModal";
import AddPageModal from "../molecules/AddPageModal";

const Editor = ({project}: {
  project: any
}) => {
  const { editorRef } = useEditor();
  const { 
    pages, 
    currentPage, 
    switchToPage, 
    handleAddPage, 
    handleAddPageSubmit, 
    handleDeletePage, 
    handleSavePage, 
    handlePreviewPage, 
    showAddPageModal, 
    newPageName, 
    setNewPageName,
    setShowAddPageModal
  } = usePages(editorRef, project?.id);
  
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
      />
      
      <Canvas editorRef={editorRef} />

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
    </div>
  );
};

export default Editor;