import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Input from "../input/InputField";
import Label from "../Label";

interface WorkshopCategoryProps {
  category: string;
  onCategoryChange: (category: string) => void;
}

export default function WorkshopCategory({ category, onCategoryChange }: WorkshopCategoryProps) {
  const [inputCategory, setInputCategory] = useState(category || "");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputCategory(value);
    onCategoryChange(value);
  };

  const handleCustomCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCategory(value);
    onCategoryChange(value);
  };

  // Predefined categories for better UX
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
    "Photography - Landscape",
    "Photography - Portrait",
    "Photography - Street",
    "Photography - Wildlife",
    "Photography - Macro",
    "Painting - Oil",
    "Painting - Watercolor",
    "Painting - Acrylic",
    "Drawing & Sketching",
    "Sculpture",
    "Pottery & Ceramics",
    "Jewelry Making",
    "Woodworking",
    "Metalworking",
    "Textile Arts",
    "Knitting & Crochet",
    "Sewing & Fashion Design",
    "Cooking - Baking",
    "Cooking - International Cuisine",
    "Cooking - Healthy Eating",
    "Wine & Beverage",
    "Coffee & Tea",
    "Gardening",
    "Urban Farming",
    "Beekeeping",
    "Pet Training",
    "Horse Riding",
    "Rock Climbing",
    "Surfing",
    "Skiing & Snowboarding",
    "Dance - Ballet",
    "Dance - Contemporary",
    "Dance - Hip Hop",
    "Dance - Latin",
    "Dance - Ballroom",
    "Yoga - Hatha",
    "Yoga - Vinyasa",
    "Yoga - Ashtanga",
    "Pilates",
    "Martial Arts",
    "Meditation - Vipassana",
    "Meditation - Zen",
    "Meditation - Mindfulness",
    "Reiki & Energy Healing",
    "Aromatherapy",
    "Herbal Medicine",
    "Nutrition",
    "Personal Development",
    "Career Development",
    "Entrepreneurship",
    "Social Media",
    "Content Creation",
    "Podcasting",
    "Vlogging",
    "Live Streaming",
    "E-commerce",
    "Dropshipping",
    "Print on Demand",
    "Affiliate Marketing",
    "SEO & SEM",
    "Email Marketing",
    "Copywriting",
    "Branding",
    "Event Planning",
    "Interior Design",
    "Architecture",
    "Landscape Design",
    "Feng Shui",
    "Astrology",
    "Tarot Reading",
    "Crystal Healing",
    "Sound Healing",
    "Art Therapy",
    "Music Therapy",
    "Drama Therapy",
    "Other"
  ];

  const handlePredefinedCategoryClick = (selectedCategory: string) => {
    if (selectedCategory === "Other") {
      setShowCustomInput(true);
      setInputCategory("Other");
      setCustomCategory("");
      onCategoryChange("");
    } else {
      setShowCustomInput(false);
      setInputCategory(selectedCategory);
      setCustomCategory("");
      onCategoryChange(selectedCategory);
    }
  };

  return (
    <ComponentCard title="Workshop Category">
      <div className="space-y-4">
        <div>
          <Label>Category</Label>
          <Input
            type="text"
            placeholder="Enter workshop category"
            value={inputCategory}
            onChange={handleCategoryChange}
          />
        </div>

        <div>
          <Label>Quick Select Categories</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {predefinedCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handlePredefinedCategoryClick(cat)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  inputCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {showCustomInput && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
            <Label>Custom Category</Label>
            <Input
              type="text"
              placeholder="Enter your custom category"
              value={customCategory}
              onChange={handleCustomCategoryChange}
              className="mt-2"
            />
            <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">
              Please enter your custom workshop category above.
            </p>
          </div>
        )}

        {(inputCategory || customCategory) && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20 dark:border-green-800">
            <p className="text-green-800 dark:text-green-200 text-sm">
              <strong>Selected Category:</strong> {customCategory || inputCategory}
            </p>
          </div>
        )}
      </div>
    </ComponentCard>
  );
} 