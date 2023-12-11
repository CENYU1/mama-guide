# Mac 使用上的一些问题

## 小问题

### 开启任何来源

`sudo spctl  --master-disable`

### xxx已损坏，无法打开，您应该将它移到废纸篓

```bash
# xxx.app 是你无法打开的 App
sudo xattr -r -d com.apple.quarantine /Applications/xxx.app
```
