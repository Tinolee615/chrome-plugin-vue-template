var JavaScriptObfuscator = require('javascript-obfuscator');
var fs=require('fs')
var path=require('path')
fs.readFile(path.resolve(__dirname,'./dist/js/tbSearchDetail.js'),'utf8',function(err,data){
    var datas=jm(data)
    console.log(datas)
    fs.writeFile(path.resolve(__dirname,'./dist/tbSearchDetail.js'),datas,'utf8',function(err,data){
        if(err)  return ;
        console.log('写入成功')
    })
})
function jm(dCode) {
    var obfuscationResult = JavaScriptObfuscator.obfuscate(
        dCode,
        {
            compact: true,
            controlFlowFlattening: false,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: false,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            domainLock: [],
            identifierNamesGenerator: 'hexadecimal',
            identifiersPrefix: '',
            inputFileName: '',
            log: false,
            renameGlobals: false,
            reservedNames: [],
            reservedStrings: [],
            rotateStringArray: true,
            seed: 0,
            selfDefending: false,
            sourceMap: false,
            sourceMapBaseUrl: '',
            sourceMapFileName: '',
            sourceMapMode: 'separate',
            stringArray: true,
            stringArrayEncoding: false,
            stringArrayThreshold: 0.75,
            target: 'browser',
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        }
    );
   return obfuscationResult.getObfuscatedCode()
}
