#!/bin/sh
# $1: command name
# $2: directory name
# $3: [option] -dev or -stable
# Edit > EOL conversion > UNIX format

echo :::
echo \#grd v0.0.1
if test $1 = "create" || test $1 = "sample1" 
then
  
  echo [echo] checking if \"~/griddles-packages\" exists.
  if [ -e ~/griddles-packages ]
  then
     echo [echo] \"~/griddles-packages\" exists.
  else
     echo [echo] \"~/griddles-packages\" does NOT exists.
     echo [echo] creating a directory...
     echo [echo] completed.
     mkdir ~/griddles-packages
  fi
  
  
  if [ ! -e ~/griddles-packages/$2 ]
  then
     mkdir ~/griddles-packages/$2
     path=~/griddles-packages/$2
     echo [echo] $1: $path
     echo [echo] extpend griddles package in this directory.
     
     echo [echo] configuring of the minimum package of griddles...
     #copy icon
     echo [echo] copying \"icon.png\"...
     cp icon.png $path/icon.png
  
     #copy manifest js
     if test $1 = "create"
     then
        echo [echo] copying \"min-griddles-manifest.js\" as \"griddles-manifest.js\"...
        cp min-griddles-manifest.js $path/griddles-manifest.js
     else
        echo [echo] copying \"$1-griddles-manifest.js\" as \"griddles-manifest.js\"...
        cp $1-griddles-manifest.js $path/griddles-manifest.js
     fi
     
     #copy index html
     if test $1 = "create"
     then
        echo [echo] copying \"min-index.html\" as \"index.html\"...
        cp min-index.html $path/index.html
        else
        echo [echo] copying \"$1-index.html\" as \"index.html\"...
        cp $1-index.html $path/index.html
     fi
     
     #copy my app js
     if test $1 = "create"
     then
        echo [echo] copying \"min-myapp.js\" as \"myapp.js\"...
        cp min-myapp.js $path/myapp.js
     else
        echo [echo] copying \"$1-myapp.js\" as \"myapp.js\"...
        cp $1-myapp.js $path/myapp.js
     fi
     
     #copy README md
     echo [echo] copying \"README.md\"... 
     cp README.md $path/.
     
     #create assets directory
     echo [echo] creating the directory: \"assets\"...
     mkdir $path/assets
     
     #copy griddles js
     #copy griddles css
     if [ "$3" = "" ]
     then
        flag="stable"
     elif [ "$3" = "-dev" ]
     then
        flag="dev"
     fi
     
     if test $flag = "dev"
     then
        echo [echo] copying \"dev.griddles.js\" as \"assets/griddles.js\"...
        cp dev.griddles.js $path/assets/griddles.js
        echo [echo] copying \"dev.griddles.css\" as \"assets/griddles.css\"...
        cp dev.griddles.css $path/assets/griddles.css
     else
        echo [echo] copying \"griddles.js\" as \"assets/griddles.js\"...
        cp griddles.js $path/assets/.
        echo [echo] copying \"griddles.css\" as \"assets/griddles.css\"...
        cp griddles.css $path/assets/.
     fi
     
     #copy jQuery js
     echo [echo] copying \"jquery-1.11.0.min.js\" as \"assets/jquery-1.11.0.min.js\"...
     cp jquery-1.11.0.min.js $path/assets/.
     
     #ending
     echo [echo] configuration of the package has completed.
     echo [echo] outputting configuration to a file: \"/log.txt\".
     {
       echo "\#grd v0.0.1"
       echo `date`
       echo "~$path build@$1@$flag"
       echo "├── index.html"
       echo "├── icon.png"
       echo "├── my-app.js"
       echo "├── griddles-manifest.js"
       echo "├── README.md"
       echo "├── log.txt"
       echo "└── assets"
       echo "    ├── griddles.js"
       echo "    ├── griddles.css"
       echo "    └── jquery-1.11.0.min.js"
     } >> $path/log.txt
     
     echo Congratulations! SUCCESSED!
     
   else
     echo [echo] \"~/griddles-packages/$2\" already exists.
     echo Please try again. FAILED.
   fi
fi
echo :::
exit