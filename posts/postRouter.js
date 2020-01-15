const express = require("express");
const Post = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  Post.get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching post"
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  Post.getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching post"
      });
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  Post.remove(id).then(post => {
    post
      ? res.status(200).json({
          message: "post was destroyed"
        })
      : res.status(500).json({
          message: "post not found"
        });
  });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body;
  Post.update(id, body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      errorMessage: "error updating post"
    })
  })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Post.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({
          message: "invalid post ID"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching post"
      });
    });
}

module.exports = router;
