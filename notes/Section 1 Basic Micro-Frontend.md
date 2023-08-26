## 1 Definition
Suppose we have a micro-frontend app (e-commerve app) with the following structure:
```
├── Container App
    ├── ProductList App
    └── Cart App
```
when ProductList and Cart are app that can run on their own, we say that the e-commerce app is a micro-frontend app.
## 2 Integration
by integration, it means a process of assembling together the ProductList app and Cart app inside the Container app. Here are three types of integrations:
### 2.1 Build-time integration
ProductList app is published as a NPM (or equivalent) package and installed in the Container app. One of the cons is that ProductList app is tightly coupled with the Container app, which is counter-productive with the micro-frontend architecture. We won't do this.
### 2.2 Run-time integration
Deploy the ProductList app and Cart app to some static URLs. When the Container app has been loaded, it will fetch-and-then-execute .js files from ProductList app and Cart app necessary to render them on the screen. We are going with this way.
### 2.3 Server integration
Requires too much backend code, we won't use this in this repo.

## 3 Webpack
What we gonna do requires webpack.