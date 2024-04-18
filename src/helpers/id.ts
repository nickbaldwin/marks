import { v4 as uuidv4 } from 'uuid';

export const id = (type: string, testid?: string): string => {
    if (!type) {
        throw new Error('type is required');
    }
    if (testid) {
        return type + '-' + testid;
    } else {
        return type + '-' + uuidv4();
    }
};
