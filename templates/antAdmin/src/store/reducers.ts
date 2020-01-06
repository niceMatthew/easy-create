import breadCrumb from './breadCrumb';

interface Action<T = any> {
    type: T
}

interface Iaction extends Action {
    payload: any
}

interface ImodelItem {
    namespace: string
    state: any
    reducer: (state: any, action: Iaction) => any
}

interface Imodel {
    namespace: string
    state: any
    reducers: {
        [key: string]: (state: any, payload: any) => any
    }
}

type Reducers<S, A> = (prevState: S, action: A) => any

const modelList = [ breadCrumb ];

const models: ImodelItem[] = modelList.map((model: Imodel): ImodelItem => {

    const { namespace, state, reducers } = model;

    const reducer = (_state: any = state, action: Iaction) => {
        if (reducers[action.type]) {
            return reducers[action.type](_state, action.payload);
        }
        return _state;
    }

    return {
        namespace,
        state,
        reducer
    }
});

const reducers: { [key: string]: Reducers<any, Iaction> } = {};

models.map((model: ImodelItem) => {
    reducers[model.namespace] = model.reducer;
});

export default reducers;