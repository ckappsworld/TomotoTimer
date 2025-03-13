let currentScene = 'city'; // 当前场景类型
let rainParticles, riverMesh; // 粒子系统
let sceneObjects = []; // 场景对象集合

// 初始化场景
function initScene(sceneType) {
  // 清除旧场景
  scene.children = [];
  scene.add(camera);
  sceneObjects = [];

  if(sceneType === 'city') {
    createCityScene();
  } else {
    createForestScene();
  }
}

// 城市雨夜场景
function createCityScene() {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  // 建筑群
  for(let i = 0; i < 20; i++) {
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(15, Math.random()*50 + 30, 15),
      new THREE.MeshPhongMaterial({ 
        color: 0x444444,
        emissive: 0x333333 
      })
    );
    building.position.set(
      Math.random()*200 -100,
      0,
      Math.random()*200 -100
    );
    scene.add(building);
    sceneObjects.push(building);
  }

  // 雨滴粒子系统
  const rainGeometry = new THREE.BufferGeometry();
  const positions = [];
  for(let i = 0; i < 5000; i++) {
    positions.push(
      Math.random() * 400 - 200,
      Math.random() * 200 + 100,
      Math.random() * 400 - 200
    );
  }
  rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  
  const rainMaterial = new THREE.PointsMaterial({
    color: 0xAAAAFF,
    size: 0.1,
    transparent: true
  });
  
  rainParticles = new THREE.Points(rainGeometry, rainMaterial);
  scene.add(rainParticles);
  sceneObjects.push(rainParticles);

  // 路灯
  const streetLight = new THREE.PointLight(0xFFEECC, 1, 50);
  streetLight.position.set(0, 20, 0);
  scene.add(streetLight);
}

// 森林溪流场景
function createForestScene() {
  // 环境光
  const ambientLight = new THREE.AmbientLight(0x668833, 0.5);
  scene.add(ambientLight);

  // 太阳光
  const directionalLight = new THREE.DirectionalLight(0xFFFFCC, 0.8);
  directionalLight.position.set(50, 100, 50);
  scene.add(directionalLight);

  // 地面
  const groundGeometry = new THREE.PlaneGeometry(400, 400);
  const groundMaterial = new THREE.MeshPhongMaterial({
    color: 0x339944,
    side: THREE.DoubleSide
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = Math.PI / 2;
  scene.add(ground);
  sceneObjects.push(ground);

  // 溪流
  const riverGeometry = new THREE.PlaneGeometry(40, 400);
  const riverMaterial = new THREE.MeshPhongMaterial({
    color: 0x4488FF,
    transparent: true,
    opacity: 0.7
  });
  riverMesh = new THREE.Mesh(riverGeometry, riverMaterial);
  riverMesh.rotation.x = Math.PI / 2;
  riverMesh.position.y = 0.1;
  scene.add(riverMesh);
  sceneObjects.push(riverMesh);

  // 树木
  for(let i = 0; i < 50; i++) {
    const tree = new THREE.Mesh(
      new THREE.ConeGeometry(3, 10 + Math.random()*10, 8),
      new THREE.MeshPhongMaterial({ color: 0x225511 })
    );
    tree.position.set(
      Math.random()*300 -150,
      0,
      Math.random()*300 -150
    );
    scene.add(tree);
    sceneObjects.push(tree);
  }
}

// 场景切换功能
document.getElementById('sceneToggle').addEventListener('click', () => {
  currentScene = currentScene === 'city' ? 'forest' : 'city';
  document.getElementById('sceneToggle').textContent = 
    currentScene === 'city' ? '🌲 Forest' : '🌃 City';
  
  initScene(currentScene);
});

// 修改动画循环
function animate() {
  requestAnimationFrame(animate);
  
  // 场景特定动画
  if(currentScene === 'city') {
    // 雨滴下落动画
    if(rainParticles) {
      const positions = rainParticles.geometry.attributes.position.array;
      for(let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.5;
        if(positions[i] < -50) positions[i] = 100;
      }
      rainParticles.geometry.attributes.position.needsUpdate = true;
    }
  } else {
    // 溪流动画
    if(riverMesh) {
      riverMesh.material.opacity = 0.7 + Math.sin(Date.now()*0.005)*0.1;
      riverMesh.position.z = Math.sin(Date.now()*0.003)*10;
    }
  }

  renderer.render(scene, camera);
}

// 初始化默认场景
initScene('city');
animate();
