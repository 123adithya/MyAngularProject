
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/MyAngularProject/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/MyAngularProject/counter",
    "route": "/MyAngularProject"
  },
  {
    "renderMode": 2,
    "route": "/MyAngularProject/counter"
  },
  {
    "renderMode": 2,
    "route": "/MyAngularProject/vatavaran"
  }
],
  assets: {
    'index.csr.html': {size: 4982, hash: 'd8990e8198e2ddfb8a8309a709e2b85466c97f5172ecf6e167238e5bf59be9bb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1081, hash: '3cba904d3cb838b4816417acab502ac4e0f5510f410ac46b0ec4afa3f9cd3088', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'counter/index.html': {size: 13910, hash: 'c96de71d9627b5393163940058b4529e218c82c0ff1568e98a60f09d5880921a', text: () => import('./assets-chunks/counter_index_html.mjs').then(m => m.default)},
    'vatavaran/index.html': {size: 20215, hash: '655dfc1ea2e78166ff584e037a63d8d99320d7834f50740d2da24be2ddcf1d7a', text: () => import('./assets-chunks/vatavaran_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
