import TaskTwo from '../modules/TaskTwo';

test('test new TaskTwo element', () => {
  const expected = 'test';
  const received = new TaskTwo(expected);

  expect(received.element).toEqual(expected);
});
