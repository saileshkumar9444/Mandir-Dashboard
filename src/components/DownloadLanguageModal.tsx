import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface DownloadLanguageModalProps {
  open: boolean;
  onClose: () => void;
  granth: { titleEn: string } | null;
}

const fileMap: Record<string, { english: string; hindi: string }> = {
  'Bhagavad Gita': {
    english: '/gita.pdf',
    hindi: '/Bhagavad-Gita-Hindi.pdf',
  },
  'Hanuman Chalisa': {
    english: '/Sri_Hanuman_Chalisa_English.pdf',
    hindi: '/hanuman-chalisa-hindi.pdf',
  },
  'Ramcharitmanas': {
    english: '/Shri-Ram-Charitmanas-English.pdf',
    hindi: '/ramcharitmanas-Hindi.pdf',
  },
};

const DownloadLanguageModal: React.FC<DownloadLanguageModalProps> = ({ open, onClose, granth }) => {
  if (!granth) return null;
  const handleDownload = (lang: 'english' | 'hindi') => {
    const file = fileMap[granth.titleEn]?.[lang];
    if (file) {
      const link = document.createElement('a');
      link.href = file;
      link.download = file.split('/').pop() || '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xs w-full p-6 rounded-xl text-center">
        <DialogHeader>
          <DialogTitle className="mb-2 text-lg font-semibold">Select Language</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-2">
          <Button className="w-full" onClick={() => handleDownload('english')}>English</Button>
          <Button className="w-full" onClick={() => handleDownload('hindi')}>हिन्दी</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadLanguageModal; 