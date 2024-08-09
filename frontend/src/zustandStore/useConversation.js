import { create } from "zustand";

// same like useState [userName, setUserName]
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => {
    set({ selectedConversation });
    // Clear unread messages when a conversation is selected
    set((state) => ({
      unreadMessages: {
        ...state.unreadMessages,
        [selectedConversation?._id]: 0,
      },
    }));
  },
  messages: [],
  setMessages: (messages) => set({ messages }),
  unreadMessages: {},
  incrementUnreadMessages: (conversationId) =>
    set((state) => ({
      unreadMessages: {
        ...state.unreadMessages,
        [conversationId]: (state.unreadMessages[conversationId] || 0) + 1,
      },
    })),
}));

export default useConversation;
