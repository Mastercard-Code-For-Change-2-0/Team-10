const K = {
  donations: 'ss_donations',
  requests: 'ss_requests',
  moderation: 'ss_moderation',
  verification: 'ss_verification',
  matches: 'ss_matches',
  notifications: 'ss_notifications',
  profile: 'ss_profile',
}

function read(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback } catch { return fallback }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function seedIfEmpty({ mocks = [] } = {}) {
  if (!read(K.donations)) write(K.donations, [])
  if (!read(K.requests)) write(K.requests, [])
  if (!read(K.moderation)) write(K.moderation, mocks.slice(0,4).map((m,i)=>({ id: 'M'+(i+1), type:'donation', refId: m.id, flags:[{kind:'text',severity:'medium',reason:'auto: check later'}], status:'pending', createdAt:Date.now()-i*6e5 })))
  if (!read(K.verification)) write(K.verification, [{ id:'V1', orgName:'Sunrise NGO', regNo:'80G-123', city:'Pune', docs:[], status:'pending', createdAt:Date.now()-9e5 }])
  if (!read(K.matches)) write(K.matches, mocks.slice(0,3).map((m,i)=>({ id:'X'+(i+1), donation:{ id:m.id,title:m.title,city:m.city,category:m.category,quantity:m.quantity }, request:{ id:'R'+(100+i),title:m.title.replace('donation','request'),city:m.city,category:m.category,quantity:Math.max(1,m.quantity-1) }, score: 72 - i*7, status:'pending' })))
  if (!read(K.notifications)) write(K.notifications, [])
}

export function listModeration() { return read(K.moderation, []) }
export function decideModeration(id, decision='approved', note='') {
  const items = listModeration(); const i = items.findIndex(x=>x.id===id)
  if (i>=0) { items[i].status = decision; items[i].note = note; items[i].decidedAt = Date.now(); write(K.moderation, items) }
  addNotification(`${items[i]?.type==='donation'?'Donation':'Request'} ${decision}`)
}

export function listVerification() { return read(K.verification, []) }
export function decideVerification(id, decision='approved', note='') {
  const items = listVerification(); const i = items.findIndex(x=>x.id===id)
  if (i>=0) { items[i].status = decision; items[i].note = note; items[i].decidedAt = Date.now(); write(K.verification, items) }
  addNotification(`Verification ${decision}`)
}

export function listMatches() { return read(K.matches, []) }
export function decideMatch(id, decision='approved', note='') {
  const items = listMatches(); const i = items.findIndex(x=>x.id===id)
  if (i>=0) { items[i].status = decision; items[i].note = note; items[i].decidedAt = Date.now(); write(K.matches, items) }
  addNotification(`Match ${decision}`)
}

export function addNotification(text) {
  const list = read(K.notifications, [])
  list.unshift({ id: 'N'+Math.random().toString(36).slice(2,7), text, ts: new Date().toLocaleTimeString(), read: false })
  write(K.notifications, list)
}
export function listNotifications() { return read(K.notifications, []) }
export function markNotificationRead(id) { const list=listNotifications(); const i=list.findIndex(n=>n.id===id); if(i>=0){list[i].read=true; write(K.notifications, list)} }

export function fakeModerateText(text='') {
  const bad = ['abuse','offensive','graphic']
  const found = bad.filter(w => text.toLowerCase().includes(w))
  return found.map(w => ({ kind:'text', severity:'high', reason:`contains "${w}"` }))
}

export function createDonation(payload) {
  const id = 'D-'+(Date.now()%1e9)
  const donations = read(K.donations, [])
  donations.unshift({ id, status:'pending', createdAt:Date.now(), ...payload })
  write(K.donations, donations)
  const flags = fakeModerateText(payload.description)
  const mod = read(K.moderation, [])
  mod.unshift({ id:'M'+(Date.now()%1e6), type:'donation', refId:id, flags: flags.length? flags: [{kind:'auto',severity:'low',reason:'queued'}], status:'pending', createdAt:Date.now() })
  write(K.moderation, mod)
  addNotification('Donation submitted for review')
  return { id }
}

export function createRequest(payload) {
  const id = 'R-'+(Date.now()%1e9)
  const requests = read(K.requests, [])
  requests.unshift({ id, status:'pending', createdAt:Date.now(), ...payload })
  write(K.requests, requests)
  const flags = fakeModerateText(payload.description)
  const mod = read(K.moderation, [])
  mod.unshift({ id:'M'+(Date.now()%1e6), type:'request', refId:id, flags: flags.length? flags: [{kind:'auto',severity:'low',reason:'queued'}], status:'pending', createdAt:Date.now() })
  write(K.moderation, mod)
  addNotification('Request submitted for review')
  return { id }
}

export function listDonations({ q, category, condition, city, sort, page = 1, pageSize = 12 } = {}) {
  let items = read(K.donations, [])
  if (q) items = items.filter(d => d.title?.toLowerCase?.().includes(q.toLowerCase()) || d.description?.toLowerCase?.().includes(q.toLowerCase()))
  if (category) items = items.filter(d => d.category===category)
  if (condition) items = items.filter(d => d.condition===condition)
  if (city) items = items.filter(d => d.city===city)
  if (sort==='Newest') items.sort((a,b)=> (b.createdAt||0)-(a.createdAt||0))
  if (sort==='Oldest') items.sort((a,b)=> (a.createdAt||0)-(b.createdAt||0))
  const total = items.length
  const start = (page-1)*pageSize
  const paged = items.slice(start, start+pageSize)
  return { items: paged, total }
}

export function generateReport(type='Donations', format='csv') {
  const rows = [['Type','ID','Title','Qty','Status','CreatedAt']]
  const src = type==='Requests' ? read(K.requests, []) : read(K.donations, [])
  src.forEach(x => rows.push([type.slice(0,-1), x.id, x.title, x.quantity||'', x.status||'', new Date(x.createdAt||Date.now()).toISOString()]))
  const csv = rows.map(r=> r.map(v => '"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  return { url, filename: `${type.toLowerCase()}-${new Date().toISOString().slice(0,10)}.csv` }
}
