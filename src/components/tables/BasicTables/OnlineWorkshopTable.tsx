import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteOnlineWorkshop, OnlineWorkshopData } from "../../../store/onlineWorkshopSlice";
import { useDispatch } from "react-redux";

interface OnlineWorkshopTableProps {
  onlineWorkshops: OnlineWorkshopData[];
  loading: boolean;
}

const OnlineWorkshopTable: React.FC<OnlineWorkshopTableProps> = ({
  onlineWorkshops,
  loading,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-sm text-gray-600">
          Loading online workshops...
        </span>
      </div>
    );
  }

  if (!onlineWorkshops || onlineWorkshops.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No online workshops found.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  const formatPrice = (amount: number, currency: string = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Helper function to get projects count
  const getProjectsCount = (workshop: OnlineWorkshopData) => {
    if (workshop.projects) {
      if (Array.isArray(workshop.projects)) {
        return workshop.projects.length;
      } else if (workshop.projects.items) {
        return workshop.projects.items.length;
      }
    }
    return 0;
  };

  // Helper function to get mentors count
  const getMentorsCount = (workshop: OnlineWorkshopData) => {
    if (workshop.aboutMentors?.mentors) {
      return workshop.aboutMentors.mentors.length;
    } else if (workshop.mentors) {
      return workshop.mentors.length;
    }
    return 0;
  };

  console.log(onlineWorkshops, "online workshops");

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Workshop Title
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Price
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Duration
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Spots
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Start Date
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                End Date
              </th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                View
              </th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {onlineWorkshops.map((workshop, index) => (
              <tr key={workshop._id || index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <div className="flex items-center space-x-3">
                    {workshop.workshopHeader.thumbnail?.url && (
                      <div className="flex-shrink-0">
                        <img
                          src={workshop.workshopHeader.thumbnail.url}
                          alt={workshop.workshopHeader.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h5 className="font-medium text-black dark:text-white">
                        {workshop.workshopHeader.title || "Untitled Workshop"}
                      </h5>
                      {workshop.workshopHeader.subtitle && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {workshop.workshopHeader.subtitle}
                        </p>
                      )}
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {getProjectsCount(workshop)} Projects
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {getMentorsCount(workshop)} Mentors
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="text-black dark:text-white">
                    {formatPrice(
                      workshop.price.amount,
                      workshop.price.currency
                    )}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="text-black dark:text-white">
                    {workshop.workshopHighlights.duration || "N/A"}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="text-black dark:text-white">
                    {workshop.workshopHighlights.spots || "N/A"}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="text-black dark:text-white">
                    {formatDate(workshop.workshopHeader.startDate)}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span className="text-black dark:text-white">
                    {formatDate(workshop.workshopHeader.endDate)}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button
                    onClick={() => navigate(`/online-workshop/${workshop._id}`)}
                    className="hover:text-primary"
                    title="View Details"
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.17812 8.99981 3.17812C14.5686 3.17812 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 9.00062C2.4748 10.4719 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.4719 16.1436 9.00062C15.5248 7.52812 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.52812 1.85605 9.00062Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button
                    onClick={() => {console.log('hello'); dispatch(deleteOnlineWorkshop(workshop._id))}}
                    className="hover:text-primary"
                    title="View Details"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="red"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnlineWorkshopTable;
