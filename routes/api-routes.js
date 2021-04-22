const router = require("express").Router();
const Workout = require("../models/workout.js");


// Route to get the latest workout
router.get('/api/workouts', (req, res) => {
    // Using aggregate
    Workout.aggregate([
        
    ])
        .then(getWorkouts => {
            res.json(getWorkouts)
        })
        .catch(err => {
            res.status(400).json(err)
        });
})

//routes
// update and continue current workout
router.put('/api/workouts/:id', (req, res) => {
    // grab the id from body 
    let id = req.params.id
    let body = req.body
    // find and update by the ID, pushes the req.body into the specified document
    Workout.findByIdAndUpdate(
        id,
        { $push: { exercises: body } },
        // Returns the object with the information you just added
        { new: true },
    )
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
})

// add new workout
router.post('/api/workouts/', (req, res) => {
    Workout.create({
        day: Date.now()
    })
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// get the last 7 days for the dashboard
router.get('/api/workouts/range', (req, res) => {
    Workout.find({}).sort({ _id: -1 }).limit(7)
        .then(rangeData => res.json(rangeData))
        .catch(err => res.status(400).json(err))
})

module.exports = router;