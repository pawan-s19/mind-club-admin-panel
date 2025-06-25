import { useCallback, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput.tsx";
import Input from "../input/InputField";
import Label from "../Label";

interface WorkshopHeaderProps {
  onDataChange: (data: {
    title?: string;
    description?: string;
    image?: string;
    watchTrailer?: string;
  }) => void;
  onFileUpload: (file: File) => Promise<string>;
}

export default function WorkshopHeader({ onDataChange, onFileUpload }: WorkshopHeaderProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<string>('');
  const [trailerFile, setTrailerFile] = useState<string>('');

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

  const handleImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        setImageFile(base64Data);
        onDataChange({ image: base64Data });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }, [onFileUpload, onDataChange]);

  const handleTrailerChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        setTrailerFile(base64Data);
        onDataChange({ watchTrailer: base64Data });
      } catch (error) {
        console.error('Error uploading trailer:', error);
      }
    }
  }, [onFileUpload, onDataChange]);

  return (
    <ComponentCard title="Workshop Header (Section 1)">
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
        {/* <div>
          <Label>Select Input</Label>
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div> */}
        <div>
          <Label>Image</Label>
          <FileInput onChange={handleImageChange} className="custom-class" />
          {imageFile && (
            <div className="mt-2 text-sm text-green-600">
              Image uploaded successfully
            </div>
          )}
        </div>
        <div>
          <Label>Watch Trailer</Label>
          <div className="relative">
            <FileInput onChange={handleTrailerChange} className="custom-class" />
          </div>
          {trailerFile && (
            <div className="mt-2 text-sm text-green-600">
              Trailer uploaded successfully
            </div>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
