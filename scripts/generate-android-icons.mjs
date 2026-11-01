import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const args=process.argv.slice(2);const svgPath=args[0];const androidPath=args[1];
if(!svgPath||!androidPath)throw new Error('Usage: node generate-android-icons.mjs icon.svg android');
const res=path.join(androidPath,'app','src','main','res');
const legacy={mdpi:48,hdpi:72,xhdpi:96,xxhdpi:144,xxxhdpi:192};
const adaptive={mdpi:108,hdpi:162,xhdpi:216,xxhdpi:324,xxxhdpi:432};
async function render(size,out){await sharp(svgPath).resize(size,size,{fit:'contain'}).png().toFile(out);}
for(const [density,size] of Object.entries(legacy)){const dir=path.join(res,'mipmap-'+density);await mkdir(dir,{recursive:true});await render(size,path.join(dir,'ic_launcher.png'));await render(size,path.join(dir,'ic_launcher_round.png'));}
for(const [density,size] of Object.entries(adaptive)){const dir=path.join(res,'mipmap-'+density);await mkdir(dir,{recursive:true});await render(size,path.join(dir,'ic_launcher_foreground.png'));}
const dir=path.join(res,'mipmap-anydpi-v26');await mkdir(dir,{recursive:true});
const xml='<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n<background android:drawable="@color/ic_launcher_background"/>\n<foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n</adaptive-icon>\n';
await writeFile(path.join(dir,'ic_launcher.xml'),xml);await writeFile(path.join(dir,'ic_launcher_round.xml'),xml);
const values=path.join(res,'values');await mkdir(values,{recursive:true});await writeFile(path.join(values,'ic_launcher_background.xml'),'<?xml version="1.0" encoding="utf-8"?>\n<resources><color name="ic_launcher_background">#EAF5E9</color></resources>\n');
console.log('Generated Android launcher icons from '+svgPath);
