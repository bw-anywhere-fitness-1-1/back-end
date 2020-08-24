
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        {name: "Aerobics" , type: 'body-Weight', startTime: '4:30pm', classDate: '8/27/2020', duration: '30 minutes',intensityLevel: 1, location: 'Redwood Park', currentRegistered: 6, maxClassSize: 25, Instructor: 'Andrew', Gender: 'Male'  },
        {name: "Yin Yoga" , type: 'Yoga', startTime: '7:30 am', classDate: '8/24/2020', duration: '60 minutes',intensityLevel: 2, location: 'Joeseph Memorial Community Center', currentRegistered: 15, maxClassSize: 25, Instructor: 'Damon', Gender: 'Male'  },
        {name: "Power Hour" , type: 'weightlifting', startTime: '6:30pm', classDate: '8/21/2020', duration: '45 minutes',intensityLevel: 3, location: 'Redwood Park', currentRegistered: 24, maxClassSize: 25, Instructor: 'Kelly', Gender: 'Female' },
        {name: "Power Hour" , type: 'weightlifting', startTime: '6:30pm', classDate: '8/23/2020', duration: '45 minutes',intensityLevel: 3, location: 'Redwood Park', currentRegistered: 24, maxClassSize: 25, Instructor: 'Kelly', Gender: 'Female' },
        {name: "Power Hour" , type: 'weightlifting', startTime: '6:30pm', classDate: '8/25/2020', duration: '45 minutes',intensityLevel: 3, location: 'Redwood Park', currentRegistered: 24, maxClassSize: 25, Instructor: 'Kelly', Gender: 'Female' },
        {name: "Yin Yoga" , type: 'Yoga', startTime: '7:30 am', classDate: '8/27/2020', duration: '60 minutes',intensityLevel: 2, location: 'Joeseph Memorial Community Center', currentRegistered: 15, maxClassSize: 25, Instructor: 'Damon', Gender: 'Male'  },
        {name: "Yin Yoga" , type: 'Yoga', startTime: '7:30 am', classDate: '8/28/2020', duration: '60 minutes',intensityLevel: 2, location: 'Joeseph Memorial Community Center', currentRegistered: 15, maxClassSize: 25, Instructor: 'Damon', Gender: 'Male'  },
        {name: "Aerobics" , type: 'body-Weight', startTime: '4:30pm', classDate: '9/01/2020', duration: '30 minutes',intensityLevel: 1, location: 'Redwood Park', currentRegistered: 6, maxClassSize: 25, Instructor: 'Andrew', Gender: 'Male'  },
        {name: "Breathe Work and Meditation" , type: 'meditation', startTime: '5:30am', classDate: '8/27/2020', duration: '30 minutes',intensityLevel: 1, location: 'Newport Park', currentRegistered: 24, maxClassSize: 25, Instructor: 'Amy', Gender: 'Female'  },
        {name: "Breathe Work and Meditation" , type: 'meditation', startTime: '5:30am', classDate: '8/28/2020', duration: '30 minutes',intensityLevel: 1, location: 'Newport Park', currentRegistered: 24, maxClassSize: 25, Instructor: 'Amy', Gender: 'Female'  },
  
  
  
      ]);
    });
};

