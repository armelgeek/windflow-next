import { create } from 'zustand'
import Element from "@/shared/lib/tail/element";
import Block from "@/shared/lib/tail/blocks";
import {
    duplicateBlockAction,
    duplicateData, filterBlocksRecursive,
    flattenObject, manageObjectInArray,
    modifyBlockProperty,
    moveBlockAction,
    navigateToParentAction, updateBlockIcon,
    updateBlockProperty,
    updateStyles
} from "@/shared/lib/tail/editor";
import { mergeCSSObjects } from "@/shared/lib/tail/functions";

const editor = {
    elements: new Element().Groups(),
    pages: [],
    document: null,
    project: null,
    selected: null,
    page: null,
    current: null,
    component: null,
    action: null,
    subaction: null,
    level: null,
    parent: null,
    startTime: null,
    autosave: null,
    export: "single",
    preview: null,
    fonts:
        "Alfa+Slab+One|Asap+Condensed|Abel|Alice|Alegreya|Amethysta|Archivo+Black|Barlow|Barlow+Condensed|Bungee+Inline|Expletus+Sans|Lora|Montserrat|Nunito+Sans|Oi|Open+Sans|PT+Sans|Roboto|Roboto+Condensed|Quattrocento|Raleway|Ultra|Yatra+One".split(
            "|"
        ),
    save: true,
    article: null,
    customizeTab: null,
    iconTab: 'elements',
    sidebar: {
        show: true,
        name: 'elements'
    },
    selectedBlocks: [],
    copiedObject: null,
    copiedCssObject: null
};
const desktop = {
    mode: 'base',
    state: 'neutral',
    frame: {
        w: 'w-screen',
        h: 'h-screen'
    },
    message: '',
    filter: '',
    tabs: [],
    pages: [],
    galleryFilter: null,
    library: {
        id: 'null',
        name: 'Nouvelle library',
        author: '',
        description: 'ceci est une description',
        templates: []
    },
    uikits: [],
    currentTab: 0,
    loading: false,
    modal: {
        show: false,
        type: '',
        title: ''
    },
    html: '',
    preview: false
};
function createEditBlockProperty(propertyName, set) {
    return (value, curr = null) => {
        set((state) => {
            const edt = { ...state.editor };
            const current = curr != null ? curr : { ...state.editor.current };

            current[propertyName] = value;

            edt.current = current;

            if (current.tag === 'document') {
                edt.document[propertyName] = value;
            } else {
                updateBlockProperty(edt.document.blocks, current.id, propertyName, value);
            }

            return { editor: edt };
        });
    }
}
const data = {
    editor,
    desktop
}
export const useEditor = create((set, get) => ({
    ...data,
    addTab: (payload) => {
        const { desktop: desk } = get();
        let founded = false;
        if (desk.tabs.length > 0) {
            desk.tabs.forEach((tab, i) => {
                if (tab.label === payload.label) {
                    set((state) => ({
                        desktop: {
                            ...state.desktop,
                            currentTab: i
                        }
                    }));
                    founded = true;
                }
            });
        }

        if (!founded) {
            let tabs = [...desk.tabs, payload];
            set((state) => ({
                desktop: {
                    ...state.desktop,
                    tabs: tabs,
                    pages: [...desk.pages, payload],
                    currentTab: tabs.length - 1
                }
            }));
        }
    },
    createEmptyBlock: () => {

        const addTab = get().addTab;
        const page = new Block();
        const block = new Element()
            .Flexbox({
                direction: 'col'
            })
            .setIcon('dashboard')
            .setTag('document')
        page.json.blocks = block
        page.name = 'Untitled Page' + Math.random();

        set((state) => ({
            editor: {
                ...state.editor,
                pages: page,
                page: page,
                current: block,
                document: block
            }
        }));
        addTab({
            label: page.name,
            object: page,
            type: 'editor'
        });

    },
    setCurrentIconTab(icon) {
        set((state) => ({
            editor: {
                ...state.editor,
                iconTab: icon
            }
        }));
    },
    showSidebar(tab) {
        set((state) => ({
            editor: {
                ...state.editor,
                sidebar: {
                    ...state.editor.sidebar,
                    show: true,
                    name: tab
                }
            }
        }));
    },
    closeSidebar() {
        set((state) => ({
            editor: {
                ...state.editor,
                sidebar: {
                    ...state.editor.sidebar,
                    show: true,
                    name: ''
                }
            }
        }));
    },
    updateBlockStyle: (obj, curr = null) => {
        let css = '';
        const edt = get().editor;
        let current = curr != null ? curr : edt.current;

        let keys = Object.keys(obj);


        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];

            if (key !== 'base' && obj[key] != null) {
                const stateKeys = Object.keys(obj[key]);
                for (let i = 0; i < stateKeys.length; i++) {
                    const stateKey = stateKeys[i];
                    if (stateKey === 'neutral') {
                        if (obj[key][stateKey] != null) {
                            const values = Object.entries(obj[key][stateKey]).map(([prop, value]) => {
                                if (value != null && value !== "") {
                                    return `${key}:${value}`;
                                }
                            }).filter(Boolean);
                            css += ` ${values.join(' ')}`;
                        }
                    } else {
                        if (obj[key][stateKey] != null) {
                            const flattenedValues = flattenObject(obj[key][stateKey], `${key}:${stateKey}`);
                            const prefixedValues = Object.entries(flattenedValues).map(([subKey, value]) => {
                                if (value != null && value !== "") {
                                    return `${subKey}:${value}`;
                                }
                            }).filter(Boolean);
                            css += ` ${prefixedValues.join(' ')}`;
                        }
                    }
                }
            } else if (key === 'base' && obj[key] != null) {
                const stateKeys = Object.keys(obj[key]);
                for (let i = 0; i < stateKeys.length; i++) {
                    const stateKey = stateKeys[i];
                    if (stateKey === 'neutral') {
                        if (obj[key][stateKey] != null) {
                            const values = Object.entries(obj[key][stateKey]).map(([prop, value]) => `${value}`);
                            css += ` ${values.join(' ').trim()}`;
                        }
                    } else {
                        if (obj[key][stateKey] != null) {
                            const flattenedValues = flattenObject(obj[key][stateKey], `${stateKey}`);
                            const prefixedValues = Object.entries(flattenedValues).map(([subKey, value]) => `${stateKey}:${value}`);
                            css += ` ${prefixedValues.join(' ')}`;
                        }
                    }
                }
            }
        }

        css = [...new Set(css.split(' '))].join(' ').trim();
        set((state) => ({
            editor: {
                ...state.editor,
                current: {
                    ...state.editor.current,
                    cssObject: obj,
                    css: {
                        ...state.editor.current.css,
                        css
                    }
                },

            }
        }));
        console.log('current.tag', current);

        updateStyles(edt.document, current.id, css, obj);

        set((state) => ({
            editor: {
                ...state.editor,
                document: {
                    ...state.editor.document,
                    blocks: edt.document.blocks
                }
            }
        }));
    },
    editBlockContent: createEditBlockProperty('content', set),
    editBlockFont: createEditBlockProperty('font', set),
    editBlockLevel: createEditBlockProperty('level', set),
    editBlockType: createEditBlockProperty('type', set),
    editBlockImageUrl: createEditBlockProperty('image.url', set),
    editBlockBackgroundImage: createEditBlockProperty('background.url', set),
    updateBlockProperty: (value, key, curr = null) => {
        set((state) => {
            let edt = { ...state.editor };
            let current = curr != null ? curr : { ...state.editor.current };


            current = { ...current, [key]: value };
            edt.current = current;

            if (current.tag === 'document') {
                edt.document[key] = value;
            } else {
                modifyBlockProperty(edt.document.blocks, current.id, value, key);
            }

            return { editor: edt };
        });
    },
    updateBlockDataContent: (value, key, curr = null) => {
        set((state) => {
            let edt = { ...state.editor };
            let current = curr != null ? curr : { ...state.editor.current };

            current = {
                ...current,
                data: {
                    ...current.data,
                    [key]: value
                },
                content: value
            };

            edt.current = current;

            if (current.tag === 'document') {
                edt.document[key] = value;
                edt.document.content = value;
            } else {
                modifyBlockProperty(edt.document.blocks, current.id, value, key);
            }

            return { editor: edt };
        });
    },
    moveBlock: (currentId, direction) => {

        set((state) => {
            let editor = { ...state.editor };
            moveBlockAction(editor.document.blocks, currentId, direction);
            return { editor };
        })
    },
    copyBlock: () => {
        set((state) => {
            let edt = { ...state.editor };
            edt.copiedObject = duplicateData(edt.current)
            return { editor: edt };
        })
    },
    pasteBlock: () => {
        set((state) => {
            const edt = { ...state.editor };
            duplicateBlockAction(edt.document.blocks, edt.current, edt.copiedObject);
            return { editor: edt };
        })
    },
    duplicateBlock: (curr = null) => {
        set((state) => {
            const edt = { ...state.editor };
            const current = curr != null ? curr : edt.current;
            duplicateBlockAction(edt.document.blocks, current, edt.copiedObject);
            return { editor: edt };
        })
    },
    navigateToParent: () => {
        set((state) => {
            const edt = { ...state.editor };
            edt.current = navigateToParentAction(edt.document.blocks, edt.current.id);
            return { editor: edt };
        })
    },
    copyStyleBlock: () => {
        set((state) => {
            let edt = { ...state.editor };
            edt.copiedCssObject = edt.current.cssObject;
            return { editor: edt };
        })
    },
    pasteStyleBlock: () => {
        const updateBlockStyle = get().updateBlockStyle;
        set((state) => {
            let edt = { ...state.editor };
            let mergedBlockCss = mergeCSSObjects(edt.current.cssObject, edt.copiedCssObject);
            updateBlockStyle(mergedBlockCss);
            if (edt.selectedBlocks.length > 0) {
                for (let index = 0; index < edt.selectedBlocks.length; index++) {
                    const element = edt.selectedBlocks[index];
                    let elementCSS = mergeCSSObjects(element.cssObject, edt.copiedCssObject);
                    updateBlockStyle(elementCSS, element);
                }
                edt.copiedCssObject = null;
                edt.selectedBlocks = [];
            }
            return { editor: edt };
        })
    },
    editBlockIcon: (value, curr = null) => {
        set((state) => {
            const edt = { ...state.editor };
            const current = curr != null ? curr : edt.current;
            current.data.icon = value;
            updateBlockIcon(edt.document.blocks, current.id, value);
            return { editor: edt };
        })
    },
    toggleSelectedBlock: (doc) => {
        set((state) => {
            const edt = { ...state.editor };
            edt.selectedBlocks = manageObjectInArray(edt.selectedBlocks, doc);
            return { editor: edt };
        })
    },
    deleteBlock: (curr = null) => {
        set((state) => {
            const edt = { ...state.editor };
            const current = curr != null ? curr : edt.current;
            edt.document.blocks = filterBlocksRecursive(edt.document.blocks, current.id);
            return { editor: edt };
        })
    },
    resetSelectedBlock: () => {
        set((state) => {
            const edt = { ...state.editor };
            edt.selectedBlocks = [];
            return { editor: edt };
        })
    },

    createElement: (el) => {
        set((state) => {
            const edt = { ...state.editor };
            const desk = { ...state.desktop };

            const element = new Element().createElement(el.id)?.setIcon(el.icon);
            if (edt.current == null && desk.pages.length > 0) {
                edt.current = {
                    ...edt.current,
                    blocks: element
                };
            } else {
                edt.current.blocks.push(element);
            }
            return { editor: edt };
        })
    },
    deleteElement: () => {
        const { deleteBlock, resetSelectedBlock } = get();
        const edt = get().editor;
        deleteBlock();
        if (edt.selectedBlocks.length > 0) {
            for (let index = 0; index < edt.selectedBlocks.length; index++) {
                const element = edt.selectedBlocks[index];
                deleteBlock(element)
            }
            resetSelectedBlock();
        }
    },
    duplicateElement: () => {
        const { duplicateBlock, resetSelectedBlock } = get();
        const edt = get().editor;
        duplicateBlock();
        if (edt.selectedBlocks.length > 0) {
            for (let index = 0; index < edt.selectedBlocks.length; index++) {
                const element = edt.selectedBlocks[index];
                duplicateBlock(element)
            }
            resetSelectedBlock();
        }
    },
    setCurrent: (curr) => {
        set((state) => {
            const edt = { ...state.editor };
            edt.current = curr;
            return { editor: edt };
        })
    },
    openTab: (currentTab) => {

        set((state) => {
            const edt = { ...state.editor };
            const desk = { ...state.desktop };
            desk.currentTab = currentTab;
            const tab = desk.tabs[currentTab];

            if (tab.type === 'editor') {
                edt.page = tab.object;
                edt.document = tab.object.json.blocks;
            }
            if (tab.type === 'component') {
                edt.component = tab.object
            }

            return { editor: edt, desktop: desk };
        })
    },
    closeTab: (tabId) => {
        set((state) => {
            const desk = { ...state.desktop };
            desk.tabs = [
                ...desk.tabs.slice(0, tabId),
                ...desk.tabs.slice(tabId + 1),
            ];
            return { desktop: desk };
        })
    },
    updateEditorValue: ({
        prop,
        value
    }) => {
        set((state) => {
            const edt = { ...state.editor };
            edt[prop] = value;
            return { editor: edt };
        })
    },
    updateDesktopValue: ({ prop, value }) => {
        set((state) => {
            const desk = { ...state.desktop };
            desk[prop] = value;
            return { desktop: desk };
        })
    }
}))
