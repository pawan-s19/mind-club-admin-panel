import React, { useEffect, useState } from 'react';
import Label from '../Label';
import Input from '../input/InputField';
import TextArea from '../input/TextArea';

interface LandingAgencySectionProps {
  agencySection: {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    imageOrVideo: string;
  };
  onAgencySectionChange: (data: {
    title?: string;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
    imageOrVideo?: string;
  }) => void;
  onFileUpload: (file: File) => Promise<string>;
}

const LandingAgencySection: React.FC<LandingAgencySectionProps> = ({
  agencySection,
  onAgencySectionChange,
  onFileUpload
}) => {
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (agencySection.imageOrVideo) {
      setImagePreview(agencySection.imageOrVideo);
    }
  }, [agencySection.imageOrVideo]);

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        onAgencySectionChange({ imageOrVideo: base64Data });
      } catch (error) {
        console.error('Error uploading image file:', error);
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Agency Section
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <Label htmlFor="agencyTitle">Title</Label>
          <Input
            type="text"
            id="agencyTitle"
            placeholder="Enter agency section title"
            value={agencySection.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAgencySectionChange({ title: e.target.value })}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="agencyDescription">Description</Label>
          <TextArea
            placeholder="Enter agency section description"
            value={agencySection.description}
            onChange={(value: string) => onAgencySectionChange({ description: value })}
            rows={4}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="agencyCtaText">CTA Text</Label>
          <Input
            type="text"
            id="agencyCtaText"
            placeholder="Enter CTA text"
            value={agencySection.ctaText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAgencySectionChange({ ctaText: e.target.value })}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="agencyCtaLink">CTA Link</Label>
          <Input
            type="text"
            id="agencyCtaLink"
            placeholder="Enter CTA link"
            value={agencySection.ctaLink}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onAgencySectionChange({ ctaLink: e.target.value })}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="agencyImage">Image/Video</Label>
          <input
            type="file"
            id="agencyImage"
            accept="image/*,video/*"
            onChange={handleImageFileChange}
            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-lines file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Agency section preview" 
                className="max-w-xs h-auto rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingAgencySection; 