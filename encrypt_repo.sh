#!/bin/bash

# set file types to encrypt
fileTypes=("json" "js" "ts" "html" "scss" "css" "gif" "woff" "eot" "ttf" "conf")

for ext in ${fileTypes[@]}
do
  # set extension to find
  e="$ext"

  # find all files with matching extension
  toEncrypt=`find . -name "*.$e" -type f`
  
  # run encryption process of files matched
  for file in ${toEncrypt[@]}
  do
    # set file as f
    f="$file"
    
    # set output file
    g="$f.gpg"

    # remove existing gpg file if exists
    if [ -f "$g" ]; then
      rm -f "$g"
    fi

    # encrypt teh file
    gpg --passphrase="$LARGE_SECRET_PASSPHRASE" --pinentry-mode loopback --symmetric --cipher-algo AES256 "$f"

    # check file has been encrypted, FIRST
    if [ -f "$g" ]; then
      rm -f "$f"
    fi
  done
done