import { useState, useEffect, useCallback } from "react";
import { PlusIcon, TrashBinIcon } from "../../../icons";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput.tsx";
import Input from "../input/InputField";
import Label from "../Label";

interface WorkshopVisual {
    id: string;
    name: string;
    imageOrVideo: string;
}

interface AboutWorkshopProps {
    onDataChange: (data: {
        title?: string;
        description?: string;
        workshopVisual?: Array<{
            name: string;
            imageOrVideo: { url: string };
        }>;
    }) => void;
    onFileUpload: (file: File) => Promise<string>;
}

export default function AboutWorkshop({ onDataChange, onFileUpload }: AboutWorkshopProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [workshopVisuals, setWorkshopVisuals] = useState<WorkshopVisual[]>([
        {
            id: "1",
            name: "",
            imageOrVideo: ""
        }
    ]);

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);
        onDataChange({ title: value });
    }, [onDataChange]);

    const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDescription(value);
        onDataChange({ description: value });
    }, [onDataChange]);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>, visualId: string) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64Data = await onFileUpload(file);
                setWorkshopVisuals(prev => prev.map(visual => 
                    visual.id === visualId 
                        ? {
                            ...visual,
                            imageOrVideo: base64Data
                        }
                        : visual
                ));
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }, [onFileUpload]);

    const handleVisualNameChange = useCallback((visualId: string, name: string) => {
        setWorkshopVisuals(prev => prev.map(visual => 
            visual.id === visualId 
                ? { ...visual, name }
                : visual
        ));
    }, []);

    const addWorkshopVisual = useCallback(() => {
        const newVisual: WorkshopVisual = {
            id: `visual_${Date.now()}`,
            name: "",
            imageOrVideo: ""
        };
        setWorkshopVisuals(prev => [...prev, newVisual]);
    }, []);

    const removeWorkshopVisual = useCallback((visualId: string) => {
        if (workshopVisuals.length > 1) {
            setWorkshopVisuals(prev => prev.filter(visual => visual.id !== visualId));
        }
    }, [workshopVisuals.length]);

    // Update parent component when workshopVisuals change
    useEffect(() => {
        const visualData = workshopVisuals.map(visual => ({
            name: visual.name,
            imageOrVideo: { url: visual.imageOrVideo }
        }));
        onDataChange({ workshopVisual: visualData });
    }, [workshopVisuals, onDataChange]);

    return (
        <ComponentCard title="About Workshop (Section 2)">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input 
                        type="text" 
                        id="title" 
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input 
                        type="text" 
                        id="description" 
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <Label>Workshop Visuals</Label>
                        <button
                            type="button"
                            onClick={addWorkshopVisual}
                            className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            <PlusIcon className="w-4 h-4 text-white fill-current" />
                            Add More Workshop Visual
                        </button>
                    </div>
                    <div className="space-y-4">
                        {workshopVisuals.map((visual, index) => (
                            <ComponentCard key={visual.id} title={`Workshop Visual ${index + 1}`}>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Name</Label>
                                        {workshopVisuals.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeWorkshopVisual(visual.id)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <TrashBinIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <Input 
                                        type="text" 
                                        placeholder="Workshop Visual Name"
                                        value={visual.name}
                                        onChange={(e) => handleVisualNameChange(visual.id, e.target.value)}
                                    />
                                    <div>
                                        <Label>Image/Video</Label>
                                        <FileInput 
                                            onChange={(e) => handleFileChange(e, visual.id)} 
                                            className="custom-class" 
                                        />
                                        {visual.imageOrVideo && (
                                            <div className="mt-2 text-sm text-green-600">
                                                File uploaded successfully
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ComponentCard>
                        ))}
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}
