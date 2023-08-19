import { create } from "zustand";
import { authRequest } from "../services/requestWrapper";

let status = {
  messages: [],
  users: [],
  loading: false,
  selectedUser: null,
};

const useMessageStore = create((set, get) => ({
  ...status,
  fetchMessages: async () => {
    try {
      set({ loading: true });
      const response = await authRequest.get(
        `/chat/messages/${get().selectedUser.id}`
      );
      const { data } = response;

      set({
        messages: data,
        loading: false,
      });
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },
  fetchUsers: async () => {
    try {
      set({ loading: true });
      const response = await authRequest.get("/chat/list");
      const { data } = response;

      set({
        users: data,
      });
      set({ loading: false });
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },
  addMessage: async (params) => {
    try {
      set({ loading: true });
      const response = await authRequest.post("/chat/messages", {
        ...params,
      });
      const { data } = response;

      set({ loading: false });

      return data;
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },
  removeMessage: async (id) => {
    try {
      set({ loading: true });
      await authRequest.delete(`/chat/messages/${id}`);

      set({ loading: false });
    } catch (error) {
      set({ error, isLoading: false });
      throw error;
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

export default useMessageStore;
