#!/usr/bin/env sh

if [ -z $1 ]
then
    echo "You MUST specify target branch!"
    exit 1
fi
if [ -z $2 ]
then
    echo "You MUST specify version"
    exit 1
fi

echo "Deploying to GitHub pages, to branch $1"
echo "Build version $2"

set -e
npm run build

cd dist
git init
git branch -M main
git add -A
git commit -m "'deploy v$2'"
git tag "$2"
git push -f git@github.com:IntegerVector/shitty-reader.git main:$1
git push git@github.com:IntegerVector/shitty-reader.git --tags
cd -