import { generateTailwindFontConfig } from "./fonts";

export const configureTailwindV3 = (editor) => {
  const tailwindColors = {
    slate: {
      50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
      400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155',
      800: '#1e293b', 900: '#0f172a', 950: '#020617'
    },
    gray: {
      50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
      400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
      800: '#1f2937', 900: '#111827', 950: '#030712'
    },
    zinc: {
      50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8',
      400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46',
      800: '#27272a', 900: '#18181b', 950: '#09090b'
    },
    neutral: {
      50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4',
      400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040',
      800: '#262626', 900: '#171717', 950: '#0a0a0a'
    },
    stone: {
      50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1',
      400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c',
      800: '#292524', 900: '#1c1917', 950: '#0c0a09'
    },
    red: {
      50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
      400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
      800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a'
    },
    orange: {
      50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
      400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
      800: '#9a3412', 900: '#7c2d12', 950: '#431407'
    },
    amber: {
      50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
      400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
      800: '#92400e', 900: '#78350f', 950: '#451a03'
    },
    yellow: {
      50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047',
      400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
      800: '#854d0e', 900: '#713f12', 950: '#422006'
    },
    lime: {
      50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264',
      400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f',
      800: '#3f6212', 900: '#365314', 950: '#1a2e05'
    },
    green: {
      50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
      400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
      800: '#166534', 900: '#14532d', 950: '#052e16'
    },
    emerald: {
      50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7',
      400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857',
      800: '#065f46', 900: '#064e3b', 950: '#022c22'
    },
    teal: {
      50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
      400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
      800: '#115e59', 900: '#134e4a', 950: '#042f2e'
    },
    cyan: {
      50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
      400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
      800: '#155e75', 900: '#164e63', 950: '#083344'
    },
    sky: {
      50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc',
      400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1',
      800: '#075985', 900: '#0c4a6e', 950: '#082f49'
    },
    blue: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
      400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
      800: '#1e40af', 900: '#1e3a8a', 950: '#172554'
    },
    indigo: {
      50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
      400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
      800: '#3730a3', 900: '#312e81', 950: '#1e1b4b'
    },
    violet: {
      50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
      400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
      800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065'
    },
    purple: {
      50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
      400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
      800: '#6b21a8', 900: '#581c87', 950: '#3b0764'
    },
    fuchsia: {
      50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc',
      400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf',
      800: '#86198f', 900: '#701a75', 950: '#4a044e'
    },
    pink: {
      50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
      400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d',
      800: '#9d174d', 900: '#831843', 950: '#500724'
    },
    rose: {
      50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
      400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
      800: '#9f1239', 900: '#881337', 950: '#4c0519'
    }
  };

  const tailwindSpacing = {
    0: '0px', 0.5: '0.125rem', 1: '0.25rem', 1.5: '0.375rem',
    2: '0.5rem', 2.5: '0.625rem', 3: '0.75rem', 3.5: '0.875rem',
    4: '1rem', 5: '1.25rem', 6: '1.5rem', 7: '1.75rem',
    8: '2rem', 9: '2.25rem', 10: '2.5rem', 11: '2.75rem',
    12: '3rem', 14: '3.5rem', 16: '4rem', 20: '5rem',
    24: '6rem', 28: '7rem', 32: '8rem', 36: '9rem',
    40: '10rem', 44: '11rem', 48: '12rem', 52: '13rem',
    56: '14rem', 60: '15rem', 64: '16rem', 72: '18rem',
    80: '20rem', 96: '24rem'
  };

  const tailwindBorderRadius = {
    'none': '0px',
    'sm': '0.125rem',
    'DEFAULT': '0.25rem',
    'md': '0.375rem',
    'lg': '0.5rem',
    'xl': '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    'full': '9999px'
  };
  const addColorProperty = (colorName, colorVariants) => {
    Object.entries(colorVariants).forEach(([shade, color]) => {
      editor.StyleManager.addProperty('decorations', {
        name: `${colorName}-${shade}`,
        property: `--${colorName}-${shade}`,
        type: 'color',
        defaults: color,
      });
    });
  };

  // Register all Tailwind colors
  Object.entries(tailwindColors).forEach(([colorName, shades]) => {
    addColorProperty(colorName, shades);
  });

  // Add Tailwind v3 specific style properties
  editor.StyleManager.addSector('tailwind-specific', {
    name: 'Tailwind v3',
    open: false,
    properties: [
      {
        name: 'Container Type',
        property: 'container-type',
        type: 'select',
        defaults: 'normal',
        options: [
          { id: 'normal', label: 'Normal' },
          { id: 'size', label: 'Size' },
          { id: 'inline-size', label: 'Inline Size' }
        ]
      },
      {
        name: 'Aspect Ratio',
        property: 'aspect-ratio',
        type: 'select',
        defaults: 'auto',
        options: [
          { id: 'auto', label: 'Auto' },
          { id: 'square', label: 'Square (1/1)' },
          { id: 'video', label: 'Video (16/9)' },
          { id: 'portrait', label: 'Portrait (3/4)' },
          { id: 'custom', label: 'Custom' }
        ]
      },
      {
        name: 'Custom Aspect Ratio',
        property: 'custom-aspect-ratio',
        type: 'text',
        defaults: '1/1'
      }
    ]
  });

  editor.StyleManager.addSector('tailwind-spacing', {
    name: 'Spacing',
    open: false,
    properties: [
      {
        name: 'Margin',
        property: 'margin',
        type: 'select',
        defaults: '0',
        options: Object.entries(tailwindSpacing).map(([key, value]) => ({
          id: value,
          label: `${key} (${value})`
        }))
      },
      {
        name: 'Padding',
        property: 'padding',
        type: 'select',
        defaults: '0',
        options: Object.entries(tailwindSpacing).map(([key, value]) => ({
          id: value,
          label: `${key} (${value})`
        }))
      },
      {
        name: 'Border Radius',
        property: 'border-radius',
        type: 'select',
        defaults: '0',
        options: Object.entries(tailwindBorderRadius).map(([key, value]) => ({
          id: value,
          label: key === 'DEFAULT' ? 'Default (0.25rem)' : `${key} (${value})`
        }))
      }
    ]
  });

  console.log('Tailwind v3 style properties registered successfully');
};

