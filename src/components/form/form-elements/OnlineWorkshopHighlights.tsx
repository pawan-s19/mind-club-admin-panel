import React from 'react';

interface OnlineWorkshopHighlightsProps {
  highlights: {
    mode: 'online';
    certificateProvided: boolean;
    certificateDetails: string;
    duration: string;
    spots: 'Limited' | 'Unlimited' | '10-20' | '20-30' | '30-50';
  };
  onHighlightsChange: (data: Partial<{
    mode: 'online';
    certificateProvided: boolean;
    certificateDetails: string;
    duration: string;
    spots: 'Limited' | 'Unlimited' | '10-20' | '20-30' | '30-50';
  }>) => void;
}

const OnlineWorkshopHighlights: React.FC<OnlineWorkshopHighlightsProps> = ({
  highlights,
  onHighlightsChange
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 3: Workshop Highlights
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Workshop Mode
          </label>
          <input
            type="text"
            value={highlights.mode}
            disabled
            className="w-full rounded border-[1.5px] border-stroke bg-gray-100 px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <p className="mt-1 text-sm text-gray-500">Online workshops only</p>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Duration <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., 2 hours, 1 day, 3 sessions"
            value={highlights.duration}
            onChange={(e) => onHighlightsChange({ duration: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Available Spots
          </label>
          <select
            value={highlights.spots}
            onChange={(e) => onHighlightsChange({ spots: e.target.value as 'Limited' | 'Unlimited' | '10-20' | '20-30' | '30-50' })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="Limited">Limited</option>
            <option value="Unlimited">Unlimited</option>
            <option value="10-20">10-20</option>
            <option value="20-30">20-30</option>
            <option value="30-50">30-50</option>
          </select>
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Certificate Provided
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="certificateProvided"
                checked={highlights.certificateProvided === true}
                onChange={() => onHighlightsChange({ certificateProvided: true })}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="certificateProvided"
                checked={highlights.certificateProvided === false}
                onChange={() => onHighlightsChange({ certificateProvided: false })}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>


      </div>
    </div>
  );
};

export default OnlineWorkshopHighlights; 