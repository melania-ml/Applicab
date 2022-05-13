export const getNumericValidation = (e) => {
  if (
    ![
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'Backspace',
      'ArrowUp',
      'ArrowDown',
      'ArrowRight',
      'ArrowLeft',
    ].includes(e.key) &&
    !e.ctrlKey
  )
    e.preventDefault();
};