export const addTailwindV3Blocks = (editor) => {
  const blockManager = editor.BlockManager;

  // Flex Container Block
  blockManager.add('tailwind-flex', {
    label: 'Flex Container',
    category: 'Tailwind v3',
    content: {
      type: 'div',
      classes: ['flex', 'flex-wrap', 'gap-4', 'p-4'],
      components: [
        { type: 'div', classes: ['p-4', 'bg-blue-100', 'rounded'], content: 'Item 1' },
        { type: 'div', classes: ['p-4', 'bg-blue-100', 'rounded'], content: 'Item 2' },
        { type: 'div', classes: ['p-4', 'bg-blue-100', 'rounded'], content: 'Item 3' }
      ]
    }
  });

  // Grid Container Block
  blockManager.add('tailwind-grid', {
    label: 'Responsive Grid',
    category: 'Tailwind v3',
    content: {
      type: 'div',
      classes: ['grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4', 'p-4'],
      components: [
        { type: 'div', classes: ['p-4', 'bg-green-100', 'rounded'], content: 'Item 1' },
        { type: 'div', classes: ['p-4', 'bg-green-100', 'rounded'], content: 'Item 2' },
        { type: 'div', classes: ['p-4', 'bg-green-100', 'rounded'], content: 'Item 3' },
        { type: 'div', classes: ['p-4', 'bg-green-100', 'rounded'], content: 'Item 4' },
        { type: 'div', classes: ['p-4', 'bg-green-100', 'rounded'], content: 'Item 5' },
        { type: 'div', classes: ['p-4', 'bg-green-100', 'rounded'], content: 'Item 6' }
      ]
    }
  });

  // Dark Mode Card
  blockManager.add('tailwind-dark-card', {
    label: 'Dark Mode Card',
    category: 'Tailwind v3',
    content: {
      type: 'div',
      classes: ['bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-lg', 'p-6', 'transition-colors'],
      components: [
        {
          type: 'h3',
          classes: ['text-xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'mb-4'],
          content: 'Dark Mode Ready'
        },
        {
          type: 'p',
          classes: ['text-gray-700', 'dark:text-gray-300'],
          content: 'This card automatically adapts to light and dark mode.'
        }
      ]
    }
  });

  // Hero Section
  blockManager.add('tailwind-hero', {
    label: 'Hero Section',
    category: 'Tailwind v3',
    content: {
      type: 'div',
      classes: ['relative', 'bg-indigo-600', 'overflow-hidden'],
      components: [
        {
          type: 'div',
          classes: ['max-w-7xl', 'mx-auto', 'py-16', 'px-4', 'sm:px-6', 'lg:px-8'],
          components: [
            {
              type: 'div',
              classes: ['text-center'],
              components: [
                {
                  type: 'h1',
                  classes: ['text-4xl', 'tracking-tight', 'font-extrabold', 'text-white', 'sm:text-5xl', 'md:text-6xl'],
                  content: 'Modern Website with Tailwind v3'
                },
                {
                  type: 'p',
                  classes: ['mt-6', 'max-w-lg', 'mx-auto', 'text-xl', 'text-indigo-200', 'sm:max-w-3xl'],
                  content: 'Create beautiful, responsive designs with the latest Tailwind CSS features.'
                },
                {
                  type: 'div',
                  classes: ['mt-10', 'max-w-sm', 'mx-auto', 'sm:max-w-none', 'sm:flex', 'sm:justify-center'],
                  components: [
                    {
                      type: 'a',
                      classes: ['flex', 'items-center', 'justify-center', 'px-4', 'py-3', 'border', 'border-transparent', 'text-base', 'font-medium', 'rounded-md', 'shadow-sm', 'text-indigo-700', 'bg-white', 'hover:bg-indigo-50', 'sm:px-8'],
                      attributes: { href: '#' },
                      content: 'Get started'
                    },
                    {
                      type: 'a',
                      classes: ['mt-3', 'flex', 'items-center', 'justify-center', 'px-4', 'py-3', 'border', 'border-transparent', 'text-base', 'font-medium', 'rounded-md', 'shadow-sm', 'text-white', 'bg-indigo-500', 'hover:bg-indigo-600', 'sm:px-8', 'sm:mt-0', 'sm:ml-3'],
                      attributes: { href: '#' },
                      content: 'Learn more'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  });

  // Responsive Navbar
  blockManager.add('tailwind-navbar', {
    label: 'Responsive Navbar',
    category: 'Tailwind v3',
    content: {
      type: 'nav',
      classes: ['bg-white', 'shadow', 'dark:bg-gray-800'],
      components: [
        {
          type: 'div',
          classes: ['container', 'mx-auto', 'px-4', 'py-2', 'flex', 'justify-between', 'items-center'],
          components: [
            {
              type: 'div',
              classes: ['text-xl', 'font-bold', 'text-gray-800', 'dark:text-white'],
              content: 'Tailwind v3'
            },
            {
              type: 'div',
              classes: ['hidden', 'md:flex', 'space-x-4'],
              components: [
                { type: 'a', classes: ['text-gray-600', 'hover:text-gray-900', 'dark:text-gray-300', 'dark:hover:text-white'], attributes: { href: '#' }, content: 'Home' },
                { type: 'a', classes: ['text-gray-600', 'hover:text-gray-900', 'dark:text-gray-300', 'dark:hover:text-white'], attributes: { href: '#' }, content: 'Features' },
                { type: 'a', classes: ['text-gray-600', 'hover:text-gray-900', 'dark:text-gray-300', 'dark:hover:text-white'], attributes: { href: '#' }, content: 'Pricing' },
                { type: 'a', classes: ['text-gray-600', 'hover:text-gray-900', 'dark:text-gray-300', 'dark:hover:text-white'], attributes: { href: '#' }, content: 'Contact' }
              ]
            }
          ]
        }
      ]
    }
  });

  console.log('Tailwind v3 blocks registered successfully');
};

export const configureTailwindJIT = (editor) => {
  const addArbitraryValueSupport = () => {
    editor.on('component:selected', (component) => {
      const contextMenu = editor.Commands.get('tlb-custom-code') || {};

      if (contextMenu) {
        const origRun = contextMenu.run;
        contextMenu.run = (editor, sender, options = {}) => {
          const result = origRun(editor, sender, options);

          const modal = editor.Modal;
          modal.setTitle('Add Tailwind Arbitrary Value');

          const container = document.createElement('div');
          container.innerHTML = `
            <div style="padding: 20px">
              <label style="display: block; margin-bottom: 10px">
                Enter arbitrary Tailwind class:
                <input type="text" id="arbitrary-class" style="display: block; width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 4px;" placeholder="e.g. w-[32.5%] or text-[#bada55]">
              </label>
              <div style="margin-top: 15px; color: #666; font-size: 12px">
                <p>Examples of arbitrary values in Tailwind v3:</p>
                <ul style="margin-top: 5px; margin-left: 20px; list-style-type: disc">
                  <li>w-[500px], h-[calc(100vh-3rem)]</li>
                  <li>text-[#bada55], bg-[rgb(255,0,0)]</li>
                  <li>grid-cols-[repeat(auto-fill,minmax(200px,1fr))]</li>
                  <li>top-[117px], left-[calc(100%-3rem)]</li>
                </ul>
              </div>
              <button id="add-arbitrary-class" style="margin-top: 20px; padding: 8px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Class</button>
            </div>
          `;

          modal.setContent(container);
          modal.open();

          document.getElementById('add-arbitrary-class').addEventListener('click', () => {
            const arbitrary = document.getElementById('arbitrary-class').value;
            if (arbitrary) {
              const selected = editor.getSelected();
              if (selected) {
                selected.addClass(arbitrary);
                modal.close();
                editor.Modal.close();
              }
            }
          });

          return result;
        };
      }
    });
  };

  addArbitraryValueSupport();
  console.log('Tailwind JIT support configured');
};

export const configureDarkModeSupport = (editor) => {
  editor.Panels.addButton('options', {
    id: 'toggle-dark-mode',
    className: 'fa fa-moon-o',
    command: 'toggle-dark-mode',
    attributes: { title: 'Toggle Dark Mode Preview' }
  });


  console.log('Dark mode support configured');
};

export const configureTailwindExport = (editor) => {
  editor.on('export:html', (data) => {
    const headRegex = /<head>([\s\S]*?)<\/head>/;
    const tailwindCDN = '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css" rel="stylesheet">';

    if (headRegex.test(data.html)) {
      data.html = data.html.replace(headRegex, (match, p1) => {
        return `<head>${p1}${tailwindCDN}</head>`;
      });
    }

    const bodyEndRegex = /<\/body>/;
    const darkModeScript = `
    <script>
      // Check for dark mode preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
      
      // Add toggle function to window
      window.toggleDarkMode = function() {
        document.documentElement.classList.toggle('dark');
      }
    </script>
    `;

    if (bodyEndRegex.test(data.html)) {
      data.html = data.html.replace(bodyEndRegex, `${darkModeScript}</body>`);
    }

    return data;
  });

  console.log('Export configuration for Tailwind v3 complete');
};

export const generateTailwindConfig = (fonts) => {
    return `
      module.exports = {
        content: [
          "./pages/**/*.{html,js}",
          "./index.html",
        ],
        darkMode: 'class',
        theme: {
          extend: {
            fontFamily: ${JSON.stringify(generateTailwindFontConfig(fonts), null, 2)},
          },
        },
        plugins: [],
      }`;
            
  };
export const setupBasicHTMLBlocks = (editor) => {
    editor.BlockManager.add('section-block', {
      label: 'Section',
      category: 'Basic',
      content: {
        type: 'section',
        classes: ['py-8'],
        content: '<div class="container mx-auto px-4"></div>'
      },
    });

    editor.BlockManager.add('header-block', {
      label: 'Header',
      category: 'Basic',
      content: {
        type: 'header',
        classes: ['py-4', 'bg-white', 'shadow'],
        content: '<div class="container mx-auto px-4 flex justify-between items-center"><h1>Header</h1><nav></nav></div>'
      },
    });

    editor.BlockManager.add('footer-block', {
      label: 'Footer',
      category: 'Basic',
      content: {
        type: 'footer',
        classes: ['py-6', 'bg-gray-100'],
        content: '<div class="container mx-auto px-4"><p>Footer content &copy; 2025</p></div>'
      },
    });

    editor.BlockManager.add('article-block', {
      label: 'Article',
      category: 'Basic',
      content: {
        type: 'article',
        classes: ['my-4'],
        content: '<h2 class="text-xl font-bold mb-2">Article Title</h2><p>Article content goes here.</p>'
      },
    });

    editor.BlockManager.add('heading-1', {
      label: 'Heading 1',
      category: 'Basic',
      content: {
        type: 'h1',
        classes: ['text-4xl', 'font-bold', 'mb-4'],
        content: 'Heading 1'
      },
    });

    editor.BlockManager.add('heading-2', {
      label: 'Heading 2',
      category: 'Basic',
      content: {
        type: 'h2',
        classes: ['text-3xl', 'font-bold', 'mb-3'],
        content: 'Heading 2'
      },
    });

    editor.BlockManager.add('heading-3', {
      label: 'Heading 3',
      category: 'Basic',
      content: {
        type: 'h3',
        classes: ['text-2xl', 'font-bold', 'mb-2'],
        content: 'Heading 3'
      },
    });

    editor.BlockManager.add('paragraph', {
      label: 'Paragraph',
      category: 'Basic',
      content: {
        type: 'p',
        classes: ['mb-4'],
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis eget tortor lobortis.',
      },
    });

    editor.BlockManager.add('blockquote', {
      label: 'Quote',
      category: 'Basic',
      content: {
        type: 'blockquote',
        classes: ['border-l-4', 'border-gray-300', 'pl-4', 'py-2', 'italic', 'my-4'],
        content: 'This is a blockquote. Someone said something important here.'
      },
    });

    editor.BlockManager.add('unordered-list', {
      label: 'Bullet List',
      category: 'Basic',
      content: {
        type: 'ul',
        classes: ['list-disc', 'pl-5', 'mb-4'],
        components: [
          { type: 'li', content: 'List item 1' },
          { type: 'li', content: 'List item 2' },
          { type: 'li', content: 'List item 3' },
        ],
      },
    });

    editor.BlockManager.add('ordered-list', {
      label: 'Numbered List',
      category: 'Basic',
      content: {
        type: 'ol',
        classes: ['list-decimal', 'pl-5', 'mb-4'],
        components: [
          { type: 'li', content: 'First item' },
          { type: 'li', content: 'Second item' },
          { type: 'li', content: 'Third item' },
        ],
      },
    });

    editor.BlockManager.add('figure', {
      label: 'Figure with Caption',
      category: 'Basic',
      content: {
        type: 'figure',
        classes: ['my-4'],
        components: [
          { type: 'img', attributes: { src: '/api/placeholder/400/300', alt: 'Figure image' }, classes: ['w-full', 'h-auto'] },
          { type: 'figcaption', classes: ['text-sm', 'text-gray-600', 'mt-2'], content: 'Figure caption goes here' },
        ],
      },
    });

    editor.BlockManager.add('video-embed', {
      label: 'Video',
      category: 'Basic',
      content: {
        type: 'div',
        classes: ['aspect-w-16', 'aspect-h-9', 'my-4'],
        components: [
          { 
            type: 'video', 
            attributes: { controls: true },
            components: [
              { type: 'source', attributes: { src: '', type: 'video/mp4' } }
            ]
          }
        ]
      },
    });

    editor.BlockManager.add('audio-player', {
      label: 'Audio',
      category: 'Basic',
      content: {
        type: 'audio',
        attributes: { controls: true },
        classes: ['w-full', 'my-4']
      },
    });

    editor.BlockManager.add('details-summary', {
      label: 'Accordion',
      category: 'Basic',
      content: {
        type: 'details',
        classes: ['mb-3', 'border', 'border-gray-200', 'rounded', 'p-2'],
        components: [
          { type: 'summary', classes: ['font-semibold', 'cursor-pointer'], content: 'Click to expand' },
          { type: 'div', classes: ['p-2', 'mt-2'], content: 'Content that appears when expanded' }
        ]
      },
    });

    editor.BlockManager.add('code-snippet', {
      label: 'Code Snippet',
      category: 'Basic',
      content: {
        type: 'pre',
        classes: ['bg-gray-100', 'p-4', 'rounded', 'my-4', 'overflow-auto'],
        components: [
          { type: 'code', content: 'function example() {\n  console.log("Hello world!");\n}' }
        ]
      },
    });

    editor.BlockManager.add('divider', {
      label: 'Divider',
      category: 'Basic',
      content: {
        type: 'hr',
        classes: ['my-6', 'border-t', 'border-gray-300']
      },
    });

    editor.BlockManager.add('button-group', {
      label: 'Button Group',
      category: 'Basic',
      content: {
        type: 'div',
        classes: ['flex', 'space-x-2', 'my-4'],
        components: [
          { type: 'button', classes: ['px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded'], content: 'Primary Button' },
          { type: 'button', classes: ['px-4', 'py-2', 'bg-gray-200', 'text-gray-800', 'rounded'], content: 'Secondary Button' }
        ]
      },
    });

    editor.BlockManager.add('alert', {
      label: 'Alert Box',
      category: 'Basic',
      content: {
        type: 'div',
        classes: ['bg-yellow-100', 'border-l-4', 'border-yellow-500', 'text-yellow-700', 'p-4', 'my-4'],
        content: '<p class="font-bold">Alert</p><p>Important information to notice.</p>'
      },
    });

    editor.BlockManager.add('two-columns', {
      label: '2 Columns',
      category: 'Basic',
      content: {
        type: 'div',
        classes: ['flex', 'flex-col', 'md:flex-row', 'gap-4', 'my-4'],
        components: [
          { type: 'div', classes: ['flex-1'], content: '<p>Column 1</p>' },
          { type: 'div', classes: ['flex-1'], content: '<p>Column 2</p>' }
        ]
      },
    });

    editor.BlockManager.add('three-columns', {
      label: '3 Columns',
      category: 'Basic',
      content: {
        type: 'div',
        classes: ['flex', 'flex-col', 'md:flex-row', 'gap-4', 'my-4'],
        components: [
          { type: 'div', classes: ['flex-1'], content: '<p>Column 1</p>' },
          { type: 'div', classes: ['flex-1'], content: '<p>Column 2</p>' },
          { type: 'div', classes: ['flex-1'], content: '<p>Column 3</p>' }
        ]
      },
    });

    editor.BlockManager.add('card-basic', {
      label: 'Basic Card',
      category: 'Basic',
      content: {
        type: 'div',
        classes: ['bg-white', 'rounded-lg', 'shadow', 'p-6', 'my-4'],
        components: [
          { type: 'h3', classes: ['text-xl', 'font-bold', 'mb-2'], content: 'Card Title' },
          { type: 'p', classes: ['text-gray-700'], content: 'This is a basic card component with some content.' }
        ]
      },
    });
  };

  export const setupTailwindBlocks = (editor) => {
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

    // Adding more Tailwind components
    editor.BlockManager.add('tailwind-hero', {
      label: 'Hero Section',
      category: 'Tailwind',
      content: {
        type: 'div',
        classes: ['bg-gray-100', 'py-12', 'px-4', 'sm:px-6', 'lg:px-8', 'text-center'],
        components: [
          { type: 'h1', classes: ['text-4xl', 'tracking-tight', 'font-extrabold', 'text-gray-900', 'sm:text-5xl', 'md:text-6xl'], content: 'Hero Title' },
          { type: 'p', classes: ['mt-3', 'max-w-md', 'mx-auto', 'text-base', 'text-gray-500', 'sm:text-lg', 'md:mt-5', 'md:text-xl'], content: 'Hero subtitle with compelling text goes here.' },
          { 
            type: 'div', 
            classes: ['mt-5', 'sm:mt-8', 'sm:flex', 'sm:justify-center'], 
            components: [
              { type: 'a', classes: ['w-full', 'flex', 'items-center', 'justify-center', 'px-8', 'py-3', 'border', 'border-transparent', 'text-base', 'font-medium', 'rounded-md', 'text-white', 'bg-blue-600', 'hover:bg-blue-700', 'md:py-4', 'md:text-lg', 'md:px-10'], content: 'Get started' }
            ]
          }
        ]
      }
    });

    editor.BlockManager.add('tailwind-feature-list', {
      label: 'Feature List',
      category: 'Tailwind',
      content: {
        type: 'div',
        classes: ['py-12', 'bg-white'],
        components: [
          {
            type: 'div',
            classes: ['max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8'],
            components: [
              {
                type: 'div',
                classes: ['lg:text-center'],
                components: [
                  { type: 'h2', classes: ['text-base', 'text-blue-600', 'font-semibold', 'tracking-wide', 'uppercase'], content: 'Features' },
                  { type: 'p', classes: ['mt-2', 'text-3xl', 'leading-8', 'font-extrabold', 'tracking-tight', 'text-gray-900', 'sm:text-4xl'], content: 'A better way to build' }
                ]
              },
              {
                type: 'div',
                classes: ['mt-10'],
                components: [
                  {
                    type: 'dl',
                    classes: ['space-y-10', 'md:space-y-0', 'md:grid', 'md:grid-cols-2', 'md:gap-x-8', 'md:gap-y-10'],
                    components: [
                      {
                        type: 'div',
                        classes: ['relative'],
                        components: [
                          { type: 'dt', content: '<div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900">Feature 1</p>' },
                          { type: 'dd', classes: ['mt-2', 'ml-16', 'text-base', 'text-gray-500'], content: 'Description of feature 1 goes here.' }
                        ]
                      },
                      {
                        type: 'div',
                        classes: ['relative'],
                        components: [
                          { type: 'dt', content: '<div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><p class="ml-16 text-lg leading-6 font-medium text-gray-900">Feature 2</p>' },
                          { type: 'dd', classes: ['mt-2', 'ml-16', 'text-base', 'text-gray-500'], content: 'Description of feature 2 goes here.' }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    });
  };

  