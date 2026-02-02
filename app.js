// Wizard Questions for Stock Discovery (Enhanced with multi-select)
const wizardQuestions = [
  {
    id: 'type',
    question: "What type of investment are you looking for?",
    multiSelect: true,
    options: [
      { value: 'stock', label: '📊 Individual Stocks', tags: ['stock'] },
      { value: 'etf', label: '📦 ETFs (Diversified)', tags: ['etf'] },
      { value: 'dividend', label: '💰 Dividend Payers', tags: ['dividend'] },
      { value: 'growth', label: '🚀 Growth Stocks', tags: ['growth'] }
    ]
  },
  {
    id: 'goal',
    question: "What are your investment goals?",
    multiSelect: true,
    options: [
      { value: 'capital', label: '📈 Capital Appreciation', tags: ['growth', 'momentum'] },
      { value: 'income', label: '💵 Passive Income', tags: ['dividend', 'income'] },
      { value: 'safety', label: '🛡️ Capital Preservation', tags: ['stable', 'bluechip'] },
      { value: 'diversify', label: '🌐 Diversification', tags: ['etf', 'balanced'] }
    ]
  },
  {
    id: 'horizon',
    question: "What's your investment time horizon?",
    multiSelect: false,
    options: [
      { value: 'short', label: '⚡ Short term (< 1 year)', tags: ['momentum', 'swing'] },
      { value: 'medium', label: '📅 Medium term (1-3 years)', tags: ['growth'] },
      { value: 'long', label: '🏔️ Long term (3+ years)', tags: ['compound', 'bluechip', 'dividend'] }
    ]
  },
  {
    id: 'sector',
    question: "Which sectors interest you?",
    multiSelect: true,
    options: [
      { value: 'tech', label: '💻 Technology', tags: ['tech'] },
      { value: 'health', label: '🏥 Healthcare', tags: ['health'] },
      { value: 'finance', label: '🏦 Finance', tags: ['finance'] },
      { value: 'energy', label: '⚡ Energy', tags: ['energy'] },
      { value: 'consumer', label: '🛒 Consumer', tags: ['consumer'] },
      { value: 'industrial', label: '🏭 Industrial', tags: ['industrial'] },
      { value: 'realestate', label: '🏠 Real Estate', tags: ['realestate', 'reit'] },
      { value: 'any', label: '🌐 All Sectors', tags: [] }
    ]
  },
  {
    id: 'size',
    question: "What company size do you prefer?",
    multiSelect: true,
    options: [
      { value: 'large', label: '🏢 Large Cap ($10B+)', tags: ['bluechip', 'stable'] },
      { value: 'mid', label: '🏠 Mid Cap ($2B-$10B)', tags: ['growth'] },
      { value: 'small', label: '🏡 Small Cap (< $2B)', tags: ['aggressive', 'momentum'] },
      { value: 'any', label: '📊 Any Size', tags: [] }
    ]
  },
  {
    id: 'dividend',
    question: "What's your dividend preference?",
    multiSelect: false,
    options: [
      { value: 'high', label: '💰 High Yield (4%+)', tags: ['high-yield', 'income'] },
      { value: 'growth', label: '📈 Dividend Growth', tags: ['dividend-growth'] },
      { value: 'aristocrat', label: '👑 Dividend Aristocrats (25+ years)', tags: ['aristocrat', 'stable'] },
      { value: 'none', label: '🚫 No Preference', tags: [] }
    ]
  },
  {
    id: 'risk',
    question: "What's your risk tolerance?",
    multiSelect: false,
    options: [
      { value: 'low', label: '🐢 Conservative - Steady gains', tags: ['stable', 'dividend', 'bluechip'] },
      { value: 'medium', label: '🦊 Moderate - Balanced', tags: ['balanced'] },
      { value: 'high', label: '🚀 Aggressive - High risk/reward', tags: ['growth', 'momentum', 'aggressive'] }
    ]
  },
  {
    id: 'etfType',
    question: "For ETFs, what type interests you?",
    multiSelect: true,
    showIf: (answers) => answers.type?.includes('etf'),
    options: [
      { value: 'index', label: '📊 Index Funds (S&P 500, Nasdaq)', tags: ['index'] },
      { value: 'sector', label: '🎯 Sector ETFs', tags: ['sector-etf'] },
      { value: 'dividend-etf', label: '💰 Dividend ETFs', tags: ['dividend-etf'] },
      { value: 'bond', label: '📜 Bond ETFs', tags: ['bond', 'fixed-income'] },
      { value: 'international', label: '🌍 International ETFs', tags: ['international'] },
      { value: 'thematic', label: '🎨 Thematic (AI, Clean Energy)', tags: ['thematic'] }
    ]
  }
];

