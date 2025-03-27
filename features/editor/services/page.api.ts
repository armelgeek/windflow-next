import axios from 'axios';
import { PageData } from './template.api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const pageApi = {

  async getPage(templateId: string, pageId: string): Promise<PageData> {
    try {
      const response = await axios.get(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching page:', error);
      throw error;
    }
  },

  
  async getPages(templateId: string): Promise<PageData[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/templates/${templateId}/pages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  },


  async createPage(templateId: string, pageData: PageData): Promise<PageData> {
    try {
      const response = await axios.post(`${API_BASE_URL}/templates/${templateId}/pages`, pageData);
      return response.data;
    } catch (error) {
      console.error('Error creating page:', error);
      throw error;
    }
  },

  async updatePage(templateId: string, pageId: string, pageData: PageData): Promise<PageData> {
    try {
      const response = await axios.put(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}`, pageData);
      return response.data;
    } catch (error) {
      console.error('Error updating page:', error);
      throw error;
    }
  },

  
  async deletePage(templateId: string, pageId: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/templates/${templateId}/pages/${pageId}`);
    } catch (error) {
      console.error('Error deleting page:', error);
      throw error;
    }
  },

 
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