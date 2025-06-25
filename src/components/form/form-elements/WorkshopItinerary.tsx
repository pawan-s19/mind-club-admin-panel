import { useState, useEffect } from "react";
import { PlusIcon, TrashBinIcon } from "../../../icons";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput.tsx";
import Input from "../input/InputField";
import Label from "../Label";
import TextArea from "../input/TextArea";
import DatePicker from "../date-picker.tsx";
import CustomTimePicker from "../CustomTimePicker";

interface Activity {
    id: string;
    time: string;
    activity: string;
    image: {
        imageOrVideo: string;
        description: string;
    };
    color: string;
}

interface ItineraryDay {
    id: string;
    day: number;
    itineraryBanner: string;
    title: string;
    description: string;
    activities: Activity[];
}

interface WorkshopItineraryProps {
    onDataChange: (data: Array<{
        day: number;
        itineraryBanner: string;
        title: string;
        description: string;
        activities: Array<{
            time: string;
            activity: string;
            image: {
                imageOrVideo: string;
                description: string;
            };
            color: string;
        }>;
    }>) => void;
    onDatesChange: (startDate: string, endDate: string) => void;
    onFileUpload: (file: File) => Promise<string>;
}

export default function WorkshopItinerary({ onDataChange, onDatesChange, onFileUpload }: WorkshopItineraryProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

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
                itineraryBanner: "",
                title: "",
                description: "",
                activities: [
                    {
                        id: `activity_${i}_1`,
                        time: "",
                        activity: "",
                        image: {
                            imageOrVideo: "",
                            description: ""
                        },
                        color: "#3B82F6"
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
                const newItinerary = generateItineraryDays(newStartDate, endDate);
                setItinerary(newItinerary);
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
                const newItinerary = generateItineraryDays(startDate, newEndDate);
                setItinerary(newItinerary);
                onDatesChange(startDate.toISOString(), newEndDate.toISOString());
            }
        }
    };

    const handleBannerChange = async (event: React.ChangeEvent<HTMLInputElement>, dayId: string) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64Data = await onFileUpload(file);
                setItinerary(prev => prev.map(day => 
                    day.id === dayId 
                        ? {
                            ...day,
                            itineraryBanner: base64Data
                        }
                        : day
                ));
            } catch (error) {
                console.error('Error uploading banner:', error);
            }
        }
    };

    const handleActivityImageChange = async (event: React.ChangeEvent<HTMLInputElement>, dayId: string, activityId: string) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64Data = await onFileUpload(file);
                setItinerary(prev => prev.map(day => 
                    day.id === dayId 
                        ? {
                            ...day,
                            activities: day.activities.map(activity =>
                                activity.id === activityId
                                    ? {
                                        ...activity,
                                        image: {
                                            ...activity.image,
                                            imageOrVideo: base64Data
                                        }
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
        setItinerary(prev => prev.map(day => 
            day.id === dayId 
                ? { ...day, [field]: value }
                : day
        ));
    };

    const handleActivityChange = (dayId: string, activityId: string, field: keyof Activity, value: string) => {
        setItinerary(prev => prev.map(day => 
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

    const handleActivityImageDescriptionChange = (dayId: string, activityId: string, value: string) => {
        setItinerary(prev => prev.map(day => 
            day.id === dayId 
                ? {
                    ...day,
                    activities: day.activities.map(activity =>
                        activity.id === activityId
                            ? {
                                ...activity,
                                image: {
                                    ...activity.image,
                                    description: value
                                }
                            }
                            : activity
                    )
                }
                : day
        ));
    };

    const addActivity = (dayId: string) => {
        const newActivity: Activity = {
            id: `activity_${Date.now()}`,
            time: "",
            activity: "",
            image: {
                imageOrVideo: "",
                description: ""
            },
            color: "#3B82F6"
        };
        setItinerary(prev => prev.map(day => 
            day.id === dayId 
                ? {
                    ...day,
                    activities: [...day.activities, newActivity]
                }
                : day
        ));
    };

    const removeActivity = (dayId: string, activityId: string) => {
        setItinerary(prev => prev.map(day => 
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
        const itineraryData = itinerary.map(day => ({
            day: day.day,
            itineraryBanner: day.itineraryBanner,
            title: day.title,
            description: day.description,
            activities: day.activities.map(activity => ({
                time: activity.time,
                activity: activity.activity,
                image: {
                    imageOrVideo: activity.image.imageOrVideo,
                    description: activity.image.description
                },
                color: activity.color,
            })),
        }));
        onDataChange(itineraryData);
    }, [itinerary, onDataChange]);

    return (
        <ComponentCard title="Workshop Itinerary (Section 4)">
            <div className="space-y-6">
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
                
                {itinerary.length > 0 && (
                    <div>
                        <Label>Itinerary Days ({itinerary.length} days)</Label>
                        
                        <div className="space-y-4 mt-4">
                            {itinerary.map((day) => (
                                <ComponentCard key={day.id} title={`Day ${day.day}`}>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Itinerary Banner</Label>
                                            <FileInput 
                                                onChange={(e) => handleBannerChange(e, day.id)} 
                                                className="custom-class" 
                                            />
                                            {day.itineraryBanner && (
                                                <div className="mt-2 text-sm text-green-600">
                                                    Banner uploaded successfully
                                                </div>
                                            )}
                                        </div>
                                        
                                        <Input 
                                            type="text" 
                                            placeholder="Day title"
                                            value={day.title}
                                            onChange={(e) => handleDayChange(day.id, 'title', e.target.value)}
                                        />
                                        
                                        <TextArea 
                                            placeholder="Day description"
                                            value={day.description}
                                            onChange={(value) => handleDayChange(day.id, 'description', value)}
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
                                                        
                                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                            <div>
                                                                <Label>Time</Label>
                                                                <CustomTimePicker
                                                                    value={activity.time}
                                                                    onChange={(value) => handleActivityChange(day.id, activity.id, 'time', value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mt-3">
                                                            <Input 
                                                                type="text" 
                                                                placeholder="Activity description"
                                                                value={activity.activity}
                                                                onChange={(e) => handleActivityChange(day.id, activity.id, 'activity', e.target.value)}
                                                            />
                                                            </div>
                                                        
                                                        <div className="mt-3">
                                                            <Label>Activity Image/Video</Label>
                                                            <FileInput 
                                                                onChange={(e) => handleActivityImageChange(e, day.id, activity.id)} 
                                                                className="custom-class" 
                                                            />
                                                            {activity.image.imageOrVideo && (
                                                                <div className="mt-2 text-sm text-green-600">
                                                                    File uploaded successfully
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="mt-3">
                                                            <Label>Image Description</Label>
                                                            <TextArea 
                                                                placeholder="Image description"
                                                                value={activity.image.description}
                                                                onChange={(value) => handleActivityImageDescriptionChange(day.id, activity.id, value)}
                                                            />
                                                        </div>
                                                        
                                                        <div className="mt-3">
                                                            <Label>Color</Label>
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="color"
                                                                    value={activity.color}
                                                                    onChange={(e) => handleActivityChange(day.id, activity.id, 'color', e.target.value)}
                                                                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
                                                                    title="Choose activity color"
                                                                />
                                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {activity.color}
                                                                </span>
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