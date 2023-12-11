# *Buffer*

## 是什么
*Buffer* 是一个类似于数组的对象，用于表示固定长度的字节序列

*Buffer* 本质是一段内存空间，专门用来处理二进制数据

## 特点

1. *Buffer* 大小固定且无法调整
2. *Buffer* 性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为1字节(byte)

## 使用

### 创建

1. *Buffer.alloc*
  ```js
  // 创建了一个长度为 10 字节的 Buffer，相当于申请了 10 字节的内存空间，每个字节的值为 0
  let buf_1 = Buffer.alloc(10); // 结果为 <Buffer 00 00 00 00 00 00 00 00 00 00>
  console.log(buf_1);
  ```
2. *Buffer.allocUnsafe*
  ```js
  // 创建了一个长度为 10 字节的 Buffer，Buffer 中可能存在旧的数据，可能会影响执行结果，所以叫 unsafe
  let buf_2 = Buffer.allocUnsafe(10);
  console.log(buf_2);
  ```
3. *Buffer.from*
  ```js
  /**
   * ASCII码
  * 字母 16进制 10进制
  * h    68    104
  * e    65    101
  * l    6C    108
  * o    6F    111
  * a    61    97
  */
  
  // 通过字符串创建 Buffer
  let buf_3 = Buffer.from("hello");
  console.log(buf_3); // 结果为 <Buffer 68 65 6c 6c 6f>

  // 通过数组创建 Buffer
  let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]); // 每一项都是十进制表示
  console.log(buf_4.toString()); // toString 默认是按照 utf-8 编码方式进行转换的
  ```

### **Buffer** 的读写

  ```js
  // 读取
  console.log(buf_3[1]); // 101

  // 修改
  buf_3[1] = 97;

  // 查看字符串结果
  console.log(buf_3.toString());
  ```

## 注意
1. 如果修改的数值超过255，则超过8位的高位数据会被舍弃（因为1个字节有8位，而最大的8位的十进制表示为255）
2. 一个 utf-8 的字符 一般 占3个字节