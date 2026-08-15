import { generateProjectKey, formatTaskIdentifier } from '@/lib/utils/key-gen';

describe('Project Key Utilities', () => {
  it('generates 4-character uppercase alphanumeric keys', () => {
    expect(generateProjectKey('Mobile Application')).toBe('MOBI');
    expect(generateProjectKey('Web')).toBe('WEB');
  });

  it('formats task identifiers with hyphen', () => {
    expect(formatTaskIdentifier('PROJ', 42)).toBe('PROJ-42');
  });
});
