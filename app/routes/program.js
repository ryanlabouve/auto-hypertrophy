import Route from '@ember/routing/route';
import programs from 'auto-hypertrophy/utils/programs';

export default Route.extend({
  model({slug}) {
    let program = programs.find(program => {
      return program.slug === slug;
    });

    return {
      programs,
      program,
    };
  },
});
