// Lets load the Sauce model
const Sauce = require('../models/sauce')
// Lets load a FileSystem
const fs = require('fs')

// Lets 'Create (POST) a sauce' with this function
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  })
  sauce.save().then(
    (sauce) => {
      res.status(201).json({
        message: 'Sauce has been created!'
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

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce)
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      })
    }
  )
}

exports.modifyTheSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body }
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }).then(
            () => {
              res.status(200).json({ message: 'Sauce has been updated!' })
            }).catch(
            (error) => {
              res.status(400).json({ error })
            })
        })
      })
      .catch((error) => { res.status(500).json({ error }) })
  } else {
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }).then(
      () => {
        res.status(201).json({
          message: 'Sauce has been updated successfully!'
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
}

exports.deleteTheSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
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
    }).catch(error => res.status(500).json({ error }))
}

exports.likeDislikeOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (req.body.like) {
        case 1:
          // If no likes
          if (!sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
              .then(() => res.status(201).json({ message: 'Sauce has been liked! :)' }))
              .catch((error) => {
                res.status(400).json({ error: error })
              })
          }
          break
        case -1:
          // If no dislikes
          if (!sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
              .then(() => res.status(201).json({ message: 'Sauce has been disliked! :(' }))
              .catch((error) => {
                res.status(400).json({ error: error })
              })
          }
          break
        case 0:
          // If there is a like, we can cancel this
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id })
              .then(() => res.status(201).json({ message: 'Like has been cancelled! :(' }))
              .catch((error) => {
                res.status(400).json({ error: error })
              })
          } else {
            // If there is dislike, then we cancel the dislike
            Sauce.updateOne({ _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id
              }).then(
              () =>
                res.status(201).json({ message: 'Dislike has been cancelled! :)' }))
              .catch(
                (error) => {
                  res.status(400).json({ error: error })
                })
          }
          break
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      })
    })
}
