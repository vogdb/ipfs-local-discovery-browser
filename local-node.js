const IPFS = require('ipfs-core')
const MulticastDNS = require('libp2p-mdns')

const KadDHT = require('libp2p-kad-dht')

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
    libp2p: {
      modules: {
        peerDiscovery: [
          MulticastDNS,
          // Bootstrap
        ],
        dht: KadDHT
      },
      config: {
        peerDiscovery: {
          autoDial: true, // auto dial to peers we find when we have less peers than `connectionManager.minPeers`
          mdns: {
            interval: 10000,
            enabled: true
          },
          // bootstrap: {
          //   interval: 30e3,
          //   enabled: true,
          //   list: []
          // }
        },
        // Turn on relay with hop active so we can connect to more peers
        relay: {
          enabled: true,
          hop: {
            enabled: true,
            active: true
          }
        },
        dht: {
          enabled: true,
          kBucketSize: 20,
          randomWalk: {
            enabled: true,
            interval: 10e3, // This is set low intentionally, so more peers are discovered quickly. Higher intervals are recommended
            timeout: 2e3 // End the query quickly since we're running so frequently
          }
        },
        pubsub: {
          enabled: true
        }
      }
    }
  })

  setInterval(async function (){
    const peerInfos = await node.swarm.addrs()
    peerInfos.forEach(info => {
      console.log(info.id)
      info.addrs.forEach(addr => console.log(addr.toString()))
    })
  }, 5000)
})()
