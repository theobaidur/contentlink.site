import { WithBreakPipe } from './with-break.pipe';

describe('WithBreakPipe', () => {
  it('create an instance', () => {
    const pipe = new WithBreakPipe();
    expect(pipe).toBeTruthy();
  });
});
