import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ---------- part sets ---------------------------------------------------- */

const X = 'traffic_etkluxe_';   // exterior file
const I = 'etkluxe_';           // interior file

const BASE_X = ['doors_FL','doors_FR','fenders_L','fenders_R','innerfenders','hood','cowl','fascia_F','windshield',
  'doorglass_FL','doorglass_FR','mirror_L','mirror_R','mirror_L_moving','mirror_R_moving','mirrorglass_L','mirrorglass_R',
  'mirrorsignal_L','mirrorsignal_R','wipers_LHD','headlightframe_L','headlightframe_R','headlightglass_L','headlightglass_R',
  'taillight_L','taillight_R','taillight_glass_L','taillight_glass_R','taillight_frame_L','taillight_frame_R',
  'badge_F_ETK','badge_R_ETK','platelight_R','radiator','radsupport_main','crashbar','enginebaycrap','undercarriage',
  'heatshield','fueltank','exhaustpipe','driveshaft_R','subframe_F','subframe_R','lowerarm_F_a','lowerarm_F_b','upperarm_F',
  'strut_F','tierod_F','swaybar_F','swaybar_links_F','hub_FL','hub_FR','hub_R','lowerarm_R_a','lowerarm_R_b','upperarm_R_a',
  'upperarm_R_b','toelink_R','spring_R','shock_R','swaybar_R','swaybar_links_R','halfshafts_R','differential_R'
].map(n => X + n).concat(['etk_intercooler']);

const BASE_I = ['indicatorstalk','wiperstalk','sunroof_switch','steeringcolumn','windowswitches_FL','windowswitches_FR',
  'windowswitch_RL','windowswitch_RR','floormats_F','floormat_R','doorsill','sunvisor','gaspedal','brakepedal',
  'centerconsole_R','clockface','clock_min','clock_hour','GPS','gauges','fob','intmirror_LHD','climatescreens',
  'seats_R','seatbelt_R_mid','seatbelt_F','domelights_F_glass'
].map(n => I + n);

const x = (l) => l.map(n => X + n);
const i = (l) => l.map(n => I + n);

