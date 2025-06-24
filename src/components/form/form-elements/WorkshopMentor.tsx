import { useCallback, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Input from "../input/InputField";
import Label from "../Label";

interface MentorImage {
  url: string;
  fileId?: string;
}

export interface MentorData {
  name: string;
  description: string;
  mentorName: string;
  about: string;
  mentorImage: MentorImage;
}

interface WorkshopMentorProps {
  mentor: MentorData;
  onMentorChange: (mentor: MentorData) => void;
  onFileUpload: (file: File) => Promise<string>;
}

export default function WorkshopMentor({ mentor, onMentorChange, onFileUpload }: WorkshopMentorProps) {
  const [mentorImage, setMentorImage] = useState<string>(mentor.mentorImage?.url || "");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      onMentorChange({ ...mentor, [name]: value });
    },
    [mentor, onMentorChange]
  );

  const handleImageChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        try {
          const base64Data = await onFileUpload(file);
          setMentorImage(base64Data);
          onMentorChange({
            ...mentor,
            mentorImage: { url: base64Data },
          });
        } catch (error) {
          console.error("Error uploading mentor image:", error);
        }
      }
    },
    [onFileUpload, onMentorChange, mentor]
  );

  return (
    <ComponentCard title="Workshop Mentor (Section 8)">
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={mentor.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={mentor.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="mentorName">Mentor Name</Label>
          <Input
            type="text"
            id="mentorName"
            name="mentorName"
            value={mentor.mentorName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="about">About</Label>
          <textarea
            id="about"
            name="about"
            className="w-full border rounded px-3 py-2"
            value={mentor.about}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Mentor Image</Label>
          <FileInput onChange={handleImageChange} className="custom-class" />
          {mentorImage && (
            <div className="mt-2 text-sm text-green-600">Image uploaded successfully</div>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
