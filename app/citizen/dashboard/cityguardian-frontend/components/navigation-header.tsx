import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

const NavigationHeader = ({ title, customBackPath }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(customBackPath);
  };

  return (
    <header className="bg-gray-900 p-4 flex items-center justify-between">
      <Button variant="ghost" onClick={handleBack}>
        Back
      </Button>
      <h1 className="text-white text-xl font-bold">{title}</h1>
      <div className="flex space-x-4">
        {/* Additional navigation items can be added here */}
      </div>
    </header>
  );
};

export default NavigationHeader;