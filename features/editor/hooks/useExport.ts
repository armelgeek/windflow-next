// hooks/useExport.js
import { useState } from 'react';
import JSZip from 'jszip';
import toast from 'react-hot-toast';
import { replaceImageURLs } from '@/shared/lib/image';
import { generateTailwindConfig } from '@/shared/lib/tailwind';

export const useExport = (editorRef, templateDetails) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportZip = async () => {
    try {
      setIsExporting(true);
      const editor = editorRef.current;
      if (!editor) return;
      
      const pm = editor.Pages;
      const zip = new JSZip();

      const assetsFolder = zip.folder("assets");
      const cssFolder = zip.folder("css");
      const fontsFolder = zip.folder("fonts");
      const pagesFolder = zip.folder("pages");

      // Get custom fonts from localStorage
      const savedFonts = localStorage.getItem('gjs-fonts');
      const fonts = savedFonts ? JSON.parse(savedFonts) : { system: [], google: [], custom: [] };

      // Process custom fonts
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
                console.error(`Error processing font ${font.name}:`, error);
              }
            } else if (Array.isArray(font.files)) {
              // Process multiple variants of the same font
              for (let i = 0; i < font.files.length; i++) {
                const file = font.files[i];
                if (file && file.url && typeof file.url === 'string' && file.url.startsWith('data:')) {
                  try {
                    const matches = file.url.match(/^data:([^;]+);base64,(.+)$/);

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

                      const weight = file.weight || 400;
                      const style = file.style || 'normal';
                      const fontFileName = `${fontName}-${weight}-${style}.${extension}`;

                      fontsFolder.file(fontFileName, base64Data, { base64: true });

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
                    console.error(`Error processing font variant for ${font.name}:`, error);
                  }
                }
              }
            }
          } else if (font.fontFaceData) {
            // If we don't have files but have @font-face data
            try {
              const urlMatch = font.fontFaceData.match(/url\("([^"]+)"\)/);
              if (urlMatch && urlMatch.length > 1) {
                const fontUrl = urlMatch[1];

                if (fontUrl.startsWith('data:')) {
                  // Base64 encoded font
                  const matches = fontUrl.match(/^data:([^;]+);base64,(.+)$/);

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

                    // Extract weight and style from existing rule
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
                  // External URL, copy the @font-face rule
                  fontCssContent += font.fontFaceData;
                }
              } else {
                // No URL found, copy the @font-face rule
                fontCssContent += font.fontFaceData;
              }
            } catch (error) {
              console.error(`Error processing @font-face data for ${font.name}:`, error);
              fontCssContent += font.fontFaceData;
            }
          }
        }

        if (fontCssContent && cssFolder) {
          cssFolder.file('fonts.css', fontCssContent);
        }
      }

      // Add Tailwind config
      zip.file("tailwind.config.js", generateTailwindConfig(fonts));

      // Process all pages
      const allPages = pm.getAll();
      const processedImages = {};
      let imageCount = 0;

      // Extract images from all pages
      for (const page of allPages) {
        const pageId = page.id;
        const pageHtml = page.get("customHtml") || "";

        // Extract images from img tags
        const base64Regex = /<img[^>]+src=["'](data:image\/[^;]+;base64,[^"']+)["'][^>]*>/g;
        let match;
        let processedHtml = pageHtml;

        while ((match = base64Regex.exec(pageHtml)) !== null) {
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
          } catch (e) {
            console.error(`Failed to extract image: ${e.message}`);
          }
        }

        // Extract background images
        const backgroundRegex = /background(?:-image)?:\s*url\(["']?(data:image\/[^;]+;base64,[^"')]+)["']?\)/g;
        while ((match = backgroundRegex.exec(pageHtml)) !== null) {
          const base64Data = match[1];

          // Skip if already processed
          if (processedImages[base64Data]) {
            processedHtml = processedHtml.replace(base64Data, processedImages[base64Data]);
            continue;
          }

          const mimeMatch = base64Data.match(/data:image\/([^;]+);/);
          const imageType = mimeMatch ? mimeMatch[1] : 'png';

          const fileName = `bg-image-${imageCount++}.${imageType}`;
          const imagePath = `../assets/${fileName}`;

          try {
            const base64Content = base64Data.split(',')[1];
            assetsFolder.file(fileName, base64Content, { base64: true });

            processedImages[base64Data] = imagePath;
            processedHtml = processedHtml.replace(base64Data, imagePath);
          } catch (e) {
            console.error(`Failed to extract background image: ${e.message}`);
          }
        }
      }

      // Create index.html
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

      // Process each page
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

      // Combine and deduplicate CSS
      const combinedCSS = Array.from(new Set(allCSS.join('\n').split('\n'))).join('\n');
      if (cssFolder) cssFolder.file("main.css", combinedCSS);

      // Add README.md
      zip.file("README.md", `# ${templateDetails.title || 'Untitled'} - Template Tailwind v3

      ## Description
      ${templateDetails.description || 'No description provided.'}

      ## Custom Fonts
      This template uses ${fonts.google && fonts.custom ? (fonts.google.length + fonts.custom.length) : 0} custom fonts:
      ${fonts.google ? fonts.google.filter(f => f && f.name).map(font => `- ${font.name} (Google Fonts)`).join('\n') : ''}
      ${fonts.custom ? fonts.custom.filter(f => f && f.name).map(font => `- ${font.name} (Custom Font)`).join('\n') : ''}

      ## Project Structure
      - \`index.html\`: Main page with links to all template pages
      - \`/pages/\`: Individual HTML pages
      - \`/css/\`: CSS files (main.css contains shared styles, fonts.css contains custom fonts)
      - \`/fonts/\`: Custom font files
      - \`/assets/\`: Images and other resources
      - \`tailwind.config.js\`: Tailwind configuration with custom fonts

      ## Usage
      1. Open index.html to see all available pages
      2. Navigate to individual pages via the links

      *Exported on: ${new Date().toLocaleString()}*`);

      // Generate the zip file
      const content = await zip.generateAsync({ type: "blob" });

      // Create a download link
      const zipFilename = `${templateDetails.title || 'template'}-export-${new Date().getTime()}.zip`.replace(/\s+/g, '-').toLowerCase();
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = zipFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Template exported successfully!");
      return true;
    } catch (error) {
      console.error("Failed to export template:", error);
      toast.error("Failed to export template. Please try again.");
      return false;
    } finally {
      setIsExporting(false);
    }
  };

  const captureHomePageScreenshot = async () => {
    try {
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
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
      return null;
    }
  };

  return {
    handleExportZip,
    captureHomePageScreenshot,
    isExporting
  };
};