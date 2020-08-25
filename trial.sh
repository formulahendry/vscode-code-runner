#!/bin/sh
cd ~/.config/Code/User
echo PATH=$PATH:$(pwd)
cat << EOF > temp.py
import platform

if platform.system()=="Linux":
    
    with open('settings.json') as fp:
        newTxt = fp.read().replace("\$fileNameWithoutExt && \$dir\$fileNameWithoutExt","/tmp/\$fileNameWithoutExt && /tmp/\$fileNameWithoutExt")

    with open('settings.json','w') as fp:
	fp.write(newTxt)
EOF
python temp.py
rm temp.py
