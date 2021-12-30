const simpleGit = require('simple-git');
const git = simpleGit();

git
  .add('./*')
  .commit('build test', () => {
    console.log('commit 成功');
  })
  .remote('origin', 'https://gitee.com/linpupil/snail.git')
  .push(['-u', 'origin', 'master'], () => console.log('done'))
  .catch(err => console.error(err));