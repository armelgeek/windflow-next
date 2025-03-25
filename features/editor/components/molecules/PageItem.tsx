import React from "react";
import { Trash2 } from "lucide-react";

interface PageItemProps {
  page: { id: string; name: string };
  isActive: boolean;
  onSelect: () => void;
  onDelete: (pageId: string) => void;
}

const PageItem: React.FC<PageItemProps> = ({
  page,
  isActive,
  onSelect,
  onDelete
}) => {
  return (
    <div
      className={`flex items-center justify-between p-2 mb-2 rounded cursor-pointer ${
        isActive ? "bg-blue-600" : "hover:bg-gray-700"
      }`}
    >
      <span className="flex-1" onClick={onSelect}>
        {page?.name || "Home"}
      </span>
      {page.id !== "home" && (
        <button
          onClick={() => onDelete(page.id)}
          className="p-1 hover:bg-red-500 rounded"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};

export default PageItem;