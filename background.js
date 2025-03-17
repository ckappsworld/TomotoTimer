let is3DBackgroundEnabled = false; // 初始設置為false，暫時不顯示3D元素

// 在適當的初始化函數中添加
function initBatteryMonitor() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            // 初始檢查
            checkBatteryStatus(battery);
            
            // 監聽電量變化
            battery.addEventListener('levelchange', () => {
                checkBatteryStatus(battery);
            });
        });
    }
}

function checkBatteryStatus(battery) {
    const batteryLevel = battery.level;
    const isCharging = battery.charging;
    
    // 如果正在充電，不需要節省電量
    if (isCharging) {
        enableFullGraphics();
        return;
    }
    
    // 如果電量低於20%，禁用3D背景
    if (batteryLevel < 0.2 && is3DBackgroundEnabled) {
        is3DBackgroundEnabled = false;
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    } 
    // 如果電量恢復到25%以上，重新啟用3D背景
    else if (batteryLevel >= 0.25 && !is3DBackgroundEnabled) {
        is3DBackgroundEnabled = true;
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.style.display = 'block';
        }
    }
}

function enableFullGraphics() {
    is3DBackgroundEnabled = true;
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.style.display = 'block';
    }
}

// 在頁面加載時初始化
document.addEventListener('DOMContentLoaded', initBatteryMonitor);

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
    renderer.domElement.style.zIndex = '-1'; // 確保3D背景在背景圖片之上
    renderer.domElement.style.position = 'fixed';
    document.body.prepend(renderer.domElement);

    // 如果初始設置為不顯示3D元素，隱藏canvas
    if (!is3DBackgroundEnabled) {
        renderer.domElement.style.display = 'none';
    }

    // 由於我們暫時不顯示3D元素，先註釋掉相關代碼
    // const detailLevel = isLowPower ? 1 : 2;
    // const geometry = new THREE.IcosahedronGeometry(2, detailLevel);
    // const material = new THREE.MeshPhongMaterial({
    //     color: 0x0099ff,
    //     wireframe: true,
    //     transparent: true,
    //     opacity: 0.3
    // });
    // const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);

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
            // 註釋掉旋轉邏輯，因為我們暫時沒有添加3D物體
            // mesh.rotation.x += rotationSpeed;
            // mesh.rotation.y += rotationSpeed;
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

// 啟動3D背景初始化
init3DBackground();
