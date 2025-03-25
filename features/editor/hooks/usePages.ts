import { useState, useEffect, RefObject } from "react";
import toast from "react-hot-toast";
import { useSession } from '../../../shared/hooks/use-session-info';
import { templateApi } from "../services/template.api";

export const usePages = (editorRef: RefObject<any>) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { data: session } = useSession();

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    
    const updatePages = () => {
      if (editor && editor.Pages) {
        const allPages = editor.Pages.getAll().map((p) => ({ 
          id: p.id, 
          name: p.get("name") 
        }));
        setPages(allPages);
        
        const selected = editor.Pages.getSelected();
        if (selected) {
          setCurrentPage(selected.id);
        }
      }
    };

    editor.on("page", updatePages);
    editor.on("page:select", updatePages);
    editor.on("page:add", updatePages);
    editor.on("page:remove", updatePages);
    editor.on("load", updatePages);

    return () => {
      editor.off("page", updatePages);
      editor.off("page:select", updatePages);
      editor.off("page:add", updatePages);
      editor.off("page:remove", updatePages);
      editor.off("load", updatePages);
    };
  }, [editorRef]);

  const saveCurrentPageState = () => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    const currentPage = pm.getSelected();
    
    if (currentPage) {
      currentPage.set("customHtml", editor.getHtml());
      currentPage.set("customCss", editor.getCss());
    }
  };

  const switchToPage = (pageId: string) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    const nextPage = pm.get(pageId);
    
    if (nextPage) {
      saveCurrentPageState();
      pm.select(pageId);
      editor.setComponents(nextPage.get("customHtml") || "");
      editor.setStyle(nextPage.get("customCss") || "");
      setCurrentPage(pageId);
    }
  };

  const handleAddPage = () => {
    setNewPageName("");
    setShowAddPageModal(true);
  };

  const handleAddPageSubmit = async () => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    const pageName = newPageName.trim();
    
    if (!pageName) {
      toast.error("Page name cannot be empty");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const pageId = pageName.toLowerCase().replace(/\s+/g, "-");
      
      pm.add({
        id: pageId,
        name: pageName,
        component: `<div class='p-4'>${pageName} Page</div>`,
      });
      
      const templateId = localStorage.getItem('currentTemplateId');
      if (templateId && session?.user) {
        saveCurrentPageState();
        
        const allPages = pm.getAll().map((page) => ({
          id: page.id,
          name: page.get("name"),
          html: page.get("customHtml") || "",
          css: page.get("customCss") || ""
        }));
        
        try {
          await templateApi.updateTemplate(templateId, {
            userID: session.user.id,
            pages: allPages
          });
        } catch (error) {
          console.error("Failed to save page to database, continuing locally", error);
        }
      }
      
      switchToPage(pageId);
      setShowAddPageModal(false);
      toast.success(`Page "${pageName}" created successfully`);
    } catch (error) {
      console.error("Error adding page:", error);
      toast.error("Failed to add page. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    
    if (pm.getAll().length <= 1) {
      toast.error("Cannot delete the last page");
      return;
    }

    setIsLoading(true);

    try {
      const templateId = localStorage.getItem('currentTemplateId');

      if (templateId && session?.user) {
        try {
          await templateApi.deletePage(templateId, pageId);
          toast.success("Page deleted successfully!");
        } catch (apiError) {
          console.error("Failed to delete page from database:", apiError);
          toast.error("Failed to delete page from database, but will continue locally.");
        }
      }

      pm.remove(pageId);

      if (currentPage === pageId) {
        const firstPage = pm.getAll()[0];
        if (firstPage) switchToPage(firstPage.id);
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error("Failed to delete page. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePage = async () => {
    if (!editorRef.current || !session?.user) return;
    
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
    
    if (!page) {
      toast.error("No page selected");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const pageData = {
        id: page.id,
        name: page.get("name"),
        html: editor.getHtml(),
        css: editor.getCss(),
      };

      const templateId = localStorage.getItem('currentTemplateId');
      if (templateId) {
        try {
          const template = await templateApi.getTemplate(templateId);
          
          const updatedPages = [...template.pages];
          const pageIndex = updatedPages.findIndex(p => p.id === page.id);
          
          if (pageIndex >= 0) {
            updatedPages[pageIndex] = pageData;
          } else {
            updatedPages.push(pageData);
          }
          
          await templateApi.updateTemplate(templateId, {
            ...template,
            pages: updatedPages
          });
          
          toast.success("Page saved successfully!");
        } catch (error) {
          console.error("Failed to save page to database:", error);
          toast.error("Failed to save page to database. Please try again.");
        }
      } else {
        toast("Please save the template first");
      }
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewPage = () => {
    if (!editorRef.current) return;
    
    //const editor = editorRef.current;
    //const page = editor.Pages.getSelected();
    //const html = editor.getHtml();
    //const css = editor.getCss();
    //const pageName = page.get("name") || "previewpage";
    
    //localStorage.setItem(`preview-${pageName}`, JSON.stringify({ html, css }));
    //window.open(`/previewpage/${pageName}`, "_blank");
  };

  return {
    pages,
    currentPage,
    switchToPage,
    handleAddPage,
    handleAddPageSubmit,
    handleDeletePage,
    handleSavePage,
    handlePreviewPage,
    showAddPageModal,
    setShowAddPageModal,
    newPageName,
    setNewPageName,
    isLoading
  };
};