import React from 'react';

interface OnlineWorkshopMeetingLinkProps {
  meetingLink: string;
  onMeetingLinkChange: (meetingLink: string) => void;
}

const OnlineWorkshopMeetingLink: React.FC<OnlineWorkshopMeetingLinkProps> = ({
  meetingLink,
  onMeetingLinkChange
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 8: Meeting Link (Zoom/Meet)
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Meeting Link <span className="text-meta-1">*</span>
          </label>
          <input
            type="url"
            placeholder="Enter Zoom, Google Meet, or other meeting platform link"
            value={meetingLink}
            onChange={(e) => onMeetingLinkChange(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          <p className="mt-1 text-sm text-gray-500">
            Provide the meeting link for participants to join the online workshop. This can be a Zoom, Google Meet, Microsoft Teams, or any other video conferencing platform link.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            Supported Platforms:
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Zoom Meeting</li>
            <li>• Google Meet</li>
            <li>• Microsoft Teams</li>
            <li>• Webex</li>
            <li>• Any other video conferencing platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OnlineWorkshopMeetingLink; 