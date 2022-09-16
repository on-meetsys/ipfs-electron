import { app, BrowserWindow, nativeTheme } from 'electron'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { concat as uint8ArrayConcat } from 'uint8arrays/concat';
import { CID } from 'multiformats/cid';
import path from 'path'
import os from 'os'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow

async function startIpfs()
{
  const { createEd25519PeerId } = await import('@libp2p/peer-id-factory');
  const { PreSharedKeyConnectionProtector } = await import('libp2p/pnet');
  const { GossipSub } = await import('@chainsafe/libp2p-gossipsub');
  const { createFromPrivKey } = await import('@libp2p/peer-id-factory');
  const { unmarshalPrivateKey } = await import('@libp2p/crypto/keys');
  const createIpfs = (await import('ipfs')).create;

  // const pid = await createEd25519PeerId();
  // console.log(pid.toString());
  // const enc = Buffer.from(pid.privateKey).toString('base64');
  // console.log(enc);
  // const dec = Buffer.from(enc, 'base64');
  // console.log(dec);
  // const PK = await unmarshalPrivateKey(new Uint8Array(dec));

  const privkeyC = "CAESQFtFT7hyKf...5NnMS+FqFNHnOYCOgspxI/bmR9FCFY=";
  const privkeyJ = "CAESQCinZzMaWW...IqL8mbiReIZo4lUyLo+kI0fWFDxIz4=";
  const privkeyM = "CAESQKaSEkS9k3...yXoP3JVfj9lz31CXPIUZKEvNWKmnKg=";
  const privkeyO = "CAESQPHWqKGMjL...OmstdPJ4DPqzdv/y3QFS9yI03J919gw=";
  
  const bootstrap = [];
  // const bootstrap = [
  //   '/ip4xx.xx.xx.xx/tcp/4002/p2p/XXX',
  //   '/ip4xx.xx.xx.xx/tcp/4002/p2p/XXX',
  //   '/ip4xx.xx.xx.xx/tcp/4003/ws/p2p/XXX',
  // ];

  const privKey = Buffer.from(privkeyO, 'base64');
  const PK = await unmarshalPrivateKey(new Uint8Array(privKey));
  
  // const myPeerId = await createEd25519PeerId();
  const myPeerId = await createFromPrivKey(PK);
  console.log('my peerId:',myPeerId.toString());


  const swarmKey = 'L2tleS9zd2Fy...Q3NDAzNmViZDU5YTI4NDQ4YjNkZGFmOTAwZTYzYjJhZDc4MjgzOGI';

  const p2pOptions = {
    peerId: myPeerId,
    pubsub: new GossipSub({
      allowPublishToZeroPeers: true,
      fallbackToFloodsub: true,
      emitSelf: false,
      maxInboundStreams: 64,
      maxOutboundStreams: 128,
    }),
    connectionProtector: new PreSharedKeyConnectionProtector({
      psk: new Uint8Array(Buffer.from(swarmKey, 'base64')),
    }),
    nat: {
      enabled: false,
    },
  };

  ipfs = await createIpfs({
    libp2p: p2pOptions,
    repo: path.join(os.homedir(), '.ipfs-'+myPeerId.toString()),
    config: {
      Bootstrap: bootstrap,
    },
  });

  const libp2p = ipfs.libp2p;

  libp2p.connectionManager.addEventListener('peer:connect', async (evt) => {
    const { detail: connection } = evt;
    const { remotePeer } = connection;
    console.log( 'peer:connect', remotePeer.toString());
  });

  libp2p.connectionManager.addEventListener('peer:disconnect', async (evt) => {
    const { detail: connection } = evt;
    const { remotePeer } = connection;
    console.log( 'peer:disconnect', remotePeer.toString());
  });

  await ipfs.pubsub.subscribe('ipfsfilemsg', async (msg) => {
    console.log('got file message : ', msg.from.toString(), uint8ArrayToString(msg.data));

    const cid = CID.parse(uint8ArrayToString(msg.data));

    //read file
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    const content = uint8ArrayToString(uint8ArrayConcat(chunks));
    console.log('got file : ', content);
  });

  await ipfs.pubsub.subscribe('ipfsdagmsg', async (msg) => {
    console.log('got dag message : %o', msg.from.toString(), uint8ArrayToString(msg.data));

    // read dag
    const cid = CID.parse(uint8ArrayToString(msg.data));
    const result = await ipfs.dag.get(cid);
    console.log('got dag : ', result.value);
  });

  // 2 subscribe => 2 events
  // await ipfs.pubsub.subscribe('ipfsfilemsg', (msg) => {
  //   console.log('got message : ', msg.from.toString(), uint8ArrayToString(msg.data));
  // });

  let nfile = 0;
  setInterval(async () => {
    // show connected peers
    const peers = await ipfs.pubsub.peers('ipfsfilemsg');
    peers.forEach((p)=> console.log('peer : ', p.toString()));

    // put file content
    const resfile = await ipfs.add(myPeerId.toString()+' ipfs file #' + nfile);
    console.log('save ipfs : ', resfile.path);

    await ipfs.pubsub.publish('ipfsfilemsg',  new TextEncoder().encode(resfile.path));

    // put dag content
    const resdag = await ipfs.dag.put({
      content: myPeerId.toString()+' ipfs dag #' + nfile,
    }, { storeCodec: 'dag-cbor', hashAlg: 'sha2-256' });
    console.log('save dag : ', resdag.toString()); 
      
    await ipfs.pubsub.publish('ipfsdagmsg', new TextEncoder().encode(resdag.toString()));

    nfile++;

  },10000);

  console.log(await ipfs.bootstrap.list());
}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  startIpfs();

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
