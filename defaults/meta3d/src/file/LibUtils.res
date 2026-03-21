type lib

type func

let serializeLib: (string, string) => lib = %raw(`
    function(fileStr, libraryName){
        try{
            // console.log("libraryName: ", libraryName)
            // console.log("fileStr: ", fileStr)

  eval('(' + "(function(){" + fileStr + "}())" + ')')

  return window[libraryName]
        }
        catch(e){
            console.error("libraryName: ", libraryName)
            console.error("fileStr: ", fileStr)
            throw new Error (e)
        }
    }
    `)

// let serializeLib: (string, string) => lib = %raw(`
//   function(fileStr, libraryName) {
//     try {
//       eval("(function(){" + fileStr + "}())");
//       const lib = window[libraryName];
      
//       // 递归包装对象中的所有函数
//       function wrapFunctions(obj, path = []) {
//         if (!obj || typeof obj !== 'object') return obj;
        
//         if (Array.isArray(obj)) {
//           return obj.map((item, index) => wrapFunctions(item, [...path, index]));
//         }
        
//         return Object.keys(obj).reduce((acc, key) => {
//           const value = obj[key];
//           if (typeof value === 'function') {
//             acc[key] = function(...args) {
//               try {
//                 const result = value.apply(this, args);
//                 if (result && typeof result.then === 'function') {
//                   return result.catch(error => {
//                     console.error("libraryName:", libraryName, "fileStr:", fileStr, error);
//                     throw error; // 或返回默认值
//                   });
//                 }
//                 return result;
//               } catch (e) {
//                 console.error("libraryName:", libraryName, "fileStr:", fileStr, e);
//                 throw e;
//               }
//             };
//           } else if (value && typeof value === 'object') {
//             acc[key] = wrapFunctions(value, [...path, key]);
//           } else {
//             acc[key] = value;
//           }
//           return acc;
//         }, {});
//       }
      
//       return wrapFunctions(lib);
//     } catch (e) {
//       console.error("libraryName:", libraryName, "fileStr:", fileStr, e);
//       throw e;
//     }
//   }
// `);
// let serializeLib: (string, string) => lib = %raw(`
//   function(fileStr, libraryName) {
//     try {
//       // 执行代码，将库挂载到 window 上
//       eval("(function(){" + fileStr + "}())");
//       const lib = window[libraryName];

//       // 用于处理循环引用的 WeakMap
//       const seen = new WeakMap();

//       // 递归包装函数和对象
//       function wrapFunctions(obj) {
//         // 基本类型直接返回
//         if (obj === null || typeof obj !== 'object') return obj;

//         // 如果已经处理过，直接返回之前包装的结果
//         if (seen.has(obj)) return seen.get(obj);

//         // 处理函数：返回 Proxy
//         if (typeof obj === 'function') {
//           const proxy = new Proxy(obj, {
//             apply(target, thisArg, argumentsList) {
//               try {
//                 // 调用原始函数
//                 const result = Reflect.apply(target, thisArg, argumentsList);
//                 // 如果返回 Promise，添加 rejection 捕获
//                 if (result && typeof result.then === 'function') {
//                   return result.catch(error => {
//                     console.error(
//                       "libraryName:",
//                       libraryName,
//                       "fileStr:",
//                       fileStr,
//                       error
//                     );
//                     throw error; // 保持原有行为（重新抛出）
//                   });
//                 }
//                 return result;
//               } catch (e) {
//                 console.error(
//                   "libraryName:",
//                   libraryName,
//                   "fileStr:",
//                   fileStr,
//                   e
//                 );
//                 throw e;
//               }
//             }
//           });
//           seen.set(obj, proxy);
//           return proxy;
//         }

//         // 处理数组
//         if (Array.isArray(obj)) {
//           const arr = obj.map(item => wrapFunctions(item));
//           seen.set(obj, arr);
//           return arr;
//         }

//         // 处理普通对象
//         const wrappedObj = {};
//         seen.set(obj, wrappedObj); // 先占位，处理循环引用
//         for (let key in obj) {
//           if (Object.prototype.hasOwnProperty.call(obj, key)) {
//             wrappedObj[key] = wrapFunctions(obj[key]);
//           }
//         }
//         return wrappedObj;
//       }

