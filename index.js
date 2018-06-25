const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');

program.version('1.0.0', '-v, --version')
    .command('init <name>')
    .action((name) => {
        if (!fs.existsSync(name)) {
            inquirer.prompt([{
                    name:'project',
                    message: 'github项目名'
                },{
                    name:'branch',
                    message: 'github分支名'
                }
            ]).then((answers) => {
                let url =`https://github.com:zpwingame/${answers.project}#${answers.branch}`;
                const spinner = ora('正在下载模板...');
                spinner.start();
                download(url, name, {
                    clone: true
                }, (err) => {
                    if (err) {
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err));
                    } else {
                        console.log(symbols.success, chalk.green('项目初始化完成'));
                    }
                    spinner.stop();
                })
            })
        } else {
            console.log(symbols.error, chalk.red('项目已存在'));
        }
    })
program.parse(process.argv);