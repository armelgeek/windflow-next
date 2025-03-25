import React from "react";
import { Plus, FileText, Download } from "lucide-react";

interface ActionButtonsProps {
  handleAddPage: () => void;
  handleSavePage: () => void;
  handlePreviewPage: () => void;
  handleSaveTemplate: () => void;
  handleExportZip: () => void;
  isExporting: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  handleAddPage,
  handleSavePage,
  handlePreviewPage,
  handleSaveTemplate,
  handleExportZip,
  isExporting
}) => {
  return (
    <div className="mt-4 space-y-4">
      <button
        onClick={handleAddPage}
        className="flex items-center justify-center w-full p-2 bg-green-600 hover:bg-green-700 rounded"
      >
        <Plus className="w-4 h-4 mr-2" /> Add Page
      </button>

      <button
        onClick={handleSavePage}
        className="flex items-center justify-center w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
      >
        <FileText className="w-4 h-4 mr-2" /> Save Page
      </button>

      <button
        onClick={handlePreviewPage}
        className="flex items-center justify-center w-full p-2 bg-yellow-600 hover:bg-yellow-700 rounded"
      >
        <FileText className="w-4 h-4 mr-2" /> Preview
      </button>

      <button
        onClick={handleSaveTemplate}
        className="flex items-center justify-center w-full p-2 bg-purple-600 hover:bg-purple-700 rounded"
      >
        <FileText className="w-4 h-4 mr-2" /> Save Template
      </button>

      <button
        onClick={handleExportZip}
        disabled={isExporting}
        className="flex items-center justify-center w-full p-2 bg-indigo-600 hover:bg-indigo-700 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4 mr-2" /> {isExporting ? 'Exporting...' : 'Export as ZIP'}
      </button>
    </div>
  );
};

export default ActionButtons;