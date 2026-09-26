import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ---------- part sets ---------------------------------------------------- */

const P = 'etkc_';
const q = (l) => l.map(n => /^etk_/.test(n) ? n : P + n);

const BASE = q(['body','door_L','door_R','mirror_L','mirror_R','mirrorsignal_L','mirrorsignal_R','mirrorsignalglass_L','mirrorsignalglass_R',
  'wipers','hood_hinges','headlightframe_L','headlightframe_R','headlight_L','headlight_R','taillightframe_L','taillightframe_R',
  'trunklightframe_L','trunklightframe_R','chmsl','bumper_F_grille','grille','radiator','radsupport','bumperbar_F','underbody_cladding',
  'heatshield','fueltank','driveshaft','diff','exhaust_L','exhaust_R','steeringbox','strutbrace_F','sunvisor_L','sunvisor_R',
  'sunvisor_mounts','intmirror','screen','gauges','gauges_screen','decals_gauges','needle_fuel','needle_speedo','needle_tacho','needle_temp',
  'steer','wiperstalk','signalstalk','gaspedal','brakepedal','armrest','subframe_R','spring_R','halfshaft_R','upperarm_R','lowerarm_R',
  'swaybar_R','tierod_R','hub_R','shock_R','etk_intercooler']);

const SUSP = ['strut_F','lowerarm_F_b','hub_F','lowerarm_F_a','swaybar_F','tierod_F','subframe_F'];
const GLASS = ['windshield','doorglass_L','doorglass_R','sideglass_L','sideglass_R','backlight'];

