// Three.js 初始化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0);

// 測試立方體
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x0099ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// 動態分段生成
function generateSegments(count) {
  const container = document.getElementById('segmentInputs');
  container.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'segment-input';
    div.innerHTML = `
      <label>Segment ${i + 1} (min)</label>
      <input type="number" class="segment" min="1" value="${i % 2 === 0 ? 25 : 5}">
    `;
    container.appendChild(div);
  }
}

// 初始化分段
generateSegments(2);

// 事件監聽
document.getElementById('segmentCount').addEventListener('input', function() {
  generateSegments(Math.max(1, this.value));
});

document.getElementById('startBtn').addEventListener('click', () => {
  const totalMinutes = parseInt(document.getElementById('totalTime').value);
  const segments = Array.from(document.querySelectorAll('.segment')).map(
    input => parseInt(input.value) * 60
  );
  startTimer(totalMinutes * 60, segments);
});

// 計時器邏輯
function startTimer(totalSeconds, segments) {
  let currentSegment = 0;
  let remaining = segments[0];
  
  const timer = setInterval(() => {
    remaining--;
    
    document.getElementById('countdown').textContent = 
      `${Math.floor(remaining / 60).toString().padStart(2, '0')}:${(remaining % 60).toString().padStart(2, '0')}`;
    
    document.getElementById('currentPhase').textContent = 
      `Segment ${currentSegment + 1} [${segments[currentSegment]/60}min]`;

    if (remaining <= 0) {
      currentSegment++;
      if (currentSegment >= segments.length) {
        clearInterval(timer);
        alert('Timer Complete!');
        return;
      }
      remaining = segments[currentSegment];
    }
  }, 1000);
}

// 動畫循環
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
