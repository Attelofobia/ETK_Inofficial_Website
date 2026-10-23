import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ---------- part sets ---------------------------------------------------- */

const P = 'etk1300_';
const BASE = [
  'body','hood','door_FL','door_FR','door_RL','door_RR','fender_L','fender_R',
  'mirror_L','mirror_R','mirrorsignal_L','mirrorsignal_R','wipers','rearwiper',
  'windshield','windshield_int','doorglass_FL','doorglass_FL_int','doorglass_FR','doorglass_FR_int',
  'doorglass_RL','doorglass_RL_int','doorglass_RR','doorglass_RR_int',
  'sideglass_L','sideglass_L_int','sideglass_R','sideglass_R_int','tailgateglass','tailgateglass_int',
  'tailgate_regular','tailgate_plate_lights','chmsl','licenseplateholder','sidemarker_FL','sidemarker_FR',
  'headlightframe_L','headlightframe_R',
  'taillight_L','taillight_R','taillightglass_L','taillightglass_R','taillightframe_L','taillightframe_R',
  'bumper_R_a','bumperbar_F','valance','deflector','duct_F','enginebay_cladding_L','enginebay_cladding_R',
  'logo_F','logo_R','exhaust_L','exhaust_R',
  'dash','dash_normal','doorpanel_FL','doorpanel_FR','doorpanel_RL','doorpanel_RR','steer','intcarpet',
  'shelf','shelfsupport','sunvisor','intmirror','gauges','gauges_screen','decals_gauges',
  'needle_temp','needle_fuel','needle_tacho','needle_speedo','screen','signalstalk','wiperstalk',
  'brakepedal','gaspedal',
  'subframe_F','subframe_R','lowerarm_F_a','lowerarm_F_b','lowerarm_R','upperarm_R','tierod_F','tierod_R',
  'spring_R','shock_R','strut_F','hub_F','hub_R','halfshaft_R','driveshaft','diff','swaybar_F','swaybar_R',
  'steeringbox','fueltank','heatshield','engine_undertray','tubs','radiator','radsupport','engbaycrap','strutbrace_F'
].map(n => P + n).concat(['etk_transmission','etk_intercooler']);

