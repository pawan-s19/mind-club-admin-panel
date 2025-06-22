import { useState, useRef, useEffect } from "react";
import Label from "./Label";

interface TimePickerProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function TimePicker({ 
  value, 
  onChange, 
  label, 
  placeholder = "Select time",
  className = "" 
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [isAM, setIsAM] = useState(true);
  const [isHourMode, setIsHourMode] = useState(true);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Parse initial value
  useEffect(() => {
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      setSelectedHour(hours === 0 ? 12 : hours > 12 ? hours - 12 : hours);
      setSelectedMinute(minutes);
      setIsAM(hours < 12);
    }
  }, [value]);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsHourMode(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTimeSelect = () => {
    let hours = selectedHour;
    if (!isAM && hours !== 12) hours += 12;
    if (isAM && hours === 12) hours = 0;
    
    const timeString = `${hours.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    onChange(timeString);
    setIsOpen(false);
    setIsHourMode(true);
  };

  const handleHourClick = (hour: number) => {
    setSelectedHour(hour);
    setIsHourMode(false);
  };

  const handleMinuteClick = (minute: number) => {
    setSelectedMinute(minute);
    setIsHourMode(true);
  };

  const formatDisplayTime = () => {
    if (!value) return "";
    const [hours, minutes] = value.split(':').map(Number);
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const ampm = hours < 12 ? 'AM' : 'PM';
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  const generateClockNumbers = (isHour: boolean) => {
    const numbers = [];
    const max = isHour ? 12 : 60;
    const step = isHour ? 1 : 5;
    
    for (let i = 0; i < max; i += step) {
      const number = isHour ? (i === 0 ? 12 : i) : i;
      const angle = (i * 360) / max - 90; // Start from 12 o'clock
      const radius = 60;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;
      
      const isSelected = isHour ? selectedHour === number : selectedMinute === number;
      
      numbers.push(
        <button
          key={i}
          className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
            isSelected
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
          }`}
          style={{
            left: `calc(50% + ${x}px - 16px)`,
            top: `calc(50% + ${y}px - 16px)`,
          }}
          onClick={() => isHour ? handleHourClick(number) : handleMinuteClick(number)}
        >
          {number}
        </button>
      );
    }
    return numbers;
  };

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {label && <Label>{label}</Label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800 text-left"
      >
        {formatDisplayTime() || placeholder}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[280px]">
          {/* Clock Display */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Clock Circle */}
            <div className="w-full h-full rounded-full border-2 border-gray-300 dark:border-gray-600 relative">
              {/* Clock Numbers */}
              {generateClockNumbers(isHourMode)}
              
              {/* Clock Hands */}
              <div className="absolute top-1/2 left-1/2 w-1 h-12 bg-gray-800 dark:bg-gray-200 origin-bottom transform -translate-x-1/2 -translate-y-full"
                   style={{
                     transform: `translate(-50%, -100%) rotate(${
                       isHourMode 
                         ? (selectedHour * 360) / 12 - 90
                         : (selectedMinute * 360) / 60 - 90
                     }deg)`
                   }}
              />
              <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-blue-600 origin-bottom transform -translate-x-1/2 -translate-y-full"
                   style={{
                     transform: `translate(-50%, -100%) rotate(${
                       isHourMode 
                         ? (selectedHour * 360) / 12 - 90
                         : (selectedMinute * 360) / 60 - 90
                     }deg)`
                   }}
              />
              <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center mb-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                type="button"
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  isHourMode
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setIsHourMode(true)}
              >
                Hour
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  !isHourMode
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setIsHourMode(false)}
              >
                Minute
              </button>
            </div>
          </div>

          {/* AM/PM Toggle */}
          <div className="flex justify-center mb-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                type="button"
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  isAM
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setIsAM(true)}
              >
                AM
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  !isAM
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
                onClick={() => setIsAM(false)}
              >
                PM
              </button>
            </div>
          </div>

          {/* Selected Time Display */}
          <div className="text-center mb-4">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedHour}:{selectedMinute.toString().padStart(2, '0')} {isAM ? 'AM' : 'PM'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsHourMode(true);
              }}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleTimeSelect}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 