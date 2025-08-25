const BASE = import.meta.env.VITE_API_URL || ''

async function fetchJson(path, { method = 'GET', params, body, headers } = {}) {
  const url = new URL(path, BASE || window.location.origin)
  if (params) Object.entries(params).forEach(([k,v]) => (v!==undefined && v!=='' && url.searchParams.set(k, v)))
  const res = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include'
  })
  if (!res.ok) {
    const text = await res.text().catch(()=> '')
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
  }
  return res.json()
}

export async function listDonations({ q, category, condition, city, sort, page = 1, pageSize = 12 } = {}) {
  // Expected backend: GET /api/donations?q=&category=&condition=&city=&sort=&page=&pageSize=
  // Return shape expected: { data: [...], total: number }
  const json = await fetchJson('/api/donations', {
    params: { q, category, condition, city, sort, page, pageSize }
  })
  const items = json.data || json.items || json.results || []
  const total = json.total ?? items.length
  return { items, total }
}

export async function createDonation(payload) {
  // Expected backend: POST /api/donations (JSON or multipart handled separately later)
  return fetchJson('/api/donations', { method: 'POST', body: payload })
}

export async function createRequest(payload) {
  // Expected backend: POST /api/requests
  return fetchJson('/api/requests', { method: 'POST', body: payload })
}
