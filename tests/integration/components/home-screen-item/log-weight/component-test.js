import {module, skip} from 'qunit';
import {setupRenderingTest} from 'ember-qunit';
import {render} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | home-screen-item/log-weight', function(
  hooks,
) {
  setupRenderingTest(hooks);

  skip('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{home-screen-item/log-weight}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#home-screen-item/log-weight}}
        template block text
      {{/home-screen-item/log-weight}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
