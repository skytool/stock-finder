// Wizard Questions for Stock Discovery
const wizardQuestions = [
  {
    id: 'goal',
    question: "What's your investment goal?",
    options: [
      { value: 'growth', label: '📈 Growth - High potential returns', tags: ['growth', 'tech'] },
      { value: 'income', label: '💰 Income - Dividend stocks', tags: ['dividend', 'stable'] },
      { value: 'value', label: '💎 Value - Undervalued gems', tags: ['value', 'bargain'] },
      { value: 'safety', label: '🛡️ Safety - Low risk', tags: ['stable', 'bluechip'] }
    ]
  },
  {
    id: 'horizon',
    question: "What's your time horizon?",
    options: [
      { value: 'short', label: '⚡ Short term (< 1 year)', tags: ['momentum', 'swing'] },
      { value: 'medium', label: '📅 Medium term (1-3 years)', tags: ['growth'] },
      { value: 'long', label: '🏔️ Long term (3+ years)', tags: ['compound', 'bluechip'] }
    ]
  },
  {
    id: 'sector',
    question: "Which sector interests you?",
    options: [
      { value: 'tech', label: '💻 Technology', tags: ['tech'], sectors: ['XLK'] },
      { value: 'health', label: '🏥 Healthcare', tags: ['health'], sectors: ['XLV'] },
      { value: 'finance', label: '🏦 Finance', tags: ['finance'], sectors: ['XLF'] },
      { value: 'energy', label: '⚡ Energy', tags: ['energy'], sectors: ['XLE'] },
      { value: 'consumer', label: '🛒 Consumer', tags: ['consumer'], sectors: ['XLY'] },
      { value: 'any', label: '🌐 All Sectors', tags: [] }
    ]
  },
  {
    id: 'size',
    question: "What company size do you prefer?",
    options: [
      { value: 'large', label: '🏢 Large Cap ($10B+)', tags: ['bluechip', 'stable'] },
      { value: 'mid', label: '🏠 Mid Cap ($2B-$10B)', tags: ['growth'] },
      { value: 'small', label: '🏡 Small Cap (< $2B)', tags: ['aggressive', 'momentum'] },
      { value: 'any', label: '📊 Any Size', tags: [] }
    ]
  },
  {
    id: 'risk',
    question: "What's your risk tolerance?",
    options: [
      { value: 'low', label: '🐢 Conservative - Steady gains', tags: ['stable', 'dividend'] },
      { value: 'medium', label: '🦊 Moderate - Balanced', tags: ['balanced'] },
      { value: 'high', label: '🚀 Aggressive - High risk/reward', tags: ['growth', 'momentum'] }
    ]
  }
];

