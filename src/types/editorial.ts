export type BlockWidth = 'boxed' | 'wide' | 'full';
export type BlockTint = 'white' | 'neutral' | 'rose' | 'dark';

export type BlockType =
  | 'hero'
  | 'audio_bar'
  | 'dropcap_body'
  | 'pullquote'
  | 'section_divider'
  | 'block_1_funnel'
  | 'block_2_stats'
  | 'block_3_heritage'
  | 'block_4_moat'
  | 'block_5_mindset'
  | 'block_6_daily_timeline'
  | 'block_7_ladder'
  | 'block_8_comparison'
  | 'block_9_video_funnel'
  | 'block_10_podcast_paywall'
  | 'block_11_app_hub'
  | 'block_12_insider_steps'
  | 'block_13_video_matrix'
  | 'block_14_channels'
  | 'block_15_ai_layers'
  | 'block_16_strategic_checklist'
  | 'block_17_b2b_ecosystem'
  | 'block_18_pyramid';

export interface StoryMetadata {
  kicker: string;
  title: string;
  dek: string;
  author: string;
  role: string;
  publishDate: string;
  readTime: string;
  issueNumber: string;
}

export interface EditorialBlock {
  id: string;
  type: BlockType;
  figureNumber?: string;
  title?: string;
  subtitle?: string;
  caption?: string;
  sourceNote?: string;
  width: BlockWidth;
  tint: BlockTint;
  // Specific payload depending on type
  data: Record<string, any>;
}
