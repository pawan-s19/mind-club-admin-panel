import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOnlineWorkshop } from '../../store/onlineWorkshopSlice';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';

interface OnlineWorkshopMeetingLinkCardProps {
  meetingLink: string;
  workshopId: string;
}

const OnlineWorkshopMeetingLinkCard: React.FC<OnlineWorkshopMeetingLinkCardProps> = ({
  meetingLink,
  workshopId
}) => {
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({
    meetingLink: meetingLink || ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      meetingLink: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await dispatch(updateOnlineWorkshop({
        id: workshopId,
        workshopData: { meetingLink: formData.meetingLink }
      }) as unknown as Promise<void>);
      closeModal();
    } catch (error) {
      console.error('Error updating meeting link:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayLink = meetingLink || 'No meeting link provided';

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">
              Meeting Link
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
              Join the Workshop
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Use the link below to join the online workshop session
            </p>
          </div>

          {meetingLink ? (
            <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 break-all"
              >
                {meetingLink}
              </a>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No meeting link provided yet.
            </p>
          )}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Meeting Link
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update the meeting link for your online workshop.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    value={formData.meetingLink}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="https://zoom.us/j/123456789 or https://meet.google.com/abc-defg-hij"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter the full URL for your Zoom, Google Meet, or other video conferencing platform.
                  </p>
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
                disabled={loading}
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

export default OnlineWorkshopMeetingLinkCard; 