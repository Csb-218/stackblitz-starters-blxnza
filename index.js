const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

// data
let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];

app.get('/', (req, res) => {
  res.send('Welcome to Fitness Tracker');
});

// Endpoint 1: Add an Activity
// <http://localhost:3000/activities/add?activityId=4&type=Walking&duration=20&caloriesBurned=150>

app.get('/activities/add', (req, res) => {
  const { activityId, type, duration, caloriesBurned } = req.query;

  try {
    let newActivity = {
      activityId: activityId,
      type: type,
      duration: duration,
      caloriesBurned: caloriesBurned,
    };

    activities.push(newActivity);

    res.status(200).json({
      activities: activities,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 2: Sort Activities by Duration
// <http://localhost:3000/activities/sort-by-duration>

app.get('/activities/sort-by-duration', (req, res) => {
  const { activityId, type, duration, caloriesBurned } = req.query;

  try {
    let sortedByActivities = activities.sort(
      (activity1, activity2) => activity1.duration - activity2.duration
    );

    res.status(200).json({
      activities: sortedByActivities,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 3: Filter Activities by Type
// <http://localhost:3000/activities/filter-by-type?type=Running>

app.get('/activities/filter-by-type', (req, res) => {
  const { type } = req.query;

  try {
    let filterActivities = activities.filter(
      (activity) => activity.type === type
    );

    res.status(200).json({
      activities: filterActivities,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 4: Calculate Total Calories Burned
// <http://localhost:3000/activities/total-calories>

app.get('/activities/total-calories', (req, res) => {
  const { type } = req.query;

  try {
    function getSum(total, product) {
      return total + parseFloat(product.caloriesBurned);
    }

    let totalCalories = parseFloat(activities.reduce(getSum, 0));

    res.status(200).json({
      totalCalories: totalCalories,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 5: Update Activity Duration by ID
// <http://localhost:3000/activities/update-duration?activityId=1&duration=35>

app.get('/activities/update-duration', (req, res) => {
  const { activityId, duration } = req.query;

  try {
    let activity = activities.find(
      (activity) => activity.activityId === parseFloat(activityId)
    );

    activity.duration = duration;

    let activityIndex = activities.find(
      (activity) => activity.activityId === parseFloat(activityId)
    );

    activities[activityIndex] = activity;

    res.status(200).json({
      activities: activities,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 6: Delete Activity by ID
// <http://localhost:3000/activities/delete?activityId=2>

app.get('/activities/delete', (req, res) => {
  const { activityId } = req.query;

  try {
    let deletedActivities = activities.filter(
      (activity) => activity.activityId !== parseFloat(activityId)
    );

    activities = deletedActivities;

    res.status(200).json({
      activities: activities,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

// Endpoint 7: Delete Activities by Type
// <http://localhost:3000/activities/delete-by-type?type=Running>

app.get('/activities/delete-by-type', (req, res) => {
  const { type } = req.query;

  try {
    let deletedActivities = activities.filter(
      (activity) => activity.type !== type
    );

    activities = deletedActivities;

    res.status(200).json({
      activities: activities,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
