import { useRef, useEffect, useState } from "react";
import grapesjs from 'grapesjs';
import "grapesjs/dist/css/grapes.min.css";

import grapesjsIcons from 'grapesjs-icons';
import grapeJsUiSuggestClasses from '@silexlabs/grapesjs-ui-suggest-classes';
import gjsForms from 'grapesjs-plugin-forms';

import grapesjsTailwind from "grapesjs-tailwind";
import gjsComponentCodeEditor from "grapesjs-component-code-editor";



import 'grapesjs-rte-extensions/dist/grapesjs-rte-extensions.min.css';

import { fontFamilies, initFontSystem } from "@/shared/lib/fonts";
import {
  configureTailwindExport,
} from "@/shared/lib/tailwind";
import toast from "react-hot-toast";
import { useSession } from '../../../shared/hooks/use-session-info';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsPluginForms from 'grapesjs-plugin-forms';
import gjsPluginExport from 'grapesjs-plugin-export';
import gjsBlocksBasic from 'grapesjs-blocks-basic';
import gjsPluginCkeditor from 'grapesjs-plugin-ckeditor';
import gjsStyleBg from 'grapesjs-style-bg';
import gjsCustomCode from 'grapesjs-custom-code';
import gjsTouch from 'grapesjs-touch';
import gjsParserPostcss from 'grapesjs-parser-postcss';
import gjsTooltip from 'grapesjs-tooltip';
import gjsTuiImageEditor from 'grapesjs-tui-image-editor';
import gjsTyped from 'grapesjs-typed';
import gjsStyleFilter from 'grapesjs-style-filter';
import gjsPresetNewsletter from 'grapesjs-preset-newsletter';
import { setupBlocks } from "@/shared/lib/blocks";
interface CssCodeViewer {
  set: (options: {
    codeName: string;
    readOnly: boolean;
    theme: string;
    autoBeautify: boolean;
    autoCloseTags: boolean;
    autoCloseBrackets: boolean;
    lineWrapping: boolean;
    styleActiveLine: boolean;
    smartIndent: boolean;
    indentWithTabs: boolean;
  }) => void;
  setContent: (content: string) => void;
  getContent: () => string;
  editor: HTMLElement;
}

interface Modal {
  setTitle: (title: string) => void;
  setContent: (content: HTMLElement) => void;
  open: () => void;
  onceClose: (callback: () => void) => void;
}

interface Editor {
  Commands: {
    add: (id: string, command: { run: (editor: Editor, sender?: Sender) => void }) => void;
  };
  CodeManager: {
    getViewer: (type: string) => { clone: () => CssCodeViewer };
  };
  Modal: Modal;
  getCss: () => string;
  setCss: (css: string) => void;
  refresh: () => void;
}

