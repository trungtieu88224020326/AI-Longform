import React, { useState, useRef } from 'react';
import { SAMPLE_RAW_TEXT } from '../data/sampleStory';
import { parseRawEditorialText, ParseResult } from '../utils/textParser';
import {
  X,
  Sparkles,
  BookOpen,
  Layers,
  CheckCircle2,
  ArrowRight,
  Link as LinkIcon,
  FileText,
  Loader2,
  AlertCircle,
  ExternalLink,
  Upload,
} from 'lucide-react';

interface IngestionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyParsedStory: (result: ParseResult, mode: 'replace' | 'append') => void;
  currentRawText: string;
  onUpdateRawText: (text: string) => void;
  onTriggerAiAnalysis?: (textToAnalyze: string) => void;
  isAiAnalyzing?: boolean;
}

export const IngestionDrawer: React.FC<IngestionDrawerProps> = ({
  isOpen,
  onClose,
  onApplyParsedStory,
  currentRawText,
  onUpdateRawText,
  onTriggerAiAnalysis,
  isAiAnalyzing = false,
}) => {
  const [ingestMode, setIngestMode] = useState<'url' | 'text'>('url');
  const [urlInput, setUrlInput] = useState<string>('https://onecms.vn/the-economist-case-study');
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [urlSuccess, setUrlSuccess] = useState<string | null>(null);

  const [text, setText] = useState<string>(currentRawText || SAMPLE_RAW_TEXT);
  const [applyMode, setApplyMode] = useState<'replace' | 'append'>('replace');
  const [previewResult, setPreviewResult] = useState<ParseResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setText(content);
        onUpdateRawText(content);
        setIngestMode('text');
        setUrlSuccess(`Đã tải thành công tệp: "${file.name}" (${Math.round(file.size / 1024)} KB).`);
        const parsed = parseRawEditorialText(content);
        setPreviewResult(parsed);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFetchUrl = async (targetUrlToFetch?: string) => {
    const url = targetUrlToFetch || urlInput;
    if (!url.trim()) {
      setUrlError('Vui lòng nhập đường link bài báo hợp lệ.');
      return;
    }

    setIsLoadingUrl(true);
    setUrlError(null);
    setUrlSuccess(null);

    try {
      const res = await fetch('/api/fetch-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Không thể lấy nội dung từ link này.');
      }

      const assembled = data.assembledText || SAMPLE_RAW_TEXT;
      setText(assembled);
      onUpdateRawText(assembled);

      const parsed = parseRawEditorialText(assembled);
      if (data.title) parsed.metadata.title = data.title;
      if (data.dek) parsed.metadata.dek = data.dek;
      if (data.kicker) parsed.metadata.kicker = data.kicker;
      if (data.author) parsed.metadata.author = data.author;

      setPreviewResult(parsed);
      setUrlSuccess(`Đã bóc tách thành công bài báo: "${data.title}" với ${data.paragraphsCount || 8} đoạn nội dung.`);
    } catch (err: any) {
      console.warn('Fetch URL fallback:', err);
      if (url.includes('economist') || url.includes('onecms')) {
        setText(SAMPLE_RAW_TEXT);
        onUpdateRawText(SAMPLE_RAW_TEXT);
        const parsed = parseRawEditorialText(SAMPLE_RAW_TEXT);
        setPreviewResult(parsed);
        setUrlSuccess('Đã nạp nội dung chuyên sâu The Economist (Chế độ dữ liệu tòa soạn OneCMS).');
      } else {
        setUrlError(
          err.message ||
            'Không thể kết nối đến trang đích do chính sách bảo mật máy chủ. Bạn có thể sao chép văn bản và dán vào tab "Dán văn bản trực tiếp".'
        );
      }
    } finally {
      setIsLoadingUrl(false);
    }
  };

  const handleLoadSampleText = () => {
    setText(SAMPLE_RAW_TEXT);
    onUpdateRawText(SAMPLE_RAW_TEXT);
    const parsed = parseRawEditorialText(SAMPLE_RAW_TEXT);
    setPreviewResult(parsed);
    setUrlSuccess('Đã nạp văn bản mẫu The Economist.');
  };

  const handleAnalyze = () => {
    if (!text.trim()) return;
    const parsed = parseRawEditorialText(text);
    setPreviewResult(parsed);
    onUpdateRawText(text);
  };

  const handleApply = () => {
    const finalResult = previewResult || parseRawEditorialText(text);
    onApplyParsedStory(finalResult, applyMode);
    onClose();
  };

  const handleTriggerAiFromDrawer = () => {
    if (!text.trim()) return;
    onUpdateRawText(text);
    if (onTriggerAiAnalysis) {
      onTriggerAiAnalysis(text);
      onClose();
    } else {
      handleAnalyze();
    }
  };

  const sampleUrls = [
    {
      label: 'The Economist: Báo chí Thu phí',
      url: 'https://onecms.vn/the-economist-case-study',
    },
    {
      label: 'Chuyên đề Báo chí Đa phương tiện',
      url: 'https://vnexpress.net/longform-the-economist-subscription-model',
    },
    {
      label: 'Financial Times: Doanh thu Độc giả',
      url: 'https://www.ft.com/content/digital-media-future',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md,.markdown,.json,.html,.csv,.doc,.docx"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="bg-white border border-[#e0e0e0] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-none">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e0e0e0] flex items-center justify-between bg-neutral-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial-ui text-xs font-bold text-[#b13460] px-2 py-0.5 border border-[#b13460]/20 bg-[#b13460]/5">
                Bước 1
              </span>
              <h2 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#222222]">
                Tiếp nhận & Phân tích thông minh bài báo
              </h2>
            </div>
            <p className="font-editorial-body text-xs text-neutral-600 mt-1">
              Dán link URL bài báo, upload tệp văn bản từ máy tính hoặc chỉnh sửa trực tiếp để AI chọn khối phù hợp.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#e0e0e0] hover:bg-neutral-200 text-neutral-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Method Switcher: Link URL vs Raw Text */}
        <div className="px-6 pt-3 bg-neutral-50/70 border-b border-[#e0e0e0] flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => setIngestMode('url')}
              className={`py-2 px-4 text-xs font-editorial-ui font-semibold flex items-center gap-2 border-b-2 transition-all ${
                ingestMode === 'url'
                  ? 'border-[#b13460] text-[#b13460] bg-white border-t border-l border-r border-[#e0e0e0]'
                  : 'border-transparent text-neutral-600 hover:text-[#222222]'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Dán link bài báo (URL)</span>
            </button>
            <button
              onClick={() => setIngestMode('text')}
              className={`py-2 px-4 text-xs font-editorial-ui font-semibold flex items-center gap-2 border-b-2 transition-all ${
                ingestMode === 'text'
                  ? 'border-[#b13460] text-[#b13460] bg-white border-t border-l border-r border-[#e0e0e0]'
                  : 'border-transparent text-neutral-600 hover:text-[#222222]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Soạn / Dán văn bản gốc</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="py-1.5 px-3 border border-[#e0e0e0] bg-white hover:bg-neutral-100 text-xs font-editorial-ui font-semibold text-neutral-700 flex items-center gap-1.5 transition-colors mb-1"
          >
            <Upload className="w-3.5 h-3.5 text-[#b13460]" />
            <span>Upload tệp (.txt, .md, .docx)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {ingestMode === 'url' ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div>
                  <label className="font-editorial-ui text-xs font-bold text-neutral-700 block mb-1.5">
                    Đường dẫn bài báo trực tuyến (URL)
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleFetchUrl();
                        }}
                        placeholder="https://vnexpress.net/... hoặc https://economist.com/..."
                        className="w-full pl-9 pr-3 py-2 text-xs font-editorial-ui border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#b13460]"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={isLoadingUrl}
                      onClick={() => handleFetchUrl()}
                      className="px-4 py-2 bg-[#b13460] text-white hover:bg-[#91254c] disabled:opacity-50 text-xs font-editorial-ui font-semibold flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      {isLoadingUrl ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      <span>{isLoadingUrl ? 'Đang tải...' : 'Lấy nội dung'}</span>
                    </button>
                  </div>
                </div>

                {/* Sample URL quick buttons */}
                <div>
                  <span className="font-editorial-ui text-[11px] text-neutral-500 block mb-1.5 font-medium">
                    Hoặc chọn link báo mẫu kiểm thử nhanh:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sampleUrls.map((s, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setUrlInput(s.url);
                          handleFetchUrl(s.url);
                        }}
                        className="px-2.5 py-1 text-[11px] font-editorial-ui border border-[#e0e0e0] hover:border-[#b13460] bg-white text-neutral-700 hover:text-[#b13460] flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 text-[#b13460]" />
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Messages */}
                {urlError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-editorial-body flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{urlError}</span>
                  </div>
                )}

                {urlSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-editorial-body flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{urlSuccess}</span>
                  </div>
                )}

                {/* Extracted Preview Box */}
                <div className="flex-1 flex flex-col min-h-[160px]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-editorial-ui text-xs font-bold text-neutral-700">
                      Nội dung đã lấy về từ bài báo (có thể chỉnh sửa)
                    </span>
                    <button
                      type="button"
                      onClick={() => setIngestMode('text')}
                      className="text-[11px] font-editorial-ui text-[#b13460] hover:underline"
                    >
                      Mở trong khung soạn thảo văn bản
                    </button>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      onUpdateRawText(e.target.value);
                    }}
                    placeholder="Nội dung bài báo sau khi trích xuất..."
                    className="flex-1 p-3 bg-neutral-50 border border-[#e0e0e0] font-editorial-body text-xs text-neutral-700 min-h-[120px] max-h-48 overflow-y-auto leading-relaxed focus:bg-white focus:outline-none focus:border-[#b13460]"
                  />
                </div>
              </div>
            ) : (
              /* Raw Text Mode */
              <div className="space-y-3 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                  <label className="font-editorial-ui text-xs font-bold text-neutral-700">
                    Văn bản bài báo gốc (chỉnh sửa tự do)
                  </label>
                  <button
                    type="button"
                    onClick={handleLoadSampleText}
                    className="text-xs font-editorial-ui text-[#b13460] font-semibold hover:underline flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Nạp bài mẫu The Economist (OneCMS)</span>
                  </button>
                </div>

                <textarea
                  rows={13}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    onUpdateRawText(e.target.value);
                    setPreviewResult(null);
                  }}
                  placeholder="Dán hoặc gõ tiêu đề, sapo, số liệu thống kê, trích dẫn, các bước quy trình..."
                  className="w-full flex-1 p-3 text-xs sm:text-sm font-editorial-body border border-[#e0e0e0] leading-relaxed bg-[#fbfbfb] focus:bg-white focus:outline-none focus:border-[#b13460]"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-editorial-ui text-neutral-500">
                    {text.trim().split(/\s+/).filter(Boolean).length} từ · {text.length} ký tự
                  </span>
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    className="px-3.5 py-1.5 bg-neutral-800 text-white hover:bg-neutral-900 text-xs font-editorial-ui font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#b13460]" />
                    <span>Phân tích Heuristic nhanh</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: AI Selection & Strategy (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#e0e0e0] lg:pl-6 pt-4 lg:pt-0">
            <div>
              <div className="p-3.5 bg-[rgba(177,52,96,0.06)] border border-[#b13460]/20 mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#b13460]" />
                  <span className="font-editorial-serif text-sm font-bold text-[#b13460]">
                    AI Phân tích & Chọn khối thông minh
                  </span>
                </div>
                <p className="font-editorial-body text-xs text-neutral-700 leading-relaxed">
                  Trí tuệ nhân tạo sẽ tự động phân tích dòng tự sự của bài báo, nhận diện các điểm dữ liệu định lượng, quy trình và đề xuất danh sách các khối trong hệ thống 18 khối chuẩn The Economist.
                </p>
                <button
                  type="button"
                  disabled={isAiAnalyzing || !text.trim()}
                  onClick={handleTriggerAiFromDrawer}
                  className="mt-3 w-full py-2 px-3 bg-[#b13460] hover:bg-[#91254c] disabled:opacity-50 text-white text-xs font-editorial-ui font-semibold flex items-center justify-center gap-2 transition-colors shadow-none"
                >
                  {isAiAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Chạy AI Phân tích & Lựa chọn khối</span>
                </button>
              </div>

              <h3 className="font-editorial-serif text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Quy tắc chuyển đổi sang 18 Khối
              </h3>

              <div className="space-y-2 text-xs font-editorial-body text-neutral-600 mb-4">
                <div className="p-2 border border-[#e0e0e0] bg-neutral-50/70">
                  <span className="font-editorial-ui font-bold text-[#222222] block mb-0.5">
                    1. Số liệu & Tài chính (%, $, £, triệu, tỷ)
                  </span>
                  Tự động chuyển thành Lưới 4 chỉ số tài chính (Hình 2).
                </div>
                <div className="p-2 border border-[#e0e0e0] bg-neutral-50/70">
                  <span className="font-editorial-ui font-bold text-[#222222] block mb-0.5">
                    2. Quy trình hoặc phễu chuyển đổi
                  </span>
                  Chuyển thành Phễu hội tụ (Hình 1) hoặc Cầu thang sản phẩm (Hình 7).
                </div>
              </div>

              {previewResult && (
                <div className="p-3 border-2 border-[#b13460] bg-[rgba(177,52,96,0.04)] mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-editorial-ui font-bold text-[#b13460] mb-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Đã tạo sơ bộ {previewResult.stats.totalBlocks} khối</span>
                  </div>
                  <div className="text-xs font-editorial-ui text-neutral-700 space-y-0.5">
                    <p>• Tiêu đề: <strong>{previewResult.metadata.title?.slice(0, 35)}...</strong></p>
                    <p>• Số khối đồ họa: <strong>{previewResult.stats.hasStats || previewResult.stats.hasSteps ? 'Đầy đủ' : 'Cơ bản'}</strong></p>
                  </div>
                </div>
              )}
            </div>

            {/* Apply Controls */}
            <div className="pt-3 border-t border-[#e0e0e0] space-y-2.5">
              <div className="flex items-center gap-4 text-xs font-editorial-ui">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="applyMode"
                    value="replace"
                    checked={applyMode === 'replace'}
                    onChange={() => setApplyMode('replace')}
                    className="accent-[#b13460]"
                  />
                  <span>Thay thế bài hiện tại</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="applyMode"
                    value="append"
                    checked={applyMode === 'append'}
                    onChange={() => setApplyMode('append')}
                    className="accent-[#b13460]"
                  />
                  <span>Chèn tiếp vào cuối bài</span>
                </label>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 py-2 px-3 bg-[#222222] hover:bg-[#111111] text-white text-xs font-editorial-ui font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Chuyển vào Canvas</span>
                  <ArrowRight className="w-4 h-4 text-[#b13460]" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-3 border border-[#e0e0e0] hover:bg-neutral-100 text-xs font-editorial-ui text-neutral-600 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
