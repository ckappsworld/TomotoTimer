const mediaManager = {
  currentMedia: null,
  currentType: null,
  videoContainer: document.getElementById('videoContainer'),
  playerCheckInterval: null,
  currentUrl: null,
  segmentDuration: 0,
  
  sounds: {
    birds: new Howl({ src: ['sounds/Birds01.mp3'], loop: true }),
    lightrain: new Howl({ src: ['sounds/lightrain01.mp3'], loop: true }),
    oceanwave: new Howl({ src: ['sounds/ocean-waves01.mp3'], loop: true }),
    storm: new Howl({ src: ['sounds/storm01.mp3'], loop: true }),
    waterstream: new Howl({ src: ['sounds/water-stream01.mp3'], loop: true }),
    waterflow: new Howl({ src: ['sounds/water-flow01.mp3'], loop: true }),
    wavealpha: new Howl({ src: ['sounds/waves-alpha01.mp3'], loop: true }),
    wavebeta: new Howl({ src: ['sounds/waves beta01.mp3'], loop: true }),
    none: { play: () => {}, stop: () => {} }
  },
  
  play(type, url, duration) {
    this.stop();
    this.currentType = type;
    this.currentUrl = url;
    this.segmentDuration = duration;
    
    if(type === 'youtube') {
      this.playYouTube(url);
    } else if(type === 'bilibili') {
      this.playBilibili(url);
    } else if(this.sounds[type]) {
      this.currentMedia = this.sounds[type];
      this.currentMedia.play();
    }
  },
  
  playYouTube(url) {
    let videoId = '';
    if(url.includes('youtube.com/watch')) {
      videoId = new URL(url).searchParams.get('v');
    } else if(url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    
    if(videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&enablejsapi=1`;
      this.embedVideo(embedUrl, 'youtube');
    }
  },
  
  playBilibili(url) {
    let bvid = '';
    if(url.includes('bilibili.com/video/')) {
      const match = url.match(/bilibili\.com\/video\/([^/?]+)/);
      if(match && match[1]) bvid = match[1];
    }
    
    if(bvid) {
      const embedUrl = `https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=1&danmaku=0`;
      this.embedVideo(embedUrl, 'bilibili');
    }
  },
  
  embedVideo(embedUrl, videoType) {
    this.videoContainer.innerHTML = '';
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    iframe.id = `${videoType}-player`;
    this.videoContainer.appendChild(iframe);
    this.videoContainer.style.display = 'block';
    this.setupPlayerMonitoring(videoType);
  },
  
  setupPlayerMonitoring(videoType) {
    clearInterval(this.playerCheckInterval);
    
    if(videoType === 'youtube') {
      this.setupYouTubeMonitoring();
    } else if(videoType === 'bilibili') {
      this.setupBilibiliMonitoring();
    }
  },
  
  setupYouTubeMonitoring() {
    if(!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
    
    window.onYouTubeIframeAPIReady = () => {
      if(this.currentType !== 'youtube') return;
      const iframe = document.getElementById('youtube-player');
      if(!iframe) return;
      
      new YT.Player('youtube-player', {
        events: {
          'onStateChange': (event) => {
            if(event.data === YT.PlayerState.ENDED) {
              this.reloadCurrentVideo();
            }
          }
        }
      });
    };
    
    if(window.YT && window.YT.Player) window.onYouTubeIframeAPIReady();
  },
  
  setupBilibiliMonitoring() {
    this.playerCheckInterval = setInterval(() => {
      const iframe = document.getElementById('bilibili-player');
      if(!iframe) {
        clearInterval(this.playerCheckInterval);
        return;
      }
      try {
        iframe.contentWindow.postMessage('{"cmd":"isFullScreen"}', '*');
      } catch(e) {}
    }, 2000);
    
    window.addEventListener('message', (event) => {
      if(typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if(data.event === 'end') this.reloadCurrentVideo();
        } catch(e) {}
      }
    });
  },
  
  reloadCurrentVideo() {
    if(this.currentType === 'youtube') {
      this.playYouTube(this.currentUrl);
    } else if(this.currentType === 'bilibili') {
      this.playBilibili(this.currentUrl);
    }
  },
  
  stop() {
    if(this.currentMedia?.stop) this.currentMedia.stop();
    clearInterval(this.playerCheckInterval);
    this.videoContainer.innerHTML = '';
    this.videoContainer.style.display = 'none';
    this.currentMedia = null;
    this.currentType = null;
    this.currentUrl = null;
  }
};

class Timer {
  constructor() {
    this.phases = [];
    this.currentPhase = 0;
    this.remaining = 0;
    this.interval = null;
  }

  start(phases) {
    this.stop();
    this.phases = phases;
    if(!phases.length) return;

    this.currentPhase = 0;
    this.remaining = phases[0].duration;
    mediaManager.play(phases[0].soundType, phases[0].soundUrl);
    this.updateDisplay();

    this.interval = setInterval(() => {
      this.remaining--;
      this.updateDisplay();
      
      if(this.remaining <= 0) {
        this.currentPhase++;
        if(this.currentPhase >= phases.length) {
          this.stop();
          alert('Done！');
          return;
        }
        this.remaining = phases[this.currentPhase].duration;
        mediaManager.play(phases[this.currentPhase].soundType, phases[this.currentPhase].soundUrl);
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    mediaManager.stop();
  }

  updateDisplay() {
    const minutes = Math.floor(this.remaining / 60).toString().padStart(2, '0');
    const seconds = (this.remaining % 60).toString().padStart(2, '0');
    document.getElementById('countdown').textContent = `${minutes}:${seconds}`;
    
    const [phaseText, separator] = I18N.getText('phase');
    document.getElementById('currentPhase').textContent = 
      lang === 'zh-TW' ?
      `${phaseText} ${this.currentPhase + 1}${separator}${this.phases.length}` :
      `${phaseText} ${this.currentPhase + 1} ${separator} ${this.phases.length}`;
  }
}

function generateSegments(count) {
  const container = document.getElementById('segmentInputs');
  container.innerHTML = '';
  
  for(let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'segment-row';

    const label = document.createElement('span');
    label.className = 'segment-label';
    label.textContent = lang === 'zh-TW' ? 
      `${I18N.getText('segment')}${i+1}段` : 
      `${I18N.getText('segment')} ${i+1}`;

    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'segment-input';
    input.min = 1;
    input.value = i % 2 === 0 ? 25 : 5;

    const unit = document.createElement('span');
    unit.className = 'unit-label';
    unit.textContent = i18n[lang].unit;

    const select = document.createElement('select');
    select.className = 'sound-select';
    
    const builtInOptions = [
      {value: 'none', text: 'Mute'},
      {value: 'youtube', text: 'YouTube'},
      {value: 'bilibili', text: 'BiliBili'},
      {value: 'wavealpha', text: 'Alpha Waves'},
      {value: 'wavebeta', text: 'Beta Waves'},
      {value: 'birds', text: 'Birds'},
      {value: 'lightrain', text: 'Rain'},
      {value: 'oceanwave', text: 'Ocean Waves'},
      {value: 'storm', text: 'Storm'},
      {value: 'waterflow', text: 'Water Flow'},
      {value: 'waterstream', text: 'Water Stream'}
    ];
    
    builtInOptions.forEach(option => {
      const optElem = document.createElement('option');
      optElem.value = option.value;
      optElem.textContent = option.text;
      select.appendChild(optElem);
    });
    
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.className = 'external-url';
    urlInput.placeholder = I18N.getText('enterUrl');
    urlInput.style.display = 'none';
    
    select.addEventListener('change', function() {
      urlInput.style.display = 
        (this.value === 'youtube' || this.value === 'bilibili') ? 'block' : 'none';
    });

    div.append(label, input, unit, select, urlInput);
    container.appendChild(div);
  }
}

const timer = new Timer();

document.getElementById('segmentCount').addEventListener('input', function() {
  generateSegments(Math.max(1, parseInt(this.value) || 2));
});

document.getElementById('startBtn').addEventListener('click', () => {
  const totalSeconds = parseInt(document.getElementById('totalTime').value) * 60;
  const segments = Array.from(document.querySelectorAll('.segment-row')).map(row => ({
    duration: (parseInt(row.querySelector('input').value) || 1) * 60,
    soundType: row.querySelector('select').value,
    soundUrl: row.querySelector('.external-url').value
  }));

  let accumulated = 0;
  const phases = [];
  while(accumulated < totalSeconds) {
    for(const seg of segments) {
      const remaining = totalSeconds - accumulated;
      if(remaining <= 0) break;
      const duration = Math.min(seg.duration, remaining);
      phases.push({ ...seg, duration });
      accumulated += duration;
    }
  }

  timer.start(phases);
});

document.body.addEventListener('click', () => {
  Howler.autoUnlock = true;
  Howler.usingWebAudio = true;
}, { once: true });

generateSegments(2);

// 檢查是否為移動設備
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// 只在移動設備上創建視頻切換按鈕
if (isMobileDevice()) {
  // 創建切換視頻的按鈕
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toggle-video-btn';
  toggleBtn.innerHTML = '📺';
  toggleBtn.style.display = 'none'; // 初始隱藏，直到計時器啟動
  document.body.appendChild(toggleBtn);
  
  // 添加切換功能
  toggleBtn.addEventListener('click', function() {
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer.style.display === 'block') {
      videoContainer.style.display = 'none';
      document.body.classList.remove('video-active');
    } else {
      videoContainer.style.display = 'block';
      document.body.classList.add('video-active');
    }
  });
  
  // 修改現有啟動邏輯，讓切換按鈕在計時器啟動時顯示
  const originalStartBtn = document.getElementById('startBtn');
  const originalClickHandler = originalStartBtn.onclick;
  
  originalStartBtn.onclick = function() {
    // 調用原始的點擊處理程序
    if (originalClickHandler) {
      originalClickHandler.call(this);
    }
    
    // 顯示切換按鈕
    toggleBtn.style.display = 'flex';
  };
}
document.addEventListener('DOMContentLoaded', function() {
  // 計算實際的視窗高度，解決手機瀏覽器地址欄問題
  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // 初始設置
  setVH();
  
  // 當視窗大小改變時重新計算
  window.addEventListener('resize', setVH);
  
  // 針對手機旋轉
  window.addEventListener('orientationchange', setVH);
});

// 动态更新内容
function updateContent() {
  document.querySelector('[data-i18n="pageTitle"]').textContent = I18N.getText('pageTitle');
  document.querySelector('[data-i18n="subtitle"]').textContent = I18N.getText('subtitle');
  document.querySelector('[data-i18n="description"]').textContent = I18N.getText('description');
  
  const featuresList = document.getElementById('featuresList');
  featuresList.innerHTML = I18N.getText('features').map(f => 
    `<li>${f}</li>`
  ).join('');
}

// 语言切换事件
document.getElementById('languageSelect').addEventListener('change', (e) => {
  I18N.changeLanguage(e.target.value);
});

// 初始化语言选择器
document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('languageSelect');
  Object.entries(I18N.getSupportedLanguages()).forEach(([code, name]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = name;
    option.selected = code === I18N.getCurrentLanguage();
    selector.appendChild(option);
  });
});

// 监听语言变化事件
document.addEventListener('languageChanged', updateContent);
updateContent(); // 初始加载
