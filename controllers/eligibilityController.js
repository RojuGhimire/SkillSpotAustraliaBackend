const Eligibility = require('../model/Eligibility');

// get all eligibility entries
const getAllEligibility = async (req, res) => {
    const eligibilities = await Eligibility.find();

    if (!eligibilities) return res.status(204).json({ 'error': 'Eligibilities not found' });

    res.json(eligibilities);
}

// create new eligibility
const createNewEligibility = async (req, res) => {
    const { firstname, lastname, email, contact, industry, reqQualification, expYears, expPlace, state, formalQualification, questions, agreeToTerms } = req.body;

    if (!firstname || !lastname || !email || !contact || !industry || !reqQualification || !expYears || !expPlace || !state || !formalQualification || !agreeToTerms) res.json({ 'error': 'All fields are required to be filled' });

    try {
        const result = await Eligibility.create({
            'fullname': {
                'firstname': firstname,
                'lastname': lastname
            },
            'email': email,
            'contact': contact,
            'industry': industry,
            'reqQualification': reqQualification,
            'expYears': expYears,
            'expPlace': expPlace,
            'state': state,
            'formalQualification': formalQualification,
            'questions': questions,
            'agreeToTerms': agreeToTerms
        });

        console.log(result);
        res.status(201).json({ 'success': 'Eligibility Test Complete. Thank You !!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'error': err.message });
    }
}

// delete eligibilities
const deleteEligibility = async (req, res) => {
    const { id } = req.body;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const eligibility = await Eligibility.findOne({ _id: id }).exec();

    if (!eligibility) return res.status(204).json({ 'error': 'Eligibility not found' });

    const result = await Eligibility.deleteOne({ _id: id });
    res.json(result);
}

const getEligibility = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ 'error': 'Id required' });

    const eligibility = await Eligibility.findOne({ _id: id }).exec();

    if (!eligibility) return res.status(204).json({ 'error': 'Eligibility not found' });

    res.json(eligibility);
}

module.exports = {
    getAllEligibility,
    createNewEligibility,
    deleteEligibility,
    getEligibility
}