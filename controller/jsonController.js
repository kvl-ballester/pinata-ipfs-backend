export default function uploadMetadataController() {
    const data = req.body;
    console.log(data);
    res.status(200).send(data);
}