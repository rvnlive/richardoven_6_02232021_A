const Sauce = require('../models/sauce')
const fs = require('fs')
const expressMongoSanitize = require('express-mongo-sanitize')

exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const parsedSauce = JSON.parse(req.body.sauce)
  const sauceObject = expressMongoSanitize(parsedSauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: url + '/images/' + req.file.filename
  })
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce has been posted!'
      })
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce)
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}

exports.modifyTheSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: url + '/images/' + req.file.filename
      }
    : {
        ...req.body
      }
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }).then(
    () => {
      res.status(201).json({
        message: 'Sauce has been updated!'
      })
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}

exports.likeDislikeOneSauce = (req, res, next) => {
  const userId = req.body.userId
  const like = req.body.like
  const sauceId = req.params.id
  Sauce.findOne({
    _id: sauceId
  })
    .then(sauce => {
      const newValues = {
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked,
        likes: 0,
        dislikes: 0
      }
      switch (like) {
        case 1:
          newValues.usersLiked.push(userId)
          break
        case -1:
          newValues.usersDisliked.push(userId)
          break
        case 0:
          if (newValues.usersLiked.includes(userId)) {
            const index = newValues.usersLiked.indexOf(userId)
            newValues.usersLiked.splice(index, 1)
          } else {
            const index = newValues.usersDisliked.indexOf(userId)
            newValues.usersDisliked.splice(index, 1)
          }
          break
      };

      newValues.likes = newValues.usersLiked.length
      newValues.dislikes = newValues.usersDisliked.length
      Sauce.updateOne({
        _id: sauceId
      }, newValues)
        .then(() => res.status(200).json({
          message: 'Sauce has been rated!'
        }))
        .catch(error => res.status(400).json({
          error
        }))
    })
    .catch(error => res.status(500).json({
      error
    }))
}

exports.deleteTheSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then(
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink('images/' + filename, () => {
        Sauce.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Sauce has been deleted!'
            })
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            })
          }
        )
      })
    }
  )
}

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces)
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}
