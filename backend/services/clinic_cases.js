const clinicCaseModel = require('../storage/models/clinic_case.model');
const awsService = require('./aws');
const questionModel = require('../storage/models/question.model');
const answerModel = require('../storage/models/answer.model');

async function get() {
    const clinicCases = await clinicCaseModel.findAll();
    return clinicCases
}

async function createFull(clinicCase) {
    if(clinicCase.image) {
        clinicCase.image = await awsService.uploadImage(clinicCase.image);
    }
    clinicCase.questions.map(async question => {
        if(question.image) {
            console.log("question image", question.image);
            question.image = await awsService.uploadImage(question.image);
        }
        question.answers.map(async answer => {
            if(answer.image) {
                console.log("answer image", answer.image);
                answer.image = await awsService.uploadImage(answer.image);
            }
        });
    });
    const clinicCaseResponse = await clinicCaseModel.create({
        subcategory_id: clinicCase.subcategory_id,
        name: clinicCase.name,
        description: clinicCase.description,
        image: clinicCase.image,
        is_spanish: clinicCase.is_spanish,
        questions: clinicCase.questions
    }, { include: [{model: questionModel, include: [answerModel]}] });

    return clinicCaseResponse
}

async function questionsByClinicCase(id) {
    const clinicCase = await clinicCaseModel.findOne({ 
        where: { id: id },
        include: 'questions',
    });
    return clinicCase
}

module.exports = {
    get,
    questionsByClinicCase,
    createFull,
}