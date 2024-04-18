# Marks - useful bookmarks

## todos

- refer to https://github.com/users/nickbaldwin/projects/1/views/1?filterQuery=

## What does this extension do?

Organize your bookmarks and notes into folders and subfolders. You can also add tags to your bookmarks to make them
easier to find.

## How does it work?

// todo

## How does the extension work?

The extension is composed of four primary components:

-   #### Manifest

    This mandatory JSON file defines the configuration, permissions and metadata for the extension.

-   #### Service worker

    This script runs in the background, and communicates with the content scripts running on all search pages, in order
    to sync and correctly persist settings used across all Monster domains.

-   #### Popup
    When the extension icon is clicked, the popup is displayed in a new tab. Here a user can upload a file and the
    extension will parse the file and display the results.

-   #### New tab
   
    When a user opens a new tab, the extension will display a list of bookmarks and notes.



In addition, there are numerous assets and build/configuration files that are used to generate the extension. This is
described in the build process section.

## How is it developed?

This extension is developed using [React](https://github.com/facebook/react) and [TypeScript](https://github.com/microsoft/TypeScript), with [Vite](https://github.com/vitejs/vite) and [Vitest](https://github.com/vitest-dev/vitest) providing build and testing tooling. 

The [CRXjs](https://github.com/crxjs/chrome-extension-tools
) Vite plugin is used to simplify the development/build process - as it provides HMR (Hot Module Replacement) for extensions.

## State

[Zustand](https://github.com/pmndrs/zustand) is used for managing the state of the extension. and [webext-zustand](https://github.com/sinanbekar/webext-zustand/) is used as it enables sharing of state across the various extension contexts.

## Chrome Storage

zustand-chrome-local-storage

devtool extension for viewing extension storage
https://chromewebstore.google.com/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb

alternatively: `chrome.storage.local.get(console.log)`

## Linting & Formatting

[Prettier](https://github.com/prettier/prettier) is used for code formatting.

[ESLint](https://github.com/eslint/eslint), 



https://github.com/prettier/eslint-config-prettier
https://github.com/lint-staged/lint-staged
https://github.com/typicode/husky
https://github.com/typescript-eslint/typescript-eslint


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
    },
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked`
    or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and
    add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list




https://github.com/testing-library/react-testing-library

https://github.com/DefinitelyTyped/DefinitelyTyped



