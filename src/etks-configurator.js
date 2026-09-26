import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ---------- part sets ---------------------------------------------------- */

const P = 'etkss_';
const LWB_SHIFT = 0.095;

const BASE = [
  'door_FL','door_FR','mirror_L','mirror_R','mirrorsignal_L','mirrorsignal_R','wipers',
  'windshield','windshield_int','doorglass_FL','doorglass_FL_int','doorglass_FR','doorglass_FR_int',
  'sideglass_L','sideglass_L_int','sideglass_R','sideglass_R_int','rearglass','rearglass_int',
  'chmsl','chmsl_carpet','headlight_L_in','headlight_R_in','headlight_L_glass','headlight_R_glass',
  'headlight_L_frame','headlight_R_frame','logo_R','exhaust_L','exhaust_R','exhaustop_L','exhaustop_R',
  'radiator','radsupport','bumperbar_F','enginebay_cladding','underbody_cladding','heatshield','fueltank',
  'driveshaft','diff','subframe_F','subframe_R','lowerarm_F_a','lowerarm_F_b','lowerarm_R','upperarm_R',
  'tierod_F','tierod_R','strut_F','shock_R','spring_R','hub_F','hub_R','halfshaft_R','swaybar_F','swaybar_R',
  'steeringbox','strutbrace_F','intmirror','sunvisor','dash','navigation_main','gauges','gauges_screen',
  'decals_gauges','needle_temp','needle_tacho','needle_speedo','needle_fuel','steer','wiperstalk','signalstalk',
  'gaspedal','brakepedal','ashtray','doorpanel_FL','doorpanel_FR','trunk_hinges','hood_hinges'
].map(n => P + n).concat(['etk_intercooler']);