const GROUPS = {
  trim: {},
  engine: {
    '4': ['etk_icpipe_i_i4','etk_icpipe_t_i4','etk_radtube_i4','engbaycrap'],
    '6': ['etk_icpipe_i_i6','etk_icpipe_t_i6','etk_radtube_i6','engbaycrap'],
    '8': ['etk_icpipe_i_v8','etk_icpipe_t_v8','etk_radtube_v8','engbaycrap_v8','strutbrace_F_extra']
  },
  drive: { rwd: [], awd: ['lettering_x','diff_F','driveshaft_F','halfshaft_F','transfercase'] },
  transmission: {
    auto:   ['shifter_A','shifterbase_A','paddles'],
    manual: ['shifter_M_base','shifter_M_knob','shifter_M_boot','clutchpedal']
  },
  line: {
    standard: ['bumper_F','bumper_R','diffuser_R','fender_L','fender_R','sidemarker_frame','sidemarker_FL','sidemarker_FR','hood','tubs'],
    sport:    ['bumper_F_sport','bumper_R_sport','diffuser_R_alt','fender_L_sport','fender_R_sport','sidemarker_frame_sport',
               'sidemarker_FL_sport','sidemarker_FR_sport','sideskirt_sport','hood','tubs'],
    clubsport:['bumper_F_race','lip_F_sport_race','canards','bumper_R_sport','diffuser_R_alt','fender_L_sport','fender_R_sport',
               'sidemarker_frame_sport','sidemarker_FL_sport','sidemarker_FR_sport','sideskirt_custom','hood_race','tubs_wide',
               'fenderflare_FL','fenderflare_FR','fenderflare_RL','fenderflare_RR','fenderflare_body_FL','fenderflare_body_FR',
               'fenderflare_bumper_FL','fenderflare_bumper_FR','fenderflare_bumper_RL','fenderflare_bumper_RR','towstrap_bumper_R']
  },
  taillights: {
    standard: ['taillight_L','taillight_R','taillightglass_L','taillightglass_R','trunklight_L','trunklight_R','trunklightglass_L','trunklightglass_R'],
    usdm:     ['taillight_usdm_L','taillight_usdm_R','taillightglass_L','taillightglass_R','trunklight_usdm_L','trunklight_usdm_R','trunklightglass_L','trunklightglass_R'],
    ttsport:  ['taillight_ttsport_L','taillight_ttsport_R','taillightglass_ttsport_L','taillightglass_ttsport_R','trunklight_ttsport_L',
               'trunklight_ttsport_R','trunklightglass_ttsport_L','trunklightglass_ttsport_R']
  },
  exhaust: { single:['exhausttip_L','exhausttip_R'], dual:['exhausttip_dual_L','exhausttip_dual_R'], sport:['exhausttip_sport_L','exhausttip_sport_R'] },
  spoiler: { none:[], sport:['spoiler_sport'], sportcf:['spoiler_sport_cf'], race:['spoiler_race_a','spoiler_race_b'] },
  seats: { standard:['seat_FL','seat_FR'], sport:['seat_FL_sport','seat_FR_sport'] },
  cabin: {
    standard:  ['dash','doorpanel_L','doorpanel_R','intcarpet'],
    clubsport: ['dash_race','dash_race_lower','doorpanel_L_race','doorpanel_R_race','intcarpet_stripped','rollcage']
  },
  exterior: { foglights:['foglight_L','foglight_R','foglightglass_L','foglightglass_R','foglightframe_L','foglightframe_R'], sunstrip:['sunstrip'] },
  cabinOpts: { lightweight:[] }
};
const TRIMS = {"190":{"fam":"k","label":"190","cyl":"4","code":"4","badge":["lettering_190"],"ps":"201","nm":"286","vmax":"230 km/h","fuel":"Gasoline","drive":"rwd","gear":"auto","gearOpt":true,"price":52900,"int":["white","beige","brown","black"]},
  "250":{"fam":"k","label":"250","cyl":"4","code":"4","badge":["lettering_250"],"ps":"262","nm":"366","vmax":"230 km/h","fuel":"Gasoline","drive":"rwd","gear":"auto","gearOpt":true,"price":58400,"int":["white","beige","brown","black"]},
  "360":{"fam":"k","label":"360","cyl":"6","code":"6","badge":["lettering_360"],"ps":"367","nm":"464","vmax":"250 km/h","fuel":"Gasoline","drive":"both","gear":"tt","gearOpt":true,"price":71400},
  "230d":{"fam":"k","label":"230d","cyl":"4","code":"4","badge":["lettering_230","lettering_d"],"ps":"233","nm":"452","vmax":"230 km/h","fuel":"Diesel","drive":"rwd","gear":"auto","gearOpt":true,"price":55700,"int":["white","beige","brown","black"]},
  "310d":{"fam":"k","label":"310d","cyl":"6","code":"6","badge":["lettering_d"],"ps":"313","nm":"619","vmax":"250 km/h","fuel":"Diesel","drive":"both","gear":"tt","gearOpt":true,"price":64900},
  "ttsport":{"fam":"ktt","label":"ttSport","cyl":"8","code":"8","badge":["lettering_ttsport"],"ps":"466","nm":"567","vmax":"300 km/h","fuel":"Gasoline","drive":"both","gear":"tt","gearOpt":true,"price":94700},
  "ttsportplus":{"fam":"ktt","label":"ttSport+","cyl":"8","code":"8","badge":["lettering_ttsport","lettering_plus"],"ps":"604","nm":"708","vmax":"330 km/h","fuel":"Gasoline","drive":"both","gear":"tt","gearOpt":true,"price":114700},
  "trackday":{"fam":"ksp","label":"Trackday","cyl":"6","code":"6","badge":["lettering_ttsport"],"ps":"471","nm":"575","vmax":"310 km/h","fuel":"Gasoline","drive":"awd","gear":"auto","gearOpt":false,"price":121000,"line":"clubsport","cabin":"clubsport","fixed":true,"ext":["diamond"],"int":["black"]},
  "drift":{"fam":"ksp","label":"Drift","cyl":"8","code":"8","badge":["lettering_ttsport"],"ps":"734","nm":"820","vmax":"290 km/h","fuel":"Gasoline","drive":"rwd","gear":"manual","gearOpt":false,"price":139500,"line":"clubsport","ext":["trance","magnetic","bermude"]},
  "heritage":{"fam":"ksp","label":"Heritage","cyl":"8","code":"8","badge":["lettering_ttsport"],"ps":"556 / 604","nm":"682 / 708","vmax":"330 km/h","fuel":"Gasoline","drive":"both","gear":"auto","gearOpt":true,"price":128000,"line":"sport","ext":["obsidian","diamond","scarlet","crimson","sunset","technetium","mineral","trance","magnetic","bermude"]},
  "rennspecht":{"fam":"ksp","label":"Rennspecht","cyl":"8","code":"8","badge":["lettering_rennspecht","logo_F_rennspecht","logo_R_rennspecht","lip_F_rennspecht","lip_F_rennspecht_lettering","spoiler_rennspecht"],"ps":"510 / 632","nm":"459 / 787","vmax":"330 km/h","fuel":"Gasoline","drive":"awd","gear":"auto","gearOpt":false,"price":141000,"line":"sport","ext":["obsidian","diamond","scarlet","crimson","sunset","technetium","mineral","trance","magnetic","bermude"]}};