const GROUPS = {
  trim: {
    '190': ["lettering_1354","lettering_190"],
    '340': ["lettering_1356","lettering_340"],
    '450': ["lettering_1358","lettering_450"],
    '260d': ["lettering_1356","lettering_260","lettering_d"],
    '490ttsport': ["lettering_1358","lettering_490","lettering_tt_sport","logo_F_ttsport"],
    'rennspecht': ["lettering_13r","lettering_rennspecht","logo_F_rennspecht","logo_R_rennspecht"],
    'rennspechtsr': ["lettering_13r","lettering_rennspecht","logo_F_rennspecht","logo_R_rennspecht"],
    'heritage': ["lettering_1358","lettering_tt_sport","logo_F_ttsport"],
    'exclusive': ["lettering_1358","logo_F_exclusive"],
    'exclusived': ["lettering_1358","lettering_d","logo_F_exclusive"]
  },
  engine: {
    i4: ['etk_icpipe_i_i4','etk_icpipe_t_i4','etk_radtube_i4'],
    i6: ['etk_icpipe_i_i6','etk_icpipe_t_i6','etk_radtube_i6'],
    v8: ['etk_icpipe_i_v8','etk_icpipe_t_v8','etk_radtube_v8','etk1300_engbaycrap_v8']
  },
  drive: {
    rwd: [],
    awd: ['lettering_x','diff_F','driveshaft_F','halfshaft_F','etk_transfercase']
  },
  transmission: {
    auto:   ['shifter_A','shifterbase_A','paddles'],
    manual: ['shifter_boot_M','shifter_knob_M','shifter_base_M','clutchpedal']
  },
  trimFinish: {
    plastic: ['trim_body_plastic','trim_fender_plastic_L','trim_fender_plastic_R','trim_door_FL_plastic',
              'trim_door_FR_plastic','trim_door_RL_plastic','trim_door_RR_plastic','trim_bumper_R_plastic',
              'trim_bumper_F_a_plastic','sidemarker_frame_plastic'],
    painted: ['trim_body_paint','trim_fender_paint_L','trim_fender_paint_R','trim_door_FL_paint',
              'trim_door_FR_paint','trim_door_RL_paint','trim_door_RR_paint','trim_bumper_R_painted',
              'trim_bumper_F_a_painted','sidemarker_frame_painted']
  },
  bumperF: {
    standard:  ['bumper_F_a'],
    sport:     ['bumper_F_b','trim_bumper_F_b'],
    exclusive: ['bumper_F_c']
  },
  grille: {
    standard:  ['grille'],
    hex:       ['grille1'],
    exclusive: ['grille_exclusive','logo_F_exclusive']
  },
  headlights: {
    halogen: ['headlight_L2','headlight_R2','headlightglass_L2','headlightglass_R2'],
    xenon:   ['headlight_L_sport','headlight_R_sport','headlightglass_L','headlightglass_R'],
    led:     ['headlight_L3','headlight_L3_reflectors','headlight_R3','headlight_R3_reflectors',
              'headlightglass_L','headlightglass_R']
  },
  taillights: {
    standard: ['tailgatelight_L','tailgatelight_R','tailgatelightglass_L','tailgatelightglass_R',
               'tailgatelightframe_L','tailgatelightframe_R'],
    extended: ['tailgatelight_long_L','tailgatelight_long_R','tailgatelightglass_long_L',
               'tailgatelightglass_long_R','tailgatelightframe_long_L','tailgatelightframe_long_R',
               'tailgatelightcover_L','tailgatelightcover_R']
  },
  roof: {
    solid:   ['roof'],
    sunroof: ['roof_sunroof','sunroof','sunroof_int']
  },
  exhaust: {
    round:    ['exhausttip_L_a','exhausttip_R_a'],
    twin:     ['exhausttip_L_b','exhausttip_R_b'],
    oval:     ['exhausttip_L_oval','exhausttip_R_oval'],
    polished: ['exhausttip_L_exclusive','exhausttip_R_exclusive']
  },
  diffuser: {
    none:      [],
    single:    ['diffuser_R_1'],
    double:    ['diffuser_R_2','diffuser_R_2_b'],
    exclusive: ['diffuser_R_exclusive']
  },
  seats: {
    standard: ['seat_FL','seat_FR'],
    sport:    ['seat_FL_sport','seat_FR_sport']
  },
  cabin: {
    standard:  ['seats_R'],
    exclusive: ['seats_R_exclusive','dash_rear_exclusive','lettering_exclusive']
  },
  exterior: {
    foglights:      ['foglight_L','foglight_R','foglightglass_L','foglightglass_R'],
    chrometailgate: ['tailgate_chrome'],
    frontbar:       ['bullbar_smol'],
    towbar:         ['towhitch_alt1300']
  },
  cabinOpts: {
    rearscreens: ['seat_screen_FL','seat_screen_FR']
  }
};

const TRIMS = {"190":{"label":"1354 190","drive":"both","gear":"auto","gearOpt":true,"gearLabel":null,"force":null,"ev":false,"special":false},"340":{"label":"1356 340","drive":"both","gear":"auto","gearOpt":true,"gearLabel":null,"force":null,"ev":false,"special":false},"450":{"label":"1358 450","drive":"both","gear":"auto","gearOpt":true,"gearLabel":null,"force":null,"ev":false,"special":false},"260d":{"label":"1356 260d","drive":"both","gear":"auto","gearOpt":true,"gearLabel":null,"force":null,"ev":false,"special":false},"490ttsport":{"label":"1358 490 ttSport","drive":"both","gear":"auto","gearOpt":true,"gearLabel":null,"force":null,"ev":false,"special":false},"rennspecht":{"label":"Rennspecht","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":"7-speed ttSport automatic","force":{"bumperF":"sport"},"ev":false,"special":false},"rennspechtsr":{"label":"Rennspecht SR","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":"7-speed ttSport automatic","force":{"bumperF":"sport"},"ev":false,"special":false},"heritage":{"label":"Heritage","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":"7-speed ttSport automatic","force":{"bumperF":"sport"},"ev":false,"special":false},"exclusive":{"label":"Exclusive","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":null,"force":{"bumperF":"exclusive","grille":"exclusive","diffuser":"exclusive","cabin":"exclusive"},"ev":false,"special":false},"exclusived":{"label":"Exclusive d","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":null,"force":{"bumperF":"exclusive","grille":"exclusive","diffuser":"exclusive","cabin":"exclusive"},"ev":false,"special":false}};
const ENGINE_OF = {"190":"i4","340":"i6","450":"v8","260d":"i6","490ttsport":"v8","rennspecht":"v8","rennspechtsr":"v8","heritage":"v8","exclusive":"v8","exclusived":"v8"};

