import SpecialtyServicer from "../services/SpecialtyService";

let createNewSpecialty = async (req, res) => {
    try {
        let infor = await SpecialtyServicer.createSpecialty(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        });
    }
}

module.exports = {
    createNewSpecialty
}