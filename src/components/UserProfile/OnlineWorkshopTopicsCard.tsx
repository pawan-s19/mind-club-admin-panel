import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOnlineWorkshop } from '../../store/onlineWorkshopSlice';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';

interface OnlineWorkshopTopicsCardProps {
  topics: {
    title: string;
    subtitle?: string;
    description?: string;
    learnings: string[];
  };
  workshopId: string;
}

const OnlineWorkshopTopicsCard: React.FC<OnlineWorkshopTopicsCardProps> = ({
  topics,
  workshopId
}) => {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    title: topics.title || '',
    subtitle: topics.subtitle || '',
    description: topics.description || '',
    learnings: topics.learnings || []
  });
  const [newLearning, setNewLearning] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddLearning = () => {
    if (newLearning.trim()) {
      setFormData(prev => ({
        ...prev,
        learnings: [...prev.learnings, newLearning.trim()]
      }));
      setNewLearning('');
    }
  };

  const handleRemoveLearning = (index: number) => {
    setFormData(prev => ({
      ...prev,
      learnings: prev.learnings.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(updateOnlineWorkshop({
        id: workshopId,
        workshopData: { topics: formData }
      }) as any);
      closeModal();
    } catch (error) {
      console.error('Error updating topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayTitle = topics?.title || 'What You\'ll Learn';
  const displaySubtitle = topics?.subtitle || 'Key learning outcomes from this workshop';
  const displayDescription = topics?.description || 'Comprehensive topics covered in this online workshop';
  const learningsArray = topics?.learnings || [];

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">
              What You'll Learn
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
            {displayDescription && (
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {displayDescription}
              </p>
            )}
          </div>

          {learningsArray.length > 0 ? (
            <div className="space-y-2">
              {learningsArray.map((learning, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-black dark:text-white">{learning}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No learning topics added yet.
            </p>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Topics
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your workshop topics and learning outcomes.
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
                    Section Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter section description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Learning Topics
                  </label>
                  <div className="space-y-2 mb-3">
                    {formData.learnings.map((learning, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded dark:bg-gray-800">
                        <span className="text-black dark:text-white">{learning}</span>
                        <button
                          onClick={() => handleRemoveLearning(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLearning}
                      onChange={(e) => setNewLearning(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLearning())}
                      className="flex-1 rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder="Add new learning topic"
                    />
                    <button
                      onClick={handleAddLearning}
                      disabled={!newLearning.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Add
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

export default OnlineWorkshopTopicsCard; 