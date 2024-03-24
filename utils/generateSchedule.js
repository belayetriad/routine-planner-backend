function generateSchedule( classes, availableTime, date = new Date()) { 
    // Implement logic to sort classes based on priority and deadlines
    const sortedClasses = classes.sort((a, b) => b.priority - a.priority);
  
    // Allocate study time slots for each class considering duration and available time
    const schedule = [];
    let remainingTime = availableTime;
    for (const c of sortedClasses) { 
      const allocatedTime = Math.min(remainingTime, c.duration);
      remainingTime -= allocatedTime;
      schedule.push({
        date: new Date(date),
        classSession: c._id,
        duration: allocatedTime,
      });
    }
    
    return schedule;
  }
  
  module.exports = generateSchedule;