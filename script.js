// Static vehicle data with last-hour history
// Each history point includes minutes-ago (t) for ordering
const VEHICLES = [
  { id: 'TRK-101', driver: 'Alex Kim', status: 'moving', speed: 64, location: 'I-80, MP 142', lastUpdate: '2025-11-09 10:22', lat: 37.7749, lng: -122.4194,
    history: [
      { t: 60, lat: 37.7600, lng: -122.4600 }, { t: 54, lat: 37.7640, lng: -122.4500 },
      { t: 48, lat: 37.7675, lng: -122.4450 }, { t: 42, lat: 37.7700, lng: -122.4380 },
      { t: 36, lat: 37.7715, lng: -122.4320 }, { t: 30, lat: 37.7725, lng: -122.4280 },
      { t: 24, lat: 37.7733, lng: -122.4250 }, { t: 18, lat: 37.7740, lng: -122.4230 },
      { t: 12, lat: 37.7745, lng: -122.4215 }, { t: 6, lat: 37.7748, lng: -122.4202 }
    ] },
  { id: 'VAN-202', driver: 'Priya Shah', status: 'idle', speed: 0, location: 'San Mateo Depot', lastUpdate: '2025-11-09 10:18', lat: 37.5630, lng: -122.3255,
    history: [
      { t: 60, lat: 37.5660, lng: -122.3355 }, { t: 50, lat: 37.5650, lng: -122.3310 },
      { t: 40, lat: 37.5640, lng: -122.3290 }, { t: 30, lat: 37.5635, lng: -122.3275 },
      { t: 20, lat: 37.5632, lng: -122.3265 }, { t: 10, lat: 37.5631, lng: -122.3259 }
    ] },
  { id: 'TRK-303', driver: 'Diego Ruiz', status: 'moving', speed: 47, location: 'US-101 S', lastUpdate: '2025-11-09 10:20', lat: 37.4419, lng: -122.1430,
    history: [
      { t: 60, lat: 37.5000, lng: -122.1700 }, { t: 54, lat: 37.4900, lng: -122.1650 },
      { t: 48, lat: 37.4800, lng: -122.1600 }, { t: 42, lat: 37.4700, lng: -122.1550 },
      { t: 36, lat: 37.4600, lng: -122.1500 }, { t: 30, lat: 37.4550, lng: -122.1480 },
      { t: 24, lat: 37.4500, lng: -122.1460 }, { t: 18, lat: 37.4460, lng: -122.1445 },
      { t: 12, lat: 37.4440, lng: -122.1435 }, { t: 6, lat: 37.4428, lng: -122.1431 }
    ] },
  { id: 'CAR-404', driver: 'Mia Chen', status: 'offline', speed: 0, location: 'Yard A', lastUpdate: '2025-11-09 08:02', lat: 37.3382, lng: -121.8863,
    history: [
      { t: 60, lat: 37.3380, lng: -121.8875 }, { t: 45, lat: 37.3381, lng: -121.8870 },
      { t: 30, lat: 37.3382, lng: -121.8868 }, { t: 15, lat: 37.3382, lng: -121.8865 }
    ] },
  { id: 'TRK-505', driver: 'Sam Lee', status: 'moving', speed: 53, location: 'CA-92', lastUpdate: '2025-11-09 10:24', lat: 37.5900, lng: -122.0450,
    history: [
      { t: 60, lat: 37.5600, lng: -122.0900 }, { t: 50, lat: 37.5680, lng: -122.0800 },
      { t: 40, lat: 37.5750, lng: -122.0720 }, { t: 30, lat: 37.5820, lng: -122.0620 },
      { t: 20, lat: 37.5870, lng: -122.0540 }, { t: 10, lat: 37.5890, lng: -122.0480 }
    ] },
  { id: 'VAN-606', driver: 'Emma Rossi', status: 'idle', speed: 0, location: 'Warehouse 12', lastUpdate: '2025-11-09 09:55', lat: 37.8044, lng: -122.2712,
    history: [
      { t: 60, lat: 37.8020, lng: -122.2750 }, { t: 48, lat: 37.8030, lng: -122.2735 },
      { t: 36, lat: 37.8038, lng: -122.2725 }, { t: 24, lat: 37.8042, lng: -122.2718 },
      { t: 12, lat: 37.8043, lng: -122.2714 }
    ] },
  { id: 'TRK-707', driver: 'Noah Park', status: 'moving', speed: 39, location: 'I-280 N', lastUpdate: '2025-11-09 10:21', lat: 37.6879, lng: -122.4702,
    history: [
      { t: 60, lat: 37.6500, lng: -122.4900 }, { t: 54, lat: 37.6600, lng: -122.4870 },
      { t: 48, lat: 37.6680, lng: -122.4830 }, { t: 42, lat: 37.6740, lng: -122.4790 },
      { t: 36, lat: 37.6780, lng: -122.4760 }, { t: 30, lat: 37.6810, lng: -122.4745 },
      { t: 24, lat: 37.6840, lng: -122.4728 }, { t: 18, lat: 37.6860, lng: -122.4716 },
      { t: 12, lat: 37.6870, lng: -122.4708 }, { t: 6, lat: 37.6876, lng: -122.4704 }
    ] },
  { id: 'VAN-808', driver: 'Ava Smith', status: 'offline', speed: 0, location: 'Service Bay', lastUpdate: '2025-11-09 07:10', lat: 37.7740, lng: -122.5100,
    history: [
      { t: 60, lat: 37.7746, lng: -122.5110 }, { t: 45, lat: 37.7744, lng: -122.5108 },
      { t: 30, lat: 37.7742, lng: -122.5104 }, { t: 15, lat: 37.7741, lng: -122.5102 }
    ] }
];

