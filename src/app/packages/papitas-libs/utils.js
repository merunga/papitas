UI.registerHelper('Session', function() {
  return Session;
});

UI.registerHelper('timer', function(seconds) {
  return moment.utc(moment.duration(seconds,'seconds').asMilliseconds()).format("HH:mm:ss");
});