// Stock database (curated list with metadata)
const stockDatabase = [
  // Tech Giants
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'tech', cap: 'large', tags: ['bluechip', 'growth', 'tech', 'stable'] },
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'tech', cap: 'large', tags: ['bluechip', 'growth', 'tech', 'stable', 'dividend'] },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'tech', cap: 'large', tags: ['bluechip', 'growth', 'tech'] },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'tech', cap: 'large', tags: ['growth', 'tech', 'consumer'] },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'tech', cap: 'large', tags: ['growth', 'tech', 'momentum', 'aggressive'] },
  { ticker: 'META', name: 'Meta Platforms', sector: 'tech', cap: 'large', tags: ['growth', 'tech', 'value'] },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'tech', cap: 'large', tags: ['growth', 'momentum', 'aggressive'] },
  
  // Tech Growth
  { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'tech', cap: 'large', tags: ['growth', 'tech', 'momentum'] },
  { ticker: 'CRM', name: 'Salesforce Inc.', sector: 'tech', cap: 'large', tags: ['growth', 'tech'] },
  { ticker: 'ADBE', name: 'Adobe Inc.', sector: 'tech', cap: 'large', tags: ['growth', 'tech', 'stable'] },
  { ticker: 'NOW', name: 'ServiceNow Inc.', sector: 'tech', cap: 'large', tags: ['growth', 'tech'] },
  { ticker: 'SNOW', name: 'Snowflake Inc.', sector: 'tech', cap: 'mid', tags: ['growth', 'tech', 'aggressive'] },
  
  // Finance
  { ticker: 'JPM', name: 'JPMorgan Chase', sector: 'finance', cap: 'large', tags: ['bluechip', 'finance', 'dividend', 'stable'] },
  { ticker: 'BAC', name: 'Bank of America', sector: 'finance', cap: 'large', tags: ['finance', 'dividend', 'value'] },
  { ticker: 'V', name: 'Visa Inc.', sector: 'finance', cap: 'large', tags: ['bluechip', 'growth', 'finance', 'stable'] },
  { ticker: 'MA', name: 'Mastercard Inc.', sector: 'finance', cap: 'large', tags: ['growth', 'finance', 'stable'] },
  { ticker: 'GS', name: 'Goldman Sachs', sector: 'finance', cap: 'large', tags: ['finance', 'dividend'] },
  
  // Healthcare
  { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'health', cap: 'large', tags: ['bluechip', 'health', 'dividend', 'stable'] },
  { ticker: 'UNH', name: 'UnitedHealth Group', sector: 'health', cap: 'large', tags: ['bluechip', 'health', 'growth'] },
  { ticker: 'PFE', name: 'Pfizer Inc.', sector: 'health', cap: 'large', tags: ['health', 'dividend', 'value'] },
  { ticker: 'LLY', name: 'Eli Lilly', sector: 'health', cap: 'large', tags: ['health', 'growth', 'momentum'] },
  { ticker: 'ABBV', name: 'AbbVie Inc.', sector: 'health', cap: 'large', tags: ['health', 'dividend'] },
  
  // Energy
  { ticker: 'XOM', name: 'Exxon Mobil', sector: 'energy', cap: 'large', tags: ['energy', 'dividend', 'value'] },
  { ticker: 'CVX', name: 'Chevron Corp.', sector: 'energy', cap: 'large', tags: ['energy', 'dividend', 'stable'] },
  { ticker: 'NEE', name: 'NextEra Energy', sector: 'energy', cap: 'large', tags: ['energy', 'growth', 'stable'] },
  
  // Consumer
  { ticker: 'WMT', name: 'Walmart Inc.', sector: 'consumer', cap: 'large', tags: ['consumer', 'dividend', 'stable', 'bluechip'] },
  { ticker: 'COST', name: 'Costco Wholesale', sector: 'consumer', cap: 'large', tags: ['consumer', 'growth', 'stable'] },
  { ticker: 'HD', name: 'Home Depot', sector: 'consumer', cap: 'large', tags: ['consumer', 'dividend', 'stable'] },
  { ticker: 'NKE', name: 'Nike Inc.', sector: 'consumer', cap: 'large', tags: ['consumer', 'growth', 'value'] },
  { ticker: 'SBUX', name: 'Starbucks Corp.', sector: 'consumer', cap: 'large', tags: ['consumer', 'dividend'] },
  { ticker: 'MCD', name: 'McDonald\'s Corp.', sector: 'consumer', cap: 'large', tags: ['consumer', 'dividend', 'stable', 'bluechip'] },
  
  // Dividend Kings
  { ticker: 'KO', name: 'Coca-Cola Co.', sector: 'consumer', cap: 'large', tags: ['dividend', 'stable', 'bluechip'] },
  { ticker: 'PG', name: 'Procter & Gamble', sector: 'consumer', cap: 'large', tags: ['dividend', 'stable', 'bluechip'] },
  { ticker: 'PEP', name: 'PepsiCo Inc.', sector: 'consumer', cap: 'large', tags: ['dividend', 'stable'] },
  
  // Growth Mid-caps
  { ticker: 'CRWD', name: 'CrowdStrike Holdings', sector: 'tech', cap: 'mid', tags: ['growth', 'tech', 'momentum'] },
  { ticker: 'DDOG', name: 'Datadog Inc.', sector: 'tech', cap: 'mid', tags: ['growth', 'tech'] },
  { ticker: 'NET', name: 'Cloudflare Inc.', sector: 'tech', cap: 'mid', tags: ['growth', 'tech', 'aggressive'] },
  { ticker: 'PANW', name: 'Palo Alto Networks', sector: 'tech', cap: 'mid', tags: ['growth', 'tech'] },
];

