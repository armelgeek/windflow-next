export const fontFamilies = {
    system: [
        { name: 'Sans Serif', value: 'sans-serif' },
        { name: 'Serif', value: 'serif' },
        { name: 'Monospace', value: 'monospace' },
        { name: 'Cursive', value: 'cursive' },
        { name: 'Fantasy', value: 'fantasy' },
    ],
    google: [
        { name: 'Roboto', value: '"Roboto", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap' },
        { name: 'Open Sans', value: '"Open Sans", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap' },
        { name: 'Lato', value: '"Lato", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' },
        { name: 'Poppins', value: '"Poppins", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' },
        { name: 'Montserrat', value: '"Montserrat", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap' },
        { name: 'Raleway', value: '"Raleway", sans-serif', url: 'https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap' },
        { name: 'Playfair Display', value: '"Playfair Display", serif', url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap' },
    ],
    custom: []
};

export const generateTailwindFontConfig = (fonts: { system: any[]; google: any[]; }) => {
    const fontConfig = {};

    fonts.system.forEach((font: { name: string; value: any; }) => {
        fontConfig[font.name.toLowerCase().replace(/\s+/g, '-')] = [font.value];
    });

    fonts.google.forEach((font: { name: string; value: any; }) => {
        fontConfig[font.name.toLowerCase().replace(/\s+/g, '-')] = [font.value];
    });

    return fontConfig;
};
export const setupFontManager = (editor: { Canvas: { getFrameEl: () => any; }; StyleManager: { getProperty: (arg0: string, arg1: string) => any; }; CssComposer: { setRule: (arg0: string, arg1: { 'font-family': any; }) => void; }; BlockManager: { add: (arg0: string, arg1: { label: string; category: string; content: { type: string; content: string; style: { padding: string; }; }; attributes: { class: string; }; activate: boolean; select: boolean; render: ({ model }: { model: any; }) => void; }) => void; }; on: (arg0: string, arg1: { (): void; (): void; }) => void; Panels: { addButton: (arg0: string, arg1: { id: string; className: string; command: string; attributes: { title: string; }; }) => void; }; Commands: { add: (arg0: string, arg1: { run: ((editor: any) => void) | ((editor: any) => void); }) => void; }; }, initialFonts = fontFamilies) => {
    const saveFonts = (fonts: any) => {
        localStorage.setItem('gjs-fonts', JSON.stringify(fonts));
    };
    const loadFonts = () => {
        const savedFonts = localStorage.getItem('gjs-fonts');
        return savedFonts ? JSON.parse(savedFonts) : initialFonts;
    };
    let fonts = loadFonts();
    window.loadFonts = loadFonts;

    const injectFontsToCanvas = () => {
        const frame = editor.Canvas.getFrameEl();
        if (!frame || !frame.contentDocument) {
            setTimeout(injectFontsToCanvas, 100);
            return;
        }

        const frameHead = frame.contentDocument.head;
        if (!frameHead) {
            console.error('Frame head not found');
            return;
        }

        // Clear existing font links to avoid duplicates
        const existingLinks = frameHead.querySelectorAll('link[data-gjs-font]');
        existingLinks.forEach(link => link.remove());

        // Inject the Google fonts
        fonts.google.forEach((font) => {
            if (font.url) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = font.url;
                link.setAttribute('data-gjs-font', font.name); // Mark as our font link
                frameHead.appendChild(link);
                console.log(`Injected font: ${font.name}`);
            }
        });

        console.log(`Injected ${fonts.google.length} Google fonts into canvas`);
    };

    // Mettre à jour l'interface de l'éditeur avec les polices disponibles
    const updateFontOptions = () => {
        // Récupérer toutes les polices disponibles
        const allFonts = [
            ...fonts.system,
            ...fonts.google
        ];

        // Mettre à jour les options dans le gestionnaire de styles
        const fontProperty = editor.StyleManager.getProperty('typography', 'font-family');
        if (fontProperty) {
            fontProperty.set('options', allFonts.map(font => ({
                name: font.name,
                value: font.value
            })));
        }

        // Créer des classes Tailwind pour chaque police
        const fontClasses = allFonts.map(font => {
            const fontName = font.name.toLowerCase().replace(/\s+/g, '-');
            return {
                name: `font-${fontName}`,
                style: { 'font-family': font.value }
            };
        });

        fontClasses.forEach(fontClass => {
            editor.CssComposer.setRule(`.${fontClass.name}`, fontClass.style);
        });

        editor.BlockManager.add('font-selector', {
            label: 'Police de caractères',
            category: 'Typographie',
            content: { type: 'text', content: 'Exemple de texte', style: { padding: '10px' } },
            attributes: { class: 'fa fa-font' },
            activate: true,
            select: true,
            render: ({ model }) => {
                model.trigger('active');
                setTimeout(() => {
                    const styleManager = editor.StyleManager;
                    styleManager.setTarget(model);
                    styleManager.getProperties('typography').forEach((prop: { get: (arg0: string) => string; }) => {
                        if (prop.get('property') === 'font-family') {
                            styleManager.select('typography');
                            return false;
                        }
                    });
                }, 100);
            }
        });

        console.log('Options de polices mises à jour:', allFonts.length, 'polices disponibles');
    };

    const addGoogleFont = (fontFamily) => {
        if (!fontFamily) return false;

        // Check if font already exists
        if (fonts.google.some((f) => f.name.toLowerCase() === fontFamily.toLowerCase())) {
            console.log(`La police Google "${fontFamily}" existe déjà`);
            return false;
        }

        try {
            const formattedFamily = fontFamily.replace(/\s+/g, '+');
            const fontUrl = `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@300;400;500;600;700&display=swap`;

            // Add the font to the array
            fonts.google.push({
                name: fontFamily,
                value: `"${fontFamily}", sans-serif`,
                url: fontUrl
            });

            // Load the font in real-time
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;
            document.head.appendChild(link);

            // Save and update
            saveFonts(fonts);
            injectFontsToCanvas();
            updateFontOptions();

            return true;
        } catch (error) {
            console.error(`Error adding font "${fontFamily}":`, error);
            return false;
        }
    };

    const removeGoogleFont = (fontName) => {
        try {
            const fontIndex = fonts.google.findIndex((f) => f.name === fontName);

            if (fontIndex === -1) {
                console.log(`La police Google "${fontName}" n'existe pas`);
                return false;
            }

            // Remove the font
            fonts.google.splice(fontIndex, 1);

            // Update everything
            saveFonts(fonts);
            injectFontsToCanvas();
            updateFontOptions();

            return true;
        } catch (error) {
            console.error(`Error removing font "${fontName}":`, error);
            return false;
        }
    };


    return {
        getAllFonts: () => fonts,
        addGoogleFont,
        removeGoogleFont,
        updateFontOptions,
        injectFontsToCanvas
    };
};

