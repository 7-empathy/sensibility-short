# 感性 · Sensibility

1080p / 30fps / 16:9 / 2分30秒 / 无音轨 / 中文字幕

## 本地渲染

```bash
npm install
npm run dev      # 预览
npm run build    # 渲染 out/sensibility.mp4
云端渲染
GitHub Actions → Render Sensibility Short → Run workflow

打 tag 会自动把 mp4 挂到 Release：

bash
git tag v1.0 && git push --tags
