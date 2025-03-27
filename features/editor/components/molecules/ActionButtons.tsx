import React, { useState } from "react";
import { Plus, Save, Eye, Download, MoreHorizontal, SaveAll } from 'lucide-react';

interface ActionButtonsProps {
  handleAddPage: () => void;
  handleSavePage: () => void;
  handleSaveTemplate: () => void;
  handleExportZip: () => void;
  isExporting: boolean;
}

const CompactActionButtons: React.FC<ActionButtonsProps> = ({
  handleAddPage,
  handleSavePage,
  handleSaveTemplate,
  handleExportZip,
  isExporting
}) => {
  const [showMore, setShowMore] = useState(false);

  const primaryActions = [
    { icon: <Plus size={16} />, label: "Add", onClick: handleAddPage, color: "bg-green-600 hover:bg-green-700" },
    { icon: <Save size={16} />, label: "Save", onClick: handleSavePage, color: "bg-blue-600 hover:bg-blue-700" },
   ];

  const secondaryActions = [
    //{ icon: <SaveAll size={16} />, label: "Save Template", onClick: handleSaveTemplate, color: "hover:bg-slate-700" },
    { 
      icon: <Download size={16} />, 
      label: isExporting ? "Exporting..." : "Export ZIP", 
      onClick: handleExportZip, 
      disabled: isExporting,
      color: "hover:bg-slate-700 disabled:text-slate-500 disabled:hover:bg-transparent" 
    }
  ];

  return (
    <div className="flex items-center justify-between border-t border-slate-700 pt-3">
      <div className="flex space-x-1">
        {primaryActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`p-1.5 rounded-md ${action.color} flex items-center`}
            title={action.label}
          >
            {action.icon}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={() => setShowMore(!showMore)}
          className="p-1.5 rounded-md hover:bg-slate-700 flex items-center"
          title="More actions"
        >
          <MoreHorizontal size={16} />
        </button>

        {showMore && (
          <div className="absolute bottom-full right-0 mb-1 w-40 bg-slate-800 rounded-md shadow-lg py-1 z-10">
            {secondaryActions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  setShowMore(false);
                  action.onClick();
                }}
                disabled={action.disabled}
                className={`w-full text-left px-3 py-2 flex items-center ${action.color} disabled:cursor-not-allowed`}
              >
                <span className="mr-2">{action.icon}</span>
                <span className="text-xs">{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompactActionButtons;