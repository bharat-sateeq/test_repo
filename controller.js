const { BlobServiceClient } = require("@azure/storage-blob");
const REACT_APP_STORAGESASTOKEN ;
const Doc = require("./doc.model");
const fs = require('fs');

const containerName = `demo`;
const storageAccountName = "sateeqweb";

const checkIfExists = async (fileName) => {
    const blobServiceClient = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net/?${REACT_APP_STORAGESASTOKEN}`
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    return await blockBlobClient.exists();
}
function printProgress(current, total) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${current}/${total}`);
}

const getList = async () => {

    const list = await Doc.find({}).lean();
    let newList = [];

    // list.forEach(async (item) => {
    //     const adhaarCardFrontCheck = await checkIfExists(item.adhaarCardFront);
    //     const adhaarCardBackCheck = await checkIfExists(item.adhaarCardBack);
    //     const panCardCheck = await checkIfExists(item.panCard);
    //     const identityProofCheck = await checkIfExists(item.identityProof);
    //     const proofOfResidenceCheck = await checkIfExists(item.proofOfResidence);
    //     const passportSizePhotoCheck = await checkIfExists(item.passportSizePhoto);
    //     if (adhaarCardFrontCheck && adhaarCardBackCheck && panCardCheck && identityProofCheck && proofOfResidenceCheck && passportSizePhotoCheck) {
    //         //Do nothing if all exists
    //         // console.log("Don nothing");
    //     } else {
    //         const newObject = {
    //             ...item,
    //             adhaarCardFrontCheck,
    //             adhaarCardBackCheck,
    //             panCardCheck,
    //             identityProofCheck,
    //             proofOfResidenceCheck,
    //             passportSizePhotoCheck
    //         }
    //         newList(newObject);
    //     }
    // })

    let count = 0;
    let length = list.length;

    for await (const item of list) {
        const adhaarCardFrontCheck = await checkIfExists(item.adhaarCardFront);
        const adhaarCardBackCheck = await checkIfExists(item.adhaarCardBack);
        const panCardCheck = await checkIfExists(item.panCard);
        const identityProofCheck = await checkIfExists(item.identityProof);
        const proofOfResidenceCheck = await checkIfExists(item.proofOfResidence);
        const passportSizePhotoCheck = await checkIfExists(item.passportSizePhoto);
        if (adhaarCardFrontCheck && adhaarCardBackCheck && panCardCheck && identityProofCheck && proofOfResidenceCheck && passportSizePhotoCheck) {
            //Do nothing if all exists
            // console.log("Don nothing");
        } else {
            const newObject = {
                ...item,
                adhaarCardFrontCheck,
                adhaarCardBackCheck,
                panCardCheck,
                identityProofCheck,
                proofOfResidenceCheck,
                passportSizePhotoCheck
            }
            newList.push(newObject);
        }
        printProgress(count, length);
        count++;
    }

    return newList;

}

const mainController = async (req, res) => {
    console.log("Start ....");
    try {

        let x = await getList();
        console.log(x);
        res.json(x);

        fs.writeFile("newData.json", JSON.stringify(x), function (err) {
            if (err) {
                console.error("Error while migrating data", err);
            }
            console.log("Completed");
        });

    } catch (err) {
        console.log(err);

        res.json({ err });
    }
}

module.exports.mainController = mainController;
