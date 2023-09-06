const { AptosClient } = require('aptos');

const lavaGatewayRpcUrl = 'https://g.w.lavanet.xyz:443/gateway/apt1/rest/3ea9edd53e0f2d8b1322a3580baa4755';

const aptosClient = new AptosClient({
  nodeUrl: lavaGatewayRpcUrl, 
  doNotFixNodeUrl: true,
});

async function getAccountResources(accountAdress) {
  try{
    const accountResources = await aptosClient.getAccountResources(accountAdress);
    if (accountResources) {
      console.log('Valid Response:', accountResources);
    } 
    else
    {
      console.log('Invalid Response');
    }
  }catch(error){
    console.log('Error account resources not found: ' , error);
  }
}

async function mainCheck(){
  const accountAdress = '0x58d66d14500c590f85f43780cf6d427f2da1f3e24d8ec8525ccc6f438fd46aa4';

  let validRequests = 0;
  let errors = 0;

  for(let i = 0; i < 100; i++)
  {
    try {
      await getAccountResources(accountAdress);
      validRequests++;
    }catch(error)
    {
      errors++;
    }
  }

  console.log('Valid Requests:', validRequests);
  console.log('Errors: ', errors);

}

mainCheck();
