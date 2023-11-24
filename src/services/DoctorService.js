import db from "../models/index";

let getTopDoctorHome = (limit) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    {model : db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model : db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })

        } catch (error) {
            reject(error)
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {roleId: 'R2'}
            });

            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    });
}

let saveDetailInfoDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.doctorId || !data.contentHTML || !data.contentMarkdown || !data.action) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                });
            }else{
                if (data.action === 'CREATE'){
                    await db.Markdown.create({
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        description: data.description,
                        doctorId: data.doctorId
                    })
                }else if (data.action === 'EDIT'){
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: data.doctorId},
                        raw: false
                    })
                    
                    if(doctorMarkdown){
                        doctorMarkdown.contentHTML= data.contentHTML;
                        doctorMarkdown.contentMarkdown= data.contentMarkdown;
                        doctorMarkdown.description= data.description;
                        await doctorMarkdown.save()
                    }
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save info doctor succeed!'
                })
            }
        }
        catch(e){
            reject(e);
        }
    });
}

let getDetailDoctorById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!id){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                });
            }else{
                let data = await db.User.findOne({
                    where: {
                        id: id
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })

                if(data && data.image){
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if(!data) data = {};

                resolve({
                    errCode: 0,
                    data: data
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    getTopDoctorHome,
    getDetailDoctorById,
    saveDetailInfoDoctor,
    getAllDoctors
}