import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateWorkshop } from "../../store/workshopSlice";
import { AppDispatch } from "../../store/store";
import Badge from "../ui/badge/Badge";

interface WorkshopCategoryCardProps {
  category: string;
  workshopId: string;
}

export default function WorkshopCategoryCard({ category, workshopId }: WorkshopCategoryCardProps) {
  const { isOpen, openModal, closeModal } = useModal();

  // State for form fields
  const [form, setForm] = useState({
    category: category || "",
  });

  const dispatch = useDispatch<AppDispatch>();

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Predefined categories for quick selection
  const predefinedCategories = [
    "Photography",
    "Art & Design",
    "Technology",
    "Business",
    "Health & Wellness",
    "Cooking",
    "Music",
    "Writing",
    "Sports",
    "Science",
    "Education",
    "Language Learning",
    "Crafts & DIY",
    "Fashion & Style",
    "Beauty & Makeup",
    "Fitness & Yoga",
    "Meditation & Mindfulness",
    "Finance & Investment",
    "Marketing & Sales",
    "Leadership & Management",
    "Public Speaking",
    "Creative Writing",
    "Digital Marketing",
    "Web Development",
    "Mobile App Development",
    "Data Science",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "Blockchain & Crypto",
    "Graphic Design",
    "UI/UX Design",
    "Video Production",
    "Animation",
    "3D Modeling",
    "Game Development",
    "Other"
  ];

  const handleCategorySelect = (selectedCategory: string) => {
    setForm({ category: selectedCategory });
  };

  // Save handler
  const handleSave = async () => {
    try {
      await dispatch(updateWorkshop({
        id: workshopId,
        workshopData: { category: form.category },
      })).unwrap();
      closeModal();
    } catch (err) {
      alert("Failed to update workshop");
    }
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
          Workshop Category
        </h4>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="order-3 xl:order-2">
              {category ? (
                <Badge size="md">
                  {category}
                </Badge>
              ) : (
                <span className="text-gray-500 dark:text-gray-400 text-sm">No category set</span>
              )}
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
        <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Workshop Category
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your workshop category.
            </p>
          </div>
          <div className="flex flex-col">
            <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Workshop Category
                </h5>

                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Custom Category</Label>
                    <Input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="Enter custom category"
                    />
                  </div>

                  <div>
                    <Label>Quick Select Categories</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {predefinedCategories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategorySelect(cat)}
                          className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                            form.category === cat
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.category && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
                      <p className="text-green-800 dark:text-green-200 text-sm">
                        <strong>Selected Category:</strong> {form.category}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
} 