import { useState, useEffect } from "react";
import { PlusIcon, TrashBinIcon } from "../../../icons";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput.tsx";
import Input from "../input/InputField";
import Label from "../Label";
import TextArea from "../input/TextArea";
import DatePicker from "../date-picker.tsx";

interface Activity {
    id: string;
        imageOrVideo: string;
        description: string;
}

interface ItineraryDay {
    id: string;
    day: number;
    title: string;
    activities: Activity[];
}

interface WorkshopItineraryProps {
    onDataChange: (data: {
        title: string;
        description: string;
        itineraryDays: Array<{
            day: number;
            title: string;
        activities: Array<{
                imageOrVideo: string;
                description: string;
            }>;
        }>;
    }) => void;
    onDatesChange: (startDate: string, endDate: string) => void;
    onFileUpload: (file: File) => Promise<string>;
}

export default function WorkshopItinerary({ onDataChange, onDatesChange, onFileUpload }: WorkshopItineraryProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [itineraryTitle, setItineraryTitle] = useState<string>('');
    const [itineraryDescription, setItineraryDescription] = useState<string>('');
    const [itineraryDays, setItineraryDays] = useState<ItineraryDay[]>([]);

    // Calculate number of days between start and end date
    const calculateDays = (start: Date, end: Date): number => {
        const timeDiff = end.getTime() - start.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dayDiff + 1; // Include both start and end dates
    };

    // Generate itinerary days based on date range
    const generateItineraryDays = (start: Date, end: Date): ItineraryDay[] => {
        const daysCount = calculateDays(start, end);
        const days: ItineraryDay[] = [];

        for (let i = 1; i <= daysCount; i++) {
            days.push({
                id: `day_${i}`,
                day: i,
                title: "",
                activities: [
                    {
                        id: `activity_${i}_1`,
                            imageOrVideo: "",
                            description: ""
                    }
                ]
            });
        }

        return days;
    };

    // Handle start date change
    const handleStartDateChange = (selectedDates: Date[]) => {
        if (selectedDates.length > 0) {
            const newStartDate = selectedDates[0];
            setStartDate(newStartDate);
            
            if (endDate && newStartDate > endDate) {
                alert("Start date cannot be after end date");
                return;
            }
            
            if (endDate) {
                const newItineraryDays = generateItineraryDays(newStartDate, endDate);
                setItineraryDays(newItineraryDays);
                onDatesChange(newStartDate.toISOString(), endDate.toISOString());
            }
        }
    };

    // Handle end date change
    const handleEndDateChange = (selectedDates: Date[]) => {
        if (selectedDates.length > 0) {
            const newEndDate = selectedDates[0];
            setEndDate(newEndDate);
            
            if (startDate && startDate > newEndDate) {
                alert("Start date cannot be after end date");
                return;
            }
            
            if (startDate) {
                const newItineraryDays = generateItineraryDays(startDate, newEndDate);
                setItineraryDays(newItineraryDays);
                onDatesChange(startDate.toISOString(), newEndDate.toISOString());
            }
        }
    };

    const handleActivityImageChange = async (event: React.ChangeEvent<HTMLInputElement>, dayId: string, activityId: string) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64Data = await onFileUpload(file);
                setItineraryDays(prev => prev.map(day => 
                    day.id === dayId 
                        ? {
                            ...day,
                            activities: day.activities.map(activity =>
                                activity.id === activityId
                                    ? {
                                        ...activity,
                                            imageOrVideo: base64Data
                                    }
                                    : activity
                            )
                        }
                        : day
                ));
            } catch (error) {
                console.error('Error uploading activity image:', error);
            }
        }
    };

    const handleDayChange = (dayId: string, field: keyof ItineraryDay, value: string | number) => {
        setItineraryDays(prev => prev.map(day => 
            day.id === dayId 
                ? { ...day, [field]: value }
                : day
        ));
    };

    const handleActivityChange = (dayId: string, activityId: string, field: keyof Activity, value: string) => {
        setItineraryDays(prev => prev.map(day => 
            day.id === dayId 
                ? {
                    ...day,
                    activities: day.activities.map(activity =>
                        activity.id === activityId
                            ? { ...activity, [field]: value }
                            : activity
                    )
                }
                : day
        ));
    };

    const addActivity = (dayId: string) => {
        const newActivity: Activity = {
            id: `activity_${Date.now()}`,
                imageOrVideo: "",
                description: ""
        };
        setItineraryDays(prev => prev.map(day => 
            day.id === dayId 
                ? {
                    ...day,
                    activities: [...day.activities, newActivity]
                }
                : day
        ));
    };

    const removeActivity = (dayId: string, activityId: string) => {
        setItineraryDays(prev => prev.map(day => 
            day.id === dayId 
                ? {
                    ...day,
                    activities: day.activities.filter(activity => activity.id !== activityId)
                }
                : day
        ));
    };

    // Update parent component when itinerary changes
    useEffect(() => {
        const itineraryData = {
            title: itineraryTitle,
            description: itineraryDescription,
            itineraryDays: itineraryDays.map(day => ({
            day: day.day,
            title: day.title,
            activities: day.activities.map(activity => ({
                    imageOrVideo: activity.imageOrVideo,
                    description: activity.description
                })),
            })),
        };
        onDataChange(itineraryData);
    }, [itineraryDays, itineraryTitle, itineraryDescription, onDataChange]);

    return (
        <ComponentCard title="Workshop Overview (Section 4)">
            <div className="space-y-6">
                {/* Itinerary Title and Description */}
                <div className="space-y-4">
                    <div>
                        <Label>Overview Title</Label>
                        <Input 
                            type="text" 
                            placeholder="Enter Overview title"
                            value={itineraryTitle}
                            onChange={(e) => setItineraryTitle(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <Label>Workshop Overview Description</Label>
                        <TextArea 
                            placeholder="Enter Overview description"
                            value={itineraryDescription}
                            onChange={(value) => setItineraryDescription(value)}
                            rows={3}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <DatePicker
                            id="start-date"
                            mode="single"
                            onChange={handleStartDateChange}
                            defaultDate={startDate || undefined}
                            placeholder="Select start date"
                        />
                    </div>
                    <div>
                        <DatePicker
                            id="end-date"
                            mode="single"
                            onChange={handleEndDateChange}
                            defaultDate={endDate || undefined}
                            placeholder="Select end date"
                        />
                    </div>
                </div>

                {startDate && endDate && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900/20 dark:border-blue-800">
                        <p className="text-blue-800 dark:text-blue-200">
                            <strong>Workshop Duration:</strong> {calculateDays(startDate, endDate)} days 
                            ({startDate.toLocaleDateString()} to {endDate.toLocaleDateString()})
                        </p>
                    </div>
                )}
                
                {itineraryDays.length > 0 && (
                    <div>
                        <Label>Workshop Overview Days ({itineraryDays.length} days)</Label>
                        
                        <div className="space-y-4 mt-4">
                            {itineraryDays.map((day) => (
                                <ComponentCard key={day.id} title={`Day ${day.day}`}>
                                    <div className="space-y-4">
                                        <Input 
                                            type="text" 
                                            placeholder="Day title"
                                            value={day.title}
                                            onChange={(e) => handleDayChange(day.id, 'title', e.target.value)}
                                        />
                                        
                                        <div>
                                            <div className="flex items-center justify-between">
                                                <Label>Activities</Label>
                                                <button
                                                    type="button"
                                                    onClick={() => addActivity(day.id)}
                                                    className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5"
                                                >
                                                    <PlusIcon className="w-3 h-3 text-white fill-current" />
                                                    Add Activity
                                                </button>
                                            </div>
                                            
                                            <div className="space-y-3 mt-3">
                                                {day.activities.map((activity, activityIndex) => (
                                                    <div key={activity.id} className="border rounded-lg p-3">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <Label>Activity {activityIndex + 1}</Label>
                                                            {day.activities.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeActivity(day.id, activity.id)}
                                                                    className="text-red-500 hover:text-red-700 p-1"
                                                                >
                                                                    <TrashBinIcon className="w-3 h-3" />
                                                                </button>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="space-y-3">
                                                            <div>
                                                            <Label>Activity Image/Video</Label>
                                                            <FileInput 
                                                                onChange={(e) => handleActivityImageChange(e, day.id, activity.id)} 
                                                                className="custom-class" 
                                                            />
                                                                {activity.imageOrVideo && (
                                                                <div className="mt-2 text-sm text-green-600">
                                                                    File uploaded successfully
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                            <div>
                                                                <Label>Activity Description</Label>
                                                            <TextArea 
                                                                    placeholder="Activity description"
                                                                    value={activity.description}
                                                                    onChange={(value) => handleActivityChange(day.id, activity.id, 'description', value)}
                                                                    rows={3}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ComponentCard>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ComponentCard>
    );
} 