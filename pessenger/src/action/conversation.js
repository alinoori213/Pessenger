export const getUserName = (firstName, lastName, email, conversationId) => ({
    type: 'SAVE_SELECTED_USER_NAME',
    email: email,
    name: firstName,
    family: lastName,
    conversationId: conversationId
})
export const saveConversationList = (conversationList) => ({
    type: 'SAVE_CONVERSATION_LIST',
    payload: conversationList
})

export const sendNewMessage = (newMessage) => ({
    type: 'SEND_NEW_MESSAGE',
    payload: newMessage
})

export const createNewConversation = (name) => ({
    type: 'CREATE_NEW_CONVERSATION',
    payload: name
})

export const editMessage = (text, index) => ({
    type: 'EDIT_MESSAGE',
    payload: text,
    index: index
})
export const openConversationScreen = (user, messages, avatar, conversationId) => ({
    type: 'OPEN_CONVERSATION',
    user: user,
    payload: messages,
    avatar: avatar,
    conversationId: conversationId

})
export const addNewMessage = (newMessage) => ({
    type: 'SAVE_NEW_MESSAGE',
    payload: newMessage
})