export const closeInlineEditor = () => {
  $(document)
    .mouseup(e => {
      const container = $('.form-field-input-wrapper:visible').parents('form-inline-editor');

      if (!container.is(e.target)
       && !container.has(e.target).length) {
        $('.form-field-input-wrapper:visible')
          .hide()
          .trigger('hidden.inline-editor');
      }
  });
};
