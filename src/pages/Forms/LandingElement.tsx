import { useCallback, useEffect, useState } from "react";
import { useLanding } from "../../hooks/useLanding";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import LandingHero from "../../components/form/form-elements/LandingHero";
import LandingAgencySection from "../../components/form/form-elements/LandingAgencySection";
import LandingFooter from "../../components/form/form-elements/LandingFooter";

// Utility function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export default function LandingElement() {
  const {
    currentLanding,
    loading,
    error,
    success,
    createLanding,
    updateLanding,
    fetchLanding,
    updateHero,
    updateAgencySection,
    updateFooter,
    clearError,
    clearSuccess,
  } = useLanding();

  // Fetch existing landing data on component mount if none exists
  useEffect(() => {
    if (!currentLanding._id) {
      fetchLanding();
    }
  }, []); // Empty dependency array to run only once

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

  // Function to submit landing data
  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault()
    if (!currentLanding) {
      console.error('No landing data available');
      return;
    }

    try {
      console.log('=== LANDING FORM DATA ===');
      console.log('Complete Landing Data Structure:');
      console.log(JSON.stringify(currentLanding, null, 2));
      
      // Check if landing already exists (has _id) to determine create vs update
      if (currentLanding._id) {
        await updateLanding(currentLanding, currentLanding._id);
        console.log('Landing page updated successfully!');
      } else {
        await createLanding(currentLanding);
        console.log('Landing page created successfully!');
      }
    } catch (error) {
      console.error('Error saving landing page:', error);
    }
  }, [createLanding, updateLanding, currentLanding]);

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
        title="Landing Page Management | Mind Club Admin"
        description="Manage your landing page content and settings"
      />
      <PageBreadcrumb pageTitle="Landing Page Management" />
      
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
          onClick={(e)=>handleSubmit(e)}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Saving Landing Page...' : 'Save Landing Page'}
        </button>
      </div>
      
      <div className="space-y-6">
        <LandingHero 
          hero={currentLanding?.hero || {
            backgroundImageOrVideo: '',
            headline: '',
            subheadline: '',
            ctaText: '',
            ctaLink: '',
            badgeImageOrVideo: ''
          }}
          onHeroChange={updateHero}
          onFileUpload={handleFileUpload}
        />
        
        <LandingAgencySection 
          agencySection={currentLanding?.agencySection || {
            title: '',
            description: '',
            ctaText: '',
            ctaLink: '',
            imageOrVideo: ''
          }}
          onAgencySectionChange={updateAgencySection}
          onFileUpload={handleFileUpload}
        />
        
        <LandingFooter
          footer={currentLanding?.footer || {
            logoOrVideo: '',
            description: '',
            links: [],
            socialLinks: [],
            copyright: ''
          }}
          onFooterChange={updateFooter}
          onFileUpload={handleFileUpload}
        />
      </div>
    </div>
  );
} 