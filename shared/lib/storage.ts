 export const localStorageAPI = {
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