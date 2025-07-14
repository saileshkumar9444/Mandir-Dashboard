import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import '@/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const texts = [
  {
    key: 'ramcharitmanas',
    title: 'Ramcharitmanas',
    files: {
      hindi: '/ramcharitmanas-Hindi.pdf',
      english: '/Shri-Ram-Charitmanas-English.pdf'
    }
  },
  {
    key: 'gita',
    title: 'Bhagavad Gita',
    files: {
      hindi: '/Bhagavad-Gita-Hindi.pdf',
      english: '/gita.pdf'
    }
  },
  {
    key: 'chalisa',
    title: 'Hanuman Chalisa',
    files: {
      hindi: '/hanumanchalisa-hindi.pdf',
      english: '/hanumanchalisa-english.pdf'
    }
  }
];

const borderStyle = {
  border: '6px double #d97706',
  borderRadius: '18px',
  boxShadow: '0 4px 32px 0 #b91c1c44',
  background: 'linear-gradient(135deg, #fff7e6 80%, #fffbe6 100%)',
  position: 'relative',
  overflow: 'hidden',
};

const starBorder = (
  <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,pointerEvents:'none',zIndex:2}}>
    <div style={{position:'absolute',top:0,left:0,right:0,display:'flex',justifyContent:'space-between',padding:'0 12px'}}>
      {'★'.repeat(12).split('').map((s,i)=>(<span key={i} style={{color:'#d97706',fontSize:18,opacity:0.7}}>{s}</span>))}
    </div>
    <div style={{position:'absolute',bottom:0,left:0,right:0,display:'flex',justifyContent:'space-between',padding:'0 12px'}}>
      {'★'.repeat(12).split('').map((s,i)=>(<span key={i} style={{color:'#d97706',fontSize:18,opacity:0.7}}>{s}</span>))}
    </div>
    <div style={{position:'absolute',top:0,bottom:0,left:0,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'12px 0'}}>
      {'★'.repeat(8).split('').map((s,i)=>(<span key={i} style={{color:'#d97706',fontSize:18,opacity:0.7}}>{s}</span>))}
    </div>
    <div style={{position:'absolute',top:0,bottom:0,right:0,display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'12px 0'}}>
      {'★'.repeat(8).split('').map((s,i)=>(<span key={i} style={{color:'#d97706',fontSize:18,opacity:0.7}}>{s}</span>))}
    </div>
  </div>
);

function BookViewerModal({ open, file, title, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 bg-gradient-to-br from-[#fff7e6] to-[#fffbe6] border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[hsl(var(--saffron))]">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          <div style={{width:'100%',maxWidth:420,minHeight:520,...borderStyle}}>
            {starBorder}
            <HTMLFlipBook width={400} height={520} size="stretch" minWidth={320} minHeight={400} maxWidth={600} maxHeight={800} showCover={false} mobileScrollSupport={true} style={{background:'transparent',boxShadow:'none'}}>
              {Array.from(new Array(numPages), (el, index) => (
                <div key={index} style={{width:'100%',height:'100%',background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                  <Page file={file} pageNumber={index+1} width={380} renderTextLayer={false} renderAnnotationLayer={false} />
                </div>
              ))}
            </HTMLFlipBook>
          </div>
          <div className="flex gap-2 mt-4 justify-center">
            <Button size="sm" onClick={()=>setPage(1)} disabled={page===1}>First</Button>
            <Button size="sm" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</Button>
            <span className="px-2 py-1 rounded bg-[#fffbe6] text-[hsl(var(--maroon))] font-semibold">{page} / {numPages}</span>
            <Button size="sm" onClick={()=>setPage(p=>Math.min(numPages,p+1))} disabled={page===numPages}>Next</Button>
            <Button size="sm" onClick={()=>setPage(numPages)} disabled={page===numPages}>Last</Button>
          </div>
        </div>
        <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)} loading={<div className="text-center py-8">Loading...</div>}>
          {/* Hidden, just to get numPages */}
        </Document>
      </DialogContent>
    </Dialog>
  );
}

export default function SpiritualReadingModule() {
  const [modal, setModal] = useState({ open: false, type: null, textKey: null });
  const [viewer, setViewer] = useState({ open: false, file: null, title: '' });

  const handleAction = (type, textKey) => setModal({ open: true, type, textKey });

  const handleLanguageSelect = (lang) => {
    const text = texts.find(t => t.key === modal.textKey);
    if (!text) return;
    const file = text.files[lang];
    if (modal.type === 'read') {
      setViewer({ open: true, file, title: text.title });
    } else if (modal.type === 'download') {
      const link = document.createElement('a');
      link.href = file;
      link.download = file.split('/').pop() || '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setModal({ open: false, type: null, textKey: null });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center py-8">
      {texts.map(text => (
        <div key={text.key} className="bg-gradient-to-br from-[#fff7e6] to-[#fffbe6] border-2 border-[hsl(var(--saffron))] rounded-lg shadow-lg p-6 flex flex-col items-center min-w-[220px] max-w-xs w-full">
          <h3 className="text-xl font-bold mb-4 text-[hsl(var(--maroon))]">{text.title}</h3>
          <div className="flex gap-4">
            <Button onClick={() => handleAction('read', text.key)} className="bg-[hsl(var(--saffron))] text-white hover:bg-[hsl(var(--gold))]">
              <BookOpen /> Read
            </Button>
            <Button onClick={() => handleAction('download', text.key)} className="bg-[hsl(var(--gold))] text-[hsl(var(--maroon))] hover:bg-[hsl(var(--saffron))]">
              <Download /> Download
            </Button>
          </div>
        </div>
      ))}
      <Dialog open={modal.open} onOpenChange={open => setModal({ ...modal, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modal.type === 'read'
                ? 'Select language to read'
                : 'Select language to download'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Button variant="outline" onClick={() => handleLanguageSelect('english')}>English</Button>
            <Button variant="outline" onClick={() => handleLanguageSelect('hindi')}>Hindi</Button>
          </div>
        </DialogContent>
      </Dialog>
      {viewer.open && (
        <BookViewerModal
          open={viewer.open}
          file={viewer.file}
          title={viewer.title}
          onClose={() => setViewer({ open: false, file: null, title: '' })}
        />
      )}
    </div>
  );
} 