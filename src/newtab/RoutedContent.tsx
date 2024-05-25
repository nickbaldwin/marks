import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Error } from './Error';
import { Content } from './Content';
import { FolderPage } from './FolderPage';

const router = createMemoryRouter([
    {
        path: '/',
        element: <Content />,
        errorElement: <Error />,
        children: [
            {
                path: 'folders/:folderId',
                // todo next - pass im the :folderId
                element: <FolderPage />,
            },
        ],
    },
]);

export const RoutedContent = () => {
    return <RouterProvider router={router} />;
};
