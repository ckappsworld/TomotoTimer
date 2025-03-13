// Three.js 場景初始化
let scene, camera, renderer, cube;

function initThreeScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 測試用旋轉立方體
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
}

// 多語言系統
const i18n = {
  'en': {
    'total_time': 'Total Time (min)',
    'segment_count': 'Segment Count',
    'start': 'Start',
    'preparing': 'Preparing',
    'phase': 'Phase',
    'segment': 'Segment',
    'remaining': 'Remaining',
    'invalid_input': 'Invalid input!'
  },
  'zh-TW': {
    'total_time': '總時長 (分鐘)',
    'segment_count': '分段數量',
    'start': '開始',
    'preparing': '準備中',
    'phase': '階段',
    'segment': '分段',
    'remaining': '剩餘',
    'invalid_input': '輸入錯誤!'
  }
};

let currentLang = navigator.language.startsWith('zh') ? 'zh-TW' : 'en';

// 動態分段管理
let segments = [];
let timer = null;

function generateSegmentInputs(count) {
  const container = document.getElementById('segmentInputs');
  container.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'segment-input';
    
    const label = document.createElement('label');
    label.textContent = `${i18n[currentLang]['segment']} ${i + 1}:`;
    
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.value = (i % 2 === 0) ? 25 : 5;
    input.className = 'segment-time';
    
    input.addEventListener('input', validateInputs);
    
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  }
}

// 輸入驗證
function validateInputs() {
  const total = parseInt(document.getElementById('totalTime').value) || 0;
  const inputs = Array.from(document.getElementsByClassName('segment-time'));
  const sum = inputs.reduce((acc, input) => acc + (parseInt(input.value) || 0), 0);
  
  document.getElementById('startBtn').disabled = (sum === 0 || total === 0);
}

// 時間計算邏輯
function calculatePhases() {
  const totalSeconds = parseInt(document.getElementById('totalTime').value) * 60;
  const segmentInputs = Array.from(document.getElementsByClassName('segment-time'));
  
  segments = segmentInputs.map(input => {
    const value = parseInt(input.value) || 1;
    input.value = value; // 自動修正
    return value * 60;
  });

  let accumulated = segments.reduce((a, b) => a + b, 0);
  let phaseList = [...segments];

  if (accumulated > totalSeconds) {
    let adjusted = [];
    let remaining = totalSeconds;
    for (const seg of segments) {
      if (remaining <= 0) break;
      adjusted.push(Math.min(seg, remaining));
      remaining -= seg;
    }
    phaseList = adjusted;
  } else {
    let remaining = totalSeconds - accumulated;
    while (remaining > 0) {
      for (const seg of segments) {
        const add = Math.min(seg, remaining);
        phaseList.push(add);
        remaining -= add;
        if (remaining <= 0) break;
      }
    }
  }
  
  return phaseList;
}

// 計時器核心
function startTimer() {
  if (timer) clearInterval(timer);
  
  const phaseList = calculatePhases();
  let currentPhase = 0;
  let timeLeft = phaseList[0];
  
  updateTimerDisplay(timeLeft);
  document.getElementById('currentPhase').textContent = 
    `${i18n[currentLang]['phase']} ${currentPhase + 1}`;

  timer = setInterval(() => {
    timeLeft--;
    
    updateTimerDisplay(timeLeft);
    
    if (timeLeft <= 0) {
      currentPhase++;
      if (currentPhase >= phaseList.length) {
        clearInterval(timer);
        alert('Timer Complete!');
        return;
      }
      timeLeft = phaseList[currentPhase];
      document.getElementById('currentPhase').textContent = 
        `${i18n[currentLang]['phase']} ${currentPhase + 1}`;
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  document.getElementById('countdown').textContent = 
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 語言切換
document.getElementById('languageSelect').addEventListener('change', (e) => {
  currentLang = e.target.value === 'auto' ? 
    (navigator.language.startsWith('zh') ? 'zh-TW' : 'en') : 
    e.target.value;
  applyTranslations();
  generateSegmentInputs(document.getElementById('segmentCount').value);
});

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18n[currentLang][key] || key;
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initThreeScene();
  applyTranslations();
  generateSegmentInputs(2);
  
  // Three.js 動畫循環
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // 事件監聽
  document.getElementById('segmentCount').addEventListener('input', function() {
    generateSegmentInputs(this.value);
    validateInputs();
  });
  
  document.getElementById('startBtn').addEventListener('click', startTimer);
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', validateInputs);
  });
  
  // 窗口大小調整
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
