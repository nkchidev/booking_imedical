import DoctorService from "../services/DoctorService";

let getTopDoctorHome = async (req, res) => {
    let limit = req.body.limit;
    if(!limit) limit = 10;
    try {
        let response = await DoctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server ....'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let data = await DoctorService.getAllDoctors();
        return res.status(200).json(data);
    } catch (error) {
        return res.state(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let postInfoDoctor = async (req, res) => {
    try {
        let response = await DoctorService.saveDetailInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let info = await DoctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(info);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}


module.exports = {
    getTopDoctorHome,
    getDetailDoctorById,
    postInfoDoctor,
    getAllDoctors
}