function qualify(list){
  return list.map(n => (n.startsWith('etk1300_') || n.startsWith('etk_') || n.startsWith('towhitch')) ? n : P + n);
}

/* ---------- materials ---------------------------------------------------- */

const M = {
  paint:   new THREE.MeshPhysicalMaterial({ color:0x3c4045, metalness:0.72, roughness:0.26, clearcoat:1, clearcoatRoughness:0.04 }),
  glass:   new THREE.MeshPhysicalMaterial({ color:0x14181b, metalness:0, roughness:0.05, transparent:true, opacity:0.24, side:THREE.DoubleSide }),
  clearLamp: new THREE.MeshPhysicalMaterial({ color:0xdfe6ea, metalness:0, roughness:0.08, transparent:true, opacity:0.42 }),
  redLamp: new THREE.MeshPhysicalMaterial({ color:0x8e0b18, metalness:0, roughness:0.16, transparent:true, opacity:0.72 }),
  redRefl: new THREE.MeshStandardMaterial({ color:0x5d0a12, metalness:0.2, roughness:0.45 }),
  amber:   new THREE.MeshStandardMaterial({ color:0xb4620d, metalness:0.1, roughness:0.35 }),
  refl:    new THREE.MeshStandardMaterial({ color:0xd8dcdf, metalness:0.9, roughness:0.18 }),
  chrome:  new THREE.MeshStandardMaterial({ color:0xc7ccd1, metalness:0.95, roughness:0.2 }),
  grille:  new THREE.MeshStandardMaterial({ color:0x191c1f, metalness:0.55, roughness:0.45 }),
  dark:    new THREE.MeshStandardMaterial({ color:0x1b1e21, metalness:0.15, roughness:0.62 }),
  plastic: new THREE.MeshStandardMaterial({ color:0x2a2e32, metalness:0.1, roughness:0.68 }),
  chassis: new THREE.MeshStandardMaterial({ color:0x24282c, metalness:0.45, roughness:0.62 }),
  metal:   new THREE.MeshStandardMaterial({ color:0x8a9096, metalness:0.85, roughness:0.35 }),
  screen:  new THREE.MeshStandardMaterial({ color:0x0a1420, metalness:0.1, roughness:0.22, emissive:0x0a2f52, emissiveIntensity:0.6 }),
  int:     new THREE.MeshStandardMaterial({ color:0x23262a, metalness:0.06, roughness:0.74 }),
  int2:    new THREE.MeshStandardMaterial({ color:0x15171a, metalness:0.05, roughness:0.88 }),
  rim:     new THREE.MeshStandardMaterial({ color:0xc3c7cb, metalness:0.88, roughness:0.26 }),
  tyre:    new THREE.MeshStandardMaterial({ color:0x0f1113, metalness:0.05, roughness:0.85 }),
  disc:    new THREE.MeshStandardMaterial({ color:0x6c7278, metalness:0.9, roughness:0.42 }),
  caliper: new THREE.MeshStandardMaterial({ color:0x5a5f64, metalness:0.4, roughness:0.45 })
};

const RX = {
  paint: /^etk1300_(body|hood|roof|roof_sunroof|roofcover|door_(FL|FR|RL|RR)|fender_[LR]|bumper_F_[abc]|bumper_R_a|tailgate_(regular|long)|mirror_[LR]|trim_.*_(paint|painted)|sidemarker_frame_painted)$/,
  interior: /(seat|seats_R|dash|doorpanel|intcarpet|shelf|sunvisor|interior_partition|steer|sunvisor)/,
  glass: /(windshield|doorglass|sideglass|tailgateglass|sunroof)/,
  lampRed: /(taillight|tailgatelight|chmsl)/,
  lampClear: /(headlight|foglight)/,
  amber: /(sidemarker_F[LR]|mirrorsignal)/,
  chrome: /(lettering|logo|tailgate_chrome|exhausttip)/,
  grille: /grille/
};

function classOf(name){
  if (RX.paint.test(name)) return 'paint';
  if (RX.amber.test(name)) return 'amber';
  if (RX.glass.test(name) && !/light/.test(name)) return 'glass';
  if (RX.lampRed.test(name)) return 'lampRed';
  if (RX.lampClear.test(name)) return 'lampClear';
  if (RX.chrome.test(name)) return 'chrome';
  if (RX.grille.test(name)) return 'grille';
  if (RX.interior.test(name)) return 'interior';
  return 'chassis';
}

