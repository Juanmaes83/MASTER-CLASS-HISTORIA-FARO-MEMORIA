module.exports={
  testDir:'./tests',
  timeout:120000,
  workers:1,
  fullyParallel:false,
  use:{baseURL:'http://127.0.0.1:4173',headless:true,screenshot:'only-on-failure'},
  reporter:[['list'],['html',{outputFolder:'playwright-report',open:'never'}]]
};