// Enhanced Stock & ETF Database
const stockDatabase = [
  // ===== ETFs =====
  // Index ETFs
  { ticker: 'SPY', name: 'SPDR S&P 500 ETF', sector: 'index', cap: 'large', type: 'etf', tags: ['etf', 'index', 'bluechip', 'stable', 'sp500'] },
  { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', sector: 'index', cap: 'large', type: 'etf', tags: ['etf', 'index', 'bluechip', 'stable', 'sp500'] },
  { ticker: 'QQQ', name: 'Invesco Nasdaq 100 ETF', sector: 'tech', cap: 'large', type: 'etf', tags: ['etf', 'index', 'tech', 'growth', 'nasdaq'] },
  { ticker: 'VTI', name: 'Vanguard Total Stock Market', sector: 'index', cap: 'large', type: 'etf', tags: ['etf', 'index', 'balanced', 'stable'] },
  { ticker: 'IWM', name: 'iShares Russell 2000 ETF', sector: 'index', cap: 'small', type: 'etf', tags: ['etf', 'index', 'small-cap', 'growth'] },
  { ticker: 'DIA', name: 'SPDR Dow Jones ETF', sector: 'index', cap: 'large', type: 'etf', tags: ['etf', 'index', 'bluechip', 'stable'] },
  
  // Sector ETFs
  { ticker: 'XLK', name: 'Technology Select Sector', sector: 'tech', cap: 'large', type: 'etf', tags: ['etf', 'sector-etf', 'tech'] },
  { ticker: 'XLF', name: 'Financial Select Sector', sector: 'finance', cap: 'large', type: 'etf', tags: ['etf', 'sector-etf', 'finance'] },
  { ticker: 'XLV', name: 'Health Care Select Sector', sector: 'health', cap: 'large', type: 'etf', tags: ['etf', 'sector-etf', 'health'] },
  { ticker: 'XLE', name: 'Energy Select Sector', sector: 'energy', cap: 'large', type: 'etf', tags: ['etf', 'sector-etf', 'energy'] },
  { ticker: 'XLY', name: 'Consumer Discretionary Sector', sector: 'consumer', cap: 'large', type: 'etf', tags: ['etf', 'sector-etf', 'consumer'] },
  { ticker: 'XLI', name: 'Industrial Select Sector', sector: 'industrial', cap: 'large', type: 'etf', tags: ['etf', 'sector-etf', 'industrial'] },
  { ticker: 'XLRE', name: 'Real Estate Select Sector', sector: 'realestate', cap: 'large', type: 'etf', tags: ['etf', 'sector-etf', 'realestate', 'reit'] },
  
  // Dividend ETFs
  { ticker: 'VYM', name: 'Vanguard High Dividend Yield', sector: 'dividend', cap: 'large', type: 'etf', tags: ['etf', 'dividend-etf', 'dividend', 'income', 'high-yield'] },
  { ticker: 'SCHD', name: 'Schwab US Dividend Equity', sector: 'dividend', cap: 'large', type: 'etf', tags: ['etf', 'dividend-etf', 'dividend', 'dividend-growth', 'income'] },
  { ticker: 'DVY', name: 'iShares Select Dividend', sector: 'dividend', cap: 'large', type: 'etf', tags: ['etf', 'dividend-etf', 'dividend', 'income'] },
  { ticker: 'VIG', name: 'Vanguard Dividend Appreciation', sector: 'dividend', cap: 'large', type: 'etf', tags: ['etf', 'dividend-etf', 'dividend-growth', 'stable'] },
  { ticker: 'NOBL', name: 'ProShares S&P 500 Aristocrats', sector: 'dividend', cap: 'large', type: 'etf', tags: ['etf', 'dividend-etf', 'aristocrat', 'dividend', 'stable'] },
  { ticker: 'HDV', name: 'iShares Core High Dividend', sector: 'dividend', cap: 'large', type: 'etf', tags: ['etf', 'dividend-etf', 'high-yield', 'income'] },
  
  // Bond ETFs
  { ticker: 'BND', name: 'Vanguard Total Bond Market', sector: 'bond', cap: 'large', type: 'etf', tags: ['etf', 'bond', 'fixed-income', 'stable'] },
  { ticker: 'AGG', name: 'iShares Core US Aggregate Bond', sector: 'bond', cap: 'large', type: 'etf', tags: ['etf', 'bond', 'fixed-income', 'stable'] },
  { ticker: 'TLT', name: 'iShares 20+ Year Treasury', sector: 'bond', cap: 'large', type: 'etf', tags: ['etf', 'bond', 'treasury', 'fixed-income'] },
  { ticker: 'HYG', name: 'iShares High Yield Corporate', sector: 'bond', cap: 'large', type: 'etf', tags: ['etf', 'bond', 'high-yield', 'income'] },
  
  // International ETFs
  { ticker: 'VEU', name: 'Vanguard All-World ex-US', sector: 'international', cap: 'large', type: 'etf', tags: ['etf', 'international', 'balanced'] },
  { ticker: 'EFA', name: 'iShares MSCI EAFE', sector: 'international', cap: 'large', type: 'etf', tags: ['etf', 'international', 'developed'] },
  { ticker: 'VWO', name: 'Vanguard Emerging Markets', sector: 'international', cap: 'large', type: 'etf', tags: ['etf', 'international', 'emerging', 'growth'] },
  { ticker: 'EEM', name: 'iShares MSCI Emerging Markets', sector: 'international', cap: 'large', type: 'etf', tags: ['etf', 'international', 'emerging'] },
  
  // Thematic ETFs
  { ticker: 'ARKK', name: 'ARK Innovation ETF', sector: 'tech', cap: 'mid', type: 'etf', tags: ['etf', 'thematic', 'growth', 'tech', 'aggressive'] },
  { ticker: 'BOTZ', name: 'Global X Robotics & AI', sector: 'tech', cap: 'mid', type: 'etf', tags: ['etf', 'thematic', 'tech', 'ai', 'growth'] },
  { ticker: 'ICLN', name: 'iShares Global Clean Energy', sector: 'energy', cap: 'mid', type: 'etf', tags: ['etf', 'thematic', 'energy', 'clean-energy', 'growth'] },
  { ticker: 'TAN', name: 'Invesco Solar ETF', sector: 'energy', cap: 'mid', type: 'etf', tags: ['etf', 'thematic', 'energy', 'solar', 'aggressive'] },
  
  // REIT ETFs
  { ticker: 'VNQ', name: 'Vanguard Real Estate ETF', sector: 'realestate', cap: 'large', type: 'etf', tags: ['etf', 'reit', 'realestate', 'dividend', 'income'] },
  { ticker: 'IYR', name: 'iShares US Real Estate', sector: 'realestate', cap: 'large', type: 'etf', tags: ['etf', 'reit', 'realestate', 'dividend'] },
  
  // ===== DIVIDEND STOCKS =====
  // Dividend Aristocrats (25+ years of dividend increases)
  { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'health', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'bluechip', 'stable', 'health'] },
  { ticker: 'PG', name: 'Procter & Gamble', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'bluechip', 'stable', 'consumer'] },
  { ticker: 'KO', name: 'Coca-Cola Co.', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'bluechip', 'stable', 'income'] },
  { ticker: 'PEP', name: 'PepsiCo Inc.', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'stable', 'consumer'] },
  { ticker: 'MMM', name: '3M Company', sector: 'industrial', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'industrial', 'value'] },
  { ticker: 'ABT', name: 'Abbott Laboratories', sector: 'health', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'health', 'dividend-growth'] },
  { ticker: 'CL', name: 'Colgate-Palmolive', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'stable', 'consumer'] },
  { ticker: 'MCD', name: 'McDonald\'s Corp.', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'bluechip', 'stable'] },
  { ticker: 'WMT', name: 'Walmart Inc.', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'bluechip', 'stable'] },
  { ticker: 'TGT', name: 'Target Corp.', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'consumer', 'income'] },
  { ticker: 'SWK', name: 'Stanley Black & Decker', sector: 'industrial', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'industrial'] },
  { ticker: 'EMR', name: 'Emerson Electric', sector: 'industrial', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'aristocrat', 'industrial', 'stable'] },
  
  // High Yield Dividend Stocks
  { ticker: 'T', name: 'AT&T Inc.', sector: 'telecom', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'high-yield', 'income', 'value'] },
  { ticker: 'VZ', name: 'Verizon Communications', sector: 'telecom', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'high-yield', 'income', 'stable'] },
  { ticker: 'MO', name: 'Altria Group', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'high-yield', 'income'] },
  { ticker: 'PM', name: 'Philip Morris Intl.', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'high-yield', 'income', 'international'] },
  { ticker: 'IBM', name: 'IBM Corp.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'high-yield', 'tech', 'value'] },
  
  // REITs (High Dividend)
  { ticker: 'O', name: 'Realty Income Corp.', sector: 'realestate', cap: 'large', type: 'stock', tags: ['stock', 'reit', 'dividend', 'income', 'monthly-dividend', 'stable'] },
  { ticker: 'STAG', name: 'STAG Industrial', sector: 'realestate', cap: 'mid', type: 'stock', tags: ['stock', 'reit', 'dividend', 'income', 'monthly-dividend', 'industrial'] },
  { ticker: 'NNN', name: 'NNN REIT Inc.', sector: 'realestate', cap: 'mid', type: 'stock', tags: ['stock', 'reit', 'dividend', 'income', 'aristocrat'] },
  { ticker: 'SPG', name: 'Simon Property Group', sector: 'realestate', cap: 'large', type: 'stock', tags: ['stock', 'reit', 'dividend', 'high-yield', 'income'] },
  
  // Dividend Growth Stocks
  { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'dividend-growth', 'bluechip', 'tech', 'growth', 'stable'] },
  { ticker: 'AAPL', name: 'Apple Inc.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'dividend-growth', 'bluechip', 'tech', 'growth'] },
  { ticker: 'V', name: 'Visa Inc.', sector: 'finance', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'dividend-growth', 'bluechip', 'finance', 'growth'] },
  { ticker: 'MA', name: 'Mastercard Inc.', sector: 'finance', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'dividend-growth', 'finance', 'growth'] },
  { ticker: 'HD', name: 'Home Depot', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'dividend-growth', 'consumer', 'stable'] },
  { ticker: 'UNH', name: 'UnitedHealth Group', sector: 'health', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'dividend-growth', 'health', 'growth'] },
  { ticker: 'COST', name: 'Costco Wholesale', sector: 'consumer', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'dividend-growth', 'consumer', 'growth'] },
  
  // ===== GROWTH STOCKS =====
  { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'tech', 'momentum', 'aggressive', 'ai'] },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'bluechip', 'tech'] },
  { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'tech', 'consumer'] },
  { ticker: 'META', name: 'Meta Platforms', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'tech', 'value'] },
  { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'momentum', 'aggressive'] },
  { ticker: 'AMD', name: 'Advanced Micro Devices', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'tech', 'momentum'] },
  { ticker: 'CRM', name: 'Salesforce Inc.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'tech'] },
  { ticker: 'ADBE', name: 'Adobe Inc.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'tech', 'stable'] },
  { ticker: 'NOW', name: 'ServiceNow Inc.', sector: 'tech', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'tech'] },
  { ticker: 'SNOW', name: 'Snowflake Inc.', sector: 'tech', cap: 'mid', type: 'stock', tags: ['stock', 'growth', 'tech', 'aggressive'] },
  { ticker: 'CRWD', name: 'CrowdStrike Holdings', sector: 'tech', cap: 'mid', type: 'stock', tags: ['stock', 'growth', 'tech', 'momentum'] },
  { ticker: 'DDOG', name: 'Datadog Inc.', sector: 'tech', cap: 'mid', type: 'stock', tags: ['stock', 'growth', 'tech'] },
  { ticker: 'NET', name: 'Cloudflare Inc.', sector: 'tech', cap: 'mid', type: 'stock', tags: ['stock', 'growth', 'tech', 'aggressive'] },
  { ticker: 'LLY', name: 'Eli Lilly', sector: 'health', cap: 'large', type: 'stock', tags: ['stock', 'growth', 'health', 'momentum'] },
  
  // ===== FINANCE =====
  { ticker: 'JPM', name: 'JPMorgan Chase', sector: 'finance', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'bluechip', 'finance', 'stable'] },
  { ticker: 'BAC', name: 'Bank of America', sector: 'finance', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'finance', 'value'] },
  { ticker: 'GS', name: 'Goldman Sachs', sector: 'finance', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'finance'] },
  { ticker: 'BRK.B', name: 'Berkshire Hathaway B', sector: 'finance', cap: 'large', type: 'stock', tags: ['stock', 'bluechip', 'finance', 'value', 'stable'] },
  
  // ===== ENERGY =====
  { ticker: 'XOM', name: 'Exxon Mobil', sector: 'energy', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'energy', 'high-yield', 'value'] },
  { ticker: 'CVX', name: 'Chevron Corp.', sector: 'energy', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'energy', 'aristocrat', 'stable'] },
  { ticker: 'NEE', name: 'NextEra Energy', sector: 'energy', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'energy', 'growth', 'clean-energy'] },
  
  // ===== INDUSTRIALS =====
  { ticker: 'CAT', name: 'Caterpillar Inc.', sector: 'industrial', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'industrial', 'dividend-growth'] },
  { ticker: 'HON', name: 'Honeywell Intl.', sector: 'industrial', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'industrial', 'stable'] },
  { ticker: 'UPS', name: 'United Parcel Service', sector: 'industrial', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'industrial', 'income'] },
  { ticker: 'LMT', name: 'Lockheed Martin', sector: 'industrial', cap: 'large', type: 'stock', tags: ['stock', 'dividend', 'industrial', 'stable', 'dividend-growth'] },
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

