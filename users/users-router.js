const router = require("express").Router();
const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");
const userRestricted = require("../auth/user-type-restricted-middleware");

// GET all users

router.get("/users", restricted, userRestricted, (req, res) => {
  Users.findUsers()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// GET all clases

router.get("/classes", restricted, (req, res) => {
  Users.findClasses()
    .then((classes) => {
      res.status(200).json({ data: classes });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// get class by a particular filter
router.get("/classes/search", restricted, (req, res) => {
  const filter = req.body;
  console.log(filter);
  Users.findClassesBy(filter)
    .then((classes) => {
      //   console.log("user router classes", classes);
      res.status(200).json({ data: classes });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// get saved classes by client id
router.get("/classes/saved/:id", restricted, (req, res) => {
  const { id } = req.params;
  Users.findClassesSavedByUser(id)
    .then((classes) => {
      res.status(200).json({ data: classes });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// get class by id
router.get("/classes/:id", restricted, (req, res) => {
  const { id } = req.params;
  Users.findClassesById(id)
    .then((theClass) => {
      res.status(200).json({ data: theClass });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Create a new class
router.post("/classes", restricted, userRestricted, (req, res) => {
  const newclass = req.body;
  Users.addClass(newclass)
    .then((added) => {
      res.status(201).json({ data: added });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// Save a Class to a specific user (id)
router.post("/classes/:user_id/save/:class_id", restricted, (req, res) => {
  const userId = req.params.user_id;
  const classesId = req.params.class_id;
  const save_class_details = { userId, classesId };
  Users.saveClassToUser(save_class_details)
    .then((saved) => {
      res.status(201).json({ data: saved });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// update class by id

router.put("/classes/:id", restricted, userRestricted, (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  Users.findClassesById(id)
    .then((classes) => {
      if (classes) {
        Users.updateClass(changes, id).then((changed) => {
          res.status(200).json({ updated: changed });
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })

    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// delete a class by id

router.delete("/classes/:id", restricted, userRestricted, (req, res) => {
  const { id } = req.params;
  Users.deleteClass(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// delete user by id

router.delete("/users/:id", restricted, userRestricted, (req, res) => {
  const { id } = req.params;
  Users.deleteUser(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// remove a class from saved using class_id
router.delete("/classes/:user_id/save/:class_id", restricted, (req, res) => {
  const saved_details = req.params;
  Users.deleteSavedClass(saved_details)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "user doesn't currently have that class saved" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
