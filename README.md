# @sahaz/file-server

 Most of the time UI development start with mock data with no backend service available. Maintaining the mock data does not provide all capability to update or delete the data.

 @sahaz/file-server provide http back generic api with custom url in no time. No Database required to save and do CURD operation.
  

 This package will give you a ability to do all the http operation and maintaining the data.

 # Installation and Usage

 - You can install via npm with the following command

    ```
    npm i @sahaz/file-server --save-dev
    ```

- Add the script command in project package file to keep it handy.
  
    ```
    "script": {
        ....
        "dev-server" :"file-server"
    }
    ```

- Start you dev file database server
  
  ```
  npm run dev-server
  ```

- By default server will start with http://localhost:1234 and apis are available with http://localhost:1234/api

- Posting data on api with any flexible name which is added after api 
  
  ```
  #Example

  post Request to  http://localhost:1234/api/user with 
  body = {
      name: 'file-server',
      description: 'great tool for starting 
      UI development with ready backend.'
  }

  # Response will be with id which can be used for later operation on the same data for Delete, Update or get

    {
        "__id": 9146499447,
        "name": "file-server",
        "description": "great tool for starting UI development with ready backend."
    }

    # the same data can be get with 

    http://localhost:1234/api/user/9146499447;

    # Delete 

    ttp://localhost:1234/api/user/9146499447

  ```

  ## Api Customization

    - api urls can be customized as per the required endpoint
      - Provide server-config.json file to customize the settings as if now we have only settings as mentioned which can be overridden.

    ```
    {
        "port": 12345,
        "baseUrl": "api",
        "baseFolder": "file-db/db"
    }
    ```

    - Or it can be overridden directly from command line argument

    ```
    file-server --port 12345 --baseUrl api/custom/v1 --baseFolder custom/db
    ```
  ## More update is coming soon.


