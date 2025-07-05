import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import OnlineWorkshopTable from "../../components/tables/BasicTables/OnlineWorkshopTable";
import { fetchOnlineWorkshops } from "../../store/onlineWorkshopSlice";
import { RootState } from "../../store/rootReducer";
import { AppDispatch } from "../../store/store";

export default function OnlineWorkshopTables() {
  const dispatch = useDispatch<AppDispatch>();
  const { onlineWorkshops, loading, error } = useSelector((state: RootState) => state.onlineWorkshop);

  useEffect(() => {
    dispatch(fetchOnlineWorkshops());
  }, [dispatch]);

  // Debug logging
  useEffect(() => {
    console.log('Online Workshops data:', onlineWorkshops);
    console.log('Online Workshops type:', typeof onlineWorkshops);
    console.log('Is array:', Array.isArray(onlineWorkshops));
  }, [onlineWorkshops]);

  return (
    <>
      <PageMeta
        title="Online Workshop Tables | Mind Club Admin Panel"
        description="View and manage all online workshops in the Mind Club Admin Panel"
      />
      <PageBreadcrumb pageTitle="Online Workshop Tables" />
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            Error: {error}
          </div>
        )}
        <ComponentCard title="Online Workshop Tables">
          <OnlineWorkshopTable onlineWorkshops={onlineWorkshops} loading={loading} />
        </ComponentCard>
      </div>
    </>
  );
} 