// State
let currentStep = 0;
let answers = {};
let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
let currentStock = null;

// DOM Elements
const navBtns = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');
const wizardContent = document.getElementById('wizard-content');
const progressBar = document.getElementById('progress-bar');
const resultsSection = document.getElementById('results-section');
const resultsList = document.getElementById('results-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const stockDetail = document.getElementById('stock-detail');
const watchlistEl = document.getElementById('watchlist');
const watchlistCount = document.getElementById('watchlist-count');
const emptyWatchlist = document.getElementById('empty-watchlist');
const modal = document.getElementById('stock-modal');
const modalClose = document.getElementById('modal-close');
const modalHeader = document.getElementById('modal-header');
const modalBody = document.getElementById('modal-body');
const modalTabs = document.querySelectorAll('.modal-tab');

// Navigation
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    views.forEach(v => v.classList.remove('active'));
    document.getElementById(`${btn.dataset.view}-view`).classList.add('active');
    
    if (btn.dataset.view === 'watchlist') {
      renderWatchlist();
    }
  });
});

// Wizard
function renderWizard() {
  const question = wizardQuestions[currentStep];
  const progress = ((currentStep) / wizardQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  wizardContent.innerHTML = `
    <h3 class="wizard-question">${question.question}</h3>
    <div class="wizard-options">
      ${question.options.map(opt => `
        <button class="wizard-option ${answers[question.id] === opt.value ? 'selected' : ''}" 
                data-value="${opt.value}">
          ${opt.label}
        </button>
      `).join('')}
    </div>
    <div class="wizard-nav">
      ${currentStep > 0 ? '<button class="wizard-btn back">← Back</button>' : ''}
      <button class="wizard-btn next" ${!answers[question.id] ? 'disabled' : ''}>
        ${currentStep === wizardQuestions.length - 1 ? 'Find Stocks 🎯' : 'Next →'}
      </button>
    </div>
  `;
  
  // Option click handlers
  wizardContent.querySelectorAll('.wizard-option').forEach(opt => {
    opt.addEventListener('click', () => {
      answers[question.id] = opt.dataset.value;
      renderWizard();
    });
  });
  
  // Back button
  const backBtn = wizardContent.querySelector('.back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      currentStep--;
      renderWizard();
    });
  }
  
  // Next button
  const nextBtn = wizardContent.querySelector('.next');
  nextBtn.addEventListener('click', () => {
    if (currentStep < wizardQuestions.length - 1) {
      currentStep++;
      renderWizard();
    } else {
      findStocks();
    }
  });
}

