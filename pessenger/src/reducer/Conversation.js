const initial = {
    firstName: '',
    lastName: '',
    email: '',
    messageList: [],
    conversationList: [],
    conversationId: '',
    newMessage: '',
    messages: [],
    user: ''
}
let myId = window.localStorage.getItem('id')
const conversation = (state = initial, action) => {
    switch (action.type) {
        case 'SAVE_NEW_MESSAGE':
            return {
                ...state,
                newMessage: action.payload,
                messages: [...state.messages,
                    {
                        sender: {
                            id: myId
                        },
                        text: action.payload
                    }
                ]
            }
        case 'SAVE_SELECTED_USER_NAME':
            return {
                ...state,
                email: action.email,
                firstName: action.name,
                lastName: action.family
            }
        case 'SAVE_CONVERSATION_LIST':

            return {
                ...state,
                conversationList: action.payload
            }

        case 'SEND_NEW_MESSAGE':
            return {
                ...state,
                messageList: [
                    ...state.messageList,
                    {
                        text: action.payload,
                        date: new Date().getHours(),
                        sender: {
                            id: myId
                        },
                        receiver: 3
                    }
                ]
            }

        case 'CREATE_NEW_CONVERSATION':
            return {
                ...state,
                conversationList: [{
                        firstName: action.payload,
                        lastName: '',
                        latestMessage: '',
                        unseenMessage: '',
                        profile: 'http://....'
                    },
                    ...state.conversationList
                ]
            }
        case 'EDIT_MESSAGE':
            let newMessagelist = state.messageList
            newMessagelist[action.index]['text'] = action.payload
            return {
                ...state,
                messageList: newMessagelist
            }
        case 'OPEN_CONVERSATION':
            return {
                ...state,
                user: action.user,
                messages: action.payload,
                avatar: action.avatar,
                conversationId: action.conversationId
            }
        default:
            return state
    }
}
export default conversation