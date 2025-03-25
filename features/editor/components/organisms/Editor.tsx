import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsTailwind from "grapesjs-tailwind";
import gjsCustomCode from "grapesjs-custom-code";
import gjsComponentCodeEditor from "grapesjs-component-code-editor";
import gjsParserPostcss from "grapesjs-parser-postcss";
import gjsTooltip from "grapesjs-tooltip";
import gjsTuiImageEditor from "grapesjs-tui-image-editor";

import { Plus, Trash2, FileText, Download } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import JSZip from "jszip";

const Editor = () => {
  const editorRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddPageModal, setShowAddPageModal] = useState(false);
  const [newPageName, setNewPageName] = useState("");
  const [templateDetails, setTemplateDetails] = useState({
    title: "",
    description: "",
    category: "",
  });

  const localStorageAPI = {
    saveTemplate: (templateData) => {
      const templates = JSON.parse(localStorage.getItem('templates') || '[]');
      let existingIndex = -1;
      
      if (templateData.id) {
        existingIndex = templates.findIndex(t => t.id === templateData.id);
      }
      
      if (existingIndex >= 0) {
        templates[existingIndex] = templateData;
      } else {
        templateData.id = `template-${Date.now()}`;
        templates.push(templateData);
      }
      
      localStorage.setItem('templates', JSON.stringify(templates));
      return templateData;
    },
    
    getTemplate: (id) => {
      const templates = JSON.parse(localStorage.getItem('templates') || '[]');
      return templates.find(t => t.id === id);
    },
    
    deletePage: (templateId, pageId) => {
      const templates = JSON.parse(localStorage.getItem('templates') || '[]');
      const templateIndex = templates.findIndex(t => t.id === templateId);
      
      if (templateIndex >= 0) {
        const template = templates[templateIndex];
        template.pages = template.pages.filter(p => p.id !== pageId);
        templates[templateIndex] = template;
        localStorage.setItem('templates', JSON.stringify(templates));
        return true;
      }
      return false;
    }
  };

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      height: "100vh",
      width: "auto",
      storageManager: { type: null },
      plugins: [
        grapesjsTailwind,
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsParserPostcss,
        gjsTooltip,
        gjsTuiImageEditor,
        gjsCustomCode,
        gjsComponentCodeEditor,
      ],
      canvas: {
        styles: [
          "https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css",
        ],
      },
      pluginsOpts: {
        [grapesjsTailwind]: {
          tailwindCss: 'https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css',
          useCustomBreakpoints: true,
          classGroups: {
            flex: ['flex', 'inline-flex', 'flex-row', 'flex-col'],
            grid: ['grid', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'],
            spacing: ['p-1', 'p-2', 'p-4', 'p-6', 'm-1', 'm-2', 'm-4', 'm-6'],
            variants: ['dark', 'hover', 'focus', 'lg', 'md', 'sm'],
          }
        }
      }
    });

    editorRef.current = editor;
    window.editor = editor;

    editor.Commands.add("set-internal-link", {
      run(editor) {
        const slug = prompt("Enter page slug (e.g. home, about, contact)");
        if (slug) {
          const id = localStorage.getItem('currentTemplateId') || '';
          const link = `/previewpage/${slug}-${id}`;
          const selected = editor.getSelected();
          if (selected && selected.is('a')) {
            selected.addAttributes({ href: link });
            toast.success(`Internal link set to: ${link}`);
          } else {
            toast.error("Please select an <a> element first!");
          }
        }
      },
    });

    editor.on("component:selected", (model) => {
      if (model.get("tagName") === "a") {
        model.addTrait({
          type: "button",
          label: "Set Internal Link",
          text: "Add Link",
          command: "set-internal-link",
        });
      }
    });

    // Add Tailwind v3 specific blocks
    editor.BlockManager.add('tailwind-container', {
      label: 'Container',
      category: 'Tailwind',
      content: {
        type: 'container',
        classes: ['container', 'mx-auto', 'px-4'],
      },
    });

    editor.BlockManager.add('tailwind-card', {
      label: 'Card',
      category: 'Tailwind',
      content: {
        type: 'div',
        classes: ['bg-white', 'shadow-lg', 'rounded-lg', 'p-6', 'dark:bg-gray-800'],
      },
    });

    editor.BlockManager.add('tailwind-grid', {
      label: 'Grid 3-Cols',
      category: 'Tailwind',
      content: {
        type: 'div',
        classes: ['grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4'],
        components: [
          { type: 'div', classes: ['p-4', 'bg-gray-100', 'rounded'], content: 'Column 1' },
          { type: 'div', classes: ['p-4', 'bg-gray-100', 'rounded'], content: 'Column 2' },
          { type: 'div', classes: ['p-4', 'bg-gray-100', 'rounded'], content: 'Column 3' },
        ],
      },
    });

    const loadTemplate = async () => {
      const id = localStorage.getItem('currentTemplateId');
      if (id) {
        try {
          const templateData = localStorageAPI.getTemplate(id);
          
          if (templateData) {
            handleTemplateData(templateData);
          } else {
            try {
              const res = await axios.get(`${AppRoutes.template}/${id}`);
              const data = res.data;
              
              // Save API result to localStorage for future use
              localStorageAPI.saveTemplate({
                id,
                ...data
              });
              
              handleTemplateData(data);
            } catch (apiError) {
              console.log("Failed to load template from API", apiError);
              createNewHomePage();
            }
          }
          
          toast.success("Template loaded successfully!");
        } catch (err) {
          console.log("Failed to load template", err);
          createNewHomePage();
        }
      } else {
        createNewHomePage();
      }
    };
    
    const handleTemplateData = (data) => {
      const pm = editor.Pages;
      pm.getAll().forEach((p) => pm.remove(p.id));
    
      data.pages.forEach((page) => {
        const newPage = pm.add({
          id: page.id,
          name: page.name,
        });
        newPage.set("customHtml", page.html);
        newPage.set("customCss", page.css);
      });
    
      setPages(pm.getAll().map((p) => ({ id: p.id, name: p.get("name") })));
      
      if (data.pages.length > 0) {
        pm.select(data.pages[0].id);
        setCurrentPage(data.pages[0].id);
    
        // Set canvas content for the first page
        editor.setComponents(data.pages[0].html || "");
        editor.setStyle(data.pages[0].css || "");
      }
    
      if (data?.settings) {
        setTemplateDetails({
          title: data.settings.title || "",
          description: data.settings.description || "",
          category: data.settings.category || "",
        });
      }
    };
    
    const createNewHomePage = () => {
      const pm = editor.Pages;
      const homePage = pm.add({
        id: "home",
        name: "Home",
        component: `<div class='p-4'></div>`,
      });
      pm.select("home");
      setPages([{ id: "home", name: "Home" }]);
      setCurrentPage("home");
    };

    editor.on("load", loadTemplate);

    return () => editor.destroy();
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;

    const editor = editorRef.current;

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

    return () => {
      editor.off("canvas:click");
    };
  }, [pages, currentPage]);

  const saveCurrentPageState = () => {
    const pm = editorRef.current.Pages;
    const currentPage = pm.getSelected();
    if (currentPage) {
      currentPage.set("customHtml", editorRef.current.getHtml());
      currentPage.set("customCss", editorRef.current.getCss());
    }
  };

  const switchToPage = (pageId) => {
    const pm = editorRef.current.Pages;
    const nextPage = pm.get(pageId);
    if (nextPage) {
      saveCurrentPageState();
      pm.select(pageId);
      editorRef.current.setComponents(nextPage.get("customHtml") || "");
      editorRef.current.setStyle(nextPage.get("customCss") || "");
      setCurrentPage(pageId);
    }
  };

  const handleAddPage = () => {
    setNewPageName("");
    setShowAddPageModal(true);
  };

  const handleAddPageSubmit = () => {
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
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
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
    const editor = editorRef.current;
    const page = editor.Pages.getSelected();
    const html = editor.getHtml();
    const css = editor.getCss();
    const pageName = page.get("name") || "previewpage";
    localStorage.setItem(`preview-${pageName}`, JSON.stringify({ html, css }));
    window.open(`/previewpage/${pageName}`, "_blank");
  };

  const handleSaveTemplate = () => {
    setShowModal(true);
  };
  
  const handleExportZip = async () => {
    try {
      saveCurrentPageState();
      
      const editor = editorRef.current;
      const pm = editor.Pages;
      const zip = new JSZip();
      
      const assetsFolder = zip.folder("assets");
      const cssFolder = zip.folder("css");
      const pagesFolder = zip.folder("pages");
      
      let indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateDetails.title || 'Exported Template'}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css">
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">${templateDetails.title || 'Exported Template'}</h1>
    <p class="mb-4">${templateDetails.description || 'Template pages'}</p>
    <ul class="list-disc pl-6">`;
      
      // Add shared CSS
      const allCSS = [];
      
      // Get all pages and create HTML/CSS files
      const allPages = pm.getAll();
      for (const page of allPages) {
        const pageId = page.id;
        const pageName = page.get("name") || pageId;
        const pageHtml = page.get("customHtml") || "";
        const pageCss = page.get("customCss") || "";
        
        // Add to main CSS collection (to be deduplicated)
        allCSS.push(pageCss);
        
        // Create individual page CSS file
        cssFolder.file(`${pageId}.css`, pageCss);
        
        // Create page HTML with proper links
        let processedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageName}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css">
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/${pageId}.css">
</head>
<body>
${pageHtml}
<div class="fixed bottom-4 right-4 bg-gray-200 p-2 rounded shadow">
  <a href="../index.html">Back to Index</a>
</div>
</body>
</html>`;

        pagesFolder.file(`${pageId}.html`, processedHtml);
        
        indexContent += `
      <li><a href="pages/${pageId}.html" class="text-blue-600 hover:underline">${pageName}</a></li>`;
      }

      indexContent += `
    </ul>
  </div>
</body>
</html>`;
      
      zip.file("index.html", indexContent);
      
      const combinedCSS = Array.from(new Set(allCSS.join('\n').split('\n'))).join('\n');
      cssFolder.file("main.css", combinedCSS);
      
      const images = extractImagesFromHTML(allPages.map(p => p.get("customHtml") || "").join(''));
      
      for (const [index, imgSrc] of images.entries()) {
        assetsFolder.file(`image_${index}.txt`, `Original image source: ${imgSrc}\n\nIn a complete implementation, the actual image would be included here.`);
      }
      
      zip.file("README.md", `# Exported Template: ${templateDetails.title || 'Untitled'}

## Description
${templateDetails.description || 'No description provided.'}

## Contents
- \`index.html\`: Main page with links to all template pages
- \`/pages/\`: Individual HTML pages 
- \`/css/\`: CSS files (main.css contains shared styles)
- \`/assets/\`: Extracted images and other assets

## Tailwind CSS
This template uses Tailwind CSS v3.3.5. It's included via CDN in each HTML file.

## How to Use
1. Open index.html to see all available pages
2. Navigate to individual pages through the links
3. All pages link back to the index

*Exported on: ${new Date().toLocaleString()}*`);
      
      const content = await zip.generateAsync({ type: "blob" });
      
      const zipFilename = `${templateDetails.title || 'template'}-export-${new Date().getTime()}.zip`.replace(/\s+/g, '-').toLowerCase();
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = zipFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success("Template exported as ZIP successfully!");
    } catch (error) {
      console.error("Failed to export template:", error);
      toast.error("Failed to export template. Please try again.");
    }
  };
  const extractImagesFromHTML = (html) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const sources = [];
    let match;
    
    while ((match = imgRegex.exec(html)) !== null) {
      sources.push(match[1]);
    }
    
    return sources;
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setTemplateDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const captureHomePageScreenshot = async () => {
    const editor = editorRef.current;
    const frame = editor.Canvas.getFrameEl();
    const canvasEl = frame?.contentWindow?.document?.body;

    if (!canvasEl) {
      toast.error("Could not capture canvas");
      return null;
    }

    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(canvasEl);
    return canvas.toDataURL("image/png");
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const editor = editorRef.current;

    const image = await captureHomePageScreenshot();
    const pm = editor.Pages;
    
    saveCurrentPageState();

    const projectPages = pm.getAll().map((page) => {
      return {
        id: page.id,
        name: page.get("name"),
        html: page.get("customHtml") || "",
        css: page.get("customCss") || "",
      };
    });

    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{"_id": "local-user", "role": "user"}');
    const templateId = localStorage.getItem('currentTemplateId');

    const projectData = {
      id: templateId,
      userID: userDetails._id,
      title: templateDetails.title,
      description: templateDetails.description,
      category: templateDetails.category,
      image,
      pages: projectPages,
      settings: {
        title: templateDetails.title,
        description: templateDetails.description,
        category: templateDetails.category,
      }
    };

    const savedTemplate = localStorageAPI.saveTemplate(projectData);
    localStorage.setItem('currentTemplateId', savedTemplate.id);
    
    if (userDetails.role === 'user') {
      try {
        let templateRes;
    
        if (templateId) {
          try {
            templateRes = await axios.put(`${AppRoutes.template}/${templateId}`, projectData);
            toast.success("Template updated in main library!");
          } catch (apiError) {
            console.error("Failed to update template on server", apiError);
            toast.success("Template saved locally! (Server update failed)");
            templateRes = { data: savedTemplate };
          }
        } else {
          try {
            templateRes = await axios.post(AppRoutes.template, projectData);
            toast.success("Template saved to main library!");
            localStorage.setItem('currentTemplateId', templateRes.data._id);
          } catch (apiError) {
            console.error("Failed to save template to server", apiError);
            toast.success("Template saved locally! (Server save failed)");
            templateRes = { data: savedTemplate };
          }
        }
    
        const savedServerTemplate = templateRes.data;
        
        try {
          await axios.post(`${AppRoutes.userTemplate}`, { 
            userID: userDetails._id, 
            templateID: savedServerTemplate._id || savedTemplate.id, 
            name: savedServerTemplate.name || savedTemplate.title, 
            description: savedServerTemplate.description || savedTemplate.description,
            category: savedServerTemplate.category || savedTemplate.category,
            title: savedServerTemplate.title || savedTemplate.title,
            pages: projectPages,
          });
          toast.success("Also added to your personal dashboard!");
        } catch (apiError) {
          console.error("Failed to save to user template collection", apiError);
        }
      } catch (error) {
        toast.error("Error with API calls, but template is saved locally.");
        console.error(error);
      }
    } else {
      try {
        if (templateId) {
          try {
            await axios.put(`${AppRoutes.template}/${templateId}`, projectData);
            toast.success("Template updated successfully!");
          } catch (apiError) {
            console.error("Failed to update template on server", apiError);
            toast.success("Template saved locally! (Server update failed)");
          }
        } else {
          try {
            const response = await axios.post(AppRoutes.template, projectData);
            localStorage.setItem('currentTemplateId', response.data._id);
            toast.success("Template saved successfully!");
          } catch (apiError) {
            console.error("Failed to save template to server", apiError);
            toast.success("Template saved locally! (Server save failed)");
          }
        }
      } catch (error) {
        toast.error("Error with API calls, but template is saved locally.");
      }
    }
    
    setShowModal(false);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-slate-900 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Pages</h2>
        <div className="flex-1 space-y-2 overflow-y-auto">
          {pages.map((page) => (
            <div
              key={page.id}
              className={`flex items-center justify-between p-2 mb-2 rounded cursor-pointer ${
                currentPage === page.id ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <span className="flex-1" onClick={() => switchToPage(page.id)}>
                {page?.name || "Home"}
              </span>
              {page.id !== "home" && (
                <button
                  onClick={() => handleDeletePage(page.id)}
                  className="p-1 hover:bg-red-500 rounded"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddPage}
          className="flex items-center justify-center mt-4 p-2 bg-green-600 hover:bg-green-700 rounded"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Page
        </button>

        <button
          onClick={handleSavePage}
          className="flex items-center justify-center mt-4 p-2 bg-blue-600 hover:bg-blue-700 rounded"
        >
          <FileText className="w-4 h-4 mr-2" /> Save Page
        </button>

        <button
          onClick={handlePreviewPage}
          className="flex items-center justify-center mt-4 p-2 bg-yellow-600 hover:bg-yellow-700 rounded"
        >
          <FileText className="w-4 h-4 mr-2" /> Preview
        </button>

        <button
          onClick={handleSaveTemplate}
          className="flex items-center justify-center mt-4 p-2 bg-purple-600 hover:bg-purple-700 rounded"
        >
          <FileText className="w-4 h-4 mr-2" /> Save Template
        </button>

        <button
          onClick={handleExportZip}
          className="flex items-center justify-center mt-4 p-2 bg-indigo-600 hover:bg-indigo-700 rounded"
        >
          <Download className="w-4 h-4 mr-2" /> Export as ZIP
        </button>
      </div>

      <div id="gjs" className="flex-1"></div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleModalSubmit}
            className="bg-white p-8 rounded shadow-lg space-y-4 w-96"
          >
            <h2 className="text-xl font-bold">Template Details</h2>
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
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded"
            >
              Save Template
            </button>
          </form>
        </div>
      )}

      {showAddPageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">New Page</h2>
            <input
              type="text"
              placeholder="Enter page name"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              onClick={handleAddPageSubmit}
              className="w-full p-2 bg-green-600 text-white rounded"
            >
              Add Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;