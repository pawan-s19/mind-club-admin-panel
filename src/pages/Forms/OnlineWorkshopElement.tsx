import { useCallback, useEffect } from "react";
import { useOnlineWorkshop } from "../../hooks/useOnlineWorkshop";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import OnlineWorkshopHeader from "../../components/form/form-elements/OnlineWorkshopHeader";
import OnlineWorkshopPricing from "../../components/form/form-elements/OnlineWorkshopPricing";
import OnlineWorkshopHighlights from "../../components/form/form-elements/OnlineWorkshopHighlights";
import OnlineWorkshopAbout from "../../components/form/form-elements/OnlineWorkshopAbout";
import OnlineWorkshopProjects from "../../components/form/form-elements/OnlineWorkshopProjects";
import OnlineWorkshopTopics from "../../components/form/form-elements/OnlineWorkshopTopics";
import OnlineWorkshopMentors from "../../components/form/form-elements/OnlineWorkshopMentors";
import OnlineWorkshopMeetingLink from "../../components/form/form-elements/OnlineWorkshopMeetingLink";

// Utility function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function OnlineWorkshopElement() {
  const {
    currentOnlineWorkshop,
    loading,
    error,
    success,
    createOnlineWorkshop,
    updateWorkshopHeader,
    updatePrice,
    updateWorkshopHighlights,
    updateAboutWorkshop,
    updateProjects,
    updateTopics,
    updateAboutMentors,
    updateMeetingLink,
    clearError,
    clearSuccess,
  } = useOnlineWorkshop();

  // Function to handle file uploads and convert to base64
  const handleFileUpload = useCallback(async (file: File): Promise<string> => {
    try {
      const base64Data = await fileToBase64(file);
      return base64Data;
    } catch (error) {
      console.error('Error converting file to base64:', error);
      throw error;
    }
  }, []);

  // Function to submit online workshop data
  const handleSubmit = useCallback(async () => {
    if (!currentOnlineWorkshop) {
      console.error('No online workshop data available');
      return;
    }

    try {
      console.log('=== ONLINE WORKSHOP FORM DATA ===');
      console.log('Complete Online Workshop Data Structure:');
      console.log(JSON.stringify(currentOnlineWorkshop, null, 2));

      // Create the online workshop
      await createOnlineWorkshop(currentOnlineWorkshop);

      console.log('Online Workshop created successfully!');
    } catch (error) {
      console.error('Error creating online workshop:', error);
    }
  }, [createOnlineWorkshop, currentOnlineWorkshop]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        if (error) clearError();
        if (success) clearSuccess();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, success, clearError, clearSuccess]);

  return (
    <div>
      <PageMeta
        title="Create Online Workshop | Mind Club Admin Panel"
        description="Create and manage online workshops for Mind Club"
      />
      <PageBreadcrumb pageTitle="Create Online Workshop" />

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Submit Button */}
      <div className="mb-6">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {loading ? 'Creating Online Workshop...' : 'Submit Online Workshop Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          {/* Section 1: Header (Hero Section) */}
          <OnlineWorkshopHeader
            header={currentOnlineWorkshop?.workshopHeader || {
              thumbnail: { url: '' },
              title: '',
              subtitle: '',
              coverImage: { url: '' },
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString()
            }}
            onHeaderChange={updateWorkshopHeader}
            onFileUpload={handleFileUpload}
          />

          {/* Section 2: Pricing */}
          <OnlineWorkshopPricing
            price={currentOnlineWorkshop?.price || {
              amount: 0,
              currency: 'INR'
            }}
            onPriceChange={updatePrice}
          />

          {/* Section 3: Workshop Highlights */}
          <OnlineWorkshopHighlights
            highlights={currentOnlineWorkshop?.workshopHighlights || {
              mode: 'online',
              certificateProvided: true,
              duration: '',
              spots: 'Limited'
            }}
            onHighlightsChange={updateWorkshopHighlights}
          />

          {/* Section 4: About Workshop */}
          <OnlineWorkshopAbout
            aboutWorkshop={currentOnlineWorkshop?.aboutWorkshop || { title: '', description: '' }}
            onAboutWorkshopChange={updateAboutWorkshop}
          />

        </div>
        <div className="space-y-6">

          {/* Section 5: Mentor's Work (Projects) */}
          <OnlineWorkshopProjects
            projects={currentOnlineWorkshop?.projects || { title: '', description: '', items: [] }}
            onProjectsChange={updateProjects}
            onFileUpload={handleFileUpload}
          />

          {/* Section 6: What You'll Learn (Topics) */}
          <OnlineWorkshopTopics
            topics={currentOnlineWorkshop?.topics || { title: '', subtitle: '', description: '', learnings: [] }}
            onTopicsChange={updateTopics}
          />

          {/* Section 7: Mentor Information */}
          <OnlineWorkshopMentors
            aboutMentors={currentOnlineWorkshop?.aboutMentors || { title: '', subtitle: '', mentors: [] }}
            onAboutMentorsChange={updateAboutMentors}
            onFileUpload={handleFileUpload}
          />

          {/* Section 8: Meeting Link (Zoom/Meet) */}
          <OnlineWorkshopMeetingLink
            meetingLink={currentOnlineWorkshop?.meetingLink || ''}
            onMeetingLinkChange={updateMeetingLink}
          />

        </div>
      </div>
    </div>
  );
} 