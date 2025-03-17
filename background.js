function init3DBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    // 檢測設備性能
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPower = isMobile || window.navigator.hardwareConcurrency <= 4;
    
    // 根據性能調整設置
    if (isLowPower) {
        renderer.setPixelRatio(1);
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
    } else {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    renderer.setClearColor(0x000000, 0);
    document.body.prepend(renderer.domElement);

    // 根據性能選擇不同的幾何體複雜度
    const detailLevel = isLowPower ? 1 : 2;
    const geometry = new THREE.IcosahedronGeometry(2, detailLevel);
    const material = new THREE.MeshPhongMaterial({
        color: 0x0099ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    camera.position.z = 5;

    // 調整動畫幀率
    const rotationSpeed = isLowPower ? 0.001 : 0.003;
    let lastTime = 0;
    const targetFPS = isLowPower ? 30 : 60;
    const interval = 1000 / targetFPS;

    function animate(currentTime) {
        if (currentTime - lastTime > interval) {
            lastTime = currentTime;
            mesh.rotation.x += rotationSpeed;
            mesh.rotation.y += rotationSpeed;
            renderer.render(scene, camera);
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        if (isLowPower) {
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        } else {
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    });

    // 設置可見性變化時的處理
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // 頁面不可見時暫停動畫
            cancelAnimationFrame(animationFrame);
        } else {
            // 頁面可見時恢復動畫
            animate();
        }
    });

    let animationFrame = requestAnimationFrame(animate);
}
