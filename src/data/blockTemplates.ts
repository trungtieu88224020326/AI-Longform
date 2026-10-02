import { BlockType, EditorialBlock } from '../types/editorial';

export interface BlockDefinition {
  type: BlockType;
  title: string;
  category: 'editorial' | 'group1' | 'group2' | 'group3' | 'group4';
  description: string;
  figureLabel?: string;
  defaultData: (id: string) => EditorialBlock;
}

export const BLOCK_TEMPLATES: BlockDefinition[] = [
  // Editorial Primitives
  {
    type: 'hero',
    title: 'Khối Tiêu đề Longform (Hero Cover)',
    category: 'editorial',
    description: 'Tiêu đề lớn Merriweather Serif, Kicker, Sapo dẫn nhập, tác giả và ngày xuất bản.',
    defaultData: (id) => ({
      id,
      type: 'hero',
      width: 'wide',
      tint: 'white',
      data: {
        kicker: 'Hồ sơ truyền thông & Chuyển đổi số',
        title: 'Tiêu đề bài viết phân tích chuyên sâu',
        dek: 'Đoạn sapo súc tích đặt vấn đề, làm nổi bật góc nhìn độc quyền và ý nghĩa cốt lõi của bài báo đối với độc giả.',
        author: 'Ban Biên tập Chuyên đề',
        publishDate: 'Tháng 10, 2026',
        readTime: '6 phút đọc',
        accentRule: true,
      },
    }),
  },
  {
    type: 'audio_bar',
    title: 'Thanh Nghe Audio (Audio Player Bar)',
    category: 'editorial',
    description: 'Thanh phát bản tin thu âm dành cho độc giả bận rộn nghe trên đường đi làm.',
    defaultData: (id) => ({
      id,
      type: 'audio_bar',
      width: 'boxed',
      tint: 'rose',
      data: {
        label: 'Nghe bản thu âm bài viết (Audio Edition)',
        duration: '12 phút 40 giây',
        narrator: 'Giọng đọc Biên tập viên chuẩn mực',
        srcUrl: '#',
      },
    }),
  },
  {
    type: 'dropcap_body',
    title: 'Đoạn văn mở đầu (Drop-cap Paragraph)',
    category: 'editorial',
    description: 'Chữ cái hoa đầu dòng cỡ lớn màu hồng đậm (#b13460) chuẩn báo chí kinh điển.',
    defaultData: (id) => ({
      id,
      type: 'dropcap_body',
      width: 'boxed',
      tint: 'white',
      data: {
        content:
          'Trong thế giới thông tin ngập tràn và phân mảnh hôm nay, giá trị của một ấn phẩm báo chí chất lượng cao không còn đo lường bằng việc phát hành nhanh nhất một tin sự kiện. Thay vào đó, sức mạnh bền vững nằm ở năng lực giải thích nguyên nhân sâu xa, phân tích các lực lượng ngầm đang chi phối và đưa ra dự báo chính xác giúp người đọc tự tin ra quyết định.',
      },
    }),
  },
  {
    type: 'pullquote',
    title: 'Trích dẫn điểm nhấn (Pull-quote)',
    category: 'editorial',
    description: 'Trích dẫn chiến lược với đường kẻ viền màu Rose (#b13460), chữ nghiêng thanh lịch.',
    defaultData: (id) => ({
      id,
      type: 'pullquote',
      width: 'boxed',
      tint: 'white',
      data: {
        quote:
          'Báo chí chất lượng cao không phải là thứ để đọc cho vui lúc rỗi rãi, mà là công cụ tư duy chiến lược dành cho những người không chấp nhận bị bất ngờ trước tương lai.',
        author: 'Chuyên gia Truyền thông Số',
        role: 'Cố vấn Chiến lược Tòa soạn',
      },
    }),
  },
  {
    type: 'section_divider',
    title: 'Thanh phân tách phần (Section Divider)',
    category: 'editorial',
    description: 'Đường phân định tinh tế giữa các chương lớn trong bài viết.',
    defaultData: (id) => ({
      id,
      type: 'section_divider',
      width: 'boxed',
      tint: 'white',
      data: {
        label: 'Phần tiếp theo',
        title: 'Chiến lược sản phẩm và trải nghiệm độc giả',
      },
    }),
  },

  // 18 Standard Blocks
  // Block 1
  {
    type: 'block_1_funnel',
    title: 'Hình 1: Phễu hội tụ thông tin 3 tầng',
    category: 'group1',
    description: 'Sơ đồ chuyển hóa: Tin tức rời rạc -> Bối cảnh hóa -> Thấu hiểu & Ra quyết định.',
    figureLabel: 'Hình 1',
    defaultData: (id) => ({
      id,
      type: 'block_1_funnel',
      figureNumber: 'Hình 1',
      title: 'Phễu hội tụ thông tin 3 tầng của The Economist',
      subtitle: 'Cách chắt lọc dòng thác sự kiện toàn cầu thành giá trị tri thức cao cấp.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Mô hình quản trị biên tập The Economist',
      data: {
        level1Title: 'Tầng 1: Tin tức rời rạc toàn cầu',
        level1Desc: 'Sự kiện hàng ngày, phát ngôn, biến động thị trường và thông cáo báo chí rộng khắp.',
        level1Tag: 'Đầu vào miễn phí',
        level2Title: 'Tầng 2: Bối cảnh hóa & Phân tích đa chiều',
        level2Desc: 'Kiểm chứng số liệu độc lập, đối chiếu dữ liệu lịch sử và bóc tách nguyên nhân ngầm.',
        level2Tag: 'Bộ lọc biên tập',
        level3Title: 'Tầng 3: Thấu hiểu chiến lược & Định hướng',
        level3Desc: 'Góc nhìn dự báo độc quyền, kịch bản tương lai và khuyến nghị then chốt cho lãnh đạo.',
        level3Tag: 'Giá trị thu phí',
      },
    }),
  },

  // Block 2
  {
    type: 'block_2_stats',
    title: 'Hình 2: Lưới 4 chỉ số tài chính chủ chốt',
    category: 'group1',
    description: 'Lưới 4 con số lớn (Big Stats) kèm nhãn Merriweather Sans và bối cảnh cụ thể.',
    figureLabel: 'Hình 2',
    defaultData: (id) => ({
      id,
      type: 'block_2_stats',
      figureNumber: 'Hình 2',
      title: 'Lưới 4 chỉ số tài chính và độc giả chủ chốt',
      subtitle: 'Hiệu quả định lượng vượt trội của chiến lược lấy độc giả trả tiền làm trọng tâm.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Báo cáo tài chính thường niên tòa soạn',
      data: {
        stat1Value: '1,2M',
        stat1Label: 'Thuê bao trả tiền toàn cầu',
        stat1Context: 'Tăng trưởng đều đặn, 65% là thuê bao thuần số.',
        stat2Value: '£380M',
        stat2Label: 'Doanh thu hàng năm',
        stat2Context: 'Doanh thu trực tiếp từ độc giả chiếm hơn 70%.',
        stat3Value: '89%',
        stat3Label: 'Tỷ lệ gia hạn thuê bao',
        stat3Context: 'Cao gấp 2 lần mức bình quân ngành báo chí Mỹ.',
        stat4Value: '4,2 giờ',
        stat4Label: 'Thời lượng gắn kết/tuần',
        stat4Context: 'Tính trên độc giả sử dụng ứng dụng di động.',
      },
    }),
  },

  // Block 3
  {
    type: 'block_3_heritage',
    title: 'Hình 3: Di sản thương hiệu & Báo chí vô danh',
    category: 'group1',
    description: 'Bố cục chia tách 30/70: Mốc thành lập 1843 và nguyên lý tiếng nói tập thể (Collective Voice).',
    figureLabel: 'Hình 3',
    defaultData: (id) => ({
      id,
      type: 'block_3_heritage',
      figureNumber: 'Hình 3',
      title: 'Di sản thương hiệu 1843 & Báo chí vô danh',
      subtitle: 'Uy tín hơn một thế kỷ kết hợp cùng nguyên tắc loại bỏ cái tôi tác giả.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: The Economist Archive Trust',
      data: {
        yearBadge: 'Thành lập 1843',
        heritageTitle: 'Di sản tự do thương mại & Khách quan tuyệt đối',
        heritageText:
          'Sáng lập tại London để thúc đẩy tự do thương mại, ấn phẩm giữ vững tính độc lập và tư duy logic không nhân nhượng suốt gần hai thế kỷ.',
        anonymousTitle: 'Nguyên tắc tiếng nói tập thể (Collective Voice)',
        anonymousText:
          'Mỗi bài viết là sản phẩm thẩm định của cả hội đồng biên tập. Việc không đề tên cá nhân bảo đảm tiếng nói vô danh nhất quán và sự trung thực cao nhất.',
        tag1: 'Không byline cá nhân',
        tag2: 'Trách nhiệm tập thể',
        tag3: 'Khách quan tối đa',
      },
    }),
  },

  // Block 4
  {
    type: 'block_4_moat',
    title: 'Hình 4: Lưới 6 thành phần Hào lũy biên tập',
    category: 'group1',
    description: 'Lưới 2x3 gồm 6 năng lực cạnh tranh cốt lõi kèm thanh kết luận biên tập.',
    figureLabel: 'Hình 4',
    defaultData: (id) => ({
      id,
      type: 'block_4_moat',
      figureNumber: 'Hình 4',
      title: 'Lưới 6 thành phần Hào lũy biên tập (Editorial Moat)',
      subtitle: 'Những giá trị cốt lõi mà công nghệ và mạng xã hội không thể sao chép.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Báo cáo phân tích cấu trúc cạnh tranh',
      data: {
        items: [
          { num: '01', name: 'Giọng văn vô danh', desc: 'Đảm bảo tính trung lập và chuẩn mực tư duy cao nhất.' },
          { num: '02', name: 'Mạng lưới 70 quốc gia', desc: 'Phóng viên thường trú tiếp cận nguồn tin ngoại giao cấp cao.' },
          { num: '03', name: 'Đồ họa & Dữ liệu chuẩn mực', desc: 'Chuyển hóa dữ liệu phức tạp thành biểu đồ trực quan sắc sảo.' },
          { num: '04', name: 'Thẩm định độc lập 2 vòng', desc: 'Mọi con số đều được phòng kiểm chứng rà soát trước khi xuất bản.' },
          { num: '05', name: 'Lăng kính kinh tế học', desc: 'Đánh giá mọi chính sách bằng chi phí cơ hội và cân bằng dài hạn.' },
          { num: '06', name: 'Kho lưu trữ 180 năm', desc: 'Dữ liệu lịch sử vô giá để đối chiếu các chu kỳ khủng hoảng.' },
        ],
        conclusion:
          'Kết luận biên tập: Hào lũy lớn nhất của báo chí chất lượng cao không nằm ở thuật toán mà ở sự kiên định với chuẩn mực thẩm định và sự thấu suốt.',
      },
    }),
  },

  // Block 5
  {
    type: 'block_5_mindset',
    title: 'Hình 5: Ma trận 4 đặc điểm tư duy độc giả',
    category: 'group1',
    description: 'Ma trận 2x2 thể hiện tâm lý độc giả mục tiêu: Hiệu quả thời gian, Tầm nhìn toàn cầu, Chủ động, Sẵn sàng trả phí.',
    figureLabel: 'Hình 5',
    defaultData: (id) => ({
      id,
      type: 'block_5_mindset',
      figureNumber: 'Hình 5',
      title: 'Ma trận 4 đặc điểm tư duy độc giả cao cấp',
      subtitle: 'Chân dung khách hàng mục tiêu quyết định chiến lược định giá và đóng gói sản phẩm.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Khảo sát độc giả độc lập OneCMS',
      data: {
        card1Title: 'Hiệu quả thời gian (Time-poor)',
        card1Desc: 'Không có thời gian đọc hàng chục tin tức rời rạc. Cần bài tổng thuật 500 từ nắm trọn bản chất.',
        card2Title: 'Tầm nhìn toàn cầu (Globalist)',
        card2Desc: 'Quan tâm đến tác động xuyên biên giới, chuỗi cung ứng và chính sách tiền tệ quốc tế.',
        card3Title: 'Tinh thần chủ động cao (High Agency)',
        card3Desc: 'Những người hành động muốn tìm kiếm giải pháp và cơ hội thay vì đọc các bài than phiền bi quan.',
        card4Title: 'Sẵn sàng chi trả cao (High WTP)',
        card4Desc: 'Xem chi phí đọc báo là khoản đầu tư sinh lợi cho nghề nghiệp chứ không phải chi phí tiêu dùng.',
      },
    }),
  },

  // Block 6
  {
    type: 'block_6_daily_timeline',
    title: 'Hình 6: Bản đồ hành vi trong ngày vs 5 định dạng',
    category: 'group2',
    description: 'Dòng thời gian từ 06:00 đến 22:00 ánh xạ thói quen sinh hoạt với định dạng phù hợp.',
    figureLabel: 'Hình 6',
    defaultData: (id) => ({
      id,
      type: 'block_6_daily_timeline',
      figureNumber: 'Hình 6',
      title: 'Bản đồ hành vi trong ngày vs 5 định dạng nội dung',
      subtitle: 'Hiện diện đúng lúc, đúng nhu cầu từ sáng sớm đến khi kết thúc ngày làm việc.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Nhật ký hành vi độc giả đa thiết bị',
      data: {
        slots: [
          { time: '06:30', name: 'The Espresso', format: 'Bản tin ngắn trên app', desc: '5 tin vắn quan trọng nhất đọc nhanh trong 3 phút.' },
          { time: '08:15', name: 'Audio Edition', format: 'Nghe qua tai nghe', desc: 'Nghe bài phân tích chuyên sâu khi lái xe hoặc đi tàu.' },
          { time: '12:30', name: 'Web Deep-dive', format: 'Trình duyệt máy tính', desc: 'Xem biểu đồ tương tác và dữ liệu chi tiết vào giờ nghỉ.' },
          { time: '18:00', name: 'The Intelligence', format: 'Daily Podcast', desc: 'Podcast 20 phút trò chuyện trực tiếp cùng phóng viên.' },
          { time: '21:30', name: 'Weekly Print / App', format: 'Ấn phẩm tuần số hóa', desc: 'Đọc chậm các bài khảo luận dài hạn trước khi ngủ.' },
        ],
      },
    }),
  },

  // Block 7
  {
    type: 'block_7_ladder',
    title: 'Hình 7: Cầu thang 7 nấc kiến trúc sản phẩm',
    category: 'group2',
    description: 'Thang bậc giá trị 7 nấc từ nội dung miễn phí đến gói dữ liệu B2B cao cấp.',
    figureLabel: 'Hình 7',
    defaultData: (id) => ({
      id,
      type: 'block_7_ladder',
      figureNumber: 'Hình 7',
      title: 'Cầu thang 7 nấc kiến trúc sản phẩm số',
      subtitle: 'Hành trình dẫn dắt độc giả từ người xem ngẫu nhiên thành thuê bao trọn đời.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Mô hình bậc thang chuyển đổi OneCMS',
      data: {
        steps: [
          { step: 'Nấc 1', label: 'Mạng xã hội & Video ngắn', audience: 'Công chúng rộng rãi', conversion: 'Khơi gợi chú ý' },
          { step: 'Nấc 2', label: 'Bản tin Email miễn phí', audience: 'Độc giả ghé thăm', conversion: 'Thu thập email' },
          { step: 'Nấc 3', label: 'Tài khoản đăng ký dùng thử', audience: 'Người đọc thường xuyên', conversion: 'Kích hoạt app' },
          { step: 'Nấc 4', label: 'Thuê bao Số cơ bản (Digital)', audience: 'Độc giả cá nhân', conversion: 'Chuyển đổi trả phí' },
          { step: 'Nấc 5', label: 'Gói Toàn diện (Digital + Print)', audience: 'Độc giả trung thành', conversion: 'Tối đa hóa LTV' },
          { step: 'Nấc 6', label: 'Gói Doanh nghiệp (B2B Multi-seat)', audience: 'Doanh nghiệp & Trường học', conversion: 'Hợp đồng lớn' },
          { step: 'Nấc 7', label: 'Executive Briefing & Dữ liệu API', audience: 'Ban điều hành cấp cao', conversion: 'Phí đặc quyền' },
        ],
      },
    }),
  },

  // Block 8
  {
    type: 'block_8_comparison',
    title: 'Hình 8: Bảng đối sánh mô hình cũ vs Kiến trúc mới',
    category: 'group2',
    description: 'Bảng đối chiếu 2 cột so sánh mô hình phụ thuộc quảng cáo cũ với hệ sinh thái độc giả trả phí mới.',
    figureLabel: 'Hình 8',
    defaultData: (id) => ({
      id,
      type: 'block_8_comparison',
      figureNumber: 'Hình 8',
      title: 'Bảng đối sánh mô hình thuê bao cũ vs Kiến trúc 3 chiều mới',
      subtitle: 'Sự khác biệt cốt lõi giữa tòa soạn bán lượng truy cập và tòa soạn bán giá trị tri thức.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: So sánh cấu trúc kinh doanh báo chí hiện đại',
      data: {
        colLeftTitle: 'Mô hình truyền thống (Bán quảng cáo)',
        colRightTitle: 'Kiến trúc hiện đại (Độc giả trả tiền)',
        rows: [
          { criteria: 'Mục tiêu tối thượng', left: 'Thu hút lượt xem trang (pageviews) đại trà', right: 'Xây dựng thói quen và tỷ lệ gia hạn thuê bao cao' },
          { criteria: 'Nguồn doanh thu', left: 'Phụ thuộc 70-80% vào quảng cáo banner hiển thị', right: 'Hơn 70% doanh thu trực tiếp từ thuê bao độc giả' },
          { criteria: 'Định dạng xuất bản', left: 'Chỉ có bài viết văn bản kèm ảnh quảng cáo chèn ép', right: 'Đa định dạng: Bản tin ngắn, Audio hoàn chỉnh, Video chuyên đề' },
          { criteria: 'Chỉ số đo lường', left: 'Số click chuột, lượt hiển thị banner', right: 'Tần suất mở app hàng tuần, thời lượng nghe/đọc' },
          { criteria: 'Mối quan hệ bạn đọc', left: 'Độc giả vô danh, không lưu trữ hồ sơ hành vi', right: 'Dữ liệu 1-1, cá nhân hóa chủ đề quan tâm sâu sắc' },
        ],
      },
    }),
  },

  // Block 9
  {
    type: 'block_9_video_funnel',
    title: 'Hình 9: Phễu chuyển đổi qua Video 4 tầng',
    category: 'group2',
    description: 'Quy trình 4 bước chuyển đổi từ người xem YouTube tài liệu sang thuê bao trả phí.',
    figureLabel: 'Hình 9',
    defaultData: (id) => ({
      id,
      type: 'block_9_video_funnel',
      figureNumber: 'Hình 9',
      title: 'Phễu chuyển đổi độc giả qua Video tài liệu',
      subtitle: 'Biến hàng chục triệu lượt xem video giáo dục thành người đăng ký bản tin và thuê bao số.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Chiến lược nội dung Video The Economist',
      data: {
        stage1Title: '1. Video tài liệu chuyên đề trên YouTube',
        stage1Desc: 'Phim tài liệu 15-20 phút giải thích các điểm nóng địa chính trị và công nghệ đột phá.',
        stage1Stat: '8M+ lượt xem/tháng',
        stage2Title: '2. Lời kêu gọi hành động ngữ cảnh (Contextual CTA)',
        stage2Desc: 'Giới thiệu bài phân tích chuyên sâu mở rộng và bản đồ dữ liệu trên trang web chính thức.',
        stage2Stat: '4,5% tỷ lệ click',
        stage3Title: '3. Đăng ký tài khoản trải nghiệm miễn phí',
        stage3Desc: 'Độc giả tạo tài khoản để đọc thêm 3 bài chuyên đề và nhận bản tin tóm tắt hàng tuần.',
        stage3Stat: '12% tỷ lệ đăng ký',
        stage4Title: '4. Kích hoạt ưu đãi thuê bao số đầu tiên',
        stage4Desc: 'Chiến dịch email tự động gửi ưu đãi dùng thử trả phí với mức giá ưu đãi tháng đầu tiên.',
        stage4Stat: '6,8% trả tiền',
      },
    }),
  },

  // Block 10
  {
    type: 'block_10_podcast_paywall',
    title: 'Hình 10: Tranh luận & Ma trận Tường phí Podcast',
    category: 'group2',
    description: 'Ma trận đối trọng giữa mô hình Podcast mở (tiếp cận) và Podcast khóa phí (đặc quyền thuê bao).',
    figureLabel: 'Hình 10',
    defaultData: (id) => ({
      id,
      type: 'block_10_podcast_paywall',
      figureNumber: 'Hình 10',
      title: 'Tranh luận & Ma trận Tường phí Podcast',
      subtitle: 'Bài toán cân bằng giữa độ phủ công chúng và giá trị bảo vệ nội dung độc quyền.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Quyết định chuyển dịch podcast trả phí 2023',
      data: {
        openTitle: 'Mô hình Podcast Mở (Open Reach)',
        openPros: ['Tiếp cận hàng triệu độc giả trẻ chưa biết đến thương hiệu', 'Tạo nguồn thu từ tài trợ âm thanh chất lượng cao', 'Kênh tiếp thị tự nhiên mạnh mẽ cho thương hiệu'],
        openCons: ['Khó đo lường tỷ lệ chuyển đổi trực tiếp ra thuê bao', 'Phụ thuộc vào thuật toán phân phối của Spotify, Apple'],
        paywallTitle: 'Mô hình Tường phí Podcast (Subscriber Only)',
        paywallPros: ['Tăng mạnh tỷ lệ gắn kết và gia hạn của thuê bao hiện hữu', 'Tạo lý do thuyết phục để người nghe bỏ tiền mua gói chuyên biệt', 'Sở hữu dữ liệu hành vi nghe chi tiết trên app riêng'],
        paywallCons: ['Lượng người nghe mới giảm đáng kể', 'Đòi hỏi chất lượng sản xuất và giọng đọc cực kỳ xuất sắc'],
        verdict: 'Giải pháp lai: Giữ The Intelligence mở miễn phí để mở rộng phễu, đưa các series chuyên sâu vào gói trả phí.',
      },
    }),
  },

  // Block 11
  {
    type: 'block_11_app_hub',
    title: 'Hình 11: Mô hình kiến trúc ứng dụng trung tâm (App-as-Home)',
    category: 'group2',
    description: 'Sơ đồ định vị ứng dụng di động làm trung tâm gắn kết: Đọc, Nghe Audio, Tải offline và Cá nhân hóa.',
    figureLabel: 'Hình 11',
    defaultData: (id) => ({
      id,
      type: 'block_11_app_hub',
      figureNumber: 'Hình 11',
      title: 'Mô hình kiến trúc ứng dụng trung tâm (App-as-Home)',
      subtitle: 'Ứng dụng di động không chỉ là kênh đọc báo mà là ngôi nhà số của toàn bộ trải nghiệm độc giả.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Kiến trúc sản phẩm di động The Economist',
      data: {
        hubName: 'The Economist App Hub',
        pillar1: 'Trình phát Audio hoàn chỉnh',
        pillar1Desc: 'Đồng bộ vị trí nghe trên mọi thiết bị, đọc tự nhiên toàn bộ bài viết.',
        pillar2: 'Ấn phẩm số tải về đọc Offline',
        pillar2Desc: 'Tự động tải số báo mới vào sáng thứ Năm phục vụ các chuyến bay.',
        pillar3: 'Bản tin chắt lọc The Espresso',
        pillar3Desc: 'Cập nhật tin nhanh và câu đố trí tuệ hàng ngày.',
        pillar4: 'Kho lưu trữ chuyên đề cá nhân hóa',
        pillar4Desc: 'Đánh dấu bài viết yêu thích, tra cứu theo chủ đề chuyên sâu.',
      },
    }),
  },

  // Block 12
  {
    type: 'block_12_insider_steps',
    title: 'Hình 12: Tiến trình 5 bước phát triển dòng sản phẩm Insider',
    category: 'group3',
    description: 'Tiến trình tuần tự 5 bước phát triển sản phẩm nhánh chuyên đề theo ngành dọc.',
    figureLabel: 'Hình 12',
    defaultData: (id) => ({
      id,
      type: 'block_12_insider_steps',
      figureNumber: 'Hình 12',
      title: 'Tiến trình 5 bước phát triển sản phẩm Insider chuyên đề',
      subtitle: 'Cách biến thế mạnh ngách thành dòng sản phẩm thuê bao giá trị cao.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Quy trình ươm tạo sản phẩm số OneCMS',
      data: {
        steps: [
          { num: '01', title: 'Nhận diện ngách thị trường', desc: 'Phát hiện sự thiếu hụt thông tin chiến lược trong ngành dọc (ví dụ: Biến đổi khí hậu, AI, Tài chính lượng tử).' },
          { num: '02', title: 'Thử nghiệm Bản tin Pilot', desc: 'Ra mắt newsletter miễn phí do phóng viên đầu ngành chấp bút trong 3 tháng để đo độ quan tâm.' },
          { num: '03', title: 'Thành lập ban chuyên trách', desc: 'Tách riêng một nhóm biên tập và thiết kế dữ liệu tập trung tối ưu trải nghiệm đọc sâu.' },
          { num: '04', title: 'Đóng gói vào gói thuê bao', desc: 'Tích hợp bản tin và sự kiện độc quyền vào gói sản phẩm cao cấp có mức giá vượt trội.' },
          { num: '05', title: 'Mở rộng thị trường doanh nghiệp', desc: 'Cung cấp tài khoản số lượng lớn và phân tích dữ liệu chuyên dụng cho các tập đoàn.' },
        ],
      },
    }),
  },

  // Block 13
  {
    type: 'block_13_video_matrix',
    title: 'Hình 13: Bảng phân nhiệm các định dạng video giữ chân',
    category: 'group3',
    description: 'Bảng đối chiếu 4 định dạng video: Giải thích ngắn, Tài liệu chuyên sâu, Phỏng vấn hiện trường, Đồ họa dữ liệu.',
    figureLabel: 'Hình 13',
    defaultData: (id) => ({
      id,
      type: 'block_13_video_matrix',
      figureNumber: 'Hình 13',
      title: 'Bảng phân nhiệm định dạng video trong phễu giữ chân',
      subtitle: 'Mỗi định dạng video đều có sứ mệnh riêng trong việc gắn kết và thúc đẩy gia hạn.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Khung chiến lược video tòa soạn số',
      data: {
        formats: [
          { name: 'Video Giải thích ngắn (Short-form)', target: 'Mạng xã hội & Người xem mới', role: 'Đơn giản hóa khái niệm khó, tạo sự tò mò và nhận diện thương hiệu' },
          { name: 'Phim tài liệu chuyên đề (Deep-dive)', target: 'Độc giả trung thành & Người tìm hiểu', role: 'Thể hiện năng lực phân tích hiện trường vượt trội, củng cố uy tín' },
          { name: 'Phỏng vấn lãnh đạo (Dispatch)', target: 'Doanh nhân & Nhà đầu tư', role: 'Mang lại tiếng nói độc quyền từ những người đang định hình chính sách' },
          { name: 'Đồ họa dữ liệu động (Data Motion)', target: 'Độc giả trên ứng dụng di động', role: 'Làm nổi bật những xu hướng thống kê đáng kinh ngạc trong 60 giây' },
        ],
      },
    }),
  },

  // Block 14
  {
    type: 'block_14_channels',
    title: 'Hình 14: Kênh tự sở hữu vs Nền tảng phân phối ngoài',
    category: 'group3',
    description: 'Sơ đồ so sánh hai thái cực phát hành: Kênh độc lập tự kiểm soát (Owned) vs Nền tảng mạng xã hội (Third-party).',
    figureLabel: 'Hình 14',
    defaultData: (id) => ({
      id,
      type: 'block_14_channels',
      figureNumber: 'Hình 14',
      title: 'Sơ đồ kênh tự sở hữu vs Nền tảng phân phối ngoài',
      subtitle: 'Kiểm soát số phận tòa soạn thông qua tỷ lệ sở hữu kênh trực tiếp vượt trội.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Phân tích cấu trúc phân phối nội dung OneCMS',
      data: {
        ownedTitle: 'Kênh tự sở hữu (Owned & Operated - 75% trọng tâm)',
        ownedItems: ['Ứng dụng di động độc quyền', 'Bản tin email gửi trực tiếp', 'Trình duyệt web thành viên', 'Podcast trả phí nội bộ'],
        ownedBenefit: 'Toàn quyền sở hữu dữ liệu người dùng, 100% doanh thu, không sợ thay đổi thuật toán.',
        externalTitle: 'Nền tảng phân phối ngoài (Third-party - 25% phễu đầu)',
        externalItems: ['Kênh YouTube & TikTok', 'Mạng xã hội X và LinkedIn', 'Bộ tổng hợp tin tức Apple/Google', 'Nền tảng phát podcast công cộng'],
        externalBenefit: 'Tiếp cận người dùng mới ở quy mô lớn, nuôi dưỡng nhận biết ban đầu.',
      },
    }),
  },

  // Block 15
  {
    type: 'block_15_ai_layers',
    title: 'Hình 15: Mô hình 4 lớp hạ tầng AI quanh Báo chí con người',
    category: 'group3',
    description: '4 lớp công nghệ AI bảo vệ và hỗ trợ lõi biên tập con người: Bóc băng, Bản địa hóa, Siêu dữ liệu và Tra cứu kho lưu trữ.',
    figureLabel: 'Hình 15',
    defaultData: (id) => ({
      id,
      type: 'block_15_ai_layers',
      figureNumber: 'Hình 15',
      title: 'Mô hình 4 lớp hạ tầng AI quanh Báo chí con người',
      subtitle: 'Công nghệ phục vụ con người: Dùng trí tuệ nhân tạo giải phóng phóng viên để tập trung thẩm định sâu.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Đề án ứng dụng AI tòa soạn hiện đại',
      data: {
        coreTitle: 'Lõi biên tập Con người (Human Editorial Core)',
        coreDesc: 'Quyết định góc nhìn, phỏng vấn thực địa, phán đoán đạo đức và phong cách viết độc bản.',
        layer1: 'Lớp 1: Bóc băng ghi âm & Tóm tắt tư liệu',
        layer1Desc: 'Tự động chuyển âm thanh thành văn bản và trích xuất điểm nhấn phỏng vấn trong vài phút.',
        layer2: 'Lớp 2: Bản địa hóa & Chuyển ngữ chuẩn',
        layer2Desc: 'Hỗ trợ dịch thuật bản thảo sang nhiều ngôn ngữ với thuật ngữ kinh tế chính xác.',
        layer3: 'Lớp 3: Gắn thẻ siêu dữ liệu & Phân loại thông minh',
        layer3Desc: 'Gắn nhãn ngữ nghĩa, liên kết chủ đề và tối ưu hóa hệ thống gợi ý bài viết.',
        layer4: 'Lớp 4: Tra cứu ngữ nghĩa kho dữ liệu 180 năm',
        layer4Desc: 'Giúp phóng viên đối chiếu các bài viết cùng chủ đề trong quá khứ chỉ bằng một câu hỏi.',
      },
    }),
  },

  // Block 16
  {
    type: 'block_16_strategic_checklist',
    title: 'Hình 16: Khung 6 câu hỏi chiến lược cho người điều hành',
    category: 'group4',
    description: 'Checklist tương tác 6 câu hỏi then chốt đánh giá sự sẵn sàng thu phí nội dung.',
    figureLabel: 'Hình 16',
    defaultData: (id) => ({
      id,
      type: 'block_16_strategic_checklist',
      figureNumber: 'Hình 16',
      title: 'Khung 6 câu hỏi chiến lược cho người điều hành tòa soạn',
      subtitle: 'Bảng kiểm tra tương tác đánh giá mức độ lành mạnh của mô hình kinh doanh báo chí.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Bảng chẩn đoán chiến lược chuyển đổi số OneCMS',
      data: {
        questions: [
          { id: 'q1', text: 'Nội dung có giúp độc giả tiết kiệm thời gian hoặc kiếm tiền hiệu quả hơn không?', note: 'Nếu không mang lại giá trị thực dụng, họ sẽ không bao giờ bỏ tiền mua.', checked: true },
          { id: 'q2', text: 'Tòa soạn có quy trình kiểm chứng độc lập bảo đảm độ tin cậy tuyệt đối không?', note: 'Niềm tin là tài sản quý giá nhất mà độc giả sẵn sàng trả giá cao để sở hữu.', checked: true },
          { id: 'q3', text: 'Kênh phân phối trực tiếp (App, Newsletter) có chiếm trên 60% lưu lượng không?', note: 'Nếu sống nhờ mạng xã hội, bạn có thể bị mất khách hàng bất cứ lúc nào.', checked: false },
          { id: 'q4', text: 'Tòa soạn đã có phiên bản Audio cho hầu hết các bài phân tích quan trọng chưa?', note: 'Thói quen nghe báo đang bùng nổ mạnh mẽ ở nhóm độc giả có thu nhập cao.', checked: true },
          { id: 'q5', text: 'Doanh thu từ độc giả trả tiền trực tiếp có chiếm trên 50% tổng doanh thu?', note: 'Tỷ lệ vàng bảo đảm tòa soạn không bị phụ thuộc vào thị trường quảng cáo bấp bênh.', checked: false },
          { id: 'q6', text: 'Bạn đã triển khai gói bán bản quyền số lượng lớn cho khối doanh nghiệp (B2B)?', note: 'Hợp đồng tổ chức mang lại dòng tiền ổn định và chi phí chăm sóc thấp.', checked: true },
        ],
      },
    }),
  },

  // Block 17
  {
    type: 'block_17_b2b_ecosystem',
    title: 'Hình 17: Hệ sinh thái B2B: Content API & Teams/Slack',
    category: 'group4',
    description: 'Sơ đồ tích hợp luồng tin vào hạ tầng làm việc doanh nghiệp: Single Sign-On, Slack bot và Content API.',
    figureLabel: 'Hình 17',
    defaultData: (id) => ({
      id,
      type: 'block_17_b2b_ecosystem',
      figureNumber: 'Hình 17',
      title: 'Hệ sinh thái B2B: Content API & Tích hợp Teams/Slack',
      subtitle: 'Đưa tri thức báo chí trực tiếp vào quy trình làm việc hàng ngày của giới quản trị.',
      width: 'wide',
      tint: 'neutral',
      sourceNote: 'Nguồn: Giải pháp The Economist for Business',
      data: {
        col1Title: 'Cổng cấp quyền Doanh nghiệp (Enterprise SSO)',
        col1Desc: 'Nhân viên đăng nhập bằng email công ty qua Okta/Microsoft Entra mà không cần tạo tài khoản riêng.',
        col2Title: 'Tích hợp kênh làm việc (Teams / Slack Bot)',
        col2Desc: 'Bot tự động gửi bản tóm tắt phân tích vĩ mô vào kênh thảo luận chiến lược của ban giám đốc mỗi sáng.',
        col3Title: 'Giao diện API dữ liệu & Khảo cứu chuyên sâu',
        col3Desc: 'Cho phép bộ phận phân tích rủi ro của ngân hàng truy xuất trực tiếp kho dữ liệu dự phóng kinh tế.',
      },
    }),
  },

  // Block 18
  {
    type: 'block_18_pyramid',
    title: 'Hình 18: Kim tự tháp tổng kết & Lộ trình 2027',
    category: 'group4',
    description: 'Kim tự tháp 4 tầng tổng kết nền tảng thành công từ Niềm tin đến Quyết định chiến lược hướng tới 2027.',
    figureLabel: 'Hình 18',
    defaultData: (id) => ({
      id,
      type: 'block_18_pyramid',
      figureNumber: 'Hình 18',
      title: 'Kim tự tháp tổng kết & Lộ trình báo chí tương lai',
      subtitle: 'Các tầng giá trị cộng hưởng bảo đảm sự thịnh vượng bền vững cho tòa soạn.',
      width: 'wide',
      tint: 'white',
      sourceNote: 'Nguồn: Bản đồ chiến lược dài hạn The Economist 2027 Vision',
      data: {
        layer1: 'Đỉnh chóp: Quyết định chiến lược & Tác động xã hội',
        layer1Sub: 'Hỗ trợ các nhà lãnh đạo và doanh nhân đưa ra quyết định sáng suốt cho tương lai.',
        layer2: 'Tầng 2: Hệ sinh thái sản phẩm số đa giác quan',
        layer2Sub: 'App di động cao cấp, bản tin Audio, dữ liệu chuyên đề và cộng đồng hội thảo.',
        layer3: 'Tầng 3: Kỷ luật biên tập & Công nghệ trợ lực thông minh',
        layer3Sub: 'Ứng dụng AI vào nghiên cứu tư liệu nhưng giữ vững thẩm định con người làm trọng tâm.',
        layer4: 'Nền móng: Độc lập tư tưởng & Niềm tin của độc giả',
        layer4Sub: 'Nguyên lý không thỏa hiệp được giữ gìn suốt hơn 180 năm lịch sử uy tín.',
      },
    }),
  },
];
