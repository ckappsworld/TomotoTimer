// Three.js 初始化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas3d') });
renderer.setSize(window.innerWidth, window.innerHeight);

// 添加一個旋轉立方體（測試用）
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// 動畫循環
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// 番茄鐘邏輯
let timer;
document.getElementById('startBtn').addEventListener('click', () => {
  const totalTime = parseInt(document.getElementById('totalTime').value) * 60;
  const workTime = parseInt(document.getElementById('workTime').value) * 60;
  const breakTime = parseInt(document.getElementById('breakTime').value) * 60;
  
  // 生成時段序列（簡化版）
  const phases = [];
  let remaining = totalTime;
  while (remaining > 0) {
    phases.push({ type: 'work', duration: workTime });
    remaining -= workTime;
    if (remaining <= 0) break;
    phases.push({ type: 'break', duration: breakTime });
    remaining -= breakTime;
  }

  startTimer(phases);
});

function startTimer(phases) {
  let currentPhaseIndex = 0;
  let timeLeft = phases[0].duration;
  
  timer = setInterval(() => {
    timeLeft--;
    
    // 更新顯示
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('countdown').textContent = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // 切換階段
    if (timeLeft <= 0) {
      currentPhaseIndex++;
      if (currentPhaseIndex >= phases.length) {
        clearInterval(timer);
        return;
      }
      timeLeft = phases[currentPhaseIndex].duration;
      document.getElementById('currentPhase').textContent = 
        phases[currentPhaseIndex].type === 'work' ? '工作中' : '休息中';
    }
  }, 1000);
}
