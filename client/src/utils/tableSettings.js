export const sharedOnCell = (_, index) => {
    if (index === -1) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };