import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOnlineWorkshop } from '../../store/onlineWorkshopSlice';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';

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

interface OnlineWorkshopMentorsCardProps {
  aboutMentors: {
    title: string;
    subtitle: string;
    mentors: Mentor[];
  };
  workshopId: string;
}

const OnlineWorkshopMentorsCard: React.FC<OnlineWorkshopMentorsCardProps> = ({
  aboutMentors,
  workshopId
}) => {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    title: aboutMentors.title || '',
    subtitle: aboutMentors.subtitle || '',
    mentors: aboutMentors.mentors || []
  });
  const [newMentor, setNewMentor] = useState<Mentor>({
    name: '',
    description: '',
    about: '',
    photo: { url: '' },
    socialLinks: []
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddMentor = () => {
    if (newMentor.name?.trim()) {
      setFormData(prev => ({
        ...prev,
        mentors: [...prev.mentors, newMentor]
      }));
      setNewMentor({
        name: '',
        description: '',
        about: '',
        photo: { url: '' },
        socialLinks: []
      });
    }
  };

  const handleRemoveMentor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mentors: prev.mentors.filter((_, i) => i !== index)
    }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMentor(prev => ({
          ...prev,
          photo: { url: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(updateOnlineWorkshop({
        id: workshopId,
        workshopData: { aboutMentors: formData }
      }) as any);
      closeModal();
    } catch (error) {
      console.error('Error updating mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayTitle = aboutMentors?.title || 'Meet Your Mentors';
  const displaySubtitle = aboutMentors?.subtitle || 'Learn from industry experts';
  const mentorsArray = aboutMentors?.mentors || [];

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">
              Mentor Information
            </h3>
            <button
              onClick={openModal}
              className="text-primary hover:text-primary-dark"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6.5">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-black dark:text-white mb-2">
              {displayTitle}
            </h4>
            {displaySubtitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {displaySubtitle}
              </p>
            )}
          </div>

          {mentorsArray.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentorsArray.map((mentor, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img
                      src={mentor.photo?.url || '/public/images/user/user-01.jpg'}
                      alt={mentor.name || 'Mentor'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-black dark:text-white">{mentor.name || 'Unnamed Mentor'}</h5>
                    {mentor.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.description}</p>
                    )}
                    {mentor.about && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">{mentor.about}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No mentors added yet.
            </p>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Mentors
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your workshop mentors and their information.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Section Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter section title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter section subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Existing Mentors
                  </label>
                  <div className="space-y-2 mb-3">
                    {formData.mentors.map((mentor, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded dark:bg-gray-800">
                        <span className="text-black dark:text-white">{mentor.name || 'Unnamed Mentor'}</span>
                        <button
                          onClick={() => handleRemoveMentor(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h5 className="text-sm font-medium text-black dark:text-white mb-3">Add New Mentor</h5>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Mentor Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newMentor.name}
                        onChange={(e) => setNewMentor(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Enter mentor name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Mentor Description
                      </label>
                      <input
                        type="text"
                        value={newMentor.description}
                        onChange={(e) => setNewMentor(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Brief description of the mentor"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Mentor About
                      </label>
                      <input
                        type="text"
                        value={newMentor.about}
                        onChange={(e) => setNewMentor(prev => ({ ...prev, about: e.target.value }))}
                        className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        placeholder="Additional information about the mentor"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black dark:text-white mb-2">
                        Mentor Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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

                    <button
                      onClick={handleAddMentor}
                      disabled={!newMentor.name?.trim()}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Add Mentor
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.title.trim()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OnlineWorkshopMentorsCard; 