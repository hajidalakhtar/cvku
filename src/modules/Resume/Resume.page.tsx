'use client';
import { sampleResume } from '@/libs/schema';
import { useArtboardStore } from '@/store/artboard';
import { Azurill } from '@/libs/templates/azurill';
export default function ResumePage() {
  const setResume = useArtboardStore((state) => state.setResume);
  setResume(sampleResume);

  return (

    <Azurill isFirstPage={true} columns={
      [
        ['summary', 'experience', 'education', 'projects', 'references'],
        [

          'profiles',
          'skills',
          'certifications',
          'interests',
          'languages',
          'awards',
          'volunteer',
          'publications'
        ]
      ]
    } />

  );
}