function byOriginal(orig, partName){
  if (/glass_invisible/.test(orig)) return null;
  if (/etkc_glass|etk800_glass_int/.test(orig)) return M.glass;
  if (/screen/.test(orig)) return M.screen;
  if (/lettering_extra/.test(orig)) return M.chrome;
  if (/grille_hex|etk1300_extra/.test(orig)) return M.grille;
  if (/grille/.test(orig)) return /dash|seat|doorpanel|steer|shelf/.test(partName) ? M.int : M.grille;
  if (/etkc_lights/.test(orig)) return M.dark;
  if (/pushbar|towhitch|eeee/.test(orig)) return M.metal;
  if (/foglight/.test(orig)) return M.refl;
  return M.plastic;
}

function assign(part){
  const name = part.name;
  const cls = classOf(name);
  part.traverse(o => {
    if (!o.isMesh) return;
    const orig = (o.material && o.material.name) || '';
    o.castShadow = true;
    if (/glass_invisible/.test(orig)) { o.visible = false; return; }
    let m;
    if (cls === 'paint') {
      m = /light_cover/.test(orig) ? M.paint : byOriginal(orig, name);
    } else if (cls === 'interior') {
      m = /light_cover|grille/.test(orig) ? (/carpet/.test(name) ? M.int2 : M.int) : byOriginal(orig, name);
    } else if (cls === 'glass') {
      m = M.glass;
      o.castShadow = false;
    } else if (cls === 'lampRed') {
      m = /glass/.test(name) ? M.redLamp : (/light_cover/.test(orig) ? M.redRefl : M.dark);
    } else if (cls === 'lampClear') {
      m = /glass/.test(name) ? M.clearLamp : (/light_cover/.test(orig) ? M.refl : M.dark);
    } else if (cls === 'amber') {
      m = M.amber;
    } else if (cls === 'chrome') {
      m = M.chrome;
    } else if (cls === 'grille') {
      m = byOriginal(orig, name) || M.grille;
    } else {
      m = /etkc_glass/.test(orig) ? M.glass : M.chassis;
    }
    if (m) o.material = m;
  });
}

/* ---------- scene -------------------------------------------------------- */

const canvas = document.getElementById('canvas');
const stage = canvas.parentElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, preserveDrawingBuffer:true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(2.95, 1.42, 3.65);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const key = new THREE.DirectionalLight(0xffffff, 2.1);
key.position.set(4.5, 7.5, 5);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.left = -4.5; key.shadow.camera.right = 4.5;
key.shadow.camera.top = 4.5; key.shadow.camera.bottom = -4.5;
key.shadow.camera.far = 24;
key.shadow.bias = -0.0008;
scene.add(key);
scene.add(new THREE.DirectionalLight(0xdfe7ef, 0.7).translateX(-6).translateY(4).translateZ(-4));
scene.add(new THREE.HemisphereLight(0xffffff, 0xc8ccd0, 0.55));

const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity:0.3 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 2.4;
controls.maxDistance = 14;
controls.maxPolarAngle = Math.PI / 2 - 0.02;
controls.target.set(0, 0.80, 0.15);
controls.autoRotateSpeed = 0.7;

/* ---------- wheels ------------------------------------------------------- */

const WHEEL = {
  w18:  { rim:'etkss_wheel_01a_18x9', tyre:'tire_xxa_18x9_25' },
  w19:  { rim:'etk_wheel_01a_19x9',   tyre:'tire_xxa_19x9_25' },
  w19a: { rim:'etkss_wheel_03a_19x9', tyre:'tire_245_45_19_sport' },
  w19b: { rim:'etkss_wheel_04_19x9',  tyre:'tire_xxa_19x9_25_sport' },
  w19c: { rim:'etk_wheel_08b_19x9',   tyre:'tire_265_45_19_sport' },
  w19s: { rim:'etkss_wheel_02a_19x9_R', rimL:'etkss_wheel_02a_19x9_L', tyre:'tire_01a_19x9_26_big',
          rearRim:'etkss_wheel_02a_19x11_R', rearRimL:'etkss_wheel_02a_19x11_L', rearTyre:'tire_01a_19x11_26_big' },
  wxc:  { rim:'etk_wheel_03a_19x9',   tyre:'offroadtire_01a_19x9_27' }
};
const AXLE = [
  { x: 0.775, z: 1.432, rear:false, side: 1 },
  { x:-0.775, z: 1.432, rear:false, side:-1 },
  { x: 0.775, z:-1.392, rear:true,  side: 1 },
  { x:-0.775, z:-1.392, rear:true,  side:-1 }
];
const wheelRoot = new THREE.Group();
scene.add(wheelRoot);
const LIB = { rims:new Map(), tyres:new Map(), rimQ:new THREE.Quaternion(), tyreQ:new THREE.Quaternion() };

