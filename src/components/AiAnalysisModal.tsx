import React, { useState } from 'react';
import { EditorialBlock, StoryMetadata } from '../types/editorial';
import { Sparkles, CheckSquare, Square, Check, X, ArrowRight, Layers, Info, RefreshCw } from 'lucide-react';

export interface AiAnalysisResult {
  summary: string;
  engine: string;
  metadata: Partial<StoryMetadata>;
  recommendedBlocks: (EditorialBlock & { reasoning?: string })[];
}

interface AiAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: AiAnalysisResult | null;
  onApplyBlocks: (blocks: EditorialBlock[], metadata: Partial<StoryMetadata>, mode: 'replace' | 'append') => void;
  onReanalyze?: () => void;
  isAnalyzing?: boolean;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({
  isOpen,
  onClose,
  analysisResult,
  onApplyBlocks,
  onReanalyze,
  isAnalyzing = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>(() => {
    if (analysisResult?.recommendedBlocks) {
      const init: Record<string, boolean> = {};
      analysisResult.recommendedBlocks.forEach((b) => {
        init[b.id] = true;
      });
      return init;
    }
    return {};
  });

  const [applyMode, setApplyMode] = useState<'replace' | 'append'>('replace');

  // Sync selectedIds when analysisResult changes
  React.useEffect(() => {
    if (analysisResult?.recommendedBlocks) {
      const init: Record<string, boolean> = {};
      analysisResult.recommendedBlocks.forEach((b) => {
        init[b.id] = true;
      });
      setSelectedIds(init);
    }
  }, [analysisResult]);

  if (!isOpen) return null;

  const toggleSelectBlock = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (!analysisResult?.recommendedBlocks) return;
    const next: Record<string, boolean> = {};
    analysisResult.recommendedBlocks.forEach((b) => {
      next[b.id] = selectAll;
    });
    setSelectedIds(next);
  };

  const handleApply = () => {
    if (!analysisResult) return;
    const chosenBlocks = analysisResult.recommendedBlocks.filter((b) => selectedIds[b.id]);
    if (chosenBlocks.length === 0) return;
    onApplyBlocks(chosenBlocks, analysisResult.metadata, applyMode);
    onClose();
  };

  const selectedCount = Object.values(selectedIds).filter(Boolean).length;
  const totalCount = analysisResult?.recommendedBlocks.length || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-[#e0e0e0] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-none">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e0e0e0] flex items-center justify-between bg-neutral-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial-ui text-xs font-bold text-white px-2 py-0.5 bg-[#b13460] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Newsroom Engine</span>
              </span>
              <h2 className="font-editorial-serif text-lg sm:text-xl font-bold text-[#222222]">
                Kết quả Phân tích & Lựa chọn khối biên tập
              </h2>
            </div>
            <p className="font-editorial-body text-xs text-neutral-600 mt-1">
              AI đã đọc văn bản bài báo, trích xuất cấu trúc câu chuyện và đề xuất các khối trực quan tối ưu nhất.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onReanalyze && (
              <button
                onClick={onReanalyze}
                disabled={isAnalyzing}
                className="px-2.5 py-1 text-xs font-editorial-ui border border-[#e0e0e0] hover:bg-neutral-100 flex items-center gap-1 text-neutral-700 disabled:opacity-50"
                title="Phân tích lại"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Phân tích lại</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 border border-[#e0e0e0] hover:bg-neutral-200 text-neutral-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Summary Box */}
        {analysisResult?.summary && (
          <div className="p-3.5 sm:px-6 bg-[rgba(177,52,96,0.04)] border-b border-[#e0e0e0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-xs font-editorial-body text-neutral-800">
              <Info className="w-4 h-4 text-[#b13460] shrink-0 mt-0.5" />
              <div>
                <strong className="font-editorial-ui text-[#b13460] mr-1.5">Tóm lược bài báo:</strong>
                <span>{analysisResult.summary}</span>
              </div>
            </div>
            <div className="font-editorial-ui text-[11px] text-neutral-500 shrink-0">
              Động cơ: <strong className="text-neutral-700">{analysisResult.engine || 'Gemini'}</strong>
            </div>
          </div>
        )}

        {/* Selection Toolbar */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-50 border-b border-[#e0e0e0] flex items-center justify-between text-xs font-editorial-ui">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-800">
              Đã chọn: <strong className="text-[#b13460]">{selectedCount}</strong> / {totalCount} khối được gợi ý
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectAll(true)}
              className="text-[#b13460] hover:underline font-semibold"
            >
              Chọn tất cả
            </button>
            <span className="text-neutral-300">|</span>
            <button
              onClick={() => handleSelectAll(false)}
              className="text-neutral-500 hover:underline"
            >
              Bỏ chọn
            </button>
          </div>
        </div>

        {/* Recommended Blocks List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {analysisResult?.recommendedBlocks.map((block, index) => {
            const isChecked = !!selectedIds[block.id];
            return (
              <div
                key={block.id}
                onClick={() => toggleSelectBlock(block.id)}
                className={`p-4 border transition-all cursor-pointer select-none ${
                  isChecked
                    ? 'border-[#b13460] bg-[rgba(177,52,96,0.02)]'
                    : 'border-[#e0e0e0] opacity-60 hover:opacity-90 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-0.5 text-[#b13460] shrink-0">
                    {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-neutral-400" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {block.figureNumber && (
                        <span className="font-editorial-ui text-[10px] font-bold px-1.5 py-0.5 border border-[#b13460]/30 text-[#b13460] bg-[#b13460]/5">
                          {block.figureNumber}
                        </span>
                      )}
                      <span className="font-editorial-ui text-[11px] font-semibold text-neutral-500 uppercase">
                        {block.type.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h4 className="font-editorial-serif text-sm sm:text-base font-bold text-[#222222] mb-1">
                      {block.title || block.data?.title || block.data?.label || block.type}
                    </h4>

                    {block.subtitle && (
                      <p className="font-editorial-body text-xs text-neutral-600 mb-2">
                        {block.subtitle}
                      </p>
                    )}

                    {/* AI Reasoning explanation */}
                    {block.reasoning && (
                      <div className="p-2 bg-neutral-50 border-l-2 border-[#b13460] text-[11px] font-editorial-body text-neutral-700 mt-2">
                        <span className="font-editorial-ui font-bold text-[#b13460] mr-1">💡 Lý do AI đề xuất:</span>
                        <span>{block.reasoning}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#e0e0e0] bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-xs font-editorial-ui">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="aiApplyMode"
                value="replace"
                checked={applyMode === 'replace'}
                onChange={() => setApplyMode('replace')}
                className="accent-[#b13460]"
              />
              <span>Thay thế toàn bộ bài viết</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="aiApplyMode"
                value="append"
                checked={applyMode === 'append'}
                onChange={() => setApplyMode('append')}
                className="accent-[#b13460]"
              />
              <span>Chèn tiếp vào cuối bài</span>
            </label>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleApply}
              disabled={selectedCount === 0}
              className="flex-1 sm:flex-none py-2 px-5 bg-[#b13460] hover:bg-[#91254c] disabled:opacity-50 text-white text-xs font-editorial-ui font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Đưa {selectedCount} khối vào bài viết</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 border border-[#e0e0e0] hover:bg-neutral-200 text-xs font-editorial-ui text-neutral-600 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
