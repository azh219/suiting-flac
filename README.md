# 随听 FLAC

本地音频转换工具的介绍、下载与版本发布站点。

- 官网：https://azh219.github.io/suiting-flac/
- Mac 预览版：https://github.com/azh219/suiting-flac/releases/tag/v1.0.0

当前支持 Apple Silicon Mac（macOS 13+，需要 Python 3.9+）。应用尚未通过 Apple 公证。

加密 MFLAC 的处理需要本机 QQ 音乐登录并向其官方接口请求密钥。音频留在本机，账号凭据和歌曲密钥仅在内存中使用。普通 FLAC 的复制与校验可离线完成。

个人离线密钥库、加密和混淆的预埋密钥包，以及 Windows、Android、HarmonyOS NEXT 支持属于后续计划，尚未包含在当前版本中。

此仓库用于静态官网和版本下载，不包含歌曲、用户凭据或歌曲密钥。应用内第三方组件的许可见安装包内许可证文件。

## 网站维护

GitHub Pages 从 main 分支根目录发布。更新版本下载地址时修改 `site-config.js`；页面为纯静态 HTML、CSS、JavaScript，无外部字体或分析服务依赖。