function libRegister(gltf, map){
  gltf.scene.updateMatrixWorld(true);
  let holder = gltf.scene, best = gltf.scene.children.length;
  gltf.scene.traverse(o => { if (o.children.length > best){ best = o.children.length; holder = o; } });
  holder.children.slice().forEach(c => { if (c.name) map.set(c.name, c); });
  return holder.getWorldQuaternion(new THREE.Quaternion());
}

function libPart(map, quat, name){
  const src = map.get(name);
  if (!src) return null;
  const holder = new THREE.Group();
  holder.quaternion.copy(quat);
  const c = src.clone(true);
  c.position.set(0, 0, 0);
  holder.add(c);
  return holder;
}

function buildWheel(styleKey, corner){
  const s = WHEEL[styleKey] || WHEEL.w18;
  const rimName = corner.rear
    ? (corner.side < 0 ? (s.rearRimL || s.rearRim || s.rimL || s.rim) : (s.rearRim || s.rim))
    : (corner.side < 0 ? (s.rimL || s.rim) : s.rim);
  const tyreName = corner.rear ? (s.rearTyre || s.tyre) : s.tyre;

  const g = new THREE.Group();
  const rim = libPart(LIB.rims, LIB.rimQ, rimName);
  const tyre = libPart(LIB.tyres, LIB.tyreQ, tyreName);
  if (rim){
    rim.traverse(o => { if (o.isMesh){ o.material = M.rim; o.castShadow = true; } });
    g.add(rim);
  }
  if (tyre){
    tyre.traverse(o => { if (o.isMesh){ o.material = M.tyre; o.castShadow = true; } });
    g.add(tyre);
  }

  const box = new THREE.Box3().setFromObject(g);
  const size = box.getSize(new THREE.Vector3());
  const mid = box.getCenter(new THREE.Vector3());
  g.children.forEach(c => c.position.sub(mid));
  const radius = Math.max(size.y, size.z) / 2 || 0.36;

  const brake = new THREE.Group();
  brake.add(new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.62, radius * 0.62, 0.024, 32), M.disc));
  const cal = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.09, 0.15), M.caliper);
  cal.position.set(0, -0.03, -radius * 0.46);
  brake.add(cal);
  brake.rotation.z = Math.PI / 2;
  brake.position.x = -corner.side * 0.035;
  brake.traverse(o => { if (o.isMesh) o.castShadow = true; });
  g.add(brake);

  g.userData.radius = radius;
  return g;
}

function setWheels(styleKey){
  wheelRoot.clear();
  AXLE.forEach(corner => {
    const w = buildWheel(styleKey, corner);
    if (corner.side < 0) w.rotation.y = Math.PI;
    w.position.set(corner.x, w.userData.radius, corner.z);
    wheelRoot.add(w);
  });
}

/* ---------- load --------------------------------------------------------- */

const parts = new Map();
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const bar = document.getElementById('bar');
const loaderEl = document.getElementById('loader');

Promise.all([
  loader.loadAsync('assets/3d/etk1300.glb', (e) => {
    if (e.total) bar.style.width = Math.round((e.loaded / e.total) * 80) + '%';
  }),
  loader.loadAsync('assets/3d/etk-wheels.glb'),
  loader.loadAsync('assets/3d/etk-tires.glb')
]).then(([car, rims, tyres]) => {
  const root = car.scene;
  root.updateMatrixWorld(true);
  let holder = root, best = root.children.length;
  root.traverse(o => { if (o.children.length > best){ best = o.children.length; holder = o; } });
  holder.children.slice().forEach(p => { parts.set(p.name, p); assign(p); });
  scene.add(root);

  LIB.rimQ = libRegister(rims, LIB.rims);
  LIB.tyreQ = libRegister(tyres, LIB.tyres);

  setWheels(state.wheel);
  wheelRoot.userData.style = state.wheel;
  apply();
  bar.style.width = '100%';
  loaderEl.classList.add('gone');
  setTimeout(() => loaderEl.remove(), 500);
}).catch((err) => {
  loaderEl.innerHTML = '<div class="eyebrow">The model could not be loaded</div>';
  console.error(err);
});

