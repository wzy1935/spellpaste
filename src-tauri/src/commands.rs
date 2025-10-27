use clipboard::{ClipboardContext, ClipboardProvider};
use enigo::{
    Direction::{Click, Press, Release},
    Enigo, Key, Keyboard, Settings,
};
use tokio::time::{sleep, Duration};
use tauri::command;

#[command]
pub async fn paste(content: &str) -> Result<(), ()> {
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    ctx.set_contents(content.to_string()).unwrap();

    sleep(Duration::from_millis(50)).await;

    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    enigo.key(Key::Control, Press).unwrap();
    enigo.key(Key::Unicode('v'), Click).unwrap();
    enigo.key(Key::Control, Release).unwrap();

    Ok(())
}

#[command]
pub async fn copy() -> Result<String, ()> {
    let mut enigo = Enigo::new(&Settings::default()).unwrap();
    enigo.key(Key::Control, Press).unwrap();
    enigo.key(Key::Unicode('c'), Click).unwrap();
    enigo.key(Key::Control, Release).unwrap();

    sleep(Duration::from_millis(50)).await;

    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    Ok(ctx.get_contents().unwrap())
}
