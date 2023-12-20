import { first } from 'lodash';
import db from '../models';
require('dotenv').config();
import EmailServer from "./EmailSerivce";
import {v4 as uuidv4} from "uuid";

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
    return result;
} 

let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullname || !data.selectedGender || !data.address){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                });
            }else{
                let token = uuidv4();
                await EmailServer.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullname,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                });

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstname: data.fullname,
                        phonenumber: data.phoneNumber,
                    }
                });

                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.token || !data.doctorId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                });
            }else{
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                });

                if(appointment){
                    appointment.statusId = 'S2';
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succeed!'
                    })
                }else{
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been actived or doesn not exist'
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succeed!'
                });
            }
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    postBookAppointmentService,
    postVerifyBookAppointment
}