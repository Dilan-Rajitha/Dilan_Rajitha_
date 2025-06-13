window.onload = function () {
  startAnimation();

  // Redirect after 2 seconds
  // setTimeout(() => {
  //   window.location.href = "test.html"; 
  // }, 5000);

  setTimeout(() => {
  document.body.classList.add('fade-out'); // 👈 Add fade-out effect
  setTimeout(() => {
    window.location.href = "dashboard.html"; // 👈 Redirect after fade-out
  }, 100); // Wait for fade animation to finish (match CSS duration)
}, 5000); // Wait for 2 seconds before starting fade normal 2000

};

function startAnimation() {
  const $body = document.body;
  const $wrap = document.getElementById('wrap');

  const canvassize = 600;
  const length = 35;
  const radius = 5.6;
  const pi2 = Math.PI * 2;

  let rotatevalue = 0.035;
  let acceleration = 0;
  let animatestep = 0;
  let toend = false;

  const group = new THREE.Group();
  let mesh, ringcover, ring;

  const camera = new THREE.PerspectiveCamera(65, 1, 1, 10000);
  camera.position.z = 150;

  const scene = new THREE.Scene();
  scene.add(group);

  class CustomCurve extends THREE.Curve {
    getPoint(percent) {
      const x = length * Math.sin(pi2 * percent);
      const y = radius * Math.cos(pi2 * 3 * percent);
      let z, t;

      t = percent % 0.25 / 0.25;
      t = percent % 0.25 - (2 * (1 - t) * t * -0.0185 + t * t * 0.25);
      if (Math.floor(percent / 0.25) == 0 || Math.floor(percent / 0.25) == 2) t *= -1;
      z = radius * Math.sin(pi2 * 2 * (percent - t));

      return new THREE.Vector3(x, y, z);
    }
  }

  mesh = new THREE.Mesh(
    new THREE.TubeGeometry(new CustomCurve(), 200, 1.1, 2, true),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  group.add(mesh);

  ringcover = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 15, 1),
    new THREE.MeshBasicMaterial({ color: 0x3AAFA9, opacity: 0, transparent: true })
  );
  ringcover.position.x = length + 1;
  ringcover.rotation.y = Math.PI / 2;
  group.add(ringcover);

  ring = new THREE.Mesh(
    new THREE.RingGeometry(4.3, 5.55, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0, transparent: true })
  );
  ring.position.x = length + 1.1;
  ring.rotation.y = Math.PI / 2;
  group.add(ring);

  // Fake shadow
  for (let i = 0; i < 10; i++) {
    const plain = new THREE.Mesh(
      new THREE.PlaneGeometry(length * 2 + 1, radius * 3, 1),
      new THREE.MeshBasicMaterial({ color: 0x3AAFA9, transparent: true, opacity: 0.13 })
    );
    plain.position.z = -2.5 + i * 0.5;
    group.add(plain);
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvassize, canvassize);
  renderer.setClearColor('#3AAFA9');
  $wrap.appendChild(renderer.domElement);

  // Add interaction
  $body.addEventListener('mousedown', () => toend = true);
  $body.addEventListener('touchstart', () => toend = true);
  $body.addEventListener('mouseup', () => toend = false);
  $body.addEventListener('touchend', () => toend = false);

  animate();

  function render() {
    animatestep = Math.max(0, Math.min(240, toend ? animatestep + 1 : animatestep - 4));
    acceleration = easing(animatestep, 0, 1, 240);

    if (acceleration > 0.35) {
      let progress = (acceleration - 0.35) / 0.65;
      group.rotation.y = -Math.PI / 2 * progress;
      group.position.z = 50 * progress;
      let endProgress = Math.max(0, (acceleration - 0.97) / 0.03);
      mesh.material.opacity = 1 - endProgress;
      ringcover.material.opacity = ring.material.opacity = endProgress;
      ring.scale.x = ring.scale.y = 0.9 + 0.1 * endProgress;
    }

    renderer.render(scene, camera);
  }

  function animate() {
    mesh.rotation.x += rotatevalue + acceleration;
    render();
    requestAnimationFrame(animate);
  }

  function easing(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }
}
