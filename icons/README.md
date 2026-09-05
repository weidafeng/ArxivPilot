# Icons 说明

图标为矢量设计，源文件在 `src/`，PNG 由脚本渲染生成，请勿手工修改 PNG。

## 分尺寸策略

Chrome 的各尺寸图标是独立文件，因此按尺寸做了区分优化：

| 文件 | 源文件 | 说明 |
|---|---|---|
| `icon16.png` / `icon32.png` | `src/icon-small.svg` | **去掉舷窗**。16px 下舷窗会塌成孔洞，让火箭被误读成字母 A |
| `icon48.png` 及以上 | `src/icon-detail.svg` | 保留舷窗，细节更完整 |

## 重新生成

```bash
python3 - <<'PY'
import cairosvg, io
from PIL import Image
def rend(p, s, ss=8):
    png = cairosvg.svg2png(url=p, output_width=s*ss, output_height=s*ss)
    return Image.open(io.BytesIO(png)).convert("RGBA").resize((s, s), Image.LANCZOS)
D, S = "icons/src/icon-detail.svg", "icons/src/icon-small.svg"
for size, src in {16:S, 32:S, 48:D, 128:D, 256:D, 512:D}.items():
    rend(src, size).save(f"icons/icon{size}.png")
rend(D, 1024).save("icons/icon.png")
PY
```

依赖：`pip install cairosvg pillow`

## 设计约束

小尺寸图标能活下来的三条硬性要求：主体只放一个、占满 80% 以上画布、纯白实心不用半透明。
