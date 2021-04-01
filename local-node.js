const IPFS = require('ipfs-core')

;(async () => {

  node = await IPFS.create({
    repo: 'ipfs-' + Math.random(),
    config: {
      Discovery: {
        MDNS: {enabled: true, interval: 5}
      },
      // If you want to connect to the public bootstrap nodes, remove the next line
      Bootstrap: []
    },
    silent: false
  })

  setInterval(async function (){
    const peerInfos = await node.swarm.addrs()
    peerInfos.forEach(info => {
      console.log(info.id)
      info.addrs.forEach(addr => console.log(addr.toString()))
    })
  }, 5000)
})()
