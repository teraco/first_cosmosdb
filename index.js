require('dotenv').config();
const CosmosClient = require('@azure/cosmos').CosmosClient;

const endpoint = process.env.NODEJS_endpoint;
const masterKey = process.env.NODEJS_primaryKey;
const databaseId = process.env.NODEJS_database_id;
const containerId = process.env.NODEJS_container_id;

const client = new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } });

const HttpStatusCodes = { NOTFOUND: 404 };

// 日付計算
const now = new Date();
const datetime = (now.getFullYear() + "-"  + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + "-" + now.getMinutes());

  // DB用JSON作成
const itembodyjson = {
  "myitem": {
    "id": `test-${datetime}`,
    "remaindatavolume": `12345`,
    "remaindatavolumeperday": `500`
  }
};

// メインロジック

(async () => {

  // Create data if it does not exist
  async function createItem(itemBody) {
    try {
        // read the item to see if it exists
        const { item } = await client.database(databaseId).container(containerId).item(itemBody.id).read();
        console.log(`Item with id ${itemBody.id} already exists\n`);
    }
    catch (error) {
      // create the data if it does not exist
      if (error.code === HttpStatusCodes.NOTFOUND) {
          const { item } = await client.database(databaseId).container(containerId).items.create(itemBody);
          console.log(`Created data with id:\n${itemBody.id}\n`);
      } else {
          throw error;
      }
    }
  };

  // Exit the app with a prompt
  function exit(message) {
    console.log(message);
  }

  createItem(itembodyjson.myitem)
    .then(() => { exit(`Completed successfully`); })
    .catch((error) => { exit(`Completed with error ${JSON.stringify(error)}`) });
  

})(); // 最後の()は定義した関数の即時実行
