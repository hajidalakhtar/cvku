// import type { ResumeData } from "@reactive-resume/schema";
import { ResumeData } from '@/libs/schema';
import { create } from 'zustand';

export type ArtboardStore = {
  resume: ResumeData;
  setResume: (resume: ResumeData) => void;
};

export const useArtboardStore = create<ArtboardStore>()((set) => ({
  resume: null as unknown as ResumeData,
  setResume: (resume: ResumeData) => {
    set({ resume });
  }
}));
