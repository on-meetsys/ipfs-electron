var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod4) => function __require() {
  return mod4 || (0, cb[__getOwnPropNames(cb)[0]])((mod4 = { exports: {} }).exports, mod4), mod4.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from3, except, desc) => {
  if (from3 && typeof from3 === "object" || typeof from3 === "function") {
    for (let key of __getOwnPropNames(from3))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from3[key], enumerable: !(desc = __getOwnPropDesc(from3, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod4, isNodeMode, target) => (target = mod4 != null ? __create(__getProtoOf(mod4)) : {}, __copyProps(
  isNodeMode || !mod4 || !mod4.__esModule ? __defProp(target, "default", { value: mod4, enumerable: true }) : target,
  mod4
));

// node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode5(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode6(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode6
  };
}
var src, _brrp__multiformats_scope_baseX, base_x_default;
var init_base_x = __esm({
  "node_modules/multiformats/esm/vendor/base-x.js"() {
    src = base;
    _brrp__multiformats_scope_baseX = src;
    base_x_default = _brrp__multiformats_scope_baseX;
  }
});

// node_modules/multiformats/esm/src/bytes.js
var empty, equals, coerce, fromString, toString;
var init_bytes = __esm({
  "node_modules/multiformats/esm/src/bytes.js"() {
    empty = new Uint8Array(0);
    equals = (aa, bb) => {
      if (aa === bb)
        return true;
      if (aa.byteLength !== bb.byteLength) {
        return false;
      }
      for (let ii = 0; ii < aa.byteLength; ii++) {
        if (aa[ii] !== bb[ii]) {
          return false;
        }
      }
      return true;
    };
    coerce = (o) => {
      if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
        return o;
      if (o instanceof ArrayBuffer)
        return new Uint8Array(o);
      if (ArrayBuffer.isView(o)) {
        return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
      }
      throw new Error("Unknown type, must be binary type");
    };
    fromString = (str) => new TextEncoder().encode(str);
    toString = (b) => new TextDecoder().decode(b);
  }
});

// node_modules/multiformats/esm/src/bases/base.js
var Encoder, Decoder, ComposedDecoder, or, Codec, from, baseX, decode, encode, rfc4648;
var init_base = __esm({
  "node_modules/multiformats/esm/src/bases/base.js"() {
    init_base_x();
    init_bytes();
    Encoder = class {
      constructor(name2, prefix, baseEncode) {
        this.name = name2;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
      }
      encode(bytes) {
        if (bytes instanceof Uint8Array) {
          return `${this.prefix}${this.baseEncode(bytes)}`;
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
    Decoder = class {
      constructor(name2, prefix, baseDecode) {
        this.name = name2;
        this.prefix = prefix;
        if (prefix.codePointAt(0) === void 0) {
          throw new Error("Invalid prefix character");
        }
        this.prefixCodePoint = prefix.codePointAt(0);
        this.baseDecode = baseDecode;
      }
      decode(text) {
        if (typeof text === "string") {
          if (text.codePointAt(0) !== this.prefixCodePoint) {
            throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
          }
          return this.baseDecode(text.slice(this.prefix.length));
        } else {
          throw Error("Can only multibase decode strings");
        }
      }
      or(decoder) {
        return or(this, decoder);
      }
    };
    ComposedDecoder = class {
      constructor(decoders) {
        this.decoders = decoders;
      }
      or(decoder) {
        return or(this, decoder);
      }
      decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) {
          return decoder.decode(input);
        } else {
          throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
        }
      }
    };
    or = (left, right) => new ComposedDecoder({
      ...left.decoders || { [left.prefix]: left },
      ...right.decoders || { [right.prefix]: right }
    });
    Codec = class {
      constructor(name2, prefix, baseEncode, baseDecode) {
        this.name = name2;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name2, prefix, baseEncode);
        this.decoder = new Decoder(name2, prefix, baseDecode);
      }
      encode(input) {
        return this.encoder.encode(input);
      }
      decode(input) {
        return this.decoder.decode(input);
      }
    };
    from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
    baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
      const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
      return from({
        prefix,
        name: name2,
        encode: encode5,
        decode: (text) => coerce(decode6(text))
      });
    };
    decode = (string2, alphabet2, bitsPerChar, name2) => {
      const codes2 = {};
      for (let i = 0; i < alphabet2.length; ++i) {
        codes2[alphabet2[i]] = i;
      }
      let end = string2.length;
      while (string2[end - 1] === "=") {
        --end;
      }
      const out = new Uint8Array(end * bitsPerChar / 8 | 0);
      let bits = 0;
      let buffer = 0;
      let written = 0;
      for (let i = 0; i < end; ++i) {
        const value = codes2[string2[i]];
        if (value === void 0) {
          throw new SyntaxError(`Non-${name2} character`);
        }
        buffer = buffer << bitsPerChar | value;
        bits += bitsPerChar;
        if (bits >= 8) {
          bits -= 8;
          out[written++] = 255 & buffer >> bits;
        }
      }
      if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
        throw new SyntaxError("Unexpected end of data");
      }
      return out;
    };
    encode = (data, alphabet2, bitsPerChar) => {
      const pad = alphabet2[alphabet2.length - 1] === "=";
      const mask = (1 << bitsPerChar) - 1;
      let out = "";
      let bits = 0;
      let buffer = 0;
      for (let i = 0; i < data.length; ++i) {
        buffer = buffer << 8 | data[i];
        bits += 8;
        while (bits > bitsPerChar) {
          bits -= bitsPerChar;
          out += alphabet2[mask & buffer >> bits];
        }
      }
      if (bits) {
        out += alphabet2[mask & buffer << bitsPerChar - bits];
      }
      if (pad) {
        while (out.length * bitsPerChar & 7) {
          out += "=";
        }
      }
      return out;
    };
    rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
      return from({
        prefix,
        name: name2,
        encode(input) {
          return encode(input, alphabet2, bitsPerChar);
        },
        decode(input) {
          return decode(input, alphabet2, bitsPerChar, name2);
        }
      });
    };
  }
});

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity;
var init_identity = __esm({
  "node_modules/multiformats/esm/src/bases/identity.js"() {
    init_base();
    init_bytes();
    identity = from({
      prefix: "\0",
      name: "identity",
      encode: (buf) => toString(buf),
      decode: (str) => fromString(str)
    });
  }
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2;
var init_base2 = __esm({
  "node_modules/multiformats/esm/src/bases/base2.js"() {
    init_base();
    base2 = rfc4648({
      prefix: "0",
      name: "base2",
      alphabet: "01",
      bitsPerChar: 1
    });
  }
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8;
var init_base8 = __esm({
  "node_modules/multiformats/esm/src/bases/base8.js"() {
    init_base();
    base8 = rfc4648({
      prefix: "7",
      name: "base8",
      alphabet: "01234567",
      bitsPerChar: 3
    });
  }
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10;
var init_base10 = __esm({
  "node_modules/multiformats/esm/src/bases/base10.js"() {
    init_base();
    base10 = baseX({
      prefix: "9",
      name: "base10",
      alphabet: "0123456789"
    });
  }
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16, base16upper;
var init_base16 = __esm({
  "node_modules/multiformats/esm/src/bases/base16.js"() {
    init_base();
    base16 = rfc4648({
      prefix: "f",
      name: "base16",
      alphabet: "0123456789abcdef",
      bitsPerChar: 4
    });
    base16upper = rfc4648({
      prefix: "F",
      name: "base16upper",
      alphabet: "0123456789ABCDEF",
      bitsPerChar: 4
    });
  }
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32, base32upper, base32pad, base32padupper, base32hex, base32hexupper, base32hexpad, base32hexpadupper, base32z;
var init_base32 = __esm({
  "node_modules/multiformats/esm/src/bases/base32.js"() {
    init_base();
    base32 = rfc4648({
      prefix: "b",
      name: "base32",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567",
      bitsPerChar: 5
    });
    base32upper = rfc4648({
      prefix: "B",
      name: "base32upper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
      bitsPerChar: 5
    });
    base32pad = rfc4648({
      prefix: "c",
      name: "base32pad",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
      bitsPerChar: 5
    });
    base32padupper = rfc4648({
      prefix: "C",
      name: "base32padupper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
      bitsPerChar: 5
    });
    base32hex = rfc4648({
      prefix: "v",
      name: "base32hex",
      alphabet: "0123456789abcdefghijklmnopqrstuv",
      bitsPerChar: 5
    });
    base32hexupper = rfc4648({
      prefix: "V",
      name: "base32hexupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
      bitsPerChar: 5
    });
    base32hexpad = rfc4648({
      prefix: "t",
      name: "base32hexpad",
      alphabet: "0123456789abcdefghijklmnopqrstuv=",
      bitsPerChar: 5
    });
    base32hexpadupper = rfc4648({
      prefix: "T",
      name: "base32hexpadupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
      bitsPerChar: 5
    });
    base32z = rfc4648({
      prefix: "h",
      name: "base32z",
      alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
      bitsPerChar: 5
    });
  }
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36, base36upper;
var init_base36 = __esm({
  "node_modules/multiformats/esm/src/bases/base36.js"() {
    init_base();
    base36 = baseX({
      prefix: "k",
      name: "base36",
      alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
    });
    base36upper = baseX({
      prefix: "K",
      name: "base36upper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
  }
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc, base58flickr;
var init_base58 = __esm({
  "node_modules/multiformats/esm/src/bases/base58.js"() {
    init_base();
    base58btc = baseX({
      name: "base58btc",
      prefix: "z",
      alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    });
    base58flickr = baseX({
      name: "base58flickr",
      prefix: "Z",
      alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
    });
  }
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64, base64pad, base64url, base64urlpad;
var init_base64 = __esm({
  "node_modules/multiformats/esm/src/bases/base64.js"() {
    init_base();
    base64 = rfc4648({
      prefix: "m",
      name: "base64",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      bitsPerChar: 6
    });
    base64pad = rfc4648({
      prefix: "M",
      name: "base64pad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      bitsPerChar: 6
    });
    base64url = rfc4648({
      prefix: "u",
      name: "base64url",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bitsPerChar: 6
    });
    base64urlpad = rfc4648({
      prefix: "U",
      name: "base64urlpad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
      bitsPerChar: 6
    });
  }
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
function encode2(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode2(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var alphabet, alphabetBytesToChars, alphabetCharsToBytes, base256emoji;
var init_base256emoji = __esm({
  "node_modules/multiformats/esm/src/bases/base256emoji.js"() {
    init_base();
    alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
    alphabetBytesToChars = alphabet.reduce((p, c, i) => {
      p[i] = c;
      return p;
    }, []);
    alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
      p[c.codePointAt(0)] = i;
      return p;
    }, []);
    base256emoji = from({
      prefix: "\u{1F680}",
      name: "base256emoji",
      encode: encode2,
      decode: decode2
    });
  }
});

// node_modules/multiformats/esm/vendor/varint.js
function encode3(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode3.bytes = offset - oldOffset + 1;
  return out;
}
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var encode_1, MSB, REST, MSBALL, INT, decode3, MSB$1, REST$1, N1, N2, N3, N4, N5, N6, N7, N8, N9, length, varint, _brrp_varint, varint_default;
var init_varint = __esm({
  "node_modules/multiformats/esm/vendor/varint.js"() {
    encode_1 = encode3;
    MSB = 128;
    REST = 127;
    MSBALL = ~REST;
    INT = Math.pow(2, 31);
    decode3 = read;
    MSB$1 = 128;
    REST$1 = 127;
    N1 = Math.pow(2, 7);
    N2 = Math.pow(2, 14);
    N3 = Math.pow(2, 21);
    N4 = Math.pow(2, 28);
    N5 = Math.pow(2, 35);
    N6 = Math.pow(2, 42);
    N7 = Math.pow(2, 49);
    N8 = Math.pow(2, 56);
    N9 = Math.pow(2, 63);
    length = function(value) {
      return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
    };
    varint = {
      encode: encode_1,
      decode: decode3,
      encodingLength: length
    };
    _brrp_varint = varint;
    varint_default = _brrp_varint;
  }
});

// node_modules/multiformats/esm/src/varint.js
var decode4, encodeTo, encodingLength;
var init_varint2 = __esm({
  "node_modules/multiformats/esm/src/varint.js"() {
    init_varint();
    decode4 = (data) => {
      const code2 = varint_default.decode(data);
      return [
        code2,
        varint_default.decode.bytes
      ];
    };
    encodeTo = (int, target, offset = 0) => {
      varint_default.encode(int, target, offset);
      return target;
    };
    encodingLength = (int) => {
      return varint_default.encodingLength(int);
    };
  }
});

// node_modules/multiformats/esm/src/hashes/digest.js
var create, decode5, equals2, Digest;
var init_digest = __esm({
  "node_modules/multiformats/esm/src/hashes/digest.js"() {
    init_bytes();
    init_varint2();
    create = (code2, digest2) => {
      const size = digest2.byteLength;
      const sizeOffset = encodingLength(code2);
      const digestOffset = sizeOffset + encodingLength(size);
      const bytes = new Uint8Array(digestOffset + size);
      encodeTo(code2, bytes, 0);
      encodeTo(size, bytes, sizeOffset);
      bytes.set(digest2, digestOffset);
      return new Digest(code2, size, digest2, bytes);
    };
    decode5 = (multihash) => {
      const bytes = coerce(multihash);
      const [code2, sizeOffset] = decode4(bytes);
      const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
      const digest2 = bytes.subarray(sizeOffset + digestOffset);
      if (digest2.byteLength !== size) {
        throw new Error("Incorrect length");
      }
      return new Digest(code2, size, digest2, bytes);
    };
    equals2 = (a, b) => {
      if (a === b) {
        return true;
      } else {
        return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
      }
    };
    Digest = class {
      constructor(code2, size, digest2, bytes) {
        this.code = code2;
        this.size = size;
        this.digest = digest2;
        this.bytes = bytes;
      }
    };
  }
});

// node_modules/multiformats/esm/src/hashes/hasher.js
var from2, Hasher;
var init_hasher = __esm({
  "node_modules/multiformats/esm/src/hashes/hasher.js"() {
    init_digest();
    from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
    Hasher = class {
      constructor(name2, code2, encode5) {
        this.name = name2;
        this.code = code2;
        this.encode = encode5;
      }
      digest(input) {
        if (input instanceof Uint8Array) {
          const result = this.encode(input);
          return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
  }
});

// node_modules/multiformats/esm/src/hashes/sha2.js
var sha2_exports = {};
__export(sha2_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});
var import_crypto, sha256, sha512;
var init_sha2 = __esm({
  "node_modules/multiformats/esm/src/hashes/sha2.js"() {
    import_crypto = __toESM(require("crypto"), 1);
    init_hasher();
    init_bytes();
    sha256 = from2({
      name: "sha2-256",
      code: 18,
      encode: (input) => coerce(import_crypto.default.createHash("sha256").update(input).digest())
    });
    sha512 = from2({
      name: "sha2-512",
      code: 19,
      encode: (input) => coerce(import_crypto.default.createHash("sha512").update(input).digest())
    });
  }
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code, name, encode4, digest, identity2;
var init_identity2 = __esm({
  "node_modules/multiformats/esm/src/hashes/identity.js"() {
    init_bytes();
    init_digest();
    code = 0;
    name = "identity";
    encode4 = coerce;
    digest = (input) => create(code, encode4(input));
    identity2 = {
      code,
      name,
      encode: encode4,
      digest
    };
  }
});

// node_modules/multiformats/esm/src/codecs/raw.js
var init_raw = __esm({
  "node_modules/multiformats/esm/src/codecs/raw.js"() {
    init_bytes();
  }
});

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder, textDecoder;
var init_json = __esm({
  "node_modules/multiformats/esm/src/codecs/json.js"() {
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();
  }
});

// node_modules/multiformats/esm/src/cid.js
var CID, parseCIDtoBytes, toStringV0, toStringV1, DAG_PB_CODE, SHA_256_CODE, encodeCID, cidSymbol, readonly, hidden, version, deprecate, IS_CID_DEPRECATION;
var init_cid = __esm({
  "node_modules/multiformats/esm/src/cid.js"() {
    init_varint2();
    init_digest();
    init_base58();
    init_base32();
    init_bytes();
    CID = class {
      constructor(version2, code2, multihash, bytes) {
        this.code = code2;
        this.version = version2;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = /* @__PURE__ */ new Map();
        Object.defineProperties(this, {
          byteOffset: hidden,
          byteLength: hidden,
          code: readonly,
          version: readonly,
          multihash: readonly,
          bytes: readonly,
          _baseCache: hidden,
          asCID: hidden
        });
      }
      toV0() {
        switch (this.version) {
          case 0: {
            return this;
          }
          default: {
            const { code: code2, multihash } = this;
            if (code2 !== DAG_PB_CODE) {
              throw new Error("Cannot convert a non dag-pb CID to CIDv0");
            }
            if (multihash.code !== SHA_256_CODE) {
              throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
            }
            return CID.createV0(multihash);
          }
        }
      }
      toV1() {
        switch (this.version) {
          case 0: {
            const { code: code2, digest: digest2 } = this.multihash;
            const multihash = create(code2, digest2);
            return CID.createV1(this.code, multihash);
          }
          case 1: {
            return this;
          }
          default: {
            throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
          }
        }
      }
      equals(other) {
        return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
      }
      toString(base3) {
        const { bytes, version: version2, _baseCache } = this;
        switch (version2) {
          case 0:
            return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
          default:
            return toStringV1(bytes, _baseCache, base3 || base32.encoder);
        }
      }
      toJSON() {
        return {
          code: this.code,
          version: this.version,
          hash: this.multihash.bytes
        };
      }
      get [Symbol.toStringTag]() {
        return "CID";
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
      }
      get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
      }
      get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
      }
      get buffer() {
        throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
      }
      get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
      }
      get prefix() {
        throw new Error('"prefix" property is deprecated');
      }
      static asCID(value) {
        if (value instanceof CID) {
          return value;
        } else if (value != null && value.asCID === value) {
          const { version: version2, code: code2, multihash, bytes } = value;
          return new CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
          const { version: version2, multihash, code: code2 } = value;
          const digest2 = decode5(multihash);
          return CID.create(version2, code2, digest2);
        } else {
          return null;
        }
      }
      static create(version2, code2, digest2) {
        if (typeof code2 !== "number") {
          throw new Error("String codecs are no longer supported");
        }
        switch (version2) {
          case 0: {
            if (code2 !== DAG_PB_CODE) {
              throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
            } else {
              return new CID(version2, code2, digest2, digest2.bytes);
            }
          }
          case 1: {
            const bytes = encodeCID(version2, code2, digest2.bytes);
            return new CID(version2, code2, digest2, bytes);
          }
          default: {
            throw new Error("Invalid version");
          }
        }
      }
      static createV0(digest2) {
        return CID.create(0, DAG_PB_CODE, digest2);
      }
      static createV1(code2, digest2) {
        return CID.create(1, code2, digest2);
      }
      static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length) {
          throw new Error("Incorrect length");
        }
        return cid;
      }
      static decodeFirst(bytes) {
        const specs = CID.inspectBytes(bytes);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) {
          throw new Error("Incorrect length");
        }
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
        return [
          cid,
          bytes.subarray(specs.size)
        ];
      }
      static inspectBytes(initialBytes) {
        let offset = 0;
        const next = () => {
          const [i, length2] = decode4(initialBytes.subarray(offset));
          offset += length2;
          return i;
        };
        let version2 = next();
        let codec = DAG_PB_CODE;
        if (version2 === 18) {
          version2 = 0;
          offset = 0;
        } else if (version2 === 1) {
          codec = next();
        }
        if (version2 !== 0 && version2 !== 1) {
          throw new RangeError(`Invalid CID version ${version2}`);
        }
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
          version: version2,
          codec,
          multihashCode,
          digestSize,
          multihashSize,
          size
        };
      }
      static parse(source, base3) {
        const [prefix, bytes] = parseCIDtoBytes(source, base3);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
      }
    };
    parseCIDtoBytes = (source, base3) => {
      switch (source[0]) {
        case "Q": {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(`${base58btc.prefix}${source}`)
          ];
        }
        case base58btc.prefix: {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(source)
          ];
        }
        case base32.prefix: {
          const decoder = base3 || base32;
          return [
            base32.prefix,
            decoder.decode(source)
          ];
        }
        default: {
          if (base3 == null) {
            throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
          }
          return [
            source[0],
            base3.decode(source)
          ];
        }
      }
    };
    toStringV0 = (bytes, cache, base3) => {
      const { prefix } = base3;
      if (prefix !== base58btc.prefix) {
        throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
      }
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes).slice(1);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    toStringV1 = (bytes, cache, base3) => {
      const { prefix } = base3;
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    DAG_PB_CODE = 112;
    SHA_256_CODE = 18;
    encodeCID = (version2, code2, multihash) => {
      const codeOffset = encodingLength(version2);
      const hashOffset = codeOffset + encodingLength(code2);
      const bytes = new Uint8Array(hashOffset + multihash.byteLength);
      encodeTo(version2, bytes, 0);
      encodeTo(code2, bytes, codeOffset);
      bytes.set(multihash, hashOffset);
      return bytes;
    };
    cidSymbol = Symbol.for("@ipld/js-cid/CID");
    readonly = {
      writable: false,
      configurable: false,
      enumerable: true
    };
    hidden = {
      writable: false,
      enumerable: false,
      configurable: false
    };
    version = "0.0.0-dev";
    deprecate = (range, message2) => {
      if (range.test(version)) {
        console.warn(message2);
      } else {
        throw new Error(message2);
      }
    };
    IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
  }
});

// node_modules/multiformats/esm/src/index.js
var init_src = __esm({
  "node_modules/multiformats/esm/src/index.js"() {
    init_cid();
    init_varint2();
    init_bytes();
    init_hasher();
    init_digest();
  }
});

// node_modules/multiformats/esm/src/basics.js
var bases, hashes;
var init_basics = __esm({
  "node_modules/multiformats/esm/src/basics.js"() {
    init_identity();
    init_base2();
    init_base8();
    init_base10();
    init_base16();
    init_base32();
    init_base36();
    init_base58();
    init_base64();
    init_base256emoji();
    init_sha2();
    init_identity2();
    init_raw();
    init_json();
    init_src();
    bases = {
      ...identity_exports,
      ...base2_exports,
      ...base8_exports,
      ...base10_exports,
      ...base16_exports,
      ...base32_exports,
      ...base36_exports,
      ...base58_exports,
      ...base64_exports,
      ...base256emoji_exports
    };
    hashes = {
      ...sha2_exports,
      ...identity_exports2
    };
  }
});

// node_modules/uint8arrays/esm/src/alloc.js
function alloc(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.alloc != null) {
    return globalThis.Buffer.alloc(size);
  }
  return new Uint8Array(size);
}
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return globalThis.Buffer.allocUnsafe(size);
  }
  return new Uint8Array(size);
}
var init_alloc = __esm({
  "node_modules/uint8arrays/esm/src/alloc.js"() {
  }
});

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string, ascii, BASES, bases_default;
var init_bases = __esm({
  "node_modules/uint8arrays/esm/src/util/bases.js"() {
    init_basics();
    init_alloc();
    string = createCodec("utf8", "u", (buf) => {
      const decoder = new TextDecoder("utf8");
      return "u" + decoder.decode(buf);
    }, (str) => {
      const encoder = new TextEncoder();
      return encoder.encode(str.substring(1));
    });
    ascii = createCodec("ascii", "a", (buf) => {
      let string2 = "a";
      for (let i = 0; i < buf.length; i++) {
        string2 += String.fromCharCode(buf[i]);
      }
      return string2;
    }, (str) => {
      str = str.substring(1);
      const buf = allocUnsafe(str.length);
      for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    });
    BASES = {
      utf8: string,
      "utf-8": string,
      hex: bases.base16,
      latin1: ascii,
      ascii,
      binary: ascii,
      ...bases
    };
    bases_default = BASES;
  }
});

// node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
var init_to_string = __esm({
  "node_modules/uint8arrays/esm/src/to-string.js"() {
    init_bases();
  }
});

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base642 = exports2;
    base642.length = function length2(string2) {
      var p = string2.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string2.charAt(p) === "=")
        ++n;
      return Math.ceil(string2.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base642.encode = function encode5(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base642.decode = function decode6(string2, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string2.length; ) {
        var c = string2.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base642.test = function test(string2) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string2);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign3 = val < 0 ? 1 : 0;
            if (sign3)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign3 << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign3 << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign3 << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign3 = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign3 * Infinity : exponent === 0 ? sign3 * 1401298464324817e-60 * mantissa : sign3 * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign3 = val < 0 ? 1 : 0;
            if (sign3)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign3 << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign3 << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign3 << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign3 = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign3 * Infinity : exponent === 0 ? sign3 * 5e-324 * mantissa : sign3 * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string2) {
      var len = 0, c = 0;
      for (var i = 0; i < string2.length; ++i) {
        c = string2.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string2.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string2, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string2.length; ++i) {
        c1 = string2.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc2, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc2(size2);
        if (offset + size2 > SIZE) {
          slab = alloc2(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign3 = value < 0;
      if (sign3)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign3) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from3(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length2() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util.isset = util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge2(dst, src2, ifNotSet) {
      for (var keys = Object.keys(src2), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src2[keys[i]];
      return dst;
    }
    util.merge = merge2;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name2) {
      function CustomError(message2, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message2, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message2;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge2(this, properties);
      }
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get() {
            return name2;
          },
          set: void 0,
          enumerable: false,
          configurable: true
        },
        toString: {
          value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name2) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name2)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer2;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base642 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer2() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create4 = function create5() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer2.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer2();
      };
    };
    Writer2.create = create4();
    Writer2.alloc = function alloc2(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer2.alloc = util.pool(Writer2.alloc, util.Array.prototype.subarray);
    Writer2.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer2.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer2.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer2.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer2.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer2.prototype.int64 = Writer2.prototype.uint64;
    Writer2.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer2.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer2.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer2.prototype.sfixed32 = Writer2.prototype.fixed32;
    Writer2.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer2.prototype.sfixed64 = Writer2.prototype.fixed64;
    Writer2.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer2.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer2.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer2.alloc(len = base642.length(value));
        base642.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer2.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer2.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer2.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer2.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer2.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer2._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer2.create = create4();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer2 = require_writer();
    (BufferWriter.prototype = Object.create(Writer2.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer2.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader2;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader2, writeLength) {
      return RangeError("index out of range: " + reader2.pos + " + " + (writeLength || 1) + " > " + reader2.len);
    }
    function Reader2(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader2(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader2(buffer);
      throw Error("illegal buffer");
    };
    var create4 = function create5() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader2.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader2.create = create4();
    Reader2.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
    Reader2.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader2.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader2.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader2.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader2.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader2.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader2.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader2.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader2.prototype.bytes = function read_bytes() {
      var length2 = this.uint32(), start = this.pos, end = this.pos + length2;
      if (end > this.len)
        throw indexOutOfRange(this, length2);
      this.pos += length2;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader2.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader2.prototype.skip = function skip(length2) {
      if (typeof length2 === "number") {
        if (this.pos + length2 > this.len)
          throw indexOutOfRange(this, length2);
        this.pos += length2;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader2.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader2._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader2.create = create4();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : "toNumber";
      util.merge(Reader2.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader2 = require_reader();
    (BufferReader.prototype = Object.create(Reader2.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader2.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(true);
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// node_modules/@protobufjs/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/@protobufjs/codegen/index.js"(exports2, module2) {
    "use strict";
    module2.exports = codegen;
    function codegen(functionParams, functionName) {
      if (typeof functionParams === "string") {
        functionName = functionParams;
        functionParams = void 0;
      }
      var body = [];
      function Codegen(formatStringOrScope) {
        if (typeof formatStringOrScope !== "string") {
          var source = toString3();
          if (codegen.verbose)
            console.log("codegen: " + source);
          source = "return " + source;
          if (formatStringOrScope) {
            var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
            while (scopeOffset < scopeKeys.length) {
              scopeParams[scopeOffset] = scopeKeys[scopeOffset];
              scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
            }
            scopeParams[scopeOffset] = source;
            return Function.apply(null, scopeParams).apply(null, scopeValues);
          }
          return Function(source)();
        }
        var formatParams = new Array(arguments.length - 1), formatOffset = 0;
        while (formatOffset < formatParams.length)
          formatParams[formatOffset] = arguments[++formatOffset];
        formatOffset = 0;
        formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
          var value = formatParams[formatOffset++];
          switch ($1) {
            case "d":
            case "f":
              return String(Number(value));
            case "i":
              return String(Math.floor(value));
            case "j":
              return JSON.stringify(value);
            case "s":
              return String(value);
          }
          return "%";
        });
        if (formatOffset !== formatParams.length)
          throw Error("parameter count mismatch");
        body.push(formatStringOrScope);
        return Codegen;
      }
      function toString3(functionNameOverride) {
        return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
      }
      Codegen.toString = toString3;
      return Codegen;
    }
    codegen.verbose = false;
  }
});

// node_modules/@protobufjs/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/@protobufjs/fetch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = fetch;
    var asPromise = require_aspromise();
    var inquire2 = require_inquire();
    var fs = inquire2("fs");
    function fetch(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (!options)
        options = {};
      if (!callback)
        return asPromise(fetch, this, filename, options);
      if (!options.xhr && fs && fs.readFile)
        return fs.readFile(filename, function fetchReadFileCallback(err, contents) {
          return err && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err ? callback(err) : callback(null, options.binary ? contents : contents.toString("utf8"));
        });
      return fetch.xhr(filename, options, callback);
    }
    fetch.xhr = function fetch_xhr(filename, options, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function fetchOnReadyStateChange() {
        if (xhr.readyState !== 4)
          return void 0;
        if (xhr.status !== 0 && xhr.status !== 200)
          return callback(Error("status " + xhr.status));
        if (options.binary) {
          var buffer = xhr.response;
          if (!buffer) {
            buffer = [];
            for (var i = 0; i < xhr.responseText.length; ++i)
              buffer.push(xhr.responseText.charCodeAt(i) & 255);
          }
          return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
        }
        return callback(null, xhr.responseText);
      };
      if (options.binary) {
        if ("overrideMimeType" in xhr)
          xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.responseType = "arraybuffer";
      }
      xhr.open("GET", filename);
      xhr.send();
    };
  }
});

// node_modules/@protobufjs/path/index.js
var require_path = __commonJS({
  "node_modules/@protobufjs/path/index.js"(exports2) {
    "use strict";
    var path2 = exports2;
    var isAbsolute = path2.isAbsolute = function isAbsolute2(path3) {
      return /^(?:\/|\w+:)/.test(path3);
    };
    var normalize = path2.normalize = function normalize2(path3) {
      path3 = path3.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
      var parts = path3.split("/"), absolute = isAbsolute(path3), prefix = "";
      if (absolute)
        prefix = parts.shift() + "/";
      for (var i = 0; i < parts.length; ) {
        if (parts[i] === "..") {
          if (i > 0 && parts[i - 1] !== "..")
            parts.splice(--i, 2);
          else if (absolute)
            parts.splice(i, 1);
          else
            ++i;
        } else if (parts[i] === ".")
          parts.splice(i, 1);
        else
          ++i;
      }
      return prefix + parts.join("/");
    };
    path2.resolve = function resolve(originPath, includePath, alreadyNormalized) {
      if (!alreadyNormalized)
        includePath = normalize(includePath);
      if (isAbsolute(includePath))
        return includePath;
      if (!alreadyNormalized)
        originPath = normalize(originPath);
      return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
    };
  }
});

// node_modules/protobufjs/src/types.js
var require_types = __commonJS({
  "node_modules/protobufjs/src/types.js"(exports2) {
    "use strict";
    var types = exports2;
    var util = require_util();
    var s = [
      "double",
      "float",
      "int32",
      "uint32",
      "sint32",
      "fixed32",
      "sfixed32",
      "int64",
      "uint64",
      "sint64",
      "fixed64",
      "sfixed64",
      "bool",
      "string",
      "bytes"
    ];
    function bake(values, offset) {
      var i = 0, o = {};
      offset |= 0;
      while (i < values.length)
        o[s[i + offset]] = values[i++];
      return o;
    }
    types.basic = bake([
      1,
      5,
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0,
      2,
      2
    ]);
    types.defaults = bake([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      false,
      "",
      util.emptyArray,
      null
    ]);
    types.long = bake([
      0,
      0,
      0,
      1,
      1
    ], 7);
    types.mapKey = bake([
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0,
      2
    ], 2);
    types.packed = bake([
      1,
      5,
      0,
      0,
      0,
      5,
      5,
      0,
      0,
      0,
      1,
      1,
      0
    ]);
  }
});

// node_modules/protobufjs/src/field.js
var require_field = __commonJS({
  "node_modules/protobufjs/src/field.js"(exports2, module2) {
    "use strict";
    module2.exports = Field;
    var ReflectionObject = require_object();
    ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    var Type;
    var ruleRe = /^required|optional|repeated$/;
    Field.fromJSON = function fromJSON(name2, json) {
      return new Field(name2, json.id, json.type, json.rule, json.extend, json.options, json.comment);
    };
    function Field(name2, id, type, rule, extend, options, comment) {
      if (util.isObject(rule)) {
        comment = extend;
        options = rule;
        rule = extend = void 0;
      } else if (util.isObject(extend)) {
        comment = options;
        options = extend;
        extend = void 0;
      }
      ReflectionObject.call(this, name2, options);
      if (!util.isInteger(id) || id < 0)
        throw TypeError("id must be a non-negative integer");
      if (!util.isString(type))
        throw TypeError("type must be a string");
      if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
        throw TypeError("rule must be a string rule");
      if (extend !== void 0 && !util.isString(extend))
        throw TypeError("extend must be a string");
      if (rule === "proto3_optional") {
        rule = "optional";
      }
      this.rule = rule && rule !== "optional" ? rule : void 0;
      this.type = type;
      this.id = id;
      this.extend = extend || void 0;
      this.required = rule === "required";
      this.optional = !this.required;
      this.repeated = rule === "repeated";
      this.map = false;
      this.message = null;
      this.partOf = null;
      this.typeDefault = null;
      this.defaultValue = null;
      this.long = util.Long ? types.long[type] !== void 0 : false;
      this.bytes = type === "bytes";
      this.resolvedType = null;
      this.extensionField = null;
      this.declaringField = null;
      this._packed = null;
      this.comment = comment;
    }
    Object.defineProperty(Field.prototype, "packed", {
      get: function() {
        if (this._packed === null)
          this._packed = this.getOption("packed") !== false;
        return this._packed;
      }
    });
    Field.prototype.setOption = function setOption(name2, value, ifNotSet) {
      if (name2 === "packed")
        this._packed = null;
      return ReflectionObject.prototype.setOption.call(this, name2, value, ifNotSet);
    };
    Field.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "rule",
        this.rule !== "optional" && this.rule || void 0,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Field.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if ((this.typeDefault = types.defaults[this.type]) === void 0) {
        this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
        if (this.resolvedType instanceof Type)
          this.typeDefault = null;
        else
          this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
      } else if (this.options && this.options.proto3_optional) {
        this.typeDefault = null;
      }
      if (this.options && this.options["default"] != null) {
        this.typeDefault = this.options["default"];
        if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
          this.typeDefault = this.resolvedType.values[this.typeDefault];
      }
      if (this.options) {
        if (this.options.packed === true || this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
          delete this.options.packed;
        if (!Object.keys(this.options).length)
          this.options = void 0;
      }
      if (this.long) {
        this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
        if (Object.freeze)
          Object.freeze(this.typeDefault);
      } else if (this.bytes && typeof this.typeDefault === "string") {
        var buf;
        if (util.base64.test(this.typeDefault))
          util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
        else
          util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
        this.typeDefault = buf;
      }
      if (this.map)
        this.defaultValue = util.emptyObject;
      else if (this.repeated)
        this.defaultValue = util.emptyArray;
      else
        this.defaultValue = this.typeDefault;
      if (this.parent instanceof Type)
        this.parent.ctor.prototype[this.name] = this.defaultValue;
      return ReflectionObject.prototype.resolve.call(this);
    };
    Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
      if (typeof fieldType === "function")
        fieldType = util.decorateType(fieldType).name;
      else if (fieldType && typeof fieldType === "object")
        fieldType = util.decorateEnum(fieldType).name;
      return function fieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
      };
    };
    Field._configure = function configure(Type_) {
      Type = Type_;
    };
  }
});

// node_modules/protobufjs/src/oneof.js
var require_oneof = __commonJS({
  "node_modules/protobufjs/src/oneof.js"(exports2, module2) {
    "use strict";
    module2.exports = OneOf;
    var ReflectionObject = require_object();
    ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
    var Field = require_field();
    var util = require_util();
    function OneOf(name2, fieldNames, options, comment) {
      if (!Array.isArray(fieldNames)) {
        options = fieldNames;
        fieldNames = void 0;
      }
      ReflectionObject.call(this, name2, options);
      if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
        throw TypeError("fieldNames must be an Array");
      this.oneof = fieldNames || [];
      this.fieldsArray = [];
      this.comment = comment;
    }
    OneOf.fromJSON = function fromJSON(name2, json) {
      return new OneOf(name2, json.oneof, json.options, json.comment);
    };
    OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "oneof",
        this.oneof,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    function addFieldsToParent(oneof) {
      if (oneof.parent) {
        for (var i = 0; i < oneof.fieldsArray.length; ++i)
          if (!oneof.fieldsArray[i].parent)
            oneof.parent.add(oneof.fieldsArray[i]);
      }
    }
    OneOf.prototype.add = function add(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      if (field.parent && field.parent !== this.parent)
        field.parent.remove(field);
      this.oneof.push(field.name);
      this.fieldsArray.push(field);
      field.partOf = this;
      addFieldsToParent(this);
      return this;
    };
    OneOf.prototype.remove = function remove(field) {
      if (!(field instanceof Field))
        throw TypeError("field must be a Field");
      var index = this.fieldsArray.indexOf(field);
      if (index < 0)
        throw Error(field + " is not a member of " + this);
      this.fieldsArray.splice(index, 1);
      index = this.oneof.indexOf(field.name);
      if (index > -1)
        this.oneof.splice(index, 1);
      field.partOf = null;
      return this;
    };
    OneOf.prototype.onAdd = function onAdd(parent) {
      ReflectionObject.prototype.onAdd.call(this, parent);
      var self2 = this;
      for (var i = 0; i < this.oneof.length; ++i) {
        var field = parent.get(this.oneof[i]);
        if (field && !field.partOf) {
          field.partOf = self2;
          self2.fieldsArray.push(field);
        }
      }
      addFieldsToParent(this);
    };
    OneOf.prototype.onRemove = function onRemove(parent) {
      for (var i = 0, field; i < this.fieldsArray.length; ++i)
        if ((field = this.fieldsArray[i]).parent)
          field.parent.remove(field);
      ReflectionObject.prototype.onRemove.call(this, parent);
    };
    OneOf.d = function decorateOneOf() {
      var fieldNames = new Array(arguments.length), index = 0;
      while (index < arguments.length)
        fieldNames[index] = arguments[index++];
      return function oneOfDecorator(prototype, oneofName) {
        util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
        Object.defineProperty(prototype, oneofName, {
          get: util.oneOfGetter(fieldNames),
          set: util.oneOfSetter(fieldNames)
        });
      };
    };
  }
});

// node_modules/protobufjs/src/namespace.js
var require_namespace = __commonJS({
  "node_modules/protobufjs/src/namespace.js"(exports2, module2) {
    "use strict";
    module2.exports = Namespace;
    var ReflectionObject = require_object();
    ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
    var Field = require_field();
    var util = require_util();
    var OneOf = require_oneof();
    var Type;
    var Service;
    var Enum;
    Namespace.fromJSON = function fromJSON(name2, json) {
      return new Namespace(name2, json.options).addJSON(json.nested);
    };
    function arrayToJSON(array, toJSONOptions) {
      if (!(array && array.length))
        return void 0;
      var obj = {};
      for (var i = 0; i < array.length; ++i)
        obj[array[i].name] = array[i].toJSON(toJSONOptions);
      return obj;
    }
    Namespace.arrayToJSON = arrayToJSON;
    Namespace.isReservedId = function isReservedId(reserved, id) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id)
            return true;
      }
      return false;
    };
    Namespace.isReservedName = function isReservedName(reserved, name2) {
      if (reserved) {
        for (var i = 0; i < reserved.length; ++i)
          if (reserved[i] === name2)
            return true;
      }
      return false;
    };
    function Namespace(name2, options) {
      ReflectionObject.call(this, name2, options);
      this.nested = void 0;
      this._nestedArray = null;
    }
    function clearCache(namespace) {
      namespace._nestedArray = null;
      return namespace;
    }
    Object.defineProperty(Namespace.prototype, "nestedArray", {
      get: function() {
        return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
      }
    });
    Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
      return util.toObject([
        "options",
        this.options,
        "nested",
        arrayToJSON(this.nestedArray, toJSONOptions)
      ]);
    };
    Namespace.prototype.addJSON = function addJSON(nestedJson) {
      var ns = this;
      if (nestedJson) {
        for (var names2 = Object.keys(nestedJson), i = 0, nested; i < names2.length; ++i) {
          nested = nestedJson[names2[i]];
          ns.add(
            (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names2[i], nested)
          );
        }
      }
      return this;
    };
    Namespace.prototype.get = function get(name2) {
      return this.nested && this.nested[name2] || null;
    };
    Namespace.prototype.getEnum = function getEnum(name2) {
      if (this.nested && this.nested[name2] instanceof Enum)
        return this.nested[name2].values;
      throw Error("no such enum: " + name2);
    };
    Namespace.prototype.add = function add(object) {
      if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof OneOf || object instanceof Enum || object instanceof Service || object instanceof Namespace))
        throw TypeError("object must be a valid nested object");
      if (!this.nested)
        this.nested = {};
      else {
        var prev = this.get(object.name);
        if (prev) {
          if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
            var nested = prev.nestedArray;
            for (var i = 0; i < nested.length; ++i)
              object.add(nested[i]);
            this.remove(prev);
            if (!this.nested)
              this.nested = {};
            object.setOptions(prev.options, true);
          } else
            throw Error("duplicate name '" + object.name + "' in " + this);
        }
      }
      this.nested[object.name] = object;
      object.onAdd(this);
      return clearCache(this);
    };
    Namespace.prototype.remove = function remove(object) {
      if (!(object instanceof ReflectionObject))
        throw TypeError("object must be a ReflectionObject");
      if (object.parent !== this)
        throw Error(object + " is not a member of " + this);
      delete this.nested[object.name];
      if (!Object.keys(this.nested).length)
        this.nested = void 0;
      object.onRemove(this);
      return clearCache(this);
    };
    Namespace.prototype.define = function define(path2, json) {
      if (util.isString(path2))
        path2 = path2.split(".");
      else if (!Array.isArray(path2))
        throw TypeError("illegal path");
      if (path2 && path2.length && path2[0] === "")
        throw Error("path must be relative");
      var ptr = this;
      while (path2.length > 0) {
        var part = path2.shift();
        if (ptr.nested && ptr.nested[part]) {
          ptr = ptr.nested[part];
          if (!(ptr instanceof Namespace))
            throw Error("path conflicts with non-namespace objects");
        } else
          ptr.add(ptr = new Namespace(part));
      }
      if (json)
        ptr.addJSON(json);
      return ptr;
    };
    Namespace.prototype.resolveAll = function resolveAll() {
      var nested = this.nestedArray, i = 0;
      while (i < nested.length)
        if (nested[i] instanceof Namespace)
          nested[i++].resolveAll();
        else
          nested[i++].resolve();
      return this.resolve();
    };
    Namespace.prototype.lookup = function lookup(path2, filterTypes, parentAlreadyChecked) {
      if (typeof filterTypes === "boolean") {
        parentAlreadyChecked = filterTypes;
        filterTypes = void 0;
      } else if (filterTypes && !Array.isArray(filterTypes))
        filterTypes = [filterTypes];
      if (util.isString(path2) && path2.length) {
        if (path2 === ".")
          return this.root;
        path2 = path2.split(".");
      } else if (!path2.length)
        return this;
      if (path2[0] === "")
        return this.root.lookup(path2.slice(1), filterTypes);
      var found = this.get(path2[0]);
      if (found) {
        if (path2.length === 1) {
          if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
            return found;
        } else if (found instanceof Namespace && (found = found.lookup(path2.slice(1), filterTypes, true)))
          return found;
      } else
        for (var i = 0; i < this.nestedArray.length; ++i)
          if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path2, filterTypes, true)))
            return found;
      if (this.parent === null || parentAlreadyChecked)
        return null;
      return this.parent.lookup(path2, filterTypes);
    };
    Namespace.prototype.lookupType = function lookupType(path2) {
      var found = this.lookup(path2, [Type]);
      if (!found)
        throw Error("no such type: " + path2);
      return found;
    };
    Namespace.prototype.lookupEnum = function lookupEnum(path2) {
      var found = this.lookup(path2, [Enum]);
      if (!found)
        throw Error("no such Enum '" + path2 + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path2) {
      var found = this.lookup(path2, [Type, Enum]);
      if (!found)
        throw Error("no such Type or Enum '" + path2 + "' in " + this);
      return found;
    };
    Namespace.prototype.lookupService = function lookupService(path2) {
      var found = this.lookup(path2, [Service]);
      if (!found)
        throw Error("no such Service '" + path2 + "' in " + this);
      return found;
    };
    Namespace._configure = function(Type_, Service_, Enum_) {
      Type = Type_;
      Service = Service_;
      Enum = Enum_;
    };
  }
});

// node_modules/protobufjs/src/mapfield.js
var require_mapfield = __commonJS({
  "node_modules/protobufjs/src/mapfield.js"(exports2, module2) {
    "use strict";
    module2.exports = MapField;
    var Field = require_field();
    ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
    var types = require_types();
    var util = require_util();
    function MapField(name2, id, keyType, type, options, comment) {
      Field.call(this, name2, id, type, void 0, void 0, options, comment);
      if (!util.isString(keyType))
        throw TypeError("keyType must be a string");
      this.keyType = keyType;
      this.resolvedKeyType = null;
      this.map = true;
    }
    MapField.fromJSON = function fromJSON(name2, json) {
      return new MapField(name2, json.id, json.keyType, json.type, json.options, json.comment);
    };
    MapField.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "keyType",
        this.keyType,
        "type",
        this.type,
        "id",
        this.id,
        "extend",
        this.extend,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    MapField.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (types.mapKey[this.keyType] === void 0)
        throw Error("invalid key type: " + this.keyType);
      return Field.prototype.resolve.call(this);
    };
    MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
      if (typeof fieldValueType === "function")
        fieldValueType = util.decorateType(fieldValueType).name;
      else if (fieldValueType && typeof fieldValueType === "object")
        fieldValueType = util.decorateEnum(fieldValueType).name;
      return function mapFieldDecorator(prototype, fieldName) {
        util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
      };
    };
  }
});

// node_modules/protobufjs/src/method.js
var require_method = __commonJS({
  "node_modules/protobufjs/src/method.js"(exports2, module2) {
    "use strict";
    module2.exports = Method;
    var ReflectionObject = require_object();
    ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
    var util = require_util();
    function Method(name2, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
      if (util.isObject(requestStream)) {
        options = requestStream;
        requestStream = responseStream = void 0;
      } else if (util.isObject(responseStream)) {
        options = responseStream;
        responseStream = void 0;
      }
      if (!(type === void 0 || util.isString(type)))
        throw TypeError("type must be a string");
      if (!util.isString(requestType))
        throw TypeError("requestType must be a string");
      if (!util.isString(responseType))
        throw TypeError("responseType must be a string");
      ReflectionObject.call(this, name2, options);
      this.type = type || "rpc";
      this.requestType = requestType;
      this.requestStream = requestStream ? true : void 0;
      this.responseType = responseType;
      this.responseStream = responseStream ? true : void 0;
      this.resolvedRequestType = null;
      this.resolvedResponseType = null;
      this.comment = comment;
      this.parsedOptions = parsedOptions;
    }
    Method.fromJSON = function fromJSON(name2, json) {
      return new Method(name2, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
    };
    Method.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "type",
        this.type !== "rpc" && this.type || void 0,
        "requestType",
        this.requestType,
        "requestStream",
        this.requestStream,
        "responseType",
        this.responseType,
        "responseStream",
        this.responseStream,
        "options",
        this.options,
        "comment",
        keepComments ? this.comment : void 0,
        "parsedOptions",
        this.parsedOptions
      ]);
    };
    Method.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      this.resolvedRequestType = this.parent.lookupType(this.requestType);
      this.resolvedResponseType = this.parent.lookupType(this.responseType);
      return ReflectionObject.prototype.resolve.call(this);
    };
  }
});

// node_modules/protobufjs/src/service.js
var require_service2 = __commonJS({
  "node_modules/protobufjs/src/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var Namespace = require_namespace();
    ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
    var Method = require_method();
    var util = require_util();
    var rpc = require_rpc();
    function Service(name2, options) {
      Namespace.call(this, name2, options);
      this.methods = {};
      this._methodsArray = null;
    }
    Service.fromJSON = function fromJSON(name2, json) {
      var service = new Service(name2, json.options);
      if (json.methods)
        for (var names2 = Object.keys(json.methods), i = 0; i < names2.length; ++i)
          service.add(Method.fromJSON(names2[i], json.methods[names2[i]]));
      if (json.nested)
        service.addJSON(json.nested);
      service.comment = json.comment;
      return service;
    };
    Service.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "methods",
        Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || {},
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Object.defineProperty(Service.prototype, "methodsArray", {
      get: function() {
        return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
      }
    });
    function clearCache(service) {
      service._methodsArray = null;
      return service;
    }
    Service.prototype.get = function get(name2) {
      return this.methods[name2] || Namespace.prototype.get.call(this, name2);
    };
    Service.prototype.resolveAll = function resolveAll() {
      var methods3 = this.methodsArray;
      for (var i = 0; i < methods3.length; ++i)
        methods3[i].resolve();
      return Namespace.prototype.resolve.call(this);
    };
    Service.prototype.add = function add(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Method) {
        this.methods[object.name] = object;
        object.parent = this;
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Service.prototype.remove = function remove(object) {
      if (object instanceof Method) {
        if (this.methods[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.methods[object.name];
        object.parent = null;
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Service.prototype.create = function create4(rpcImpl, requestDelimited, responseDelimited) {
      var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
      for (var i = 0, method; i < this.methodsArray.length; ++i) {
        var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
        rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
          m: method,
          q: method.resolvedRequestType.ctor,
          s: method.resolvedResponseType.ctor
        });
      }
      return rpcService;
    };
  }
});

// node_modules/protobufjs/src/message.js
var require_message = __commonJS({
  "node_modules/protobufjs/src/message.js"(exports2, module2) {
    "use strict";
    module2.exports = Message;
    var util = require_minimal();
    function Message(properties) {
      if (properties)
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          this[keys[i]] = properties[keys[i]];
    }
    Message.create = function create4(properties) {
      return this.$type.create(properties);
    };
    Message.encode = function encode5(message2, writer) {
      return this.$type.encode(message2, writer);
    };
    Message.encodeDelimited = function encodeDelimited(message2, writer) {
      return this.$type.encodeDelimited(message2, writer);
    };
    Message.decode = function decode6(reader2) {
      return this.$type.decode(reader2);
    };
    Message.decodeDelimited = function decodeDelimited(reader2) {
      return this.$type.decodeDelimited(reader2);
    };
    Message.verify = function verify3(message2) {
      return this.$type.verify(message2);
    };
    Message.fromObject = function fromObject(object) {
      return this.$type.fromObject(object);
    };
    Message.toObject = function toObject(message2, options) {
      return this.$type.toObject(message2, options);
    };
    Message.prototype.toJSON = function toJSON() {
      return this.$type.toObject(this, util.toJSONOptions);
    };
  }
});

// node_modules/protobufjs/src/decoder.js
var require_decoder = __commonJS({
  "node_modules/protobufjs/src/decoder.js"(exports2, module2) {
    "use strict";
    module2.exports = decoder;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function missing(field) {
      return "missing required '" + field.name + "'";
    }
    function decoder(mtype) {
      var gen = util.codegen(["r", "l"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field2) {
        return field2.map;
      }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()");
      if (mtype.group)
        gen("if((t&7)===4)")("break");
      gen("switch(t>>>3){");
      var i = 0;
      for (; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name);
        gen("case %i: {", field.id);
        if (field.map) {
          gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
          if (types.defaults[field.keyType] !== void 0)
            gen("k=%j", types.defaults[field.keyType]);
          else
            gen("k=null");
          if (types.defaults[type] !== void 0)
            gen("value=%j", types.defaults[type]);
          else
            gen("value=null");
          gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
          if (types.basic[type] === void 0)
            gen("value=types[%i].decode(r,r.uint32())", i);
          else
            gen("value=r.%s()", type);
          gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
          if (types.long[field.keyType] !== void 0)
            gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
          else
            gen("%s[k]=value", ref);
        } else if (field.repeated) {
          gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
          if (types.packed[type] !== void 0)
            gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
          if (types.basic[type] === void 0)
            gen(field.resolvedType.group ? "%s.push(types[%i].decode(r))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
          else
            gen("%s.push(r.%s())", ref, type);
        } else if (types.basic[type] === void 0)
          gen(field.resolvedType.group ? "%s=types[%i].decode(r)" : "%s=types[%i].decode(r,r.uint32())", ref, i);
        else
          gen("%s=r.%s()", ref, type);
        gen("break")("}");
      }
      gen("default:")("r.skipType(t&7)")("break")("}")("}");
      for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required)
          gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
      }
      return gen("return m");
    }
  }
});

// node_modules/protobufjs/src/verifier.js
var require_verifier = __commonJS({
  "node_modules/protobufjs/src/verifier.js"(exports2, module2) {
    "use strict";
    module2.exports = verifier;
    var Enum = require_enum();
    var util = require_util();
    function invalid(field, expected) {
      return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
    }
    function genVerifyValue(gen, field, fieldIndex, ref) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
          for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j)
            gen("case %i:", field.resolvedType.values[keys[j]]);
          gen("break")("}");
        } else {
          gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
        }
      } else {
        switch (field.type) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
            break;
          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
            break;
          case "float":
          case "double":
            gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
            break;
          case "bool":
            gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
            break;
          case "string":
            gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
            break;
          case "bytes":
            gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
            break;
        }
      }
      return gen;
    }
    function genVerifyKey(gen, field, ref) {
      switch (field.keyType) {
        case "int32":
        case "uint32":
        case "sint32":
        case "fixed32":
        case "sfixed32":
          gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
          break;
        case "int64":
        case "uint64":
        case "sint64":
        case "fixed64":
        case "sfixed64":
          gen("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field, "integer|Long key"));
          break;
        case "bool":
          gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
          break;
      }
      return gen;
    }
    function verifier(mtype) {
      var gen = util.codegen(["m"], mtype.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
      var oneofs = mtype.oneofsArray, seenFirstField = {};
      if (oneofs.length)
        gen("var p={}");
      for (var i = 0; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(), ref = "m" + util.safeProp(field.name);
        if (field.optional)
          gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name);
        if (field.map) {
          gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
          genVerifyKey(gen, field, "k[i]");
          genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
        } else if (field.repeated) {
          gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
          genVerifyValue(gen, field, i, ref + "[i]")("}");
        } else {
          if (field.partOf) {
            var oneofProp = util.safeProp(field.partOf.name);
            if (seenFirstField[field.partOf.name] === 1)
              gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
            seenFirstField[field.partOf.name] = 1;
            gen("p%s=1", oneofProp);
          }
          genVerifyValue(gen, field, i, ref);
        }
        if (field.optional)
          gen("}");
      }
      return gen("return null");
    }
  }
});

// node_modules/protobufjs/src/converter.js
var require_converter = __commonJS({
  "node_modules/protobufjs/src/converter.js"(exports2) {
    "use strict";
    var converter = exports2;
    var Enum = require_enum();
    var util = require_util();
    function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
      var defaultAlreadyEmitted = false;
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum) {
          gen("switch(d%s){", prop);
          for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
            if (values[keys[i]] === field.typeDefault && !defaultAlreadyEmitted) {
              gen("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', prop, prop, prop);
              if (!field.repeated)
                gen("break");
              defaultAlreadyEmitted = true;
            }
            gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
          }
          gen("}");
        } else
          gen('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("m%s=Number(d%s)", prop, prop);
            break;
          case "uint32":
          case "fixed32":
            gen("m%s=d%s>>>0", prop, prop);
            break;
          case "int32":
          case "sint32":
          case "sfixed32":
            gen("m%s=d%s|0", prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
            break;
          case "bytes":
            gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length >= 0)", prop)("m%s=d%s", prop, prop);
            break;
          case "string":
            gen("m%s=String(d%s)", prop, prop);
            break;
          case "bool":
            gen("m%s=Boolean(d%s)", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.fromObject = function fromObject(mtype) {
      var fields = mtype.fieldsArray;
      var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
      if (!fields.length)
        return gen("return new this.ctor");
      gen("var m=new this.ctor");
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), prop = util.safeProp(field.name);
        if (field.map) {
          gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
          genValuePartial_fromObject(gen, field, i, prop + "[ks[i]]")("}")("}");
        } else if (field.repeated) {
          gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
          genValuePartial_fromObject(gen, field, i, prop + "[i]")("}")("}");
        } else {
          if (!(field.resolvedType instanceof Enum))
            gen("if(d%s!=null){", prop);
          genValuePartial_fromObject(gen, field, i, prop);
          if (!(field.resolvedType instanceof Enum))
            gen("}");
        }
      }
      return gen("return m");
    };
    function genValuePartial_toObject(gen, field, fieldIndex, prop) {
      if (field.resolvedType) {
        if (field.resolvedType instanceof Enum)
          gen("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", prop, fieldIndex, prop, prop, fieldIndex, prop, prop);
        else
          gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
      } else {
        var isUnsigned = false;
        switch (field.type) {
          case "double":
          case "float":
            gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
            break;
          case "uint64":
            isUnsigned = true;
          case "int64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
            break;
          case "bytes":
            gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
            break;
          default:
            gen("d%s=m%s", prop, prop);
            break;
        }
      }
      return gen;
    }
    converter.toObject = function toObject(mtype) {
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      if (!fields.length)
        return util.codegen()("return {}");
      var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
      var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
      for (; i < fields.length; ++i)
        if (!fields[i].partOf)
          (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
      if (repeatedFields.length) {
        gen("if(o.arrays||o.defaults){");
        for (i = 0; i < repeatedFields.length; ++i)
          gen("d%s=[]", util.safeProp(repeatedFields[i].name));
        gen("}");
      }
      if (mapFields.length) {
        gen("if(o.objects||o.defaults){");
        for (i = 0; i < mapFields.length; ++i)
          gen("d%s={}", util.safeProp(mapFields[i].name));
        gen("}");
      }
      if (normalFields.length) {
        gen("if(o.defaults){");
        for (i = 0; i < normalFields.length; ++i) {
          var field = normalFields[i], prop = util.safeProp(field.name);
          if (field.resolvedType instanceof Enum)
            gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
          else if (field.long)
            gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
          else if (field.bytes) {
            var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
            gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
          } else
            gen("d%s=%j", prop, field.typeDefault);
        }
        gen("}");
      }
      var hasKs2 = false;
      for (i = 0; i < fields.length; ++i) {
        var field = fields[i], index = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
        if (field.map) {
          if (!hasKs2) {
            hasKs2 = true;
            gen("var ks2");
          }
          gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
          genValuePartial_toObject(gen, field, index, prop + "[ks2[j]]")("}");
        } else if (field.repeated) {
          gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
          genValuePartial_toObject(gen, field, index, prop + "[j]")("}");
        } else {
          gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name);
          genValuePartial_toObject(gen, field, index, prop);
          if (field.partOf)
            gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
        }
        gen("}");
      }
      return gen("return d");
    };
  }
});

// node_modules/protobufjs/src/wrappers.js
var require_wrappers = __commonJS({
  "node_modules/protobufjs/src/wrappers.js"(exports2) {
    "use strict";
    var wrappers = exports2;
    var Message = require_message();
    wrappers[".google.protobuf.Any"] = {
      fromObject: function(object) {
        if (object && object["@type"]) {
          var name2 = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
          var type = this.lookup(name2);
          if (type) {
            var type_url = object["@type"].charAt(0) === "." ? object["@type"].slice(1) : object["@type"];
            if (type_url.indexOf("/") === -1) {
              type_url = "/" + type_url;
            }
            return this.create({
              type_url,
              value: type.encode(type.fromObject(object)).finish()
            });
          }
        }
        return this.fromObject(object);
      },
      toObject: function(message2, options) {
        var googleApi = "type.googleapis.com/";
        var prefix = "";
        var name2 = "";
        if (options && options.json && message2.type_url && message2.value) {
          name2 = message2.type_url.substring(message2.type_url.lastIndexOf("/") + 1);
          prefix = message2.type_url.substring(0, message2.type_url.lastIndexOf("/") + 1);
          var type = this.lookup(name2);
          if (type)
            message2 = type.decode(message2.value);
        }
        if (!(message2 instanceof this.ctor) && message2 instanceof Message) {
          var object = message2.$type.toObject(message2, options);
          var messageName = message2.$type.fullName[0] === "." ? message2.$type.fullName.slice(1) : message2.$type.fullName;
          if (prefix === "") {
            prefix = googleApi;
          }
          name2 = prefix + messageName;
          object["@type"] = name2;
          return object;
        }
        return this.toObject(message2, options);
      }
    };
  }
});

// node_modules/protobufjs/src/type.js
var require_type = __commonJS({
  "node_modules/protobufjs/src/type.js"(exports2, module2) {
    "use strict";
    module2.exports = Type;
    var Namespace = require_namespace();
    ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
    var Enum = require_enum();
    var OneOf = require_oneof();
    var Field = require_field();
    var MapField = require_mapfield();
    var Service = require_service2();
    var Message = require_message();
    var Reader2 = require_reader();
    var Writer2 = require_writer();
    var util = require_util();
    var encoder = require_encoder();
    var decoder = require_decoder();
    var verifier = require_verifier();
    var converter = require_converter();
    var wrappers = require_wrappers();
    function Type(name2, options) {
      Namespace.call(this, name2, options);
      this.fields = {};
      this.oneofs = void 0;
      this.extensions = void 0;
      this.reserved = void 0;
      this.group = void 0;
      this._fieldsById = null;
      this._fieldsArray = null;
      this._oneofsArray = null;
      this._ctor = null;
    }
    Object.defineProperties(Type.prototype, {
      fieldsById: {
        get: function() {
          if (this._fieldsById)
            return this._fieldsById;
          this._fieldsById = {};
          for (var names2 = Object.keys(this.fields), i = 0; i < names2.length; ++i) {
            var field = this.fields[names2[i]], id = field.id;
            if (this._fieldsById[id])
              throw Error("duplicate id " + id + " in " + this);
            this._fieldsById[id] = field;
          }
          return this._fieldsById;
        }
      },
      fieldsArray: {
        get: function() {
          return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
        }
      },
      oneofsArray: {
        get: function() {
          return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
        }
      },
      ctor: {
        get: function() {
          return this._ctor || (this.ctor = Type.generateConstructor(this)());
        },
        set: function(ctor) {
          var prototype = ctor.prototype;
          if (!(prototype instanceof Message)) {
            (ctor.prototype = new Message()).constructor = ctor;
            util.merge(ctor.prototype, prototype);
          }
          ctor.$type = ctor.prototype.$type = this;
          util.merge(ctor, Message, true);
          this._ctor = ctor;
          var i = 0;
          for (; i < this.fieldsArray.length; ++i)
            this._fieldsArray[i].resolve();
          var ctorProperties = {};
          for (i = 0; i < this.oneofsArray.length; ++i)
            ctorProperties[this._oneofsArray[i].resolve().name] = {
              get: util.oneOfGetter(this._oneofsArray[i].oneof),
              set: util.oneOfSetter(this._oneofsArray[i].oneof)
            };
          if (i)
            Object.defineProperties(ctor.prototype, ctorProperties);
        }
      }
    });
    Type.generateConstructor = function generateConstructor(mtype) {
      var gen = util.codegen(["p"], mtype.name);
      for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
        if ((field = mtype._fieldsArray[i]).map)
          gen("this%s={}", util.safeProp(field.name));
        else if (field.repeated)
          gen("this%s=[]", util.safeProp(field.name));
      return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
    };
    function clearCache(type) {
      type._fieldsById = type._fieldsArray = type._oneofsArray = null;
      delete type.encode;
      delete type.decode;
      delete type.verify;
      return type;
    }
    Type.fromJSON = function fromJSON(name2, json) {
      var type = new Type(name2, json.options);
      type.extensions = json.extensions;
      type.reserved = json.reserved;
      var names2 = Object.keys(json.fields), i = 0;
      for (; i < names2.length; ++i)
        type.add(
          (typeof json.fields[names2[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names2[i], json.fields[names2[i]])
        );
      if (json.oneofs)
        for (names2 = Object.keys(json.oneofs), i = 0; i < names2.length; ++i)
          type.add(OneOf.fromJSON(names2[i], json.oneofs[names2[i]]));
      if (json.nested)
        for (names2 = Object.keys(json.nested), i = 0; i < names2.length; ++i) {
          var nested = json.nested[names2[i]];
          type.add(
            (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names2[i], nested)
          );
        }
      if (json.extensions && json.extensions.length)
        type.extensions = json.extensions;
      if (json.reserved && json.reserved.length)
        type.reserved = json.reserved;
      if (json.group)
        type.group = true;
      if (json.comment)
        type.comment = json.comment;
      return type;
    };
    Type.prototype.toJSON = function toJSON(toJSONOptions) {
      var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        inherited && inherited.options || void 0,
        "oneofs",
        Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
        "fields",
        Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
          return !obj.declaringField;
        }), toJSONOptions) || {},
        "extensions",
        this.extensions && this.extensions.length ? this.extensions : void 0,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "group",
        this.group || void 0,
        "nested",
        inherited && inherited.nested || void 0,
        "comment",
        keepComments ? this.comment : void 0
      ]);
    };
    Type.prototype.resolveAll = function resolveAll() {
      var fields = this.fieldsArray, i = 0;
      while (i < fields.length)
        fields[i++].resolve();
      var oneofs = this.oneofsArray;
      i = 0;
      while (i < oneofs.length)
        oneofs[i++].resolve();
      return Namespace.prototype.resolveAll.call(this);
    };
    Type.prototype.get = function get(name2) {
      return this.fields[name2] || this.oneofs && this.oneofs[name2] || this.nested && this.nested[name2] || null;
    };
    Type.prototype.add = function add(object) {
      if (this.get(object.name))
        throw Error("duplicate name '" + object.name + "' in " + this);
      if (object instanceof Field && object.extend === void 0) {
        if (this._fieldsById ? this._fieldsById[object.id] : this.fieldsById[object.id])
          throw Error("duplicate id " + object.id + " in " + this);
        if (this.isReservedId(object.id))
          throw Error("id " + object.id + " is reserved in " + this);
        if (this.isReservedName(object.name))
          throw Error("name '" + object.name + "' is reserved in " + this);
        if (object.parent)
          object.parent.remove(object);
        this.fields[object.name] = object;
        object.message = this;
        object.onAdd(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs)
          this.oneofs = {};
        this.oneofs[object.name] = object;
        object.onAdd(this);
        return clearCache(this);
      }
      return Namespace.prototype.add.call(this, object);
    };
    Type.prototype.remove = function remove(object) {
      if (object instanceof Field && object.extend === void 0) {
        if (!this.fields || this.fields[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.fields[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      if (object instanceof OneOf) {
        if (!this.oneofs || this.oneofs[object.name] !== object)
          throw Error(object + " is not a member of " + this);
        delete this.oneofs[object.name];
        object.parent = null;
        object.onRemove(this);
        return clearCache(this);
      }
      return Namespace.prototype.remove.call(this, object);
    };
    Type.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Type.prototype.isReservedName = function isReservedName(name2) {
      return Namespace.isReservedName(this.reserved, name2);
    };
    Type.prototype.create = function create4(properties) {
      return new this.ctor(properties);
    };
    Type.prototype.setup = function setup() {
      var fullName = this.fullName, types = [];
      for (var i = 0; i < this.fieldsArray.length; ++i)
        types.push(this._fieldsArray[i].resolve().resolvedType);
      this.encode = encoder(this)({
        Writer: Writer2,
        types,
        util
      });
      this.decode = decoder(this)({
        Reader: Reader2,
        types,
        util
      });
      this.verify = verifier(this)({
        types,
        util
      });
      this.fromObject = converter.fromObject(this)({
        types,
        util
      });
      this.toObject = converter.toObject(this)({
        types,
        util
      });
      var wrapper = wrappers[fullName];
      if (wrapper) {
        var originalThis = Object.create(this);
        originalThis.fromObject = this.fromObject;
        this.fromObject = wrapper.fromObject.bind(originalThis);
        originalThis.toObject = this.toObject;
        this.toObject = wrapper.toObject.bind(originalThis);
      }
      return this;
    };
    Type.prototype.encode = function encode_setup(message2, writer) {
      return this.setup().encode(message2, writer);
    };
    Type.prototype.encodeDelimited = function encodeDelimited(message2, writer) {
      return this.encode(message2, writer && writer.len ? writer.fork() : writer).ldelim();
    };
    Type.prototype.decode = function decode_setup(reader2, length2) {
      return this.setup().decode(reader2, length2);
    };
    Type.prototype.decodeDelimited = function decodeDelimited(reader2) {
      if (!(reader2 instanceof Reader2))
        reader2 = Reader2.create(reader2);
      return this.decode(reader2, reader2.uint32());
    };
    Type.prototype.verify = function verify_setup(message2) {
      return this.setup().verify(message2);
    };
    Type.prototype.fromObject = function fromObject(object) {
      return this.setup().fromObject(object);
    };
    Type.prototype.toObject = function toObject(message2, options) {
      return this.setup().toObject(message2, options);
    };
    Type.d = function decorateType(typeName) {
      return function typeDecorator(target) {
        util.decorateType(target, typeName);
      };
    };
  }
});

// node_modules/protobufjs/src/root.js
var require_root = __commonJS({
  "node_modules/protobufjs/src/root.js"(exports2, module2) {
    "use strict";
    module2.exports = Root;
    var Namespace = require_namespace();
    ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
    var Field = require_field();
    var Enum = require_enum();
    var OneOf = require_oneof();
    var util = require_util();
    var Type;
    var parse;
    var common;
    function Root(options) {
      Namespace.call(this, "", options);
      this.deferred = [];
      this.files = [];
    }
    Root.fromJSON = function fromJSON(json, root) {
      if (!root)
        root = new Root();
      if (json.options)
        root.setOptions(json.options);
      return root.addJSON(json.nested);
    };
    Root.prototype.resolvePath = util.path.resolve;
    Root.prototype.fetch = util.fetch;
    function SYNC() {
    }
    Root.prototype.load = function load(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = void 0;
      }
      var self2 = this;
      if (!callback)
        return util.asPromise(load, self2, filename, options);
      var sync = callback === SYNC;
      function finish(err, root) {
        if (!callback)
          return;
        var cb = callback;
        callback = null;
        if (sync)
          throw err;
        cb(err, root);
      }
      function getBundledFileName(filename2) {
        var idx = filename2.lastIndexOf("google/protobuf/");
        if (idx > -1) {
          var altname = filename2.substring(idx);
          if (altname in common)
            return altname;
        }
        return null;
      }
      function process2(filename2, source) {
        try {
          if (util.isString(source) && source.charAt(0) === "{")
            source = JSON.parse(source);
          if (!util.isString(source))
            self2.setOptions(source.options).addJSON(source.nested);
          else {
            parse.filename = filename2;
            var parsed = parse(source, self2, options), resolved2, i2 = 0;
            if (parsed.imports) {
              for (; i2 < parsed.imports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2]))
                  fetch(resolved2);
            }
            if (parsed.weakImports) {
              for (i2 = 0; i2 < parsed.weakImports.length; ++i2)
                if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2]))
                  fetch(resolved2, true);
            }
          }
        } catch (err) {
          finish(err);
        }
        if (!sync && !queued)
          finish(null, self2);
      }
      function fetch(filename2, weak) {
        if (self2.files.indexOf(filename2) > -1)
          return;
        self2.files.push(filename2);
        if (filename2 in common) {
          if (sync)
            process2(filename2, common[filename2]);
          else {
            ++queued;
            setTimeout(function() {
              --queued;
              process2(filename2, common[filename2]);
            });
          }
          return;
        }
        if (sync) {
          var source;
          try {
            source = util.fs.readFileSync(filename2).toString("utf8");
          } catch (err) {
            if (!weak)
              finish(err);
            return;
          }
          process2(filename2, source);
        } else {
          ++queued;
          self2.fetch(filename2, function(err, source2) {
            --queued;
            if (!callback)
              return;
            if (err) {
              if (!weak)
                finish(err);
              else if (!queued)
                finish(null, self2);
              return;
            }
            process2(filename2, source2);
          });
        }
      }
      var queued = 0;
      if (util.isString(filename))
        filename = [filename];
      for (var i = 0, resolved; i < filename.length; ++i)
        if (resolved = self2.resolvePath("", filename[i]))
          fetch(resolved);
      if (sync)
        return self2;
      if (!queued)
        finish(null, self2);
      return void 0;
    };
    Root.prototype.loadSync = function loadSync(filename, options) {
      if (!util.isNode)
        throw Error("not supported");
      return this.load(filename, options, SYNC);
    };
    Root.prototype.resolveAll = function resolveAll() {
      if (this.deferred.length)
        throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
          return "'extend " + field.extend + "' in " + field.parent.fullName;
        }).join(", "));
      return Namespace.prototype.resolveAll.call(this);
    };
    var exposeRe = /^[A-Z]/;
    function tryHandleExtension(root, field) {
      var extendedType = field.parent.lookup(field.extend);
      if (extendedType) {
        var sisterField = new Field(field.fullName, field.id, field.type, field.rule, void 0, field.options);
        sisterField.declaringField = field;
        field.extensionField = sisterField;
        extendedType.add(sisterField);
        return true;
      }
      return false;
    }
    Root.prototype._handleAdd = function _handleAdd(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0 && !object.extensionField) {
          if (!tryHandleExtension(this, object))
            this.deferred.push(object);
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          object.parent[object.name] = object.values;
      } else if (!(object instanceof OneOf)) {
        if (object instanceof Type)
          for (var i = 0; i < this.deferred.length; )
            if (tryHandleExtension(this, this.deferred[i]))
              this.deferred.splice(i, 1);
            else
              ++i;
        for (var j = 0; j < object.nestedArray.length; ++j)
          this._handleAdd(object._nestedArray[j]);
        if (exposeRe.test(object.name))
          object.parent[object.name] = object;
      }
    };
    Root.prototype._handleRemove = function _handleRemove(object) {
      if (object instanceof Field) {
        if (object.extend !== void 0) {
          if (object.extensionField) {
            object.extensionField.parent.remove(object.extensionField);
            object.extensionField = null;
          } else {
            var index = this.deferred.indexOf(object);
            if (index > -1)
              this.deferred.splice(index, 1);
          }
        }
      } else if (object instanceof Enum) {
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      } else if (object instanceof Namespace) {
        for (var i = 0; i < object.nestedArray.length; ++i)
          this._handleRemove(object._nestedArray[i]);
        if (exposeRe.test(object.name))
          delete object.parent[object.name];
      }
    };
    Root._configure = function(Type_, parse_, common_) {
      Type = Type_;
      parse = parse_;
      common = common_;
    };
  }
});

// node_modules/protobufjs/src/util.js
var require_util = __commonJS({
  "node_modules/protobufjs/src/util.js"(exports2, module2) {
    "use strict";
    var util = module2.exports = require_minimal();
    var roots = require_roots();
    var Type;
    var Enum;
    util.codegen = require_codegen();
    util.fetch = require_fetch();
    util.path = require_path();
    util.fs = util.inquire("fs");
    util.toArray = function toArray(object) {
      if (object) {
        var keys = Object.keys(object), array = new Array(keys.length), index = 0;
        while (index < keys.length)
          array[index] = object[keys[index++]];
        return array;
      }
      return [];
    };
    util.toObject = function toObject(array) {
      var object = {}, index = 0;
      while (index < array.length) {
        var key = array[index++], val = array[index++];
        if (val !== void 0)
          object[key] = val;
      }
      return object;
    };
    var safePropBackslashRe = /\\/g;
    var safePropQuoteRe = /"/g;
    util.isReserved = function isReserved(name2) {
      return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name2);
    };
    util.safeProp = function safeProp(prop) {
      if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
        return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
      return "." + prop;
    };
    util.ucFirst = function ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    };
    var camelCaseRe = /_([a-z])/g;
    util.camelCase = function camelCase(str) {
      return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
        return $1.toUpperCase();
      });
    };
    util.compareFieldsById = function compareFieldsById(a, b) {
      return a.id - b.id;
    };
    util.decorateType = function decorateType(ctor, typeName) {
      if (ctor.$type) {
        if (typeName && ctor.$type.name !== typeName) {
          util.decorateRoot.remove(ctor.$type);
          ctor.$type.name = typeName;
          util.decorateRoot.add(ctor.$type);
        }
        return ctor.$type;
      }
      if (!Type)
        Type = require_type();
      var type = new Type(typeName || ctor.name);
      util.decorateRoot.add(type);
      type.ctor = ctor;
      Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
      Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
      return type;
    };
    var decorateEnumIndex = 0;
    util.decorateEnum = function decorateEnum(object) {
      if (object.$type)
        return object.$type;
      if (!Enum)
        Enum = require_enum();
      var enm = new Enum("Enum" + decorateEnumIndex++, object);
      util.decorateRoot.add(enm);
      Object.defineProperty(object, "$type", { value: enm, enumerable: false });
      return enm;
    };
    util.setProperty = function setProperty(dst, path2, value) {
      function setProp(dst2, path3, value2) {
        var part = path3.shift();
        if (part === "__proto__") {
          return dst2;
        }
        if (path3.length > 0) {
          dst2[part] = setProp(dst2[part] || {}, path3, value2);
        } else {
          var prevValue = dst2[part];
          if (prevValue)
            value2 = [].concat(prevValue).concat(value2);
          dst2[part] = value2;
        }
        return dst2;
      }
      if (typeof dst !== "object")
        throw TypeError("dst must be an object");
      if (!path2)
        throw TypeError("path must be specified");
      path2 = path2.split(".");
      return setProp(dst, path2, value);
    };
    Object.defineProperty(util, "decorateRoot", {
      get: function() {
        return roots["decorated"] || (roots["decorated"] = new (require_root())());
      }
    });
  }
});

// node_modules/protobufjs/src/object.js
var require_object = __commonJS({
  "node_modules/protobufjs/src/object.js"(exports2, module2) {
    "use strict";
    module2.exports = ReflectionObject;
    ReflectionObject.className = "ReflectionObject";
    var util = require_util();
    var Root;
    function ReflectionObject(name2, options) {
      if (!util.isString(name2))
        throw TypeError("name must be a string");
      if (options && !util.isObject(options))
        throw TypeError("options must be an object");
      this.options = options;
      this.parsedOptions = null;
      this.name = name2;
      this.parent = null;
      this.resolved = false;
      this.comment = null;
      this.filename = null;
    }
    Object.defineProperties(ReflectionObject.prototype, {
      root: {
        get: function() {
          var ptr = this;
          while (ptr.parent !== null)
            ptr = ptr.parent;
          return ptr;
        }
      },
      fullName: {
        get: function() {
          var path2 = [this.name], ptr = this.parent;
          while (ptr) {
            path2.unshift(ptr.name);
            ptr = ptr.parent;
          }
          return path2.join(".");
        }
      }
    });
    ReflectionObject.prototype.toJSON = function toJSON() {
      throw Error();
    };
    ReflectionObject.prototype.onAdd = function onAdd(parent) {
      if (this.parent && this.parent !== parent)
        this.parent.remove(this);
      this.parent = parent;
      this.resolved = false;
      var root = parent.root;
      if (root instanceof Root)
        root._handleAdd(this);
    };
    ReflectionObject.prototype.onRemove = function onRemove(parent) {
      var root = parent.root;
      if (root instanceof Root)
        root._handleRemove(this);
      this.parent = null;
      this.resolved = false;
    };
    ReflectionObject.prototype.resolve = function resolve() {
      if (this.resolved)
        return this;
      if (this.root instanceof Root)
        this.resolved = true;
      return this;
    };
    ReflectionObject.prototype.getOption = function getOption(name2) {
      if (this.options)
        return this.options[name2];
      return void 0;
    };
    ReflectionObject.prototype.setOption = function setOption(name2, value, ifNotSet) {
      if (!ifNotSet || !this.options || this.options[name2] === void 0)
        (this.options || (this.options = {}))[name2] = value;
      return this;
    };
    ReflectionObject.prototype.setParsedOption = function setParsedOption(name2, value, propName) {
      if (!this.parsedOptions) {
        this.parsedOptions = [];
      }
      var parsedOptions = this.parsedOptions;
      if (propName) {
        var opt = parsedOptions.find(function(opt2) {
          return Object.prototype.hasOwnProperty.call(opt2, name2);
        });
        if (opt) {
          var newValue = opt[name2];
          util.setProperty(newValue, propName, value);
        } else {
          opt = {};
          opt[name2] = util.setProperty({}, propName, value);
          parsedOptions.push(opt);
        }
      } else {
        var newOpt = {};
        newOpt[name2] = value;
        parsedOptions.push(newOpt);
      }
      return this;
    };
    ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
      if (options)
        for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
          this.setOption(keys[i], options[keys[i]], ifNotSet);
      return this;
    };
    ReflectionObject.prototype.toString = function toString3() {
      var className = this.constructor.className, fullName = this.fullName;
      if (fullName.length)
        return className + " " + fullName;
      return className;
    };
    ReflectionObject._configure = function(Root_) {
      Root = Root_;
    };
  }
});

// node_modules/protobufjs/src/enum.js
var require_enum = __commonJS({
  "node_modules/protobufjs/src/enum.js"(exports2, module2) {
    "use strict";
    module2.exports = Enum;
    var ReflectionObject = require_object();
    ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
    var Namespace = require_namespace();
    var util = require_util();
    function Enum(name2, values, options, comment, comments, valuesOptions) {
      ReflectionObject.call(this, name2, options);
      if (values && typeof values !== "object")
        throw TypeError("values must be an object");
      this.valuesById = {};
      this.values = Object.create(this.valuesById);
      this.comment = comment;
      this.comments = comments || {};
      this.valuesOptions = valuesOptions;
      this.reserved = void 0;
      if (values) {
        for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
          if (typeof values[keys[i]] === "number")
            this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
      }
    }
    Enum.fromJSON = function fromJSON(name2, json) {
      var enm = new Enum(name2, json.values, json.options, json.comment, json.comments);
      enm.reserved = json.reserved;
      return enm;
    };
    Enum.prototype.toJSON = function toJSON(toJSONOptions) {
      var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
      return util.toObject([
        "options",
        this.options,
        "valuesOptions",
        this.valuesOptions,
        "values",
        this.values,
        "reserved",
        this.reserved && this.reserved.length ? this.reserved : void 0,
        "comment",
        keepComments ? this.comment : void 0,
        "comments",
        keepComments ? this.comments : void 0
      ]);
    };
    Enum.prototype.add = function add(name2, id, comment, options) {
      if (!util.isString(name2))
        throw TypeError("name must be a string");
      if (!util.isInteger(id))
        throw TypeError("id must be an integer");
      if (this.values[name2] !== void 0)
        throw Error("duplicate name '" + name2 + "' in " + this);
      if (this.isReservedId(id))
        throw Error("id " + id + " is reserved in " + this);
      if (this.isReservedName(name2))
        throw Error("name '" + name2 + "' is reserved in " + this);
      if (this.valuesById[id] !== void 0) {
        if (!(this.options && this.options.allow_alias))
          throw Error("duplicate id " + id + " in " + this);
        this.values[name2] = id;
      } else
        this.valuesById[this.values[name2] = id] = name2;
      if (options) {
        if (this.valuesOptions === void 0)
          this.valuesOptions = {};
        this.valuesOptions[name2] = options || null;
      }
      this.comments[name2] = comment || null;
      return this;
    };
    Enum.prototype.remove = function remove(name2) {
      if (!util.isString(name2))
        throw TypeError("name must be a string");
      var val = this.values[name2];
      if (val == null)
        throw Error("name '" + name2 + "' does not exist in " + this);
      delete this.valuesById[val];
      delete this.values[name2];
      delete this.comments[name2];
      if (this.valuesOptions)
        delete this.valuesOptions[name2];
      return this;
    };
    Enum.prototype.isReservedId = function isReservedId(id) {
      return Namespace.isReservedId(this.reserved, id);
    };
    Enum.prototype.isReservedName = function isReservedName(name2) {
      return Namespace.isReservedName(this.reserved, name2);
    };
  }
});

// node_modules/protobufjs/src/encoder.js
var require_encoder = __commonJS({
  "node_modules/protobufjs/src/encoder.js"(exports2, module2) {
    "use strict";
    module2.exports = encoder;
    var Enum = require_enum();
    var types = require_types();
    var util = require_util();
    function genTypePartial(gen, field, fieldIndex, ref) {
      return field.resolvedType.group ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
    }
    function encoder(mtype) {
      var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
      var i, ref;
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve(), index = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
        ref = "m" + util.safeProp(field.name);
        if (field.map) {
          gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
          if (wireType === void 0)
            gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index, ref);
          else
            gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
          gen("}")("}");
        } else if (field.repeated) {
          gen("if(%s!=null&&%s.length){", ref, ref);
          if (field.packed && types.packed[type] !== void 0) {
            gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
          } else {
            gen("for(var i=0;i<%s.length;++i)", ref);
            if (wireType === void 0)
              genTypePartial(gen, field, index, ref + "[i]");
            else
              gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
          }
          gen("}");
        } else {
          if (field.optional)
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
          if (wireType === void 0)
            genTypePartial(gen, field, index, ref);
          else
            gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
        }
      }
      return gen("return w");
    }
  }
});

// node_modules/protobufjs/src/index-light.js
var require_index_light = __commonJS({
  "node_modules/protobufjs/src/index-light.js"(exports2, module2) {
    "use strict";
    var protobuf = module2.exports = require_index_minimal();
    protobuf.build = "light";
    function load(filename, root, callback) {
      if (typeof root === "function") {
        callback = root;
        root = new protobuf.Root();
      } else if (!root)
        root = new protobuf.Root();
      return root.load(filename, callback);
    }
    protobuf.load = load;
    function loadSync(filename, root) {
      if (!root)
        root = new protobuf.Root();
      return root.loadSync(filename);
    }
    protobuf.loadSync = loadSync;
    protobuf.encoder = require_encoder();
    protobuf.decoder = require_decoder();
    protobuf.verifier = require_verifier();
    protobuf.converter = require_converter();
    protobuf.ReflectionObject = require_object();
    protobuf.Namespace = require_namespace();
    protobuf.Root = require_root();
    protobuf.Enum = require_enum();
    protobuf.Type = require_type();
    protobuf.Field = require_field();
    protobuf.OneOf = require_oneof();
    protobuf.MapField = require_mapfield();
    protobuf.Service = require_service2();
    protobuf.Method = require_method();
    protobuf.Message = require_message();
    protobuf.wrappers = require_wrappers();
    protobuf.types = require_types();
    protobuf.util = require_util();
    protobuf.ReflectionObject._configure(protobuf.Root);
    protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
    protobuf.Root._configure(protobuf.Type);
    protobuf.Field._configure(protobuf.Type);
  }
});

// node_modules/protobufjs/src/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/protobufjs/src/tokenize.js"(exports2, module2) {
    "use strict";
    module2.exports = tokenize;
    var delimRe = /[\s{}=;:[\],'"()<>]/g;
    var stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g;
    var stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
    var setCommentRe = /^ *[*/]+ */;
    var setCommentAltRe = /^\s*\*?\/*/;
    var setCommentSplitRe = /\n/g;
    var whitespaceRe = /\s/;
    var unescapeRe = /\\(.?)/g;
    var unescapeMap = {
      "0": "\0",
      "r": "\r",
      "n": "\n",
      "t": "	"
    };
    function unescape2(str) {
      return str.replace(unescapeRe, function($0, $1) {
        switch ($1) {
          case "\\":
          case "":
            return $1;
          default:
            return unescapeMap[$1] || "";
        }
      });
    }
    tokenize.unescape = unescape2;
    function tokenize(source, alternateCommentMode) {
      source = source.toString();
      var offset = 0, length2 = source.length, line = 1, lastCommentLine = 0, comments = {};
      var stack = [];
      var stringDelim = null;
      function illegal(subject) {
        return Error("illegal " + subject + " (line " + line + ")");
      }
      function readString() {
        var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
        re.lastIndex = offset - 1;
        var match = re.exec(source);
        if (!match)
          throw illegal("string");
        offset = re.lastIndex;
        push(stringDelim);
        stringDelim = null;
        return unescape2(match[1]);
      }
      function charAt(pos) {
        return source.charAt(pos);
      }
      function setComment(start, end, isLeading) {
        var comment = {
          type: source.charAt(start++),
          lineEmpty: false,
          leading: isLeading
        };
        var lookback;
        if (alternateCommentMode) {
          lookback = 2;
        } else {
          lookback = 3;
        }
        var commentOffset = start - lookback, c;
        do {
          if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
            comment.lineEmpty = true;
            break;
          }
        } while (c === " " || c === "	");
        var lines = source.substring(start, end).split(setCommentSplitRe);
        for (var i = 0; i < lines.length; ++i)
          lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
        comment.text = lines.join("\n").trim();
        comments[line] = comment;
        lastCommentLine = line;
      }
      function isDoubleSlashCommentLine(startOffset) {
        var endOffset = findEndOfLine(startOffset);
        var lineText = source.substring(startOffset, endOffset);
        var isComment = /^\s*\/{1,2}/.test(lineText);
        return isComment;
      }
      function findEndOfLine(cursor) {
        var endOffset = cursor;
        while (endOffset < length2 && charAt(endOffset) !== "\n") {
          endOffset++;
        }
        return endOffset;
      }
      function next() {
        if (stack.length > 0)
          return stack.shift();
        if (stringDelim)
          return readString();
        var repeat, prev, curr, start, isDoc, isLeadingComment = offset === 0;
        do {
          if (offset === length2)
            return null;
          repeat = false;
          while (whitespaceRe.test(curr = charAt(offset))) {
            if (curr === "\n") {
              isLeadingComment = true;
              ++line;
            }
            if (++offset === length2)
              return null;
          }
          if (charAt(offset) === "/") {
            if (++offset === length2) {
              throw illegal("comment");
            }
            if (charAt(offset) === "/") {
              if (!alternateCommentMode) {
                isDoc = charAt(start = offset + 1) === "/";
                while (charAt(++offset) !== "\n") {
                  if (offset === length2) {
                    return null;
                  }
                }
                ++offset;
                if (isDoc) {
                  setComment(start, offset - 1, isLeadingComment);
                  isLeadingComment = true;
                }
                ++line;
                repeat = true;
              } else {
                start = offset;
                isDoc = false;
                if (isDoubleSlashCommentLine(offset)) {
                  isDoc = true;
                  do {
                    offset = findEndOfLine(offset);
                    if (offset === length2) {
                      break;
                    }
                    offset++;
                    if (!isLeadingComment) {
                      break;
                    }
                  } while (isDoubleSlashCommentLine(offset));
                } else {
                  offset = Math.min(length2, findEndOfLine(offset) + 1);
                }
                if (isDoc) {
                  setComment(start, offset, isLeadingComment);
                  isLeadingComment = true;
                }
                line++;
                repeat = true;
              }
            } else if ((curr = charAt(offset)) === "*") {
              start = offset + 1;
              isDoc = alternateCommentMode || charAt(start) === "*";
              do {
                if (curr === "\n") {
                  ++line;
                }
                if (++offset === length2) {
                  throw illegal("comment");
                }
                prev = curr;
                curr = charAt(offset);
              } while (prev !== "*" || curr !== "/");
              ++offset;
              if (isDoc) {
                setComment(start, offset - 2, isLeadingComment);
                isLeadingComment = true;
              }
              repeat = true;
            } else {
              return "/";
            }
          }
        } while (repeat);
        var end = offset;
        delimRe.lastIndex = 0;
        var delim = delimRe.test(charAt(end++));
        if (!delim)
          while (end < length2 && !delimRe.test(charAt(end)))
            ++end;
        var token = source.substring(offset, offset = end);
        if (token === '"' || token === "'")
          stringDelim = token;
        return token;
      }
      function push(token) {
        stack.push(token);
      }
      function peek() {
        if (!stack.length) {
          var token = next();
          if (token === null)
            return null;
          push(token);
        }
        return stack[0];
      }
      function skip(expected, optional) {
        var actual = peek(), equals4 = actual === expected;
        if (equals4) {
          next();
          return true;
        }
        if (!optional)
          throw illegal("token '" + actual + "', '" + expected + "' expected");
        return false;
      }
      function cmnt(trailingLine) {
        var ret = null;
        var comment;
        if (trailingLine === void 0) {
          comment = comments[line - 1];
          delete comments[line - 1];
          if (comment && (alternateCommentMode || comment.type === "*" || comment.lineEmpty)) {
            ret = comment.leading ? comment.text : null;
          }
        } else {
          if (lastCommentLine < trailingLine) {
            peek();
          }
          comment = comments[trailingLine];
          delete comments[trailingLine];
          if (comment && !comment.lineEmpty && (alternateCommentMode || comment.type === "/")) {
            ret = comment.leading ? null : comment.text;
          }
        }
        return ret;
      }
      return Object.defineProperty({
        next,
        peek,
        push,
        skip,
        cmnt
      }, "line", {
        get: function() {
          return line;
        }
      });
    }
  }
});

// node_modules/protobufjs/src/parse.js
var require_parse = __commonJS({
  "node_modules/protobufjs/src/parse.js"(exports2, module2) {
    "use strict";
    module2.exports = parse;
    parse.filename = null;
    parse.defaults = { keepCase: false };
    var tokenize = require_tokenize();
    var Root = require_root();
    var Type = require_type();
    var Field = require_field();
    var MapField = require_mapfield();
    var OneOf = require_oneof();
    var Enum = require_enum();
    var Service = require_service2();
    var Method = require_method();
    var types = require_types();
    var util = require_util();
    var base10Re = /^[1-9][0-9]*$/;
    var base10NegRe = /^-?[1-9][0-9]*$/;
    var base16Re = /^0[x][0-9a-fA-F]+$/;
    var base16NegRe = /^-?0[x][0-9a-fA-F]+$/;
    var base8Re = /^0[0-7]+$/;
    var base8NegRe = /^-?0[0-7]+$/;
    var numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
    var nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
    var typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/;
    var fqTypeRefRe = /^(?:\.[a-zA-Z_][a-zA-Z_0-9]*)+$/;
    function parse(source, root, options) {
      if (!(root instanceof Root)) {
        options = root;
        root = new Root();
      }
      if (!options)
        options = parse.defaults;
      var preferTrailingComment = options.preferTrailingComment || false;
      var tn = tokenize(source, options.alternateCommentMode || false), next = tn.next, push = tn.push, peek = tn.peek, skip = tn.skip, cmnt = tn.cmnt;
      var head = true, pkg, imports, weakImports, syntax, isProto3 = false;
      var ptr = root;
      var applyCase = options.keepCase ? function(name2) {
        return name2;
      } : util.camelCase;
      function illegal(token2, name2, insideTryCatch) {
        var filename = parse.filename;
        if (!insideTryCatch)
          parse.filename = null;
        return Error("illegal " + (name2 || "token") + " '" + token2 + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
      }
      function readString() {
        var values = [], token2;
        do {
          if ((token2 = next()) !== '"' && token2 !== "'")
            throw illegal(token2);
          values.push(next());
          skip(token2);
          token2 = peek();
        } while (token2 === '"' || token2 === "'");
        return values.join("");
      }
      function readValue(acceptTypeRef) {
        var token2 = next();
        switch (token2) {
          case "'":
          case '"':
            push(token2);
            return readString();
          case "true":
          case "TRUE":
            return true;
          case "false":
          case "FALSE":
            return false;
        }
        try {
          return parseNumber(token2, true);
        } catch (e) {
          if (acceptTypeRef && typeRefRe.test(token2))
            return token2;
          throw illegal(token2, "value");
        }
      }
      function readRanges(target, acceptStrings) {
        var token2, start;
        do {
          if (acceptStrings && ((token2 = peek()) === '"' || token2 === "'"))
            target.push(readString());
          else
            target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
        } while (skip(",", true));
        skip(";");
      }
      function parseNumber(token2, insideTryCatch) {
        var sign3 = 1;
        if (token2.charAt(0) === "-") {
          sign3 = -1;
          token2 = token2.substring(1);
        }
        switch (token2) {
          case "inf":
          case "INF":
          case "Inf":
            return sign3 * Infinity;
          case "nan":
          case "NAN":
          case "Nan":
          case "NaN":
            return NaN;
          case "0":
            return 0;
        }
        if (base10Re.test(token2))
          return sign3 * parseInt(token2, 10);
        if (base16Re.test(token2))
          return sign3 * parseInt(token2, 16);
        if (base8Re.test(token2))
          return sign3 * parseInt(token2, 8);
        if (numberRe.test(token2))
          return sign3 * parseFloat(token2);
        throw illegal(token2, "number", insideTryCatch);
      }
      function parseId(token2, acceptNegative) {
        switch (token2) {
          case "max":
          case "MAX":
          case "Max":
            return 536870911;
          case "0":
            return 0;
        }
        if (!acceptNegative && token2.charAt(0) === "-")
          throw illegal(token2, "id");
        if (base10NegRe.test(token2))
          return parseInt(token2, 10);
        if (base16NegRe.test(token2))
          return parseInt(token2, 16);
        if (base8NegRe.test(token2))
          return parseInt(token2, 8);
        throw illegal(token2, "id");
      }
      function parsePackage() {
        if (pkg !== void 0)
          throw illegal("package");
        pkg = next();
        if (!typeRefRe.test(pkg))
          throw illegal(pkg, "name");
        ptr = ptr.define(pkg);
        skip(";");
      }
      function parseImport() {
        var token2 = peek();
        var whichImports;
        switch (token2) {
          case "weak":
            whichImports = weakImports || (weakImports = []);
            next();
            break;
          case "public":
            next();
          default:
            whichImports = imports || (imports = []);
            break;
        }
        token2 = readString();
        skip(";");
        whichImports.push(token2);
      }
      function parseSyntax() {
        skip("=");
        syntax = readString();
        isProto3 = syntax === "proto3";
        if (!isProto3 && syntax !== "proto2")
          throw illegal(syntax, "syntax");
        skip(";");
      }
      function parseCommon(parent, token2) {
        switch (token2) {
          case "option":
            parseOption(parent, token2);
            skip(";");
            return true;
          case "message":
            parseType(parent, token2);
            return true;
          case "enum":
            parseEnum(parent, token2);
            return true;
          case "service":
            parseService(parent, token2);
            return true;
          case "extend":
            parseExtension(parent, token2);
            return true;
        }
        return false;
      }
      function ifBlock(obj, fnIf, fnElse) {
        var trailingLine = tn.line;
        if (obj) {
          if (typeof obj.comment !== "string") {
            obj.comment = cmnt();
          }
          obj.filename = parse.filename;
        }
        if (skip("{", true)) {
          var token2;
          while ((token2 = next()) !== "}")
            fnIf(token2);
          skip(";", true);
        } else {
          if (fnElse)
            fnElse();
          skip(";");
          if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
            obj.comment = cmnt(trailingLine) || obj.comment;
        }
      }
      function parseType(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "type name");
        var type = new Type(token2);
        ifBlock(type, function parseType_block(token3) {
          if (parseCommon(type, token3))
            return;
          switch (token3) {
            case "map":
              parseMapField(type, token3);
              break;
            case "required":
            case "repeated":
              parseField(type, token3);
              break;
            case "optional":
              if (isProto3) {
                parseField(type, "proto3_optional");
              } else {
                parseField(type, "optional");
              }
              break;
            case "oneof":
              parseOneOf(type, token3);
              break;
            case "extensions":
              readRanges(type.extensions || (type.extensions = []));
              break;
            case "reserved":
              readRanges(type.reserved || (type.reserved = []), true);
              break;
            default:
              if (!isProto3 || !typeRefRe.test(token3))
                throw illegal(token3);
              push(token3);
              parseField(type, "optional");
              break;
          }
        });
        parent.add(type);
      }
      function parseField(parent, rule, extend) {
        var type = next();
        if (type === "group") {
          parseGroup(parent, rule);
          return;
        }
        if (!typeRefRe.test(type))
          throw illegal(type, "type");
        var name2 = next();
        if (!nameRe.test(name2))
          throw illegal(name2, "name");
        name2 = applyCase(name2);
        skip("=");
        var field = new Field(name2, parseId(next()), type, rule, extend);
        ifBlock(field, function parseField_block(token2) {
          if (token2 === "option") {
            parseOption(field, token2);
            skip(";");
          } else
            throw illegal(token2);
        }, function parseField_line() {
          parseInlineOptions(field);
        });
        if (rule === "proto3_optional") {
          var oneof = new OneOf("_" + name2);
          field.setOption("proto3_optional", true);
          oneof.add(field);
          parent.add(oneof);
        } else {
          parent.add(field);
        }
        if (!isProto3 && field.repeated && (types.packed[type] !== void 0 || types.basic[type] === void 0))
          field.setOption("packed", false, true);
      }
      function parseGroup(parent, rule) {
        var name2 = next();
        if (!nameRe.test(name2))
          throw illegal(name2, "name");
        var fieldName = util.lcFirst(name2);
        if (name2 === fieldName)
          name2 = util.ucFirst(name2);
        skip("=");
        var id = parseId(next());
        var type = new Type(name2);
        type.group = true;
        var field = new Field(fieldName, id, name2, rule);
        field.filename = parse.filename;
        ifBlock(type, function parseGroup_block(token2) {
          switch (token2) {
            case "option":
              parseOption(type, token2);
              skip(";");
              break;
            case "required":
            case "repeated":
              parseField(type, token2);
              break;
            case "optional":
              if (isProto3) {
                parseField(type, "proto3_optional");
              } else {
                parseField(type, "optional");
              }
              break;
            case "message":
              parseType(type, token2);
              break;
            case "enum":
              parseEnum(type, token2);
              break;
            default:
              throw illegal(token2);
          }
        });
        parent.add(type).add(field);
      }
      function parseMapField(parent) {
        skip("<");
        var keyType = next();
        if (types.mapKey[keyType] === void 0)
          throw illegal(keyType, "type");
        skip(",");
        var valueType = next();
        if (!typeRefRe.test(valueType))
          throw illegal(valueType, "type");
        skip(">");
        var name2 = next();
        if (!nameRe.test(name2))
          throw illegal(name2, "name");
        skip("=");
        var field = new MapField(applyCase(name2), parseId(next()), keyType, valueType);
        ifBlock(field, function parseMapField_block(token2) {
          if (token2 === "option") {
            parseOption(field, token2);
            skip(";");
          } else
            throw illegal(token2);
        }, function parseMapField_line() {
          parseInlineOptions(field);
        });
        parent.add(field);
      }
      function parseOneOf(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var oneof = new OneOf(applyCase(token2));
        ifBlock(oneof, function parseOneOf_block(token3) {
          if (token3 === "option") {
            parseOption(oneof, token3);
            skip(";");
          } else {
            push(token3);
            parseField(oneof, "optional");
          }
        });
        parent.add(oneof);
      }
      function parseEnum(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var enm = new Enum(token2);
        ifBlock(enm, function parseEnum_block(token3) {
          switch (token3) {
            case "option":
              parseOption(enm, token3);
              skip(";");
              break;
            case "reserved":
              readRanges(enm.reserved || (enm.reserved = []), true);
              break;
            default:
              parseEnumValue(enm, token3);
          }
        });
        parent.add(enm);
      }
      function parseEnumValue(parent, token2) {
        if (!nameRe.test(token2))
          throw illegal(token2, "name");
        skip("=");
        var value = parseId(next(), true), dummy = {
          options: void 0
        };
        dummy.setOption = function(name2, value2) {
          if (this.options === void 0)
            this.options = {};
          this.options[name2] = value2;
        };
        ifBlock(dummy, function parseEnumValue_block(token3) {
          if (token3 === "option") {
            parseOption(dummy, token3);
            skip(";");
          } else
            throw illegal(token3);
        }, function parseEnumValue_line() {
          parseInlineOptions(dummy);
        });
        parent.add(token2, value, dummy.comment, dummy.options);
      }
      function parseOption(parent, token2) {
        var isCustom = skip("(", true);
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2, "name");
        var name2 = token2;
        var option = name2;
        var propName;
        if (isCustom) {
          skip(")");
          name2 = "(" + name2 + ")";
          option = name2;
          token2 = peek();
          if (fqTypeRefRe.test(token2)) {
            propName = token2.slice(1);
            name2 += token2;
            next();
          }
        }
        skip("=");
        var optionValue = parseOptionValue(parent, name2);
        setParsedOption(parent, option, optionValue, propName);
      }
      function parseOptionValue(parent, name2) {
        if (skip("{", true)) {
          var objectResult = {};
          while (!skip("}", true)) {
            if (!nameRe.test(token = next())) {
              throw illegal(token, "name");
            }
            var value;
            var propName = token;
            skip(":", true);
            if (peek() === "{")
              value = parseOptionValue(parent, name2 + "." + token);
            else if (peek() === "[") {
              value = [];
              var lastValue;
              if (skip("[", true)) {
                do {
                  lastValue = readValue(true);
                  value.push(lastValue);
                } while (skip(",", true));
                skip("]");
                if (typeof lastValue !== "undefined") {
                  setOption(parent, name2 + "." + token, lastValue);
                }
              }
            } else {
              value = readValue(true);
              setOption(parent, name2 + "." + token, value);
            }
            var prevValue = objectResult[propName];
            if (prevValue)
              value = [].concat(prevValue).concat(value);
            objectResult[propName] = value;
            skip(",", true);
            skip(";", true);
          }
          return objectResult;
        }
        var simpleValue = readValue(true);
        setOption(parent, name2, simpleValue);
        return simpleValue;
      }
      function setOption(parent, name2, value) {
        if (parent.setOption)
          parent.setOption(name2, value);
      }
      function setParsedOption(parent, name2, value, propName) {
        if (parent.setParsedOption)
          parent.setParsedOption(name2, value, propName);
      }
      function parseInlineOptions(parent) {
        if (skip("[", true)) {
          do {
            parseOption(parent, "option");
          } while (skip(",", true));
          skip("]");
        }
        return parent;
      }
      function parseService(parent, token2) {
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "service name");
        var service = new Service(token2);
        ifBlock(service, function parseService_block(token3) {
          if (parseCommon(service, token3))
            return;
          if (token3 === "rpc")
            parseMethod(service, token3);
          else
            throw illegal(token3);
        });
        parent.add(service);
      }
      function parseMethod(parent, token2) {
        var commentText = cmnt();
        var type = token2;
        if (!nameRe.test(token2 = next()))
          throw illegal(token2, "name");
        var name2 = token2, requestType, requestStream, responseType, responseStream;
        skip("(");
        if (skip("stream", true))
          requestStream = true;
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2);
        requestType = token2;
        skip(")");
        skip("returns");
        skip("(");
        if (skip("stream", true))
          responseStream = true;
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2);
        responseType = token2;
        skip(")");
        var method = new Method(name2, type, requestType, responseType, requestStream, responseStream);
        method.comment = commentText;
        ifBlock(method, function parseMethod_block(token3) {
          if (token3 === "option") {
            parseOption(method, token3);
            skip(";");
          } else
            throw illegal(token3);
        });
        parent.add(method);
      }
      function parseExtension(parent, token2) {
        if (!typeRefRe.test(token2 = next()))
          throw illegal(token2, "reference");
        var reference = token2;
        ifBlock(null, function parseExtension_block(token3) {
          switch (token3) {
            case "required":
            case "repeated":
              parseField(parent, token3, reference);
              break;
            case "optional":
              if (isProto3) {
                parseField(parent, "proto3_optional", reference);
              } else {
                parseField(parent, "optional", reference);
              }
              break;
            default:
              if (!isProto3 || !typeRefRe.test(token3))
                throw illegal(token3);
              push(token3);
              parseField(parent, "optional", reference);
              break;
          }
        });
      }
      var token;
      while ((token = next()) !== null) {
        switch (token) {
          case "package":
            if (!head)
              throw illegal(token);
            parsePackage();
            break;
          case "import":
            if (!head)
              throw illegal(token);
            parseImport();
            break;
          case "syntax":
            if (!head)
              throw illegal(token);
            parseSyntax();
            break;
          case "option":
            parseOption(ptr, token);
            skip(";");
            break;
          default:
            if (parseCommon(ptr, token)) {
              head = false;
              continue;
            }
            throw illegal(token);
        }
      }
      parse.filename = null;
      return {
        "package": pkg,
        "imports": imports,
        weakImports,
        syntax,
        root
      };
    }
  }
});

// node_modules/protobufjs/src/common.js
var require_common = __commonJS({
  "node_modules/protobufjs/src/common.js"(exports2, module2) {
    "use strict";
    module2.exports = common;
    var commonRe = /\/|\./;
    function common(name2, json) {
      if (!commonRe.test(name2)) {
        name2 = "google/protobuf/" + name2 + ".proto";
        json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
      }
      common[name2] = json;
    }
    common("any", {
      Any: {
        fields: {
          type_url: {
            type: "string",
            id: 1
          },
          value: {
            type: "bytes",
            id: 2
          }
        }
      }
    });
    var timeType;
    common("duration", {
      Duration: timeType = {
        fields: {
          seconds: {
            type: "int64",
            id: 1
          },
          nanos: {
            type: "int32",
            id: 2
          }
        }
      }
    });
    common("timestamp", {
      Timestamp: timeType
    });
    common("empty", {
      Empty: {
        fields: {}
      }
    });
    common("struct", {
      Struct: {
        fields: {
          fields: {
            keyType: "string",
            type: "Value",
            id: 1
          }
        }
      },
      Value: {
        oneofs: {
          kind: {
            oneof: [
              "nullValue",
              "numberValue",
              "stringValue",
              "boolValue",
              "structValue",
              "listValue"
            ]
          }
        },
        fields: {
          nullValue: {
            type: "NullValue",
            id: 1
          },
          numberValue: {
            type: "double",
            id: 2
          },
          stringValue: {
            type: "string",
            id: 3
          },
          boolValue: {
            type: "bool",
            id: 4
          },
          structValue: {
            type: "Struct",
            id: 5
          },
          listValue: {
            type: "ListValue",
            id: 6
          }
        }
      },
      NullValue: {
        values: {
          NULL_VALUE: 0
        }
      },
      ListValue: {
        fields: {
          values: {
            rule: "repeated",
            type: "Value",
            id: 1
          }
        }
      }
    });
    common("wrappers", {
      DoubleValue: {
        fields: {
          value: {
            type: "double",
            id: 1
          }
        }
      },
      FloatValue: {
        fields: {
          value: {
            type: "float",
            id: 1
          }
        }
      },
      Int64Value: {
        fields: {
          value: {
            type: "int64",
            id: 1
          }
        }
      },
      UInt64Value: {
        fields: {
          value: {
            type: "uint64",
            id: 1
          }
        }
      },
      Int32Value: {
        fields: {
          value: {
            type: "int32",
            id: 1
          }
        }
      },
      UInt32Value: {
        fields: {
          value: {
            type: "uint32",
            id: 1
          }
        }
      },
      BoolValue: {
        fields: {
          value: {
            type: "bool",
            id: 1
          }
        }
      },
      StringValue: {
        fields: {
          value: {
            type: "string",
            id: 1
          }
        }
      },
      BytesValue: {
        fields: {
          value: {
            type: "bytes",
            id: 1
          }
        }
      }
    });
    common("field_mask", {
      FieldMask: {
        fields: {
          paths: {
            rule: "repeated",
            type: "string",
            id: 1
          }
        }
      }
    });
    common.get = function get(file) {
      return common[file] || null;
    };
  }
});

// node_modules/protobufjs/src/index.js
var require_src = __commonJS({
  "node_modules/protobufjs/src/index.js"(exports2, module2) {
    "use strict";
    var protobuf = module2.exports = require_index_light();
    protobuf.build = "full";
    protobuf.tokenize = require_tokenize();
    protobuf.parse = require_parse();
    protobuf.common = require_common();
    protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
  }
});

// node_modules/protobufjs/index.js
var require_protobufjs = __commonJS({
  "node_modules/protobufjs/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_src();
  }
});

// node_modules/protons-runtime/dist/src/decode.js
function decodeMessage(buf, codec) {
  const reader2 = Reader.create(buf instanceof Uint8Array ? buf : buf.subarray());
  return codec.decode(reader2);
}
var import_protobufjs, Reader, methods;
var init_decode = __esm({
  "node_modules/protons-runtime/dist/src/decode.js"() {
    import_protobufjs = __toESM(require_protobufjs(), 1);
    Reader = import_protobufjs.default.Reader;
    methods = [
      "uint64",
      "int64",
      "sint64",
      "fixed64",
      "sfixed64"
    ];
    methods.forEach((method) => {
      const original = Reader.prototype[method];
      Reader.prototype[method] = function() {
        return BigInt(original.call(this).toString());
      };
    });
  }
});

// node_modules/protons-runtime/dist/src/encode.js
function encodeMessage(message2, codec) {
  const w = Writer.create();
  codec.encode(message2, w, {
    lengthDelimited: false
  });
  return w.finish();
}
var import_protobufjs2, Writer, methods2;
var init_encode = __esm({
  "node_modules/protons-runtime/dist/src/encode.js"() {
    import_protobufjs2 = __toESM(require_protobufjs(), 1);
    Writer = import_protobufjs2.default.Writer;
    methods2 = [
      "uint64",
      "int64",
      "sint64",
      "fixed64",
      "sfixed64"
    ];
    methods2.forEach((method) => {
      const original = Writer.prototype[method];
      Writer.prototype[method] = function(val) {
        return original.call(this, val.toString());
      };
    });
  }
});

// node_modules/protons-runtime/dist/src/codec.js
function createCodec2(name2, type, encode5, decode6) {
  return {
    name: name2,
    type,
    encode: encode5,
    decode: decode6
  };
}
var CODEC_TYPES;
var init_codec = __esm({
  "node_modules/protons-runtime/dist/src/codec.js"() {
    (function(CODEC_TYPES2) {
      CODEC_TYPES2[CODEC_TYPES2["VARINT"] = 0] = "VARINT";
      CODEC_TYPES2[CODEC_TYPES2["BIT64"] = 1] = "BIT64";
      CODEC_TYPES2[CODEC_TYPES2["LENGTH_DELIMITED"] = 2] = "LENGTH_DELIMITED";
      CODEC_TYPES2[CODEC_TYPES2["START_GROUP"] = 3] = "START_GROUP";
      CODEC_TYPES2[CODEC_TYPES2["END_GROUP"] = 4] = "END_GROUP";
      CODEC_TYPES2[CODEC_TYPES2["BIT32"] = 5] = "BIT32";
    })(CODEC_TYPES || (CODEC_TYPES = {}));
  }
});

// node_modules/protons-runtime/dist/src/codecs/enum.js
function enumeration(v) {
  function findValue(val) {
    if (v[val.toString()] == null) {
      throw new Error("Invalid enum value");
    }
    return v[val];
  }
  const encode5 = function enumEncode(val, writer) {
    const enumValue = findValue(val);
    writer.int32(enumValue);
  };
  const decode6 = function enumDecode(reader2) {
    const val = reader2.uint32();
    return findValue(val);
  };
  return createCodec2("enum", CODEC_TYPES.VARINT, encode5, decode6);
}
var init_enum = __esm({
  "node_modules/protons-runtime/dist/src/codecs/enum.js"() {
    init_codec();
  }
});

// node_modules/protons-runtime/dist/src/codecs/message.js
function message(encode5, decode6) {
  return createCodec2("message", CODEC_TYPES.LENGTH_DELIMITED, encode5, decode6);
}
var init_message = __esm({
  "node_modules/protons-runtime/dist/src/codecs/message.js"() {
    init_codec();
  }
});

// node_modules/protons-runtime/dist/src/index.js
var init_src2 = __esm({
  "node_modules/protons-runtime/dist/src/index.js"() {
    init_decode();
    init_encode();
    init_enum();
    init_message();
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/keys.js
var KeyType, __KeyTypeValues, PublicKey, PrivateKey;
var init_keys = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/keys.js"() {
    init_src2();
    (function(KeyType2) {
      KeyType2["RSA"] = "RSA";
      KeyType2["Ed25519"] = "Ed25519";
      KeyType2["Secp256k1"] = "Secp256k1";
    })(KeyType || (KeyType = {}));
    (function(__KeyTypeValues2) {
      __KeyTypeValues2[__KeyTypeValues2["RSA"] = 0] = "RSA";
      __KeyTypeValues2[__KeyTypeValues2["Ed25519"] = 1] = "Ed25519";
      __KeyTypeValues2[__KeyTypeValues2["Secp256k1"] = 2] = "Secp256k1";
    })(__KeyTypeValues || (__KeyTypeValues = {}));
    (function(KeyType2) {
      KeyType2.codec = () => {
        return enumeration(__KeyTypeValues);
      };
    })(KeyType || (KeyType = {}));
    (function(PublicKey2) {
      let _codec;
      PublicKey2.codec = () => {
        if (_codec == null) {
          _codec = message((obj, writer, opts = {}) => {
            if (opts.lengthDelimited !== false) {
              writer.fork();
            }
            if (obj.Type != null) {
              writer.uint32(8);
              KeyType.codec().encode(obj.Type, writer);
            } else {
              throw new Error('Protocol error: required field "Type" was not found in object');
            }
            if (obj.Data != null) {
              writer.uint32(18);
              writer.bytes(obj.Data);
            } else {
              throw new Error('Protocol error: required field "Data" was not found in object');
            }
            if (opts.lengthDelimited !== false) {
              writer.ldelim();
            }
          }, (reader2, length2) => {
            const obj = {
              Type: KeyType.RSA,
              Data: new Uint8Array(0)
            };
            const end = length2 == null ? reader2.len : reader2.pos + length2;
            while (reader2.pos < end) {
              const tag = reader2.uint32();
              switch (tag >>> 3) {
                case 1:
                  obj.Type = KeyType.codec().decode(reader2);
                  break;
                case 2:
                  obj.Data = reader2.bytes();
                  break;
                default:
                  reader2.skipType(tag & 7);
                  break;
              }
            }
            if (obj.Type == null) {
              throw new Error('Protocol error: value for required field "Type" was not found in protobuf');
            }
            if (obj.Data == null) {
              throw new Error('Protocol error: value for required field "Data" was not found in protobuf');
            }
            return obj;
          });
        }
        return _codec;
      };
      PublicKey2.encode = (obj) => {
        return encodeMessage(obj, PublicKey2.codec());
      };
      PublicKey2.decode = (buf) => {
        return decodeMessage(buf, PublicKey2.codec());
      };
    })(PublicKey || (PublicKey = {}));
    (function(PrivateKey2) {
      let _codec;
      PrivateKey2.codec = () => {
        if (_codec == null) {
          _codec = message((obj, writer, opts = {}) => {
            if (opts.lengthDelimited !== false) {
              writer.fork();
            }
            if (obj.Type != null) {
              writer.uint32(8);
              KeyType.codec().encode(obj.Type, writer);
            } else {
              throw new Error('Protocol error: required field "Type" was not found in object');
            }
            if (obj.Data != null) {
              writer.uint32(18);
              writer.bytes(obj.Data);
            } else {
              throw new Error('Protocol error: required field "Data" was not found in object');
            }
            if (opts.lengthDelimited !== false) {
              writer.ldelim();
            }
          }, (reader2, length2) => {
            const obj = {
              Type: KeyType.RSA,
              Data: new Uint8Array(0)
            };
            const end = length2 == null ? reader2.len : reader2.pos + length2;
            while (reader2.pos < end) {
              const tag = reader2.uint32();
              switch (tag >>> 3) {
                case 1:
                  obj.Type = KeyType.codec().decode(reader2);
                  break;
                case 2:
                  obj.Data = reader2.bytes();
                  break;
                default:
                  reader2.skipType(tag & 7);
                  break;
              }
            }
            if (obj.Type == null) {
              throw new Error('Protocol error: value for required field "Type" was not found in protobuf');
            }
            if (obj.Data == null) {
              throw new Error('Protocol error: value for required field "Data" was not found in protobuf');
            }
            return obj;
          });
        }
        return _codec;
      };
      PrivateKey2.encode = (obj) => {
        return encodeMessage(obj, PrivateKey2.codec());
      };
      PrivateKey2.decode = (buf) => {
        return decodeMessage(buf, PrivateKey2.codec());
      };
    })(PrivateKey || (PrivateKey = {}));
  }
});

// node_modules/node-forge/lib/forge.js
var require_forge = __commonJS({
  "node_modules/node-forge/lib/forge.js"(exports2, module2) {
    module2.exports = {
      options: {
        usePureJavaScript: false
      }
    };
  }
});

// node_modules/node-forge/lib/baseN.js
var require_baseN = __commonJS({
  "node_modules/node-forge/lib/baseN.js"(exports2, module2) {
    var api = {};
    module2.exports = api;
    var _reverseAlphabets = {};
    api.encode = function(input, alphabet2, maxline) {
      if (typeof alphabet2 !== "string") {
        throw new TypeError('"alphabet" must be a string.');
      }
      if (maxline !== void 0 && typeof maxline !== "number") {
        throw new TypeError('"maxline" must be a number.');
      }
      var output = "";
      if (!(input instanceof Uint8Array)) {
        output = _encodeWithByteBuffer(input, alphabet2);
      } else {
        var i = 0;
        var base3 = alphabet2.length;
        var first = alphabet2.charAt(0);
        var digits = [0];
        for (i = 0; i < input.length; ++i) {
          for (var j = 0, carry = input[i]; j < digits.length; ++j) {
            carry += digits[j] << 8;
            digits[j] = carry % base3;
            carry = carry / base3 | 0;
          }
          while (carry > 0) {
            digits.push(carry % base3);
            carry = carry / base3 | 0;
          }
        }
        for (i = 0; input[i] === 0 && i < input.length - 1; ++i) {
          output += first;
        }
        for (i = digits.length - 1; i >= 0; --i) {
          output += alphabet2[digits[i]];
        }
      }
      if (maxline) {
        var regex = new RegExp(".{1," + maxline + "}", "g");
        output = output.match(regex).join("\r\n");
      }
      return output;
    };
    api.decode = function(input, alphabet2) {
      if (typeof input !== "string") {
        throw new TypeError('"input" must be a string.');
      }
      if (typeof alphabet2 !== "string") {
        throw new TypeError('"alphabet" must be a string.');
      }
      var table = _reverseAlphabets[alphabet2];
      if (!table) {
        table = _reverseAlphabets[alphabet2] = [];
        for (var i = 0; i < alphabet2.length; ++i) {
          table[alphabet2.charCodeAt(i)] = i;
        }
      }
      input = input.replace(/\s/g, "");
      var base3 = alphabet2.length;
      var first = alphabet2.charAt(0);
      var bytes = [0];
      for (var i = 0; i < input.length; i++) {
        var value = table[input.charCodeAt(i)];
        if (value === void 0) {
          return;
        }
        for (var j = 0, carry = value; j < bytes.length; ++j) {
          carry += bytes[j] * base3;
          bytes[j] = carry & 255;
          carry >>= 8;
        }
        while (carry > 0) {
          bytes.push(carry & 255);
          carry >>= 8;
        }
      }
      for (var k = 0; input[k] === first && k < input.length - 1; ++k) {
        bytes.push(0);
      }
      if (typeof Buffer !== "undefined") {
        return Buffer.from(bytes.reverse());
      }
      return new Uint8Array(bytes.reverse());
    };
    function _encodeWithByteBuffer(input, alphabet2) {
      var i = 0;
      var base3 = alphabet2.length;
      var first = alphabet2.charAt(0);
      var digits = [0];
      for (i = 0; i < input.length(); ++i) {
        for (var j = 0, carry = input.at(i); j < digits.length; ++j) {
          carry += digits[j] << 8;
          digits[j] = carry % base3;
          carry = carry / base3 | 0;
        }
        while (carry > 0) {
          digits.push(carry % base3);
          carry = carry / base3 | 0;
        }
      }
      var output = "";
      for (i = 0; input.at(i) === 0 && i < input.length() - 1; ++i) {
        output += first;
      }
      for (i = digits.length - 1; i >= 0; --i) {
        output += alphabet2[digits[i]];
      }
      return output;
    }
  }
});

// node_modules/node-forge/lib/util.js
var require_util2 = __commonJS({
  "node_modules/node-forge/lib/util.js"(exports2, module2) {
    var forge5 = require_forge();
    var baseN = require_baseN();
    var util = module2.exports = forge5.util = forge5.util || {};
    (function() {
      if (typeof process !== "undefined" && process.nextTick && !process.browser) {
        util.nextTick = process.nextTick;
        if (typeof setImmediate === "function") {
          util.setImmediate = setImmediate;
        } else {
          util.setImmediate = util.nextTick;
        }
        return;
      }
      if (typeof setImmediate === "function") {
        util.setImmediate = function() {
          return setImmediate.apply(void 0, arguments);
        };
        util.nextTick = function(callback) {
          return setImmediate(callback);
        };
        return;
      }
      util.setImmediate = function(callback) {
        setTimeout(callback, 0);
      };
      if (typeof window !== "undefined" && typeof window.postMessage === "function") {
        let handler2 = function(event) {
          if (event.source === window && event.data === msg) {
            event.stopPropagation();
            var copy = callbacks.slice();
            callbacks.length = 0;
            copy.forEach(function(callback) {
              callback();
            });
          }
        };
        var handler = handler2;
        var msg = "forge.setImmediate";
        var callbacks = [];
        util.setImmediate = function(callback) {
          callbacks.push(callback);
          if (callbacks.length === 1) {
            window.postMessage(msg, "*");
          }
        };
        window.addEventListener("message", handler2, true);
      }
      if (typeof MutationObserver !== "undefined") {
        var now = Date.now();
        var attr = true;
        var div = document.createElement("div");
        var callbacks = [];
        new MutationObserver(function() {
          var copy = callbacks.slice();
          callbacks.length = 0;
          copy.forEach(function(callback) {
            callback();
          });
        }).observe(div, { attributes: true });
        var oldSetImmediate = util.setImmediate;
        util.setImmediate = function(callback) {
          if (Date.now() - now > 15) {
            now = Date.now();
            oldSetImmediate(callback);
          } else {
            callbacks.push(callback);
            if (callbacks.length === 1) {
              div.setAttribute("a", attr = !attr);
            }
          }
        };
      }
      util.nextTick = util.setImmediate;
    })();
    util.isNodejs = typeof process !== "undefined" && process.versions && process.versions.node;
    util.globalScope = function() {
      if (util.isNodejs) {
        return global;
      }
      return typeof self === "undefined" ? window : self;
    }();
    util.isArray = Array.isArray || function(x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    };
    util.isArrayBuffer = function(x) {
      return typeof ArrayBuffer !== "undefined" && x instanceof ArrayBuffer;
    };
    util.isArrayBufferView = function(x) {
      return x && util.isArrayBuffer(x.buffer) && x.byteLength !== void 0;
    };
    function _checkBitsParam(n) {
      if (!(n === 8 || n === 16 || n === 24 || n === 32)) {
        throw new Error("Only 8, 16, 24, or 32 bits supported: " + n);
      }
    }
    util.ByteBuffer = ByteStringBuffer;
    function ByteStringBuffer(b) {
      this.data = "";
      this.read = 0;
      if (typeof b === "string") {
        this.data = b;
      } else if (util.isArrayBuffer(b) || util.isArrayBufferView(b)) {
        if (typeof Buffer !== "undefined" && b instanceof Buffer) {
          this.data = b.toString("binary");
        } else {
          var arr = new Uint8Array(b);
          try {
            this.data = String.fromCharCode.apply(null, arr);
          } catch (e) {
            for (var i = 0; i < arr.length; ++i) {
              this.putByte(arr[i]);
            }
          }
        }
      } else if (b instanceof ByteStringBuffer || typeof b === "object" && typeof b.data === "string" && typeof b.read === "number") {
        this.data = b.data;
        this.read = b.read;
      }
      this._constructedStringLength = 0;
    }
    util.ByteStringBuffer = ByteStringBuffer;
    var _MAX_CONSTRUCTED_STRING_LENGTH = 4096;
    util.ByteStringBuffer.prototype._optimizeConstructedString = function(x) {
      this._constructedStringLength += x;
      if (this._constructedStringLength > _MAX_CONSTRUCTED_STRING_LENGTH) {
        this.data.substr(0, 1);
        this._constructedStringLength = 0;
      }
    };
    util.ByteStringBuffer.prototype.length = function() {
      return this.data.length - this.read;
    };
    util.ByteStringBuffer.prototype.isEmpty = function() {
      return this.length() <= 0;
    };
    util.ByteStringBuffer.prototype.putByte = function(b) {
      return this.putBytes(String.fromCharCode(b));
    };
    util.ByteStringBuffer.prototype.fillWithByte = function(b, n) {
      b = String.fromCharCode(b);
      var d = this.data;
      while (n > 0) {
        if (n & 1) {
          d += b;
        }
        n >>>= 1;
        if (n > 0) {
          b += b;
        }
      }
      this.data = d;
      this._optimizeConstructedString(n);
      return this;
    };
    util.ByteStringBuffer.prototype.putBytes = function(bytes) {
      this.data += bytes;
      this._optimizeConstructedString(bytes.length);
      return this;
    };
    util.ByteStringBuffer.prototype.putString = function(str) {
      return this.putBytes(util.encodeUtf8(str));
    };
    util.ByteStringBuffer.prototype.putInt16 = function(i) {
      return this.putBytes(
        String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt24 = function(i) {
      return this.putBytes(
        String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt32 = function(i) {
      return this.putBytes(
        String.fromCharCode(i >> 24 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt16Le = function(i) {
      return this.putBytes(
        String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt24Le = function(i) {
      return this.putBytes(
        String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i >> 16 & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt32Le = function(i) {
      return this.putBytes(
        String.fromCharCode(i & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 24 & 255)
      );
    };
    util.ByteStringBuffer.prototype.putInt = function(i, n) {
      _checkBitsParam(n);
      var bytes = "";
      do {
        n -= 8;
        bytes += String.fromCharCode(i >> n & 255);
      } while (n > 0);
      return this.putBytes(bytes);
    };
    util.ByteStringBuffer.prototype.putSignedInt = function(i, n) {
      if (i < 0) {
        i += 2 << n - 1;
      }
      return this.putInt(i, n);
    };
    util.ByteStringBuffer.prototype.putBuffer = function(buffer) {
      return this.putBytes(buffer.getBytes());
    };
    util.ByteStringBuffer.prototype.getByte = function() {
      return this.data.charCodeAt(this.read++);
    };
    util.ByteStringBuffer.prototype.getInt16 = function() {
      var rval = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
      this.read += 2;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt24 = function() {
      var rval = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
      this.read += 3;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt32 = function() {
      var rval = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
      this.read += 4;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt16Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
      this.read += 2;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt24Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
      this.read += 3;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt32Le = function() {
      var rval = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
      this.read += 4;
      return rval;
    };
    util.ByteStringBuffer.prototype.getInt = function(n) {
      _checkBitsParam(n);
      var rval = 0;
      do {
        rval = (rval << 8) + this.data.charCodeAt(this.read++);
        n -= 8;
      } while (n > 0);
      return rval;
    };
    util.ByteStringBuffer.prototype.getSignedInt = function(n) {
      var x = this.getInt(n);
      var max = 2 << n - 2;
      if (x >= max) {
        x -= max << 1;
      }
      return x;
    };
    util.ByteStringBuffer.prototype.getBytes = function(count) {
      var rval;
      if (count) {
        count = Math.min(this.length(), count);
        rval = this.data.slice(this.read, this.read + count);
        this.read += count;
      } else if (count === 0) {
        rval = "";
      } else {
        rval = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return rval;
    };
    util.ByteStringBuffer.prototype.bytes = function(count) {
      return typeof count === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + count);
    };
    util.ByteStringBuffer.prototype.at = function(i) {
      return this.data.charCodeAt(this.read + i);
    };
    util.ByteStringBuffer.prototype.setAt = function(i, b) {
      this.data = this.data.substr(0, this.read + i) + String.fromCharCode(b) + this.data.substr(this.read + i + 1);
      return this;
    };
    util.ByteStringBuffer.prototype.last = function() {
      return this.data.charCodeAt(this.data.length - 1);
    };
    util.ByteStringBuffer.prototype.copy = function() {
      var c = util.createBuffer(this.data);
      c.read = this.read;
      return c;
    };
    util.ByteStringBuffer.prototype.compact = function() {
      if (this.read > 0) {
        this.data = this.data.slice(this.read);
        this.read = 0;
      }
      return this;
    };
    util.ByteStringBuffer.prototype.clear = function() {
      this.data = "";
      this.read = 0;
      return this;
    };
    util.ByteStringBuffer.prototype.truncate = function(count) {
      var len = Math.max(0, this.length() - count);
      this.data = this.data.substr(this.read, len);
      this.read = 0;
      return this;
    };
    util.ByteStringBuffer.prototype.toHex = function() {
      var rval = "";
      for (var i = this.read; i < this.data.length; ++i) {
        var b = this.data.charCodeAt(i);
        if (b < 16) {
          rval += "0";
        }
        rval += b.toString(16);
      }
      return rval;
    };
    util.ByteStringBuffer.prototype.toString = function() {
      return util.decodeUtf8(this.bytes());
    };
    function DataBuffer(b, options) {
      options = options || {};
      this.read = options.readOffset || 0;
      this.growSize = options.growSize || 1024;
      var isArrayBuffer = util.isArrayBuffer(b);
      var isArrayBufferView = util.isArrayBufferView(b);
      if (isArrayBuffer || isArrayBufferView) {
        if (isArrayBuffer) {
          this.data = new DataView(b);
        } else {
          this.data = new DataView(b.buffer, b.byteOffset, b.byteLength);
        }
        this.write = "writeOffset" in options ? options.writeOffset : this.data.byteLength;
        return;
      }
      this.data = new DataView(new ArrayBuffer(0));
      this.write = 0;
      if (b !== null && b !== void 0) {
        this.putBytes(b);
      }
      if ("writeOffset" in options) {
        this.write = options.writeOffset;
      }
    }
    util.DataBuffer = DataBuffer;
    util.DataBuffer.prototype.length = function() {
      return this.write - this.read;
    };
    util.DataBuffer.prototype.isEmpty = function() {
      return this.length() <= 0;
    };
    util.DataBuffer.prototype.accommodate = function(amount, growSize) {
      if (this.length() >= amount) {
        return this;
      }
      growSize = Math.max(growSize || this.growSize, amount);
      var src2 = new Uint8Array(
        this.data.buffer,
        this.data.byteOffset,
        this.data.byteLength
      );
      var dst = new Uint8Array(this.length() + growSize);
      dst.set(src2);
      this.data = new DataView(dst.buffer);
      return this;
    };
    util.DataBuffer.prototype.putByte = function(b) {
      this.accommodate(1);
      this.data.setUint8(this.write++, b);
      return this;
    };
    util.DataBuffer.prototype.fillWithByte = function(b, n) {
      this.accommodate(n);
      for (var i = 0; i < n; ++i) {
        this.data.setUint8(b);
      }
      return this;
    };
    util.DataBuffer.prototype.putBytes = function(bytes, encoding) {
      if (util.isArrayBufferView(bytes)) {
        var src2 = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        var len = src2.byteLength - src2.byteOffset;
        this.accommodate(len);
        var dst = new Uint8Array(this.data.buffer, this.write);
        dst.set(src2);
        this.write += len;
        return this;
      }
      if (util.isArrayBuffer(bytes)) {
        var src2 = new Uint8Array(bytes);
        this.accommodate(src2.byteLength);
        var dst = new Uint8Array(this.data.buffer);
        dst.set(src2, this.write);
        this.write += src2.byteLength;
        return this;
      }
      if (bytes instanceof util.DataBuffer || typeof bytes === "object" && typeof bytes.read === "number" && typeof bytes.write === "number" && util.isArrayBufferView(bytes.data)) {
        var src2 = new Uint8Array(bytes.data.byteLength, bytes.read, bytes.length());
        this.accommodate(src2.byteLength);
        var dst = new Uint8Array(bytes.data.byteLength, this.write);
        dst.set(src2);
        this.write += src2.byteLength;
        return this;
      }
      if (bytes instanceof util.ByteStringBuffer) {
        bytes = bytes.data;
        encoding = "binary";
      }
      encoding = encoding || "binary";
      if (typeof bytes === "string") {
        var view;
        if (encoding === "hex") {
          this.accommodate(Math.ceil(bytes.length / 2));
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util.binary.hex.decode(bytes, view, this.write);
          return this;
        }
        if (encoding === "base64") {
          this.accommodate(Math.ceil(bytes.length / 4) * 3);
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util.binary.base64.decode(bytes, view, this.write);
          return this;
        }
        if (encoding === "utf8") {
          bytes = util.encodeUtf8(bytes);
          encoding = "binary";
        }
        if (encoding === "binary" || encoding === "raw") {
          this.accommodate(bytes.length);
          view = new Uint8Array(this.data.buffer, this.write);
          this.write += util.binary.raw.decode(view);
          return this;
        }
        if (encoding === "utf16") {
          this.accommodate(bytes.length * 2);
          view = new Uint16Array(this.data.buffer, this.write);
          this.write += util.text.utf16.encode(view);
          return this;
        }
        throw new Error("Invalid encoding: " + encoding);
      }
      throw Error("Invalid parameter: " + bytes);
    };
    util.DataBuffer.prototype.putBuffer = function(buffer) {
      this.putBytes(buffer);
      buffer.clear();
      return this;
    };
    util.DataBuffer.prototype.putString = function(str) {
      return this.putBytes(str, "utf16");
    };
    util.DataBuffer.prototype.putInt16 = function(i) {
      this.accommodate(2);
      this.data.setInt16(this.write, i);
      this.write += 2;
      return this;
    };
    util.DataBuffer.prototype.putInt24 = function(i) {
      this.accommodate(3);
      this.data.setInt16(this.write, i >> 8 & 65535);
      this.data.setInt8(this.write, i >> 16 & 255);
      this.write += 3;
      return this;
    };
    util.DataBuffer.prototype.putInt32 = function(i) {
      this.accommodate(4);
      this.data.setInt32(this.write, i);
      this.write += 4;
      return this;
    };
    util.DataBuffer.prototype.putInt16Le = function(i) {
      this.accommodate(2);
      this.data.setInt16(this.write, i, true);
      this.write += 2;
      return this;
    };
    util.DataBuffer.prototype.putInt24Le = function(i) {
      this.accommodate(3);
      this.data.setInt8(this.write, i >> 16 & 255);
      this.data.setInt16(this.write, i >> 8 & 65535, true);
      this.write += 3;
      return this;
    };
    util.DataBuffer.prototype.putInt32Le = function(i) {
      this.accommodate(4);
      this.data.setInt32(this.write, i, true);
      this.write += 4;
      return this;
    };
    util.DataBuffer.prototype.putInt = function(i, n) {
      _checkBitsParam(n);
      this.accommodate(n / 8);
      do {
        n -= 8;
        this.data.setInt8(this.write++, i >> n & 255);
      } while (n > 0);
      return this;
    };
    util.DataBuffer.prototype.putSignedInt = function(i, n) {
      _checkBitsParam(n);
      this.accommodate(n / 8);
      if (i < 0) {
        i += 2 << n - 1;
      }
      return this.putInt(i, n);
    };
    util.DataBuffer.prototype.getByte = function() {
      return this.data.getInt8(this.read++);
    };
    util.DataBuffer.prototype.getInt16 = function() {
      var rval = this.data.getInt16(this.read);
      this.read += 2;
      return rval;
    };
    util.DataBuffer.prototype.getInt24 = function() {
      var rval = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
      this.read += 3;
      return rval;
    };
    util.DataBuffer.prototype.getInt32 = function() {
      var rval = this.data.getInt32(this.read);
      this.read += 4;
      return rval;
    };
    util.DataBuffer.prototype.getInt16Le = function() {
      var rval = this.data.getInt16(this.read, true);
      this.read += 2;
      return rval;
    };
    util.DataBuffer.prototype.getInt24Le = function() {
      var rval = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, true) << 8;
      this.read += 3;
      return rval;
    };
    util.DataBuffer.prototype.getInt32Le = function() {
      var rval = this.data.getInt32(this.read, true);
      this.read += 4;
      return rval;
    };
    util.DataBuffer.prototype.getInt = function(n) {
      _checkBitsParam(n);
      var rval = 0;
      do {
        rval = (rval << 8) + this.data.getInt8(this.read++);
        n -= 8;
      } while (n > 0);
      return rval;
    };
    util.DataBuffer.prototype.getSignedInt = function(n) {
      var x = this.getInt(n);
      var max = 2 << n - 2;
      if (x >= max) {
        x -= max << 1;
      }
      return x;
    };
    util.DataBuffer.prototype.getBytes = function(count) {
      var rval;
      if (count) {
        count = Math.min(this.length(), count);
        rval = this.data.slice(this.read, this.read + count);
        this.read += count;
      } else if (count === 0) {
        rval = "";
      } else {
        rval = this.read === 0 ? this.data : this.data.slice(this.read);
        this.clear();
      }
      return rval;
    };
    util.DataBuffer.prototype.bytes = function(count) {
      return typeof count === "undefined" ? this.data.slice(this.read) : this.data.slice(this.read, this.read + count);
    };
    util.DataBuffer.prototype.at = function(i) {
      return this.data.getUint8(this.read + i);
    };
    util.DataBuffer.prototype.setAt = function(i, b) {
      this.data.setUint8(i, b);
      return this;
    };
    util.DataBuffer.prototype.last = function() {
      return this.data.getUint8(this.write - 1);
    };
    util.DataBuffer.prototype.copy = function() {
      return new util.DataBuffer(this);
    };
    util.DataBuffer.prototype.compact = function() {
      if (this.read > 0) {
        var src2 = new Uint8Array(this.data.buffer, this.read);
        var dst = new Uint8Array(src2.byteLength);
        dst.set(src2);
        this.data = new DataView(dst);
        this.write -= this.read;
        this.read = 0;
      }
      return this;
    };
    util.DataBuffer.prototype.clear = function() {
      this.data = new DataView(new ArrayBuffer(0));
      this.read = this.write = 0;
      return this;
    };
    util.DataBuffer.prototype.truncate = function(count) {
      this.write = Math.max(0, this.length() - count);
      this.read = Math.min(this.read, this.write);
      return this;
    };
    util.DataBuffer.prototype.toHex = function() {
      var rval = "";
      for (var i = this.read; i < this.data.byteLength; ++i) {
        var b = this.data.getUint8(i);
        if (b < 16) {
          rval += "0";
        }
        rval += b.toString(16);
      }
      return rval;
    };
    util.DataBuffer.prototype.toString = function(encoding) {
      var view = new Uint8Array(this.data, this.read, this.length());
      encoding = encoding || "utf8";
      if (encoding === "binary" || encoding === "raw") {
        return util.binary.raw.encode(view);
      }
      if (encoding === "hex") {
        return util.binary.hex.encode(view);
      }
      if (encoding === "base64") {
        return util.binary.base64.encode(view);
      }
      if (encoding === "utf8") {
        return util.text.utf8.decode(view);
      }
      if (encoding === "utf16") {
        return util.text.utf16.decode(view);
      }
      throw new Error("Invalid encoding: " + encoding);
    };
    util.createBuffer = function(input, encoding) {
      encoding = encoding || "raw";
      if (input !== void 0 && encoding === "utf8") {
        input = util.encodeUtf8(input);
      }
      return new util.ByteBuffer(input);
    };
    util.fillString = function(c, n) {
      var s = "";
      while (n > 0) {
        if (n & 1) {
          s += c;
        }
        n >>>= 1;
        if (n > 0) {
          c += c;
        }
      }
      return s;
    };
    util.xorBytes = function(s1, s2, n) {
      var s3 = "";
      var b = "";
      var t = "";
      var i = 0;
      var c = 0;
      for (; n > 0; --n, ++i) {
        b = s1.charCodeAt(i) ^ s2.charCodeAt(i);
        if (c >= 10) {
          s3 += t;
          t = "";
          c = 0;
        }
        t += String.fromCharCode(b);
        ++c;
      }
      s3 += t;
      return s3;
    };
    util.hexToBytes = function(hex) {
      var rval = "";
      var i = 0;
      if (hex.length & true) {
        i = 1;
        rval += String.fromCharCode(parseInt(hex[0], 16));
      }
      for (; i < hex.length; i += 2) {
        rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      return rval;
    };
    util.bytesToHex = function(bytes) {
      return util.createBuffer(bytes).toHex();
    };
    util.int32ToBytes = function(i) {
      return String.fromCharCode(i >> 24 & 255) + String.fromCharCode(i >> 16 & 255) + String.fromCharCode(i >> 8 & 255) + String.fromCharCode(i & 255);
    };
    var _base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var _base64Idx = [
      62,
      -1,
      -1,
      -1,
      63,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      -1,
      -1,
      -1,
      64,
      -1,
      -1,
      -1,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51
    ];
    var _base58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    util.encode64 = function(input, maxline) {
      var line = "";
      var output = "";
      var chr1, chr2, chr3;
      var i = 0;
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        line += _base64.charAt(chr1 >> 2);
        line += _base64.charAt((chr1 & 3) << 4 | chr2 >> 4);
        if (isNaN(chr2)) {
          line += "==";
        } else {
          line += _base64.charAt((chr2 & 15) << 2 | chr3 >> 6);
          line += isNaN(chr3) ? "=" : _base64.charAt(chr3 & 63);
        }
        if (maxline && line.length > maxline) {
          output += line.substr(0, maxline) + "\r\n";
          line = line.substr(maxline);
        }
      }
      output += line;
      return output;
    };
    util.decode64 = function(input) {
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var output = "";
      var enc1, enc2, enc3, enc4;
      var i = 0;
      while (i < input.length) {
        enc1 = _base64Idx[input.charCodeAt(i++) - 43];
        enc2 = _base64Idx[input.charCodeAt(i++) - 43];
        enc3 = _base64Idx[input.charCodeAt(i++) - 43];
        enc4 = _base64Idx[input.charCodeAt(i++) - 43];
        output += String.fromCharCode(enc1 << 2 | enc2 >> 4);
        if (enc3 !== 64) {
          output += String.fromCharCode((enc2 & 15) << 4 | enc3 >> 2);
          if (enc4 !== 64) {
            output += String.fromCharCode((enc3 & 3) << 6 | enc4);
          }
        }
      }
      return output;
    };
    util.encodeUtf8 = function(str) {
      return unescape(encodeURIComponent(str));
    };
    util.decodeUtf8 = function(str) {
      return decodeURIComponent(escape(str));
    };
    util.binary = {
      raw: {},
      hex: {},
      base64: {},
      base58: {},
      baseN: {
        encode: baseN.encode,
        decode: baseN.decode
      }
    };
    util.binary.raw.encode = function(bytes) {
      return String.fromCharCode.apply(null, bytes);
    };
    util.binary.raw.decode = function(str, output, offset) {
      var out = output;
      if (!out) {
        out = new Uint8Array(str.length);
      }
      offset = offset || 0;
      var j = offset;
      for (var i = 0; i < str.length; ++i) {
        out[j++] = str.charCodeAt(i);
      }
      return output ? j - offset : out;
    };
    util.binary.hex.encode = util.bytesToHex;
    util.binary.hex.decode = function(hex, output, offset) {
      var out = output;
      if (!out) {
        out = new Uint8Array(Math.ceil(hex.length / 2));
      }
      offset = offset || 0;
      var i = 0, j = offset;
      if (hex.length & 1) {
        i = 1;
        out[j++] = parseInt(hex[0], 16);
      }
      for (; i < hex.length; i += 2) {
        out[j++] = parseInt(hex.substr(i, 2), 16);
      }
      return output ? j - offset : out;
    };
    util.binary.base64.encode = function(input, maxline) {
      var line = "";
      var output = "";
      var chr1, chr2, chr3;
      var i = 0;
      while (i < input.byteLength) {
        chr1 = input[i++];
        chr2 = input[i++];
        chr3 = input[i++];
        line += _base64.charAt(chr1 >> 2);
        line += _base64.charAt((chr1 & 3) << 4 | chr2 >> 4);
        if (isNaN(chr2)) {
          line += "==";
        } else {
          line += _base64.charAt((chr2 & 15) << 2 | chr3 >> 6);
          line += isNaN(chr3) ? "=" : _base64.charAt(chr3 & 63);
        }
        if (maxline && line.length > maxline) {
          output += line.substr(0, maxline) + "\r\n";
          line = line.substr(maxline);
        }
      }
      output += line;
      return output;
    };
    util.binary.base64.decode = function(input, output, offset) {
      var out = output;
      if (!out) {
        out = new Uint8Array(Math.ceil(input.length / 4) * 3);
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      offset = offset || 0;
      var enc1, enc2, enc3, enc4;
      var i = 0, j = offset;
      while (i < input.length) {
        enc1 = _base64Idx[input.charCodeAt(i++) - 43];
        enc2 = _base64Idx[input.charCodeAt(i++) - 43];
        enc3 = _base64Idx[input.charCodeAt(i++) - 43];
        enc4 = _base64Idx[input.charCodeAt(i++) - 43];
        out[j++] = enc1 << 2 | enc2 >> 4;
        if (enc3 !== 64) {
          out[j++] = (enc2 & 15) << 4 | enc3 >> 2;
          if (enc4 !== 64) {
            out[j++] = (enc3 & 3) << 6 | enc4;
          }
        }
      }
      return output ? j - offset : out.subarray(0, j);
    };
    util.binary.base58.encode = function(input, maxline) {
      return util.binary.baseN.encode(input, _base58, maxline);
    };
    util.binary.base58.decode = function(input, maxline) {
      return util.binary.baseN.decode(input, _base58, maxline);
    };
    util.text = {
      utf8: {},
      utf16: {}
    };
    util.text.utf8.encode = function(str, output, offset) {
      str = util.encodeUtf8(str);
      var out = output;
      if (!out) {
        out = new Uint8Array(str.length);
      }
      offset = offset || 0;
      var j = offset;
      for (var i = 0; i < str.length; ++i) {
        out[j++] = str.charCodeAt(i);
      }
      return output ? j - offset : out;
    };
    util.text.utf8.decode = function(bytes) {
      return util.decodeUtf8(String.fromCharCode.apply(null, bytes));
    };
    util.text.utf16.encode = function(str, output, offset) {
      var out = output;
      if (!out) {
        out = new Uint8Array(str.length * 2);
      }
      var view = new Uint16Array(out.buffer);
      offset = offset || 0;
      var j = offset;
      var k = offset;
      for (var i = 0; i < str.length; ++i) {
        view[k++] = str.charCodeAt(i);
        j += 2;
      }
      return output ? j - offset : out;
    };
    util.text.utf16.decode = function(bytes) {
      return String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
    };
    util.deflate = function(api, bytes, raw) {
      bytes = util.decode64(api.deflate(util.encode64(bytes)).rval);
      if (raw) {
        var start = 2;
        var flg = bytes.charCodeAt(1);
        if (flg & 32) {
          start = 6;
        }
        bytes = bytes.substring(start, bytes.length - 4);
      }
      return bytes;
    };
    util.inflate = function(api, bytes, raw) {
      var rval = api.inflate(util.encode64(bytes)).rval;
      return rval === null ? null : util.decode64(rval);
    };
    var _setStorageObject = function(api, id, obj) {
      if (!api) {
        throw new Error("WebStorage not available.");
      }
      var rval;
      if (obj === null) {
        rval = api.removeItem(id);
      } else {
        obj = util.encode64(JSON.stringify(obj));
        rval = api.setItem(id, obj);
      }
      if (typeof rval !== "undefined" && rval.rval !== true) {
        var error = new Error(rval.error.message);
        error.id = rval.error.id;
        error.name = rval.error.name;
        throw error;
      }
    };
    var _getStorageObject = function(api, id) {
      if (!api) {
        throw new Error("WebStorage not available.");
      }
      var rval = api.getItem(id);
      if (api.init) {
        if (rval.rval === null) {
          if (rval.error) {
            var error = new Error(rval.error.message);
            error.id = rval.error.id;
            error.name = rval.error.name;
            throw error;
          }
          rval = null;
        } else {
          rval = rval.rval;
        }
      }
      if (rval !== null) {
        rval = JSON.parse(util.decode64(rval));
      }
      return rval;
    };
    var _setItem = function(api, id, key, data) {
      var obj = _getStorageObject(api, id);
      if (obj === null) {
        obj = {};
      }
      obj[key] = data;
      _setStorageObject(api, id, obj);
    };
    var _getItem = function(api, id, key) {
      var rval = _getStorageObject(api, id);
      if (rval !== null) {
        rval = key in rval ? rval[key] : null;
      }
      return rval;
    };
    var _removeItem = function(api, id, key) {
      var obj = _getStorageObject(api, id);
      if (obj !== null && key in obj) {
        delete obj[key];
        var empty2 = true;
        for (var prop in obj) {
          empty2 = false;
          break;
        }
        if (empty2) {
          obj = null;
        }
        _setStorageObject(api, id, obj);
      }
    };
    var _clearItems = function(api, id) {
      _setStorageObject(api, id, null);
    };
    var _callStorageFunction = function(func, args, location) {
      var rval = null;
      if (typeof location === "undefined") {
        location = ["web", "flash"];
      }
      var type;
      var done = false;
      var exception = null;
      for (var idx in location) {
        type = location[idx];
        try {
          if (type === "flash" || type === "both") {
            if (args[0] === null) {
              throw new Error("Flash local storage not available.");
            }
            rval = func.apply(this, args);
            done = type === "flash";
          }
          if (type === "web" || type === "both") {
            args[0] = localStorage;
            rval = func.apply(this, args);
            done = true;
          }
        } catch (ex) {
          exception = ex;
        }
        if (done) {
          break;
        }
      }
      if (!done) {
        throw exception;
      }
      return rval;
    };
    util.setItem = function(api, id, key, data, location) {
      _callStorageFunction(_setItem, arguments, location);
    };
    util.getItem = function(api, id, key, location) {
      return _callStorageFunction(_getItem, arguments, location);
    };
    util.removeItem = function(api, id, key, location) {
      _callStorageFunction(_removeItem, arguments, location);
    };
    util.clearItems = function(api, id, location) {
      _callStorageFunction(_clearItems, arguments, location);
    };
    util.isEmpty = function(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    };
    util.format = function(format) {
      var re = /%./g;
      var match;
      var part;
      var argi = 0;
      var parts = [];
      var last = 0;
      while (match = re.exec(format)) {
        part = format.substring(last, re.lastIndex - 2);
        if (part.length > 0) {
          parts.push(part);
        }
        last = re.lastIndex;
        var code2 = match[0][1];
        switch (code2) {
          case "s":
          case "o":
            if (argi < arguments.length) {
              parts.push(arguments[argi++ + 1]);
            } else {
              parts.push("<?>");
            }
            break;
          case "%":
            parts.push("%");
            break;
          default:
            parts.push("<%" + code2 + "?>");
        }
      }
      parts.push(format.substring(last));
      return parts.join("");
    };
    util.formatNumber = function(number, decimals, dec_point, thousands_sep) {
      var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
      var d = dec_point === void 0 ? "," : dec_point;
      var t = thousands_sep === void 0 ? "." : thousands_sep, s = n < 0 ? "-" : "";
      var i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
      var j = i.length > 3 ? i.length % 3 : 0;
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    util.formatSize = function(size) {
      if (size >= 1073741824) {
        size = util.formatNumber(size / 1073741824, 2, ".", "") + " GiB";
      } else if (size >= 1048576) {
        size = util.formatNumber(size / 1048576, 2, ".", "") + " MiB";
      } else if (size >= 1024) {
        size = util.formatNumber(size / 1024, 0) + " KiB";
      } else {
        size = util.formatNumber(size, 0) + " bytes";
      }
      return size;
    };
    util.bytesFromIP = function(ip) {
      if (ip.indexOf(".") !== -1) {
        return util.bytesFromIPv4(ip);
      }
      if (ip.indexOf(":") !== -1) {
        return util.bytesFromIPv6(ip);
      }
      return null;
    };
    util.bytesFromIPv4 = function(ip) {
      ip = ip.split(".");
      if (ip.length !== 4) {
        return null;
      }
      var b = util.createBuffer();
      for (var i = 0; i < ip.length; ++i) {
        var num = parseInt(ip[i], 10);
        if (isNaN(num)) {
          return null;
        }
        b.putByte(num);
      }
      return b.getBytes();
    };
    util.bytesFromIPv6 = function(ip) {
      var blanks = 0;
      ip = ip.split(":").filter(function(e) {
        if (e.length === 0)
          ++blanks;
        return true;
      });
      var zeros = (8 - ip.length + blanks) * 2;
      var b = util.createBuffer();
      for (var i = 0; i < 8; ++i) {
        if (!ip[i] || ip[i].length === 0) {
          b.fillWithByte(0, zeros);
          zeros = 0;
          continue;
        }
        var bytes = util.hexToBytes(ip[i]);
        if (bytes.length < 2) {
          b.putByte(0);
        }
        b.putBytes(bytes);
      }
      return b.getBytes();
    };
    util.bytesToIP = function(bytes) {
      if (bytes.length === 4) {
        return util.bytesToIPv4(bytes);
      }
      if (bytes.length === 16) {
        return util.bytesToIPv6(bytes);
      }
      return null;
    };
    util.bytesToIPv4 = function(bytes) {
      if (bytes.length !== 4) {
        return null;
      }
      var ip = [];
      for (var i = 0; i < bytes.length; ++i) {
        ip.push(bytes.charCodeAt(i));
      }
      return ip.join(".");
    };
    util.bytesToIPv6 = function(bytes) {
      if (bytes.length !== 16) {
        return null;
      }
      var ip = [];
      var zeroGroups = [];
      var zeroMaxGroup = 0;
      for (var i = 0; i < bytes.length; i += 2) {
        var hex = util.bytesToHex(bytes[i] + bytes[i + 1]);
        while (hex[0] === "0" && hex !== "0") {
          hex = hex.substr(1);
        }
        if (hex === "0") {
          var last = zeroGroups[zeroGroups.length - 1];
          var idx = ip.length;
          if (!last || idx !== last.end + 1) {
            zeroGroups.push({ start: idx, end: idx });
          } else {
            last.end = idx;
            if (last.end - last.start > zeroGroups[zeroMaxGroup].end - zeroGroups[zeroMaxGroup].start) {
              zeroMaxGroup = zeroGroups.length - 1;
            }
          }
        }
        ip.push(hex);
      }
      if (zeroGroups.length > 0) {
        var group = zeroGroups[zeroMaxGroup];
        if (group.end - group.start > 0) {
          ip.splice(group.start, group.end - group.start + 1, "");
          if (group.start === 0) {
            ip.unshift("");
          }
          if (group.end === 7) {
            ip.push("");
          }
        }
      }
      return ip.join(":");
    };
    util.estimateCores = function(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = options || {};
      if ("cores" in util && !options.update) {
        return callback(null, util.cores);
      }
      if (typeof navigator !== "undefined" && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0) {
        util.cores = navigator.hardwareConcurrency;
        return callback(null, util.cores);
      }
      if (typeof Worker === "undefined") {
        util.cores = 1;
        return callback(null, util.cores);
      }
      if (typeof Blob === "undefined") {
        util.cores = 2;
        return callback(null, util.cores);
      }
      var blobUrl = URL.createObjectURL(new Blob([
        "(",
        function() {
          self.addEventListener("message", function(e) {
            var st = Date.now();
            var et = st + 4;
            while (Date.now() < et)
              ;
            self.postMessage({ st, et });
          });
        }.toString(),
        ")()"
      ], { type: "application/javascript" }));
      sample([], 5, 16);
      function sample(max, samples, numWorkers) {
        if (samples === 0) {
          var avg = Math.floor(max.reduce(function(avg2, x) {
            return avg2 + x;
          }, 0) / max.length);
          util.cores = Math.max(1, avg);
          URL.revokeObjectURL(blobUrl);
          return callback(null, util.cores);
        }
        map2(numWorkers, function(err, results) {
          max.push(reduce(numWorkers, results));
          sample(max, samples - 1, numWorkers);
        });
      }
      function map2(numWorkers, callback2) {
        var workers = [];
        var results = [];
        for (var i = 0; i < numWorkers; ++i) {
          var worker = new Worker(blobUrl);
          worker.addEventListener("message", function(e) {
            results.push(e.data);
            if (results.length === numWorkers) {
              for (var i2 = 0; i2 < numWorkers; ++i2) {
                workers[i2].terminate();
              }
              callback2(null, results);
            }
          });
          workers.push(worker);
        }
        for (var i = 0; i < numWorkers; ++i) {
          workers[i].postMessage(i);
        }
      }
      function reduce(numWorkers, results) {
        var overlaps = [];
        for (var n = 0; n < numWorkers; ++n) {
          var r1 = results[n];
          var overlap = overlaps[n] = [];
          for (var i = 0; i < numWorkers; ++i) {
            if (n === i) {
              continue;
            }
            var r2 = results[i];
            if (r1.st > r2.st && r1.st < r2.et || r2.st > r1.st && r2.st < r1.et) {
              overlap.push(i);
            }
          }
        }
        return overlaps.reduce(function(max, overlap2) {
          return Math.max(max, overlap2.length);
        }, 0);
      }
    };
  }
});

// node_modules/node-forge/lib/oids.js
var require_oids = __commonJS({
  "node_modules/node-forge/lib/oids.js"(exports2, module2) {
    var forge5 = require_forge();
    forge5.pki = forge5.pki || {};
    var oids = module2.exports = forge5.pki.oids = forge5.oids = forge5.oids || {};
    function _IN(id, name2) {
      oids[id] = name2;
      oids[name2] = id;
    }
    function _I_(id, name2) {
      oids[id] = name2;
    }
    _IN("1.2.840.113549.1.1.1", "rsaEncryption");
    _IN("1.2.840.113549.1.1.4", "md5WithRSAEncryption");
    _IN("1.2.840.113549.1.1.5", "sha1WithRSAEncryption");
    _IN("1.2.840.113549.1.1.7", "RSAES-OAEP");
    _IN("1.2.840.113549.1.1.8", "mgf1");
    _IN("1.2.840.113549.1.1.9", "pSpecified");
    _IN("1.2.840.113549.1.1.10", "RSASSA-PSS");
    _IN("1.2.840.113549.1.1.11", "sha256WithRSAEncryption");
    _IN("1.2.840.113549.1.1.12", "sha384WithRSAEncryption");
    _IN("1.2.840.113549.1.1.13", "sha512WithRSAEncryption");
    _IN("1.3.101.112", "EdDSA25519");
    _IN("1.2.840.10040.4.3", "dsa-with-sha1");
    _IN("1.3.14.3.2.7", "desCBC");
    _IN("1.3.14.3.2.26", "sha1");
    _IN("1.3.14.3.2.29", "sha1WithRSASignature");
    _IN("2.16.840.1.101.3.4.2.1", "sha256");
    _IN("2.16.840.1.101.3.4.2.2", "sha384");
    _IN("2.16.840.1.101.3.4.2.3", "sha512");
    _IN("2.16.840.1.101.3.4.2.4", "sha224");
    _IN("2.16.840.1.101.3.4.2.5", "sha512-224");
    _IN("2.16.840.1.101.3.4.2.6", "sha512-256");
    _IN("1.2.840.113549.2.2", "md2");
    _IN("1.2.840.113549.2.5", "md5");
    _IN("1.2.840.113549.1.7.1", "data");
    _IN("1.2.840.113549.1.7.2", "signedData");
    _IN("1.2.840.113549.1.7.3", "envelopedData");
    _IN("1.2.840.113549.1.7.4", "signedAndEnvelopedData");
    _IN("1.2.840.113549.1.7.5", "digestedData");
    _IN("1.2.840.113549.1.7.6", "encryptedData");
    _IN("1.2.840.113549.1.9.1", "emailAddress");
    _IN("1.2.840.113549.1.9.2", "unstructuredName");
    _IN("1.2.840.113549.1.9.3", "contentType");
    _IN("1.2.840.113549.1.9.4", "messageDigest");
    _IN("1.2.840.113549.1.9.5", "signingTime");
    _IN("1.2.840.113549.1.9.6", "counterSignature");
    _IN("1.2.840.113549.1.9.7", "challengePassword");
    _IN("1.2.840.113549.1.9.8", "unstructuredAddress");
    _IN("1.2.840.113549.1.9.14", "extensionRequest");
    _IN("1.2.840.113549.1.9.20", "friendlyName");
    _IN("1.2.840.113549.1.9.21", "localKeyId");
    _IN("1.2.840.113549.1.9.22.1", "x509Certificate");
    _IN("1.2.840.113549.1.12.10.1.1", "keyBag");
    _IN("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag");
    _IN("1.2.840.113549.1.12.10.1.3", "certBag");
    _IN("1.2.840.113549.1.12.10.1.4", "crlBag");
    _IN("1.2.840.113549.1.12.10.1.5", "secretBag");
    _IN("1.2.840.113549.1.12.10.1.6", "safeContentsBag");
    _IN("1.2.840.113549.1.5.13", "pkcs5PBES2");
    _IN("1.2.840.113549.1.5.12", "pkcs5PBKDF2");
    _IN("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4");
    _IN("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4");
    _IN("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC");
    _IN("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC");
    _IN("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC");
    _IN("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC");
    _IN("1.2.840.113549.2.7", "hmacWithSHA1");
    _IN("1.2.840.113549.2.8", "hmacWithSHA224");
    _IN("1.2.840.113549.2.9", "hmacWithSHA256");
    _IN("1.2.840.113549.2.10", "hmacWithSHA384");
    _IN("1.2.840.113549.2.11", "hmacWithSHA512");
    _IN("1.2.840.113549.3.7", "des-EDE3-CBC");
    _IN("2.16.840.1.101.3.4.1.2", "aes128-CBC");
    _IN("2.16.840.1.101.3.4.1.22", "aes192-CBC");
    _IN("2.16.840.1.101.3.4.1.42", "aes256-CBC");
    _IN("2.5.4.3", "commonName");
    _IN("2.5.4.4", "surname");
    _IN("2.5.4.5", "serialNumber");
    _IN("2.5.4.6", "countryName");
    _IN("2.5.4.7", "localityName");
    _IN("2.5.4.8", "stateOrProvinceName");
    _IN("2.5.4.9", "streetAddress");
    _IN("2.5.4.10", "organizationName");
    _IN("2.5.4.11", "organizationalUnitName");
    _IN("2.5.4.12", "title");
    _IN("2.5.4.13", "description");
    _IN("2.5.4.15", "businessCategory");
    _IN("2.5.4.17", "postalCode");
    _IN("2.5.4.42", "givenName");
    _IN("1.3.6.1.4.1.311.60.2.1.2", "jurisdictionOfIncorporationStateOrProvinceName");
    _IN("1.3.6.1.4.1.311.60.2.1.3", "jurisdictionOfIncorporationCountryName");
    _IN("2.16.840.1.113730.1.1", "nsCertType");
    _IN("2.16.840.1.113730.1.13", "nsComment");
    _I_("2.5.29.1", "authorityKeyIdentifier");
    _I_("2.5.29.2", "keyAttributes");
    _I_("2.5.29.3", "certificatePolicies");
    _I_("2.5.29.4", "keyUsageRestriction");
    _I_("2.5.29.5", "policyMapping");
    _I_("2.5.29.6", "subtreesConstraint");
    _I_("2.5.29.7", "subjectAltName");
    _I_("2.5.29.8", "issuerAltName");
    _I_("2.5.29.9", "subjectDirectoryAttributes");
    _I_("2.5.29.10", "basicConstraints");
    _I_("2.5.29.11", "nameConstraints");
    _I_("2.5.29.12", "policyConstraints");
    _I_("2.5.29.13", "basicConstraints");
    _IN("2.5.29.14", "subjectKeyIdentifier");
    _IN("2.5.29.15", "keyUsage");
    _I_("2.5.29.16", "privateKeyUsagePeriod");
    _IN("2.5.29.17", "subjectAltName");
    _IN("2.5.29.18", "issuerAltName");
    _IN("2.5.29.19", "basicConstraints");
    _I_("2.5.29.20", "cRLNumber");
    _I_("2.5.29.21", "cRLReason");
    _I_("2.5.29.22", "expirationDate");
    _I_("2.5.29.23", "instructionCode");
    _I_("2.5.29.24", "invalidityDate");
    _I_("2.5.29.25", "cRLDistributionPoints");
    _I_("2.5.29.26", "issuingDistributionPoint");
    _I_("2.5.29.27", "deltaCRLIndicator");
    _I_("2.5.29.28", "issuingDistributionPoint");
    _I_("2.5.29.29", "certificateIssuer");
    _I_("2.5.29.30", "nameConstraints");
    _IN("2.5.29.31", "cRLDistributionPoints");
    _IN("2.5.29.32", "certificatePolicies");
    _I_("2.5.29.33", "policyMappings");
    _I_("2.5.29.34", "policyConstraints");
    _IN("2.5.29.35", "authorityKeyIdentifier");
    _I_("2.5.29.36", "policyConstraints");
    _IN("2.5.29.37", "extKeyUsage");
    _I_("2.5.29.46", "freshestCRL");
    _I_("2.5.29.54", "inhibitAnyPolicy");
    _IN("1.3.6.1.4.1.11129.2.4.2", "timestampList");
    _IN("1.3.6.1.5.5.7.1.1", "authorityInfoAccess");
    _IN("1.3.6.1.5.5.7.3.1", "serverAuth");
    _IN("1.3.6.1.5.5.7.3.2", "clientAuth");
    _IN("1.3.6.1.5.5.7.3.3", "codeSigning");
    _IN("1.3.6.1.5.5.7.3.4", "emailProtection");
    _IN("1.3.6.1.5.5.7.3.8", "timeStamping");
  }
});

// node_modules/node-forge/lib/asn1.js
var require_asn1 = __commonJS({
  "node_modules/node-forge/lib/asn1.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    require_oids();
    var asn1 = module2.exports = forge5.asn1 = forge5.asn1 || {};
    asn1.Class = {
      UNIVERSAL: 0,
      APPLICATION: 64,
      CONTEXT_SPECIFIC: 128,
      PRIVATE: 192
    };
    asn1.Type = {
      NONE: 0,
      BOOLEAN: 1,
      INTEGER: 2,
      BITSTRING: 3,
      OCTETSTRING: 4,
      NULL: 5,
      OID: 6,
      ODESC: 7,
      EXTERNAL: 8,
      REAL: 9,
      ENUMERATED: 10,
      EMBEDDED: 11,
      UTF8: 12,
      ROID: 13,
      SEQUENCE: 16,
      SET: 17,
      PRINTABLESTRING: 19,
      IA5STRING: 22,
      UTCTIME: 23,
      GENERALIZEDTIME: 24,
      BMPSTRING: 30
    };
    asn1.create = function(tagClass, type, constructed, value, options) {
      if (forge5.util.isArray(value)) {
        var tmp = [];
        for (var i = 0; i < value.length; ++i) {
          if (value[i] !== void 0) {
            tmp.push(value[i]);
          }
        }
        value = tmp;
      }
      var obj = {
        tagClass,
        type,
        constructed,
        composed: constructed || forge5.util.isArray(value),
        value
      };
      if (options && "bitStringContents" in options) {
        obj.bitStringContents = options.bitStringContents;
        obj.original = asn1.copy(obj);
      }
      return obj;
    };
    asn1.copy = function(obj, options) {
      var copy;
      if (forge5.util.isArray(obj)) {
        copy = [];
        for (var i = 0; i < obj.length; ++i) {
          copy.push(asn1.copy(obj[i], options));
        }
        return copy;
      }
      if (typeof obj === "string") {
        return obj;
      }
      copy = {
        tagClass: obj.tagClass,
        type: obj.type,
        constructed: obj.constructed,
        composed: obj.composed,
        value: asn1.copy(obj.value, options)
      };
      if (options && !options.excludeBitStringContents) {
        copy.bitStringContents = obj.bitStringContents;
      }
      return copy;
    };
    asn1.equals = function(obj1, obj2, options) {
      if (forge5.util.isArray(obj1)) {
        if (!forge5.util.isArray(obj2)) {
          return false;
        }
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (var i = 0; i < obj1.length; ++i) {
          if (!asn1.equals(obj1[i], obj2[i])) {
            return false;
          }
        }
        return true;
      }
      if (typeof obj1 !== typeof obj2) {
        return false;
      }
      if (typeof obj1 === "string") {
        return obj1 === obj2;
      }
      var equal = obj1.tagClass === obj2.tagClass && obj1.type === obj2.type && obj1.constructed === obj2.constructed && obj1.composed === obj2.composed && asn1.equals(obj1.value, obj2.value);
      if (options && options.includeBitStringContents) {
        equal = equal && obj1.bitStringContents === obj2.bitStringContents;
      }
      return equal;
    };
    asn1.getBerValueLength = function(b) {
      var b2 = b.getByte();
      if (b2 === 128) {
        return void 0;
      }
      var length2;
      var longForm = b2 & 128;
      if (!longForm) {
        length2 = b2;
      } else {
        length2 = b.getInt((b2 & 127) << 3);
      }
      return length2;
    };
    function _checkBufferLength(bytes, remaining, n) {
      if (n > remaining) {
        var error = new Error("Too few bytes to parse DER.");
        error.available = bytes.length();
        error.remaining = remaining;
        error.requested = n;
        throw error;
      }
    }
    var _getValueLength = function(bytes, remaining) {
      var b2 = bytes.getByte();
      remaining--;
      if (b2 === 128) {
        return void 0;
      }
      var length2;
      var longForm = b2 & 128;
      if (!longForm) {
        length2 = b2;
      } else {
        var longFormBytes = b2 & 127;
        _checkBufferLength(bytes, remaining, longFormBytes);
        length2 = bytes.getInt(longFormBytes << 3);
      }
      if (length2 < 0) {
        throw new Error("Negative length: " + length2);
      }
      return length2;
    };
    asn1.fromDer = function(bytes, options) {
      if (options === void 0) {
        options = {
          strict: true,
          parseAllBytes: true,
          decodeBitStrings: true
        };
      }
      if (typeof options === "boolean") {
        options = {
          strict: options,
          parseAllBytes: true,
          decodeBitStrings: true
        };
      }
      if (!("strict" in options)) {
        options.strict = true;
      }
      if (!("parseAllBytes" in options)) {
        options.parseAllBytes = true;
      }
      if (!("decodeBitStrings" in options)) {
        options.decodeBitStrings = true;
      }
      if (typeof bytes === "string") {
        bytes = forge5.util.createBuffer(bytes);
      }
      var byteCount = bytes.length();
      var value = _fromDer(bytes, bytes.length(), 0, options);
      if (options.parseAllBytes && bytes.length() !== 0) {
        var error = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
        error.byteCount = byteCount;
        error.remaining = bytes.length();
        throw error;
      }
      return value;
    };
    function _fromDer(bytes, remaining, depth, options) {
      var start;
      _checkBufferLength(bytes, remaining, 2);
      var b1 = bytes.getByte();
      remaining--;
      var tagClass = b1 & 192;
      var type = b1 & 31;
      start = bytes.length();
      var length2 = _getValueLength(bytes, remaining);
      remaining -= start - bytes.length();
      if (length2 !== void 0 && length2 > remaining) {
        if (options.strict) {
          var error = new Error("Too few bytes to read ASN.1 value.");
          error.available = bytes.length();
          error.remaining = remaining;
          error.requested = length2;
          throw error;
        }
        length2 = remaining;
      }
      var value;
      var bitStringContents;
      var constructed = (b1 & 32) === 32;
      if (constructed) {
        value = [];
        if (length2 === void 0) {
          for (; ; ) {
            _checkBufferLength(bytes, remaining, 2);
            if (bytes.bytes(2) === String.fromCharCode(0, 0)) {
              bytes.getBytes(2);
              remaining -= 2;
              break;
            }
            start = bytes.length();
            value.push(_fromDer(bytes, remaining, depth + 1, options));
            remaining -= start - bytes.length();
          }
        } else {
          while (length2 > 0) {
            start = bytes.length();
            value.push(_fromDer(bytes, length2, depth + 1, options));
            remaining -= start - bytes.length();
            length2 -= start - bytes.length();
          }
        }
      }
      if (value === void 0 && tagClass === asn1.Class.UNIVERSAL && type === asn1.Type.BITSTRING) {
        bitStringContents = bytes.bytes(length2);
      }
      if (value === void 0 && options.decodeBitStrings && tagClass === asn1.Class.UNIVERSAL && type === asn1.Type.BITSTRING && length2 > 1) {
        var savedRead = bytes.read;
        var savedRemaining = remaining;
        var unused = 0;
        if (type === asn1.Type.BITSTRING) {
          _checkBufferLength(bytes, remaining, 1);
          unused = bytes.getByte();
          remaining--;
        }
        if (unused === 0) {
          try {
            start = bytes.length();
            var subOptions = {
              strict: true,
              decodeBitStrings: true
            };
            var composed = _fromDer(bytes, remaining, depth + 1, subOptions);
            var used = start - bytes.length();
            remaining -= used;
            if (type == asn1.Type.BITSTRING) {
              used++;
            }
            var tc = composed.tagClass;
            if (used === length2 && (tc === asn1.Class.UNIVERSAL || tc === asn1.Class.CONTEXT_SPECIFIC)) {
              value = [composed];
            }
          } catch (ex) {
          }
        }
        if (value === void 0) {
          bytes.read = savedRead;
          remaining = savedRemaining;
        }
      }
      if (value === void 0) {
        if (length2 === void 0) {
          if (options.strict) {
            throw new Error("Non-constructed ASN.1 object of indefinite length.");
          }
          length2 = remaining;
        }
        if (type === asn1.Type.BMPSTRING) {
          value = "";
          for (; length2 > 0; length2 -= 2) {
            _checkBufferLength(bytes, remaining, 2);
            value += String.fromCharCode(bytes.getInt16());
            remaining -= 2;
          }
        } else {
          value = bytes.getBytes(length2);
          remaining -= length2;
        }
      }
      var asn1Options = bitStringContents === void 0 ? null : {
        bitStringContents
      };
      return asn1.create(tagClass, type, constructed, value, asn1Options);
    }
    asn1.toDer = function(obj) {
      var bytes = forge5.util.createBuffer();
      var b1 = obj.tagClass | obj.type;
      var value = forge5.util.createBuffer();
      var useBitStringContents = false;
      if ("bitStringContents" in obj) {
        useBitStringContents = true;
        if (obj.original) {
          useBitStringContents = asn1.equals(obj, obj.original);
        }
      }
      if (useBitStringContents) {
        value.putBytes(obj.bitStringContents);
      } else if (obj.composed) {
        if (obj.constructed) {
          b1 |= 32;
        } else {
          value.putByte(0);
        }
        for (var i = 0; i < obj.value.length; ++i) {
          if (obj.value[i] !== void 0) {
            value.putBuffer(asn1.toDer(obj.value[i]));
          }
        }
      } else {
        if (obj.type === asn1.Type.BMPSTRING) {
          for (var i = 0; i < obj.value.length; ++i) {
            value.putInt16(obj.value.charCodeAt(i));
          }
        } else {
          if (obj.type === asn1.Type.INTEGER && obj.value.length > 1 && (obj.value.charCodeAt(0) === 0 && (obj.value.charCodeAt(1) & 128) === 0 || obj.value.charCodeAt(0) === 255 && (obj.value.charCodeAt(1) & 128) === 128)) {
            value.putBytes(obj.value.substr(1));
          } else {
            value.putBytes(obj.value);
          }
        }
      }
      bytes.putByte(b1);
      if (value.length() <= 127) {
        bytes.putByte(value.length() & 127);
      } else {
        var len = value.length();
        var lenBytes = "";
        do {
          lenBytes += String.fromCharCode(len & 255);
          len = len >>> 8;
        } while (len > 0);
        bytes.putByte(lenBytes.length | 128);
        for (var i = lenBytes.length - 1; i >= 0; --i) {
          bytes.putByte(lenBytes.charCodeAt(i));
        }
      }
      bytes.putBuffer(value);
      return bytes;
    };
    asn1.oidToDer = function(oid) {
      var values = oid.split(".");
      var bytes = forge5.util.createBuffer();
      bytes.putByte(40 * parseInt(values[0], 10) + parseInt(values[1], 10));
      var last, valueBytes, value, b;
      for (var i = 2; i < values.length; ++i) {
        last = true;
        valueBytes = [];
        value = parseInt(values[i], 10);
        do {
          b = value & 127;
          value = value >>> 7;
          if (!last) {
            b |= 128;
          }
          valueBytes.push(b);
          last = false;
        } while (value > 0);
        for (var n = valueBytes.length - 1; n >= 0; --n) {
          bytes.putByte(valueBytes[n]);
        }
      }
      return bytes;
    };
    asn1.derToOid = function(bytes) {
      var oid;
      if (typeof bytes === "string") {
        bytes = forge5.util.createBuffer(bytes);
      }
      var b = bytes.getByte();
      oid = Math.floor(b / 40) + "." + b % 40;
      var value = 0;
      while (bytes.length() > 0) {
        b = bytes.getByte();
        value = value << 7;
        if (b & 128) {
          value += b & 127;
        } else {
          oid += "." + (value + b);
          value = 0;
        }
      }
      return oid;
    };
    asn1.utcTimeToDate = function(utc) {
      var date = new Date();
      var year = parseInt(utc.substr(0, 2), 10);
      year = year >= 50 ? 1900 + year : 2e3 + year;
      var MM = parseInt(utc.substr(2, 2), 10) - 1;
      var DD = parseInt(utc.substr(4, 2), 10);
      var hh = parseInt(utc.substr(6, 2), 10);
      var mm = parseInt(utc.substr(8, 2), 10);
      var ss = 0;
      if (utc.length > 11) {
        var c = utc.charAt(10);
        var end = 10;
        if (c !== "+" && c !== "-") {
          ss = parseInt(utc.substr(10, 2), 10);
          end += 2;
        }
      }
      date.setUTCFullYear(year, MM, DD);
      date.setUTCHours(hh, mm, ss, 0);
      if (end) {
        c = utc.charAt(end);
        if (c === "+" || c === "-") {
          var hhoffset = parseInt(utc.substr(end + 1, 2), 10);
          var mmoffset = parseInt(utc.substr(end + 4, 2), 10);
          var offset = hhoffset * 60 + mmoffset;
          offset *= 6e4;
          if (c === "+") {
            date.setTime(+date - offset);
          } else {
            date.setTime(+date + offset);
          }
        }
      }
      return date;
    };
    asn1.generalizedTimeToDate = function(gentime) {
      var date = new Date();
      var YYYY = parseInt(gentime.substr(0, 4), 10);
      var MM = parseInt(gentime.substr(4, 2), 10) - 1;
      var DD = parseInt(gentime.substr(6, 2), 10);
      var hh = parseInt(gentime.substr(8, 2), 10);
      var mm = parseInt(gentime.substr(10, 2), 10);
      var ss = parseInt(gentime.substr(12, 2), 10);
      var fff = 0;
      var offset = 0;
      var isUTC = false;
      if (gentime.charAt(gentime.length - 1) === "Z") {
        isUTC = true;
      }
      var end = gentime.length - 5, c = gentime.charAt(end);
      if (c === "+" || c === "-") {
        var hhoffset = parseInt(gentime.substr(end + 1, 2), 10);
        var mmoffset = parseInt(gentime.substr(end + 4, 2), 10);
        offset = hhoffset * 60 + mmoffset;
        offset *= 6e4;
        if (c === "+") {
          offset *= -1;
        }
        isUTC = true;
      }
      if (gentime.charAt(14) === ".") {
        fff = parseFloat(gentime.substr(14), 10) * 1e3;
      }
      if (isUTC) {
        date.setUTCFullYear(YYYY, MM, DD);
        date.setUTCHours(hh, mm, ss, fff);
        date.setTime(+date + offset);
      } else {
        date.setFullYear(YYYY, MM, DD);
        date.setHours(hh, mm, ss, fff);
      }
      return date;
    };
    asn1.dateToUtcTime = function(date) {
      if (typeof date === "string") {
        return date;
      }
      var rval = "";
      var format = [];
      format.push(("" + date.getUTCFullYear()).substr(2));
      format.push("" + (date.getUTCMonth() + 1));
      format.push("" + date.getUTCDate());
      format.push("" + date.getUTCHours());
      format.push("" + date.getUTCMinutes());
      format.push("" + date.getUTCSeconds());
      for (var i = 0; i < format.length; ++i) {
        if (format[i].length < 2) {
          rval += "0";
        }
        rval += format[i];
      }
      rval += "Z";
      return rval;
    };
    asn1.dateToGeneralizedTime = function(date) {
      if (typeof date === "string") {
        return date;
      }
      var rval = "";
      var format = [];
      format.push("" + date.getUTCFullYear());
      format.push("" + (date.getUTCMonth() + 1));
      format.push("" + date.getUTCDate());
      format.push("" + date.getUTCHours());
      format.push("" + date.getUTCMinutes());
      format.push("" + date.getUTCSeconds());
      for (var i = 0; i < format.length; ++i) {
        if (format[i].length < 2) {
          rval += "0";
        }
        rval += format[i];
      }
      rval += "Z";
      return rval;
    };
    asn1.integerToDer = function(x) {
      var rval = forge5.util.createBuffer();
      if (x >= -128 && x < 128) {
        return rval.putSignedInt(x, 8);
      }
      if (x >= -32768 && x < 32768) {
        return rval.putSignedInt(x, 16);
      }
      if (x >= -8388608 && x < 8388608) {
        return rval.putSignedInt(x, 24);
      }
      if (x >= -2147483648 && x < 2147483648) {
        return rval.putSignedInt(x, 32);
      }
      var error = new Error("Integer too large; max is 32-bits.");
      error.integer = x;
      throw error;
    };
    asn1.derToInteger = function(bytes) {
      if (typeof bytes === "string") {
        bytes = forge5.util.createBuffer(bytes);
      }
      var n = bytes.length() * 8;
      if (n > 32) {
        throw new Error("Integer too large; max is 32-bits.");
      }
      return bytes.getSignedInt(n);
    };
    asn1.validate = function(obj, v, capture, errors) {
      var rval = false;
      if ((obj.tagClass === v.tagClass || typeof v.tagClass === "undefined") && (obj.type === v.type || typeof v.type === "undefined")) {
        if (obj.constructed === v.constructed || typeof v.constructed === "undefined") {
          rval = true;
          if (v.value && forge5.util.isArray(v.value)) {
            var j = 0;
            for (var i = 0; rval && i < v.value.length; ++i) {
              rval = v.value[i].optional || false;
              if (obj.value[j]) {
                rval = asn1.validate(obj.value[j], v.value[i], capture, errors);
                if (rval) {
                  ++j;
                } else if (v.value[i].optional) {
                  rval = true;
                }
              }
              if (!rval && errors) {
                errors.push(
                  "[" + v.name + '] Tag class "' + v.tagClass + '", type "' + v.type + '" expected value length "' + v.value.length + '", got "' + obj.value.length + '"'
                );
              }
            }
          }
          if (rval && capture) {
            if (v.capture) {
              capture[v.capture] = obj.value;
            }
            if (v.captureAsn1) {
              capture[v.captureAsn1] = obj;
            }
            if (v.captureBitStringContents && "bitStringContents" in obj) {
              capture[v.captureBitStringContents] = obj.bitStringContents;
            }
            if (v.captureBitStringValue && "bitStringContents" in obj) {
              var value;
              if (obj.bitStringContents.length < 2) {
                capture[v.captureBitStringValue] = "";
              } else {
                var unused = obj.bitStringContents.charCodeAt(0);
                if (unused !== 0) {
                  throw new Error(
                    "captureBitStringValue only supported for zero unused bits"
                  );
                }
                capture[v.captureBitStringValue] = obj.bitStringContents.slice(1);
              }
            }
          }
        } else if (errors) {
          errors.push(
            "[" + v.name + '] Expected constructed "' + v.constructed + '", got "' + obj.constructed + '"'
          );
        }
      } else if (errors) {
        if (obj.tagClass !== v.tagClass) {
          errors.push(
            "[" + v.name + '] Expected tag class "' + v.tagClass + '", got "' + obj.tagClass + '"'
          );
        }
        if (obj.type !== v.type) {
          errors.push(
            "[" + v.name + '] Expected type "' + v.type + '", got "' + obj.type + '"'
          );
        }
      }
      return rval;
    };
    var _nonLatinRegex = /[^\\u0000-\\u00ff]/;
    asn1.prettyPrint = function(obj, level, indentation) {
      var rval = "";
      level = level || 0;
      indentation = indentation || 2;
      if (level > 0) {
        rval += "\n";
      }
      var indent = "";
      for (var i = 0; i < level * indentation; ++i) {
        indent += " ";
      }
      rval += indent + "Tag: ";
      switch (obj.tagClass) {
        case asn1.Class.UNIVERSAL:
          rval += "Universal:";
          break;
        case asn1.Class.APPLICATION:
          rval += "Application:";
          break;
        case asn1.Class.CONTEXT_SPECIFIC:
          rval += "Context-Specific:";
          break;
        case asn1.Class.PRIVATE:
          rval += "Private:";
          break;
      }
      if (obj.tagClass === asn1.Class.UNIVERSAL) {
        rval += obj.type;
        switch (obj.type) {
          case asn1.Type.NONE:
            rval += " (None)";
            break;
          case asn1.Type.BOOLEAN:
            rval += " (Boolean)";
            break;
          case asn1.Type.INTEGER:
            rval += " (Integer)";
            break;
          case asn1.Type.BITSTRING:
            rval += " (Bit string)";
            break;
          case asn1.Type.OCTETSTRING:
            rval += " (Octet string)";
            break;
          case asn1.Type.NULL:
            rval += " (Null)";
            break;
          case asn1.Type.OID:
            rval += " (Object Identifier)";
            break;
          case asn1.Type.ODESC:
            rval += " (Object Descriptor)";
            break;
          case asn1.Type.EXTERNAL:
            rval += " (External or Instance of)";
            break;
          case asn1.Type.REAL:
            rval += " (Real)";
            break;
          case asn1.Type.ENUMERATED:
            rval += " (Enumerated)";
            break;
          case asn1.Type.EMBEDDED:
            rval += " (Embedded PDV)";
            break;
          case asn1.Type.UTF8:
            rval += " (UTF8)";
            break;
          case asn1.Type.ROID:
            rval += " (Relative Object Identifier)";
            break;
          case asn1.Type.SEQUENCE:
            rval += " (Sequence)";
            break;
          case asn1.Type.SET:
            rval += " (Set)";
            break;
          case asn1.Type.PRINTABLESTRING:
            rval += " (Printable String)";
            break;
          case asn1.Type.IA5String:
            rval += " (IA5String (ASCII))";
            break;
          case asn1.Type.UTCTIME:
            rval += " (UTC time)";
            break;
          case asn1.Type.GENERALIZEDTIME:
            rval += " (Generalized time)";
            break;
          case asn1.Type.BMPSTRING:
            rval += " (BMP String)";
            break;
        }
      } else {
        rval += obj.type;
      }
      rval += "\n";
      rval += indent + "Constructed: " + obj.constructed + "\n";
      if (obj.composed) {
        var subvalues = 0;
        var sub = "";
        for (var i = 0; i < obj.value.length; ++i) {
          if (obj.value[i] !== void 0) {
            subvalues += 1;
            sub += asn1.prettyPrint(obj.value[i], level + 1, indentation);
            if (i + 1 < obj.value.length) {
              sub += ",";
            }
          }
        }
        rval += indent + "Sub values: " + subvalues + sub;
      } else {
        rval += indent + "Value: ";
        if (obj.type === asn1.Type.OID) {
          var oid = asn1.derToOid(obj.value);
          rval += oid;
          if (forge5.pki && forge5.pki.oids) {
            if (oid in forge5.pki.oids) {
              rval += " (" + forge5.pki.oids[oid] + ") ";
            }
          }
        }
        if (obj.type === asn1.Type.INTEGER) {
          try {
            rval += asn1.derToInteger(obj.value);
          } catch (ex) {
            rval += "0x" + forge5.util.bytesToHex(obj.value);
          }
        } else if (obj.type === asn1.Type.BITSTRING) {
          if (obj.value.length > 1) {
            rval += "0x" + forge5.util.bytesToHex(obj.value.slice(1));
          } else {
            rval += "(none)";
          }
          if (obj.value.length > 0) {
            var unused = obj.value.charCodeAt(0);
            if (unused == 1) {
              rval += " (1 unused bit shown)";
            } else if (unused > 1) {
              rval += " (" + unused + " unused bits shown)";
            }
          }
        } else if (obj.type === asn1.Type.OCTETSTRING) {
          if (!_nonLatinRegex.test(obj.value)) {
            rval += "(" + obj.value + ") ";
          }
          rval += "0x" + forge5.util.bytesToHex(obj.value);
        } else if (obj.type === asn1.Type.UTF8) {
          try {
            rval += forge5.util.decodeUtf8(obj.value);
          } catch (e) {
            if (e.message === "URI malformed") {
              rval += "0x" + forge5.util.bytesToHex(obj.value) + " (malformed UTF8)";
            } else {
              throw e;
            }
          }
        } else if (obj.type === asn1.Type.PRINTABLESTRING || obj.type === asn1.Type.IA5String) {
          rval += obj.value;
        } else if (_nonLatinRegex.test(obj.value)) {
          rval += "0x" + forge5.util.bytesToHex(obj.value);
        } else if (obj.value.length === 0) {
          rval += "[null]";
        } else {
          rval += obj.value;
        }
      }
      return rval;
    };
  }
});

// node_modules/node-forge/lib/cipher.js
var require_cipher = __commonJS({
  "node_modules/node-forge/lib/cipher.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    module2.exports = forge5.cipher = forge5.cipher || {};
    forge5.cipher.algorithms = forge5.cipher.algorithms || {};
    forge5.cipher.createCipher = function(algorithm, key) {
      var api = algorithm;
      if (typeof api === "string") {
        api = forge5.cipher.getAlgorithm(api);
        if (api) {
          api = api();
        }
      }
      if (!api) {
        throw new Error("Unsupported algorithm: " + algorithm);
      }
      return new forge5.cipher.BlockCipher({
        algorithm: api,
        key,
        decrypt: false
      });
    };
    forge5.cipher.createDecipher = function(algorithm, key) {
      var api = algorithm;
      if (typeof api === "string") {
        api = forge5.cipher.getAlgorithm(api);
        if (api) {
          api = api();
        }
      }
      if (!api) {
        throw new Error("Unsupported algorithm: " + algorithm);
      }
      return new forge5.cipher.BlockCipher({
        algorithm: api,
        key,
        decrypt: true
      });
    };
    forge5.cipher.registerAlgorithm = function(name2, algorithm) {
      name2 = name2.toUpperCase();
      forge5.cipher.algorithms[name2] = algorithm;
    };
    forge5.cipher.getAlgorithm = function(name2) {
      name2 = name2.toUpperCase();
      if (name2 in forge5.cipher.algorithms) {
        return forge5.cipher.algorithms[name2];
      }
      return null;
    };
    var BlockCipher = forge5.cipher.BlockCipher = function(options) {
      this.algorithm = options.algorithm;
      this.mode = this.algorithm.mode;
      this.blockSize = this.mode.blockSize;
      this._finish = false;
      this._input = null;
      this.output = null;
      this._op = options.decrypt ? this.mode.decrypt : this.mode.encrypt;
      this._decrypt = options.decrypt;
      this.algorithm.initialize(options);
    };
    BlockCipher.prototype.start = function(options) {
      options = options || {};
      var opts = {};
      for (var key in options) {
        opts[key] = options[key];
      }
      opts.decrypt = this._decrypt;
      this._finish = false;
      this._input = forge5.util.createBuffer();
      this.output = options.output || forge5.util.createBuffer();
      this.mode.start(opts);
    };
    BlockCipher.prototype.update = function(input) {
      if (input) {
        this._input.putBuffer(input);
      }
      while (!this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish) {
      }
      this._input.compact();
    };
    BlockCipher.prototype.finish = function(pad) {
      if (pad && (this.mode.name === "ECB" || this.mode.name === "CBC")) {
        this.mode.pad = function(input) {
          return pad(this.blockSize, input, false);
        };
        this.mode.unpad = function(output) {
          return pad(this.blockSize, output, true);
        };
      }
      var options = {};
      options.decrypt = this._decrypt;
      options.overflow = this._input.length() % this.blockSize;
      if (!this._decrypt && this.mode.pad) {
        if (!this.mode.pad(this._input, options)) {
          return false;
        }
      }
      this._finish = true;
      this.update();
      if (this._decrypt && this.mode.unpad) {
        if (!this.mode.unpad(this.output, options)) {
          return false;
        }
      }
      if (this.mode.afterFinish) {
        if (!this.mode.afterFinish(this.output, options)) {
          return false;
        }
      }
      return true;
    };
  }
});

// node_modules/node-forge/lib/cipherModes.js
var require_cipherModes = __commonJS({
  "node_modules/node-forge/lib/cipherModes.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    forge5.cipher = forge5.cipher || {};
    var modes = module2.exports = forge5.cipher.modes = forge5.cipher.modes || {};
    modes.ecb = function(options) {
      options = options || {};
      this.name = "ECB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    modes.ecb.prototype.start = function(options) {
    };
    modes.ecb.prototype.encrypt = function(input, output, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output.putInt32(this._outBlock[i]);
      }
    };
    modes.ecb.prototype.decrypt = function(input, output, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output.putInt32(this._outBlock[i]);
      }
    };
    modes.ecb.prototype.pad = function(input, options) {
      var padding2 = input.length() === this.blockSize ? this.blockSize : this.blockSize - input.length();
      input.fillWithByte(padding2, padding2);
      return true;
    };
    modes.ecb.prototype.unpad = function(output, options) {
      if (options.overflow > 0) {
        return false;
      }
      var len = output.length();
      var count = output.at(len - 1);
      if (count > this.blockSize << 2) {
        return false;
      }
      output.truncate(count);
      return true;
    };
    modes.cbc = function(options) {
      options = options || {};
      this.name = "CBC";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
    };
    modes.cbc.prototype.start = function(options) {
      if (options.iv === null) {
        if (!this._prev) {
          throw new Error("Invalid IV parameter.");
        }
        this._iv = this._prev.slice(0);
      } else if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      } else {
        this._iv = transformIV(options.iv, this.blockSize);
        this._prev = this._iv.slice(0);
      }
    };
    modes.cbc.prototype.encrypt = function(input, output, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = this._prev[i] ^ input.getInt32();
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output.putInt32(this._outBlock[i]);
      }
      this._prev = this._outBlock;
    };
    modes.cbc.prototype.decrypt = function(input, output, finish) {
      if (input.length() < this.blockSize && !(finish && input.length() > 0)) {
        return true;
      }
      for (var i = 0; i < this._ints; ++i) {
        this._inBlock[i] = input.getInt32();
      }
      this.cipher.decrypt(this._inBlock, this._outBlock);
      for (var i = 0; i < this._ints; ++i) {
        output.putInt32(this._prev[i] ^ this._outBlock[i]);
      }
      this._prev = this._inBlock.slice(0);
    };
    modes.cbc.prototype.pad = function(input, options) {
      var padding2 = input.length() === this.blockSize ? this.blockSize : this.blockSize - input.length();
      input.fillWithByte(padding2, padding2);
      return true;
    };
    modes.cbc.prototype.unpad = function(output, options) {
      if (options.overflow > 0) {
        return false;
      }
      var len = output.length();
      var count = output.at(len - 1);
      if (count > this.blockSize << 2) {
        return false;
      }
      output.truncate(count);
      return true;
    };
    modes.cfb = function(options) {
      options = options || {};
      this.name = "CFB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialBlock = new Array(this._ints);
      this._partialOutput = forge5.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.cfb.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.cfb.prototype.encrypt = function(input, output, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = input.getInt32() ^ this._outBlock[i];
          output.putInt32(this._inBlock[i]);
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialBlock[i] = input.getInt32() ^ this._outBlock[i];
        this._partialOutput.putInt32(this._partialBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._partialBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output.putBytes(this._partialOutput.getBytes(
          partialBytes - this._partialBytes
        ));
        this._partialBytes = partialBytes;
        return true;
      }
      output.putBytes(this._partialOutput.getBytes(
        inputLength - this._partialBytes
      ));
      this._partialBytes = 0;
    };
    modes.cfb.prototype.decrypt = function(input, output, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = input.getInt32();
          output.putInt32(this._inBlock[i] ^ this._outBlock[i]);
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialBlock[i] = input.getInt32();
        this._partialOutput.putInt32(this._partialBlock[i] ^ this._outBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._partialBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output.putBytes(this._partialOutput.getBytes(
          partialBytes - this._partialBytes
        ));
        this._partialBytes = partialBytes;
        return true;
      }
      output.putBytes(this._partialOutput.getBytes(
        inputLength - this._partialBytes
      ));
      this._partialBytes = 0;
    };
    modes.ofb = function(options) {
      options = options || {};
      this.name = "OFB";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge5.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.ofb.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.ofb.prototype.encrypt = function(input, output, finish) {
      var inputLength = input.length();
      if (input.length() === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output.putInt32(input.getInt32() ^ this._outBlock[i]);
          this._inBlock[i] = this._outBlock[i];
        }
        return;
      }
      var partialBytes = (this.blockSize - inputLength) % this.blockSize;
      if (partialBytes > 0) {
        partialBytes = this.blockSize - partialBytes;
      }
      this._partialOutput.clear();
      for (var i = 0; i < this._ints; ++i) {
        this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
      }
      if (partialBytes > 0) {
        input.read -= this.blockSize;
      } else {
        for (var i = 0; i < this._ints; ++i) {
          this._inBlock[i] = this._outBlock[i];
        }
      }
      if (this._partialBytes > 0) {
        this._partialOutput.getBytes(this._partialBytes);
      }
      if (partialBytes > 0 && !finish) {
        output.putBytes(this._partialOutput.getBytes(
          partialBytes - this._partialBytes
        ));
        this._partialBytes = partialBytes;
        return true;
      }
      output.putBytes(this._partialOutput.getBytes(
        inputLength - this._partialBytes
      ));
      this._partialBytes = 0;
    };
    modes.ofb.prototype.decrypt = modes.ofb.prototype.encrypt;
    modes.ctr = function(options) {
      options = options || {};
      this.name = "CTR";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = null;
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge5.util.createBuffer();
      this._partialBytes = 0;
    };
    modes.ctr.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      this._iv = transformIV(options.iv, this.blockSize);
      this._inBlock = this._iv.slice(0);
      this._partialBytes = 0;
    };
    modes.ctr.prototype.encrypt = function(input, output, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
      } else {
        var partialBytes = (this.blockSize - inputLength) % this.blockSize;
        if (partialBytes > 0) {
          partialBytes = this.blockSize - partialBytes;
        }
        this._partialOutput.clear();
        for (var i = 0; i < this._ints; ++i) {
          this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
        if (partialBytes > 0) {
          input.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (partialBytes > 0 && !finish) {
          output.putBytes(this._partialOutput.getBytes(
            partialBytes - this._partialBytes
          ));
          this._partialBytes = partialBytes;
          return true;
        }
        output.putBytes(this._partialOutput.getBytes(
          inputLength - this._partialBytes
        ));
        this._partialBytes = 0;
      }
      inc32(this._inBlock);
    };
    modes.ctr.prototype.decrypt = modes.ctr.prototype.encrypt;
    modes.gcm = function(options) {
      options = options || {};
      this.name = "GCM";
      this.cipher = options.cipher;
      this.blockSize = options.blockSize || 16;
      this._ints = this.blockSize / 4;
      this._inBlock = new Array(this._ints);
      this._outBlock = new Array(this._ints);
      this._partialOutput = forge5.util.createBuffer();
      this._partialBytes = 0;
      this._R = 3774873600;
    };
    modes.gcm.prototype.start = function(options) {
      if (!("iv" in options)) {
        throw new Error("Invalid IV parameter.");
      }
      var iv = forge5.util.createBuffer(options.iv);
      this._cipherLength = 0;
      var additionalData;
      if ("additionalData" in options) {
        additionalData = forge5.util.createBuffer(options.additionalData);
      } else {
        additionalData = forge5.util.createBuffer();
      }
      if ("tagLength" in options) {
        this._tagLength = options.tagLength;
      } else {
        this._tagLength = 128;
      }
      this._tag = null;
      if (options.decrypt) {
        this._tag = forge5.util.createBuffer(options.tag).getBytes();
        if (this._tag.length !== this._tagLength / 8) {
          throw new Error("Authentication tag does not match tag length.");
        }
      }
      this._hashBlock = new Array(this._ints);
      this.tag = null;
      this._hashSubkey = new Array(this._ints);
      this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey);
      this.componentBits = 4;
      this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
      var ivLength = iv.length();
      if (ivLength === 12) {
        this._j0 = [iv.getInt32(), iv.getInt32(), iv.getInt32(), 1];
      } else {
        this._j0 = [0, 0, 0, 0];
        while (iv.length() > 0) {
          this._j0 = this.ghash(
            this._hashSubkey,
            this._j0,
            [iv.getInt32(), iv.getInt32(), iv.getInt32(), iv.getInt32()]
          );
        }
        this._j0 = this.ghash(
          this._hashSubkey,
          this._j0,
          [0, 0].concat(from64To32(ivLength * 8))
        );
      }
      this._inBlock = this._j0.slice(0);
      inc32(this._inBlock);
      this._partialBytes = 0;
      additionalData = forge5.util.createBuffer(additionalData);
      this._aDataLength = from64To32(additionalData.length() * 8);
      var overflow = additionalData.length() % this.blockSize;
      if (overflow) {
        additionalData.fillWithByte(0, this.blockSize - overflow);
      }
      this._s = [0, 0, 0, 0];
      while (additionalData.length() > 0) {
        this._s = this.ghash(this._hashSubkey, this._s, [
          additionalData.getInt32(),
          additionalData.getInt32(),
          additionalData.getInt32(),
          additionalData.getInt32()
        ]);
      }
    };
    modes.gcm.prototype.encrypt = function(input, output, finish) {
      var inputLength = input.length();
      if (inputLength === 0) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      if (this._partialBytes === 0 && inputLength >= this.blockSize) {
        for (var i = 0; i < this._ints; ++i) {
          output.putInt32(this._outBlock[i] ^= input.getInt32());
        }
        this._cipherLength += this.blockSize;
      } else {
        var partialBytes = (this.blockSize - inputLength) % this.blockSize;
        if (partialBytes > 0) {
          partialBytes = this.blockSize - partialBytes;
        }
        this._partialOutput.clear();
        for (var i = 0; i < this._ints; ++i) {
          this._partialOutput.putInt32(input.getInt32() ^ this._outBlock[i]);
        }
        if (partialBytes <= 0 || finish) {
          if (finish) {
            var overflow = inputLength % this.blockSize;
            this._cipherLength += overflow;
            this._partialOutput.truncate(this.blockSize - overflow);
          } else {
            this._cipherLength += this.blockSize;
          }
          for (var i = 0; i < this._ints; ++i) {
            this._outBlock[i] = this._partialOutput.getInt32();
          }
          this._partialOutput.read -= this.blockSize;
        }
        if (this._partialBytes > 0) {
          this._partialOutput.getBytes(this._partialBytes);
        }
        if (partialBytes > 0 && !finish) {
          input.read -= this.blockSize;
          output.putBytes(this._partialOutput.getBytes(
            partialBytes - this._partialBytes
          ));
          this._partialBytes = partialBytes;
          return true;
        }
        output.putBytes(this._partialOutput.getBytes(
          inputLength - this._partialBytes
        ));
        this._partialBytes = 0;
      }
      this._s = this.ghash(this._hashSubkey, this._s, this._outBlock);
      inc32(this._inBlock);
    };
    modes.gcm.prototype.decrypt = function(input, output, finish) {
      var inputLength = input.length();
      if (inputLength < this.blockSize && !(finish && inputLength > 0)) {
        return true;
      }
      this.cipher.encrypt(this._inBlock, this._outBlock);
      inc32(this._inBlock);
      this._hashBlock[0] = input.getInt32();
      this._hashBlock[1] = input.getInt32();
      this._hashBlock[2] = input.getInt32();
      this._hashBlock[3] = input.getInt32();
      this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
      for (var i = 0; i < this._ints; ++i) {
        output.putInt32(this._outBlock[i] ^ this._hashBlock[i]);
      }
      if (inputLength < this.blockSize) {
        this._cipherLength += inputLength % this.blockSize;
      } else {
        this._cipherLength += this.blockSize;
      }
    };
    modes.gcm.prototype.afterFinish = function(output, options) {
      var rval = true;
      if (options.decrypt && options.overflow) {
        output.truncate(this.blockSize - options.overflow);
      }
      this.tag = forge5.util.createBuffer();
      var lengths = this._aDataLength.concat(from64To32(this._cipherLength * 8));
      this._s = this.ghash(this._hashSubkey, this._s, lengths);
      var tag = [];
      this.cipher.encrypt(this._j0, tag);
      for (var i = 0; i < this._ints; ++i) {
        this.tag.putInt32(this._s[i] ^ tag[i]);
      }
      this.tag.truncate(this.tag.length() % (this._tagLength / 8));
      if (options.decrypt && this.tag.bytes() !== this._tag) {
        rval = false;
      }
      return rval;
    };
    modes.gcm.prototype.multiply = function(x, y) {
      var z_i = [0, 0, 0, 0];
      var v_i = y.slice(0);
      for (var i = 0; i < 128; ++i) {
        var x_i = x[i / 32 | 0] & 1 << 31 - i % 32;
        if (x_i) {
          z_i[0] ^= v_i[0];
          z_i[1] ^= v_i[1];
          z_i[2] ^= v_i[2];
          z_i[3] ^= v_i[3];
        }
        this.pow(v_i, v_i);
      }
      return z_i;
    };
    modes.gcm.prototype.pow = function(x, out) {
      var lsb = x[3] & 1;
      for (var i = 3; i > 0; --i) {
        out[i] = x[i] >>> 1 | (x[i - 1] & 1) << 31;
      }
      out[0] = x[0] >>> 1;
      if (lsb) {
        out[0] ^= this._R;
      }
    };
    modes.gcm.prototype.tableMultiply = function(x) {
      var z = [0, 0, 0, 0];
      for (var i = 0; i < 32; ++i) {
        var idx = i / 8 | 0;
        var x_i = x[idx] >>> (7 - i % 8) * 4 & 15;
        var ah = this._m[i][x_i];
        z[0] ^= ah[0];
        z[1] ^= ah[1];
        z[2] ^= ah[2];
        z[3] ^= ah[3];
      }
      return z;
    };
    modes.gcm.prototype.ghash = function(h, y, x) {
      y[0] ^= x[0];
      y[1] ^= x[1];
      y[2] ^= x[2];
      y[3] ^= x[3];
      return this.tableMultiply(y);
    };
    modes.gcm.prototype.generateHashTable = function(h, bits) {
      var multiplier = 8 / bits;
      var perInt = 4 * multiplier;
      var size = 16 * multiplier;
      var m = new Array(size);
      for (var i = 0; i < size; ++i) {
        var tmp = [0, 0, 0, 0];
        var idx = i / perInt | 0;
        var shft = (perInt - 1 - i % perInt) * bits;
        tmp[idx] = 1 << bits - 1 << shft;
        m[i] = this.generateSubHashTable(this.multiply(tmp, h), bits);
      }
      return m;
    };
    modes.gcm.prototype.generateSubHashTable = function(mid, bits) {
      var size = 1 << bits;
      var half = size >>> 1;
      var m = new Array(size);
      m[half] = mid.slice(0);
      var i = half >>> 1;
      while (i > 0) {
        this.pow(m[2 * i], m[i] = []);
        i >>= 1;
      }
      i = 2;
      while (i < half) {
        for (var j = 1; j < i; ++j) {
          var m_i = m[i];
          var m_j = m[j];
          m[i + j] = [
            m_i[0] ^ m_j[0],
            m_i[1] ^ m_j[1],
            m_i[2] ^ m_j[2],
            m_i[3] ^ m_j[3]
          ];
        }
        i *= 2;
      }
      m[0] = [0, 0, 0, 0];
      for (i = half + 1; i < size; ++i) {
        var c = m[i ^ half];
        m[i] = [mid[0] ^ c[0], mid[1] ^ c[1], mid[2] ^ c[2], mid[3] ^ c[3]];
      }
      return m;
    };
    function transformIV(iv, blockSize) {
      if (typeof iv === "string") {
        iv = forge5.util.createBuffer(iv);
      }
      if (forge5.util.isArray(iv) && iv.length > 4) {
        var tmp = iv;
        iv = forge5.util.createBuffer();
        for (var i = 0; i < tmp.length; ++i) {
          iv.putByte(tmp[i]);
        }
      }
      if (iv.length() < blockSize) {
        throw new Error(
          "Invalid IV length; got " + iv.length() + " bytes and expected " + blockSize + " bytes."
        );
      }
      if (!forge5.util.isArray(iv)) {
        var ints = [];
        var blocks = blockSize / 4;
        for (var i = 0; i < blocks; ++i) {
          ints.push(iv.getInt32());
        }
        iv = ints;
      }
      return iv;
    }
    function inc32(block) {
      block[block.length - 1] = block[block.length - 1] + 1 & 4294967295;
    }
    function from64To32(num) {
      return [num / 4294967296 | 0, num & 4294967295];
    }
  }
});

// node_modules/node-forge/lib/aes.js
var require_aes = __commonJS({
  "node_modules/node-forge/lib/aes.js"(exports2, module2) {
    var forge5 = require_forge();
    require_cipher();
    require_cipherModes();
    require_util2();
    module2.exports = forge5.aes = forge5.aes || {};
    forge5.aes.startEncrypting = function(key, iv, output, mode) {
      var cipher = _createCipher({
        key,
        output,
        decrypt: false,
        mode
      });
      cipher.start(iv);
      return cipher;
    };
    forge5.aes.createEncryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: false,
        mode
      });
    };
    forge5.aes.startDecrypting = function(key, iv, output, mode) {
      var cipher = _createCipher({
        key,
        output,
        decrypt: true,
        mode
      });
      cipher.start(iv);
      return cipher;
    };
    forge5.aes.createDecryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: true,
        mode
      });
    };
    forge5.aes.Algorithm = function(name2, mode) {
      if (!init) {
        initialize();
      }
      var self2 = this;
      self2.name = name2;
      self2.mode = new mode({
        blockSize: 16,
        cipher: {
          encrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._w, inBlock, outBlock, false);
          },
          decrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._w, inBlock, outBlock, true);
          }
        }
      });
      self2._init = false;
    };
    forge5.aes.Algorithm.prototype.initialize = function(options) {
      if (this._init) {
        return;
      }
      var key = options.key;
      var tmp;
      if (typeof key === "string" && (key.length === 16 || key.length === 24 || key.length === 32)) {
        key = forge5.util.createBuffer(key);
      } else if (forge5.util.isArray(key) && (key.length === 16 || key.length === 24 || key.length === 32)) {
        tmp = key;
        key = forge5.util.createBuffer();
        for (var i = 0; i < tmp.length; ++i) {
          key.putByte(tmp[i]);
        }
      }
      if (!forge5.util.isArray(key)) {
        tmp = key;
        key = [];
        var len = tmp.length();
        if (len === 16 || len === 24 || len === 32) {
          len = len >>> 2;
          for (var i = 0; i < len; ++i) {
            key.push(tmp.getInt32());
          }
        }
      }
      if (!forge5.util.isArray(key) || !(key.length === 4 || key.length === 6 || key.length === 8)) {
        throw new Error("Invalid key parameter.");
      }
      var mode = this.mode.name;
      var encryptOp = ["CFB", "OFB", "CTR", "GCM"].indexOf(mode) !== -1;
      this._w = _expandKey(key, options.decrypt && !encryptOp);
      this._init = true;
    };
    forge5.aes._expandKey = function(key, decrypt2) {
      if (!init) {
        initialize();
      }
      return _expandKey(key, decrypt2);
    };
    forge5.aes._updateBlock = _updateBlock;
    registerAlgorithm("AES-ECB", forge5.cipher.modes.ecb);
    registerAlgorithm("AES-CBC", forge5.cipher.modes.cbc);
    registerAlgorithm("AES-CFB", forge5.cipher.modes.cfb);
    registerAlgorithm("AES-OFB", forge5.cipher.modes.ofb);
    registerAlgorithm("AES-CTR", forge5.cipher.modes.ctr);
    registerAlgorithm("AES-GCM", forge5.cipher.modes.gcm);
    function registerAlgorithm(name2, mode) {
      var factory = function() {
        return new forge5.aes.Algorithm(name2, mode);
      };
      forge5.cipher.registerAlgorithm(name2, factory);
    }
    var init = false;
    var Nb = 4;
    var sbox;
    var isbox;
    var rcon;
    var mix;
    var imix;
    function initialize() {
      init = true;
      rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      var xtime = new Array(256);
      for (var i = 0; i < 128; ++i) {
        xtime[i] = i << 1;
        xtime[i + 128] = i + 128 << 1 ^ 283;
      }
      sbox = new Array(256);
      isbox = new Array(256);
      mix = new Array(4);
      imix = new Array(4);
      for (var i = 0; i < 4; ++i) {
        mix[i] = new Array(256);
        imix[i] = new Array(256);
      }
      var e = 0, ei = 0, e2, e4, e8, sx, sx2, me, ime;
      for (var i = 0; i < 256; ++i) {
        sx = ei ^ ei << 1 ^ ei << 2 ^ ei << 3 ^ ei << 4;
        sx = sx >> 8 ^ sx & 255 ^ 99;
        sbox[e] = sx;
        isbox[sx] = e;
        sx2 = xtime[sx];
        e2 = xtime[e];
        e4 = xtime[e2];
        e8 = xtime[e4];
        me = sx2 << 24 ^ sx << 16 ^ sx << 8 ^ (sx ^ sx2);
        ime = (e2 ^ e4 ^ e8) << 24 ^ (e ^ e8) << 16 ^ (e ^ e4 ^ e8) << 8 ^ (e ^ e2 ^ e8);
        for (var n = 0; n < 4; ++n) {
          mix[n][e] = me;
          imix[n][sx] = ime;
          me = me << 24 | me >>> 8;
          ime = ime << 24 | ime >>> 8;
        }
        if (e === 0) {
          e = ei = 1;
        } else {
          e = e2 ^ xtime[xtime[xtime[e2 ^ e8]]];
          ei ^= xtime[xtime[ei]];
        }
      }
    }
    function _expandKey(key, decrypt2) {
      var w = key.slice(0);
      var temp, iNk = 1;
      var Nk = w.length;
      var Nr1 = Nk + 6 + 1;
      var end = Nb * Nr1;
      for (var i = Nk; i < end; ++i) {
        temp = w[i - 1];
        if (i % Nk === 0) {
          temp = sbox[temp >>> 16 & 255] << 24 ^ sbox[temp >>> 8 & 255] << 16 ^ sbox[temp & 255] << 8 ^ sbox[temp >>> 24] ^ rcon[iNk] << 24;
          iNk++;
        } else if (Nk > 6 && i % Nk === 4) {
          temp = sbox[temp >>> 24] << 24 ^ sbox[temp >>> 16 & 255] << 16 ^ sbox[temp >>> 8 & 255] << 8 ^ sbox[temp & 255];
        }
        w[i] = w[i - Nk] ^ temp;
      }
      if (decrypt2) {
        var tmp;
        var m0 = imix[0];
        var m1 = imix[1];
        var m2 = imix[2];
        var m3 = imix[3];
        var wnew = w.slice(0);
        end = w.length;
        for (var i = 0, wi = end - Nb; i < end; i += Nb, wi -= Nb) {
          if (i === 0 || i === end - Nb) {
            wnew[i] = w[wi];
            wnew[i + 1] = w[wi + 3];
            wnew[i + 2] = w[wi + 2];
            wnew[i + 3] = w[wi + 1];
          } else {
            for (var n = 0; n < Nb; ++n) {
              tmp = w[wi + n];
              wnew[i + (3 & -n)] = m0[sbox[tmp >>> 24]] ^ m1[sbox[tmp >>> 16 & 255]] ^ m2[sbox[tmp >>> 8 & 255]] ^ m3[sbox[tmp & 255]];
            }
          }
        }
        w = wnew;
      }
      return w;
    }
    function _updateBlock(w, input, output, decrypt2) {
      var Nr = w.length / 4 - 1;
      var m0, m1, m2, m3, sub;
      if (decrypt2) {
        m0 = imix[0];
        m1 = imix[1];
        m2 = imix[2];
        m3 = imix[3];
        sub = isbox;
      } else {
        m0 = mix[0];
        m1 = mix[1];
        m2 = mix[2];
        m3 = mix[3];
        sub = sbox;
      }
      var a, b, c, d, a2, b2, c2;
      a = input[0] ^ w[0];
      b = input[decrypt2 ? 3 : 1] ^ w[1];
      c = input[2] ^ w[2];
      d = input[decrypt2 ? 1 : 3] ^ w[3];
      var i = 3;
      for (var round = 1; round < Nr; ++round) {
        a2 = m0[a >>> 24] ^ m1[b >>> 16 & 255] ^ m2[c >>> 8 & 255] ^ m3[d & 255] ^ w[++i];
        b2 = m0[b >>> 24] ^ m1[c >>> 16 & 255] ^ m2[d >>> 8 & 255] ^ m3[a & 255] ^ w[++i];
        c2 = m0[c >>> 24] ^ m1[d >>> 16 & 255] ^ m2[a >>> 8 & 255] ^ m3[b & 255] ^ w[++i];
        d = m0[d >>> 24] ^ m1[a >>> 16 & 255] ^ m2[b >>> 8 & 255] ^ m3[c & 255] ^ w[++i];
        a = a2;
        b = b2;
        c = c2;
      }
      output[0] = sub[a >>> 24] << 24 ^ sub[b >>> 16 & 255] << 16 ^ sub[c >>> 8 & 255] << 8 ^ sub[d & 255] ^ w[++i];
      output[decrypt2 ? 3 : 1] = sub[b >>> 24] << 24 ^ sub[c >>> 16 & 255] << 16 ^ sub[d >>> 8 & 255] << 8 ^ sub[a & 255] ^ w[++i];
      output[2] = sub[c >>> 24] << 24 ^ sub[d >>> 16 & 255] << 16 ^ sub[a >>> 8 & 255] << 8 ^ sub[b & 255] ^ w[++i];
      output[decrypt2 ? 1 : 3] = sub[d >>> 24] << 24 ^ sub[a >>> 16 & 255] << 16 ^ sub[b >>> 8 & 255] << 8 ^ sub[c & 255] ^ w[++i];
    }
    function _createCipher(options) {
      options = options || {};
      var mode = (options.mode || "CBC").toUpperCase();
      var algorithm = "AES-" + mode;
      var cipher;
      if (options.decrypt) {
        cipher = forge5.cipher.createDecipher(algorithm, options.key);
      } else {
        cipher = forge5.cipher.createCipher(algorithm, options.key);
      }
      var start = cipher.start;
      cipher.start = function(iv, options2) {
        var output = null;
        if (options2 instanceof forge5.util.ByteBuffer) {
          output = options2;
          options2 = {};
        }
        options2 = options2 || {};
        options2.output = output;
        options2.iv = iv;
        start.call(cipher, options2);
      };
      return cipher;
    }
  }
});

// node_modules/node-forge/lib/des.js
var require_des = __commonJS({
  "node_modules/node-forge/lib/des.js"(exports2, module2) {
    var forge5 = require_forge();
    require_cipher();
    require_cipherModes();
    require_util2();
    module2.exports = forge5.des = forge5.des || {};
    forge5.des.startEncrypting = function(key, iv, output, mode) {
      var cipher = _createCipher({
        key,
        output,
        decrypt: false,
        mode: mode || (iv === null ? "ECB" : "CBC")
      });
      cipher.start(iv);
      return cipher;
    };
    forge5.des.createEncryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: false,
        mode
      });
    };
    forge5.des.startDecrypting = function(key, iv, output, mode) {
      var cipher = _createCipher({
        key,
        output,
        decrypt: true,
        mode: mode || (iv === null ? "ECB" : "CBC")
      });
      cipher.start(iv);
      return cipher;
    };
    forge5.des.createDecryptionCipher = function(key, mode) {
      return _createCipher({
        key,
        output: null,
        decrypt: true,
        mode
      });
    };
    forge5.des.Algorithm = function(name2, mode) {
      var self2 = this;
      self2.name = name2;
      self2.mode = new mode({
        blockSize: 8,
        cipher: {
          encrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._keys, inBlock, outBlock, false);
          },
          decrypt: function(inBlock, outBlock) {
            return _updateBlock(self2._keys, inBlock, outBlock, true);
          }
        }
      });
      self2._init = false;
    };
    forge5.des.Algorithm.prototype.initialize = function(options) {
      if (this._init) {
        return;
      }
      var key = forge5.util.createBuffer(options.key);
      if (this.name.indexOf("3DES") === 0) {
        if (key.length() !== 24) {
          throw new Error("Invalid Triple-DES key size: " + key.length() * 8);
        }
      }
      this._keys = _createKeys(key);
      this._init = true;
    };
    registerAlgorithm("DES-ECB", forge5.cipher.modes.ecb);
    registerAlgorithm("DES-CBC", forge5.cipher.modes.cbc);
    registerAlgorithm("DES-CFB", forge5.cipher.modes.cfb);
    registerAlgorithm("DES-OFB", forge5.cipher.modes.ofb);
    registerAlgorithm("DES-CTR", forge5.cipher.modes.ctr);
    registerAlgorithm("3DES-ECB", forge5.cipher.modes.ecb);
    registerAlgorithm("3DES-CBC", forge5.cipher.modes.cbc);
    registerAlgorithm("3DES-CFB", forge5.cipher.modes.cfb);
    registerAlgorithm("3DES-OFB", forge5.cipher.modes.ofb);
    registerAlgorithm("3DES-CTR", forge5.cipher.modes.ctr);
    function registerAlgorithm(name2, mode) {
      var factory = function() {
        return new forge5.des.Algorithm(name2, mode);
      };
      forge5.cipher.registerAlgorithm(name2, factory);
    }
    var spfunction1 = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756];
    var spfunction2 = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344];
    var spfunction3 = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584];
    var spfunction4 = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928];
    var spfunction5 = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080];
    var spfunction6 = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312];
    var spfunction7 = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154];
    var spfunction8 = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];
    function _createKeys(key) {
      var pc2bytes0 = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], pc2bytes1 = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], pc2bytes2 = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], pc2bytes3 = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], pc2bytes4 = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], pc2bytes5 = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], pc2bytes6 = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], pc2bytes7 = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], pc2bytes8 = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], pc2bytes9 = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], pc2bytes10 = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], pc2bytes11 = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], pc2bytes12 = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], pc2bytes13 = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261];
      var iterations = key.length() > 8 ? 3 : 1;
      var keys = [];
      var shifts = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
      var n = 0, tmp;
      for (var j = 0; j < iterations; j++) {
        var left = key.getInt32();
        var right = key.getInt32();
        tmp = (left >>> 4 ^ right) & 252645135;
        right ^= tmp;
        left ^= tmp << 4;
        tmp = (right >>> -16 ^ left) & 65535;
        left ^= tmp;
        right ^= tmp << -16;
        tmp = (left >>> 2 ^ right) & 858993459;
        right ^= tmp;
        left ^= tmp << 2;
        tmp = (right >>> -16 ^ left) & 65535;
        left ^= tmp;
        right ^= tmp << -16;
        tmp = (left >>> 1 ^ right) & 1431655765;
        right ^= tmp;
        left ^= tmp << 1;
        tmp = (right >>> 8 ^ left) & 16711935;
        left ^= tmp;
        right ^= tmp << 8;
        tmp = (left >>> 1 ^ right) & 1431655765;
        right ^= tmp;
        left ^= tmp << 1;
        tmp = left << 8 | right >>> 20 & 240;
        left = right << 24 | right << 8 & 16711680 | right >>> 8 & 65280 | right >>> 24 & 240;
        right = tmp;
        for (var i = 0; i < shifts.length; ++i) {
          if (shifts[i]) {
            left = left << 2 | left >>> 26;
            right = right << 2 | right >>> 26;
          } else {
            left = left << 1 | left >>> 27;
            right = right << 1 | right >>> 27;
          }
          left &= -15;
          right &= -15;
          var lefttmp = pc2bytes0[left >>> 28] | pc2bytes1[left >>> 24 & 15] | pc2bytes2[left >>> 20 & 15] | pc2bytes3[left >>> 16 & 15] | pc2bytes4[left >>> 12 & 15] | pc2bytes5[left >>> 8 & 15] | pc2bytes6[left >>> 4 & 15];
          var righttmp = pc2bytes7[right >>> 28] | pc2bytes8[right >>> 24 & 15] | pc2bytes9[right >>> 20 & 15] | pc2bytes10[right >>> 16 & 15] | pc2bytes11[right >>> 12 & 15] | pc2bytes12[right >>> 8 & 15] | pc2bytes13[right >>> 4 & 15];
          tmp = (righttmp >>> 16 ^ lefttmp) & 65535;
          keys[n++] = lefttmp ^ tmp;
          keys[n++] = righttmp ^ tmp << 16;
        }
      }
      return keys;
    }
    function _updateBlock(keys, input, output, decrypt2) {
      var iterations = keys.length === 32 ? 3 : 9;
      var looping;
      if (iterations === 3) {
        looping = decrypt2 ? [30, -2, -2] : [0, 32, 2];
      } else {
        looping = decrypt2 ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
      }
      var tmp;
      var left = input[0];
      var right = input[1];
      tmp = (left >>> 4 ^ right) & 252645135;
      right ^= tmp;
      left ^= tmp << 4;
      tmp = (left >>> 16 ^ right) & 65535;
      right ^= tmp;
      left ^= tmp << 16;
      tmp = (right >>> 2 ^ left) & 858993459;
      left ^= tmp;
      right ^= tmp << 2;
      tmp = (right >>> 8 ^ left) & 16711935;
      left ^= tmp;
      right ^= tmp << 8;
      tmp = (left >>> 1 ^ right) & 1431655765;
      right ^= tmp;
      left ^= tmp << 1;
      left = left << 1 | left >>> 31;
      right = right << 1 | right >>> 31;
      for (var j = 0; j < iterations; j += 3) {
        var endloop = looping[j + 1];
        var loopinc = looping[j + 2];
        for (var i = looping[j]; i != endloop; i += loopinc) {
          var right1 = right ^ keys[i];
          var right2 = (right >>> 4 | right << 28) ^ keys[i + 1];
          tmp = left;
          left = right;
          right = tmp ^ (spfunction2[right1 >>> 24 & 63] | spfunction4[right1 >>> 16 & 63] | spfunction6[right1 >>> 8 & 63] | spfunction8[right1 & 63] | spfunction1[right2 >>> 24 & 63] | spfunction3[right2 >>> 16 & 63] | spfunction5[right2 >>> 8 & 63] | spfunction7[right2 & 63]);
        }
        tmp = left;
        left = right;
        right = tmp;
      }
      left = left >>> 1 | left << 31;
      right = right >>> 1 | right << 31;
      tmp = (left >>> 1 ^ right) & 1431655765;
      right ^= tmp;
      left ^= tmp << 1;
      tmp = (right >>> 8 ^ left) & 16711935;
      left ^= tmp;
      right ^= tmp << 8;
      tmp = (right >>> 2 ^ left) & 858993459;
      left ^= tmp;
      right ^= tmp << 2;
      tmp = (left >>> 16 ^ right) & 65535;
      right ^= tmp;
      left ^= tmp << 16;
      tmp = (left >>> 4 ^ right) & 252645135;
      right ^= tmp;
      left ^= tmp << 4;
      output[0] = left;
      output[1] = right;
    }
    function _createCipher(options) {
      options = options || {};
      var mode = (options.mode || "CBC").toUpperCase();
      var algorithm = "DES-" + mode;
      var cipher;
      if (options.decrypt) {
        cipher = forge5.cipher.createDecipher(algorithm, options.key);
      } else {
        cipher = forge5.cipher.createCipher(algorithm, options.key);
      }
      var start = cipher.start;
      cipher.start = function(iv, options2) {
        var output = null;
        if (options2 instanceof forge5.util.ByteBuffer) {
          output = options2;
          options2 = {};
        }
        options2 = options2 || {};
        options2.output = output;
        options2.iv = iv;
        start.call(cipher, options2);
      };
      return cipher;
    }
  }
});

// node_modules/node-forge/lib/md.js
var require_md = __commonJS({
  "node_modules/node-forge/lib/md.js"(exports2, module2) {
    var forge5 = require_forge();
    module2.exports = forge5.md = forge5.md || {};
    forge5.md.algorithms = forge5.md.algorithms || {};
  }
});

// node_modules/node-forge/lib/hmac.js
var require_hmac = __commonJS({
  "node_modules/node-forge/lib/hmac.js"(exports2, module2) {
    var forge5 = require_forge();
    require_md();
    require_util2();
    var hmac = module2.exports = forge5.hmac = forge5.hmac || {};
    hmac.create = function() {
      var _key = null;
      var _md = null;
      var _ipadding = null;
      var _opadding = null;
      var ctx = {};
      ctx.start = function(md, key) {
        if (md !== null) {
          if (typeof md === "string") {
            md = md.toLowerCase();
            if (md in forge5.md.algorithms) {
              _md = forge5.md.algorithms[md].create();
            } else {
              throw new Error('Unknown hash algorithm "' + md + '"');
            }
          } else {
            _md = md;
          }
        }
        if (key === null) {
          key = _key;
        } else {
          if (typeof key === "string") {
            key = forge5.util.createBuffer(key);
          } else if (forge5.util.isArray(key)) {
            var tmp = key;
            key = forge5.util.createBuffer();
            for (var i = 0; i < tmp.length; ++i) {
              key.putByte(tmp[i]);
            }
          }
          var keylen = key.length();
          if (keylen > _md.blockLength) {
            _md.start();
            _md.update(key.bytes());
            key = _md.digest();
          }
          _ipadding = forge5.util.createBuffer();
          _opadding = forge5.util.createBuffer();
          keylen = key.length();
          for (var i = 0; i < keylen; ++i) {
            var tmp = key.at(i);
            _ipadding.putByte(54 ^ tmp);
            _opadding.putByte(92 ^ tmp);
          }
          if (keylen < _md.blockLength) {
            var tmp = _md.blockLength - keylen;
            for (var i = 0; i < tmp; ++i) {
              _ipadding.putByte(54);
              _opadding.putByte(92);
            }
          }
          _key = key;
          _ipadding = _ipadding.bytes();
          _opadding = _opadding.bytes();
        }
        _md.start();
        _md.update(_ipadding);
      };
      ctx.update = function(bytes) {
        _md.update(bytes);
      };
      ctx.getMac = function() {
        var inner = _md.digest().bytes();
        _md.start();
        _md.update(_opadding);
        _md.update(inner);
        return _md.digest();
      };
      ctx.digest = ctx.getMac;
      return ctx;
    };
  }
});

// node_modules/node-forge/lib/pbkdf2.js
var require_pbkdf2 = __commonJS({
  "node_modules/node-forge/lib/pbkdf2.js"(exports2, module2) {
    var forge5 = require_forge();
    require_hmac();
    require_md();
    require_util2();
    var pkcs5 = forge5.pkcs5 = forge5.pkcs5 || {};
    var crypto7;
    if (forge5.util.isNodejs && !forge5.options.usePureJavaScript) {
      crypto7 = require("crypto");
    }
    module2.exports = forge5.pbkdf2 = pkcs5.pbkdf2 = function(p, s, c, dkLen, md, callback) {
      if (typeof md === "function") {
        callback = md;
        md = null;
      }
      if (forge5.util.isNodejs && !forge5.options.usePureJavaScript && crypto7.pbkdf2 && (md === null || typeof md !== "object") && (crypto7.pbkdf2Sync.length > 4 || (!md || md === "sha1"))) {
        if (typeof md !== "string") {
          md = "sha1";
        }
        p = Buffer.from(p, "binary");
        s = Buffer.from(s, "binary");
        if (!callback) {
          if (crypto7.pbkdf2Sync.length === 4) {
            return crypto7.pbkdf2Sync(p, s, c, dkLen).toString("binary");
          }
          return crypto7.pbkdf2Sync(p, s, c, dkLen, md).toString("binary");
        }
        if (crypto7.pbkdf2Sync.length === 4) {
          return crypto7.pbkdf2(p, s, c, dkLen, function(err2, key) {
            if (err2) {
              return callback(err2);
            }
            callback(null, key.toString("binary"));
          });
        }
        return crypto7.pbkdf2(p, s, c, dkLen, md, function(err2, key) {
          if (err2) {
            return callback(err2);
          }
          callback(null, key.toString("binary"));
        });
      }
      if (typeof md === "undefined" || md === null) {
        md = "sha1";
      }
      if (typeof md === "string") {
        if (!(md in forge5.md.algorithms)) {
          throw new Error("Unknown hash algorithm: " + md);
        }
        md = forge5.md[md].create();
      }
      var hLen = md.digestLength;
      if (dkLen > 4294967295 * hLen) {
        var err = new Error("Derived key is too long.");
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      var len = Math.ceil(dkLen / hLen);
      var r = dkLen - (len - 1) * hLen;
      var prf = forge5.hmac.create();
      prf.start(md, p);
      var dk = "";
      var xor, u_c, u_c1;
      if (!callback) {
        for (var i = 1; i <= len; ++i) {
          prf.start(null, null);
          prf.update(s);
          prf.update(forge5.util.int32ToBytes(i));
          xor = u_c1 = prf.digest().getBytes();
          for (var j = 2; j <= c; ++j) {
            prf.start(null, null);
            prf.update(u_c1);
            u_c = prf.digest().getBytes();
            xor = forge5.util.xorBytes(xor, u_c, hLen);
            u_c1 = u_c;
          }
          dk += i < len ? xor : xor.substr(0, r);
        }
        return dk;
      }
      var i = 1, j;
      function outer() {
        if (i > len) {
          return callback(null, dk);
        }
        prf.start(null, null);
        prf.update(s);
        prf.update(forge5.util.int32ToBytes(i));
        xor = u_c1 = prf.digest().getBytes();
        j = 2;
        inner();
      }
      function inner() {
        if (j <= c) {
          prf.start(null, null);
          prf.update(u_c1);
          u_c = prf.digest().getBytes();
          xor = forge5.util.xorBytes(xor, u_c, hLen);
          u_c1 = u_c;
          ++j;
          return forge5.util.setImmediate(inner);
        }
        dk += i < len ? xor : xor.substr(0, r);
        ++i;
        outer();
      }
      outer();
    };
  }
});

// node_modules/node-forge/lib/pem.js
var require_pem = __commonJS({
  "node_modules/node-forge/lib/pem.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    var pem = module2.exports = forge5.pem = forge5.pem || {};
    pem.encode = function(msg, options) {
      options = options || {};
      var rval = "-----BEGIN " + msg.type + "-----\r\n";
      var header;
      if (msg.procType) {
        header = {
          name: "Proc-Type",
          values: [String(msg.procType.version), msg.procType.type]
        };
        rval += foldHeader(header);
      }
      if (msg.contentDomain) {
        header = { name: "Content-Domain", values: [msg.contentDomain] };
        rval += foldHeader(header);
      }
      if (msg.dekInfo) {
        header = { name: "DEK-Info", values: [msg.dekInfo.algorithm] };
        if (msg.dekInfo.parameters) {
          header.values.push(msg.dekInfo.parameters);
        }
        rval += foldHeader(header);
      }
      if (msg.headers) {
        for (var i = 0; i < msg.headers.length; ++i) {
          rval += foldHeader(msg.headers[i]);
        }
      }
      if (msg.procType) {
        rval += "\r\n";
      }
      rval += forge5.util.encode64(msg.body, options.maxline || 64) + "\r\n";
      rval += "-----END " + msg.type + "-----\r\n";
      return rval;
    };
    pem.decode = function(str) {
      var rval = [];
      var rMessage = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g;
      var rHeader = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/;
      var rCRLF = /\r?\n/;
      var match;
      while (true) {
        match = rMessage.exec(str);
        if (!match) {
          break;
        }
        var type = match[1];
        if (type === "NEW CERTIFICATE REQUEST") {
          type = "CERTIFICATE REQUEST";
        }
        var msg = {
          type,
          procType: null,
          contentDomain: null,
          dekInfo: null,
          headers: [],
          body: forge5.util.decode64(match[3])
        };
        rval.push(msg);
        if (!match[2]) {
          continue;
        }
        var lines = match[2].split(rCRLF);
        var li = 0;
        while (match && li < lines.length) {
          var line = lines[li].replace(/\s+$/, "");
          for (var nl = li + 1; nl < lines.length; ++nl) {
            var next = lines[nl];
            if (!/\s/.test(next[0])) {
              break;
            }
            line += next;
            li = nl;
          }
          match = line.match(rHeader);
          if (match) {
            var header = { name: match[1], values: [] };
            var values = match[2].split(",");
            for (var vi = 0; vi < values.length; ++vi) {
              header.values.push(ltrim(values[vi]));
            }
            if (!msg.procType) {
              if (header.name !== "Proc-Type") {
                throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');
              } else if (header.values.length !== 2) {
                throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');
              }
              msg.procType = { version: values[0], type: values[1] };
            } else if (!msg.contentDomain && header.name === "Content-Domain") {
              msg.contentDomain = values[0] || "";
            } else if (!msg.dekInfo && header.name === "DEK-Info") {
              if (header.values.length === 0) {
                throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');
              }
              msg.dekInfo = { algorithm: values[0], parameters: values[1] || null };
            } else {
              msg.headers.push(header);
            }
          }
          ++li;
        }
        if (msg.procType === "ENCRYPTED" && !msg.dekInfo) {
          throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".');
        }
      }
      if (rval.length === 0) {
        throw new Error("Invalid PEM formatted message.");
      }
      return rval;
    };
    function foldHeader(header) {
      var rval = header.name + ": ";
      var values = [];
      var insertSpace = function(match, $1) {
        return " " + $1;
      };
      for (var i = 0; i < header.values.length; ++i) {
        values.push(header.values[i].replace(/^(\S+\r\n)/, insertSpace));
      }
      rval += values.join(",") + "\r\n";
      var length2 = 0;
      var candidate = -1;
      for (var i = 0; i < rval.length; ++i, ++length2) {
        if (length2 > 65 && candidate !== -1) {
          var insert = rval[candidate];
          if (insert === ",") {
            ++candidate;
            rval = rval.substr(0, candidate) + "\r\n " + rval.substr(candidate);
          } else {
            rval = rval.substr(0, candidate) + "\r\n" + insert + rval.substr(candidate + 1);
          }
          length2 = i - candidate - 1;
          candidate = -1;
          ++i;
        } else if (rval[i] === " " || rval[i] === "	" || rval[i] === ",") {
          candidate = i;
        }
      }
      return rval;
    }
    function ltrim(str) {
      return str.replace(/^\s+/, "");
    }
  }
});

// node_modules/node-forge/lib/sha256.js
var require_sha256 = __commonJS({
  "node_modules/node-forge/lib/sha256.js"(exports2, module2) {
    var forge5 = require_forge();
    require_md();
    require_util2();
    var sha2562 = module2.exports = forge5.sha256 = forge5.sha256 || {};
    forge5.md.sha256 = forge5.md.algorithms.sha256 = sha2562;
    sha2562.create = function() {
      if (!_initialized) {
        _init();
      }
      var _state = null;
      var _input = forge5.util.createBuffer();
      var _w = new Array(64);
      var md = {
        algorithm: "sha256",
        blockLength: 64,
        digestLength: 32,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 8
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength64 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge5.util.createBuffer();
        _state = {
          h0: 1779033703,
          h1: 3144134277,
          h2: 1013904242,
          h3: 2773480762,
          h4: 1359893119,
          h5: 2600822924,
          h6: 528734635,
          h7: 1541459225
        };
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge5.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_state, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge5.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits += carry;
          finalBlock.putInt32(bits >>> 0);
          bits = next >>> 0;
        }
        finalBlock.putInt32(bits);
        var s2 = {
          h0: _state.h0,
          h1: _state.h1,
          h2: _state.h2,
          h3: _state.h3,
          h4: _state.h4,
          h5: _state.h5,
          h6: _state.h6,
          h7: _state.h7
        };
        _update(s2, _w, finalBlock);
        var rval = forge5.util.createBuffer();
        rval.putInt32(s2.h0);
        rval.putInt32(s2.h1);
        rval.putInt32(s2.h2);
        rval.putInt32(s2.h3);
        rval.putInt32(s2.h4);
        rval.putInt32(s2.h5);
        rval.putInt32(s2.h6);
        rval.putInt32(s2.h7);
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    var _k = null;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge5.util.fillString(String.fromCharCode(0), 64);
      _k = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      _initialized = true;
    }
    function _update(s, w, bytes) {
      var t1, t2, s0, s1, ch, maj, i, a, b, c, d, e, f, g, h;
      var len = bytes.length();
      while (len >= 64) {
        for (i = 0; i < 16; ++i) {
          w[i] = bytes.getInt32();
        }
        for (; i < 64; ++i) {
          t1 = w[i - 2];
          t1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
          t2 = w[i - 15];
          t2 = (t2 >>> 7 | t2 << 25) ^ (t2 >>> 18 | t2 << 14) ^ t2 >>> 3;
          w[i] = t1 + w[i - 7] + t2 + w[i - 16] | 0;
        }
        a = s.h0;
        b = s.h1;
        c = s.h2;
        d = s.h3;
        e = s.h4;
        f = s.h5;
        g = s.h6;
        h = s.h7;
        for (i = 0; i < 64; ++i) {
          s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
          ch = g ^ e & (f ^ g);
          s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
          maj = a & b | c & (a ^ b);
          t1 = h + s1 + ch + _k[i] + w[i];
          t2 = s0 + maj;
          h = g;
          g = f;
          f = e;
          e = d + t1 >>> 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 >>> 0;
        }
        s.h0 = s.h0 + a | 0;
        s.h1 = s.h1 + b | 0;
        s.h2 = s.h2 + c | 0;
        s.h3 = s.h3 + d | 0;
        s.h4 = s.h4 + e | 0;
        s.h5 = s.h5 + f | 0;
        s.h6 = s.h6 + g | 0;
        s.h7 = s.h7 + h | 0;
        len -= 64;
      }
    }
  }
});

// node_modules/node-forge/lib/prng.js
var require_prng = __commonJS({
  "node_modules/node-forge/lib/prng.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    var _crypto = null;
    if (forge5.util.isNodejs && !forge5.options.usePureJavaScript && !process.versions["node-webkit"]) {
      _crypto = require("crypto");
    }
    var prng = module2.exports = forge5.prng = forge5.prng || {};
    prng.create = function(plugin) {
      var ctx = {
        plugin,
        key: null,
        seed: null,
        time: null,
        reseeds: 0,
        generated: 0,
        keyBytes: ""
      };
      var md = plugin.md;
      var pools = new Array(32);
      for (var i = 0; i < 32; ++i) {
        pools[i] = md.create();
      }
      ctx.pools = pools;
      ctx.pool = 0;
      ctx.generate = function(count, callback) {
        if (!callback) {
          return ctx.generateSync(count);
        }
        var cipher = ctx.plugin.cipher;
        var increment = ctx.plugin.increment;
        var formatKey = ctx.plugin.formatKey;
        var formatSeed = ctx.plugin.formatSeed;
        var b = forge5.util.createBuffer();
        ctx.key = null;
        generate2();
        function generate2(err) {
          if (err) {
            return callback(err);
          }
          if (b.length() >= count) {
            return callback(null, b.getBytes(count));
          }
          if (ctx.generated > 1048575) {
            ctx.key = null;
          }
          if (ctx.key === null) {
            return forge5.util.nextTick(function() {
              _reseed(generate2);
            });
          }
          var bytes = cipher(ctx.key, ctx.seed);
          ctx.generated += bytes.length;
          b.putBytes(bytes);
          ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
          ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));
          forge5.util.setImmediate(generate2);
        }
      };
      ctx.generateSync = function(count) {
        var cipher = ctx.plugin.cipher;
        var increment = ctx.plugin.increment;
        var formatKey = ctx.plugin.formatKey;
        var formatSeed = ctx.plugin.formatSeed;
        ctx.key = null;
        var b = forge5.util.createBuffer();
        while (b.length() < count) {
          if (ctx.generated > 1048575) {
            ctx.key = null;
          }
          if (ctx.key === null) {
            _reseedSync();
          }
          var bytes = cipher(ctx.key, ctx.seed);
          ctx.generated += bytes.length;
          b.putBytes(bytes);
          ctx.key = formatKey(cipher(ctx.key, increment(ctx.seed)));
          ctx.seed = formatSeed(cipher(ctx.key, ctx.seed));
        }
        return b.getBytes(count);
      };
      function _reseed(callback) {
        if (ctx.pools[0].messageLength >= 32) {
          _seed();
          return callback();
        }
        var needed = 32 - ctx.pools[0].messageLength << 5;
        ctx.seedFile(needed, function(err, bytes) {
          if (err) {
            return callback(err);
          }
          ctx.collect(bytes);
          _seed();
          callback();
        });
      }
      function _reseedSync() {
        if (ctx.pools[0].messageLength >= 32) {
          return _seed();
        }
        var needed = 32 - ctx.pools[0].messageLength << 5;
        ctx.collect(ctx.seedFileSync(needed));
        _seed();
      }
      function _seed() {
        ctx.reseeds = ctx.reseeds === 4294967295 ? 0 : ctx.reseeds + 1;
        var md2 = ctx.plugin.md.create();
        md2.update(ctx.keyBytes);
        var _2powK = 1;
        for (var k = 0; k < 32; ++k) {
          if (ctx.reseeds % _2powK === 0) {
            md2.update(ctx.pools[k].digest().getBytes());
            ctx.pools[k].start();
          }
          _2powK = _2powK << 1;
        }
        ctx.keyBytes = md2.digest().getBytes();
        md2.start();
        md2.update(ctx.keyBytes);
        var seedBytes = md2.digest().getBytes();
        ctx.key = ctx.plugin.formatKey(ctx.keyBytes);
        ctx.seed = ctx.plugin.formatSeed(seedBytes);
        ctx.generated = 0;
      }
      function defaultSeedFile(needed) {
        var getRandomValues = null;
        var globalScope = forge5.util.globalScope;
        var _crypto2 = globalScope.crypto || globalScope.msCrypto;
        if (_crypto2 && _crypto2.getRandomValues) {
          getRandomValues = function(arr) {
            return _crypto2.getRandomValues(arr);
          };
        }
        var b = forge5.util.createBuffer();
        if (getRandomValues) {
          while (b.length() < needed) {
            var count = Math.max(1, Math.min(needed - b.length(), 65536) / 4);
            var entropy = new Uint32Array(Math.floor(count));
            try {
              getRandomValues(entropy);
              for (var i2 = 0; i2 < entropy.length; ++i2) {
                b.putInt32(entropy[i2]);
              }
            } catch (e) {
              if (!(typeof QuotaExceededError !== "undefined" && e instanceof QuotaExceededError)) {
                throw e;
              }
            }
          }
        }
        if (b.length() < needed) {
          var hi, lo, next;
          var seed = Math.floor(Math.random() * 65536);
          while (b.length() < needed) {
            lo = 16807 * (seed & 65535);
            hi = 16807 * (seed >> 16);
            lo += (hi & 32767) << 16;
            lo += hi >> 15;
            lo = (lo & 2147483647) + (lo >> 31);
            seed = lo & 4294967295;
            for (var i2 = 0; i2 < 3; ++i2) {
              next = seed >>> (i2 << 3);
              next ^= Math.floor(Math.random() * 256);
              b.putByte(next & 255);
            }
          }
        }
        return b.getBytes(needed);
      }
      if (_crypto) {
        ctx.seedFile = function(needed, callback) {
          _crypto.randomBytes(needed, function(err, bytes) {
            if (err) {
              return callback(err);
            }
            callback(null, bytes.toString());
          });
        };
        ctx.seedFileSync = function(needed) {
          return _crypto.randomBytes(needed).toString();
        };
      } else {
        ctx.seedFile = function(needed, callback) {
          try {
            callback(null, defaultSeedFile(needed));
          } catch (e) {
            callback(e);
          }
        };
        ctx.seedFileSync = defaultSeedFile;
      }
      ctx.collect = function(bytes) {
        var count = bytes.length;
        for (var i2 = 0; i2 < count; ++i2) {
          ctx.pools[ctx.pool].update(bytes.substr(i2, 1));
          ctx.pool = ctx.pool === 31 ? 0 : ctx.pool + 1;
        }
      };
      ctx.collectInt = function(i2, n) {
        var bytes = "";
        for (var x = 0; x < n; x += 8) {
          bytes += String.fromCharCode(i2 >> x & 255);
        }
        ctx.collect(bytes);
      };
      ctx.registerWorker = function(worker) {
        if (worker === self) {
          ctx.seedFile = function(needed, callback) {
            function listener2(e) {
              var data = e.data;
              if (data.forge && data.forge.prng) {
                self.removeEventListener("message", listener2);
                callback(data.forge.prng.err, data.forge.prng.bytes);
              }
            }
            self.addEventListener("message", listener2);
            self.postMessage({ forge: { prng: { needed } } });
          };
        } else {
          var listener = function(e) {
            var data = e.data;
            if (data.forge && data.forge.prng) {
              ctx.seedFile(data.forge.prng.needed, function(err, bytes) {
                worker.postMessage({ forge: { prng: { err, bytes } } });
              });
            }
          };
          worker.addEventListener("message", listener);
        }
      };
      return ctx;
    };
  }
});

// node_modules/node-forge/lib/random.js
var require_random = __commonJS({
  "node_modules/node-forge/lib/random.js"(exports2, module2) {
    var forge5 = require_forge();
    require_aes();
    require_sha256();
    require_prng();
    require_util2();
    (function() {
      if (forge5.random && forge5.random.getBytes) {
        module2.exports = forge5.random;
        return;
      }
      (function(jQuery2) {
        var prng_aes = {};
        var _prng_aes_output = new Array(4);
        var _prng_aes_buffer = forge5.util.createBuffer();
        prng_aes.formatKey = function(key2) {
          var tmp = forge5.util.createBuffer(key2);
          key2 = new Array(4);
          key2[0] = tmp.getInt32();
          key2[1] = tmp.getInt32();
          key2[2] = tmp.getInt32();
          key2[3] = tmp.getInt32();
          return forge5.aes._expandKey(key2, false);
        };
        prng_aes.formatSeed = function(seed) {
          var tmp = forge5.util.createBuffer(seed);
          seed = new Array(4);
          seed[0] = tmp.getInt32();
          seed[1] = tmp.getInt32();
          seed[2] = tmp.getInt32();
          seed[3] = tmp.getInt32();
          return seed;
        };
        prng_aes.cipher = function(key2, seed) {
          forge5.aes._updateBlock(key2, seed, _prng_aes_output, false);
          _prng_aes_buffer.putInt32(_prng_aes_output[0]);
          _prng_aes_buffer.putInt32(_prng_aes_output[1]);
          _prng_aes_buffer.putInt32(_prng_aes_output[2]);
          _prng_aes_buffer.putInt32(_prng_aes_output[3]);
          return _prng_aes_buffer.getBytes();
        };
        prng_aes.increment = function(seed) {
          ++seed[3];
          return seed;
        };
        prng_aes.md = forge5.md.sha256;
        function spawnPrng() {
          var ctx = forge5.prng.create(prng_aes);
          ctx.getBytes = function(count, callback) {
            return ctx.generate(count, callback);
          };
          ctx.getBytesSync = function(count) {
            return ctx.generate(count);
          };
          return ctx;
        }
        var _ctx = spawnPrng();
        var getRandomValues = null;
        var globalScope = forge5.util.globalScope;
        var _crypto = globalScope.crypto || globalScope.msCrypto;
        if (_crypto && _crypto.getRandomValues) {
          getRandomValues = function(arr) {
            return _crypto.getRandomValues(arr);
          };
        }
        if (forge5.options.usePureJavaScript || !forge5.util.isNodejs && !getRandomValues) {
          if (typeof window === "undefined" || window.document === void 0) {
          }
          _ctx.collectInt(+new Date(), 32);
          if (typeof navigator !== "undefined") {
            var _navBytes = "";
            for (var key in navigator) {
              try {
                if (typeof navigator[key] == "string") {
                  _navBytes += navigator[key];
                }
              } catch (e) {
              }
            }
            _ctx.collect(_navBytes);
            _navBytes = null;
          }
          if (jQuery2) {
            jQuery2().mousemove(function(e) {
              _ctx.collectInt(e.clientX, 16);
              _ctx.collectInt(e.clientY, 16);
            });
            jQuery2().keypress(function(e) {
              _ctx.collectInt(e.charCode, 8);
            });
          }
        }
        if (!forge5.random) {
          forge5.random = _ctx;
        } else {
          for (var key in _ctx) {
            forge5.random[key] = _ctx[key];
          }
        }
        forge5.random.createInstance = spawnPrng;
        module2.exports = forge5.random;
      })(typeof jQuery !== "undefined" ? jQuery : null);
    })();
  }
});

// node_modules/node-forge/lib/rc2.js
var require_rc2 = __commonJS({
  "node_modules/node-forge/lib/rc2.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    var piTable = [
      217,
      120,
      249,
      196,
      25,
      221,
      181,
      237,
      40,
      233,
      253,
      121,
      74,
      160,
      216,
      157,
      198,
      126,
      55,
      131,
      43,
      118,
      83,
      142,
      98,
      76,
      100,
      136,
      68,
      139,
      251,
      162,
      23,
      154,
      89,
      245,
      135,
      179,
      79,
      19,
      97,
      69,
      109,
      141,
      9,
      129,
      125,
      50,
      189,
      143,
      64,
      235,
      134,
      183,
      123,
      11,
      240,
      149,
      33,
      34,
      92,
      107,
      78,
      130,
      84,
      214,
      101,
      147,
      206,
      96,
      178,
      28,
      115,
      86,
      192,
      20,
      167,
      140,
      241,
      220,
      18,
      117,
      202,
      31,
      59,
      190,
      228,
      209,
      66,
      61,
      212,
      48,
      163,
      60,
      182,
      38,
      111,
      191,
      14,
      218,
      70,
      105,
      7,
      87,
      39,
      242,
      29,
      155,
      188,
      148,
      67,
      3,
      248,
      17,
      199,
      246,
      144,
      239,
      62,
      231,
      6,
      195,
      213,
      47,
      200,
      102,
      30,
      215,
      8,
      232,
      234,
      222,
      128,
      82,
      238,
      247,
      132,
      170,
      114,
      172,
      53,
      77,
      106,
      42,
      150,
      26,
      210,
      113,
      90,
      21,
      73,
      116,
      75,
      159,
      208,
      94,
      4,
      24,
      164,
      236,
      194,
      224,
      65,
      110,
      15,
      81,
      203,
      204,
      36,
      145,
      175,
      80,
      161,
      244,
      112,
      57,
      153,
      124,
      58,
      133,
      35,
      184,
      180,
      122,
      252,
      2,
      54,
      91,
      37,
      85,
      151,
      49,
      45,
      93,
      250,
      152,
      227,
      138,
      146,
      174,
      5,
      223,
      41,
      16,
      103,
      108,
      186,
      201,
      211,
      0,
      230,
      207,
      225,
      158,
      168,
      44,
      99,
      22,
      1,
      63,
      88,
      226,
      137,
      169,
      13,
      56,
      52,
      27,
      171,
      51,
      255,
      176,
      187,
      72,
      12,
      95,
      185,
      177,
      205,
      46,
      197,
      243,
      219,
      71,
      229,
      165,
      156,
      119,
      10,
      166,
      32,
      104,
      254,
      127,
      193,
      173
    ];
    var s = [1, 2, 3, 5];
    var rol = function(word, bits) {
      return word << bits & 65535 | (word & 65535) >> 16 - bits;
    };
    var ror = function(word, bits) {
      return (word & 65535) >> bits | word << 16 - bits & 65535;
    };
    module2.exports = forge5.rc2 = forge5.rc2 || {};
    forge5.rc2.expandKey = function(key, effKeyBits) {
      if (typeof key === "string") {
        key = forge5.util.createBuffer(key);
      }
      effKeyBits = effKeyBits || 128;
      var L = key;
      var T = key.length();
      var T1 = effKeyBits;
      var T8 = Math.ceil(T1 / 8);
      var TM = 255 >> (T1 & 7);
      var i;
      for (i = T; i < 128; i++) {
        L.putByte(piTable[L.at(i - 1) + L.at(i - T) & 255]);
      }
      L.setAt(128 - T8, piTable[L.at(128 - T8) & TM]);
      for (i = 127 - T8; i >= 0; i--) {
        L.setAt(i, piTable[L.at(i + 1) ^ L.at(i + T8)]);
      }
      return L;
    };
    var createCipher = function(key, bits, encrypt2) {
      var _finish = false, _input = null, _output = null, _iv = null;
      var mixRound, mashRound;
      var i, j, K = [];
      key = forge5.rc2.expandKey(key, bits);
      for (i = 0; i < 64; i++) {
        K.push(key.getInt16Le());
      }
      if (encrypt2) {
        mixRound = function(R) {
          for (i = 0; i < 4; i++) {
            R[i] += K[j] + (R[(i + 3) % 4] & R[(i + 2) % 4]) + (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            R[i] = rol(R[i], s[i]);
            j++;
          }
        };
        mashRound = function(R) {
          for (i = 0; i < 4; i++) {
            R[i] += K[R[(i + 3) % 4] & 63];
          }
        };
      } else {
        mixRound = function(R) {
          for (i = 3; i >= 0; i--) {
            R[i] = ror(R[i], s[i]);
            R[i] -= K[j] + (R[(i + 3) % 4] & R[(i + 2) % 4]) + (~R[(i + 3) % 4] & R[(i + 1) % 4]);
            j--;
          }
        };
        mashRound = function(R) {
          for (i = 3; i >= 0; i--) {
            R[i] -= K[R[(i + 3) % 4] & 63];
          }
        };
      }
      var runPlan = function(plan) {
        var R = [];
        for (i = 0; i < 4; i++) {
          var val = _input.getInt16Le();
          if (_iv !== null) {
            if (encrypt2) {
              val ^= _iv.getInt16Le();
            } else {
              _iv.putInt16Le(val);
            }
          }
          R.push(val & 65535);
        }
        j = encrypt2 ? 0 : 63;
        for (var ptr = 0; ptr < plan.length; ptr++) {
          for (var ctr = 0; ctr < plan[ptr][0]; ctr++) {
            plan[ptr][1](R);
          }
        }
        for (i = 0; i < 4; i++) {
          if (_iv !== null) {
            if (encrypt2) {
              _iv.putInt16Le(R[i]);
            } else {
              R[i] ^= _iv.getInt16Le();
            }
          }
          _output.putInt16Le(R[i]);
        }
      };
      var cipher = null;
      cipher = {
        start: function(iv, output) {
          if (iv) {
            if (typeof iv === "string") {
              iv = forge5.util.createBuffer(iv);
            }
          }
          _finish = false;
          _input = forge5.util.createBuffer();
          _output = output || new forge5.util.createBuffer();
          _iv = iv;
          cipher.output = _output;
        },
        update: function(input) {
          if (!_finish) {
            _input.putBuffer(input);
          }
          while (_input.length() >= 8) {
            runPlan([
              [5, mixRound],
              [1, mashRound],
              [6, mixRound],
              [1, mashRound],
              [5, mixRound]
            ]);
          }
        },
        finish: function(pad) {
          var rval = true;
          if (encrypt2) {
            if (pad) {
              rval = pad(8, _input, !encrypt2);
            } else {
              var padding2 = _input.length() === 8 ? 8 : 8 - _input.length();
              _input.fillWithByte(padding2, padding2);
            }
          }
          if (rval) {
            _finish = true;
            cipher.update();
          }
          if (!encrypt2) {
            rval = _input.length() === 0;
            if (rval) {
              if (pad) {
                rval = pad(8, _output, !encrypt2);
              } else {
                var len = _output.length();
                var count = _output.at(len - 1);
                if (count > len) {
                  rval = false;
                } else {
                  _output.truncate(count);
                }
              }
            }
          }
          return rval;
        }
      };
      return cipher;
    };
    forge5.rc2.startEncrypting = function(key, iv, output) {
      var cipher = forge5.rc2.createEncryptionCipher(key, 128);
      cipher.start(iv, output);
      return cipher;
    };
    forge5.rc2.createEncryptionCipher = function(key, bits) {
      return createCipher(key, bits, true);
    };
    forge5.rc2.startDecrypting = function(key, iv, output) {
      var cipher = forge5.rc2.createDecryptionCipher(key, 128);
      cipher.start(iv, output);
      return cipher;
    };
    forge5.rc2.createDecryptionCipher = function(key, bits) {
      return createCipher(key, bits, false);
    };
  }
});

// node_modules/node-forge/lib/jsbn.js
var require_jsbn = __commonJS({
  "node_modules/node-forge/lib/jsbn.js"(exports2, module2) {
    var forge5 = require_forge();
    module2.exports = forge5.jsbn = forge5.jsbn || {};
    var dbits;
    var canary = 244837814094590;
    var j_lm = (canary & 16777215) == 15715070;
    function BigInteger(a, b, c) {
      this.data = [];
      if (a != null)
        if ("number" == typeof a)
          this.fromNumber(a, b, c);
        else if (b == null && "string" != typeof a)
          this.fromString(a, 256);
        else
          this.fromString(a, b);
    }
    forge5.jsbn.BigInteger = BigInteger;
    function nbi() {
      return new BigInteger(null);
    }
    function am1(i, x, w, j, c, n) {
      while (--n >= 0) {
        var v = x * this.data[i++] + w.data[j] + c;
        c = Math.floor(v / 67108864);
        w.data[j++] = v & 67108863;
      }
      return c;
    }
    function am2(i, x, w, j, c, n) {
      var xl = x & 32767, xh = x >> 15;
      while (--n >= 0) {
        var l = this.data[i] & 32767;
        var h = this.data[i++] >> 15;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 32767) << 15) + w.data[j] + (c & 1073741823);
        c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
        w.data[j++] = l & 1073741823;
      }
      return c;
    }
    function am3(i, x, w, j, c, n) {
      var xl = x & 16383, xh = x >> 14;
      while (--n >= 0) {
        var l = this.data[i] & 16383;
        var h = this.data[i++] >> 14;
        var m = xh * l + h * xl;
        l = xl * l + ((m & 16383) << 14) + w.data[j] + c;
        c = (l >> 28) + (m >> 14) + xh * h;
        w.data[j++] = l & 268435455;
      }
      return c;
    }
    if (typeof navigator === "undefined") {
      BigInteger.prototype.am = am3;
      dbits = 28;
    } else if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
      BigInteger.prototype.am = am2;
      dbits = 30;
    } else if (j_lm && navigator.appName != "Netscape") {
      BigInteger.prototype.am = am1;
      dbits = 26;
    } else {
      BigInteger.prototype.am = am3;
      dbits = 28;
    }
    BigInteger.prototype.DB = dbits;
    BigInteger.prototype.DM = (1 << dbits) - 1;
    BigInteger.prototype.DV = 1 << dbits;
    var BI_FP = 52;
    BigInteger.prototype.FV = Math.pow(2, BI_FP);
    BigInteger.prototype.F1 = BI_FP - dbits;
    BigInteger.prototype.F2 = 2 * dbits - BI_FP;
    var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
    var BI_RC = new Array();
    var rr;
    var vv;
    rr = "0".charCodeAt(0);
    for (vv = 0; vv <= 9; ++vv)
      BI_RC[rr++] = vv;
    rr = "a".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    rr = "A".charCodeAt(0);
    for (vv = 10; vv < 36; ++vv)
      BI_RC[rr++] = vv;
    function int2char(n) {
      return BI_RM.charAt(n);
    }
    function intAt(s, i) {
      var c = BI_RC[s.charCodeAt(i)];
      return c == null ? -1 : c;
    }
    function bnpCopyTo(r) {
      for (var i = this.t - 1; i >= 0; --i)
        r.data[i] = this.data[i];
      r.t = this.t;
      r.s = this.s;
    }
    function bnpFromInt(x) {
      this.t = 1;
      this.s = x < 0 ? -1 : 0;
      if (x > 0)
        this.data[0] = x;
      else if (x < -1)
        this.data[0] = x + this.DV;
      else
        this.t = 0;
    }
    function nbv(i) {
      var r = nbi();
      r.fromInt(i);
      return r;
    }
    function bnpFromString(s, b) {
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 256)
        k = 8;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else {
        this.fromRadix(s, b);
        return;
      }
      this.t = 0;
      this.s = 0;
      var i = s.length, mi = false, sh = 0;
      while (--i >= 0) {
        var x = k == 8 ? s[i] & 255 : intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-")
            mi = true;
          continue;
        }
        mi = false;
        if (sh == 0)
          this.data[this.t++] = x;
        else if (sh + k > this.DB) {
          this.data[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
          this.data[this.t++] = x >> this.DB - sh;
        } else
          this.data[this.t - 1] |= x << sh;
        sh += k;
        if (sh >= this.DB)
          sh -= this.DB;
      }
      if (k == 8 && (s[0] & 128) != 0) {
        this.s = -1;
        if (sh > 0)
          this.data[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
      }
      this.clamp();
      if (mi)
        BigInteger.ZERO.subTo(this, this);
    }
    function bnpClamp() {
      var c = this.s & this.DM;
      while (this.t > 0 && this.data[this.t - 1] == c)
        --this.t;
    }
    function bnToString(b) {
      if (this.s < 0)
        return "-" + this.negate().toString(b);
      var k;
      if (b == 16)
        k = 4;
      else if (b == 8)
        k = 3;
      else if (b == 2)
        k = 1;
      else if (b == 32)
        k = 5;
      else if (b == 4)
        k = 2;
      else
        return this.toRadix(b);
      var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
      var p = this.DB - i * this.DB % k;
      if (i-- > 0) {
        if (p < this.DB && (d = this.data[i] >> p) > 0) {
          m = true;
          r = int2char(d);
        }
        while (i >= 0) {
          if (p < k) {
            d = (this.data[i] & (1 << p) - 1) << k - p;
            d |= this.data[--i] >> (p += this.DB - k);
          } else {
            d = this.data[i] >> (p -= k) & km;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if (d > 0)
            m = true;
          if (m)
            r += int2char(d);
        }
      }
      return m ? r : "0";
    }
    function bnNegate() {
      var r = nbi();
      BigInteger.ZERO.subTo(this, r);
      return r;
    }
    function bnAbs() {
      return this.s < 0 ? this.negate() : this;
    }
    function bnCompareTo(a) {
      var r = this.s - a.s;
      if (r != 0)
        return r;
      var i = this.t;
      r = i - a.t;
      if (r != 0)
        return this.s < 0 ? -r : r;
      while (--i >= 0)
        if ((r = this.data[i] - a.data[i]) != 0)
          return r;
      return 0;
    }
    function nbits(x) {
      var r = 1, t;
      if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
      }
      if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
      }
      if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
      }
      if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
      }
      if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
      }
      return r;
    }
    function bnBitLength() {
      if (this.t <= 0)
        return 0;
      return this.DB * (this.t - 1) + nbits(this.data[this.t - 1] ^ this.s & this.DM);
    }
    function bnpDLShiftTo(n, r) {
      var i;
      for (i = this.t - 1; i >= 0; --i)
        r.data[i + n] = this.data[i];
      for (i = n - 1; i >= 0; --i)
        r.data[i] = 0;
      r.t = this.t + n;
      r.s = this.s;
    }
    function bnpDRShiftTo(n, r) {
      for (var i = n; i < this.t; ++i)
        r.data[i - n] = this.data[i];
      r.t = Math.max(this.t - n, 0);
      r.s = this.s;
    }
    function bnpLShiftTo(n, r) {
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << cbs) - 1;
      var ds = Math.floor(n / this.DB), c = this.s << bs & this.DM, i;
      for (i = this.t - 1; i >= 0; --i) {
        r.data[i + ds + 1] = this.data[i] >> cbs | c;
        c = (this.data[i] & bm) << bs;
      }
      for (i = ds - 1; i >= 0; --i)
        r.data[i] = 0;
      r.data[ds] = c;
      r.t = this.t + ds + 1;
      r.s = this.s;
      r.clamp();
    }
    function bnpRShiftTo(n, r) {
      r.s = this.s;
      var ds = Math.floor(n / this.DB);
      if (ds >= this.t) {
        r.t = 0;
        return;
      }
      var bs = n % this.DB;
      var cbs = this.DB - bs;
      var bm = (1 << bs) - 1;
      r.data[0] = this.data[ds] >> bs;
      for (var i = ds + 1; i < this.t; ++i) {
        r.data[i - ds - 1] |= (this.data[i] & bm) << cbs;
        r.data[i - ds] = this.data[i] >> bs;
      }
      if (bs > 0)
        r.data[this.t - ds - 1] |= (this.s & bm) << cbs;
      r.t = this.t - ds;
      r.clamp();
    }
    function bnpSubTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this.data[i] - a.data[i];
        r.data[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c -= a.s;
        while (i < this.t) {
          c += this.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c -= a.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c -= a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c < -1)
        r.data[i++] = this.DV + c;
      else if (c > 0)
        r.data[i++] = c;
      r.t = i;
      r.clamp();
    }
    function bnpMultiplyTo(a, r) {
      var x = this.abs(), y = a.abs();
      var i = x.t;
      r.t = i + y.t;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = 0; i < y.t; ++i)
        r.data[i + x.t] = x.am(0, y.data[i], r, i, 0, x.t);
      r.s = 0;
      r.clamp();
      if (this.s != a.s)
        BigInteger.ZERO.subTo(r, r);
    }
    function bnpSquareTo(r) {
      var x = this.abs();
      var i = r.t = 2 * x.t;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = 0; i < x.t - 1; ++i) {
        var c = x.am(i, x.data[i], r, 2 * i, 0, 1);
        if ((r.data[i + x.t] += x.am(i + 1, 2 * x.data[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
          r.data[i + x.t] -= x.DV;
          r.data[i + x.t + 1] = 1;
        }
      }
      if (r.t > 0)
        r.data[r.t - 1] += x.am(i, x.data[i], r, 2 * i, 0, 1);
      r.s = 0;
      r.clamp();
    }
    function bnpDivRemTo(m, q, r) {
      var pm = m.abs();
      if (pm.t <= 0)
        return;
      var pt = this.abs();
      if (pt.t < pm.t) {
        if (q != null)
          q.fromInt(0);
        if (r != null)
          this.copyTo(r);
        return;
      }
      if (r == null)
        r = nbi();
      var y = nbi(), ts = this.s, ms = m.s;
      var nsh = this.DB - nbits(pm.data[pm.t - 1]);
      if (nsh > 0) {
        pm.lShiftTo(nsh, y);
        pt.lShiftTo(nsh, r);
      } else {
        pm.copyTo(y);
        pt.copyTo(r);
      }
      var ys = y.t;
      var y0 = y.data[ys - 1];
      if (y0 == 0)
        return;
      var yt = y0 * (1 << this.F1) + (ys > 1 ? y.data[ys - 2] >> this.F2 : 0);
      var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
      var i = r.t, j = i - ys, t = q == null ? nbi() : q;
      y.dlShiftTo(j, t);
      if (r.compareTo(t) >= 0) {
        r.data[r.t++] = 1;
        r.subTo(t, r);
      }
      BigInteger.ONE.dlShiftTo(ys, t);
      t.subTo(y, y);
      while (y.t < ys)
        y.data[y.t++] = 0;
      while (--j >= 0) {
        var qd = r.data[--i] == y0 ? this.DM : Math.floor(r.data[i] * d1 + (r.data[i - 1] + e) * d2);
        if ((r.data[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
          y.dlShiftTo(j, t);
          r.subTo(t, r);
          while (r.data[i] < --qd)
            r.subTo(t, r);
        }
      }
      if (q != null) {
        r.drShiftTo(ys, q);
        if (ts != ms)
          BigInteger.ZERO.subTo(q, q);
      }
      r.t = ys;
      r.clamp();
      if (nsh > 0)
        r.rShiftTo(nsh, r);
      if (ts < 0)
        BigInteger.ZERO.subTo(r, r);
    }
    function bnMod(a) {
      var r = nbi();
      this.abs().divRemTo(a, null, r);
      if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        a.subTo(r, r);
      return r;
    }
    function Classic(m) {
      this.m = m;
    }
    function cConvert(x) {
      if (x.s < 0 || x.compareTo(this.m) >= 0)
        return x.mod(this.m);
      else
        return x;
    }
    function cRevert(x) {
      return x;
    }
    function cReduce(x) {
      x.divRemTo(this.m, null, x);
    }
    function cMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    function cSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    Classic.prototype.convert = cConvert;
    Classic.prototype.revert = cRevert;
    Classic.prototype.reduce = cReduce;
    Classic.prototype.mulTo = cMulTo;
    Classic.prototype.sqrTo = cSqrTo;
    function bnpInvDigit() {
      if (this.t < 1)
        return 0;
      var x = this.data[0];
      if ((x & 1) == 0)
        return 0;
      var y = x & 3;
      y = y * (2 - (x & 15) * y) & 15;
      y = y * (2 - (x & 255) * y) & 255;
      y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
      y = y * (2 - x * y % this.DV) % this.DV;
      return y > 0 ? this.DV - y : -y;
    }
    function Montgomery(m) {
      this.m = m;
      this.mp = m.invDigit();
      this.mpl = this.mp & 32767;
      this.mph = this.mp >> 15;
      this.um = (1 << m.DB - 15) - 1;
      this.mt2 = 2 * m.t;
    }
    function montConvert(x) {
      var r = nbi();
      x.abs().dlShiftTo(this.m.t, r);
      r.divRemTo(this.m, null, r);
      if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(r, r);
      return r;
    }
    function montRevert(x) {
      var r = nbi();
      x.copyTo(r);
      this.reduce(r);
      return r;
    }
    function montReduce(x) {
      while (x.t <= this.mt2)
        x.data[x.t++] = 0;
      for (var i = 0; i < this.m.t; ++i) {
        var j = x.data[i] & 32767;
        var u0 = j * this.mpl + ((j * this.mph + (x.data[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
        j = i + this.m.t;
        x.data[j] += this.m.am(0, u0, x, i, 0, this.m.t);
        while (x.data[j] >= x.DV) {
          x.data[j] -= x.DV;
          x.data[++j]++;
        }
      }
      x.clamp();
      x.drShiftTo(this.m.t, x);
      if (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function montSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function montMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Montgomery.prototype.convert = montConvert;
    Montgomery.prototype.revert = montRevert;
    Montgomery.prototype.reduce = montReduce;
    Montgomery.prototype.mulTo = montMulTo;
    Montgomery.prototype.sqrTo = montSqrTo;
    function bnpIsEven() {
      return (this.t > 0 ? this.data[0] & 1 : this.s) == 0;
    }
    function bnpExp(e, z) {
      if (e > 4294967295 || e < 1)
        return BigInteger.ONE;
      var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
      g.copyTo(r);
      while (--i >= 0) {
        z.sqrTo(r, r2);
        if ((e & 1 << i) > 0)
          z.mulTo(r2, g, r);
        else {
          var t = r;
          r = r2;
          r2 = t;
        }
      }
      return z.revert(r);
    }
    function bnModPowInt(e, m) {
      var z;
      if (e < 256 || m.isEven())
        z = new Classic(m);
      else
        z = new Montgomery(m);
      return this.exp(e, z);
    }
    BigInteger.prototype.copyTo = bnpCopyTo;
    BigInteger.prototype.fromInt = bnpFromInt;
    BigInteger.prototype.fromString = bnpFromString;
    BigInteger.prototype.clamp = bnpClamp;
    BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
    BigInteger.prototype.drShiftTo = bnpDRShiftTo;
    BigInteger.prototype.lShiftTo = bnpLShiftTo;
    BigInteger.prototype.rShiftTo = bnpRShiftTo;
    BigInteger.prototype.subTo = bnpSubTo;
    BigInteger.prototype.multiplyTo = bnpMultiplyTo;
    BigInteger.prototype.squareTo = bnpSquareTo;
    BigInteger.prototype.divRemTo = bnpDivRemTo;
    BigInteger.prototype.invDigit = bnpInvDigit;
    BigInteger.prototype.isEven = bnpIsEven;
    BigInteger.prototype.exp = bnpExp;
    BigInteger.prototype.toString = bnToString;
    BigInteger.prototype.negate = bnNegate;
    BigInteger.prototype.abs = bnAbs;
    BigInteger.prototype.compareTo = bnCompareTo;
    BigInteger.prototype.bitLength = bnBitLength;
    BigInteger.prototype.mod = bnMod;
    BigInteger.prototype.modPowInt = bnModPowInt;
    BigInteger.ZERO = nbv(0);
    BigInteger.ONE = nbv(1);
    function bnClone() {
      var r = nbi();
      this.copyTo(r);
      return r;
    }
    function bnIntValue() {
      if (this.s < 0) {
        if (this.t == 1)
          return this.data[0] - this.DV;
        else if (this.t == 0)
          return -1;
      } else if (this.t == 1)
        return this.data[0];
      else if (this.t == 0)
        return 0;
      return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0];
    }
    function bnByteValue() {
      return this.t == 0 ? this.s : this.data[0] << 24 >> 24;
    }
    function bnShortValue() {
      return this.t == 0 ? this.s : this.data[0] << 16 >> 16;
    }
    function bnpChunkSize(r) {
      return Math.floor(Math.LN2 * this.DB / Math.log(r));
    }
    function bnSigNum() {
      if (this.s < 0)
        return -1;
      else if (this.t <= 0 || this.t == 1 && this.data[0] <= 0)
        return 0;
      else
        return 1;
    }
    function bnpToRadix(b) {
      if (b == null)
        b = 10;
      if (this.signum() == 0 || b < 2 || b > 36)
        return "0";
      var cs = this.chunkSize(b);
      var a = Math.pow(b, cs);
      var d = nbv(a), y = nbi(), z = nbi(), r = "";
      this.divRemTo(d, y, z);
      while (y.signum() > 0) {
        r = (a + z.intValue()).toString(b).substr(1) + r;
        y.divRemTo(d, y, z);
      }
      return z.intValue().toString(b) + r;
    }
    function bnpFromRadix(s, b) {
      this.fromInt(0);
      if (b == null)
        b = 10;
      var cs = this.chunkSize(b);
      var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
      for (var i = 0; i < s.length; ++i) {
        var x = intAt(s, i);
        if (x < 0) {
          if (s.charAt(i) == "-" && this.signum() == 0)
            mi = true;
          continue;
        }
        w = b * w + x;
        if (++j >= cs) {
          this.dMultiply(d);
          this.dAddOffset(w, 0);
          j = 0;
          w = 0;
        }
      }
      if (j > 0) {
        this.dMultiply(Math.pow(b, j));
        this.dAddOffset(w, 0);
      }
      if (mi)
        BigInteger.ZERO.subTo(this, this);
    }
    function bnpFromNumber(a, b, c) {
      if ("number" == typeof b) {
        if (a < 2)
          this.fromInt(1);
        else {
          this.fromNumber(a, c);
          if (!this.testBit(a - 1))
            this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
          if (this.isEven())
            this.dAddOffset(1, 0);
          while (!this.isProbablePrime(b)) {
            this.dAddOffset(2, 0);
            if (this.bitLength() > a)
              this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
          }
        }
      } else {
        var x = new Array(), t = a & 7;
        x.length = (a >> 3) + 1;
        b.nextBytes(x);
        if (t > 0)
          x[0] &= (1 << t) - 1;
        else
          x[0] = 0;
        this.fromString(x, 256);
      }
    }
    function bnToByteArray() {
      var i = this.t, r = new Array();
      r[0] = this.s;
      var p = this.DB - i * this.DB % 8, d, k = 0;
      if (i-- > 0) {
        if (p < this.DB && (d = this.data[i] >> p) != (this.s & this.DM) >> p)
          r[k++] = d | this.s << this.DB - p;
        while (i >= 0) {
          if (p < 8) {
            d = (this.data[i] & (1 << p) - 1) << 8 - p;
            d |= this.data[--i] >> (p += this.DB - 8);
          } else {
            d = this.data[i] >> (p -= 8) & 255;
            if (p <= 0) {
              p += this.DB;
              --i;
            }
          }
          if ((d & 128) != 0)
            d |= -256;
          if (k == 0 && (this.s & 128) != (d & 128))
            ++k;
          if (k > 0 || d != this.s)
            r[k++] = d;
        }
      }
      return r;
    }
    function bnEquals(a) {
      return this.compareTo(a) == 0;
    }
    function bnMin(a) {
      return this.compareTo(a) < 0 ? this : a;
    }
    function bnMax(a) {
      return this.compareTo(a) > 0 ? this : a;
    }
    function bnpBitwiseTo(a, op, r) {
      var i, f, m = Math.min(a.t, this.t);
      for (i = 0; i < m; ++i)
        r.data[i] = op(this.data[i], a.data[i]);
      if (a.t < this.t) {
        f = a.s & this.DM;
        for (i = m; i < this.t; ++i)
          r.data[i] = op(this.data[i], f);
        r.t = this.t;
      } else {
        f = this.s & this.DM;
        for (i = m; i < a.t; ++i)
          r.data[i] = op(f, a.data[i]);
        r.t = a.t;
      }
      r.s = op(this.s, a.s);
      r.clamp();
    }
    function op_and(x, y) {
      return x & y;
    }
    function bnAnd(a) {
      var r = nbi();
      this.bitwiseTo(a, op_and, r);
      return r;
    }
    function op_or(x, y) {
      return x | y;
    }
    function bnOr(a) {
      var r = nbi();
      this.bitwiseTo(a, op_or, r);
      return r;
    }
    function op_xor(x, y) {
      return x ^ y;
    }
    function bnXor(a) {
      var r = nbi();
      this.bitwiseTo(a, op_xor, r);
      return r;
    }
    function op_andnot(x, y) {
      return x & ~y;
    }
    function bnAndNot(a) {
      var r = nbi();
      this.bitwiseTo(a, op_andnot, r);
      return r;
    }
    function bnNot() {
      var r = nbi();
      for (var i = 0; i < this.t; ++i)
        r.data[i] = this.DM & ~this.data[i];
      r.t = this.t;
      r.s = ~this.s;
      return r;
    }
    function bnShiftLeft(n) {
      var r = nbi();
      if (n < 0)
        this.rShiftTo(-n, r);
      else
        this.lShiftTo(n, r);
      return r;
    }
    function bnShiftRight(n) {
      var r = nbi();
      if (n < 0)
        this.lShiftTo(-n, r);
      else
        this.rShiftTo(n, r);
      return r;
    }
    function lbit(x) {
      if (x == 0)
        return -1;
      var r = 0;
      if ((x & 65535) == 0) {
        x >>= 16;
        r += 16;
      }
      if ((x & 255) == 0) {
        x >>= 8;
        r += 8;
      }
      if ((x & 15) == 0) {
        x >>= 4;
        r += 4;
      }
      if ((x & 3) == 0) {
        x >>= 2;
        r += 2;
      }
      if ((x & 1) == 0)
        ++r;
      return r;
    }
    function bnGetLowestSetBit() {
      for (var i = 0; i < this.t; ++i)
        if (this.data[i] != 0)
          return i * this.DB + lbit(this.data[i]);
      if (this.s < 0)
        return this.t * this.DB;
      return -1;
    }
    function cbit(x) {
      var r = 0;
      while (x != 0) {
        x &= x - 1;
        ++r;
      }
      return r;
    }
    function bnBitCount() {
      var r = 0, x = this.s & this.DM;
      for (var i = 0; i < this.t; ++i)
        r += cbit(this.data[i] ^ x);
      return r;
    }
    function bnTestBit(n) {
      var j = Math.floor(n / this.DB);
      if (j >= this.t)
        return this.s != 0;
      return (this.data[j] & 1 << n % this.DB) != 0;
    }
    function bnpChangeBit(n, op) {
      var r = BigInteger.ONE.shiftLeft(n);
      this.bitwiseTo(r, op, r);
      return r;
    }
    function bnSetBit(n) {
      return this.changeBit(n, op_or);
    }
    function bnClearBit(n) {
      return this.changeBit(n, op_andnot);
    }
    function bnFlipBit(n) {
      return this.changeBit(n, op_xor);
    }
    function bnpAddTo(a, r) {
      var i = 0, c = 0, m = Math.min(a.t, this.t);
      while (i < m) {
        c += this.data[i] + a.data[i];
        r.data[i++] = c & this.DM;
        c >>= this.DB;
      }
      if (a.t < this.t) {
        c += a.s;
        while (i < this.t) {
          c += this.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += this.s;
      } else {
        c += this.s;
        while (i < a.t) {
          c += a.data[i];
          r.data[i++] = c & this.DM;
          c >>= this.DB;
        }
        c += a.s;
      }
      r.s = c < 0 ? -1 : 0;
      if (c > 0)
        r.data[i++] = c;
      else if (c < -1)
        r.data[i++] = this.DV + c;
      r.t = i;
      r.clamp();
    }
    function bnAdd(a) {
      var r = nbi();
      this.addTo(a, r);
      return r;
    }
    function bnSubtract(a) {
      var r = nbi();
      this.subTo(a, r);
      return r;
    }
    function bnMultiply(a) {
      var r = nbi();
      this.multiplyTo(a, r);
      return r;
    }
    function bnDivide(a) {
      var r = nbi();
      this.divRemTo(a, r, null);
      return r;
    }
    function bnRemainder(a) {
      var r = nbi();
      this.divRemTo(a, null, r);
      return r;
    }
    function bnDivideAndRemainder(a) {
      var q = nbi(), r = nbi();
      this.divRemTo(a, q, r);
      return new Array(q, r);
    }
    function bnpDMultiply(n) {
      this.data[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
      ++this.t;
      this.clamp();
    }
    function bnpDAddOffset(n, w) {
      if (n == 0)
        return;
      while (this.t <= w)
        this.data[this.t++] = 0;
      this.data[w] += n;
      while (this.data[w] >= this.DV) {
        this.data[w] -= this.DV;
        if (++w >= this.t)
          this.data[this.t++] = 0;
        ++this.data[w];
      }
    }
    function NullExp() {
    }
    function nNop(x) {
      return x;
    }
    function nMulTo(x, y, r) {
      x.multiplyTo(y, r);
    }
    function nSqrTo(x, r) {
      x.squareTo(r);
    }
    NullExp.prototype.convert = nNop;
    NullExp.prototype.revert = nNop;
    NullExp.prototype.mulTo = nMulTo;
    NullExp.prototype.sqrTo = nSqrTo;
    function bnPow(e) {
      return this.exp(e, new NullExp());
    }
    function bnpMultiplyLowerTo(a, n, r) {
      var i = Math.min(this.t + a.t, n);
      r.s = 0;
      r.t = i;
      while (i > 0)
        r.data[--i] = 0;
      var j;
      for (j = r.t - this.t; i < j; ++i)
        r.data[i + this.t] = this.am(0, a.data[i], r, i, 0, this.t);
      for (j = Math.min(a.t, n); i < j; ++i)
        this.am(0, a.data[i], r, i, 0, n - i);
      r.clamp();
    }
    function bnpMultiplyUpperTo(a, n, r) {
      --n;
      var i = r.t = this.t + a.t - n;
      r.s = 0;
      while (--i >= 0)
        r.data[i] = 0;
      for (i = Math.max(n - this.t, 0); i < a.t; ++i)
        r.data[this.t + i - n] = this.am(n - i, a.data[i], r, 0, 0, this.t + i - n);
      r.clamp();
      r.drShiftTo(1, r);
    }
    function Barrett(m) {
      this.r2 = nbi();
      this.q3 = nbi();
      BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
      this.mu = this.r2.divide(m);
      this.m = m;
    }
    function barrettConvert(x) {
      if (x.s < 0 || x.t > 2 * this.m.t)
        return x.mod(this.m);
      else if (x.compareTo(this.m) < 0)
        return x;
      else {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
    }
    function barrettRevert(x) {
      return x;
    }
    function barrettReduce(x) {
      x.drShiftTo(this.m.t - 1, this.r2);
      if (x.t > this.m.t + 1) {
        x.t = this.m.t + 1;
        x.clamp();
      }
      this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
      this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
      while (x.compareTo(this.r2) < 0)
        x.dAddOffset(1, this.m.t + 1);
      x.subTo(this.r2, x);
      while (x.compareTo(this.m) >= 0)
        x.subTo(this.m, x);
    }
    function barrettSqrTo(x, r) {
      x.squareTo(r);
      this.reduce(r);
    }
    function barrettMulTo(x, y, r) {
      x.multiplyTo(y, r);
      this.reduce(r);
    }
    Barrett.prototype.convert = barrettConvert;
    Barrett.prototype.revert = barrettRevert;
    Barrett.prototype.reduce = barrettReduce;
    Barrett.prototype.mulTo = barrettMulTo;
    Barrett.prototype.sqrTo = barrettSqrTo;
    function bnModPow(e, m) {
      var i = e.bitLength(), k, r = nbv(1), z;
      if (i <= 0)
        return r;
      else if (i < 18)
        k = 1;
      else if (i < 48)
        k = 3;
      else if (i < 144)
        k = 4;
      else if (i < 768)
        k = 5;
      else
        k = 6;
      if (i < 8)
        z = new Classic(m);
      else if (m.isEven())
        z = new Barrett(m);
      else
        z = new Montgomery(m);
      var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
      g[1] = z.convert(this);
      if (k > 1) {
        var g2 = nbi();
        z.sqrTo(g[1], g2);
        while (n <= km) {
          g[n] = nbi();
          z.mulTo(g2, g[n - 2], g[n]);
          n += 2;
        }
      }
      var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
      i = nbits(e.data[j]) - 1;
      while (j >= 0) {
        if (i >= k1)
          w = e.data[j] >> i - k1 & km;
        else {
          w = (e.data[j] & (1 << i + 1) - 1) << k1 - i;
          if (j > 0)
            w |= e.data[j - 1] >> this.DB + i - k1;
        }
        n = k;
        while ((w & 1) == 0) {
          w >>= 1;
          --n;
        }
        if ((i -= n) < 0) {
          i += this.DB;
          --j;
        }
        if (is1) {
          g[w].copyTo(r);
          is1 = false;
        } else {
          while (n > 1) {
            z.sqrTo(r, r2);
            z.sqrTo(r2, r);
            n -= 2;
          }
          if (n > 0)
            z.sqrTo(r, r2);
          else {
            t = r;
            r = r2;
            r2 = t;
          }
          z.mulTo(r2, g[w], r);
        }
        while (j >= 0 && (e.data[j] & 1 << i) == 0) {
          z.sqrTo(r, r2);
          t = r;
          r = r2;
          r2 = t;
          if (--i < 0) {
            i = this.DB - 1;
            --j;
          }
        }
      }
      return z.revert(r);
    }
    function bnGCD(a) {
      var x = this.s < 0 ? this.negate() : this.clone();
      var y = a.s < 0 ? a.negate() : a.clone();
      if (x.compareTo(y) < 0) {
        var t = x;
        x = y;
        y = t;
      }
      var i = x.getLowestSetBit(), g = y.getLowestSetBit();
      if (g < 0)
        return x;
      if (i < g)
        g = i;
      if (g > 0) {
        x.rShiftTo(g, x);
        y.rShiftTo(g, y);
      }
      while (x.signum() > 0) {
        if ((i = x.getLowestSetBit()) > 0)
          x.rShiftTo(i, x);
        if ((i = y.getLowestSetBit()) > 0)
          y.rShiftTo(i, y);
        if (x.compareTo(y) >= 0) {
          x.subTo(y, x);
          x.rShiftTo(1, x);
        } else {
          y.subTo(x, y);
          y.rShiftTo(1, y);
        }
      }
      if (g > 0)
        y.lShiftTo(g, y);
      return y;
    }
    function bnpModInt(n) {
      if (n <= 0)
        return 0;
      var d = this.DV % n, r = this.s < 0 ? n - 1 : 0;
      if (this.t > 0)
        if (d == 0)
          r = this.data[0] % n;
        else
          for (var i = this.t - 1; i >= 0; --i)
            r = (d * r + this.data[i]) % n;
      return r;
    }
    function bnModInverse(m) {
      var ac = m.isEven();
      if (this.isEven() && ac || m.signum() == 0)
        return BigInteger.ZERO;
      var u = m.clone(), v = this.clone();
      var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
      while (u.signum() != 0) {
        while (u.isEven()) {
          u.rShiftTo(1, u);
          if (ac) {
            if (!a.isEven() || !b.isEven()) {
              a.addTo(this, a);
              b.subTo(m, b);
            }
            a.rShiftTo(1, a);
          } else if (!b.isEven())
            b.subTo(m, b);
          b.rShiftTo(1, b);
        }
        while (v.isEven()) {
          v.rShiftTo(1, v);
          if (ac) {
            if (!c.isEven() || !d.isEven()) {
              c.addTo(this, c);
              d.subTo(m, d);
            }
            c.rShiftTo(1, c);
          } else if (!d.isEven())
            d.subTo(m, d);
          d.rShiftTo(1, d);
        }
        if (u.compareTo(v) >= 0) {
          u.subTo(v, u);
          if (ac)
            a.subTo(c, a);
          b.subTo(d, b);
        } else {
          v.subTo(u, v);
          if (ac)
            c.subTo(a, c);
          d.subTo(b, d);
        }
      }
      if (v.compareTo(BigInteger.ONE) != 0)
        return BigInteger.ZERO;
      if (d.compareTo(m) >= 0)
        return d.subtract(m);
      if (d.signum() < 0)
        d.addTo(m, d);
      else
        return d;
      if (d.signum() < 0)
        return d.add(m);
      else
        return d;
    }
    var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
    var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
    function bnIsProbablePrime(t) {
      var i, x = this.abs();
      if (x.t == 1 && x.data[0] <= lowprimes[lowprimes.length - 1]) {
        for (i = 0; i < lowprimes.length; ++i)
          if (x.data[0] == lowprimes[i])
            return true;
        return false;
      }
      if (x.isEven())
        return false;
      i = 1;
      while (i < lowprimes.length) {
        var m = lowprimes[i], j = i + 1;
        while (j < lowprimes.length && m < lplim)
          m *= lowprimes[j++];
        m = x.modInt(m);
        while (i < j)
          if (m % lowprimes[i++] == 0)
            return false;
      }
      return x.millerRabin(t);
    }
    function bnpMillerRabin(t) {
      var n1 = this.subtract(BigInteger.ONE);
      var k = n1.getLowestSetBit();
      if (k <= 0)
        return false;
      var r = n1.shiftRight(k);
      var prng = bnGetPrng();
      var a;
      for (var i = 0; i < t; ++i) {
        do {
          a = new BigInteger(this.bitLength(), prng);
        } while (a.compareTo(BigInteger.ONE) <= 0 || a.compareTo(n1) >= 0);
        var y = a.modPow(r, this);
        if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
          var j = 1;
          while (j++ < k && y.compareTo(n1) != 0) {
            y = y.modPowInt(2, this);
            if (y.compareTo(BigInteger.ONE) == 0)
              return false;
          }
          if (y.compareTo(n1) != 0)
            return false;
        }
      }
      return true;
    }
    function bnGetPrng() {
      return {
        nextBytes: function(x) {
          for (var i = 0; i < x.length; ++i) {
            x[i] = Math.floor(Math.random() * 256);
          }
        }
      };
    }
    BigInteger.prototype.chunkSize = bnpChunkSize;
    BigInteger.prototype.toRadix = bnpToRadix;
    BigInteger.prototype.fromRadix = bnpFromRadix;
    BigInteger.prototype.fromNumber = bnpFromNumber;
    BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
    BigInteger.prototype.changeBit = bnpChangeBit;
    BigInteger.prototype.addTo = bnpAddTo;
    BigInteger.prototype.dMultiply = bnpDMultiply;
    BigInteger.prototype.dAddOffset = bnpDAddOffset;
    BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
    BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
    BigInteger.prototype.modInt = bnpModInt;
    BigInteger.prototype.millerRabin = bnpMillerRabin;
    BigInteger.prototype.clone = bnClone;
    BigInteger.prototype.intValue = bnIntValue;
    BigInteger.prototype.byteValue = bnByteValue;
    BigInteger.prototype.shortValue = bnShortValue;
    BigInteger.prototype.signum = bnSigNum;
    BigInteger.prototype.toByteArray = bnToByteArray;
    BigInteger.prototype.equals = bnEquals;
    BigInteger.prototype.min = bnMin;
    BigInteger.prototype.max = bnMax;
    BigInteger.prototype.and = bnAnd;
    BigInteger.prototype.or = bnOr;
    BigInteger.prototype.xor = bnXor;
    BigInteger.prototype.andNot = bnAndNot;
    BigInteger.prototype.not = bnNot;
    BigInteger.prototype.shiftLeft = bnShiftLeft;
    BigInteger.prototype.shiftRight = bnShiftRight;
    BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
    BigInteger.prototype.bitCount = bnBitCount;
    BigInteger.prototype.testBit = bnTestBit;
    BigInteger.prototype.setBit = bnSetBit;
    BigInteger.prototype.clearBit = bnClearBit;
    BigInteger.prototype.flipBit = bnFlipBit;
    BigInteger.prototype.add = bnAdd;
    BigInteger.prototype.subtract = bnSubtract;
    BigInteger.prototype.multiply = bnMultiply;
    BigInteger.prototype.divide = bnDivide;
    BigInteger.prototype.remainder = bnRemainder;
    BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
    BigInteger.prototype.modPow = bnModPow;
    BigInteger.prototype.modInverse = bnModInverse;
    BigInteger.prototype.pow = bnPow;
    BigInteger.prototype.gcd = bnGCD;
    BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
  }
});

// node_modules/node-forge/lib/sha1.js
var require_sha1 = __commonJS({
  "node_modules/node-forge/lib/sha1.js"(exports2, module2) {
    var forge5 = require_forge();
    require_md();
    require_util2();
    var sha1 = module2.exports = forge5.sha1 = forge5.sha1 || {};
    forge5.md.sha1 = forge5.md.algorithms.sha1 = sha1;
    sha1.create = function() {
      if (!_initialized) {
        _init();
      }
      var _state = null;
      var _input = forge5.util.createBuffer();
      var _w = new Array(80);
      var md = {
        algorithm: "sha1",
        blockLength: 64,
        digestLength: 20,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 8
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength64 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge5.util.createBuffer();
        _state = {
          h0: 1732584193,
          h1: 4023233417,
          h2: 2562383102,
          h3: 271733878,
          h4: 3285377520
        };
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge5.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_state, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge5.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits += carry;
          finalBlock.putInt32(bits >>> 0);
          bits = next >>> 0;
        }
        finalBlock.putInt32(bits);
        var s2 = {
          h0: _state.h0,
          h1: _state.h1,
          h2: _state.h2,
          h3: _state.h3,
          h4: _state.h4
        };
        _update(s2, _w, finalBlock);
        var rval = forge5.util.createBuffer();
        rval.putInt32(s2.h0);
        rval.putInt32(s2.h1);
        rval.putInt32(s2.h2);
        rval.putInt32(s2.h3);
        rval.putInt32(s2.h4);
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge5.util.fillString(String.fromCharCode(0), 64);
      _initialized = true;
    }
    function _update(s, w, bytes) {
      var t, a, b, c, d, e, f, i;
      var len = bytes.length();
      while (len >= 64) {
        a = s.h0;
        b = s.h1;
        c = s.h2;
        d = s.h3;
        e = s.h4;
        for (i = 0; i < 16; ++i) {
          t = bytes.getInt32();
          w[i] = t;
          f = d ^ b & (c ^ d);
          t = (a << 5 | a >>> 27) + f + e + 1518500249 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 20; ++i) {
          t = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
          t = t << 1 | t >>> 31;
          w[i] = t;
          f = d ^ b & (c ^ d);
          t = (a << 5 | a >>> 27) + f + e + 1518500249 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 32; ++i) {
          t = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16];
          t = t << 1 | t >>> 31;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 1859775393 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 40; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 1859775393 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 60; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b & c | d & (b ^ c);
          t = (a << 5 | a >>> 27) + f + e + 2400959708 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        for (; i < 80; ++i) {
          t = w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32];
          t = t << 2 | t >>> 30;
          w[i] = t;
          f = b ^ c ^ d;
          t = (a << 5 | a >>> 27) + f + e + 3395469782 + t;
          e = d;
          d = c;
          c = (b << 30 | b >>> 2) >>> 0;
          b = a;
          a = t;
        }
        s.h0 = s.h0 + a | 0;
        s.h1 = s.h1 + b | 0;
        s.h2 = s.h2 + c | 0;
        s.h3 = s.h3 + d | 0;
        s.h4 = s.h4 + e | 0;
        len -= 64;
      }
    }
  }
});

// node_modules/node-forge/lib/pkcs1.js
var require_pkcs1 = __commonJS({
  "node_modules/node-forge/lib/pkcs1.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    require_random();
    require_sha1();
    var pkcs1 = module2.exports = forge5.pkcs1 = forge5.pkcs1 || {};
    pkcs1.encode_rsa_oaep = function(key, message2, options) {
      var label;
      var seed;
      var md;
      var mgf1Md;
      if (typeof options === "string") {
        label = options;
        seed = arguments[3] || void 0;
        md = arguments[4] || void 0;
      } else if (options) {
        label = options.label || void 0;
        seed = options.seed || void 0;
        md = options.md || void 0;
        if (options.mgf1 && options.mgf1.md) {
          mgf1Md = options.mgf1.md;
        }
      }
      if (!md) {
        md = forge5.md.sha1.create();
      } else {
        md.start();
      }
      if (!mgf1Md) {
        mgf1Md = md;
      }
      var keyLength = Math.ceil(key.n.bitLength() / 8);
      var maxLength = keyLength - 2 * md.digestLength - 2;
      if (message2.length > maxLength) {
        var error = new Error("RSAES-OAEP input message length is too long.");
        error.length = message2.length;
        error.maxLength = maxLength;
        throw error;
      }
      if (!label) {
        label = "";
      }
      md.update(label, "raw");
      var lHash = md.digest();
      var PS = "";
      var PS_length = maxLength - message2.length;
      for (var i = 0; i < PS_length; i++) {
        PS += "\0";
      }
      var DB = lHash.getBytes() + PS + "" + message2;
      if (!seed) {
        seed = forge5.random.getBytes(md.digestLength);
      } else if (seed.length !== md.digestLength) {
        var error = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");
        error.seedLength = seed.length;
        error.digestLength = md.digestLength;
        throw error;
      }
      var dbMask = rsa_mgf1(seed, keyLength - md.digestLength - 1, mgf1Md);
      var maskedDB = forge5.util.xorBytes(DB, dbMask, DB.length);
      var seedMask = rsa_mgf1(maskedDB, md.digestLength, mgf1Md);
      var maskedSeed = forge5.util.xorBytes(seed, seedMask, seed.length);
      return "\0" + maskedSeed + maskedDB;
    };
    pkcs1.decode_rsa_oaep = function(key, em, options) {
      var label;
      var md;
      var mgf1Md;
      if (typeof options === "string") {
        label = options;
        md = arguments[3] || void 0;
      } else if (options) {
        label = options.label || void 0;
        md = options.md || void 0;
        if (options.mgf1 && options.mgf1.md) {
          mgf1Md = options.mgf1.md;
        }
      }
      var keyLength = Math.ceil(key.n.bitLength() / 8);
      if (em.length !== keyLength) {
        var error = new Error("RSAES-OAEP encoded message length is invalid.");
        error.length = em.length;
        error.expectedLength = keyLength;
        throw error;
      }
      if (md === void 0) {
        md = forge5.md.sha1.create();
      } else {
        md.start();
      }
      if (!mgf1Md) {
        mgf1Md = md;
      }
      if (keyLength < 2 * md.digestLength + 2) {
        throw new Error("RSAES-OAEP key is too short for the hash function.");
      }
      if (!label) {
        label = "";
      }
      md.update(label, "raw");
      var lHash = md.digest().getBytes();
      var y = em.charAt(0);
      var maskedSeed = em.substring(1, md.digestLength + 1);
      var maskedDB = em.substring(1 + md.digestLength);
      var seedMask = rsa_mgf1(maskedDB, md.digestLength, mgf1Md);
      var seed = forge5.util.xorBytes(maskedSeed, seedMask, maskedSeed.length);
      var dbMask = rsa_mgf1(seed, keyLength - md.digestLength - 1, mgf1Md);
      var db = forge5.util.xorBytes(maskedDB, dbMask, maskedDB.length);
      var lHashPrime = db.substring(0, md.digestLength);
      var error = y !== "\0";
      for (var i = 0; i < md.digestLength; ++i) {
        error |= lHash.charAt(i) !== lHashPrime.charAt(i);
      }
      var in_ps = 1;
      var index = md.digestLength;
      for (var j = md.digestLength; j < db.length; j++) {
        var code2 = db.charCodeAt(j);
        var is_0 = code2 & 1 ^ 1;
        var error_mask = in_ps ? 65534 : 0;
        error |= code2 & error_mask;
        in_ps = in_ps & is_0;
        index += in_ps;
      }
      if (error || db.charCodeAt(index) !== 1) {
        throw new Error("Invalid RSAES-OAEP padding.");
      }
      return db.substring(index + 1);
    };
    function rsa_mgf1(seed, maskLength, hash) {
      if (!hash) {
        hash = forge5.md.sha1.create();
      }
      var t = "";
      var count = Math.ceil(maskLength / hash.digestLength);
      for (var i = 0; i < count; ++i) {
        var c = String.fromCharCode(
          i >> 24 & 255,
          i >> 16 & 255,
          i >> 8 & 255,
          i & 255
        );
        hash.start();
        hash.update(seed + c);
        t += hash.digest().getBytes();
      }
      return t.substring(0, maskLength);
    }
  }
});

// node_modules/node-forge/lib/prime.js
var require_prime = __commonJS({
  "node_modules/node-forge/lib/prime.js"(exports2, module2) {
    var forge5 = require_forge();
    require_util2();
    require_jsbn();
    require_random();
    (function() {
      if (forge5.prime) {
        module2.exports = forge5.prime;
        return;
      }
      var prime = module2.exports = forge5.prime = forge5.prime || {};
      var BigInteger = forge5.jsbn.BigInteger;
      var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
      var THIRTY = new BigInteger(null);
      THIRTY.fromInt(30);
      var op_or = function(x, y) {
        return x | y;
      };
      prime.generateProbablePrime = function(bits, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        options = options || {};
        var algorithm = options.algorithm || "PRIMEINC";
        if (typeof algorithm === "string") {
          algorithm = { name: algorithm };
        }
        algorithm.options = algorithm.options || {};
        var prng = options.prng || forge5.random;
        var rng = {
          nextBytes: function(x) {
            var b = prng.getBytesSync(x.length);
            for (var i = 0; i < x.length; ++i) {
              x[i] = b.charCodeAt(i);
            }
          }
        };
        if (algorithm.name === "PRIMEINC") {
          return primeincFindPrime(bits, rng, algorithm.options, callback);
        }
        throw new Error("Invalid prime generation algorithm: " + algorithm.name);
      };
      function primeincFindPrime(bits, rng, options, callback) {
        if ("workers" in options) {
          return primeincFindPrimeWithWorkers(bits, rng, options, callback);
        }
        return primeincFindPrimeWithoutWorkers(bits, rng, options, callback);
      }
      function primeincFindPrimeWithoutWorkers(bits, rng, options, callback) {
        var num = generateRandom(bits, rng);
        var deltaIdx = 0;
        var mrTests = getMillerRabinTests(num.bitLength());
        if ("millerRabinTests" in options) {
          mrTests = options.millerRabinTests;
        }
        var maxBlockTime = 10;
        if ("maxBlockTime" in options) {
          maxBlockTime = options.maxBlockTime;
        }
        _primeinc(num, bits, rng, deltaIdx, mrTests, maxBlockTime, callback);
      }
      function _primeinc(num, bits, rng, deltaIdx, mrTests, maxBlockTime, callback) {
        var start = +new Date();
        do {
          if (num.bitLength() > bits) {
            num = generateRandom(bits, rng);
          }
          if (num.isProbablePrime(mrTests)) {
            return callback(null, num);
          }
          num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
        } while (maxBlockTime < 0 || +new Date() - start < maxBlockTime);
        forge5.util.setImmediate(function() {
          _primeinc(num, bits, rng, deltaIdx, mrTests, maxBlockTime, callback);
        });
      }
      function primeincFindPrimeWithWorkers(bits, rng, options, callback) {
        if (typeof Worker === "undefined") {
          return primeincFindPrimeWithoutWorkers(bits, rng, options, callback);
        }
        var num = generateRandom(bits, rng);
        var numWorkers = options.workers;
        var workLoad = options.workLoad || 100;
        var range = workLoad * 30 / 8;
        var workerScript = options.workerScript || "forge/prime.worker.js";
        if (numWorkers === -1) {
          return forge5.util.estimateCores(function(err, cores) {
            if (err) {
              cores = 2;
            }
            numWorkers = cores - 1;
            generate2();
          });
        }
        generate2();
        function generate2() {
          numWorkers = Math.max(1, numWorkers);
          var workers = [];
          for (var i = 0; i < numWorkers; ++i) {
            workers[i] = new Worker(workerScript);
          }
          var running = numWorkers;
          for (var i = 0; i < numWorkers; ++i) {
            workers[i].addEventListener("message", workerMessage);
          }
          var found = false;
          function workerMessage(e) {
            if (found) {
              return;
            }
            --running;
            var data = e.data;
            if (data.found) {
              for (var i2 = 0; i2 < workers.length; ++i2) {
                workers[i2].terminate();
              }
              found = true;
              return callback(null, new BigInteger(data.prime, 16));
            }
            if (num.bitLength() > bits) {
              num = generateRandom(bits, rng);
            }
            var hex = num.toString(16);
            e.target.postMessage({
              hex,
              workLoad
            });
            num.dAddOffset(range, 0);
          }
        }
      }
      function generateRandom(bits, rng) {
        var num = new BigInteger(bits, rng);
        var bits1 = bits - 1;
        if (!num.testBit(bits1)) {
          num.bitwiseTo(BigInteger.ONE.shiftLeft(bits1), op_or, num);
        }
        num.dAddOffset(31 - num.mod(THIRTY).byteValue(), 0);
        return num;
      }
      function getMillerRabinTests(bits) {
        if (bits <= 100)
          return 27;
        if (bits <= 150)
          return 18;
        if (bits <= 200)
          return 15;
        if (bits <= 250)
          return 12;
        if (bits <= 300)
          return 9;
        if (bits <= 350)
          return 8;
        if (bits <= 400)
          return 7;
        if (bits <= 500)
          return 6;
        if (bits <= 600)
          return 5;
        if (bits <= 800)
          return 4;
        if (bits <= 1250)
          return 3;
        return 2;
      }
    })();
  }
});

// node_modules/node-forge/lib/rsa.js
var require_rsa = __commonJS({
  "node_modules/node-forge/lib/rsa.js"(exports2, module2) {
    var forge5 = require_forge();
    require_asn1();
    require_jsbn();
    require_oids();
    require_pkcs1();
    require_prime();
    require_random();
    require_util2();
    if (typeof BigInteger === "undefined") {
      BigInteger = forge5.jsbn.BigInteger;
    }
    var BigInteger;
    var _crypto = forge5.util.isNodejs ? require("crypto") : null;
    var asn1 = forge5.asn1;
    var util = forge5.util;
    forge5.pki = forge5.pki || {};
    module2.exports = forge5.pki.rsa = forge5.rsa = forge5.rsa || {};
    var pki = forge5.pki;
    var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
    var privateKeyValidator = {
      name: "PrivateKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PrivateKeyInfo.version",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        name: "PrivateKeyInfo.privateKeyAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "privateKeyOid"
        }]
      }, {
        name: "PrivateKeyInfo",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "privateKey"
      }]
    };
    var rsaPrivateKeyValidator = {
      name: "RSAPrivateKey",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "RSAPrivateKey.version",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyVersion"
      }, {
        name: "RSAPrivateKey.modulus",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyModulus"
      }, {
        name: "RSAPrivateKey.publicExponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPublicExponent"
      }, {
        name: "RSAPrivateKey.privateExponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrivateExponent"
      }, {
        name: "RSAPrivateKey.prime1",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime1"
      }, {
        name: "RSAPrivateKey.prime2",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyPrime2"
      }, {
        name: "RSAPrivateKey.exponent1",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent1"
      }, {
        name: "RSAPrivateKey.exponent2",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyExponent2"
      }, {
        name: "RSAPrivateKey.coefficient",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "privateKeyCoefficient"
      }]
    };
    var rsaPublicKeyValidator = {
      name: "RSAPublicKey",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "RSAPublicKey.modulus",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyModulus"
      }, {
        name: "RSAPublicKey.exponent",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "publicKeyExponent"
      }]
    };
    var publicKeyValidator = forge5.pki.rsa.publicKeyValidator = {
      name: "SubjectPublicKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      captureAsn1: "subjectPublicKeyInfo",
      value: [{
        name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "publicKeyOid"
        }]
      }, {
        name: "SubjectPublicKeyInfo.subjectPublicKey",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.BITSTRING,
        constructed: false,
        value: [{
          name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          optional: true,
          captureAsn1: "rsaPublicKey"
        }]
      }]
    };
    var digestInfoValidator = {
      name: "DigestInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "DigestInfo.DigestAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "algorithmIdentifier"
        }, {
          name: "DigestInfo.DigestAlgorithm.parameters",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.NULL,
          capture: "parameters",
          optional: true,
          constructed: false
        }]
      }, {
        name: "DigestInfo.digest",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "digest"
      }]
    };
    var emsaPkcs1v15encode = function(md) {
      var oid;
      if (md.algorithm in pki.oids) {
        oid = pki.oids[md.algorithm];
      } else {
        var error = new Error("Unknown message digest algorithm.");
        error.algorithm = md.algorithm;
        throw error;
      }
      var oidBytes = asn1.oidToDer(oid).getBytes();
      var digestInfo = asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.SEQUENCE,
        true,
        []
      );
      var digestAlgorithm = asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.SEQUENCE,
        true,
        []
      );
      digestAlgorithm.value.push(asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.OID,
        false,
        oidBytes
      ));
      digestAlgorithm.value.push(asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.NULL,
        false,
        ""
      ));
      var digest2 = asn1.create(
        asn1.Class.UNIVERSAL,
        asn1.Type.OCTETSTRING,
        false,
        md.digest().getBytes()
      );
      digestInfo.value.push(digestAlgorithm);
      digestInfo.value.push(digest2);
      return asn1.toDer(digestInfo).getBytes();
    };
    var _modPow = function(x, key, pub) {
      if (pub) {
        return x.modPow(key.e, key.n);
      }
      if (!key.p || !key.q) {
        return x.modPow(key.d, key.n);
      }
      if (!key.dP) {
        key.dP = key.d.mod(key.p.subtract(BigInteger.ONE));
      }
      if (!key.dQ) {
        key.dQ = key.d.mod(key.q.subtract(BigInteger.ONE));
      }
      if (!key.qInv) {
        key.qInv = key.q.modInverse(key.p);
      }
      var r;
      do {
        r = new BigInteger(
          forge5.util.bytesToHex(forge5.random.getBytes(key.n.bitLength() / 8)),
          16
        );
      } while (r.compareTo(key.n) >= 0 || !r.gcd(key.n).equals(BigInteger.ONE));
      x = x.multiply(r.modPow(key.e, key.n)).mod(key.n);
      var xp = x.mod(key.p).modPow(key.dP, key.p);
      var xq = x.mod(key.q).modPow(key.dQ, key.q);
      while (xp.compareTo(xq) < 0) {
        xp = xp.add(key.p);
      }
      var y = xp.subtract(xq).multiply(key.qInv).mod(key.p).multiply(key.q).add(xq);
      y = y.multiply(r.modInverse(key.n)).mod(key.n);
      return y;
    };
    pki.rsa.encrypt = function(m, key, bt) {
      var pub = bt;
      var eb;
      var k = Math.ceil(key.n.bitLength() / 8);
      if (bt !== false && bt !== true) {
        pub = bt === 2;
        eb = _encodePkcs1_v1_5(m, key, bt);
      } else {
        eb = forge5.util.createBuffer();
        eb.putBytes(m);
      }
      var x = new BigInteger(eb.toHex(), 16);
      var y = _modPow(x, key, pub);
      var yhex = y.toString(16);
      var ed = forge5.util.createBuffer();
      var zeros = k - Math.ceil(yhex.length / 2);
      while (zeros > 0) {
        ed.putByte(0);
        --zeros;
      }
      ed.putBytes(forge5.util.hexToBytes(yhex));
      return ed.getBytes();
    };
    pki.rsa.decrypt = function(ed, key, pub, ml) {
      var k = Math.ceil(key.n.bitLength() / 8);
      if (ed.length !== k) {
        var error = new Error("Encrypted message length is invalid.");
        error.length = ed.length;
        error.expected = k;
        throw error;
      }
      var y = new BigInteger(forge5.util.createBuffer(ed).toHex(), 16);
      if (y.compareTo(key.n) >= 0) {
        throw new Error("Encrypted message is invalid.");
      }
      var x = _modPow(y, key, pub);
      var xhex = x.toString(16);
      var eb = forge5.util.createBuffer();
      var zeros = k - Math.ceil(xhex.length / 2);
      while (zeros > 0) {
        eb.putByte(0);
        --zeros;
      }
      eb.putBytes(forge5.util.hexToBytes(xhex));
      if (ml !== false) {
        return _decodePkcs1_v1_5(eb.getBytes(), key, pub);
      }
      return eb.getBytes();
    };
    pki.rsa.createKeyPairGenerationState = function(bits, e, options) {
      if (typeof bits === "string") {
        bits = parseInt(bits, 10);
      }
      bits = bits || 2048;
      options = options || {};
      var prng = options.prng || forge5.random;
      var rng = {
        nextBytes: function(x) {
          var b = prng.getBytesSync(x.length);
          for (var i = 0; i < x.length; ++i) {
            x[i] = b.charCodeAt(i);
          }
        }
      };
      var algorithm = options.algorithm || "PRIMEINC";
      var rval;
      if (algorithm === "PRIMEINC") {
        rval = {
          algorithm,
          state: 0,
          bits,
          rng,
          eInt: e || 65537,
          e: new BigInteger(null),
          p: null,
          q: null,
          qBits: bits >> 1,
          pBits: bits - (bits >> 1),
          pqState: 0,
          num: null,
          keys: null
        };
        rval.e.fromInt(rval.eInt);
      } else {
        throw new Error("Invalid key generation algorithm: " + algorithm);
      }
      return rval;
    };
    pki.rsa.stepKeyPairGenerationState = function(state, n) {
      if (!("algorithm" in state)) {
        state.algorithm = "PRIMEINC";
      }
      var THIRTY = new BigInteger(null);
      THIRTY.fromInt(30);
      var deltaIdx = 0;
      var op_or = function(x, y) {
        return x | y;
      };
      var t1 = +new Date();
      var t2;
      var total = 0;
      while (state.keys === null && (n <= 0 || total < n)) {
        if (state.state === 0) {
          var bits = state.p === null ? state.pBits : state.qBits;
          var bits1 = bits - 1;
          if (state.pqState === 0) {
            state.num = new BigInteger(bits, state.rng);
            if (!state.num.testBit(bits1)) {
              state.num.bitwiseTo(
                BigInteger.ONE.shiftLeft(bits1),
                op_or,
                state.num
              );
            }
            state.num.dAddOffset(31 - state.num.mod(THIRTY).byteValue(), 0);
            deltaIdx = 0;
            ++state.pqState;
          } else if (state.pqState === 1) {
            if (state.num.bitLength() > bits) {
              state.pqState = 0;
            } else if (state.num.isProbablePrime(
              _getMillerRabinTests(state.num.bitLength())
            )) {
              ++state.pqState;
            } else {
              state.num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
            }
          } else if (state.pqState === 2) {
            state.pqState = state.num.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) === 0 ? 3 : 0;
          } else if (state.pqState === 3) {
            state.pqState = 0;
            if (state.p === null) {
              state.p = state.num;
            } else {
              state.q = state.num;
            }
            if (state.p !== null && state.q !== null) {
              ++state.state;
            }
            state.num = null;
          }
        } else if (state.state === 1) {
          if (state.p.compareTo(state.q) < 0) {
            state.num = state.p;
            state.p = state.q;
            state.q = state.num;
          }
          ++state.state;
        } else if (state.state === 2) {
          state.p1 = state.p.subtract(BigInteger.ONE);
          state.q1 = state.q.subtract(BigInteger.ONE);
          state.phi = state.p1.multiply(state.q1);
          ++state.state;
        } else if (state.state === 3) {
          if (state.phi.gcd(state.e).compareTo(BigInteger.ONE) === 0) {
            ++state.state;
          } else {
            state.p = null;
            state.q = null;
            state.state = 0;
          }
        } else if (state.state === 4) {
          state.n = state.p.multiply(state.q);
          if (state.n.bitLength() === state.bits) {
            ++state.state;
          } else {
            state.q = null;
            state.state = 0;
          }
        } else if (state.state === 5) {
          var d = state.e.modInverse(state.phi);
          state.keys = {
            privateKey: pki.rsa.setPrivateKey(
              state.n,
              state.e,
              d,
              state.p,
              state.q,
              d.mod(state.p1),
              d.mod(state.q1),
              state.q.modInverse(state.p)
            ),
            publicKey: pki.rsa.setPublicKey(state.n, state.e)
          };
        }
        t2 = +new Date();
        total += t2 - t1;
        t1 = t2;
      }
      return state.keys !== null;
    };
    pki.rsa.generateKeyPair = function(bits, e, options, callback) {
      if (arguments.length === 1) {
        if (typeof bits === "object") {
          options = bits;
          bits = void 0;
        } else if (typeof bits === "function") {
          callback = bits;
          bits = void 0;
        }
      } else if (arguments.length === 2) {
        if (typeof bits === "number") {
          if (typeof e === "function") {
            callback = e;
            e = void 0;
          } else if (typeof e !== "number") {
            options = e;
            e = void 0;
          }
        } else {
          options = bits;
          callback = e;
          bits = void 0;
          e = void 0;
        }
      } else if (arguments.length === 3) {
        if (typeof e === "number") {
          if (typeof options === "function") {
            callback = options;
            options = void 0;
          }
        } else {
          callback = options;
          options = e;
          e = void 0;
        }
      }
      options = options || {};
      if (bits === void 0) {
        bits = options.bits || 2048;
      }
      if (e === void 0) {
        e = options.e || 65537;
      }
      if (!forge5.options.usePureJavaScript && !options.prng && bits >= 256 && bits <= 16384 && (e === 65537 || e === 3)) {
        if (callback) {
          if (_detectNodeCrypto("generateKeyPair")) {
            return _crypto.generateKeyPair("rsa", {
              modulusLength: bits,
              publicExponent: e,
              publicKeyEncoding: {
                type: "spki",
                format: "pem"
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
              }
            }, function(err, pub, priv) {
              if (err) {
                return callback(err);
              }
              callback(null, {
                privateKey: pki.privateKeyFromPem(priv),
                publicKey: pki.publicKeyFromPem(pub)
              });
            });
          }
          if (_detectSubtleCrypto("generateKey") && _detectSubtleCrypto("exportKey")) {
            return util.globalScope.crypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bits,
              publicExponent: _intToUint8Array(e),
              hash: { name: "SHA-256" }
            }, true, ["sign", "verify"]).then(function(pair2) {
              return util.globalScope.crypto.subtle.exportKey(
                "pkcs8",
                pair2.privateKey
              );
            }).then(void 0, function(err) {
              callback(err);
            }).then(function(pkcs8) {
              if (pkcs8) {
                var privateKey = pki.privateKeyFromAsn1(
                  asn1.fromDer(forge5.util.createBuffer(pkcs8))
                );
                callback(null, {
                  privateKey,
                  publicKey: pki.setRsaPublicKey(privateKey.n, privateKey.e)
                });
              }
            });
          }
          if (_detectSubtleMsCrypto("generateKey") && _detectSubtleMsCrypto("exportKey")) {
            var genOp = util.globalScope.msCrypto.subtle.generateKey({
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bits,
              publicExponent: _intToUint8Array(e),
              hash: { name: "SHA-256" }
            }, true, ["sign", "verify"]);
            genOp.oncomplete = function(e2) {
              var pair2 = e2.target.result;
              var exportOp = util.globalScope.msCrypto.subtle.exportKey(
                "pkcs8",
                pair2.privateKey
              );
              exportOp.oncomplete = function(e3) {
                var pkcs8 = e3.target.result;
                var privateKey = pki.privateKeyFromAsn1(
                  asn1.fromDer(forge5.util.createBuffer(pkcs8))
                );
                callback(null, {
                  privateKey,
                  publicKey: pki.setRsaPublicKey(privateKey.n, privateKey.e)
                });
              };
              exportOp.onerror = function(err) {
                callback(err);
              };
            };
            genOp.onerror = function(err) {
              callback(err);
            };
            return;
          }
        } else {
          if (_detectNodeCrypto("generateKeyPairSync")) {
            var keypair2 = _crypto.generateKeyPairSync("rsa", {
              modulusLength: bits,
              publicExponent: e,
              publicKeyEncoding: {
                type: "spki",
                format: "pem"
              },
              privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
              }
            });
            return {
              privateKey: pki.privateKeyFromPem(keypair2.privateKey),
              publicKey: pki.publicKeyFromPem(keypair2.publicKey)
            };
          }
        }
      }
      var state = pki.rsa.createKeyPairGenerationState(bits, e, options);
      if (!callback) {
        pki.rsa.stepKeyPairGenerationState(state, 0);
        return state.keys;
      }
      _generateKeyPair(state, options, callback);
    };
    pki.setRsaPublicKey = pki.rsa.setPublicKey = function(n, e) {
      var key = {
        n,
        e
      };
      key.encrypt = function(data, scheme, schemeOptions) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSAES-PKCS1-V1_5";
        }
        if (scheme === "RSAES-PKCS1-V1_5") {
          scheme = {
            encode: function(m, key2, pub) {
              return _encodePkcs1_v1_5(m, key2, 2).getBytes();
            }
          };
        } else if (scheme === "RSA-OAEP" || scheme === "RSAES-OAEP") {
          scheme = {
            encode: function(m, key2) {
              return forge5.pkcs1.encode_rsa_oaep(key2, m, schemeOptions);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(scheme) !== -1) {
          scheme = { encode: function(e3) {
            return e3;
          } };
        } else if (typeof scheme === "string") {
          throw new Error('Unsupported encryption scheme: "' + scheme + '".');
        }
        var e2 = scheme.encode(data, key, true);
        return pki.rsa.encrypt(e2, key, true);
      };
      key.verify = function(digest2, signature, scheme, options) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSASSA-PKCS1-V1_5";
        }
        if (options === void 0) {
          options = {
            _parseAllDigestBytes: true
          };
        }
        if (!("_parseAllDigestBytes" in options)) {
          options._parseAllDigestBytes = true;
        }
        if (scheme === "RSASSA-PKCS1-V1_5") {
          scheme = {
            verify: function(digest3, d2) {
              d2 = _decodePkcs1_v1_5(d2, key, true);
              var obj = asn1.fromDer(d2, {
                parseAllBytes: options._parseAllDigestBytes
              });
              var capture = {};
              var errors = [];
              if (!asn1.validate(obj, digestInfoValidator, capture, errors)) {
                var error = new Error(
                  "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value."
                );
                error.errors = errors;
                throw error;
              }
              var oid = asn1.derToOid(capture.algorithmIdentifier);
              if (!(oid === forge5.oids.md2 || oid === forge5.oids.md5 || oid === forge5.oids.sha1 || oid === forge5.oids.sha224 || oid === forge5.oids.sha256 || oid === forge5.oids.sha384 || oid === forge5.oids.sha512 || oid === forge5.oids["sha512-224"] || oid === forge5.oids["sha512-256"])) {
                var error = new Error(
                  "Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier."
                );
                error.oid = oid;
                throw error;
              }
              if (oid === forge5.oids.md2 || oid === forge5.oids.md5) {
                if (!("parameters" in capture)) {
                  throw new Error(
                    "ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifer NULL parameters."
                  );
                }
              }
              return digest3 === capture.digest;
            }
          };
        } else if (scheme === "NONE" || scheme === "NULL" || scheme === null) {
          scheme = {
            verify: function(digest3, d2) {
              d2 = _decodePkcs1_v1_5(d2, key, true);
              return digest3 === d2;
            }
          };
        }
        var d = pki.rsa.decrypt(signature, key, true, false);
        return scheme.verify(digest2, d, key.n.bitLength());
      };
      return key;
    };
    pki.setRsaPrivateKey = pki.rsa.setPrivateKey = function(n, e, d, p, q, dP, dQ, qInv) {
      var key = {
        n,
        e,
        d,
        p,
        q,
        dP,
        dQ,
        qInv
      };
      key.decrypt = function(data, scheme, schemeOptions) {
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        } else if (scheme === void 0) {
          scheme = "RSAES-PKCS1-V1_5";
        }
        var d2 = pki.rsa.decrypt(data, key, false, false);
        if (scheme === "RSAES-PKCS1-V1_5") {
          scheme = { decode: _decodePkcs1_v1_5 };
        } else if (scheme === "RSA-OAEP" || scheme === "RSAES-OAEP") {
          scheme = {
            decode: function(d3, key2) {
              return forge5.pkcs1.decode_rsa_oaep(key2, d3, schemeOptions);
            }
          };
        } else if (["RAW", "NONE", "NULL", null].indexOf(scheme) !== -1) {
          scheme = { decode: function(d3) {
            return d3;
          } };
        } else {
          throw new Error('Unsupported encryption scheme: "' + scheme + '".');
        }
        return scheme.decode(d2, key, false);
      };
      key.sign = function(md, scheme) {
        var bt = false;
        if (typeof scheme === "string") {
          scheme = scheme.toUpperCase();
        }
        if (scheme === void 0 || scheme === "RSASSA-PKCS1-V1_5") {
          scheme = { encode: emsaPkcs1v15encode };
          bt = 1;
        } else if (scheme === "NONE" || scheme === "NULL" || scheme === null) {
          scheme = { encode: function() {
            return md;
          } };
          bt = 1;
        }
        var d2 = scheme.encode(md, key.n.bitLength());
        return pki.rsa.encrypt(d2, key, bt);
      };
      return key;
    };
    pki.wrapRsaPrivateKey = function(rsaKey) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          asn1.integerToDer(0).getBytes()
        ),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(
            asn1.Class.UNIVERSAL,
            asn1.Type.OID,
            false,
            asn1.oidToDer(pki.oids.rsaEncryption).getBytes()
          ),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
        ]),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.OCTETSTRING,
          false,
          asn1.toDer(rsaKey).getBytes()
        )
      ]);
    };
    pki.privateKeyFromAsn1 = function(obj) {
      var capture = {};
      var errors = [];
      if (asn1.validate(obj, privateKeyValidator, capture, errors)) {
        obj = asn1.fromDer(forge5.util.createBuffer(capture.privateKey));
      }
      capture = {};
      errors = [];
      if (!asn1.validate(obj, rsaPrivateKeyValidator, capture, errors)) {
        var error = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
        error.errors = errors;
        throw error;
      }
      var n, e, d, p, q, dP, dQ, qInv;
      n = forge5.util.createBuffer(capture.privateKeyModulus).toHex();
      e = forge5.util.createBuffer(capture.privateKeyPublicExponent).toHex();
      d = forge5.util.createBuffer(capture.privateKeyPrivateExponent).toHex();
      p = forge5.util.createBuffer(capture.privateKeyPrime1).toHex();
      q = forge5.util.createBuffer(capture.privateKeyPrime2).toHex();
      dP = forge5.util.createBuffer(capture.privateKeyExponent1).toHex();
      dQ = forge5.util.createBuffer(capture.privateKeyExponent2).toHex();
      qInv = forge5.util.createBuffer(capture.privateKeyCoefficient).toHex();
      return pki.setRsaPrivateKey(
        new BigInteger(n, 16),
        new BigInteger(e, 16),
        new BigInteger(d, 16),
        new BigInteger(p, 16),
        new BigInteger(q, 16),
        new BigInteger(dP, 16),
        new BigInteger(dQ, 16),
        new BigInteger(qInv, 16)
      );
    };
    pki.privateKeyToAsn1 = pki.privateKeyToRSAPrivateKey = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          asn1.integerToDer(0).getBytes()
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.n)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.e)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.d)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.p)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.q)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.dP)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.dQ)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.qInv)
        )
      ]);
    };
    pki.publicKeyFromAsn1 = function(obj) {
      var capture = {};
      var errors = [];
      if (asn1.validate(obj, publicKeyValidator, capture, errors)) {
        var oid = asn1.derToOid(capture.publicKeyOid);
        if (oid !== pki.oids.rsaEncryption) {
          var error = new Error("Cannot read public key. Unknown OID.");
          error.oid = oid;
          throw error;
        }
        obj = capture.rsaPublicKey;
      }
      errors = [];
      if (!asn1.validate(obj, rsaPublicKeyValidator, capture, errors)) {
        var error = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
        error.errors = errors;
        throw error;
      }
      var n = forge5.util.createBuffer(capture.publicKeyModulus).toHex();
      var e = forge5.util.createBuffer(capture.publicKeyExponent).toHex();
      return pki.setRsaPublicKey(
        new BigInteger(n, 16),
        new BigInteger(e, 16)
      );
    };
    pki.publicKeyToAsn1 = pki.publicKeyToSubjectPublicKeyInfo = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
          asn1.create(
            asn1.Class.UNIVERSAL,
            asn1.Type.OID,
            false,
            asn1.oidToDer(pki.oids.rsaEncryption).getBytes()
          ),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
        ]),
        asn1.create(asn1.Class.UNIVERSAL, asn1.Type.BITSTRING, false, [
          pki.publicKeyToRSAPublicKey(key)
        ])
      ]);
    };
    pki.publicKeyToRSAPublicKey = function(key) {
      return asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.n)
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          _bnToBytes(key.e)
        )
      ]);
    };
    function _encodePkcs1_v1_5(m, key, bt) {
      var eb = forge5.util.createBuffer();
      var k = Math.ceil(key.n.bitLength() / 8);
      if (m.length > k - 11) {
        var error = new Error("Message is too long for PKCS#1 v1.5 padding.");
        error.length = m.length;
        error.max = k - 11;
        throw error;
      }
      eb.putByte(0);
      eb.putByte(bt);
      var padNum = k - 3 - m.length;
      var padByte;
      if (bt === 0 || bt === 1) {
        padByte = bt === 0 ? 0 : 255;
        for (var i = 0; i < padNum; ++i) {
          eb.putByte(padByte);
        }
      } else {
        while (padNum > 0) {
          var numZeros = 0;
          var padBytes = forge5.random.getBytes(padNum);
          for (var i = 0; i < padNum; ++i) {
            padByte = padBytes.charCodeAt(i);
            if (padByte === 0) {
              ++numZeros;
            } else {
              eb.putByte(padByte);
            }
          }
          padNum = numZeros;
        }
      }
      eb.putByte(0);
      eb.putBytes(m);
      return eb;
    }
    function _decodePkcs1_v1_5(em, key, pub, ml) {
      var k = Math.ceil(key.n.bitLength() / 8);
      var eb = forge5.util.createBuffer(em);
      var first = eb.getByte();
      var bt = eb.getByte();
      if (first !== 0 || pub && bt !== 0 && bt !== 1 || !pub && bt != 2 || pub && bt === 0 && typeof ml === "undefined") {
        throw new Error("Encryption block is invalid.");
      }
      var padNum = 0;
      if (bt === 0) {
        padNum = k - 3 - ml;
        for (var i = 0; i < padNum; ++i) {
          if (eb.getByte() !== 0) {
            throw new Error("Encryption block is invalid.");
          }
        }
      } else if (bt === 1) {
        padNum = 0;
        while (eb.length() > 1) {
          if (eb.getByte() !== 255) {
            --eb.read;
            break;
          }
          ++padNum;
        }
      } else if (bt === 2) {
        padNum = 0;
        while (eb.length() > 1) {
          if (eb.getByte() === 0) {
            --eb.read;
            break;
          }
          ++padNum;
        }
      }
      var zero = eb.getByte();
      if (zero !== 0 || padNum !== k - 3 - eb.length()) {
        throw new Error("Encryption block is invalid.");
      }
      return eb.getBytes();
    }
    function _generateKeyPair(state, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = options || {};
      var opts = {
        algorithm: {
          name: options.algorithm || "PRIMEINC",
          options: {
            workers: options.workers || 2,
            workLoad: options.workLoad || 100,
            workerScript: options.workerScript
          }
        }
      };
      if ("prng" in options) {
        opts.prng = options.prng;
      }
      generate2();
      function generate2() {
        getPrime(state.pBits, function(err, num) {
          if (err) {
            return callback(err);
          }
          state.p = num;
          if (state.q !== null) {
            return finish(err, state.q);
          }
          getPrime(state.qBits, finish);
        });
      }
      function getPrime(bits, callback2) {
        forge5.prime.generateProbablePrime(bits, opts, callback2);
      }
      function finish(err, num) {
        if (err) {
          return callback(err);
        }
        state.q = num;
        if (state.p.compareTo(state.q) < 0) {
          var tmp = state.p;
          state.p = state.q;
          state.q = tmp;
        }
        if (state.p.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.p = null;
          generate2();
          return;
        }
        if (state.q.subtract(BigInteger.ONE).gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.q = null;
          getPrime(state.qBits, finish);
          return;
        }
        state.p1 = state.p.subtract(BigInteger.ONE);
        state.q1 = state.q.subtract(BigInteger.ONE);
        state.phi = state.p1.multiply(state.q1);
        if (state.phi.gcd(state.e).compareTo(BigInteger.ONE) !== 0) {
          state.p = state.q = null;
          generate2();
          return;
        }
        state.n = state.p.multiply(state.q);
        if (state.n.bitLength() !== state.bits) {
          state.q = null;
          getPrime(state.qBits, finish);
          return;
        }
        var d = state.e.modInverse(state.phi);
        state.keys = {
          privateKey: pki.rsa.setPrivateKey(
            state.n,
            state.e,
            d,
            state.p,
            state.q,
            d.mod(state.p1),
            d.mod(state.q1),
            state.q.modInverse(state.p)
          ),
          publicKey: pki.rsa.setPublicKey(state.n, state.e)
        };
        callback(null, state.keys);
      }
    }
    function _bnToBytes(b) {
      var hex = b.toString(16);
      if (hex[0] >= "8") {
        hex = "00" + hex;
      }
      var bytes = forge5.util.hexToBytes(hex);
      if (bytes.length > 1 && (bytes.charCodeAt(0) === 0 && (bytes.charCodeAt(1) & 128) === 0 || bytes.charCodeAt(0) === 255 && (bytes.charCodeAt(1) & 128) === 128)) {
        return bytes.substr(1);
      }
      return bytes;
    }
    function _getMillerRabinTests(bits) {
      if (bits <= 100)
        return 27;
      if (bits <= 150)
        return 18;
      if (bits <= 200)
        return 15;
      if (bits <= 250)
        return 12;
      if (bits <= 300)
        return 9;
      if (bits <= 350)
        return 8;
      if (bits <= 400)
        return 7;
      if (bits <= 500)
        return 6;
      if (bits <= 600)
        return 5;
      if (bits <= 800)
        return 4;
      if (bits <= 1250)
        return 3;
      return 2;
    }
    function _detectNodeCrypto(fn) {
      return forge5.util.isNodejs && typeof _crypto[fn] === "function";
    }
    function _detectSubtleCrypto(fn) {
      return typeof util.globalScope !== "undefined" && typeof util.globalScope.crypto === "object" && typeof util.globalScope.crypto.subtle === "object" && typeof util.globalScope.crypto.subtle[fn] === "function";
    }
    function _detectSubtleMsCrypto(fn) {
      return typeof util.globalScope !== "undefined" && typeof util.globalScope.msCrypto === "object" && typeof util.globalScope.msCrypto.subtle === "object" && typeof util.globalScope.msCrypto.subtle[fn] === "function";
    }
    function _intToUint8Array(x) {
      var bytes = forge5.util.hexToBytes(x.toString(16));
      var buffer = new Uint8Array(bytes.length);
      for (var i = 0; i < bytes.length; ++i) {
        buffer[i] = bytes.charCodeAt(i);
      }
      return buffer;
    }
  }
});

// node_modules/node-forge/lib/pbe.js
var require_pbe = __commonJS({
  "node_modules/node-forge/lib/pbe.js"(exports2, module2) {
    var forge5 = require_forge();
    require_aes();
    require_asn1();
    require_des();
    require_md();
    require_oids();
    require_pbkdf2();
    require_pem();
    require_random();
    require_rc2();
    require_rsa();
    require_util2();
    if (typeof BigInteger === "undefined") {
      BigInteger = forge5.jsbn.BigInteger;
    }
    var BigInteger;
    var asn1 = forge5.asn1;
    var pki = forge5.pki = forge5.pki || {};
    module2.exports = pki.pbe = forge5.pbe = forge5.pbe || {};
    var oids = pki.oids;
    var encryptedPrivateKeyValidator = {
      name: "EncryptedPrivateKeyInfo",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "AlgorithmIdentifier.algorithm",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "encryptionOid"
        }, {
          name: "AlgorithmIdentifier.parameters",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          captureAsn1: "encryptionParams"
        }]
      }, {
        name: "EncryptedPrivateKeyInfo.encryptedData",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "encryptedData"
      }]
    };
    var PBES2AlgorithmsValidator = {
      name: "PBES2Algorithms",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "PBES2Algorithms.keyDerivationFunc",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.keyDerivationFunc.oid",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "kdfOid"
        }, {
          name: "PBES2Algorithms.params",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.SEQUENCE,
          constructed: true,
          value: [{
            name: "PBES2Algorithms.params.salt",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.OCTETSTRING,
            constructed: false,
            capture: "kdfSalt"
          }, {
            name: "PBES2Algorithms.params.iterationCount",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.INTEGER,
            constructed: false,
            capture: "kdfIterationCount"
          }, {
            name: "PBES2Algorithms.params.keyLength",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.INTEGER,
            constructed: false,
            optional: true,
            capture: "keyLength"
          }, {
            name: "PBES2Algorithms.params.prf",
            tagClass: asn1.Class.UNIVERSAL,
            type: asn1.Type.SEQUENCE,
            constructed: true,
            optional: true,
            value: [{
              name: "PBES2Algorithms.params.prf.algorithm",
              tagClass: asn1.Class.UNIVERSAL,
              type: asn1.Type.OID,
              constructed: false,
              capture: "prfOid"
            }]
          }]
        }]
      }, {
        name: "PBES2Algorithms.encryptionScheme",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.SEQUENCE,
        constructed: true,
        value: [{
          name: "PBES2Algorithms.encryptionScheme.oid",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OID,
          constructed: false,
          capture: "encOid"
        }, {
          name: "PBES2Algorithms.encryptionScheme.iv",
          tagClass: asn1.Class.UNIVERSAL,
          type: asn1.Type.OCTETSTRING,
          constructed: false,
          capture: "encIv"
        }]
      }]
    };
    var pkcs12PbeParamsValidator = {
      name: "pkcs-12PbeParams",
      tagClass: asn1.Class.UNIVERSAL,
      type: asn1.Type.SEQUENCE,
      constructed: true,
      value: [{
        name: "pkcs-12PbeParams.salt",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.OCTETSTRING,
        constructed: false,
        capture: "salt"
      }, {
        name: "pkcs-12PbeParams.iterations",
        tagClass: asn1.Class.UNIVERSAL,
        type: asn1.Type.INTEGER,
        constructed: false,
        capture: "iterations"
      }]
    };
    pki.encryptPrivateKeyInfo = function(obj, password, options) {
      options = options || {};
      options.saltSize = options.saltSize || 8;
      options.count = options.count || 2048;
      options.algorithm = options.algorithm || "aes128";
      options.prfAlgorithm = options.prfAlgorithm || "sha1";
      var salt = forge5.random.getBytesSync(options.saltSize);
      var count = options.count;
      var countBytes = asn1.integerToDer(count);
      var dkLen;
      var encryptionAlgorithm;
      var encryptedData;
      if (options.algorithm.indexOf("aes") === 0 || options.algorithm === "des") {
        var ivLen, encOid, cipherFn;
        switch (options.algorithm) {
          case "aes128":
            dkLen = 16;
            ivLen = 16;
            encOid = oids["aes128-CBC"];
            cipherFn = forge5.aes.createEncryptionCipher;
            break;
          case "aes192":
            dkLen = 24;
            ivLen = 16;
            encOid = oids["aes192-CBC"];
            cipherFn = forge5.aes.createEncryptionCipher;
            break;
          case "aes256":
            dkLen = 32;
            ivLen = 16;
            encOid = oids["aes256-CBC"];
            cipherFn = forge5.aes.createEncryptionCipher;
            break;
          case "des":
            dkLen = 8;
            ivLen = 8;
            encOid = oids["desCBC"];
            cipherFn = forge5.des.createEncryptionCipher;
            break;
          default:
            var error = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
            error.algorithm = options.algorithm;
            throw error;
        }
        var prfAlgorithm = "hmacWith" + options.prfAlgorithm.toUpperCase();
        var md = prfAlgorithmToMessageDigest(prfAlgorithm);
        var dk = forge5.pkcs5.pbkdf2(password, salt, count, dkLen, md);
        var iv = forge5.random.getBytesSync(ivLen);
        var cipher = cipherFn(dk);
        cipher.start(iv);
        cipher.update(asn1.toDer(obj));
        cipher.finish();
        encryptedData = cipher.output.getBytes();
        var params = createPbkdf2Params(salt, countBytes, dkLen, prfAlgorithm);
        encryptionAlgorithm = asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.SEQUENCE,
          true,
          [
            asn1.create(
              asn1.Class.UNIVERSAL,
              asn1.Type.OID,
              false,
              asn1.oidToDer(oids["pkcs5PBES2"]).getBytes()
            ),
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
                asn1.create(
                  asn1.Class.UNIVERSAL,
                  asn1.Type.OID,
                  false,
                  asn1.oidToDer(oids["pkcs5PBKDF2"]).getBytes()
                ),
                params
              ]),
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
                asn1.create(
                  asn1.Class.UNIVERSAL,
                  asn1.Type.OID,
                  false,
                  asn1.oidToDer(encOid).getBytes()
                ),
                asn1.create(
                  asn1.Class.UNIVERSAL,
                  asn1.Type.OCTETSTRING,
                  false,
                  iv
                )
              ])
            ])
          ]
        );
      } else if (options.algorithm === "3des") {
        dkLen = 24;
        var saltBytes = new forge5.util.ByteBuffer(salt);
        var dk = pki.pbe.generatePkcs12Key(password, saltBytes, 1, count, dkLen);
        var iv = pki.pbe.generatePkcs12Key(password, saltBytes, 2, count, dkLen);
        var cipher = forge5.des.createEncryptionCipher(dk);
        cipher.start(iv);
        cipher.update(asn1.toDer(obj));
        cipher.finish();
        encryptedData = cipher.output.getBytes();
        encryptionAlgorithm = asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.SEQUENCE,
          true,
          [
            asn1.create(
              asn1.Class.UNIVERSAL,
              asn1.Type.OID,
              false,
              asn1.oidToDer(oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()
            ),
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
              asn1.create(asn1.Class.UNIVERSAL, asn1.Type.OCTETSTRING, false, salt),
              asn1.create(
                asn1.Class.UNIVERSAL,
                asn1.Type.INTEGER,
                false,
                countBytes.getBytes()
              )
            ])
          ]
        );
      } else {
        var error = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
        error.algorithm = options.algorithm;
        throw error;
      }
      var rval = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        encryptionAlgorithm,
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.OCTETSTRING,
          false,
          encryptedData
        )
      ]);
      return rval;
    };
    pki.decryptPrivateKeyInfo = function(obj, password) {
      var rval = null;
      var capture = {};
      var errors = [];
      if (!asn1.validate(obj, encryptedPrivateKeyValidator, capture, errors)) {
        var error = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      var oid = asn1.derToOid(capture.encryptionOid);
      var cipher = pki.pbe.getCipher(oid, capture.encryptionParams, password);
      var encrypted = forge5.util.createBuffer(capture.encryptedData);
      cipher.update(encrypted);
      if (cipher.finish()) {
        rval = asn1.fromDer(cipher.output);
      }
      return rval;
    };
    pki.encryptedPrivateKeyToPem = function(epki, maxline) {
      var msg = {
        type: "ENCRYPTED PRIVATE KEY",
        body: asn1.toDer(epki).getBytes()
      };
      return forge5.pem.encode(msg, { maxline });
    };
    pki.encryptedPrivateKeyFromPem = function(pem) {
      var msg = forge5.pem.decode(pem)[0];
      if (msg.type !== "ENCRYPTED PRIVATE KEY") {
        var error = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
        error.headerType = msg.type;
        throw error;
      }
      if (msg.procType && msg.procType.type === "ENCRYPTED") {
        throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
      }
      return asn1.fromDer(msg.body);
    };
    pki.encryptRsaPrivateKey = function(rsaKey, password, options) {
      options = options || {};
      if (!options.legacy) {
        var rval = pki.wrapRsaPrivateKey(pki.privateKeyToAsn1(rsaKey));
        rval = pki.encryptPrivateKeyInfo(rval, password, options);
        return pki.encryptedPrivateKeyToPem(rval);
      }
      var algorithm;
      var iv;
      var dkLen;
      var cipherFn;
      switch (options.algorithm) {
        case "aes128":
          algorithm = "AES-128-CBC";
          dkLen = 16;
          iv = forge5.random.getBytesSync(16);
          cipherFn = forge5.aes.createEncryptionCipher;
          break;
        case "aes192":
          algorithm = "AES-192-CBC";
          dkLen = 24;
          iv = forge5.random.getBytesSync(16);
          cipherFn = forge5.aes.createEncryptionCipher;
          break;
        case "aes256":
          algorithm = "AES-256-CBC";
          dkLen = 32;
          iv = forge5.random.getBytesSync(16);
          cipherFn = forge5.aes.createEncryptionCipher;
          break;
        case "3des":
          algorithm = "DES-EDE3-CBC";
          dkLen = 24;
          iv = forge5.random.getBytesSync(8);
          cipherFn = forge5.des.createEncryptionCipher;
          break;
        case "des":
          algorithm = "DES-CBC";
          dkLen = 8;
          iv = forge5.random.getBytesSync(8);
          cipherFn = forge5.des.createEncryptionCipher;
          break;
        default:
          var error = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + options.algorithm + '".');
          error.algorithm = options.algorithm;
          throw error;
      }
      var dk = forge5.pbe.opensslDeriveBytes(password, iv.substr(0, 8), dkLen);
      var cipher = cipherFn(dk);
      cipher.start(iv);
      cipher.update(asn1.toDer(pki.privateKeyToAsn1(rsaKey)));
      cipher.finish();
      var msg = {
        type: "RSA PRIVATE KEY",
        procType: {
          version: "4",
          type: "ENCRYPTED"
        },
        dekInfo: {
          algorithm,
          parameters: forge5.util.bytesToHex(iv).toUpperCase()
        },
        body: cipher.output.getBytes()
      };
      return forge5.pem.encode(msg);
    };
    pki.decryptRsaPrivateKey = function(pem, password) {
      var rval = null;
      var msg = forge5.pem.decode(pem)[0];
      if (msg.type !== "ENCRYPTED PRIVATE KEY" && msg.type !== "PRIVATE KEY" && msg.type !== "RSA PRIVATE KEY") {
        var error = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');
        error.headerType = error;
        throw error;
      }
      if (msg.procType && msg.procType.type === "ENCRYPTED") {
        var dkLen;
        var cipherFn;
        switch (msg.dekInfo.algorithm) {
          case "DES-CBC":
            dkLen = 8;
            cipherFn = forge5.des.createDecryptionCipher;
            break;
          case "DES-EDE3-CBC":
            dkLen = 24;
            cipherFn = forge5.des.createDecryptionCipher;
            break;
          case "AES-128-CBC":
            dkLen = 16;
            cipherFn = forge5.aes.createDecryptionCipher;
            break;
          case "AES-192-CBC":
            dkLen = 24;
            cipherFn = forge5.aes.createDecryptionCipher;
            break;
          case "AES-256-CBC":
            dkLen = 32;
            cipherFn = forge5.aes.createDecryptionCipher;
            break;
          case "RC2-40-CBC":
            dkLen = 5;
            cipherFn = function(key) {
              return forge5.rc2.createDecryptionCipher(key, 40);
            };
            break;
          case "RC2-64-CBC":
            dkLen = 8;
            cipherFn = function(key) {
              return forge5.rc2.createDecryptionCipher(key, 64);
            };
            break;
          case "RC2-128-CBC":
            dkLen = 16;
            cipherFn = function(key) {
              return forge5.rc2.createDecryptionCipher(key, 128);
            };
            break;
          default:
            var error = new Error('Could not decrypt private key; unsupported encryption algorithm "' + msg.dekInfo.algorithm + '".');
            error.algorithm = msg.dekInfo.algorithm;
            throw error;
        }
        var iv = forge5.util.hexToBytes(msg.dekInfo.parameters);
        var dk = forge5.pbe.opensslDeriveBytes(password, iv.substr(0, 8), dkLen);
        var cipher = cipherFn(dk);
        cipher.start(iv);
        cipher.update(forge5.util.createBuffer(msg.body));
        if (cipher.finish()) {
          rval = cipher.output.getBytes();
        } else {
          return rval;
        }
      } else {
        rval = msg.body;
      }
      if (msg.type === "ENCRYPTED PRIVATE KEY") {
        rval = pki.decryptPrivateKeyInfo(asn1.fromDer(rval), password);
      } else {
        rval = asn1.fromDer(rval);
      }
      if (rval !== null) {
        rval = pki.privateKeyFromAsn1(rval);
      }
      return rval;
    };
    pki.pbe.generatePkcs12Key = function(password, salt, id, iter, n, md) {
      var j, l;
      if (typeof md === "undefined" || md === null) {
        if (!("sha1" in forge5.md)) {
          throw new Error('"sha1" hash algorithm unavailable.');
        }
        md = forge5.md.sha1.create();
      }
      var u = md.digestLength;
      var v = md.blockLength;
      var result = new forge5.util.ByteBuffer();
      var passBuf = new forge5.util.ByteBuffer();
      if (password !== null && password !== void 0) {
        for (l = 0; l < password.length; l++) {
          passBuf.putInt16(password.charCodeAt(l));
        }
        passBuf.putInt16(0);
      }
      var p = passBuf.length();
      var s = salt.length();
      var D = new forge5.util.ByteBuffer();
      D.fillWithByte(id, v);
      var Slen = v * Math.ceil(s / v);
      var S = new forge5.util.ByteBuffer();
      for (l = 0; l < Slen; l++) {
        S.putByte(salt.at(l % s));
      }
      var Plen = v * Math.ceil(p / v);
      var P = new forge5.util.ByteBuffer();
      for (l = 0; l < Plen; l++) {
        P.putByte(passBuf.at(l % p));
      }
      var I = S;
      I.putBuffer(P);
      var c = Math.ceil(n / u);
      for (var i = 1; i <= c; i++) {
        var buf = new forge5.util.ByteBuffer();
        buf.putBytes(D.bytes());
        buf.putBytes(I.bytes());
        for (var round = 0; round < iter; round++) {
          md.start();
          md.update(buf.getBytes());
          buf = md.digest();
        }
        var B = new forge5.util.ByteBuffer();
        for (l = 0; l < v; l++) {
          B.putByte(buf.at(l % u));
        }
        var k = Math.ceil(s / v) + Math.ceil(p / v);
        var Inew = new forge5.util.ByteBuffer();
        for (j = 0; j < k; j++) {
          var chunk = new forge5.util.ByteBuffer(I.getBytes(v));
          var x = 511;
          for (l = B.length() - 1; l >= 0; l--) {
            x = x >> 8;
            x += B.at(l) + chunk.at(l);
            chunk.setAt(l, x & 255);
          }
          Inew.putBuffer(chunk);
        }
        I = Inew;
        result.putBuffer(buf);
      }
      result.truncate(result.length() - n);
      return result;
    };
    pki.pbe.getCipher = function(oid, params, password) {
      switch (oid) {
        case pki.oids["pkcs5PBES2"]:
          return pki.pbe.getCipherForPBES2(oid, params, password);
        case pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
        case pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
          return pki.pbe.getCipherForPKCS12PBE(oid, params, password);
        default:
          var error = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
          error.oid = oid;
          error.supportedOids = [
            "pkcs5PBES2",
            "pbeWithSHAAnd3-KeyTripleDES-CBC",
            "pbewithSHAAnd40BitRC2-CBC"
          ];
          throw error;
      }
    };
    pki.pbe.getCipherForPBES2 = function(oid, params, password) {
      var capture = {};
      var errors = [];
      if (!asn1.validate(params, PBES2AlgorithmsValidator, capture, errors)) {
        var error = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      oid = asn1.derToOid(capture.kdfOid);
      if (oid !== pki.oids["pkcs5PBKDF2"]) {
        var error = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
        error.oid = oid;
        error.supportedOids = ["pkcs5PBKDF2"];
        throw error;
      }
      oid = asn1.derToOid(capture.encOid);
      if (oid !== pki.oids["aes128-CBC"] && oid !== pki.oids["aes192-CBC"] && oid !== pki.oids["aes256-CBC"] && oid !== pki.oids["des-EDE3-CBC"] && oid !== pki.oids["desCBC"]) {
        var error = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
        error.oid = oid;
        error.supportedOids = [
          "aes128-CBC",
          "aes192-CBC",
          "aes256-CBC",
          "des-EDE3-CBC",
          "desCBC"
        ];
        throw error;
      }
      var salt = capture.kdfSalt;
      var count = forge5.util.createBuffer(capture.kdfIterationCount);
      count = count.getInt(count.length() << 3);
      var dkLen;
      var cipherFn;
      switch (pki.oids[oid]) {
        case "aes128-CBC":
          dkLen = 16;
          cipherFn = forge5.aes.createDecryptionCipher;
          break;
        case "aes192-CBC":
          dkLen = 24;
          cipherFn = forge5.aes.createDecryptionCipher;
          break;
        case "aes256-CBC":
          dkLen = 32;
          cipherFn = forge5.aes.createDecryptionCipher;
          break;
        case "des-EDE3-CBC":
          dkLen = 24;
          cipherFn = forge5.des.createDecryptionCipher;
          break;
        case "desCBC":
          dkLen = 8;
          cipherFn = forge5.des.createDecryptionCipher;
          break;
      }
      var md = prfOidToMessageDigest(capture.prfOid);
      var dk = forge5.pkcs5.pbkdf2(password, salt, count, dkLen, md);
      var iv = capture.encIv;
      var cipher = cipherFn(dk);
      cipher.start(iv);
      return cipher;
    };
    pki.pbe.getCipherForPKCS12PBE = function(oid, params, password) {
      var capture = {};
      var errors = [];
      if (!asn1.validate(params, pkcs12PbeParamsValidator, capture, errors)) {
        var error = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
        error.errors = errors;
        throw error;
      }
      var salt = forge5.util.createBuffer(capture.salt);
      var count = forge5.util.createBuffer(capture.iterations);
      count = count.getInt(count.length() << 3);
      var dkLen, dIvLen, cipherFn;
      switch (oid) {
        case pki.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
          dkLen = 24;
          dIvLen = 8;
          cipherFn = forge5.des.startDecrypting;
          break;
        case pki.oids["pbewithSHAAnd40BitRC2-CBC"]:
          dkLen = 5;
          dIvLen = 8;
          cipherFn = function(key2, iv2) {
            var cipher = forge5.rc2.createDecryptionCipher(key2, 40);
            cipher.start(iv2, null);
            return cipher;
          };
          break;
        default:
          var error = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
          error.oid = oid;
          throw error;
      }
      var md = prfOidToMessageDigest(capture.prfOid);
      var key = pki.pbe.generatePkcs12Key(password, salt, 1, count, dkLen, md);
      md.start();
      var iv = pki.pbe.generatePkcs12Key(password, salt, 2, count, dIvLen, md);
      return cipherFn(key, iv);
    };
    pki.pbe.opensslDeriveBytes = function(password, salt, dkLen, md) {
      if (typeof md === "undefined" || md === null) {
        if (!("md5" in forge5.md)) {
          throw new Error('"md5" hash algorithm unavailable.');
        }
        md = forge5.md.md5.create();
      }
      if (salt === null) {
        salt = "";
      }
      var digests = [hash(md, password + salt)];
      for (var length2 = 16, i = 1; length2 < dkLen; ++i, length2 += 16) {
        digests.push(hash(md, digests[i - 1] + password + salt));
      }
      return digests.join("").substr(0, dkLen);
    };
    function hash(md, bytes) {
      return md.start().update(bytes).digest().getBytes();
    }
    function prfOidToMessageDigest(prfOid) {
      var prfAlgorithm;
      if (!prfOid) {
        prfAlgorithm = "hmacWithSHA1";
      } else {
        prfAlgorithm = pki.oids[asn1.derToOid(prfOid)];
        if (!prfAlgorithm) {
          var error = new Error("Unsupported PRF OID.");
          error.oid = prfOid;
          error.supported = [
            "hmacWithSHA1",
            "hmacWithSHA224",
            "hmacWithSHA256",
            "hmacWithSHA384",
            "hmacWithSHA512"
          ];
          throw error;
        }
      }
      return prfAlgorithmToMessageDigest(prfAlgorithm);
    }
    function prfAlgorithmToMessageDigest(prfAlgorithm) {
      var factory = forge5.md;
      switch (prfAlgorithm) {
        case "hmacWithSHA224":
          factory = forge5.md.sha512;
        case "hmacWithSHA1":
        case "hmacWithSHA256":
        case "hmacWithSHA384":
        case "hmacWithSHA512":
          prfAlgorithm = prfAlgorithm.substr(8).toLowerCase();
          break;
        default:
          var error = new Error("Unsupported PRF algorithm.");
          error.algorithm = prfAlgorithm;
          error.supported = [
            "hmacWithSHA1",
            "hmacWithSHA224",
            "hmacWithSHA256",
            "hmacWithSHA384",
            "hmacWithSHA512"
          ];
          throw error;
      }
      if (!factory || !(prfAlgorithm in factory)) {
        throw new Error("Unknown hash algorithm: " + prfAlgorithm);
      }
      return factory[prfAlgorithm].create();
    }
    function createPbkdf2Params(salt, countBytes, dkLen, prfAlgorithm) {
      var params = asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.OCTETSTRING,
          false,
          salt
        ),
        asn1.create(
          asn1.Class.UNIVERSAL,
          asn1.Type.INTEGER,
          false,
          countBytes.getBytes()
        )
      ]);
      if (prfAlgorithm !== "hmacWithSHA1") {
        params.value.push(
          asn1.create(
            asn1.Class.UNIVERSAL,
            asn1.Type.INTEGER,
            false,
            forge5.util.hexToBytes(dkLen.toString(16))
          ),
          asn1.create(asn1.Class.UNIVERSAL, asn1.Type.SEQUENCE, true, [
            asn1.create(
              asn1.Class.UNIVERSAL,
              asn1.Type.OID,
              false,
              asn1.oidToDer(pki.oids[prfAlgorithm]).getBytes()
            ),
            asn1.create(asn1.Class.UNIVERSAL, asn1.Type.NULL, false, "")
          ])
        );
      }
      return params;
    }
  }
});

// node_modules/err-code/index.js
var require_err_code = __commonJS({
  "node_modules/err-code/index.js"(exports2, module2) {
    "use strict";
    function assign(obj, props) {
      for (const key in props) {
        Object.defineProperty(obj, key, {
          value: props[key],
          enumerable: true,
          configurable: true
        });
      }
      return obj;
    }
    function createError(err, code2, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code2 === "object") {
        props = code2;
        code2 = "";
      }
      if (code2) {
        props.code = code2;
      }
      try {
        return assign(err, props);
      } catch (_) {
        props.message = err.message;
        props.stack = err.stack;
        const ErrClass = function() {
        };
        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
        const output = assign(new ErrClass(), props);
        return output;
      }
    }
    module2.exports = createError;
  }
});

// node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(string2, "utf8");
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
var init_from_string = __esm({
  "node_modules/uint8arrays/esm/src/from-string.js"() {
    init_bases();
  }
});

// node_modules/uint8arrays/esm/src/concat.js
function concat(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}
var init_concat = __esm({
  "node_modules/uint8arrays/esm/src/concat.js"() {
    init_alloc();
  }
});

// node_modules/@libp2p/crypto/dist/src/hmac/lengths.js
var init_lengths = __esm({
  "node_modules/@libp2p/crypto/dist/src/hmac/lengths.js"() {
  }
});

// node_modules/@libp2p/crypto/dist/src/hmac/index.js
var init_hmac = __esm({
  "node_modules/@libp2p/crypto/dist/src/hmac/index.js"() {
    init_lengths();
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/key-stretcher.js
var import_err_code;
var init_key_stretcher = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/key-stretcher.js"() {
    import_err_code = __toESM(require_err_code(), 1);
    init_concat();
    init_from_string();
    init_hmac();
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/ecdh.js
var import_err_code2, curves, curveTypes, names;
var init_ecdh = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/ecdh.js"() {
    import_err_code2 = __toESM(require_err_code(), 1);
    curves = {
      "P-256": "prime256v1",
      "P-384": "secp384r1",
      "P-521": "secp521r1"
    };
    curveTypes = Object.keys(curves);
    names = curveTypes.join(" / ");
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/ephemeral-keys.js
var init_ephemeral_keys = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/ephemeral-keys.js"() {
    init_ecdh();
  }
});

// node_modules/@libp2p/crypto/dist/src/ciphers/aes-gcm.js
function create3(opts) {
  const algorithm = (opts == null ? void 0 : opts.algorithm) ?? "aes-128-gcm";
  const keyLength = (opts == null ? void 0 : opts.keyLength) ?? 16;
  const nonceLength = (opts == null ? void 0 : opts.nonceLength) ?? 12;
  const digest2 = (opts == null ? void 0 : opts.digest) ?? "sha256";
  const saltLength = (opts == null ? void 0 : opts.saltLength) ?? 16;
  const iterations = (opts == null ? void 0 : opts.iterations) ?? 32767;
  const algorithmTagLength = (opts == null ? void 0 : opts.algorithmTagLength) ?? 16;
  async function encryptWithKey(data, key) {
    const nonce = import_crypto2.default.randomBytes(nonceLength);
    const cipher2 = import_crypto2.default.createCipheriv(algorithm, key, nonce);
    const ciphertext = concat([cipher2.update(data), cipher2.final()]);
    return concat([nonce, ciphertext, cipher2.getAuthTag()]);
  }
  async function encrypt2(data, password) {
    const salt = import_crypto2.default.randomBytes(saltLength);
    if (typeof password === "string") {
      password = fromString2(password);
    }
    const key = import_crypto2.default.pbkdf2Sync(password, salt, iterations, keyLength, digest2);
    return concat([salt, await encryptWithKey(Uint8Array.from(data), key)]);
  }
  async function decryptWithKey(ciphertextAndNonce, key) {
    const nonce = ciphertextAndNonce.slice(0, nonceLength);
    const ciphertext = ciphertextAndNonce.slice(nonceLength, ciphertextAndNonce.length - algorithmTagLength);
    const tag = ciphertextAndNonce.slice(ciphertext.length + nonceLength);
    const cipher2 = import_crypto2.default.createDecipheriv(algorithm, key, nonce);
    cipher2.setAuthTag(tag);
    return concat([cipher2.update(ciphertext), cipher2.final()]);
  }
  async function decrypt2(data, password) {
    const salt = data.slice(0, saltLength);
    const ciphertextAndNonce = data.slice(saltLength);
    if (typeof password === "string") {
      password = fromString2(password);
    }
    const key = import_crypto2.default.pbkdf2Sync(password, salt, iterations, keyLength, digest2);
    return await decryptWithKey(ciphertextAndNonce, key);
  }
  const cipher = {
    encrypt: encrypt2,
    decrypt: decrypt2
  };
  return cipher;
}
var import_crypto2;
var init_aes_gcm = __esm({
  "node_modules/@libp2p/crypto/dist/src/ciphers/aes-gcm.js"() {
    import_crypto2 = __toESM(require("crypto"), 1);
    init_concat();
    init_from_string();
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/importer.js
var init_importer = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/importer.js"() {
    init_base64();
    init_aes_gcm();
  }
});

// node_modules/uint8arrays/esm/src/equals.js
function equals3(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var init_equals = __esm({
  "node_modules/uint8arrays/esm/src/equals.js"() {
  }
});

// node_modules/node-forge/lib/sha512.js
var require_sha512 = __commonJS({
  "node_modules/node-forge/lib/sha512.js"(exports2, module2) {
    var forge5 = require_forge();
    require_md();
    require_util2();
    var sha5122 = module2.exports = forge5.sha512 = forge5.sha512 || {};
    forge5.md.sha512 = forge5.md.algorithms.sha512 = sha5122;
    var sha384 = forge5.sha384 = forge5.sha512.sha384 = forge5.sha512.sha384 || {};
    sha384.create = function() {
      return sha5122.create("SHA-384");
    };
    forge5.md.sha384 = forge5.md.algorithms.sha384 = sha384;
    forge5.sha512.sha256 = forge5.sha512.sha256 || {
      create: function() {
        return sha5122.create("SHA-512/256");
      }
    };
    forge5.md["sha512/256"] = forge5.md.algorithms["sha512/256"] = forge5.sha512.sha256;
    forge5.sha512.sha224 = forge5.sha512.sha224 || {
      create: function() {
        return sha5122.create("SHA-512/224");
      }
    };
    forge5.md["sha512/224"] = forge5.md.algorithms["sha512/224"] = forge5.sha512.sha224;
    sha5122.create = function(algorithm) {
      if (!_initialized) {
        _init();
      }
      if (typeof algorithm === "undefined") {
        algorithm = "SHA-512";
      }
      if (!(algorithm in _states)) {
        throw new Error("Invalid SHA-512 algorithm: " + algorithm);
      }
      var _state = _states[algorithm];
      var _h = null;
      var _input = forge5.util.createBuffer();
      var _w = new Array(80);
      for (var wi = 0; wi < 80; ++wi) {
        _w[wi] = new Array(2);
      }
      var digestLength = 64;
      switch (algorithm) {
        case "SHA-384":
          digestLength = 48;
          break;
        case "SHA-512/256":
          digestLength = 32;
          break;
        case "SHA-512/224":
          digestLength = 28;
          break;
      }
      var md = {
        algorithm: algorithm.replace("-", "").toLowerCase(),
        blockLength: 128,
        digestLength,
        messageLength: 0,
        fullMessageLength: null,
        messageLengthSize: 16
      };
      md.start = function() {
        md.messageLength = 0;
        md.fullMessageLength = md.messageLength128 = [];
        var int32s = md.messageLengthSize / 4;
        for (var i = 0; i < int32s; ++i) {
          md.fullMessageLength.push(0);
        }
        _input = forge5.util.createBuffer();
        _h = new Array(_state.length);
        for (var i = 0; i < _state.length; ++i) {
          _h[i] = _state[i].slice(0);
        }
        return md;
      };
      md.start();
      md.update = function(msg, encoding) {
        if (encoding === "utf8") {
          msg = forge5.util.encodeUtf8(msg);
        }
        var len = msg.length;
        md.messageLength += len;
        len = [len / 4294967296 >>> 0, len >>> 0];
        for (var i = md.fullMessageLength.length - 1; i >= 0; --i) {
          md.fullMessageLength[i] += len[1];
          len[1] = len[0] + (md.fullMessageLength[i] / 4294967296 >>> 0);
          md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
          len[0] = len[1] / 4294967296 >>> 0;
        }
        _input.putBytes(msg);
        _update(_h, _w, _input);
        if (_input.read > 2048 || _input.length() === 0) {
          _input.compact();
        }
        return md;
      };
      md.digest = function() {
        var finalBlock = forge5.util.createBuffer();
        finalBlock.putBytes(_input.bytes());
        var remaining = md.fullMessageLength[md.fullMessageLength.length - 1] + md.messageLengthSize;
        var overflow = remaining & md.blockLength - 1;
        finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));
        var next, carry;
        var bits = md.fullMessageLength[0] * 8;
        for (var i = 0; i < md.fullMessageLength.length - 1; ++i) {
          next = md.fullMessageLength[i + 1] * 8;
          carry = next / 4294967296 >>> 0;
          bits += carry;
          finalBlock.putInt32(bits >>> 0);
          bits = next >>> 0;
        }
        finalBlock.putInt32(bits);
        var h = new Array(_h.length);
        for (var i = 0; i < _h.length; ++i) {
          h[i] = _h[i].slice(0);
        }
        _update(h, _w, finalBlock);
        var rval = forge5.util.createBuffer();
        var hlen;
        if (algorithm === "SHA-512") {
          hlen = h.length;
        } else if (algorithm === "SHA-384") {
          hlen = h.length - 2;
        } else {
          hlen = h.length - 4;
        }
        for (var i = 0; i < hlen; ++i) {
          rval.putInt32(h[i][0]);
          if (i !== hlen - 1 || algorithm !== "SHA-512/224") {
            rval.putInt32(h[i][1]);
          }
        }
        return rval;
      };
      return md;
    };
    var _padding = null;
    var _initialized = false;
    var _k = null;
    var _states = null;
    function _init() {
      _padding = String.fromCharCode(128);
      _padding += forge5.util.fillString(String.fromCharCode(0), 128);
      _k = [
        [1116352408, 3609767458],
        [1899447441, 602891725],
        [3049323471, 3964484399],
        [3921009573, 2173295548],
        [961987163, 4081628472],
        [1508970993, 3053834265],
        [2453635748, 2937671579],
        [2870763221, 3664609560],
        [3624381080, 2734883394],
        [310598401, 1164996542],
        [607225278, 1323610764],
        [1426881987, 3590304994],
        [1925078388, 4068182383],
        [2162078206, 991336113],
        [2614888103, 633803317],
        [3248222580, 3479774868],
        [3835390401, 2666613458],
        [4022224774, 944711139],
        [264347078, 2341262773],
        [604807628, 2007800933],
        [770255983, 1495990901],
        [1249150122, 1856431235],
        [1555081692, 3175218132],
        [1996064986, 2198950837],
        [2554220882, 3999719339],
        [2821834349, 766784016],
        [2952996808, 2566594879],
        [3210313671, 3203337956],
        [3336571891, 1034457026],
        [3584528711, 2466948901],
        [113926993, 3758326383],
        [338241895, 168717936],
        [666307205, 1188179964],
        [773529912, 1546045734],
        [1294757372, 1522805485],
        [1396182291, 2643833823],
        [1695183700, 2343527390],
        [1986661051, 1014477480],
        [2177026350, 1206759142],
        [2456956037, 344077627],
        [2730485921, 1290863460],
        [2820302411, 3158454273],
        [3259730800, 3505952657],
        [3345764771, 106217008],
        [3516065817, 3606008344],
        [3600352804, 1432725776],
        [4094571909, 1467031594],
        [275423344, 851169720],
        [430227734, 3100823752],
        [506948616, 1363258195],
        [659060556, 3750685593],
        [883997877, 3785050280],
        [958139571, 3318307427],
        [1322822218, 3812723403],
        [1537002063, 2003034995],
        [1747873779, 3602036899],
        [1955562222, 1575990012],
        [2024104815, 1125592928],
        [2227730452, 2716904306],
        [2361852424, 442776044],
        [2428436474, 593698344],
        [2756734187, 3733110249],
        [3204031479, 2999351573],
        [3329325298, 3815920427],
        [3391569614, 3928383900],
        [3515267271, 566280711],
        [3940187606, 3454069534],
        [4118630271, 4000239992],
        [116418474, 1914138554],
        [174292421, 2731055270],
        [289380356, 3203993006],
        [460393269, 320620315],
        [685471733, 587496836],
        [852142971, 1086792851],
        [1017036298, 365543100],
        [1126000580, 2618297676],
        [1288033470, 3409855158],
        [1501505948, 4234509866],
        [1607167915, 987167468],
        [1816402316, 1246189591]
      ];
      _states = {};
      _states["SHA-512"] = [
        [1779033703, 4089235720],
        [3144134277, 2227873595],
        [1013904242, 4271175723],
        [2773480762, 1595750129],
        [1359893119, 2917565137],
        [2600822924, 725511199],
        [528734635, 4215389547],
        [1541459225, 327033209]
      ];
      _states["SHA-384"] = [
        [3418070365, 3238371032],
        [1654270250, 914150663],
        [2438529370, 812702999],
        [355462360, 4144912697],
        [1731405415, 4290775857],
        [2394180231, 1750603025],
        [3675008525, 1694076839],
        [1203062813, 3204075428]
      ];
      _states["SHA-512/256"] = [
        [573645204, 4230739756],
        [2673172387, 3360449730],
        [596883563, 1867755857],
        [2520282905, 1497426621],
        [2519219938, 2827943907],
        [3193839141, 1401305490],
        [721525244, 746961066],
        [246885852, 2177182882]
      ];
      _states["SHA-512/224"] = [
        [2352822216, 424955298],
        [1944164710, 2312950998],
        [502970286, 855612546],
        [1738396948, 1479516111],
        [258812777, 2077511080],
        [2011393907, 79989058],
        [1067287976, 1780299464],
        [286451373, 2446758561]
      ];
      _initialized = true;
    }
    function _update(s, w, bytes) {
      var t1_hi, t1_lo;
      var t2_hi, t2_lo;
      var s0_hi, s0_lo;
      var s1_hi, s1_lo;
      var ch_hi, ch_lo;
      var maj_hi, maj_lo;
      var a_hi, a_lo;
      var b_hi, b_lo;
      var c_hi, c_lo;
      var d_hi, d_lo;
      var e_hi, e_lo;
      var f_hi, f_lo;
      var g_hi, g_lo;
      var h_hi, h_lo;
      var i, hi, lo, w2, w7, w15, w16;
      var len = bytes.length();
      while (len >= 128) {
        for (i = 0; i < 16; ++i) {
          w[i][0] = bytes.getInt32() >>> 0;
          w[i][1] = bytes.getInt32() >>> 0;
        }
        for (; i < 80; ++i) {
          w2 = w[i - 2];
          hi = w2[0];
          lo = w2[1];
          t1_hi = ((hi >>> 19 | lo << 13) ^ (lo >>> 29 | hi << 3) ^ hi >>> 6) >>> 0;
          t1_lo = ((hi << 13 | lo >>> 19) ^ (lo << 3 | hi >>> 29) ^ (hi << 26 | lo >>> 6)) >>> 0;
          w15 = w[i - 15];
          hi = w15[0];
          lo = w15[1];
          t2_hi = ((hi >>> 1 | lo << 31) ^ (hi >>> 8 | lo << 24) ^ hi >>> 7) >>> 0;
          t2_lo = ((hi << 31 | lo >>> 1) ^ (hi << 24 | lo >>> 8) ^ (hi << 25 | lo >>> 7)) >>> 0;
          w7 = w[i - 7];
          w16 = w[i - 16];
          lo = t1_lo + w7[1] + t2_lo + w16[1];
          w[i][0] = t1_hi + w7[0] + t2_hi + w16[0] + (lo / 4294967296 >>> 0) >>> 0;
          w[i][1] = lo >>> 0;
        }
        a_hi = s[0][0];
        a_lo = s[0][1];
        b_hi = s[1][0];
        b_lo = s[1][1];
        c_hi = s[2][0];
        c_lo = s[2][1];
        d_hi = s[3][0];
        d_lo = s[3][1];
        e_hi = s[4][0];
        e_lo = s[4][1];
        f_hi = s[5][0];
        f_lo = s[5][1];
        g_hi = s[6][0];
        g_lo = s[6][1];
        h_hi = s[7][0];
        h_lo = s[7][1];
        for (i = 0; i < 80; ++i) {
          s1_hi = ((e_hi >>> 14 | e_lo << 18) ^ (e_hi >>> 18 | e_lo << 14) ^ (e_lo >>> 9 | e_hi << 23)) >>> 0;
          s1_lo = ((e_hi << 18 | e_lo >>> 14) ^ (e_hi << 14 | e_lo >>> 18) ^ (e_lo << 23 | e_hi >>> 9)) >>> 0;
          ch_hi = (g_hi ^ e_hi & (f_hi ^ g_hi)) >>> 0;
          ch_lo = (g_lo ^ e_lo & (f_lo ^ g_lo)) >>> 0;
          s0_hi = ((a_hi >>> 28 | a_lo << 4) ^ (a_lo >>> 2 | a_hi << 30) ^ (a_lo >>> 7 | a_hi << 25)) >>> 0;
          s0_lo = ((a_hi << 4 | a_lo >>> 28) ^ (a_lo << 30 | a_hi >>> 2) ^ (a_lo << 25 | a_hi >>> 7)) >>> 0;
          maj_hi = (a_hi & b_hi | c_hi & (a_hi ^ b_hi)) >>> 0;
          maj_lo = (a_lo & b_lo | c_lo & (a_lo ^ b_lo)) >>> 0;
          lo = h_lo + s1_lo + ch_lo + _k[i][1] + w[i][1];
          t1_hi = h_hi + s1_hi + ch_hi + _k[i][0] + w[i][0] + (lo / 4294967296 >>> 0) >>> 0;
          t1_lo = lo >>> 0;
          lo = s0_lo + maj_lo;
          t2_hi = s0_hi + maj_hi + (lo / 4294967296 >>> 0) >>> 0;
          t2_lo = lo >>> 0;
          h_hi = g_hi;
          h_lo = g_lo;
          g_hi = f_hi;
          g_lo = f_lo;
          f_hi = e_hi;
          f_lo = e_lo;
          lo = d_lo + t1_lo;
          e_hi = d_hi + t1_hi + (lo / 4294967296 >>> 0) >>> 0;
          e_lo = lo >>> 0;
          d_hi = c_hi;
          d_lo = c_lo;
          c_hi = b_hi;
          c_lo = b_lo;
          b_hi = a_hi;
          b_lo = a_lo;
          lo = t1_lo + t2_lo;
          a_hi = t1_hi + t2_hi + (lo / 4294967296 >>> 0) >>> 0;
          a_lo = lo >>> 0;
        }
        lo = s[0][1] + a_lo;
        s[0][0] = s[0][0] + a_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[0][1] = lo >>> 0;
        lo = s[1][1] + b_lo;
        s[1][0] = s[1][0] + b_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[1][1] = lo >>> 0;
        lo = s[2][1] + c_lo;
        s[2][0] = s[2][0] + c_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[2][1] = lo >>> 0;
        lo = s[3][1] + d_lo;
        s[3][0] = s[3][0] + d_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[3][1] = lo >>> 0;
        lo = s[4][1] + e_lo;
        s[4][0] = s[4][0] + e_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[4][1] = lo >>> 0;
        lo = s[5][1] + f_lo;
        s[5][0] = s[5][0] + f_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[5][1] = lo >>> 0;
        lo = s[6][1] + g_lo;
        s[6][0] = s[6][0] + g_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[6][1] = lo >>> 0;
        lo = s[7][1] + h_lo;
        s[7][0] = s[7][0] + h_hi + (lo / 4294967296 >>> 0) >>> 0;
        s[7][1] = lo >>> 0;
        len -= 128;
      }
    }
  }
});

// node_modules/@noble/secp256k1/lib/esm/index.js
function weistrass(x) {
  const { a, b } = CURVE;
  const x2 = mod2(x * x);
  const x3 = mod2(x2 * x);
  return mod2(x3 + a * x + b);
}
function sliceDER(s) {
  return Number.parseInt(s[0], 16) >= 8 ? "00" + s : s;
}
function parseDERInt(data) {
  if (data.length < 2 || data[0] !== 2) {
    throw new Error(`Invalid signature integer tag: ${bytesToHex(data)}`);
  }
  const len = data[1];
  const res = data.subarray(2, len + 2);
  if (!len || res.length !== len) {
    throw new Error(`Invalid signature integer: wrong length`);
  }
  if (res[0] === 0 && res[1] <= 127) {
    throw new Error("Invalid signature integer: trailing length");
  }
  return { data: bytesToNumber(res), left: data.subarray(len + 2) };
}
function parseDERSignature(data) {
  if (data.length < 2 || data[0] != 48) {
    throw new Error(`Invalid signature tag: ${bytesToHex(data)}`);
  }
  if (data[1] !== data.length - 2) {
    throw new Error("Invalid signature: incorrect length");
  }
  const { data: r, left: sBytes } = parseDERInt(data.subarray(2));
  const { data: s, left: rBytesLeft } = parseDERInt(sBytes);
  if (rBytesLeft.length) {
    throw new Error(`Invalid signature: left bytes after parsing: ${bytesToHex(rBytesLeft)}`);
  }
  return { r, s };
}
function concatBytes(...arrays) {
  if (!arrays.every((b) => b instanceof Uint8Array))
    throw new Error("Uint8Array list expected");
  if (arrays.length === 1)
    return arrays[0];
  const length2 = arrays.reduce((a, arr) => a + arr.length, 0);
  const result = new Uint8Array(length2);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, pad);
    pad += arr.length;
  }
  return result;
}
function bytesToHex(uint8a) {
  if (!(uint8a instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  let hex = "";
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes[uint8a[i]];
  }
  return hex;
}
function numTo32bStr(num) {
  if (typeof num !== "bigint")
    throw new Error("Expected bigint");
  if (!(_0n <= num && num < POW_2_256))
    throw new Error("Expected number < 2^256");
  return num.toString(16).padStart(64, "0");
}
function numTo32b(num) {
  const b = hexToBytes(numTo32bStr(num));
  if (b.length !== 32)
    throw new Error("Error: expected 32 bytes");
  return b;
}
function numberToHexUnpadded(num) {
  const hex = num.toString(16);
  return hex.length & 1 ? `0${hex}` : hex;
}
function hexToNumber(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToNumber: expected string, got " + typeof hex);
  }
  return BigInt(`0x${hex}`);
}
function hexToBytes(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToBytes: expected string, got " + typeof hex);
  }
  if (hex.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex" + hex.length);
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}
function bytesToNumber(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function ensureBytes(hex) {
  return hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
}
function normalizeScalar(num) {
  if (typeof num === "number" && Number.isSafeInteger(num) && num > 0)
    return BigInt(num);
  if (typeof num === "bigint" && isWithinCurveOrder(num))
    return num;
  throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n");
}
function mod2(a, b = CURVE.P) {
  const result = a % b;
  return result >= _0n ? result : b + result;
}
function pow2(x, power) {
  const { P } = CURVE;
  let res = x;
  while (power-- > _0n) {
    res *= res;
    res %= P;
  }
  return res;
}
function sqrtMod(x) {
  const { P } = CURVE;
  const _6n = BigInt(6);
  const _11n = BigInt(11);
  const _22n = BigInt(22);
  const _23n = BigInt(23);
  const _44n = BigInt(44);
  const _88n = BigInt(88);
  const b2 = x * x * x % P;
  const b3 = b2 * b2 * x % P;
  const b6 = pow2(b3, _3n) * b3 % P;
  const b9 = pow2(b6, _3n) * b3 % P;
  const b11 = pow2(b9, _2n) * b2 % P;
  const b22 = pow2(b11, _11n) * b11 % P;
  const b44 = pow2(b22, _22n) * b22 % P;
  const b88 = pow2(b44, _44n) * b44 % P;
  const b176 = pow2(b88, _88n) * b88 % P;
  const b220 = pow2(b176, _44n) * b44 % P;
  const b223 = pow2(b220, _3n) * b3 % P;
  const t1 = pow2(b223, _23n) * b22 % P;
  const t2 = pow2(t1, _6n) * b2 % P;
  return pow2(t2, _2n);
}
function invert(number, modulo = CURVE.P) {
  if (number === _0n || modulo <= _0n) {
    throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
  }
  let a = mod2(number, modulo);
  let b = modulo;
  let x = _0n, y = _1n, u = _1n, v = _0n;
  while (a !== _0n) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n)
    throw new Error("invert: does not exist");
  return mod2(x, modulo);
}
function invertBatch(nums, p = CURVE.P) {
  const scratch = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (num === _0n)
      return acc;
    scratch[i] = acc;
    return mod2(acc * num, p);
  }, _1n);
  const inverted = invert(lastMultiplied, p);
  nums.reduceRight((acc, num, i) => {
    if (num === _0n)
      return acc;
    scratch[i] = mod2(acc * scratch[i], p);
    return mod2(acc * num, p);
  }, inverted);
  return scratch;
}
function splitScalarEndo(k) {
  const { n } = CURVE;
  const { a1, b1, a2, b2, POW_2_128 } = ENDO;
  const c1 = divNearest(b2 * k, n);
  const c2 = divNearest(-b1 * k, n);
  let k1 = mod2(k - c1 * a1 - c2 * a2, n);
  let k2 = mod2(-c1 * b1 - c2 * b2, n);
  const k1neg = k1 > POW_2_128;
  const k2neg = k2 > POW_2_128;
  if (k1neg)
    k1 = n - k1;
  if (k2neg)
    k2 = n - k2;
  if (k1 > POW_2_128 || k2 > POW_2_128) {
    throw new Error("splitScalarEndo: Endomorphism failed, k=" + k);
  }
  return { k1neg, k1, k2neg, k2 };
}
function truncateHash(hash) {
  const { n } = CURVE;
  const byteLength = hash.length;
  const delta = byteLength * 8 - 256;
  let h = bytesToNumber(hash);
  if (delta > 0)
    h = h >> BigInt(delta);
  if (h >= n)
    h -= n;
  return h;
}
function isWithinCurveOrder(num) {
  return _0n < num && num < CURVE.n;
}
function isValidFieldElement(num) {
  return _0n < num && num < CURVE.P;
}
function kmdToSig(kBytes, m, d) {
  const k = bytesToNumber(kBytes);
  if (!isWithinCurveOrder(k))
    return;
  const { n } = CURVE;
  const q = Point.BASE.multiply(k);
  const r = mod2(q.x, n);
  if (r === _0n)
    return;
  const s = mod2(invert(k, n) * mod2(m + d * r, n), n);
  if (s === _0n)
    return;
  const sig = new Signature(r, s);
  const recovery = (q.x === sig.r ? 0 : 2) | Number(q.y & _1n);
  return { sig, recovery };
}
function normalizePrivateKey(key) {
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else if (typeof key === "number" && Number.isSafeInteger(key) && key > 0) {
    num = BigInt(key);
  } else if (typeof key === "string") {
    if (key.length !== 64)
      throw new Error("Expected 32 bytes of private key");
    num = hexToNumber(key);
  } else if (key instanceof Uint8Array) {
    if (key.length !== 32)
      throw new Error("Expected 32 bytes of private key");
    num = bytesToNumber(key);
  } else {
    throw new TypeError("Expected valid private key");
  }
  if (!isWithinCurveOrder(num))
    throw new Error("Expected private key: 0 < key < n");
  return num;
}
function normalizePublicKey(publicKey) {
  if (publicKey instanceof Point) {
    publicKey.assertValidity();
    return publicKey;
  } else {
    return Point.fromHex(publicKey);
  }
}
function normalizeSignature(signature) {
  if (signature instanceof Signature) {
    signature.assertValidity();
    return signature;
  }
  try {
    return Signature.fromDER(signature);
  } catch (error) {
    return Signature.fromCompact(signature);
  }
}
function getPublicKey(privateKey, isCompressed = false) {
  return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
}
function bits2int(bytes) {
  const slice = bytes.length > 32 ? bytes.slice(0, 32) : bytes;
  return bytesToNumber(slice);
}
function bits2octets(bytes) {
  const z1 = bits2int(bytes);
  const z2 = mod2(z1, CURVE.n);
  return int2octets(z2 < _0n ? z1 : z2);
}
function int2octets(num) {
  return numTo32b(num);
}
function initSigArgs(msgHash, privateKey, extraEntropy) {
  if (msgHash == null)
    throw new Error(`sign: expected valid message hash, not "${msgHash}"`);
  const h1 = ensureBytes(msgHash);
  const d = normalizePrivateKey(privateKey);
  const seedArgs = [int2octets(d), bits2octets(h1)];
  if (extraEntropy != null) {
    if (extraEntropy === true)
      extraEntropy = utils.randomBytes(32);
    const e = ensureBytes(extraEntropy);
    if (e.length !== 32)
      throw new Error("sign: Expected 32 bytes of extra data");
    seedArgs.push(e);
  }
  const seed = concatBytes(...seedArgs);
  const m = bits2int(h1);
  return { seed, m, d };
}
function finalizeSig(recSig, opts) {
  let { sig, recovery } = recSig;
  const { canonical, der, recovered } = Object.assign({ canonical: true, der: true }, opts);
  if (canonical && sig.hasHighS()) {
    sig = sig.normalizeS();
    recovery ^= 1;
  }
  const hashed = der ? sig.toDERRawBytes() : sig.toCompactRawBytes();
  return recovered ? [hashed, recovery] : hashed;
}
async function sign(msgHash, privKey, opts = {}) {
  const { seed, m, d } = initSigArgs(msgHash, privKey, opts.extraEntropy);
  let sig;
  const drbg = new HmacDrbg();
  await drbg.reseed(seed);
  while (!(sig = kmdToSig(await drbg.generate(), m, d)))
    await drbg.reseed();
  return finalizeSig(sig, opts);
}
function verify(signature, msgHash, publicKey, opts = vopts) {
  let sig;
  try {
    sig = normalizeSignature(signature);
    msgHash = ensureBytes(msgHash);
  } catch (error) {
    return false;
  }
  const { r, s } = sig;
  if (opts.strict && sig.hasHighS())
    return false;
  const h = truncateHash(msgHash);
  let P;
  try {
    P = normalizePublicKey(publicKey);
  } catch (error) {
    return false;
  }
  const { n } = CURVE;
  const sinv = invert(s, n);
  const u1 = mod2(h * sinv, n);
  const u2 = mod2(r * sinv, n);
  const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2);
  if (!R)
    return false;
  const v = mod2(R.x, n);
  return v === r;
}
var nodeCrypto, _0n, _1n, _2n, _3n, _8n, CURVE, USE_ENDOMORPHISM, ShaError, JacobianPoint, pointPrecomputes, Point, Signature, hexes, POW_2_256, divNearest, ENDO, _sha256Sync, _hmacSha256Sync, HmacDrbg, vopts, crypto3, TAGGED_HASH_PREFIXES, utils;
var init_esm = __esm({
  "node_modules/@noble/secp256k1/lib/esm/index.js"() {
    nodeCrypto = __toESM(require("crypto"), 1);
    _0n = BigInt(0);
    _1n = BigInt(1);
    _2n = BigInt(2);
    _3n = BigInt(3);
    _8n = BigInt(8);
    CURVE = Object.freeze({
      a: _0n,
      b: BigInt(7),
      P: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
      n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
      h: _1n,
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")
    });
    USE_ENDOMORPHISM = CURVE.a === _0n;
    ShaError = class extends Error {
      constructor(message2) {
        super(message2);
      }
    };
    JacobianPoint = class {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
      }
      static fromAffine(p) {
        if (!(p instanceof Point)) {
          throw new TypeError("JacobianPoint#fromAffine: expected Point");
        }
        return new JacobianPoint(p.x, p.y, _1n);
      }
      static toAffineBatch(points) {
        const toInv = invertBatch(points.map((p) => p.z));
        return points.map((p, i) => p.toAffine(toInv[i]));
      }
      static normalizeZ(points) {
        return JacobianPoint.toAffineBatch(points).map(JacobianPoint.fromAffine);
      }
      equals(other) {
        if (!(other instanceof JacobianPoint))
          throw new TypeError("JacobianPoint expected");
        const { x: X1, y: Y1, z: Z1 } = this;
        const { x: X2, y: Y2, z: Z2 } = other;
        const Z1Z1 = mod2(Z1 * Z1);
        const Z2Z2 = mod2(Z2 * Z2);
        const U1 = mod2(X1 * Z2Z2);
        const U2 = mod2(X2 * Z1Z1);
        const S1 = mod2(mod2(Y1 * Z2) * Z2Z2);
        const S2 = mod2(mod2(Y2 * Z1) * Z1Z1);
        return U1 === U2 && S1 === S2;
      }
      negate() {
        return new JacobianPoint(this.x, mod2(-this.y), this.z);
      }
      double() {
        const { x: X1, y: Y1, z: Z1 } = this;
        const A = mod2(X1 * X1);
        const B = mod2(Y1 * Y1);
        const C = mod2(B * B);
        const x1b = X1 + B;
        const D = mod2(_2n * (mod2(x1b * x1b) - A - C));
        const E = mod2(_3n * A);
        const F = mod2(E * E);
        const X3 = mod2(F - _2n * D);
        const Y3 = mod2(E * (D - X3) - _8n * C);
        const Z3 = mod2(_2n * Y1 * Z1);
        return new JacobianPoint(X3, Y3, Z3);
      }
      add(other) {
        if (!(other instanceof JacobianPoint))
          throw new TypeError("JacobianPoint expected");
        const { x: X1, y: Y1, z: Z1 } = this;
        const { x: X2, y: Y2, z: Z2 } = other;
        if (X2 === _0n || Y2 === _0n)
          return this;
        if (X1 === _0n || Y1 === _0n)
          return other;
        const Z1Z1 = mod2(Z1 * Z1);
        const Z2Z2 = mod2(Z2 * Z2);
        const U1 = mod2(X1 * Z2Z2);
        const U2 = mod2(X2 * Z1Z1);
        const S1 = mod2(mod2(Y1 * Z2) * Z2Z2);
        const S2 = mod2(mod2(Y2 * Z1) * Z1Z1);
        const H = mod2(U2 - U1);
        const r = mod2(S2 - S1);
        if (H === _0n) {
          if (r === _0n) {
            return this.double();
          } else {
            return JacobianPoint.ZERO;
          }
        }
        const HH = mod2(H * H);
        const HHH = mod2(H * HH);
        const V = mod2(U1 * HH);
        const X3 = mod2(r * r - HHH - _2n * V);
        const Y3 = mod2(r * (V - X3) - S1 * HHH);
        const Z3 = mod2(Z1 * Z2 * H);
        return new JacobianPoint(X3, Y3, Z3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      multiplyUnsafe(scalar) {
        const P0 = JacobianPoint.ZERO;
        if (typeof scalar === "bigint" && scalar === _0n)
          return P0;
        let n = normalizeScalar(scalar);
        if (n === _1n)
          return this;
        if (!USE_ENDOMORPHISM) {
          let p = P0;
          let d2 = this;
          while (n > _0n) {
            if (n & _1n)
              p = p.add(d2);
            d2 = d2.double();
            n >>= _1n;
          }
          return p;
        }
        let { k1neg, k1, k2neg, k2 } = splitScalarEndo(n);
        let k1p = P0;
        let k2p = P0;
        let d = this;
        while (k1 > _0n || k2 > _0n) {
          if (k1 & _1n)
            k1p = k1p.add(d);
          if (k2 & _1n)
            k2p = k2p.add(d);
          d = d.double();
          k1 >>= _1n;
          k2 >>= _1n;
        }
        if (k1neg)
          k1p = k1p.negate();
        if (k2neg)
          k2p = k2p.negate();
        k2p = new JacobianPoint(mod2(k2p.x * CURVE.beta), k2p.y, k2p.z);
        return k1p.add(k2p);
      }
      precomputeWindow(W) {
        const windows = USE_ENDOMORPHISM ? 128 / W + 1 : 256 / W + 1;
        const points = [];
        let p = this;
        let base3 = p;
        for (let window2 = 0; window2 < windows; window2++) {
          base3 = p;
          points.push(base3);
          for (let i = 1; i < 2 ** (W - 1); i++) {
            base3 = base3.add(p);
            points.push(base3);
          }
          p = base3.double();
        }
        return points;
      }
      wNAF(n, affinePoint) {
        if (!affinePoint && this.equals(JacobianPoint.BASE))
          affinePoint = Point.BASE;
        const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
        if (256 % W) {
          throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
        }
        let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
        if (!precomputes) {
          precomputes = this.precomputeWindow(W);
          if (affinePoint && W !== 1) {
            precomputes = JacobianPoint.normalizeZ(precomputes);
            pointPrecomputes.set(affinePoint, precomputes);
          }
        }
        let p = JacobianPoint.ZERO;
        let f = JacobianPoint.ZERO;
        const windows = 1 + (USE_ENDOMORPHISM ? 128 / W : 256 / W);
        const windowSize = 2 ** (W - 1);
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window2 = 0; window2 < windows; window2++) {
          const offset = window2 * windowSize;
          let wbits = Number(n & mask);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n;
          }
          if (wbits === 0) {
            let pr = precomputes[offset];
            if (window2 % 2)
              pr = pr.negate();
            f = f.add(pr);
          } else {
            let cached = precomputes[offset + Math.abs(wbits) - 1];
            if (wbits < 0)
              cached = cached.negate();
            p = p.add(cached);
          }
        }
        return { p, f };
      }
      multiply(scalar, affinePoint) {
        let n = normalizeScalar(scalar);
        let point;
        let fake;
        if (USE_ENDOMORPHISM) {
          const { k1neg, k1, k2neg, k2 } = splitScalarEndo(n);
          let { p: k1p, f: f1p } = this.wNAF(k1, affinePoint);
          let { p: k2p, f: f2p } = this.wNAF(k2, affinePoint);
          if (k1neg)
            k1p = k1p.negate();
          if (k2neg)
            k2p = k2p.negate();
          k2p = new JacobianPoint(mod2(k2p.x * CURVE.beta), k2p.y, k2p.z);
          point = k1p.add(k2p);
          fake = f1p.add(f2p);
        } else {
          const { p, f } = this.wNAF(n, affinePoint);
          point = p;
          fake = f;
        }
        return JacobianPoint.normalizeZ([point, fake])[0];
      }
      toAffine(invZ = invert(this.z)) {
        const { x, y, z } = this;
        const iz1 = invZ;
        const iz2 = mod2(iz1 * iz1);
        const iz3 = mod2(iz2 * iz1);
        const ax = mod2(x * iz2);
        const ay = mod2(y * iz3);
        const zz = mod2(z * iz1);
        if (zz !== _1n)
          throw new Error("invZ was invalid");
        return new Point(ax, ay);
      }
    };
    JacobianPoint.BASE = new JacobianPoint(CURVE.Gx, CURVE.Gy, _1n);
    JacobianPoint.ZERO = new JacobianPoint(_0n, _1n, _0n);
    pointPrecomputes = /* @__PURE__ */ new WeakMap();
    Point = class {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes.delete(this);
      }
      hasEvenY() {
        return this.y % _2n === _0n;
      }
      static fromCompressedHex(bytes) {
        const isShort = bytes.length === 32;
        const x = bytesToNumber(isShort ? bytes : bytes.subarray(1));
        if (!isValidFieldElement(x))
          throw new Error("Point is not on curve");
        const y2 = weistrass(x);
        let y = sqrtMod(y2);
        const isYOdd = (y & _1n) === _1n;
        if (isShort) {
          if (isYOdd)
            y = mod2(-y);
        } else {
          const isFirstByteOdd = (bytes[0] & 1) === 1;
          if (isFirstByteOdd !== isYOdd)
            y = mod2(-y);
        }
        const point = new Point(x, y);
        point.assertValidity();
        return point;
      }
      static fromUncompressedHex(bytes) {
        const x = bytesToNumber(bytes.subarray(1, 33));
        const y = bytesToNumber(bytes.subarray(33, 65));
        const point = new Point(x, y);
        point.assertValidity();
        return point;
      }
      static fromHex(hex) {
        const bytes = ensureBytes(hex);
        const len = bytes.length;
        const header = bytes[0];
        if (len === 32 || len === 33 && (header === 2 || header === 3)) {
          return this.fromCompressedHex(bytes);
        }
        if (len === 65 && header === 4)
          return this.fromUncompressedHex(bytes);
        throw new Error(`Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${len}`);
      }
      static fromPrivateKey(privateKey) {
        return Point.BASE.multiply(normalizePrivateKey(privateKey));
      }
      static fromSignature(msgHash, signature, recovery) {
        msgHash = ensureBytes(msgHash);
        const h = truncateHash(msgHash);
        const { r, s } = normalizeSignature(signature);
        if (recovery !== 0 && recovery !== 1) {
          throw new Error("Cannot recover signature: invalid recovery bit");
        }
        const prefix = recovery & 1 ? "03" : "02";
        const R = Point.fromHex(prefix + numTo32bStr(r));
        const { n } = CURVE;
        const rinv = invert(r, n);
        const u1 = mod2(-h * rinv, n);
        const u2 = mod2(s * rinv, n);
        const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
        if (!Q)
          throw new Error("Cannot recover signature: point at infinify");
        Q.assertValidity();
        return Q;
      }
      toRawBytes(isCompressed = false) {
        return hexToBytes(this.toHex(isCompressed));
      }
      toHex(isCompressed = false) {
        const x = numTo32bStr(this.x);
        if (isCompressed) {
          const prefix = this.hasEvenY() ? "02" : "03";
          return `${prefix}${x}`;
        } else {
          return `04${x}${numTo32bStr(this.y)}`;
        }
      }
      toHexX() {
        return this.toHex(true).slice(2);
      }
      toRawX() {
        return this.toRawBytes(true).slice(1);
      }
      assertValidity() {
        const msg = "Point is not on elliptic curve";
        const { x, y } = this;
        if (!isValidFieldElement(x) || !isValidFieldElement(y))
          throw new Error(msg);
        const left = mod2(y * y);
        const right = weistrass(x);
        if (mod2(left - right) !== _0n)
          throw new Error(msg);
      }
      equals(other) {
        return this.x === other.x && this.y === other.y;
      }
      negate() {
        return new Point(this.x, mod2(-this.y));
      }
      double() {
        return JacobianPoint.fromAffine(this).double().toAffine();
      }
      add(other) {
        return JacobianPoint.fromAffine(this).add(JacobianPoint.fromAffine(other)).toAffine();
      }
      subtract(other) {
        return this.add(other.negate());
      }
      multiply(scalar) {
        return JacobianPoint.fromAffine(this).multiply(scalar, this).toAffine();
      }
      multiplyAndAddUnsafe(Q, a, b) {
        const P = JacobianPoint.fromAffine(this);
        const aP = a === _0n || a === _1n || this !== Point.BASE ? P.multiplyUnsafe(a) : P.multiply(a);
        const bQ = JacobianPoint.fromAffine(Q).multiplyUnsafe(b);
        const sum = aP.add(bQ);
        return sum.equals(JacobianPoint.ZERO) ? void 0 : sum.toAffine();
      }
    };
    Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
    Point.ZERO = new Point(_0n, _0n);
    Signature = class {
      constructor(r, s) {
        this.r = r;
        this.s = s;
        this.assertValidity();
      }
      static fromCompact(hex) {
        const arr = hex instanceof Uint8Array;
        const name2 = "Signature.fromCompact";
        if (typeof hex !== "string" && !arr)
          throw new TypeError(`${name2}: Expected string or Uint8Array`);
        const str = arr ? bytesToHex(hex) : hex;
        if (str.length !== 128)
          throw new Error(`${name2}: Expected 64-byte hex`);
        return new Signature(hexToNumber(str.slice(0, 64)), hexToNumber(str.slice(64, 128)));
      }
      static fromDER(hex) {
        const arr = hex instanceof Uint8Array;
        if (typeof hex !== "string" && !arr)
          throw new TypeError(`Signature.fromDER: Expected string or Uint8Array`);
        const { r, s } = parseDERSignature(arr ? hex : hexToBytes(hex));
        return new Signature(r, s);
      }
      static fromHex(hex) {
        return this.fromDER(hex);
      }
      assertValidity() {
        const { r, s } = this;
        if (!isWithinCurveOrder(r))
          throw new Error("Invalid Signature: r must be 0 < r < n");
        if (!isWithinCurveOrder(s))
          throw new Error("Invalid Signature: s must be 0 < s < n");
      }
      hasHighS() {
        const HALF = CURVE.n >> _1n;
        return this.s > HALF;
      }
      normalizeS() {
        return this.hasHighS() ? new Signature(this.r, CURVE.n - this.s) : this;
      }
      toDERRawBytes(isCompressed = false) {
        return hexToBytes(this.toDERHex(isCompressed));
      }
      toDERHex(isCompressed = false) {
        const sHex = sliceDER(numberToHexUnpadded(this.s));
        if (isCompressed)
          return sHex;
        const rHex = sliceDER(numberToHexUnpadded(this.r));
        const rLen = numberToHexUnpadded(rHex.length / 2);
        const sLen = numberToHexUnpadded(sHex.length / 2);
        const length2 = numberToHexUnpadded(rHex.length / 2 + sHex.length / 2 + 4);
        return `30${length2}02${rLen}${rHex}02${sLen}${sHex}`;
      }
      toRawBytes() {
        return this.toDERRawBytes();
      }
      toHex() {
        return this.toDERHex();
      }
      toCompactRawBytes() {
        return hexToBytes(this.toCompactHex());
      }
      toCompactHex() {
        return numTo32bStr(this.r) + numTo32bStr(this.s);
      }
    };
    hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
    POW_2_256 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
    divNearest = (a, b) => (a + b / _2n) / b;
    ENDO = {
      a1: BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
      b1: -_1n * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
      a2: BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
      b2: BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
      POW_2_128: BigInt("0x100000000000000000000000000000000")
    };
    HmacDrbg = class {
      constructor() {
        this.v = new Uint8Array(32).fill(1);
        this.k = new Uint8Array(32).fill(0);
        this.counter = 0;
      }
      hmac(...values) {
        return utils.hmacSha256(this.k, ...values);
      }
      hmacSync(...values) {
        return _hmacSha256Sync(this.k, ...values);
      }
      checkSync() {
        if (typeof _hmacSha256Sync !== "function")
          throw new ShaError("hmacSha256Sync needs to be set");
      }
      incr() {
        if (this.counter >= 1e3)
          throw new Error("Tried 1,000 k values for sign(), all were invalid");
        this.counter += 1;
      }
      async reseed(seed = new Uint8Array()) {
        this.k = await this.hmac(this.v, Uint8Array.from([0]), seed);
        this.v = await this.hmac(this.v);
        if (seed.length === 0)
          return;
        this.k = await this.hmac(this.v, Uint8Array.from([1]), seed);
        this.v = await this.hmac(this.v);
      }
      reseedSync(seed = new Uint8Array()) {
        this.checkSync();
        this.k = this.hmacSync(this.v, Uint8Array.from([0]), seed);
        this.v = this.hmacSync(this.v);
        if (seed.length === 0)
          return;
        this.k = this.hmacSync(this.v, Uint8Array.from([1]), seed);
        this.v = this.hmacSync(this.v);
      }
      async generate() {
        this.incr();
        this.v = await this.hmac(this.v);
        return this.v;
      }
      generateSync() {
        this.checkSync();
        this.incr();
        this.v = this.hmacSync(this.v);
        return this.v;
      }
    };
    vopts = { strict: true };
    Point.BASE._setWindowSize(8);
    crypto3 = {
      node: nodeCrypto,
      web: typeof self === "object" && "crypto" in self ? self.crypto : void 0
    };
    TAGGED_HASH_PREFIXES = {};
    utils = {
      bytesToHex,
      hexToBytes,
      concatBytes,
      mod: mod2,
      invert,
      isValidPrivateKey(privateKey) {
        try {
          normalizePrivateKey(privateKey);
          return true;
        } catch (error) {
          return false;
        }
      },
      _bigintTo32Bytes: numTo32b,
      _normalizePrivateKey: normalizePrivateKey,
      hashToPrivateKey: (hash) => {
        hash = ensureBytes(hash);
        if (hash.length < 40 || hash.length > 1024)
          throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
        const num = mod2(bytesToNumber(hash), CURVE.n - _1n) + _1n;
        return numTo32b(num);
      },
      randomBytes: (bytesLength = 32) => {
        if (crypto3.web) {
          return crypto3.web.getRandomValues(new Uint8Array(bytesLength));
        } else if (crypto3.node) {
          const { randomBytes: randomBytes2 } = crypto3.node;
          return Uint8Array.from(randomBytes2(bytesLength));
        } else {
          throw new Error("The environment doesn't have randomBytes function");
        }
      },
      randomPrivateKey: () => {
        return utils.hashToPrivateKey(utils.randomBytes(40));
      },
      sha256: async (...messages2) => {
        if (crypto3.web) {
          const buffer = await crypto3.web.subtle.digest("SHA-256", concatBytes(...messages2));
          return new Uint8Array(buffer);
        } else if (crypto3.node) {
          const { createHash } = crypto3.node;
          const hash = createHash("sha256");
          messages2.forEach((m) => hash.update(m));
          return Uint8Array.from(hash.digest());
        } else {
          throw new Error("The environment doesn't have sha256 function");
        }
      },
      hmacSha256: async (key, ...messages2) => {
        if (crypto3.web) {
          const ckey = await crypto3.web.subtle.importKey("raw", key, { name: "HMAC", hash: { name: "SHA-256" } }, false, ["sign"]);
          const message2 = concatBytes(...messages2);
          const buffer = await crypto3.web.subtle.sign("HMAC", ckey, message2);
          return new Uint8Array(buffer);
        } else if (crypto3.node) {
          const { createHmac } = crypto3.node;
          const hash = createHmac("sha256", key);
          messages2.forEach((m) => hash.update(m));
          return Uint8Array.from(hash.digest());
        } else {
          throw new Error("The environment doesn't have hmac-sha256 function");
        }
      },
      sha256Sync: void 0,
      hmacSha256Sync: void 0,
      taggedHash: async (tag, ...messages2) => {
        let tagP = TAGGED_HASH_PREFIXES[tag];
        if (tagP === void 0) {
          const tagH = await utils.sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
          tagP = concatBytes(tagH, tagH);
          TAGGED_HASH_PREFIXES[tag] = tagP;
        }
        return utils.sha256(tagP, ...messages2);
      },
      taggedHashSync: (tag, ...messages2) => {
        if (typeof _sha256Sync !== "function")
          throw new ShaError("sha256Sync is undefined, you need to set it");
        let tagP = TAGGED_HASH_PREFIXES[tag];
        if (tagP === void 0) {
          const tagH = _sha256Sync(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
          tagP = concatBytes(tagH, tagH);
          TAGGED_HASH_PREFIXES[tag] = tagP;
        }
        return _sha256Sync(tagP, ...messages2);
      },
      precompute(windowSize = 8, point = Point.BASE) {
        const cached = point === Point.BASE ? point : new Point(point.x, point.y);
        cached._setWindowSize(windowSize);
        cached.multiply(_3n);
        return cached;
      }
    };
    Object.defineProperties(utils, {
      sha256Sync: {
        configurable: false,
        get() {
          return _sha256Sync;
        },
        set(val) {
          if (!_sha256Sync)
            _sha256Sync = val;
        }
      },
      hmacSha256Sync: {
        configurable: false,
        get() {
          return _hmacSha256Sync;
        },
        set(val) {
          if (!_hmacSha256Sync)
            _hmacSha256Sync = val;
        }
      }
    });
  }
});

// node_modules/@libp2p/crypto/dist/src/random-bytes.js
function randomBytes(length2) {
  if (isNaN(length2) || length2 <= 0) {
    throw (0, import_err_code3.default)(new Error("random bytes length must be a Number bigger than 0"), "ERR_INVALID_LENGTH");
  }
  return utils.randomBytes(length2);
}
var import_err_code3;
var init_random_bytes = __esm({
  "node_modules/@libp2p/crypto/dist/src/random-bytes.js"() {
    init_esm();
    import_err_code3 = __toESM(require_err_code(), 1);
  }
});

// node_modules/@libp2p/crypto/dist/src/util.js
function bigIntegerToUintBase64url(num, len) {
  let buf = Uint8Array.from(num.abs().toByteArray());
  buf = buf[0] === 0 ? buf.slice(1) : buf;
  if (len != null) {
    if (buf.length > len)
      throw new Error("byte array longer than desired length");
    buf = concat([new Uint8Array(len - buf.length), buf]);
  }
  return toString2(buf, "base64url");
}
function base64urlToBigInteger(str) {
  const buf = base64urlToBuffer(str);
  return new import_forge.default.jsbn.BigInteger(toString2(buf, "base16"), 16);
}
function base64urlToBuffer(str, len) {
  let buf = fromString2(str, "base64urlpad");
  if (len != null) {
    if (buf.length > len)
      throw new Error("byte array longer than desired length");
    buf = concat([new Uint8Array(len - buf.length), buf]);
  }
  return buf;
}
var import_util, import_jsbn, import_forge;
var init_util = __esm({
  "node_modules/@libp2p/crypto/dist/src/util.js"() {
    import_util = __toESM(require_util2(), 1);
    import_jsbn = __toESM(require_jsbn(), 1);
    import_forge = __toESM(require_forge(), 1);
    init_from_string();
    init_to_string();
    init_concat();
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/rsa-utils.js
var rsa_utils_exports = {};
__export(rsa_utils_exports, {
  jwkToPkcs1: () => jwkToPkcs1,
  jwkToPkix: () => jwkToPkix,
  pkcs1ToJwk: () => pkcs1ToJwk,
  pkixToJwk: () => pkixToJwk
});
function pkcs1ToJwk(bytes) {
  const asn1 = import_forge2.default.asn1.fromDer(toString2(bytes, "ascii"));
  const privateKey = import_forge2.default.pki.privateKeyFromAsn1(asn1);
  return {
    kty: "RSA",
    n: bigIntegerToUintBase64url(privateKey.n),
    e: bigIntegerToUintBase64url(privateKey.e),
    d: bigIntegerToUintBase64url(privateKey.d),
    p: bigIntegerToUintBase64url(privateKey.p),
    q: bigIntegerToUintBase64url(privateKey.q),
    dp: bigIntegerToUintBase64url(privateKey.dP),
    dq: bigIntegerToUintBase64url(privateKey.dQ),
    qi: bigIntegerToUintBase64url(privateKey.qInv),
    alg: "RS256"
  };
}
function jwkToPkcs1(jwk) {
  if (jwk.n == null || jwk.e == null || jwk.d == null || jwk.p == null || jwk.q == null || jwk.dp == null || jwk.dq == null || jwk.qi == null) {
    throw (0, import_err_code4.default)(new Error("JWK was missing components"), "ERR_INVALID_PARAMETERS");
  }
  const asn1 = import_forge2.default.pki.privateKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e),
    d: base64urlToBigInteger(jwk.d),
    p: base64urlToBigInteger(jwk.p),
    q: base64urlToBigInteger(jwk.q),
    dP: base64urlToBigInteger(jwk.dp),
    dQ: base64urlToBigInteger(jwk.dq),
    qInv: base64urlToBigInteger(jwk.qi)
  });
  return fromString2(import_forge2.default.asn1.toDer(asn1).getBytes(), "ascii");
}
function pkixToJwk(bytes) {
  const asn1 = import_forge2.default.asn1.fromDer(toString2(bytes, "ascii"));
  const publicKey = import_forge2.default.pki.publicKeyFromAsn1(asn1);
  return {
    kty: "RSA",
    n: bigIntegerToUintBase64url(publicKey.n),
    e: bigIntegerToUintBase64url(publicKey.e)
  };
}
function jwkToPkix(jwk) {
  if (jwk.n == null || jwk.e == null) {
    throw (0, import_err_code4.default)(new Error("JWK was missing components"), "ERR_INVALID_PARAMETERS");
  }
  const asn1 = import_forge2.default.pki.publicKeyToAsn1({
    n: base64urlToBigInteger(jwk.n),
    e: base64urlToBigInteger(jwk.e)
  });
  return fromString2(import_forge2.default.asn1.toDer(asn1).getBytes(), "ascii");
}
var import_asn1, import_rsa, import_forge2, import_err_code4;
var init_rsa_utils = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/rsa-utils.js"() {
    import_asn1 = __toESM(require_asn1(), 1);
    import_rsa = __toESM(require_rsa(), 1);
    import_forge2 = __toESM(require_forge(), 1);
    init_util();
    init_from_string();
    init_to_string();
    import_err_code4 = __toESM(require_err_code(), 1);
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/rsa.js
async function generateKey(bits) {
  const key = await keypair("rsa", {
    modulusLength: bits,
    publicKeyEncoding: { type: "pkcs1", format: "jwk" },
    privateKeyEncoding: { type: "pkcs1", format: "jwk" }
  });
  return {
    privateKey: key.privateKey,
    publicKey: key.publicKey
  };
}
async function unmarshalPrivateKey(key) {
  if (key == null) {
    throw (0, import_err_code5.default)(new Error("Missing key parameter"), "ERR_MISSING_KEY");
  }
  return {
    privateKey: key,
    publicKey: {
      kty: key.kty,
      n: key.n,
      e: key.e
    }
  };
}
async function hashAndSign(key, msg) {
  return import_crypto3.default.createSign("RSA-SHA256").update(msg).sign({ format: "jwk", key });
}
async function hashAndVerify(key, sig, msg) {
  return import_crypto3.default.createVerify("RSA-SHA256").update(msg).verify({ format: "jwk", key }, sig);
}
function encrypt(key, bytes) {
  return import_crypto3.default.publicEncrypt({ format: "jwk", key, padding }, bytes);
}
function decrypt(key, bytes) {
  return import_crypto3.default.privateDecrypt({ format: "jwk", key, padding }, bytes);
}
var import_crypto3, import_util3, import_err_code5, keypair, padding;
var init_rsa = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/rsa.js"() {
    import_crypto3 = __toESM(require("crypto"), 1);
    import_util3 = require("util");
    import_err_code5 = __toESM(require_err_code(), 1);
    init_random_bytes();
    init_rsa_utils();
    keypair = (0, import_util3.promisify)(import_crypto3.default.generateKeyPair);
    padding = import_crypto3.default.constants.RSA_PKCS1_PADDING;
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/exporter.js
async function exporter(privateKey, password) {
  const cipher = create3();
  const encryptedKey = await cipher.encrypt(privateKey, password);
  return base64.encode(encryptedKey);
}
var init_exporter = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/exporter.js"() {
    init_base64();
    init_aes_gcm();
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/rsa-class.js
var rsa_class_exports = {};
__export(rsa_class_exports, {
  RsaPrivateKey: () => RsaPrivateKey,
  RsaPublicKey: () => RsaPublicKey,
  fromJwk: () => fromJwk,
  generateKeyPair: () => generateKeyPair,
  unmarshalRsaPrivateKey: () => unmarshalRsaPrivateKey,
  unmarshalRsaPublicKey: () => unmarshalRsaPublicKey
});
async function unmarshalRsaPrivateKey(bytes) {
  const jwk = rsa_utils_exports.pkcs1ToJwk(bytes);
  const keys = await unmarshalPrivateKey(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}
function unmarshalRsaPublicKey(bytes) {
  const jwk = rsa_utils_exports.pkixToJwk(bytes);
  return new RsaPublicKey(jwk);
}
async function fromJwk(jwk) {
  const keys = await unmarshalPrivateKey(jwk);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}
async function generateKeyPair(bits) {
  const keys = await generateKey(bits);
  return new RsaPrivateKey(keys.privateKey, keys.publicKey);
}
var import_err_code6, import_sha512, import_forge3, RsaPublicKey, RsaPrivateKey;
var init_rsa_class = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/rsa-class.js"() {
    init_sha2();
    import_err_code6 = __toESM(require_err_code(), 1);
    init_equals();
    init_to_string();
    import_sha512 = __toESM(require_sha512(), 1);
    import_forge3 = __toESM(require_forge(), 1);
    init_rsa();
    init_keys();
    init_exporter();
    RsaPublicKey = class {
      constructor(key) {
        this._key = key;
      }
      async verify(data, sig) {
        return await hashAndVerify(this._key, sig, data);
      }
      marshal() {
        return rsa_utils_exports.jwkToPkix(this._key);
      }
      get bytes() {
        return PublicKey.encode({
          Type: KeyType.RSA,
          Data: this.marshal()
        }).subarray();
      }
      encrypt(bytes) {
        return encrypt(this._key, bytes);
      }
      equals(key) {
        return equals3(this.bytes, key.bytes);
      }
      async hash() {
        const { bytes } = await sha256.digest(this.bytes);
        return bytes;
      }
    };
    RsaPrivateKey = class {
      constructor(key, publicKey) {
        this._key = key;
        this._publicKey = publicKey;
      }
      genSecret() {
        return randomBytes(16);
      }
      async sign(message2) {
        return await hashAndSign(this._key, message2);
      }
      get public() {
        if (this._publicKey == null) {
          throw (0, import_err_code6.default)(new Error("public key not provided"), "ERR_PUBKEY_NOT_PROVIDED");
        }
        return new RsaPublicKey(this._publicKey);
      }
      decrypt(bytes) {
        return decrypt(this._key, bytes);
      }
      marshal() {
        return rsa_utils_exports.jwkToPkcs1(this._key);
      }
      get bytes() {
        return PrivateKey.encode({
          Type: KeyType.RSA,
          Data: this.marshal()
        }).subarray();
      }
      equals(key) {
        return equals3(this.bytes, key.bytes);
      }
      async hash() {
        const { bytes } = await sha256.digest(this.bytes);
        return bytes;
      }
      async id() {
        const hash = await this.public.hash();
        return toString2(hash, "base58btc");
      }
      async export(password, format = "pkcs-8") {
        if (format === "pkcs-8") {
          const buffer = new import_forge3.default.util.ByteBuffer(this.marshal());
          const asn1 = import_forge3.default.asn1.fromDer(buffer);
          const privateKey = import_forge3.default.pki.privateKeyFromAsn1(asn1);
          const options = {
            algorithm: "aes256",
            count: 1e4,
            saltSize: 128 / 8,
            prfAlgorithm: "sha512"
          };
          return import_forge3.default.pki.encryptRsaPrivateKey(privateKey, password, options);
        } else if (format === "libp2p-key") {
          return await exporter(this.bytes, password);
        } else {
          throw (0, import_err_code6.default)(new Error(`export format '${format}' is not supported`), "ERR_INVALID_EXPORT_FORMAT");
        }
      }
    };
  }
});

// node_modules/@noble/ed25519/lib/esm/index.js
function assertExtPoint(other) {
  if (!(other instanceof ExtendedPoint))
    throw new TypeError("ExtendedPoint expected");
}
function assertRstPoint(other) {
  if (!(other instanceof RistrettoPoint))
    throw new TypeError("RistrettoPoint expected");
}
function legacyRist() {
  throw new Error("Legacy method: switch to RistrettoPoint");
}
function concatBytes2(...arrays) {
  if (!arrays.every((a) => a instanceof Uint8Array))
    throw new Error("Expected Uint8Array list");
  if (arrays.length === 1)
    return arrays[0];
  const length2 = arrays.reduce((a, arr) => a + arr.length, 0);
  const result = new Uint8Array(length2);
  for (let i = 0, pad = 0; i < arrays.length; i++) {
    const arr = arrays[i];
    result.set(arr, pad);
    pad += arr.length;
  }
  return result;
}
function bytesToHex2(uint8a) {
  if (!(uint8a instanceof Uint8Array))
    throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < uint8a.length; i++) {
    hex += hexes2[uint8a[i]];
  }
  return hex;
}
function hexToBytes2(hex) {
  if (typeof hex !== "string") {
    throw new TypeError("hexToBytes: expected string, got " + typeof hex);
  }
  if (hex.length % 2)
    throw new Error("hexToBytes: received invalid unpadded hex");
  const array = new Uint8Array(hex.length / 2);
  for (let i = 0; i < array.length; i++) {
    const j = i * 2;
    const hexByte = hex.slice(j, j + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error("Invalid byte sequence");
    array[i] = byte;
  }
  return array;
}
function numberTo32BytesBE(num) {
  const length2 = 32;
  const hex = num.toString(16).padStart(length2 * 2, "0");
  return hexToBytes2(hex);
}
function numberTo32BytesLE(num) {
  return numberTo32BytesBE(num).reverse();
}
function edIsNegative(num) {
  return (mod3(num) & _1n2) === _1n2;
}
function bytesToNumberLE(uint8a) {
  if (!(uint8a instanceof Uint8Array))
    throw new Error("Expected Uint8Array");
  return BigInt("0x" + bytesToHex2(Uint8Array.from(uint8a).reverse()));
}
function bytes255ToNumberLE(bytes) {
  return mod3(bytesToNumberLE(bytes) & MAX_255B);
}
function mod3(a, b = CURVE2.P) {
  const res = a % b;
  return res >= _0n2 ? res : b + res;
}
function invert2(number, modulo = CURVE2.P) {
  if (number === _0n2 || modulo <= _0n2) {
    throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
  }
  let a = mod3(number, modulo);
  let b = modulo;
  let x = _0n2, y = _1n2, u = _1n2, v = _0n2;
  while (a !== _0n2) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n;
  }
  const gcd = b;
  if (gcd !== _1n2)
    throw new Error("invert: does not exist");
  return mod3(x, modulo);
}
function invertBatch2(nums, p = CURVE2.P) {
  const tmp = new Array(nums.length);
  const lastMultiplied = nums.reduce((acc, num, i) => {
    if (num === _0n2)
      return acc;
    tmp[i] = acc;
    return mod3(acc * num, p);
  }, _1n2);
  const inverted = invert2(lastMultiplied, p);
  nums.reduceRight((acc, num, i) => {
    if (num === _0n2)
      return acc;
    tmp[i] = mod3(acc * tmp[i], p);
    return mod3(acc * num, p);
  }, inverted);
  return tmp;
}
function pow22(x, power) {
  const { P } = CURVE2;
  let res = x;
  while (power-- > _0n2) {
    res *= res;
    res %= P;
  }
  return res;
}
function pow_2_252_3(x) {
  const { P } = CURVE2;
  const _5n = BigInt(5);
  const _10n = BigInt(10);
  const _20n = BigInt(20);
  const _40n = BigInt(40);
  const _80n = BigInt(80);
  const x2 = x * x % P;
  const b2 = x2 * x % P;
  const b4 = pow22(b2, _2n2) * b2 % P;
  const b5 = pow22(b4, _1n2) * x % P;
  const b10 = pow22(b5, _5n) * b5 % P;
  const b20 = pow22(b10, _10n) * b10 % P;
  const b40 = pow22(b20, _20n) * b20 % P;
  const b80 = pow22(b40, _40n) * b40 % P;
  const b160 = pow22(b80, _80n) * b80 % P;
  const b240 = pow22(b160, _80n) * b80 % P;
  const b250 = pow22(b240, _10n) * b10 % P;
  const pow_p_5_8 = pow22(b250, _2n2) * x % P;
  return { pow_p_5_8, b2 };
}
function uvRatio(u, v) {
  const v3 = mod3(v * v * v);
  const v7 = mod3(v3 * v3 * v);
  const pow = pow_2_252_3(u * v7).pow_p_5_8;
  let x = mod3(u * v3 * pow);
  const vx2 = mod3(v * x * x);
  const root1 = x;
  const root2 = mod3(x * SQRT_M1);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod3(-u);
  const noRoot = vx2 === mod3(-u * SQRT_M1);
  if (useRoot1)
    x = root1;
  if (useRoot2 || noRoot)
    x = root2;
  if (edIsNegative(x))
    x = mod3(-x);
  return { isValid: useRoot1 || useRoot2, value: x };
}
function invertSqrt(number) {
  return uvRatio(_1n2, number);
}
function modlLE(hash) {
  return mod3(bytesToNumberLE(hash), CURVE2.l);
}
function equalBytes(b1, b2) {
  if (b1.length !== b2.length) {
    return false;
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] !== b2[i]) {
      return false;
    }
  }
  return true;
}
function ensureBytes2(hex, expectedLength) {
  const bytes = hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes2(hex);
  if (typeof expectedLength === "number" && bytes.length !== expectedLength)
    throw new Error(`Expected ${expectedLength} bytes`);
  return bytes;
}
function normalizeScalar2(num, max, strict = true) {
  if (!max)
    throw new TypeError("Specify max value");
  if (typeof num === "number" && Number.isSafeInteger(num))
    num = BigInt(num);
  if (typeof num === "bigint" && num < max) {
    if (strict) {
      if (_0n2 < num)
        return num;
    } else {
      if (_0n2 <= num)
        return num;
    }
  }
  throw new TypeError("Expected valid scalar: 0 < scalar < max");
}
function adjustBytes25519(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
function checkPrivateKey(key) {
  key = typeof key === "bigint" || typeof key === "number" ? numberTo32BytesBE(normalizeScalar2(key, POW_2_2562)) : ensureBytes2(key);
  if (key.length !== 32)
    throw new Error(`Expected 32 bytes`);
  return key;
}
function getKeyFromHash(hashed) {
  const head = adjustBytes25519(hashed.slice(0, 32));
  const prefix = hashed.slice(32, 64);
  const scalar = modlLE(head);
  const point = Point2.BASE.multiply(scalar);
  const pointBytes = point.toRawBytes();
  return { head, prefix, scalar, point, pointBytes };
}
async function getExtendedPublicKey(key) {
  return getKeyFromHash(await utils2.sha512(checkPrivateKey(key)));
}
async function getPublicKey2(privateKey) {
  return (await getExtendedPublicKey(privateKey)).pointBytes;
}
async function sign2(message2, privateKey) {
  message2 = ensureBytes2(message2);
  const { prefix, scalar, pointBytes } = await getExtendedPublicKey(privateKey);
  const r = modlLE(await utils2.sha512(prefix, message2));
  const R = Point2.BASE.multiply(r);
  const k = modlLE(await utils2.sha512(R.toRawBytes(), pointBytes, message2));
  const s = mod3(r + k * scalar, CURVE2.l);
  return new Signature2(R, s).toRawBytes();
}
function prepareVerification(sig, message2, publicKey) {
  message2 = ensureBytes2(message2);
  if (!(publicKey instanceof Point2))
    publicKey = Point2.fromHex(publicKey, false);
  const { r, s } = sig instanceof Signature2 ? sig.assertValidity() : Signature2.fromHex(sig);
  const SB = ExtendedPoint.BASE.multiplyUnsafe(s);
  return { r, s, SB, pub: publicKey, msg: message2 };
}
function finishVerification(publicKey, r, SB, hashed) {
  const k = modlLE(hashed);
  const kA = ExtendedPoint.fromAffine(publicKey).multiplyUnsafe(k);
  const RkA = ExtendedPoint.fromAffine(r).add(kA);
  return RkA.subtract(SB).multiplyUnsafe(CURVE2.h).equals(ExtendedPoint.ZERO);
}
async function verify2(sig, message2, publicKey) {
  const { r, SB, msg, pub } = prepareVerification(sig, message2, publicKey);
  const hashed = await utils2.sha512(r.toRawBytes(), pub.toRawBytes(), msg);
  return finishVerification(pub, r, SB, hashed);
}
var nodeCrypto2, _0n2, _1n2, _2n2, CU_O, CURVE2, POW_2_2562, SQRT_M1, SQRT_D, SQRT_AD_MINUS_ONE, INVSQRT_A_MINUS_D, ONE_MINUS_D_SQ, D_MINUS_ONE_SQ, ExtendedPoint, RistrettoPoint, pointPrecomputes2, Point2, Signature2, hexes2, MAX_255B, _sha512Sync, crypto5, utils2;
var init_esm2 = __esm({
  "node_modules/@noble/ed25519/lib/esm/index.js"() {
    nodeCrypto2 = __toESM(require("crypto"), 1);
    _0n2 = BigInt(0);
    _1n2 = BigInt(1);
    _2n2 = BigInt(2);
    CU_O = BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989");
    CURVE2 = Object.freeze({
      a: BigInt(-1),
      d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
      P: BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),
      l: CU_O,
      n: CU_O,
      h: BigInt(8),
      Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
      Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960")
    });
    POW_2_2562 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
    SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
    SQRT_D = BigInt("6853475219497561581579357271197624642482790079785650197046958215289687604742");
    SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
    INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
    ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
    D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
    ExtendedPoint = class {
      constructor(x, y, z, t) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.t = t;
      }
      static fromAffine(p) {
        if (!(p instanceof Point2)) {
          throw new TypeError("ExtendedPoint#fromAffine: expected Point");
        }
        if (p.equals(Point2.ZERO))
          return ExtendedPoint.ZERO;
        return new ExtendedPoint(p.x, p.y, _1n2, mod3(p.x * p.y));
      }
      static toAffineBatch(points) {
        const toInv = invertBatch2(points.map((p) => p.z));
        return points.map((p, i) => p.toAffine(toInv[i]));
      }
      static normalizeZ(points) {
        return this.toAffineBatch(points).map(this.fromAffine);
      }
      equals(other) {
        assertExtPoint(other);
        const { x: X1, y: Y1, z: Z1 } = this;
        const { x: X2, y: Y2, z: Z2 } = other;
        const X1Z2 = mod3(X1 * Z2);
        const X2Z1 = mod3(X2 * Z1);
        const Y1Z2 = mod3(Y1 * Z2);
        const Y2Z1 = mod3(Y2 * Z1);
        return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
      }
      negate() {
        return new ExtendedPoint(mod3(-this.x), this.y, this.z, mod3(-this.t));
      }
      double() {
        const { x: X1, y: Y1, z: Z1 } = this;
        const { a } = CURVE2;
        const A = mod3(X1 * X1);
        const B = mod3(Y1 * Y1);
        const C = mod3(_2n2 * mod3(Z1 * Z1));
        const D = mod3(a * A);
        const x1y1 = X1 + Y1;
        const E = mod3(mod3(x1y1 * x1y1) - A - B);
        const G = D + B;
        const F = G - C;
        const H = D - B;
        const X3 = mod3(E * F);
        const Y3 = mod3(G * H);
        const T3 = mod3(E * H);
        const Z3 = mod3(F * G);
        return new ExtendedPoint(X3, Y3, Z3, T3);
      }
      add(other) {
        assertExtPoint(other);
        const { x: X1, y: Y1, z: Z1, t: T1 } = this;
        const { x: X2, y: Y2, z: Z2, t: T2 } = other;
        const A = mod3((Y1 - X1) * (Y2 + X2));
        const B = mod3((Y1 + X1) * (Y2 - X2));
        const F = mod3(B - A);
        if (F === _0n2)
          return this.double();
        const C = mod3(Z1 * _2n2 * T2);
        const D = mod3(T1 * _2n2 * Z2);
        const E = D + C;
        const G = B + A;
        const H = D - C;
        const X3 = mod3(E * F);
        const Y3 = mod3(G * H);
        const T3 = mod3(E * H);
        const Z3 = mod3(F * G);
        return new ExtendedPoint(X3, Y3, Z3, T3);
      }
      subtract(other) {
        return this.add(other.negate());
      }
      precomputeWindow(W) {
        const windows = 1 + 256 / W;
        const points = [];
        let p = this;
        let base3 = p;
        for (let window2 = 0; window2 < windows; window2++) {
          base3 = p;
          points.push(base3);
          for (let i = 1; i < 2 ** (W - 1); i++) {
            base3 = base3.add(p);
            points.push(base3);
          }
          p = base3.double();
        }
        return points;
      }
      wNAF(n, affinePoint) {
        if (!affinePoint && this.equals(ExtendedPoint.BASE))
          affinePoint = Point2.BASE;
        const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
        if (256 % W) {
          throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
        }
        let precomputes = affinePoint && pointPrecomputes2.get(affinePoint);
        if (!precomputes) {
          precomputes = this.precomputeWindow(W);
          if (affinePoint && W !== 1) {
            precomputes = ExtendedPoint.normalizeZ(precomputes);
            pointPrecomputes2.set(affinePoint, precomputes);
          }
        }
        let p = ExtendedPoint.ZERO;
        let f = ExtendedPoint.ZERO;
        const windows = 1 + 256 / W;
        const windowSize = 2 ** (W - 1);
        const mask = BigInt(2 ** W - 1);
        const maxNumber = 2 ** W;
        const shiftBy = BigInt(W);
        for (let window2 = 0; window2 < windows; window2++) {
          const offset = window2 * windowSize;
          let wbits = Number(n & mask);
          n >>= shiftBy;
          if (wbits > windowSize) {
            wbits -= maxNumber;
            n += _1n2;
          }
          if (wbits === 0) {
            let pr = precomputes[offset];
            if (window2 % 2)
              pr = pr.negate();
            f = f.add(pr);
          } else {
            let cached = precomputes[offset + Math.abs(wbits) - 1];
            if (wbits < 0)
              cached = cached.negate();
            p = p.add(cached);
          }
        }
        return ExtendedPoint.normalizeZ([p, f])[0];
      }
      multiply(scalar, affinePoint) {
        return this.wNAF(normalizeScalar2(scalar, CURVE2.l), affinePoint);
      }
      multiplyUnsafe(scalar) {
        let n = normalizeScalar2(scalar, CURVE2.l, false);
        const G = ExtendedPoint.BASE;
        const P0 = ExtendedPoint.ZERO;
        if (n === _0n2)
          return P0;
        if (this.equals(P0) || n === _1n2)
          return this;
        if (this.equals(G))
          return this.wNAF(n);
        let p = P0;
        let d = this;
        while (n > _0n2) {
          if (n & _1n2)
            p = p.add(d);
          d = d.double();
          n >>= _1n2;
        }
        return p;
      }
      isSmallOrder() {
        return this.multiplyUnsafe(CURVE2.h).equals(ExtendedPoint.ZERO);
      }
      isTorsionFree() {
        return this.multiplyUnsafe(CURVE2.l).equals(ExtendedPoint.ZERO);
      }
      toAffine(invZ = invert2(this.z)) {
        const { x, y, z } = this;
        const ax = mod3(x * invZ);
        const ay = mod3(y * invZ);
        const zz = mod3(z * invZ);
        if (zz !== _1n2)
          throw new Error("invZ was invalid");
        return new Point2(ax, ay);
      }
      fromRistrettoBytes() {
        legacyRist();
      }
      toRistrettoBytes() {
        legacyRist();
      }
      fromRistrettoHash() {
        legacyRist();
      }
    };
    ExtendedPoint.BASE = new ExtendedPoint(CURVE2.Gx, CURVE2.Gy, _1n2, mod3(CURVE2.Gx * CURVE2.Gy));
    ExtendedPoint.ZERO = new ExtendedPoint(_0n2, _1n2, _1n2, _0n2);
    RistrettoPoint = class {
      constructor(ep) {
        this.ep = ep;
      }
      static calcElligatorRistrettoMap(r0) {
        const { d } = CURVE2;
        const r = mod3(SQRT_M1 * r0 * r0);
        const Ns = mod3((r + _1n2) * ONE_MINUS_D_SQ);
        let c = BigInt(-1);
        const D = mod3((c - d * r) * mod3(r + d));
        let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
        let s_ = mod3(s * r0);
        if (!edIsNegative(s_))
          s_ = mod3(-s_);
        if (!Ns_D_is_sq)
          s = s_;
        if (!Ns_D_is_sq)
          c = r;
        const Nt = mod3(c * (r - _1n2) * D_MINUS_ONE_SQ - D);
        const s2 = s * s;
        const W0 = mod3((s + s) * D);
        const W1 = mod3(Nt * SQRT_AD_MINUS_ONE);
        const W2 = mod3(_1n2 - s2);
        const W3 = mod3(_1n2 + s2);
        return new ExtendedPoint(mod3(W0 * W3), mod3(W2 * W1), mod3(W1 * W3), mod3(W0 * W2));
      }
      static hashToCurve(hex) {
        hex = ensureBytes2(hex, 64);
        const r1 = bytes255ToNumberLE(hex.slice(0, 32));
        const R1 = this.calcElligatorRistrettoMap(r1);
        const r2 = bytes255ToNumberLE(hex.slice(32, 64));
        const R2 = this.calcElligatorRistrettoMap(r2);
        return new RistrettoPoint(R1.add(R2));
      }
      static fromHex(hex) {
        hex = ensureBytes2(hex, 32);
        const { a, d } = CURVE2;
        const emsg = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint";
        const s = bytes255ToNumberLE(hex);
        if (!equalBytes(numberTo32BytesLE(s), hex) || edIsNegative(s))
          throw new Error(emsg);
        const s2 = mod3(s * s);
        const u1 = mod3(_1n2 + a * s2);
        const u2 = mod3(_1n2 - a * s2);
        const u1_2 = mod3(u1 * u1);
        const u2_2 = mod3(u2 * u2);
        const v = mod3(a * d * u1_2 - u2_2);
        const { isValid, value: I } = invertSqrt(mod3(v * u2_2));
        const Dx = mod3(I * u2);
        const Dy = mod3(I * Dx * v);
        let x = mod3((s + s) * Dx);
        if (edIsNegative(x))
          x = mod3(-x);
        const y = mod3(u1 * Dy);
        const t = mod3(x * y);
        if (!isValid || edIsNegative(t) || y === _0n2)
          throw new Error(emsg);
        return new RistrettoPoint(new ExtendedPoint(x, y, _1n2, t));
      }
      toRawBytes() {
        let { x, y, z, t } = this.ep;
        const u1 = mod3(mod3(z + y) * mod3(z - y));
        const u2 = mod3(x * y);
        const u2sq = mod3(u2 * u2);
        const { value: invsqrt } = invertSqrt(mod3(u1 * u2sq));
        const D1 = mod3(invsqrt * u1);
        const D2 = mod3(invsqrt * u2);
        const zInv = mod3(D1 * D2 * t);
        let D;
        if (edIsNegative(t * zInv)) {
          let _x = mod3(y * SQRT_M1);
          let _y = mod3(x * SQRT_M1);
          x = _x;
          y = _y;
          D = mod3(D1 * INVSQRT_A_MINUS_D);
        } else {
          D = D2;
        }
        if (edIsNegative(x * zInv))
          y = mod3(-y);
        let s = mod3((z - y) * D);
        if (edIsNegative(s))
          s = mod3(-s);
        return numberTo32BytesLE(s);
      }
      toHex() {
        return bytesToHex2(this.toRawBytes());
      }
      toString() {
        return this.toHex();
      }
      equals(other) {
        assertRstPoint(other);
        const a = this.ep;
        const b = other.ep;
        const one = mod3(a.x * b.y) === mod3(a.y * b.x);
        const two = mod3(a.y * b.y) === mod3(a.x * b.x);
        return one || two;
      }
      add(other) {
        assertRstPoint(other);
        return new RistrettoPoint(this.ep.add(other.ep));
      }
      subtract(other) {
        assertRstPoint(other);
        return new RistrettoPoint(this.ep.subtract(other.ep));
      }
      multiply(scalar) {
        return new RistrettoPoint(this.ep.multiply(scalar));
      }
      multiplyUnsafe(scalar) {
        return new RistrettoPoint(this.ep.multiplyUnsafe(scalar));
      }
    };
    RistrettoPoint.BASE = new RistrettoPoint(ExtendedPoint.BASE);
    RistrettoPoint.ZERO = new RistrettoPoint(ExtendedPoint.ZERO);
    pointPrecomputes2 = /* @__PURE__ */ new WeakMap();
    Point2 = class {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      _setWindowSize(windowSize) {
        this._WINDOW_SIZE = windowSize;
        pointPrecomputes2.delete(this);
      }
      static fromHex(hex, strict = true) {
        const { d, P } = CURVE2;
        hex = ensureBytes2(hex, 32);
        const normed = hex.slice();
        normed[31] = hex[31] & ~128;
        const y = bytesToNumberLE(normed);
        if (strict && y >= P)
          throw new Error("Expected 0 < hex < P");
        if (!strict && y >= POW_2_2562)
          throw new Error("Expected 0 < hex < 2**256");
        const y2 = mod3(y * y);
        const u = mod3(y2 - _1n2);
        const v = mod3(d * y2 + _1n2);
        let { isValid, value: x } = uvRatio(u, v);
        if (!isValid)
          throw new Error("Point.fromHex: invalid y coordinate");
        const isXOdd = (x & _1n2) === _1n2;
        const isLastByteOdd = (hex[31] & 128) !== 0;
        if (isLastByteOdd !== isXOdd) {
          x = mod3(-x);
        }
        return new Point2(x, y);
      }
      static async fromPrivateKey(privateKey) {
        return (await getExtendedPublicKey(privateKey)).point;
      }
      toRawBytes() {
        const bytes = numberTo32BytesLE(this.y);
        bytes[31] |= this.x & _1n2 ? 128 : 0;
        return bytes;
      }
      toHex() {
        return bytesToHex2(this.toRawBytes());
      }
      toX25519() {
        const { y } = this;
        const u = mod3((_1n2 + y) * invert2(_1n2 - y));
        return numberTo32BytesLE(u);
      }
      isTorsionFree() {
        return ExtendedPoint.fromAffine(this).isTorsionFree();
      }
      equals(other) {
        return this.x === other.x && this.y === other.y;
      }
      negate() {
        return new Point2(mod3(-this.x), this.y);
      }
      add(other) {
        return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
      }
      subtract(other) {
        return this.add(other.negate());
      }
      multiply(scalar) {
        return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
      }
    };
    Point2.BASE = new Point2(CURVE2.Gx, CURVE2.Gy);
    Point2.ZERO = new Point2(_0n2, _1n2);
    Signature2 = class {
      constructor(r, s) {
        this.r = r;
        this.s = s;
        this.assertValidity();
      }
      static fromHex(hex) {
        const bytes = ensureBytes2(hex, 64);
        const r = Point2.fromHex(bytes.slice(0, 32), false);
        const s = bytesToNumberLE(bytes.slice(32, 64));
        return new Signature2(r, s);
      }
      assertValidity() {
        const { r, s } = this;
        if (!(r instanceof Point2))
          throw new Error("Expected Point instance");
        normalizeScalar2(s, CURVE2.l, false);
        return this;
      }
      toRawBytes() {
        const u8 = new Uint8Array(64);
        u8.set(this.r.toRawBytes());
        u8.set(numberTo32BytesLE(this.s), 32);
        return u8;
      }
      toHex() {
        return bytesToHex2(this.toRawBytes());
      }
    };
    hexes2 = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
    MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    Point2.BASE._setWindowSize(8);
    crypto5 = {
      node: nodeCrypto2,
      web: typeof self === "object" && "crypto" in self ? self.crypto : void 0
    };
    utils2 = {
      bytesToHex: bytesToHex2,
      hexToBytes: hexToBytes2,
      concatBytes: concatBytes2,
      getExtendedPublicKey,
      mod: mod3,
      invert: invert2,
      TORSION_SUBGROUP: [
        "0100000000000000000000000000000000000000000000000000000000000000",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
        "0000000000000000000000000000000000000000000000000000000000000080",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
        "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
        "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
        "0000000000000000000000000000000000000000000000000000000000000000",
        "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"
      ],
      hashToPrivateScalar: (hash) => {
        hash = ensureBytes2(hash);
        if (hash.length < 40 || hash.length > 1024)
          throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
        return mod3(bytesToNumberLE(hash), CURVE2.l - _1n2) + _1n2;
      },
      randomBytes: (bytesLength = 32) => {
        if (crypto5.web) {
          return crypto5.web.getRandomValues(new Uint8Array(bytesLength));
        } else if (crypto5.node) {
          const { randomBytes: randomBytes2 } = crypto5.node;
          return new Uint8Array(randomBytes2(bytesLength).buffer);
        } else {
          throw new Error("The environment doesn't have randomBytes function");
        }
      },
      randomPrivateKey: () => {
        return utils2.randomBytes(32);
      },
      sha512: async (...messages2) => {
        const message2 = concatBytes2(...messages2);
        if (crypto5.web) {
          const buffer = await crypto5.web.subtle.digest("SHA-512", message2.buffer);
          return new Uint8Array(buffer);
        } else if (crypto5.node) {
          return Uint8Array.from(crypto5.node.createHash("sha512").update(message2).digest());
        } else {
          throw new Error("The environment doesn't have sha512 function");
        }
      },
      precompute(windowSize = 8, point = Point2.BASE) {
        const cached = point.equals(Point2.BASE) ? point : new Point2(point.x, point.y);
        cached._setWindowSize(windowSize);
        cached.multiply(_2n2);
        return cached;
      },
      sha512Sync: void 0
    };
    Object.defineProperties(utils2, {
      sha512Sync: {
        configurable: false,
        get() {
          return _sha512Sync;
        },
        set(val) {
          if (!_sha512Sync)
            _sha512Sync = val;
        }
      }
    });
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/ed25519.js
async function generateKey2() {
  const privateKeyRaw = utils2.randomPrivateKey();
  const publicKey = await getPublicKey2(privateKeyRaw);
  const privateKey = concatKeys(privateKeyRaw, publicKey);
  return {
    privateKey,
    publicKey
  };
}
async function generateKeyFromSeed(seed) {
  if (seed.length !== KEYS_BYTE_LENGTH) {
    throw new TypeError('"seed" must be 32 bytes in length.');
  } else if (!(seed instanceof Uint8Array)) {
    throw new TypeError('"seed" must be a node.js Buffer, or Uint8Array.');
  }
  const privateKeyRaw = seed;
  const publicKey = await getPublicKey2(privateKeyRaw);
  const privateKey = concatKeys(privateKeyRaw, publicKey);
  return {
    privateKey,
    publicKey
  };
}
async function hashAndSign2(privateKey, msg) {
  const privateKeyRaw = privateKey.slice(0, KEYS_BYTE_LENGTH);
  return await sign2(msg, privateKeyRaw);
}
async function hashAndVerify2(publicKey, sig, msg) {
  return await verify2(sig, msg, publicKey);
}
function concatKeys(privateKeyRaw, publicKey) {
  const privateKey = new Uint8Array(PRIVATE_KEY_BYTE_LENGTH);
  for (let i = 0; i < KEYS_BYTE_LENGTH; i++) {
    privateKey[i] = privateKeyRaw[i];
    privateKey[KEYS_BYTE_LENGTH + i] = publicKey[i];
  }
  return privateKey;
}
var PUBLIC_KEY_BYTE_LENGTH, PRIVATE_KEY_BYTE_LENGTH, KEYS_BYTE_LENGTH;
var init_ed25519 = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/ed25519.js"() {
    init_esm2();
    PUBLIC_KEY_BYTE_LENGTH = 32;
    PRIVATE_KEY_BYTE_LENGTH = 64;
    KEYS_BYTE_LENGTH = 32;
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/ed25519-class.js
var ed25519_class_exports = {};
__export(ed25519_class_exports, {
  Ed25519PrivateKey: () => Ed25519PrivateKey,
  Ed25519PublicKey: () => Ed25519PublicKey,
  generateKeyPair: () => generateKeyPair2,
  generateKeyPairFromSeed: () => generateKeyPairFromSeed,
  unmarshalEd25519PrivateKey: () => unmarshalEd25519PrivateKey,
  unmarshalEd25519PublicKey: () => unmarshalEd25519PublicKey
});
function unmarshalEd25519PrivateKey(bytes) {
  if (bytes.length > PRIVATE_KEY_BYTE_LENGTH) {
    bytes = ensureKey(bytes, PRIVATE_KEY_BYTE_LENGTH + PUBLIC_KEY_BYTE_LENGTH);
    const privateKeyBytes2 = bytes.slice(0, PRIVATE_KEY_BYTE_LENGTH);
    const publicKeyBytes2 = bytes.slice(PRIVATE_KEY_BYTE_LENGTH, bytes.length);
    return new Ed25519PrivateKey(privateKeyBytes2, publicKeyBytes2);
  }
  bytes = ensureKey(bytes, PRIVATE_KEY_BYTE_LENGTH);
  const privateKeyBytes = bytes.slice(0, PRIVATE_KEY_BYTE_LENGTH);
  const publicKeyBytes = bytes.slice(PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PrivateKey(privateKeyBytes, publicKeyBytes);
}
function unmarshalEd25519PublicKey(bytes) {
  bytes = ensureKey(bytes, PUBLIC_KEY_BYTE_LENGTH);
  return new Ed25519PublicKey(bytes);
}
async function generateKeyPair2() {
  const { privateKey, publicKey } = await generateKey2();
  return new Ed25519PrivateKey(privateKey, publicKey);
}
async function generateKeyPairFromSeed(seed) {
  const { privateKey, publicKey } = await generateKeyFromSeed(seed);
  return new Ed25519PrivateKey(privateKey, publicKey);
}
function ensureKey(key, length2) {
  key = Uint8Array.from(key ?? []);
  if (key.length !== length2) {
    throw (0, import_err_code7.default)(new Error(`Key must be a Uint8Array of length ${length2}, got ${key.length}`), "ERR_INVALID_KEY_TYPE");
  }
  return key;
}
var import_err_code7, Ed25519PublicKey, Ed25519PrivateKey;
var init_ed25519_class = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/ed25519-class.js"() {
    import_err_code7 = __toESM(require_err_code(), 1);
    init_equals();
    init_sha2();
    init_base58();
    init_identity2();
    init_ed25519();
    init_keys();
    init_exporter();
    Ed25519PublicKey = class {
      constructor(key) {
        this._key = ensureKey(key, PUBLIC_KEY_BYTE_LENGTH);
      }
      async verify(data, sig) {
        return await hashAndVerify2(this._key, sig, data);
      }
      marshal() {
        return this._key;
      }
      get bytes() {
        return PublicKey.encode({
          Type: KeyType.Ed25519,
          Data: this.marshal()
        }).subarray();
      }
      equals(key) {
        return equals3(this.bytes, key.bytes);
      }
      async hash() {
        const { bytes } = await sha256.digest(this.bytes);
        return bytes;
      }
    };
    Ed25519PrivateKey = class {
      constructor(key, publicKey) {
        this._key = ensureKey(key, PRIVATE_KEY_BYTE_LENGTH);
        this._publicKey = ensureKey(publicKey, PUBLIC_KEY_BYTE_LENGTH);
      }
      async sign(message2) {
        return await hashAndSign2(this._key, message2);
      }
      get public() {
        return new Ed25519PublicKey(this._publicKey);
      }
      marshal() {
        return this._key;
      }
      get bytes() {
        return PrivateKey.encode({
          Type: KeyType.Ed25519,
          Data: this.marshal()
        }).subarray();
      }
      equals(key) {
        return equals3(this.bytes, key.bytes);
      }
      async hash() {
        const { bytes } = await sha256.digest(this.bytes);
        return bytes;
      }
      async id() {
        const encoding = await identity2.digest(this.public.bytes);
        return base58btc.encode(encoding.bytes).substring(1);
      }
      async export(password, format = "libp2p-key") {
        if (format === "libp2p-key") {
          return await exporter(this.bytes, password);
        } else {
          throw (0, import_err_code7.default)(new Error(`export format '${format}' is not supported`), "ERR_INVALID_EXPORT_FORMAT");
        }
      }
    };
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1.js
function generateKey3() {
  return utils.randomPrivateKey();
}
async function hashAndSign3(key, msg) {
  const { digest: digest2 } = await sha256.digest(msg);
  try {
    return await sign(digest2, key);
  } catch (err) {
    throw (0, import_err_code8.default)(err, "ERR_INVALID_INPUT");
  }
}
async function hashAndVerify3(key, sig, msg) {
  try {
    const { digest: digest2 } = await sha256.digest(msg);
    return verify(sig, digest2, key);
  } catch (err) {
    throw (0, import_err_code8.default)(err, "ERR_INVALID_INPUT");
  }
}
function compressPublicKey(key) {
  const point = Point.fromHex(key).toRawBytes(true);
  return point;
}
function validatePrivateKey(key) {
  try {
    getPublicKey(key, true);
  } catch (err) {
    throw (0, import_err_code8.default)(err, "ERR_INVALID_PRIVATE_KEY");
  }
}
function validatePublicKey(key) {
  try {
    Point.fromHex(key);
  } catch (err) {
    throw (0, import_err_code8.default)(err, "ERR_INVALID_PUBLIC_KEY");
  }
}
function computePublicKey(privateKey) {
  try {
    return getPublicKey(privateKey, true);
  } catch (err) {
    throw (0, import_err_code8.default)(err, "ERR_INVALID_PRIVATE_KEY");
  }
}
var import_err_code8;
var init_secp256k1 = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/secp256k1.js"() {
    import_err_code8 = __toESM(require_err_code(), 1);
    init_esm();
    init_sha2();
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/secp256k1-class.js
var secp256k1_class_exports = {};
__export(secp256k1_class_exports, {
  Secp256k1PrivateKey: () => Secp256k1PrivateKey,
  Secp256k1PublicKey: () => Secp256k1PublicKey,
  generateKeyPair: () => generateKeyPair3,
  unmarshalSecp256k1PrivateKey: () => unmarshalSecp256k1PrivateKey,
  unmarshalSecp256k1PublicKey: () => unmarshalSecp256k1PublicKey
});
function unmarshalSecp256k1PrivateKey(bytes) {
  return new Secp256k1PrivateKey(bytes);
}
function unmarshalSecp256k1PublicKey(bytes) {
  return new Secp256k1PublicKey(bytes);
}
async function generateKeyPair3() {
  const privateKeyBytes = await generateKey3();
  return new Secp256k1PrivateKey(privateKeyBytes);
}
var import_err_code9, Secp256k1PublicKey, Secp256k1PrivateKey;
var init_secp256k1_class = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/secp256k1-class.js"() {
    init_sha2();
    import_err_code9 = __toESM(require_err_code(), 1);
    init_equals();
    init_to_string();
    init_secp256k1();
    init_exporter();
    init_keys();
    Secp256k1PublicKey = class {
      constructor(key) {
        validatePublicKey(key);
        this._key = key;
      }
      async verify(data, sig) {
        return await hashAndVerify3(this._key, sig, data);
      }
      marshal() {
        return compressPublicKey(this._key);
      }
      get bytes() {
        return PublicKey.encode({
          Type: KeyType.Secp256k1,
          Data: this.marshal()
        }).subarray();
      }
      equals(key) {
        return equals3(this.bytes, key.bytes);
      }
      async hash() {
        const { bytes } = await sha256.digest(this.bytes);
        return bytes;
      }
    };
    Secp256k1PrivateKey = class {
      constructor(key, publicKey) {
        this._key = key;
        this._publicKey = publicKey ?? computePublicKey(key);
        validatePrivateKey(this._key);
        validatePublicKey(this._publicKey);
      }
      async sign(message2) {
        return await hashAndSign3(this._key, message2);
      }
      get public() {
        return new Secp256k1PublicKey(this._publicKey);
      }
      marshal() {
        return this._key;
      }
      get bytes() {
        return PrivateKey.encode({
          Type: KeyType.Secp256k1,
          Data: this.marshal()
        }).subarray();
      }
      equals(key) {
        return equals3(this.bytes, key.bytes);
      }
      async hash() {
        const { bytes } = await sha256.digest(this.bytes);
        return bytes;
      }
      async id() {
        const hash = await this.public.hash();
        return toString2(hash, "base58btc");
      }
      async export(password, format = "libp2p-key") {
        if (format === "libp2p-key") {
          return await exporter(this.bytes, password);
        } else {
          throw (0, import_err_code9.default)(new Error(`export format '${format}' is not supported`), "ERR_INVALID_EXPORT_FORMAT");
        }
      }
    };
  }
});

// node_modules/@libp2p/crypto/dist/src/keys/index.js
function unsupportedKey(type) {
  const supported = Object.keys(supportedKeys).join(" / ");
  return (0, import_err_code10.default)(new Error(`invalid or unsupported key type ${type}. Must be ${supported}`), "ERR_UNSUPPORTED_KEY_TYPE");
}
function typeToKey(type) {
  type = type.toLowerCase();
  if (type === "rsa" || type === "ed25519" || type === "secp256k1") {
    return supportedKeys[type];
  }
  throw unsupportedKey(type);
}
async function generateKeyPair4(type, bits) {
  return await typeToKey(type).generateKeyPair(bits ?? 2048);
}
function unmarshalPublicKey(buf) {
  const decoded = PublicKey.decode(buf);
  const data = decoded.Data;
  switch (decoded.Type) {
    case KeyType.RSA:
      return supportedKeys.rsa.unmarshalRsaPublicKey(data);
    case KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PublicKey(data);
    case KeyType.Secp256k1:
      return supportedKeys.secp256k1.unmarshalSecp256k1PublicKey(data);
    default:
      throw unsupportedKey(decoded.Type);
  }
}
function marshalPublicKey(key, type) {
  type = (type ?? "rsa").toLowerCase();
  typeToKey(type);
  return key.bytes;
}
async function unmarshalPrivateKey2(buf) {
  const decoded = PrivateKey.decode(buf);
  const data = decoded.Data;
  switch (decoded.Type) {
    case KeyType.RSA:
      return await supportedKeys.rsa.unmarshalRsaPrivateKey(data);
    case KeyType.Ed25519:
      return supportedKeys.ed25519.unmarshalEd25519PrivateKey(data);
    case KeyType.Secp256k1:
      return supportedKeys.secp256k1.unmarshalSecp256k1PrivateKey(data);
    default:
      throw unsupportedKey(decoded.Type);
  }
}
function marshalPrivateKey(key, type) {
  type = (type ?? "rsa").toLowerCase();
  typeToKey(type);
  return key.bytes;
}
var import_asn12, import_pbe, import_forge4, import_err_code10, supportedKeys;
var init_keys2 = __esm({
  "node_modules/@libp2p/crypto/dist/src/keys/index.js"() {
    init_keys();
    import_asn12 = __toESM(require_asn1(), 1);
    import_pbe = __toESM(require_pbe(), 1);
    import_forge4 = __toESM(require_forge(), 1);
    import_err_code10 = __toESM(require_err_code(), 1);
    init_from_string();
    init_key_stretcher();
    init_ephemeral_keys();
    init_importer();
    init_rsa_class();
    init_ed25519_class();
    init_secp256k1_class();
    supportedKeys = {
      rsa: rsa_class_exports,
      ed25519: ed25519_class_exports,
      secp256k1: secp256k1_class_exports
    };
  }
});

// node_modules/@libp2p/interface-peer-id/dist/src/index.js
var symbol;
var init_src3 = __esm({
  "node_modules/@libp2p/interface-peer-id/dist/src/index.js"() {
    symbol = Symbol.for("@libp2p/peer-id");
  }
});

// node_modules/@libp2p/peer-id/dist/src/index.js
function peerIdFromString(str, decoder) {
  decoder = decoder ?? baseDecoder;
  if (str.charAt(0) === "1" || str.charAt(0) === "Q") {
    const multihash = decode5(base58btc.decode(`z${str}`));
    if (str.startsWith("12D")) {
      return new Ed25519PeerIdImpl({ multihash });
    } else if (str.startsWith("16U")) {
      return new Secp256k1PeerIdImpl({ multihash });
    } else {
      return new RSAPeerIdImpl({ multihash });
    }
  }
  return peerIdFromBytes(baseDecoder.decode(str));
}
function peerIdFromBytes(buf) {
  try {
    const multihash = decode5(buf);
    if (multihash.code === identity2.code) {
      if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
        return new Ed25519PeerIdImpl({ multihash });
      } else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
        return new Secp256k1PeerIdImpl({ multihash });
      }
    }
    if (multihash.code === sha256.code) {
      return new RSAPeerIdImpl({ multihash });
    }
  } catch {
    return peerIdFromCID(CID.decode(buf));
  }
  throw new Error("Supplied PeerID CID is invalid");
}
function peerIdFromCID(cid) {
  if (cid == null || cid.multihash == null || cid.version == null || cid.version === 1 && cid.code !== LIBP2P_KEY_CODE) {
    throw new Error("Supplied PeerID CID is invalid");
  }
  const multihash = cid.multihash;
  if (multihash.code === sha256.code) {
    return new RSAPeerIdImpl({ multihash: cid.multihash });
  } else if (multihash.code === identity2.code) {
    if (multihash.digest.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
      return new Ed25519PeerIdImpl({ multihash: cid.multihash });
    } else if (multihash.digest.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
      return new Secp256k1PeerIdImpl({ multihash: cid.multihash });
    }
  }
  throw new Error("Supplied PeerID CID is invalid");
}
async function peerIdFromKeys(publicKey, privateKey) {
  if (publicKey.length === MARSHALLED_ED225519_PUBLIC_KEY_LENGTH) {
    return new Ed25519PeerIdImpl({ multihash: create(identity2.code, publicKey), privateKey });
  }
  if (publicKey.length === MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH) {
    return new Secp256k1PeerIdImpl({ multihash: create(identity2.code, publicKey), privateKey });
  }
  return new RSAPeerIdImpl({ multihash: await sha256.digest(publicKey), publicKey, privateKey });
}
var import_err_code11, baseDecoder, LIBP2P_KEY_CODE, MARSHALLED_ED225519_PUBLIC_KEY_LENGTH, MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH, PeerIdImpl, RSAPeerIdImpl, Ed25519PeerIdImpl, Secp256k1PeerIdImpl;
var init_src4 = __esm({
  "node_modules/@libp2p/peer-id/dist/src/index.js"() {
    init_cid();
    init_basics();
    init_base58();
    init_digest();
    init_identity2();
    init_equals();
    init_sha2();
    import_err_code11 = __toESM(require_err_code(), 1);
    init_src3();
    baseDecoder = Object.values(bases).map((codec) => codec.decoder).reduce((acc, curr) => acc.or(curr), bases.identity.decoder);
    LIBP2P_KEY_CODE = 114;
    MARSHALLED_ED225519_PUBLIC_KEY_LENGTH = 36;
    MARSHALLED_SECP256K1_PUBLIC_KEY_LENGTH = 37;
    PeerIdImpl = class {
      constructor(init) {
        this.type = init.type;
        this.multihash = init.multihash;
        this.privateKey = init.privateKey;
        Object.defineProperty(this, "string", {
          enumerable: false,
          writable: true
        });
      }
      get [Symbol.toStringTag]() {
        return `PeerId(${this.toString()})`;
      }
      get [symbol]() {
        return true;
      }
      toString() {
        if (this.string == null) {
          this.string = base58btc.encode(this.multihash.bytes).slice(1);
        }
        return this.string;
      }
      toCID() {
        return CID.createV1(LIBP2P_KEY_CODE, this.multihash);
      }
      toBytes() {
        return this.multihash.bytes;
      }
      toJSON() {
        return this.toString();
      }
      equals(id) {
        var _a;
        if (id instanceof Uint8Array) {
          return equals3(this.multihash.bytes, id);
        } else if (typeof id === "string") {
          return peerIdFromString(id).equals(this);
        } else if (((_a = id == null ? void 0 : id.multihash) == null ? void 0 : _a.bytes) != null) {
          return equals3(this.multihash.bytes, id.multihash.bytes);
        } else {
          throw new Error("not valid Id");
        }
      }
    };
    RSAPeerIdImpl = class extends PeerIdImpl {
      constructor(init) {
        super({ ...init, type: "RSA" });
        this.type = "RSA";
        this.publicKey = init.publicKey;
      }
    };
    Ed25519PeerIdImpl = class extends PeerIdImpl {
      constructor(init) {
        super({ ...init, type: "Ed25519" });
        this.type = "Ed25519";
        this.publicKey = init.multihash.digest;
      }
    };
    Secp256k1PeerIdImpl = class extends PeerIdImpl {
      constructor(init) {
        super({ ...init, type: "secp256k1" });
        this.type = "secp256k1";
        this.publicKey = init.multihash.digest;
      }
    };
  }
});

// node_modules/@libp2p/peer-id-factory/dist/src/proto.js
var PeerIdProto;
var init_proto = __esm({
  "node_modules/@libp2p/peer-id-factory/dist/src/proto.js"() {
    init_src2();
    (function(PeerIdProto2) {
      let _codec;
      PeerIdProto2.codec = () => {
        if (_codec == null) {
          _codec = message((obj, writer, opts = {}) => {
            if (opts.lengthDelimited !== false) {
              writer.fork();
            }
            if (obj.id != null) {
              writer.uint32(10);
              writer.bytes(obj.id);
            } else {
              throw new Error('Protocol error: required field "id" was not found in object');
            }
            if (obj.pubKey != null) {
              writer.uint32(18);
              writer.bytes(obj.pubKey);
            }
            if (obj.privKey != null) {
              writer.uint32(26);
              writer.bytes(obj.privKey);
            }
            if (opts.lengthDelimited !== false) {
              writer.ldelim();
            }
          }, (reader2, length2) => {
            const obj = {
              id: new Uint8Array(0)
            };
            const end = length2 == null ? reader2.len : reader2.pos + length2;
            while (reader2.pos < end) {
              const tag = reader2.uint32();
              switch (tag >>> 3) {
                case 1:
                  obj.id = reader2.bytes();
                  break;
                case 2:
                  obj.pubKey = reader2.bytes();
                  break;
                case 3:
                  obj.privKey = reader2.bytes();
                  break;
                default:
                  reader2.skipType(tag & 7);
                  break;
              }
            }
            if (obj.id == null) {
              throw new Error('Protocol error: value for required field "id" was not found in protobuf');
            }
            return obj;
          });
        }
        return _codec;
      };
      PeerIdProto2.encode = (obj) => {
        return encodeMessage(obj, PeerIdProto2.codec());
      };
      PeerIdProto2.decode = (buf) => {
        return decodeMessage(buf, PeerIdProto2.codec());
      };
    })(PeerIdProto || (PeerIdProto = {}));
  }
});

// node_modules/@libp2p/peer-id-factory/dist/src/index.js
var src_exports = {};
__export(src_exports, {
  createEd25519PeerId: () => createEd25519PeerId,
  createFromJSON: () => createFromJSON,
  createFromPrivKey: () => createFromPrivKey,
  createFromProtobuf: () => createFromProtobuf,
  createFromPubKey: () => createFromPubKey,
  createRSAPeerId: () => createRSAPeerId,
  createSecp256k1PeerId: () => createSecp256k1PeerId,
  exportToProtobuf: () => exportToProtobuf
});
async function createFromPubKey(publicKey) {
  return await peerIdFromKeys(marshalPublicKey(publicKey));
}
async function createFromPrivKey(privateKey) {
  return await peerIdFromKeys(marshalPublicKey(privateKey.public), marshalPrivateKey(privateKey));
}
function exportToProtobuf(peerId, excludePrivateKey) {
  return PeerIdProto.encode({
    id: peerId.multihash.bytes,
    pubKey: peerId.publicKey,
    privKey: excludePrivateKey === true || peerId.privateKey == null ? void 0 : peerId.privateKey
  });
}
async function createFromProtobuf(buf) {
  const { id, privKey, pubKey } = PeerIdProto.decode(buf);
  return await createFromParts(id, privKey, pubKey);
}
async function createFromJSON(obj) {
  return await createFromParts(fromString2(obj.id, "base58btc"), obj.privKey != null ? fromString2(obj.privKey, "base64pad") : void 0, obj.pubKey != null ? fromString2(obj.pubKey, "base64pad") : void 0);
}
async function createFromParts(multihash, privKey, pubKey) {
  if (privKey != null) {
    const key = await unmarshalPrivateKey2(privKey);
    return await createFromPrivKey(key);
  } else if (pubKey != null) {
    const key = await unmarshalPublicKey(pubKey);
    return await createFromPubKey(key);
  }
  return peerIdFromBytes(multihash);
}
var createEd25519PeerId, createSecp256k1PeerId, createRSAPeerId;
var init_src5 = __esm({
  "node_modules/@libp2p/peer-id-factory/dist/src/index.js"() {
    init_keys2();
    init_from_string();
    init_src4();
    init_proto();
    createEd25519PeerId = async () => {
      const key = await generateKeyPair4("Ed25519");
      const id = await createFromPrivKey(key);
      if (id.type === "Ed25519") {
        return id;
      }
      throw new Error(`Generated unexpected PeerId type "${id.type}"`);
    };
    createSecp256k1PeerId = async () => {
      const key = await generateKeyPair4("secp256k1");
      const id = await createFromPrivKey(key);
      if (id.type === "secp256k1") {
        return id;
      }
      throw new Error(`Generated unexpected PeerId type "${id.type}"`);
    };
    createRSAPeerId = async (opts) => {
      const key = await generateKeyPair4("RSA", (opts == null ? void 0 : opts.bits) ?? 2048);
      const id = await createFromPrivKey(key);
      if (id.type === "RSA") {
        return id;
      }
      throw new Error(`Generated unexpected PeerId type "${id.type}"`);
    };
  }
});

// node_modules/debug/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/debug/node_modules/ms/index.js"(exports2, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name2) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name2 + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common2 = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce2;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug2(...args) {
          if (!debug2.enabled) {
            return;
          }
          const self2 = debug2;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug2.namespace = namespace;
        debug2.useColors = createDebug.useColors();
        debug2.color = createDebug.selectColor(namespace);
        debug2.extend = extend;
        debug2.destroy = createDebug.destroy;
        Object.defineProperty(debug2, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug2);
        }
        return debug2;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name2) {
        if (name2[name2.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name2)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name2)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce2(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common2()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports2, module2) {
    "use strict";
    var os2 = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os2.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign3) => sign3 in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version2 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log3;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name2, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name2} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name2 + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log3(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug2) {
      debug2.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug2.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common2()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src2 = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/@libp2p/logger/dist/src/index.js
function logger(name2) {
  return Object.assign((0, import_debug.default)(name2), {
    error: (0, import_debug.default)(`${name2}:error`),
    trace: (0, import_debug.default)(`${name2}:trace`)
  });
}
var import_debug;
var init_src6 = __esm({
  "node_modules/@libp2p/logger/dist/src/index.js"() {
    import_debug = __toESM(require_src2(), 1);
    init_base58();
    init_base32();
    init_base64();
    import_debug.default.formatters.b = (v) => {
      return v == null ? "undefined" : base58btc.baseEncode(v);
    };
    import_debug.default.formatters.t = (v) => {
      return v == null ? "undefined" : base32.baseEncode(v);
    };
    import_debug.default.formatters.m = (v) => {
      return v == null ? "undefined" : base64.baseEncode(v);
    };
    import_debug.default.formatters.p = (v) => {
      return v == null ? "undefined" : v.toString();
    };
    import_debug.default.formatters.c = (v) => {
      return v == null ? "undefined" : v.toString();
    };
    import_debug.default.formatters.k = (v) => {
      return v == null ? "undefined" : v.toString();
    };
  }
});

// node_modules/it-pushable/dist/src/fifo.js
var FixedFIFO, FIFO;
var init_fifo = __esm({
  "node_modules/it-pushable/dist/src/fifo.js"() {
    FixedFIFO = class {
      constructor(hwm) {
        if (!(hwm > 0) || (hwm - 1 & hwm) !== 0) {
          throw new Error("Max size for a FixedFIFO should be a power of two");
        }
        this.buffer = new Array(hwm);
        this.mask = hwm - 1;
        this.top = 0;
        this.btm = 0;
        this.next = null;
      }
      push(data) {
        if (this.buffer[this.top] !== void 0) {
          return false;
        }
        this.buffer[this.top] = data;
        this.top = this.top + 1 & this.mask;
        return true;
      }
      shift() {
        const last = this.buffer[this.btm];
        if (last === void 0) {
          return void 0;
        }
        this.buffer[this.btm] = void 0;
        this.btm = this.btm + 1 & this.mask;
        return last;
      }
      isEmpty() {
        return this.buffer[this.btm] === void 0;
      }
    };
    FIFO = class {
      constructor(options = {}) {
        this.hwm = options.splitLimit ?? 16;
        this.head = new FixedFIFO(this.hwm);
        this.tail = this.head;
        this.size = 0;
      }
      calculateSize(obj) {
        if ((obj == null ? void 0 : obj.byteLength) != null) {
          return obj.byteLength;
        }
        return 1;
      }
      push(val) {
        if ((val == null ? void 0 : val.value) != null) {
          this.size += this.calculateSize(val.value);
        }
        if (!this.head.push(val)) {
          const prev = this.head;
          this.head = prev.next = new FixedFIFO(2 * this.head.buffer.length);
          this.head.push(val);
        }
      }
      shift() {
        let val = this.tail.shift();
        if (val === void 0 && this.tail.next != null) {
          const next = this.tail.next;
          this.tail.next = null;
          this.tail = next;
          val = this.tail.shift();
        }
        if ((val == null ? void 0 : val.value) != null) {
          this.size -= this.calculateSize(val.value);
        }
        return val;
      }
      isEmpty() {
        return this.head.isEmpty();
      }
    };
  }
});

// node_modules/it-pushable/dist/src/index.js
function pushable(options = {}) {
  const getNext = (buffer) => {
    const next = buffer.shift();
    if (next == null) {
      return { done: true };
    }
    if (next.error != null) {
      throw next.error;
    }
    return {
      done: next.done === true,
      value: next.value
    };
  };
  return _pushable(getNext, options);
}
function _pushable(getNext, options) {
  options = options ?? {};
  let onEnd = options.onEnd;
  let buffer = new FIFO();
  let pushable2;
  let onNext;
  let ended;
  const waitNext = async () => {
    if (!buffer.isEmpty()) {
      return getNext(buffer);
    }
    if (ended) {
      return { done: true };
    }
    return await new Promise((resolve, reject) => {
      onNext = (next) => {
        onNext = null;
        buffer.push(next);
        try {
          resolve(getNext(buffer));
        } catch (err) {
          reject(err);
        }
        return pushable2;
      };
    });
  };
  const bufferNext = (next) => {
    if (onNext != null) {
      return onNext(next);
    }
    buffer.push(next);
    return pushable2;
  };
  const bufferError = (err) => {
    buffer = new FIFO();
    if (onNext != null) {
      return onNext({ error: err });
    }
    buffer.push({ error: err });
    return pushable2;
  };
  const push = (value) => {
    if (ended) {
      return pushable2;
    }
    if ((options == null ? void 0 : options.objectMode) !== true && (value == null ? void 0 : value.byteLength) == null) {
      throw new Error("objectMode was not true but tried to push non-Uint8Array value");
    }
    return bufferNext({ done: false, value });
  };
  const end = (err) => {
    if (ended)
      return pushable2;
    ended = true;
    return err != null ? bufferError(err) : bufferNext({ done: true });
  };
  const _return = () => {
    buffer = new FIFO();
    end();
    return { done: true };
  };
  const _throw = (err) => {
    end(err);
    return { done: true };
  };
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next: waitNext,
    return: _return,
    throw: _throw,
    push,
    end,
    get readableLength() {
      return buffer.size;
    }
  };
  if (onEnd == null) {
    return pushable2;
  }
  const _pushable2 = pushable2;
  pushable2 = {
    [Symbol.asyncIterator]() {
      return this;
    },
    next() {
      return _pushable2.next();
    },
    throw(err) {
      _pushable2.throw(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return { done: true };
    },
    return() {
      _pushable2.return();
      if (onEnd != null) {
        onEnd();
        onEnd = void 0;
      }
      return { done: true };
    },
    push,
    end(err) {
      _pushable2.end(err);
      if (onEnd != null) {
        onEnd(err);
        onEnd = void 0;
      }
      return pushable2;
    },
    get readableLength() {
      return _pushable2.readableLength;
    }
  };
  return pushable2;
}
var init_src7 = __esm({
  "node_modules/it-pushable/dist/src/index.js"() {
    init_fifo();
  }
});

// node_modules/fast-fifo/fixed-size.js
var require_fixed_size = __commonJS({
  "node_modules/fast-fifo/fixed-size.js"(exports2, module2) {
    module2.exports = class FixedFIFO {
      constructor(hwm) {
        if (!(hwm > 0) || (hwm - 1 & hwm) !== 0)
          throw new Error("Max size for a FixedFIFO should be a power of two");
        this.buffer = new Array(hwm);
        this.mask = hwm - 1;
        this.top = 0;
        this.btm = 0;
        this.next = null;
      }
      push(data) {
        if (this.buffer[this.top] !== void 0)
          return false;
        this.buffer[this.top] = data;
        this.top = this.top + 1 & this.mask;
        return true;
      }
      shift() {
        const last = this.buffer[this.btm];
        if (last === void 0)
          return void 0;
        this.buffer[this.btm] = void 0;
        this.btm = this.btm + 1 & this.mask;
        return last;
      }
      peek() {
        return this.buffer[this.btm];
      }
      isEmpty() {
        return this.buffer[this.btm] === void 0;
      }
    };
  }
});

// node_modules/fast-fifo/index.js
var require_fast_fifo = __commonJS({
  "node_modules/fast-fifo/index.js"(exports2, module2) {
    var FixedFIFO2 = require_fixed_size();
    module2.exports = class FastFIFO {
      constructor(hwm) {
        this.hwm = hwm || 16;
        this.head = new FixedFIFO2(this.hwm);
        this.tail = this.head;
      }
      push(val) {
        if (!this.head.push(val)) {
          const prev = this.head;
          this.head = prev.next = new FixedFIFO2(2 * this.head.buffer.length);
          this.head.push(val);
        }
      }
      shift() {
        const val = this.tail.shift();
        if (val === void 0 && this.tail.next) {
          const next = this.tail.next;
          this.tail.next = null;
          this.tail = next;
          return this.tail.shift();
        }
        return val;
      }
      peek() {
        return this.tail.peek();
      }
      isEmpty() {
        return this.head.isEmpty();
      }
    };
  }
});

// node_modules/it-merge/node_modules/it-pushable/index.js
var require_it_pushable = __commonJS({
  "node_modules/it-merge/node_modules/it-pushable/index.js"(exports2, module2) {
    var FIFO2 = require_fast_fifo();
    module2.exports = (options) => {
      options = options || {};
      let onEnd;
      if (typeof options === "function") {
        onEnd = options;
        options = {};
      } else {
        onEnd = options.onEnd;
      }
      let buffer = new FIFO2();
      let pushable2, onNext, ended;
      const waitNext = () => {
        if (!buffer.isEmpty()) {
          if (options.writev) {
            let next2;
            const values = [];
            while (!buffer.isEmpty()) {
              next2 = buffer.shift();
              if (next2.error)
                throw next2.error;
              values.push(next2.value);
            }
            return { done: next2.done, value: values };
          }
          const next = buffer.shift();
          if (next.error)
            throw next.error;
          return next;
        }
        if (ended)
          return { done: true };
        return new Promise((resolve, reject) => {
          onNext = (next) => {
            onNext = null;
            if (next.error) {
              reject(next.error);
            } else {
              if (options.writev && !next.done) {
                resolve({ done: next.done, value: [next.value] });
              } else {
                resolve(next);
              }
            }
            return pushable2;
          };
        });
      };
      const bufferNext = (next) => {
        if (onNext)
          return onNext(next);
        buffer.push(next);
        return pushable2;
      };
      const bufferError = (err) => {
        buffer = new FIFO2();
        if (onNext)
          return onNext({ error: err });
        buffer.push({ error: err });
        return pushable2;
      };
      const push = (value) => {
        if (ended)
          return pushable2;
        return bufferNext({ done: false, value });
      };
      const end = (err) => {
        if (ended)
          return pushable2;
        ended = true;
        return err ? bufferError(err) : bufferNext({ done: true });
      };
      const _return = () => {
        buffer = new FIFO2();
        end();
        return { done: true };
      };
      const _throw = (err) => {
        end(err);
        return { done: true };
      };
      pushable2 = {
        [Symbol.asyncIterator]() {
          return this;
        },
        next: waitNext,
        return: _return,
        throw: _throw,
        push,
        end
      };
      if (!onEnd)
        return pushable2;
      const _pushable2 = pushable2;
      pushable2 = {
        [Symbol.asyncIterator]() {
          return this;
        },
        next() {
          return _pushable2.next();
        },
        throw(err) {
          _pushable2.throw(err);
          if (onEnd) {
            onEnd(err);
            onEnd = null;
          }
          return { done: true };
        },
        return() {
          _pushable2.return();
          if (onEnd) {
            onEnd();
            onEnd = null;
          }
          return { done: true };
        },
        push,
        end(err) {
          _pushable2.end(err);
          if (onEnd) {
            onEnd(err);
            onEnd = null;
          }
          return pushable2;
        }
      };
      return pushable2;
    };
  }
});

// node_modules/it-merge/index.js
var require_it_merge = __commonJS({
  "node_modules/it-merge/index.js"(exports2, module2) {
    "use strict";
    var pushable2 = require_it_pushable();
    var merge2 = async function* (...sources) {
      const output = pushable2();
      setTimeout(async () => {
        try {
          await Promise.all(
            sources.map(async (source) => {
              for await (const item of source) {
                output.push(item);
              }
            })
          );
          output.end();
        } catch (err) {
          output.end(err);
        }
      }, 0);
      yield* output;
    };
    module2.exports = merge2;
  }
});

// node_modules/it-pipe/dist/src/index.js
function pipe(first, ...rest) {
  if (isDuplex(first)) {
    const duplex = first;
    first = () => duplex.source;
  } else if (isIterable(first)) {
    const source = first;
    first = () => source;
  }
  const fns = [first, ...rest];
  if (fns.length > 1) {
    if (isDuplex(fns[fns.length - 1])) {
      fns[fns.length - 1] = fns[fns.length - 1].sink;
    }
  }
  if (fns.length > 2) {
    for (let i = 1; i < fns.length - 1; i++) {
      if (isDuplex(fns[i])) {
        fns[i] = duplexPipelineFn(fns[i]);
      }
    }
  }
  return rawPipe(...fns);
}
var import_it_merge, rawPipe, isIterable, isDuplex, duplexPipelineFn;
var init_src8 = __esm({
  "node_modules/it-pipe/dist/src/index.js"() {
    init_src7();
    import_it_merge = __toESM(require_it_merge(), 1);
    rawPipe = (...fns) => {
      let res;
      while (fns.length > 0) {
        res = fns.shift()(res);
      }
      return res;
    };
    isIterable = (obj) => {
      return obj != null && (typeof obj[Symbol.asyncIterator] === "function" || typeof obj[Symbol.iterator] === "function" || typeof obj.next === "function");
    };
    isDuplex = (obj) => {
      return obj != null && typeof obj.sink === "function" && isIterable(obj.source);
    };
    duplexPipelineFn = (duplex) => {
      return (source) => {
        const p = duplex.sink(source);
        if (p.then != null) {
          const stream = pushable({
            objectMode: true
          });
          p.then(() => {
            stream.end();
          }, (err) => {
            stream.end(err);
          });
          const sourceWrap = async function* () {
            yield* duplex.source;
            stream.end();
          };
          return (0, import_it_merge.default)(stream, sourceWrap());
        }
        return duplex.source;
      };
    };
  }
});

// node_modules/p-defer/index.js
function pDefer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
var init_p_defer = __esm({
  "node_modules/p-defer/index.js"() {
  }
});

// node_modules/it-pair/dist/src/index.js
function pair() {
  const deferred = pDefer();
  let piped = false;
  return {
    sink: async (source) => {
      if (piped) {
        throw new Error("already piped");
      }
      piped = true;
      deferred.resolve(source);
    },
    source: async function* () {
      const source = await deferred.promise;
      yield* source;
    }()
  };
}
var init_src9 = __esm({
  "node_modules/it-pair/dist/src/index.js"() {
    init_p_defer();
  }
});

// node_modules/it-pair/dist/src/duplex.js
function duplexPair() {
  const a = pair();
  const b = pair();
  return [
    {
      source: a.source,
      sink: b.sink
    },
    {
      source: b.source,
      sink: a.sink
    }
  ];
}
var init_duplex = __esm({
  "node_modules/it-pair/dist/src/duplex.js"() {
    init_src9();
  }
});

// node_modules/@libp2p/crypto/dist/src/aes/ciphers.js
var import_crypto4, createCipheriv, createDecipheriv;
var init_ciphers = __esm({
  "node_modules/@libp2p/crypto/dist/src/aes/ciphers.js"() {
    import_crypto4 = __toESM(require("crypto"), 1);
    createCipheriv = import_crypto4.default.createCipheriv;
    createDecipheriv = import_crypto4.default.createDecipheriv;
  }
});

// node_modules/@libp2p/crypto/dist/src/aes/cipher-mode.js
var import_err_code12;
var init_cipher_mode = __esm({
  "node_modules/@libp2p/crypto/dist/src/aes/cipher-mode.js"() {
    import_err_code12 = __toESM(require_err_code(), 1);
  }
});

// node_modules/@libp2p/crypto/dist/src/aes/index.js
var init_aes = __esm({
  "node_modules/@libp2p/crypto/dist/src/aes/index.js"() {
    init_ciphers();
    init_cipher_mode();
  }
});

// node_modules/@libp2p/crypto/dist/src/pbkdf2.js
var import_pbkdf2, import_util4, import_err_code13;
var init_pbkdf2 = __esm({
  "node_modules/@libp2p/crypto/dist/src/pbkdf2.js"() {
    import_pbkdf2 = __toESM(require_pbkdf2(), 1);
    import_util4 = __toESM(require_util2(), 1);
    import_err_code13 = __toESM(require_err_code(), 1);
  }
});

// node_modules/@libp2p/crypto/dist/src/index.js
var init_src10 = __esm({
  "node_modules/@libp2p/crypto/dist/src/index.js"() {
    init_hmac();
    init_aes();
    init_keys2();
    init_random_bytes();
    init_pbkdf2();
  }
});

// node_modules/libp2p/dist/src/pnet/errors.js
var INVALID_PSK, NO_HANDSHAKE_CONNECTION, STREAM_ENDED;
var init_errors = __esm({
  "node_modules/libp2p/dist/src/pnet/errors.js"() {
    INVALID_PSK = "Your private shared key is invalid";
    NO_HANDSHAKE_CONNECTION = "No connection for the handshake provided";
    STREAM_ENDED = "Stream ended prematurely";
  }
});

// node_modules/libp2p/dist/src/errors.js
var messages, codes;
var init_errors2 = __esm({
  "node_modules/libp2p/dist/src/errors.js"() {
    (function(messages2) {
      messages2["NOT_STARTED_YET"] = "The libp2p node is not started yet";
      messages2["DHT_DISABLED"] = "DHT is not available";
      messages2["PUBSUB_DISABLED"] = "PubSub is not available";
      messages2["CONN_ENCRYPTION_REQUIRED"] = "At least one connection encryption module is required";
      messages2["ERR_TRANSPORTS_REQUIRED"] = "At least one transport module is required";
      messages2["ERR_PROTECTOR_REQUIRED"] = "Private network is enforced, but no protector was provided";
      messages2["NOT_FOUND"] = "Not found";
    })(messages || (messages = {}));
    (function(codes2) {
      codes2["DHT_DISABLED"] = "ERR_DHT_DISABLED";
      codes2["ERR_PUBSUB_DISABLED"] = "ERR_PUBSUB_DISABLED";
      codes2["PUBSUB_NOT_STARTED"] = "ERR_PUBSUB_NOT_STARTED";
      codes2["DHT_NOT_STARTED"] = "ERR_DHT_NOT_STARTED";
      codes2["CONN_ENCRYPTION_REQUIRED"] = "ERR_CONN_ENCRYPTION_REQUIRED";
      codes2["ERR_TRANSPORTS_REQUIRED"] = "ERR_TRANSPORTS_REQUIRED";
      codes2["ERR_PROTECTOR_REQUIRED"] = "ERR_PROTECTOR_REQUIRED";
      codes2["ERR_PEER_DIAL_INTERCEPTED"] = "ERR_PEER_DIAL_INTERCEPTED";
      codes2["ERR_CONNECTION_INTERCEPTED"] = "ERR_CONNECTION_INTERCEPTED";
      codes2["ERR_INVALID_PROTOCOLS_FOR_STREAM"] = "ERR_INVALID_PROTOCOLS_FOR_STREAM";
      codes2["ERR_CONNECTION_ENDED"] = "ERR_CONNECTION_ENDED";
      codes2["ERR_CONNECTION_FAILED"] = "ERR_CONNECTION_FAILED";
      codes2["ERR_NODE_NOT_STARTED"] = "ERR_NODE_NOT_STARTED";
      codes2["ERR_ALREADY_ABORTED"] = "ERR_ALREADY_ABORTED";
      codes2["ERR_TOO_MANY_ADDRESSES"] = "ERR_TOO_MANY_ADDRESSES";
      codes2["ERR_NO_VALID_ADDRESSES"] = "ERR_NO_VALID_ADDRESSES";
      codes2["ERR_RELAYED_DIAL"] = "ERR_RELAYED_DIAL";
      codes2["ERR_DIALED_SELF"] = "ERR_DIALED_SELF";
      codes2["ERR_DISCOVERED_SELF"] = "ERR_DISCOVERED_SELF";
      codes2["ERR_DUPLICATE_TRANSPORT"] = "ERR_DUPLICATE_TRANSPORT";
      codes2["ERR_ENCRYPTION_FAILED"] = "ERR_ENCRYPTION_FAILED";
      codes2["ERR_HOP_REQUEST_FAILED"] = "ERR_HOP_REQUEST_FAILED";
      codes2["ERR_INVALID_KEY"] = "ERR_INVALID_KEY";
      codes2["ERR_INVALID_MESSAGE"] = "ERR_INVALID_MESSAGE";
      codes2["ERR_INVALID_PARAMETERS"] = "ERR_INVALID_PARAMETERS";
      codes2["ERR_INVALID_PEER"] = "ERR_INVALID_PEER";
      codes2["ERR_MUXER_UNAVAILABLE"] = "ERR_MUXER_UNAVAILABLE";
      codes2["ERR_NOT_FOUND"] = "ERR_NOT_FOUND";
      codes2["ERR_TIMEOUT"] = "ERR_TIMEOUT";
      codes2["ERR_TRANSPORT_UNAVAILABLE"] = "ERR_TRANSPORT_UNAVAILABLE";
      codes2["ERR_TRANSPORT_DIAL_FAILED"] = "ERR_TRANSPORT_DIAL_FAILED";
      codes2["ERR_UNSUPPORTED_PROTOCOL"] = "ERR_UNSUPPORTED_PROTOCOL";
      codes2["ERR_PROTOCOL_HANDLER_ALREADY_REGISTERED"] = "ERR_PROTOCOL_HANDLER_ALREADY_REGISTERED";
      codes2["ERR_INVALID_MULTIADDR"] = "ERR_INVALID_MULTIADDR";
      codes2["ERR_SIGNATURE_NOT_VALID"] = "ERR_SIGNATURE_NOT_VALID";
      codes2["ERR_FIND_SELF"] = "ERR_FIND_SELF";
      codes2["ERR_NO_ROUTERS_AVAILABLE"] = "ERR_NO_ROUTERS_AVAILABLE";
      codes2["ERR_CONNECTION_NOT_MULTIPLEXED"] = "ERR_CONNECTION_NOT_MULTIPLEXED";
      codes2["ERR_NO_DIAL_TOKENS"] = "ERR_NO_DIAL_TOKENS";
      codes2["ERR_KEYCHAIN_REQUIRED"] = "ERR_KEYCHAIN_REQUIRED";
      codes2["ERR_INVALID_CMS"] = "ERR_INVALID_CMS";
      codes2["ERR_MISSING_KEYS"] = "ERR_MISSING_KEYS";
      codes2["ERR_NO_KEY"] = "ERR_NO_KEY";
      codes2["ERR_INVALID_KEY_NAME"] = "ERR_INVALID_KEY_NAME";
      codes2["ERR_INVALID_KEY_TYPE"] = "ERR_INVALID_KEY_TYPE";
      codes2["ERR_KEY_ALREADY_EXISTS"] = "ERR_KEY_ALREADY_EXISTS";
      codes2["ERR_INVALID_KEY_SIZE"] = "ERR_INVALID_KEY_SIZE";
      codes2["ERR_KEY_NOT_FOUND"] = "ERR_KEY_NOT_FOUND";
      codes2["ERR_OLD_KEY_NAME_INVALID"] = "ERR_OLD_KEY_NAME_INVALID";
      codes2["ERR_NEW_KEY_NAME_INVALID"] = "ERR_NEW_KEY_NAME_INVALID";
      codes2["ERR_PASSWORD_REQUIRED"] = "ERR_PASSWORD_REQUIRED";
      codes2["ERR_PEM_REQUIRED"] = "ERR_PEM_REQUIRED";
      codes2["ERR_CANNOT_READ_KEY"] = "ERR_CANNOT_READ_KEY";
      codes2["ERR_MISSING_PRIVATE_KEY"] = "ERR_MISSING_PRIVATE_KEY";
      codes2["ERR_MISSING_PUBLIC_KEY"] = "ERR_MISSING_PUBLIC_KEY";
      codes2["ERR_INVALID_OLD_PASS_TYPE"] = "ERR_INVALID_OLD_PASS_TYPE";
      codes2["ERR_INVALID_NEW_PASS_TYPE"] = "ERR_INVALID_NEW_PASS_TYPE";
      codes2["ERR_INVALID_PASS_LENGTH"] = "ERR_INVALID_PASS_LENGTH";
      codes2["ERR_NOT_IMPLEMENTED"] = "ERR_NOT_IMPLEMENTED";
      codes2["ERR_WRONG_PING_ACK"] = "ERR_WRONG_PING_ACK";
      codes2["ERR_INVALID_RECORD"] = "ERR_INVALID_RECORD";
      codes2["ERR_ALREADY_SUCCEEDED"] = "ERR_ALREADY_SUCCEEDED";
      codes2["ERR_NO_HANDLER_FOR_PROTOCOL"] = "ERR_NO_HANDLER_FOR_PROTOCOL";
      codes2["ERR_TOO_MANY_OUTBOUND_PROTOCOL_STREAMS"] = "ERR_TOO_MANY_OUTBOUND_PROTOCOL_STREAMS";
      codes2["ERR_TOO_MANY_INBOUND_PROTOCOL_STREAMS"] = "ERR_TOO_MANY_INBOUND_PROTOCOL_STREAMS";
    })(codes || (codes = {}));
  }
});

// node_modules/xsalsa20/xsalsa20.js
var require_xsalsa20 = __commonJS({
  "node_modules/xsalsa20/xsalsa20.js"(exports2, module2) {
    var __commonJS2 = (cb, mod4) => function __require() {
      return mod4 || (0, cb[Object.keys(cb)[0]])((mod4 = { exports: {} }).exports, mod4), mod4.exports;
    };
    var __toBinary = /* @__PURE__ */ (() => {
      var table = new Uint8Array(128);
      for (var i = 0; i < 64; i++)
        table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
      return (base642) => {
        var n = base642.length, bytes2 = new Uint8Array((n - (base642[n - 1] == "=") - (base642[n - 2] == "=")) * 3 / 4 | 0);
        for (var i2 = 0, j = 0; i2 < n; ) {
          var c0 = table[base642.charCodeAt(i2++)], c1 = table[base642.charCodeAt(i2++)];
          var c2 = table[base642.charCodeAt(i2++)], c3 = table[base642.charCodeAt(i2++)];
          bytes2[j++] = c0 << 2 | c1 >> 4;
          bytes2[j++] = c1 << 4 | c2 >> 2;
          bytes2[j++] = c2 << 6 | c3;
        }
        return bytes2;
      };
    })();
    var require_xsalsa203 = __commonJS2({
      "wasm-binary:./xsalsa20.wat"(exports22, module22) {
        module22.exports = __toBinary("AGFzbQEAAAABGgNgBn9/f39/fwBgBn9/f39+fwF+YAN/f38AAwcGAAEBAgICBQUBAQroBwcoAwZtZW1vcnkCAAx4c2Fsc2EyMF94b3IAAAxjb3JlX3NhbHNhMjAABArqEQYYACAAIAEgAiADIAQgACkDACAFEAE3AwALPQBB8AAgAyAFEAMgACABIAIgA0EQaiAEQfAAEAJB8ABCADcDAEH4AEIANwMAQYABQgA3AwBBiAFCADcDAAuHBQEBfyACQQBGBEBCAA8LQdAAIAUpAwA3AwBB2AAgBUEIaikDADcDAEHgACAFQRBqKQMANwMAQegAIAVBGGopAwA3AwBBACADKQMANwMAQQggBDcDAAJAA0AgAkHAAEkNAUEQQQBB0AAQBSAAIAEpAwBBECkDAIU3AwAgAEEIaiABQQhqKQMAQRgpAwCFNwMAIABBEGogAUEQaikDAEEgKQMAhTcDACAAQRhqIAFBGGopAwBBKCkDAIU3AwAgAEEgaiABQSBqKQMAQTApAwCFNwMAIABBKGogAUEoaikDAEE4KQMAhTcDACAAQTBqIAFBMGopAwBBwAApAwCFNwMAIABBOGogAUE4aikDAEHIACkDAIU3AwBBCEEIKQMAQgF8NwMAIABBwABqIQAgAUHAAGohASACQcAAayECDAALC0EIKQMAIQQgAkEASwRAQRBBAEHQABAFAkACQAJAAkACQAJAAkACQCACQQhuDgcHBgUEAwIBAAsgAEE4aiABQThqKQMAQcgAKQMAhTcDAAsgAEEwaiABQTBqKQMAQcAAKQMAhTcDAAsgAEEoaiABQShqKQMAQTgpAwCFNwMACyAAQSBqIAFBIGopAwBBMCkDAIU3AwALIABBGGogAUEYaikDAEEoKQMAhTcDAAsgAEEQaiABQRBqKQMAQSApAwCFNwMACyAAQQhqIAFBCGopAwBBGCkDAIU3AwALIAAgASkDAEEQKQMAhTcDAAtBEEIANwMAQRhCADcDAEEgQgA3AwBBKEIANwMAQTBCADcDAEE4QgA3AwBBwABCADcDAEHIAEIANwMAQdAAQgA3AwBB2ABCADcDAEHgAEIANwMAQegAQgA3AwAgBA8LnQUBEX9B5fDBiwYhA0HuyIGZAyEIQbLaiMsHIQ1B9MqB2QYhEiACKAIAIQQgAkEEaigCACEFIAJBCGooAgAhBiACQQxqKAIAIQcgAkEQaigCACEOIAJBFGooAgAhDyACQRhqKAIAIRAgAkEcaigCACERIAEoAgAhCSABQQRqKAIAIQogAUEIaigCACELIAFBDGooAgAhDEEUIRMCQANAIBNBAEYNASAHIAMgD2pBB3dzIQcgCyAHIANqQQl3cyELIA8gCyAHakENd3MhDyADIA8gC2pBEndzIQMgDCAIIARqQQd3cyEMIBAgDCAIakEJd3MhECAEIBAgDGpBDXdzIQQgCCAEIBBqQRJ3cyEIIBEgDSAJakEHd3MhESAFIBEgDWpBCXdzIQUgCSAFIBFqQQ13cyEJIA0gCSAFakESd3MhDSAGIBIgDmpBB3dzIQYgCiAGIBJqQQl3cyEKIA4gCiAGakENd3MhDiASIA4gCmpBEndzIRIgBCADIAZqQQd3cyEEIAUgBCADakEJd3MhBSAGIAUgBGpBDXdzIQYgAyAGIAVqQRJ3cyEDIAkgCCAHakEHd3MhCSAKIAkgCGpBCXdzIQogByAKIAlqQQ13cyEHIAggByAKakESd3MhCCAOIA0gDGpBB3dzIQ4gCyAOIA1qQQl3cyELIAwgCyAOakENd3MhDCANIAwgC2pBEndzIQ0gDyASIBFqQQd3cyEPIBAgDyASakEJd3MhECARIBAgD2pBDXdzIREgEiARIBBqQRJ3cyESIBNBAmshEwwACwsgACADNgIAIABBBGogCDYCACAAQQhqIA02AgAgAEEMaiASNgIAIABBEGogCTYCACAAQRRqIAo2AgAgAEEYaiALNgIAIABBHGogDDYCAAsKACAAIAEgAhAFC90GASF/QeXwwYsGIQNB7siBmQMhCEGy2ojLByENQfTKgdkGIRIgAigCACEEIAJBBGooAgAhBSACQQhqKAIAIQYgAkEMaigCACEHIAJBEGooAgAhDiACQRRqKAIAIQ8gAkEYaigCACEQIAJBHGooAgAhESABKAIAIQkgAUEEaigCACEKIAFBCGooAgAhCyABQQxqKAIAIQwgAyETIAQhFCAFIRUgBiEWIAchFyAIIRggCSEZIAohGiALIRsgDCEcIA0hHSAOIR4gDyEfIBAhICARISEgEiEiQRQhIwJAA0AgI0EARg0BIAcgAyAPakEHd3MhByALIAcgA2pBCXdzIQsgDyALIAdqQQ13cyEPIAMgDyALakESd3MhAyAMIAggBGpBB3dzIQwgECAMIAhqQQl3cyEQIAQgECAMakENd3MhBCAIIAQgEGpBEndzIQggESANIAlqQQd3cyERIAUgESANakEJd3MhBSAJIAUgEWpBDXdzIQkgDSAJIAVqQRJ3cyENIAYgEiAOakEHd3MhBiAKIAYgEmpBCXdzIQogDiAKIAZqQQ13cyEOIBIgDiAKakESd3MhEiAEIAMgBmpBB3dzIQQgBSAEIANqQQl3cyEFIAYgBSAEakENd3MhBiADIAYgBWpBEndzIQMgCSAIIAdqQQd3cyEJIAogCSAIakEJd3MhCiAHIAogCWpBDXdzIQcgCCAHIApqQRJ3cyEIIA4gDSAMakEHd3MhDiALIA4gDWpBCXdzIQsgDCALIA5qQQ13cyEMIA0gDCALakESd3MhDSAPIBIgEWpBB3dzIQ8gECAPIBJqQQl3cyEQIBEgECAPakENd3MhESASIBEgEGpBEndzIRIgI0ECayEjDAALCyAAIAMgE2o2AgAgAEEEaiAEIBRqNgIAIABBCGogBSAVajYCACAAQQxqIAYgFmo2AgAgAEEQaiAHIBdqNgIAIABBFGogCCAYajYCACAAQRhqIAkgGWo2AgAgAEEcaiAKIBpqNgIAIABBIGogCyAbajYCACAAQSRqIAwgHGo2AgAgAEEoaiANIB1qNgIAIABBLGogDiAeajYCACAAQTBqIA8gH2o2AgAgAEE0aiAQICBqNgIAIABBOGogESAhajYCACAAQTxqIBIgImo2AgAL");
      }
    });
    var bytes = require_xsalsa203();
    var compiled = new WebAssembly.Module(bytes);
    module2.exports = (imports) => {
      const instance = new WebAssembly.Instance(compiled, imports);
      return instance.exports;
    };
  }
});

// node_modules/xsalsa20/index.js
var require_xsalsa202 = __commonJS({
  "node_modules/xsalsa20/index.js"(exports2, module2) {
    var xsalsa202 = typeof WebAssembly !== "undefined" && require_xsalsa20()();
    var SIGMA = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    var head = 144;
    var top = head;
    var free = [];
    module2.exports = XSalsa20;
    XSalsa20.NONCEBYTES = 24;
    XSalsa20.KEYBYTES = 32;
    XSalsa20.core_hsalsa20 = core_hsalsa20;
    XSalsa20.SIGMA = SIGMA;
    function XSalsa20(nonce, key) {
      if (!(this instanceof XSalsa20))
        return new XSalsa20(nonce, key);
      if (!nonce || nonce.length < 24)
        throw new Error("nonce must be at least 24 bytes");
      if (!key || key.length < 32)
        throw new Error("key must be at least 32 bytes");
      this._xor = xsalsa202 ? new WASM(nonce, key) : new Fallback(nonce, key);
    }
    XSalsa20.prototype.update = function(input, output) {
      if (!input)
        throw new Error("input must be Uint8Array or Buffer");
      if (!output)
        output = new Uint8Array(input.length);
      if (input.length)
        this._xor.update(input, output);
      return output;
    };
    XSalsa20.prototype.final = XSalsa20.prototype.finalize = function() {
      this._xor.finalize();
      this._xor = null;
    };
    function WASM(nonce, key) {
      if (!free.length) {
        free.push(head);
        head += 64;
      }
      this._pointer = free.pop();
      this._nonce = this._pointer + 8;
      this._key = this._nonce + 24;
      this._overflow = 0;
      this._memory = new Uint8Array(xsalsa202.memory.buffer);
      this._memory.fill(0, this._pointer, this._pointer + 8);
      this._memory.set(nonce, this._nonce);
      this._memory.set(key, this._key);
    }
    WASM.prototype.realloc = function(size) {
      xsalsa202.memory.grow(Math.ceil(Math.abs(size - this._memory.length) / 65536));
      this._memory = new Uint8Array(xsalsa202.memory.buffer);
    };
    WASM.prototype.update = function(input, output) {
      var len = this._overflow + input.length;
      var start = head + this._overflow;
      top = head + len;
      if (top >= this._memory.length)
        this.realloc(top);
      this._memory.set(input, start);
      xsalsa202.xsalsa20_xor(this._pointer, head, head, len, this._nonce, this._key);
      output.set(this._memory.subarray(start, head + len));
      this._overflow = len & 63;
    };
    WASM.prototype.finalize = function() {
      this._memory.fill(0, this._pointer, this._key + 32);
      if (top > head) {
        this._memory.fill(0, head, top);
        top = 0;
      }
      free.push(this._pointer);
    };
    function Fallback(nonce, key) {
      this._s = new Uint8Array(32);
      this._z = new Uint8Array(16);
      this._overflow = 0;
      core_hsalsa20(this._s, nonce, key, SIGMA);
      for (var i = 0; i < 8; i++)
        this._z[i] = nonce[i + 16];
    }
    Fallback.prototype.update = function(input, output) {
      var x = new Uint8Array(64);
      var u = 0;
      var i = this._overflow;
      var b = input.length + this._overflow;
      var z = this._z;
      var mpos = -this._overflow;
      var cpos = -this._overflow;
      while (b >= 64) {
        core_salsa20(x, z, this._s, SIGMA);
        for (; i < 64; i++)
          output[cpos + i] = input[mpos + i] ^ x[i];
        u = 1;
        for (i = 8; i < 16; i++) {
          u += z[i] & 255 | 0;
          z[i] = u & 255;
          u >>>= 8;
        }
        b -= 64;
        cpos += 64;
        mpos += 64;
        i = 0;
      }
      if (b > 0) {
        core_salsa20(x, z, this._s, SIGMA);
        for (; i < b; i++)
          output[cpos + i] = input[mpos + i] ^ x[i];
      }
      this._overflow = b & 63;
    };
    Fallback.prototype.finalize = function() {
      this._s.fill(0);
      this._z.fill(0);
    };
    function core_salsa20(o, p, k, c) {
      var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
      var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
      for (var i = 0; i < 20; i += 2) {
        u = x0 + x12 | 0;
        x4 ^= u << 7 | u >>> 25;
        u = x4 + x0 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x4 | 0;
        x12 ^= u << 13 | u >>> 19;
        u = x12 + x8 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x1 | 0;
        x9 ^= u << 7 | u >>> 25;
        u = x9 + x5 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x9 | 0;
        x1 ^= u << 13 | u >>> 19;
        u = x1 + x13 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x6 | 0;
        x14 ^= u << 7 | u >>> 25;
        u = x14 + x10 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x14 | 0;
        x6 ^= u << 13 | u >>> 19;
        u = x6 + x2 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x11 | 0;
        x3 ^= u << 7 | u >>> 25;
        u = x3 + x15 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x3 | 0;
        x11 ^= u << 13 | u >>> 19;
        u = x11 + x7 | 0;
        x15 ^= u << 18 | u >>> 14;
        u = x0 + x3 | 0;
        x1 ^= u << 7 | u >>> 25;
        u = x1 + x0 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x1 | 0;
        x3 ^= u << 13 | u >>> 19;
        u = x3 + x2 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x4 | 0;
        x6 ^= u << 7 | u >>> 25;
        u = x6 + x5 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x6 | 0;
        x4 ^= u << 13 | u >>> 19;
        u = x4 + x7 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x9 | 0;
        x11 ^= u << 7 | u >>> 25;
        u = x11 + x10 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x11 | 0;
        x9 ^= u << 13 | u >>> 19;
        u = x9 + x8 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x14 | 0;
        x12 ^= u << 7 | u >>> 25;
        u = x12 + x15 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x12 | 0;
        x14 ^= u << 13 | u >>> 19;
        u = x14 + x13 | 0;
        x15 ^= u << 18 | u >>> 14;
      }
      x0 = x0 + j0 | 0;
      x1 = x1 + j1 | 0;
      x2 = x2 + j2 | 0;
      x3 = x3 + j3 | 0;
      x4 = x4 + j4 | 0;
      x5 = x5 + j5 | 0;
      x6 = x6 + j6 | 0;
      x7 = x7 + j7 | 0;
      x8 = x8 + j8 | 0;
      x9 = x9 + j9 | 0;
      x10 = x10 + j10 | 0;
      x11 = x11 + j11 | 0;
      x12 = x12 + j12 | 0;
      x13 = x13 + j13 | 0;
      x14 = x14 + j14 | 0;
      x15 = x15 + j15 | 0;
      o[0] = x0 >>> 0 & 255;
      o[1] = x0 >>> 8 & 255;
      o[2] = x0 >>> 16 & 255;
      o[3] = x0 >>> 24 & 255;
      o[4] = x1 >>> 0 & 255;
      o[5] = x1 >>> 8 & 255;
      o[6] = x1 >>> 16 & 255;
      o[7] = x1 >>> 24 & 255;
      o[8] = x2 >>> 0 & 255;
      o[9] = x2 >>> 8 & 255;
      o[10] = x2 >>> 16 & 255;
      o[11] = x2 >>> 24 & 255;
      o[12] = x3 >>> 0 & 255;
      o[13] = x3 >>> 8 & 255;
      o[14] = x3 >>> 16 & 255;
      o[15] = x3 >>> 24 & 255;
      o[16] = x4 >>> 0 & 255;
      o[17] = x4 >>> 8 & 255;
      o[18] = x4 >>> 16 & 255;
      o[19] = x4 >>> 24 & 255;
      o[20] = x5 >>> 0 & 255;
      o[21] = x5 >>> 8 & 255;
      o[22] = x5 >>> 16 & 255;
      o[23] = x5 >>> 24 & 255;
      o[24] = x6 >>> 0 & 255;
      o[25] = x6 >>> 8 & 255;
      o[26] = x6 >>> 16 & 255;
      o[27] = x6 >>> 24 & 255;
      o[28] = x7 >>> 0 & 255;
      o[29] = x7 >>> 8 & 255;
      o[30] = x7 >>> 16 & 255;
      o[31] = x7 >>> 24 & 255;
      o[32] = x8 >>> 0 & 255;
      o[33] = x8 >>> 8 & 255;
      o[34] = x8 >>> 16 & 255;
      o[35] = x8 >>> 24 & 255;
      o[36] = x9 >>> 0 & 255;
      o[37] = x9 >>> 8 & 255;
      o[38] = x9 >>> 16 & 255;
      o[39] = x9 >>> 24 & 255;
      o[40] = x10 >>> 0 & 255;
      o[41] = x10 >>> 8 & 255;
      o[42] = x10 >>> 16 & 255;
      o[43] = x10 >>> 24 & 255;
      o[44] = x11 >>> 0 & 255;
      o[45] = x11 >>> 8 & 255;
      o[46] = x11 >>> 16 & 255;
      o[47] = x11 >>> 24 & 255;
      o[48] = x12 >>> 0 & 255;
      o[49] = x12 >>> 8 & 255;
      o[50] = x12 >>> 16 & 255;
      o[51] = x12 >>> 24 & 255;
      o[52] = x13 >>> 0 & 255;
      o[53] = x13 >>> 8 & 255;
      o[54] = x13 >>> 16 & 255;
      o[55] = x13 >>> 24 & 255;
      o[56] = x14 >>> 0 & 255;
      o[57] = x14 >>> 8 & 255;
      o[58] = x14 >>> 16 & 255;
      o[59] = x14 >>> 24 & 255;
      o[60] = x15 >>> 0 & 255;
      o[61] = x15 >>> 8 & 255;
      o[62] = x15 >>> 16 & 255;
      o[63] = x15 >>> 24 & 255;
    }
    function core_hsalsa20(o, p, k, c) {
      var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
      var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
      for (var i = 0; i < 20; i += 2) {
        u = x0 + x12 | 0;
        x4 ^= u << 7 | u >>> 25;
        u = x4 + x0 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x4 | 0;
        x12 ^= u << 13 | u >>> 19;
        u = x12 + x8 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x1 | 0;
        x9 ^= u << 7 | u >>> 25;
        u = x9 + x5 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x9 | 0;
        x1 ^= u << 13 | u >>> 19;
        u = x1 + x13 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x6 | 0;
        x14 ^= u << 7 | u >>> 25;
        u = x14 + x10 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x14 | 0;
        x6 ^= u << 13 | u >>> 19;
        u = x6 + x2 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x11 | 0;
        x3 ^= u << 7 | u >>> 25;
        u = x3 + x15 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x3 | 0;
        x11 ^= u << 13 | u >>> 19;
        u = x11 + x7 | 0;
        x15 ^= u << 18 | u >>> 14;
        u = x0 + x3 | 0;
        x1 ^= u << 7 | u >>> 25;
        u = x1 + x0 | 0;
        x2 ^= u << 9 | u >>> 23;
        u = x2 + x1 | 0;
        x3 ^= u << 13 | u >>> 19;
        u = x3 + x2 | 0;
        x0 ^= u << 18 | u >>> 14;
        u = x5 + x4 | 0;
        x6 ^= u << 7 | u >>> 25;
        u = x6 + x5 | 0;
        x7 ^= u << 9 | u >>> 23;
        u = x7 + x6 | 0;
        x4 ^= u << 13 | u >>> 19;
        u = x4 + x7 | 0;
        x5 ^= u << 18 | u >>> 14;
        u = x10 + x9 | 0;
        x11 ^= u << 7 | u >>> 25;
        u = x11 + x10 | 0;
        x8 ^= u << 9 | u >>> 23;
        u = x8 + x11 | 0;
        x9 ^= u << 13 | u >>> 19;
        u = x9 + x8 | 0;
        x10 ^= u << 18 | u >>> 14;
        u = x15 + x14 | 0;
        x12 ^= u << 7 | u >>> 25;
        u = x12 + x15 | 0;
        x13 ^= u << 9 | u >>> 23;
        u = x13 + x12 | 0;
        x14 ^= u << 13 | u >>> 19;
        u = x14 + x13 | 0;
        x15 ^= u << 18 | u >>> 14;
      }
      o[0] = x0 >>> 0 & 255;
      o[1] = x0 >>> 8 & 255;
      o[2] = x0 >>> 16 & 255;
      o[3] = x0 >>> 24 & 255;
      o[4] = x5 >>> 0 & 255;
      o[5] = x5 >>> 8 & 255;
      o[6] = x5 >>> 16 & 255;
      o[7] = x5 >>> 24 & 255;
      o[8] = x10 >>> 0 & 255;
      o[9] = x10 >>> 8 & 255;
      o[10] = x10 >>> 16 & 255;
      o[11] = x10 >>> 24 & 255;
      o[12] = x15 >>> 0 & 255;
      o[13] = x15 >>> 8 & 255;
      o[14] = x15 >>> 16 & 255;
      o[15] = x15 >>> 24 & 255;
      o[16] = x6 >>> 0 & 255;
      o[17] = x6 >>> 8 & 255;
      o[18] = x6 >>> 16 & 255;
      o[19] = x6 >>> 24 & 255;
      o[20] = x7 >>> 0 & 255;
      o[21] = x7 >>> 8 & 255;
      o[22] = x7 >>> 16 & 255;
      o[23] = x7 >>> 24 & 255;
      o[24] = x8 >>> 0 & 255;
      o[25] = x8 >>> 8 & 255;
      o[26] = x8 >>> 16 & 255;
      o[27] = x8 >>> 24 & 255;
      o[28] = x9 >>> 0 & 255;
      o[29] = x9 >>> 8 & 255;
      o[30] = x9 >>> 16 & 255;
      o[31] = x9 >>> 24 & 255;
    }
  }
});

// node_modules/libp2p/dist/src/pnet/key-generator.js
function generateKey4(bytes) {
  const psk = toString2(randomBytes(KEY_LENGTH), "base16");
  const key = fromString2("/key/swarm/psk/1.0.0/\n/base16/\n" + psk);
  bytes.set(key);
}
var NONCE_LENGTH, KEY_LENGTH;
var init_key_generator = __esm({
  "node_modules/libp2p/dist/src/pnet/key-generator.js"() {
    init_src10();
    init_to_string();
    init_from_string();
    NONCE_LENGTH = 24;
    KEY_LENGTH = 32;
    try {
      if (require.main === module) {
        generate(process.stdout);
      }
    } catch (error) {
    }
  }
});

// node_modules/libp2p/dist/src/pnet/crypto.js
function createBoxStream(nonce, psk) {
  const xor = (0, import_xsalsa20.default)(nonce, psk);
  return (source) => async function* () {
    for await (const chunk of source) {
      yield Uint8Array.from(xor.update(chunk.slice()));
    }
  }();
}
function createUnboxStream(nonce, psk) {
  return (source) => async function* () {
    const xor = (0, import_xsalsa20.default)(nonce, psk);
    log.trace("Decryption enabled");
    for await (const chunk of source) {
      yield Uint8Array.from(xor.update(chunk.slice()));
    }
  }();
}
function decodeV1PSK(pskBuffer) {
  try {
    const metadata = toString2(pskBuffer).split(/(?:\r\n|\r|\n)/g);
    const pskTag = metadata.shift();
    const codec = metadata.shift();
    const pskString = metadata.shift();
    const psk = fromString2(pskString ?? "", "base16");
    if (psk.byteLength !== KEY_LENGTH) {
      throw new Error(INVALID_PSK);
    }
    return {
      tag: pskTag,
      codecName: codec,
      psk
    };
  } catch (err) {
    log.error(err);
    throw new Error(INVALID_PSK);
  }
}
var import_xsalsa20, log;
var init_crypto = __esm({
  "node_modules/libp2p/dist/src/pnet/crypto.js"() {
    init_src6();
    init_errors();
    import_xsalsa20 = __toESM(require_xsalsa202(), 1);
    init_key_generator();
    init_from_string();
    init_to_string();
    log = logger("libp2p:pnet");
  }
});

// node_modules/uint8arraylist/dist/src/index.js
function findBufAndOffset(bufs, index) {
  if (index == null || index < 0) {
    throw new RangeError("index is out of bounds");
  }
  let offset = 0;
  for (const buf of bufs) {
    const bufEnd = offset + buf.byteLength;
    if (index < bufEnd) {
      return {
        buf,
        index: index - offset
      };
    }
    offset = bufEnd;
  }
  throw new RangeError("index is out of bounds");
}
function isUint8ArrayList(value) {
  return Boolean(value == null ? void 0 : value[symbol2]);
}
var symbol2, Uint8ArrayList;
var init_src11 = __esm({
  "node_modules/uint8arraylist/dist/src/index.js"() {
    init_concat();
    init_equals();
    init_alloc();
    symbol2 = Symbol.for("@achingbrain/uint8arraylist");
    Uint8ArrayList = class {
      constructor(...data) {
        Object.defineProperty(this, symbol2, { value: true });
        this.bufs = [];
        this.length = 0;
        if (data.length > 0) {
          this.appendAll(data);
        }
      }
      *[Symbol.iterator]() {
        yield* this.bufs;
      }
      get byteLength() {
        return this.length;
      }
      append(...bufs) {
        this.appendAll(bufs);
      }
      appendAll(bufs) {
        let length2 = 0;
        for (const buf of bufs) {
          if (buf instanceof Uint8Array) {
            length2 += buf.byteLength;
            this.bufs.push(buf);
          } else if (isUint8ArrayList(buf)) {
            length2 += buf.byteLength;
            this.bufs.push(...buf.bufs);
          } else {
            throw new Error("Could not append value, must be an Uint8Array or a Uint8ArrayList");
          }
        }
        this.length += length2;
      }
      prepend(...bufs) {
        this.prependAll(bufs);
      }
      prependAll(bufs) {
        let length2 = 0;
        for (const buf of bufs.reverse()) {
          if (buf instanceof Uint8Array) {
            length2 += buf.byteLength;
            this.bufs.unshift(buf);
          } else if (isUint8ArrayList(buf)) {
            length2 += buf.byteLength;
            this.bufs.unshift(...buf.bufs);
          } else {
            throw new Error("Could not prepend value, must be an Uint8Array or a Uint8ArrayList");
          }
        }
        this.length += length2;
      }
      get(index) {
        const res = findBufAndOffset(this.bufs, index);
        return res.buf[res.index];
      }
      set(index, value) {
        const res = findBufAndOffset(this.bufs, index);
        res.buf[res.index] = value;
      }
      write(buf, offset = 0) {
        if (buf instanceof Uint8Array) {
          for (let i = 0; i < buf.length; i++) {
            this.set(offset + i, buf[i]);
          }
        } else if (isUint8ArrayList(buf)) {
          for (let i = 0; i < buf.length; i++) {
            this.set(offset + i, buf.get(i));
          }
        } else {
          throw new Error("Could not write value, must be an Uint8Array or a Uint8ArrayList");
        }
      }
      consume(bytes) {
        bytes = Math.trunc(bytes);
        if (Number.isNaN(bytes) || bytes <= 0) {
          return;
        }
        while (this.bufs.length > 0) {
          if (bytes >= this.bufs[0].byteLength) {
            bytes -= this.bufs[0].byteLength;
            this.length -= this.bufs[0].byteLength;
            this.bufs.shift();
          } else {
            this.bufs[0] = this.bufs[0].subarray(bytes);
            this.length -= bytes;
            break;
          }
        }
      }
      slice(beginInclusive, endExclusive) {
        const { bufs, length: length2 } = this._subList(beginInclusive, endExclusive);
        return concat(bufs, length2);
      }
      subarray(beginInclusive, endExclusive) {
        const { bufs, length: length2 } = this._subList(beginInclusive, endExclusive);
        if (bufs.length === 1) {
          return bufs[0];
        }
        return concat(bufs, length2);
      }
      sublist(beginInclusive, endExclusive) {
        const { bufs, length: length2 } = this._subList(beginInclusive, endExclusive);
        const list = new Uint8ArrayList();
        list.length = length2;
        list.bufs = bufs;
        return list;
      }
      _subList(beginInclusive, endExclusive) {
        beginInclusive = beginInclusive ?? 0;
        endExclusive = endExclusive ?? this.length;
        if (beginInclusive < 0) {
          beginInclusive = this.length + beginInclusive;
        }
        if (endExclusive < 0) {
          endExclusive = this.length + endExclusive;
        }
        if (beginInclusive < 0 || endExclusive > this.length) {
          throw new RangeError("index is out of bounds");
        }
        if (beginInclusive === endExclusive) {
          return { bufs: [], length: 0 };
        }
        if (beginInclusive === 0 && endExclusive === this.length) {
          return { bufs: [...this.bufs], length: this.length };
        }
        const bufs = [];
        let offset = 0;
        for (let i = 0; i < this.bufs.length; i++) {
          const buf = this.bufs[i];
          const bufStart = offset;
          const bufEnd = bufStart + buf.byteLength;
          offset = bufEnd;
          if (beginInclusive >= bufEnd) {
            continue;
          }
          const sliceStartInBuf = beginInclusive >= bufStart && beginInclusive < bufEnd;
          const sliceEndsInBuf = endExclusive > bufStart && endExclusive <= bufEnd;
          if (sliceStartInBuf && sliceEndsInBuf) {
            if (beginInclusive === bufStart && endExclusive === bufEnd) {
              bufs.push(buf);
              break;
            }
            const start = beginInclusive - bufStart;
            bufs.push(buf.subarray(start, start + (endExclusive - beginInclusive)));
            break;
          }
          if (sliceStartInBuf) {
            if (beginInclusive === 0) {
              bufs.push(buf);
              continue;
            }
            bufs.push(buf.subarray(beginInclusive - bufStart));
            continue;
          }
          if (sliceEndsInBuf) {
            if (endExclusive === bufEnd) {
              bufs.push(buf);
              break;
            }
            bufs.push(buf.subarray(0, endExclusive - bufStart));
            break;
          }
          bufs.push(buf);
        }
        return { bufs, length: endExclusive - beginInclusive };
      }
      getInt8(byteOffset) {
        const buf = this.subarray(byteOffset, byteOffset + 1);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getInt8(0);
      }
      setInt8(byteOffset, value) {
        const buf = allocUnsafe(1);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setInt8(0, value);
        this.write(buf, byteOffset);
      }
      getInt16(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 2);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getInt16(0, littleEndian);
      }
      setInt16(byteOffset, value, littleEndian) {
        const buf = alloc(2);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setInt16(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      getInt32(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 4);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getInt32(0, littleEndian);
      }
      setInt32(byteOffset, value, littleEndian) {
        const buf = alloc(4);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setInt32(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      getBigInt64(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 8);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getBigInt64(0, littleEndian);
      }
      setBigInt64(byteOffset, value, littleEndian) {
        const buf = alloc(8);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setBigInt64(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      getUint8(byteOffset) {
        const buf = this.subarray(byteOffset, byteOffset + 1);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getUint8(0);
      }
      setUint8(byteOffset, value) {
        const buf = allocUnsafe(1);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setUint8(0, value);
        this.write(buf, byteOffset);
      }
      getUint16(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 2);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getUint16(0, littleEndian);
      }
      setUint16(byteOffset, value, littleEndian) {
        const buf = alloc(2);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setUint16(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      getUint32(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 4);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getUint32(0, littleEndian);
      }
      setUint32(byteOffset, value, littleEndian) {
        const buf = alloc(4);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setUint32(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      getBigUint64(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 8);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getBigUint64(0, littleEndian);
      }
      setBigUint64(byteOffset, value, littleEndian) {
        const buf = alloc(8);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setBigUint64(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      getFloat32(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 4);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getFloat32(0, littleEndian);
      }
      setFloat32(byteOffset, value, littleEndian) {
        const buf = alloc(4);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setFloat32(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      getFloat64(byteOffset, littleEndian) {
        const buf = this.subarray(byteOffset, byteOffset + 8);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        return view.getFloat64(0, littleEndian);
      }
      setFloat64(byteOffset, value, littleEndian) {
        const buf = alloc(8);
        const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
        view.setFloat64(0, value, littleEndian);
        this.write(buf, byteOffset);
      }
      equals(other) {
        if (other == null) {
          return false;
        }
        if (!(other instanceof Uint8ArrayList)) {
          return false;
        }
        if (other.bufs.length !== this.bufs.length) {
          return false;
        }
        for (let i = 0; i < this.bufs.length; i++) {
          if (!equals3(this.bufs[i], other.bufs[i])) {
            return false;
          }
        }
        return true;
      }
      static fromUint8Arrays(bufs, length2) {
        const list = new Uint8ArrayList();
        list.bufs = bufs;
        if (length2 == null) {
          length2 = bufs.reduce((acc, curr) => acc + curr.byteLength, 0);
        }
        list.length = length2;
        return list;
      }
    };
  }
});

// node_modules/it-reader/dist/src/index.js
function reader(source) {
  const reader2 = async function* () {
    let bytes = yield;
    let bl = new Uint8ArrayList();
    for await (const chunk of source) {
      if (bytes == null) {
        bl.append(chunk);
        bytes = yield bl;
        bl = new Uint8ArrayList();
        continue;
      }
      bl.append(chunk);
      while (bl.length >= bytes) {
        const data = bl.sublist(0, bytes);
        bl.consume(bytes);
        bytes = yield data;
        if (bytes == null) {
          if (bl.length > 0) {
            bytes = yield bl;
            bl = new Uint8ArrayList();
          }
          break;
        }
      }
    }
    if (bytes != null) {
      throw Object.assign(new Error(`stream ended before ${bytes} bytes became available`), { code: "ERR_UNDER_READ", buffer: bl });
    }
  }();
  void reader2.next();
  return reader2;
}
var init_src12 = __esm({
  "node_modules/it-reader/dist/src/index.js"() {
    init_src11();
  }
});

// node_modules/it-handshake/dist/src/index.js
function handshake(stream) {
  const writer = pushable();
  const source = reader(stream.source);
  const sourcePromise = pDefer();
  let sinkErr;
  const sinkPromise = stream.sink(async function* () {
    yield* writer;
    const source2 = await sourcePromise.promise;
    yield* source2;
  }());
  sinkPromise.catch((err) => {
    sinkErr = err;
  });
  const rest = {
    sink: async (source2) => {
      if (sinkErr != null) {
        return await Promise.reject(sinkErr);
      }
      sourcePromise.resolve(source2);
      return await sinkPromise;
    },
    source
  };
  return {
    reader: source,
    writer,
    stream: rest,
    rest: () => writer.end(),
    write: writer.push,
    read: async () => {
      const res = await source.next();
      if (res.value != null) {
        return res.value;
      }
    }
  };
}
var init_src13 = __esm({
  "node_modules/it-handshake/dist/src/index.js"() {
    init_src12();
    init_src7();
    init_p_defer();
  }
});

// node_modules/it-map/index.js
var require_it_map = __commonJS({
  "node_modules/it-map/index.js"(exports2, module2) {
    "use strict";
    var map2 = async function* (source, func) {
      for await (const val of source) {
        yield func(val);
      }
    };
    module2.exports = map2;
  }
});

// node_modules/libp2p/dist/src/pnet/index.js
var pnet_exports = {};
__export(pnet_exports, {
  PreSharedKeyConnectionProtector: () => PreSharedKeyConnectionProtector,
  generateKey: () => generateKey4
});
var import_err_code14, import_it_map, log2, PreSharedKeyConnectionProtector;
var init_pnet = __esm({
  "node_modules/libp2p/dist/src/pnet/index.js"() {
    init_src6();
    init_src8();
    import_err_code14 = __toESM(require_err_code(), 1);
    init_duplex();
    init_src10();
    init_errors();
    init_errors2();
    init_crypto();
    init_src13();
    init_key_generator();
    import_it_map = __toESM(require_it_map(), 1);
    init_key_generator();
    log2 = logger("libp2p:pnet");
    PreSharedKeyConnectionProtector = class {
      constructor(init) {
        this.enabled = init.enabled !== false;
        if (this.enabled) {
          const decodedPSK = decodeV1PSK(init.psk);
          this.psk = decodedPSK.psk;
          this.tag = decodedPSK.tag ?? "";
        } else {
          this.psk = new Uint8Array();
          this.tag = "";
        }
      }
      async protect(connection) {
        if (!this.enabled) {
          return connection;
        }
        if (connection == null) {
          throw (0, import_err_code14.default)(new Error(NO_HANDSHAKE_CONNECTION), codes.ERR_INVALID_PARAMETERS);
        }
        log2("protecting the connection");
        const localNonce = randomBytes(NONCE_LENGTH);
        const shake = handshake(connection);
        shake.write(localNonce);
        const result = await shake.reader.next(NONCE_LENGTH);
        if (result.value == null) {
          throw (0, import_err_code14.default)(new Error(STREAM_ENDED), codes.ERR_INVALID_PARAMETERS);
        }
        const remoteNonce = result.value.slice();
        shake.rest();
        log2("exchanged nonces");
        const [internal, external] = duplexPair();
        pipe(
          external,
          createBoxStream(localNonce, this.psk),
          shake.stream,
          (source) => (0, import_it_map.default)(source, (buf) => buf.subarray()),
          createUnboxStream(remoteNonce, this.psk),
          external
        ).catch(log2.error);
        return {
          ...connection,
          ...internal
        };
      }
    };
  }
});

// src-electron/electron-main.js
var import_electron = require("electron");
init_to_string();
var import_path = __toESM(require("path"));
var import_os = __toESM(require("os"));
var platform = process.platform || import_os.default.platform();
try {
  if (platform === "win32" && import_electron.nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(import_path.default.join(import_electron.app.getPath("userData"), "DevTools Extensions"));
  }
} catch (_) {
}
var mainWindow;
async function startIpfs() {
  const { createEd25519PeerId: createEd25519PeerId2 } = await Promise.resolve().then(() => (init_src5(), src_exports));
  const { PreSharedKeyConnectionProtector: PreSharedKeyConnectionProtector2 } = await Promise.resolve().then(() => (init_pnet(), pnet_exports));
  const createIpfs = (await import("ipfs")).create;
  const myPeerId = await createEd25519PeerId2();
  console.log("my peerId:", myPeerId.toString());
  const swarmKey = "L2tleS9zd2FybS9wc2svMS4wLjAvCi9iYXNlMTYvCjZkMDBmNjA3MDc2ZTE3NTM0NzZhMDk3MWQ3NDAzNmViZDU5YTI4NDQ4YjNkZGFmOTAwZTYzYjJhZDc4MjgzOGI";
  const p2pOptions = {
    peerId: myPeerId,
    connectionProtector: new PreSharedKeyConnectionProtector2({
      psk: new Uint8Array(Buffer.from(swarmKey, "base64"))
    })
  };
  ipfs = await createIpfs({
    libp2p: p2pOptions,
    repo: import_path.default.join(import_os.default.homedir(), ".testipfs"),
    config: {
      Bootstrap: []
    }
  });
  const libp2p = ipfs.libp2p;
  libp2p.connectionManager.addEventListener("peer:connect", async (evt) => {
    const { detail: connection } = evt;
    const { remotePeer } = connection;
    console.log("peer:connect", remotePeer.toString());
  });
  libp2p.connectionManager.addEventListener("peer:disconnect", async (evt) => {
    const { detail: connection } = evt;
    const { remotePeer } = connection;
    console.log("peer:disconnect", remotePeer.toString());
  });
  await ipfs.pubsub.subscribe("mypubsub", (msg) => {
    console.log("got message : ", msg.from.toString(), toString2(msg.data));
  });
  let tosend = 0;
  setInterval(async () => {
    const peers = await ipfs.pubsub.peers("mypubsub");
    console.log("pubsub peers : %o", peers.length);
    const msg = new TextEncoder().encode(tosend++);
    await ipfs.pubsub.publish("mypubsub", msg);
  }, 5e3);
  console.log(await ipfs.bootstrap.list());
}
function createWindow() {
  mainWindow = new import_electron.BrowserWindow({
    icon: import_path.default.resolve(__dirname, "icons/icon.png"),
    width: 1e3,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload: import_path.default.resolve(__dirname, "/Users/admin/Code/ipfs-electron/.quasar/electron/electron-preload.js")
    }
  });
  mainWindow.loadURL("http://localhost:9300");
  if (true) {
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }
  startIpfs();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
import_electron.app.whenReady().then(createWindow);
import_electron.app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    import_electron.app.quit();
  }
});
import_electron.app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
/*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */