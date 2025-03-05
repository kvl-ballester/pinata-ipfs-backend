import { PinataSDK } from "pinata-web3";
import dotenv from "dotenv";

dotenv.config();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY
});

export default async function uploadMetadataController(req, res) {
    const data = req.body;

    try {
        const filename = changeExtension(data.name, "json");

        const json_uploaded = await pinata.upload
        .json(data)
        .addMetadata({
            name: filename
        })
        console.log(json_uploaded);

        await pinata.groups.addCids({
            groupId: process.env.PINATA_GROUP_ID,
            cids: [json_uploaded.IpfsHash]
        });

        res.send(json_uploaded.IpfsHash);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

}


function changeExtension(filename, extension) {
    const name = filename.split(".");
    name.pop();
    name.push(extension)

    return name.join(".");
    
}