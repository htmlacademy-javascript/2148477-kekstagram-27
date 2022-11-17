function onFormSubmit(form, onSuccess, onFail) {
  const formData = new FormData(form);
  fetch(
    'https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: formData,
      // headers: {
      //   'Content-Type': 'multipart/form-data;charset=utf-8'
      // },
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(onFail);
}

export {onFormSubmit};