Object.keys(TRIMS).forEach(k => { GROUPS.trim[k] = [TRIMS[k].cyl].concat(TRIMS[k].badge); });
const WIDE = () => state.line === 'clubsport';
const NAME = (b) => 'Kc' + TRIMS[state.trim].code + (state.drive === 'awd' ? 'x' : '') + ' ' + b.dataset.label;

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
  carbon:  new THREE.MeshPhysicalMaterial({ color:0x1a1c1f, metalness:0.35, roughness:0.32, clearcoat:1, clearcoatRoughness:0.06 }),
  ambi:    new THREE.MeshStandardMaterial({ color:0x0b1b2a, emissive:0x2a7fd0, emissiveIntensity:0.8 }),
  int:     new THREE.MeshStandardMaterial({ color:0x23262a, metalness:0.06, roughness:0.74 }),
  int2:    new THREE.MeshStandardMaterial({ color:0x15171a, metalness:0.05, roughness:0.88 }),
  rim:     new THREE.MeshStandardMaterial({ color:0xc3c7cb, metalness:0.88, roughness:0.26 }),
  tyre:    new THREE.MeshStandardMaterial({ color:0x0f1113, metalness:0.05, roughness:0.85 }),
  disc:    new THREE.MeshStandardMaterial({ color:0x6c7278, metalness:0.9, roughness:0.42 }),
  caliper: new THREE.MeshStandardMaterial({ color:0x5a5f64, metalness:0.4, roughness:0.45 })
};


const PAINT = /^(body|door_[LR]|fender_[LR](_sport)?|hood|hood_race|trunk|trunk_sport|trunk_race|mirror_[LR]|bumper_F|bumper_F_sport|bumper_F_race|bumper_R|bumper_R_sport|spoiler_sport|spoiler_rennspecht|lip_F_rennspecht)$/;

function classOf(name){
  const n = name.replace('etkc_', '');
  if (PAINT.test(n)) return 'paint';
  if (/_cf$/.test(n)) return 'carbon';
  if (/(windshield|doorglass|sideglass|quarterglass|rearglass|tailgateglass|backlight|sunroof$|sunroof_int)/.test(n) && !/light(glass)?_/.test(n.replace('backlight',''))) return 'glass';
  if (/^(taillight|tailgatelight|trunklight|chmsl)/.test(n)) return /glass/.test(n) ? 'redGlass' : (/frame/.test(n) ? 'dark' : 'redLamp');
  if (/^(headlight|foglight|platelights)/.test(n)) return /glass/.test(n) ? 'clearGlass' : (/frame/.test(n) ? 'dark' : 'refl');
  if (/(sidemarker_F|fendersignal|mirrorsignal)/.test(n)) return 'amber';
  if (/(lettering|logo|exhausttip)/.test(n)) return 'chrome';
  if (/^(seat|seats_R|dash|doorpanel|intcarpet|headliner|steer|sunvisor|armrest|roofcover)/.test(n)) return 'interior';
  if (/(screen)/.test(n)) return 'screen';
  if (/^(fenderflare|sideskirt|diffuser|canards|lip_F_sport_race|spoiler_race|sidemarker_frame|towstrap|wipers|sunstrip|bumper_F_grille)/.test(n)) return 'plastic';
  if (/^rollcage/.test(n)) return 'metal';
  return 'chassis';
}

