export const fontFamilies = {
    system: [
        { name: 'Sans Serif', value: 'sans-serif' },
        { name: 'Serif', value: 'serif' },
        { name: 'Monospace', value: 'monospace' },
        { name: 'Cursive', value: 'cursive' },
        { name: 'Fantasy', value: 'fantasy' },
    ],
    // Polices Google par défaut
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

export const generateTailwindFontConfig = (fonts) => {
    const fontConfig = {};

    // Ajouter les polices système
    fonts.system.forEach(font => {
        fontConfig[font.name.toLowerCase().replace(/\s+/g, '-')] = [font.value];
    });

    // Ajouter les polices Google
    fonts.google.forEach(font => {
        fontConfig[font.name.toLowerCase().replace(/\s+/g, '-')] = [font.value];
    });

    // Ajouter les polices personnalisées
    fonts.custom.forEach(font => {
        fontConfig[font.name.toLowerCase().replace(/\s+/g, '-')] = [font.value];
    });

    return fontConfig;
};

// 3. Gestionnaire de polices pour l'éditeur GrapesJS
export const setupFontManager = (editor, initialFonts = fontFamilies) => {
    // Stocker les polices en local storage
    const saveFonts = (fonts) => {
        localStorage.setItem('gjs-fonts', JSON.stringify(fonts));
    };

    // Récupérer les polices depuis le local storage
    const loadFonts = () => {
        const savedFonts = localStorage.getItem('gjs-fonts');
        return savedFonts ? JSON.parse(savedFonts) : initialFonts;
    };

    // État initial des polices (combinant par défaut et sauvegardées)
    let fonts = loadFonts();

    // Injecter les polices dans l'iframe du canvas
    const injectFontsToCanvas = () => {
        const frame = editor.Canvas.getFrameEl();
        if (!frame) return;

        const frameHead = frame.contentDocument.head;

        // Injecter les polices Google
        fonts.google.forEach(font => {
            if (font.url) {
                const linkExists = frameHead.querySelector(`link[href="${font.url}"]`);
                if (!linkExists) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = font.url;
                    frameHead.appendChild(link);
                }
            }
        });

        // Injecter les polices personnalisées avec @font-face
        const customFontStyles = fonts.custom
            .filter(font => font.fontFaceData)
            .map(font => font.fontFaceData)
            .join('\n');

        if (customFontStyles) {
            const styleId = 'gjs-custom-fonts';
            let styleEl = frameHead.querySelector(`#${styleId}`);

            if (styleEl) {
                styleEl.innerHTML = customFontStyles;
            } else {
                styleEl = document.createElement('style');
                styleEl.id = styleId;
                styleEl.innerHTML = customFontStyles;
                frameHead.appendChild(styleEl);
            }
        }
    };

    // Mettre à jour l'interface de l'éditeur avec les polices disponibles
    const updateFontOptions = () => {
        // Récupérer toutes les polices disponibles
        const allFonts = [
            ...fonts.system,
            ...fonts.google,
            ...fonts.custom
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

        // Ajouter les classes au Block Manager
        fontClasses.forEach(fontClass => {
            editor.CssComposer.setRule(`.${fontClass.name}`, fontClass.style);
        });

        console.log('Options de polices mises à jour:', allFonts.length, 'polices disponibles');
    };

    // Ajouter une police Google 
    const addGoogleFont = (fontFamily) => {
        // Vérifier si la police existe déjà
        if (fonts.google.some(f => f.name === fontFamily)) {
            console.log(`La police Google "${fontFamily}" existe déjà`);
            return false;
        }

        // Formater l'URL de la police Google
        const formattedFamily = fontFamily.replace(/\s+/g, '+');
        const fontUrl = `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@300;400;500;600;700&display=swap`;

        // Ajouter la police au tableau
        fonts.google.push({
            name: fontFamily,
            value: `"${fontFamily}", sans-serif`,
            url: fontUrl
        });

        // Sauvegarder, injecter et mettre à jour
        saveFonts(fonts);
        injectFontsToCanvas();
        updateFontOptions();

        return true;
    };

    // Ajouter une police personnalisée avec fichiers
    const addCustomFont = (fontFamily, fontFiles, fontWeight = 400, fontStyle = 'normal') => {
        // Vérifier si la police existe déjà
        if (fonts.custom.some(f => f.name === fontFamily)) {
            console.log(`La police personnalisée "${fontFamily}" existe déjà`);
            return false;
        }

        // Générer le CSS @font-face pour cette police
        let fontFaceCSS = '';

        if (typeof fontFiles === 'string') {
            // Si une seule URL est fournie
            fontFaceCSS = `
  @font-face {
    font-family: "${fontFamily}";
    src: url("${fontFiles}") format("woff2");
    font-weight: ${fontWeight};
    font-style: ${fontStyle};
  }`;
        } else if (Array.isArray(fontFiles)) {
            // Si un tableau de fichiers avec différents poids est fourni
            fontFaceCSS = fontFiles.map(file => `
  @font-face {
    font-family: "${fontFamily}";
    src: url("${file.url}") format("woff2");
    font-weight: ${file.weight || fontWeight};
    font-style: ${file.style || fontStyle};
  }`).join('\n');
        }

        // Ajouter la police au tableau
        fonts.custom.push({
            name: fontFamily,
            value: `"${fontFamily}", sans-serif`,
            fontFaceData: fontFaceCSS,
            files: fontFiles
        });

        // Sauvegarder, injecter et mettre à jour
        saveFonts(fonts);
        injectFontsToCanvas();
        updateFontOptions();

        return true;
    };

    // Supprimer une police personnalisée
    const removeCustomFont = (fontFamily) => {
        // Trouver l'index de la police à supprimer
        const index = fonts.custom.findIndex(f => f.name === fontFamily);

        if (index === -1) {
            console.log(`La police "${fontFamily}" n'existe pas dans les polices personnalisées`);
            return false;
        }

        // Supprimer la police du tableau
        fonts.custom.splice(index, 1);

        // Sauvegarder, injecter et mettre à jour
        saveFonts(fonts);
        injectFontsToCanvas();
        updateFontOptions();

        return true;
    };

    // Initialisation lors du chargement de l'éditeur
    editor.on('load', () => {
        // Injecter les polices dans le canvas
        injectFontsToCanvas();

        // Mettre à jour les options de police
        updateFontOptions();

        // Ajouter un menu de gestion des polices dans les paramètres
        editor.Panels.addButton('options', {
            id: 'open-fonts',
            className: 'fa fa-font',
            command: 'open-fonts',
            attributes: { title: 'Gérer les polices' }
        });

        // Commander pour ouvrir le gestionnaire de polices
        editor.Commands.add('open-fonts', {
            run(editor) {
                editor.Modal.open({
                    title: 'Gestionnaire de polices',
                    content: `
  <div style="padding: 20px; max-height: 70vh; overflow-y: auto;">
    <div style="margin-bottom: 20px;">
      <h3 style="margin-bottom: 10px; font-size: 16px; font-weight: bold;">Ajouter une police Google</h3>
      <div style="display: flex; gap: 10px;">
        <input type="text" id="google-font-input" placeholder="Nom de la police Google" style="flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        <button id="add-google-font" style="padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Ajouter</button>
      </div>
      <p style="margin-top: 5px; font-size: 12px; color: #666;">Exemple: Roboto, Open Sans, Lato, etc.</p>
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="margin-bottom: 10px; font-size: 16px; font-weight: bold;">Ajouter une police personnalisée</h3>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <input type="text" id="custom-font-name" placeholder="Nom de la police" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        <input type="text" id="custom-font-url" placeholder="URL du fichier WOFF2" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
        <p style="margin: 0; font-size: 12px; color: #666;">OU</p>
        <div style="display: flex; gap: 10px; align-items: center;">
          <input type="file" id="custom-font-file" accept=".woff,.woff2,.ttf,.otf" style="flex: 1;">
          <span style="font-size: 12px; color: #666;">(WOFF2 recommandé)</span>
        </div>
        <button id="add-custom-font" style="padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; align-self: flex-start;">Ajouter</button>
      </div>
    </div>
    
    <div>
      <h3 style="margin-bottom: 10px; font-size: 16px; font-weight: bold;">Polices personnalisées</h3>
      <div id="custom-fonts-list" style="display: flex; flex-direction: column; gap: 5px;">
        ${fonts.custom.length === 0 ?
                            '<p style="color: #666;">Aucune police personnalisée pour le moment.</p>' :
                            fonts.custom.map(font => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">
              <span style="font-family: ${font.value};">${font.name}</span>
              <button class="delete-font" data-font="${font.name}" style="padding: 5px 10px; background-color: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Supprimer</button>
            </div>
          `).join('')
                        }
      </div>
    </div>
  </div>
            `
                });

                // Événements pour le formulaire Google Font
                document.getElementById('add-google-font').addEventListener('click', () => {
                    const fontName = document.getElementById('google-font-input').value.trim();
                    if (fontName) {
                        const added = addGoogleFont(fontName);
                        if (added) {
                            alert(`Police Google "${fontName}" ajoutée avec succès!`);
                            editor.Modal.close();
                        } else {
                            alert(`La police "${fontName}" existe déjà.`);
                        }
                    } else {
                        alert('Veuillez entrer un nom de police.');
                    }
                });

                // Événements pour le formulaire de police personnalisée
                document.getElementById('add-custom-font').addEventListener('click', () => {
                    const fontName = document.getElementById('custom-font-name').value.trim();
                    const fontUrl = document.getElementById('custom-font-url').value.trim();
                    const fontFile = document.getElementById('custom-font-file').files[0];

                    if (!fontName) {
                        alert('Veuillez entrer un nom de police.');
                        return;
                    }

                    if (fontUrl) {
                        // Utiliser l'URL fournie
                        const added = addCustomFont(fontName, fontUrl);
                        if (added) {
                            alert(`Police personnalisée "${fontName}" ajoutée avec succès!`);
                            editor.Modal.close();
                        } else {
                            alert(`La police "${fontName}" existe déjà.`);
                        }
                    } else if (fontFile) {
                        // Utiliser le fichier uploadé
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const fileData = e.target.result;
                            const added = addCustomFont(fontName, fileData);
                            if (added) {
                                alert(`Police personnalisée "${fontName}" ajoutée avec succès!`);
                                editor.Modal.close();
                            } else {
                                alert(`La police "${fontName}" existe déjà.`);
                            }
                        };
                        reader.readAsDataURL(fontFile);
                    } else {
                        alert('Veuillez fournir une URL ou un fichier pour la police.');
                    }
                });

                // Événements pour les boutons de suppression
                document.querySelectorAll('.delete-font').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const fontName = e.target.getAttribute('data-font');
                        if (confirm(`Êtes-vous sûr de vouloir supprimer la police "${fontName}"?`)) {
                            removeCustomFont(fontName);
                            editor.Modal.close();
                        }
                    });
                });
            }
        });
    });

    // Mettre à jour les polices lorsque le canvas est rechargé
    editor.on('canvas:load', () => {
        injectFontsToCanvas();
    });

    // Exposer l'API pour utilisation externe
    return {
        getAllFonts: () => fonts,
        addGoogleFont,
        addCustomFont,
        removeCustomFont,
        updateFontOptions,
        injectFontsToCanvas
    };
};

// 4. Ajouter des blocs Tailwind pour des textes avec polices personnalisées
export const addFontBlocks = (editor, fonts) => {
    const blockManager = editor.BlockManager;
    const category = 'Typography';

    // Ajouter un bloc pour chaque police Google
    fonts.google.forEach(font => {
        const fontName = font.name.toLowerCase().replace(/\s+/g, '-');
        blockManager.add(`heading-${fontName}`, {
            label: `Heading - ${font.name}`,
            category,
            content: {
                type: 'text',
                content: `<h2 class="text-3xl font-${fontName} font-bold text-gray-900 dark:text-white">Heading with ${font.name}</h2>`,
            }
        });
    });

    // Ajouter des blocs pour des combinaisons de polices courantes
    blockManager.add('typography-set', {
        label: 'Typography Set',
        category,
        content: {
            type: 'div',
            classes: ['space-y-4'],
            components: [
                {
                    type: 'text',
                    classes: ['text-4xl', 'font-montserrat', 'font-bold', 'text-gray-900', 'dark:text-white'],
                    content: 'Main Heading'
                },
                {
                    type: 'text',
                    classes: ['text-2xl', 'font-montserrat', 'font-semibold', 'text-gray-800', 'dark:text-gray-100'],
                    content: 'Subheading'
                },
                {
                    type: 'text',
                    classes: ['text-base', 'font-open-sans', 'text-gray-700', 'dark:text-gray-300'],
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.'
                },
            ]
        }
    });
};

export const setupFontExport = (editor) => {
    // Modifier l'exportation pour inclure les polices
    editor.on('export:html', (data) => {
        // Récupérer les polices
        const savedFonts = localStorage.getItem('gjs-fonts');
        if (!savedFonts) return data;

        const fonts = JSON.parse(savedFonts);

        // Injecter les liens Google Fonts
        const googleFontLinks = fonts.google
            .filter(font => font.url)
            .map(font => `<link href="${font.url}" rel="stylesheet">`)
            .join('\n');

        // Injecter les @font-face pour les polices personnalisées
        const customFontStyles = fonts.custom
            .filter(font => font.fontFaceData)
            .map(font => font.fontFaceData)
            .join('\n');

        const fontStyles = customFontStyles ?
            `<style id="custom-fonts">\n${customFontStyles}\n</style>` : '';

        // Ajouter dans le head du HTML exporté
        const headRegex = /<head>([\s\S]*?)<\/head>/;
        if (headRegex.test(data.html)) {
            data.html = data.html.replace(headRegex, (match, p1) => {
                return `<head>${p1}${googleFontLinks}\n${fontStyles}</head>`;
            });
        }

        return data;
    });

    // Modifier l'exportation ZIP pour inclure les polices
    editor.on('run:export-template:before', (data) => {
        // Ajouter des données sur les polices aux métadonnées du template
        const savedFonts = localStorage.getItem('gjs-fonts');
        if (savedFonts) {
            data.fonts = JSON.parse(savedFonts);
        }
    });
};

export const initFontSystem = (editor) => {
    const fontManager = setupFontManager(editor);

    addFontBlocks(editor, fontManager.getAllFonts());

    setupFontExport(editor);

    return fontManager;
};


export const persistCustomFonts = (editor) => {
    const fontStorage = {
        saveFontData: async (fontName, fontData) => {
            return new Promise((resolve, reject) => {
                try {
                    const request = indexedDB.open('gjsFontsDB', 1);

                    request.onupgradeneeded = (event) => {
                        const db = event.target.result;
                        if (!db.objectStoreNames.contains('fonts')) {
                            db.createObjectStore('fonts', { keyPath: 'name' });
                        }
                    };

                    request.onsuccess = (event) => {
                        const db = event.target.result;
                        const transaction = db.transaction(['fonts'], 'readwrite');
                        const store = transaction.objectStore('fonts');

                        const addRequest = store.put({
                            name: fontName,
                            data: fontData,
                            timestamp: Date.now()
                        });

                        addRequest.onsuccess = () => resolve(true);
                        addRequest.onerror = () => reject(addRequest.error);
                    };

                    request.onerror = () => reject(request.error);
                } catch (error) {
                    try {
                        localStorage.setItem(`font-data-${fontName}`, JSON.stringify(fontData));
                        resolve(true);
                    } catch (localError) {
                        reject(localError);
                    }
                }
            });
        },

        getFontData: async (fontName) => {
            return new Promise((resolve, reject) => {
                try {
                    const request = indexedDB.open('gjsFontsDB', 1);

                    request.onsuccess = (event) => {
                        const db = event.target.result;
                        const transaction = db.transaction(['fonts'], 'readonly');
                        const store = transaction.objectStore('fonts');

                        const getRequest = store.get(fontName);

                        getRequest.onsuccess = () => {
                            if (getRequest.result) {
                                resolve(getRequest.result.data);
                            } else {
                                const localData = localStorage.getItem(`font-data-${fontName}`);
                                resolve(localData ? JSON.parse(localData) : null);
                            }
                        };

                        getRequest.onerror = () => reject(getRequest.error);
                    };

                    request.onerror = () => {
                        const localData = localStorage.getItem(`font-data-${fontName}`);
                        resolve(localData ? JSON.parse(localData) : null);
                    };
                } catch (error) {
                    try {
                        const localData = localStorage.getItem(`font-data-${fontName}`);
                        resolve(localData ? JSON.parse(localData) : null);
                    } catch (localError) {
                        reject(localError);
                    }
                }
            });
        }
    };

    const originalAddCustomFont = window.fontManager?.addCustomFont;

    if (originalAddCustomFont) {
        window.fontManager.addCustomFont = async (fontFamily, fontFiles, fontWeight, fontStyle) => {
            // Appeler la fonction originale
            const result = originalAddCustomFont(fontFamily, fontFiles, fontWeight, fontStyle);

            if (result) {
                try {
                    await fontStorage.saveFontData(fontFamily, {
                        files: fontFiles,
                        weight: fontWeight,
                        style: fontStyle,
                        timestamp: Date.now()
                    });
                    console.log(`Police ${fontFamily} persistée avec succès`);
                } catch (error) {
                    console.error(`Erreur lors de la persistance de la police ${fontFamily}:`, error);
                }
            }

            return result;
        };
    }

    const restoreCustomFonts = async () => {
        try {
            const savedFonts = localStorage.getItem('gjs-fonts');
            const fonts = savedFonts ? JSON.parse(savedFonts) : { system: [], google: [], custom: [] };

            if (fonts.custom && fonts.custom.length > 0) {
                for (const font of fonts.custom) {
                    if (!font || !font.name) continue;

                    if (!font.files ||
                        (typeof font.files === 'string' && !font.files.startsWith('data:')) ||
                        (Array.isArray(font.files) && font.files.length === 0)) {

                        const fontData = await fontStorage.getFontData(font.name);

                        if (fontData && fontData.files) {
                            console.log(`Restauration de la police ${font.name}...`);

                            if (typeof window !== "undefined" && window.fontManager?.addCustomFont) {
                                window.fontManager.addCustomFont(
                                    font.name,
                                    fontData.files,
                                    fontData.weight || 400,
                                    fontData.style || 'normal'
                                );
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Erreur lors de la restauration des polices:', error);
        }
    };

    editor.on('load', () => {
        setTimeout(restoreCustomFonts, 100);
    });

    return {
        saveFontData: fontStorage.saveFontData,
        getFontData: fontStorage.getFontData,
        restoreCustomFonts
    };
};


export const fixWOFF2Persistence = (editor) => {
    const openFontsDatabase = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('FontsDatabase', 1);
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('fonts')) {
            const store = db.createObjectStore('fonts', { keyPath: 'id' });
            store.createIndex('name', 'name', { unique: false });
            store.createIndex('format', 'format', { unique: false });
          }
        };
        
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    };
    
    const storeFont = async (fontId, fontName, fontData, format = 'woff2') => {
      try {
        const db = await openFontsDatabase();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['fonts'], 'readwrite');
          const store = transaction.objectStore('fonts');
          
          const fontRecord = {
            id: fontId,
            name: fontName,
            data: fontData,
            format: format,
            timestamp: Date.now()
          };
          
          const request = store.put(fontRecord);
          request.onsuccess = () => resolve(true);
          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.error('Erreur lors du stockage de la police:', error);
        return false;
      }
    };
    
    const retrieveFont = async (fontId) => {
      try {
        const db = await openFontsDatabase();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['fonts'], 'readonly');
          const store = transaction.objectStore('fonts');
          
          const request = store.get(fontId);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération de la police:', error);
        return null;
      }
    };
    
    const getAllFonts = async () => {
      try {
        const db = await openFontsDatabase();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['fonts'], 'readonly');
          const store = transaction.objectStore('fonts');
          
          const request = store.getAll();
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des polices:', error);
        return [];
      }
    };
    
    const setupFontManagerOverride = () => {
      if (typeof window !== "undefined" && window.fontManager && window.fontManager.addCustomFont) {
        const originalAddCustomFont = window.fontManager.addCustomFont;
        
        window.fontManager.addCustomFont = async (fontFamily, fontFiles, fontWeight = 400, fontStyle = 'normal') => {
 
          const result = originalAddCustomFont(fontFamily, fontFiles, fontWeight, fontStyle);
          
          if (result) {
            try {
              const fontId = `font-${fontFamily.replace(/\s+/g, '-').toLowerCase()}-${fontWeight}-${fontStyle}`;
              
              await storeFont(fontId, fontFamily, fontFiles, 
                             typeof fontFiles === 'string' && fontFiles.includes('woff2') ? 'woff2' : 'other');
              
              console.log(`Police ${fontFamily} sauvegardée dans IndexedDB`);
            } catch (error) {
              console.error(`Erreur lors de la sauvegarde de la police ${fontFamily}:`, error);
            }
          }
          
          return result;
        };
      }
    };
    
    const restoreFontsOnLoad = async () => {
      try {
        const storedFonts = await getAllFonts();
        
        if (storedFonts.length === 0) {
          console.log('Aucune police persistante trouvée');
          return;
        }
        
        console.log(`Restauration de ${storedFonts.length} polices...`);
        
        const savedFonts = localStorage.getItem('gjs-fonts');
        const fonts = savedFonts ? JSON.parse(savedFonts) : { system: [], google: [], custom: [] };
        
        const loadedFonts = new Set(fonts.custom.map(f => f.name));
        
        for (const storedFont of storedFonts) {
          if (loadedFonts.has(storedFont.name)) {
            continue;
          }
          
          // Restaurer la police à l'aide du fontManager
          if (typeof window !== "undefined" && window.fontManager && window.fontManager.addCustomFont) {
            const added = window.fontManager.addCustomFont(
              storedFont.name,
              storedFont.data,
              storedFont.weight || 400,
              storedFont.style || 'normal'
            );
            
            if (added) {
              console.log(`Police ${storedFont.name} restaurée avec succès`);
            }
          }
        }
      } catch (error) {
        console.error('Erreur lors de la restauration des polices:', error);
      }
    };
    
    const setupEventListeners = () => {
      editor.on('load', () => {
        setTimeout(() => {
          restoreFontsOnLoad();
        }, 300);
      });
      
      editor.on('canvas:load', () => {
        setTimeout(() => {
          restoreFontsOnLoad();
        }, 300);
      });
    };
    
    setupFontManagerOverride();
    setupEventListeners();
    
    return {
      storeFont,
      retrieveFont,
      getAllFonts,
      restoreFonts: restoreFontsOnLoad
    };
  };