import test from 'ava';

import { dirty, version } from './git';

test('Git lib', async t => {
  const isDirty = await dirty();
  t.true(isDirty === true || isDirty === false);
});

test('Git version', async t => {
  const gitVersion = await version();
  t.truthy(gitVersion);
});
