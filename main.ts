let srcImg = assets.image`showStageDecal`
//prettyPrintHex(imgToBuf(srcImg))
let encoded = imgEncode(srcImg, true)
//let dstImg = image.ofBuffer(imgToBuf(srcImg))
let dstImg = imgDecode(encoded)
//let dstImg = image.ofBuffer(encoded)
//let dstImg = createImage('squidJumpPic')
scene.setBackgroundImage(dstImg)
console.log(encoded)

//Assets Images
//menuSelector