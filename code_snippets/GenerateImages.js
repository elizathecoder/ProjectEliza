process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

async function getPrompt(prompt, server) {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    prompt: 'meat popsicle',
    sampler_name: 'Euler a',
    batch_size: 1,
    n_iter: 1,
    steps: 50,
    cfg_scale: 7,
    width: 512,
    height: 512,
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  const r = await fetch(server, requestOptions).catch(error =>
    console.log('error', error)
  )

  const j = await r.json()
  console.log('j is', j)
  return j
}

async function start() {
  const prompt = 'meat popsicle'
  const server = 'https://localhost:8001/image_generation'
  const imgUrl = await getPrompt(prompt, server)
  console.log('imgUrl is', imgUrl)
}

start()
