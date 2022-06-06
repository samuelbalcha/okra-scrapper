/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
module.exports = {
  launch: {
    headless: true,
      args: [ 	
      '--disable-web-security',
      '--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials'
     ],
     browserContext: 'default'
  }
}