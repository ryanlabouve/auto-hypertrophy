import DS from 'ember-data';
const {Model} = DS;

export default Model.extend({
  setNumber: DS.attr('number'),
  weight: DS.attr('number'),
  repsLow: DS.attr('number'),
  repsHigh: DS.attr('number'),
  rpe: DS.attr('number'),

  exercise: DS.belongsTo(),
  loggedExercise: DS.belongsTo(),
});