const GROUPS = {
  trim: {
    's4250': ["lettering_trunk_4","lettering_250"],
    's6300': ["lettering_trunk_6","lettering_300"],
    's6310d': ["lettering_trunk_6","lettering_310","lettering_d"],
    's8450': ["lettering_trunk_8","lettering_450"],
    's12580': ["lettering_trunk_12","lettering_580"],
    'rennspechtsr': ["lettering_trunk_8","lettering_sr","lettering_rennspecht","logo_F_rennspecht","logo_R_rennspecht","lip_F_rennspecht","lip_F_rennspecht_lettering","spoiler_rennspecht"],
    'ttsportgt': ["lettering_trunk_12","lettering_gt","lettering_tt_sport","logo_F_ttsport"],
    'ttsportgtr': ["lettering_trunk_12","lettering_gtr","lettering_tt_sport","logo_F_ttsport"],
    'ttsportgt-sheritage': ["lettering_trunk_8","lettering_gts","lettering_tt_sport","logo_F_ttsport"],
    'exclusive': ["lettering_trunk_12","lettering_trunk_exclusive","logo_F_exclusive"]
  },
  engine: {
    i4:  ['etk_icpipe_i_i4','etk_icpipe_t_i4','etk_radtube_i4','engbaycrap'],
    i6:  ['etk_icpipe_i_i6','etk_icpipe_t_i6','etk_radtube_i6','engbaycrap'],
    v8:  ['etk_icpipe_i_v8','etk_icpipe_t_v8','etk_radtube_v8','engbaycrap','strutbrace_F_extra'],
    v12: ['etk_radtube_v8','engbaycrap_v12','strutbrace_F_extra']
  },
  drive: {
    rwd: [],
    awd: ['lettering_x','diff_F','driveshaft_F','halfshaft_F','etk_transfercase']
  },
  transmission: {
    auto:   ['shifter_A','shifterbase_A','paddles'],
    manual: ['shifter_boot_M','shifter_knob_M','shifter_base_M','clutchpedal']
  },
  body: {
    sedan: ['body_sedan','door_RL','door_RR','doorglass_RL','doorglass_RL_int','doorglass_RR','doorglass_RR_int',
            'doorpanel_RL','doorpanel_RR','intcarpet','lettering_trunk_Ss'],
    lwb:   ['body_sedan_lwb','door_RL_lwb','door_RR_lwb','doorglass_RL_lwb','doorglass_RL_int_lwb','doorglass_RR_lwb',
            'doorglass_RR_int_lwb','doorpanel_RL_lwb','doorpanel_RR_lwb','intcarpet_lwb','logo_body_lwb','lettering_trunk_Sl']
  },
  line: {
    standard:  ['bumper_F_a','bumper_F_a_running_L','bumper_F_a_running_R','bumper_F_a_running_glass_L','bumper_F_a_running_glass_R',
                'grille_a','grilleframe_a','fender_L','fender_R','sidemarker_frame','sidemarker_FL','sidemarker_FR','bumper_R_a','tubs'],
    dynamic:   ['bumper_F_b','bumper_F_b_running_L','bumper_F_b_running_R','bumper_F_b_running_glass_L','bumper_F_b_running_glass_R',
                'grille_b','grilleframe_b','fender_L','fender_R','sidemarker_frame','sidemarker_FL','sidemarker_FR','bumper_R_a','tubs',
                'sideskirt','lettering_trunk_dynamic'],
    exclusive: ['bumper_F_exclusive','bumper_F_alt_running_L','bumper_F_alt_running_R','bumper_F_alt_running_glass_L','bumper_F_alt_running_glass_R',
                'grille_exclusive','logo_F_exclusive','fender_L','fender_R','sidemarker_frame','sidemarker_FL','sidemarker_FR','bumper_R_a','tubs',
                'lettering_trunk_exclusive'],
    gt:        ['bumper_F_b_gt','lip_F_gt','bumper_F_b_running_L','bumper_F_b_running_R','bumper_F_b_running_glass_L','bumper_F_b_running_glass_R',
                'grille_b','grilleframe_b','fender_L_gt','fender_R_gt','sidemarker_frame_gt','sidemarker_gt_FL','sidemarker_gt_FR',
                'bumper_R_gt','tubs_wide','sideskirt','lettering_gt']
  },
  hood: {
    standard: ['hood'],
    vented:   ['hood_gts'],
    carbon:   ['hood_gts_cf']
  },
  roof: {
    solid:     ['roof','roof_paint','headliner'],
    panoramic: ['roof_panoramic','panoramicroof','panoramicroof_int','headliner_panoramic'],
    carbon:    ['roof','roof_carbon','headliner']
  },
  spoiler: {
    none:     [],
    lip:      ['spoiler_lip'],
    lipcf:    ['spoiler_lip_cf'],
    sport:    ['spoiler_sport'],
    sportcf:  ['spoiler_sport_cf'],
    ducktail: []
  },
  taillights: {
    eudm:    ['taillight_L_EUDM_in','taillight_R_EUDM_in','taillight_center_EUDM_in','taillight_L_glass','taillight_R_glass','taillight_center_glass'],
    usdm:    ['taillight_L_USDM_in','taillight_R_USDM_in','taillight_center_USDM_in','taillight_L_glass','taillight_R_glass','taillight_center_glass'],
    ttsport: ['taillight_ttsport_L_in','taillight_ttsport_R_in','taillight_ttsport_center_in','taillight_ttsport_L_glass',
              'taillight_ttsport_R_glass','taillight_ttsport_center_glass']
  },
  exhaust: {
    single: ['exhausttip_L','exhausttip_R'],
    quad:   ['exhausttip_L_b','exhausttip_R_b','exhaust_L_b']
  },
  diffuser: {
    a:         ['diffuser_R_a','diffuser_R_a_paint'],
    b:         ['diffuser_R_b','diffuser_R_b_paint'],
    exclusive: ['diffuser_R_exclusive']
  },
  seats: {
    standard: ['seat_FL','seat_FR'],
    sport:    ['seat_FL_sport','seat_FR_sport']
  },
  rear: {
    bench:     ['seats_R'],
    executive: ['seat_RL_lwb','seat_RR_lwb','dash_rear','dash_rear_top1','dash_rear_top2','dash_lwb']
  },
  cabinOpts: {
    rearscreens: ['seat_screen_FL','seat_screen_FR'],
    table:       ['clapboard']
  }
};

