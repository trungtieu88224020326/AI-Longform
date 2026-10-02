import { EditorialBlock, StoryMetadata } from '../types/editorial';

export const SAMPLE_RAW_TEXT = `HỒ SƠ ĐẶC BIỆT: MÔ HÌNH BÁO CHÍ THU PHÍ THE ECONOMIST
Bí quyết giữ chân 1,2 triệu độc giả trung thành và kiến trúc doanh thu độc lập thế kỷ 21

Sapo: Không chạy đua tin tức giật gân, không bán rẻ sự chú ý cho quảng cáo mạng hiển thị. Bằng việc xây dựng phễu hội tụ từ tin vắn đến bản tin phân tích độc quyền, The Economist đã chứng minh báo chí chất lượng cao vẫn có thể phát triển bền vững với doanh thu 380 triệu bảng Anh mỗi năm.

Tại tòa soạn The Economist tại London, triết lý xuất bản không bắt đầu bằng câu hỏi "Chuyện gì vừa xảy ra cách đây 5 phút?". Thay vào đó, ban biên tập đặt ra câu hỏi khắt khe hơn: "Sự kiện này có ý nghĩa gì đối với trật tự kinh tế toàn cầu trong 5 năm tới?". Đây chính là nguyên lý cốt lõi đã bảo vệ ấn phẩm danh tiếng suốt hơn 180 năm kể từ ngày thành lập vào năm 1843.

Các chỉ số tài chính chủ chốt ghi nhận trong báo cáo thường niên:
- 1,2 triệu thuê bao trả phí toàn cầu, trong đó 65% là thuê bao thuần số hóa (digital-only).
- 380 triệu bảng Anh doanh thu hàng năm với biên lợi nhuận hoạt động ổn định trên 18%.
- 89% tỷ lệ gia hạn thuê bao hàng năm (renewal rate), thuộc nhóm cao nhất trong ngành truyền thông thế giới.
- 4,2 giờ đọc và nghe bình quân mỗi tuần của độc giả cao cấp.

> "Chúng tôi không bán giấy hay pixel. Chúng tôi bán thời gian tiết kiệm cho người bận rộn và góc nhìn thấu suốt giúp các nhà lãnh đạo ra quyết định chính xác."

Quy trình biên tập hội tụ thông tin 3 tầng:
1. Tầng 1: Thu thập và chắt lọc tin tức rời rạc trên toàn cầu.
2. Tầng 2: Đặt sự kiện vào bối cảnh kinh tế - chính trị lịch sử.
3. Tầng 3: Tổng hợp thành phân tích thấu hiểu định hướng tương lai.

Hào lũy cạnh tranh biên tập được xây dựng trên 6 yếu tố bất khả xâm phạm:
- Giọng văn tập thể vô danh (Collective Voice) bảo đảm tính khách quan tuyệt đối.
- Mạng lưới phóng viên thường trú tại hơn 70 quốc gia độc lập tác nghiệp.
- Phòng dữ liệu chuyên sâu kết hợp đồ họa báo chí chuẩn mực cao.
- Sự kết hợp hài hòa giữa ngòi bút kinh tế học và triết lý tự do thương mại.
- Quy trình kiểm chứng sự thật độc lập (Fact-checking) 2 vòng trước khi phát hành.
- Di sản lưu trữ hơn 180 năm cung cấp dữ liệu đối chiếu lịch sử vô giá.

Khảo sát độc giả cho thấy 4 đặc điểm tư duy nổi bật:
- Tâm lý coi trọng hiệu quả thời gian (Time-poor, insight-hungry).
- Khát vọng tiếp cận tri thức toàn cầu không thiên vị địa phương.
- Tinh thần chủ động cao trong sự nghiệp và đầu tư tài chính.
- Sẵn sàng chi trả mức phí cao cho thông tin có độ tin cậy được bảo chứng.

Tiến trình 5 bước phát triển sản phẩm Insider:
- Bước 1: Nhận diện nhu cầu chuyên sâu theo từng ngành dọc (Niche Identification).
- Bước 2: Thử nghiệm bản tin chuyên gia chọn lọc (Pilot Newsletter).
- Bước 3: Thành lập đơn vị biên tập chuyên trách (Dedicated Editorial Unit).
- Bước 4: Đóng gói thành gói thuê bao nâng cao (Premium Tier Integration).
- Bước 5: Mở rộng sang giải pháp doanh nghiệp và dữ liệu B2B (Enterprise Scaling).

Khung câu hỏi chiến lược cho người làm báo:
- Liệu nội dung của bạn có giúp độc giả tiết kiệm thời gian hay đang lãng phí thì giờ của họ?
- Bạn có sở hữu độc quyền góc nhìn phân tích hay chỉ xào xáo lại thông cáo báo chí?
- Tỷ lệ doanh thu từ độc giả trả tiền trực tiếp có vượt qua 50% tổng doanh thu không?
- Ứng dụng di động của bạn có phải là điểm đến đầu tiên trong ngày của độc giả trung thành?
- Bạn đang ứng dụng trí tuệ nhân tạo để giải phóng phóng viên hay để sản xuất nội dung hàng loạt giá rẻ?
- Độc giả có sẵn sàng giới thiệu ấn phẩm cho đồng nghiệp trong ban điều hành không?`;

