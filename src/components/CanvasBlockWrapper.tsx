import React from 'react';
import { EditorialBlock, BlockWidth, BlockTint } from '../types/editorial';
import { BlockRenderer } from './blocks/BlockRenderers';
import { ArrowUp, ArrowDown, Copy, Trash2, GripVertical, Maximize2, Minimize2, Palette } from 'lucide-react';

interface CanvasBlockWrapperProps {
  block: EditorialBlock;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onUpdateWidth: (width: BlockWidth) => void;
  onUpdateTint: (tint: BlockTint) => void;
  onUpdateBlockData: (dataPatch: Record<string, any>) => void;
  onUpdateBlockField: (field: keyof EditorialBlock, value: any) => void;
  isFirst: boolean;
  isLast: boolean;
}

export const CanvasBlockWrapper: React.FC<CanvasBlockWrapperProps> = ({
  block,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onUpdateWidth,
  onUpdateTint,
  onUpdateBlockData,
  onUpdateBlockField,
  isFirst,
  isLast,
}) => {
  const getWidthContainerClass = (width: BlockWidth) => {
    switch (width) {
      case 'boxed':
        return 'max-w-3xl mx-auto px-4 sm:px-6';
      case 'wide':
        return 'max-w-5xl mx-auto px-4 sm:px-6';
      case 'full':
        return 'w-full max-w-7xl mx-auto px-2 sm:px-4';
      default:
        return 'max-w-4xl mx-auto px-4';
    }
  };

  const nextWidth = (curr: BlockWidth): BlockWidth => {
    if (curr === 'boxed') return 'wide';
    if (curr === 'wide') return 'full';
    return 'boxed';
  };

  const nextTint = (curr: BlockTint): BlockTint => {
    if (curr === 'white') return 'neutral';
    if (curr === 'neutral') return 'rose';
    if (curr === 'rose') return 'dark';
    return 'white';
  };

  const getWidthLabel = (width: BlockWidth) => {
    if (width === 'boxed') return 'Boxed (768px)';
    if (width === 'wide') return 'Wide (1024px)';
    return 'Full (1280px)';
  };

  const getTintLabel = (tint: BlockTint) => {
    if (tint === 'white') return 'Nền trắng';
    if (tint === 'neutral') return 'Nền xám nhạt';
    if (tint === 'rose') return 'Nền hồng phấn';
    return 'Nền tối';
  };

  return (
    <div
      data-id={block.id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`relative group transition-all my-2 duration-150 ${
        isSelected
          ? 'ring-2 ring-[#b13460] ring-offset-2 z-10'
          : 'hover:ring-1 hover:ring-[#b13460]/40'
      }`}
    >
      {/* Floating Toolbar (appears on hover or when selected) */}
      <div
        className={`absolute -top-3.5 right-4 z-20 flex items-center bg-[#222222] text-white border border-[#444444] shadow-none py-1 px-1.5 gap-1 transition-opacity ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto'
        }`}
      >
        {/* Drag handle */}
        <span
          className="drag-handle p-1 hover:bg-[#333333] cursor-grab active:cursor-grabbing text-neutral-300"
          title="Kéo thả để sắp xếp lại vị trí"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </span>

        <span className="w-[1px] h-3.5 bg-[#444444] mx-0.5"></span>

        {/* Move Up */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveUp();
          }}
          disabled={isFirst}
          className="p-1 hover:bg-[#333333] disabled:opacity-30 disabled:hover:bg-transparent text-neutral-200"
          title="Di chuyển lên trên"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        {/* Move Down */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMoveDown();
          }}
          disabled={isLast}
          className="p-1 hover:bg-[#333333] disabled:opacity-30 disabled:hover:bg-transparent text-neutral-200"
          title="Di chuyển xuống dưới"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-3.5 bg-[#444444] mx-0.5"></span>

        {/* Width toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdateWidth(nextWidth(block.width));
          }}
          className="px-1.5 py-0.5 text-[11px] font-editorial-ui hover:bg-[#333333] text-neutral-200 flex items-center gap-1"
          title={`Đổi độ rộng (${getWidthLabel(block.width)})`}
        >
          <Maximize2 className="w-3 h-3 text-[#b13460]" />
          <span>{block.width}</span>
        </button>

        {/* Background Tint toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdateTint(nextTint(block.tint));
          }}
          className="px-1.5 py-0.5 text-[11px] font-editorial-ui hover:bg-[#333333] text-neutral-200 flex items-center gap-1"
          title={`Đổi màu nền (${getTintLabel(block.tint)})`}
        >
          <Palette className="w-3 h-3 text-[#b13460]" />
          <span>{block.tint}</span>
        </button>

        <span className="w-[1px] h-3.5 bg-[#444444] mx-0.5"></span>

        {/* Duplicate */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="p-1 hover:bg-[#333333] text-neutral-200"
          title="Nhân bản khối này"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-rose-950 text-rose-300"
          title="Xóa khối"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Block Content Container */}
      <div className={getWidthContainerClass(block.width)}>
        <BlockRenderer
          block={block}
          isEditable={true}
          onUpdateBlockData={onUpdateBlockData}
          onUpdateBlockField={onUpdateBlockField}
        />
      </div>
    </div>
  );
};
