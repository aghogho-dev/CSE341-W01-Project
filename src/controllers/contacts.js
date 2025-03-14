const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db("W01_Project").collection("Contacts").find();
    result.toArray()
        .then((contacts) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(contacts);
        });
};

const getOne = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db("W01_Project").collection("Contacts").findOne({ _id: userId });

    console.log(result);
    if (result === null) {
        return res.status(404).json({error: "No contact found"});
    }
   
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
   
};


const create = async (req, res) =>  {
    const newContact = req.body;

    if (Object.keys(newContact).length === 0) {
        return res.status(400).json({error: "No data for new contact"});
    }

    const result = await mongodb.getDatabase().db("W01_Project").collection("Contacts").insertOne(newContact);

    if (result.acknowledged) {
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(
            {
                _id: result.insertedId,
                ...newContact
            }
        );
    } else {
        res.status(500).json(response.error || "Error creating contact");
    }
}

const update = async (req, res) => {

    const userId = ObjectId.createFromHexString(req.params.id);
    const updatedContact = req.body;

    if (Object.keys(updatedContact).length === 0) {
        return res.status(400).json({error: "No data to update"});
    }

    const result = await mongodb.getDatabase().db("W01_Project").collection("Contacts").updateOne({ _id: userId }, { $set: updatedContact });

    if (result.matchedCount === 0) {
        return res.status(400).json({error: "No contact matched the id you want to update"});
    }

    res.status(200).json({message: "Contact updated successfully"});
}

const remove = async (req, res) => {

    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db("W01_Project").collection("Contacts").deleteOne({ _id: userId});

    if (result.deletedCount === 0) {
        return res.status(400).json({error: "No contact matched the id you want to delete"});
    }

    res.status(200).json({message: "Contact deleted successfully"});
}



module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}