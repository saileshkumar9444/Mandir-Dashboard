import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

export default function SpiritualBookViewer({ open, file, title, onClose }) {
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
            <HTMLFlipBook width={400} height={520} size="stretch" minWidth={320} minHeight={400} maxWidth={600} maxHeight={800} showCover={false} mobileScrollSupport={true} style={{background:'transparent',boxShadow:'none'}}
              onFlip={e => setPage(e.data+1)}
              startPage={page-1}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={index} style={{width:'100%',height:'100%',background:'transparent',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                  <Page file={file} pageNumber={index+1} width={380} renderTextLayer renderAnnotationLayer />
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