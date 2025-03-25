import React from "react";
import PagesList from "./PagesList";
import ActionButtons from "./ActionButtons";

interface SidebarProps {
  pages: Array<{ id: string; name: string }>;
  currentPage: string;
  switchToPage: (pageId: string) => void;
  handleAddPage: () => void;
  handleDeletePage: (pageId: string) => void;
  handleSavePage: () => void;
  handlePreviewPage: () => void;
  handleSaveTemplate: () => void;
  handleExportZip: () => void;
  isExporting: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  pages,
  currentPage,
  switchToPage,
  handleAddPage,
  handleDeletePage,
  handleSavePage,
  handlePreviewPage,
  handleSaveTemplate,
  handleExportZip,
  isExporting
}) => {
  return (
    <div className="w-64 bg-slate-900 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">Pages</h2>
      
      <PagesList 
        pages={pages}
        currentPage={currentPage}
        switchToPage={switchToPage}
        handleDeletePage={handleDeletePage}
      />
      
      <ActionButtons 
        handleAddPage={handleAddPage}
        handleSavePage={handleSavePage}
        handlePreviewPage={handlePreviewPage}
        handleSaveTemplate={handleSaveTemplate}
        handleExportZip={handleExportZip}
        isExporting={isExporting}
      />
    </div>
  );
};

export default Sidebar;