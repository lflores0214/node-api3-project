const express = require("express");
const User = require("./userDb");
const Post = require("../posts/postDb")
const router = express.Router();

// router.use(express.json())
router.post("/", validateUser, (req, res) => {
  // do your magic!
  const body = req.body;
  const id = req.params.id;
  req.body.user_id = id;
  User.insert(body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log.apply(error);
      res.status(500).json({
        errorMessage: "error adding user"
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const body = req.body;
  Post.insert(body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "error posting post"
    })
  })
  
});

router.get("/", (req, res) => {
  // do your magic!
  User.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "problem fetching users"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  User.getById(id).then(user => {
    res.status(200).json(user);
  });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  User.getUserPosts(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: "error fetching users posts"
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  User.remove(id)
    .then(user => {
      user
        ? res.status(200).json({
            message: `user was terminated`
          })
        : res.status(500).json({
            message: "user not found"
          });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error deleting user"
      });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const body = req.body
  User.update(id, body)
  .then(update => {
    res.status(200).json(update)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      errorMessage: "error updating user info"
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  User.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          errorMessage: "invalid user id"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "error fetching user"
      });
    });
}


function validateUser(req, res, next) {
  // do your magic!
  // const body = req.body;
  console.log(req.body);
  // if (Object.keys(req.body).length === 0)
  // Object.keys(req.body).length === 0
  !req.body
    ? res.status(400).json({
        message: "missing user data"
      })
    : !req.body.name
    ? res.status(400).json({
        message: "missing required name field"
      })
    : next();
}

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  !body
    ? res.status(400).json({ message: "missing post data" })
    : !body.text
    ? res.status(400).json({
        message: "missing required text field"
      })
    : next();
}

module.exports = router;
