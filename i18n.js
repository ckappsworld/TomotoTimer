// 定義 10 種最熱門語言的標籤翻譯
const translations = {
  // 英文 (English)
  'en': {
    'totalTimeLabel': 'Total Time (Min)',
    'segmentsLabel': 'Total Segments'
  },
  // 中文 (Chinese)
  'zh': {
    'totalTimeLabel': '總時間（分鐘）',
    'segmentsLabel': '總共分段數'
  },
  // 西班牙語 (Spanish)
  'es': {
    'totalTimeLabel': 'Tiempo Total (Min)',
    'segmentsLabel': 'Número Total de Segmentos'
  },
  // 印地語 (Hindi)
  'hi': {
    'totalTimeLabel': 'कुल समय (मिनट)',
    'segmentsLabel': 'कुल खंडों की संख्या'
  },
  // 阿拉伯語 (Arabic)
  'ar': {
    'totalTimeLabel': 'الوقت الإجمالي (دقيقة)',
    'segmentsLabel': 'إجمالي عدد الشرائح'
  },
  // 葡萄牙語 (Portuguese)
  'pt': {
    'totalTimeLabel': 'Tempo Total (Min)',
    'segmentsLabel': 'Número Total de Segmentos'
  },
  // 俄語 (Russian)
  'ru': {
    'totalTimeLabel': 'Общее Время (Мин)',
    'segmentsLabel': 'Общее Количество Сегментов'
  },
  // 日語 (Japanese)
  'ja': {
    'totalTimeLabel': '合計時間（分）',
    'segmentsLabel': 'セグメントの総数'
  },
  // 法語 (French)
  'fr': {
    'totalTimeLabel': 'Temps Total (Min)',
    'segmentsLabel': 'Nombre Total de Segments'
  },
  // 德語 (German)
  'de': {
    'totalTimeLabel': 'Gesamtzeit (Min)',
    'segmentsLabel': 'Gesamtanzahl der Segmente'
  }
};

// 獲取瀏覽器語言並設置為 2 字符語言代碼
function getBrowserLanguage() {
  const fullLang = navigator.language || navigator.userLanguage || 'en';
  const langCode = fullLang.split('-')[0]; // 取得主語言代碼 (例如 zh-TW -> zh)
  return langCode;
}

// 更新標籤為相應語言
function updateLabels() {
  const langCode = getBrowserLanguage();
  const translationSet = translations[langCode] || translations['en']; // 如果找不到對應語言，使用英文作為默認值
  
  document.getElementById('totalTimeLabel').textContent = translationSet.totalTimeLabel;
  document.getElementById('segmentsLabel').textContent = translationSet.segmentsLabel;
}

// 當頁面載入完成後執行更新
document.addEventListener('DOMContentLoaded', updateLabels);
/**
 * 多语言支持模块
 * 支持动态切换语言和自动检测浏览器语言
 */