/* ---------- state -------------------------------------------------------- */

const groupEls = Array.from(document.querySelectorAll('.grp[data-group]'));
const state = {};
const defaults = {};

const VIEW_FOR = {
  paint:'three-quarter', trimFinish:'three-quarter', bumperF:'three-quarter', grille:'three-quarter',
  headlights:'three-quarter', roof:'three-quarter', exterior:'three-quarter',
  wheel:'wheel', wheelFinish:'wheel', caliper:'wheel',
  trim:'rear', drive:'rear', taillights:'rear', exhaust:'rear', diffuser:'rear',
  seats:'interior', interior:'interior', cabin:'interior', cabinOpts:'interior', transmission:'interior'
};

groupEls.forEach(sec => {
  const g = sec.dataset.group;
  const many = sec.dataset.kind === 'many';
  const btns = Array.from(sec.querySelectorAll('[data-value]'));
  state[g] = many
    ? btns.filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.value)
    : (btns.find(b => b.getAttribute('aria-pressed') === 'true') || btns[0]).dataset.value;
  defaults[g] = many ? state[g].slice() : state[g];
  btns.forEach(b => b.addEventListener('click', () => {
    if (many){
      const i = state[g].indexOf(b.dataset.value);
      if (i > -1) state[g].splice(i, 1); else state[g].push(b.dataset.value);
    } else {
      state[g] = b.dataset.value;
    }
    apply();
    const view = VIEW_FOR[g];
    if (view) goView(view);
  }));
});


const TR_BASE = {};
function trSetPrice(b, n){
  if (!b) return;
  if (TR_BASE[b.dataset.group + b.dataset.value] == null) TR_BASE[b.dataset.group + b.dataset.value] = +b.dataset.price;
  b.dataset.price = String(n);
  const p = b.querySelector('.p, .pr');
  if (p) p.textContent = n ? '+ ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' EUR' : 'Included';
}
function trBase(b){ const k = b.dataset.group + b.dataset.value; return TR_BASE[k] != null ? TR_BASE[k] : +b.dataset.price; }
function trimEnforceLite(){
  const T = TRIMS[state.trim]; if (!T) return;
  document.querySelectorAll('.grp [data-value]').forEach(b => { b.dataset.group = b.closest('.grp').dataset.group; });
  if (T.drive !== 'both') state.drive = T.drive;
  if (!T.gearOpt) state.transmission = T.gear;
  const F = T.force || {};
  Object.keys(F).forEach(g => { if (g in state) state[g] = F[g]; });
  document.querySelectorAll('.grp[data-group="transmission"] [data-value]').forEach(b => {
    if (b.dataset.orig == null) b.dataset.orig = b.dataset.label;
    const lab = (b.dataset.value === T.gear && T.gearLabel) ? T.gearLabel : b.dataset.orig;
    b.dataset.label = lab; if (b.firstChild && b.firstChild.nodeType === 3) b.firstChild.nodeValue = lab;
  });
  document.querySelectorAll('.grp [data-value]').forEach(b => {
    const g = b.dataset.group;
    if (g === 'trim') return;
    if (g === 'drive' && b.dataset.value === 'awd') trSetPrice(b, T.drive === 'awd' ? 0 : trBase(b));
    else if (F[g] != null) trSetPrice(b, b.dataset.value === F[g] ? 0 : trBase(b));
    else if (TR_BASE[g + b.dataset.value] != null) trSetPrice(b, TR_BASE[g + b.dataset.value]);
  });
}
function trimLocksLite(){
  const T = TRIMS[state.trim]; if (!T) return;
  const why = 'Not offered on the ' + T.label;
  const lock = (g, keep) => document.querySelectorAll('.grp[data-group="' + g + '"] [data-value]').forEach(b => {
    if (b.dataset.value !== keep){ b.disabled = true; b.title = why; }
  });
  if (T.drive !== 'both') lock('drive', T.drive);
  if (!T.gearOpt) lock('transmission', T.gear);
  Object.keys(T.force || {}).forEach(g => lock(g, T.force[g]));
}
{
  const qp = new URLSearchParams(location.search);
  qp.forEach((v, k) => {
    if (!(k in state)) return;
    if (Array.isArray(state[k])) state[k] = v.split(',').filter(x => btnOf(k, x));
    else if (btnOf(k, v)) state[k] = v;
  });
}

