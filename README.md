# @sahaz/file-server

Usually, UI development starts with mock data in cases where the backend service is unavailable, delayed or if it's not required. Maintaining the mock data does not provide CURD functionalities.

 @sahaz/file-server provides rest http back-end api service within no time with desired endpoint url, with an in-built json database and generic/custom api and with CURD operation functionality.

 # Installation and Usage

 - You can install via npm with the following command

    ```
    npm i @sahaz/file-server --save-dev
    ```

- Add the script command in project package file to keep it handy
  
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

- Posting data on api, with any flexible name which is added after api 
  
  ```
  #Example

  post Request to  http://localhost:1234/api/user with 
  body = {
      name: 'file-server',
      description: 'great tool for starting 
      UI development with ready backend.'
  }

  # Response will be with "__id" which can later be used on the same data for operations such as  Delete or Update or Get

    {
        "__id": 9146499447,
        "name": "file-server",
        "description": "great tool for starting UI development with ready backend."
    }

    # the same data can be Get with 

    http://localhost:1234/api/user/9146499447;

    # Delete 

    ttp://localhost:1234/api/user/9146499447

  ```

  ## Api Customization

    - api urls can be customized as per the required endpoint
      - Provide server-config.json file to customize the settings, as of now, we have only the mentioned settings which can be overridden.

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
  
  ## More update is coming soon......


