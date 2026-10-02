import React, { useState } from 'react';
import { Copy, Download, Check, Eye, Code, X } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, htmlContent }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'interactive-story.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-[#e0e0e0] w-full max-w-5xl h-[85vh] flex flex-col shadow-none">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#e0e0e0] flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-3">
            <span className="font-editorial-ui text-xs font-bold text-[#b13460] px-2 py-0.5 border border-[#b13460]/20 bg-[#b13460]/5">
              Xuất bản
            </span>
            <div>
              <h3 className="font-editorial-serif text-lg font-bold text-[#222222]">
                Xuất bản bài viết tương tác độc lập (Standalone HTML5)
              </h3>
              <p className="font-editorial-body text-xs text-neutral-500">
                File HTML độc lập, nhúng sẵn phông chữ, responsive đa màn hình, không chứa mã công cụ soạn thảo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 border border-[#e0e0e0] bg-white hover:bg-neutral-50 text-xs font-editorial-ui font-semibold flex items-center gap-1.5 text-neutral-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#b13460]" />}
              <span>{copied ? 'Đã sao chép!' : 'Sao chép mã'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-[#b13460] hover:bg-[#91254c] text-white text-xs font-editorial-ui font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file .html</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#e0e0e0] hover:bg-neutral-200 text-neutral-600 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="px-4 py-2 border-b border-[#e0e0e0] flex items-center gap-2 bg-white">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-xs font-editorial-ui font-semibold flex items-center gap-1.5 border transition-colors ${
              activeTab === 'preview'
                ? 'border-[#b13460] bg-[rgba(177,52,96,0.06)] text-[#b13460]'
                : 'border-[#e0e0e0] text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem trước trực tiếp (Preview)</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 text-xs font-editorial-ui font-semibold flex items-center gap-1.5 border transition-colors ${
              activeTab === 'code'
                ? 'border-[#b13460] bg-[rgba(177,52,96,0.06)] text-[#b13460]'
                : 'border-[#e0e0e0] text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Mã nguồn HTML5</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 min-h-0 bg-neutral-100">
          {activeTab === 'preview' ? (
            <iframe
              title="Xem trước bài viết xuất bản"
              srcDoc={htmlContent}
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="w-full h-full p-4 overflow-auto">
              <pre className="p-4 bg-[#222222] text-[#f8f9fa] text-xs font-mono leading-relaxed border border-[#333333] whitespace-pre-wrap select-all">
                {htmlContent}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
