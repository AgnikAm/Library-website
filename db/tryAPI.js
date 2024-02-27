var axios = require('axios');

var query = {};

var data = JSON.stringify({
  "collection": "users",
  "database": "Library",
  "dataSource": "LibraryCluster",
  "filter": query
});
            
var config = {
  method: 'post',
  url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-kfsjw/endpoint/data/v1/action/find',
  headers: {
    'Content-Type': 'application/json',
    'api-key': 'bAZWnSxxkzooB11kag6sLYmtByEWnc6G5grrAV1sUKqUmlXwbJWVAgGzwtt4GvYE',
  },
  data: data
};
            
axios(config)
  .then((response) => console.log(response.data))
  .catch((err) => console.error(err))
