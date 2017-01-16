import test from 'ava';

import { dirty } from './git';

test('Git lib', async t => {
  const isDirty = await dirty();
  t.false(isDirty);
});
