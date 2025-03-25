import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export type PageData = {
  id: string;
  name: string;
  html: string;
  css: string;
};

export type TemplateData = {
  id?: string;
  userID: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  pages: PageData[];
  settings?: {
    title: string;
    description: string;
    category: string;
  };
};

export const templateApi = {
  /**
   * Get template by ID
   */
  async getTemplate(id: string): Promise<TemplateData> {
    try {
      const response = await axios.get(`${API_BASE_URL}/templates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching template:', error);
      throw error;
    }
  },

  /**
   * Create a new template
   */
  async createTemplate(templateData: TemplateData): Promise<TemplateData> {
    try {
      const response = await axios.post(`${API_BASE_URL}/templates`, templateData);
      return response.data;
    } catch (error) {
      console.error('Error creating template:', error);
      throw error;
    }
  },

  /**
   * Update an existing template
   */
  async updateTemplate(id: string, templateData: TemplateData): Promise<TemplateData> {
    try {
      const response = await axios.put(`${API_BASE_URL}/templates/${id}`, templateData);
      return response.data;
    } catch (error) {
      console.error('Error updating template:', error);
      throw error;
    }
  },

  /**
   * Delete a template
   */
  async deleteTemplate(id: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/templates/${id}`);
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  },

  /**
   * Add a template to user's collection
   */
  async addToUserTemplates(data: {
    userID: string;
    templateID: string;
    name: string;
    description: string;
    category: string;
    title: string;
    pages: PageData[];
  }): Promise<any> {
    try {
      const response = await axios.post(`${API_BASE_URL}/user-templates`, data);
      return response.data;
    } catch (error) {
      console.error('Error adding to user templates:', error);
      throw error;
    }
  },

  /**
   * Delete a page from a template
   */
  async deletePage(templateId: string, pageId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}`);
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  }
};