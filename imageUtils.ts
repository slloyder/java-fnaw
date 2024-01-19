/* From pxtbase.h
// Current format:
// 87 BB WW WW HH HH 00 00 DATA
// that is: 0x87, 0x01 or 0x04 - bpp, width in little endian, height, 0x00, 0x00 followed by data
// for 4 bpp images, rows are word-aligned (as in legacy)

#define IMAGE_HEADER_MAGIC 0x87

struct ImageHeader {
    uint8_t magic;
    uint8_t bpp;
    uint16_t width;
    uint16_t height;
    uint16_t padding;
    uint8_t pixels[0];
};
*/
const MIN_RUN_LEN: number = 2

// Round up to the nearest multiple of 4 bytes. There are 8 pixels per 4 bytes.
function imgByteHeight(height: number) {
    return 4 * Math.ceil(height / 8);
}

// alignment is assumed to be a power of2
function alignUp(v: number, alignment:number) {
    return (v + alignment - 1) & ~(alignment - 1)
}

function imgToBuf(im: Image) {
    let align = 4
    let hb = imgByteHeight(im.height)
    let buf = Buffer.create(8 + im.width * hb)
    buf[0] = 0x87
    buf[1] = 4
    buf[2] = im.width & 0xFF
    buf[3] = im.width >> 8
    buf[4] = im.height & 0xFF
    buf[5] = im.height >> 8
    buf[6] = 0
    buf[7] = 0

    let b = 8
    let rows = Buffer.create(alignUp(im.height, 2))
    for (let x = 0; x < im.width; x++) {
        im.getRows(x, rows)
        for (let y = 0, by = b; y < im.height; y += 2)
            buf[by++] = (rows[y + 1] << 4) | rows[y]
        b += hb
    }
    return buf
}

function imgEncode(src: Image, printHex: boolean = false) {
    let buf = imgToBuf(src)

    let result: number[] = [src.width, src.height]
    let c = result.length // index of the control byte
    result.push(0)        // initialize the control byte    
    let bit = 0           // current bit in the control byte
    let i = 8             // skip header
    while (i < buf.length) {
        // Find the run len
        let start = i
        let val = buf[i++]
        while (i < buf.length && buf[i] == val)
            i++

        // Encode the run
        let runLen = i - start
        while (runLen > 0) {
            result.push(val)
            if (runLen >= MIN_RUN_LEN) {
                let len = Math.min(runLen, 255)
                result[c] |= (1 << bit) // set a bit in the control byte
                result.push(len)
                runLen -= len
            }
            else {
                runLen -= 1
            }

            bit++
            if (bit == 8) {
                c = result.length
                result.push(0)
                bit = 0
            }
        }
    }
    let ret = Buffer.fromArray(result)
    if (printHex)
        prettyPrintHex(ret)
    return ret
}

function imgDecode(encoded: Buffer, makeImage: boolean = true) {
    let e = 0
    let width = encoded[e++]
    let height = encoded[e++]
    let control = encoded[e++]
    let bit = 0

    let i = 0
    let hb = imgByteHeight(height)
    let buf = Buffer.create(8 + width * hb)

    // write header
    buf[i++] = 0x87
    buf[i++] = 4
    buf[i++] = width & 0xFF
    buf[i++] = width >> 8
    buf[i++] = height & 0xFF
    buf[i++] = height >> 8
    buf[i++] = 0
    buf[i++] = 0

    // decode image buffer
    while (e < encoded.length) {
        let val = encoded[e++]
        if (control & (1 << bit)) { // a run
            let runLen = encoded[e++]
            while (runLen--)
                buf[i++] = val
        }
        else
            buf[i++] = val          // a single pixel

        bit++
        if (bit == 8) {
            control = encoded[e++]
            bit = 0
        }
    }
    if (i != buf.length)
        console.log(`Bad decode length:${i} expected:${buf.length}`)

    if (makeImage)
        return image.ofBuffer(buf)
    else
        return null
}

function prettyPrintHex(buf: Buffer) {
    let s = buf.toHex()
    let i = 0
    let COLS = 160
    while (s.length - i > COLS) {
        console.log(s.substr(i, COLS))
        i += COLS
    }
    if (s.length - i > 0)
        console.log(s.substr(i))
    console.log(`\` // ${buf.length} bytes`)
}