interface Sender {
  set: (key: string, value: number) => void;
}
export const useEditor = () => {
  const editorRef = useRef(null);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true); 
  const loadFonts = () => {
    const savedFonts = localStorage.getItem('gjs-fonts');
    return savedFonts ? JSON.parse(savedFonts) : fontFamilies;
  };

  const fonts = loadFonts();
  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      height: "100vh",
      width: "auto",
      layerManager: {
        sortable: true,
      },
      storageManager: { type: null },
      plugins: [
        gjsPresetWebpage,
        gjsBlocksBasic,
        gjsParserPostcss,
        gjsTooltip,
        gjsTuiImageEditor,
        gjsCustomCode,
        gjsComponentCodeEditor,
        grapesjsTailwind,
        grapesjsIcons,
        grapeJsUiSuggestClasses,
        gjsForms,
        gjsPluginForms,
        gjsPluginExport,
        gjsStyleBg,
        gjsTouch,
        gjsTyped,
        gjsStyleFilter,
        gjsPresetNewsletter,
      ],
      pluginsOpts: {
        [grapesjsTailwind]: {
          useCustomBreakpoints: true,
        },
        [grapesjsIcons]: {
          collections: ['ri', 'mdi', 'uim', 'streamline-emojis'],
        },
        [gjsForms]: {
          blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
          category: 'Form',
          block: (blockId) => ({}),
        },
        [gjsPluginForms]: {},
        [gjsPresetWebpage]: {},
        [gjsPluginExport]: {},
        [gjsBlocksBasic]: {},
        [gjsPluginCkeditor]: {},
        [gjsStyleBg]: {},
        [gjsCustomCode]: {},
        [gjsTouch]: {},
        "gjsParserPostcss": {},
        [gjsTooltip]: {},
        [gjsTuiImageEditor]: {},
        [gjsTyped]: {},
        [gjsStyleFilter]: {},
        [gjsPresetNewsletter]: {},
      },
    });

    editorRef.current = editor;
    const { addGoogleFont, injectFontsToCanvas, updateFontOptions, removeGoogleFont } = initFontSystem(editor);
    configureTailwindExport(editor);
    setupBlocks(editor);


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
    editor.Panels.addButton('options', {
      id: 'open-fonts',
      className: 'fa fa-font',
      command: 'open-fonts',
      attributes: { title: 'Gérer les polices Google' }
    });

    editor.Commands.add('open-font-selector', {
      run: (editor: { getSelected: () => any; StyleManager: { select: (arg0: string) => void; }; DomComponents: { addComponent: (arg0: { type: string; content: string; style: { padding: string; }; }) => any; }; select: (arg0: any) => void; }) => {
        const selectedComponent = editor.getSelected();
        if (selectedComponent) {
          editor.StyleManager.select('typography');
        } else {
          const component = editor.DomComponents.addComponent({
            type: 'text',
            content: 'Sélectionnez une police',
            style: { padding: '10px' }
          });
          editor.select(component);
          editor.StyleManager.select('typography');
        }
      }
    });

    editor.Commands.add('open-fonts', {
      run(editor) {
        const fonts = loadFonts();

        editor.Modal.open({
          title: 'Gestionnaire de polices Google',
          content: `
        <div style="padding: 15px; max-height: 70vh; overflow-y: auto; font-family: sans-serif;">
          <!-- Add font section -->
          <div style="margin-bottom: 15px;">
            <h3 style="margin-bottom: 10px; font-size: 16px;">Ajouter une police Google</h3>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="google-font-input" placeholder="Nom de la police Google" 
                style="flex: 1; padding: 8px; border: 1px solid #ddd;">
              <button id="add-google-font" 
                style="padding: 8px 12px; background-color: #4285F4; color: white; border: none;">
                Ajouter
              </button>
            </div>
            <p style="margin-top: 5px; font-size: 12px; color: #777;">Exemple: Roboto, Open Sans, Lato</p>
          </div>
          
          <!-- Available fonts section -->
          <div>
            <h3 style="margin-bottom: 10px; font-size: 16px;">Polices Google disponibles</h3>
            <div id="google-fonts-list" style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${fonts.google.length === 0 ?
              '<p style="color: #777;">Aucune police Google ajoutée.</p>' :
              fonts.google.map((font) => `
                  <div style="display: inline-flex; align-items: center; padding: 5px 10px; background-color: #000; border: 1px solid #ddd; border-radius: 3px;">
                    <span style="font-family: ${font.value}; margin-right: 5px;">${font.name}</span>
                    <button class="remove-font" data-font="${font.name}" style="background: none; border: none; cursor: pointer; color: #d33; font-size: 14px; line-height: 1; padding: 0 3px;">×</button>
                  </div>
                `).join('')
            }
            </div>
          </div>
        </div>
      `
        });

        const updateFontsList = () => {
          const currentFonts = loadFonts();
          const listContainer = document.getElementById('google-fonts-list');

          if (listContainer) {
            listContainer.innerHTML = currentFonts.google.length === 0 ?
              '<p style="color: #777;">Aucune police Google ajoutée.</p>' :
              currentFonts.google.map((font) => `
            <div style="display: inline-flex; align-items: center; padding: 5px 10px; background-color: #000; border: 1px solid #ddd; border-radius: 3px;">
              <span style="font-family: ${font.value}; margin-right: 5px;">${font.name}</span>
              <button class="remove-font" data-font="${font.name}" style="background: none; border: none; cursor: pointer; color: #d33; font-size: 14px; line-height: 1; padding: 0 3px;">×</button>
            </div>
          `).join('');

            const removeButtons = document.querySelectorAll('.remove-font');
            removeButtons.forEach(button => {
              button.addEventListener('click', handleRemoveFont);
            });
          }
        };

        const handleRemoveFont = (e) => {
          const fontName = e.currentTarget.getAttribute('data-font');
          if (fontName) {
            if (confirm(`Êtes-vous sûr de vouloir supprimer la police "${fontName}" ?`)) {
              const removed = removeGoogleFont(fontName);
              if (removed) {
                toast.success(`Police "${fontName}" supprimée avec succès!`);
                updateFontsList(); // Update the list immediately
              } else {
                toast.error(`Erreur lors de la suppression de la police "${fontName}".`);
              }
            }
          }
        };

        // Add font button handler
        document.getElementById('add-google-font').addEventListener('click', () => {
          const fontInput = document.getElementById('google-font-input');
          const fontName = fontInput.value.trim();

          if (fontName) {
            const added = addGoogleFont(fontName);
            if (added) {
              toast.success(`Police Google "${fontName}" ajoutée avec succès!`);
              fontInput.value = ''; // Clear the input
              updateFontsList(); // Update the list immediately
            } else {
              toast.error(`La police "${fontName}" existe déjà.`);
            }
          } else {
            toast.error('Veuillez entrer un nom de police.');
          }
        });

        // Initial setup of event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.remove-font');
        removeButtons.forEach(button => {
          button.addEventListener('click', handleRemoveFont);
        });
      }
    });

    /**editor.Panels.addButton('options', {
      id: 'save-project',
      className: 'fa fa-floppy-o',
      command: 'save-project',
      attributes: { title: 'Save Project' }
    });

  
    editor.Commands.add('save-project', {
      run: function (editor) {
        editor.store();
        editor.Notifications.add({
          title: 'Project saved',
          content: 'Your project has been saved successfully',
          type: 'success',
          timeout: 3000
        });
      }
    });**/
    


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



    
    editor.on('load', () => {
      console.log('Editor loaded, initializing fonts...');
      const canvas = editor.Canvas || editor.get('Canvas');
      if (canvas) {
        setTimeout(() => {
          injectFontsToCanvas();
          updateFontOptions();
        }, 300);
       
     }
     setIsLoading(false); 
    });

    editor.on('project:load', () => {
      console.log('Editor loaded, initializing fonts...');
      const canvas = editor.Canvas || editor.get('Canvas');
      if (canvas) {
        setTimeout(() => {
          injectFontsToCanvas();
          updateFontOptions();
        }, 300);
       
     }
     setIsLoading(false); 
    });

    editor.on('canvas:rendered', () => {
      console.log('Canvas rendered, injecting fonts...');
      const canvas = editor.Canvas || editor.get('Canvas');
      if (canvas) {
        injectFontsToCanvas();
        updateFontOptions();
       
      } else {
        console.error('Canvas is undefined, skipping font injection');
      }
      setIsLoading(false);
    });
    editor.on('component:mount', () => {
      const canvas = editor.Canvas || editor.get('Canvas');
      if (canvas) {
        injectFontsToCanvas();
        updateFontOptions();
      }
    });
    editor.on('component:selected', () => {
      const canvas = editor.Canvas || editor.get('Canvas');
      if (canvas) {
        injectFontsToCanvas();
        updateFontOptions();
      }
    });

    return () => editor.destroy();
  }, []);



  /**const loadTemplate = async () => {
    const editor = editorRef.current;
    const id = localStorage.getItem('currentTemplateId');

    if (id) {
      try {
        let templateData;

        try {
          //    templateData = await templateApi.getTemplate(id);
          toast.success("Template loaded successfully!");
        } catch (apiError) {
          console.log("Failed to load template from API", apiError);
          //createNewHomePage(editor);
          return;
        }

        if (templateData) {
          //handleTemplateData(editor, templateData);
        } else {
          //createNewHomePage(editor);
        }
      } catch (err) {
        console.log("Failed to load template", err);
        //createNewHomePage(editor);
      }
    } else {
      //createNewHomePage(editor);
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
  };**/

  return { editorRef,isLoading };
};