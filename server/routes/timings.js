const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const timingSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  timings: [
    {
      "date": { type: String, required: true },
      "sleeptime": { type: String, required: true },
      "waketime": { type: String, required: true },
      "duration": { type: String, required: true }
    }
  ]
})

const timing = mongoose.model('Timings', timingSchema);

router.get('/', async (req, res) => {
  const username = req.body.username
  const result = await timing.find({ Username: username });
  res.send(result);
})

function calculateDuration(sleepTimeStr, wakeTimeStr, sleepDateStr, wakeDateStr) {
  if (!sleepDateStr) {
    console.log('hi')
    sleepDateStr = wakeDateStr
  }

  let durationMs;
  console.log(wakeTimeStr, sleepTimeStr, wakeDateStr, sleepDateStr)
  const combinedWakeDateTimeStr = `${wakeDateStr}T${wakeTimeStr}:00Z`
  const combinedSleepDateTimeStr = `${sleepDateStr}T${sleepTimeStr}:00Z`

  const wakeDateTime = new Date(combinedWakeDateTimeStr);
  const sleepDateTime = new Date(combinedSleepDateTimeStr);
  // 2023-06-22T15:30:00.000Z 2023-06-22T13:00:00.000Z
  console.log(wakeDateTime, sleepDateTime)
  if (sleepDateTime > wakeDateTime) {
    durationMs = sleepDateTime - wakeDateTime
  } else if (sleepDateTime < wakeDateTime) {
    durationMs = wakeDateTime - sleepDateTime
  }

  let durationMinutes = Math.floor(durationMs / 60000);
  let hours = Math.floor(durationMinutes / 60);
  let minutes = durationMinutes % 60;

  console.log(`HOURS : ${hours}, MINUTES : ${minutes}`)
  const timeString = `${hours} : ${minutes}`
  return timeString
}

router.post('/', async (req, res) => {

  const sleepTimeStr = req.body.st.slice(0, -3)
  const wakeTimeStr = req.body.wt.slice(0, -3)
  let sleepDateStr = req.body.stdate
  const wakeDateStr = req.body.wtdate
  const timeString = calculateDuration(sleepTimeStr, wakeTimeStr, sleepDateStr, wakeDateStr)


  const username = req.body.username;

  const newTiming = {
    date: wakeDateStr,
    sleeptime: sleepTimeStr,
    waketime: wakeTimeStr,
    duration: timeString
  };

  const timingDoc = await timing.findOne({ Username: username });

  if (!timingDoc) {
    // User doesn't exist, create a new document with the username and timings
    const newTimingDoc = new timing({
      Username: username,
      timings: [newTiming],
    });
    const newTime = await newTimingDoc.save()
    if (!newTime) {
      console.error(saveErr);
      return;
    }

    console.log('New timing object added:', newTime);
    res.send(newTime);

  }
  else {
    // User exists, push the new timing object to the timings array
    timingDoc.timings.push(newTiming);

    const result = await timingDoc.save()
    if (!result) {
      console.error(saveErr);
      return;
    }

    console.log('New timing object added:', result);
    res.send(result);
  }
});


module.exports = router;