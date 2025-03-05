import { PinataSDK } from "pinata-web3";
import dotenv from "dotenv";

dotenv.config();

const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT,
    pinataGateway: process.env.PINATA_GATEWAY
});
  

export default async function uploadImageController(req, res) {
    try {
        if (req.file){
            const cid = await uploadImageFileToIPFS(req.file);
            res.status(200).send(cid);

        } else {
            res.status(400).send('No file uploaded');
        }
                
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    
        

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


