import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  clearError,
  clearSuccess,
  createWorkshop,
  deleteWorkshop,
  fetchWorkshopById,
  fetchWorkshops,
  resetCurrentWorkshop,
  updateAbout,
  updateBrochure,
  updateCategory,
  updateDates,
  updateHeader,
  updateItinerary,
  updateLocation,
  updateThumbnail,
  updateWorkshop,
  updateWorkshopType,
  WorkshopData,
  updateSubHeroHeading,
  updateSkills,
  updateMentor,
  updateCreator
} from "../store/workshopSlice";

export const useWorkshop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentWorkshop, workshops, loading, error, success } = useSelector(
    (state: any) => state.workshop
  );

  return {
    // State
    currentWorkshop,
    workshops,
    loading,
    error,
    success,
    
    // Actions - wrapped in useCallback to prevent infinite loops
    createWorkshop: useCallback((data: WorkshopData) => dispatch(createWorkshop(data)), [dispatch]),
    updateHeader: useCallback((data: Partial<WorkshopData['header']>) => dispatch(updateHeader(data)), [dispatch]),
    updateBrochure: useCallback((data: string) => dispatch(updateBrochure(data)), [dispatch]),
    updateWorkshopType: useCallback((type: 'online' | 'on field') => dispatch(updateWorkshopType(type)), [dispatch]),
    updateAbout: useCallback((data: Partial<WorkshopData['about']>) => dispatch(updateAbout(data)), [dispatch]),
    updateLocation: useCallback((data: Partial<WorkshopData['location']>) => dispatch(updateLocation(data)), [dispatch]),
    updateItinerary: useCallback((data: WorkshopData['itinerary']) => dispatch(updateItinerary(data)), [dispatch]),
    updateDates: useCallback((startDate: string, endDate: string) => dispatch(updateDates({ startDate, endDate })), [dispatch]),
    resetCurrentWorkshop: useCallback(() => dispatch(resetCurrentWorkshop()), [dispatch]),
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
    clearSuccess: useCallback(() => dispatch(clearSuccess()), [dispatch]),
    fetchWorkshops: useCallback(() => dispatch(fetchWorkshops()), [dispatch]),
    fetchWorkshopById: useCallback((id: string) => dispatch(fetchWorkshopById(id)), [dispatch]),
    updateWorkshop: useCallback((id: string, data: WorkshopData) => dispatch(updateWorkshop({ id, workshopData: data })), [dispatch]),
    deleteWorkshop: useCallback((id: string) => dispatch(deleteWorkshop(id)), [dispatch]),
    updateSubHeroHeading: useCallback((heading: string) => dispatch(updateSubHeroHeading(heading)), [dispatch]),
    updateSkills: useCallback((skills: { skills: string[] }) => dispatch(updateSkills(skills)), [dispatch]),
    updateMentor: useCallback((mentor: WorkshopData['mentor']) => dispatch(updateMentor(mentor)), [dispatch]),
    updateCreator: useCallback((creator: WorkshopData['creators']) => dispatch(updateCreator(creator)), [dispatch]),
    updateCategory: useCallback((category: string) => dispatch(updateCategory(category)), [dispatch]),
    updateThumbnail: useCallback((thumbnail: string) => dispatch(updateThumbnail(thumbnail)), [dispatch]),
  };
}; 