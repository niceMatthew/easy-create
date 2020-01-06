export const BREADCRUMB_ACTION = {
    PUSH: 'BREADCRUMB_PUSH',
    POP: 'BREADCRUMB_POP',
    RESET: 'BREADCRUMB_RESET'
}

export default {
    namespace: 'breadCrumb',
    state: {
        pageStack: []
    },
    reducers: {
        [BREADCRUMB_ACTION.PUSH](state: any, payload: any) {
            const stack = [ ...state.pageStack ];
            if (payload.routeItem) {
                stack.push(payload.routeItem);
            } 
            return {
                ...state,
                pageStack: stack
            }
        },
        [BREADCRUMB_ACTION.RESET](state: any, payload: any) {
            const stack = [];
            if (payload.routeItem) {
                stack.push(payload.routeItem);
            } 
            return {
                ...state,
                pageStack: stack
            }
        },
    }
}