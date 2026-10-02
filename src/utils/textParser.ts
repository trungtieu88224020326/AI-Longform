import { EditorialBlock, StoryMetadata } from '../types/editorial';

export interface ParseResult {
  metadata: Partial<StoryMetadata>;
  blocks: EditorialBlock[];
  stats: {
    totalBlocks: number;
    hasHero: boolean;
    hasStats: boolean;
    hasQuotes: boolean;
    hasSteps: boolean;
    hasMoatOrMatrix: boolean;
    hasChecklist: boolean;
    paragraphCount: number;
  };
}

export function parseRawEditorialText(rawText: string): ParseResult {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const blocks: EditorialBlock[] = [];
  const stats = {
    totalBlocks: 0,
    hasHero: false,
    hasStats: false,
    hasQuotes: false,
    hasSteps: false,
    hasMoatOrMatrix: false,
    hasChecklist: false,
    paragraphCount: 0,
  };

  let title = 'Bài viết phân tích chuyên sâu';
  let kicker = 'Hồ sơ truyền thông & Chuyển đổi số';
  let dek = 'Tóm lược nội dung cốt lõi và góc nhìn chiến lược dành cho độc giả.';
  let foundTitle = false;
  let foundDek = false;
  let firstParagraphAssigned = false;

  // Group text into logical sections
  const sections: { type: string; rawLines: string[] }[] = [];
  let currentGroup: { type: string; rawLines: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for kicker / title in first few lines
    if (!foundTitle && (line.startsWith('# ') || i === 0 || line.includes('HỒ SƠ') || line.includes('CHUYÊN ĐỀ'))) {
      if (line.includes(':') && !foundTitle) {
        const parts = line.split(':');
        kicker = parts[0].replace(/^#\s*/, '').trim();
        title = parts.slice(1).join(':').trim() || title;
      } else {
        title = line.replace(/^#\s*/, '').trim();
      }
      foundTitle = true;
      continue;
    }

    // Check for subtitle / Dek / Sapo
    if (!foundDek && (line.toLowerCase().startsWith('sapo:') || line.toLowerCase().startsWith('tóm tắt:') || line.toLowerCase().startsWith('dek:'))) {
      dek = line.replace(/^(sapo|tóm tắt|dek):\s*/i, '').trim();
      foundDek = true;
      continue;
    } else if (!foundDek && i <= 3 && line.length > 50 && !line.startsWith('-') && !line.startsWith('1.') && !line.startsWith('>')) {
      dek = line;
      foundDek = true;
      continue;
    }

    // Classify remaining lines
    const isQuote = line.startsWith('>') || (line.startsWith('"') && line.endsWith('"')) || (line.startsWith('“') && line.endsWith('”'));
    const isBullet = line.startsWith('-') || line.startsWith('•') || line.startsWith('*');
    const isNumbered = /^\d+[\.\)]\s/.test(line) || /^Bước\s+\d+/i.test(line) || /^Tầng\s+\d+/i.test(line);
    const isQuestion = line.endsWith('?') || /^(liệu|bạn có|tòa soạn|độc giả)/i.test(line);

    if (isQuote) {
      sections.push({ type: 'quote', rawLines: [line] });
      currentGroup = null;
    } else if (isNumbered) {
      if (currentGroup && currentGroup.type === 'numbered') {
        currentGroup.rawLines.push(line);
      } else {
        currentGroup = { type: 'numbered', rawLines: [line] };
        sections.push(currentGroup);
      }
    } else if (isBullet) {
      if (currentGroup && currentGroup.type === 'bullet') {
        currentGroup.rawLines.push(line);
      } else {
        currentGroup = { type: 'bullet', rawLines: [line] };
        sections.push(currentGroup);
      }
    } else {
      // Normal narrative line or section header
      sections.push({ type: 'text', rawLines: [line] });
      currentGroup = null;
    }
  }

  // 1. Always create Hero Block
  const heroId = `hero-${Date.now()}`;
  blocks.push({
    id: heroId,
    type: 'hero',
    width: 'wide',
    tint: 'white',
    data: {
      kicker,
      title,
      dek,
      author: 'Ban Phân tích Chiến lược',
      publishDate: 'Tháng 10, 2026',
      readTime: '7 phút đọc',
      accentRule: true,
    },
  });
  stats.hasHero = true;

  // Add Audio Companion Bar
  blocks.push({
    id: `audio-${Date.now() + 1}`,
    type: 'audio_bar',
    width: 'boxed',
    tint: 'rose',
    data: {
      label: 'Nghe bản thu âm bài viết dành cho độc giả bận rộn',
      duration: '11 phút 30 giây',
      narrator: 'Giọng đọc Biên tập viên chuẩn mực',
      srcUrl: '#',
    },
  });

  // Process sections into structured blocks
  sections.forEach((sec, idx) => {
    const sectionId = `block-${Date.now()}-${idx}`;

    if (sec.type === 'quote') {
      const cleanQuote = sec.rawLines[0].replace(/^[>"\s“]+|[”"\s]+$/g, '').trim();
      blocks.push({
        id: sectionId,
        type: 'pullquote',
        width: 'boxed',
        tint: 'white',
        data: {
          quote: cleanQuote,
          author: 'Lãnh đạo Tòa soạn',
          role: 'Ban Điều hành Biên tập',
        },
      });
      stats.hasQuotes = true;
      return;
    }

    if (sec.type === 'bullet') {
      // Check if lines contain financial / metric indicators
      const hasNumbers = sec.rawLines.some((l) =>
        /(\d+([.,]\d+)?\s*(%|£|\$|triệu|tỷ|subscriber|giờ|usd|người|lượt))/i.test(l)
      );
      const isQuestions = sec.rawLines.every((l) => l.trim().endsWith('?') || l.includes('?'));

      if (isQuestions) {
        // Generate Block 16: Checklist
        const questions = sec.rawLines.map((l, qIdx) => ({
          id: `q-${qIdx + 1}`,
          text: l.replace(/^[-•*]\s*/, '').trim(),
          note: 'Tiêu chí đánh giá mức độ lành mạnh và bền vững của tòa soạn.',
          checked: qIdx % 2 === 0,
        }));
        blocks.push({
          id: sectionId,
          type: 'block_16_strategic_checklist',
          figureNumber: 'Hình 16',
          title: 'Khung câu hỏi chiến lược cho người điều hành',
          subtitle: 'Bảng tự kiểm tra đánh giá năng lực chuyển đổi số và quản trị bạn đọc trả tiền.',
          width: 'wide',
          tint: 'neutral',
          sourceNote: 'Nguồn: Bảng chẩn đoán chiến lược OneCMS',
          data: { questions },
        });
        stats.hasChecklist = true;
      } else if (hasNumbers && sec.rawLines.length >= 2) {
        // Generate Block 2: Metric Grid
        const statItems = sec.rawLines.slice(0, 4).map((l) => {
          const clean = l.replace(/^[-•*]\s*/, '').trim();
          const match = clean.match(/^([\d.,]+(\s*[%£$M]|(\s*(triệu|tỷ|subscriber|giờ|usd)))?)/i);
          const val = match ? match[0].trim() : '1,2M';
          const rest = clean.replace(val, '').replace(/^[:\-\s]+/, '').trim();
          return {
            val,
            label: rest.split(/[,.;]/)[0] || 'Chỉ số trọng yếu',
            context: rest.length > 20 ? rest : 'Số liệu ghi nhận trong kỳ báo cáo mới nhất.',
          };
        });

        blocks.push({
          id: sectionId,
          type: 'block_2_stats',
          figureNumber: 'Hình 2',
          title: 'Lưới các chỉ số hoạt động chủ chốt',
          subtitle: 'Minh chứng định lượng cho hiệu quả của chiến lược tập trung vào độc giả trả tiền.',
          width: 'wide',
          tint: 'white',
          sourceNote: 'Nguồn: Dữ liệu phân tích hoạt động xuất bản',
          data: {
            stat1Value: statItems[0]?.val || '1,2M',
            stat1Label: statItems[0]?.label || 'Thuê bao trả phí',
            stat1Context: statItems[0]?.context || 'Tăng trưởng ổn định hàng năm.',
            stat2Value: statItems[1]?.val || '£380M',
            stat2Label: statItems[1]?.label || 'Doanh thu hàng năm',
            stat2Context: statItems[1]?.context || 'Hơn 70% từ bạn đọc trả tiền.',
            stat3Value: statItems[2]?.val || '89%',
            stat3Label: statItems[2]?.label || 'Tỷ lệ gia hạn',
            stat3Context: statItems[2]?.context || 'Duy trì sự gắn kết bền vững.',
            stat4Value: statItems[3]?.val || '4,2 giờ',
            stat4Label: statItems[3]?.label || 'Thời lượng gắn kết/tuần',
            stat4Context: statItems[3]?.context || 'Đo lường trên kênh ứng dụng số.',
          },
        });
        stats.hasStats = true;
      } else if (sec.rawLines.length === 4) {
        // Generate Block 5: Mindset Matrix (4 items)
        const items = sec.rawLines.map((l) => {
          const clean = l.replace(/^[-•*]\s*/, '').trim();
          const parts = clean.split(/[:\-–]/);
          return {
            title: parts[0]?.trim() || 'Đặc điểm tư duy',
            desc: parts.slice(1).join(':').trim() || clean,
          };
        });
        blocks.push({
          id: sectionId,
          type: 'block_5_mindset',
          figureNumber: 'Hình 5',
          title: 'Ma trận đặc điểm tư duy độc giả mục tiêu',
          subtitle: 'Hiểu rõ chân dung khách hàng là chìa khóa để định vị giá trị sản phẩm.',
          width: 'wide',
          tint: 'neutral',
          sourceNote: 'Nguồn: Nghiên cứu thị trường độc giả',
          data: {
            card1Title: items[0]?.title || 'Tiết kiệm thời gian',
            card1Desc: items[0]?.desc || 'Độc giả bận rộn cần nắm bắt bản chất vấn đề trong thời gian ngắn nhất.',
            card2Title: items[1]?.title || 'Tầm nhìn bao quát',
            card2Desc: items[1]?.desc || 'Quan tâm sâu sắc đến các xu thế vĩ mô dài hạn.',
            card3Title: items[2]?.title || 'Chủ động hành động',
            card3Desc: items[2]?.desc || 'Tìm kiếm giải pháp và cơ hội thay vì than phiền tiêu cực.',
            card4Title: items[3]?.title || 'Sẵn sàng trả phí cao',
            card4Desc: items[3]?.desc || 'Sẵn sàng đầu tư xứng đáng cho nguồn thông tin đã được kiểm chứng.',
          },
        });
        stats.hasMoatOrMatrix = true;
      } else if (sec.rawLines.length >= 5) {
        // Generate Block 4: Moat Grid (up to 6 items)
        const moatItems = sec.rawLines.slice(0, 6).map((l, mIdx) => {
          const clean = l.replace(/^[-•*]\s*/, '').trim();
          const parts = clean.split(/[:\-–]/);
          return {
            num: `0${mIdx + 1}`,
            name: parts[0]?.trim() || `Yếu tố ${mIdx + 1}`,
            desc: parts.slice(1).join(':').trim() || clean,
          };
        });
        blocks.push({
          id: sectionId,
          type: 'block_4_moat',
          figureNumber: 'Hình 4',
          title: 'Lưới các thành phần Hào lũy biên tập cốt lõi',
          subtitle: 'Những năng lực then chốt tạo nên sự khác biệt không thể sao chép.',
          width: 'wide',
          tint: 'white',
          sourceNote: 'Nguồn: Khung phân tích năng lực cạnh tranh',
          data: {
            items: moatItems,
            conclusion:
              'Kết luận biên tập: Hào lũy bảo vệ tòa soạn tốt nhất chính là sự kiên định với chất lượng thẩm định và giá trị độc bản.',
          },
        });
        stats.hasMoatOrMatrix = true;
      }
      return;
    }

    if (sec.type === 'numbered') {
      const count = sec.rawLines.length;
      if (count === 3) {
        // Generate Block 1: 3-tier Funnel
        const parsedLevels = sec.rawLines.map((l) => {
          const clean = l.replace(/^\d+[\.\)]\s*|^Tầng\s+\d+:\s*/i, '').trim();
          const parts = clean.split(/[:\-–]/);
          return {
            title: parts[0]?.trim() || 'Tầng thông tin',
            desc: parts.slice(1).join(':').trim() || clean,
          };
        });
        blocks.push({
          id: sectionId,
          type: 'block_1_funnel',
          figureNumber: 'Hình 1',
          title: 'Phễu hội tụ thông tin 3 tầng',
          subtitle: 'Quy trình tinh lọc từ sự kiện rời rạc đến tri thức định hướng tương lai.',
          width: 'wide',
          tint: 'neutral',
          sourceNote: 'Nguồn: Mô hình quản trị biên tập hội tụ',
          data: {
            level1Title: parsedLevels[0]?.title || 'Tầng 1: Tin tức rời rạc',
            level1Desc: parsedLevels[0]?.desc || 'Thu thập sự kiện và thông tin nhanh từ khắp nơi.',
            level1Tag: 'Đầu vào miễn phí',
            level2Title: parsedLevels[1]?.title || 'Tầng 2: Bối cảnh hóa & Phân tích',
            level2Desc: parsedLevels[1]?.desc || 'Kiểm chứng số liệu và đối chiếu các mối liên hệ ngầm.',
            level2Tag: 'Bộ lọc biên tập',
            level3Title: parsedLevels[2]?.title || 'Tầng 3: Thấu hiểu chiến lược',
            level3Desc: parsedLevels[2]?.desc || 'Dự phóng tác động và khuyến nghị hành động giá trị cao.',
            level3Tag: 'Giá trị thu phí',
          },
        });
        stats.hasSteps = true;
      } else if (count >= 5) {
        // Generate Block 12: 5-step progress
        const steps = sec.rawLines.slice(0, 5).map((l, sIdx) => {
          const clean = l.replace(/^\d+[\.\)]\s*|^Bước\s+\d+:\s*/i, '').trim();
          const parts = clean.split(/[:\-–]/);
          return {
            num: `0${sIdx + 1}`,
            title: parts[0]?.trim() || `Bước ${sIdx + 1}`,
            desc: parts.slice(1).join(':').trim() || clean,
          };
        });
        blocks.push({
          id: sectionId,
          type: 'block_12_insider_steps',
          figureNumber: 'Hình 12',
          title: 'Tiến trình các bước phát triển sản phẩm chuyên sâu',
          subtitle: 'Lộ trình tuần tự giúp hiện thực hóa các dòng sản phẩm có giá trị gia tăng cao.',
          width: 'wide',
          tint: 'white',
          sourceNote: 'Nguồn: Quy trình ươm tạo sản phẩm số',
          data: { steps },
        });
        stats.hasSteps = true;
      }
      return;
    }

    if (sec.type === 'text') {
      const line = sec.rawLines[0];
      // Check if paragraph is first opening narrative
      if (!firstParagraphAssigned && line.length > 60) {
        blocks.push({
          id: sectionId,
          type: 'dropcap_body',
          width: 'boxed',
          tint: 'white',
          data: { content: line },
        });
        firstParagraphAssigned = true;
        stats.paragraphCount++;
      } else {
        // Regular narrative paragraph
        blocks.push({
          id: sectionId,
          type: 'dropcap_body',
          width: 'boxed',
          tint: 'white',
          data: {
            content: line,
            noDropCap: true, // rendered as regular editorial paragraph
          },
        });
        stats.paragraphCount++;
      }
    }
  });

  stats.totalBlocks = blocks.length;

  return {
    metadata: {
      kicker,
      title,
      dek,
      author: 'Ban Phân tích Chiến lược',
      publishDate: 'Tháng 10, 2026',
      readTime: `${Math.max(4, Math.round(lines.join(' ').split(' ').length / 150))} phút đọc`,
    },
    blocks,
    stats,
  };
}
