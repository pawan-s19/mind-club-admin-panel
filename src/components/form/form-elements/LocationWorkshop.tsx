import { useState, useEffect, useCallback } from "react";
import { PlusIcon, TrashBinIcon } from "../../../icons";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput.tsx";
import Input from "../input/InputField";
import Label from "../Label";
import TextArea from "../input/TextArea";

interface LocationBlog {
    id: string;
    name: string;
    description: string;
    imageOrVideo: string;
}

// location: {
//     name: String,
//     description: String,
//     locationBlog:[{
//         name: String,
//         description: String,
//         imageOrVideo: {
//             url: String,
//             fileId: { type: String, select: false }
//         }
//     }],
// },

interface LocationWorkshopProps {
    onDataChange: (data: {
        name?: string;
        description?: string;
        locationBlog?: Array<{
            name: string;
            description: string;
            imageOrVideo: { url: string };
            _id: string;
        }>;
    }) => void;
    onFileUpload: (file: File) => Promise<string>;
}

export default function LocationWorkshop({ onDataChange, onFileUpload }: LocationWorkshopProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [locationBlogs, setLocationBlogs] = useState<LocationBlog[]>([
        {
            id: "1",
            name: "",
            description: "",
            imageOrVideo: ""
        }
    ]);

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        onDataChange({ name: value });
    }, [onDataChange]);

    const handleDescriptionChange = useCallback((value: string) => {
        setDescription(value);
        onDataChange({ description: value });
    }, [onDataChange]);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>, blogId: string) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const base64Data = await onFileUpload(file);
                setLocationBlogs(prev => prev.map(blog => 
                    blog.id === blogId 
                        ? {
                            ...blog,
                            imageOrVideo: base64Data
                        }
                        : blog
                ));
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }, [onFileUpload]);

    const handleBlogNameChange = useCallback((blogId: string, name: string) => {
        setLocationBlogs(prev => prev.map(blog => 
            blog.id === blogId 
                ? { ...blog, name }
                : blog
        ));
    }, []);

    const handleBlogDescriptionChange = useCallback((blogId: string, description: string) => {
        setLocationBlogs(prev => prev.map(blog => 
            blog.id === blogId 
                ? { ...blog, description }
                : blog
        ));
    }, []);

    const addLocationBlog = useCallback(() => {
        const newBlog: LocationBlog = {
            id: `blog_${Date.now()}`,
            name: "",
            description: "",
            imageOrVideo: ""
        };
        setLocationBlogs(prev => [...prev, newBlog]);
    }, []);

    const removeLocationBlog = useCallback((blogId: string) => {
        if (locationBlogs.length > 1) {
            setLocationBlogs(prev => prev.filter(blog => blog.id !== blogId));
        }
    }, [locationBlogs.length]);

    // Update parent component when locationBlogs change
    useEffect(() => {
        const blogData = locationBlogs.map(blog => ({
            name: blog.name,
            description: blog.description,
            imageOrVideo: { url: blog.imageOrVideo },
            _id: blog.id
        }));
        onDataChange({ locationBlog: blogData });
    }, [locationBlogs, onDataChange]);

    return (
        <ComponentCard title="Workshop Location (Section 3)">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <TextArea 
                        placeholder="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <Label>Location Blog</Label>
                        <button
                            type="button"
                            onClick={addLocationBlog}
                            className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        >
                            <PlusIcon className="w-4 h-4 text-white fill-current" />
                            Add More Location Blog
                        </button>
                    </div>
                    <div className="space-y-4">
                        {locationBlogs.map((blog, index) => (
                            <ComponentCard key={blog.id} title={`Location Blog ${index + 1}`}>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label>Name</Label>
                                        {locationBlogs.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeLocationBlog(blog.id)}
                                                className="text-red-500 hover:text-red-700 p-1"
                                            >
                                                <TrashBinIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <Input 
                                        type="text" 
                                        placeholder="Location Blog Name"
                                        value={blog.name}
                                        onChange={(e) => handleBlogNameChange(blog.id, e.target.value)}
                                    />
                                    <div>
                                        <Label>Description</Label>
                                        <TextArea 
                                            placeholder="Location Blog Description"
                                            value={blog.description}
                                            onChange={(value) => handleBlogDescriptionChange(blog.id, value)}
                                        />
                                    </div>
                                    <div>
                                        <Label>Image/Video</Label>
                                        <FileInput 
                                            onChange={(e) => handleFileChange(e, blog.id)} 
                                            className="custom-class" 
                                        />
                                        {blog.imageOrVideo && (
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