// Find matching stocks
function findStocks() {
  progressBar.style.width = '100%';
  
  // Collect all selected tags
  const selectedTags = [];
  let selectedSector = null;
  let selectedCap = null;
  
  wizardQuestions.forEach(q => {
    const answer = answers[q.id];
    const option = q.options.find(o => o.value === answer);
    if (option) {
      selectedTags.push(...option.tags);
      if (q.id === 'sector' && answer !== 'any') selectedSector = answer;
      if (q.id === 'size' && answer !== 'any') selectedCap = answer;
    }
  });
  
  // Score each stock
  const scored = stockDatabase.map(stock => {
    let score = 0;
    
    // Tag matching
    selectedTags.forEach(tag => {
      if (stock.tags.includes(tag)) score += 10;
    });
    
    // Sector matching
    if (selectedSector && stock.sector === selectedSector) score += 20;
    
    // Cap matching
    if (selectedCap && stock.cap === selectedCap) score += 15;
    
    return { ...stock, score };
  });
  
  // Sort by score and take top 5
  const topStocks = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  
  // Show results
  wizardContent.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
      <h3 style="margin-bottom: 8px;">Analysis Complete!</h3>
      <p style="color: var(--text-secondary);">Found ${topStocks.length} matching stocks</p>
    </div>
    <button class="wizard-btn next" onclick="resetWizard()" style="margin-top: 20px;">
      Start Over 🔄
    </button>
  `;
  
  resultsSection.style.display = 'block';
  renderStockList(topStocks, resultsList);
}

// Reset wizard
function resetWizard() {
  currentStep = 0;
  answers = {};
  resultsSection.style.display = 'none';
  renderWizard();
}

// Render stock list
function renderStockList(stocks, container) {
  container.innerHTML = stocks.map(stock => `
    <div class="stock-card" data-ticker="${stock.ticker}">
      <div class="stock-logo">${stock.ticker.substring(0, 2)}</div>
      <div class="stock-info">
        <div class="stock-ticker">${stock.ticker}</div>
        <div class="stock-name">${stock.name}</div>
      </div>
      <div class="stock-price">
        <div class="stock-current" id="price-${stock.ticker}">--</div>
        <div class="stock-change" id="change-${stock.ticker}">--</div>
      </div>
      <button class="watchlist-btn ${watchlist.includes(stock.ticker) ? 'active' : ''}" 
              data-ticker="${stock.ticker}">
        ${watchlist.includes(stock.ticker) ? '⭐' : '☆'}
      </button>
    </div>
  `).join('');
  
  // Fetch prices
  stocks.forEach(stock => fetchQuote(stock.ticker));
  
  // Click handlers
  container.querySelectorAll('.stock-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('watchlist-btn')) {
        openModal(card.dataset.ticker);
      }
    });
  });
  
  container.querySelectorAll('.watchlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWatchlist(btn.dataset.ticker);
      btn.textContent = watchlist.includes(btn.dataset.ticker) ? '⭐' : '☆';
      btn.classList.toggle('active');
    });
  });
}

// Fetch stock quote (using Yahoo Finance API via cors proxy)
async function fetchQuote(ticker) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
    const res = await fetch(url);
    const data = await res.json();
    
    const quote = data.chart.result[0];
    const meta = quote.meta;
    const price = meta.regularMarketPrice;
    const prevClose = meta.previousClose;
    const change = ((price - prevClose) / prevClose * 100).toFixed(2);
    
    const priceEl = document.getElementById(`price-${ticker}`);
    const changeEl = document.getElementById(`change-${ticker}`);
    
    if (priceEl) priceEl.textContent = `$${price.toFixed(2)}`;
    if (changeEl) {
      changeEl.textContent = `${change >= 0 ? '+' : ''}${change}%`;
      changeEl.classList.add(change >= 0 ? 'up' : 'down');
    }
  } catch (err) {
    console.log('Quote fetch error:', ticker, err);
  }
}

// Toggle watchlist
function toggleWatchlist(ticker) {
  const index = watchlist.indexOf(ticker);
  if (index > -1) {
    watchlist.splice(index, 1);
  } else {
    watchlist.push(ticker);
  }
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  watchlistCount.textContent = watchlist.length;
}

// Render watchlist
function renderWatchlist() {
  watchlistCount.textContent = watchlist.length;
  
  if (watchlist.length === 0) {
    watchlistEl.innerHTML = '';
    emptyWatchlist.style.display = 'block';
    return;
  }
  
  emptyWatchlist.style.display = 'none';
  const stocks = watchlist.map(ticker => {
    const found = stockDatabase.find(s => s.ticker === ticker);
    return found || { ticker, name: ticker, sector: '', cap: '', tags: [] };
  });
  
  renderStockList(stocks, watchlistEl);
}

// Search
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') searchStock();
});
searchBtn.addEventListener('click', searchStock);

function searchStock() {
  const query = searchInput.value.trim().toUpperCase();
  if (!query) return;
  
  openModal(query);
}

// Modal
function openModal(ticker) {
  currentStock = ticker;
  modal.classList.add('active');
  
  const stock = stockDatabase.find(s => s.ticker === ticker);
  const name = stock?.name || ticker;
  
  modalHeader.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <div class="stock-logo">${ticker.substring(0, 2)}</div>
      <div>
        <div class="stock-ticker">${ticker}</div>
        <div class="stock-name">${name}</div>
      </div>
    </div>
  `;
  
  showChart(ticker);
}

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

modalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    modalTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    if (tab.dataset.tab === 'chart') showChart(currentStock);
    else if (tab.dataset.tab === 'news') showNews(currentStock);
    else if (tab.dataset.tab === 'analysis') showAnalysis(currentStock);
  });
});

