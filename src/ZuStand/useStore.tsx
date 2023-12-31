import {create} from 'zustand';

const useStore = create((set) => ({
  sharedValue: 'initial value', // Your initial data
  updateSharedValue: (newValue) => set({ sharedValue: newValue }), // Action to update the state
}));

export default useStore;
