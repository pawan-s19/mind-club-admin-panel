import { useEffect, useRef, useState } from "react";

interface CustomTimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

// Function to generate time options
const generateTimeOptions = (interval: number) => {
  const options = [];
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  for (let i = 0; i < 24 * 60; i += interval) {
    const time = new Date(startTime.getTime() + i * 60000);
    let hour = time.getHours() % 12 || 12; // Convert to 12-hour format
    const minute = time.getMinutes().toString().padStart(2, "0");
    const period = time.getHours() < 12 ? "AM" : "PM";
    options.push({ hour: hour.toString().padStart(2, "0"), minute, period });
  }
  return options;
};

export default function CustomTimePicker({ 
  value, 
  onChange, 
  label, 
  placeholder = "Select a time",
  className = "" 
}: CustomTimePickerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timepickerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);
  const [times] = useState(generateTimeOptions(15));

  // Parse initial value to display format
  const formatDisplayValue = (timeValue: string) => {
    if (!timeValue) return "";
    const [hours, minutes] = timeValue.split(':').map(Number);
    const hour = hours % 12 || 12;
    const minute = minutes.toString().padStart(2, "0");
    const period = hours < 12 ? "AM" : "PM";
    return `${hour.toString().padStart(2, "0")} ${minute} ${period}`;
  };

  const displayValue = formatDisplayValue(value);

  // Toggle timepicker visibility
  const toggleTimepickerVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Handle time selection
  const handleTimeSelection = (hour: string, minute: string, period: string) => {
    let hours = parseInt(hour);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    
    const timeString = `${hours.toString().padStart(2, "0")}:${minute}`;
    onChange(timeString);
    setIsVisible(false);
  };

  // Close timepicker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        timepickerRef.current &&
        !timepickerRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`}>
      <style>
        {`
          /* Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>

      {label && (
        <label className="mb-2 sm:mb-[10px] block text-sm sm:text-base font-medium text-dark dark:text-white">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Timepicker Input with Icons */}
        <div className="relative flex items-center">
          {/* Clock Icon */}
          <span className="absolute left-0 pl-3 sm:pl-5 text-dark-5 z-10">
            <svg
              className="fill-current w-4 h-4 sm:w-5 sm:h-5"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3185_947)">
                <path
                  d="M10.4687 10.3125V5.28125C10.4687 4.90625 10.1562 4.59375 9.78125 4.59375C9.40625 4.59375 9.09375 4.90625 9.09375 5.28125V10.5937C9.09375 10.7812 9.15625 10.9687 9.28125 11.0937L12.75 14.625C12.875 14.75 13.0625 14.8437 13.25 14.8437C13.4375 14.8437 13.5937 14.7812 13.75 14.6562C14.0312 14.375 14.0312 13.9375 13.75 13.6562L10.4687 10.3125Z"
                  fill=""
                />
                <path
                  d="M10 0.46875C4.78125 0.46875 0.5625 4.75 0.5625 10C0.5625 15.25 4.8125 19.5312 10 19.5312C15.1875 19.5312 19.4375 15.25 19.4375 10C19.4375 4.75 15.2188 0.46875 10 0.46875ZM10 18.125C5.5625 18.125 1.9375 14.4688 1.9375 10C1.9375 5.53125 5.5625 1.875 10 1.875C14.4375 1.875 18.0625 5.53125 18.0625 10C18.0625 14.4688 14.4375 18.125 10 18.125Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_3185_947">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>

          <input
            type="text"
            className="w-full rounded-lg border border-stroke bg-transparent py-2 sm:py-2.5 pl-10 sm:pl-[50px] pr-8 text-sm sm:text-base text-dark-2 outline-none transition focus:border-primary dark:border-dark-3 dark:text-dark-6 dark:focus:border-primary"
            placeholder={placeholder}
            readOnly
            value={displayValue}
            onClick={toggleTimepickerVisibility}
          />
          <span
            className="absolute right-0 cursor-pointer pr-3 sm:pr-4 text-dark-5 z-10"
            ref={toggleRef}
          >
            {/* Arrow Down Icon */}
            <svg
              className="fill-current stroke-current w-3 h-3 sm:w-4 sm:h-4"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29635 5.15354L2.29632 5.15357L2.30055 5.1577L7.65055 10.3827L8.00157 10.7255L8.35095 10.381L13.701 5.10603L13.701 5.10604L13.7035 5.10354C13.722 5.08499 13.7385 5.08124 13.7499 5.08124C13.7613 5.08124 13.7778 5.08499 13.7963 5.10354C13.8149 5.12209 13.8187 5.13859 13.8187 5.14999C13.8187 5.1612 13.815 5.17734 13.7973 5.19552L8.04946 10.8433L8.04945 10.8433L8.04635 10.8464C8.01594 10.8768 7.99586 10.8921 7.98509 10.8992C7.97746 10.8983 7.97257 10.8968 7.96852 10.8952C7.96226 10.8929 7.94944 10.887 7.92872 10.8721L2.20253 5.2455C2.18478 5.22733 2.18115 5.2112 2.18115 5.19999C2.18115 5.18859 2.18491 5.17209 2.20346 5.15354C2.222 5.13499 2.2385 5.13124 2.2499 5.13124C2.2613 5.13124 2.2778 5.13499 2.29635 5.15354Z"
                fill=""
                stroke=""
              />
            </svg>
          </span>
        </div>

        {/* Timepicker Container */}
        {isVisible && (
          <div
            ref={timepickerRef}
            className="shadow-datepicker no-scrollbar absolute right-0 mt-2 h-48 sm:h-[262px] w-full sm:w-[162px] max-w-[280px] sm:max-w-none overflow-hidden overflow-y-auto rounded-md border border-stroke bg-white p-2 dark:border-dark-3 dark:bg-dark-2 z-50"
          >
            {times.map((time, index) => {
              const timeString = `${time.hour} ${time.minute} ${time.period}`;
              const isSelected = timeString === displayValue;
              return (
                <div
                  key={index}
                  className={`time-option flex cursor-pointer justify-between gap-1 rounded-md transition hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    isSelected ? "selected-time" : ""
                  }`}
                  onClick={() =>
                    handleTimeSelection(
                      time.hour,
                      time.minute,
                      time.period,
                    )
                  }
                >
                  <div
                    className={`hour flex h-10 sm:h-[46px] w-full max-w-[60px] sm:max-w-[46px] items-center justify-center rounded-md text-xs sm:text-sm font-medium ${
                      isSelected
                        ? "bg-blue-light-5 text-primary"
                        : "text-dark-3 dark:text-dark-6"
                    }`}
                  >
                    {time.hour}
                  </div>
                  <div
                    className={`minute flex h-10 sm:h-[46px] w-full max-w-[60px] sm:max-w-[46px] items-center justify-center rounded-md text-xs sm:text-sm font-medium ${
                      isSelected
                        ? "bg-blue-light-5 text-primary"
                        : "text-dark-3 dark:text-dark-6"
                    }`}
                  >
                    {time.minute}
                  </div>
                  <div
                    className={`period flex h-10 sm:h-[46px] w-full max-w-[60px] sm:max-w-[46px] items-center justify-center rounded-md text-xs sm:text-sm font-medium ${
                      isSelected
                        ? "bg-blue-light-5 text-primary"
                        : "text-dark-3 dark:text-dark-6"
                    }`}
                  >
                    {time.period}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 