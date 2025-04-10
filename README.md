# todo-app-3DIT3D

# Dependencies
* Project created under `nodejs v22.12.0` and `npm v10.9.0`

# Plan:
* Scaffold workspace/project with NX -[x]
* List commands to create new components/functionalities-[x]
* Add unt tests libraries -[x]
* Add font awesome icons
* Add Typescript/Scss -[x]
* Mock backend with mswjs-[x]
    - GET - get all-[x]
    - POST - add new-[x]
    - DELETE - delete one-[x]
    - PATCH - edit status of one only to completed-[x]
* Todos logic
    * Stored in backend-[x]
    * Add/Edit(complete)/Delete-[x]

# NX:
* Create workscpace
    ```js
    npx create-nx-workspace
    ```
* Create app
    ```js
    nx g @nx/react:app apps/my-app --bundler=vite --style=scss linter=eslint unitTestRunner=jest globalCss=true
    ```
* Serve todos app
    ```js
    npx nx serve todos
    Runninng at http://localhost:4200/
    ```
* Create component
    ```js
    nx g @nx/react:component apps/todos/app/Todos/Todo/Todo.tsx globalCss=true style=scss
    ```

        