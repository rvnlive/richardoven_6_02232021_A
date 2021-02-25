const Sauce = require('../models/sauce')
const fs = require('fs')
const jwt = require('jsonwebtoken')

exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  req.body.sauce = JSON.parse(req.body.sauce)
  const sauce = new Sauce({
    name: req.body.sauce.name,
    manufacturer: req.body.sauce.manufacturer,
    description: req.body.sauce.description,
    mainPepper: req.body.sauce.mainPepper,
    imageUrl: url + '/images/' + req.file.filename,
    heat: req.body.sauce.heat,
    likes: req.body.sauce.likes,
    dislikes: req.body.sauce.dislikes,
    usersLiked: req.body.sauce.usersLiked,
    usersDisliked: req.body.sauce.usersDisliked
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
  let sauce = new Sauce({ _id: req.params._id })
  if (req.file) {
    const url = req.protocol + '://' + req.get('host')
    req.body.sauce = JSON.parse(req.body.sauce)
    sauce = {
      _id: req.params.id,
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      imageUrl: url + '/images/' + req.file.filename,
      heat: req.body.sauce.heat,
      likes: req.body.sauce.likes,
      dislikes: req.body.sauce.dislikes,
      usersLiked: req.body.sauce.usersLiked,
      usersDisliked: req.body.sauce.usersDisliked
    }
  } else {
    sauce = {
      _id: req.params.id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      mainPepper: req.body.mainPepper,
      imageUrl: req.body.imageUrl,
      heat: req.body.heat,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      usersLiked: req.body.usersLiked,
      usersDisliked: req.body.usersDisliked
    }
  }
  Sauce.updateOne({ _id: req.params.id }, sauce).then(
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
