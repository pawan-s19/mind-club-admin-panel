import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/rootReducer";
import { fetchWorkshopById, deleteWorkshop } from "../store/workshopSlice";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/WorkshopHeaderCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";
import WorkshopHeaderCard from "../components/UserProfile/WorkshopHeaderCard";
import WorkshopBrochureCard from "../components/UserProfile/WorkshopBrochureCard";
import WorkshopaboutCard from "../components/UserProfile/WorkshopAboutCard";
import WorkshopLocationCard from "../components/UserProfile/WorkshopLocationCard";
import WorkshopSkillsCard from "../components/UserProfile/WorkshopSkillsCard";
import WorkshopCreator from "../components/UserProfile/WorkshopCreator";
import WorkshopMentor from "../components/form/form-elements/WorkshopMentor";
import WorkshopMentorCard from "../components/UserProfile/WorkshopMentorCard";
import Button from "../components/ui/button/Button";
import { useNavigate } from "react-router-dom";

export default function WorkshopPage() {
  const { id } = useParams<{ id: string }>();
  console.log(id)
  const dispatch = useDispatch<AppDispatch>();
  const { currentWorkshop, loading, error } = useSelector((state: RootState) => state.workshop);
  const navigate = useNavigate();
  
  console.log(currentWorkshop, "currentWorkshop")
  
  useEffect(() => {
    if (id) {
      dispatch(fetchWorkshopById(id));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await dispatch(deleteWorkshop(id)).unwrap();
      navigate("/workshop-tables"); // Change to your workshops list route
    } catch (err) {
      alert("Failed to delete workshop");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Loading workshop...</div>
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

  if (!currentWorkshop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 dark:text-gray-400">Workshop not found</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex items-center justify-between mb-5 lg:mb-7">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Workshop Data
          </h3>
          <Button size="sm" variant="outline" onClick={handleDelete} disabled={loading}>
            Delete
          </Button>
        </div>
        
        <div className="space-y-6">
          <WorkshopHeaderCard header={currentWorkshop?.data?.header} workshopId={id} />
          <WorkshopBrochureCard  brochure={currentWorkshop?.data?.brochure} workshopId={id} />
          <WorkshopaboutCard  about={currentWorkshop?.data?.about} workshopId={id} />
          <WorkshopLocationCard location={currentWorkshop?.data?.location} workshopId={id} />
          <WorkshopSkillsCard skills={currentWorkshop?.data?.skills} workshopId={id} />
          <WorkshopCreator creator={currentWorkshop?.data?.creators} workshopId={id} />
          <WorkshopMentorCard mentor={currentWorkshop?.data?.mentor} workshopId={id} />
          {/* <UserInfoCard /> */}
          {/* <UserAddressCard /> */}
        </div>

        {JSON.stringify(  currentWorkshop?.data?.Brochere)}
      </div>
    </>
  );
}
