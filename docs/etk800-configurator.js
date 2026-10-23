import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ---------- part sets ---------------------------------------------------- */

const P = 'etk800_';
const q = (l) => l.map(n => /^etk_/.test(n) ? n : P + n);

const BASE = q(['door_FL','door_FR','mirror_L','mirror_R','wipers','windshield','windshield_int','doorglass_FL','doorglass_FL_int',
  'doorglass_FR','doorglass_FR_int','headlightframe_L','headlightframe_R','taillightframe_L','taillightframe_R','taillightglass_L',
  'taillightglass_R','fendersignal_L','fendersignal_R','fendersignalglass_L','fendersignalglass_R','radiator','radsupport','bumperbar_F',
  'duct_F','enginebay_cladding_L','enginebay_cladding_R','underbody_cladding','heatshield','fueltank','driveshaft','diff','exhaust_L',
  'exhaust_R','hood_hinges','sunvisor_L','sunvisor_R','sunvisor_mounts','intmirror','dash','screen','gauges','gauges_screen',
  'decals_gauges','needle_temp','needle_tacho','needle_speedo','needle_fuel','steer','wiperstalk','signalstalk','gaspedal','brakepedal',
  'doorpanel_FL','doorpanel_FR','doorpanel_RL','doorpanel_RR','steeringbox','etk_intercooler','grille']);

