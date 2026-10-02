import React, { useState, useEffect, useRef } from 'react';
import Sortable from 'sortablejs';
import { DEFAULT_BLOCKS, DEFAULT_METADATA, SAMPLE_RAW_TEXT } from './data/sampleStory';
import { BLOCK_TEMPLATES, BlockDefinition } from './data/blockTemplates';
import { EditorialBlock, StoryMetadata, BlockWidth, BlockTint } from './types/editorial';
import { parseRawEditorialText, ParseResult } from './utils/textParser';
import { generateStandaloneHTML } from './utils/htmlExporter';
import { SidebarLibrary } from './components/SidebarLibrary';
import { BlockInspector } from './components/BlockInspector';
import { CanvasBlockWrapper } from './components/CanvasBlockWrapper';
import { IngestionDrawer } from './components/IngestionDrawer';
import { ExportModal } from './components/ExportModal';
import { AiAnalysisModal, AiAnalysisResult } from './components/AiAnalysisModal';
import {
  FileCode,
  Download,
  Upload,
  BookOpen,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Plus,
  RefreshCw,
  Sparkles,
  Layers,
  Loader2,
} from 'lucide-react';

export default function App() {
  const [blocks, setBlocks] = useState<EditorialBlock[]>(DEFAULT_BLOCKS);
  const [metadata, setMetadata] = useState<StoryMetadata>(DEFAULT_METADATA);
  const [rawText, setRawText] = useState<string>(SAMPLE_RAW_TEXT);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('block-1');

  // UI Modals & Drawers
  const [isIngestionOpen, setIsIngestionOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // AI Analysis State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AiAnalysisResult | null>(null);

  const canvasListRef = useRef<HTMLDivElement>(null);

  // Initialize SortableJS
  useEffect(() => {
    if (!canvasListRef.current) return;
    const sortableInstance = Sortable.create(canvasListRef.current, {
      handle: '.drag-handle',
      animation: 180,
      ghostClass: 'opacity-40',
      onEnd: (evt) => {
        if (evt.oldIndex !== undefined && evt.newIndex !== undefined && evt.oldIndex !== evt.newIndex) {
          setBlocks((prev) => {
            const updated = Array.from(prev);
            const [moved] = updated.splice(evt.oldIndex!, 1);
            updated.splice(evt.newIndex!, 0, moved);
            return updated;
          });
        }
      },
    });

    return () => {
      sortableInstance.destroy();
    };
  }, [blocks.length]);

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) || null;

  // Handlers for canvas operations
  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;
    setBlocks((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleDuplicateBlock = (index: number) => {
    const blockToCopy = blocks[index];
    const newBlock: EditorialBlock = {
      ...blockToCopy,
      id: `${blockToCopy.type}-${Date.now()}`,
      title: blockToCopy.title ? `${blockToCopy.title} (Bản sao)` : undefined,
    };
    setBlocks((prev) => {
      const updated = [...prev];
      updated.splice(index + 1, 0, newBlock);
      return updated;
    });
    setSelectedBlockId(newBlock.id);
  };

  const handleDeleteBlock = (id: string) => {
    if (blocks.length <= 1) return;
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(blocks[0]?.id || null);
    }
  };

  const handleUpdateBlockField = (field: keyof EditorialBlock, value: any) => {
    if (!selectedBlockId) return;
    setBlocks((prev) =>
      prev.map((b) => (b.id === selectedBlockId ? { ...b, [field]: value } : b))
    );
  };

  const handleUpdateBlockData = (dataPatch: Record<string, any>) => {
    if (!selectedBlockId) return;
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === selectedBlockId ? { ...b, data: { ...b.data, ...dataPatch } } : b
      )
    );
  };

  const handleAddBlockFromLibrary = (template: BlockDefinition) => {
    const newId = `${template.type}-${Date.now()}`;
    const newBlock = template.defaultData(newId);
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newId);
  };

  const handleApplyParsedStory = (result: ParseResult, mode: 'replace' | 'append') => {
    if (mode === 'replace') {
      setBlocks(result.blocks);
      setMetadata((prev) => ({
        ...prev,
        ...result.metadata,
      }));
      setSelectedBlockId(result.blocks[0]?.id || null);
    } else {
      setBlocks((prev) => [...prev, ...result.blocks]);
    }
  };

  const handleLoadSampleOneCMS = () => {
    setRawText(SAMPLE_RAW_TEXT);
    setBlocks(DEFAULT_BLOCKS);
    setMetadata(DEFAULT_METADATA);
    setSelectedBlockId('block-1');
  };

  // Run AI Analysis & Selection
  const handleRunAiAnalysis = async (textOverride?: string) => {
    const textToAnalyze = textOverride || rawText;
    if (!textToAnalyze.trim()) return;

    setIsAiAnalyzing(true);

    try {
      const res = await fetch('/api/ai-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Lỗi khi gọi AI phân tích.');
      }

      setAiAnalysisResult(data);
      setIsAiModalOpen(true);
    } catch (err: any) {
      console.warn('AI analysis call error, generating local fallback:', err);
      // Fallback
      const parsed = parseRawEditorialText(textToAnalyze);
      const fallbackResult: AiAnalysisResult = {
        summary: 'Phân tích tự động cấu trúc bài báo và phát hiện các khối đồ họa phù hợp.',
        engine: 'Smart Newsroom Heuristic',
        metadata: parsed.metadata,
        recommendedBlocks: parsed.blocks.map((b) => ({
          ...b,
          reasoning: 'Khối đồ họa được tạo phù hợp với nội dung đoạn văn tương ứng.',
        })),
      };
      setAiAnalysisResult(fallbackResult);
      setIsAiModalOpen(true);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  // Apply selected blocks from AI Analysis Modal
  const handleApplyAiBlocks = (
    chosenBlocks: EditorialBlock[],
    newMetadata: Partial<StoryMetadata>,
    mode: 'replace' | 'append'
  ) => {
    if (mode === 'replace') {
      setBlocks(chosenBlocks);
      setMetadata((prev) => ({
        ...prev,
        ...newMetadata,
      }));
      setSelectedBlockId(chosenBlocks[0]?.id || null);
    } else {
      setBlocks((prev) => [...prev, ...chosenBlocks]);
    }
  };

  // Generate exported standalone HTML
  const standaloneHTML = generateStandaloneHTML(metadata, blocks);

  // Compute container simulation width
  const getCanvasViewportClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[420px] shadow-sm my-6 border border-[#e0e0e0] bg-white';
      case 'tablet':
        return 'max-w-[780px] shadow-sm my-6 border border-[#e0e0e0] bg-white';
      case 'desktop':
      default:
        return 'w-full max-w-[1240px] my-6 bg-white border border-[#e0e0e0]';
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f4f5f6] text-[#222222]">
      {/* 1. TOP BAR CONTRACT: Zone 1 (Brand) - Zone 2 (Navigation/Controls) - Zone 3 (Primary Actions) */}
      <header className="h-14 border-b border-[#e0e0e0] bg-white px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#b13460]"></span>
            <span className="font-editorial-serif text-base sm:text-lg font-bold tracking-tight text-[#222222]">
              The Editorial Builder
            </span>
          </div>
          <span className="text-neutral-300 font-light">|</span>
          <span className="font-editorial-ui text-xs text-neutral-500 hidden md:inline">
            Hệ thống 18 khối báo chí tương tác
          </span>
        </div>

        {/* Zone 2: Device Viewport Switcher */}
        <div className="hidden sm:flex items-center gap-1 p-0.5 bg-neutral-100 border border-[#e0e0e0]">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-2.5 py-1 text-xs font-editorial-ui flex items-center gap-1.5 transition-colors ${
              viewportMode === 'desktop'
                ? 'bg-white text-[#222222] font-semibold border border-[#e0e0e0]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="Màn hình Máy tính (Desktop)"
          >
            <Monitor className="w-3.5 h-3.5 text-[#b13460]" />
            <span className="hidden lg:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`px-2.5 py-1 text-xs font-editorial-ui flex items-center gap-1.5 transition-colors ${
              viewportMode === 'tablet'
                ? 'bg-white text-[#222222] font-semibold border border-[#e0e0e0]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="Màn hình Máy tính bảng (Tablet 768px)"
          >
            <Tablet className="w-3.5 h-3.5 text-[#b13460]" />
            <span className="hidden lg:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-2.5 py-1 text-xs font-editorial-ui flex items-center gap-1.5 transition-colors ${
              viewportMode === 'mobile'
                ? 'bg-white text-[#222222] font-semibold border border-[#e0e0e0]'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            title="Màn hình Di động (Mobile 390px)"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#b13460]" />
            <span className="hidden lg:inline">Mobile</span>
          </button>
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          {/* AI Analysis Trigger Button */}
          <button
            onClick={() => handleRunAiAnalysis()}
            disabled={isAiAnalyzing || !rawText.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-editorial-ui bg-[#b13460] hover:bg-[#91254c] disabled:opacity-50 text-white font-semibold transition-colors"
            title="AI đọc bài báo và đề xuất các khối trực quan"
          >
            {isAiAnalyzing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>AI Chọn khối</span>
          </button>

          <button
            onClick={() => setIsIngestionOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-editorial-ui border border-[#e0e0e0] bg-white hover:bg-neutral-50 text-neutral-700 font-semibold transition-colors"
            title="Mở giao diện tiếp nhận bài báo hoặc dán link"
          >
            <Upload className="w-3.5 h-3.5 text-[#b13460]" />
            <span className="hidden sm:inline">Tiếp nhận bài (Bước 1)</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-editorial-ui bg-[#222222] hover:bg-[#111111] text-white font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#b13460]" />
            <span>Xuất HTML5</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN 3-PANE WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Block Library & Editable Source Text */}
        <SidebarLibrary
          onAddBlock={handleAddBlockFromLibrary}
          rawSourceText={rawText}
          onUpdateSourceText={setRawText}
          onTriggerAiAnalysis={() => handleRunAiAnalysis()}
          isAiAnalyzing={isAiAnalyzing}
        />

        {/* Center Canvas: Interactive Canva-like Longform Canvas */}
        <main
          onClick={() => setSelectedBlockId(null)}
          className="flex-1 overflow-y-auto overflow-x-hidden bg-[#eef0f2] flex flex-col items-center p-3 sm:p-6"
        >
          {/* Canvas Sub-bar */}
          <div className="w-full max-w-[1240px] flex items-center justify-between text-xs font-editorial-ui text-neutral-500 mb-2 px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-neutral-800">{metadata.kicker}</span>
              <span>·</span>
              <span>{blocks.length} khối nội dung</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                Kéo thả biểu tượng ⋮⋮ để đổi thứ tự, nhấp để chỉnh sửa trực tiếp
              </span>
            </div>
          </div>

          {/* Actual Article Canvas Frame */}
          <div className={`${getCanvasViewportClass()} transition-all duration-200 min-h-[90vh]`}>
            {/* Inner article boundary */}
            <article className="p-4 sm:p-8 md:p-12">
              <div ref={canvasListRef} className="space-y-4">
                {blocks.map((block, index) => (
                  <CanvasBlockWrapper
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onSelect={() => setSelectedBlockId(block.id)}
                    onMoveUp={() => handleMoveBlock(index, 'up')}
                    onMoveDown={() => handleMoveBlock(index, 'down')}
                    onDuplicate={() => handleDuplicateBlock(index)}
                    onDelete={() => handleDeleteBlock(block.id)}
                    onUpdateWidth={(w) => {
                      setSelectedBlockId(block.id);
                      handleUpdateBlockField('width', w);
                    }}
                    onUpdateTint={(t) => {
                      setSelectedBlockId(block.id);
                      handleUpdateBlockField('tint', t);
                    }}
                    onUpdateBlockData={(patch) => {
                      setSelectedBlockId(block.id);
                      handleUpdateBlockData(patch);
                    }}
                    onUpdateBlockField={(field, val) => {
                      setSelectedBlockId(block.id);
                      handleUpdateBlockField(field, val);
                    }}
                    isFirst={index === 0}
                    isLast={index === blocks.length - 1}
                  />
                ))}
              </div>

              {/* End of story indicator & Quick Add button */}
              <div className="mt-12 pt-8 border-t border-[#e0e0e0] flex flex-col items-center justify-center text-center">
                <div className="w-12 h-0.5 bg-[#b13460] mb-4"></div>
                <p className="font-editorial-serif text-sm font-bold text-neutral-800">
                  Hết nội dung chuyên đề
                </p>
                <p className="font-editorial-body text-xs text-neutral-500 mt-1 mb-4">
                  Xuất bản dưới quy chuẩn thiết kế báo chí hiện đại The Economist.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunAiAnalysis()}
                    className="px-4 py-2 bg-[#b13460] text-white hover:bg-[#91254c] text-xs font-editorial-ui font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Phân tích chọn thêm khối</span>
                  </button>
                  <button
                    onClick={() => setIsIngestionOpen(true)}
                    className="px-4 py-2 border border-[#e0e0e0] hover:border-[#b13460] bg-white text-xs font-editorial-ui text-[#222222] font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#b13460]" />
                    <span>Chèn thêm đoạn văn bản mới</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </main>

        {/* Right Sidebar: Block Inspector & Story Settings */}
        <BlockInspector
          selectedBlock={selectedBlock}
          storyMetadata={metadata}
          onUpdateMetadata={(patch) => setMetadata((prev) => ({ ...prev, ...patch }))}
          onUpdateBlockField={handleUpdateBlockField}
          onUpdateBlockData={handleUpdateBlockData}
        />
      </div>

      {/* Ingestion & Analysis Drawer Modal */}
      <IngestionDrawer
        isOpen={isIngestionOpen}
        onClose={() => setIsIngestionOpen(false)}
        onApplyParsedStory={handleApplyParsedStory}
        currentRawText={rawText}
        onUpdateRawText={setRawText}
        onTriggerAiAnalysis={(textToAnalyze) => handleRunAiAnalysis(textToAnalyze)}
        isAiAnalyzing={isAiAnalyzing}
      />

      {/* AI Analysis & Block Selection Modal */}
      <AiAnalysisModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        analysisResult={aiAnalysisResult}
        onApplyBlocks={handleApplyAiBlocks}
        onReanalyze={() => handleRunAiAnalysis()}
        isAnalyzing={isAiAnalyzing}
      />

      {/* Standalone HTML Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        htmlContent={standaloneHTML}
      />
    </div>
  );
}
