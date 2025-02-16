#!/bin/bash

RED="\033[0;31m"
     YELLOW="\033[0;33m"
    GREEN="\033[0;32m"
       BLUE="\[\033[0;34m\]"
  LIGHT_RED="\[\033[1;31m\]"
LIGHT_GREEN="\033[1;32m"
      WHITE="\[\033[1;37m\]"
 LIGHT_GRAY="\[\033[0;37m\]"
 COLOR_NONE="\[\e[0m\]"


parse_git_branch() {
     git_status="$(git status 2> /dev/null)"
     #echo "${git_status}"
     if [[ ${git_status} =~ "Not a git repository" ]]; then
          state=""
     elif [[ ${git_status} =~ "Changes not staged for commit" ]]; then
          state="${RED}M"
     elif [[ ${git_status} =~ "Changes to be committed" ]]; then
          state="${YELLOW}M"
     fi
     if [[ ${git_status} =~ "Untracked files" ]]; then
          state="${state}*"
     fi
     if [[ ${git_status} =~ "Your branch is ahead of" ]]; then
          state="${state}+"
     fi
     if [[ ${git_status} =~ "Your branch is behind" ]]; then
          state="${state}-"
     fi
     if [[ ${git_status} =~ "nothing to commit, working tree clean" ]]; then
          state="${state}${GREEN}✔️"
     fi
     if [[ ${git_status} =~ "use \"git pull\" if you want to integrate" ]]; then
          state="${state}${RED}⬇️"
     fi 
     prompt="$(git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/')"
     echo -e "${prompt} ${state}"
}

export PS1="\[\033[32m\]\w\[\033[34m\]\$(parse_git_branch)\[\033[00m\] $ "