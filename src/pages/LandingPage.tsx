import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/rootReducer";
import { fetchLandingById, updateLanding } from "../store/landingSlice";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import LandingHeroCard from "../components/UserProfile/LandingHeroCard";
import LandingAgencyCard from "../components/UserProfile/LandingAgencyCard";
import LandingFooterCard from "../components/UserProfile/LandingFooterCard";
import Button from "../components/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { id } = useParams<{ id: string }>();
  console.log('LandingPage - ID:', id);
  const dispatch = useDispatch<AppDispatch>();
  const { currentLanding, loading, error } = useSelector((state: RootState) => state.landing);
  const navigate = useNavigate();
  
  console.log('LandingPage - currentLanding:', currentLanding);
  
  useEffect(() => {
    if (id) {
      console.log('LandingPage - Fetching landing with ID:', id);
      dispatch(fetchLandingById(id));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      // Note: You'll need to implement deleteLanding in your API and Redux slice
      // await dispatch(deleteLanding(id)).unwrap();
      navigate("/landing-tables"); // Change to your landing list route
    } catch (err) {
      alert("Failed to delete landing page");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Loading landing page...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!currentLanding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Landing page not found</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Landing Page Management | Mind Club Admin"
        description="Manage your landing page content and settings"
      />
      <PageBreadcrumb pageTitle="Landing Page" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Landing Page Data
          </h3>
          <Button size="sm" variant="outline" onClick={handleDelete} disabled={loading}>
            Delete
          </Button>
        </div>
        
        <div className="space-y-6">
          <LandingHeroCard 
            hero={currentLanding?.hero || {
              backgroundImageOrVideo: '',
              headline: '',
              subheadline: '',
              ctaText: '',
              ctaLink: '',
              badgeImageOrVideo: ''
            }} 
            landingId={id} 
          />
          <LandingAgencyCard 
            agencySection={currentLanding?.agencySection || {
              title: '',
              description: '',
              ctaText: '',
              ctaLink: '',
              imageOrVideo: ''
            }} 
            landingId={id} 
          />
          <LandingFooterCard 
            footer={currentLanding?.footer || {
              logoOrVideo: '',
              description: '',
              links: [],
              socialLinks: [],
              copyright: ''
            }} 
            landingId={id} 
          />
        </div>

      </div>
    </>
  );
} 