export const setupFontExport = (editor: { on: (arg0: string, arg1: { (data: any): any; (data: any): void; }) => void; }) => {
    // Modifier l'exportation pour inclure les polices
    editor.on('export:html', (data: { html: string; }) => {
        // Récupérer les polices
        const savedFonts = localStorage.getItem('gjs-fonts');
        if (!savedFonts) return data;

        const fonts = JSON.parse(savedFonts);

        // Injecter les liens Google Fonts
        const googleFontLinks = fonts.google
            .filter((font: { url: any; }) => font.url)
            .map((font: { url: any; }) => `<link href="${font.url}" rel="stylesheet">`)
            .join('\n');

        // Ajouter dans le head du HTML exporté
        const headRegex = /<head>([\s\S]*?)<\/head>/;
        if (headRegex.test(data.html)) {
            data.html = data.html.replace(headRegex, (match: any, p1: any) => {
                return `<head>${p1}${googleFontLinks}\n</head>`;
            });
        }

        return data;
    });

    editor.on('run:export-template:before', (data: { fonts: any; }) => {
        const savedFonts = localStorage.getItem('gjs-fonts');
        if (savedFonts) {
            data.fonts = JSON.parse(savedFonts);
        }
    });
};

export const initFontSystem = (editor: any) => {
    const fontManager = setupFontManager(editor);
    setupFontExport(editor);

    return fontManager;
};