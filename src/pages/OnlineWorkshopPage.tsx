import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/rootReducer";
import { fetchOnlineWorkshopById } from "../store/onlineWorkshopSlice";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import OnlineWorkshopHeaderCard from "../components/UserProfile/OnlineWorkshopHeaderCard";
import OnlineWorkshopPricingCard from "../components/UserProfile/OnlineWorkshopPricingCard";
import OnlineWorkshopHighlightsCard from "../components/UserProfile/OnlineWorkshopHighlightsCard";
import OnlineWorkshopAboutCard from "../components/UserProfile/OnlineWorkshopAboutCard";
import OnlineWorkshopProjectsCard from "../components/UserProfile/OnlineWorkshopProjectsCard";
import OnlineWorkshopTopicsCard from "../components/UserProfile/OnlineWorkshopTopicsCard";
import OnlineWorkshopMentorsCard from "../components/UserProfile/OnlineWorkshopMentorsCard";
import OnlineWorkshopMeetingLinkCard from "../components/UserProfile/OnlineWorkshopMeetingLinkCard";

export default function OnlineWorkshopPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentOnlineWorkshop, loading, error } = useSelector((state: RootState) => state.onlineWorkshop);
  
  console.log('Online Workshop ID:', id);
  console.log('Current Online Workshop:', currentOnlineWorkshop);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchOnlineWorkshopById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Loading online workshop...</div>
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

  if (!currentOnlineWorkshop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Online workshop not found</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Online Workshop Details | Mind Club Admin Panel"
        description="View and edit online workshop details in the Mind Club Admin Panel"
      />
      <PageBreadcrumb pageTitle="Online Workshop Details" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Online Workshop Data
          </h3>
        </div>
        
        <div className="space-y-6">
          <OnlineWorkshopHeaderCard 
            header={currentOnlineWorkshop.workshopHeader} 
            workshopId={id || ''} 
          />
          <OnlineWorkshopPricingCard 
            price={currentOnlineWorkshop.price} 
            workshopId={id || ''} 
          />
          <OnlineWorkshopHighlightsCard 
            highlights={currentOnlineWorkshop.workshopHighlights} 
            workshopId={id || ''} 
          />
          <OnlineWorkshopAboutCard 
            aboutWorkshop={currentOnlineWorkshop.aboutWorkshop}
            workshopId={id || ''} 
          />
          <OnlineWorkshopProjectsCard 
            projects={currentOnlineWorkshop.projects} 
            workshopId={id || ''} 
          />
          <OnlineWorkshopTopicsCard 
            topics={currentOnlineWorkshop.topics}
            workshopId={id || ''} 
          />
          <OnlineWorkshopMentorsCard 
            aboutMentors={currentOnlineWorkshop.aboutMentors}
            workshopId={id || ''} 
          />
          <OnlineWorkshopMeetingLinkCard 
            meetingLink={currentOnlineWorkshop.meetingLink} 
            workshopId={id || ''} 
          />
        </div>
      </div>
    </>
  );
} 