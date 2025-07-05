import React from 'react';

interface OnlineWorkshopAboutProps {
  aboutWorkshop: {
    title: string;
    description: string;
  };
  onAboutWorkshopChange: (data: Partial<{
    title: string;
    description: string;
  }>) => void;
}

const OnlineWorkshopAbout: React.FC<OnlineWorkshopAboutProps> = ({
  aboutWorkshop,
  onAboutWorkshopChange
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 4: About Workshop
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            About Workshop Title
          </label>
          <input
            type="text"
            placeholder="Enter about workshop title"
            value={aboutWorkshop.title}
            onChange={(e) => onAboutWorkshopChange({ title: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Workshop Description <span className="text-meta-1">*</span>
          </label>
          <textarea
            placeholder="Describe your workshop in detail..."
            value={aboutWorkshop.description}
            onChange={(e) => onAboutWorkshopChange({ description: e.target.value })}
            rows={6}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <p className="mt-1 text-sm text-gray-500">
            Provide a comprehensive description of what participants will learn and experience in this workshop.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineWorkshopAbout; 