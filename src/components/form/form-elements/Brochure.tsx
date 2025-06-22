import { useCallback } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { FileIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";
import FileInput from "../input/FileInput";

interface BrochureProps {
  onDataChange: (data: string) => void;
  onFileUpload: (file: File) => Promise<string>;
}

export default function Brochure({ onDataChange, onFileUpload }: BrochureProps) {
  const countries = [
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];
  
  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };
  
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
