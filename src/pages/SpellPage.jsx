import { useRef } from "react";
import { listen } from '@tauri-apps/api/event';
import { useOnceEffect } from '@reactuses/core';
import windowService from "../services/windowService";
import spellService from "../services/spellService";
import localFileService from "../services/localFileService";

function SpellPage() {
  const inputRef = useRef(null);

  useOnceEffect(() => {
    (async () => {
      await localFileService.initPerWebview();
      await listen('set_focus', () => {
        inputRef.current.focus();
        inputRef.current.value = "6666";
      });
    })();
  }, []);

  const handleEnter = async (e) => {
    if (e.key === "Enter") {
      let spell = e.target.value;
      const content = await spellService.copy();
      e.target.value = "";
      windowService.hideSpellPage();
      await spellService.paste(spell, content);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center p-2">
      <input
        ref={inputRef}
        className="h-full w-full p-2"
        type="text"
        onKeyDown={handleEnter}
      />
    </div>
  );
}

export default SpellPage;
