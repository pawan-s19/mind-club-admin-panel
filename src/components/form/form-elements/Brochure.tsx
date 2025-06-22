import { useCallback } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";

interface BrochureProps {
  onDataChange: (data: string) => void;
  onFileUpload: (file: File) => Promise<string>;
}

export default function Brochure({ onDataChange, onFileUpload }: BrochureProps) {
  
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        onDataChange(base64Data);
      } catch (error) {
        console.error('Error uploading brochure:', error);
      }
    }
  }, [onFileUpload, onDataChange]);

  return (
    <ComponentCard title="Brochure">
      <div className="space-y-6">
        <div>
          <div className="relative">
            <FileInput onChange={handleFileChange} className="custom-class" />
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
