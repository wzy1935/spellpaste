use clipboard::{ClipboardContext, ClipboardProvider};
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
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    ctx.set_contents(content.to_string()).unwrap();

    sleep(Duration::from_millis(50)).await;

    let mut enigo = Enigo::new(&Settings::default()).unwrap();

    enigo.key(CONTROL_KEY, Press).unwrap();
    enigo.key(Key::Unicode('v'), Click).unwrap();
    enigo.key(CONTROL_KEY, Release).unwrap();

    Ok(())
}

#[command]
pub async fn copy() -> Result<String, ()> {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();

    enigo.key(CONTROL_KEY, Press).unwrap();
    enigo.key(Key::Alt, Release).unwrap();
    enigo.key(Key::Unicode('c'), Click).unwrap();
    enigo.key(CONTROL_KEY, Release).unwrap();

    sleep(Duration::from_millis(50)).await;

    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    Ok(ctx.get_contents().unwrap())
}
