import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import { fetchWorkshops } from "../../store/workshopSlice";
import { RootState } from "../../store/rootReducer";
import { AppDispatch } from "../../store/store";

export default function WorkshopTables() {
  const dispatch = useDispatch<AppDispatch>();
  const { workshops, loading, error } = useSelector((state: RootState) => state.workshop);

  useEffect(() => {
    dispatch(fetchWorkshops());
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Workshops data:', workshops);
    console.log('Workshops type:', typeof workshops);
    console.log('Is array:', Array.isArray(workshops));
  }, [workshops]);

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Workshop Tables" />
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            Error: {error}
          </div>
        )}
        <ComponentCard title="Workshop Tables">
          <BasicTableOne workshops={workshops} loading={loading} />
        </ComponentCard>
      </div>
    </>
  );
}
