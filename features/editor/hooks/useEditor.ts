import { useRef, useEffect } from "react";
import grapesjs from 'grapesjs';
import "grapesjs/dist/css/grapes.min.css";

// Import all plugins
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import grapesjsTailwind from "grapesjs-tailwind";
import gjsCustomCode from "grapesjs-custom-code";
import gjsComponentCodeEditor from "grapesjs-component-code-editor";
import gjsParserPostcss from "grapesjs-parser-postcss";
import gjsTooltip from "grapesjs-tooltip";
import grapesjsIcons from 'grapesjs-icons';
import grapeJsUiSuggestClasses from '@silexlabs/grapesjs-ui-suggest-classes';
import gjsTuiImageEditor from "grapesjs-tui-image-editor";
import gjsForms from 'grapesjs-plugin-forms';
import gjsRulers from 'grapesjs-rulers';
import gjsBlocksTable from 'grapesjs-blocks-table';
import grapesjsTabs from 'grapesjs-tabs';
import grapesjsStyleBg from 'grapesjs-style-bg';
import grapesjsStyleGradient from 'grapesjs-style-gradient';
import grapesjsUserBlocks from 'grapesjs-user-blocks';
import grapejsRteExtensions from 'grapesjs-rte-extensions';
import 'grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css';

import { fixWOFF2Persistence, initFontSystem } from "@/shared/lib/fonts";
import { 
  addTailwindV3Blocks, 
  configureDarkModeSupport, 
  configureTailwindExport, 
  configureTailwindJIT, 
  configureTailwindV3
} from "@/shared/lib/tailwind";
import { localStorageAPI } from "@/shared/lib/storage";
import toast from "react-hot-toast";

export const useEditor = () => {
  const editorRef = useRef(null);

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
        grapesjsIcons,
        grapeJsUiSuggestClasses,
        gjsForms,
        gjsBlocksTable,
        grapesjsStyleBg,
        grapesjsStyleGradient,
        gjsRulers,
        grapesjsUserBlocks,
        grapejsRteExtensions,
        grapesjsTabs
      ],
      pluginsOpts: {
        [grapesjsTailwind]: {
          useCustomBreakpoints: true
        },
        [grapesjsIcons]: {
          collections: [
            'ri', 'mdi', 'uim', 'streamline-emojis'
          ]
        },
        [gjsForms]: {
          blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
          category: 'Form',
          block: (blockId) => ({})
        },
        [gjsBlocksTable]: {
          'containerId': '#gjs' 
        },
        'grapesjs-rte-extensions': {
          base: {
            bold: true,
            italic: true,
            underline: true,
            strikethrough: true,
            link: true,
          },
          fonts: {
            fontSize: true,
            fontColor: true,
            hilite: true,
          },
          format: {
            heading1: true,
            heading2: true,
            heading3: true,
            paragraph: true,
            clearFormatting: true,
          },
          subscriptSuperscript: true,
          indentOutdent: true,
          list: true,
          align: true,
          actions: {
            copy: true,
            cut: true,
            paste: true,
            delete: true,
          },
          undoredo: true,
          extra: false,
          darkColorPicker: true,
          maxWidth: '600px'
        }
      }
    });

    editorRef.current = editor;
    if (typeof window !== "undefined") window.editor = editor;

    configureTailwindV3(editor);
    addTailwindV3Blocks(editor);
    configureTailwindJIT(editor);
    configureDarkModeSupport(editor);
    configureTailwindExport(editor);

    const fontManager = initFontSystem(editor);
    if (typeof window !== "undefined") window.fontManager = fontManager;
    
    const fontPersistence = fixWOFF2Persistence(editor);
    if (typeof window !== "undefined") window.fontPersistence = fontPersistence;

    // Add gradient feature
    editor.StyleManager.addProperty('decorations', {
      type: 'gradient', 
      name: 'Gradient',
      property: 'background-image',
      defaults: 'none',
      full: true,
    });
    
    editor.StyleManager.addProperty('decorations', {
      extend: 'background-image', 
      name: 'Gradient Background',
    });

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

    setupTailwindBlocks(editor);

    editor.on("load", loadTemplate);

    return () => editor.destroy();
  }, []);

  const setupTailwindBlocks = (editor) => {
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
  };

  const loadTemplate = async () => {
    const editor = editorRef.current;
    const id = localStorage.getItem('currentTemplateId');
    if (id) {
      try {
        const templateData = localStorageAPI.getTemplate(id);

        if (templateData) {
          handleTemplateData(editor, templateData);
        } else {
          try {
            const res = await axios.get(`${AppRoutes.template}/${id}`);
            const data = res.data;

            localStorageAPI.saveTemplate({
              id,
              ...data
            });

            handleTemplateData(editor, data);
          } catch (apiError) {
            console.log("Failed to load template from API", apiError);
            createNewHomePage(editor);
          }
        }

        toast.success("Template loaded successfully!");
      } catch (err) {
        console.log("Failed to load template", err);
        createNewHomePage(editor);
      }
    } else {
      createNewHomePage(editor);
    }
  };

  const handleTemplateData = (editor, data) => {
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

    if (data.pages.length > 0) {
      pm.select(data.pages[0].id);

      editor.setComponents(data.pages[0].html || "");
      editor.setStyle(data.pages[0].css || "");
    }
  };

  const createNewHomePage = (editor) => {
    const pm = editor.Pages;
    pm.add({
      id: "home",
      name: "Home",
      component: `<div class='p-4'></div>`,
    });
    pm.select("home");
  };

  return { editorRef };
};