# Marks - useful bookmarks

## todos

-   tidy this readme!
-   check manifest - need all those permissions?
-   remove pappaparse? or use it for import?
-   new tab and/or popup?

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
    exention will parse the file and display the results.

In addition, there are numerous assets and build/configuration files that are used to generate the extension. This is
described in the build process section.

## How is it developed?

This extension is developed in React and TypeScript, and uses Vite as the build tool. It also uses the CRXjs Vite plugin
to simplify the development/build process for extensions (particularly HMR or Hot Module Replacement).

## State

https://github.com/pmndrs/zustand

## Chrome Storage

https://github.com/sinanbekar/webext-zustand/tree/main

https://github.com/onikienko/use-chrome-storage

devtool extension for viewing extension storage
https://chromewebstore.google.com/detail/storage-area-explorer/ocfjjjjhkpapocigimmppepjgfdecjkb

alternatively: `chrome.storage.local.get(console.log)`

## Linting & Formatting

ESLint, Prettier

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

https://github.com/facebook/react
https://github.com/microsoft/TypeScript
https://github.com/vitejs/vite
https://github.com/crxjs/chrome-extension-tools

https://github.com/vitest-dev/vitest
https://github.com/testing-library/react-testing-library

https://github.com/DefinitelyTyped/DefinitelyTyped

https://github.com/pmndrs/zustand

https://github.com/eslint/eslint
https://github.com/prettier/prettier
https://github.com/prettier/eslint-config-prettier
https://github.com/lint-staged/lint-staged
https://github.com/typicode/husky
https://github.com/typescript-eslint/typescript-eslint