//       // 返回包装后的库
//       return wrapFunctions(lib);
//     } catch (e) {
//       // 捕获同步错误（如 eval 执行期间的错误）
//       console.error("libraryName:", libraryName, "fileStr:", fileStr, e);
//       throw e;
//     }
//   }
// `);
// let serializeLib: (string, string) => lib = %raw(`
//   function(fileStr, libraryName) {
//     try {
//       // 执行代码，将库挂载到 window 上
//       eval("(function(){" + fileStr + "}())");
//       const lib = window[libraryName];

//       // 用于处理循环引用的 WeakMap
//       const seen = new WeakMap();

//       // 递归包装函数和对象
//       function wrapFunctions(obj) {
//         // 基础类型直接返回
//         if (obj === null || typeof obj !== 'object') return obj;

//         // 避免重复包装（处理循环引用）
//         if (seen.has(obj)) return seen.get(obj);

//         // 如果是 Promise，直接返回，不深入遍历其内部属性（避免破坏 Promise 行为）
//         if (obj && typeof obj.then === 'function') {
//           return obj;
//         }

//         // 处理函数：返回 Proxy
//         if (typeof obj === 'function') {
//           const proxy = new Proxy(obj, {
//             apply(target, thisArg, argumentsList) {
//               try {
//                 // 调用原始函数
//                 const result = Reflect.apply(target, thisArg, argumentsList);
//                 // 递归包装返回值（确保部分应用函数也被包装）
//                 const wrappedResult = wrapFunctions(result);

//                 // 如果返回值是 Promise，添加 rejection 捕获
//                 if (wrappedResult && typeof wrappedResult.then === 'function') {
//                   return wrappedResult.catch(error => {
//                     console.error(
//                       "libraryName:",
//                       libraryName,
//                       "fileStr:",
//                       fileStr,
//                       error
//                     );
//                     throw error; // 保持原始行为（重新抛出）
//                   });
//                 }
//                 return wrappedResult;
//               } catch (e) {
//                 console.error(
//                   "libraryName:",
//                   libraryName,
//                   "fileStr:",
//                   fileStr,
//                   e
//                 );
//                 throw e;
//               }
//             }
//           });
//           seen.set(obj, proxy);
//           return proxy;
//         }

//         // 处理数组
//         if (Array.isArray(obj)) {
//           const arr = obj.map(item => wrapFunctions(item));
//           seen.set(obj, arr);
//           return arr;
//         }

//         // 处理普通对象（包括不可枚举属性和 getter）
//         const wrappedObj = {};
//         seen.set(obj, wrappedObj); // 先占位，应对循环引用

//         // 使用 Reflect.ownKeys 遍历所有自有属性（包括 Symbol 和不可枚举属性）
//         Reflect.ownKeys(obj).forEach(key => {
//           const descriptor = Object.getOwnPropertyDescriptor(obj, key);
//           if (descriptor) {
//             if (typeof descriptor.get === 'function') {
//               // 对于 getter，定义 getter 返回包装后的值
//               Object.defineProperty(wrappedObj, key, {
//                 get: () => wrapFunctions(descriptor.get.call(obj)),
//                 set: descriptor.set
//                   ? (val) => descriptor.set.call(obj, val)
//                   : undefined,
//                 enumerable: descriptor.enumerable,
//                 configurable: descriptor.configurable,
//               });
//             } else {
//               // 普通属性，直接赋值（递归包装）
//               wrappedObj[key] = wrapFunctions(obj[key]);
//             }
//           }
//         });

//         return wrappedObj;
//       }

//       // 返回包装后的库
//       return wrapFunctions(lib);
//     } catch (e) {
//       // 捕获 eval 执行期间的同步错误
//       console.error("libraryName:", libraryName, "fileStr:", fileStr, e);
//       throw e;
//     }
//   }
// `);
// let serializeLib: (string, string) => lib = %raw(`
//   function(fileStr, libraryName) {
//     try {
//       // 执行代码，将库挂载到 window 上
//       eval("(function(){" + fileStr + "}())");
//       const lib = window[libraryName];

//       const seen = new WeakMap(); // 处理循环引用

//       function wrap(obj) {
//         if (obj === null || typeof obj !== 'object') return obj;
//         if (seen.has(obj)) return seen.get(obj);

//         // 如果是 Promise，直接返回（避免破坏 then/catch）
//         if (obj && typeof obj.then === 'function') return obj;

