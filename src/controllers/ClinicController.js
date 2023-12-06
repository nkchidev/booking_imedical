import ClinicService from "../services/ClinicService";

let createClinic = async (req, res) => {
    try {
        let infor = await ClinicService.createClinic(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.state(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let infor = await ClinicService.getAllClinic();
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        });
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let infor = await ClinicService.getDetailClinicById(req.query.id);
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
    createClinic,
    getAllClinic,
    getDetailClinicById
}