let filters = { text: '', status: 'all', showRoutes: true };

const el = (sel) => document.querySelector(sel);

function formatSpeed(v){ return v ? `${v} mph` : '—'; }

function renderStats(list){
  const total = list.length;
  const active = list.filter(v=>v.status==='moving').length;
  const idle = list.filter(v=>v.status==='idle').length;
  const offline = list.filter(v=>v.status==='offline').length;
  el('#stats-total').textContent = total;
  el('#stats-active').textContent = active;
  el('#stats-idle').textContent = idle;
  el('#stats-offline').textContent = offline;
}

function renderTable(list){
  const tbody = el('#vehicles-tbody');
  tbody.innerHTML = list.map(v => `
    <tr>
      <td>${v.id}</td>
      <td>${v.driver}</td>
      <td><span class="badge ${v.status}">${v.status[0].toUpperCase()+v.status.slice(1)}</span></td>
      <td>${formatSpeed(v.speed)}</td>
      <td>${v.location}</td>
      <td>${v.lastUpdate}</td>
    </tr>
  `).join('');
  el('#vehicles-count').textContent = `${list.length} item${list.length===1?'':'s'}`;
}

function allPointsForBounds(data){
  const pts = [];
  data.forEach(v => {
    if (Array.isArray(v.history)) v.history.forEach(p=>pts.push({lat:p.lat,lng:p.lng}));
    pts.push({lat:v.lat,lng:v.lng});
  });
  return pts;
}

function boundsFromPoints(points){
  const lats = points.map(d=>d.lat), lngs = points.map(d=>d.lng);
  return { minLat: Math.min(...lats), maxLat: Math.max(...lats), minLng: Math.min(...lngs), maxLng: Math.max(...lngs) };
}

function project(lat, lng, rect, b){
  const x = (lng - b.minLng) / (b.maxLng - b.minLng || 1);
  const y = 1 - ((lat - b.minLat) / (b.maxLat - b.minLat || 1));
  return { left: rect.width * x, top: rect.height * y };
}

function vehicleColor(id){
  let hash = 0; for (let i=0;i<id.length;i++) hash = (hash*31 + id.charCodeAt(i))>>>0;
  const hue = hash % 360;
  return `hsl(${hue} 70% 55%)`;
}

function prepareCanvas(){
  const canvas = el('#map-canvas');
  const map = el('#map');
  const rect = map.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0,0,rect.width,rect.height);
  return { ctx, rect };
}

function drawTrails(list, rect, b){
  const canvas = el('#map-canvas');
  const ctx = canvas.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.clearRect(0,0,rect.width,rect.height);

  list.forEach(v => {
    const pts = (v.history||[]).filter(p=>p.t<=60).sort((a,b)=>a.t-b.t).concat([{lat:v.lat,lng:v.lng,t:0}]);
    if (pts.length < 2) return;
    const proj = pts.map(p => project(p.lat, p.lng, rect, b));
    ctx.beginPath();
    ctx.moveTo(proj[0].left, proj[0].top);
    for (let i=1;i<proj.length;i++) ctx.lineTo(proj[i].left, proj[i].top);
    ctx.strokeStyle = vehicleColor(v.id);
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 2;
    ctx.stroke();
    // draw small points with fading alpha by age
    for (let i=0;i<proj.length;i++){
      const alpha = Math.max(.2, 1 - (pts[i].t/60));
      ctx.fillStyle = vehicleColor(v.id);
      ctx.globalAlpha = alpha * 0.9;
      ctx.beginPath();
      ctx.arc(proj[i].left, proj[i].top, 2.5, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });
}

function renderMap(list){
  const map = el('#map');
  map.querySelectorAll('.marker').forEach(n=>n.remove());
  const { ctx, rect } = prepareCanvas();
  const b = boundsFromPoints(allPointsForBounds(VEHICLES));
  if (filters.showRoutes) drawTrails(list, rect, b); else ctx && ctx.clearRect(0,0,rect.width,rect.height);
  list.forEach(v => {
    const { left, top } = project(v.lat, v.lng, rect, b);
    const m = document.createElement('div');
    m.className = `marker ${v.status}`;
    m.style.left = `${left}px`;
    m.style.top = `${top}px`;
    m.title = `${v.id} • ${v.driver} • ${v.status.toUpperCase()} • ${formatSpeed(v.speed)}\n${v.location}`;
    map.appendChild(m);
  });
}

function applyFilters(){
  const text = filters.text.trim().toLowerCase();
  const status = filters.status;
  return VEHICLES.filter(v => {
    const matchText = !text || v.id.toLowerCase().includes(text) || v.driver.toLowerCase().includes(text);
    const matchStatus = status === 'all' || v.status === status;
    return matchText && matchStatus;
  });
}

function render(){
  const list = applyFilters();
  renderStats(VEHICLES); // stats reflect full fleet
  renderTable(list);
  renderMap(list);
}

// Wire up UI
document.addEventListener('DOMContentLoaded', () => {
  el('#search').addEventListener('input', (e)=>{ filters.text = e.target.value; render(); });
  el('#filterStatus').addEventListener('change', (e)=>{ filters.status = e.target.value; render(); });
  el('#toggleRoutes').addEventListener('change', (e)=>{ filters.showRoutes = e.target.checked; renderMap(applyFilters()); });
  el('#refresh').addEventListener('click', ()=>{ render(); });
  window.addEventListener('resize', ()=>{ renderMap(applyFilters()); });
  render();
});
