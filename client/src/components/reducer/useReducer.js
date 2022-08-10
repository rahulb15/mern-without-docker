export const initialState = { code: '', admins: {}, userType: 'admin' };

export const reducer = (state, action) => {
    console.log("reducer");
    if (action.type === 'ADMIN') {
        return action.payload;
    }
    return state;
}