const I18N = {
  // 英文 - 默认语言
  'en': {
    // 控制面板文本
    totalTime: 'Total Time (Min)',
    segments: 'Segments',
    segment: 'Segment',
    minute: 'min',
    phase: ['Phase', 'of'],
    start: 'Start',
    ready: 'Ready',
    enterUrl: 'Enter URL...',
    
    // 音效选项
    soundOptions: {
      none: 'Mute',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Alpha Waves',
      wavebeta: 'Beta Waves',
      birds: 'Birds',
      lightrain: 'Rain',
      oceanwave: 'Ocean Waves',
      storm: 'Storm',
      waterflow: 'Water Flow',
      waterstream: 'Water Stream'
    },
    
    // 内容区域
    pageTitle: 'Online Focus Timer for Deep Work Sessions',
    subtitle: 'Boost Productivity with Smart Time Management',
    description: 'This free online focus timer helps you implement the Pomodoro Technique effectively. Key features:',
    features: [
      'Custom work/break intervals',
      'Background video integration (YouTube/Bilibili)',
      'Natural sound effects for concentration',
      'Multi-language support'
    ],
    
    // 通知
    done: 'Done!'
  },
  
  // 繁体中文
  'zh-TW': {
    totalTime: '總時間（分鐘）',
    segments: '階段數',
    segment: '第',
    minute: '分鐘',
    phase: ['階段', '/'],
    start: '開始',
    ready: '準備',
    enterUrl: '輸入連結...',
    
    soundOptions: {
      none: '靜音',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Alpha腦波',
      wavebeta: 'Beta腦波',
      birds: '鳥鳴',
      lightrain: '雨聲',
      oceanwave: '海浪',
      storm: '暴風雨',
      waterflow: '流水',
      waterstream: '溪流'
    },
    
    pageTitle: '線上專注計時器',
    subtitle: '高效時間管理工具',
    description: '免費線上專注計時器主要功能：',
    features: [
      '自定義工作/休息時間',
      'YouTube/Bilibili背景影片整合',
      '提升專注力的自然音效',
      '支援多國語言介面'
    ],
    
    done: '完成！'
  },
  
  // 简体中文
  'zh-CN': {
    totalTime: '总时间（分钟）',
    segments: '阶段数',
    segment: '第',
    minute: '分钟',
    phase: ['阶段', '/'],
    start: '开始',
    ready: '准备',
    enterUrl: '输入链接...',
    
    soundOptions: {
      none: '静音',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Alpha脑波',
      wavebeta: 'Beta脑波',
      birds: '鸟鸣',
      lightrain: '雨声',
      oceanwave: '海浪',
      storm: '暴风雨',
      waterflow: '流水',
      waterstream: '溪流'
    },
    
    pageTitle: '在线专注计时器',
    subtitle: '高效时间管理工具',
    description: '免费在线专注计时器主要功能：',
    features: [
      '自定义工作/休息时间',
      'YouTube/Bilibili背景视频整合',
      '提升专注力的自然音效',
      '支持多国语言界面'
    ],
    
    done: '完成！'
  },
  
  // 日本語
  'ja': {
    totalTime: '合計時間（分）',
    segments: 'セグメント',
    segment: 'セグメント',
    minute: '分',
    phase: ['フェーズ', '/'],
    start: 'スタート',
    ready: '準備完了',
    enterUrl: 'URLを入力...',
    
    soundOptions: {
      none: 'ミュート',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'アルファ波',
      wavebeta: 'ベータ波',
      birds: '鳥のさえずり',
      lightrain: '雨音',
      oceanwave: '波の音',
      storm: '嵐',
      waterflow: '水の流れ',
      waterstream: '小川'
    },
    
    pageTitle: 'オンライン集中タイマー',
    subtitle: 'スマートな時間管理で生産性向上',
    description: 'このフリーのオンライン集中タイマーは、ポモドーロテクニックを効果的に実践するのに役立ちます。主な機能：',
    features: [
      'カスタム作業/休憩間隔',
      'YouTube/Bilibili背景動画の統合',
      '集中力を高める自然音',
      '多言語対応'
    ],
    
    done: '完了！'
  },
  
  // Español
  'es': {
    totalTime: 'Tiempo total (min)',
    segments: 'Segmentos',
    segment: 'Segmento',
    minute: 'min',
    phase: ['Fase', 'de'],
    start: 'Iniciar',
    ready: 'Listo',
    enterUrl: 'Ingresar URL...',
    
    soundOptions: {
      none: 'Silencio',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Ondas Alfa',
      wavebeta: 'Ondas Beta',
      birds: 'Pájaros',
      lightrain: 'Lluvia',
      oceanwave: 'Olas del océano',
      storm: 'Tormenta',
      waterflow: 'Flujo de agua',
      waterstream: 'Arroyo'
    },
    
    pageTitle: 'Temporizador de enfoque en línea',
    subtitle: 'Aumente la productividad con una gestión inteligente del tiempo',
    description: 'Este temporizador de enfoque gratuito le ayuda a implementar la Técnica Pomodoro de manera efectiva. Características principales:',
    features: [
      'Intervalos de trabajo/descanso personalizables',
      'Integración de videos de fondo (YouTube/Bilibili)',
      'Efectos de sonido naturales para concentración',
      'Soporte multilingüe'
    ],
    
    done: '¡Terminado!'
  },
  
  // Français
  'fr': {
    totalTime: 'Temps total (min)',
    segments: 'Segments',
    segment: 'Segment',
    minute: 'min',
    phase: ['Phase', 'sur'],
    start: 'Démarrer',
    ready: 'Prêt',
    enterUrl: 'Entrer URL...',
    
    soundOptions: {
      none: 'Muet',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Ondes Alpha',
      wavebeta: 'Ondes Beta',
      birds: 'Oiseaux',
      lightrain: 'Pluie',
      oceanwave: 'Vagues d\'océan',
      storm: 'Orage',
      waterflow: 'Écoulement d\'eau',
      waterstream: 'Ruisseau'
    },
    
    pageTitle: 'Minuteur de concentration en ligne',
    subtitle: 'Boostez votre productivité avec une gestion intelligente du temps',
    description: 'Ce minuteur de concentration gratuit vous aide à mettre en œuvre la technique Pomodoro efficacement. Fonctionnalités principales :',
    features: [
      'Intervalles de travail/pause personnalisables',
      'Intégration de vidéos en arrière-plan (YouTube/Bilibili)',
      'Sons naturels pour améliorer la concentration',
      'Support multilingue'
    ],
    
    done: 'Terminé !'
  },
  
  // Deutsch
  'de': {
    totalTime: 'Gesamtzeit (Min)',
    segments: 'Segmente',
    segment: 'Segment',
    minute: 'min',
    phase: ['Phase', 'von'],
    start: 'Starten',
    ready: 'Bereit',
    enterUrl: 'URL eingeben...',
    
    soundOptions: {
      none: 'Stumm',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Alpha-Wellen',
      wavebeta: 'Beta-Wellen',
      birds: 'Vögel',
      lightrain: 'Regen',
      oceanwave: 'Meereswellen',
      storm: 'Sturm',
      waterflow: 'Wasserlauf',
      waterstream: 'Bach'
    },
    
    pageTitle: 'Online-Fokustimer',
    subtitle: 'Steigern Sie Ihre Produktivität mit intelligentem Zeitmanagement',
    description: 'Dieser kostenlose Online-Fokustimer hilft Ihnen, die Pomodoro-Technik effektiv umzusetzen. Hauptfunktionen:',
    features: [
      'Anpassbare Arbeits-/Pausenintervalle',
      'Integration von Hintergrundvideos (YouTube/Bilibili)',
      'Natürliche Klangeffekte für die Konzentration',
      'Mehrsprachige Unterstützung'
    ],
    
    done: 'Fertig!'
  },
  
  // 한국어 (Korean)
  'ko': {
    totalTime: '총 시간 (분)',
    segments: '세그먼트',
    segment: '세그먼트',
    minute: '분',
    phase: ['단계', '/'],
    start: '시작',
    ready: '준비',
    enterUrl: 'URL 입력...',
    
    soundOptions: {
      none: '음소거',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: '알파파',
      wavebeta: '베타파',
      birds: '새소리',
      lightrain: '빗소리',
      oceanwave: '바다 파도',
      storm: '폭풍',
      waterflow: '물 흐름',
      waterstream: '시냇물'
    },
    
    pageTitle: '온라인 집중 타이머',
    subtitle: '스마트한 시간 관리로 생산성 향상',
    description: '이 무료 온라인 집중 타이머는 뽀모도로 기법을 효과적으로 구현하는 데 도움이 됩니다. 주요 기능:',
    features: [
      '맞춤형 작업/휴식 간격',
      'YouTube/Bilibili 배경 비디오 통합',
      '집중력 향상을 위한 자연 효과음',
      '다국어 지원'
    ],
    
    done: '완료!'
  },
  
  // Italiano
  'it': {
    totalTime: 'Tempo totale (min)',
    segments: 'Segmenti',
    segment: 'Segmento',
    minute: 'min',
    phase: ['Fase', 'di'],
    start: 'Inizia',
    ready: 'Pronto',
    enterUrl: 'Inserisci URL...',
    
    soundOptions: {
      none: 'Muto',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Onde Alfa',
      wavebeta: 'Onde Beta',
      birds: 'Uccelli',
      lightrain: 'Pioggia',
      oceanwave: 'Onde dell\'oceano',
      storm: 'Tempesta',
      waterflow: 'Flusso d\'acqua',
      waterstream: 'Ruscello'
    },
    
    pageTitle: 'Timer di concentrazione online',
    subtitle: 'Aumenta la produttività con una gestione intelligente del tempo',
    description: 'Questo timer gratuito ti aiuta a implementare efficacemente la Tecnica Pomodoro. Caratteristiche principali:',
    features: [
      'Intervalli di lavoro/pausa personalizzabili',
      'Integrazione di video di sottofondo (YouTube/Bilibili)',
      'Effetti sonori naturali per la concentrazione',
      'Supporto multilingua'
    ],
    
    done: 'Completato!'
  },
  
  // Português
  'pt': {
    totalTime: 'Tempo total (min)',
    segments: 'Segmentos',
    segment: 'Segmento',
    minute: 'min',
    phase: ['Fase', 'de'],
    start: 'Iniciar',
    ready: 'Pronto',
    enterUrl: 'Inserir URL...',
    
    soundOptions: {
      none: 'Mudo',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Ondas Alfa',
      wavebeta: 'Ondas Beta',
      birds: 'Pássaros',
      lightrain: 'Chuva',
      oceanwave: 'Ondas do oceano',
      storm: 'Tempestade',
      waterflow: 'Fluxo de água',
      waterstream: 'Riacho'
    },
    
    pageTitle: 'Temporizador de foco online',
    subtitle: 'Aumente a produtividade com gerenciamento inteligente de tempo',
    description: 'Este temporizador de foco gratuito ajuda a implementar a Técnica Pomodoro de forma eficaz. Principais recursos:',
    features: [
      'Intervalos de trabalho/pausa personalizáveis',
      'Integração de vídeos de fundo (YouTube/Bilibili)',
      'Efeitos sonoros naturais para concentração',
      'Suporte multilíngue'
    ],
    
    done: 'Concluído!'
  },
  
  // Русский
  'ru': {
    totalTime: 'Общее время (мин)',
    segments: 'Сегменты',
    segment: 'Сегмент',
    minute: 'мин',
    phase: ['Фаза', 'из'],
    start: 'Старт',
    ready: 'Готово',
    enterUrl: 'Введите URL...',
    
    soundOptions: {
      none: 'Без звука',
      youtube: 'YouTube',
      bilibili: 'BiliBili',
      wavealpha: 'Альфа-волны',
      wavebeta: 'Бета-волны',
      birds: 'Птицы',
      lightrain: 'Дождь',
      oceanwave: 'Океанские волны',
      storm: 'Гроза',
      waterflow: 'Течение воды',
      waterstream: 'Ручей'
    },
    
    pageTitle: 'Онлайн-таймер концентрации',
    subtitle: 'Повысьте продуктивность с помощью умного тайм-менеджмента',
    description: 'Этот бесплатный онлайн-таймер поможет вам эффективно использовать технику Помодоро. Основные функции:',
    features: [
      'Настраиваемые интервалы работы/отдыха',
      'Интеграция фоновых видео (YouTube/Bilibili)',
      'Природные звуки для концентрации',
      'Многоязычная поддержка'
    ],
    
    done: 'Готово!'
  }
};

