use arboard::Clipboard;
use enigo::{
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Settings,
};
use tauri::command;
use tokio::time::{sleep, Duration};

#[cfg(target_os = "macos")]
const CONTROL_KEY: Key = Key::Meta;

#[cfg(not(target_os = "macos"))]
const CONTROL_KEY: Key = Key::Control;

#[command]
pub async fn paste(content: &str) -> Result<(), ()> {
    let mut clipboard = Clipboard::new().unwrap();
    clipboard.set_text(content.to_string()).unwrap();

    sleep(Duration::from_millis(50)).await;

    let mut enigo = Enigo::new(&Settings::default()).unwrap();

    enigo.key(CONTROL_KEY, Press).unwrap();
    enigo.key(Key::Other(0x09), Click).unwrap();
    enigo.key(CONTROL_KEY, Release).unwrap();

    Ok(())
}

#[command]
pub async fn copy() -> Result<String, ()> {
    //clear clipboard first using clear method in arboard
    let mut clipboard = Clipboard::new().unwrap();
    clipboard.clear().unwrap();
    
    let mut enigo = Enigo::new(&Settings::default()).unwrap();

    enigo.key(CONTROL_KEY, Press).unwrap();
    enigo.key(Key::Alt, Release).unwrap();
    enigo.key(Key::Other(0x08), Click).unwrap();
    enigo.key(CONTROL_KEY, Release).unwrap();

    sleep(Duration::from_millis(50)).await;

    let mut clipboard = Clipboard::new().unwrap();
    let text = match clipboard.get_text() {
        Ok(t) => t,
        Err(arboard::Error::ContentNotAvailable) => String::new(),
        Err(_) => return Err(()),
    };
    Ok(text)
}
