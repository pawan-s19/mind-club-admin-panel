import React, { useState, useCallback } from 'react';

interface Project {
  title: string;
  subtitle: string;
  image: {
    url: string;
  };
  link: string;
}

interface OnlineWorkshopProjectsProps {
  projects: {
    title: string;
    description: string;
    items: Project[];
  };
  onProjectsChange: (data: Partial<{
    title: string;
    description: string;
    items: Project[];
  }>) => void;
  onFileUpload: (file: File) => Promise<string>;
}

const OnlineWorkshopProjects: React.FC<OnlineWorkshopProjectsProps> = ({
  projects,
  onProjectsChange,
  onFileUpload
}) => {
  const [newProject, setNewProject] = useState<Project>({
    title: '',
    subtitle: '',
            image: { url: '' },
    link: ''
  });

  const handleAddProject = useCallback(() => {
    if (newProject.title.trim()) {
      onProjectsChange({ 
        items: [...projects.items, newProject] 
      });
      setNewProject({
        title: '',
        subtitle: '',
        image: { url: '' },
        link: ''
      });
    }
  }, [newProject, projects.items, onProjectsChange]);

  const handleRemoveProject = useCallback((index: number) => {
    const updatedItems = projects.items.filter((_, i) => i !== index);
    onProjectsChange({ items: updatedItems });
  }, [projects.items, onProjectsChange]);

  const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        setNewProject(prev => ({
          ...prev,
          image: {
            url: base64Data
          }
        }));
      } catch (error) {
        console.error('Error uploading project image:', error);
      }
    }
  }, [onFileUpload]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 5: Mentor's Work (Projects)
        </h3>
      </div>
      <div className="p-6.5">
        {/* Section Title and Description */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Projects Section Title
          </label>
          <input
            type="text"
            placeholder="Enter projects section title"
            value={projects.title}
            onChange={(e) => onProjectsChange({ title: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Projects Section Description
          </label>
          <textarea
            placeholder="Enter projects section description..."
            value={projects.description}
            onChange={(e) => onProjectsChange({ description: e.target.value })}
            rows={3}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        {/* Existing Projects */}
        {projects.items.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-black dark:text-white">Existing Projects</h4>
            <div className="space-y-3">
              {projects.items.map((project, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium text-black dark:text-white">{project.title}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{project.subtitle}</p>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          View Project
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveProject(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Project */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-black dark:text-white">Add New Project</h4>
          
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Project Title <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter project title"
              value={newProject.title}
              onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Project Subtitle
            </label>
            <input
              type="text"
              placeholder="Enter project subtitle"
              value={newProject.subtitle}
              onChange={(e) => setNewProject(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Project Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {newProject.image.url && (
              <div className="mt-2">
                <img
                  src={newProject.image.url}
                  alt="Project preview"
                  className="h-20 w-20 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Project Link
            </label>
            <input
              type="url"
              placeholder="Enter project link (optional)"
              value={newProject.link}
              onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <button
            onClick={handleAddProject}
            disabled={!newProject.title.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnlineWorkshopProjects; 