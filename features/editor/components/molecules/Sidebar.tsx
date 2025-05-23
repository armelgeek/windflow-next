import React from "react";
import PagesList from "./PagesList";
import ActionButtons from "./ActionButtons";
import { Menu, X } from "lucide-react";

interface SidebarProps {
  pages: Array<{ id: string; name: string }>;
  currentPage: string;
  switchToPage: (pageId: string) => void;
  handleAddPage: () => void;
  handleDeletePage: (pageId: string) => void;
  handleRenamePage: (pageId: string, newName: string) => void
  handleSavePage: () => void;
  handleSaveTemplate: () => void;
  handleExportZip: () => void;
  isExporting: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SlideSidebar: React.FC<SidebarProps> = ({
  pages,
  currentPage,
  switchToPage,
  handleAddPage,
  handleDeletePage,
  handleRenamePage,
  handleSavePage,
  handleSaveTemplate,
  handleExportZip,
  isExporting,
  isOpen,
  setIsOpen
}) => {

  const pageCategories = pages.reduce((acc, page) => {
    const categoryMatch = page.name.match(/^([^:]+):/);
    const category = categoryMatch ? categoryMatch[1] : "Uncategorized";
    
    if (!acc[category]) {
      acc[category] = [];
    }
    
    acc[category].push(page);
    return acc;
  }, {} as Record<string, typeof pages>);
 
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-20 bg-slate-800 text-white p-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
        aria-label="Open pages menu"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-lg font-bold">Pages</h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 rounded-full hover:bg-slate-700"
            >
              <X size={20} />
            </button>
          </div>


          <div className="flex-grow overflow-y-auto p-4">
            {Object.entries(pageCategories).map(([category, categoryPages]) => (
              <div key={category} className="mb-6">
                <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">
                  {category}
                  <span className="ml-2 text-xs bg-slate-700 rounded-full px-2">
                    {categoryPages.length}
                  </span>
                </h3>
                <PagesList
                  pages={categoryPages}
                  currentPage={currentPage}
                  switchToPage={(id) => {
                    switchToPage(id);
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  handleRenamePage={handleRenamePage}
                  handleDeletePage={handleDeletePage}
                  handleAddPage={handleAddPage}
                />
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-700 bg-slate-900">
            <ActionButtons
              pages={pages}
              handleAddPage={handleAddPage}
              handleSavePage={handleSavePage}
              handleSaveTemplate={handleSaveTemplate}
              handleExportZip={handleExportZip}
              isExporting={isExporting}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideSidebar;