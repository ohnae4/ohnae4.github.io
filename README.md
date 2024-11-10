# chloisps

# kaisa

- 제어판->사용자계정->자격증명관리자->계정확인

```
git config --global user.name "kaisa"
rm -rf .git
git init
git add .
git commit -m "init"
git remote add origin "https://github.com/ohnae4/ohnae4.github.io.git"
git push -u --force origin master
```

- npm install --save-dev gulp gulp-babel
- npm install --save-dev gulp-sourcemaps

- gulp
- nodemon web
- localhost:7777

##version
- node : 8.17.0


## nvm
- $ sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
- vi ~/.bash_profile
- export NVM_DIR="$HOME/.nvm"
- [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
- source ~/.bash_profile    
- 적용 되었는지 확인 nvm ls
- nvm alias default 6.14.3

## Node 특정 버전 설치
- nvm install 6.14.3

- nvm use 6.14.3

brew install gh
gh auth login

[애래는 최초에만]
ssh-keygen -t ed25519 -C "kaisaohnae@gmail.com"
pbcopy < ~/.ssh/id_ed25519.pub
git config --global credential.helper osxkeychain
