import { defineRule } from 'vee-validate';
// import { required, email, min } from '@vee-validate/rules';

import * as rules from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
  Object.keys(rules)
    .filter((k) => k !== 'default')
    .forEach((rule) => {
      defineRule(rule, (rules as Record<string, any>)[rule]);
    });
});
