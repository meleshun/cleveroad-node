# Node.js RESTful API for Cleveroad 📃

Using *Node.js* and *MySQL* as a database, develop a RESTful API that allows you to work with products. The user registers and gets the opportunity to link to the advertisement for the sale of goods, as on OLX.

Main functionality:
- Registration
- Authorization
- Retrieving data of the current user
- Creation / Deletion of an item by an authorized user
- Changing product data by an authorized user
- Uploading product image


## Install
##### Download repository and install dependencies
    git clone https://github.com/meleshun/cleveroad-node.git
    npm install

##### Set environment variables
Set environment variables by specifying them in the **.env** located in the root of the project.

##### Create migrations (optional)
    sequelize db:migrate
    sequelize db:seed:all
    
Run your web server using `node index.js`