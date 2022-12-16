
let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }
/**
*/
export class Ball {

    static __wrap(ptr) {
        const obj = Object.create(Ball.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_ball_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} r
    * @returns {Ball}
    */
    static new(x, y, r) {
        const ret = wasm.ball_new(x, y, r);
        return Ball.__wrap(ret);
    }
    /**
    */
    bounce() {
        wasm.ball_bounce(this.ptr);
    }
    /**
    * @param {number} canvas_width
    * @param {number} canvas_height
    * @returns {boolean}
    */
    edge_collide(canvas_width, canvas_height) {
        const ret = wasm.ball_edge_collide(this.ptr, canvas_width, canvas_height);
        return ret !== 0;
    }
    /**
    * @param {number} paddle_x
    * @param {number} paddle_y
    * @param {number} paddle_w
    */
    hit_paddle(paddle_x, paddle_y, paddle_w) {
        wasm.ball_hit_paddle(this.ptr, paddle_x, paddle_y, paddle_w);
    }
    /**
    * @param {number} b_x
    * @param {number} b_y
    * @param {number} b_w
    * @param {number} b_h
    * @returns {boolean}
    */
    break_bricks(b_x, b_y, b_w, b_h) {
        const ret = wasm.ball_break_bricks(this.ptr, b_x, b_y, b_w, b_h);
        return ret !== 0;
    }
    /**
    * @returns {number}
    */
    x() {
        const ret = wasm.ball_x(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    y() {
        const ret = wasm.ball_y(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    r() {
        const ret = wasm.ball_r(this.ptr);
        return ret;
    }
}
/**
*/
export class Brick {

    static __wrap(ptr) {
        const obj = Object.create(Brick.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_brick_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} w
    * @param {number} h
    * @param {string} color
    * @returns {Brick}
    */
    static new(x, y, w, h, color) {
        const ptr0 = passStringToWasm0(color, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.brick_new(x, y, w, h, ptr0, len0);
        return Brick.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    x() {
        const ret = wasm.brick_x(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    y() {
        const ret = wasm.brick_y(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    w() {
        const ret = wasm.brick_w(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    h() {
        const ret = wasm.brick_h(this.ptr);
        return ret;
    }
    /**
    * @returns {string}
    */
    color() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.brick_color(retptr, this.ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_2(r0, r1);
        }
    }
}
/**
*/
export class Paddle {

    static __wrap(ptr) {
        const obj = Object.create(Paddle.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_paddle_free(ptr);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} w
    * @param {number} h
    * @returns {Paddle}
    */
    static new(x, y, w, h) {
        const ret = wasm.paddle_new(x, y, w, h);
        return Paddle.__wrap(ret);
    }
    /**
    * @param {number} mouse_x
    */
    control(mouse_x) {
        wasm.paddle_control(this.ptr, mouse_x);
    }
    /**
    * @returns {number}
    */
    x() {
        const ret = wasm.paddle_x(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    y() {
        const ret = wasm.paddle_y(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    w() {
        const ret = wasm.paddle_w(this.ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    h() {
        const ret = wasm.paddle_h(this.ptr);
        return ret;
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_random_656f2ae924b2540e = typeof Math.random == 'function' ? Math.random : notDefined('Math.random');
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array();
    cachedUint8Memory0 = new Uint8Array();


    return wasm;
}

function initSync(module) {
    const imports = getImports();

    initMemory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('breakout_wasm_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