// Get applicable questions based on answers
function getApplicableQuestions() {
  return wizardQuestions.filter(q => {
    if (!q.showIf) return true;
    return q.showIf(answers);
  });
}

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
  const applicableQuestions = getApplicableQuestions();
  const question = applicableQuestions[currentStep];
  
  if (!question) {
    findStocks();
    return;
  }
  
  const progress = ((currentStep) / applicableQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  const currentAnswers = answers[question.id] || (question.multiSelect ? [] : null);
  
  wizardContent.innerHTML = `
    <h3 class="wizard-question">${question.question}</h3>
    ${question.multiSelect ? '<p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">Select all that apply</p>' : ''}
    <div class="wizard-options">
      ${question.options.map(opt => {
        const isSelected = question.multiSelect 
          ? currentAnswers.includes(opt.value)
          : currentAnswers === opt.value;
        return `
          <button class="wizard-option ${isSelected ? 'selected' : ''}" 
                  data-value="${opt.value}">
            ${opt.label}
          </button>
        `;
      }).join('')}
    </div>
    <div class="wizard-nav">
      ${currentStep > 0 ? '<button class="wizard-btn back">← Back</button>' : ''}
      <button class="wizard-btn next" ${!hasAnswer(question) ? 'disabled' : ''}>
        ${currentStep === applicableQuestions.length - 1 ? 'Find Stocks 🎯' : 'Next →'}
      </button>
    </div>
  `;
  
  // Option click handlers
  wizardContent.querySelectorAll('.wizard-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const value = opt.dataset.value;
      
      if (question.multiSelect) {
        if (!answers[question.id]) answers[question.id] = [];
        const idx = answers[question.id].indexOf(value);
        if (idx > -1) {
          answers[question.id].splice(idx, 1);
        } else {
          answers[question.id].push(value);
        }
      } else {
        answers[question.id] = value;
      }
      
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
    const applicableQuestions = getApplicableQuestions();
    if (currentStep < applicableQuestions.length - 1) {
      currentStep++;
      renderWizard();
    } else {
      findStocks();
    }
  });
}

