#!/bin/bash

# find all files to decrypt
toDecrypt=`find . -name "*.gpg" -type f`

for file in ${toDecrypt[@]}
do
  # file to target
  f="${PWD}/$file"

  # output file
  g="${PWD}/${file%.gpg}"

  # remove exising cs file if found
  if [ -f "$g" ]; then
    rm -rf "$g"
  fi

  # decrypt the file
  gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" --pinentry-mode loopback --output "$g" "$f"

  # check file has been encrypted, FIRST, then delete if passes
  if [ -f "$g" ]; then
    rm -f "$f"
  fi
done
