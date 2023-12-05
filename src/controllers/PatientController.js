import PatientService from "../services/PatientService";

let postBookAppointment = async (req, res) => {
    try {
        let infor = await PatientService.postBookAppointmentService(req.body);
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
    postBookAppointment
}