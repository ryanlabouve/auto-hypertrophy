import DS from 'ember-data';
const {belongsTo, attr, hasMany} = DS;

export default DS.Model.extend({
  exercise: belongsTo('exercise', {async: false}),
  loggedSession: belongsTo('logged-session'),
  weight: attr('number'),
  name: attr('string'),
  completed: attr('boolean'),
  skipped: attr('boolean'),
  failed: attr('boolean'),
  loggedExerciseHistory: hasMany('logged-exercises'),
  loggedSets: hasMany('logged-sets', {async: false}),
});