export const DEFAULT_METADATA: StoryMetadata = {
  kicker: 'Hồ sơ truyền thông & Chuyển đổi số',
  title: 'Kiến trúc báo chí thu phí của The Economist',
  dek: 'Bí quyết giữ chân 1,2 triệu độc giả trung thành, xây dựng hào lũy biên tập và kiến tạo hệ sinh thái sản phẩm số bền vững thế kỷ 21.',
  author: 'Ban Phân tích Chiến lược OneCMS',
  role: 'Chuyên đề Tạp chí Số',
  publishDate: 'Tháng 10, 2026',
  readTime: '8 phút đọc',
  issueNumber: 'Tập 42 / Chuyên đề Báo chí Thu phí',
};

export const DEFAULT_BLOCKS: EditorialBlock[] = [
  {
    id: 'hero-1',
    type: 'hero',
    width: 'wide',
    tint: 'white',
    data: {
      kicker: 'Hồ sơ truyền thông & Chuyển đổi số',
      title: 'Kiến trúc báo chí thu phí của The Economist',
      dek: 'Bí quyết giữ chân 1,2 triệu độc giả trung thành, xây dựng hào lũy biên tập và kiến tạo hệ sinh thái sản phẩm số bền vững thế kỷ 21.',
      author: 'Ban Phân tích Chiến lược OneCMS',
      publishDate: 'Tháng 10, 2026',
      readTime: '8 phút đọc',
      accentRule: true,
    },
  },
  {
    id: 'audio-1',
    type: 'audio_bar',
    width: 'boxed',
    tint: 'rose',
    data: {
      label: 'Phiên bản đọc Audio cho độc giả bận rộn',
      duration: '14 phút 25 giây',
      narrator: 'Giọng đọc AI Biên tập viên chuẩn mực',
      srcUrl: '#',
    },
  },
  {
    id: 'intro-dropcap',
    type: 'dropcap_body',
    width: 'boxed',
    tint: 'white',
    data: {
      content:
        'Tại trụ sở The Economist tại London, triết lý xuất bản không bắt đầu bằng câu hỏi "Chuyện gì vừa xảy ra cách đây 5 phút?". Thay vào đó, các biên tập viên đặt ra một câu hỏi khắt khe hơn: "Sự kiện này có ý nghĩa gì đối với trật tự kinh tế toàn cầu trong 5 năm tới?". Đây chính là nguyên lý cốt lõi đã bảo vệ ấn phẩm danh tiếng suốt hơn 180 năm kể từ ngày thành lập vào năm 1843, biến một tờ tuần báo giấy thành cỗ máy nội dung đa nền tảng có khả năng thuyết phục hơn một triệu độc giả trả tiền hàng năm.',
    },
  },
  {
    id: 'block-1',
    type: 'block_1_funnel',
    figureNumber: 'Hình 1',
    title: 'Phễu hội tụ thông tin 3 tầng của The Economist',
    subtitle: 'Chuyển hóa dòng thác tin tức hỗn loạn thành tri thức hành động giá trị cao cho người ra quyết định.',
    width: 'wide',
    tint: 'neutral',
    sourceNote: 'Nguồn: Mô hình quản trị biên tập The Economist Group',
    data: {
      level1Title: 'Tầng 1: Tin tức rời rạc toàn cầu',
      level1Desc: 'Dòng sự kiện hàng ngày, phát ngôn ngoại giao, biến động thị trường và thông cáo báo chí từ khắp nơi.',
      level1Tag: 'Đầu vào đại chúng',
      level2Title: 'Tầng 2: Bối cảnh hóa & Phân tích đa chiều',
      level2Desc: 'Đối chiếu lịch sử, kiểm chứng số liệu kinh tế và loại bỏ các yếu tố suy diễn cảm tính ngắn hạn.',
      level2Tag: 'Bộ lọc biên tập',
      level3Title: 'Tầng 3: Thấu hiểu chiến lược & Định hướng',
      level3Desc: 'Góc nhìn độc quyền, dự phóng tác động chính sách và khuyến nghị then chốt giúp độc giả hành động.',
      level3Tag: 'Giá trị thu phí',
    },
  },
  {
    id: 'block-2',
    type: 'block_2_stats',
    figureNumber: 'Hình 2',
    title: 'Lưới 4 chỉ số tài chính và độc giả chủ chốt',
    subtitle: 'Sức mạnh của chiến lược tập trung vào độc giả trả phí cao thay vì bán quảng cáo đại trà.',
    width: 'wide',
    tint: 'white',
    sourceNote: 'Báo cáo tài chính thường niên The Economist Group',
    data: {
      stat1Value: '1,2M',
      stat1Label: 'Thuê bao trả phí toàn cầu',
      stat1Context: 'Tăng trưởng 8% so với cùng kỳ, 65% là độc giả thuần số.',
      stat2Value: '£380M',
      stat2Label: 'Doanh thu hàng năm',
      stat2Context: 'Doanh thu trực tiếp từ độc giả chiếm trên 70% tổng nguồn thu.',
      stat3Value: '89%',
      stat3Label: 'Tỷ lệ gia hạn thuê bao',
      stat3Context: 'Tỷ lệ trung thành cao gấp 2 lần mức trung bình của báo chí Mỹ.',
      stat4Value: '4,2 giờ',
      stat4Label: 'Thời lượng đọc & nghe bình quân/tuần',
      stat4Context: 'Sự gắn kết sâu sắc trên ứng dụng di động và podcast độc quyền.',
    },
  },
  {
    id: 'quote-1',
    type: 'pullquote',
    width: 'boxed',
    tint: 'white',
    data: {
      quote:
        'Chúng tôi không bán giấy in hay điểm ảnh. Chúng tôi bán thời gian tiết kiệm cho những người bận rộn và góc nhìn thấu suốt giúp các nhà lãnh đạo đưa ra quyết định chính xác.',
      author: 'Zanny Minton Beddoes',
      role: 'Tổng Biên tập The Economist',
    },
  },
  {
    id: 'block-3',
    type: 'block_3_heritage',
    figureNumber: 'Hình 3',
    title: 'Di sản thương hiệu 1843 & Nguyên lý báo chí vô danh',
    subtitle: 'Sự kết hợp giữa uy tín lịch sử hơn một thế kỷ và tiếng nói biên tập tập thể độc nhất vô nhị.',
    width: 'wide',
    tint: 'neutral',
    sourceNote: 'Lưu trữ The Economist Archive Trust',
    data: {
      yearBadge: 'Thành lập 1843',
      heritageTitle: 'Di sản tự do thương mại & Trí tuệ mở',
      heritageText:
        'Được sáng lập bởi James Wilson tại London để phản đối Đạo luật Ngũ cốc, tờ báo giữ vững lập trường thúc đẩy thương mại tự do và tư duy logic khách quan qua hai thế kỷ.',
      anonymousTitle: 'Nguyên lý tiếng nói tập thể (Collective Voice)',
      anonymousText:
        'Hầu hết các bài viết không có dòng tên tác giả (byline). Toàn bộ ấn phẩm nói bằng một giọng văn nhất quán, bảo đảm bài phân tích là kết tinh trí tuệ của hội đồng biên tập chứ không phụ thuộc vào cái tôi cá nhân.',
      tag1: 'Không byline cá nhân',
      tag2: 'Trách nhiệm tập thể',
      tag3: 'Khách quan tối đa',
    },
  },
  {
    id: 'block-4',
    type: 'block_4_moat',
    figureNumber: 'Hình 4',
    title: 'Lưới 6 thành phần Hào lũy biên tập (Editorial Moat)',
    subtitle: 'Những năng lực cốt lõi mà mạng xã hội và các trang tin tức tổng hợp không thể sao chép.',
    width: 'wide',
    tint: 'white',
    sourceNote: 'Phân tích cấu trúc cạnh tranh truyền thông số',
    data: {
      items: [
        {
          num: '01',
          name: 'Giọng văn vô danh',
          desc: 'Xóa bỏ cái tôi cá nhân để duy trì sự nhất quán và chuẩn mực trí thức cao nhất.',
        },
        {
          num: '02',
          name: 'Mạng lưới 70 quốc gia',
          desc: 'Phóng viên thường trú trực tiếp quan sát và tiếp cận nguồn tin ngoại giao cấp cao.',
        },
        {
          num: '03',
          name: 'Đồ họa & Dữ liệu chuẩn mực',
          desc: 'Đội ngũ chuyên trách biến các tập dữ liệu phức tạp thành biểu đồ tối giản dễ hiểu.',
        },
        {
          num: '04',
          name: 'Thẩm định 2 vòng',
          desc: 'Mọi con số, trích dẫn đều được kiểm tra độc lập trước khi ấn phẩm lên khuôn.',
        },
        {
          num: '05',
          name: 'Quan điểm kinh tế học sâu sắc',
          desc: 'Áp dụng lăng kính phân tích chi phí - lợi ích và cân bằng vĩ mô vào mọi vấn đề.',
        },
        {
          num: '06',
          name: 'Kho lưu trữ 180 năm',
          desc: 'Dữ liệu lịch sử xuyên suốt giúp đối chiếu các chu kỳ kinh tế và chính trị dài hạn.',
        },
      ],
      conclusion:
        'Kết luận biên tập: Hào lũy bền vững nhất của báo chí không nằm ở công nghệ phân phối mà nằm ở sự kiên định với chuẩn mực thẩm định và năng lực tổng hợp thấu đáo.',
    },
  },
  {
    id: 'block-5',
    type: 'block_5_mindset',
    figureNumber: 'Hình 5',
    title: 'Ma trận 4 đặc điểm tư duy độc giả mục tiêu',
    subtitle: 'Hiểu rõ chân dung độc giả là chìa khóa để định giá sản phẩm và thiết kế nội dung phù hợp.',
    width: 'wide',
    tint: 'neutral',
    sourceNote: 'Nghiên cứu thị trường độc giả toàn cầu OneCMS',
    data: {
      card1Title: 'Hiệu quả thời gian (Time-poor)',
      card1Desc: 'Độc giả bận rộn không có thời gian đọc hàng chục tin tức mỗi ngày. Họ cần bài tổng thuật 500 từ tóm lược trọn vẹn bản chất vấn đề.',
      card2Title: 'Tầm nhìn toàn cầu (Globalist)',
      card2Desc: 'Nhìn nhận vấn đề vượt ra khỏi biên giới quốc gia, quan tâm sâu sắc tới chuỗi cung ứng và chính sách tiền tệ quốc tế.',
      card3Title: 'Tinh thần chủ động cao (High Agency)',
      card3Desc: 'Những nhà lãnh đạo doanh nghiệp và hoạch định chính sách muốn tìm kiếm lời giải và dự phóng hành động thay vì than phiền tiêu cực.',
      card4Title: 'Sẵn sàng chi trả cao (High WTP)',
      card4Desc: 'Họ coi phí đọc báo là khoản đầu tư cho tri thức nghề nghiệp chứ không phải chi phí giải trí thông thường.',
    },
  },
  {
    id: 'block-6',
    type: 'block_6_daily_timeline',
    figureNumber: 'Hình 6',
    title: 'Bản đồ hành vi trong ngày vs 5 định dạng nội dung',
    subtitle: 'Đồng hành cùng độc giả từ lúc thức dậy tới khi kết thúc ngày làm việc.',
    width: 'wide',
    tint: 'white',
    sourceNote: 'Phân tích thói quen độc giả đa thiết bị',
    data: {
      slots: [
        { time: '06:30', name: 'The Espresso', format: 'Bản tin ngắn trên app', desc: '5 tin vắn quan trọng nhất thế giới đọc trong 3 phút đầu ngày.' },
        { time: '08:15', name: 'Audio Edition', format: 'Đọc báo qua tai nghe', desc: 'Nghe trọn vẹn bài phân tích trong lúc di chuyển đến nơi làm việc.' },
        { time: '12:30', name: 'Web Deep-dive', format: 'Trình duyệt máy tính', desc: 'Đọc biểu đồ tương tác và dữ liệu chuyên sâu trong giờ nghỉ trưa.' },
        { time: '18:00', name: 'The Intelligence', format: 'Daily Podcast', desc: 'Podcast 20 phút trò chuyện cùng các phóng viên hiện trường.' },
        { time: '21:30', name: 'Weekly Print / iPad', format: 'Ấn phẩm tuần số hóa', desc: 'Đọc chậm các bài khảo luận dài hạn và bình luận văn hóa cuối ngày.' },
      ],
    },
  },
  {
    id: 'block-7',
    type: 'block_7_ladder',
    figureNumber: 'Hình 7',
    title: 'Cầu thang 7 nấc kiến trúc sản phẩm số',
    subtitle: 'Lộ trình dẫn dắt độc giả từ người qua đường thành khách hàng trả phí trọn đời.',
    width: 'wide',
    tint: 'neutral',
    sourceNote: 'Mô hình bậc thang giá trị OneCMS',
    data: {
      steps: [
        { step: 'Nấc 1', label: 'Mạng xã hội & Video ngắn', audience: 'Công chúng rộng rãi', conversion: 'Khơi gợi tò mò' },
        { step: 'Nấc 2', label: 'Bản tin Email miễn phí', audience: 'Độc giả ghé thăm', conversion: 'Thu thập email' },
        { step: 'Nấc 3', label: 'Tài khoản đăng ký dùng thử', audience: 'Người đọc thường xuyên', conversion: 'Trải nghiệm app' },
        { step: 'Nấc 4', label: 'Thuê bao Số cơ bản (Digital Standard)', audience: 'Độc giả cá nhân', conversion: 'Chuyển đổi thanh toán' },
        { step: 'Nấc 5', label: 'Thuê bao Toàn diện (Digital + Print)', audience: 'Độc giả trung thành', conversion: 'Tăng giá trị trọn đời' },
        { step: 'Nấc 6', label: 'Gói Doanh nghiệp (Corporate B2B)', audience: 'Tổ chức & Tập đoàn', conversion: 'Hợp đồng hàng loạt' },
        { step: 'Nấc 7', label: 'Executive Briefing & Dữ liệu API', audience: 'Lãnh đạo cấp cao', conversion: 'Phí cao cấp' },
      ],
    },
  },
  {
    id: 'block-8',
    type: 'block_8_comparison',
    figureNumber: 'Hình 8',
    title: 'Bảng đối sánh mô hình thuê bao cũ vs Kiến trúc 3 chiều mới',
    subtitle: 'Sự dịch chuyển từ tư duy bán báo giấy truyền thống sang hệ sinh thái sản phẩm số hiện đại.',
    width: 'wide',
    tint: 'white',
    sourceNote: 'So sánh cấu trúc vận hành tòa soạn hiện đại',
    data: {
      colLeftTitle: 'Mô hình báo in & Quảng cáo cũ',
      colRightTitle: 'Kiến trúc 3 chiều của The Economist',
      rows: [
        { criteria: 'Mục tiêu tối thượng', left: 'Tối đa hóa lượng phát hành và số lượt xem trang (pageviews)', right: 'Tối đa hóa tỷ lệ gia hạn và sự gắn kết trung thành' },
        { criteria: 'Nguồn thu chính', left: 'Phụ thuộc 60-80% vào các hợp đồng quảng cáo hiển thị', right: 'Hơn 70% doanh thu đến trực tiếp từ thuê bao độc giả' },
        { criteria: 'Định dạng sản phẩm', left: 'Báo giấy cố định và trang web sao chép nguyên văn bản in', right: 'Đa định dạng: Bản tin Espresso, Audio trọn vẹn, Video khảo sát' },
        { criteria: 'Đo lường hiệu quả', left: 'Số click, thời gian tải trang, số lượng banner hiển thị', right: 'Tần suất mở app hàng tuần và tỷ lệ hoàn thành bài đọc/nghe' },
        { criteria: 'Quan hệ với độc giả', left: 'Vô danh, một chiều, không nắm được dữ liệu người mua', right: 'Trực tiếp 1-1, cá nhân hóa theo chủ đề và kênh ưu thích' },
      ],
    },
  },
  {
    id: 'block-16',
    type: 'block_16_strategic_checklist',
    figureNumber: 'Hình 16',
    title: 'Khung 6 câu hỏi chiến lược cho người điều hành tòa soạn',
    subtitle: 'Bảng tự kiểm tra đánh giá mức độ sẵn sàng chuyển đổi số và thu phí nội dung.',
    width: 'wide',
    tint: 'neutral',
    sourceNote: 'Khung đánh giá tòa soạn số OneCMS Diagnostic',
    data: {
      questions: [
        {
          id: 'q1',
          text: 'Nội dung của bạn có giúp người đọc tiết kiệm thời gian hoặc kiếm tiền không?',
          note: 'Nếu chỉ đơn thuần là tin tức sự kiện, người đọc sẽ tìm thấy miễn phí ở nơi khác.',
          checked: true,
        },
        {
          id: 'q2',
          text: 'Tòa soạn có quy trình kiểm chứng số liệu độc lập trước khi phát bản tin không?',
          note: 'Độ tin cậy tuyệt đối là lý do duy nhất khiến độc giả chấp nhận trả mức giá cao.',
          checked: true,
        },
        {
          id: 'q3',
          text: 'Bạn có sở hữu kênh phát hành trực tiếp (ứng dụng di động, newsletter) trên 60% không?',
          note: 'Phụ thuộc vào thuật toán mạng xã hội sẽ khiến tòa soạn mất quyền kiểm soát doanh thu.',
          checked: false,
        },
        {
          id: 'q4',
          text: 'Ứng dụng của bạn có cung cấp tính năng nghe Audio chất lượng cao cho toàn bộ bài viết?',
          note: 'Hơn 40% thời gian tiêu thụ nội dung hiện đại diễn ra qua đôi tai khi độc giả di chuyển.',
          checked: true,
        },
        {
          id: 'q5',
          text: 'Tỷ lệ doanh thu độc giả trả tiền có vượt qua mốc 50% tổng doanh thu của cơ quan báo chí?',
          note: 'Mốc sống còn để bảo đảm độc lập biên tập và vượt qua biến động thị trường quảng cáo.',
          checked: false,
        },
        {
          id: 'q6',
          text: 'Bạn đã xây dựng gói sản phẩm B2B bán theo số lượng lớn cho doanh nghiệp và trường học?',
          note: 'Doanh thu tổ chức có giá trị hợp đồng cao và tỷ lệ duy trì hợp đồng ổn định nhiều năm.',
          checked: true,
        },
      ],
    },
  },
  {
    id: 'block-18',
    type: 'block_18_pyramid',
    figureNumber: 'Hình 18',
    title: 'Kim tự tháp tổng kết & Lộ trình báo chí tương lai',
    subtitle: 'Nền tảng niềm tin và các tầng giá trị gia tăng bảo đảm tương lai bền vững.',
    width: 'wide',
    tint: 'white',
    sourceNote: 'Chiến lược dài hạn The Economist 2027 Vision',
    data: {
      layer1: 'Đỉnh chóp: Quyết định chiến lược & Tác động xã hội',
      layer1Sub: 'Hỗ trợ các nhà lãnh đạo và doanh nhân đưa ra lựa chọn đúng đắn cho tương lai.',
      layer2: 'Tầng 2: Hệ sinh thái sản phẩm số đa giác quan',
      layer2Sub: 'App di động cao cấp, bản tin Audio, dữ liệu chuyên đề và cộng đồng tri thức.',
      layer3: 'Tầng 3: Kỷ luật biên tập & Công nghệ trợ lực thông minh',
      layer3Sub: 'Ứng dụng AI vào tổng hợp dữ liệu nhưng kiên quyết giữ vững thẩm định con người.',
      layer4: 'Nền móng: Độc lập tư tưởng & Niềm tin của độc giả',
      layer4Sub: 'Nguyên lý không thỏa hiệp được duy trì suốt 180 năm lịch sử uy tín.',
    },
  },
];
