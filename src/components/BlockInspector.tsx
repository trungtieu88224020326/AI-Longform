import React, { useState } from 'react';
import { EditorialBlock, BlockWidth, BlockTint, StoryMetadata } from '../types/editorial';
import { Settings, Sliders, Palette, Maximize, Type, AlignLeft, Info, FileSpreadsheet } from 'lucide-react';

interface BlockInspectorProps {
  selectedBlock: EditorialBlock | null;
  storyMetadata: StoryMetadata;
  onUpdateMetadata: (meta: Partial<StoryMetadata>) => void;
  onUpdateBlockField: (field: keyof EditorialBlock, value: any) => void;
  onUpdateBlockData: (dataPatch: Record<string, any>) => void;
  onSelectBlockById?: (id: string) => void;
}

export const BlockInspector: React.FC<BlockInspectorProps> = ({
  selectedBlock,
  storyMetadata,
  onUpdateMetadata,
  onUpdateBlockField,
  onUpdateBlockData,
}) => {
  const [inspectorTab, setInspectorTab] = useState<'block' | 'story'>('block');

  const widthOptions: { id: BlockWidth; label: string }[] = [
    { id: 'boxed', label: 'Boxed (768px)' },
    { id: 'wide', label: 'Wide (1024px)' },
    { id: 'full', label: 'Full (1280px)' },
  ];

  const tintOptions: { id: BlockTint; label: string; previewClass: string }[] = [
    { id: 'white', label: 'Trắng', previewClass: 'bg-white border-[#e0e0e0]' },
    { id: 'neutral', label: 'Xám nhạt', previewClass: 'bg-[#f8f9fa] border-[#e0e0e0]' },
    { id: 'rose', label: 'Hồng phấn', previewClass: 'bg-[#b13460]/10 border-[#b13460]/30' },
    { id: 'dark', label: 'Tối than', previewClass: 'bg-[#222222] border-neutral-700' },
  ];

  return (
    <aside className="w-80 sm:w-88 h-full bg-white border-l border-[#e0e0e0] flex flex-col shrink-0">
      {/* Inspector Tab Switcher */}
      <div className="p-3 border-b border-[#e0e0e0] bg-neutral-50/50">
        <div className="grid grid-cols-2 p-1 bg-neutral-200/70 text-xs font-editorial-ui font-semibold">
          <button
            onClick={() => setInspectorTab('block')}
            className={`py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
              inspectorTab === 'block'
                ? 'bg-white text-[#222222] shadow-none border border-[#e0e0e0]'
                : 'text-neutral-600 hover:text-[#222222]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#b13460]" />
            <span>Thuộc tính khối</span>
          </button>
          <button
            onClick={() => setInspectorTab('story')}
            className={`py-1.5 px-3 flex items-center justify-center gap-1.5 transition-colors ${
              inspectorTab === 'story'
                ? 'bg-white text-[#222222] shadow-none border border-[#e0e0e0]'
                : 'text-neutral-600 hover:text-[#222222]'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-[#b13460]" />
            <span>Cài đặt bài viết</span>
          </button>
        </div>
      </div>

      {/* Inspector Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {inspectorTab === 'block' ? (
          selectedBlock ? (
            <div className="space-y-5">
              {/* Block Header info */}
              <div className="p-3 bg-neutral-50 border border-[#e0e0e0]">
                <div className="flex items-center justify-between">
                  <span className="font-editorial-ui text-xs font-bold text-[#b13460]">
                    {selectedBlock.figureNumber || selectedBlock.type}
                  </span>
                  <span className="font-editorial-ui text-[11px] text-neutral-400">ID: {selectedBlock.id.slice(-6)}</span>
                </div>
                <div className="font-editorial-serif text-sm font-bold text-[#222222] mt-1 truncate">
                  {selectedBlock.title || selectedBlock.type}
                </div>
              </div>

              {/* Layout: Width */}
              <div>
                <label className="flex items-center gap-1.5 font-editorial-ui text-xs font-bold text-neutral-700 mb-2">
                  <Maximize className="w-3.5 h-3.5 text-[#b13460]" />
                  <span>Độ rộng khối (Width)</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {widthOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => onUpdateBlockField('width', opt.id)}
                      className={`py-1.5 px-2 text-xs font-editorial-ui border transition-colors ${
                        selectedBlock.width === opt.id
                          ? 'border-[#b13460] bg-[rgba(177,52,96,0.08)] text-[#b13460] font-bold'
                          : 'border-[#e0e0e0] text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {opt.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout: Background Tint */}
              <div>
                <label className="flex items-center gap-1.5 font-editorial-ui text-xs font-bold text-neutral-700 mb-2">
                  <Palette className="w-3.5 h-3.5 text-[#b13460]" />
                  <span>Sắc độ màu nền (Tint)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {tintOptions.map((tint) => (
                    <button
                      key={tint.id}
                      onClick={() => onUpdateBlockField('tint', tint.id)}
                      className={`p-2 border flex items-center gap-2 text-left transition-colors ${
                        selectedBlock.tint === tint.id
                          ? 'border-[#b13460] ring-1 ring-[#b13460]'
                          : 'border-[#e0e0e0] hover:border-neutral-300'
                      }`}
                    >
                      <span className={`w-4 h-4 border ${tint.previewClass}`}></span>
                      <span className="font-editorial-ui text-xs text-neutral-700">{tint.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Figure Labels and Titles */}
              {selectedBlock.type !== 'hero' && (
                <div className="space-y-3 pt-3 border-t border-[#e0e0e0]">
                  <div>
                    <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">
                      Ký hiệu hình (Figure Label)
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.figureNumber || ''}
                      onChange={(e) => onUpdateBlockField('figureNumber', e.target.value)}
                      placeholder="Ví dụ: Hình 1, Biểu đồ 2"
                      className="w-full px-2.5 py-1.5 text-xs font-editorial-ui border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#b13460]"
                    />
                  </div>

                  <div>
                    <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">
                      Tiêu đề khối (Title)
                    </label>
                    <input
                      type="text"
                      value={selectedBlock.title || ''}
                      onChange={(e) => onUpdateBlockField('title', e.target.value)}
                      placeholder="Tiêu đề biểu đồ / bảng"
                      className="w-full px-2.5 py-1.5 text-xs font-editorial-serif font-bold border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#b13460]"
                    />
                  </div>

                  <div>
                    <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">
                      Phụ đề / Diễn giải (Subtitle)
                    </label>
                    <textarea
                      rows={2}
                      value={selectedBlock.subtitle || ''}
                      onChange={(e) => onUpdateBlockField('subtitle', e.target.value)}
                      placeholder="Ý nghĩa hoặc thông điệp chính của khối"
                      className="w-full px-2.5 py-1.5 text-xs font-editorial-body border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#b13460]"
                    />
                  </div>
                </div>
              )}

              {/* Specific Content by Block Type */}
              <div className="space-y-3 pt-3 border-t border-[#e0e0e0]">
                <div className="font-editorial-ui text-xs font-bold text-[#b13460] uppercase tracking-wider">
                  Nội dung chi tiết
                </div>

                {/* Dropcap / Text */}
                {selectedBlock.type === 'dropcap_body' && (
                  <div>
                    <label className="block font-editorial-ui text-xs font-semibold text-neutral-700 mb-1">
                      Nội dung đoạn văn
                    </label>
                    <textarea
                      rows={5}
                      value={selectedBlock.data.content || ''}
                      onChange={(e) => onUpdateBlockData({ content: e.target.value })}
                      className="w-full p-2.5 text-xs font-editorial-body border border-[#e0e0e0] leading-relaxed focus:outline-none focus:border-[#b13460]"
                    />
                  </div>
                )}

                {/* Pullquote */}
                {selectedBlock.type === 'pullquote' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block font-editorial-ui text-xs font-semibold text-neutral-700 mb-1">
                        Nội dung trích dẫn
                      </label>
                      <textarea
                        rows={3}
                        value={selectedBlock.data.quote || ''}
                        onChange={(e) => onUpdateBlockData({ quote: e.target.value })}
                        className="w-full p-2 text-xs font-editorial-serif italic border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
                      />
                    </div>
                    <div>
                      <label className="block font-editorial-ui text-xs font-semibold text-neutral-700 mb-1">
                        Người phát ngôn
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.data.author || ''}
                        onChange={(e) => onUpdateBlockData({ author: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs font-editorial-ui border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
                      />
                    </div>
                    <div>
                      <label className="block font-editorial-ui text-xs font-semibold text-neutral-700 mb-1">
                        Chức vụ / Cơ quan
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.data.role || ''}
                        onChange={(e) => onUpdateBlockData({ role: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs font-editorial-ui border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
                      />
                    </div>
                  </div>
                )}

                {/* Block 2: Stats */}
                {selectedBlock.type === 'block_2_stats' && (
                  <div className="space-y-3">
                    <div className="p-2 border border-[#e0e0e0] bg-neutral-50/50">
                      <div className="font-editorial-ui text-xs font-bold text-neutral-700 mb-1">Chỉ số 1</div>
                      <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                        <input
                          type="text"
                          value={selectedBlock.data.stat1Value || ''}
                          onChange={(e) => onUpdateBlockData({ stat1Value: e.target.value })}
                          placeholder="Giá trị (1,2M)"
                          className="px-2 py-1 text-xs font-bold text-[#b13460] border border-[#e0e0e0] bg-white"
                        />
                        <input
                          type="text"
                          value={selectedBlock.data.stat1Label || ''}
                          onChange={(e) => onUpdateBlockData({ stat1Label: e.target.value })}
                          placeholder="Tên nhãn"
                          className="px-2 py-1 text-xs border border-[#e0e0e0] bg-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={selectedBlock.data.stat1Context || ''}
                        onChange={(e) => onUpdateBlockData({ stat1Context: e.target.value })}
                        placeholder="Bối cảnh giải thích"
                        className="w-full px-2 py-1 text-xs border border-[#e0e0e0] bg-white"
                      />
                    </div>

                    <div className="p-2 border border-[#e0e0e0] bg-neutral-50/50">
                      <div className="font-editorial-ui text-xs font-bold text-neutral-700 mb-1">Chỉ số 2</div>
                      <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                        <input
                          type="text"
                          value={selectedBlock.data.stat2Value || ''}
                          onChange={(e) => onUpdateBlockData({ stat2Value: e.target.value })}
                          placeholder="Giá trị (£380M)"
                          className="px-2 py-1 text-xs font-bold text-[#b13460] border border-[#e0e0e0] bg-white"
                        />
                        <input
                          type="text"
                          value={selectedBlock.data.stat2Label || ''}
                          onChange={(e) => onUpdateBlockData({ stat2Label: e.target.value })}
                          placeholder="Tên nhãn"
                          className="px-2 py-1 text-xs border border-[#e0e0e0] bg-white"
                        />
                      </div>
                      <input
                        type="text"
                        value={selectedBlock.data.stat2Context || ''}
                        onChange={(e) => onUpdateBlockData({ stat2Context: e.target.value })}
                        placeholder="Bối cảnh giải thích"
                        className="w-full px-2 py-1 text-xs border border-[#e0e0e0] bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Hero Fields */}
                {selectedBlock.type === 'hero' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block font-editorial-ui text-xs font-semibold text-neutral-700 mb-1">
                        Chuyên mục (Kicker)
                      </label>
                      <input
                        type="text"
                        value={selectedBlock.data.kicker || ''}
                        onChange={(e) => onUpdateBlockData({ kicker: e.target.value })}
                        className="w-full px-2 py-1 text-xs font-editorial-ui border border-[#e0e0e0]"
                      />
                    </div>
                    <div>
                      <label className="block font-editorial-ui text-xs font-semibold text-neutral-700 mb-1">
                        Tiêu đề chính
                      </label>
                      <textarea
                        rows={2}
                        value={selectedBlock.data.title || ''}
                        onChange={(e) => onUpdateBlockData({ title: e.target.value })}
                        className="w-full px-2 py-1 text-xs font-editorial-serif font-bold border border-[#e0e0e0]"
                      />
                    </div>
                    <div>
                      <label className="block font-editorial-ui text-xs font-semibold text-neutral-700 mb-1">
                        Sapo / Dek
                      </label>
                      <textarea
                        rows={3}
                        value={selectedBlock.data.dek || ''}
                        onChange={(e) => onUpdateBlockData({ dek: e.target.value })}
                        className="w-full px-2 py-1 text-xs font-editorial-body border border-[#e0e0e0]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Source Note & Caption */}
              <div className="space-y-3 pt-3 border-t border-[#e0e0e0]">
                <div>
                  <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">
                    Ghi chú nguồn dữ liệu (Source Note)
                  </label>
                  <input
                    type="text"
                    value={selectedBlock.sourceNote || ''}
                    onChange={(e) => onUpdateBlockField('sourceNote', e.target.value)}
                    placeholder="Ví dụ: Nguồn: Báo cáo thường niên 2026"
                    className="w-full px-2.5 py-1.5 text-xs font-editorial-body italic border border-[#e0e0e0] bg-white focus:outline-none focus:border-[#b13460]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-500 font-editorial-body text-xs space-y-2">
              <Info className="w-6 h-6 mx-auto text-neutral-400 mb-2" />
              <p className="font-semibold text-neutral-700 font-editorial-ui">Chưa chọn khối nào</p>
              <p>Nhấp vào bất kỳ khối nào trên canvas ở giữa để tùy chỉnh nội dung và hình thức.</p>
            </div>
          )
        ) : (
          /* Story Metadata Settings */
          <div className="space-y-4">
            <div>
              <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">
                Tiêu đề toàn bài
              </label>
              <textarea
                rows={2}
                value={storyMetadata.title}
                onChange={(e) => onUpdateMetadata({ title: e.target.value })}
                className="w-full p-2 text-xs font-editorial-serif font-bold border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
              />
            </div>

            <div>
              <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">
                Sapo / Tóm lược (Dek)
              </label>
              <textarea
                rows={3}
                value={storyMetadata.dek}
                onChange={(e) => onUpdateMetadata({ dek: e.target.value })}
                className="w-full p-2 text-xs font-editorial-body border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
              />
            </div>

            <div>
              <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">
                Chuyên mục (Kicker)
              </label>
              <input
                type="text"
                value={storyMetadata.kicker}
                onChange={(e) => onUpdateMetadata({ kicker: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs font-editorial-ui border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">Tác giả</label>
                <input
                  type="text"
                  value={storyMetadata.author}
                  onChange={(e) => onUpdateMetadata({ author: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-editorial-ui border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
                />
              </div>
              <div>
                <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">Thời gian đọc</label>
                <input
                  type="text"
                  value={storyMetadata.readTime}
                  onChange={(e) => onUpdateMetadata({ readTime: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs font-editorial-ui border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
                />
              </div>
            </div>

            <div>
              <label className="block font-editorial-ui text-xs font-bold text-neutral-700 mb-1">Ngày xuất bản</label>
              <input
                type="text"
                value={storyMetadata.publishDate}
                onChange={(e) => onUpdateMetadata({ publishDate: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs font-editorial-ui border border-[#e0e0e0] focus:outline-none focus:border-[#b13460]"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
