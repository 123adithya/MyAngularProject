
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
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
    'index.csr.html': {size: 4982, hash: 'c7877cfe4d3e717829dfabe58df7141ef54542736fecd5f9a45ab0c9c00b5130', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1081, hash: '4b7841cf26799869614ce72a7bdb6d331cb106e046fde0017933fec6fd645f06', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'MyAngularProject/vatavaran/index.html': {size: 18881, hash: '75512ca71cc0d4e9e7dc8fbaa903c7d788e27436e812a9cda2a414992879069d', text: () => import('./assets-chunks/MyAngularProject_vatavaran_index_html.mjs').then(m => m.default)},
    'MyAngularProject/counter/index.html': {size: 13910, hash: '190517b9f3017907d04239f762cc55c65a2dd082cba010aebdafe746e6a66192', text: () => import('./assets-chunks/MyAngularProject_counter_index_html.mjs').then(m => m.default)},
    'styles-DZ6UBGXD.css': {size: 231612, hash: 'B2Fy9V+bfZo', text: () => import('./assets-chunks/styles-DZ6UBGXD_css.mjs').then(m => m.default)}
  },
};
