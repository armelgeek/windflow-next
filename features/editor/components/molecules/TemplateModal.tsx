import React from "react";

interface TemplateModalProps {
  templateDetails: {
    title: string;
    description: string;
    category: string;
  };
  handleModalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleModalSubmit: (e: React.FormEvent) => void;
  setShowModal: (show: boolean) => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({
  templateDetails,
  handleModalChange,
  handleModalSubmit,
  setShowModal
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <form
        onSubmit={handleModalSubmit}
        className="bg-white p-8 rounded shadow-lg space-y-4 w-96"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Template Details</h2>
          <button 
            type="button" 
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <input
          name="title"
          value={templateDetails.title}
          onChange={handleModalChange}
          className="w-full p-2 border rounded"
          placeholder="Title"
          required
        />
        <input
          name="description"
          value={templateDetails.description}
          onChange={handleModalChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
          required
        />
        <input
          name="category"
          value={templateDetails.category}
          onChange={handleModalChange}
          className="w-full p-2 border rounded"
          placeholder="Category"
          required
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Template
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateModal;