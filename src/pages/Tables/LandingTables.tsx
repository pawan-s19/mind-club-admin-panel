import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanding } from '../../hooks/useLanding';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import Button from '../../components/ui/button/Button';

export default function LandingTables() {
  const { fetchLanding, currentLanding, loading, error } = useLanding();
  const [landingPages, setLandingPages] = useState<any[]>([]);

  useEffect(() => {
    const loadLandingPages = async () => {
      try {
        // Only fetch if we don't already have data
        if (!currentLanding._id) {
          await fetchLanding();
        }
      } catch (error) {
        console.error('Error loading landing pages:', error);
      }
    };

    loadLandingPages();
  }, []); // Empty dependency array to run only once

  // Update landingPages when currentLanding changes
  useEffect(() => {
    if (currentLanding && currentLanding._id) {
      setLandingPages([currentLanding]);
    }
  }, [currentLanding]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Loading landing pages...</div>
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

  return (
    <>
      <PageMeta
        title="Landing Pages | Mind Club Admin"
        description="Manage your landing pages"
      />
      <PageBreadcrumb pageTitle="Landing Pages" />
      
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Landing Pages
          </h3>
          <Link to="/landing-management">
            <Button size="sm" variant="primary">
              Create New Landing Page
            </Button>
          </Link>
        </div>

        {landingPages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No landing pages found. Create your first landing page to get started.
            </p>
            <Link to="/landing-management">
              <Button variant="primary">
                Create Landing Page
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Headline
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Agency Title
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Last Updated
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {landingPages.map((landing) => (
                  <tr key={landing._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {landing.hero?.headline || 'No headline'}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {landing.agencySection?.title || 'No title'}
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {landing.lastUpdated ? new Date(landing.lastUpdated).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link to={`/landing/${landing._id}`}>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        
      </div>
    </>
  );
} 