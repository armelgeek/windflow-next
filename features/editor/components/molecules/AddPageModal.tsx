import React from "react";

interface AddPageModalProps {
  newPageName: string;
  setNewPageName: (name: string) => void;
  handleAddPageSubmit: () => void;
  setShowAddPageModal: (show: boolean) => void;
}

const AddPageModal: React.FC<AddPageModalProps> = ({
  newPageName,
  setNewPageName,
  handleAddPageSubmit,
  setShowAddPageModal
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">New Page</h2>
          <button 
            type="button" 
            onClick={() => setShowAddPageModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Enter page name"
          value={newPageName}
          onChange={(e) => setNewPageName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setShowAddPageModal(false)}
            className="px-3 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddPageSubmit();
              setShowAddPageModal(false);
            }}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPageModal;