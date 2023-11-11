import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

describe('button-v0-to-v1', () => {
  defineTest(__dirname, 'button-v0-to-v1', open, 'button-v0-to-v1', { parser: 'tsx' });
});
