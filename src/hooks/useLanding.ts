import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  clearError,
  clearSuccess,
  createLanding,
  fetchLanding,
  fetchLandingById,
  updateLanding,
  resetCurrentLanding,
  updateHero,
  updateAgencySection,
  updateFooter,
  updateFooterLinks,
  updateFooterSocialLinks,
  LandingData
} from "../store/landingSlice";

export const useLanding = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentLanding, loading, error, success } = useSelector(
    (state: any) => state.landing
  );

  return {
    // State
    currentLanding,
    loading,
    error,
    success,
    
    // Actions - wrapped in useCallback to prevent infinite loops
    createLanding: useCallback((data: LandingData) => dispatch(createLanding(data)), [dispatch]),
    fetchLanding: useCallback(() => dispatch(fetchLanding()), [dispatch]),
    fetchLandingById: useCallback((id: string) => dispatch(fetchLandingById(id)), [dispatch]),
    updateLanding: useCallback((data: LandingData, id?: string) => dispatch(updateLanding({ landingData: data, id })), [dispatch]),
    updateHero: useCallback((data: Partial<LandingData['hero']>) => dispatch(updateHero(data)), [dispatch]),
    updateAgencySection: useCallback((data: Partial<LandingData['agencySection']>) => dispatch(updateAgencySection(data)), [dispatch]),
    updateFooter: useCallback((data: Partial<LandingData['footer']>) => dispatch(updateFooter(data)), [dispatch]),
    updateFooterLinks: useCallback((data: LandingData['footer']['links']) => dispatch(updateFooterLinks(data)), [dispatch]),
    updateFooterSocialLinks: useCallback((data: LandingData['footer']['socialLinks']) => dispatch(updateFooterSocialLinks(data)), [dispatch]),
    resetCurrentLanding: useCallback(() => dispatch(resetCurrentLanding()), [dispatch]),
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
    clearSuccess: useCallback(() => dispatch(clearSuccess()), [dispatch]),
  };
}; 