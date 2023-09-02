## 1 Sharing module
The ProductList app and Cart app both require faker module, and by default when we open the Container app, the browser will fetch 2 copies of faker module eventhough they may be of the same version. This is bad. But we can make the Container app fetches only one single copy of faker module by setting the webpack.config.js of both: the ProductList app and Cart app.

webpack.config.js of Cart app.
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8082
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'cart',
            filename: 'remoteEntry.js',
            exposes: {
                './CartIndex': './src/index'
            },
            shared: ['faker'] // here
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
```

webpack.config.js for ProductList app.
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8081,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'products',
            filename: 'remoteEntry.js',
            exposes: {
                './ProductsIndex': './src/index',
            },
            shared: ['faker']
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
```

By using this way, it solves the problem of fetching two identical copies of faker module in the container. But it will show an error when we try to run Product app or Cart app in an isolation.
```
Uncaught Error: Shared module is not available for eager consumption: webpack/sharing/consume/default/faker/faker
```
Because when we run Product app in an isolation, it runs the index.js that will import faker module. But, when we mark the faker module to be shared module, Webpack will load it asynchronously. So, the index.js won't find the faker module. Hence the error.

Why this error is nonexistent in the Container app? Because when the remoteEntry.js runs, Webpack can tell that to run index.js version for Product app in the container App, it needs faker module.

## 2 Using shared module to run in an isolation
The solution for the problem in point 1 is rather simple. Instead of executing index.js directly, we can create a copy of index.js and call it bootstrap.js and the change the default index.js to be
```js
import("./bootstrap.js")
```
With this, Webpack will load the code asynchronously and can tell that we need to import faker module before executing the index.js. So, before the iteration is executed, it will load faker module first. Problem solved.
