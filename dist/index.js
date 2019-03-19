"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "2020202020", "", "Hello", 123456);
let blockChain = [genesisBlock];
// 블록체인이 얼마나 긴지 알게 해주는 함수
const getBlockChain = () => blockChain;
// 블록체인의 길이를 알아야 하기 때문에
// 가장 최근의 블록을 줄 것
const getLatestBlock = () => blockChain[blockChain.length - 1];
// 시간 리턴
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("forth block");
console.log(blockChain);
//# sourceMappingURL=index.js.map