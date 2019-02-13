# hash

## what is hash

A hash is a string of random-looking characters that uniquely identifies the data in question

## md5 sha1 sha256 differenct

1. m5:128 bit;
2. sha1,sha256: 160bit and 256bit;

## Collisions

存在碰撞的可能

## how to create

```
//md5 sha1 sha256
crypto.createHash('sha1').update('message', 'utf8').digest('hex')
```

##  加盐