//         // 处理函数：返回 Proxy
//         if (typeof obj === 'function') {
//           const proxy = new Proxy(obj, {
//             apply(target, thisArg, args) {
//               try {
//                 const result = Reflect.apply(target, thisArg, args);
//                 const wrappedResult = wrap(result); // 包装返回值（支持柯里化）
//                 if (wrappedResult && typeof wrappedResult.then === 'function') {
//                   return wrappedResult.catch(err => {
//                     console.error("libraryName:", libraryName, "fileStr:", fileStr, err);
//                     throw err;
//                   });
//                 }
//                 return wrappedResult;
//               } catch (err) {
//                 console.error("libraryName:", libraryName, "fileStr:", fileStr, err);
//                 throw err;
//               }
//             }
//           });
//           seen.set(obj, proxy);
//           return proxy;
//         }

//         // 处理数组
//         if (Array.isArray(obj)) {
//           const arr = obj.map(item => wrap(item));
//           seen.set(obj, arr);
//           return arr;
//         }

//         // 处理普通对象（包括不可枚举属性和 getter）
//         const wrapped = {};
//         seen.set(obj, wrapped);
//         Reflect.ownKeys(obj).forEach(key => {
//           const desc = Object.getOwnPropertyDescriptor(obj, key);
//           if (!desc) return;

//           if (desc.get || desc.set) {
//             // 访问器属性：包装 getter 的返回值
//             Object.defineProperty(wrapped, key, {
//               get: desc.get ? () => wrap(desc.get.call(obj)) : undefined,
//               set: desc.set ? v => desc.set.call(obj, v) : undefined,
//               enumerable: desc.enumerable,
//               configurable: desc.configurable
//             });
//           } else {
//             // 数据属性：包装值
//             const value = wrap(desc.value);
//             Object.defineProperty(wrapped, key, {
//               value,
//               writable: desc.writable,
//               enumerable: desc.enumerable,
//               configurable: desc.configurable
//             });
//           }
//         });
//         return wrapped;
//       }

//       return wrap(lib);
//     } catch (e) {
//       console.error("libraryName:", libraryName, "fileStr:", fileStr, e);
//       throw e;
//     }
//   }
// `);
// let serializeLib: (string, string) => lib = %raw(`
//   function(fileStr, libraryName) {
//     try {
//       eval("(function(){" + fileStr + "}())");
//       const lib = window[libraryName];

//       const seen = new WeakMap();

//       function wrapFunction(fn) {
//         // 保留原函数的 length
//         const wrapped = function(...args) {
//           try {
//             const result = fn.apply(this, args);
//             if (result && typeof result.then === 'function') {
//               return result.catch(err => {
//                 console.error("libraryName:", libraryName, "fileStr:", fileStr, err);
//                 throw err;
//               });
//             }
//             return result;
//           } catch (err) {
//             console.error("libraryName:", libraryName, "fileStr:", fileStr, err);
//             throw err;
//           }
//         };
//         Object.defineProperty(wrapped, 'length', { value: fn.length, writable: false, configurable: true });
//         return wrapped;
//       }

//       function wrapObject(obj) {
//         if (obj === null || typeof obj !== 'object') return obj;
//         if (typeof obj === 'function') return wrapFunction(obj);
//         if (seen.has(obj)) return seen.get(obj);

//         if (Array.isArray(obj)) {
//           const arr = obj.map(item => wrapObject(item));
//           seen.set(obj, arr);
//           return arr;
//         }

//         const wrapped = {};
//         seen.set(obj, wrapped);
//         Reflect.ownKeys(obj).forEach(key => {
//           const desc = Object.getOwnPropertyDescriptor(obj, key);
//           if (!desc) return;

//           if (desc.get || desc.set) {
//             Object.defineProperty(wrapped, key, {
//               get: desc.get ? () => wrapObject(desc.get.call(obj)) : undefined,
//               set: desc.set ? v => desc.set.call(obj, v) : undefined,
//               enumerable: desc.enumerable,
//               configurable: desc.configurable
//             });
//           } else {
//             const value = wrapObject(desc.value);
//             Object.defineProperty(wrapped, key, {
//               value,
//               writable: desc.writable,
//               enumerable: desc.enumerable,
//               configurable: desc.configurable
//             });
//           }
//         });
//         return wrapped;
//       }

//       return wrapObject(lib);
//     } catch (e) {
//       console.error("libraryName:", libraryName, "fileStr:", fileStr, e);
//       throw e;
//     }
//   }
// `);


let getFuncFromLib: (lib, string) => func = %raw(`
    function(lib, funcName){
        return lib[funcName]
    }
    `)