const SUSP = ['hub_FL','hub_FR','tierod_F','swaybar_F','subframe_F','strut_F','lowerarm_F_a','lowerarm_F_b','swaybar_R','upperarm_R',
  'tierod_R','subframe_R','spring_R','shock_R','lowerarm_R','hub_R','halfshaft_R'];

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
    manual: ['shifter_base_M','shifter_knob_M','shifter_boot_M','clutchpedal']
  },
  line: {
    standard: ['bumper_F_a','bumper_R_a','diffuser_R_a','sidemarker_frame','sidemarker_FL','sidemarker_FR','platelights_a','fender_L','fender_R','tubs'],
    dynamic:  ['bumper_F_b','bumper_R_b','diffuser_R_b','sidemarker_frame','sidemarker_FL','sidemarker_FR','platelights_b','fender_L','fender_R','tubs'],
    xc:       ['bumper_F_c','bumper_R_a','diffuser_R_c','sidemarker_frame_xc','sidemarker_FL_xc','sidemarker_FR_xc','platelights_a','fender_L','fender_R','tubs',
               'cladding','cladding_fender_FL','cladding_fender_FR','cladding_door_FL','cladding_door_FR','cladding_door_RL','cladding_door_RR',
               'cladding_bumper_F','cladding_bumper_R','lettering_xc'],
    ttsport:  ['bumper_F_sport','bumper_F_sport_brakeduct_L','bumper_F_sport_brakeduct_R','licenseplate_bracket_eu_sport','bumper_R_sport',
               'diffuser_R_b','sidemarker_frame_sport','sidemarker_FL_sport','sidemarker_FR_sport','platelights_sport','fender_L_sport','fender_R_sport',
               'sideskirt_sport','tubs_wide']
  },
  hood: { standard:['hood'], vented:['hood_sport'] },
  headlights: {
    halogen: ['headlight_halogen_L','headlight_halogen_R','headlightglass_halogen_L','headlightglass_halogen_R'],
    xenon:   ['headlight_L','headlight_R','headlightglass_L','headlightglass_R']
  },
  taillights: { euro:['taillight_euro_L','taillight_euro_R'], usdm:['taillight_usdm_L','taillight_usdm_R'] },
  exhaust: { a:['exhausttip_L_a','exhausttip_R_a'], b:['exhausttip_L_b','exhausttip_R_b','exhaust_L_b'], oval:['exhausttip_L_oval','exhausttip_R_oval'] },
  spoiler: { none:[], lip:['sedan_spoiler_lip'], lipcf:['sedan_spoiler_lip_cf'] },
  seats: { standard:['seat_FL','seat_FR','seats_R'], sport:['seat_FL_sport','seat_FR_sport','seats_R'] },
  exterior: { foglights:['foglight_L_a','foglight_R_a','foglightglass_L_a','foglightglass_R_a'] },
  cabinOpts: { rollcage:['rollcage'] }
};
const TRIMS = {"150":{"fam":"844","label":"150","cyl":"4","code":"4","badge":["lettering_150"],"ps":"155","nm":"242","vmax":"210 km/h","fuel":"Gasoline","drive":"rwd","gear":"manual","gearOpt":false,"price":38900},
  "190":{"fam":"844","label":"190","cyl":"4","code":"4","badge":["lettering_190"],"ps":"196","nm":"283","vmax":"230 km/h","fuel":"Gasoline","drive":"rwd","gear":"manual","gearOpt":true,"price":42400},
  "250":{"fam":"844","label":"250","cyl":"4","code":"4","badge":["lettering_250"],"ps":"255","nm":"362","vmax":"250 km/h","fuel":"Gasoline","drive":"both","gear":"manual","gearOpt":true,"price":47900},
  "340":{"fam":"846","label":"340","cyl":"6","code":"6","badge":["lettering_340"],"ps":"305 / 367","nm":"407 / 464","vmax":"250 / 290 km/h","fuel":"Gasoline","drive":"both","gear":"auto","gearOpt":true,"price":62400},
  "150d":{"fam":"844","label":"150d","cyl":"4","code":"4","badge":["lettering_150","lettering_d"],"ps":"153","nm":"322","vmax":"210 km/h","fuel":"Diesel","drive":"rwd","gear":"manual","gearOpt":false,"price":41200},
  "190d":{"fam":"844","label":"190d","cyl":"4","code":"4","badge":["lettering_190","lettering_d"],"ps":"193","nm":"405","vmax":"230 km/h","fuel":"Diesel","drive":"both","gear":"manual","gearOpt":true,"price":44800},
  "310d":{"fam":"846","label":"310d","cyl":"6","code":"6","badge":["lettering_d"],"ps":"265 / 313","nm":"569 / 619","vmax":"250 km/h","fuel":"Diesel","drive":"both","gear":"auto","gearOpt":true,"price":59800},
  "xc300":{"fam":"xc","label":"XC 300","cyl":"6","code":"6","badge":["lettering_300"],"ps":"316","nm":"412","vmax":"250 km/h","fuel":"Gasoline","drive":"awd","gear":"auto","gearOpt":true,"price":61800,"line":"xc","body":["touring"]},
  "xc260d":{"fam":"xc","label":"XC 260d","cyl":"6","code":"6","badge":["lettering_260","lettering_d"],"ps":"269","nm":"569","vmax":"250 km/h","fuel":"Diesel","drive":"awd","gear":"auto","gearOpt":true,"price":59400,"line":"xc","body":["touring"]},
  "ttsport":{"fam":"800tt","label":"ttSport","cyl":"6","code":"6","badge":["lettering_tt_sport","logo_F_ttsport"],"ps":"466","nm":"567","vmax":"250 km/h · 300 optional","fuel":"Gasoline","drive":"both","gear":"tt","gearOpt":true,"price":89500,"line":"ttsport"},
  "ttsportplus":{"fam":"800tt","label":"ttSport+","cyl":"8","code":"6","badge":["lettering_tt_sport","lettering_plus","logo_F_ttsport"],"ps":"475 / 556 / 604","nm":"452 / 682 / 708","vmax":"250 km/h · 330 optional","fuel":"Gasoline","drive":"both","gear":"tt","gearOpt":true,"price":108900,"line":"ttsport"},
  "heritage":{"fam":"800sp","label":"Heritage","cyl":"8","code":"6","badge":["lettering_tt_sport","logo_F_ttsport"],"ps":"556 / 604","nm":"682 / 708","vmax":"330 km/h","fuel":"Gasoline","drive":"both","gear":"auto","gearOpt":true,"price":124000,"line":"ttsport"},
  "rennspecht":{"fam":"800sp","label":"Rennspecht","cyl":"8","code":"6","badge":["lettering_rennspecht","logo_F_rennspecht","lip_F_rennspecht","lip_F_rennspecht_lettering","spoiler_rennspecht"],"ps":"510 / 632","nm":"459 / 787","vmax":"330 km/h","fuel":"Gasoline","drive":"awd","gear":"auto","gearOpt":false,"price":136500,"line":"ttsport"},
  "knallhart":{"fam":"800sp","label":"Knallhart","cyl":"6","code":"6","badge":["lettering_tt_sport","logo_F_ttsport"],"ps":"710","nm":"790","vmax":"375 km/h","fuel":"Gasoline","drive":"rwd","gear":"tt","gearOpt":false,"price":158000,"line":"ttsport","fixed":true,"ext":["diamond"],"int":["black"]}};
Object.keys(TRIMS).forEach(k => { GROUPS.trim[k] = [TRIMS[k].cyl].concat(TRIMS[k].badge); });
const WIDE = () => state.line === 'ttsport';
const NAME = (b) => '8' + (state.body === 'touring' ? '5' : '4') + TRIMS[state.trim].code + (state.drive === 'awd' ? 'x' : '') + ' ' + b.dataset.label;

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


