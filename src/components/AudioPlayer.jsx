import React, { useEffect, useRef } from 'react';

export default function AudioPlayer({ src, autoPlay = false, loop = true, volume = 0.5 }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (autoPlay) {
        audioRef.current.play().catch(err => {
          console.log("التشغيل التلقائي غير مسموح، يحتاج تفاعل المستخدم:", err);
        });
      }
    }
  }, [autoPlay, volume]);

  // لا نعرض أي شيء مرئي
  return <audio ref={audioRef} src={src} loop={loop} />;
}