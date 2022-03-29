export const readImage = (event) =>
  new Promise((resolve, reject) => {
    const fileList = event.dataTransfer.files;
    const file = fileList[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const uploaded_image = event.target.result;
      resolve(uploaded_image);
    });
    reader.readAsDataURL(file);
  });
