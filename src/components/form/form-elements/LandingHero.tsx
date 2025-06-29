import React, { useEffect, useState } from 'react';
import Label from '../Label';
import Input from '../input/InputField';
import TextArea from '../input/TextArea';

interface LandingHeroProps {
  hero: {
    backgroundImageOrVideo: string;
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaLink: string;
    badgeImageOrVideo: string;
  };
  onHeroChange: (data: {
    backgroundImageOrVideo?: string;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    ctaLink?: string;
    badgeImageOrVideo?: string;
  }) => void;
  onFileUpload: (file: File) => Promise<string>;
}

const LandingHero: React.FC<LandingHeroProps> = ({
  hero,
  onHeroChange,
  onFileUpload
}) => {
  const [backgroundPreview, setBackgroundPreview] = useState<string>('');
  const [badgePreview, setBadgePreview] = useState<string>('');

  useEffect(() => {
    if (hero.backgroundImageOrVideo) {
      setBackgroundPreview(hero.backgroundImageOrVideo);
    }
    if (hero.badgeImageOrVideo) {
      setBadgePreview(hero.badgeImageOrVideo);
    }
  }, [hero.backgroundImageOrVideo, hero.badgeImageOrVideo]);

  const handleBackgroundFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        onHeroChange({ backgroundImageOrVideo: base64Data });
      } catch (error) {
        console.error('Error uploading background file:', error);
      }
    }
  };

  const handleBadgeFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        onHeroChange({ badgeImageOrVideo: base64Data });
      } catch (error) {
        console.error('Error uploading badge file:', error);
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Hero Section
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <Label htmlFor="headline">Headline</Label>
          <Input
            type="text"
            id="headline"
            placeholder="Enter headline"
            value={hero.headline}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHeroChange({ headline: e.target.value })}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="subheadline">Subheadline</Label>
          <TextArea
            placeholder="Enter subheadline"
            value={hero.subheadline}
            onChange={(value: string) => onHeroChange({ subheadline: value })}
            rows={3}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="ctaText">CTA Text</Label>
          <Input
            type="text"
            id="ctaText"
            placeholder="Enter CTA text"
            value={hero.ctaText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHeroChange({ ctaText: e.target.value })}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="ctaLink">CTA Link</Label>
          <Input
            type="text"
            id="ctaLink"
            placeholder="Enter CTA link"
            value={hero.ctaLink}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHeroChange({ ctaLink: e.target.value })}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="backgroundImage">Background Image/Video</Label>
          <input
            type="file"
            id="backgroundImage"
            accept="image/*,video/*"
            onChange={handleBackgroundFileChange}
            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-lines file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
          {backgroundPreview && (
            <div className="mt-2">
              <img 
                src={backgroundPreview} 
                alt="Background preview" 
                className="max-w-xs h-auto rounded"
              />
            </div>
          )}
        </div>

        <div className="mb-4.5">
          <Label htmlFor="badgeImage">Badge Image/Video</Label>
          <input
            type="file"
            id="badgeImage"
            accept="image/*,video/*"
            onChange={handleBadgeFileChange}
            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-lines file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
          {badgePreview && (
            <div className="mt-2">
              <img 
                src={badgePreview} 
                alt="Badge preview" 
                className="max-w-xs h-auto rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingHero; 