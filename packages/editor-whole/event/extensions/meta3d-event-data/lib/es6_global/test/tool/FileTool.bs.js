


var convertUint8ArrayToBuffer = (function(uint8Array) {
           var buf = new Buffer(uint8Array.byteLength);

           for (var i = 0; i < buf.length; ++i) {
               buf[i] = uint8Array[i];
           }

           return buf;
       });

var buildFakeTextDecoder = (function(convertUint8ArrayToBufferFunc){ var TextDecoder = function(utfLabel){
        };

        TextDecoder.prototype.decode = (uint8Array) => {
          var buffer = convertUint8ArrayToBufferFunc(uint8Array);

          return buffer.toString("utf8");
        };

        window.TextDecoder = TextDecoder;
    });

var buildFakeTextEncoder = (function(){
        var TextEncoder = function(){
        };

        TextEncoder.prototype.encode = (str) => {
          var buffer = Buffer.from(str, "utf8");

          return buffer;
        };

        window.TextEncoder = TextEncoder;
    });

export {
  convertUint8ArrayToBuffer ,
  buildFakeTextDecoder ,
  buildFakeTextEncoder ,
}
/* No side effect */
