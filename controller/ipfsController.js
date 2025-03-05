import { PinataSDK } from "pinata-web3";
import dotenv from "dotenv";

dotenv.config();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY
});

export async function uploadImageController(req, res) {
    try {
        if (req.file){
            const cid = await uploadImageFileToIPFS(req.file);
            res.send(cid);

        } else {
            res.status(400).send('No file uploaded');
        }
                
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    
        

}


export async function uploadMetadataController(req, res) {
    const data = req.body;

    try {
        const filename = changeExtension(data.name, "json");

        const json_uploaded = await pinata.upload
        .json(data)
        .addMetadata({
            name: filename
        })

        await addToIpfsGroup(json_uploaded.IpfsHash);
        
        console.log(json_uploaded);
        res.send(json_uploaded.IpfsHash);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

}


function changeExtension(filename, extension) {
    if (!filename){
        return `file_${Date.now()}.${extension}`;
    }
    
    const name = filename.split(".");
    name.pop();
    name.push(extension)

    return name.join(".");
    
}


async function uploadImageFileToIPFS(imageFile) {

    const file = new File([imageFile.buffer], imageFile.originalname, { type: imageFile.mimetype });
    const image_uploaded = await pinata.upload.file(file);
    console.log(image_uploaded);
    await addToIpfsGroup(image_uploaded.IpfsHash);
    return image_uploaded.IpfsHash;
}


async function addToIpfsGroup(cid) {
    await pinata.groups.addCids({
        groupId: process.env.PINATA_GROUP_ID,
        cids: [cid]
    });
}