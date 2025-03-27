import { useState, useEffect, RefObject } from "react";
import toast from "react-hot-toast";
import { useSession } from '../../../shared/hooks/use-session-info';
import { pageApi } from "../services/page.api";
import { usePageLists, usePageMutations } from "@/features/pages/hooks/use-page-info";
import { useTableParams } from "@/shared/hooks/use-table-params";
import { pageService } from "@/features/pages/domain/page.service";

export const usePages = (editorRef: RefObject<any>, projectId: string) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const filters = useTableParams();
  const { data: pagesData = [] } = usePageLists({ 
    ...filters,
    projectId 
  });

  const { updateByIdMutation, isUpdatingById } = usePageMutations();
  const { data: session } = useSession();
 
    
  const updatePages = () => {
    if (!editorRef.current) return;
    const editor = editorRef.current;
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

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
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

  useEffect(() => {
    const loadPagesFromAPI = async () => {
      if (!editorRef.current) return;
      if (!pagesData || pagesData.length === 0) {
        console.log("No pages available from API");
        return;
      }
      
      setIsSyncing(true);
      try {
        const editor = editorRef.current;
        const pm = editor.Pages;
        
        pm.getAll().forEach(p => pm.remove(p.id));
        
        pagesData.forEach(page => {
          const newPage = pm.add({
            id: page.id,
            name: page.name
          });
          newPage.set("customHtml", page.html);
          newPage.set("customCss", page.css);
        });
        
        if (pagesData.length > 0) {
          pm.select(pagesData[0].id);
          editor.setComponents(pagesData[0].html || "");
          editor.setStyle(pagesData[0].css || "");
          toast.success("All pages loaded from the server");
        }
      } catch (error) {
        console.error("Failed to load pages from API", error);
        toast.error("Failed to load pages from the server");
      } finally {
        setIsSyncing(false);
      }
    };
    
    if (editorRef.current && projectId) {
      loadPagesFromAPI();
    }
  }, [pagesData, editorRef, projectId]);

  const saveCurrentPageState = async (sync = false) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    const currentPageObj = pm.getSelected();
    
    if (currentPageObj) {
      currentPageObj.set("customHtml", editor.getHtml());
      currentPageObj.set("customCss", editor.getCss());
      
      if (sync) {
        try {
          setIsSyncing(true);
          
          await updateByIdMutation({
            id: currentPageObj.id,
            data: {
              name: currentPageObj.get("name"),
              html: editor.getHtml(),
              css: editor.getCss()
            }
          });
          toast.success("Page saved to server");
        } catch (error) {
          console.error("Failed to sync page with server", error);
          toast.error("Failed to save page to server");
        } finally {
          setIsSyncing(false);
        }
      }
    }
  };

  const switchToPage = async (pageId: string) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    const nextPage = pm.get(pageId);
    
    if (nextPage) {
      if (currentPage) {
        await saveCurrentPageState(true);
      }
      
      if ((!nextPage.get("customHtml") || !nextPage.get("customCss"))) {
        try {
          setIsSyncing(true);
          const pageData = await pageService.detail(pageId);
          nextPage.set("customHtml", pageData.html);
          nextPage.set("customCss", pageData.css);
        } catch (error) {
          console.error("Failed to load page from server", error);
        } finally {
          setIsSyncing(false);
        }
      }
      
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
      const initialHtml = `<div class='p-4'>${pageName} Page</div>`;
      
      pm.add({
        id: pageId,
        name: pageName,
        component: initialHtml,
      });
      
      if (projectId && session?.user) {
        try {
          setIsSyncing(true);
          await pageApi.createPage(projectId, {
            id: pageId,
            name: pageName,
            html: initialHtml,
            css: ""
          });
          toast.success(`Page "${pageName}" created and saved to server`);
        } catch (error) {
          console.error("Failed to save new page to server", error);
          toast.error("Failed to save page to server, but created locally");
        } finally {
          setIsSyncing(false);
        }
      }
      
      switchToPage(pageId);
      setShowAddPageModal(false);
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
      if (projectId && session?.user) {
        try {
          setIsSyncing(true);
          await pageApi.deletePage(projectId, pageId);
          toast.success("Page deleted from server");
        } catch (apiError) {
          console.error("Failed to delete page from server:", apiError);
          toast.error("Failed to delete page from server");
          setIsLoading(false);
          setIsSyncing(false);
          return; 
        } finally {
          setIsSyncing(false);
        }
      }

      pm.remove(pageId);

      if (currentPage === pageId) {
        const firstPage = pm.getAll()[0];
        if (firstPage) switchToPage(firstPage.id);
      }
      
      toast.success("Page deleted successfully");
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error("Failed to delete page. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePage = async () => {
    if (!editorRef.current || !session?.user) {
      toast("You must be logged in to save pages");
      return;
    }
    
    if (!projectId) {
      toast("Please save the template first");
      return;
    }
    
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

      setIsSyncing(true);

      await updateByIdMutation({
        id: page.id,
        data: pageData
      });
      toast.success("Page saved successfully!");
    } catch (error) {
      console.error("Failed to save page:", error);
      toast.error("Failed to save page. Please try again.");
    } finally {
      setIsLoading(false);
      setIsSyncing(false);
    }
  };

  const handlePreviewPage = async () => {
    if (!editorRef.current || !projectId || !session?.user) {
      toast("You must be logged in to preview pages");
      return;
    }
    
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
    
    if (!page) {
      toast.error("No page selected");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await saveCurrentPageState(true);
      
      const { previewUrl } = await pageApi.generatePreview(projectId, page.id);
      
      window.open(previewUrl, "_blank");
    } catch (error) {
      console.error("Failed to generate preview:", error);
      toast.error("Failed to generate preview. Please try again.");
      
      const html = editor.getHtml();
      const css = editor.getCss();
      const pageName = page.get("name") || "previewpage";
      
      localStorage.setItem(`preview-${pageName}`, JSON.stringify({ html, css }));
      window.open(`/previewpage/${pageName}`, "_blank");
    } finally {
      setIsLoading(false);
    }
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
    isLoading,
    isSyncing
  };
};