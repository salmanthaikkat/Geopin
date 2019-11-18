const db = require('../model');

module.exports = {
  // addReview: async (req, res, next) => {
  //   const { id } = req.user;
  //   const reviewDescription = req.body.description;
  //   const reviewRating = req.body.rating;
  //   const placeName = req.body.name;
  //   const review = {
  //     user_id: id,
  //     description: reviewDescription,
  //     rating: reviewRating,
  //     placeName: req.body.name,
  //     latitude: req.body.latitude,
  //     longitude: req.body.longitude,
  //   };
  //   db.Pin.findOne(
  //     {
  //       latitude: req.body.latitude,
  //       longitude: req.body.longitude,
  //     },
  //     (err, result) => {
  //       if (result !== null) {
  //         result.reviews.push(review);
  //         result.save((err, pin) => {
  //           if (err) {
  //             res.json({ success: false, message: 'Review unsuccesfull' });
  //           } else {
  //             const user = db.User.findById(id, (err, user) => {
  //               if (err) {
  //                 res.json(err);
  //               } else {
  //                 user.visited.push(review);
  //                 user.save();
  //               }
  //             });
  //             res.json({ success: true, message: 'Review added' });

  //           }
  //         });
  //       } else {
  //         db.Pin.create(
  //           {
  //             name: placeName,
  //             latitude: req.body.latitude,
  //             longitude: req.body.longitude,
  //             reviews: review,
  //           },
  //           (err, pin) => {
  //             if (err) {
  //               res.json({ success: false, message: 'Something went wrong' });
  //             } else {
  //               const user = db.User.findById(id, (err, result) => {
  //                 if (err) {
  //                   res.json(err);
  //                 } else {
  //                   result.visited.push(review);
  //                   result.save();
  //                 }
  //               });
  //               res.json({ success: true, message: 'Review Saved' });
  //             }
  //           },
  //         );
  //       }
  //     },
  //   );
  // },
  saveReview: async (req, res, next) => {
    const { id } = req.user;
    const reviewDescription = req.body.description;
    const reviewRating = req.body.rating;
    const placeName = req.body.name;
    const created = new Date();
    const review = {
      user_id: id,
      description: reviewDescription,
      rating: reviewRating,
      placeName: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      created,
    };
    console.log(review);
    db.Pin.findOne(
      {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
      (err, result) => {
        if (result !== null) {
          result.reviews.push(review);
          result.save((err, pin) => {
            if (err) {
              res.json({ success: false, message: 'Review unsuccesfull' });
            } else {
              const user = db.User.findById(id, (err, user) => {
                if (err) {
                  res.json(err);
                } else {
                  user.visited.push(review);
                  user.save();
                }
              });
              res.json({ success: true, message: 'Review added' });
            }
          });
        } else {
          db.Pin.create(
            {
              name: placeName,
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              reviews: review,
            },
            (err, pin) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong' });
              } else {
                const user = db.User.findById(id, (err, result) => {
                  if (err) {
                    res.json(err);
                  } else {
                    result.visited.push(review);
                    result.save();
                  }
                });
                res.json({ success: true, message: 'Review Saved' });
              }
            },
          );
        }
      },
    );
  },
  // Get logged-in user review
  getUserReviews: async (req, res, next) => {
    const { id } = req.user;
    db.User.findById(id).exec((err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  },
  // Get specific location review
  getLocationReviews: async (req, res, next) => {
    const { latitude, longitude } = req.body;
    db.Pin.find({ latitude, longitude })
      .populate('reviews.user_id')
      .exec((err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
  },
  // Get Other users reviews
  getOtherUserReviews: async (req, res, next) => {
    const { id } = req.body;
    db.User.findById(id).exec((err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
  },
  // Post search API
  // getPostDetails: async (req,res,next)=>{
  //   const {id} = req.user;
  //   const {keyowrd} = req.body;
  //   db.User.findById(id)

  // }
};
