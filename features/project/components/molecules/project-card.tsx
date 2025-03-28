import React from 'react';
import { Clock, FileText } from 'lucide-react';
import { Project } from '../../config/project.type';
import { formatRelativeDate } from '@/shared/lib/utils/date';
import { FlexibleViewActions } from '../organisms/flexible-view-actions';

const ProjectCard = ({ data , row }: {
  data: Project,
  row: any
}) => {
  const { slug, name, updated_at,page_count } = data;
  const getInitial = name ? name.charAt(0).toUpperCase() : '?';
  
  const colorClasses = [
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-purple-100 text-purple-600',
    'bg-yellow-100 text-yellow-600',
    'bg-pink-100 text-pink-600',
    'bg-indigo-100 text-indigo-600'
  ];
  
  const getColorClass = () => {
    if (!name) return 'bg-gray-100 text-gray-600';
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colorClasses[hash % colorClasses.length];
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
      <div className="h-44 bg-gray-100 rounded-t-lg overflow-hidden">
          <div className={`flex items-center justify-center h-full ${getColorClass()}`}>
            <span className="text-4xl font-bold">{getInitial}</span>
          </div>
      </div>
    
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800 mb-1 truncate">{name}</h3>
        <p className="text-sm text-gray-400 italic mb-3">Pas de description</p>
        
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <Clock className="w-3.5 h-3.5 mr-1" />
          <span>Mis à jour {formatRelativeDate(updated_at)}</span>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <FileText className="w-3.5 h-3.5 mr-1" />
          <span>{page_count || 0} pages</span>
        </div>
        <FlexibleViewActions row={row}/>
      </div>
    </div>
  );
};

export default ProjectCard;