import { app, BrowserWindow, nativeTheme } from 'electron'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
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
  const createIpfs = (await import('ipfs')).create;

  const myPeerId = await createEd25519PeerId();
  console.log('my peerId:',myPeerId.toString());

  const swarmKey = 'L2tleS9zd2FybS9wc2svMS4wLjAvCi9iYXNlMTYvCjZkMDBmNjA3MDc2ZTE3NTM0NzZhMDk3MWQ3NDAzNmViZDU5YTI4NDQ4YjNkZGFmOTAwZTYzYjJhZDc4MjgzOGI';

  const p2pOptions = {
    peerId: myPeerId,
    connectionProtector: new PreSharedKeyConnectionProtector({
      psk: new Uint8Array(Buffer.from(swarmKey, 'base64')),
    }),
  };

  ipfs = await createIpfs({
    libp2p: p2pOptions,
    repo: path.join(os.homedir(), '.testipfs'),
    config: {
      Bootstrap: [],
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

  await ipfs.pubsub.subscribe('mypubsub', (msg) => {
    console.log('got message : ', msg.from.toString(), uint8ArrayToString(msg.data));
  });

  // 2 subscribe => 2 events...
  // await ipfs.pubsub.subscribe('mypubsub', (msg) => {
  //   console.log('got message : ', msg.from.toString(), uint8ArrayToString(msg.data));
  // });

  let tosend = 0;
  setInterval(async () => {
    const peers = await ipfs.pubsub.peers('mypubsub');
    console.log('pubsub peers : %o', peers.length);

    const msg = new TextEncoder().encode(tosend++);
    await ipfs.pubsub.publish('mypubsub', msg);
  },5000);

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