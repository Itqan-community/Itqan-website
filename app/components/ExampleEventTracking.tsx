'use client';

import { useTranslations } from 'next-intl';
import { event } from '@/app/utils/analytics';

export default function ExampleEventTracking() {
  const t = useTranslations('analytics');

  const handleButtonClick = () => {
    event({
      action: 'button_click',
      category: 'engagement',
      label: 'example_button',
    });
  };

  const handleFormSubmit = () => {
    event({
      action: 'form_submit',
      category: 'form',
      label: 'contact_form',
    });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {t('trackButtonClick')}
      </button>
      
      <button
        onClick={handleFormSubmit}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {t('trackFormSubmit')}
      </button>
    </div>
  );
} 