import { useState, useRef, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import Label from "../Label";

interface Creator {
    name: string;
    description: string;
    imageOrVideo: { url: string }[];
}

interface WorkshopCreatorSectionProps {
    creator: Creator;
    onCreatorChange: (creator: Creator) => void;
    onFileUpload: (file: File) => Promise<string>;
}

export default function WorkshopCreatorSection({
    creator,
    onCreatorChange,
    onFileUpload,
}: WorkshopCreatorSectionProps) {
    // Provide default values to prevent runtime errors
    const safeCreator = creator && Array.isArray(creator.imageOrVideo)
        ? creator
        : { name: '', description: '', imageOrVideo: [] };
    const safeOnCreatorChange = typeof onCreatorChange === 'function'
        ? onCreatorChange
        : () => { };

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Ensure at least one input in Redux state
    useEffect(() => {
        if (!creator.imageOrVideo || creator.imageOrVideo.length === 0) {
            onCreatorChange({ ...creator, imageOrVideo: [{ url: '' }] });
        }
    }, [creator, onCreatorChange]);

    // Utility to convert file to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    // Handle file change for a specific input
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                const updated = safeCreator.imageOrVideo.map((item, i) =>
                    i === idx ? { url: base64 } : item
                );
                safeOnCreatorChange({
                    ...safeCreator,
                    imageOrVideo: updated,
                });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    // Add a new empty file input
    const handleAddMore = () => {
        safeOnCreatorChange({
            ...safeCreator,
            imageOrVideo: [...safeCreator.imageOrVideo, { url: '' }],
        });
    };

    // Remove a file input
    const handleRemoveFile = (idx: number) => {
        const newFiles = safeCreator.imageOrVideo.filter((_, i) => i !== idx);
        safeOnCreatorChange({ ...safeCreator, imageOrVideo: newFiles });
    };

    return (
        <ComponentCard title="Workshop Creator (Section 7)">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="creator-name">Name</Label>
                    <Input
                        type="text"
                        id="creator-name"
                        value={safeCreator.name}
                        onChange={e => safeOnCreatorChange({ ...safeCreator, name: e.target.value })}
                    />
                </div>
                <div>
                    <Label htmlFor="creator-description">Description</Label>
                    <TextArea
                        id="creator-description"
                        placeholder="Description"
                        value={safeCreator.description}
                        onChange={value => safeOnCreatorChange({ ...safeCreator, description: value })}
                    />
                </div>
                <div>
                    <Label>Image/Video</Label>
                    <div className="flex flex-col gap-2 mt-2">
                        {safeCreator.imageOrVideo.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <FileInput
                                    onChange={e => handleFileChange(e, idx)}
                                    className="custom-class"
                                />
                                {file.url && (
                                    <span className="text-green-600 text-xs">Selected</span>
                                )}
                                {safeCreator.imageOrVideo.length > 1 && (
                                    <button
                                        type="button"
                                        className="ml-2 text-blue-500 hover:text-red-500 focus:outline-none"
                                        onClick={() => handleRemoveFile(idx)}
                                        aria-label={`Remove file`}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddMore}
                            className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 mt-2"
                        >
                            Add More Image/Video
                        </button>
                    </div>
                </div>
            </div>
        </ComponentCard>
    );
}
