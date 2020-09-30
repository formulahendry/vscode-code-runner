#!/bin/sh
echo PATH=$PATH:$(pwd)
cat << EOF > temp.py    
    with open('package_copy.json') as fp:
        newTxt = fp.read().replace("\$fileNameWithoutExt && \$dir\$fileNameWithoutExt","/tmp/\$fileNameWithoutExt && /tmp/\$fileNameWithoutExt",2)

    with open('package_copy.json','w') as fp:
	fp.write(newTxt)
EOF
python temp.py
rm temp.py
