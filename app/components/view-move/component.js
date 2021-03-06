import Component from '@ember/component';
import {computed, get, set} from '@ember/object';
import {task, timeout} from 'ember-concurrency';
import {inject as service} from '@ember/service';
import EXERCISE_MAP from 'autofitplan/utils/exercise-map';
import {assert} from '@ember/debug';
import fade from 'ember-animated/transitions/fade';

const SAVE_DELAY = 800;

export default Component.extend({
  store: service(),

  transition: fade,

  showSets: true,
  showHistory: false,

  loggedExerciseService: service('logged-exercise'),
  rawExercise: computed('exercise.code', function() {
    let code = get(this, 'exercise.code');
    let rawExercise = EXERCISE_MAP[code];

    assert(`We find an exercise for ${code}`, rawExercise);

    return rawExercise;
  }),

  updateDefaultLoggedExerciseNameIfBlank() {
    let loggedExercise = get(this, 'loggedExercise');

    if (!loggedExercise.get('name')) {
      let name =
        get(this, 'rawExercise.exercises.firstObject.name') ||
        get(this, 'name');
      loggedExercise.set('name', name);
    }
  },

  didInsertElement() {
    set(
      this,
      'selectedExercise',
      get(this, 'rawExercise.exercises.firstObject'),
    );

    // TODO handle this in a more sophisticated way on the backend
    this.updateDefaultLoggedExerciseNameIfBlank();
  },

  name: computed('exercise.code', function() {
    return get(this, 'rawExercise').name;
  }),

  updateLoggedExercise: task(function*(loggedExercise, weight) {
    yield timeout(SAVE_DELAY);
    yield get(this, 'loggedExerciseService').updateLoggedExercise(
      loggedExercise,
      {
        weight,
      },
    );
  }).restartable(),

  updateLoggedExerciseName: task(function*(name) {
    yield timeout(SAVE_DELAY);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('name', name);
      yield loggedExercise.save();
    }
  }),

  completeLoggedExercise: task(function*() {
    yield timeout(10);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('completed', true);
      loggedExercise.set('failed', false);
      loggedExercise.set('skipped', false);
      yield loggedExercise.save();
    }
  }),

  skipLoggedExercise: task(function*() {
    yield timeout(10);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('completed', false);
      loggedExercise.set('failed', false);
      loggedExercise.set('skipped', true);
      yield loggedExercise.save();
    }
  }),

  failLoggedExercise: task(function*() {
    yield timeout(10);
    let loggedExercise = get(this, 'loggedExercise');
    if (loggedExercise) {
      loggedExercise.set('completed', false);
      loggedExercise.set('failed', true);
      loggedExercise.set('skipped', false);
      yield loggedExercise.save();
    }
  }),

  color: computed('loggedExercise.{completed,skipped,failed}', function() {
    if (get(this, 'loggedExercise.completed') === true) {
      return 'green';
    }

    if (get(this, 'loggedExercise.failed') === true) {
      return 'red';
    }

    if (get(this, 'loggedExercise.skipped') === true) {
      return 'yellow';
    }
  }),
});
