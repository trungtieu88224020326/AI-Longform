import React, { useState } from 'react';
import { EditorialBlock, BlockTint } from '../../types/editorial';
import { Play, Pause, Volume2, CheckSquare, Square, ArrowDown, ChevronRight, Clock, ShieldCheck, Layers, Award } from 'lucide-react';

interface BlockRendererProps {
  block: EditorialBlock;
  isEditable?: boolean;
  onUpdateBlockData?: (dataPatch: Record<string, any>) => void;
  onUpdateBlockField?: (field: keyof EditorialBlock, value: any) => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isEditable = false,
  onUpdateBlockData,
  onUpdateBlockField,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() => {
    if (block.type === 'block_16_strategic_checklist' && block.data.questions) {
      const initial: Record<string, boolean> = {};
      block.data.questions.forEach((q: any) => {
        initial[q.id] = q.checked ?? false;
      });
      return initial;
    }
    return {};
  });

  const getTintBgClass = (tint: BlockTint) => {
    switch (tint) {
      case 'neutral':
        return 'bg-[#f8f9fa] text-[#222222] border border-[#e0e0e0]';
      case 'rose':
        return 'bg-[rgba(177,52,96,0.06)] text-[#222222] border border-[#b13460]/20';
      case 'dark':
        return 'bg-[#222222] text-[#f8f9fa] border border-[#333333]';
      case 'white':
      default:
        return 'bg-[#ffffff] text-[#222222] border border-[#e0e0e0]';
    }
  };

  const isDark = block.tint === 'dark';

  const renderFigureHeader = () => {
    if (!block.title && !block.figureNumber) return null;
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          {block.figureNumber && (
            <span
              className={`font-editorial-ui text-xs font-semibold px-2 py-0.5 border ${
                isDark
                  ? 'border-[#b13460] text-[#f8f9fa] bg-[#b13460]/20'
                  : 'border-[#b13460] text-[#b13460] bg-[rgba(177,52,96,0.06)]'
              }`}
            >
              {block.figureNumber}
            </span>
          )}
          {block.title && (
            <h3
              className={`font-editorial-serif text-xl sm:text-2xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-[#222222]'
              }`}
            >
              {block.title}
            </h3>
          )}
        </div>
        {block.subtitle && (
          <p
            className={`font-editorial-body text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            {block.subtitle}
          </p>
        )}
      </div>
    );
  };

  const renderFigureFooter = () => {
    if (!block.sourceNote && !block.caption) return null;
    return (
      <div
        className={`mt-6 pt-3 border-t text-xs font-editorial-body flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 ${
          isDark ? 'border-neutral-700 text-neutral-400' : 'border-[#e0e0e0] text-neutral-500'
        }`}
      >
        {block.caption && <span>{block.caption}</span>}
        {block.sourceNote && <span className="italic">{block.sourceNote}</span>}
      </div>
    );
  };

  // Render individual block types
  switch (block.type) {
    case 'hero':
      return (
        <header className="py-8 sm:py-12 border-b border-[#e0e0e0]">
          {block.data.kicker && (
            <div className="mb-4">
              <span className="font-editorial-ui text-xs sm:text-sm font-semibold text-[#b13460] tracking-wide inline-block border-b-2 border-[#b13460] pb-1">
                {block.data.kicker}
              </span>
            </div>
          )}
          <h1 className="font-editorial-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#222222] leading-[1.18] tracking-tight mb-6">
            {block.data.title || 'Tiêu đề bài viết phân tích chuyên sâu'}
          </h1>
          {block.data.dek && (
            <p className="font-editorial-body text-lg sm:text-xl text-neutral-700 leading-relaxed mb-6 font-normal">
              {block.data.dek}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm font-editorial-ui text-neutral-500 pt-4 border-t border-[#e0e0e0]">
            {block.data.author && <span className="font-semibold text-[#222222]">{block.data.author}</span>}
            {block.data.publishDate && (
              <>
                <span className="text-neutral-300">·</span>
                <span>{block.data.publishDate}</span>
              </>
            )}
            {block.data.readTime && (
              <>
                <span className="text-neutral-300">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#b13460]" />
                  {block.data.readTime}
                </span>
              </>
            )}
          </div>
        </header>
      );

    case 'audio_bar':
      return (
        <section
          aria-label="Thanh nghe bài viết"
          className="my-6 p-4 bg-[rgba(177,52,96,0.06)] border border-[#b13460]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-10 h-10 flex items-center justify-center bg-[#b13460] text-white hover:bg-[#91254c] transition-colors shrink-0"
              title={isPlayingAudio ? 'Tạm dừng' : 'Nghe audio'}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-editorial-ui text-xs font-semibold text-[#b13460] px-1.5 py-0.5 bg-[#b13460]/10 border border-[#b13460]/20">
                  Audio Edition
                </span>
                <span className="font-editorial-ui text-xs text-neutral-500">{block.data.duration || '12 phút'}</span>
              </div>
              <p className="font-editorial-serif text-sm font-semibold text-[#222222] mt-0.5">
                {block.data.label || 'Nghe bản thu âm bài viết dành cho độc giả bận rộn'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-editorial-ui text-neutral-600 sm:self-center">
            <Volume2 className="w-4 h-4 text-[#b13460] shrink-0" />
            <span className="truncate max-w-[200px]">{block.data.narrator || 'Giọng đọc Biên tập viên chuẩn mực'}</span>
          </div>
        </section>
      );

    case 'dropcap_body':
      return (
        <div className="my-6">
          <p
            className={`font-editorial-body text-base sm:text-lg leading-[1.8] text-[#222222] ${
              block.data.noDropCap ? '' : 'editorial-drop-cap'
            }`}
          >
            {block.data.content ||
              'Tại trụ sở The Economist tại London, triết lý xuất bản không bắt đầu bằng câu hỏi "Chuyện gì vừa xảy ra cách đây 5 phút?".'}
          </p>
        </div>
      );

    case 'pullquote':
      return (
        <blockquote className="my-8 py-5 px-6 sm:px-8 border-l-4 border-[#b13460] bg-[rgba(177,52,96,0.03)] border-t border-r border-b border-[#e0e0e0]">
          <p className="font-editorial-serif text-lg sm:text-2xl italic text-[#222222] leading-snug mb-3">
            "{block.data.quote || 'Chúng tôi bán thời gian tiết kiệm cho những người bận rộn và góc nhìn thấu suốt.'}"
          </p>
          {(block.data.author || block.data.role) && (
            <div className="font-editorial-ui text-xs sm:text-sm text-neutral-600 flex items-center gap-2">
              <span className="font-bold text-[#b13460]">{block.data.author || 'Tác giả'}</span>
              {block.data.role && (
                <>
                  <span className="text-neutral-300">/</span>
                  <span className="text-neutral-500">{block.data.role}</span>
                </>
              )}
            </div>
          )}
        </blockquote>
      );

    case 'section_divider':
      return (
        <div className="my-10 pt-8 border-t-2 border-[#222222]">
          <span className="font-editorial-ui text-xs font-semibold text-[#b13460] tracking-wide block mb-1">
            {block.data.label || 'Chuyên mục tiếp theo'}
          </span>
          <h2 className="font-editorial-serif text-2xl sm:text-3xl font-bold text-[#222222]">
            {block.data.title || 'Chiến lược sản phẩm và chuyển đổi số'}
          </h2>
        </div>
      );

    // BLOCK 1: Phễu hội tụ thông tin 3 tầng
    case 'block_1_funnel':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="space-y-4 max-w-3xl mx-auto">
            {/* Level 1 */}
            <div
              className={`p-5 border transition-all ${
                isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-editorial-ui text-xs font-semibold text-neutral-500">
                  {block.data.level1Tag || 'Đầu vào đại chúng'}
                </span>
                <span className="font-editorial-ui text-xs px-2 py-0.5 border border-neutral-300 text-neutral-600">
                  Phạm vi rộng
                </span>
              </div>
              <h4 className="font-editorial-serif text-lg font-bold text-[#b13460] mb-1">
                {block.data.level1Title || 'Tầng 1: Tin tức rời rạc toàn cầu'}
              </h4>
              <p className={`font-editorial-body text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                {block.data.level1Desc ||
                  'Dòng sự kiện hàng ngày, phát ngôn ngoại giao, biến động thị trường và thông cáo báo chí từ khắp nơi.'}
              </p>
            </div>

            <div className="flex justify-center text-[#b13460]">
              <ArrowDown className="w-5 h-5 animate-pulse" />
            </div>

            {/* Level 2 */}
            <div
              className={`p-5 border transition-all ${
                isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-editorial-ui text-xs font-semibold text-[#b13460]">
                  {block.data.level2Tag || 'Bộ lọc biên tập'}
                </span>
                <span className="font-editorial-ui text-xs px-2 py-0.5 border border-[#b13460]/30 text-[#b13460] bg-[#b13460]/5">
                  Thẩm định sâu
                </span>
              </div>
              <h4 className="font-editorial-serif text-lg font-bold text-[#b13460] mb-1">
                {block.data.level2Title || 'Tầng 2: Bối cảnh hóa & Phân tích đa chiều'}
              </h4>
              <p className={`font-editorial-body text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                {block.data.level2Desc ||
                  'Đối chiếu lịch sử, kiểm chứng số liệu kinh tế và loại bỏ các yếu tố suy diễn cảm tính ngắn hạn.'}
              </p>
            </div>

            <div className="flex justify-center text-[#b13460]">
              <ArrowDown className="w-5 h-5 animate-pulse" />
            </div>

            {/* Level 3 */}
            <div className="p-6 border-2 border-[#b13460] bg-[rgba(177,52,96,0.08)]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-editorial-ui text-xs font-bold text-[#b13460]">
                  {block.data.level3Tag || 'Giá trị thu phí'}
                </span>
                <span className="font-editorial-ui text-xs px-2.5 py-0.5 bg-[#b13460] text-white font-semibold">
                  Quyết định hành động
                </span>
              </div>
              <h4 className="font-editorial-serif text-xl font-bold text-[#b13460] mb-1">
                {block.data.level3Title || 'Tầng 3: Thấu hiểu chiến lược & Định hướng'}
              </h4>
              <p className={`font-editorial-body text-sm font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                {block.data.level3Desc ||
                  'Góc nhìn độc quyền, dự phóng tác động chính sách và khuyến nghị then chốt giúp độc giả ra quyết định.'}
              </p>
            </div>
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 2: Lưới 4 chỉ số tài chính chủ chốt
    case 'block_2_stats':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { val: block.data.stat1Value, label: block.data.stat1Label, ctx: block.data.stat1Context },
              { val: block.data.stat2Value, label: block.data.stat2Label, ctx: block.data.stat2Context },
              { val: block.data.stat3Value, label: block.data.stat3Label, ctx: block.data.stat3Context },
              { val: block.data.stat4Value, label: block.data.stat4Label, ctx: block.data.stat4Context },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-5 border flex flex-col justify-between ${
                  isDark ? 'border-neutral-700 bg-neutral-800/80' : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div>
                  <div className="font-editorial-ui text-3xl sm:text-4xl font-bold text-[#b13460] tabular-nums mb-1 tracking-tight">
                    {stat.val || '0'}
                  </div>
                  <div
                    className={`font-editorial-ui text-sm font-semibold mb-3 ${
                      isDark ? 'text-white' : 'text-[#222222]'
                    }`}
                  >
                    {stat.label || 'Chỉ số'}
                  </div>
                </div>
                <div
                  className={`pt-3 border-t font-editorial-body text-xs leading-relaxed ${
                    isDark ? 'border-neutral-700 text-neutral-400' : 'border-[#e0e0e0] text-neutral-600'
                  }`}
                >
                  {stat.ctx || 'Bối cảnh ghi nhận.'}
                </div>
              </div>
            ))}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 3: Di sản thương hiệu & Báo chí vô danh (Split 30/70)
    case 'block_3_heritage':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 items-stretch">
            {/* 30% Column: Heritage */}
            <div
              className={`md:col-span-3 p-6 border flex flex-col justify-between ${
                isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#b13460]/20 bg-[rgba(177,52,96,0.05)]'
              }`}
            >
              <div>
                <span className="font-editorial-ui text-xs font-bold text-[#b13460] border-b border-[#b13460] pb-1 inline-block mb-3">
                  {block.data.yearBadge || 'Thành lập 1843'}
                </span>
                <h4 className="font-editorial-serif text-lg font-bold text-[#222222] dark:text-white mb-2">
                  {block.data.heritageTitle || 'Di sản tự do thương mại'}
                </h4>
                <p className={`font-editorial-body text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {block.data.heritageText ||
                    'Được sáng lập tại London để đấu tranh cho tự do thương mại và tư duy logic không nhân nhượng.'}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[#e0e0e0] dark:border-neutral-700 font-editorial-ui text-xs text-neutral-500">
                180+ năm xuất bản liên tục
              </div>
            </div>

            {/* 70% Column: Collective Anonymity */}
            <div
              className={`md:col-span-7 p-6 border flex flex-col justify-between ${
                isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
              }`}
            >
              <div>
                <h4 className="font-editorial-serif text-xl font-bold text-[#b13460] mb-3">
                  {block.data.anonymousTitle || 'Nguyên lý tiếng nói tập thể (Collective Voice)'}
                </h4>
                <p className={`font-editorial-body text-sm sm:text-base leading-relaxed mb-6 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  {block.data.anonymousText ||
                    'Các bài báo không có dòng tên tác giả (byline). Toàn bộ ấn phẩm nói bằng một giọng văn nhất quán, bảo đảm bài phân tích là kết tinh trí tuệ của cả hội đồng biên tập.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e0e0e0] dark:border-neutral-700">
                {[block.data.tag1, block.data.tag2, block.data.tag3].filter(Boolean).map((t, i) => (
                  <span
                    key={i}
                    className="font-editorial-ui text-xs font-semibold px-2.5 py-1 border border-[#e0e0e0] dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-neutral-900"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 4: Lưới 6 thành phần Hào lũy biên tập (2x3 grid + conclusion)
    case 'block_4_moat':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {(block.data.items || []).map((item: any, i: number) => (
              <div
                key={i}
                className={`p-5 border ${
                  isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div className="font-editorial-ui text-xs font-bold text-[#b13460] mb-2">{item.num}</div>
                <h4 className="font-editorial-serif text-base font-bold text-[#222222] dark:text-white mb-1.5">
                  {item.name}
                </h4>
                <p className={`font-editorial-body text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          {block.data.conclusion && (
            <div className="p-4 border-l-4 border-[#b13460] bg-[rgba(177,52,96,0.06)] border-t border-r border-b border-[#e0e0e0] dark:border-neutral-700">
              <p className="font-editorial-serif text-sm font-semibold text-[#b13460] leading-relaxed">
                {block.data.conclusion}
              </p>
            </div>
          )}
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 5: Ma trận 4 đặc điểm tư duy độc giả (2x2 cards)
    case 'block_5_mindset':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: block.data.card1Title, desc: block.data.card1Desc, icon: '01' },
              { title: block.data.card2Title, desc: block.data.card2Desc, icon: '02' },
              { title: block.data.card3Title, desc: block.data.card3Desc, icon: '03' },
              { title: block.data.card4Title, desc: block.data.card4Desc, icon: '04' },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-6 border ${
                  isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-editorial-ui text-xs font-bold text-[#b13460] px-2 py-0.5 border border-[#b13460]/20 bg-[#b13460]/5">
                    Đặc điểm {card.icon}
                  </span>
                  <span className="font-editorial-ui text-xs text-neutral-400">Trọng tâm</span>
                </div>
                <h4 className="font-editorial-serif text-lg font-bold text-[#222222] dark:text-white mb-2">
                  {card.title}
                </h4>
                <p className={`font-editorial-body text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 6: Bản đồ hành vi trong ngày vs 5 định dạng (06:00 -> 22:00)
    case 'block_6_daily_timeline':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="space-y-3">
            {(block.data.slots || []).map((slot: any, i: number) => (
              <div
                key={i}
                className={`p-4 border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-editorial-ui text-base font-bold text-[#b13460] tabular-nums shrink-0 w-16">
                    {slot.time}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-editorial-serif text-base font-bold text-[#222222] dark:text-white">
                        {slot.name}
                      </h4>
                      <span className="font-editorial-ui text-xs px-2 py-0.5 border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400">
                        {slot.format}
                      </span>
                    </div>
                    <p className={`font-editorial-body text-xs sm:text-sm mt-0.5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {slot.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 7: Cầu thang 7 nấc kiến trúc sản phẩm
    case 'block_7_ladder':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="space-y-2.5">
            {(block.data.steps || []).map((step: any, i: number) => {
              const depth = i * 2; // subtle progression
              return (
                <div
                  key={i}
                  className={`p-3.5 border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                    i >= 5
                      ? 'border-[#b13460] bg-[rgba(177,52,96,0.06)]'
                      : isDark
                      ? 'border-neutral-700 bg-neutral-800'
                      : 'border-[#e0e0e0] bg-white'
                  }`}
                  style={{ marginLeft: `${Math.min(depth, 16)}px` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-editorial-ui text-xs font-bold px-2 py-0.5 shrink-0 ${
                        i >= 5
                          ? 'bg-[#b13460] text-white'
                          : 'border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {step.step}
                    </span>
                    <span className="font-editorial-serif text-sm sm:text-base font-bold text-[#222222] dark:text-white">
                      {step.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-editorial-ui text-neutral-500 sm:self-center">
                    <span>{step.audience}</span>
                    <span className="text-neutral-300">→</span>
                    <span className="font-semibold text-[#b13460]">{step.conversion}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 8: Bảng đối sánh mô hình cũ vs Kiến trúc mới
    case 'block_8_comparison':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-[#e0e0e0] dark:border-neutral-700">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800 border-b border-[#e0e0e0] dark:border-neutral-700">
                  <th className="p-3 font-editorial-ui text-xs font-bold text-neutral-500 w-1/4">Tiêu chí</th>
                  <th className="p-3 font-editorial-serif text-sm font-bold text-[#222222] dark:text-neutral-300 w-3/8">
                    {block.data.colLeftTitle || 'Mô hình cũ'}
                  </th>
                  <th className="p-3 font-editorial-serif text-sm font-bold text-[#b13460] w-3/8 bg-[#b13460]/10">
                    {block.data.colRightTitle || 'Kiến trúc mới'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e0e0] dark:divide-neutral-700">
                {(block.data.rows || []).map((row: any, i: number) => (
                  <tr key={i} className={isDark ? 'bg-neutral-900/50' : 'bg-white'}>
                    <td className="p-3 font-editorial-ui text-xs font-semibold text-neutral-700 dark:text-neutral-300 align-top">
                      {row.criteria}
                    </td>
                    <td className="p-3 font-editorial-body text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 align-top">
                      {row.left}
                    </td>
                    <td className="p-3 font-editorial-body text-xs sm:text-sm text-[#222222] dark:text-neutral-200 font-medium align-top bg-[#b13460]/5">
                      {row.right}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 9: Phễu chuyển đổi qua Video 4 tầng
    case 'block_9_video_funnel':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: block.data.stage1Title, desc: block.data.stage1Desc, stat: block.data.stage1Stat, step: '1' },
              { title: block.data.stage2Title, desc: block.data.stage2Desc, stat: block.data.stage2Stat, step: '2' },
              { title: block.data.stage3Title, desc: block.data.stage3Desc, stat: block.data.stage3Stat, step: '3' },
              { title: block.data.stage4Title, desc: block.data.stage4Desc, stat: block.data.stage4Stat, step: '4' },
            ].map((st, i) => (
              <div
                key={i}
                className={`p-5 border flex flex-col justify-between ${
                  i === 3
                    ? 'border-[#b13460] bg-[rgba(177,52,96,0.06)]'
                    : isDark
                    ? 'border-neutral-700 bg-neutral-800'
                    : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-editorial-ui text-xs font-bold text-[#b13460]">Giai đoạn {st.step}</span>
                    <span className="font-editorial-ui text-xs font-semibold text-neutral-500 tabular-nums">
                      {st.stat}
                    </span>
                  </div>
                  <h4 className="font-editorial-serif text-base font-bold text-[#222222] dark:text-white mb-2">
                    {st.title}
                  </h4>
                  <p className={`font-editorial-body text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 10: Tranh luận & Ma trận Tường phí Podcast
    case 'block_10_podcast_paywall':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Open Model */}
            <div className={`p-6 border ${isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'}`}>
              <h4 className="font-editorial-serif text-lg font-bold text-[#222222] dark:text-white mb-3">
                {block.data.openTitle || 'Mô hình Podcast Mở (Open Reach)'}
              </h4>
              <div className="space-y-2 mb-4">
                <span className="font-editorial-ui text-xs font-bold text-emerald-600 block">Ưu điểm:</span>
                {(block.data.openPros || []).map((pro: string, i: number) => (
                  <p key={i} className="font-editorial-body text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    + {pro}
                  </p>
                ))}
              </div>
              <div className="space-y-2 pt-3 border-t border-[#e0e0e0] dark:border-neutral-700">
                <span className="font-editorial-ui text-xs font-bold text-amber-600 block">Nhược điểm:</span>
                {(block.data.openCons || []).map((con: string, i: number) => (
                  <p key={i} className="font-editorial-body text-xs sm:text-sm text-neutral-500">
                    - {con}
                  </p>
                ))}
              </div>
            </div>

            {/* Paywall Model */}
            <div className={`p-6 border ${isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#b13460]/30 bg-[rgba(177,52,96,0.04)]'}`}>
              <h4 className="font-editorial-serif text-lg font-bold text-[#b13460] mb-3">
                {block.data.paywallTitle || 'Mô hình Tường phí Podcast (Subscriber Only)'}
              </h4>
              <div className="space-y-2 mb-4">
                <span className="font-editorial-ui text-xs font-bold text-[#b13460] block">Ưu điểm:</span>
                {(block.data.paywallPros || []).map((pro: string, i: number) => (
                  <p key={i} className="font-editorial-body text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium">
                    + {pro}
                  </p>
                ))}
              </div>
              <div className="space-y-2 pt-3 border-t border-[#e0e0e0] dark:border-neutral-700">
                <span className="font-editorial-ui text-xs font-bold text-amber-600 block">Nhược điểm:</span>
                {(block.data.paywallCons || []).map((con: string, i: number) => (
                  <p key={i} className="font-editorial-body text-xs sm:text-sm text-neutral-500">
                    - {con}
                  </p>
                ))}
              </div>
            </div>
          </div>
          {block.data.verdict && (
            <div className="p-4 border-l-4 border-[#b13460] bg-neutral-100 dark:bg-neutral-800 text-xs sm:text-sm font-editorial-body">
              <span className="font-bold font-editorial-ui text-[#b13460] mr-2">Kết luận chiến lược:</span>
              {block.data.verdict}
            </div>
          )}
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 11: Mô hình kiến trúc ứng dụng trung tâm (App-as-Home)
    case 'block_11_app_hub':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="max-w-3xl mx-auto">
            <div className="p-4 text-center border-2 border-[#b13460] bg-[#b13460] text-white font-editorial-serif text-xl font-bold mb-6">
              {block.data.hubName || 'The Economist App: Ngôi nhà số trung tâm'}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: block.data.pillar1, desc: block.data.pillar1Desc, num: '01' },
                { title: block.data.pillar2, desc: block.data.pillar2Desc, num: '02' },
                { title: block.data.pillar3, desc: block.data.pillar3Desc, num: '03' },
                { title: block.data.pillar4, desc: block.data.pillar4Desc, num: '04' },
              ].map((p, i) => (
                <div
                  key={i}
                  className={`p-5 border ${
                    isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                  }`}
                >
                  <div className="font-editorial-ui text-xs font-bold text-[#b13460] mb-1.5">{p.num}</div>
                  <h4 className="font-editorial-serif text-base font-bold text-[#222222] dark:text-white mb-1.5">
                    {p.title}
                  </h4>
                  <p className={`font-editorial-body text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 12: Tiến trình 5 bước phát triển dòng sản phẩm Insider
    case 'block_12_insider_steps':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {(block.data.steps || []).map((step: any, i: number) => (
              <div
                key={i}
                className={`p-4 border flex flex-col justify-between ${
                  isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div>
                  <div className="font-editorial-ui text-xs font-bold text-[#b13460] mb-2">{step.num}</div>
                  <h4 className="font-editorial-serif text-sm font-bold text-[#222222] dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className={`font-editorial-body text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 13: Bảng phân nhiệm các định dạng video giữ chân
    case 'block_13_video_matrix':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="space-y-3">
            {(block.data.formats || []).map((fmt: any, i: number) => (
              <div
                key={i}
                className={`p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div className="sm:w-1/3">
                  <h4 className="font-editorial-serif text-base font-bold text-[#b13460]">{fmt.name}</h4>
                  <span className="font-editorial-ui text-xs text-neutral-500">{fmt.target}</span>
                </div>
                <div className="sm:w-2/3 border-t sm:border-t-0 sm:border-l sm:pl-4 border-[#e0e0e0] dark:border-neutral-700 pt-2 sm:pt-0">
                  <p className={`font-editorial-body text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    {fmt.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 14: Sơ đồ kênh phát hành tự sở hữu vs Nền tảng phân phối ngoài
    case 'block_14_channels':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 border-2 border-[#b13460] ${isDark ? 'bg-neutral-800' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-[#b13460]" />
                <h4 className="font-editorial-serif text-lg font-bold text-[#b13460]">
                  {block.data.ownedTitle || 'Kênh tự sở hữu (Owned)'}
                </h4>
              </div>
              <ul className="space-y-2 mb-4">
                {(block.data.ownedItems || []).map((item: string, i: number) => (
                  <li key={i} className="font-editorial-body text-xs sm:text-sm flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                    <span className="w-1.5 h-1.5 bg-[#b13460]"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-[rgba(177,52,96,0.06)] border border-[#b13460]/20 font-editorial-ui text-xs text-[#b13460] font-semibold">
                {block.data.ownedBenefit}
              </div>
            </div>

            <div className={`p-6 border border-[#e0e0e0] ${isDark ? 'border-neutral-700 bg-neutral-800' : 'bg-white'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-neutral-500" />
                <h4 className="font-editorial-serif text-lg font-bold text-neutral-700 dark:text-neutral-300">
                  {block.data.externalTitle || 'Nền tảng phân phối ngoài (Third-party)'}
                </h4>
              </div>
              <ul className="space-y-2 mb-4">
                {(block.data.externalItems || []).map((item: string, i: number) => (
                  <li key={i} className="font-editorial-body text-xs sm:text-sm flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                    <span className="w-1.5 h-1.5 bg-neutral-400"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 font-editorial-ui text-xs text-neutral-600 dark:text-neutral-400">
                {block.data.externalBenefit}
              </div>
            </div>
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 15: Mô hình 4 lớp hạ tầng AI quanh Báo chí con người
    case 'block_15_ai_layers':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 border-2 border-[#b13460] bg-[rgba(177,52,96,0.08)] text-center">
              <span className="font-editorial-ui text-xs font-bold text-[#b13460] block mb-1">TRỌNG TÂM CỐT LÕI</span>
              <h4 className="font-editorial-serif text-xl font-bold text-[#b13460] mb-2">
                {block.data.coreTitle || 'Lõi biên tập Con người (Human Editorial Core)'}
              </h4>
              <p className="font-editorial-body text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 max-w-xl mx-auto">
                {block.data.coreDesc ||
                  'Quyết định góc nhìn, phỏng vấn thực địa, phán đoán đạo đức và phong cách viết độc bản.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: block.data.layer1, desc: block.data.layer1Desc },
                { title: block.data.layer2, desc: block.data.layer2Desc },
                { title: block.data.layer3, desc: block.data.layer3Desc },
                { title: block.data.layer4, desc: block.data.layer4Desc },
              ].map((layer, i) => (
                <div
                  key={i}
                  className={`p-4 border ${
                    isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                  }`}
                >
                  <h5 className="font-editorial-serif text-sm font-bold text-[#222222] dark:text-white mb-1">
                    {layer.title}
                  </h5>
                  <p className={`font-editorial-body text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {layer.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 16: Khung 6 câu hỏi chiến lược cho người điều hành (Interactive Checklist)
    case 'block_16_strategic_checklist':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="space-y-3">
            {(block.data.questions || []).map((q: any) => {
              const isChecked = checklistState[q.id] ?? q.checked ?? false;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    const next = !isChecked;
                    setChecklistState((prev) => ({ ...prev, [q.id]: next }));
                    if (onUpdateBlockData && block.data.questions) {
                      const updatedQuestions = block.data.questions.map((item: any) =>
                        item.id === q.id ? { ...item, checked: next } : item
                      );
                      onUpdateBlockData({ questions: updatedQuestions });
                    }
                  }}
                  className={`p-4 border flex items-start gap-3 cursor-pointer select-none transition-colors ${
                    isChecked
                      ? 'border-[#b13460]/40 bg-[rgba(177,52,96,0.04)]'
                      : isDark
                      ? 'border-neutral-700 bg-neutral-800'
                      : 'border-[#e0e0e0] bg-white'
                  }`}
                >
                  <div className="pt-0.5 text-[#b13460] shrink-0">
                    {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-neutral-400" />}
                  </div>
                  <div>
                    <h5
                      className={`font-editorial-serif text-sm sm:text-base font-bold ${
                        isChecked ? 'text-[#b13460]' : isDark ? 'text-white' : 'text-[#222222]'
                      }`}
                    >
                      {q.text}
                    </h5>
                    {q.note && (
                      <p className={`font-editorial-body text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {q.note}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 17: Hệ sinh thái B2B: Content API & Teams/Slack
    case 'block_17_b2b_ecosystem':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: block.data.col1Title, desc: block.data.col1Desc, badge: 'Đăng nhập bảo mật' },
              { title: block.data.col2Title, desc: block.data.col2Desc, badge: 'Tự động hóa kênh' },
              { title: block.data.col3Title, desc: block.data.col3Desc, badge: 'Truy xuất API' },
            ].map((col, i) => (
              <div
                key={i}
                className={`p-6 border flex flex-col justify-between ${
                  isDark ? 'border-neutral-700 bg-neutral-800' : 'border-[#e0e0e0] bg-white'
                }`}
              >
                <div>
                  <span className="font-editorial-ui text-xs font-semibold px-2 py-0.5 border border-[#b13460]/20 text-[#b13460] bg-[#b13460]/5 inline-block mb-3">
                    {col.badge}
                  </span>
                  <h4 className="font-editorial-serif text-base font-bold text-[#222222] dark:text-white mb-2">
                    {col.title}
                  </h4>
                  <p className={`font-editorial-body text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {col.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {renderFigureFooter()}
        </figure>
      );

    // BLOCK 18: Kim tự tháp tổng kết & Lộ trình 2027
    case 'block_18_pyramid':
      return (
        <figure className={`p-6 sm:p-8 my-8 ${getTintBgClass(block.tint)}`}>
          {renderFigureHeader()}
          <div className="space-y-3 max-w-3xl mx-auto">
            {/* Layer 1 (Top) */}
            <div className="p-4 border-2 border-[#b13460] bg-[#b13460] text-white text-center mx-auto w-full sm:w-2/3">
              <h5 className="font-editorial-serif text-base font-bold">{block.data.layer1}</h5>
              <p className="font-editorial-body text-xs opacity-90 mt-1">{block.data.layer1Sub}</p>
            </div>
            {/* Layer 2 */}
            <div className="p-4 border border-[#b13460] bg-[rgba(177,52,96,0.12)] text-center mx-auto w-full sm:w-4/5">
              <h5 className="font-editorial-serif text-base font-bold text-[#b13460]">{block.data.layer2}</h5>
              <p className="font-editorial-body text-xs text-neutral-700 dark:text-neutral-300 mt-1">
                {block.data.layer2Sub}
              </p>
            </div>
            {/* Layer 3 */}
            <div className="p-4 border border-[#e0e0e0] dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-center mx-auto w-full sm:w-11/12">
              <h5 className="font-editorial-serif text-base font-bold text-[#222222] dark:text-white">
                {block.data.layer3}
              </h5>
              <p className="font-editorial-body text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                {block.data.layer3Sub}
              </p>
            </div>
            {/* Layer 4 (Base) */}
            <div className="p-5 border-2 border-neutral-800 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-900 text-center mx-auto w-full">
              <h5 className="font-editorial-serif text-base font-bold text-[#222222] dark:text-white">
                {block.data.layer4}
              </h5>
              <p className="font-editorial-body text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-medium">
                {block.data.layer4Sub}
              </p>
            </div>
          </div>
          {renderFigureFooter()}
        </figure>
      );

    default:
      return (
        <div className="p-4 border border-[#e0e0e0] bg-white my-4 font-editorial-body text-sm">
          Khối nội dung: {block.title || block.type}
        </div>
      );
  }
};
