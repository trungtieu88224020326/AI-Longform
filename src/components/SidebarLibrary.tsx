import React, { useState, useRef } from 'react';
import { BLOCK_TEMPLATES, BlockDefinition } from '../data/blockTemplates';
import { Plus, Search, FileText, LayoutGrid, Check, Copy, Upload, Link as LinkIcon, Sparkles, RefreshCw, Trash2, Loader2, ArrowRight } from 'lucide-react';

interface SidebarLibraryProps {
  onAddBlock: (template: BlockDefinition) => void;
  rawSourceText: string;
  onUpdateSourceText: (newText: string) => void;
  onTriggerAiAnalysis: () => void;
  isAiAnalyzing?: boolean;
}

export const SidebarLibrary: React.FC<SidebarLibraryProps> = ({
  onAddBlock,
  rawSourceText,
  onUpdateSourceText,
  onTriggerAiAnalysis,
  isAiAnalyzing = false,
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'source'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedSource, setCopiedSource] = useState(false);

  // Link insertion state
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isFetchingLink, setIsFetchingLink] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  // File upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'Tất cả khối' },
    { id: 'editorial', label: 'Biên tập cơ bản' },
    { id: 'group1', label: '1-5: Định vị & Dữ liệu' },
    { id: 'group2', label: '6-11: Sản phẩm & Phễu' },
    { id: 'group3', label: '12-15: Kênh & Hạ tầng' },
    { id: 'group4', label: '16-18: B2B & Chiến lược' },
  ];

  const filteredBlocks = BLOCK_TEMPLATES.filter((block) => {
    const matchesCat = selectedCategory === 'all' || block.category === selectedCategory;
    const matchesSearch =
      block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (block.figureLabel && block.figureLabel.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopySource = () => {
    navigator.clipboard.writeText(rawSourceText);
    setCopiedSource(true);
    setTimeout(() => setCopiedSource(false), 2000);
  };

  // Handle File Upload (.txt, .md, .html, .json)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onUpdateSourceText(content);
      }
    };
    reader.readAsText(file);
    // Reset file input
    e.target.value = '';
  };

  // Handle Drag & Drop File onto textarea
  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onUpdateSourceText(content);
      }
    };
    reader.readAsText(file);
  };

  // Handle Fetch Content from Link and Insert into Source Text
  const handleFetchLink = async (mode: 'replace' | 'append') => {
    if (!linkUrl.trim()) return;
    setIsFetchingLink(true);
    setLinkError(null);

    try {
      const res = await fetch('/api/fetch-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkUrl.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Không thể lấy nội dung từ đường link này.');
      }

      const fetchedText = data.assembledText || '';
      if (mode === 'replace') {
        onUpdateSourceText(fetchedText);
      } else {
        onUpdateSourceText(rawSourceText ? `${rawSourceText}\n\n${fetchedText}` : fetchedText);
      }
      setShowLinkInput(false);
      setLinkUrl('');
    } catch (err: any) {
      setLinkError(err.message || 'Lỗi khi tải bài báo.');
    } finally {
      setIsFetchingLink(false);
    }
  };

  const wordCount = rawSourceText ? rawSourceText.trim().split(/\s+/).length : 0;
  const charCount = rawSourceText ? rawSourceText.length : 0;

  return (
    <aside className="w-80 sm:w-92 h-full bg-white border-r border-[#e0e0e0] flex flex-col shrink-0">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.markdown,.json,.html,.csv,.doc,.docx"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Sidebar Header & Tab switcher */}
      <div className="p-3 border-b border-[#e0e0e0] bg-neutral-50/50">
        <div className="grid grid-cols-2 p-1 bg-neutral-200/70 text-xs font-editorial-ui font-semibold">
          <button
            onClick={() => setActiveTab('library')}
            className={`py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'library'
                ? 'bg-white text-[#222222] shadow-none border border-[#e0e0e0]'
                : 'text-neutral-600 hover:text-[#222222]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#b13460]" />
            <span>Thư viện 18 khối</span>
          </button>
          <button
            onClick={() => setActiveTab('source')}
            className={`py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'source'
                ? 'bg-white text-[#222222] shadow-none border border-[#e0e0e0]'
                : 'text-neutral-600 hover:text-[#222222]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#b13460]" />
            <span>Văn bản gốc</span>
          </button>
        </div>
      </div>

      {activeTab === 'library' ? (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Search box */}
          <div className="p-3 border-b border-[#e0e0e0]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Tìm khối (Hình 1, phễu, chỉ số...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs font-editorial-ui border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#b13460]"
              />
            </div>
          </div>

          {/* Category filter tabs */}
          <div className="p-2 border-b border-[#e0e0e0] overflow-x-auto flex gap-1 bg-white">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-2 py-1 text-[11px] font-editorial-ui whitespace-nowrap border transition-colors ${
                  selectedCategory === c.id
                    ? 'border-[#b13460] bg-[rgba(177,52,96,0.08)] text-[#b13460] font-semibold'
                    : 'border-[#e0e0e0] text-neutral-600 hover:border-neutral-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* List of blocks */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            <div className="text-[11px] font-editorial-ui text-neutral-500 font-medium px-1">
              Hiển thị {filteredBlocks.length} thành phần chuẩn The Economist:
            </div>

            {filteredBlocks.map((block) => (
              <div
                key={block.type}
                className="p-3 border border-[#e0e0e0] hover:border-[#b13460]/50 bg-white group transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {block.figureLabel && (
                      <span className="font-editorial-ui text-[10px] font-bold px-1.5 py-0.5 border border-[#b13460]/30 text-[#b13460] bg-[#b13460]/5 mb-1 inline-block">
                        {block.figureLabel}
                      </span>
                    )}
                    <h4 className="font-editorial-serif text-xs sm:text-sm font-bold text-[#222222] leading-snug group-hover:text-[#b13460]">
                      {block.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => onAddBlock(block)}
                    className="w-7 h-7 flex items-center justify-center border border-[#e0e0e0] bg-neutral-50 hover:bg-[#b13460] hover:text-white hover:border-[#b13460] text-neutral-700 transition-colors shrink-0"
                    title="Chèn khối vào cuối bài"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-editorial-body text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Source Text Tab: Full Edit, Upload, Insert Link & AI Analyze */
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          {/* Action Toolbar */}
          <div className="p-2.5 border-b border-[#e0e0e0] bg-neutral-50 flex flex-wrap items-center justify-between gap-1.5 text-xs font-editorial-ui">
            <div className="flex items-center gap-1">
              {/* Upload file button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-1 border border-[#e0e0e0] bg-white hover:bg-neutral-100 text-neutral-700 font-semibold flex items-center gap-1 transition-colors"
                title="Tải tệp văn bản từ máy tính (.txt, .md, .docx...)"
              >
                <Upload className="w-3.5 h-3.5 text-[#b13460]" />
                <span>Upload</span>
              </button>

              {/* Insert link button */}
              <button
                type="button"
                onClick={() => setShowLinkInput(!showLinkInput)}
                className={`px-2 py-1 border transition-colors font-semibold flex items-center gap-1 ${
                  showLinkInput
                    ? 'border-[#b13460] bg-[rgba(177,52,96,0.08)] text-[#b13460]'
                    : 'border-[#e0e0e0] bg-white hover:bg-neutral-100 text-neutral-700'
                }`}
                title="Chèn hoặc lấy nội dung từ link bài báo"
              >
                <LinkIcon className="w-3.5 h-3.5 text-[#b13460]" />
                <span>Chèn link</span>
              </button>

              {/* Clear button */}
              <button
                type="button"
                onClick={() => onUpdateSourceText('')}
                className="p-1 text-neutral-400 hover:text-neutral-700"
                title="Xóa trắng văn bản"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleCopySource}
              className="text-xs font-editorial-ui flex items-center gap-1 text-[#b13460] hover:underline"
            >
              {copiedSource ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>

          {/* Link Insertion Popover / Sub-bar */}
          {showLinkInput && (
            <div className="p-3 bg-[rgba(177,52,96,0.04)] border-b border-[#e0e0e0] space-y-2">
              <div className="font-editorial-ui text-[11px] font-bold text-[#b13460] flex items-center gap-1">
                <LinkIcon className="w-3 h-3" />
                <span>Lấy nội dung tự động từ đường link:</span>
              </div>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://vnexpress.net/... hoặc economist.com/..."
                className="w-full px-2.5 py-1 text-xs font-editorial-ui border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#b13460]"
              />
              {linkError && <p className="text-[11px] text-rose-600 font-editorial-body">{linkError}</p>}
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  disabled={isFetchingLink || !linkUrl.trim()}
                  onClick={() => handleFetchLink('replace')}
                  className="px-2.5 py-1 bg-[#b13460] text-white hover:bg-[#91254c] disabled:opacity-50 text-[11px] font-editorial-ui font-semibold flex items-center gap-1"
                >
                  {isFetchingLink ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                  <span>Thay thế</span>
                </button>
                <button
                  type="button"
                  disabled={isFetchingLink || !linkUrl.trim()}
                  onClick={() => handleFetchLink('append')}
                  className="px-2.5 py-1 border border-[#e0e0e0] bg-white hover:bg-neutral-100 text-neutral-700 disabled:opacity-50 text-[11px] font-editorial-ui font-semibold"
                >
                  Chèn tiếp vào cuối
                </button>
                <button
                  type="button"
                  onClick={() => setShowLinkInput(false)}
                  className="px-2 py-1 text-[11px] text-neutral-500 hover:text-neutral-800"
                >
                  Đóng
                </button>
              </div>
            </div>
          )}

          {/* Editable Text Area (Supports direct typing & Drag & Drop) */}
          <div className="flex-1 flex flex-col p-3 min-h-0">
            <textarea
              value={rawSourceText}
              onChange={(e) => onUpdateSourceText(e.target.value)}
              onDrop={handleDrop}
              placeholder="Nhập, dán hoặc kéo thả tệp văn bản bài báo vào đây để chỉnh sửa..."
              className="w-full flex-1 p-3 text-xs font-editorial-body text-neutral-800 leading-relaxed border border-[#e0e0e0] bg-[#fafafa] focus:bg-white focus:outline-none focus:border-[#b13460] resize-none"
            />

            {/* Word & Char counter footer */}
            <div className="flex items-center justify-between pt-2 text-[11px] font-editorial-ui text-neutral-500">
              <span className="truncate">
                {wordCount} từ · {charCount} ký tự
              </span>
              <span className="text-neutral-400 italic">Có thể kéo thả tệp .txt / .md</span>
            </div>
          </div>

          {/* Primary Action: AI Analysis & Smart Block Selection */}
          <div className="p-3 border-t border-[#e0e0e0] bg-neutral-50">
            <button
              type="button"
              disabled={isAiAnalyzing || !rawSourceText.trim()}
              onClick={onTriggerAiAnalysis}
              className="w-full py-2.5 px-3 bg-[#b13460] hover:bg-[#91254c] disabled:opacity-50 text-white text-xs font-editorial-ui font-semibold flex items-center justify-center gap-2 transition-colors shadow-none"
            >
              {isAiAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>AI đang phân tích cấu trúc...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>AI Phân tích & Chọn khối vào bài</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