// 支持的语言列表
const SUPPORTED_LANGUAGES = {
  'en': 'English',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  'ja': '日本語',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'ko': '한국어',
  'it': 'Italiano',
  'pt': 'Português',
  'ru': 'Русский'
};

// 获取浏览器语言
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 检查是否为中文
  if (browserLang.startsWith('zh')) {
    return browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('MO') ? 'zh-TW' : 'zh-CN';
  }
  
  // 其他语言仅保留主要部分
  const mainLang = browserLang.split('-')[0];
  
  // 检查支持的语言中是否有匹配的
  if (SUPPORTED_LANGUAGES[mainLang]) {
    return mainLang;
  } else if (SUPPORTED_LANGUAGES[browserLang]) {
    return browserLang;
  }
  
  // 默认英语
  return 'en';
}

// 当前语言存储
let currentLanguage = localStorage.getItem('preferredLanguage') || detectBrowserLanguage();

// 确保当前语言在支持的语言中
if (!I18N[currentLanguage]) {
  currentLanguage = 'en';
}

// 获取文本
function getText(key, subKey = null) {
  if (!I18N[currentLanguage]) {
    currentLanguage = 'en';
  }
  
  if (!key) return '';
  
  const langData = I18N[currentLanguage];
  
  if (subKey) {
    return langData[key] && langData[key][subKey] ? langData[key][subKey] : I18N.en[key][subKey] || key;
  }
  
  return langData[key] || I18N.en[key] || key;
}

// 更改语言
function changeLanguage(langCode) {
  if (I18N[langCode]) {
    currentLanguage = langCode;
    localStorage.setItem('preferredLanguage', langCode);
    updatePageContent();
    return true;
  }
  return false;
}

// 获取当前语言代码
function getCurrentLanguage() {
  return currentLanguage;
}

// 获取所有支持的语言
function getSupportedLanguages() {
  return SUPPORTED_LANGUAGES;
}

// 更新整个页面内容
function updatePageContent() {
  // 更新页面内容的函数会在 app.js 中实现
  // 这里触发一个自定义事件，让 app.js 知道需要更新内容
  const event = new CustomEvent('languageChanged', { detail: { language: currentLanguage } });
  document.dispatchEvent(event);
}

// 导出所有函数
window.I18N = {
  getText,
  changeLanguage,
  getCurrentLanguage,
  getSupportedLanguages,
  updatePageContent
};
