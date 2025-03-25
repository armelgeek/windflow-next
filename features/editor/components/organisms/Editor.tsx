import React, { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { usePlugin } from 'grapesjs'
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsTailwind from "grapesjs-tailwind";
import gjsCustomCode from "grapesjs-custom-code";
import gjsComponentCodeEditor from "grapesjs-component-code-editor";
import gjsParserPostcss from "grapesjs-parser-postcss";
import gjsTooltip from "grapesjs-tooltip";
import grapesjsIcons from 'grapesjs-icons'

import gjsTuiImageEditor from "grapesjs-tui-image-editor";

import { Plus, Trash2, FileText, Download } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import JSZip from "jszip";
import { fixWOFF2Persistence, initFontSystem, persistCustomFonts } from "@/shared/lib/fonts";
import { addTailwindV3Blocks, configureDarkModeSupport, configureTailwindExport, configureTailwindJIT, configureTailwindV3, generateTailwindConfig } from "@/shared/lib/tailwind";
import { localStorageAPI } from "@/shared/lib/storage";
import { replaceImageURLs } from "@/shared/lib/image";





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
        grapesjsIcons
      ],
      pluginsOpts: {
        [grapesjsTailwind]: {
          useCustomBreakpoints: true
        },
        [grapesjsIcons]: {
          // see https://icon-sets.iconify.design/
          collections: [
            'ri', // Remix Icon by Remix Design
            'mdi', // Material Design Icons by Pictogrammers
            'uim', // Unicons Monochrome by Iconscout
            'streamline-emojis' // Streamline Emojis by Streamline
          ]
        }
      }
    });

    editorRef.current = editor;
    window.editor = editor;

    configureTailwindV3(editor);
    addTailwindV3Blocks(editor);
    configureTailwindJIT(editor);
    configureDarkModeSupport(editor);
    configureTailwindExport(editor);
    const fontManager = initFontSystem(editor);
    window.fontManager = fontManager;
    const fontPersistence = fixWOFF2Persistence(editor);
    window.fontPersistence = fontPersistence;
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
      if (!editor) return;
      const pm = editor.Pages;
      const zip = new JSZip();

      const assetsFolder = zip.folder("assets");
      const cssFolder = zip.folder("css");
      const fontsFolder = zip.folder("fonts");
      const pagesFolder = zip.folder("pages");

      const savedFonts = localStorage.getItem('gjs-fonts');
      const fonts = savedFonts ? JSON.parse(savedFonts) : { system: [], google: [], custom: [] };

      if (fonts.custom && fonts.custom.length > 0) {
        let fontCssContent = '';

        for (const font of fonts.custom) {
          if (!font || !font.name) continue;

          const fontName = font.name.toLowerCase().replace(/\s+/g, '-');

          if (font.files) {
            if (typeof font.files === 'string' && font.files.startsWith('data:')) {
              try {
                const matches = font.files.match(/^data:([^;]+);base64,(.+)$/);

                if (matches && matches.length === 3) {
                  const mimeType = matches[1];
                  const base64Data = matches[2];

                  let extension = 'woff2';
                  if (mimeType === 'font/ttf' || mimeType === 'application/x-font-ttf') {
                    extension = 'ttf';
                  } else if (mimeType === 'font/woff' || mimeType === 'application/font-woff') {
                    extension = 'woff';
                  } else if (mimeType === 'font/otf' || mimeType === 'application/x-font-otf') {
                    extension = 'otf';
                  }

                  const fontFileName = `${fontName}.${extension}`;

                  fontsFolder.file(fontFileName, base64Data, { base64: true });

                  fontCssContent += `
                  @font-face {
                    font-family: "${font.name}";
                    src: url("../fonts/${fontFileName}") format("${extension === 'ttf' ? 'truetype' : extension}");
                    font-weight: 400;
                    font-style: normal;
                  }
                  `;
                }
              } catch (error) {
                console.error(`Erreur lors du traitement de la police ${font.name}:`, error);
              }
            } else if (Array.isArray(font.files)) {
              // Traiter plusieurs variantes de la même police
              for (let i = 0; i < font.files.length; i++) {
                const file = font.files[i];
                if (file && file.url && typeof file.url === 'string' && file.url.startsWith('data:')) {
                  try {
                    const matches = file.url.match(/^data:([^;]+);base64,(.+)$/);

                    if (matches && matches.length === 3) {
                      const mimeType = matches[1];
                      const base64Data = matches[2];

                      // Déterminer l'extension
                      let extension = 'woff2';
                      if (mimeType === 'font/ttf' || mimeType === 'application/x-font-ttf') {
                        extension = 'ttf';
                      } else if (mimeType === 'font/woff' || mimeType === 'application/font-woff') {
                        extension = 'woff';
                      } else if (mimeType === 'font/otf' || mimeType === 'application/x-font-otf') {
                        extension = 'otf';
                      }

                      // Nom du fichier avec variante
                      const weight = file.weight || 400;
                      const style = file.style || 'normal';
                      const fontFileName = `${fontName}-${weight}-${style}.${extension}`;

                      // Ajouter le fichier
                      fontsFolder.file(fontFileName, base64Data, { base64: true });

                      // Ajouter la règle @font-face
                      fontCssContent += `
@font-face {
  font-family: "${font.name}";
  src: url("../fonts/${fontFileName}") format("${extension === 'ttf' ? 'truetype' : extension}");
  font-weight: ${weight};
  font-style: ${style};
}
`;
                    }
                  } catch (error) {
                    console.error(`Erreur lors du traitement de la variante de police ${font.name}:`, error);
                  }
                }
              }
            }
          } else if (font.fontFaceData) {
            // Si nous n'avons pas les fichiers mais que nous avons les données @font-face,
            // essayons d'extraire l'URL de la police à partir des données @font-face
            try {
              // Extraire l'URL de la police à partir de la règle @font-face
              const urlMatch = font.fontFaceData.match(/url\("([^"]+)"\)/);
              if (urlMatch && urlMatch.length > 1) {
                const fontUrl = urlMatch[1];

                if (fontUrl.startsWith('data:')) {
                  // C'est une police en base64
                  const matches = fontUrl.match(/^data:([^;]+);base64,(.+)$/);

                  if (matches && matches.length === 3) {
                    const mimeType = matches[1];
                    const base64Data = matches[2];

                    // Déterminer l'extension
                    let extension = 'woff2';
                    if (mimeType === 'font/ttf' || mimeType === 'application/x-font-ttf') {
                      extension = 'ttf';
                    } else if (mimeType === 'font/woff' || mimeType === 'application/font-woff') {
                      extension = 'woff';
                    } else if (mimeType === 'font/otf' || mimeType === 'application/x-font-otf') {
                      extension = 'otf';
                    }

                    // Nom du fichier
                    const fontFileName = `${fontName}.${extension}`;

                    // Ajouter le fichier
                    fontsFolder.file(fontFileName, base64Data, { base64: true });

                    // Générer une nouvelle règle @font-face qui pointe vers le fichier local
                    // Extraire le poids et le style de la règle existante
                    const weightMatch = font.fontFaceData.match(/font-weight\s*:\s*([^;]+);/);
                    const styleMatch = font.fontFaceData.match(/font-style\s*:\s*([^;]+);/);

                    const weight = weightMatch && weightMatch.length > 1 ? weightMatch[1].trim() : 400;
                    const style = styleMatch && styleMatch.length > 1 ? styleMatch[1].trim() : 'normal';

                    fontCssContent += `
@font-face {
  font-family: "${font.name}";
  src: url("../fonts/${fontFileName}") format("${extension === 'ttf' ? 'truetype' : extension}");
  font-weight: ${weight};
  font-style: ${style};
}
`;
                  }
                } else {
                  // C'est une URL externe, nous allons simplement copier la règle @font-face
                  fontCssContent += font.fontFaceData;
                }
              } else {
                // Aucune URL trouvée, nous allons simplement copier la règle @font-face
                fontCssContent += font.fontFaceData;
              }
            } catch (error) {
              console.error(`Erreur lors du traitement des données @font-face pour ${font.name}:`, error);
              // En cas d'erreur, on ajoute simplement les données brutes
              fontCssContent += font.fontFaceData;
            }
          }
        }

        if (fontCssContent && cssFolder) {
          cssFolder.file('fonts.css', fontCssContent);
        }
      }


      zip.file("tailwind.config.js", generateTailwindConfig(fonts));

      const allPages = pm.getAll();
      const processedImages = {};
      let imageCount = 0;


      for (const page of allPages) {
        const pageId = page.id;
        const pageName = page.get("name") || pageId;
        const pageHtml = page.get("customHtml") || "";
        const pageCss = page.get("customCss") || "";

        const base64Regex = /<img[^>]+src=["'](data:image\/[^;]+;base64,[^"']+)["'][^>]*>/g;
        let match;
        let processedHtml = pageHtml;

        while ((match = base64Regex.exec(pageHtml)) !== null) {
          const fullTag = match[0];
          const base64Data = match[1];

          if (processedImages[base64Data]) {
            processedHtml = processedHtml.replace(base64Data, processedImages[base64Data]);
            continue;
          }

          const mimeMatch = base64Data.match(/data:image\/([^;]+);/);
          const imageType = mimeMatch ? mimeMatch[1] : 'png';

          const fileName = `image-${imageCount++}.${imageType}`;
          const imagePath = `../assets/${fileName}`;

          try {
            const base64Content = base64Data.split(',')[1];
            assetsFolder.file(fileName, base64Content, { base64: true });

            processedImages[base64Data] = imagePath;

            processedHtml = processedHtml.replace(base64Data, imagePath);

            console.log(`Extracted image: ${fileName}`);
          } catch (e) {
            console.error(`Failed to extract image: ${e.message}`);
          }
        }

        const backgroundRegex = /background(?:-image)?:\s*url\(["']?(data:image\/[^;]+;base64,[^"')]+)["']?\)/g;
        while ((match = backgroundRegex.exec(pageHtml)) !== null) {
          const fullMatch = match[0];
          const base64Data = match[1];

          // Skip if already processed
          if (processedImages[base64Data]) {
            processedHtml = processedHtml.replace(base64Data, processedImages[base64Data]);
            continue;
          }

          // Determine image type from the data URL
          const mimeMatch = base64Data.match(/data:image\/([^;]+);/);
          const imageType = mimeMatch ? mimeMatch[1] : 'png';

          // Create a unique filename
          const fileName = `bg-image-${imageCount++}.${imageType}`;
          const imagePath = `../assets/${fileName}`;

          // Store image in assets folder
          try {
            // Extract the base64 part (after the comma)
            const base64Content = base64Data.split(',')[1];
            assetsFolder.file(fileName, base64Content, { base64: true });

            // Track processed image
            processedImages[base64Data] = imagePath;

            // Replace in HTML
            processedHtml = processedHtml.replace(base64Data, imagePath);

            console.log(`Extracted background image: ${fileName}`);
          } catch (e) {
            console.error(`Failed to extract background image: ${e.message}`);
          }
        }
      }

      let indexContent = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${templateDetails.title || 'Exported Template'}</title>
        ${fonts.google && fonts.google.filter(font => font && font.url).map(font => `<link href="${font.url}" rel="stylesheet">`).join('\n  ')}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <script src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"></script>
        ${fonts.custom && fonts.custom.length > 0 ? '<link rel="stylesheet" href="css/fonts.css">' : ''}
        <link rel="stylesheet" href="css/main.css">
      </head>
      <body>
        <div class="container mx-auto p-4">
          <h1 class="text-2xl font-bold mb-4">${templateDetails.title || 'Exported Template'}</h1>
          <p class="mb-4">${templateDetails.description || 'Template pages'}</p>
          <ul class="list-disc pl-6">`;

      const allCSS = [];

      for (const page of allPages) {
        const pageId = page.id;
        const pageName = page.get("name") || pageId;
        let pageHtml = page.get("customHtml") || "";
        const pageCss = page.get("customCss") || "";

        pageHtml = replaceImageURLs(pageHtml, processedImages);

        allCSS.push(pageCss);
        if (cssFolder) cssFolder.file(`${pageId}.css`, pageCss);

        const processedHtml = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>${pageName}</title>
                  ${fonts.google && fonts.google.filter(font => font && font.url).map(font => `<link href="${font.url}" rel="stylesheet">`).join('\n  ')}
                  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
                  <script src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"></script>
                  ${fonts.custom && fonts.custom.length > 0 ? '<link rel="stylesheet" href="../css/fonts.css">' : ''}
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
        if (pagesFolder) pagesFolder.file(`${pageId}.html`, processedHtml);
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
      if (cssFolder) cssFolder.file("main.css", combinedCSS);

      zip.file("README.md", `# ${templateDetails.title || 'Untitled'} - Template Tailwind v3

      ## Description
      ${templateDetails.description || 'No description provided.'}

      ## Polices personnalisées
      Ce template utilise ${fonts.google && fonts.custom ? (fonts.google.length + fonts.custom.length) : 0} polices personnalisées:
      ${fonts.google ? fonts.google.filter(f => f && f.name).map(font => `- ${font.name} (Google Fonts)`).join('\n') : ''}
      ${fonts.custom ? fonts.custom.filter(f => f && f.name).map(font => `- ${font.name} (Police personnalisée)`).join('\n') : ''}

      ## Structure du projet
      - \`index.html\`: Page principale avec liens vers toutes les pages du template
      - \`/pages/\`: Pages HTML individuelles
      - \`/css/\`: Fichiers CSS (main.css contient les styles partagés, fonts.css contient les polices personnalisées)
      - \`/fonts/\`: Fichiers de polices personnalisées
      - \`/assets/\`: Images et autres ressources
      - \`tailwind.config.js\`: Configuration Tailwind avec les polices personnalisées

      ## Utilisation
      1. Ouvrir index.html pour voir toutes les pages disponibles
      2. Naviguer vers les pages individuelles via les liens

      *Exporté le: ${new Date().toLocaleString()}*`);

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

      toast.success("Template exporté avec succès!");
    } catch (error) {
      console.error("Failed to export template:", error);
      toast.error("Failed to export template. Please try again.");
    }
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
              className={`flex items-center justify-between p-2 mb-2 rounded cursor-pointer ${currentPage === page.id ? "bg-blue-600" : "hover:bg-gray-700"
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