const PAINT = /^(body|body_sedan|body_sedan_quarterpanels(_wide)?|quarterpanels(_wide)?|door_(FL|FR|RL|RR)(_sedan)?(_wide)?|fender_[LR](_sport)?|hood(_sport)?|roof|roof_sunroof|roof_sedan|roof_sedan_sunroof|sedan_roof_cf|tailgate|trunk_sedan|mirror_[LR]|bumper_F_[abc]|bumper_F_sport|bumper_R_(a|b|sport)|sedan_spoiler_lip|spoiler_rennspecht|lip_F_rennspecht)$/;

function classOf(name){
  const n = name.replace('etk800_', '');
  if (PAINT.test(n)) return 'paint';
  if (/_cf$/.test(n)) return 'carbon';
  if (/(windshield|doorglass|sideglass|quarterglass|rearglass|tailgateglass|backlight|sunroof$|sunroof_int)/.test(n) && !/light(glass)?_/.test(n.replace('backlight',''))) return 'glass';
  if (/^(taillight|tailgatelight|trunklight|chmsl)/.test(n)) return /glass/.test(n) ? 'redGlass' : (/frame/.test(n) ? 'dark' : 'redLamp');
  if (/^(headlight|foglight|platelights)/.test(n)) return /glass/.test(n) ? 'clearGlass' : (/frame/.test(n) ? 'dark' : 'refl');
  if (/(sidemarker_F|fendersignal|mirrorsignal)/.test(n)) return 'amber';
  if (/(lettering|logo|exhausttip)/.test(n)) return 'chrome';
  if (/^(seat|seats_R|dash|doorpanel|intcarpet|headliner|steer|sunvisor|armrest|roofcover)/.test(n)) return 'interior';
  if (/(screen)/.test(n)) return 'screen';
  if (/^(cladding|sideskirt|diffuser|bumper_F_sport_brakeduct|licenseplate_bracket|sidemarker_frame|duct_F|wipers)/.test(n)) return 'plastic';
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
camera.position.set(3.1, 1.4, 3.9);

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
controls.target.set(0, 0.72, 0.1);
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
  const wf = WIDE() ? 0.03 : 0, wr = WIDE() ? 0.04 : 0;
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
  loader.loadAsync('assets/3d/etk800.glb', (e) => {
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

const VIEW_FOR = { paint:'three-quarter', line:'three-quarter', hood:'three-quarter', headlights:'three-quarter', exterior:'three-quarter', body:'side', roof:'three-quarter',
  wheel:'wheel', wheelFinish:'wheel', caliper:'wheel', trim:'rear', drive:'rear', taillights:'rear', exhaust:'rear', spoiler:'rear',
  seats:'interior', interior:'interior', cabinOpts:'interior', transmission:'interior' };

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


const FAMS = {"844":{"name":"844 · 854","ext":["white","black","red","orange","green","blue"],"int":["white","beige","brown","black"],"lines":["standard","dynamic"]},"846":{"name":"846 · 856","ext":["obsidian","scarlet","crimson","sunset","technetium","mineral"],"int":["white","beige","brown","black","tt"],"lines":["standard","dynamic"]},"xc":{"name":"800 XC","ext":["white","black","red","orange","green","blue","gray"],"int":["white","beige","brown","black"],"lines":["xc"]},"800tt":{"name":"800 ttSport","ext":["metgreen","trance","magnetic","bermude"],"int":["black","tt","brown"],"lines":["ttsport"]},"800sp":{"name":"800 Specials","ext":["diamond","scarlet","crimson","sunset","technetium","mineral"],"int":["white","beige","brown","black","tt"],"lines":["ttsport"]}};
const FIXED = [["spoiler","none"],["exterior",[]],["cabinOpts",[]],["roof","solid"],["hood","standard"],["seats","sport"],["exhaust","oval"],["headlights","xenon"],["taillights","euro"]];
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
  if (state.body === 'touring'){ if (state.roof === 'carbon') state.roof = 'solid'; if (state.spoiler !== 'none') state.spoiler = 'none'; }
  if (state.trim === 'rennspecht'){ state.spoiler = 'none'; }
  if (state.line === 'xc'){ state.drive = 'awd'; }
}

function paintLocks(){
  document.querySelectorAll('.grp [data-value]').forEach(b => { b.disabled = false; b.removeAttribute('title'); });
  const lock = (g, vals, why) => vals.forEach(v => { const b = btnOf(g, v); if (b){ b.disabled = true; b.title = why; } });
  trimLocks(lock);
  if (state.body === 'touring'){ lock('roof', ['carbon'], 'Saloon only'); lock('spoiler', ['lip','lipcf'], 'Saloon only'); }
  if (state.trim === 'rennspecht') lock('spoiler', ['lip','lipcf'], 'The Rennspecht carries its own wing');
  if (state.line === 'xc') lock('drive', ['rwd'], 'The XC is xMatic only');
}

function visibleSet(){
  const v = new Set(BASE);
  const add = (l) => q(l).forEach(n => v.add(n));
  const t = GROUPS.trim[state.trim];
  const sedan = state.body === 'sedan';
  const wide = WIDE();
  add(t.slice(1));
  add(['lettering_8' + (sedan ? '4' : '5') + TRIMS[state.trim].code]);
  add(GROUPS.engine[t[0]]);
  add(GROUPS.drive[state.drive]);
  add(GROUPS.transmission[state.transmission]);
  add(GROUPS.line[state.line]);
  add(GROUPS.hood[state.hood]);
  add(GROUPS.headlights[state.headlights]);
  add(GROUPS.taillights[state.taillights]);
  add(GROUPS.exhaust[state.exhaust]);
  add(GROUPS.spoiler[state.spoiler]);
  add(GROUPS.seats[state.seats]);
  state.exterior.forEach(k => add(GROUPS.exterior[k] || []));
  state.cabinOpts.forEach(k => add(GROUPS.cabinOpts[k] || []));
  add(SUSP.map(n => wide ? n + '_wide' : n));
  if (state.drive === 'awd'){ v.delete(P + 'halfshaft_F'); add([wide ? 'halfshaft_F_wide' : 'halfshaft_F']); }
  if (sedan){
    add(['body_sedan', wide ? 'body_sedan_quarterpanels_wide' : 'body_sedan_quarterpanels',
         wide ? 'door_RL_sedan_wide' : 'door_RL_sedan', wide ? 'door_RR_sedan_wide' : 'door_RR_sedan',
         'doorglass_RL_sedan','doorglass_RR_sedan','doorglass_RL_sedan_int','doorglass_RR_sedan_int',
         'quarterglass_RL_sedan','quarterglass_RR_sedan','quarterglass_RL_sedan_int','quarterglass_RR_sedan_int',
         'rearglass_sedan','rearglass_sedan_int','trunk_sedan','tailgatelight_L','tailgatelight_R','tailgatelightglass_L','tailgatelightglass_R','chmsl_sedan','headliner_sedan','intcarpet_sedan',
         state.trim === 'rennspecht' ? 'logo_R_sedan_rennspecht' : 'logo_R_sedan']);
    add([state.roof === 'sunroof' ? 'roof_sedan_sunroof' : state.roof === 'carbon' ? 'sedan_roof_cf' : 'roof_sedan']);
  } else {
    add(['body', wide ? 'quarterpanels_wide' : 'quarterpanels', wide ? 'door_RL_wide' : 'door_RL', wide ? 'door_RR_wide' : 'door_RR',
         'doorglass_RL','doorglass_RR','doorglass_RL_int','doorglass_RR_int','sideglass_L','sideglass_R','sideglass_L_int','sideglass_R_int',
         'tailgate','tailgateglass','tailgateglass_int','tailgatelight_L','tailgatelight_R','tailgatelightglass_L','tailgatelightglass_R',
         'rearwiper','chmsl','headliner','intcarpet', state.trim === 'rennspecht' ? 'logo_R_rennspecht' : 'logo_R']);
    add([state.roof === 'sunroof' ? 'roof_sunroof' : 'roof']);
  }
  if (state.roof === 'sunroof') add(['sunroof','sunroof_int']);
  if (v.has(P + 'logo_F_ttsport') || v.has(P + 'logo_F_rennspecht')) v.delete(P + 'logo_F'); else add(['logo_F']);
  if (state.trim === 'rennspecht') v.delete(P + 'lettering_xc');
  if (cutaway){
    ['roof','roof_sunroof','roof_sedan','roof_sedan_sunroof','sedan_roof_cf','sunroof','sunroof_int','headliner','headliner_sedan',
     'sunvisor_L','sunvisor_R','sunvisor_mounts','intmirror','doorglass_FL','doorglass_FL_int','doorglass_FR','doorglass_FR_int',
     'doorglass_RL','doorglass_RL_int','doorglass_RR','doorglass_RR_int','doorglass_RL_sedan','doorglass_RL_sedan_int',
     'doorglass_RR_sedan','doorglass_RR_sedan_int'].forEach(n => v.delete(P + n));
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
  'three-quarter': { pos:[3.1, 1.4, 3.9],    tgt:[0, 0.72, 0.1],   label:'Front ¾' },
  side:            { pos:[6.0, 1.0, -0.1],   tgt:[0, 0.72, -0.1],  label:'Side' },
  rear:            { pos:[-2.9, 1.45, -4.1], tgt:[0, 0.72, -0.4],  label:'Rear ¾' },
  wheel:           { pos:[1.95, 0.6, 2.05],  tgt:[0.62, 0.36, 1.38], label:'Wheel' },
  interior:        { pos:[2.35, 1.85, 1.25], tgt:[0.05, 0.85, -0.1], label:'Interior' }
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
