import React, { useState, useCallback } from 'react';

interface OnlineWorkshopTopicsProps {
  topics: {
    title: string;
    subtitle: string;
    description: string;
    learnings: string[];
  };
  onTopicsChange: (data: Partial<{
    title: string;
    subtitle: string;
    description: string;
    learnings: string[];
  }>) => void;
}

const OnlineWorkshopTopics: React.FC<OnlineWorkshopTopicsProps> = ({
  topics,
  onTopicsChange
}) => {
  const [newLearning, setNewLearning] = useState('');

  const handleAddLearning = useCallback(() => {
    if (newLearning.trim()) {
      onTopicsChange({ 
        learnings: [...topics.learnings, newLearning.trim()] 
      });
      setNewLearning('');
    }
  }, [newLearning, topics.learnings, onTopicsChange]);

  const handleRemoveLearning = useCallback((index: number) => {
    const updatedLearnings = topics.learnings.filter((_, i) => i !== index);
    onTopicsChange({ learnings: updatedLearnings });
  }, [topics.learnings, onTopicsChange]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLearning();
    }
  }, [handleAddLearning]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 6: What You'll Learn (Topics)
        </h3>
      </div>
      <div className="p-6.5">
        {/* Section Title */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Topics Section Title <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter topics section title"
            value={topics.title}
            onChange={(e) => onTopicsChange({ title: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        {/* Section Subtitle */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Topics Section Subtitle
          </label>
          <input
            type="text"
            placeholder="Enter topics section subtitle"
            value={topics.subtitle}
            onChange={(e) => onTopicsChange({ subtitle: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        {/* Section Description */}
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Topics Section Description
          </label>
          <textarea
            placeholder="Enter topics section description..."
            value={topics.description}
            onChange={(e) => onTopicsChange({ description: e.target.value })}
            rows={3}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        {/* Existing Learnings */}
        {topics.learnings.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-black dark:text-white">Learning Topics</h4>
            <div className="space-y-2">
              {topics.learnings.map((learning, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg dark:bg-gray-800">
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
          </div>
        )}

        {/* Add New Learning */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-black dark:text-white">Add Learning Topic</h4>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter what participants will learn..."
              value={newLearning}
              onChange={(e) => setNewLearning(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            <button
              onClick={handleAddLearning}
              disabled={!newLearning.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              Add
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            Press Enter or click Add to include a new learning topic. Examples: "Master advanced React hooks", "Build responsive layouts", "Implement state management"
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineWorkshopTopics; 