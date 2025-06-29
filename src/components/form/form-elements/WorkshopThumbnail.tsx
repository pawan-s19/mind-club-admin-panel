import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";

interface WorkshopThumbnailProps {
  thumbnail: string;
  onThumbnailChange: (thumbnail: string) => void;
  onFileUpload: (file: File) => Promise<string>;
}

export default function WorkshopThumbnail({ 
  thumbnail, 
  onThumbnailChange, 
  onFileUpload 
}: WorkshopThumbnailProps) {
  const [thumbnailFile, setThumbnailFile] = useState<string>(thumbnail || "");

  const handleThumbnailChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        setThumbnailFile(base64Data);
        onThumbnailChange(base64Data);
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
      }
    }
  };

  return (
    <ComponentCard title="Workshop Thumbnail">
      <div className="space-y-4">
        <div>
          <Label>Workshop Thumbnail</Label>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Upload a thumbnail image for your workshop. This will be used in listings and previews.
          </p>
          <FileInput 
            onChange={handleThumbnailChange} 
            className="custom-class" 
          />
        </div>

        {thumbnailFile && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="relative">
              <img
                src={thumbnailFile}
                alt="Workshop thumbnail"
                className="w-full max-w-xs h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              />
              <div className="mt-2 text-sm text-green-600">
                Thumbnail uploaded successfully
              </div>
            </div>
          </div>
        )}

        {!thumbnailFile && (
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center dark:border-gray-600">
            <p className="text-gray-500 dark:text-gray-400">
              No thumbnail uploaded yet. Upload an image to see a preview.
            </p>
          </div>
        )}
      </div>
    </ComponentCard>
  );
} 