function assign(part){
  const cls = classOf(part.name);
  part.traverse(o => {
    if (!o.isMesh) return;
    const orig = (o.material && o.material.name) || '';
    o.castShadow = true;
    if (/glass_invisible/.test(orig)) { o.visible = false; return; }
    let m;
    if (cls === 'paint') m = /extra/.test(orig) ? M.paint : /grille/.test(orig) ? M.grille : /raceparts/.test(orig) ? M.carbon : /lettering/.test(orig) ? M.chrome : /intcarpet|lights|racing/.test(orig) ? M.dark : M.paint;
    else if (cls === 'glass'){ m = M.glass; o.castShadow = false; }
    else if (cls === 'redGlass') m = M.redLamp;
    else if (cls === 'clearGlass') m = M.clearLamp;
    else if (cls === 'redLamp') m = /lettering|lights/.test(orig) ? M.redRefl : M.dark;
    else if (cls === 'refl') m = /lettering|lights/.test(orig) ? M.refl : M.dark;
    else if (cls === 'amber') m = M.amber;
    else if (cls === 'chrome') m = M.chrome;
    else if (cls === 'carbon') m = M.carbon;
    else if (cls === 'dark') m = M.dark;
    else if (cls === 'screen') m = M.screen;
    else if (cls === 'plastic') m = /raceparts/.test(orig) ? M.carbon : M.plastic;
    else if (cls === 'interior') m = /screen/.test(orig) ? M.screen : /mirror_F/.test(orig) ? M.chrome : (/carpet|headliner|roofcover/.test(part.name) ? M.int2 : M.int);
    else if (cls === 'metal') m = M.metal;
    else m = /grille/.test(orig) ? M.grille : /extra/.test(orig) ? M.plastic : /raceparts/.test(orig) ? M.carbon : /screen/.test(orig) ? M.screen : M.chassis;
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
camera.position.set(2.9, 1.3, 3.6);

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
controls.target.set(0, 0.65, 0.05);
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
  { x: 0.775, z: 1.325, rear:false, side: 1 },
  { x:-0.775, z: 1.325, rear:false, side:-1 },
  { x: 0.775, z:-1.275, rear:true,  side: 1 },
  { x:-0.775, z:-1.275, rear:true,  side:-1 }
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
  const wf = WIDE() ? 0.03 : 0, wr = WIDE() ? 0.05 : 0;
  AXLE.forEach(corner => {
    const w = buildWheel(styleKey, corner);
    if (corner.side < 0) w.rotation.y = Math.PI;
    w.position.set(corner.x + corner.side * (corner.rear ? wr : wf), w.userData.radius, corner.z);
    wheelRoot.add(w);
  });
  wheelRoot.userData.key = styleKey + '|' + WIDE();
}

/* ---------- load --------------------------------------------------------- */

const parts = new Map();
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const bar = document.getElementById('bar');
const loaderEl = document.getElementById('loader');

Promise.all([
  loader.loadAsync('assets/3d/etk-kseries.glb', (e) => {
    if (e.total) bar.style.width = Math.round((e.loaded / e.total) * 70) + '%';
  }),
  loader.loadAsync('assets/3d/etk-wheels.glb'),
  loader.loadAsync('assets/3d/etk-tires.glb')
]).then(([car, rims, tyres]) => {
  [car].forEach(g => {
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

const VIEW_FOR = { paint:'three-quarter', line:'three-quarter', exterior:'three-quarter',
  wheel:'wheel', wheelFinish:'wheel', caliper:'wheel', trim:'rear', drive:'rear', taillights:'rear', exhaust:'rear', spoiler:'rear',
  seats:'interior', interior:'interior', cabin:'interior', cabinOpts:'interior', transmission:'interior' };

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


const FAMS = {"k":{"name":"K-Series","ext":["white","black","red","orange","green","blue"],"int":["white","beige","brown","black","tt"],"lines":["standard","sport"]},"ktt":{"name":"K ttSport","ext":["metgreen","trance","magnetic","bermude"],"int":["black","tt","brown"],"lines":["sport","clubsport"]},"ksp":{"name":"K Specials","ext":["diamond","scarlet","crimson","sunset","technetium","mineral","trance","magnetic","bermude"],"int":["white","beige","brown","black","tt"],"lines":["sport","clubsport"]}};
const FIXED = [["spoiler","race"],["exterior",[]],["cabinOpts",[]],["seats","sport"],["exhaust","sport"],["taillights","ttsport"]];
const groupVals = (g) => Array.from(document.querySelectorAll('.grp[data-group="' + g + '"] [data-value]')).map(b => b.dataset.value);
function trimRules(){
  const T = TRIMS[state.trim], F = FAMS[T.fam];
  return { T, F, ext: T.ext || F.ext, int: T.int || F.int, lines: T.line ? [T.line] : F.lines };
}
function setPrice(b, n){
  if (!b) return;
  if (b.dataset.base == null) b.dataset.base = b.dataset.price;
  b.dataset.price = String(n);
  const p = b.querySelector('.p, .pr');
  if (p) p.textContent = n ? '+ ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' EUR' : 'Included';
}
function trimEnforce(){
  const R = trimRules(), T = R.T;
  if (T.drive !== 'both') state.drive = T.drive;
  if (!T.gearOpt) state.transmission = T.gear === 'manual' ? 'manual' : 'auto';
  if (R.lines.indexOf(state.line) < 0) state.line = R.lines[0];
  if (T.body && T.body.indexOf(state.body) < 0) state.body = T.body[0];
  if (R.ext.indexOf(state.paint) < 0) state.paint = R.ext[0];
  if (R.int.indexOf(state.interior) < 0) state.interior = R.int[0];
  if (T.cabin) state.cabin = T.cabin;
  if (T.fixed) FIXED.forEach(([g, v]) => { if (g in state) state[g] = Array.isArray(v) ? v.slice() : v; });
  const auto = btnOf('transmission', 'auto');
  const autoName = T.gear === 'tt' ? '7-speed ttSport automatic' : '8-speed automatic';
  if (auto){ auto.dataset.label = autoName; auto.firstChild.nodeValue = autoName; setPrice(auto, T.gear === 'manual' ? 2400 : 0); }
  setPrice(btnOf('drive', 'awd'), T.drive === 'awd' ? 0 : 2800);
  groupVals('line').forEach(v => { const b = btnOf('line', v); if (b.dataset.base == null) b.dataset.base = b.dataset.price; setPrice(b, T.line === v ? 0 : +b.dataset.base); });
}
function trimLocks(lock){
  const R = trimRules(), T = R.T, why = 'Not offered on the ' + T.label;
  if (T.drive !== 'both') lock('drive', [T.drive === 'awd' ? 'rwd' : 'awd'], why);
  if (!T.gearOpt) lock('transmission', [T.gear === 'manual' ? 'auto' : 'manual'], why);
  lock('line', groupVals('line').filter(v => R.lines.indexOf(v) < 0), why);
  if (T.body) lock('body', groupVals('body').filter(v => T.body.indexOf(v) < 0), why);
  lock('paint', groupVals('paint').filter(v => R.ext.indexOf(v) < 0), why);
  lock('interior', groupVals('interior').filter(v => R.int.indexOf(v) < 0), why);
  if (T.cabin) lock('cabin', groupVals('cabin').filter(v => v !== T.cabin), why);
  if (T.fixed) FIXED.forEach(([g, v]) => lock(g, groupVals(g).filter(x => Array.isArray(v) ? v.indexOf(x) < 0 : x !== v), 'The ' + T.label + ' is delivered in one specification'));
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
  trimEnforce();
  if (state.trim === 'rennspecht') state.spoiler = 'none';
}

function paintLocks(){
  document.querySelectorAll('.grp [data-value]').forEach(b => { b.disabled = false; b.removeAttribute('title'); });
  const lock = (g, vals, why) => vals.forEach(v => { const b = btnOf(g, v); if (b){ b.disabled = true; b.title = why; } });
  trimLocks(lock);
  if (state.trim === 'rennspecht') lock('spoiler', ['sport','sportcf','race'], 'The Rennspecht carries its own wing');
  if (state.cabin !== 'clubsport') lock('cabinOpts', ['lightweight'], 'Clubsport cabin only');
}

function visibleSet(){
  const v = new Set(BASE);
  const add = (l) => q(l).forEach(n => v.add(n));
  const t = GROUPS.trim[state.trim];
  const wide = WIDE();
  if (state.cabin !== 'clubsport'){ const i = state.cabinOpts.indexOf('lightweight'); if (i > -1) state.cabinOpts.splice(i, 1); }
  const light = state.cabinOpts.indexOf('lightweight') > -1;
  add(t.slice(1));
  add(['lettering_kc' + TRIMS[state.trim].code]);
  add(GROUPS.engine[t[0]]);
  add(GROUPS.drive[state.drive]);
  add(GROUPS.transmission[state.transmission]);
  add(GROUPS.line[state.line]);
  add(GROUPS.taillights[state.taillights]);
  add(GROUPS.exhaust[state.exhaust]);
  add(GROUPS.spoiler[state.spoiler]);
  add(GROUPS.seats[state.seats]);
  add(GROUPS.cabin[state.cabin]);
  state.exterior.forEach(k => add(GROUPS.exterior[k] || []));
  add(SUSP.map(n => wide ? n + '_wide' : n));
  if (state.drive === 'awd'){ v.delete(P + 'halfshaft_F'); add([wide ? 'halfshaft_F_wide' : 'halfshaft_F']); }
  add(GLASS.map(n => light ? n + '_lightweight' : n));
  add(GLASS.map(n => light ? n + '_lightweight_int' : n + '_int').filter(n => !/windshield_int|backlight_int|sideglass_[LR]_int|doorglass_[LR]_int/.test(n) || true));
  add([state.spoiler === 'race' || state.line === 'clubsport' ? 'trunk_race' : state.line === 'sport' ? 'trunk_sport' : 'trunk']);
  if (v.has(P + 'logo_F_rennspecht')) v.delete(P + 'logo_F'); else add(['logo_F']);
  if (v.has(P + 'logo_R_rennspecht')) v.delete(P + 'logo_R'); else add(['logo_R']);
  if (v.has(P + 'lip_F_rennspecht')) v.delete(P + 'lip_F_sport_race');
  if (cutaway){
    GLASS.forEach(n => { if (!/windshield|backlight/.test(n)) ['', '_int', '_lightweight', '_lightweight_int'].forEach(s => v.delete(P + n + s)); });
    ['sunvisor_L','sunvisor_R','sunvisor_mounts','intmirror','sunstrip'].forEach(n => v.delete(P + n));
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

  if (wheelRoot.children.length && wheelRoot.userData.key !== state.wheel + '|' + WIDE()){
    setWheels(state.wheel);
  }

  // header + price + summary
  const trimBtn = btnOf('trim', state.trim);
  document.getElementById('cfgname').textContent = NAME(trimBtn);
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
  'three-quarter': { pos:[2.9, 1.3, 3.6],    tgt:[0, 0.65, 0.05],  label:'Front ¾' },
  side:            { pos:[5.6, 0.95, -0.1],  tgt:[0, 0.65, -0.1],  label:'Side' },
  rear:            { pos:[-2.7, 1.35, -3.8], tgt:[0, 0.65, -0.35], label:'Rear ¾' },
  wheel:           { pos:[1.9, 0.6, 1.95],   tgt:[0.62, 0.36, 1.28], label:'Wheel' },
  interior:        { pos:[2.2, 1.75, 1.0],   tgt:[0.05, 0.8, -0.15], label:'Interior' }
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
