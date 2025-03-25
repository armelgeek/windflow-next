import axios from 'axios';
import { PageData } from './template.api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const pageApi = {
  /**
   * Get a specific page from a template
   */
  async getPage(templateId: string, pageId: string): Promise<PageData> {
    try {
      const response = await axios.get(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  },

  /**
   * Get all pages from a template
   */
  async getPages(templateId: string): Promise<PageData[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/templates/${templateId}/pages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  },

  /**
   * Create a new page
   */
  async createPage(templateId: string, pageData: PageData): Promise<PageData> {
    try {
      const response = await axios.post(`${API_BASE_URL}/templates/${templateId}/pages`, pageData);
      return response.data;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  },

  /**
   * Update a page
   */
  async updatePage(templateId: string, pageId: string, pageData: PageData): Promise<PageData> {
    try {
      const response = await axios.put(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}`, pageData);
      return response.data;
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  },

  /**
   * Delete a page
   */
  async deletePage(templateId: string, pageId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}`);
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  },

  /**
   * Generate a preview URL for a page
   */
  async generatePreview(templateId: string, pageId: string): Promise<{ previewUrl: string }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}/preview`);
      return response.data;
    } catch (error) {
      console.error('Error generating preview:', error);
      throw error;
    }
  }
};