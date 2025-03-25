import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { localStorageAPI } from "@/shared/lib/storage";
import html2canvas from "html2canvas";

export const useTemplate = (editorRef) => {
  const [showModal, setShowModal] = useState(false);
  const [templateDetails, setTemplateDetails] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setTemplateDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSaveTemplate = () => {
    setShowModal(true);
  };

  const captureHomePageScreenshot = async () => {
    const editor = editorRef.current;
    if (!editor) return null;

    const frame = editor.Canvas.getFrameEl();
    const canvasEl = frame?.contentWindow?.document?.body;

    if (!canvasEl) {
      toast.error("Could not capture canvas");
      return null;
    }

    try {
      const canvas = await html2canvas(canvasEl);
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      return null;
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const editor = editorRef.current;

    if (!editor) {
      toast.error("Editor not initialized");
      return;
    }

    const image = await captureHomePageScreenshot();
    const pm = editor.Pages;

    // Save current page state
    const saveCurrentPageState = () => {
      const currentPage = pm.getSelected();
      if (currentPage) {
        currentPage.set("customHtml", editor.getHtml());
        currentPage.set("customCss", editor.getCss());
      }
    };

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

  return {
    templateDetails,
    handleModalChange,
    handleSaveTemplate,
    handleModalSubmit,
    showModal,
    setShowModal
  };
};