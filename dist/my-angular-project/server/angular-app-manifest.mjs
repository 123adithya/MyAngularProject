
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/counter",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/counter"
  },
  {
    "renderMode": 2,
    "route": "/vatavaran"
  }
],
  assets: {
    'index.csr.html': {size: 4965, hash: 'beb9d1d96c88de204f975c70ed7c4cc1ba4061e3be0eeb60405382342dfafd13', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1064, hash: 'b5c43f52f27b1290ed6c06869de6e12f4e4a99a5be6af208544830902a4d76d5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'counter/index.html': {size: 13859, hash: '9e483dabde48aef67dcea0c648868575c5a5e5475d76fbc027a144f49ef8e297', text: () => import('./assets-chunks/counter_index_html.mjs').then(m => m.default)},
    'vatavaran/index.html': {size: 18830, hash: 'c0fa663bf38d6a37304e5d13e7e9049076dedfd1a434869860ff097cf4a74358', text: () => import('./assets-chunks/vatavaran_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
