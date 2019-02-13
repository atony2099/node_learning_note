# mysql
[
11.4.1 The CHAR and VARCHAR Types](https://dev.mysql.com/doc/refman/5.7/en/char.html)

[MySQL+Node.js连接和操作](https://www.yiibai.com/mysql/nodejs.html)

[SQL Syntax](http://www-db.deis.unibo.it/courses/TW/DOCS/w3schools/sql/sql_syntax.asp.html)

## 语法
```
`:
Certain objects within MySQL, including database, table, index,
      column, alias, view, stored procedure, partition, tablespace, and
      other object names are known as identifiers

【An identifier may be quoted or unquoted.】 If an identifier contains special characters or is a reserved word, you must quote it whenever you refer to it.



"":
用于字符串类型。

```




##base

### SQL与mysql 
SQL是一种通用的数据库 【语言】;
mysql是一个具体的数据库管理系统

### dabase
数据库：包含各种table
mysql中的schema就相当于database


## 链接数据库
```sql
mysql.server start //启动数据库

mysql -uroot -pxxx // 链接数据库
```

设置密码
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xxx';
```

 flush privileg\\刷新权限列表






、
## 数据类型

### 字符串
CHAR
VARCHAR

1. char(4),varchar(4)代表能存放4个字符，而不是4个字节

| Value      | CHAR(4)    | Storage Required | VARCHAR(4) | Storage Required |
| ---------- | ---------- | ---------------- | ---------- | ---------------- |
| ''         | '4个空格' | 4 bytes          | ''         | 1 byte           |
| 'ab'       | 'ab   '    | 4 bytes          | 'ab'       | 3 bytes          |
| 'abc###d'  | 'abcd'     | 4 bytes          | 'abcd'     | 5 bytes          |
| 'abcdefgh' | 'abcd'     | 4 bytes          | 'abcd'     | 5 bytes          |


### number

#### int

| Type      | Storage (Bytes) | Minimum Value Signed | Minimum Value Unsigned | Maximum Value Signed | Maximum Value Unsigned |
| --------- | --------------- | -------------------- | ---------------------- | -------------------- | ---------------------- |
| TINYINT   | 1               | -128                 | 0                      | 127                  | 255                    |
| SMALLINT  | 2               | -32768               | 0                      | 32767                | 65535                  |
| MEDIUMINT | 3               | -8388608             | 0                      | 8388607              | 16777215               |
| INT       | 4               | -2147483648          | 0                      | 2147483647           | 4294967295             |
| BIGINT    | 8               | -263                 | 0                      | 263-1                | 264-1                  |



## 数据库操作
### 增加
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );

### 查询
```sql
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M]

SELECT * FROM runoob_tbl ORDER BY runoob_title ASC
```
#### 查询数量

```sql
SELECT  COUNT(title) as titleCount FROM todos WHERE title = 'Insert a new row with placeholders'
```
总记录数
```sql
SELECT  COUNT(*)  FROM todos
```





### 改
```sql
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
```

###删除
```sql
DELETE FROM table_name [WHERE Clause]
```


### 条件操作
[sql](https://www.1keydata.com/cn/sql/sql-between.php)

#### where 
1. where 
    1. 大小的比较 = != < > 
    2. and or and ：连接多个条件语句
        ```sql
        SELECT Store_Name 
        FROM Store_Information 
        WHERE Sales > 1000 
        OR (Sales < 500 AND Sales > 275);
        ```
    
    3. in between 
      ```sql
      SELECT * 
      FROM Store_Information 
      WHERE Store_Name IN ('Los Angeles', 'San Diego');

      SELECT * 
      FROM Store_Information 
      WHERE Txn_Date BETWEEN 'Jan-06-1999' AND 'Jan-10-1999';
      ```





## knea && bookself;

1. 如何初始化


1. 如何建立数据库
   

2. 如何创建表



## 相关关键词
### null: has no value;

not null: [The NOT NULL constraint enforces a field to always contain a value.] This means that you cannot insert a new record, or update a record without adding a value to this field.


###  ENGINE
存储引引擎:如何存储数据，如何增删改查。


## Migrations

Migrations are kind of like version control for databases

knex migrate:make

## join



## 外键：
[MYSQL外键(Foreign Key)的使用
](http://www.cppblog.com/wolf/articles/69089.html)

### 如何设置
```
create table tb1（
    id INT PRIMARY KEY AUTO_INCREMENT,
    classname VARCHAR(20) NOT NULL
）;

//字表
create table tb2(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    classid INT,
    FOREIGN KEY (classid) REFERENCES tb1(id) ON DELETE CASCADE ON UPDATE CASCADE
);

```
CASCADE：从父表删除或更新且自动删除或更新子表中匹配的行。

SET NULL：从父表删除或更新行，并设置子表中的外键列为NULL。前提是保证该外键列不为NOT NULL。

RESTRICT：拒绝对父表的删除或更新操作。

> 通过以上约束能保持数据的一致性(主表删除，更新时候，字表能同时删除更新，或者拒绝有字表的父表的删除操作)




### 是什么？
![](https://images0.cnblogs.com/blog/641601/201410/220949360904048.png)

引用了别的表的主键。 

被引用的表一般称为主表，因为他提供了最基础的信息。

### 为什么不建议使用外键？
  1. 太消耗性能。

  2. 数据的一致性由开发者自己来控制。

 > 替代方法：可以通过实务来保持数据的一致性。
