import { TabData } from "~~/types/Growth";

export const useIO = () => {
  return {
    getFilename(tab: TabData) {
      return `${tab.name || "Data " + tab.id}.json`;
    },
  };
};
