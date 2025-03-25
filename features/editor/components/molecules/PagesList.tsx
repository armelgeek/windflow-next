import React from "react";
import PageItem from "./PageItem";

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
  return (
    <div className="flex-1 space-y-2 overflow-y-auto">
      {pages.map((page) => (
        <PageItem 
          key={page.id}
          page={page}
          isActive={currentPage === page.id}
          onSelect={() => switchToPage(page.id)}
          onDelete={handleDeletePage}
        />
      ))}
    </div>
  );
};

export default PagesList;