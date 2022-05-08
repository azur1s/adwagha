# adwagha
my bot

### how install
1) init npm
```bash
$ npm i
```
2) make `botconfig.toml`
```toml
[bot]
token = ""
prefix = "!"

[log]
debug = "[DEBUG] "
info = "[INFO] "
warn = "[WARN] "
error = "[ERROR] "

[db]
path = "./data.sqlite3"
```
3) create sqlite3 database file
```bash
$ touch ./data.sqlite3
```