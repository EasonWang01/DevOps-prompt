exports.commands = [
  {
    name: 'List files in folder',
    command: 'ls -lh',
  },
  {
    name: 'Install homebrew',
    command: 'xcode-select --install && ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"'
  },
  {
    name: 'List big file',
    command: 'du -a * | sort -r -n | head -10'
  },
  {
    name: 'List crobjob',
    command: 'sudo crontab -u $USER -l'
  },  
  {
    name: 'List pid',
    command: 'ps -ef | more'
  },  
  {
    name: 'List process by CPU usage',
    command: 'top'
  },  
  {
    name: 'List disk usage',
    command: 'df -h'
  },  
  {
    name: 'Internet status',
    command: 'ifconfig -a'
  },  
  {
    name: 'System information',
    command: 'uname -a'
  },  
  {
    name: 'Install ansible',
    command: 'sudo apt-get install -y ansible'
  },    
]

