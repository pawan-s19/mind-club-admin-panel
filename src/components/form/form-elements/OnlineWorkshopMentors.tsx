import React, { useState, useCallback } from 'react';

interface Mentor {
  name?: string;
  description?: string;
  about?: string;
  photo: {
    url: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
    _id?: string;
  }>;
  _id?: string;
}

interface OnlineWorkshopMentorsProps {
  aboutMentors: {
    title: string;
    subtitle: string;
    mentors: Mentor[];
  };
  onAboutMentorsChange: (data: Partial<{
    title: string;
    subtitle: string;
    mentors: Mentor[];
  }>) => void;
  onFileUpload: (file: File) => Promise<string>;
}

const OnlineWorkshopMentors: React.FC<OnlineWorkshopMentorsProps> = ({
  aboutMentors,
  onAboutMentorsChange,
  onFileUpload
}) => {
  const [newMentor, setNewMentor] = useState<Mentor>({
    name: '',
    description: '',
    about: '',
    photo: { url: '' },
    socialLinks: []
  });

  const handleAddMentor = useCallback(() => {
    if (newMentor.name?.trim()) {
      onAboutMentorsChange({ 
        mentors: [...aboutMentors.mentors, newMentor] 
      });
      setNewMentor({
        name: '',
        description: '',
        about: '',
        photo: { url: '' },
        socialLinks: []
      });
    }
  }, [newMentor, aboutMentors.mentors, onAboutMentorsChange]);

  const handleRemoveMentor = useCallback((index: number) => {
    const updatedMentors = aboutMentors.mentors.filter((_, i) => i !== index);
    onAboutMentorsChange({ mentors: updatedMentors });
  }, [aboutMentors.mentors, onAboutMentorsChange]);

  const handlePhotoChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        setNewMentor(prev => ({
          ...prev,
          photo: {
            url: base64Data
          }
        }));
      } catch (error) {
        console.error('Error uploading mentor photo:', error);
      }
    }
  }, [onFileUpload]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 7: Mentor Information
        </h3>
      </div>
      <div className="p-6.5">
        {/* Section Title and Subtitle */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Mentors Section Title <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter mentors section title"
            value={aboutMentors.title}
            onChange={(e) => onAboutMentorsChange({ title: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Mentors Section Subtitle <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter mentors section subtitle"
            value={aboutMentors.subtitle}
            onChange={(e) => onAboutMentorsChange({ subtitle: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        {/* Existing Mentors */}
        {aboutMentors.mentors.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-black dark:text-white">Existing Mentors</h4>
            <div className="space-y-3">
              {aboutMentors.mentors.map((mentor, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium text-black dark:text-white">{mentor.name}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{mentor.about}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveMentor(index)}
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

        {/* Add New Mentor */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-black dark:text-white">Add New Mentor</h4>
          
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Mentor Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter mentor name"
              value={newMentor.name}
              onChange={(e) => setNewMentor(prev => ({ ...prev, name: e.target.value }))}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Mentor Description
            </label>
            <input
              type="text"
              placeholder="Brief description of the mentor"
              value={newMentor.description}
              onChange={(e) => setNewMentor(prev => ({ ...prev, description: e.target.value }))}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Mentor About
            </label>
            <input
              type="text"
              placeholder="Enter mentor about"
              value={newMentor.about}
              onChange={(e) => setNewMentor(prev => ({ ...prev, about: e.target.value }))}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Mentor Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {newMentor.photo.url && (
              <div className="mt-2">
                <img
                  src={newMentor.photo.url}
                  alt="Mentor preview"
                  className="h-20 w-20 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Social Links
            </label>
            <div className="space-y-2">
              {(newMentor.socialLinks || []).map((link, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Platform (e.g., Instagram, YouTube, LinkedIn)"
                    value={link.platform}
                    onChange={(e) => {
                      const updatedLinks = [...(newMentor.socialLinks || [])];
                      updatedLinks[index] = { ...updatedLinks[index], platform: e.target.value };
                      setNewMentor(prev => ({ ...prev, socialLinks: updatedLinks }));
                    }}
                    className="flex-1 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => {
                      const updatedLinks = [...(newMentor.socialLinks || [])];
                      updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };
                      setNewMentor(prev => ({ ...prev, socialLinks: updatedLinks }));
                    }}
                    className="flex-1 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  <button
                    onClick={() => {
                      const updatedLinks = (newMentor.socialLinks || []).filter((_, i) => i !== index);
                      setNewMentor(prev => ({ ...prev, socialLinks: updatedLinks }));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  setNewMentor(prev => ({
                    ...prev,
                    socialLinks: [...(prev.socialLinks || []), { platform: '', url: '' }]
                  }));
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Add Social Link
              </button>
            </div>
          </div>

          <button
            onClick={handleAddMentor}
            disabled={!newMentor.name?.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            Add Mentor
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnlineWorkshopMentors; 