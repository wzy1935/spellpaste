
Example spells:

```
[
  {
    "id": "format",
    "type": "safe-script",
    "description": "Reformat contents into one paragraph",
    "content": "let formatted = content.replace(/\\s+/g, ' '); formatted = formatted.replace(/\\n{2,}/g, ' '); formatted;",
    "shortcut": "Alt+F"
  },
  {
    "id": "date",
    "type": "unsafe-script",
    "description": "Output date of today",
    "content": "const now = new Date(); now.toLocaleDateString('zh-CN');",
    "shortcut": "Alt+D"
  },
  {
    "id": "hello",
    "type": "text",
    "description": "output simple hello world",
    "content": "Hello world!",
    "shortcut": "Alt+H"
  },
  {
    "id": "uuid",
    "type": "unsafe-script",
    "description": "Generate a random UUID",
    "content": "crypto.randomUUID();",
    "shortcut": "Alt+U"
  }
]

```