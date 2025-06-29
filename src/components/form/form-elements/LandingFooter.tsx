import React, { useEffect, useState } from 'react';
import Label from '../Label';
import Input from '../input/InputField';
import TextArea from '../input/TextArea';

interface FooterLink {
  label: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface LandingFooterProps {
  footer: {
    logoOrVideo: string;
    description: string;
    links: FooterLink[];
    socialLinks: SocialLink[];
    copyright: string;
  };
  onFooterChange: (data: {
    logoOrVideo?: string;
    description?: string;
    links?: FooterLink[];
    socialLinks?: SocialLink[];
    copyright?: string;
  }) => void;
  onFileUpload: (file: File) => Promise<string>;
}

const LandingFooter: React.FC<LandingFooterProps> = ({
  footer,
  onFooterChange,
  onFileUpload
}) => {
  const [logoPreview, setLogoPreview] = useState<string>('');

  useEffect(() => {
    if (footer.logoOrVideo) {
      setLogoPreview(footer.logoOrVideo);
    }
  }, [footer.logoOrVideo]);

  const handleLogoFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Data = await onFileUpload(file);
        onFooterChange({ logoOrVideo: base64Data });
      } catch (error) {
        console.error('Error uploading logo file:', error);
      }
    }
  };

  const addFooterLink = () => {
    const newLink: FooterLink = { label: '', url: '' };
    onFooterChange({ links: [...footer.links, newLink] });
  };

  const updateFooterLink = (index: number, field: keyof FooterLink, value: string) => {
    const updatedLinks = [...footer.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    onFooterChange({ links: updatedLinks });
  };

  const removeFooterLink = (index: number) => {
    const updatedLinks = footer.links.filter((_, i) => i !== index);
    onFooterChange({ links: updatedLinks });
  };

  const addSocialLink = () => {
    const newSocialLink: SocialLink = { platform: '', url: '' };
    onFooterChange({ socialLinks: [...footer.socialLinks, newSocialLink] });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const updatedSocialLinks = [...footer.socialLinks];
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], [field]: value };
    onFooterChange({ socialLinks: updatedSocialLinks });
  };

  const removeSocialLink = (index: number) => {
    const updatedSocialLinks = footer.socialLinks.filter((_, i) => i !== index);
    onFooterChange({ socialLinks: updatedSocialLinks });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Footer Section
        </h3>
      </div>
      <div className="p-6.5">
        <div className="mb-4.5">
          <Label htmlFor="footerDescription">Description</Label>
          <TextArea
            placeholder="Enter footer description"
            value={footer.description}
            onChange={(value: string) => onFooterChange({ description: value })}
            rows={3}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="footerCopyright">Copyright</Label>
          <Input
            type="text"
            id="footerCopyright"
            placeholder="Enter copyright text"
            value={footer.copyright}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFooterChange({ copyright: e.target.value })}
          />
        </div>

        <div className="mb-4.5">
          <Label htmlFor="footerLogo">Logo/Video</Label>
          <input
            type="file"
            id="footerLogo"
            accept="image/*,video/*"
            onChange={handleLogoFileChange}
            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-lines file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
          {logoPreview && (
            <div className="mt-2">
              <img 
                src={logoPreview} 
                alt="Footer logo preview" 
                className="max-w-xs h-auto rounded"
              />
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <Label>Footer Links</Label>
            <button
              type="button"
              onClick={addFooterLink}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Link
            </button>
          </div>
          {footer.links.map((link, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <Label htmlFor={`linkLabel${index}`}>Label</Label>
                  <Input
                    type="text"
                    id={`linkLabel${index}`}
                    placeholder="Link label"
                    value={link.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFooterLink(index, 'label', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`linkUrl${index}`}>URL</Label>
                  <Input
                    type="text"
                    id={`linkUrl${index}`}
                    placeholder="Link URL"
                    value={link.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFooterLink(index, 'url', e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFooterLink(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <Label>Social Links</Label>
            <button
              type="button"
              onClick={addSocialLink}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Social Link
            </button>
          </div>
          {footer.socialLinks.map((socialLink, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <Label htmlFor={`socialPlatform${index}`}>Platform</Label>
                  <Input
                    type="text"
                    id={`socialPlatform${index}`}
                    placeholder="Platform name"
                    value={socialLink.platform}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocialLink(index, 'platform', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`socialUrl${index}`}>URL</Label>
                  <Input
                    type="text"
                    id={`socialUrl${index}`}
                    placeholder="Social media URL"
                    value={socialLink.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSocialLink(index, 'url', e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeSocialLink(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingFooter; 