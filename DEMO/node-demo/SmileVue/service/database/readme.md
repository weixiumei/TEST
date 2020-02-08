https://www.jianshu.com/p/fffb581bb1a9

打开命令行：mongo
查看数据库：show dbs
指定数据库：use smile-vue

查看数据集：show collections
新建数据集：db.createCollection("user") == db.user.insert({"user":"xxx"})
删除数据集：db.user.drop()
重命名数据集：db.hello.renameCollection("HELLO")
创建索引在HELLO集合上，建立对Name字段的索引,1代表正序：db.HELLO.ensureIndex({NAME:1})

数据库test，数据集user
向user插入数据：
  db.user.insert({'name':'Gal Gadot','gender':'female','age':28,'salary':11000}) 
  db.user.save({'name':'Wentworth Earl Miller','gender':'male','age':41,'salary':33000})
查看记录：
  db.user.find()
查找符合记录的记录：
  db.user.find({"age":26})
  db.user.find({salary:{$gt:7000}})
  db.user.find({name:/a/})
  db.user.find({name:/^W/})
  去重：
  db.user.distinct('gender')
pretty print工具：
  db.user.find().pretty()
指定结果集返回条目：
  db.user.find().limit(2)
查询第一条以外的数据
  db.user.find().skip(1)
升序：
  db.user.find().sort({salary:1})
降序：
  db.user.find().sort({salary:-1})
统计结果集中的记录数量：
  db.user.find().count()

删除整个集合中的所有数据
  db.test.remove()