const GROUPS = {
  trim: {
    '340': x(["badge_R_900","badge_R_6","badge_340"]),
    '450': x(["badge_R_900","badge_R_8","badge_450"]),
    '520': x(["badge_R_900","badge_R_8","badge_520"]),
    '250activehybrid': x(["badge_R_900","badge_R_4","badge_hybrid"]),
    '250mhev': x(["badge_R_900","badge_R_4","badge_hybrid"]),
    '230dmhev': x(["badge_R_900","badge_R_4","badge_diesel"]),
    '300dmhev': x(["badge_R_900","badge_R_6","badge_300d","badge_diesel"]),
    '450e': x(["badge_R_950","badge_e"]),
    'heritage': x(["badge_R_900","badge_R_8","badge_R_ttsport"]),
    'rennspecht9rv8': x(["badge_R_900","badge_R_8","badge_R_ttsportplus"]),
    'rennspecht9rv12': x(["badge_R_900","badge_R_8","badge_R_ttsportplus"]),
    'rennspecht9rv12mhev': x(["badge_R_900","badge_R_8","badge_R_ttsportplus","badge_hybrid"]),
    'tuningstudio': x(["badge_R_900","badge_R_tdsport"])
  },
  drive: {
    rwd: [],
    awd: x(['badge_R_x'])
  },
  transmission: {
    auto:   i(['shifter_A_base','shifter_A','shifter_A_boot','steeringwheel']),
    sport:  i(['shifter_A_base','shifter_A_sport','shifter_A_boot','steeringwheel_paddles']),
    manual: i(['shifter_M_boot','knob_M','clutchpedal','steeringwheel'])
  },
  body: {
    sedan:  x(['body','doors_RL','doors_RR','doorglass_RL','doorglass_RR','roof','trunk','trunkshell','backlight','chmsl','chmslframe',
               'taillight_trunk_glass','trunklight','trunklight_backing'])
            .concat(i(['introof_sedan','intcarpet_sedan','domelight_R_sedan','domelights_R_glass','seatbelt_R_sedan'])),
    estate: x(['body_estate','doors_RL_estate','doors_RR_estate','doorglass_RL_wagon','doorglass_RR_wagon','roof_estate',
               'trunk_estate','trunk_estate_upper','backlight_R_estate','chmsl_wagon','chmslframe_wagon','rearwiper',
               'quarterglass_L','quarterglass_R'])
            .concat(i(['introof_wagon','domelight_R_wagon','domelights_R_glass_wagon','intcarpet_main']))
  },
  line: {
    standard: x(['bumper_F','bumper_F_grillemesh_base','grillebars_base','bumper_grille','lip_F',
                 'foglightframe_a_F','etkluxe_foglight_L_a_simple','etkluxe_foglight_R_a_simple','foglightglass_L_a_F','foglightglass_R_a_F',
                 'skirts_L','skirts_R','bumper_R','diffuser_R_shared','diffuser_fins','spoiler_base']),
    ttsport:  x(['bumper_F_ttsport','bumper_F_ttsport_trim','lip_F_ttsport','bumper_F_grillemesh_base','bumper_grille',
                 'foglightframe_b_F','etkluxe_foglight_L_b_simple','etkluxe_foglight_R_b_simple','foglightglass_L_b_F','foglightglass_R_b_F',
                 'sideskirt_L_ttsport','sideskirt_R_ttsport','bumper_r_ttsport','diffuser_R_ttsport','exhausttips_ttsport_L',
                 'exhausttips_ttsport_R','exhausttrim_ttsport','platelight_R_ttsport'])
  },
  spoiler: {
    none: [],
    wing: x(['spoiler_R_ttsport'])
  },
  grille: {
    slats: x(['grille_F_ICE','grilletrim']),
    mesh:  x(['grille_F_mesh','grilletrim'])
  },
  lamps: {
    eu: x(['headlight_L','headlight_R','tail_indicator_R_L_EU','tail_indicator_R_R_EU']),
    us: x(['headlight_L_US','headlight_R_US','tail_indicator_R_L_US','tail_indicator_R_R_US','trunk_indicator_R_US'])
  },
  seats: {
    standard: i(['seats_FL','seats_FR','dashboard','doorpanel_FL','doorpanel_FR','doorpanel_RL','doorpanel_RR','introof_F']),
    race:     i(['seats_FL','seats_FR','dashboard_race','doorpanel_FL_race','doorpanel_FR_race','doorpanel_RL','doorpanel_RR',
                 'introof_F_race','rollcage','grp_windownet_L','grp_windownet_R','grp_mirror_holder'])
  },
  cabinOpts: {
    rearscreens: i(['TV_FL','TV_FR','TV_FL_screen','TV_FR_screen'])
  }
};

