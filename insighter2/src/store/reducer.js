
// 不同请求的处理
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                count: state.count + 1
            };
        case 'init': {
            let newData = [];
            // TODO: use action.payload to update newData
            console.log(action.payload);
            newData = action.payload;
            return {
                ...state,
                data: newData
            };
        }

        case 'homeColorSelect': {
            return {
                ...state,
                homeColor: action.payload,
            };
        }
        case 'awayColorSelect': {
            return {
                ...state,
                awayColor: action.payload,
            };
        }
        
        case 'playerSelect': {
            return {
                ...state,
                athlete: action.payload,
            };
        }

        case 'searchNews': {
            return {
                ...state,
                isSearched: true,
            }
        }
        default:
            throw new Error();
    }
}

export default reducer;