'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SearchBar from '../molecules/search-bar';
import ProjectCard from '../molecules/project-card';
import EmptyState from '../molecules/empty-state';
import CreateProjectModal from '../molecules/create-project-modal';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 'project-1',
      name: 'Landing Page',
      description: 'Company marketing landing page with tailwind components',
      thumbnail: null,
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), 
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      pagesCount: 3
    },
    {
      id: 'project-2',
      name: 'Portfolio Website',
      description: 'Personal portfolio to showcase projects and skills',
      thumbnail: null,
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), 
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
      pagesCount: 5
    },
    {
      id: 'project-3',
      name: 'Blog Template',
      description: 'A modern blog design with multiple article layouts',
      thumbnail: null,
      updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), 
      pagesCount: 4
    },
    {
      id: 'project-4',
      name: 'E-commerce Dashboard',
      description: 'Admin dashboard for product management',
      thumbnail: null,
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
      pagesCount: 6
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('updatedAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  const router = useRouter();

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCreateProject = (projectData) => {
    // Show loading state
    setIsLoading(true);
    
    setTimeout(() => {
      const newId = `project-${Date.now()}`;
      
      const newProject = {
        id: newId,
        name: projectData.name,
        description: projectData.description || '',
        thumbnail: null,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        pagesCount: 1
      };
      
      setProjects([newProject, ...projects]);
      setIsCreateModalOpen(false);
      setIsLoading(false);
      
      // Show success message with toast
      showToast(`Project "${projectData.name}" created successfully!`);
      
      // In a real app, we would navigate to the editor
      // router.push(`/editor/${newId}`);
    }, 800);
  };

  const handleDeleteProject = (projectId) => {
    setSelectedProject(projects.find(p => p.id === projectId));
    
    // Open confirmation dialog
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsLoading(true);
      
      setTimeout(() => {
        setProjects(projects.filter(project => project.id !== projectId));
        setIsLoading(false);
        showToast('Project deleted successfully');
      }, 500);
    }
  };

  const handleEditProject = (projectId) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, navigate to editor
      // router.push(`/editor/${projectId}`);
      alert(`Editing project ${projectId}. In a real app, you would be redirected to the editor.`);
    }, 300);
  };

  const handleDuplicate = (projectId) => {
    const projectToDuplicate = projects.find(p => p.id === projectId);
    if (!projectToDuplicate) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newProject = {
        ...projectToDuplicate,
        id: `project-${Date.now()}`,
        name: `${projectToDuplicate.name} (Copy)`,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      
      setProjects([newProject, ...projects]);
      setIsLoading(false);
      showToast(`Project duplicated successfully`);
    }, 800);
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  // Simple toast notification function (replace with a proper toast library in production)
  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-up';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-fade-out');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort projects based on current sort settings
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    let valueA, valueB;
    
    if (sortBy === 'updatedAt' || sortBy === 'createdAt') {
      valueA = new Date(a[sortBy]);
      valueB = new Date(b[sortBy]);
    } else if (sortBy === 'pagesCount') {
      valueA = a[sortBy] || 0;
      valueB = b[sortBy] || 0;
    } else {
      valueA = (a[sortBy] || '').toLowerCase();
      valueB = (b[sortBy] || '').toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
     
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl uppercase font-medium text-gray-800">Mes Projets</h1>
          <p className="text-gray-500 mt-1">
            Manage and build your Tailwind visual editor projects
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 rounded-md p-1 flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              title="Grid View"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'}`}
              title="List View"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Ajouter un projet
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <SearchBar 
              placeholder="Search projects..." 
              onSearch={handleSearch} 
              value={searchQuery}
            />
          </div>
          
          <div className="flex items-center text-sm text-gray-500 whitespace-nowrap">
            <span className="mr-2 hidden md:inline">Sort:</span>
            <div className="flex space-x-1 overflow-x-auto pb-1 md:pb-0">
              <button 
                onClick={() => handleSort('name')} 
                className={`px-2 py-1 rounded whitespace-nowrap ${sortBy === 'name' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSort('updatedAt')} 
                className={`px-2 py-1 rounded whitespace-nowrap ${sortBy === 'updatedAt' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                Last updated {sortBy === 'updatedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSort('createdAt')} 
                className={`px-2 py-1 rounded whitespace-nowrap ${sortBy === 'createdAt' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                Created {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                onClick={() => handleSort('pagesCount')} 
                className={`px-2 py-1 rounded whitespace-nowrap ${sortBy === 'pagesCount' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                Pages {sortBy === 'pagesCount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
        
        {searchQuery && (
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="text-gray-500">
              {filteredProjects.length} result{filteredProjects.length !== 1 && 's'} for "{searchQuery}"
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {sortedProjects.length > 0 ? (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProjects.map(project => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onDelete={() => handleDeleteProject(project.id)}
                  onEdit={() => handleEditProject(project.id)}
                  onDuplicate={() => handleDuplicate(project.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Pages</th>
                    <th className="px-6 py-3">Last Updated</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedProjects.map(project => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded overflow-hidden mr-3">
                            <div className="h-full w-full flex items-center justify-center text-gray-500">
                              {project.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{project.name}</div>
                            {project.description && (
                              <div className="text-gray-500 text-sm truncate max-w-xs">{project.description}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {project.pagesCount || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(project.updatedAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(project.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditProject(project.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDuplicate(project.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Duplicate
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <EmptyState 
          title={searchQuery ? "No matching projects found" : "No projects yet"}
          description={searchQuery 
            ? "Try adjusting your search terms or clear the search to see all projects." 
            : "Create your first project to get started with the visual editor."
          }
          action={searchQuery 
            ? { label: "Clear search", onClick: () => setSearchQuery('') } 
            : { label: "Create Project", onClick: () => setIsCreateModalOpen(true) }
          }
        />
      )}

      {/* Pagination (for future use) */}
      {sortedProjects.length > 10 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedProjects.length}</span> of <span className="font-medium">{sortedProjects.length}</span> projects
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 text-sm">1</button>
            <button className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>Next</button>
          </div>
        </div>
      )}

      {/* Project Creation Modal */}
      {isCreateModalOpen && (
        <CreateProjectModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateProject}
        />
      )}

      {/* CSS for animations */}
      <style jsx global>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        
        .animate-fade-out {
          animation: fadeOut 0.3s ease-in forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Helper function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  
  const diffInMs = now - date;
  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInSecs < 60) return 'just now';
  if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString(undefined, { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}