'use strict'

const IPFS = require('ipfs-core')

document.addEventListener('DOMContentLoaded', async () => {
  const node = await IPFS.create({
    repo: String(Math.random() + Date.now()),
    config: {
      Discovery: {
        MDNS: {enabled: true, interval: 5}
      },
      Bootstrap: [],
    }
  })

  console.log(`IPFS node is ready`)

  setInterval(async function (){
    const peerInfos = await node.swarm.addrs()
    peerInfos.forEach(info => {
      console.log(info.id)
      info.addrs.forEach(addr => console.log(addr.toString()))
    })
  }, 5000)

})
