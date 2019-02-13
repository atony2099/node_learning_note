#package json

## local ex

`#!/usr/bin/env node`

That way, we are telling *nix systems that the interpreter of our JavaScript file should be /usr/bin/env node which looks up for the locally-installed node executable



##  bin

 Map a command-line script to a command name


## npm link
link 到全局目录，

```
$ # 先去到模块目录，把它 link 到全局
$ cd path/to/my-utils
$ npm link
$
$ # 再去项目目录通过包名来 link
$ cd path/to/my-project
$ npm link my-utils
```


