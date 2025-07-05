import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  clearError,
  clearSuccess,
  createOnlineWorkshop,
  deleteOnlineWorkshop,
  fetchOnlineWorkshopById,
  fetchOnlineWorkshops,
  resetCurrentOnlineWorkshop,
  updateWorkshopHeader,
  updatePrice,
  updateWorkshopHighlights,
  updateAboutWorkshop,
  updateProjects,
  updateTopics,
  updateAboutMentors,
  updateMeetingLink,
  updateOnlineWorkshop,
  OnlineWorkshopData,
  setCurrentOnlineWorkshop
} from "../store/onlineWorkshopSlice";

export const useOnlineWorkshop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentOnlineWorkshop, onlineWorkshops, loading, error, success } = useSelector(
    (state: any) => state.onlineWorkshop
  );

  return {
    // State
    currentOnlineWorkshop,
    onlineWorkshops,
    loading,
    error,
    success,
    
    // Actions - wrapped in useCallback to prevent infinite loops
    createOnlineWorkshop: useCallback((data: OnlineWorkshopData) => dispatch(createOnlineWorkshop(data)), [dispatch]),
    updateWorkshopHeader: useCallback((data: Partial<OnlineWorkshopData['workshopHeader']>) => dispatch(updateWorkshopHeader(data)), [dispatch]),
    updatePrice: useCallback((data: Partial<OnlineWorkshopData['price']>) => dispatch(updatePrice(data)), [dispatch]),
    updateWorkshopHighlights: useCallback((data: Partial<OnlineWorkshopData['workshopHighlights']>) => dispatch(updateWorkshopHighlights(data)), [dispatch]),
    updateAboutWorkshop: useCallback((data: Partial<OnlineWorkshopData['aboutWorkshop']>) => dispatch(updateAboutWorkshop(data)), [dispatch]),
    updateProjects: useCallback((data: Partial<OnlineWorkshopData['projects']>) => dispatch(updateProjects(data)), [dispatch]),
    updateTopics: useCallback((data: Partial<OnlineWorkshopData['topics']>) => dispatch(updateTopics(data)), [dispatch]),
    updateAboutMentors: useCallback((data: Partial<OnlineWorkshopData['aboutMentors']>) => dispatch(updateAboutMentors(data)), [dispatch]),
    updateMeetingLink: useCallback((data: string) => dispatch(updateMeetingLink(data)), [dispatch]),
    resetCurrentOnlineWorkshop: useCallback(() => dispatch(resetCurrentOnlineWorkshop()), [dispatch]),
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
    clearSuccess: useCallback(() => dispatch(clearSuccess()), [dispatch]),
    fetchOnlineWorkshops: useCallback(() => dispatch(fetchOnlineWorkshops()), [dispatch]),
    fetchOnlineWorkshopById: useCallback((id: string) => dispatch(fetchOnlineWorkshopById(id)), [dispatch]),
    updateOnlineWorkshop: useCallback((id: string, data: OnlineWorkshopData) => dispatch(updateOnlineWorkshop({ id, workshopData: data })), [dispatch]),
    deleteOnlineWorkshop: useCallback((id: string) => dispatch(deleteOnlineWorkshop(id)), [dispatch]),
    setCurrentOnlineWorkshop: useCallback((data: OnlineWorkshopData) => dispatch(setCurrentOnlineWorkshop(data)), [dispatch]),
  };
}; 