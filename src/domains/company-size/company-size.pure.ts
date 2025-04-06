export const projectCompanySizeLabel = (tag: string) => {
  switch (tag) {
    case 'solo':
    default:
      return '1';
    case 'small_team':
      return '2 ~ 10';
    case 'mid_team':
      return '11 ~ 50';
    case 'large_team':
      return '51 ~ 200';
    case 'enterprise':
      return '201+';
  }
};
