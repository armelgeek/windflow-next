import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { localStorageAPI } from "@/shared/lib/storage";

export const usePages = (editorRef) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState("");

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;
    
    const updatePagesState = () => {
      const pm = editor.Pages;
      if (pm && pm.getAll) {
        setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
      }
    };

    editor.on("canvas:click", (event) => {
      const el = event.target;
      if (el.tagName === "A" && el.getAttribute("href")) {
        event.preventDefault();

        const href = el.getAttribute("href");
        const pm = editor.Pages;

        const page = pm.getAll().find((p) => p.id === href);
        if (page) {
          switchToPage(href);
        } else {
          toast.error("Page not found!");
        }
      }
    });

    editor.on("load", () => {
      const pm = editor.Pages;
      if (pm && pm.getAll) {
        updatePagesState();
        
        const selectedPage = pm.getSelected();
        if (selectedPage) {
          setCurrentPage(selectedPage.id);
        }
      }
    });

    return () => {
      editor.off("canvas:click");
      editor.off("load");
    };
  }, [editorRef]);

  const saveCurrentPageState = () => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    const currentPageObj = pm.getSelected();
    
    if (currentPageObj) {
      currentPageObj.set("customHtml", editor.getHtml());
      currentPageObj.set("customCss", editor.getCss());
    }
  };

  const switchToPage = (pageId) => {
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

  const handleAddPageSubmit = () => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    const pageName = newPageName.trim();
    
    if (!pageName) {
      toast.error("Page name cannot be empty");
      return;
    }
    
    const pageId = pageName.toLowerCase().replace(/\s+/g, "-");
    pm.add({
      id: pageId,
      name: pageName,
      component: `<div class='p-4'>${pageName} Page</div>`,
    });
    
    setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
    switchToPage(pageId);
    setShowAddPageModal(false);
  };

  const handleDeletePage = async (pageId) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const pm = editor.Pages;
    
    if (pm.getAll().length <= 1) {
      toast.error("Cannot delete the last page");
      return;
    }

    try {
      const id = localStorage.getItem('currentTemplateId');

      if (id) {
        const success = localStorageAPI.deletePage(id, pageId);

        if (success) {
          toast.success("Page deleted from local storage!");
        } else {
          try {
            await axios.delete(`${AppRoutes.template}/${id}/page/${pageId}`);
            toast.success("Page deleted from server!");
          } catch (apiError) {
            console.error("Failed to delete page from API", apiError);
            toast.error("Failed to delete page from server, but removed locally.");
          }
        }
      } else {
        toast.success("Page deleted locally!");
      }

      pm.remove(pageId);
      setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));

      if (currentPage === pageId) {
        const firstPage = pm.getAll()[0];
        if (firstPage) switchToPage(firstPage.id);
      }
    } catch (error) {
      toast.error("Failed to delete page.");
    }
  };

  const handleSavePage = () => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
    
    if (!page) {
      toast.error("No page selected");
      return;
    }
    
    const pageData = {
      id: page.id,
      name: page.get("name"),
      html: editor.getHtml(),
      css: editor.getCss(),
    };

    localStorage.setItem(`page-${page.id}`, JSON.stringify(pageData));

    const templateId = localStorage.getItem('currentTemplateId');
    if (templateId) {
      const template = localStorageAPI.getTemplate(templateId);
      if (template) {
        const pageIndex = template.pages.findIndex(p => p.id === page.id);
        if (pageIndex >= 0) {
          template.pages[pageIndex] = pageData;
        } else {
          template.pages.push(pageData);
        }
        localStorageAPI.saveTemplate(template);
      }
    }

    toast.success("Page saved successfully!");
  };

  const handlePreviewPage = () => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
    
    if (!page) {
      toast.error("No page selected");
      return;
    }
    
    const html = editor.getHtml();
    const css = editor.getCss();
    const pageName = page.get("name") || "previewpage";
    
    localStorage.setItem(`preview-${pageName}`, JSON.stringify({ html, css }));
    if (typeof window !== undefined) window.open(`/previewpage/${pageName}`, "_blank");
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
   // saveCurrentPageState
  };
};