export async function translateRequest(body) {
  const res = await fetch('/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error('API error')
  return res.json()
}