function btnOf(group, value){
  return document.querySelector('.grp[data-group="' + group + '"] [data-value="' + value + '"]');
}

function visibleSet(){
  const v = new Set(BASE);
  const add = (list) => qualify(list).forEach(n => v.add(n));

  add(GROUPS.trim[state.trim] || []);
  add(GROUPS.engine[ENGINE_OF[state.trim]] || []);
  add(GROUPS.drive[state.drive] || []);
  add(GROUPS.transmission[state.transmission] || []);
  add(GROUPS.trimFinish[state.trimFinish] || []);
  add(GROUPS.bumperF[state.bumperF] || []);
  add(GROUPS.grille[state.grille] || []);
  add(GROUPS.headlights[state.headlights] || []);
  add(GROUPS.taillights[state.taillights] || []);
  add(GROUPS.roof[state.roof] || []);
  add(GROUPS.exhaust[state.exhaust] || []);
  add(GROUPS.diffuser[state.diffuser] || []);
  add(GROUPS.seats[state.seats] || []);
  add(GROUPS.cabin[state.cabin] || []);
  state.exterior.forEach(k => add(GROUPS.exterior[k] || []));
  state.cabinOpts.forEach(k => add(GROUPS.cabinOpts[k] || []));

  if (state.bumperF !== 'standard'){
    v.delete(P + 'trim_bumper_F_a_painted');
    v.delete(P + 'trim_bumper_F_a_plastic');
  }
  if (v.has(P + 'logo_F_ttsport') || v.has(P + 'logo_F_exclusive')) v.delete(P + 'logo_F');
  if (state.cabin === 'exclusive') v.delete(P + 'dash_normal');
  if (cutaway){
    ['roof','roof_sunroof','sunroof','sunroof_int','sunvisor','intmirror',
     'doorglass_FL','doorglass_FL_int','doorglass_RL','doorglass_RL_int',
     'doorglass_FR','doorglass_FR_int','doorglass_RR','doorglass_RR_int'
    ].forEach(n => v.delete(P + n));
  }
  return v;
}

const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' EUR';

