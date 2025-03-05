# pinata-ipfs-backend

Express server to upload content to a pinata cloud server:

Available endpoints
- /image: to upload an image given an image buffer attached in req.file
- /metadata: to upload a json, it treats req.body as the json to be uploaded to the ipfs pinata server

## pinata env variables

- PINATA_JWT: authorization token
- PINATA_GATEWAY: pinata server name
- PINATA_GROUP_ID: group id to store in there all content generated here.
