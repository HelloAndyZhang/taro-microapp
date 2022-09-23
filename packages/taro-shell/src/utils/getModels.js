export const getModels = (files) => {
  const models = {};
  files.keys().forEach(key => {
    if (key === "./index.js") return;
    const filename = key.replace(/(\.\/|\.js)/g, "");
    const model = files(key).default;
    models[`${model.name || filename}`] = model;
  });
  return models
}