function apply(){
  trimEnforceLite();
  document.querySelectorAll('.grp [data-value]').forEach(b => { b.disabled = false; b.removeAttribute('title'); });
  trimLocksLite();
  // buttons
  groupEls.forEach(sec => {
    const g = sec.dataset.group;
    const many = sec.dataset.kind === 'many';
    sec.querySelectorAll('[data-value]').forEach(b => {
      const on = many ? state[g].indexOf(b.dataset.value) > -1 : state[g] === b.dataset.value;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const out = sec.querySelector('[data-out]');
    if (out){
      const labels = many
        ? state[g].map(v => (btnOf(g, v) || {}).dataset && btnOf(g, v).dataset.label)
        : [(btnOf(g, state[g]) || {}).dataset ? btnOf(g, state[g]).dataset.label : ''];
      out.textContent = many && !state[g].length ? 'None' : labels.join(', ');
    }
  });

  // part visibility
  if (parts.size){
    const v = visibleSet();
    parts.forEach((node, name) => { node.visible = v.has(name); });
  }

  // colours
  const paintBtn = btnOf('paint', state.paint);
  if (paintBtn){
    M.paint.color.set(paintBtn.dataset.color);
    const f = paintBtn.dataset.finish;
    M.paint.metalness = f === 'solid' ? 0.12 : (f === 'mica' ? 0.8 : 0.72);
    M.paint.roughness = f === 'solid' ? 0.34 : 0.26;
  }
  const intBtn = btnOf('interior', state.interior);
  if (intBtn){
    M.int.color.set(intBtn.dataset.color);
    M.int2.color.set(intBtn.dataset.secondary || intBtn.dataset.color);
  }
  const wfBtn = btnOf('wheelFinish', state.wheelFinish);
  if (wfBtn){
    M.rim.color.set(wfBtn.dataset.color);
    M.rim.roughness = state.wheelFinish === 'polished' ? 0.12 : (state.wheelFinish === 'black' ? 0.24 : 0.3);
  }
  const calBtn = btnOf('caliper', state.caliper);
  if (calBtn) M.caliper.color.set(calBtn.dataset.color);

  if (wheelRoot.children.length && wheelRoot.userData.style !== state.wheel){
    setWheels(state.wheel);
    wheelRoot.userData.style = state.wheel;
  }

  // header + price + summary
  const trimBtn = btnOf('trim', state.trim);
  document.getElementById('cfgname').textContent = trimBtn.dataset.label;
  document.getElementById('cfgspec').textContent =
    trimBtn.dataset.spec + ' · ' + (state.drive === 'awd' ? 'xMatic all-wheel drive' : 'rear-wheel drive');

  let total = 0;
  const lines = [];
  groupEls.forEach(sec => {
    const g = sec.dataset.group;
    const many = sec.dataset.kind === 'many';
    const vals = many ? state[g] : [state[g]];
    vals.forEach(val => {
      const b = btnOf(g, val);
      if (!b) return;
      const price = Number(b.dataset.price || 0);
      total += price;
      if (g === 'trim' || price > 0) lines.push([b.dataset.label, g === 'trim' ? fmt(price) : '+ ' + fmt(price)]);
    });
  });
  document.getElementById('total').textContent = fmt(total);
  document.getElementById('monthly').textContent =
    'or ' + fmt(Math.round(total * 0.8 * 1.078 / 48)) + ' per month over 48 months';
  document.getElementById('summary').innerHTML = lines
    .map(l => '<div class="sumline"><span>' + l[0] + '</span><span>' + l[1] + '</span></div>').join('');
}

document.getElementById('reset').addEventListener('click', () => {
  Object.keys(defaults).forEach(g => {
    state[g] = Array.isArray(defaults[g]) ? defaults[g].slice() : defaults[g];
  });
  apply();
});

/* ---------- views -------------------------------------------------------- */

const VIEWS = {
  'three-quarter': { pos:[2.95, 1.42, 3.65],  tgt:[0, 0.80, 0.15],  label:'Front ¾' },
  side:            { pos:[5.6, 1.05, 0.20],   tgt:[0, 0.80, 0],     label:'Side' },
  rear:            { pos:[-2.85, 1.52, -3.8], tgt:[0, 0.80, -0.35], label:'Rear ¾' },
  wheel:           { pos:[1.95, 0.62, 2.05],  tgt:[0.62, 0.40, 1.38], label:'Wheel' },
  interior:        { pos:[2.35, 1.95, 1.35],  tgt:[0.05, 0.95, 0.10], label:'Interior' }
};
let anim = null;
let cutaway = false;
function goView(k){
  const v = VIEWS[k];
  const wantCut = k === 'interior';
  if (wantCut !== cutaway){
    cutaway = wantCut;
    M.glass.opacity = cutaway ? 0.07 : 0.24;
    apply();
  }
  anim = { t:0, fp:camera.position.clone(), tp:new THREE.Vector3(...v.pos),
           ft:controls.target.clone(), tt:new THREE.Vector3(...v.tgt) };
  document.getElementById('viewname').textContent = v.label;
  const h = document.getElementById('hint2');
  if (h) h.textContent = k === 'interior'
    ? 'Roof and side glass lifted for this view'
    : 'Drag to orbit · scroll to zoom';
  document.querySelectorAll('[data-view]').forEach(b =>
    b.setAttribute('aria-pressed', b.dataset.view === k ? 'true' : 'false'));
}
document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => goView(b.dataset.view)));
const spinBtn = document.getElementById('spin');
spinBtn.addEventListener('click', () => {
  controls.autoRotate = !controls.autoRotate;
  spinBtn.setAttribute('aria-pressed', controls.autoRotate ? 'true' : 'false');
});

/* ---------- loop --------------------------------------------------------- */

window.__stage = { renderer, scene, camera, controls, parts, M,
  snap(k){
    if (k){ const v = VIEWS[k]; camera.position.set(...v.pos); controls.target.set(...v.tgt); anim = null; }
    controls.update();
    renderer.render(scene, camera);
  }
};

function resize(){
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / Math.max(h, 1);
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();

const ease = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
let last = performance.now();
renderer.setAnimationLoop(() => {
  const now = performance.now(), dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (anim){
    anim.t = Math.min(anim.t + dt / 0.75, 1);
    const e = ease(anim.t);
    camera.position.lerpVectors(anim.fp, anim.tp, e);
    controls.target.lerpVectors(anim.ft, anim.tt, e);
    if (anim.t >= 1) anim = null;
  }
  controls.update();
  renderer.render(scene, camera);
});
