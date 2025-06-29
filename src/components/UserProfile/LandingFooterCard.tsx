import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useLanding } from '../../hooks/useLanding';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';
import Label from '../form/Label';
import FileInput from '../form/input/FileInput';

interface LandingFooterCardProps {
  footer: {
    logoOrVideo: {
      url: string;
      fileId: string;
    } | string;
    description: string;
    links: Array<{
      label: string;
      url: string;
      _id?: string;
    }>;
    socialLinks: Array<{
      platform: string;
      url: string;
      _id?: string;
    }>;
    copyright: string;
  };
  landingId?: string;
}

export default function LandingFooterCard({ footer, landingId }: LandingFooterCardProps) {
  const { updateFooter, updateLanding, loading } = useLanding();
  const { isOpen, openModal, closeModal } = useModal();

  // Helper function to get image URL
  const getImageUrl = (imageField: any): string => {
    if (typeof imageField === 'string') return imageField;
    if (imageField && typeof imageField === 'object' && imageField.url) return imageField.url;
    return '';
  };

  // State for form fields
  const [form, setForm] = useState({
    description: footer?.description || '',
    copyright: footer?.copyright || '',
    logoOrVideo: getImageUrl(footer?.logoOrVideo) || '',
    links: footer?.links || [],
    socialLinks: footer?.socialLinks || [],
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle textarea changes
  const handleTextAreaChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  // Handle file input
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, [field]: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const addLink = () => {
    setForm(prev => ({
      ...prev,
      links: [...prev.links, { label: '', url: '' }]
    }));
  };

  const removeLink = (index: number) => {
    setForm(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index: number, field: 'label' | 'url', value: string) => {
    setForm(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addSocialLink = () => {
    setForm(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setForm(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    setForm(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  // Save handler
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    try {
      updateFooter(form);
      if (landingId) {
        await updateLanding({ footer: form } as any, landingId);
      }
      closeModal();
    } catch (error) {
      console.error('Error updating footer section:', error);
    }
  };

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
          Footer Section
        </h4>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <img 
                src={getImageUrl(footer?.logoOrVideo)} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                Footer Content
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {footer?.description || 'No description'}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {footer?.copyright || 'No copyright'}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Links: {footer?.links?.length || 0} | Social: {footer?.socialLinks?.length || 0}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Footer Section
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your footer section content and links.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Footer Section Content
                </h5>

                <div className="flex flex-col gap-4">
                  <div>
                    <Label>Description</Label>
                    <TextArea
                      value={form.description}
                      onChange={(value) => handleTextAreaChange('description', value)}
                      placeholder="Enter footer description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Copyright</Label>
                    <Input
                      type="text"
                      name="copyright"
                      value={form.copyright}
                      onChange={handleChange}
                      placeholder="Enter copyright text"
                    />
                  </div>

                  <div>
                    <Label>Logo/Video</Label>
                    <FileInput onChange={(e) => handleFileChange(e, "logoOrVideo")} />
                    {form.logoOrVideo && (
                      <div className="mt-2">
                        <img
                          src={form.logoOrVideo}
                          alt="Logo"
                          className="w-32 h-20 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Footer Links</Label>
                      <Button size="sm" variant="outline" onClick={addLink}>
                        Add Link
                      </Button>
                    </div>
                    {form.links.map((link, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={link.label}
                          onChange={(e) => updateLink(index, 'label', e.target.value)}
                          placeholder="Link label"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => updateLink(index, 'url', e.target.value)}
                          placeholder="Link URL"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeLink(index)}
                          className="text-red-600"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Social Links</Label>
                      <Button size="sm" variant="outline" onClick={addSocialLink}>
                        Add Social Link
                      </Button>
                    </div>
                    {form.socialLinks.map((link, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={link.platform}
                          onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                          placeholder="Platform (e.g., facebook, twitter)"
                        />
                        <Input
                          value={link.url}
                          onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                          placeholder="Social media URL"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeSocialLink(index)}
                          className="text-red-600"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={() => handleSave({} as FormEvent)} disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
} 