// Chart
function showChart(ticker) {
  modalBody.innerHTML = `<div class="chart-container" id="chart"></div>`;
  
  new TradingView.widget({
    "width": "100%",
    "height": 300,
    "symbol": ticker,
    "interval": "D",
    "timezone": "America/Chicago",
    "theme": "dark",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#252540",
    "enable_publishing": false,
    "hide_top_toolbar": true,
    "hide_legend": true,
    "save_image": false,
    "container_id": "chart",
    "hide_volume": false
  });
}

// News
async function showNews(ticker) {
  modalBody.innerHTML = '<p style="text-align:center; padding: 40px;">Loading news...</p>';
  
  try {
    // Using Finnhub for news (free tier)
    const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${getDateDaysAgo(7)}&to=${getToday()}&token=demo`;
    const res = await fetch(url);
    const news = await res.json();
    
    if (news.length === 0) {
      modalBody.innerHTML = '<p style="text-align:center; padding: 40px; color: var(--text-secondary);">No recent news found</p>';
      return;
    }
    
    modalBody.innerHTML = news.slice(0, 5).map(item => `
      <div class="news-item">
        <a href="${item.url}" target="_blank" style="text-decoration: none; color: inherit;">
          <div class="news-title">${item.headline}</div>
          <div class="news-meta">${item.source} • ${formatDate(item.datetime)}</div>
        </a>
      </div>
    `).join('');
  } catch (err) {
    modalBody.innerHTML = `
      <div class="news-item">
        <div class="news-title">📰 Check latest ${ticker} news</div>
        <div class="news-meta">
          <a href="https://finance.yahoo.com/quote/${ticker}/news" target="_blank" style="color: var(--accent);">
            View on Yahoo Finance →
          </a>
        </div>
      </div>
    `;
  }
}

// AI Analysis
function showAnalysis(ticker) {
  const stock = stockDatabase.find(s => s.ticker === ticker);
  const tags = stock?.tags || [];
  
  // Generate pseudo-AI analysis based on tags
  let sentiment = 50;
  let analysis = [];
  
  if (tags.includes('growth')) { sentiment += 15; analysis.push('Strong growth potential'); }
  if (tags.includes('dividend')) { sentiment += 10; analysis.push('Reliable dividend payer'); }
  if (tags.includes('bluechip')) { sentiment += 10; analysis.push('Blue chip stability'); }
  if (tags.includes('momentum')) { sentiment += 5; analysis.push('Positive momentum'); }
  if (tags.includes('value')) { sentiment += 10; analysis.push('Potential value play'); }
  if (tags.includes('aggressive')) { sentiment -= 10; analysis.push('Higher volatility'); }
  
  const sentimentLabel = sentiment >= 70 ? 'Bullish' : sentiment >= 50 ? 'Neutral' : 'Bearish';
  const sentimentClass = sentiment >= 60 ? 'bullish' : sentiment < 40 ? 'bearish' : 'bullish';
  
  modalBody.innerHTML = `
    <div class="ai-section">
      <div class="ai-title">📊 AI Sentiment Score</div>
      <div class="ai-score">
        <div class="score-bar">
          <div class="score-fill ${sentimentClass}" style="width: ${sentiment}%"></div>
        </div>
        <div class="score-label">${sentiment}%</div>
      </div>
      <div style="margin-top: 8px; font-weight: 500; color: ${sentiment >= 60 ? 'var(--accent-green)' : sentiment < 40 ? 'var(--accent-red)' : 'var(--text-secondary)'}">
        ${sentimentLabel}
      </div>
    </div>
    
    <div class="ai-section">
      <div class="ai-title">🤖 Key Insights</div>
      <div class="ai-content">
        <ul style="padding-left: 20px; line-height: 1.8;">
          ${analysis.map(a => `<li>${a}</li>`).join('')}
        </ul>
      </div>
    </div>
    
    <div class="ai-section">
      <div class="ai-title">⚠️ Disclaimer</div>
      <div class="ai-content" style="font-size: 12px; color: var(--text-secondary);">
        This analysis is for informational purposes only. Not financial advice. Always do your own research.
      </div>
    </div>
  `;
}

// Helpers
function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

// Initialize
renderWizard();
renderWatchlist();

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Make resetWizard global
window.resetWizard = resetWizard;
