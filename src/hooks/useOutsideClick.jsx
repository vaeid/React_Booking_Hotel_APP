import { useEffect } from 'react';

export default function useOutsideClick(ref, execeptionId, cb) {
  useEffect(() => {
    function handelOutsideClick(e) {
      if (ref.current && !ref.current.contains(e.target) && e.target.id != execeptionId) {
        cb();
      }
    }
    document.addEventListener('mousedown', handelOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handelOutsideClick);
    };
  }, [ref, cb]);
}
