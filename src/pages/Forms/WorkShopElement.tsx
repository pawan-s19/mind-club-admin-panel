import { useCallback, useEffect, useState } from "react";
import { useWorkshop } from "../../hooks/useWorkshop";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import AboutWorkshop from "../../components/form/form-elements/AboutWorkshop";
import Brochure from "../../components/form/form-elements/Brochure";
import LocationWorkshop from "../../components/form/form-elements/LocationWorkshop";
import WorkshopHeader from "../../components/form/form-elements/WorkshopHeader";
import WorkshopItinerary from "../../components/form/form-elements/WorkshopItinerary";
import WorkshopType from "../../components/form/form-elements/WorkshopType";
import WorkshopSubHeroPage from "../../components/form/form-elements/WorkshopSubHeroPage";
import WorkshopSkillsRequired from "../../components/form/form-elements/WorkshopSkillsRequired";
import WorkshopCreatorSection from "../../components/form/form-elements/WorkshopCreatorSection.tsx";
import WorkshopMentor from "../../components/form/form-elements/WorkshopMentor";

type Creator = {
  name: string;
  description: string;
  imageOrVideo: string[];
};

// Utility function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function WorkshopElement() {
  const {
    currentWorkshop,
    loading,
    error,
    success,
    createWorkshop,
    updateHeader,
    updateBrochure,
    updateWorkshopType,
    updateAbout,
    updateLocation,
    updateItinerary,
    updateDates,
    clearError,
    clearSuccess,
    updateSubHeroHeading,
    updateSkills,
    updateMentor,
    updateCreator,
  } = useWorkshop();

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

  // Function to submit workshop data
  const handleSubmit = useCallback(async () => {
    if (!currentWorkshop) {
      console.error('No workshop data available');
      return;
    }

    try {
      console.log('=== WORKSHOP FORM DATA ===');
      console.log('Complete Workshop Data Structure:');
      console.log(JSON.stringify(currentWorkshop, null, 2));
      
      // Create the workshop
      await createWorkshop(currentWorkshop);
      
      console.log('Workshop created successfully!');
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
  }, [createWorkshop, currentWorkshop]);

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
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Workshop Create" />
      
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
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating Workshop...' : 'Submit Workshop Data'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <WorkshopHeader 
            onDataChange={updateHeader}
            onFileUpload={handleFileUpload}
          />
          <Brochure 
            onDataChange={updateBrochure}
            onFileUpload={handleFileUpload}
          />
          <LocationWorkshop 
            onDataChange={updateLocation}
            onFileUpload={handleFileUpload}
          />
          <WorkshopSubHeroPage 
            subHeroHeading={currentWorkshop?.subHeroHeading || ''}
            onSubHeroHeadingChange={updateSubHeroHeading}
          />
          
          <WorkshopSkillsRequired
            skills={currentWorkshop?.skills || { headingOfSection: '', skills: [] }}
            onSkillsChange={updateSkills}
          />

        </div>
        <div className="space-y-6">
          <WorkshopType 
            onTypeChange={updateWorkshopType}
          />
          <AboutWorkshop 
            onDataChange={updateAbout}
            onFileUpload={handleFileUpload}
          />

          <WorkshopCreatorSection
            creator={currentWorkshop?.creators || { name: '', description: '', imageOrVideo: [] }}
            onCreatorChange={updateCreator}
            onFileUpload={handleFileUpload}
          />
          
          <WorkshopMentor
            mentor={currentWorkshop?.mentor || { name: '', description: '', mentorName: '', about: '', mentorImage: '' }}
            onMentorChange={updateMentor}
            onFileUpload={handleFileUpload}
          />
          
          <WorkshopItinerary 
            onDataChange={updateItinerary}
            onDatesChange={updateDates}
            onFileUpload={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
}
