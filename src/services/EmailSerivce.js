import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Kim Chí - " <nguyenkimchi10112003@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend), 
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if(dataSend.language === 'vi'){
        result =   
        `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên web Booking</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận hoàn tất thủ tục đặt lịch khám bệnh.</p>
            <div>
                <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
            </div>
            <div>Xin chân thành cảm ơn</div>
        `;
    }

    if(dataSend.language === 'en'){
        result =   
        `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>Your received this email because you booked an online medical appointment</p>
            <p>Information to schedule an appointment:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.time}</b></div>
            <p>If the above information is true, please click on the link below to confirm<./p>
            <div>
                <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
            </div>
            <div>Sincerely thank</div>
        `;
    }

    return result;
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if(dataSend.language === 'vi'){
        result =   
        `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên web Booking</p>
            <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>
            <div>Xin chân thành cảm ơn</div>
        `;
    }

    if(dataSend.language === 'en'){
        result =   
        `
            <h3>Dear ${dataSend.patientName}!</h3>
            <p>Your received this email because you booked an online medical appointment</p>
            <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm./p>
            <div>Sincerely thank</div>
        `;
    }

    return result;
}

let sendAttachment = async (dataSend) => {
    console.log(dataSend);
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                  user: process.env.EMAIL_APP,
                  pass: process.env.EMAIL_APP_PASSWORD,
                },
            });
        
            const info = await transporter.sendMail({
                from: '"Kim Chí - " <nguyenkimchi10112003@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Thông tin đặt lịch khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), 
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imageBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    sendSimpleEmail,
    sendAttachment
}