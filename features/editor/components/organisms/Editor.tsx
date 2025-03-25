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
import { generateTailwindFontConfig, initFontSystem } from "@/shared/lib/fonts";

export const configureTailwindV3 = (editor) => {
  // Define Tailwind v3 colors
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

  // Define tailwind spacing
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

  // Define border radiuses
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

  // Register colors as CSS properties for the editor
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
        name: 'Dark Mode',
        property: 'dark-mode-toggle',
        type: 'select',
        defaults: 'light',
        options: [
          { id: 'light', label: 'Light Mode' },
          { id: 'dark', label: 'Dark Mode Preview' }
        ],
        onChange({ property, to }) {

        }
      },
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

  // Add Tailwind v3 spacing properties
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
  // Add arbitrary value support
  const addArbitraryValueSupport = () => {
    // Get all Class Manager events
    editor.on('component:selected', (component) => {
      // Add right-click menu for arbitrary values
      const contextMenu = editor.Commands.get('tlb-custom-code') || {};

      if (contextMenu) {
        const origRun = contextMenu.run;
        contextMenu.run = (editor, sender, options = {}) => {
          const result = origRun(editor, sender, options);

          // Add option to add arbitrary Tailwind class
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

          // Handle add class button
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
  // Add dark mode preview toggle to toolbar
  editor.Panels.addButton('options', {
    id: 'toggle-dark-mode',
    className: 'fa fa-moon-o',
    command: 'toggle-dark-mode',
    attributes: { title: 'Toggle Dark Mode Preview' }
  });

  // Toggle dark mode command
  editor.Commands.add('toggle-dark-mode', {
    run(editor) {

    }
  });

  // Add dedicated "Dark Mode" section to style manager
  editor.StyleManager.addSector('dark-mode', {
    name: 'Dark Mode',
    open: false,
    properties: [
      {
        name: 'Background',
        property: 'dark-bg',
        type: 'color',
        defaults: '#1f2937'
      },
      {
        name: 'Text Color',
        property: 'dark-text',
        type: 'color',
        defaults: '#f9fafb'
      }
    ]
  });

  // Listen for changes in the dark mode styles and apply them with CSS classes
  editor.on('styleManager:change:dark-bg', (props) => {
    const selected = editor.getSelected();
    if (selected) {
      // Find and remove any existing dark:bg-* classes
      const existingClasses = selected.getClasses().filter(cls => cls.startsWith('dark:bg-'));
      existingClasses.forEach(cls => selected.removeClass(cls));

      // Add the new color class
      const color = props.value;
      // This is simplified, in a real implementation you'd convert the color to a Tailwind class
      selected.addClass(`dark:bg-gray-800`);
    }
  });

  console.log('Dark mode support configured');
};

export const configureTailwindExport = (editor) => {
  // Add Tailwind v3 configuration to exported files
  editor.on('export:html', (data) => {
    // Add Tailwind v3 CDN to the head
    const headRegex = /<head>([\s\S]*?)<\/head>/;
    const tailwindCDN = '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css" rel="stylesheet">';

    if (headRegex.test(data.html)) {
      data.html = data.html.replace(headRegex, (match, p1) => {
        return `<head>${p1}${tailwindCDN}</head>`;
      });
    }

    // Add dark mode script
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

const extractImagesFromHTML = (html) => {
  if (!html || typeof html !== 'string') {
    return [];
  }

  const result = [];

  // 1. Extract <img> tags with src attributes
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const fullImgTag = match[0];
    const srcUrl = match[1];

    // Skip empty sources or placeholder images
    if (!srcUrl || srcUrl === '#' || srcUrl.includes('placeholder')) {
      continue;
    }

    // Extract alt text if available
    const altMatch = fullImgTag.match(/alt=["']([^"']*)["']/) || [];
    const alt = altMatch[1] || '';

    result.push({
      src: srcUrl,
      alt,
      fullTag: fullImgTag
    });
  }

  // 2. Extract background images from inline styles
  const bgInlineStyleRegex = /style=["'][^"']*background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)[^"']*/g;

  while ((match = bgInlineStyleRegex.exec(html)) !== null) {
    const styleUrl = match[1];

    // Skip empty sources or placeholder images
    if (!styleUrl || styleUrl === '#' || styleUrl.includes('placeholder')) {
      continue;
    }

    result.push({
      src: styleUrl,
      alt: '',
      fullTag: match[0],
      isBackgroundImage: true
    });
  }

  // 3. Extract background images from style tags
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  let styleMatch;

  while ((styleMatch = styleTagRegex.exec(html)) !== null) {
    const styleContent = styleMatch[1];
    const bgCSSRegex = /background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/g;
    let bgMatch;

    while ((bgMatch = bgCSSRegex.exec(styleContent)) !== null) {
      const styleUrl = bgMatch[1];

      // Skip empty sources or placeholder images
      if (!styleUrl || styleUrl === '#' || styleUrl.includes('placeholder')) {
        continue;
      }

      result.push({
        src: styleUrl,
        alt: '',
        fullTag: bgMatch[0],
        isBackgroundImage: true,
        inStyleTag: true
      });
    }
  }

  return result;
};

// Enhanced function to process and add images to zip archive
const processAndAddImage = async (imageObj, assetsFolder, processedImages) => {
  const { src, alt } = imageObj;

  // Check if image URL is valid
  if (!src || typeof src !== 'string') {
    console.warn('Invalid or missing image URL:', imageObj);
    return src || '';
  }

  // If image was already processed, return cached path
  if (processedImages[src]) {
    return processedImages[src];
  }

  try {
    if (src.startsWith('data:')) {
      // Base64 image handling
      const matches = src.match(/^data:([^;]+);base64,(.+)$/);

      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];

        // Determine extension based on MIME type
        let extension = 'png'; // default

        if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
          extension = 'jpg';
        } else if (mimeType === 'image/png') {
          extension = 'png';
        } else if (mimeType === 'image/gif') {
          extension = 'gif';
        } else if (mimeType === 'image/svg+xml') {
          extension = 'svg';
        } else if (mimeType === 'image/webp') {
          extension = 'webp';
        }

        // Generate unique filename based on content and alt text
        const timestamp = Date.now();
        const safeAlt = (alt || '').replace(/[^a-z0-9]/gi, '-').toLowerCase();
        const fileName = `image-${safeAlt || timestamp}-${timestamp.toString().substr(-4)}.${extension}`;

        // Add image to assets folder
        assetsFolder.file(fileName, base64Data, { base64: true });

        // Cache processed image path
        processedImages[src] = `../assets/${fileName}`;
        return processedImages[src];
      }
    } else if (src.startsWith('http') || src.startsWith('https')) {
      // External URL - we'll preserve it as is for now
      // In a real implementation, you might want to download external images
      processedImages[src] = src;
      return src;
    } else if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) {
      // Relative local path
      const timestamp = Date.now();
      const fileName = `external-${(alt || '').replace(/[^a-z0-9]/gi, '-').toLowerCase() || timestamp}.txt`;

      // Add a placeholder note
      assetsFolder.file(`${fileName}`,
        `This image reference is from an external source: ${src}\nYou'll need to manually include this image in your project.`);

      // We'll keep the original path since it's likely a relative reference within the project
      processedImages[src] = src;
      return src;
    } else {
      // Other URL type or unrecognized path
      processedImages[src] = src;
      return src;
    }
  } catch (error) {
    console.error(`Error processing image: ${src}`, error);
  }

  // In case of error or unrecognized URL, keep original URL
  processedImages[src] = src;
  return src;
};

// Enhanced function to replace image URLs in HTML
const replaceImageURLs = (html, processedImages) => {
  if (!html || typeof html !== 'string') {
    return html || '';
  }

  let processedHtml = html;

  // 1. Replace src in <img> tags
  processedHtml = processedHtml.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/g, (match, src) => {
    if (processedImages[src]) {
      return match.replace(`src="${src}"`, `src="${processedImages[src]}"`).replace(`src='${src}'`, `src='${processedImages[src]}'`);
    }
    return match;
  });

  // 2. Replace URLs in inline style background-image properties
  processedHtml = processedHtml.replace(/style=["'][^"']*background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)[^"']*/g, (match, url) => {
    if (processedImages[url]) {
      return match.replace(`url('${url}')`, `url('${processedImages[url]}')`).replace(`url("${url}")`, `url("${processedImages[url]}")`).replace(`url(${url})`, `url(${processedImages[url]})`);
    }
    return match;
  });

  // 3. Replace URLs in <style> tags
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
  processedHtml = processedHtml.replace(styleTagRegex, (fullStyleTag, styleContent) => {
    let processedStyleContent = styleContent.replace(/background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/g, (match, url) => {
      if (processedImages[url]) {
        return match.replace(`url('${url}')`, `url('${processedImages[url]}')`).replace(`url("${url}")`, `url("${processedImages[url]}")`).replace(`url(${url})`, `url(${processedImages[url]})`);
      }
      return match;
    });

    return fullStyleTag.replace(styleContent, processedStyleContent);
  });

  return processedHtml;
};

// Integration with zip export process - snippet to include in handleExportZip
const processAllImages = async (allPages, zip) => {
  const assetsFolder = zip.folder("assets");
  const processedImages = {};

  // Extract HTML from all pages
  const allHtmlContent = allPages.map(page => page.get("customHtml") || "").join('');

  // Extract all images
  const images = extractImagesFromHTML(allHtmlContent);
  console.log(`Found ${images.length} images to process`);

  // Process all images and add them to the zip
  for (const image of images) {
    if (image && image.src) {
      await processAndAddImage(image, assetsFolder, processedImages);
    }
  }

  // Process HTML for each page and replace image URLs
  for (const page of allPages) {
    let pageHtml = page.get("customHtml") || "";
    pageHtml = replaceImageURLs(pageHtml, processedImages);

    // Update the page with processed HTML
    page.set("customHtml", pageHtml);
  }

  return { processedImages, assetsFolder };
};


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
      pluginsOpts: {
        [grapesjsTailwind]: {
          useCustomBreakpoints: true
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
    initFontSystem(editor);

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


  // Fonction principale d'exportation ZIP avec gestion correcte des polices et images
  const handleExportZip = async () => {
    try {
      // Save current page state first
      saveCurrentPageState();

      const editor = editorRef.current;
      const pm = editor.Pages;
      const zip = new JSZip();

      // Create folders
      const assetsFolder = zip.folder("assets");
      const cssFolder = zip.folder("css");
      const fontsFolder = zip.folder("fonts");
      const pagesFolder = zip.folder("pages");

      // Récupérer les polices configurées
      const savedFonts = localStorage.getItem('gjs-fonts');
      const fonts = savedFonts ? JSON.parse(savedFonts) : { system: [], google: [], custom: [] };

      // Traiter et exporter les polices personnalisées
      if (fonts.custom && fonts.custom.length > 0) {
        // Créer un fichier CSS pour les polices personnalisées
        let fontCssContent = '';

        // Parcourir toutes les polices personnalisées
        for (const font of fonts.custom) {
          if (!font || !font.name) continue;

          const fontName = font.name.toLowerCase().replace(/\s+/g, '-');

          // Traiter les fichiers de polices
          if (font.files) {
            if (typeof font.files === 'string' && font.files.startsWith('data:')) {
              try {
                // Extraire le format et les données base64
                const matches = font.files.match(/^data:([^;]+);base64,(.+)$/);

                if (matches && matches.length === 3) {
                  const mimeType = matches[1];
                  const base64Data = matches[2];

                  // Déterminer l'extension du fichier en fonction du type MIME
                  let extension = 'woff2';
                  if (mimeType === 'font/ttf' || mimeType === 'application/x-font-ttf') {
                    extension = 'ttf';
                  } else if (mimeType === 'font/woff' || mimeType === 'application/font-woff') {
                    extension = 'woff';
                  } else if (mimeType === 'font/otf' || mimeType === 'application/x-font-otf') {
                    extension = 'otf';
                  }

                  // Nom du fichier de police
                  const fontFileName = `${fontName}.${extension}`;

                  // Ajouter le fichier de police au dossier des polices
                  fontsFolder.file(fontFileName, base64Data, { base64: true });

                  // Générer la règle @font-face qui pointe vers le fichier local
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

        // Sauvegarder le fichier CSS des polices
        if (fontCssContent) {
          cssFolder.file('fonts.css', fontCssContent);
        }
      }

      // Générer le fichier tailwind.config.js
      const generateTailwindConfig = (fonts) => {
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

      // Ajouter tailwind.config.js à l'archive
      zip.file("tailwind.config.js", generateTailwindConfig(fonts));

      // Traiter toutes les pages pour extraire les images
      const allPages = pm.getAll();
      const processedImages = {};
      let imageCount = 0;


      for (const page of allPages) {
        const pageId = page.id;
        const pageName = page.get("name") || pageId;
        let pageHtml = page.get("customHtml") || "";
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

          // Determine image type from the data URL
          const mimeMatch = base64Data.match(/data:image\/([^;]+);/);
          const imageType = mimeMatch ? mimeMatch[1] : 'png';

          // Create a unique filename
          const fileName = `image-${imageCount++}.${imageType}`;
          const imagePath = `../assets/${fileName}`;

          // Store image in assets folder
          try {
            // Extract the base64 part (after the comma)
            const base64Content = base64Data.split(',')[1];
            assetsFolder.file(fileName, base64Content, { base64: true });

            // Track processed image
            processedImages[base64Data] = imagePath;

            // Replace in HTML (important: replace the specific occurrence)
            processedHtml = processedHtml.replace(base64Data, imagePath);

            console.log(`Extracted image: ${fileName}`);
          } catch (e) {
            console.error(`Failed to extract image: ${e.message}`);
          }
        }

        // Also handle background images in CSS styles
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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css">
  ${fonts.custom && fonts.custom.length > 0 ? '<link rel="stylesheet" href="css/fonts.css">' : ''}
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">${templateDetails.title || 'Exported Template'}</h1>
    <p class="mb-4">${templateDetails.description || 'Template pages'}</p>
    <ul class="list-disc pl-6">`;

        // Ajouter les pages à l'index et créer les fichiers HTML individuels
        const allCSS = [];

        // Traitement de toutes les pages avec remplacement des URL d'images
        for (const page of allPages) {
          const pageId = page.id;
          const pageName = page.get("name") || pageId;
          let pageHtml = page.get("customHtml") || "";
          const pageCss = page.get("customCss") || "";

          // Remplacer les URL d'images dans le HTML
          pageHtml = replaceImageURLs(pageHtml, processedImages);

          // Ajouter au CSS principal
          allCSS.push(pageCss);

          // Créer le fichier CSS individuel
          cssFolder.file(`${pageId}.css`, pageCss);

          // Créer le fichier HTML avec les liens vers les polices
          let processedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageName}</title>
  ${fonts.google && fonts.google.filter(font => font && font.url).map(font => `<link href="${font.url}" rel="stylesheet">`).join('\n  ')}
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.5/dist/tailwind.min.css">
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

          // Ajouter la page au dossier des pages
          pagesFolder.file(`${pageId}.html`, processedHtml);

          // Ajouter le lien dans l'index
          indexContent += `
      <li><a href="pages/${pageId}.html" class="text-blue-600 hover:underline">${pageName}</a></li>`;
        }

        // Terminer l'index HTML
        indexContent += `
    </ul>
  </div>
</body>
</html>`;

        // Ajouter l'index au dossier racine
        zip.file("index.html", indexContent);

        // Combiner le CSS principal
        const combinedCSS = Array.from(new Set(allCSS.join('\n').split('\n'))).join('\n');
        cssFolder.file("main.css", combinedCSS);

        // Ajouter un README
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

        // Générer l'archive ZIP
        const content = await zip.generateAsync({ type: "blob" });

        // Télécharger l'archive
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