function hasAnswer(question) {
  const answer = answers[question.id];
  if (question.multiSelect) {
    return answer && answer.length > 0;
  }
  return answer !== null && answer !== undefined;
}

// Find matching stocks
function findStocks() {
  progressBar.style.width = '100%';
  
  // Collect all selected tags
  const selectedTags = [];
  let selectedSectors = [];
  let selectedCaps = [];
  let selectedTypes = [];
  
  const applicableQuestions = getApplicableQuestions();
  
  applicableQuestions.forEach(q => {
    const answer = answers[q.id];
    if (!answer) return;
    
    const answerArray = Array.isArray(answer) ? answer : [answer];
    
    answerArray.forEach(ans => {
      const option = q.options.find(o => o.value === ans);
      if (option && option.tags) {
        selectedTags.push(...option.tags);
      }
      
      if (q.id === 'sector' && ans !== 'any') selectedSectors.push(ans);
      if (q.id === 'size' && ans !== 'any') selectedCaps.push(ans);
      if (q.id === 'type') selectedTypes.push(ans);
    });
  });
  
  // Score each stock
  const scored = stockDatabase.map(stock => {
    let score = 0;
    
    // Type matching
    if (selectedTypes.length > 0) {
      if (selectedTypes.includes(stock.type)) score += 25;
      if (selectedTypes.includes('dividend') && stock.tags.includes('dividend')) score += 20;
      if (selectedTypes.includes('growth') && stock.tags.includes('growth')) score += 20;
      if (selectedTypes.includes('etf') && stock.type === 'etf') score += 25;
    }
    
    // Tag matching
    selectedTags.forEach(tag => {
      if (stock.tags.includes(tag)) score += 8;
    });
    
    // Sector matching
    if (selectedSectors.length > 0 && selectedSectors.includes(stock.sector)) score += 15;
    
    // Cap matching
    if (selectedCaps.length > 0 && selectedCaps.includes(stock.cap)) score += 12;
    
    return { ...stock, score };
  });
  
  // Sort by score and take top results
  const topStocks = scored
    .filter(s => s.score > 15)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
  
  // Show results
  wizardContent.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
      <h3 style="margin-bottom: 8px;">Analysis Complete!</h3>
      <p style="color: var(--text-secondary);">Found ${topStocks.length} matching investments</p>
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
        <div class="stock-ticker">${stock.ticker} ${stock.type === 'etf' ? '<span style="font-size: 10px; background: var(--accent); color: var(--bg-primary); padding: 2px 6px; border-radius: 4px; margin-left: 4px;">ETF</span>' : ''}</div>
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

// Fetch stock quote
async function fetchQuote(ticker) {
  try {
    const cleanTicker = ticker.replace('.', '-');
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${cleanTicker}?interval=1d&range=1d`;
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
    return found || { ticker, name: ticker, sector: '', cap: '', type: 'stock', tags: [] };
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
  const type = stock?.type || 'stock';
  
  modalHeader.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <div class="stock-logo">${ticker.substring(0, 2)}</div>
      <div>
        <div class="stock-ticker">${ticker} ${type === 'etf' ? '<span style="font-size: 10px; background: var(--accent); color: var(--bg-primary); padding: 2px 6px; border-radius: 4px; margin-left: 4px;">ETF</span>' : ''}</div>
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
  const cleanTicker = ticker.replace('.', '-');
  modalBody.innerHTML = `<div class="chart-container" id="chart"></div>`;
  
  new TradingView.widget({
    "width": "100%",
    "height": 300,
    "symbol": cleanTicker,
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
  const type = stock?.type || 'stock';
  
  let sentiment = 50;
  let analysis = [];
  
  if (type === 'etf') {
    sentiment += 10;
    analysis.push('Diversified ETF - Lower individual stock risk');
  }
  if (tags.includes('growth')) { sentiment += 12; analysis.push('Strong growth potential'); }
  if (tags.includes('dividend')) { sentiment += 10; analysis.push('Reliable dividend payer'); }
  if (tags.includes('aristocrat')) { sentiment += 15; analysis.push('Dividend Aristocrat - 25+ years of increases'); }
  if (tags.includes('bluechip')) { sentiment += 10; analysis.push('Blue chip stability'); }
  if (tags.includes('momentum')) { sentiment += 5; analysis.push('Positive momentum'); }
  if (tags.includes('value')) { sentiment += 8; analysis.push('Potential value play'); }
  if (tags.includes('high-yield')) { sentiment += 5; analysis.push('High dividend yield'); }
  if (tags.includes('aggressive')) { sentiment -= 10; analysis.push('⚠️ Higher volatility'); }
  if (tags.includes('stable')) { sentiment += 8; analysis.push('Historically stable'); }
  
  sentiment = Math.min(95, Math.max(20, sentiment));
  
  const sentimentLabel = sentiment >= 70 ? 'Bullish' : sentiment >= 50 ? 'Neutral' : 'Cautious';
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
          ${analysis.length > 0 ? analysis.map(a => `<li>${a}</li>`).join('') : '<li>No specific insights available</li>'}
        </ul>
      </div>
    </div>
    
    <div class="ai-section">
      <div class="ai-title">⚠️ Disclaimer</div>
      <div class="ai-content" style="font-size: 12px; color: var(--text-secondary);">
        This analysis is for informational purposes only. Not financial advice. Always do your own research before investing.
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

// ============ PHASE 2: SCREENER ============

const screenerFilters = {
  'ma-crossover': {
    icon: '📈',
    title: 'Moving Average Crossover',
    desc: 'Stocks where 20-day MA crossed above 50-day MA (Golden Cross signal)',
    type: 'bullish'
  },
  '52w-high': {
    icon: '🔝',
    title: 'Near 52-Week High',
    desc: 'Stocks trading within 5% of their 52-week high (momentum strength)',
    type: 'bullish'
  },
  '52w-low': {
    icon: '🔻',
    title: 'Near 52-Week Low',
    desc: 'Stocks trading within 10% of their 52-week low (potential value)',
    type: 'bearish'
  },
  'volume-spike': {
    icon: '📊',
    title: 'Volume Spike',
    desc: 'Stocks with unusually high trading volume (2x+ average)',
    type: 'neutral'
  },
  'oversold': {
    icon: '💎',
    title: 'Oversold (RSI < 30)',
    desc: 'Stocks that may be oversold and due for a bounce',
    type: 'bullish'
  },
  'overbought': {
    icon: '🔥',
    title: 'Overbought (RSI > 70)',
    desc: 'Stocks that may be overbought and due for a pullback',
    type: 'bearish'
  }
};

let currentScreenerFilter = 'ma-crossover';
const screenerResults = document.getElementById('screener-results');
const screenerInfo = document.getElementById('screener-info');
const screenerLoading = document.getElementById('screener-loading');

// Screener filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentScreenerFilter = btn.dataset.filter;
    updateScreenerInfo();
    runScreener();
  });
});

function updateScreenerInfo() {
  const filter = screenerFilters[currentScreenerFilter];
  screenerInfo.innerHTML = `
    <div class="info-icon">${filter.icon}</div>
    <div class="info-title">${filter.title}</div>
    <div class="info-desc">${filter.desc}</div>
  `;
}

// Fetch technical data for a stock
async function fetchTechnicalData(ticker) {
  try {
    const cleanTicker = ticker.replace('.', '-');
    // Get 3 months of daily data for calculations
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${cleanTicker}?interval=1d&range=3mo`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (!data.chart.result) return null;
    
    const result = data.chart.result[0];
    const quotes = result.indicators.quote[0];
    const meta = result.meta;
    
    const closes = quotes.close.filter(c => c !== null);
    const volumes = quotes.volume.filter(v => v !== null);
    const highs = quotes.high.filter(h => h !== null);
    const lows = quotes.low.filter(l => l !== null);
    
    if (closes.length < 50) return null;
    
    // Calculate moving averages
    const ma20 = closes.slice(-20).reduce((a, b) => a + b, 0) / 20;
    const ma50 = closes.slice(-50).reduce((a, b) => a + b, 0) / 50;
    const prevMa20 = closes.slice(-21, -1).reduce((a, b) => a + b, 0) / 20;
    const prevMa50 = closes.slice(-51, -1).reduce((a, b) => a + b, 0) / 50;
    
    // Calculate RSI (14-day)
    const changes = [];
    for (let i = 1; i < closes.length; i++) {
      changes.push(closes[i] - closes[i-1]);
    }
    const recentChanges = changes.slice(-14);
    const gains = recentChanges.filter(c => c > 0);
    const losses = recentChanges.filter(c => c < 0).map(c => Math.abs(c));
    const avgGain = gains.length ? gains.reduce((a, b) => a + b, 0) / 14 : 0;
    const avgLoss = losses.length ? losses.reduce((a, b) => a + b, 0) / 14 : 0.001;
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    // 52-week high/low
    const high52w = Math.max(...highs);
    const low52w = Math.min(...lows);
    
    // Current price and volume
    const currentPrice = meta.regularMarketPrice;
    const avgVolume = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
    const currentVolume = volumes[volumes.length - 1];
    const volumeRatio = currentVolume / avgVolume;
    
    // Previous close for change calculation
    const prevClose = meta.previousClose;
    const change = ((currentPrice - prevClose) / prevClose * 100);
    
    return {
      ticker,
      price: currentPrice,
      change,
      ma20,
      ma50,
      prevMa20,
      prevMa50,
      maCrossover: prevMa20 <= prevMa50 && ma20 > ma50, // Golden cross
      maDeathCross: prevMa20 >= prevMa50 && ma20 < ma50, // Death cross
      rsi,
      high52w,
      low52w,
      pctFrom52wHigh: ((currentPrice - high52w) / high52w * 100),
      pctFrom52wLow: ((currentPrice - low52w) / low52w * 100),
      volumeRatio,
      avgVolume,
      currentVolume
    };
  } catch (err) {
    console.log('Tech data error:', ticker, err);
    return null;
  }
}

// Run screener
async function runScreener() {
  screenerLoading.style.display = 'block';
  screenerResults.innerHTML = '';
  
  // Get popular stocks to screen
  const stocksToScreen = stockDatabase
    .filter(s => s.type === 'stock' && s.cap === 'large')
    .slice(0, 20)
    .map(s => s.ticker);
  
  const results = [];
  
  for (const ticker of stocksToScreen) {
    const tech = await fetchTechnicalData(ticker);
    if (!tech) continue;
    
    let matches = false;
    let signalType = 'neutral';
    let signalText = '';
    let techInfo = '';
    
    switch (currentScreenerFilter) {
      case 'ma-crossover':
        if (tech.maCrossover) {
          matches = true;
          signalType = 'bullish';
          signalText = 'Golden Cross';
          techInfo = `MA20: $${tech.ma20.toFixed(2)} > MA50: $${tech.ma50.toFixed(2)}`;
        }
        break;
        
      case '52w-high':
        if (tech.pctFrom52wHigh >= -5) {
          matches = true;
          signalType = 'bullish';
          signalText = `${tech.pctFrom52wHigh.toFixed(1)}% from high`;
          techInfo = `52W High: $${tech.high52w.toFixed(2)}`;
        }
        break;
        
      case '52w-low':
        if (tech.pctFrom52wLow <= 10) {
          matches = true;
          signalType = 'bearish';
          signalText = `${tech.pctFrom52wLow.toFixed(1)}% from low`;
          techInfo = `52W Low: $${tech.low52w.toFixed(2)}`;
        }
        break;
        
      case 'volume-spike':
        if (tech.volumeRatio >= 2) {
          matches = true;
          signalType = 'neutral';
          signalText = `${tech.volumeRatio.toFixed(1)}x Volume`;
          techInfo = `Avg: ${(tech.avgVolume/1000000).toFixed(1)}M | Today: ${(tech.currentVolume/1000000).toFixed(1)}M`;
        }
        break;
        
      case 'oversold':
        if (tech.rsi < 30) {
          matches = true;
          signalType = 'bullish';
          signalText = `RSI: ${tech.rsi.toFixed(0)}`;
          techInfo = 'Potentially oversold';
        }
        break;
        
      case 'overbought':
        if (tech.rsi > 70) {
          matches = true;
          signalType = 'bearish';
          signalText = `RSI: ${tech.rsi.toFixed(0)}`;
          techInfo = 'Potentially overbought';
        }
        break;
    }
    
    if (matches) {
      results.push({ ...tech, signalType, signalText, techInfo });
    }
  }
  
  screenerLoading.style.display = 'none';
  
  if (results.length === 0) {
    screenerResults.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
        <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
        <p>No stocks match this filter right now</p>
        <p style="font-size: 13px; margin-top: 8px;">Try another filter or check back later</p>
      </div>
    `;
    return;
  }
  
  renderScreenerResults(results);
}

function renderScreenerResults(results) {
  screenerResults.innerHTML = results.map(stock => {
    const dbStock = stockDatabase.find(s => s.ticker === stock.ticker);
    const name = dbStock?.name || stock.ticker;
    
    return `
      <div class="stock-card" data-ticker="${stock.ticker}">
        <div class="stock-logo">${stock.ticker.substring(0, 2)}</div>
        <div class="stock-info">
          <div class="stock-ticker">
            ${stock.ticker}
            <span class="signal-badge ${stock.signalType}">${stock.signalText}</span>
          </div>
          <div class="stock-name">${name}</div>
          <div class="tech-data">${stock.techInfo}</div>
        </div>
        <div class="stock-price">
          <div class="stock-current">$${stock.price.toFixed(2)}</div>
          <div class="stock-change ${stock.change >= 0 ? 'up' : 'down'}">
            ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
          </div>
        </div>
        <button class="watchlist-btn ${watchlist.includes(stock.ticker) ? 'active' : ''}" 
                data-ticker="${stock.ticker}">
          ${watchlist.includes(stock.ticker) ? '⭐' : '☆'}
        </button>
      </div>
    `;
  }).join('');
  
  // Add click handlers
  screenerResults.querySelectorAll('.stock-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('watchlist-btn')) {
        openModal(card.dataset.ticker);
      }
    });
  });
  
  screenerResults.querySelectorAll('.watchlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWatchlist(btn.dataset.ticker);
      btn.textContent = watchlist.includes(btn.dataset.ticker) ? '⭐' : '☆';
      btn.classList.toggle('active');
    });
  });
}

// Enhanced AI Analysis with technical data
async function showEnhancedAnalysis(ticker) {
  modalBody.innerHTML = '<p style="text-align:center; padding: 40px;">Analyzing...</p>';
  
  const tech = await fetchTechnicalData(ticker);
  const stock = stockDatabase.find(s => s.ticker === ticker);
  const tags = stock?.tags || [];
  const type = stock?.type || 'stock';
  
  let sentiment = 50;
  let analysis = [];
  let technicalSignals = [];
  
  // Fundamental analysis
  if (type === 'etf') {
    sentiment += 8;
    analysis.push('✅ Diversified ETF - Lower individual stock risk');
  }
  if (tags.includes('growth')) { sentiment += 10; analysis.push('✅ Strong growth potential'); }
  if (tags.includes('dividend')) { sentiment += 8; analysis.push('✅ Reliable dividend payer'); }
  if (tags.includes('aristocrat')) { sentiment += 12; analysis.push('✅ Dividend Aristocrat - 25+ years of increases'); }
  if (tags.includes('bluechip')) { sentiment += 10; analysis.push('✅ Blue chip stability'); }
  if (tags.includes('aggressive')) { sentiment -= 8; analysis.push('⚠️ Higher volatility expected'); }
  
  // Technical analysis
  if (tech) {
    // RSI
    if (tech.rsi < 30) {
      sentiment += 10;
      technicalSignals.push({ signal: 'Oversold (RSI < 30)', type: 'bullish', detail: `RSI: ${tech.rsi.toFixed(0)}` });
    } else if (tech.rsi > 70) {
      sentiment -= 10;
      technicalSignals.push({ signal: 'Overbought (RSI > 70)', type: 'bearish', detail: `RSI: ${tech.rsi.toFixed(0)}` });
    } else {
      technicalSignals.push({ signal: 'RSI Neutral', type: 'neutral', detail: `RSI: ${tech.rsi.toFixed(0)}` });
    }
    
    // Moving Averages
    if (tech.ma20 > tech.ma50) {
      sentiment += 8;
      technicalSignals.push({ signal: 'Bullish MA Trend', type: 'bullish', detail: 'MA20 > MA50' });
    } else {
      sentiment -= 5;
      technicalSignals.push({ signal: 'Bearish MA Trend', type: 'bearish', detail: 'MA20 < MA50' });
    }
    
    // 52-week position
    if (tech.pctFrom52wHigh >= -10) {
      sentiment += 5;
      technicalSignals.push({ signal: 'Near 52W High', type: 'bullish', detail: `${tech.pctFrom52wHigh.toFixed(1)}% from high` });
    } else if (tech.pctFrom52wLow <= 15) {
      technicalSignals.push({ signal: 'Near 52W Low', type: 'bearish', detail: `${tech.pctFrom52wLow.toFixed(1)}% from low` });
    }
    
    // Volume
    if (tech.volumeRatio > 1.5) {
      technicalSignals.push({ signal: 'High Volume', type: 'neutral', detail: `${tech.volumeRatio.toFixed(1)}x average` });
    }
  }
  
  sentiment = Math.min(95, Math.max(15, sentiment));
  
  const sentimentLabel = sentiment >= 70 ? 'Bullish' : sentiment >= 45 ? 'Neutral' : 'Cautious';
  const sentimentColor = sentiment >= 65 ? 'var(--accent-green)' : sentiment < 40 ? 'var(--accent-red)' : '#FFD60A';
  
  modalBody.innerHTML = `
    <div class="ai-section">
      <div class="ai-title">📊 AI Sentiment Score</div>
      <div class="ai-score">
        <div class="score-bar">
          <div class="score-fill ${sentiment >= 50 ? 'bullish' : 'bearish'}" style="width: ${sentiment}%"></div>
        </div>
        <div class="score-label">${sentiment}%</div>
      </div>
      <div style="margin-top: 8px; font-weight: 600; color: ${sentimentColor}">
        ${sentimentLabel}
      </div>
    </div>
    
    ${tech ? `
    <div class="ai-section">
      <div class="ai-title">📈 Technical Signals</div>
      <div class="ai-content">
        ${technicalSignals.map(s => `
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border);">
            <span>${s.signal}</span>
            <span class="signal-badge ${s.type}">${s.detail}</span>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div class="ai-section">
      <div class="ai-title">📊 Key Levels</div>
      <div class="ai-content" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-secondary);">52W High</div>
          <div style="font-size: 18px; font-weight: 600;">$${tech.high52w.toFixed(2)}</div>
        </div>
        <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-secondary);">52W Low</div>
          <div style="font-size: 18px; font-weight: 600;">$${tech.low52w.toFixed(2)}</div>
        </div>
        <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-secondary);">MA 20</div>
          <div style="font-size: 18px; font-weight: 600;">$${tech.ma20.toFixed(2)}</div>
        </div>
        <div style="background: var(--bg-primary); padding: 12px; border-radius: 8px; text-align: center;">
          <div style="font-size: 12px; color: var(--text-secondary);">MA 50</div>
          <div style="font-size: 18px; font-weight: 600;">$${tech.ma50.toFixed(2)}</div>
        </div>
      </div>
    </div>
    ` : ''}
    
    <div class="ai-section">
      <div class="ai-title">🤖 Fundamental Insights</div>
      <div class="ai-content">
        <ul style="padding-left: 20px; line-height: 1.8;">
          ${analysis.length > 0 ? analysis.map(a => `<li>${a}</li>`).join('') : '<li>No specific insights available</li>'}
        </ul>
      </div>
    </div>
    
    <div class="ai-section">
      <div class="ai-title">⚠️ Disclaimer</div>
      <div class="ai-content" style="font-size: 12px; color: var(--text-secondary);">
        This analysis is for informational purposes only. Not financial advice. Always do your own research before investing.
      </div>
    </div>
  `;
}

// Update the modal tab handler to use enhanced analysis
const originalShowAnalysis = showAnalysis;
showAnalysis = function(ticker) {
  showEnhancedAnalysis(ticker);
};

// Run initial screener when view is activated
const screenerNavBtn = document.querySelector('[data-view="screener"]');
if (screenerNavBtn) {
  screenerNavBtn.addEventListener('click', () => {
    if (screenerResults.innerHTML === '') {
      runScreener();
    }
  });
}
