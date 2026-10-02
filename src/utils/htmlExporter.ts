import { EditorialBlock, StoryMetadata } from '../types/editorial';

export function generateStandaloneHTML(metadata: StoryMetadata, blocks: EditorialBlock[]): string {
  const renderedBlocksHTML = blocks
    .map((block) => renderBlockToStaticHTML(block))
    .join('\n\n');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(metadata.title)}</title>
  <meta name="description" content="${escapeHTML(metadata.dek)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap" rel="stylesheet">
  <style>
    /* Strict Design System Implementation (DESIGN.md) */
    :root {
      --font-serif: 'Merriweather', Georgia, serif;
      --font-ui: 'Merriweather Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      --font-body: Arial, Helvetica, sans-serif;
      --color-rose: #b13460;
      --color-rose-subdued: rgba(177, 52, 96, 0.08);
      --color-dark: #222222;
      --color-border: #e0e0e0;
      --color-bg: #f8f9fa;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--color-bg);
      color: var(--color-dark);
      font-family: var(--font-body);
      font-size: 16px;
      line-height: 1.75;
      -webkit-font-smoothing: antialiased;
      padding: 24px 16px 80px 16px;
    }

    .story-container {
      max-width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid var(--color-border);
      padding: 40px 24px;
    }

    @media (min-width: 768px) {
      body {
        padding: 40px 24px 100px 24px;
      }
      .story-container {
        padding: 64px 48px;
      }
    }

    /* Typography */
    h1, h2, h3, h4, h5, .font-serif {
      font-family: var(--font-serif);
      font-weight: 700;
      text-transform: none; /* Ban on all-caps shouting */
    }

    .font-ui {
      font-family: var(--font-ui);
      text-transform: none;
    }

    .font-body {
      font-family: var(--font-body);
    }

    /* Width variants */
    .block-boxed {
      max-width: 768px;
      margin-left: auto;
      margin-right: auto;
    }
    .block-wide {
      max-width: 1024px;
      margin-left: auto;
      margin-right: auto;
    }
    .block-full {
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }

    /* Tint variants */
    .tint-white {
      background-color: #ffffff;
      color: var(--color-dark);
      border: 1px solid var(--color-border);
    }
    .tint-neutral {
      background-color: #f8f9fa;
      color: var(--color-dark);
      border: 1px solid var(--color-border);
    }
    .tint-rose {
      background-color: rgba(177, 52, 96, 0.05);
      color: var(--color-dark);
      border: 1px solid rgba(177, 52, 96, 0.2);
    }
    .tint-dark {
      background-color: #222222;
      color: #f8f9fa;
      border: 1px solid #333333;
    }
    .tint-dark h1, .tint-dark h2, .tint-dark h3, .tint-dark h4 {
      color: #ffffff;
    }
    .tint-dark p, .tint-dark td {
      color: #d1d5db;
    }

    /* Primitives */
    .editorial-drop-cap::first-letter {
      float: left;
      font-family: var(--font-serif);
      font-size: 3.5rem;
      line-height: 0.85;
      padding-top: 0.15rem;
      padding-right: 0.65rem;
      padding-bottom: 0.1rem;
      color: var(--color-rose);
      font-weight: 700;
    }

    .figure-header {
      margin-bottom: 20px;
    }
    .figure-badge {
      display: inline-block;
      font-family: var(--font-ui);
      font-size: 11px;
      font-weight: 700;
      color: var(--color-rose);
      background: rgba(177, 52, 96, 0.06);
      border: 1px solid rgba(177, 52, 96, 0.3);
      padding: 2px 8px;
      margin-bottom: 8px;
    }
    .figure-title {
      font-size: 22px;
      color: var(--color-dark);
      line-height: 1.3;
      margin-bottom: 6px;
    }
    .figure-subtitle {
      font-size: 14px;
      color: #555555;
      line-height: 1.6;
    }
    .figure-footer {
      margin-top: 20px;
      padding-top: 12px;
      border-top: 1px solid var(--color-border);
      font-size: 12px;
      color: #777777;
      font-style: italic;
    }

    /* Grids & Cards */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .grid-5 {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }

    @media (min-width: 640px) {
      .grid-2 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
      .grid-5 { grid-template-columns: repeat(3, 1fr); }
    }
    @media (min-width: 900px) {
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
      .grid-4 { grid-template-columns: repeat(4, 1fr); }
      .grid-5 { grid-template-columns: repeat(5, 1fr); }
    }

    .stat-card {
      padding: 20px;
      border: 1px solid var(--color-border);
      background: #ffffff;
    }
    .stat-val {
      font-family: var(--font-ui);
      font-size: 32px;
      font-weight: 700;
      color: var(--color-rose);
      line-height: 1.1;
      margin-bottom: 6px;
    }
    .stat-label {
      font-family: var(--font-ui);
      font-size: 13px;
      font-weight: 700;
      color: var(--color-dark);
      margin-bottom: 8px;
    }
    .stat-ctx {
      font-size: 12px;
      color: #666666;
      border-top: 1px solid var(--color-border);
      padding-top: 8px;
      line-height: 1.5;
    }

    .pullquote-box {
      border-left: 4px solid var(--color-rose);
      background: rgba(177, 52, 96, 0.03);
      border-top: 1px solid var(--color-border);
      border-right: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      padding: 24px;
      margin: 32px 0;
    }
    .pullquote-text {
      font-family: var(--font-serif);
      font-size: 20px;
      font-style: italic;
      color: var(--color-dark);
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .pullquote-author {
      font-family: var(--font-ui);
      font-size: 13px;
      color: #666666;
    }
    .pullquote-author strong {
      color: var(--color-rose);
    }

    /* Comparison Table */
    table.editorial-table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--color-border);
      font-size: 14px;
    }
    table.editorial-table th {
      padding: 12px;
      background: #f1f1f1;
      text-align: left;
      font-family: var(--font-ui);
      font-size: 12px;
      border-bottom: 1px solid var(--color-border);
    }
    table.editorial-table td {
      padding: 12px;
      border-bottom: 1px solid var(--color-border);
      vertical-align: top;
      line-height: 1.5;
    }

    /* Interactive Checklist */
    .checklist-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      padding: 14px;
      border: 1px solid var(--color-border);
      background: #ffffff;
      margin-bottom: 8px;
      cursor: pointer;
    }
    .checklist-item.checked {
      border-color: rgba(177, 52, 96, 0.4);
      background: rgba(177, 52, 96, 0.04);
    }
    .checklist-box {
      width: 18px;
      height: 18px;
      border: 2px solid var(--color-rose);
      margin-top: 2px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .checklist-item.checked .checklist-box::after {
      content: '✓';
      color: var(--color-rose);
      font-size: 14px;
      font-weight: bold;
    }

    /* Audio Bar */
    .audio-bar-container {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 16px 20px;
      background: rgba(177, 52, 96, 0.06);
      border: 1px solid rgba(177, 52, 96, 0.25);
      margin: 24px 0;
    }
  </style>
</head>
<body>

  <article class="story-container">
    ${renderedBlocksHTML}
  </article>

  <script>
    // Pure vanilla interaction for checklist
    document.querySelectorAll('.checklist-item').forEach(function(item) {
      item.addEventListener('click', function() {
        item.classList.toggle('checked');
      });
    });
  </script>
</body>
</html>`;
}

function escapeHTML(str?: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderBlockToStaticHTML(block: EditorialBlock): string {
  const widthClass = `block-${block.width}`;
  const tintClass = `tint-${block.tint}`;

  const renderFigureHeaderHTML = () => {
    if (!block.title && !block.figureNumber) return '';
    return `
      <div class="figure-header">
        ${block.figureNumber ? `<span class="figure-badge">${escapeHTML(block.figureNumber)}</span>` : ''}
        ${block.title ? `<h3 class="figure-title">${escapeHTML(block.title)}</h3>` : ''}
        ${block.subtitle ? `<p class="figure-subtitle">${escapeHTML(block.subtitle)}</p>` : ''}
      </div>
    `;
  };

  const renderFigureFooterHTML = () => {
    if (!block.sourceNote && !block.caption) return '';
    return `
      <div class="figure-footer">
        ${block.caption ? `<span>${escapeHTML(block.caption)}</span>` : ''}
        ${block.sourceNote ? `<span>${escapeHTML(block.sourceNote)}</span>` : ''}
      </div>
    `;
  };

  switch (block.type) {
    case 'hero':
      return `
      <header class="${widthClass}" style="padding-bottom: 32px; margin-bottom: 32px; border-bottom: 1px solid var(--color-border);">
        ${block.data.kicker ? `<div style="margin-bottom: 16px;"><span class="font-ui" style="font-size: 13px; font-weight: 700; color: var(--color-rose); border-bottom: 2px solid var(--color-rose); padding-bottom: 4px;">${escapeHTML(block.data.kicker)}</span></div>` : ''}
        <h1 style="font-size: 38px; line-height: 1.2; margin-bottom: 20px; color: var(--color-dark);">${escapeHTML(block.data.title)}</h1>
        ${block.data.dek ? `<p style="font-size: 19px; line-height: 1.6; color: #444444; margin-bottom: 24px;">${escapeHTML(block.data.dek)}</p>` : ''}
        <div class="font-ui" style="font-size: 13px; color: #777777; display: flex; gap: 12px; align-items: center; border-top: 1px solid var(--color-border); padding-top: 14px;">
          <strong>${escapeHTML(block.data.author || 'Ban Biên tập')}</strong>
          ${block.data.publishDate ? `<span>·</span><span>${escapeHTML(block.data.publishDate)}</span>` : ''}
          ${block.data.readTime ? `<span>·</span><span>${escapeHTML(block.data.readTime)}</span>` : ''}
        </div>
      </header>
      `;

    case 'audio_bar':
      return `
      <section class="audio-bar-container ${widthClass}">
        <div>
          <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose); padding: 2px 6px; background: rgba(177,52,96,0.1); border: 1px solid rgba(177,52,96,0.2);">Audio Edition · ${escapeHTML(block.data.duration)}</span>
          <p class="font-serif" style="font-size: 15px; font-weight: bold; margin-top: 6px;">${escapeHTML(block.data.label)}</p>
        </div>
        <div class="font-ui" style="font-size: 12px; color: #666666;">
          <span>${escapeHTML(block.data.narrator)}</span>
        </div>
      </section>
      `;

    case 'dropcap_body':
      return `
      <div class="${widthClass}" style="margin: 24px auto;">
        <p class="${block.data.noDropCap ? '' : 'editorial-drop-cap'}" style="font-size: 17px; line-height: 1.85; color: var(--color-dark);">
          ${escapeHTML(block.data.content)}
        </p>
      </div>
      `;

    case 'pullquote':
      return `
      <blockquote class="pullquote-box ${widthClass}">
        <p class="pullquote-text">"${escapeHTML(block.data.quote)}"</p>
        <div class="pullquote-author">
          <strong>${escapeHTML(block.data.author)}</strong>
          ${block.data.role ? ` / <span>${escapeHTML(block.data.role)}</span>` : ''}
        </div>
      </blockquote>
      `;

    case 'section_divider':
      return `
      <div class="${widthClass}" style="margin: 48px auto 24px auto; padding-top: 24px; border-top: 2px solid var(--color-dark);">
        <span class="font-ui" style="font-size: 12px; font-weight: bold; color: var(--color-rose); display: block; margin-bottom: 4px;">${escapeHTML(block.data.label)}</span>
        <h2 style="font-size: 26px;">${escapeHTML(block.data.title)}</h2>
      </div>
      `;

    case 'block_2_stats':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-4">
          <div class="stat-card">
            <div class="stat-val">${escapeHTML(block.data.stat1Value)}</div>
            <div class="stat-label">${escapeHTML(block.data.stat1Label)}</div>
            <div class="stat-ctx">${escapeHTML(block.data.stat1Context)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">${escapeHTML(block.data.stat2Value)}</div>
            <div class="stat-label">${escapeHTML(block.data.stat2Label)}</div>
            <div class="stat-ctx">${escapeHTML(block.data.stat2Context)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">${escapeHTML(block.data.stat3Value)}</div>
            <div class="stat-label">${escapeHTML(block.data.stat3Label)}</div>
            <div class="stat-ctx">${escapeHTML(block.data.stat3Context)}</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">${escapeHTML(block.data.stat4Value)}</div>
            <div class="stat-label">${escapeHTML(block.data.stat4Label)}</div>
            <div class="stat-ctx">${escapeHTML(block.data.stat4Context)}</div>
          </div>
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_1_funnel':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="max-width: 680px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px;">
          <div style="padding: 16px; border: 1px solid var(--color-border); background: #ffffff;">
            <span class="font-ui" style="font-size: 11px; font-weight: bold; color: #777;">${escapeHTML(block.data.level1Tag)}</span>
            <h4 style="color: var(--color-rose); margin: 4px 0;">${escapeHTML(block.data.level1Title)}</h4>
            <p style="font-size: 14px; color: #555;">${escapeHTML(block.data.level1Desc)}</p>
          </div>
          <div style="text-align: center; color: var(--color-rose); font-weight: bold;">↓</div>
          <div style="padding: 16px; border: 1px solid var(--color-border); background: #ffffff;">
            <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose);">${escapeHTML(block.data.level2Tag)}</span>
            <h4 style="color: var(--color-rose); margin: 4px 0;">${escapeHTML(block.data.level2Title)}</h4>
            <p style="font-size: 14px; color: #555;">${escapeHTML(block.data.level2Desc)}</p>
          </div>
          <div style="text-align: center; color: var(--color-rose); font-weight: bold;">↓</div>
          <div style="padding: 20px; border: 2px solid var(--color-rose); background: rgba(177,52,96,0.08);">
            <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose);">${escapeHTML(block.data.level3Tag)}</span>
            <h4 style="color: var(--color-rose); margin: 4px 0; font-size: 18px;">${escapeHTML(block.data.level3Title)}</h4>
            <p style="font-size: 14px; color: #222; font-weight: 500;">${escapeHTML(block.data.level3Desc)}</p>
          </div>
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_4_moat':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-3" style="margin-bottom: 20px;">
          ${(block.data.items || [])
            .map(
              (item: any) => `
            <div style="padding: 18px; border: 1px solid var(--color-border); background: #ffffff;">
              <div class="font-ui" style="font-size: 12px; font-weight: bold; color: var(--color-rose); margin-bottom: 6px;">${escapeHTML(item.num)}</div>
              <h4 style="font-size: 16px; margin-bottom: 6px;">${escapeHTML(item.name)}</h4>
              <p style="font-size: 13px; color: #666666;">${escapeHTML(item.desc)}</p>
            </div>
          `
            )
            .join('')}
        </div>
        ${
          block.data.conclusion
            ? `
          <div style="padding: 16px; border-left: 4px solid var(--color-rose); background: rgba(177,52,96,0.06); font-family: var(--font-serif); font-size: 14px; font-weight: 600; color: var(--color-rose);">
            ${escapeHTML(block.data.conclusion)}
          </div>
        `
            : ''
        }
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_8_comparison':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="overflow-x: auto;">
          <table class="editorial-table">
            <thead>
              <tr>
                <th style="width: 25%;">Tiêu chí</th>
                <th style="width: 37%;">${escapeHTML(block.data.colLeftTitle)}</th>
                <th style="width: 38%; color: var(--color-rose); background: rgba(177,52,96,0.1);">${escapeHTML(block.data.colRightTitle)}</th>
              </tr>
            </thead>
            <tbody>
              ${(block.data.rows || [])
                .map(
                  (row: any) => `
                <tr>
                  <td class="font-ui" style="font-weight: 600;">${escapeHTML(row.criteria)}</td>
                  <td style="color: #666;">${escapeHTML(row.left)}</td>
                  <td style="font-weight: 500; background: rgba(177,52,96,0.03);">${escapeHTML(row.right)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_16_strategic_checklist':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${(block.data.questions || [])
            .map(
              (q: any) => `
            <div class="checklist-item ${q.checked ? 'checked' : ''}">
              <div class="checklist-box"></div>
              <div>
                <h5 style="font-size: 15px; font-weight: bold; margin-bottom: 2px;">${escapeHTML(q.text)}</h5>
                <p style="font-size: 12px; color: #666;">${escapeHTML(q.note)}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_18_pyramid':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="max-width: 650px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; text-align: center;">
          <div style="padding: 16px; border: 2px solid var(--color-rose); background: var(--color-rose); color: #fff;">
            <h5 style="font-size: 16px;">${escapeHTML(block.data.layer1)}</h5>
            <p style="font-size: 12px; opacity: 0.9; margin-top: 4px;">${escapeHTML(block.data.layer1Sub)}</p>
          </div>
          <div style="padding: 16px; border: 1px solid var(--color-rose); background: rgba(177,52,96,0.12);">
            <h5 style="color: var(--color-rose); font-size: 15px;">${escapeHTML(block.data.layer2)}</h5>
            <p style="font-size: 12px; color: #555; margin-top: 4px;">${escapeHTML(block.data.layer2Sub)}</p>
          </div>
          <div style="padding: 16px; border: 1px solid var(--color-border); background: #eee;">
            <h5 style="font-size: 15px;">${escapeHTML(block.data.layer3)}</h5>
            <p style="font-size: 12px; color: #666; margin-top: 4px;">${escapeHTML(block.data.layer3Sub)}</p>
          </div>
          <div style="padding: 18px; border: 2px solid var(--color-dark); background: #ddd;">
            <h5 style="font-size: 16px;">${escapeHTML(block.data.layer4)}</h5>
            <p style="font-size: 12px; color: #444; margin-top: 4px;">${escapeHTML(block.data.layer4Sub)}</p>
          </div>
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_3_heritage':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
          <div style="padding: 24px; border: 1px solid rgba(177,52,96,0.2); background: rgba(177,52,96,0.05);">
            <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose); border-bottom: 1px solid var(--color-rose); padding-bottom: 2px; display: inline-block; margin-bottom: 12px;">${escapeHTML(block.data.yearBadge)}</span>
            <h4 style="font-size: 18px; margin-bottom: 8px;">${escapeHTML(block.data.heritageTitle)}</h4>
            <p style="font-size: 14px; color: #555; line-height: 1.6;">${escapeHTML(block.data.heritageText)}</p>
          </div>
          <div style="padding: 24px; border: 1px solid var(--color-border); background: #ffffff;">
            <h4 style="font-size: 20px; color: var(--color-rose); margin-bottom: 12px;">${escapeHTML(block.data.anonymousTitle)}</h4>
            <p style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 16px;">${escapeHTML(block.data.anonymousText)}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${[block.data.tag1, block.data.tag2, block.data.tag3].filter(Boolean).map((t) => `<span class="font-ui" style="font-size: 12px; padding: 4px 10px; border: 1px solid var(--color-border); background: #f8f9fa;">${escapeHTML(t)}</span>`).join('')}
            </div>
          </div>
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_5_mindset':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-2">
          ${[
            { title: block.data.card1Title, desc: block.data.card1Desc, num: '01' },
            { title: block.data.card2Title, desc: block.data.card2Desc, num: '02' },
            { title: block.data.card3Title, desc: block.data.card3Desc, num: '03' },
            { title: block.data.card4Title, desc: block.data.card4Desc, num: '04' },
          ].map((c) => `
            <div style="padding: 24px; border: 1px solid var(--color-border); background: #ffffff;">
              <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose); display: inline-block; margin-bottom: 8px;">Đặc điểm ${c.num}</span>
              <h4 style="font-size: 18px; margin-bottom: 8px;">${escapeHTML(c.title)}</h4>
              <p style="font-size: 14px; color: #555; line-height: 1.6;">${escapeHTML(c.desc)}</p>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_6_daily_timeline':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${(block.data.slots || []).map((s: any) => `
            <div style="padding: 16px; border: 1px solid var(--color-border); background: #ffffff; display: flex; align-items: flex-start; gap: 16px;">
              <span class="font-ui" style="font-size: 15px; font-weight: bold; color: var(--color-rose); width: 60px; flex-shrink: 0;">${escapeHTML(s.time)}</span>
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <h4 style="font-size: 16px;">${escapeHTML(s.name)}</h4>
                  <span class="font-ui" style="font-size: 11px; padding: 2px 6px; border: 1px solid #ddd; color: #666;">${escapeHTML(s.format)}</span>
                </div>
                <p style="font-size: 13px; color: #666;">${escapeHTML(s.desc)}</p>
              </div>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_7_ladder':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${(block.data.steps || []).map((st: any, i: number) => `
            <div style="padding: 14px; border: 1px solid ${i >= 5 ? 'var(--color-rose)' : 'var(--color-border)'}; background: ${i >= 5 ? 'rgba(177,52,96,0.06)' : '#ffffff'}; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span class="font-ui" style="font-size: 11px; font-weight: bold; padding: 2px 6px; ${i >= 5 ? 'background: var(--color-rose); color: #fff;' : 'border: 1px solid #ccc;'}">${escapeHTML(st.step)}</span>
                <span style="font-size: 15px; font-weight: bold;">${escapeHTML(st.label)}</span>
              </div>
              <div class="font-ui" style="font-size: 12px; color: #666;">
                <span>${escapeHTML(st.audience)}</span> → <strong style="color: var(--color-rose);">${escapeHTML(st.conversion)}</strong>
              </div>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_9_video_funnel':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-4">
          ${[
            { title: block.data.stage1Title, desc: block.data.stage1Desc, stat: block.data.stage1Stat, num: '1' },
            { title: block.data.stage2Title, desc: block.data.stage2Desc, stat: block.data.stage2Stat, num: '2' },
            { title: block.data.stage3Title, desc: block.data.stage3Desc, stat: block.data.stage3Stat, num: '3' },
            { title: block.data.stage4Title, desc: block.data.stage4Desc, stat: block.data.stage4Stat, num: '4' },
          ].map((st, i) => `
            <div style="padding: 20px; border: 1px solid ${i === 3 ? 'var(--color-rose)' : 'var(--color-border)'}; background: ${i === 3 ? 'rgba(177,52,96,0.06)' : '#ffffff'};">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose);">Giai đoạn ${st.num}</span>
                <span class="font-ui" style="font-size: 11px; color: #666;">${escapeHTML(st.stat)}</span>
              </div>
              <h4 style="font-size: 15px; margin-bottom: 8px;">${escapeHTML(st.title)}</h4>
              <p style="font-size: 13px; color: #666;">${escapeHTML(st.desc)}</p>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_10_podcast_paywall':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-2" style="margin-bottom: 20px;">
          <div style="padding: 24px; border: 1px solid var(--color-border); background: #ffffff;">
            <h4 style="font-size: 18px; margin-bottom: 12px;">${escapeHTML(block.data.openTitle)}</h4>
            <div style="font-size: 13px; color: #333; line-height: 1.6;">
              <strong style="color: #059669; display: block; margin-bottom: 4px;">Ưu điểm:</strong>
              ${(block.data.openPros || []).map((p: string) => `<p>+ ${escapeHTML(p)}</p>`).join('')}
            </div>
          </div>
          <div style="padding: 24px; border: 1px solid rgba(177,52,96,0.3); background: rgba(177,52,96,0.04);">
            <h4 style="font-size: 18px; color: var(--color-rose); margin-bottom: 12px;">${escapeHTML(block.data.paywallTitle)}</h4>
            <div style="font-size: 13px; color: #333; line-height: 1.6;">
              <strong style="color: var(--color-rose); display: block; margin-bottom: 4px;">Ưu điểm:</strong>
              ${(block.data.paywallPros || []).map((p: string) => `<p>+ ${escapeHTML(p)}</p>`).join('')}
            </div>
          </div>
        </div>
        ${block.data.verdict ? `<div style="padding: 14px; background: #eee; border-left: 4px solid var(--color-rose); font-size: 13px;"><strong>Kết luận:</strong> ${escapeHTML(block.data.verdict)}</div>` : ''}
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_11_app_hub':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="padding: 16px; background: var(--color-rose); color: #fff; text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">
          ${escapeHTML(block.data.hubName)}
        </div>
        <div class="grid-2">
          ${[
            { title: block.data.pillar1, desc: block.data.pillar1Desc, num: '01' },
            { title: block.data.pillar2, desc: block.data.pillar2Desc, num: '02' },
            { title: block.data.pillar3, desc: block.data.pillar3Desc, num: '03' },
            { title: block.data.pillar4, desc: block.data.pillar4Desc, num: '04' },
          ].map((p) => `
            <div style="padding: 20px; border: 1px solid var(--color-border); background: #ffffff;">
              <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose);">${p.num}</span>
              <h4 style="font-size: 16px; margin: 4px 0 6px 0;">${escapeHTML(p.title)}</h4>
              <p style="font-size: 13px; color: #666;">${escapeHTML(p.desc)}</p>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_12_insider_steps':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-5">
          ${(block.data.steps || []).map((st: any) => `
            <div style="padding: 16px; border: 1px solid var(--color-border); background: #ffffff;">
              <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose);">${escapeHTML(st.num)}</span>
              <h4 style="font-size: 14px; margin: 6px 0;">${escapeHTML(st.title)}</h4>
              <p style="font-size: 12px; color: #666;">${escapeHTML(st.desc)}</p>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_13_video_matrix':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${(block.data.formats || []).map((f: any) => `
            <div style="padding: 16px; border: 1px solid var(--color-border); background: #ffffff; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px;">
              <div style="min-width: 220px;">
                <h4 style="font-size: 16px; color: var(--color-rose);">${escapeHTML(f.name)}</h4>
                <span class="font-ui" style="font-size: 12px; color: #777;">${escapeHTML(f.target)}</span>
              </div>
              <div style="flex: 1; min-width: 260px; font-size: 13px; color: #444;">
                ${escapeHTML(f.role)}
              </div>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_14_channels':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-2">
          <div style="padding: 24px; border: 2px solid var(--color-rose); background: #ffffff;">
            <h4 style="font-size: 18px; color: var(--color-rose); margin-bottom: 12px;">${escapeHTML(block.data.ownedTitle)}</h4>
            <ul style="list-style: none; margin-bottom: 16px; font-size: 13px; line-height: 1.8;">
              ${(block.data.ownedItems || []).map((it: string) => `<li>• ${escapeHTML(it)}</li>`).join('')}
            </ul>
            <div style="padding: 10px; background: rgba(177,52,96,0.06); font-size: 12px; color: var(--color-rose); font-weight: bold;">
              ${escapeHTML(block.data.ownedBenefit)}
            </div>
          </div>
          <div style="padding: 24px; border: 1px solid var(--color-border); background: #ffffff;">
            <h4 style="font-size: 18px; color: #555; margin-bottom: 12px;">${escapeHTML(block.data.externalTitle)}</h4>
            <ul style="list-style: none; margin-bottom: 16px; font-size: 13px; line-height: 1.8; color: #666;">
              ${(block.data.externalItems || []).map((it: string) => `<li>• ${escapeHTML(it)}</li>`).join('')}
            </ul>
            <div style="padding: 10px; background: #eee; font-size: 12px; color: #555;">
              ${escapeHTML(block.data.externalBenefit)}
            </div>
          </div>
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_15_ai_layers':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div style="padding: 20px; border: 2px solid var(--color-rose); background: rgba(177,52,96,0.06); text-align: center; margin-bottom: 16px;">
          <h4 style="font-size: 18px; color: var(--color-rose); margin-bottom: 6px;">${escapeHTML(block.data.coreTitle)}</h4>
          <p style="font-size: 13px; color: #444;">${escapeHTML(block.data.coreDesc)}</p>
        </div>
        <div class="grid-2">
          ${[
            { title: block.data.layer1, desc: block.data.layer1Desc },
            { title: block.data.layer2, desc: block.data.layer2Desc },
            { title: block.data.layer3, desc: block.data.layer3Desc },
            { title: block.data.layer4, desc: block.data.layer4Desc },
          ].map((l) => `
            <div style="padding: 16px; border: 1px solid var(--color-border); background: #ffffff;">
              <h5 style="font-size: 14px; margin-bottom: 4px;">${escapeHTML(l.title)}</h5>
              <p style="font-size: 12px; color: #666;">${escapeHTML(l.desc)}</p>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    case 'block_17_b2b_ecosystem':
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 32px; margin: 36px auto;">
        ${renderFigureHeaderHTML()}
        <div class="grid-3">
          ${[
            { title: block.data.col1Title, desc: block.data.col1Desc, badge: 'Enterprise SSO' },
            { title: block.data.col2Title, desc: block.data.col2Desc, badge: 'Slack / Teams' },
            { title: block.data.col3Title, desc: block.data.col3Desc, badge: 'Content API' },
          ].map((col) => `
            <div style="padding: 20px; border: 1px solid var(--color-border); background: #ffffff;">
              <span class="font-ui" style="font-size: 11px; font-weight: bold; color: var(--color-rose); display: inline-block; margin-bottom: 6px;">${col.badge}</span>
              <h4 style="font-size: 16px; margin-bottom: 8px;">${escapeHTML(col.title)}</h4>
              <p style="font-size: 13px; color: #666;">${escapeHTML(col.desc)}</p>
            </div>
          `).join('')}
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;

    default:
      // Fallback renderer for other blocks to ensure complete HTML generation
      return `
      <figure class="${widthClass} ${tintClass}" style="padding: 28px; margin: 32px auto;">
        ${renderFigureHeaderHTML()}
        <div style="padding: 16px; border: 1px solid var(--color-border); background: #ffffff;">
          <p style="font-size: 14px; color: #444;">${escapeHTML(block.title || block.type)}</p>
        </div>
        ${renderFigureFooterHTML()}
      </figure>
      `;
  }
}
