const Clarifai = require('clarifai');
const version = require('./../package.json')

const app = new Clarifai.App({
    apiKey: 'e4e2f4121e05438d9993fb5f8f0f85ef'
   });

const handleApiRequest = (req, res) => {
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL, version: version})
      .then(generalModel => {
        return generalModel.predict(req.body.input);
      })
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error working with Clarifai API'));
}
const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('Error on updating counter'))
}

module.exports = {
    handleImage: handleImage,
    handleApiRequest: handleApiRequest
}