const EV = (t) => !!(TRIMS[t] && TRIMS[t].ev);
const TRIMS = {"340":{"label":"946 340","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"450":{"label":"948 450","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"520":{"label":"900 520","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"250activehybrid":{"label":"944 250 ActiveHybrid","drive":"both","gear":"auto","gearOpt":false,"gearLabel":"8-speed ActiveHybrid automatic","force":null,"ev":false,"special":false},"250mhev":{"label":"944 250 MHEV","drive":"both","gear":"auto","gearOpt":false,"gearLabel":"8-speed mild-hybrid automatic","force":null,"ev":false,"special":false},"230dmhev":{"label":"944 230d MHEV","drive":"both","gear":"auto","gearOpt":false,"gearLabel":"8-speed mild-hybrid automatic","force":null,"ev":false,"special":false},"300dmhev":{"label":"946 300d MHEV","drive":"both","gear":"auto","gearOpt":false,"gearLabel":"8-speed mild-hybrid automatic","force":null,"ev":false,"special":false},"450e":{"label":"940 450e","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":"Single-speed reduction gear","force":{"grille":"mesh"},"ev":true,"special":false},"heritage":{"label":"Heritage","drive":"rwd","gear":"auto","gearOpt":false,"gearLabel":"8-speed mild-hybrid automatic","force":{"line":"ttsport"},"ev":false,"special":false},"rennspecht9rv8":{"label":"Rennspecht 9R V8","drive":"rwd","gear":"manual","gearOpt":false,"gearLabel":null,"force":{"line":"ttsport","spoiler":"wing"},"ev":false,"special":false},"rennspecht9rv12":{"label":"Rennspecht 9R V12","drive":"awd","gear":"sport","gearOpt":false,"gearLabel":"7-speed ttSport dual-clutch automatic","force":{"line":"ttsport","spoiler":"wing"},"ev":false,"special":false},"rennspecht9rv12mhev":{"label":"Rennspecht 9R V12 MHEV","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":"8-speed mild-hybrid automatic","force":{"line":"ttsport","spoiler":"wing"},"ev":false,"special":false},"tuningstudio":{"label":"Tuningstudio","drive":"rwd","gear":"manual","gearOpt":false,"gearLabel":null,"force":{"line":"ttsport"},"ev":false,"special":false}};
const ENGINE_OF = {"340":"i6","450":"v8","520":"v12","250activehybrid":"i4","250mhev":"i4","230dmhev":"i4","300dmhev":"i6","450e":"ev","heritage":"v8","rennspecht9rv8":"v8","rennspecht9rv12":"v12","rennspecht9rv12mhev":"v12","tuningstudio":"v12"};

/* ---------- materials ---------------------------------------------------- */

const M = {
  paint:   new THREE.MeshPhysicalMaterial({ color:0x3c4045, metalness:0.72, roughness:0.26, clearcoat:1, clearcoatRoughness:0.04 }),
  glass:   new THREE.MeshPhysicalMaterial({ color:0x14181b, metalness:0, roughness:0.05, transparent:true, opacity:0.24, side:THREE.DoubleSide }),
  clearLamp: new THREE.MeshPhysicalMaterial({ color:0xdfe6ea, metalness:0, roughness:0.08, transparent:true, opacity:0.42 }),
  redLamp: new THREE.MeshPhysicalMaterial({ color:0x8e0b18, metalness:0, roughness:0.16, transparent:true, opacity:0.78 }),
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
  ambi:    new THREE.MeshStandardMaterial({ color:0x0b1b2a, emissive:0x2a7fd0, emissiveIntensity:0.8 }),
  int:     new THREE.MeshStandardMaterial({ color:0x23262a, metalness:0.06, roughness:0.74 }),
  int2:    new THREE.MeshStandardMaterial({ color:0x15171a, metalness:0.05, roughness:0.88 }),
  rim:     new THREE.MeshStandardMaterial({ color:0xc3c7cb, metalness:0.88, roughness:0.26 }),
  tyre:    new THREE.MeshStandardMaterial({ color:0x0f1113, metalness:0.05, roughness:0.85 }),
  disc:    new THREE.MeshStandardMaterial({ color:0x6c7278, metalness:0.9, roughness:0.42 }),
  caliper: new THREE.MeshStandardMaterial({ color:0x5a5f64, metalness:0.4, roughness:0.45 })
};

const RX = {
  paint: /^traffic_etkluxe_(body|body_estate|doors_(FL|FR|RL|RR)(_estate)?|fenders_[LR]|hood|roof|roof_estate|trunk|trunk_estate|trunk_estate_upper|trunkshell|bumper_F|bumper_F_ttsport|bumper_R|bumper_r_ttsport|mirror_[LR](_moving)?|fascia_F|spoiler_R_ttsport|sideskirt_[LR]_ttsport)$/,
  glass: /(windshield$|doorglass|quarterglass|backlight$|backlight_R_estate)/,
  lampRed: /(taillight|trunklight|chmsl$|chmsl_wagon|tail_indicator_R_[LR]_US|trunk_indicator)/,
  lampClear: /(headlight|foglight|platelight)/,
  amber: /(mirrorsignal|tail_indicator_R_[LR]_EU)/,
  chrome: /(badge|grilletrim|exhausttips|exhausttrim|mirrorglass)/,
  grille: /(grille|grillebars|grillemesh)/
};

function classOf(name){
  if (name.startsWith(I)) return 'interior';
  if (RX.paint.test(name)) return 'paint';
  if (RX.amber.test(name)) return 'amber';
  if (RX.glass.test(name)) return 'glass';
  if (RX.lampRed.test(name)) return 'lampRed';
  if (RX.lampClear.test(name)) return 'lampClear';
  if (RX.chrome.test(name)) return 'chrome';
  if (RX.grille.test(name)) return 'grille';
  if (/skirts_|lip_F|diffuser|spoiler_base|cowl|wipers|bumper_F_ttsport_trim|chmslframe|mirror/.test(name)) return 'plastic';
  return 'chassis';
}

function assign(part){
  const name = part.name;
  const cls = classOf(name);
  part.traverse(o => {
    if (!o.isMesh) return;
    const orig = (o.material && o.material.name) || '';
    o.castShadow = true;
    let m;
    if (cls === 'interior'){
      if (/climatescreens|gear_/.test(orig)) m = M.screen;
      else if (/mirror_F/.test(orig)) m = M.chrome;
      else if (/ambi/.test(orig)) m = M.ambi;
      else if (/seats/.test(orig) || /doorpanel|seats_R/.test(name)) m = M.int;
      else if (/rollcage|windownet|mirror_holder/.test(name)) m = M.metal;
      else if (/glass/.test(name)) m = M.clearLamp;
      else m = M.int2;
    }
    else if (cls === 'paint') m = M.paint;
    else if (cls === 'glass'){ m = M.glass; o.castShadow = false; }
    else if (cls === 'lampRed') m = /glass/.test(name) ? M.redLamp : (/frame|backing/.test(name) ? M.dark : M.redRefl);
    else if (cls === 'lampClear') m = /glass/.test(name) ? M.clearLamp : (/frame/.test(name) ? M.dark : M.refl);
    else if (cls === 'amber') m = M.amber;
    else if (cls === 'chrome') m = M.chrome;
    else if (cls === 'grille') m = M.grille;
    else if (cls === 'plastic') m = M.plastic;
    else m = M.chassis;
    o.material = m;
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
camera.position.set(3.3, 1.4, 4.2);

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
controls.target.set(0, 0.72, 0.15);
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
  { x: 0.760, z: 1.558, rear:false, side: 1 },
  { x:-0.760, z: 1.558, rear:false, side:-1 },
  { x: 0.770, z:-1.311, rear:true,  side: 1 },
  { x:-0.770, z:-1.311, rear:true,  side:-1 }
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
  loader.loadAsync('assets/3d/etk900.glb', (e) => {
    if (e.total) bar.style.width = Math.round((e.loaded / e.total) * 60) + '%';
  }),
  loader.loadAsync('assets/3d/etk900-interior.glb'),
  loader.loadAsync('assets/3d/etk-wheels.glb'),
  loader.loadAsync('assets/3d/etk-tires.glb')
]).then(([car, cabin, rims, tyres]) => {
  [car, cabin].forEach(g => {
    const root = g.scene;
    root.updateMatrixWorld(true);
    let holder = root, best = root.children.length;
    root.traverse(o => { if (o.children.length > best){ best = o.children.length; holder = o; } });
    holder.children.slice().forEach(p => { parts.set(p.name, p); assign(p); });
    scene.add(root);
  });

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
  paint:'three-quarter', line:'three-quarter', grille:'three-quarter', lamps:'three-quarter', body:'side',
  wheel:'wheel', wheelFinish:'wheel', caliper:'wheel',
  trim:'rear', drive:'rear', spoiler:'rear',
  seats:'interior', interior:'interior', cabinOpts:'interior', transmission:'interior'
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

function enforce(){
  trimEnforceLite();
  if (EV(state.trim) && state.transmission === 'manual') state.transmission = 'auto';
  if (EV(state.trim) && state.grille === 'slats') state.grille = 'mesh';
}

function paintLocks(){
  document.querySelectorAll('.grp [data-value]').forEach(b => { b.disabled = false; b.removeAttribute('title'); });
  trimLocksLite();
  if (EV(state.trim)){
    [['transmission','manual'],['grille','slats']].forEach(([g, v]) => {
      const b = btnOf(g, v);
      if (b){ b.disabled = true; b.title = 'Not available on the 950e'; }
    });
  }
}

function visibleSet(){
  const v = new Set(BASE_X.concat(BASE_I));
  const add = (list) => list.forEach(n => v.add(n));
  const ev = EV(state.trim);
  const estate = state.body === 'estate';

  add(GROUPS.trim[state.trim] || []);
  add(GROUPS.drive[state.drive] || []);
  add(GROUPS.transmission[state.transmission] || []);
  add(GROUPS.body[state.body] || []);
  add(GROUPS.line[state.line] || []);
  add(GROUPS.spoiler[state.spoiler] || []);
  add(GROUPS.grille[state.grille] || []);
  add(GROUPS.lamps[state.lamps] || []);
  add(GROUPS.seats[state.seats] || []);
  state.cabinOpts.forEach(k => add(GROUPS.cabinOpts[k] || []));

  if (ENGINE_OF[state.trim] === 'i4') add(['etk_icpipe_i_i4','etk_icpipe_t_i4']);
  add([I + (ev ? 'ignitionbutton_EV' : 'ignitionbutton_ICE')]);
  if (ev){
    ['shifter_A','shifter_A_sport'].forEach(n => {
      if (v.has(I + n)){ v.delete(I + n); v.add(I + n.replace('shifter_A', 'shifter_A') + '_EV'); }
    });
    ['exhausttips_ttsport_L','exhausttips_ttsport_R','exhausttrim_ttsport','exhaustpipe','heatshield','enginebaycrap'].forEach(n => v.delete(X + n));
  }
  if (estate){
    add([I + (state.seats === 'race' ? 'introof_F_race_wagon' : 'introof_F_wagon')]);
    v.delete(I + 'introof_F'); v.delete(I + 'introof_F_race');
    if (state.seats === 'race'){ v.delete(I + 'introof_wagon'); v.add(I + 'introof_wagon_race'); v.delete(I + 'intcarpet_main'); v.add(I + 'intcarpet_wagon_race'); }
  } else if (state.seats === 'race'){
    v.delete(I + 'introof_sedan'); v.add(I + 'introof_sedan_race');
    v.delete(I + 'intcarpet_sedan'); v.add(I + 'intcarpet_sedan_race');
  }
  if (state.seats === 'race') v.delete(I + 'seats_R');
  if (state.line === 'ttsport' && !/rennspecht|heritage|tuningstudio/.test(state.trim)) v.add(X + 'badge_R_tdsport');
  if (state.drive === 'awd' && !EV(state.trim)) v.add(X + 'badge_R_x');

  // the traffic-model badges are untextured quads; keep them off the car
  Array.from(v).forEach(n => { if (/^traffic_etkluxe_badge_/.test(n)) v.delete(n); });

  if (cutaway){
    ['roof','roof_estate','doorglass_FL','doorglass_FR','doorglass_RL','doorglass_RR','doorglass_RL_wagon','doorglass_RR_wagon']
      .forEach(n => v.delete(X + n));
    ['introof_F','introof_F_race','introof_F_wagon','introof_F_race_wagon','introof_sedan','introof_wagon','introof_sedan_race',
     'introof_wagon_race','sunvisor','intmirror_LHD','sunroof_switch','domelights_F_glass','domelight_R_sedan','domelight_R_wagon',
     'domelights_R_glass','domelights_R_glass_wagon','grp_mirror_holder'].forEach(n => v.delete(I + n));
  }
  return v;
}

const fmt = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' EUR';

function apply(){
  enforce();
  paintLocks();
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
    trimBtn.dataset.spec + ' · ' + (state.drive === 'awd' ? 'xMatic all-wheel drive' : 'rear-wheel drive') +
    (state.body === 'estate' ? ' · Touring' : '');

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
  'three-quarter': { pos:[3.3, 1.4, 4.2],    tgt:[0, 0.72, 0.15],  label:'Front ¾' },
  side:            { pos:[6.3, 1.0, 0.0],    tgt:[0, 0.72, 0.0],   label:'Side' },
  rear:            { pos:[-3.1, 1.45, -4.3], tgt:[0, 0.72, -0.4],  label:'Rear ¾' },
  wheel:           { pos:[1.95, 0.6, 2.2],   tgt:[0.62, 0.36, 1.52], label:'Wheel' },
  interior:        { pos:[2.4, 1.9, 1.3],    tgt:[0.05, 0.8, -0.1], label:'Interior' }
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
