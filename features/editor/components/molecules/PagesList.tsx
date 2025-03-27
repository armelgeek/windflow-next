import React, { useState } from "react";
import { Trash2, Edit, Save, X } from "lucide-react";

interface PagesListProps {
  pages: Array<{ id: string; name: string }>;
  currentPage: string;
  switchToPage: (pageId: string) => void;
  handleDeletePage: (pageId: string) => void;
}

const PagesList: React.FC<PagesListProps> = ({
  pages,
  currentPage,
  switchToPage,
  handleDeletePage
}) => {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingPageName, setEditingPageName] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const getPageInfo = (pageName: string) => {
    const parts = pageName.split(":");
    if (parts.length > 1) {
      return {
        category: parts[0],
        name: parts.slice(1).join(":")
      };
    }
    return {
      category: null,
      name: pageName
    };
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const startEditing = (pageId: string, pageName: string) => {
    setEditingPageId(pageId);
    setEditingPageName(pageName);
  };

  const cancelEditing = () => {
    setEditingPageId(null);
  };

  const savePageName = (pageId: string) => {
    console.log(`Saving page ${pageId} with new name: ${editingPageName}`);
    
    setEditingPageId(null);
  };
  console.log('pages',pages);
  return (
    <div className="space-y-1">
      {pages.filter(f => f.name!='').map(page => {
        const { name } = getPageInfo(page.name);
        const isActive = page.id === currentPage;

        return (
          <div 
            key={page.id} 
            className={`group rounded-md mb-1 ${isActive ? "bg-slate-700" : "hover:bg-slate-800"}`}
          >
            {editingPageId === page.id ? (
              <div className="flex items-center p-2">
                <input
                  type="text"
                  value={editingPageName}
                  onChange={(e) => setEditingPageName(e.target.value)}
                  className="flex-grow bg-slate-800 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button 
                  onClick={() => savePageName(page.id)}
                  className="p-1 ml-1 text-slate-400 hover:text-white"
                >
                  <Save size={14} />
                </button>
                <button 
                  onClick={cancelEditing}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full p-2">
                <button 
                  onClick={() => switchToPage(page.id)}
                  className={`flex-grow text-sm text-left truncate ${isActive ? "text-white" : "text-slate-300"}`}
                >
                  {name}
                </button>
                <div className="opacity-0 group-hover:opacity-100 flex transition-opacity">
                  <button 
                    onClick={() => startEditing(page.id, page.name)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Edit size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeletePage(page.id)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PagesList;