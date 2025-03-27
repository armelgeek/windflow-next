import JSZip from 'jszip';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { generateTailwindConfig } from './tailwind';
import { replaceImageURLs } from './image';

export const configureEditorCommands = (editor) => {
  // Add Export ZIP button
  editor.Panels.addButton('options', {
    id: 'export-zip',
    className: 'fa fa-download',
    command: 'export-template',
    attributes: { title: 'Export as ZIP' }
  });

  // Add Save Template button
  editor.Panels.addButton('options', {
    id: 'save-template',
    className: 'fa fa-save',
    command: 'save-template',
    attributes: { title: 'Save Template' }
  });

  // Add New Page button
  editor.Panels.addButton('options', {
    id: 'add-page',
    className: 'fa fa-plus',
    command: 'add-page',
    attributes: { title: 'Add New Page' }
  });

  // Save Page button
  editor.Panels.addButton('options', {
    id: 'save-page',
    className: 'fa fa-floppy-o',
    command: 'save-page',
    attributes: { title: 'Save Current Page' }
  });

  // Save Template command
  editor.Commands.add('save-template', {
    run(editor, sender, options = {}) {
      const modalContent = `
        <div style="padding: 20px">
          <h2 style="margin-bottom: 20px; font-size: 18px; font-weight: bold;">Template Details</h2>
          <div style="margin-bottom: 15px">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Title</label>
            <input type="text" id="template-title" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" placeholder="My Template" required>
          </div>
          <div style="margin-bottom: 15px">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Description</label>
            <input type="text" id="template-description" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Template description" required>
          </div>
          <div style="margin-bottom: 15px">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Category</label>
            <input type="text" id="template-category" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" placeholder="Business, Portfolio, etc." required>
          </div>
          <button id="save-template-btn" style="padding: 10px 15px; background-color: #bd93f9; color: #282a36; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Save Template</button>
        </div>
      `;
      
      // Show modal
      editor.Modal.open({
        title: 'Save Template',
        content: modalContent,
      });
      
      document.getElementById('save-template-btn').addEventListener('click', async () => {
        const title = document.getElementById('template-title').value;
        const description = document.getElementById('template-description').value;
        const category = document.getElementById('template-category').value;
        
        if (!title || !description || !category) {
          alert('Please fill all fields');
          return;
        }
        
        try {
          saveCurrentPageState(editor);
          
          const image = await captureHomePageScreenshot(editor);
          
          const pm = editor.Pages;
          const projectPages = pm.getAll().map((page) => {
            return {
              id: page.id,
              name: page.get("name"),
              html: page.get("customHtml") || "",
              css: page.get("customCss") || "",
            };
          });
          
          const templateDetails = {
            title,
            description,
            category,
          };
          
          // Trigger save event with data
          editor.trigger('template:save', {
            templateDetails,
            pages: projectPages,
            image
          });
          
          editor.Modal.close();
          
          toast.success('Template saved successfully!');
        } catch (error) {
          console.error('Failed to save template:', error);
          toast.error('Failed to save template');
        }
      });
    }
  });

  editor.Commands.add('export-template', {
    async run(editor, sender, options = {}) {
      try {
        toast.loading('Preparing export...', { id: 'export-toast' });
        
      }catch(err){
        console.log(err)
      }
    }
  });


  editor.Commands.add('add-page', {
    run(editor) {
      const modalContent = `
        <div style="padding: 20px">
          <h2 style="margin-bottom: 20px; font-size: 18px; font-weight: bold;">Add New Page</h2>
          <div style="margin-bottom: 15px">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Page Name</label>
            <input type="text" id="page-name" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" placeholder="About, Contact, etc." required>
          </div>
          <button id="add-page-btn" style="padding: 10px 15px; background-color: #50fa7b; color: #282a36; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Add Page</button>
        </div>
      `;
      
      // Show modal
      editor.Modal.open({
        title: 'Add New Page',
        content: modalContent,
      });
      
      // Handle form submission
      document.getElementById('add-page-btn').addEventListener('click', () => {
        const pageName = document.getElementById('page-name').value;
        
        if (!pageName) {
          alert('Please enter a page name');
          return;
        }
        
        
        toast.success(`Page "${pageName}" created successfully`);
      });
    }
  });

  // Save Page command
  editor.Commands.add('save-page', {
    run(editor) {
        toast.success("Page saved successfully!");
    }
  });

  // Delete Page Command (with modal confirmation)
  editor.Commands.add('delete-page', {
    run(editor, sender, options = {}) {
      const pageId = options.pageId;
      const pageName = options.pageName || pageId;
      
      if (!pageId) {
        toast.error("No page specified");
        return;
      }
      
      const pm = editor.Pages;
      
      // Confirm before deleting
      const modalContent = `
        <div style="padding: 20px">
          <h2 style="margin-bottom: 20px; font-size: 18px; font-weight: bold;">Confirm Page Deletion</h2>
          <p style="margin-bottom: 20px;">Are you sure you want to delete the page "${pageName}"?</p>
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button id="cancel-delete" style="padding: 8px 15px; background-color: #44475a; color: #f8f8f2; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
            <button id="confirm-delete" style="padding: 8px 15px; background-color: #ff5555; color: #f8f8f2; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
          </div>
        </div>
      `;
      
      // Show modal
      editor.Modal.open({
        title: 'Delete Page',
        content: modalContent,
      });
      
     
      /**document.getElementById('cancel-delete').addEventListener('click', () => {
        editor.Modal.close();
      });
      
      document.getElementById('confirm-delete').addEventListener('click', () => {
        if (pm.getAll().length <= 1) {
          alert("Cannot delete the last page");
          editor.Modal.close();
          return;
        }
        
        // Trigger page:delete event before deleting
        editor.trigger('page:delete', {
          id: pageId,
          name: pageName
        });
        
        // Remove the page
        pm.remove(pageId);
        
        // Close modal
        editor.Modal.close();
        
        toast.success(`Page "${pageName}" deleted successfully`);
      });**/
    }
  });

  // Function to save current page state
  function saveCurrentPageState(editor) {
    const pm = editor.Pages;
    const currentPage = pm.getSelected();
    
    if (currentPage) {
      currentPage.set("customHtml", editor.getHtml());
      currentPage.set("customCss", editor.getCss());
    }
  }

  // Function to capture screenshot of the canvas
  async function captureHomePageScreenshot(editor) {
    const frame = editor.Canvas.getFrameEl();
    const canvasEl = frame?.contentWindow?.document?.body;
    
    if (!canvasEl) {
      console.error("Could not capture canvas");
      return null;
    }
    
    try {
      const canvas = await html2canvas(canvasEl);
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Failed to capture screenshot", error);
      return null;
    }
  }

  // Add event listeners for page operations
  editor.on('page:select', (page) => {
    // Update editor with the selected page's content
    if (page) {
      editor.setComponents(page.get("customHtml") || "");
      editor.setStyle(page.get("customCss") || "");
    }
  });



  return {
    saveCurrentPageState,
    captureHomePageScreenshot
  };
};