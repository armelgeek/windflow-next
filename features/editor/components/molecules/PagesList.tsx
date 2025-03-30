import React, { useState, useEffect, useRef } from "react";
import { Trash2, Edit, Save, X, FolderOpen, Folder, Plus } from "lucide-react";

interface PagesListProps {
  pages: Array<{ id: string; name: string }>;
  currentPage: string;
  switchToPage: (pageId: string) => void;
  handleDeletePage: (pageId: string) => void;
  handleRenamePage: (pageId: string, newName: string) => void;
  handleAddPage: (pageName: string) => void;
}

const PagesList: React.FC<PagesListProps> = ({
  pages,
  currentPage,
  switchToPage,
  handleDeletePage,
  handleRenamePage,
  handleAddPage
}) => {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingPageName, setEditingPageName] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingPageId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingPageId]);

  useEffect(() => {
    if (isAddingPage && addInputRef.current) {
      addInputRef.current.focus();
    }
  }, [isAddingPage]);

  const getGroupedPages = () => {
    const grouped: Record<string, Array<{ id: string; name: string; displayName: string }>> = {
      "": []
    };

    pages.forEach(page => {
      const { category, name } = getPageInfo(page.name);
      const group = category || "";
      
      if (!grouped[group]) {
        grouped[group] = [];
      }
      
      grouped[group].push({
        id: page.id,
        name: page.name,
        displayName: name
      });
    });

    return grouped;
  };

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
    const { name } = getPageInfo(pageName);
    setEditingPageId(pageId);
    setEditingPageName(name);
  };

  const cancelEditing = () => {
    setEditingPageId(null);
    setEditingPageName("");
  };

  const savePageName = (pageId: string) => {
    if (editingPageName.trim() === "") {
      return;
    }
    
    handleRenamePage(pageId, editingPageName);
    setEditingPageId(null);
    setEditingPageName("");
  };

  const startAddingPage = (category: string | null = null) => {
    setIsAddingPage(true);
    setNewPageName("");
    setSelectedCategory(category);
  };

  const cancelAddingPage = () => {
    setIsAddingPage(false);
    setNewPageName("");
    setSelectedCategory(null);
  };

  const submitNewPage = () => {
    if (newPageName.trim() === "") {
      return;
    }

    const finalPageName = selectedCategory 
      ? `${selectedCategory}:${newPageName}` 
      : newPageName;
    
    handleAddPage(finalPageName);
    cancelAddingPage();
  };

  const groupedPages = getGroupedPages();
  const categories = Object.keys(groupedPages).sort();

  // Ensure all groups are expanded by default
  useEffect(() => {
    const defaultExpanded: Record<string, boolean> = {};
    categories.forEach(category => {
      if (!expandedGroups.hasOwnProperty(category)) {
        defaultExpanded[category] = true;
      }
    });
    
    if (Object.keys(defaultExpanded).length > 0) {
      setExpandedGroups(prev => ({
        ...prev,
        ...defaultExpanded
      }));
    }
  }, [categories]);

  return (
    <div className="space-y-2">
      {categories.map(category => {
        const categoryPages = groupedPages[category];
        const isExpanded = expandedGroups[category] !== false;
        
        if (categoryPages.length === 0) return null;
        
        return (
          <div key={category || "uncategorized"} className="space-y-1">
            {category && (
              <div className="flex items-center justify-between rounded-md px-2 py-1 text-slate-300 hover:bg-slate-800 cursor-pointer">
                <div 
                  className="flex items-center flex-grow"
                  onClick={() => toggleGroup(category)}
                >
                  {isExpanded ? 
                    <FolderOpen size={16} className="mr-2 text-slate-400" /> : 
                    <Folder size={16} className="mr-2 text-slate-400" />
                  }
                  <span className="text-sm font-medium">{category}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startAddingPage(category);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:opacity-100 p-1 text-slate-400 hover:text-blue-500 transition-colors"
                  aria-label={`Add page to ${category}`}
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
            
            {isExpanded && (
              <div className={category ? "ml-2 space-y-1" : "space-y-1"}>
                {categoryPages.map(page => {
                  const isActive = page.id === currentPage;
                  
                  return (
                    <div 
                      key={page.id} 
                      className={`group rounded-md ${isActive ? "bg-slate-700" : "hover:bg-slate-800"} transition-colors duration-150`}
                    >
                      {editingPageId === page.id ? (
                        <div className="p-2">
                          <div className="flex items-center w-full">
                            <input
                              ref={inputRef}
                              type="text"
                              value={editingPageName}
                              onChange={(e) => setEditingPageName(e.target.value)}
                              className="w-full bg-slate-800 text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  savePageName(page.id);
                                } else if (e.key === 'Escape') {
                                  cancelEditing();
                                }
                              }}
                            />
                            <button 
                              onClick={() => savePageName(page.id)}
                              className="p-1 ml-1 text-slate-400 hover:text-green-500 transition-colors"
                              aria-label="Save page name"
                            >
                              <Save size={14} />
                            </button>
                            <button 
                              onClick={cancelEditing}
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                              aria-label="Cancel editing"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between w-full p-2 group">
                          <button 
                            onClick={() => switchToPage(page.id)}
                            className={`flex-grow text-sm text-left truncate ${isActive ? "text-white font-medium" : "text-slate-300"}`}
                          >
                            {page.displayName}
                          </button>
                          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditing(page.id, page.name);
                              }}
                              className="p-1 text-slate-400 hover:text-blue-500 transition-colors"
                              aria-label="Edit page name"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Are you sure you want to delete the page "${page.displayName}"?`)) {
                                  handleDeletePage(page.id);
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                              aria-label="Delete page"
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
            )}
          </div>
        );
      })}
    </div>
  );
};


export default PagesList;