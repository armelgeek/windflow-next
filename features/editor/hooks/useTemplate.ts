import { useState, RefObject } from "react";
import toast from "react-hot-toast";
import { useSession } from '../../../shared/hooks/use-session-info';
export const useTemplate = (editorRef: RefObject<any>) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({
    title: "",
    description: "",
    category: "",
  });
  
  const { data: session } = useSession();

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemplateDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSaveTemplate = () => {
    setShowModal(true);
  };

  const captureHomePageScreenshot = async () => {
    if (!editorRef.current) return null;
    
    const editor = editorRef.current;
    const frame = editor.Canvas.getFrameEl();
    const canvasEl = frame?.contentWindow?.document?.body;

    if (!canvasEl) {
      toast.error("Could not capture canvas");
      return null;
    }

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(canvasEl);
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Failed to capture screenshot", error);
      return null;
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editorRef.current || !session?.user) {
      toast.error("You must be logged in to save templates");
      return;
    }

    setIsLoading(true);
    
    try {
      const editor = editorRef.current;

      const image = await captureHomePageScreenshot();
      
      const pm = editor.Pages;
      const currentPage = pm.getSelected();
      if (currentPage) {
        currentPage.set("customHtml", editor.getHtml());
        currentPage.set("customCss", editor.getCss());
      }

      const projectPages = pm.getAll().map((page) => {
        return {
          id: page.id,
          name: page.get("name"),
          html: page.get("customHtml") || "",
          css: page.get("customCss") || "",
        };
      });

      const templateId = localStorage.getItem('currentTemplateId');

      const projectData = {
        userID: session.user.id,
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

      let savedTemplate;
      
      if (templateId) {
        try {
         // savedTemplate = await templateApi.updateTemplate(templateId, projectData);
          toast.success("Template updated successfully!");
        } catch (error) {
          console.error("Failed to update template:", error);
          toast.error("Failed to update template. Please try again.");
          setIsLoading(false);
          return;
        }
      } else {
        try {
          //savedTemplate = await templateApi.createTemplate(projectData);
          toast.success("Template saved successfully!");
          
          if (savedTemplate.id) {
            localStorage.setItem('currentTemplateId', savedTemplate.id);
          }
        } catch (error) {
          console.error("Failed to save template:", error);
          toast.error("Failed to save template. Please try again.");
          setIsLoading(false);
          return;
        }
      }

      // Add to user's personal templates
      if (savedTemplate.id) {
        try {
          await templateApi.addToUserTemplates({
            userID: session.user.id,
            templateID: savedTemplate.id,
            name: savedTemplate.title,
            description: savedTemplate.description,
            category: savedTemplate.category,
            title: savedTemplate.title,
            pages: projectPages,
          });
          toast.success("Also added to your personal dashboard!");
        } catch (apiError) {
          console.error("Failed to add to user templates:", apiError);
          // Non-critical error, don't show toast
        }
      }

      setShowModal(false);
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    templateDetails,
    handleModalChange,
    handleSaveTemplate,
    handleModalSubmit,
    showModal,
    setShowModal,
    captureHomePageScreenshot,
    isLoading
  };
};