const TRIMS = {"s4250":{"label":"S4 250","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"s6300":{"label":"S6 300","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"s6310d":{"label":"S6 310d","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"s8450":{"label":"S8 450","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"s12580":{"label":"S12 580","drive":"both","gear":"auto","gearOpt":false,"gearLabel":null,"force":null,"ev":false,"special":false},"rennspechtsr":{"label":"Rennspecht SR","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":null,"force":{"spoiler":"none"},"ev":false,"special":true},"ttsportgt":{"label":"ttSport GT","drive":"rwd","gear":"auto","gearOpt":false,"gearLabel":"7-speed ttSport dual-clutch automatic","force":{"line":"gt"},"ev":false,"special":true},"ttsportgtr":{"label":"ttSport GTR","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":"7-speed ttSport dual-clutch automatic","force":{"line":"gt"},"ev":false,"special":true},"ttsportgt-sheritage":{"label":"ttSport GT-S Heritage","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":"7-speed ttSport dual-clutch automatic","force":{"line":"gt"},"ev":false,"special":true},"exclusive":{"label":"Exclusive","drive":"awd","gear":"auto","gearOpt":false,"gearLabel":null,"force":{"line":"exclusive","body":"lwb"},"ev":false,"special":true}};
const ENGINE_OF = {"s4250":"i4","s6300":"i6","s6310d":"i6","s8450":"v8","s12580":"v12","rennspechtsr":"v8","ttsportgt":"v12","ttsportgtr":"v12","ttsportgt-sheritage":"v8","exclusive":"v12"};

/* parts behind the B-pillar that move back when the long body is chosen */
const REAR_SHIFT = /^etkss_(subframe_R|hub_R|halfshaft_R|swaybar_R|shock_R|spring_R|upperarm_R|tierod_R|lowerarm_R|diff|trunk|trunk_ducktail|trunk_hinges|bumper_R_a|bumper_R_gt|diffuser_.*|exhausttip_.*|exhaustop_.*|exhaust_L_b|taillight_.*|rearglass|rearglass_int|chmsl|chmsl_carpet|spoiler_.*|lettering_.*|logo_R.*|seats_R|fueltank|heatshield)$|^etkc_taillightglass_ttsport_L$/;

function qualify(list){
  return list.flatMap(n => {
    if (n === 'sideskirt') return [];
    return (n.startsWith('etkss_') || n.startsWith('etk_') || n.startsWith('etkc_')) ? [n] : [P + n];
  });
}

/* ---------- materials ---------------------------------------------------- */

const M = {
  paint:   new THREE.MeshPhysicalMaterial({ color:0x3c4045, metalness:0.72, roughness:0.26, clearcoat:1, clearcoatRoughness:0.04 }),
  glass:   new THREE.MeshPhysicalMaterial({ color:0x14181b, metalness:0, roughness:0.05, transparent:true, opacity:0.24, side:THREE.DoubleSide }),
  clearLamp: new THREE.MeshPhysicalMaterial({ color:0xdfe6ea, metalness:0, roughness:0.08, transparent:true, opacity:0.42 }),
  redLamp: new THREE.MeshPhysicalMaterial({ color:0x8e0b18, metalness:0, roughness:0.16, transparent:true, opacity:0.72 }),
  smokeLamp: new THREE.MeshPhysicalMaterial({ color:0x2a0a0e, metalness:0, roughness:0.12, transparent:true, opacity:0.82 }),
  redRefl: new THREE.MeshStandardMaterial({ color:0x5d0a12, metalness:0.2, roughness:0.45 }),
  amber:   new THREE.MeshStandardMaterial({ color:0xb4620d, metalness:0.1, roughness:0.35 }),
  refl:    new THREE.MeshStandardMaterial({ color:0xd8dcdf, metalness:0.9, roughness:0.18 }),
  chrome:  new THREE.MeshStandardMaterial({ color:0xc7ccd1, metalness:0.95, roughness:0.2 }),
  grille:  new THREE.MeshStandardMaterial({ color:0x191c1f, metalness:0.55, roughness:0.45 }),
  carbon:  new THREE.MeshPhysicalMaterial({ color:0x1a1c1f, metalness:0.35, roughness:0.32, clearcoat:1, clearcoatRoughness:0.06 }),
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
  paint: /^etkss_(body_sedan(_lwb)?(_quarterpanels(_wide)?)?|body_sedan_lwb_quarterpanels(_wide)?|hood|hood_gts|roof_paint|roof_lwb_paint|roof_panoramic(_lwb)?|roof_carbon|door_(FL|FR|RL|RR)(_lwb)?(_gt)?|fender_[LR](_gt)?|bumper_F_(a|b|b_gt|alt|exclusive)|bumper_R_(a|gt)|trunk|trunk_ducktail|mirror_[LR]|diffuser_R_[ab]_paint|spoiler_(sport|lip|rennspecht)|lip_F_rennspecht)$/,
  interior: /(seat|seats_R|dash|doorpanel|intcarpet|headliner|steer|sunvisor|clapboard|ashtray|rollcage)/,
  glass: /(windshield|doorglass|sideglass|rearglass|panoramicroof)/,
  smoke: /taillight(glass)?_ttsport.*glass|taillightglass_ttsport/,
  lampRed: /(taillight|chmsl)/,
  lampClear: /(headlight|running)/,
  amber: /(sidemarker_(gt_)?F[LR]|mirrorsignal)/,
  chrome: /(lettering|logo|exhausttip|grilleframe_a)/,
  carbon: /(_cf$|lip_F_gt)/,
  grille: /grille/
};

function classOf(name){
  if (RX.carbon.test(name)) return 'carbon';
  if (RX.paint.test(name)) return 'paint';
  if (RX.amber.test(name)) return 'amber';
  if (RX.glass.test(name)) return 'glass';
  if (RX.smoke.test(name)) return 'smoke';
  if (RX.lampRed.test(name)) return 'lampRed';
  if (RX.lampClear.test(name)) return 'lampClear';
  if (RX.chrome.test(name)) return 'chrome';
  if (RX.grille.test(name)) return 'grille';
  if (RX.interior.test(name)) return 'interior';
  return 'chassis';
}

function byOriginal(orig){
  if (/glass_invisible/.test(orig)) return null;
  if (/etkc_glass|etk800_glass_int/.test(orig)) return M.glass;
  if (/screen/.test(orig)) return M.screen;
  if (/carbonfibre/.test(orig)) return M.carbon;
  if (/grille/.test(orig)) return M.grille;
  if (/mirror_F/.test(orig)) return M.chrome;
  if (/extra/.test(orig)) return M.plastic;
  return null;
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
      m = /spoiler_sport$/.test(name) ? M.paint : (byOriginal(orig) || (/intcarpet/.test(orig) ? M.dark : M.paint));
    } else if (cls === 'carbon') {
      m = /grille/.test(orig) ? M.grille : M.carbon;
    } else if (cls === 'interior') {
      m = byOriginal(orig) || (/carpet|headliner/.test(name) ? M.int2 : M.int);
      if (/rollcage/.test(orig)) m = M.metal;
    } else if (cls === 'glass') {
      m = M.glass;
      o.castShadow = false;
    } else if (cls === 'smoke') {
      m = M.smokeLamp;
    } else if (cls === 'lampRed') {
      m = /glass/.test(name) ? M.redLamp : (/signal/.test(orig) ? M.redRefl : M.dark);
    } else if (cls === 'lampClear') {
      m = /glass/.test(name) ? M.clearLamp : (/headlight|runninglight/.test(orig) ? M.refl : M.dark);
    } else if (cls === 'amber') {
      m = M.amber;
    } else if (cls === 'chrome') {
      m = M.chrome;
    } else if (cls === 'grille') {
      m = byOriginal(orig) || M.grille;
    } else {
      m = byOriginal(orig) || M.chassis;
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
camera.position.set(3.2, 1.4, 4.0);

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
  { x: 0.795, z:-1.431, rear:true,  side: 1 },
  { x:-0.795, z:-1.431, rear:true,  side:-1 }
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
  const wide = state.line === 'gt' ? 0.014 : 0;
  const back = state.body === 'lwb' ? LWB_SHIFT : 0;
  AXLE.forEach(corner => {
    const w = buildWheel(styleKey, corner);
    if (corner.side < 0) w.rotation.y = Math.PI;
    w.position.set(corner.x + corner.side * wide, w.userData.radius, corner.z - (corner.rear ? back : 0));
    wheelRoot.add(w);
  });
  wheelRoot.userData.key = styleKey + '|' + state.line + '|' + state.body;
}

/* ---------- load --------------------------------------------------------- */

const parts = new Map();
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const bar = document.getElementById('bar');
const loaderEl = document.getElementById('loader');

Promise.all([
  loader.loadAsync('assets/3d/etks.glb', (e) => {
    if (e.total) bar.style.width = Math.round((e.loaded / e.total) * 80) + '%';
  }),
  loader.loadAsync('assets/3d/etk-wheels.glb'),
  loader.loadAsync('assets/3d/etk-tires.glb')
]).then(([car, rims, tyres]) => {
  const root = car.scene;
  root.updateMatrixWorld(true);
  let holder = root, best = root.children.length;
  root.traverse(o => { if (o.children.length > best){ best = o.children.length; holder = o; } });
  holder.children.slice().forEach(p => { parts.set(p.name, p); p.userData.y0 = p.position.y; assign(p); });
  scene.add(root);

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

const VIEW_FOR = {
  paint:'three-quarter', line:'three-quarter', hood:'three-quarter', roof:'three-quarter', body:'side',
  wheel:'wheel', wheelFinish:'wheel', caliper:'wheel',
  trim:'rear', drive:'rear', taillights:'rear', exhaust:'rear', diffuser:'rear', spoiler:'rear',
  seats:'interior', interior:'interior', rear:'interior', cabinOpts:'interior', transmission:'interior'
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

const LOCKS = [
  { group:'roof', value:'carbon', when:() => state.body === 'lwb', fallback:'solid' },
  { group:'rear', value:'executive', when:() => state.body !== 'lwb', fallback:'bench' },
  { group:'cabinOpts', value:'table', when:() => state.rear !== 'executive' },
  { group:'spoiler', value:'*', when:() => state.trim === 'rennspechtsr', fallback:'none' },
  { group:'drive', value:'rwd', when:() => state.trim === 'rennspechtsr', fallback:'awd' }
];

function enforce(){
  trimEnforceLite();
  LOCKS.forEach(l => {
    if (!l.when()) return;
    if (l.value === '*'){ if (state[l.group] !== l.fallback) state[l.group] = l.fallback; return; }
    if (Array.isArray(state[l.group])){
      const i = state[l.group].indexOf(l.value);
      if (i > -1) state[l.group].splice(i, 1);
    } else if (state[l.group] === l.value) state[l.group] = l.fallback;
  });
}

function paintLocks(){
  document.querySelectorAll('.grp [data-value]').forEach(b => { b.disabled = false; b.removeAttribute('title'); });
  trimLocksLite();
  LOCKS.forEach(l => {
    if (!l.when()) return;
    const sec = document.querySelector('.grp[data-group="' + l.group + '"]');
    if (!sec) return;
    sec.querySelectorAll('[data-value]').forEach(b => {
      if (l.value === '*' ? b.dataset.value !== l.fallback : b.dataset.value === l.value){
        b.disabled = true;
        b.title = l.group === 'roof' ? 'Saloon body only' : l.group === 'rear' || l.group === 'cabinOpts' ? 'Long wheelbase with executive rear only'
          : 'Fixed for the Rennspecht';
      }
    });
  });
}

function visibleSet(){
  const v = new Set(BASE);
  const add = (list) => qualify(list).forEach(n => v.add(n));
  const lwb = state.body === 'lwb';

  add(GROUPS.trim[state.trim] || []);
  add(GROUPS.engine[ENGINE_OF[state.trim]] || []);
  add(GROUPS.drive[state.drive] || []);
  add(GROUPS.transmission[state.transmission] || []);
  add(GROUPS.body[state.body] || []);
  add(GROUPS.line[state.line] || []);
  add(GROUPS.hood[state.hood] || []);
  add(GROUPS.spoiler[state.spoiler] || []);
  add(GROUPS.taillights[state.taillights] || []);
  add(GROUPS.exhaust[state.exhaust] || []);
  add(GROUPS.diffuser[state.diffuser] || []);
  add(GROUPS.seats[state.seats] || []);
  add(GROUPS.rear[state.rear] || []);
  state.cabinOpts.forEach(k => add(GROUPS.cabinOpts[k] || []));

  // roof and quarter panels follow body length
  (GROUPS.roof[state.roof] || []).forEach(n => {
    const lwbName = { roof:'roof_lwb', roof_paint:'roof_lwb_paint', headliner:'headliner_lwb',
      roof_panoramic:'roof_panoramic_lwb', panoramicroof:'panoramicroof_lwb', panoramicroof_int:'panoramicroof_int_lwb',
      headliner_panoramic:'headliner_panoramic_lwb' }[n];
    v.add(P + (lwb && lwbName ? lwbName : n));
  });
  const wide = state.line === 'gt';
  v.add(P + (lwb ? 'body_sedan_lwb_quarterpanels' : 'body_sedan_quarterpanels') + (wide ? '_wide' : ''));
  if (GROUPS.line[state.line].includes('sideskirt')) v.add(P + (lwb ? 'sideskirt_sport_lwb' : 'sideskirt_sport'));
  if (wide){
    const rl = lwb ? ['door_RL_lwb','door_RR_lwb'] : ['door_RL','door_RR'];
    rl.forEach(n => { v.delete(P + n); v.add(P + n + '_gt'); });
  }
  v.add(P + (state.spoiler === 'ducktail' ? 'trunk_ducktail' : 'trunk'));
  if (state.taillights === 'ttsport') v.add('etkc_taillightglass_ttsport_L');

  if (TRIMS[state.trim] && TRIMS[state.trim].special){
    v.delete(P + 'lettering_trunk_dynamic');
    v.delete(P + 'lettering_trunk_exclusive');
    v.delete(P + 'lettering_gt');
    add(GROUPS.trim[state.trim] || []);
  }
  if (v.has(P + 'logo_F_ttsport') || v.has(P + 'logo_F_exclusive') || v.has(P + 'logo_F_rennspecht')) v.delete(P + 'logo_F');
  else v.add(P + 'logo_F');
  if (v.has(P + 'logo_R_rennspecht')) v.delete(P + 'logo_R');
  if (v.has(P + 'lip_F_rennspecht')) v.delete(P + 'lip_F_gt');
  if (state.rear === 'executive') v.delete(P + 'seats_R');

  if (cutaway){
    ['roof','roof_paint','roof_lwb','roof_lwb_paint','roof_carbon','roof_panoramic','roof_panoramic_lwb','panoramicroof','panoramicroof_lwb',
     'panoramicroof_int','panoramicroof_int_lwb','headliner','headliner_lwb','headliner_panoramic','headliner_panoramic_lwb','sunvisor','intmirror',
     'doorglass_FL','doorglass_FL_int','doorglass_RL','doorglass_RL_int','doorglass_FR','doorglass_FR_int','doorglass_RR','doorglass_RR_int',
     'doorglass_RL_lwb','doorglass_RL_int_lwb','doorglass_RR_lwb','doorglass_RR_int_lwb'
    ].forEach(n => v.delete(P + n));
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
    const back = state.body === 'lwb' ? LWB_SHIFT : 0;
    parts.forEach((node, name) => {
      node.visible = v.has(name);
      node.position.y = node.userData.y0 + (REAR_SHIFT.test(name) ? back : 0);
    });
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

  if (wheelRoot.children.length && wheelRoot.userData.key !== state.wheel + '|' + state.line + '|' + state.body){
    setWheels(state.wheel);
  }

  // header + price + summary
  const trimBtn = btnOf('trim', state.trim);
  document.getElementById('cfgname').textContent = trimBtn.dataset.label;
  document.getElementById('cfgspec').textContent =
    trimBtn.dataset.spec + ' · ' + (state.drive === 'awd' ? 'xMatic all-wheel drive' : 'rear-wheel drive') +
    (state.body === 'lwb' ? ' · long wheelbase' : '');

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
  'three-quarter': { pos:[3.2, 1.4, 4.0],    tgt:[0, 0.72, 0.1],   label:'Front ¾' },
  side:            { pos:[6.2, 1.0, -0.1],   tgt:[0, 0.72, -0.1],  label:'Side' },
  rear:            { pos:[-3.0, 1.45, -4.3], tgt:[0, 0.72, -0.45], label:'Rear ¾' },
  wheel:           { pos:[1.95, 0.6, 2.05],  tgt:[0.62, 0.38, 1.38], label:'Wheel' },
  interior:        { pos:[2.45, 1.85, 1.2],  tgt:[0.05, 0.85, -0.1], label:'Interior' }
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
