const path = require('path');
const fs = require('fs');
const config = require('../config/app');
const { Product } = require('../models');

module.exports.getById = async function getById(ctx) {
  const product = await Product.findOne({
    include: 'user',
    where: {
      id: ctx.params.id,
    },
  }).then((product) => {
    product.user.password = undefined;
    product.user.salt = undefined;
    return product;
  }).catch(() => {
    ctx.throw(404, '');
  });

  if (product) {
    ctx.body = product;
  }
};

module.exports.update = async function update(ctx) {
  const product = await Product.findOne({
    where: {
      id: ctx.params.id,
    },
  }).catch(() => {
    ctx.throw(404, '');
  });

  if (!product) {
    ctx.throw(404, '');
  }

  if (product.user_id !== ctx.user.id) {
    ctx.throw(403, '');
  }

  if (ctx.request.body.title) {
    product.title = ctx.request.body.title;
  }

  if (ctx.request.body.price) {
    product.price = ctx.request.body.price;
  }

  await product.save();

  const responce = product.toJSON();
  responce.user = ctx.user;

  ctx.body = responce;
};

module.exports.getAll = async function getAll(ctx) {
  const products = await Product.findAll({
    include: 'user',
  }).then((products) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const product of products) {
      product.user.password = undefined;
      product.user.salt = undefined;
    }
    return products;
  });

  ctx.body = products;
};

module.exports.remove = async function remove(ctx) {
  const product = await Product.findOne({
    where: {
      id: ctx.params.id,
    },
  });

  if (!product) {
    ctx.throw(404, '');
  }

  if (product.user_id !== ctx.user.id) {
    ctx.throw(403, '');
  }

  await product.destroy();

  ctx.body = '';
};

module.exports.create = async function create(ctx) {
  const product = await Product.create({
    user_id: ctx.user.id,
    title: ctx.request.body.title,
    price: ctx.request.body.price,
    image: null,
  }).then((product) => {
    product = product.toJSON();
    product.user = ctx.user;
    return product;
  });

  ctx.body = product;
};

module.exports.updateImage = async function updateImage(ctx) {
  if (!ctx.request.files) {
    ctx.throw(404, '');
  }

  const product = await Product.findOne({
    where: {
      id: ctx.params.id,
      user_id: ctx.user.id,
    },
  }).catch(() => {
    ctx.throw(403, '');
  });

  if (!product) {
    ctx.throw(403, '');
  }

  const file = ctx.request.files[Object.keys(ctx.request.files)[0]];

  const userIdAsString = ctx.user.id.toString();
  const userDir = path.join(config.images.dirname, userIdAsString);
  const outputFilePath = path.join(userDir, file.name);

  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir);
  }

  const reader = fs.createReadStream(file.path);
  const stream = fs.createWriteStream(outputFilePath);
  reader.pipe(stream);

  product.image = path.join(userIdAsString, file.name);
  await product.save();

  const responce = product.toJSON();
  responce.user = ctx.user;

  ctx.body = responce;
};
