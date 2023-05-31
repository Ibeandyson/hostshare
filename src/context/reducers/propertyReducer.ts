import Store from '../Store';

const initial_state = {
    data: {}
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case SET_PROPERTY:
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

export const SET_PROPERTY = 'SET_PROPERTY';

export const { Provider, useStore, useDispatch } = Store(initial_state, reducer);
