import { useState, useEffect, RefObject } from "react";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";
import { useSession } from '../../../shared/hooks/use-session-info';
import { usePageMutations } from "@/features/pages/hooks/use-page-info";
import { pageService } from "@/features/pages/domain/page.service";



export const usePages = (editorRef: RefObject<any>, pagesData: any) => {
  const [pages, setPages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState("");
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showPageTransition, setShowPageTransition] = useState(false);
  const { 
    updateByIdMutation, 
    updatePage,
    deletePage 
  } = usePageMutations();
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

  /**useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;

    const handleDragStart = () => {
      setIsDragging(true);
    };

    const handleDragEnd = () => {
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    };

    editor.on("block:drag:start", handleDragStart);
    editor.on("component:add", handleDragEnd);
    editor.on("block:drag:stop", handleDragEnd);

    editor.on("component:mount", () => {
      setTimeout(() => {
        setIsDragging(false);
      }, 500);
    });

    return () => {
      editor.off("block:drag:start", handleDragStart);
      editor.off("component:add", handleDragEnd);
      editor.off("block:drag:stop", handleDragEnd);
      editor.off("component:mount");
    };
  }, [editorRef]);**/

  useEffect(() => {
    if (!editorRef.current) return;
    const editor = editorRef.current;
    const pm = editor.Pages;

    const loadPagesFromAPI = async () => {
      setIsSyncing(true);
      try {
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
        }

        toast.success("All pages loaded from the server");
      } catch (error) {
        console.error("Failed to load pages from API", error);
        toast.error("Failed to load pages from the server");
      } finally {
        setIsSyncing(false);
      }
    };
    const existingPages = pm.getAll();
    if (existingPages && existingPages.length > 1) {
      console.log('Pages already exist, skipping loadPagesFromAPI');
      setIsSyncing(false);
      return;
    }
    loadPagesFromAPI();
  }, [pagesData, editorRef]);

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
    setIsOpen(false);
    if (nextPage) {
      setShowPageTransition(true);
      await saveCurrentPageState(true);
      await new Promise(resolve => setTimeout(resolve, 50));

      try {
        if (!nextPage.get("customHtml") || !nextPage.get("customCss")) {
          try {
            setIsSyncing(true);
            const pageData = await pageService.detail(pageId);
            nextPage.set("customCss", pageData.css);
            nextPage.set("customHtml", pageData.html);
          } catch (error) {
            console.error("Failed to load page from server", error);
          } finally {
            setIsSyncing(false);
          }
        }
        pm.select(pageId);

        editor.setStyle(nextPage.get("customCss") || "");
        editor.setComponents(nextPage.get("customHtml") || "");
        setCurrentPage(pageId);
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Error switching page:", error);
        toast.error("Failed to switch page");
      } finally {
        setShowPageTransition(false);
      }
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

      if (session?.user) {
        try {
          setIsSyncing(true);
          /**await pageApi.createPage(projectId, {
            id: pageId,
            name: pageName,
            html: initialHtml,
            css: ""
          });**/
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

  
const handleRenamePage = async(pageId: string, newName: string) => {

  if (!editorRef.current) {
    return;
  }
 
  console.log('newName',newName);
  const editor = editorRef.current;
  const pm = editor.Pages;
  const page = pm.get(pageId);

  if (!page) {
    toast.error("Page not found");
    return;
  }

  setIsLoading(true);

  try {
    page.set("name", newName);
    
    setIsSyncing(true);
    await updateByIdMutation({
      id: pageId,
      data: {
        name: newName
      }
    });
    
    setPages(prev => prev.map(p => 
      p.id === pageId ? { ...p, name: newName } : p
    ));
    
    toast.success("Page renamed successfully!");
  } catch (error) {
    console.error("Failed to save page:", error);
    toast.error("Failed to save page. Please try again.");
    
    if (page) {
      const oldName = page.get("name");
      if (oldName !== newName) {
        page.set("name", oldName);
      }
    }
  } finally {
    setIsLoading(false);
    setIsSyncing(false);
  }
}

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
          setIsSyncing(true);
          await deletePage(pageId);
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

      pm.remove(pageId);

      if (currentPage === pageId) {
        const firstPage = pm.getAll()[0];
        if (firstPage) switchToPage(firstPage.id);
      }

      toast.success("Page deleted successfully");

  };

  const handleSavePage = async () => {
    if (!editorRef.current || !session?.user) {
      toast("You must be logged in to save pages");
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
    if (!editorRef.current || !session?.user) {
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

      // const { previewUrl } = await pageApi.generatePreview(projectId, page.id);

      // window.open(previewUrl, "_blank");
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
    isOpen,
    setIsOpen,
    pages,
    currentPage,
    switchToPage,
    handleAddPage,
    handleRenamePage,
    handleAddPageSubmit,
    handleDeletePage,
    handleSavePage,
    handlePreviewPage,
    showAddPageModal,
    setShowAddPageModal,
    newPageName,
    setNewPageName,
    isLoading,
    isSyncing,
    showPageTransition,
    isDragging
  };
};