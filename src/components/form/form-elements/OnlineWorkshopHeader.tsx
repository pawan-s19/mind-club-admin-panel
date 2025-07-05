import React, { useState, useCallback } from 'react';

interface WorkshopHeader {
  thumbnail: {
    url: string;
  };
  title: string;
  subtitle: string;
  coverImage: {
    url: string;
  };
  startDate: string;
  endDate: string;
}

interface OnlineWorkshopHeaderProps {
  header: WorkshopHeader;
  onHeaderChange: (data: Partial<WorkshopHeader>) => void;
  onFileUpload: (file: File) => Promise<string>;
}

const OnlineWorkshopHeader: React.FC<OnlineWorkshopHeaderProps> = ({
  header,
  onHeaderChange,
  onFileUpload
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(header.thumbnail.url);
  const [coverImagePreview, setCoverImagePreview] = useState<string>(header.coverImage.url);

  const handleThumbnailChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        setThumbnailPreview(base64Data);
        onHeaderChange({
          thumbnail: {
            url: base64Data
          }
        });
      } catch (error) {
        console.error('Error uploading thumbnail:', error);
      }
    }
  }, [onFileUpload, onHeaderChange]);

  const handleCoverImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        setCoverImagePreview(base64Data);
        onHeaderChange({
          coverImage: {
            url: base64Data
          }
        });
      } catch (error) {
        console.error('Error uploading cover image:', error);
      }
    }
  }, [onFileUpload, onHeaderChange]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          🔹 SECTION 1: Online Workshop Header (Hero Section)
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Workshop Title <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter workshop title"
            value={header.title}
            onChange={(e) => onHeaderChange({ title: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Workshop Subtitle
          </label>
          <input
            type="text"
            placeholder="Enter workshop subtitle"
            value={header.subtitle}
            onChange={(e) => onHeaderChange({ subtitle: e.target.value })}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Thumbnail Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {thumbnailPreview && (
            <div className="mt-2">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="h-20 w-20 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {coverImagePreview && (
            <div className="mt-2">
              <img
                src={coverImagePreview}
                alt="Cover image preview"
                className="h-20 w-20 object-cover rounded border"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Start Date <span className="text-meta-1">*</span>
            </label>
            <input
              type="datetime-local"
              value={header.startDate ? header.startDate.slice(0, 16) : ''}
              onChange={(e) => onHeaderChange({ startDate: e.target.value })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              End Date <span className="text-meta-1">*</span>
            </label>
            <input
              type="datetime-local"
              value={header.endDate ? header.endDate.slice(0, 16) : ''}
              onChange={(e) => onHeaderChange({ endDate: e.target.value })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineWorkshopHeader; 